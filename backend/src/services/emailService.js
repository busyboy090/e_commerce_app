const nodemailer = require('nodemailer')
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const jwt = require('../utils/jwt.js');

const readEmailTemplate = async (name) => {
    return fs.readFileSync(path.join(__dirname, '..', "views", "email", name), "utf8");
}

// Transporter CONFIGURATION
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD  
    }
});

// Function to send email
const sendResetPasswordOtpMail = async (to, name, otp, expiry) => {
    let htmlTemplate = await readEmailTemplate('otp-email-template.html');
  
    let code = otp.split('');
  
    htmlTemplate = htmlTemplate
      .replace("{{name}}", name)
      .replace("{{otp1}}", code[0])
      .replace("{{otp2}}", code[1])
      .replace("{{otp3}}", code[2])
      .replace("{{otp4}}", code[3])
      .replace("{{otp5}}", code[4])
      .replace("{{otp6}}", code[5])
      .replace("{{expiry}}", expiry);
  
    const mailMessage = {
      from: `"Exclusive Team" <support@exclusive.com>`,
      to: to,
      subject: "Your Reset Password OTP Code",
      html: htmlTemplate,
    };
  
    try {
      const info = await transporter.sendMail(mailMessage);
      console.log("Email sent:", info.response);
      return true;
    } catch (error) {
      console.error("Failed to send OTP email:", error);
      return false;
    }
};
  

const sendEmailVerificationMail = async (to, first_name, id, expiry) => {
    let htmlTemplate = await readEmailTemplate('email-verification-template.html');
  
    const token = jwt.generateEmailToken({ id });
    const link = `http://localhost:5173/user/verify-email?token=${token}`;
  
    htmlTemplate = htmlTemplate
      .replace("{{name}}", first_name)
      .replace("{{link}}", link)
      .replace("{{expiry}}", expiry || "24 hours");
  
    const mailMessage = {
      from: `Exclusive Team <support@exclusive.com>`,
      to: to,
      subject: "Verify Your Email",
      html: htmlTemplate,
    };
  
    try {
      const info = await transporter.sendMail(mailMessage);
      console.log("Email sent:", info.response);
      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
};  

module.exports = {
    sendResetPasswordOtpMail,
    sendEmailVerificationMail
}