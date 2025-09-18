var searchedFriend;
var currentFriend;

document.getElementById("search_btn").addEventListener("click", () => {
  searchedFriend = document.getElementById("search_input").value.trim();
  if (searchedFriend) {
    document.querySelector(".searched_friend").style.display = "block";
    document.getElementById("searched_friend").textContent = searchedFriend;
    let friends = document.querySelectorAll(".friend_name");
    friends = [...friends].map((friend) => friend.textContent);

    if (!friends.includes(searchedFriend)) {
      let addFriendBtn = document.querySelector("#add_friend");
      addFriendBtn.style.display = "block";
      addFriendBtn.addEventListener("click", () => {
        addFriend(searchedFriend);
        document.querySelector(".searched_friend").style.display = "none";
      });
    } else {
      let chatFriendBtn = document.querySelector("#chat_friend");
      chatFriendBtn.style.display = "block";
      chatFriendBtn.addEventListener("click", () => {
        openChatRoom(searchedFriend);
        document.querySelector(".searched_friend").style.display = "none";
      });
    }
  }
});

function addFriend(friendName) {
  fetch("http://127.0.0.1:3000/users/add-friend", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ friendName }),
        credentials:"include"
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message.includes("added")) {
        alert("Friend added successfully");
        document.getElementById("add_friend").style.display = "none";
      } else {
        alert(data.message);
      }
    });
}

function openChatRoom(friend) {
  document.querySelector(".chat_room").style.display = "block";
  document.querySelector("h2>span#user").textContent = friend;
  currentFriend = friend;
}

document.getElementById("sendBtn").addEventListener("click", () => {
    const message = document.getElementById("message").value;
    if (message.trim()) {
      socket.emit("private-message", { to: currentFriend, message });

      addMessage(`You ➡️ ${friend}: ${message}`);
      document.getElementById("message").value = "";
    }
  });