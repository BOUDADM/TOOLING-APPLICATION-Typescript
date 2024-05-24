import { customHash } from './hash';
import { encryptWord } from './Encryption';

const wordList: string[] = [
    "Apple","Banana","Orange","Mango","Pineapple","Grape","Kiwi","Peach","Plum","Cherry","Strawberry","Raspberry","Blueberry","Blackberry","Watermelon","Cantaloupe","Honeydew","Coconut","Papaya","Guava","Apricot","Fig","Pear","Lemon","Lime","Grapefruit","Avocado","Pomegranate","Lychee","Passionfruit","Dragonfruit","Jackfruit","Rambutan","Durian","Persimmon","Kumquat","Tangerine","Cranberry","Clementine","Nectarine","Tamarillo","Quince","Ugli fruit","Ackee","Bilberry","Feijoa","Gac","Loquat","Pawpaw","Pineberry","Salak","Yangmei","Acai","Camu camu","Noni","Plantain","Prickly pear","Tamarind","Yuzu","Barberry","Blackcurrant","Boysenberry","Cloudberry","Goji berry","Huckleberry","Juniper berry","Loganberry","Salmonberry","Seaberry","Sloe","Bearberry","Bilberry","Cowberry","Crowberry","Elderberry","Garden huckleberry","Gooseberry","Jostaberry","Mulberry","Redcurrant","White currant","Raspberry","Salal berry","Sea grape","Sunberry","Acerola","Bacupari","Black sapote","Burahem","Canistel","Cupuaçu","Duku","Jabuticaba","Langsat","Mamey sapote","Mangaba","Mangosteen","Mombin","Sapodilla","Soursop","Star apple","Surinam cherry","Umbu","Wood apple" 
    // Add the remaining fruits from your C++ code here
];

const date: Date = new Date();
const hour: number = date.getHours();
const minute: number = date.getMinutes();

const secureIndex: number = customHash(hour, minute) % 100;
console.log("Secure Index:", secureIndex);

const selectedWordProxy: string = wordList[secureIndex];
const selectedWordProvider: string | undefined = wordList[secureIndex]; // Make it optional

if (selectedWordProvider) { // Check if it's defined
    const encryptedWordProvider: string = encryptWord(selectedWordProvider, -5);
    console.log("Encrypted word sent to proxy:", encryptedWordProvider);

    let determinedShift: number = -1;
    for (let i = -25; i <= 25; ++i) {
        const encryptedWordProxy: string = encryptWord(selectedWordProxy, i);
        if (encryptedWordProxy === encryptedWordProvider) {
            determinedShift = i;
            break;
        }
    }

    console.log("Determined shift value:", determinedShift >= -25 && determinedShift <= 25 ?
        "Proxy successfully determined the shift value: " + determinedShift :
        "Proxy failed to determine the shift value.");
} else {
    console.error("Selected word provider is undefined.");
}
