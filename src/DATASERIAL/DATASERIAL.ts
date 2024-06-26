export function jsonToString(jsonMessage: any): string {
    return JSON.stringify(jsonMessage);
}

export function stringToBytes(str: string): number[] {
    const bytes: number[] = [];

    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);

        if (charCode < 0x80) {
            bytes.push(charCode);
        } else if (charCode < 0x800) {
            bytes.push(0xc0 | (charCode >> 6));
            bytes.push(0x80 | (charCode & 0x3f));
        } else if (charCode < 0x10000) {
            bytes.push(0xe0 | (charCode >> 12));
            bytes.push(0x80 | ((charCode >> 6) & 0x3f));
            bytes.push(0x80 | (charCode & 0x3f));
        } else {
            bytes.push(0xf0 | (charCode >> 18));
            bytes.push(0x80 | ((charCode >> 12) & 0x3f));
            bytes.push(0x80 | ((charCode >> 6) & 0x3f));
            bytes.push(0x80 | (charCode & 0x3f));
        }
    }

    return bytes;
}



export function jsonToByteArray(jsonMessage: any): string {
    const jsonString: string = jsonToString(jsonMessage);
    
    const byteArray: number[] = jsonString.split('').map((char) => char.charCodeAt(0));
    
    const formattedByteArray: string = '[' + byteArray.join(', ') + ']';
    
    return formattedByteArray;
}

