let products;

async function getProducts() {
  checkLogin();
  let response = await fetch("https://fakestoreapi.com/products");
  let productsData = await response.json();
  localStorage.setItem("products", JSON.stringify(productsData));
  getProductsToObject();
  seperateCategories();
  addToItems();
}

function checkLogin() {
  if (!sessionStorage.getItem("loggedUser")) {
    alert("Login First");
    window.location.href = "/index.html";
  }
}

function getProductsToObject() {
  products = JSON.parse(localStorage.getItem("products"));
}

let menList = [];
let womenList = [];
let elecList = [];
let jewelList = [];

function seperateCategories() {
  products.forEach((product) => {
    if (product.category === "men's clothing") {
      menList.push(product);
    } else if (product.category === "jewelery") {
      jewelList.push(product);
    } else if (product.category === "electronics") {
      elecList.push(product);
    } else if (product.category === "women's clothing") {
      womenList.push(product);
    }
  });
}

const items = document.querySelectorAll(".items");

let allFilter = document.getElementById("all");
let menFilter = document.getElementById("menFilter");
let womenFilter = document.getElementById("womenFilter");
let elecFilter = document.getElementById("elecFilter");
let jewelFilter = document.getElementById("jewelFilter");

allFilter.addEventListener("click", () => {
  removeActiveToFIlters();
  allFilter.classList.add("active");
  displayAllCollections();
});

menFilter.addEventListener("click", () => {
  removeActiveToFIlters();
  menFilter.classList.add("active");
  displayMenCollection();
});

womenFilter.addEventListener("click", () => {
  removeActiveToFIlters();
  womenFilter.classList.add("active");
  displayWomenCollection();
});

elecFilter.addEventListener("click", () => {
  removeActiveToFIlters();
  elecFilter.classList.add("active");
  displayElectronicsCollections();
});

jewelFilter.addEventListener("click", () => {
  removeActiveToFIlters();
  jewelFilter.classList.add("active");
  displayJewelleryCollections();
});

function removeActiveToFIlters() {
  allFilter.classList.remove("active");
  menFilter.classList.remove("active");
  womenFilter.classList.remove("active");
  elecFilter.classList.remove("active");
  jewelFilter.classList.remove("active");
}

const menSection = document.querySelector(".men_collection");
const womenSection = document.querySelector(".women_collection");
const elecSection = document.querySelector(".elec_collection");
const jewelSection = document.querySelector(".jewel_collection");

function displayAllCollections() {
  menSection.style.display = "block";
  womenSection.style.display = "block";
  elecSection.style.display = "block";
  jewelSection.style.display = "block";
}
function displayMenCollection() {
  menSection.style.display = "block";
  womenSection.style.display = "none";
  elecSection.style.display = "none";
  jewelSection.style.display = "none";
}
function displayWomenCollection() {
  menSection.style.display = "none";
  womenSection.style.display = "block";
  elecSection.style.display = "none";
  jewelSection.style.display = "none";
}
function displayJewelleryCollections() {
  menSection.style.display = "none";
  womenSection.style.display = "none";
  elecSection.style.display = "none";
  jewelSection.style.display = "block";
}
function displayElectronicsCollections() {
  menSection.style.display = "none";
  womenSection.style.display = "none";
  elecSection.style.display = "block";
  jewelSection.style.display = "none";
}

const colors = ["red", "blue", "green", "black", "white"];

const sizes = ["s", "m", "l", "xl"];

function getColorsForProduct() {
  let colorArray = [];
  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * colors.length);
    if (colorArray.indexOf(colors[randomIndex]) > -1) {
      i--;
      continue;
    }
    colorArray.push(colors[randomIndex]);
  }
  return colorArray;
}

function getSizesForProduct() {
  let sizeArray = [];
  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * sizes.length);
    if (sizeArray.indexOf(sizes[randomIndex]) > -1) {
      i--;
      continue;
    }
    sizeArray.push(sizes[randomIndex]);
  }
  return sizeArray;
}

