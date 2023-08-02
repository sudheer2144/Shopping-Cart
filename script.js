// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

const home = document.getElementById("home");
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const cart = document.getElementById("cart");
const profile = document.getElementById("profile");
const login_2 = document.getElementById("login-btn");
const signup_2 = document.getElementById("signup-btn");
const logo = document.getElementById("brand");

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
  location.href = "./login";
});
login_2.addEventListener("click", () => {
  location.href = "./login";
});
signup.addEventListener("click", () => {
  location.href = "./signup";
});
signup_2.addEventListener("click", () => {
  location.href = "./signup";
});

logo.addEventListener("click", () => {
  if (sessionStorage.getItem("loggedUser")) {
    location.href = "./shop";
  } else {
    location.href = "./";
  }
});
