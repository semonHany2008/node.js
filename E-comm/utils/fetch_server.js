const path = require("path");
require("dotenv").config(path.join(__dirname, "../.env"));

const fetchServer = async (url, method, body) => {
  if (!body) {
    body = {};
  }
  let response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      username: process.env.USERNAME_SERVER,
      password: process.env.PASSWORD_SERVER,
    },
    body:JSON.stringify(body),
  });

  return await response.json();
};

module.exports = fetchServer;