function addToItems() {
  let menItemList = "";
  menList.forEach((product) => {
    if (!product.colors || !product.sizes) {
      let colorArray = getColorsForProduct();

      let sizeArray = getSizesForProduct();

      product.colors = colorArray;

      product.sizes = sizeArray;
    }
    menItemList += clothes(product);
  });
  items[0].innerHTML = menItemList;

  let womenItemList = "";
  womenList.forEach((product) => {
    if (!product.colors || !product.sizes) {
      let colorArray = getColorsForProduct();

      let sizeArray = getSizesForProduct();

      product.colors = colorArray;

      product.sizes = sizeArray;
    }
    womenItemList += clothes(product);
  });
  items[1].innerHTML = womenItemList;

  let elecItems = "";
  elecList.forEach((product) => {
    elecItems += notClothes(product);
  });
  items[2].innerHTML = elecItems;

  let jewelItems = "";
  jewelList.forEach((product) => {
    jewelItems += notClothes(product);
  });
  items[3].innerHTML = jewelItems;

  addBtnFunction();
}

let colorsToDisplayArray = [];

const redCheckBox = document.getElementById("red");
const blueCheckBox = document.getElementById("blue");
const greenCheckBox = document.getElementById("green");
const blackCheckBox = document.getElementById("black");
const whiteCheckBox = document.getElementById("white");

redCheckBox.addEventListener("click", () => {
  if (redCheckBox.checked) {
    colorsToDisplayArray.push(redCheckBox.id);
    checkForColors();
  }
  if (!redCheckBox.checked) {
    let ind = colorsToDisplayArray.indexOf(redCheckBox.id);
    [
      colorsToDisplayArray[ind],
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
    ] = [
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
      colorsToDisplayArray[ind],
    ];
    colorsToDisplayArray.pop();
    checkForColors();
  }
});

blueCheckBox.addEventListener("click", () => {
  if (blueCheckBox.checked) {
    colorsToDisplayArray.push(blueCheckBox.id);
    checkForColors();
  }
  if (!blueCheckBox.checked) {
    let ind = colorsToDisplayArray.indexOf(blueCheckBox.id);
    [
      colorsToDisplayArray[ind],
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
    ] = [
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
      colorsToDisplayArray[ind],
    ];
    colorsToDisplayArray.pop();
    checkForColors();
  }
});

greenCheckBox.addEventListener("click", () => {
  if (greenCheckBox.checked) {
    colorsToDisplayArray.push(greenCheckBox.id);
    checkForColors();
  }
  if (!greenCheckBox.checked) {
    let ind = colorsToDisplayArray.indexOf(greenCheckBox.id);
    [
      colorsToDisplayArray[ind],
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
    ] = [
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
      colorsToDisplayArray[ind],
    ];
    colorsToDisplayArray.pop();
    checkForColors();
  }
});

blackCheckBox.addEventListener("click", () => {
  if (blackCheckBox.checked) {
    colorsToDisplayArray.push(blackCheckBox.id);
    checkForColors();
  }
  if (!blackCheckBox.checked) {
    let ind = colorsToDisplayArray.indexOf(blackCheckBox.id);
    [
      colorsToDisplayArray[ind],
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
    ] = [
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
      colorsToDisplayArray[ind],
    ];
    colorsToDisplayArray.pop();
    checkForColors();
  }
});

whiteCheckBox.addEventListener("click", () => {
  if (whiteCheckBox.checked) {
    colorsToDisplayArray.push(whiteCheckBox.id);
    checkForColors();
  }
  if (!whiteCheckBox.checked) {
    let ind = colorsToDisplayArray.indexOf(whiteCheckBox.id);
    [
      colorsToDisplayArray[ind],
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
    ] = [
      colorsToDisplayArray[colorsToDisplayArray.length - 1],
      colorsToDisplayArray[ind],
    ];
    colorsToDisplayArray.pop();
    checkForColors();
  }
});

let sizesToDisplayArray = [];

let checkSizesCount = 0;

const sSize = document.getElementById("s");
const mSize = document.getElementById("m");
const lSize = document.getElementById("l");
const xlSize = document.getElementById("xl");

sSize.addEventListener("click", () => {
  if (sSize.checked) {
    sizesToDisplayArray.push(sSize.id);
    checkSizesCount++;
    checkForSizes();
  }
  if (!sSize.checked) {
    checkSizesCount--;
    let ind = sizesToDisplayArray.indexOf(sSize.id);
    [
      sizesToDisplayArray[ind],
      sizesToDisplayArray[sizesToDisplayArray.length - 1],
    ] = [
      sizesToDisplayArray[sizesToDisplayArray.length - 1],
      sizesToDisplayArray[ind],
    ];
    sizesToDisplayArray.pop();
    checkForSizes();
    checkIfCheckBoxesClear();
  }
});

