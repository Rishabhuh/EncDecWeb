
const generateKeys = () => {
    const p = 17;
    const q = 19;

    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const e = 65537;
    const d = modInverse(e, phi);

    return {
        publicKey: { n, e },
        privateKey: { n, d }
    };
};
const modExp = (base, exponent, modulus) => {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
};
const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1;
};

const encrypt = () => {
    const plaintext = document.getElementById('plaintext').value;
    const keys = generateKeys();
    const publicKey = keys.publicKey;
    const n = publicKey.n;
    const e = publicKey.e;

    let ciphertext = '';
    for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
        const encryptedCharCode = modExp(charCode, e, n);
        ciphertext += encryptedCharCode + ' ';
    }

    document.getElementById('ciphertext').value = ciphertext.trim();
};

const decrypt = () => {
    const cipherToDecrypt = document.getElementById('cipherToDecrypt').value;
    const keys = generateKeys();
    const privateKey = keys.privateKey;
    const n = privateKey.n;
    const d = privateKey.d;

    const encryptedCodes = cipherToDecrypt.split(' ');
    let decryptedText = '';
    for (let i = 0; i < encryptedCodes.length; i++) {
        const encryptedCharCode = parseInt(encryptedCodes[i]);
        const decryptedCharCode = modExp(encryptedCharCode, d, n);
        decryptedText += String.fromCharCode(decryptedCharCode);
    }

    document.getElementById('decrypted').value = decryptedText;
};