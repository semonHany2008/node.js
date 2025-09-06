let alertMessage = document.getElementById("alertMessage");

function handleSubmit(e) {
  e.preventDefault();
  let password_reset_token = document.getElementById("password_reset_token").value;
  let newPassword = document.getElementById("newPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  fetch(`/auth/reset-password?passwordResetToken=${password_reset_token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({newPassword, confirmPassword}),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message,true); 
        return;
      }
      showAlert(data.message,false);
    })
    .catch((err) => {
      showAlert(err.message,true);
    });
}

function showAlert(message, isError) {
  alertMessage.textContent = message;
  alertMessage.style.color = isError ? "red" : "green";
  setTimeout(() => {
    alertMessage.textContent = "";
  }, 5000);
}