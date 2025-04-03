import nodemailer from 'nodemailer';
import fs from 'fs';
import path, { dirname} from 'path';
import { fileURLToPath } from "url";
import { type } from 'os';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

// Function to send email
export const sendOtpEmail = async (to, from, first_name, otp, expiry) => {
    // Read the HTML file
    let htmlTemplate = fs.readFileSync(path.join(__dirname, '..', "views", "email", "otp-email-template.html"), "utf8");

    let code = otp.split('');
    
    // Replace placeholders
    htmlTemplate = htmlTemplate.replace("{{name}}", first_name)
                               .replace("{{otp1}}", code[0])
                               .replace("{{otp2}}", code[1])
                               .replace("{{otp3}}", code[2])
                               .replace("{{otp4}}", code[3])
                               .replace("{{otp5}}", code[4])
                               .replace("{{otp6}}", code[5])
                               .replace("{{expiry}}", expiry);

    // Transporter CONFIGURATION
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASSWORD  
        }
    });

    console.log(path.join(__dirname, "..", "..", "public", "icons", "instagram.svg"))

    // Email message
    let mailMessage = {
        from: `"Exclusive Team" ${from} `,  // Sender email
        to: to,  // Recipient email
        subject: "Your Reset Password OTP Code",
        html: htmlTemplate,
        attachments: [
            {
                filename: "facebook.svg",
                path: path.join(__dirname, "..", "..", "public", "icons", "facebook.svg"),
                cid: "facebook"
            },
            {
                filename: "instagram.svg",
                path: path.join(__dirname, "..", "..", "public", "icons", "instagram.svg"),
                cid: "instagram"
            }
        ]
    };

    // Send email
    transporter.sendMail(mailMessage, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}
