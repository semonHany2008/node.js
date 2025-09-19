// 1. Import the math module
// and use it in the application
let mathFunctions = require("../lib/math");
// const { fork } = require("child_process");

let readLine = require("node:readline");
let { stdin: input, stdout: output } = require("node:process");
let rl = readLine.createInterface({ input, output });

// TASK 1:
// Make simple calculator app that asks the user for operation to make
// The application will parse the given operation and call the appropriate function
// from the math module.
// The application will then print the result to the console.
// The application will then ask the user if they want to continue.
// If the user wants to continue, the application will repeat the process.
// If the user does not want to continue, the application will exit.

let operation,
  tempResult,
  operators = "+-*/";
let calcFunction = (op) => {
  operation = op;

  let opArr = operation.split("");
  let i = 1;
  while (i < opArr.length) {
    if (!operators.includes(opArr[i]) && !isNaN(opArr[i - 1])) {
      opArr[i - 1] += opArr[i];
      opArr.splice(i, 1);
    } else i++;
  }

  i = 1;
  while (opArr.length > 1) {
    if (opArr[i] === "+") {
      tempResult = mathFunctions.add(
        Number(opArr[i - 1]),
        Number(opArr[i + 1])
      );
    } else if (opArr[i] === "-") {
      tempResult = mathFunctions.subtract(
        Number(opArr[i - 1]),
        Number(opArr[i + 1])
      );
    } else if (opArr[i] === "*") {
      tempResult = mathFunctions.multiply(
        Number(opArr[i - 1]),
        Number(opArr[i + 1])
      );
    } else if (opArr[i] === "/") {
      try {
        tempResult = mathFunctions.divide(
          Number(opArr[i - 1]),
          Number(opArr[i + 1])
        );
      } catch (error) {
        console.error(error.message);
        return;
      }
    } else {
      console.error("Invalid operation");
      tempResult = null;
      return;
    }
    if (tempResult) {
      opArr.splice(i - 1, 3, tempResult);
      console.log("opArr now:", opArr);
    }
  }
  console.log("Result: ", opArr[0]);

  rl.question("Do you want to continue? (yes/no): ", (answer) => {
    if (answer.toLowerCase() === "yes") {
      rl.question("Please enter the next operation: ", calcFunction);
    } else {
      console.log("Thank you for using the calculator!");
      rl.close();
    }
  });
};

rl.question(
  "enter the arithmetic operation you want(n1+n2, n1-n2, n1*n2, n1/n2): ",
  calcFunction
);

// TASK 2 (Bouns 50 points):
// Make a guessing game that asks the user to guess a number between 0 and 50.
// The application will generate a random number between 0 and 50 using the randomTo50 function.
// The application will then ask the user to guess the number.
// The user has 5 attempts to guess the number. if the attempt is wrong, the application will print "Try again 🤔" to the console.
// If the user does not guess the number correctly 5 times, the application will print "You lost the game!! try again 🤔" to the console.
// If the user guesses the number correctly, the application will print "You won the game!! congrats 🥳🥳" to the console.

let randomNumber = mathFunctions.randomTo50();
let attempts = 5;

let quessFunction = (guess) => {
  if (Number(guess) === randomNumber) {
    console.log("You won the game!! congrats 🥳🥳");
  } else {
    attempts--;
    if (attempts == 0) {
      console.log("You lost the game!! try again 🤔");
      rl.close();
    } else {
      if (Number(guess) < randomNumber) {
        console.log("Your guess is too low! Try again 🤔");
        rl.question("Guess a number between 0 and 50: ", quessFunction);
      } else if (Number(guess) > randomNumber) {
        console.log("Your guess is too high! Try again 🤔");
        rl.question("Guess a number between 0 and 50: ", quessFunction);
      }
    }
  }
};
rl.question("Guess a number between 0 and 50: ", quessFunction);

// TASK 3 (Bouns 50 points):
// Make a function that ask the user the following questions:
// 1. What is your name?
// 2. What is your age? (if age is not a number or is less than 10, the application will print "Invalid age" and end the program)
// 3. What is the Favorite programming language
// Then after the user answers all the questions, the application will print the following.
// console.log("\n--- Summary ---");
// console.log(`Name: ${name || "(no name)"}`);
// console.log(`Age: ${age}`);
// console.log(`Favorite language: ${fav || "(not specified)"}`);
// console.log("----------------\n");

// rl.question("What is your name? ", (name) => {
//   rl.question("What is your age? ", (age) => {
//     if (isNaN(age) || age < 10) {
//       console.log("Invalid age");
//       rl.close();
//       return;
//     }
//     rl.question("What is your favorite programming language? ", (fav) => {
//       console.log("\n--- Summary ---");
//       console.log(`Name: ${name || "(no name)"}`);
//       console.log(`Age: ${age}`);
//       console.log(`Favorite language: ${fav || "(not specified)"}`);
//       console.log("----------------\n");
//       rl.close();
//     });
//   });
// });

//while i try to use while loop or require('child_process').fork('__filename') in task 1,2 it doesn't work, so we used recursion function.
