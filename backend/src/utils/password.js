const crypto = require('crypto');

const generatePassword = (length = 12) => {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
}

module.exports = {
    generatePassword
}