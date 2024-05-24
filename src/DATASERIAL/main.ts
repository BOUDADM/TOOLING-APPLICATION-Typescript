import { jsonToByteArray } from './DATASERIAL';
const prompt = require('prompt-sync')();

function getUserInputAndProcess() {
    const jsonString = prompt('Please enter a JSON string: ');

    let jsonObject: any;
    try {
        jsonObject = JSON.parse(jsonString);
    } catch (error) {
        console.error('Invalid JSON string.');
        return;
    }

    const jsonStringOutput: string = JSON.stringify(jsonObject);
    const byteArray: string = jsonToByteArray(jsonObject);

    console.log('JSON String: ', jsonStringOutput);
    console.log('Byte Array: ', byteArray);
}

getUserInputAndProcess();
