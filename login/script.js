const home = document.getElementById("home");
const signup = document.getElementById("signup");
const cart = document.getElementById("cart");
const profile = document.getElementById("profile");

const login = document.getElementById("login-btn");

profile.addEventListener("click", () => {
  alert("Please Login to see your profile");
});
cart.addEventListener("click", () => {
  alert("Please Login to see Cart");
});
home.addEventListener("click", () => {
  alert("Please Login to go to Home.");
});
signup.addEventListener("click", () => {
  location.href = "../signup";
});

login.addEventListener("click", (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Enter Valid Values");
  } else {
    let users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      let currentUser = users.find((currentUser) => {
        return currentUser.email === email;
      });

      if (currentUser) {
        if (password === currentUser.password) {
          sessionStorage.setItem("loggedUser", JSON.stringify(currentUser));
          location.href = "../shop";
          alert("Login Successfull");
        } else {
          alert("Incorrect Password");
          resetValues();
        }
      } else {
        alert("Can't find account with given details.");
        resetValues();
      }
    } else {
      alert("Can't find account with given details.");
      resetValues();
    }
  }
});

function resetValues() {
  let email = (document.getElementById("email").value = "");
  let password = (document.getElementById("password").value = "");
}
