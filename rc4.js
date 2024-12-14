
function encryptImage() {
                var imageInput = document.getElementById('imageToEncrypt');

                if (imageInput.files.length > 0) {
                    var image = imageInput.files[0];
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        var imageContent = e.target.result;
                        var key = 'myKey';
                        var encryptedImageContent = encryptRC4(imageContent, key);
                        document.getElementById('imageCiphertext').value = encryptedImageContent;
                    };

                    reader.readAsDataURL(image);
                } else {
                    alert("Please select an image.");
                }
            }
function initializeRC4(key) {
    const keyArray = Array.from(key);
    const S = Array.from({ length: 256 }, (_, index) => index);
    let j = 0;

    for (let i = 0; i < 256; i++) {
        j = (j + S[i] + keyArray[i % keyArray.length].charCodeAt(0)) % 256;
        [S[i], S[j]] = [S[j], S[i]];
    }

    return S;
}

function encryptRC4(input, key) {
    const S = initializeRC4(key);
    let i = 0;
    let j = 0;
    const encrypted = [];

    for (let k = 0; k < input.length; k++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        [S[i], S[j]] = [S[j], S[i]];

        const keyStreamByte = S[(S[i] + S[j]) % 256];
        const inputByte = input.charCodeAt(k);

        const encryptedByte = keyStreamByte ^ inputByte;

        encrypted.push(String.fromCharCode(encryptedByte));
    }

    return encrypted.join('');
}
const key = 'myKey';
const imageContent = 'YourImageContent';
const encryptedImageContent = encryptRC4(imageContent, key);

console.log(encryptedImageContent);
