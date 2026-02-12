import CryptoJS from "crypto-js";
import { env } from "../config/env";

const SECRET = env.accessSecret;

export const encryptText = (text: string): string => {
    return CryptoJS.AES.encrypt(text, SECRET).toString();
};

export const decryptText = (cipher: string): string => {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
};
