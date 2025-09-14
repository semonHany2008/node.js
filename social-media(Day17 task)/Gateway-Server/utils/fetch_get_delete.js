const fetchGetDelete = async (url, method, token) => {
  let response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      token,
      username: process.env.SERVER_USERNAME,
      password: process.env.SERVER_PASSWORD
    },
    credentials:"include"
  });

  let data=await response.json();
  return data;
};

module.exports = fetchGetDelete;
