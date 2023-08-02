const products = JSON.parse(localStorage.getItem("products"));

const cartItems = JSON.parse(localStorage.getItem("cartItems"));

const left = document.getElementById("left");

const top = document.getElementById("top");

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
        console.log(item);
        cartThings += addTocart(product, title);
        priceThings += addToPrice(product);
      }
    });
  });
  left.innerHTML = cartThings;
  top.innerHTML = priceThings;
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
              <button id="addBtn">Remove</button>
            </div>`;
  return item;
}

function addToPrice(product) {
  let price = `<p>${product.price}</p>`;
  return price;
}

cartMaker();
