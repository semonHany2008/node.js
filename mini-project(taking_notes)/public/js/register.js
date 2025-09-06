let alertMessage = document.getElementById("alertMessage");

function handleSubmit(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;

  fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email, firstName, lastName }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true); 
        return;
      }
      showAlert(`token: ${data.session.token}`,false);
      localStorage.setItem('token',data.session.token);
      window.location.href = `/?token=${data.session.token}`;
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