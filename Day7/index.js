/*promise overview */
// let x = 5;
// let promise_1 = new Promise((resolve, rejected) => {
//   if (x < 10) {
//     resolve("Done1!");
//   } else {
//     rejected("Error1!");
//   }
// });

// // promise_1
// //   .then((res) => {
// //     console.log(res);
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// let promise_2 = new Promise((resolve, rejected) => {
//   if (x === 5) {
//     resolve("Done2!");
//   } else {
//     rejected("Error2!");
//   }
// });

// let promise_3 = new Promise((resolve, rejected) => {
//   if (x < 40) {
//     resolve("Done3!");
//   } else {
//     rejected("Error3!");
//   }
// });

// Promise.all([promise_1, promise_2, promise_3])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   }); /*this method used to compine the resolves of all the promises passed inside the array
//   ,but if an error catched from any of them it catches the very first one only*/

// Promise.race([promise_1, promise_2, promise_3])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((rej) => {
//     console.log(rej);
//   }); //console the first promise return ,either resolve or reject

// Promise.any([promise_1, promise_2, promise_3])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((rej) => {
//     console.log(rej);
//   }); /*this method used to compine the rejects of all the promises passed inside the array
//   ,but if a resolve catched from any of them it catches the very first one only*/

// Promise.resolve([promise_1, promise_2, promise_3]).then((res) => {
//   for (let promise of res)
//     promise.then((res2) => {
//       console.log(res2);
//     });
// }); /*this method work only if all the passed promises return resolve(), but its resolve return array of pending promises, throw error when using .catch() with*/

// Promise.reject([promise_1, promise_2, promise_3]).catch((rej) => {
//   for (let promise of rej)
//     promise.catch((rej2) => {
//       console.log(rej2);
//     });
// }); /*this method resolve if it find any promise resolve, but it reject if all rejected. thrw error when using .then() with*/

/*manual-handled promise with .then().then()*/
// let name = "semon";
// let promise = new Promise((res, rej) => {
//   if (name == "areej") res("welcome " + name);
//   else rej("you're not authorized!");
// });

// promise
//   .then((res) => {
//     return (res += "ahmed");
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

/*fetch() returned promise handling */
fetch("https://dummyjson.com/posts")
  .then((res) => {
    // let data = res.json();
    // console.log(data);
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
//res.json() return a promise so it must be executed by (.then) before printing.
//.catch() with two .then() catch any error returned by any of them.

/*task1 */
// // create a function that resolves after 1 second
// function delayValue(value, ms) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res(value);
//     }, ms);
//   });
// }

// // create a function that rejects after 1 second
// function delayFail(value, ms) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       rej(value);
//     }, ms);
//   });
// }

// delayValue("semon", 1000).then((res) => {
//   console.log(res);
// });

// delayFail("rejected", 1000)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((rej) => {
//     console.log(rej);
//   });

// Task 2 — promisifyQuestion(rl, question)
// Wrap readline.question into a Promise that resolves with the
// user's trimmed answer, or rejects if something goes wrong.
// (No async/await; use new Promise + rl.question)

// function promisifyQuestion(rl, question) {
//   let promise = new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       answer = answer.trim();

//       if (answer.toLowerCase() === "joy") {
//         resolve(answer);
//       } else reject(answer);
//       rl.close();
//     });
//   });
//   return promise;
// }

// const readline = require("node:readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// promisifyQuestion(rl, "what's your name: ")
//   .then((res) => {
//     console.log("accepted: ", res);
//   })
//   .catch((rej) => {
//     console.log("rejected:", rej);
//   });
