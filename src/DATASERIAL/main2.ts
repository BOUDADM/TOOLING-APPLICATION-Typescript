import { byteArrayToJson } from './DATADESRIAL';
const prompt = require('prompt-sync')();

function getUserInputAndProcess() {
    const byteArrayString = prompt('Please enter the byte array as a string (e.g., "[123, 34, 110, ...]"): ');

    let byteArray: number[];
    try {
        byteArray = JSON.parse(byteArrayString);
    } catch (error) {
        console.error('Invalid byte array string.');
        return;
    }

    const jsonString: string = byteArrayToJson(byteArray);

    console.log('JSON String:', jsonString);
}

getUserInputAndProcess();
