let x = 5;
let promise_1 = new Promise((resolve, rejected) => {
  if (x < 10) {
    resolve("Done1!");
  } else {
    rejected("Error1!");
  }
});

// promise_1
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

let promise_2 = new Promise((resolve, rejected) => {
  if (x === 5) {
    resolve("Done2!");
  } else {
    rejected("Error2!");
  }
});

let promise_3 = new Promise((resolve, rejected) => {
  if (x < 40) {
    resolve("Done3!");
  } else {
    rejected("Error3!");
  }
});

Promise.all([promise_1, promise_2, promise_3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); /*this method used to compine the resolves of all the promises passed inside the array
  ,but if an error catched from any of them it catches the very first one only*/
