const fetchPostRequest = async (url, body) => {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      username: process.env.USERNAME_SERVER,
      password: process.env.PASSWORD_SERVER,
    },
    body:JSON.stringify(body),
    credentials:"include"
  });

  let data= await response.json();
  return data
};

const fetchGetRequest = async (url, token) => {
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      username: process.env.USERNAME_SERVER,
      password: process.env.PASSWORD_SERVER,
      token
    },
    credentials:"include"
  });

  let data= await response.json();
  return data;
};

module.exports = {fetchPostRequest, fetchGetRequest};
