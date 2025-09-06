let alertMessage = document.getElementById("alertMessage");

function handleSubmit(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  fetch("/auth/login/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true);
        return;
      }
      console.log("Response data:", data);
      if (data.foundUser && data.foundUser.otp) {
        showAlert(`OTP: ${data.foundUser.otp}`,false);
        document.getElementById("Login_verify").style.display = "flex";
      } else if (data.session && data.session.token) {
        showAlert(`token: ${data.session.token}`,false);
        localStorage.setItem("token", data.session.token);
        window.location.href = `/?token=${data.session.token}`;
      }
    })
    .catch((err) => {
      showAlert(err.message,true);
    });
}
//.catch() here catch the network connection errors not from the express server whose handled by checking res.ok manually.

function showAlert(message, isError) {
  alertMessage.textContent = message;
  alertMessage.style.color = isError ? "red" : "green";
  setTimeout(() => {
    alertMessage.textContent = "";
  }, 5000);
}