/**
 * This function adds two numbers together.
 *
 * @param {number} a
 *     This is the first number to add.
 *
 * @param {number} b
 *     This is the second number to add.
 *
 * @returns {number}
 *     The sum of the two numbers.
 */
function add(a, b) {
  return a + b;
}

/**
 * This function subtracts two numbers.
 *
 * @param {number} a
 *     This is the first number to subtract.
 *
 * @param {number} b
 *     This is the second number to subtract.
 *
 * @returns {number}
 *     The difference of the two numbers.
 */
function subtract(a, b) {
  return a - b;
}

/**
 * This function multiplies two numbers.
 *
 * @param {number} a
 *     This is the first number to multiply.
 *
 * @param {number} b
 *     This is the second number to multiply.
 *
 * @returns {number}
 *     The product of the two numbers.
 */
function multiply(a, b) {
  return a * b;
}

/**
 * This function divides two numbers and throws an error if the second number is
 * zero.
 *
 * @param {number} a
 *     This is the first number to divide.
 *
 * @param {number} b
 *     This is the second number to divide.
 *
 * @returns {number}
 *     The quotient of the two numbers.
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

/**
 * This function generates a random integer between two numbers. If the first
 * number is greater than the second number, the two numbers are swapped.
 *
 * @param {number} min
 *     This is the first number to generate a random integer between.
 *
 * @param {number} max
 *     This is the second number to generate a random integer between.
 *
 * @returns {number}
 *     A random integer between the two numbers.
 */
function randomInt(min, max) {
  if (min >= max) {
    // throw new Error("min must be less than max");
    let temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * This function generates a random integer between 0 and 50.
 *
 * @returns {number}
 *     A random integer between 0 and 50.
 */
function randomTo50() {
  return Math.floor(Math.random() * 50);
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  randomInt,
  randomTo50,
};
