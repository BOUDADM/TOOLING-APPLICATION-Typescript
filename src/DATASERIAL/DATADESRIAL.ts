// datadeserial.ts

export {};

// Function to convert byte array to JSON string
export function byteArrayToJson(byteArray: number[]): string {
    let jsonString: string = '';
    
    // Iterate through each byte in the array
    for (let i = 0; i < byteArray.length; i++) {
        // Convert the byte into a character and append it to the string
        jsonString += String.fromCharCode(byteArray[i]);
    }
    
    return jsonString;
}
