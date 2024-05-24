"use strict";
// datadeserial.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.byteArrayToJson = void 0;
// Function to convert byte array to JSON string
function byteArrayToJson(byteArray) {
    let jsonString = '';
    // Iterate through each byte in the array
    for (let i = 0; i < byteArray.length; i++) {
        // Convert the byte into a character and append it to the string
        jsonString += String.fromCharCode(byteArray[i]);
    }
    return jsonString;
}
exports.byteArrayToJson = byteArrayToJson;