mSize.addEventListener("click", () => {
  if (mSize.checked) {
    checkSizesCount++;
    sizesToDisplayArray.push(mSize.id);
    checkForSizes();
  }
  if (!mSize.checked) {
    checkSizesCount--;
    let ind = sizesToDisplayArray.indexOf(mSize.id);
    [
      sizesToDisplayArray[ind],
      sizesToDisplayArray[sizesToDisplayArray.length - 1],
    ] = [
      sizesToDisplayArray[sizesToDisplayArray.length - 1],
      sizesToDisplayArray[ind],
    ];
    sizesToDisplayArray.pop();
    checkForSizes();
    checkIfCheckBoxesClear();
  }
});

lSize.addEventListener("click", () => {
  if (lSize.checked) {
    checkSizesCount++;
    sizesToDisplayArray.push(lSize.id);
    checkForSizes();
  }
  if (!lSize.checked) {
    checkSizesCount--;
    let ind = sizesToDisplayArray.indexOf(lSize.id);
    [
      sizesToDisplayArray[ind],
      sizesToDisplayArray[sizesToDisplayArray.length - 1],
    ] = [
      sizesToDisplayArray[sizesToDisplayArray.length - 1],
      sizesToDisplayArray[ind],
    ];
    sizesToDisplayArray.pop();
    checkForSizes();
    checkIfCheckBoxesClear();
  }
});

xlSize.addEventListener("click", () => {
  if (xlSize.checked) {
    checkSizesCount++;
    sizesToDisplayArray.push(xlSize.id);
    checkForSizes();
  }
  if (!xlSize.checked) {
    checkSizesCount--;
    let ind = sizesToDisplayArray.indexOf(xlSize.id);
    [
      sizesToDisplayArray[ind],
      sizesToDisplayArray[sizesToDisplayArray.length - 1],
    ] = [
      sizesToDisplayArray[sizesToDisplayArray.length - 1],
      sizesToDisplayArray[ind],
    ];
    sizesToDisplayArray.pop();
    checkForSizes();
    checkIfCheckBoxesClear();
  }
});

function checkForColors() {
  if (colorsToDisplayArray.length > 0) {
    let menItemList = addItemsToListColors(menList);
    items[0].innerHTML = menItemList;

    let womenItemList = addItemsToListColors(womenList);
    items[1].innerHTML = womenItemList;

    hideNonClothes();
  } else {
    addToItems();
  }
}

function addItemsToListColors(list) {
  let resList = "";
  for (let color of colorsToDisplayArray) {
    list.forEach((product) => {
      if (product.colors.indexOf(color) > -1) {
        resList += clothes(product);
      }
    });
  }
  return resList;
}

function checkForSizes() {
  if (sizesToDisplayArray.length > 0) {
    let menItemList = addItemsToListSizes(menList);
    items[0].innerHTML = menItemList;

    let womenItemList = addItemsToListSizes(womenList);
    items[1].innerHTML = womenItemList;

    hideNonClothes();
  } else {
    addToItems();
  }
}

function addItemsToListSizes(list) {
  let resList = "";
  for (let size of sizesToDisplayArray) {
    list.forEach((product) => {
      if (product.sizes.indexOf(size) > -1) {
        resList += clothes(product);
      }
    });
  }
  return resList;
}

function checkIfCheckBoxesClear() {
  if (checkSizesCount == 0) {
    addToItems();
    ShowNonClothes();
  }
}

function hideNonClothes() {
  items[2].parentNode.style.display = "none";
  items[3].parentNode.style.display = "none";
}

function ShowNonClothes() {
  items[2].parentNode.style.display = "";
  items[3].parentNode.style.display = "";
}

const rangeElement = document.getElementById("range");

rangeElement.addEventListener("input", (event) => {
  let rating = event.target.value;
  // let items = document.querySelectorAll(".item");
  // items.forEach((item)=>{
  //   itemChiledNodes = item.childNodes[3];
  //   let itemRating;
  //   if(itemChiledNodes.childNodes.length < 7){
  //     itemRating = itemChiledNodes.childNodes[3].textContent.substring(8, 11);
  //   }
  //   else{
  //     itemRating = itemChiledNodes.childNodes[5].textContent.substring(8, 11);
  //   }
  //   if(itemRating<rating){
  //     item.style.display="none";
  //   }
  //   else {
  //     item.style.display = "";
  //   }
  // });

  products.forEach((product) => {
    let ele = document.querySelector(
      `.${product.title
        .split(" ")
        .join("")
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "")}`
    );
    if (product.rating.rate < rating) {
      ele.style.display = "none";
    } else {
      ele.style.display = "";
    }
  });
});

