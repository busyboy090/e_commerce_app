import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { Op } from 'sequelize';
import {OAuth2Client} from 'google-auth-library';
import speakeasy from 'speakeasy';
import Otp from '../models/otp.model.js';
import { sendOtpEmail } from './email.controller.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// register 
export const registerUser = async (req,res) => {
   
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
export const googleLogin = async (req, res) => {
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
        const refresh_token = await jwt.sign({id: user.user_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'} );

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
export const loginUser = async (req,res) => {

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

        // Generate JWT Refresh Token
        const refresh_token = await jwt.sign({id: user.user_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'} );

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
        res.json({
            access_token, 
            user: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                picture: user.picture,
                phone: user.phone
            },
            msg: 'Logged in successfully'
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Server error'});
    }
}

// logout
export const logoutUser = async (req,res) => {
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
export const refreshUserAccessToken = async (req, res) => {
    const refreshToken = req.signedCookies.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Invalid token!' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findByPk(decoded.id);
        
        if (!user) return res.status(401).json({ message: 'Invalid token!' });

        // Generate JWT Access Token
        const access_token = await jwt.sign({ id: user.user_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'} );
        res.status(200).json({
            access_token, 
            user: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                picture: user.picture,
                phone: user.phone
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};


// userdetails
export const getUserDetails = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.user_id, { attributes: { exclude: ['password','id','createdAt','updatedAt'] } });
      res.json(user);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
}

// Verify email
export const verifyEmail = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) return res.status(400).json({ msg: 'Email is required'})

        let user = await User.findOne({ where: { email }});


        if(user) {
            // Generate a unique secret for the user
            const otpSecret = speakeasy.generateSecret().base32;

            // Generate a secure reset token(otp)
            const otp = speakeasy.totp({
                secret: otpSecret,
                encoding: 'base32',
                digits: 6,  // Generates a 6-digit OTP
                step: 600 // Sets the OTP validity period
            });

            // find the user in the otp table
            const userByInOtpTable = await Otp.findOne({ where: { user_id: user.user_id }});

            if (!userByInOtpTable) {
                await Otp.create({
                    otp,
                    otp_secret_key: otpSecret,
                    user_id: user.user_id
                })
            } else {
                userByInOtpTable.set('otp', otp);
                userByInOtpTable.set('otp_secret_key', otpSecret);
                await userByInOtpTable.save();
            }

            sendOtpEmail(user.email,'support@exclusive.com', user.first_name, otp, '10');
        }

        res.sendStatus(200);
    } catch (err) {
        return res.status(500).json({ msg: 'Server error'})
    }

}

// verify otp 
export const verifyOtp = async (req, res) => {

    try {
        const { otp, email } = req.body;

        if (!otp) return res.status(400).json({ msg: 'Otp is required'});

        let user = await User.findOne({ where: { email }});

        if (user) {

            const userByInOtpTable = await Otp.findOne({ where: { user_id: user.user_id }});

            if(userByInOtpTable.otp !== otp) return res.status(400).json({ msg: 'Invalid Otp'});


            const isValid = speakeasy.totp.verify({
                secret: userByInOtpTable.otp_secret_key,
                encoding: 'base32',
                token: otp,
                window: 1, // Allows a small time drift,
                step: 600
            });

            if (!isValid) return  res.status(400).json({ msg: 'Invalid Otp'});


            res.status(200).json({ msg: 'OTP verified' })
        }
    } catch (err) {
        console.error('OTP verification error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
}

// reset password
export const resetPassword = async (req, res) => {
    const { otp, email, password } = req.body;

    if(!otp || !email || !password) return res.status(400).json({ msg: 'All fields are required'});

    try {

        let user = await User.findOne({ where: { email }});

        if ( user ) {
            const userByInOtpTable = await Otp.findOne({ where: { user_id: user.user_id }});

            const isValid = speakeasy.totp.verify({
                secret: userByInOtpTable.otp_secret_key,
                encoding: 'base32',
                token: otp,
                window: 1, // Allows a small time drift,
                step: 600
            });

            if (!isValid) return res.status(400).json({ msg: 'Invalid Otp'});

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            user.set('password', hashedPassword);
            await user.save()

            res.status(201).json({ msg: 'Password changed successfully'});
            userByInOtpTable.set('otp', null);
            userByInOtpTable.set('otp_secret_key', null);
            await userByInOtpTable.save
        }

    } catch (err) {
        console.log(err)
        res.send(500).json({ msg: 'Server error'})
    }
}
