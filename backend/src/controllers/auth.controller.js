import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";

dotenv.config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// register 
const registerUser = async (req,res) => {
   
    try {
        const {first_name, last_name, email, phone, password} = req.body;

        // Check if the user already exists
        let user = await User.findOne(
            {
                where: {
                    [Op.or]: [
                        { email },
                        { phone }
                    ]
                }
            }
        );

        if (user) return res.status(400).json({ msg: 'User already exists' })
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Register the user
        user = await User.create({ first_name, last_name, email, phone, password: hashedPassword, email_verified: false});

        res.status(201).json({ msg: 'User registered successfully'});
    } catch (err) {
        res.status(500).json({ msg: 'Server error'});
    }
}

// signin through google 
const googleLogin = async (req, res) => {
    try {
        
        const { token } = req.body;

        if (!token) return res.status(400).json({ msg: 'Token is required'})

        // get user details from google
        const userInfo = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 20000
        }).then((res) => res.json());

        const { email, family_name, picture, given_name, email_verified } = userInfo;
        
        // Check if the user already exists
        let user = await User.findOne({ where : {email}});

        if (!user) {
            // Register the user
            user = await User.create({ 
                first_name : given_name,
                last_name : family_name, 
                email,
                picture,
                password: null,
                email_verified
            });
        }

        
        // Generate JWT Refresh Token
        const refresh_token = await jwt.sign({
			id: user.user_id, 
			email: user.email, 
			firstName: user.first_name,
			lastName: user.last_name,
			picture: user.picture,
			phone: user.phone
		}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'} );

        // Set cookie securely
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            signed: true
        });

        // Generate JWT Access Token
        const access_token = await jwt.sign({ id: user.user_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'} );
        res.status(201).json({
            msg: 'Logged in successfully',
            access_token, 
            user: {
                first_name : user.first_name,
                last_name : user.last_name, 
                email: user.email,
                picture: user.picture,
                phone: user.phone
            },
        });

    } catch (err) {
        console.error('Google registration error:', err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

// login
const loginUser = async (req,res) => {

    try {
        const { email, password } = req.body;

        // Check if the user exists
        let user = await User.findOne({where: { email }});

        let errorMessage = 'Invalid credentials';
        if (!user) return res.status(401).json({ msg: errorMessage});

        // check is password exists
        if(!user?.password) return res.status(401).json({ msg: errorMessage});

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: errorMessage});

		const payload = {
			id: user.user_id, 
			email: user.email, 
			firstName: user.first_name,
			lastName: user.last_name,
			picture: user.picture,
			phone: user.phone
		}

        // Generate JWT Refresh Token
        const refresh_token = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'} );

        // Set cookie securely
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            signed: true
        });

        // Generate JWT Access Token
        const access_token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'} );

        res.json({
            access_token, 
            user: payload,
            msg: 'Logged in successfully'
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Server error'});
    }
}

// logout
const logoutUser = async (req,res) => {
    const refresh_token = req.signedCookies?.refresh_token;

    if (!refresh_token) return res.status(401).json({ msg: 'No token, authorization denied'});

    try {

        res.clearCookie('refresh_token', { httpOnly: true, signed: true });
        res.status(200).json({ msg: 'Logged out successfully'});

    } catch (err) {
        res.status(500).json({ msg: 'Server error'});
    }


}

// refresh token
const refreshUserAccessToken = async (req, res) => {
    const refreshToken = req.signedCookies.refresh_token;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Invalid token!' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = decoded

		const payload = {
			id: user.id, 
			email: user.email, 
			firstName: user.firstName,
			lastName: user.lastName,
			picture: user.picture,
			phone: user.phone
		}

        // Generate JWT Access Token
        const access_token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'} );

        res.status(200).json({
            access_token, 
            user: payload
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export {
	registerUser,
	loginUser,
	googleLogin,
	logoutUser,
	refreshUserAccessToken,
};
