let alertMessage = document.getElementById("alertMessage");

function handleSubmit(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let otpCode = document.getElementById("otpCode").value;
  fetch("/auth/login/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, otpCode }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) showAlert(data.message, true);
      return data;
    })
    .then((data) => {
      // alertMessage.textContent=`token: ${data.session.token}`;
      localStorage.setItem("token", data.session.token);
      window.location.href = `/?token=${data.session.token}`;
    })
    .catch((err) => {
      showAlert(err.message, true);
    });
}

function showAlert(message, isError) {
  alertMessage.textContent = message;
  alertMessage.style.color = isError ? "red" : "green";
  setTimeout(() => {
    alertMessage.textContent = "";
  }, 5000);
}
