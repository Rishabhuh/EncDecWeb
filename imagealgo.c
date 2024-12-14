#include <stdio.h>
#include <stdlib.h>
#include <string.h>
void ksa(unsigned char *key, int key_length, unsigned char *S)
{
    int i, j = 0;
    for (i = 0; i < 256; i++)
    {
        S[i] = i;
    }
    for (i = 0; i < 256; i++)
    {
        j = (j + S[i] + key[i % key_length]) % 256;
        unsigned char temp = S[i];
        S[i] = S[j];
        S[j] = temp;
    }
}
void prga(unsigned char *S, unsigned char *data, int data_length, unsigned char *output)
{
    int i = 0, j = 0;
    for (int k = 0; k < data_length; k++)
    {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        unsigned char temp = S[i];
        S[i] = S[j];
        S[j] = temp;
        output[k] = data[k] ^ S[(S[i] + S[j]) % 256];
    }
}
int main()
{
    FILE *inputFile, *outputFile;
    inputFile = fopen("1.jpg", "rb");

    if (!inputFile)
    {
        perror("Error opening input file");
        return 1;
    }

    fseek(inputFile, 0, SEEK_END);
    long fileSize = ftell(inputFile);
    rewind(inputFile);

    unsigned char *imageData = (unsigned char *)malloc(fileSize);
    fread(imageData, 1, fileSize, inputFile);
    fclose(inputFile);
    unsigned char key[] = "SecretKey";
    int key_length = strlen((char *)key);
    unsigned char S[256];
    ksa(key, key_length, S);
    unsigned char *encryptedData = (unsigned char *)malloc(fileSize);
    prga(S, imageData, fileSize, encryptedData);
    outputFile = fopen("encrypted_image.txt", "w");
    for (int i = 0; i < fileSize; i++)
    {
        fprintf(outputFile, "%02X", encryptedData[i]);
    }
    fclose(outputFile);

    unsigned char *decryptedData = (unsigned char *)malloc(fileSize);
    ksa(key, key_length, S);
    prga(S, encryptedData, fileSize, decryptedData);

    outputFile = fopen("decrypted_image.jpg", "wb");
    fwrite(decryptedData, 1, fileSize, outputFile);
    fclose(outputFile);
    free(imageData);
    free(encryptedData);
    free(decryptedData);

    return 0;
}
