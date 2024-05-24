"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EulerRotation_1 = __importDefault(require("./EulerRotation"));
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("Enter the object coordinates (x y z): ");
let objectX, objectY, objectZ;
rl.question('', (input) => {
    [objectX, objectY, objectZ] = input.split(' ').map(Number);
    console.log("Enter Euler angles (in degrees) (angleX angleY angleZ): ");
    let angleX, angleY, angleZ;
    rl.question('', (input) => {
        [angleX, angleY, angleZ] = input.split(' ').map(Number);
        angleX *= Math.PI / 180.0;
        angleY *= Math.PI / 180.0;
        angleZ *= Math.PI / 180.0;
        console.log("Enter the order of transformation (e.g., XYZ, YZX, ...): ");
        let order;
        rl.question('', (input) => {
            order = input.trim();
            console.log("Enter the translation vector (tx ty tz): ");
            let tx, ty, tz;
            rl.question('', (input) => {
                [tx, ty, tz] = input.split(' ').map(Number);
                let rotationX = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
                EulerRotation_1.default.Pitch(angleX, rotationX);
                let rotationY = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
                EulerRotation_1.default.Roll(angleY, rotationY);
                let rotationZ = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
                EulerRotation_1.default.Yaw(angleZ, rotationZ);
                let transformationMatrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
                if (order === "XYZ") {
                    EulerRotation_1.default.multiplyThreeMatrices(rotationX, rotationY, rotationZ, transformationMatrix);
                }
                else if (order === "ZYX") {
                    EulerRotation_1.default.multiplyThreeMatrices(rotationZ, rotationY, rotationX, transformationMatrix);
                }
                else if (order === "YXZ") {
                    EulerRotation_1.default.multiplyThreeMatrices(rotationY, rotationX, rotationZ, transformationMatrix);
                }
                else if (order === "XZY") {
                    EulerRotation_1.default.multiplyThreeMatrices(rotationX, rotationZ, rotationY, transformationMatrix);
                }
                else if (order === "YZX") {
                    EulerRotation_1.default.multiplyThreeMatrices(rotationY, rotationZ, rotationX, transformationMatrix);
                }
                else if (order === "ZXY") {
                    EulerRotation_1.default.multiplyThreeMatrices(rotationZ, rotationX, rotationY, transformationMatrix);
                }
                else {
                    console.log("Invalid transformation order.");
                    process.exit(1);
                }
                let translationMatrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
                EulerRotation_1.default.createTranslation(tx, ty, tz, translationMatrix);
                console.log("Rotation matrix around X axis:");
                EulerRotation_1.default.printMatrix(rotationX);
                console.log("\nRotation matrix around Y axis:");
                EulerRotation_1.default.printMatrix(rotationY);
                console.log("\nRotation matrix around Z axis:");
                EulerRotation_1.default.printMatrix(rotationZ);
                console.log("\nTransformation matrix:");
                EulerRotation_1.default.printMatrix(transformationMatrix);
                let objectPosition = [objectX, objectY, objectZ, 1];
                let transformedPosition = [];
                EulerRotation_1.default.multiplyMatrixVector(transformationMatrix, objectPosition, transformedPosition);
                console.log("\nNew coordinate system after rotation:");
                console.log(`x = ${transformedPosition[0]}, y = ${transformedPosition[1]}, z = ${transformedPosition[2]}`);
                transformedPosition[0] += tx;
                transformedPosition[1] += ty;
                transformedPosition[2] += tz;
                console.log("\nNew coordinate after translation and rotation:");
                console.log(`x = ${transformedPosition[0]}, y = ${transformedPosition[1]}, z = ${transformedPosition[2]}`);
                rl.close();
            });
        });
    });
});
