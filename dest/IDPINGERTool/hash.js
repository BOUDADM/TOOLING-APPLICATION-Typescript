"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customHash = void 0;
function customHash(hour, minute) {
    let hash = hour;
    hash = (hash << 7) ^ minute;
    hash = (hash << 3) ^ (hash >>> 11); // Use logical right shift (>>>) instead of arithmetic right shift (>>)
    return hash;
}
exports.customHash = customHash;
