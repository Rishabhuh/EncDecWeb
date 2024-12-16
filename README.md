**Encryption and Decryption Web Application**

Overview :-
This project is a web-based application designed to enable users to encrypt and decrypt text, images, and files using advanced cryptographic algorithms. It features RSA for text encryption and RC4 for image and file encryption, offering a secure way to handle sensitive data.

Features :-
1. Text Encryption/Decryption
- Convert plain text into ciphertext and vice versa using the **RSA algorithm**.

2. Image Encryption
- Upload image files (supported formats: `.jpg`, `.jpeg`, `.png`).
- Encrypt image content using the **RC4 algorithm**.
- View the encrypted content as ciphertext in a read-only text area.

3. File Encryption
- Encrypt files and their content using the RC4 encryption algorithm.

4. FileReader API Integration
- Utilizes the FileReader API to encode image data as Base64 strings for secure encryption.

Use Cases :-
- Data Security: Secure sensitive text and image data by converting it into an unreadable encrypted format.
- Cryptography Demonstration: Showcases practical applications of the RSA algorithm for text and the RC4 algorithm for images and files.

Technologies Used :-
- Frontend: HTML, CSS, JavaScript
- Cryptography: RSA and RC4 algorithms
- FileReader API: For reading and processing image and file data

How to Use :-
1. Encrypt Text
   - Enter plain text in the text input field.
   - Click the "Encrypt" button to convert it into ciphertext using RSA.

2. Decrypt Text
   - Enter the ciphertext in the text input field.
   - Click the "Decrypt" button to retrieve the original plain text.

3. Encrypt an Image
   - Select an image file using the file input field.
   - The content of the image will be encrypted using the RC4 algorithm.
   - The resulting ciphertext will be displayed in a read-only text area.

4. Encrypt a File
   - Upload a file via the file input.
   - The file content will be encrypted and displayed as ciphertext.

Installation :-
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/repo-name.git
   ```

2. Navigate to the project directory:
   ```bash
   cd repo-name
   ```

3. Open the project in your browser by launching the `index.html` file.

Future Improvements :-
- Add more encryption algorithms for enhanced versatility.
- Implement user authentication for better data security.
- Enable file decryption features.
