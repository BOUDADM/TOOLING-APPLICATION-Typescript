"use strict";
// dataserial.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToByteArray = exports.stringToBytes = exports.jsonToString = void 0;
// Function to convert JSON to string
function jsonToString(jsonMessage) {
    return JSON.stringify(jsonMessage);
}
exports.jsonToString = jsonToString;
// Function to encode string to byte array manually
function stringToBytes(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode < 0x80) {
            bytes.push(charCode);
        }
        else if (charCode < 0x800) {
            bytes.push(0xc0 | (charCode >> 6));
            bytes.push(0x80 | (charCode & 0x3f));
        }
        else if (charCode < 0x10000) {
            bytes.push(0xe0 | (charCode >> 12));
            bytes.push(0x80 | ((charCode >> 6) & 0x3f));
            bytes.push(0x80 | (charCode & 0x3f));
        }
        else {
            bytes.push(0xf0 | (charCode >> 18));
            bytes.push(0x80 | ((charCode >> 12) & 0x3f));
            bytes.push(0x80 | ((charCode >> 6) & 0x3f));
            bytes.push(0x80 | (charCode & 0x3f));
        }
    }
    return bytes;
}
exports.stringToBytes = stringToBytes;
// dataserial.ts
// Function to convert JSON to string
// Function to convert JSON to byte array
function jsonToByteArray(jsonMessage) {
    // Convert JSON message to string
    const jsonString = jsonToString(jsonMessage);
    // Encode string to byte array manually
    const byteArray = jsonString.split('').map((char) => char.charCodeAt(0));
    // Format byte array as a string
    const formattedByteArray = '[' + byteArray.join(', ') + ']';
    return formattedByteArray;
}
exports.jsonToByteArray = jsonToByteArray;
