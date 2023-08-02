// Write your script here

if (!sessionStorage.getItem("loggedUser")) {
  alert("Login First");
  window.location.href = "/index.html";
}

const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const oldPasswordElement = document.getElementById("old-password");
const newPasswordElement = document.getElementById("new-password");
const confirmPasswordElement = document.getElementById("confirmPassowrd");

const saveInfo = document.getElementById("save-info-btn");
const updatePassword = document.getElementById("update-btn");
const logoutBtn = document.getElementById("logout-btn");

let currentUser = JSON.parse(sessionStorage.getItem("loggedUser"));
let users = JSON.parse(localStorage.getItem("users"));

saveInfo.addEventListener("click", (event) => {
  event.preventDefault();

  let newFirstName = firstNameElement.value.trim();
  let newLastName = lastNameElement.value.trim();

  if (newFirstName === "" || newLastName === "") {
    alert("Invalid Input");
    return;
  }

  currentUser.firstName = newFirstName;
  currentUser.lastName = newLastName;
  sessionStorage.setItem("loggedUser", JSON.stringify(currentUser));

  users.forEach((user) => {
    if (user.email === currentUser.email) {
      user.firstName = newFirstName;
      user.lastName = newLastName;
      return;
    }
  });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Details Updated Successfully");
  resetValues();
});

updatePassword.addEventListener("click", (event) => {
  event.preventDefault();
  let oldPassword = oldPasswordElement.value.trim();
  let newPassword = newPasswordElement.value.trim();
  let confirmPassowrd = confirmPasswordElement.value.trim();

  if (currentUser.password === oldPassword) {
    if (newPassword === "" || confirmPassowrd === "") {
      alert("Enter Valid password.");
    } else if (newPassword === confirmPassowrd) {
      currentUser.password = newPassword;
      sessionStorage.setItem("loggedUser", JSON.stringify(currentUser));

      users.forEach((user) => {
        if (user.email === currentUser.email) {
          user.password = newPassword;
          return;
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Password Changed Successfully");
    }
  } else {
    alert("Passowrd is wrong.");
  }
  resetValues();
});

logoutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  sessionStorage.removeItem("loggedUser");
  window.location.href = "/index.html";
});

function resetValues() {
  firstNameElement.value = "";
  lastNameElement.value = "";
  oldPasswordElement.value = "";
  newPasswordElement.value = "";
  confirmPasswordElement.value = "";
}
