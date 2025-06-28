const crypto = require('crypto');

const generateOtp = (length = 6) => {
    let digits = '0123456789';
    let otp = '';
    for(let i = 0; i < length; i++) {
        const index = crypto.randomInt(0,digits.length);

        otp += digits[index];
    }

    return otp;
}

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm,key,iv);
    let encrypted = cipher.update(text, 'utf8','hex');
    encrypted += cipher.final('hex');

    return { encryptedData: encrypted, iv: iv.toString('hex')};
}


function decrypt (encrypted,ivHex) {
    const decipher = crypto.createDecipheriv(algorithm,key,Buffer.from(ivHex,'hex'));

    let decrypted = decipher.update(encrypted,'hex','utf8');

    decrypted += decipher.final('utf8');

    return decrypted
} 

module.exports = {
    generateOtp,
    encrypt,
    decrypt
}