const { verifyAccessToken } = require('../utils/jwt.js');

const authMiddleware = (req, res, next) => {
  let token = req?.headers['authorization'];
  const refreshToken = req.signedCookies.refresh_token;
  const session_id =  req?.signedCookies?.session_id;
  
  if (!token || !refreshToken || !session_id) {
    return res.status(401).json({ msg: 'Authorization denied' });
  }

  try {
    token = token.split(' ')[1]
    const decoded = verifyAccessToken(token);
    
    if(decoded) {
      req.user = decoded;

      next()
    }
    
  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  const role = req?.user?.role;

  try {

    if (!role || role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to access this resource' });
    }
  
    next()

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something went wrong. Please try again Later.' });
  }
};

const hasAnyPermission = (userPermission,permission) => {
  if(userPermission.includes('*')) return true;

  return userPermission.includes(permission);
}

const checkPermission = (permission) => {
  return (req,res,next) => {
    try {
      if (!hasAnyPermission(req.user.permissions,permission)) {
        return res.status(403).json({ error: 'You do not have permission to access this resource' });
      }

      next()
    }catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Something went wrong. Please try again Later.' });
    }
  }

}

const allowSelectedAdmins = (selectedAdmins) => {
  return (req, res, next) => {
    const level = req.user.level;
    
    try {

      if(!selectedAdmins.includes(level)) {
        return res.status(403).json({ error: 'You do not have permission to access this resource' });
      }

      next()

    } catch(err) {
      console.log(err)
      res.status(500).json({ error: 'Something went wrong. Please try again Later.' });
    }
  }
}

const verifyOtp = async (req, res, next) => {
  const otp = JSON.stringify(req.body.otp);

  if (!otp) return res.status(400).json({ msg: 'Otp is required'});

  try {


    let user = await User.findOne({ where: { email }});

    if (user) {

      


      res.status(200).json({ msg: 'OTP verified' })
    }
  } catch (err) {
      console.error('OTP verification error:', err);
      res.status(500).json({ msg: 'Server error' });
  }
}


module.exports = {
  authMiddleware,
  adminMiddleware,
  allowSelectedAdmins,
  checkPermission,
  verifyOtp
}