let checkedPrices = 0;
const zeroTotwentyfive = document.getElementById("0-25");
const twentyfiveTofifty = document.getElementById("25-50");
const fiftyTohundered = document.getElementById("50-100");
const hunderedOn = document.getElementById("100on");

zeroTotwentyfive.addEventListener("click", () => {
  if (zeroTotwentyfive.checked) {
    checkedPrices++;
    filterWithPricing(0, 25);
  }
  if (!zeroTotwentyfive.checked) {
    checkedPrices--;
    checkIfCheckedPriceZero();
  }
});

twentyfiveTofifty.addEventListener("click", () => {
  if (twentyfiveTofifty.checked) {
    checkedPrices++;
    filterWithPricing(25, 50);
  }
  if (!twentyfiveTofifty.checked) {
    checkedPrices--;
    checkIfCheckedPriceZero();
  }
});

fiftyTohundered.addEventListener("click", () => {
  if (fiftyTohundered.checked) {
    checkedPrices++;
    filterWithPricing(50, 100);
  }
  if (!fiftyTohundered.checked) {
    checkedPrices--;
    checkIfCheckedPriceZero();
  }
});

hunderedOn.addEventListener("click", () => {
  if (hunderedOn.checked) {
    checkedPrices++;
    filterWithPricing(100);
  }
  if (!hunderedOn.checked) {
    checkedPrices--;
    checkIfCheckedPriceZero();
  }
});

function filterWithPricing(low, high = 9999999999) {
  products.forEach((product) => {
    let productPrice = product.price;
    let ele = document.querySelector(
      `.${product.title
        .split(" ")
        .join("")
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "")}`
    );
    if (productPrice >= low && productPrice <= high) {
      ele.style.display = "";
    } else {
      ele.style.display = "none";
    }
  });
}

function checkIfCheckedPriceZero() {
  if (checkedPrices == 0) {
    addToItems();
    ShowNonClothes();
  }
}

function clothes(product) {
  let item = `<div class="item ${product.title
    .split(" ")
    .join("")
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "")}">
              <img src=${product.image} alt="Item" />
              <div class="info">
                <div class="row">
                  <div class="price">$${product.price}</div>
                  <div class="sized">
                  ${product.sizes[0].toUpperCase()}
                  ${product.sizes[1].toUpperCase()}
                  ${product.sizes[2].toUpperCase()}
                  </div>
                </div>
                <div class="colors">
                  Colors:
                  <div class="row">
                    <div class="circle" style="background-color: ${
                      product.colors[0]
                    }"></div>
                    <div class="circle" style="background-color: ${
                      product.colors[1]
                    }"></div>
                    <div class="circle" style="background-color: ${
                      product.colors[2]
                    }"></div>
                  </div>
                </div>
                <div class="row">Rating: ${product.rating.rate}  (${
    product.rating.count
  })</div>
              </div>
              <button id="addBtn">Add to Cart</button>
            </div>`;
  return item;
}

function notClothes(product) {
  let item = `<div class="item ${product.title
    .split(" ")
    .join("")
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "")}">
              <img src=${product.image} alt="Item" />
              <div class="info">
                <div class="row">
                  <div class="price">$${product.price}</div>
                </div>
                <div class="row">Rating: ${product.rating.rate}  (${
    product.rating.count
  })</div>
              </div>
              <button id="addBtn">Add to Cart</button>
            </div>`;
  return item;
}

function addBtnFunction() {
  document.addEventListener("click", (event) => {
    if (event.target.id === "addBtn") {
      let product = event.target.parentNode.classList[1];
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.push(product);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  });
}

function search() {
  let input = document.getElementById("search").value.toLowerCase();

  let itemList = document.getElementsByClassName("item");

  let lenn = itemList.length;

  for (let i = 0; i < lenn; i++) {
    let productName = itemList[i].classList[1];
    if (productName.includes(input)) {
      itemList[i].style.display = "";
    } else {
      itemList[i].style.display = "none";
    }
  }
}
