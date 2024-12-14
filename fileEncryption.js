
function encryptFile(inputFileId, outputTextareaId) {
    var fileInput = document.getElementById(inputFileId);

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var fileContent = e.target.result;
            var ciphertext = encryptText(fileContent);
            document.getElementById(outputTextareaId).value = ciphertext;
        };

        reader.readAsText(file);
    } else {
        alert("Please select a file.");
    }
}

function encryptText(text) {

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
    const encrypt = (text, publicKey) => {
        const n = publicKey.n;
        const e = publicKey.e;

        let ciphertext = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const encryptedCharCode = modExp(charCode, e, n);
            ciphertext += encryptedCharCode + ' ';
        }

        return ciphertext.trim();
    };
    const keys = generateKeys();
    return encrypt(text, keys.publicKey);
}
