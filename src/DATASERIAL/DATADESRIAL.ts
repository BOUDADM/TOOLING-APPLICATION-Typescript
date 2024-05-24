export {};

export function byteArrayToJson(byteArray: number[]): string {
    let jsonString: string = '';
    
    for (let i = 0; i < byteArray.length; i++) {
        jsonString += String.fromCharCode(byteArray[i]);
    }
    
    return jsonString;
}
