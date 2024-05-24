"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptWord = void 0;
function encryptWord(word, shift) {
    let encryptedWord = '';
    for (let i = 0; i < word.length; i++) {
        let charCode = word.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) { // Check if the character is an uppercase letter
            charCode = ((charCode - 65 + shift) % 26 + 26) % 26 + 65; // Apply the shift
        }
        encryptedWord += String.fromCharCode(charCode);
    }
    return encryptedWord;
}
exports.encryptWord = encryptWord;
