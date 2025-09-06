let alertMessage = document.getElementById("alertMessage");

function deleteCategory(categoryId) {
  let token = localStorage.getItem("token");
  fetch(`/categories/${categoryId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: token },
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true);
        return;
      }
      showAlert("category deleted successfully!", false);
      document.getElementById(categoryId).remove();
    })
    .catch((err) => {
      showAlert(err.message, true);
    });
}

function revealCreationInput() {
  document.getElementById("creation_group").style.display = "flex";
}

function createCategory() {
  let token = localStorage.getItem("token");
  let categoryName = document.getElementById("name").value.trim();
  if (!categoryName) {
    showAlert("Category name is required!", true);
    return;
  }

  fetch("/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: token },
    body: JSON.stringify({ name: categoryName }),
  })
    .then(async (res) => {
      let data = await res.json();
      if (!res.ok) {
        showAlert(data.message, true);
        return;
      }
      let newCategoryContainer = document.createElement("div");
      newCategoryContainer.className = "category-card";
      newCategoryContainer.id = data._id;

      let name = document.createElement("h2");
      name.textContent = data.name;

      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteCategory(data._id);

      newCategoryContainer.append(name, deleteBtn);
      document.querySelector(".categories-container").appendChild(newCategoryContainer);

      showAlert(`category ${data.name} created successfully!`);
      document.getElementById("creation_group").style.display = "none";
      document.getElementById("name").value = "";
    })
    .catch((err) => {
      showAlert(err.message, true);
    });
}

function hideCreationInput() {
  document.getElementById("creation_group").style.display = "none";
}

function getCategoryNotes(categoryId){
  let token = localStorage.getItem("token");
  window.location.href=`/categories/${categoryId}?token=${token}`;
}

function showAlert(message, isError) {
  alertMessage.textContent = message;
  alertMessage.style.color = isError ? "red" : "green";
  setTimeout(() => {
    alertMessage.textContent = "";
  }, 5000);
}
