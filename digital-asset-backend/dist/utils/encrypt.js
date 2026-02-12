"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptText = exports.encryptText = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const env_1 = require("../config/env");
const SECRET = env_1.env.accessSecret;
const encryptText = (text) => {
    return crypto_js_1.default.AES.encrypt(text, SECRET).toString();
};
exports.encryptText = encryptText;
const decryptText = (cipher) => {
    const bytes = crypto_js_1.default.AES.decrypt(cipher, SECRET);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
};
exports.decryptText = decryptText;
