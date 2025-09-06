let alertMessage = document.getElementById("alertMessage");

function revealChangePassModal() {
  document.getElementById("changePassModal").style.display = "flex";
}

function changePassword() {
  let token = localStorage.getItem("token");

  let oldPassword = document.getElementById("oldPassword").value.trim();
  let newPassword = document.getElementById("newPassword").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();

  fetch("/profile/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: token },
    body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true);
        return;
      }
      document.getElementById("password").textContent = data.newPassword;
      showAlert(data.message, false);

      document.getElementById("changePassModal").style.display = "none";
      document.getElementById("oldPassword").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
    })
    .catch((err) => {
      showAlert(err.message, true);
    });
}

function hideChangePassModal() {
  document.getElementById("changePassModal").style.display = "none";
}

function revealChangeNameModal() {
  document.getElementById("changeNameModal").style.display = "flex";
}

function changeName() {
  let token = localStorage.getItem("token");

  let firstName = document.getElementById("firstNameInput").value.trim();
  let lastName = document.getElementById("lastNameInput").value.trim();

  fetch("/profile/change-first-last-name", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: token },
    body: JSON.stringify({ firstName, lastName }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true);
        return;
      }
      if (data.firstName)
        document.getElementById("firstName").textContent = data.firstName;
      if (data.lastName)
        document.getElementById("lastName").textContent = data.lastName;

      showAlert(data.message, false);

      document.getElementById("changeNameModal").style.display = "none";
      document.getElementById("firstNameInput").value = "";
      document.getElementById("lastNameInput").value = "";
    })
    .catch((err) => {
      showAlert(err.message, true);
    });
}

function hideChangeNameModal() {
  document.getElementById("changeNameModal").style.display = "none";
}

function enable_otp() {
  let token = localStorage.getItem("token");
  let value = document.querySelector("select[name='enable_otp']").value;

  fetch("/profile/enable-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: token },
    body: JSON.stringify({ enableOtp: value }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true);
        return;
      }

      showAlert(data.message, false);
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
