import CryptoJS from 'crypto-js';

class Encryption {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    encrypt(text) {
        return CryptoJS.AES.encrypt(text, this.secretKey).toString();
    }
}

export default Encryption;
