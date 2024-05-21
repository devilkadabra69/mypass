import CryptoJS from 'crypto-js';

class Decryption {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    decrypt(ciphertext) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}

export default Decryption;
