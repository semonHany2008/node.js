// const serverFile = require("./server.js");
// console.log(serverFile(5, 10));

//get input from user
let name, age, email, password;
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process"); //connect to node built-in process library

let RI = readline.createInterface({ input, output });
RI.question("please, enter your name: ", (n) => {
  name = n;
  RI.question("please, enter your age: ", (a) => {
    age = a;
    RI.question("please, enter your email: ", (e) => {
      email = e;
      RI.question("please, enter your password: ", (p) => {
        password = p;
        console.log(
          `Hello ${name}, your age is ${age}, your email is ${email} and your password is ${password}`
        );
        RI.close();
      });
    });
  });
});

RI.question("what's your favourite novel:", (novel) => {
  console.log(`${novel} is really great!`);
  RI.close();
}); /*won't appear at all even if the previous interface question wasn't closed.
so it must always be nested questions*/

//create node server
let http = require("http"); //built-in node library
let server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world!");
    res.end();
  } else if (req.url === "/login") {
    res.write("Login page");
    res.end();
  } else {
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("server is running ...");
}); //mostly used ports:3000,5000,8000
