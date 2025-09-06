function handleSubmit(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let alertMessage = document.getElementById("alertMessage");

  fetch("/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        alertMessage.textContent = data.message;
        return;
      }
      alertMessage.textContent = `passwordResetToken: ${data.passwordResetToken}, will expire after 5 minutes`;
      document.getElementById("reset_password").style.display = "block";
    })
    .catch((err) => {
      alertMessage.textContent = err.message;
    });
}
