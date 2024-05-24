export function customHash(hour: number, minute: number): number {
    let hash: number = hour;
    hash = (hash << 7) ^ minute;
    hash = (hash << 3) ^ (hash >>> 11); // Use logical right shift (>>>) instead of arithmetic right shift (>>)
    return hash;
}
