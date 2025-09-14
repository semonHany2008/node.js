const fetchPostUpdate = async (url, method, token, body) => {
  let response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      token,
      username: process.env.SERVER_USERNAME,
      password: process.env.SERVER_PASSWORD
    },
    body:JSON.stringify(body),
    credentials:"include"
  });

  let data=await response.json();
  return data;
};

module.exports = fetchPostUpdate;
