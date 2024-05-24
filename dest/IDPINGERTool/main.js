"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = require("./hash");
const Encryption_1 = require("./Encryption");
const wordList = [
    "Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape", "Kiwi", "Peach", "Plum", "Cherry", "Strawberry", "Raspberry", "Blueberry", "Blackberry", "Watermelon", "Cantaloupe", "Honeydew", "Coconut", "Papaya", "Guava", "Apricot", "Fig", "Pear", "Lemon", "Lime", "Grapefruit", "Avocado", "Pomegranate", "Lychee", "Passionfruit", "Dragonfruit", "Jackfruit", "Rambutan", "Durian", "Persimmon", "Kumquat", "Tangerine", "Cranberry", "Clementine", "Nectarine", "Tamarillo", "Quince", "Ugli fruit", "Ackee", "Bilberry", "Feijoa", "Gac", "Loquat", "Pawpaw", "Pineberry", "Salak", "Yangmei", "Acai", "Camu camu", "Noni", "Plantain", "Prickly pear", "Tamarind", "Yuzu", "Barberry", "Blackcurrant", "Boysenberry", "Cloudberry", "Goji berry", "Huckleberry", "Juniper berry", "Loganberry", "Salmonberry", "Seaberry", "Sloe", "Bearberry", "Bilberry", "Cowberry", "Crowberry", "Elderberry", "Garden huckleberry", "Gooseberry", "Jostaberry", "Mulberry", "Redcurrant", "White currant", "Raspberry", "Salal berry", "Sea grape", "Sunberry", "Acerola", "Bacupari", "Black sapote", "Burahem", "Canistel", "Cupuaçu", "Duku", "Jabuticaba", "Langsat", "Mamey sapote", "Mangaba", "Mangosteen", "Mombin", "Sapodilla", "Soursop", "Star apple", "Surinam cherry", "Umbu", "Wood apple"
    // Add the remaining fruits from your C++ code here
];
const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const secureIndex = (0, hash_1.customHash)(hour, minute) % 100;
console.log("Secure Index:", secureIndex);
const selectedWordProxy = wordList[secureIndex];
const selectedWordProvider = wordList[secureIndex]; // Make it optional
if (selectedWordProvider) { // Check if it's defined
    const encryptedWordProvider = (0, Encryption_1.encryptWord)(selectedWordProvider, -5);
    console.log("Encrypted word sent to proxy:", encryptedWordProvider);
    let determinedShift = -1;
    for (let i = -25; i <= 25; ++i) {
        const encryptedWordProxy = (0, Encryption_1.encryptWord)(selectedWordProxy, i);
        if (encryptedWordProxy === encryptedWordProvider) {
            determinedShift = i;
            break;
        }
    }
    console.log("Determined shift value:", determinedShift >= -25 && determinedShift <= 25 ?
        "Proxy successfully determined the shift value: " + determinedShift :
        "Proxy failed to determine the shift value.");
}
else {
    console.error("Selected word provider is undefined.");
}
