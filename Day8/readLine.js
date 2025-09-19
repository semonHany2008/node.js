const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// rl.question("enter your name:",(username)=>{
//     fetch(`http://127.0.0.1:3000/profile?username=${username}`).then((res)=>res.json()).then((data)=>{console.log(data)}).catch((err)=>{console.log(err);});
//     rl.close();
// })

let choicesFunc = (number) => {
  if (number == 1) {
    rl.question("enter the user name: ", (username) => {
      rl.question("enter the user email: ", (email) => {
        rl.question("enter the user password: ", (password) => {
          fetch("http://127.0.0.1:3000/newUser", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              rl.question(
                "enter the number of endpoint you want to access:\n 1-newUser\n 2-existingUser\n 3-getUserData\n 4-exit\n >>",
                choicesFunc
              );
            });
        });
      });
    });
  } else if (number == 2) {
    rl.question("enter the user name: ", (username) => {
      fetch(`http://127.0.0.1:3000/existingUser?username=${username}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          rl.question(
            "enter the number of endpoint you want to access:\n 1-newUser\n 2-existingUser\n 3-getUserData\n 4-exit\n >>",
            choicesFunc
          );
        })
        .catch((err) => {
          console.log(err);
          rl.question(
            "enter the number of endpoint you want to access:\n 1-newUser\n 2-existingUser\n 3-getUserData\n 4-exit\n >>",
            choicesFunc
          );
        });
    });
  } else if (number == 3) {
    rl.question("enter the user name: ", (username) => {
      fetch(`http://127.0.0.1:3000/getUserData?username=${username}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          rl.question(
            "enter the number of endpoint you want to access:\n 1-newUser\n 2-existingUser\n 3-getUserData\n 4-exit\n >>",
            choicesFunc
          );
        })
        .catch((err) => {
          console.log(err);
          rl.question(
            "enter the number of endpoint you want to access:\n 1-newUser\n 2-existingUser\n 3-getUserData\n 4-exit\n >>",
            choicesFunc
          );
        });
    });
  } else if (number == 4) {
    rl.close();
  }
};

rl.question(
  "enter the number of endpoint you want to access:\n 1-newUser\n 2-existingUser\n 3-getUserData\n 4-exit\n >>",
  choicesFunc
);
