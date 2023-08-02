const home = document.getElementById("home");
const login = document.getElementById("login");
const cart = document.getElementById("cart");
const profile = document.getElementById("profile");

profile.addEventListener("click", () => {
  alert("Please Login to see your profile");
});
cart.addEventListener("click", () => {
  alert("Please Login to see Cart");
});
home.addEventListener("click", () => {
  alert("Please Login to go to Home.");
});
login.addEventListener("click", () => {
  window.location.href = "/login/";
});

const signupBtn = document.getElementById("signup-btn");
const loginRedirect = document.getElementById("login-redirect");

signupBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Invalid Input.");
  } else {
    if (password !== confirmPassword) {
      alert("Wrong Password.");
      password.value = "";
      confirmPassword.value = "";
    } else {
      if (localStorage.getItem("users")) {
        if (checkIfUserExist(email)) {
          alert("Email already Exist.");
        } else {
          saveUser(firstName, lastName, email, password);
        }
      } else {
        saveUser(firstName, lastName, email, password);
      }
    }
  }
});

function checkIfUserExist(email) {
  let users = JSON.parse(localStorage.getItem("users"));
  const userFound = users.find((user) => {
    return user.email === email;
  });
  if (userFound) {
    return true;
  }
  return false;
}

function saveUser(fname, lname, mail, pswd) {
  let newUser = {
    firstName: fname,
    lastName: lname,
    email: mail,
    password: pswd,
  };
  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  clearInputValues();

  alert("Registered Successfully.");

  window.location.href = "/login/";
}

function clearInputValues() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
}

loginRedirect.addEventListener("click", () => {
  window.location.href = "/login/";
});
