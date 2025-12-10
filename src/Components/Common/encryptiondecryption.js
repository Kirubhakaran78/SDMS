// import CryptoJS from "crypto-js";
// import { SECRET_KEY, ITERATIONS } from "../../Api/config";

// export function CF_encrypt(msg) {
//   const salt = CryptoJS.lib.WordArray.random(128 / 8);
//   const key = CryptoJS.PBKDF2(SECRET_KEY, salt, {
//     keySize: 128 / 32,
//     iterations: ITERATIONS,
//   });

//   const iv = CryptoJS.lib.WordArray.random(128 / 8);
//   const encrypted = CryptoJS.AES.encrypt(msg, key, {
//     iv,
//     padding: CryptoJS.pad.Pkcs7,
//     mode: CryptoJS.mode.CBC,
//   });

//   // Append salt + iv + ciphertext
//   const transitMessage = salt.toString() + iv.toString() + encrypted.toString();
//   return transitMessage;
// }


// export function CF_decrypt(encryptedAES) {
//   var salt = CryptoJS.enc.Hex.parse(encryptedAES.substr(0, 32));
//     var iv = CryptoJS.enc.Hex.parse(encryptedAES.substr(32, 32));
//     var encrypted = encryptedAES.substring(64);
   
//     var key = CryptoJS.PBKDF2(SECRET_KEY.VALUE, salt, {
//         keySize: 128/32,
//         iterations: ITERATIONS
//       });
 
//     var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
//       iv: iv,
//       padding: CryptoJS.pad.Pkcs7,
//       mode: CryptoJS.mode.CBC
     
//     });
   
//     return decrypted.toString(CryptoJS.enc.Utf8);
// }


import CryptoJS from "crypto-js";
import { SECRET_KEY, ITERATIONS } from "../../Api/config";

// Encrypt
export function CF_encrypt(msg) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8); // 16 bytes salt
  const iv = CryptoJS.lib.WordArray.random(128 / 8);   // 16 bytes iv

  const key = CryptoJS.PBKDF2(SECRET_KEY.VALUE || SECRET_KEY, salt, {
    keySize: 128 / 32,
    iterations: ITERATIONS,
  });

  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // Combine as: [salt(hex)] + [iv(hex)] + [ciphertext(base64)]
  return salt.toString() + iv.toString() + encrypted.toString();
}


// Decrypt
export function CF_decrypt(encryptedAES) {
  try {
    // 1️⃣ Extract parts
  var salt = CryptoJS.enc.Hex.parse(encryptedAES.substr(0, 32)); // 16 bytes = 32 hex chars
    const iv = CryptoJS.enc.Hex.parse(encryptedAES.substr(32, 32));  // next 16 bytes
    const ciphertext = encryptedAES.substring(64);                   // remaining Base64 string
    const key = CryptoJS.PBKDF2(SECRET_KEY.VALUE || SECRET_KEY, salt, {
      keySize: 128 / 32,
      iterations: ITERATIONS,
    });
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) throw new Error("Empty result — wrong key or corrupted data");

    return result;
  } catch (err) {
    console.error("Decryption failed:", err);
    return "";
  }
}
