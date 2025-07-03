import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_ENCRYPTION_KEY;

export function encryptData(data, key) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    localStorage.setItem(key, JSON.stringify(encryptedData));
}

export function decryptData(key) {
    const encryptedData = JSON.parse(localStorage.getItem(key));
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data ? data : null;
}

