"use strict";
// eulerrotation.ts
Object.defineProperty(exports, "__esModule", { value: true });
class EulerRotation {
    static Pitch(angle, rotation) {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        rotation[0][0] = 1;
        rotation[0][1] = 0;
        rotation[0][2] = 0;
        rotation[0][3] = 0;
        rotation[1][0] = 0;
        rotation[1][1] = cosA;
        rotation[1][2] = -sinA;
        rotation[1][3] = 0;
        rotation[2][0] = 0;
        rotation[2][1] = sinA;
        rotation[2][2] = cosA;
        rotation[2][3] = 0;
        rotation[3][0] = 0;
        rotation[3][1] = 0;
        rotation[3][2] = 0;
        rotation[3][3] = 1;
    }
    static Roll(angle, rotation) {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        rotation[0][0] = cosA;
        rotation[0][1] = 0;
        rotation[0][2] = sinA;
        rotation[0][3] = 0;
        rotation[1][0] = 0;
        rotation[1][1] = 1;
        rotation[1][2] = 0;
        rotation[1][3] = 0;
        rotation[2][0] = -sinA;
        rotation[2][1] = 0;
        rotation[2][2] = cosA;
        rotation[2][3] = 0;
        rotation[3][0] = 0;
        rotation[3][1] = 0;
        rotation[3][2] = 0;
        rotation[3][3] = 1;
    }
    static Yaw(angle, rotation) {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        rotation[0][0] = cosA;
        rotation[0][1] = -sinA;
        rotation[0][2] = 0;
        rotation[0][3] = 0;
        rotation[1][0] = sinA;
        rotation[1][1] = cosA;
        rotation[1][2] = 0;
        rotation[1][3] = 0;
        rotation[2][0] = 0;
        rotation[2][1] = 0;
        rotation[2][2] = 1;
        rotation[2][3] = 0;
        rotation[3][0] = 0;
        rotation[3][1] = 0;
        rotation[3][2] = 0;
        rotation[3][3] = 1;
    }
    static createTranslation(tx, ty, tz, translation) {
        translation[0][0] = 1;
        translation[0][1] = 0;
        translation[0][2] = 0;
        translation[0][3] = tx;
        translation[1][0] = 0;
        translation[1][1] = 1;
        translation[1][2] = 0;
        translation[1][3] = ty;
        translation[2][0] = 0;
        translation[2][1] = 0;
        translation[2][2] = 1;
        translation[2][3] = tz;
        translation[3][0] = 0;
        translation[3][1] = 0;
        translation[3][2] = 0;
        translation[3][3] = 1;
    }
    static multiplyMatrices(mat1, mat2, result) {
        for (let i = 0; i < 4; ++i) {
            result[i] = []; // Initialize each row of the result matrix
            for (let j = 0; j < 4; ++j) {
                result[i][j] = 0; // Initialize the result element before adding values to it
                for (let k = 0; k < 4; ++k) {
                    result[i][j] += mat1[i][k] * mat2[k][j];
                }
            }
        }
    }
    static multiplyThreeMatrices(mat1, mat2, mat3, result) {
        const multipl1 = [];
        this.multiplyMatrices(mat1, mat2, multipl1);
        this.multiplyMatrices(multipl1, mat3, result);
    }
    static printMatrix(matrix) {
        for (let i = 0; i < 4; ++i) {
            let row = "";
            for (let j = 0; j < 4; ++j) {
                row += matrix[i][j] + " ";
            }
            console.log(row);
        }
    }
    static multiplyMatrixVector(X, Y, result) {
        for (let i = 0; i < 4; ++i) {
            result[i] = 0;
            for (let j = 0; j < 4; ++j) {
                result[i] += X[i][j] * Y[j];
            }
        }
    }
}
exports.default = EulerRotation;
