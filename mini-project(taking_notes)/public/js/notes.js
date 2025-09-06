let alertMessage = document.getElementById("alertMessage");

function deleteNote(noteId) {
  let token = localStorage.getItem("token");
  fetch(`/notes/${noteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: token },
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true);
        return;
      }
      showAlert("note deleted successfully!", false);
      document.getElementById(noteId).remove();
    })
    .catch((err) => {
      showAlert(err.message, true);
    });
}

function revealCreationInputs() {
  document.getElementById("creation_update_inputs").style.display = "flex";
  document
    .getElementById("creation_update_btn")
    .addEventListener("click", createNote);
}

function createNote() {
  let token = localStorage.getItem("token");
  let noteTitle = document.getElementById("title").value.trim();
  let noteContent = document.getElementById("content").value.trim();
  let noteCategoryName = document.getElementById("category_name").value.trim();

  fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: token },
    body: JSON.stringify({
      title: noteTitle,
      content: noteContent,
      categoryName: noteCategoryName,
    }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true);
        return;
      }
      let newnoteContainer = document.createElement("div");
      newnoteContainer.className = "note-card";
      newnoteContainer.id = data._id;

      let title = document.createElement("h2");
      title.textContent = data.title;

      let content = document.createElement("p");
      content.textContent = data.content;

      let categoryName = document.createElement("h3");
      categoryName.textContent = data.categoryName;

      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteNote(data._id); //when using assignment to "deleteNote(data._id)" directly, This will immediately executes deleteNote instead of waiting for a click.

      let updateBtn = document.createElement("button");
      updateBtn.textContent = "update";
      updateBtn.onclick = () => revealUpdateChoices(data._id);

      newnoteContainer.append(
        title,
        content,
        categoryName,
        deleteBtn,
        updateBtn
      );
      let creationBtn = document.querySelector(
        "button[onclick='revealCreationInputs()']"
      );
      document
        .querySelector(".container")
        .insertBefore(newnoteContainer, creationBtn);

      showAlert(`note ${data.title} created successfully!`);
      document.getElementById("creation_update_inputs").style.display = "none";
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      document.getElementById("category_name").value = "";
    })
    .catch((err) => {
      showAlert(err.message, true);
    });
}

function revealUpdateChoices(noteId) {
  document.getElementById("update_choices").style.display = "flex";
  document
    .getElementById("update_partially")
    .addEventListener("click", () => revealUpdateInputs(noteId, "PATCH"));
  document
    .getElementById("update_totally")
    .addEventListener("click", () => revealUpdateInputs(noteId, "PUT"));
}

function hideUpdateChoices() {
  document.getElementById("update_choices").style.display = "none";
}

function revealUpdateInputs(noteId, type) {
  document.getElementById("update_choices").style.display = "none";
  document.getElementById("creation_update_inputs").style.display = "flex";
  document
    .getElementById("creation_update_btn")
    .addEventListener("click", () => updateNote(noteId, type));
}

function hideCreateUpdateInputs() {
  document.getElementById("creation_update_inputs").style.display = "none";

}

function updateNote(noteId, type) {
  let token = localStorage.getItem("token");
  let noteTitle = document.getElementById("title").value.trim();
  let noteContent = document.getElementById("content").value.trim();
  let noteCategoryName = document.getElementById("category_name").value.trim();

  fetch(`/notes/${noteId}`, {
    method: type,
    headers: { "Content-Type": "application/json", token: token },
    body: JSON.stringify({
      title: noteTitle,
      content: noteContent,
      categoryName: noteCategoryName,
    }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true);
        return;
      }
      let updatedNote = document.getElementById(noteId);
      updatedNote.getElementsByTagName("h2")[0].textContent = data.title;
      updatedNote.getElementsByTagName("p")[0].textContent = data.content;
      updatedNote.getElementsByTagName("h3")[0].textContent = data.categoryName;

      showAlert(`note ${data.title} updated successfully!`);
      document.getElementById("creation_update_inputs").style.display = "none";
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      document.getElementById("category_name").value = "";
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
