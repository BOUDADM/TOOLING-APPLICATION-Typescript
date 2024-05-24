"use strict";
// main2.ts
Object.defineProperty(exports, "__esModule", { value: true });
const DATADESRIAL_1 = require("./DATADESRIAL");
const prompt = require('prompt-sync')();
// Function to get user input and process it
function getUserInputAndProcess() {
    const byteArrayString = prompt('Please enter the byte array as a string (e.g., "[123, 34, 110, ...]"): ');
    // Parse the byte array string input
    let byteArray;
    try {
        byteArray = JSON.parse(byteArrayString);
    }
    catch (error) {
        console.error('Invalid byte array string.');
        return;
    }
    // Convert byte array to JSON string
    const jsonString = (0, DATADESRIAL_1.byteArrayToJson)(byteArray);
    // Display the result
    console.log('JSON String:', jsonString);
}
// Run the function
getUserInputAndProcess();
