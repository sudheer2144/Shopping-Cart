if (!sessionStorage.getItem("loggedUser")) {
  alert("Login First");
  location.href = "../";
}

const products = JSON.parse(localStorage.getItem("products"));

const cartItems = JSON.parse(localStorage.getItem("cartItems"));

const left = document.getElementById("left");

const topSection = document.getElementById("top");

let totalPrice = 0;

if (cartItems) {
  cartMaker();
} else {
  emptyCartMaker();
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
  let price = `<div class="cartList"><p class="oneLine">${product.title}</p><p>$${product.price}</p></div>`;
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
      alert("Your cart is Empty.....");
    } else {
      let order = {};
      order.amount = totalPrice;
      order.id = generateOrderId();
      localStorage.setItem("orderDetails", JSON.stringify(order));
      location.href = "../razorpay";
      // emptyCartMaker();
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
  document.querySelector(
    ".totalPrice"
  ).innerHTML = `Total Price : $${totalPrice.toFixed(2)}`;
}

function emptyCartMaker() {
  document.getElementById("left").innerHTML =
    "<h1 class=emptyCart>Cart is Empty...</h1>";
  document.getElementById("right").style.display = "none";
  localStorage.removeItem("cartItems");
}

function generateOrderId() {
  let chars = "1234567890abcdefghijklmnopqrstuvwxyz";
  let orderId = "";
  for (let i = 0; i < 10; i++) {
    orderId += chars[Math.floor(Math.random() * chars.length)];
  }
  return orderId;
}
