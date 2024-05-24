import EulerRotation from "./EulerRotation";
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Enter the object coordinates (x y z): ");
let objectX: number, objectY: number, objectZ: number;

rl.question('', (input) => {
  [objectX, objectY, objectZ] = input.split(' ').map(Number);

  console.log("Enter Euler angles (in degrees) (angleX angleY angleZ): ");
  let angleX: number, angleY: number, angleZ: number;

  rl.question('', (input) => {
    [angleX, angleY, angleZ] = input.split(' ').map(Number);
    angleX *= Math.PI / 180.0;
    angleY *= Math.PI / 180.0;
    angleZ *= Math.PI / 180.0;

    console.log("Enter the order of transformation (e.g., XYZ, YZX, ...): ");
    let order: string;

    rl.question('', (input) => {
      order = input.trim();

      console.log("Enter the translation vector (tx ty tz): ");
      let tx: number, ty: number, tz: number;

      rl.question('', (input) => {
        [tx, ty, tz] = input.split(' ').map(Number);

        let rotationX: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        EulerRotation.Pitch(angleX, rotationX);

        let rotationY: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        EulerRotation.Roll(angleY, rotationY);

        let rotationZ: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        EulerRotation.Yaw(angleZ, rotationZ);

        let transformationMatrix: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        if (order === "XYZ") {
          EulerRotation.multiplyThreeMatrices(rotationX, rotationY, rotationZ, transformationMatrix);
        } else if (order === "ZYX") {
          EulerRotation.multiplyThreeMatrices(rotationZ, rotationY, rotationX, transformationMatrix);
        } else if (order === "YXZ") {
          EulerRotation.multiplyThreeMatrices(rotationY, rotationX, rotationZ, transformationMatrix);
        } else if (order === "XZY") {
          EulerRotation.multiplyThreeMatrices(rotationX, rotationZ, rotationY, transformationMatrix);
        } else if (order === "YZX") {
          EulerRotation.multiplyThreeMatrices(rotationY, rotationZ, rotationX, transformationMatrix);
        } else if (order === "ZXY") {
          EulerRotation.multiplyThreeMatrices(rotationZ, rotationX, rotationY, transformationMatrix);
        } else {
          console.log("Invalid transformation order.");
          process.exit(1);
        }

        let translationMatrix: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        EulerRotation.createTranslation(tx, ty, tz, translationMatrix);

        console.log("Rotation matrix around X axis:");
        EulerRotation.printMatrix(rotationX);
        console.log("\nRotation matrix around Y axis:");
        EulerRotation.printMatrix(rotationY);
        console.log("\nRotation matrix around Z axis:");
        EulerRotation.printMatrix(rotationZ);

        console.log("\nTransformation matrix:");
        EulerRotation.printMatrix(transformationMatrix);

        let objectPosition: number[] = [objectX, objectY, objectZ, 1];
        let transformedPosition: number[] = [];
        EulerRotation.multiplyMatrixVector(transformationMatrix, objectPosition, transformedPosition);

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
