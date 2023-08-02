if (!sessionStorage.getItem("loggedUser")) {
  alert("Login First");
  window.location.href = "/index.html";
}

const products = JSON.parse(localStorage.getItem("products"));

const cartItems = JSON.parse(localStorage.getItem("cartItems"));

const left = document.getElementById("left");

const topSection = document.getElementById("top");

let totalPrice = 0;

if (cartItems) {
  cartMaker();
}

function cartMaker() {
  let cartThings = "";
  let priceThings = "";
  cartItems.forEach((item) => {
    products.forEach((product) => {
      let title = product.title
        .split(" ")
        .join("")
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "");
      if (item === title) {
        cartThings += addTocart(product, title);
        priceThings += addToPrice(product);
        showPrice();
      }
    });
  });
  left.innerHTML = cartThings;
  topSection.innerHTML = priceThings;
  totalPriceFunc();
}
function addTocart(product, title) {
  let item = `<div class="item ${title}">
              <img src=${product.image} alt="Item" />
              <div class="info">
                <div class="row">
                  <div class="title">${product.title}</div>
                  <div class="price">$${product.price}</div>
                </div>
              </div>
              <button id="removeBtn">Remove</button>
            </div>`;
  return item;
}

function addToPrice(product) {
  let price = `<p>${product.title}</p><p>$${product.price}</p>`;
  return price;
}

function totalPriceFunc() {
  totalPrice = 0;
  cartItems.forEach((item) => {
    products.forEach((product) => {
      let title = product.title
        .split(" ")
        .join("")
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "");
      if (item === title) {
        totalPrice += product.price;
      }
    });
  });
  showPrice();
}

document.addEventListener("click", (event) => {
  if (event.target.id === "removeBtn") {
    let productDetails = event.target.parentNode.classList[1];
    let ind = cartItems.indexOf(productDetails);
    [cartItems[ind], cartItems[cartItems.length - 1]] = [
      cartItems[cartItems.length - 1],
      cartItems[ind],
    ];
    cartItems.pop();
    if (cartItems.length < 1) {
      localStorage.removeItem("cartItems");
      cartMaker();
      emptyCartMaker();
      totalPriceFunc();
      return;
    } else {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    cartMaker();
  } else if (event.target.id === "btn") {
    if (totalPrice == 0) {
      alert("Price should be greater than 0");
    }
  }
});

function reducePrice(item) {
  products.forEach((product) => {
    let title = product.title
      .split(" ")
      .join("")
      .toLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "");
    if (item === title) {
      totalPrice -= product.price;
    }
  });
}

function showPrice() {
  document.getElementById(
    "price"
  ).innerHTML = `<p>Total Price : ${totalPrice.toFixed(2)}</p>`;
}

function emptyCartMaker() {
  document.getElementById("left").innerHTML = "<h1>Cart is Empty...</h1>";
}
