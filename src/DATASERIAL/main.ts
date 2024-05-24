// main.ts

import { jsonToByteArray } from './DATASERIAL';
const prompt = require('prompt-sync')();

// Function to get user input and process it
function getUserInputAndProcess() {
    const jsonString = prompt('Please enter a JSON string: ');

    // Parse the JSON string input
    let jsonObject: any;
    try {
        jsonObject = JSON.parse(jsonString);
    } catch (error) {
        console.error('Invalid JSON string.');
        return;
    }

    // Convert JSON object to string and byte array
    const jsonStringOutput: string = JSON.stringify(jsonObject);
    const byteArray: string = jsonToByteArray(jsonObject);

    // Display the results
    console.log('JSON String: ', jsonStringOutput);
    console.log('Byte Array: ', byteArray);
}

// Run the function
getUserInputAndProcess();
