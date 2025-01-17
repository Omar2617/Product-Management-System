// page elements //
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("small");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let search = document.getElementById("search");
let result = document.querySelector("#result");
let delAllBtn = document.getElementById("deleteAll");
let productsArr = JSON.parse(localStorage.getItem("products")) || [];
let mood = "create";

//------------- initialize products on load ---------------//

if (result.innerHTML === "") {
  showProducts();
  if (result.innerHTML !== "") {
    delAllBtn.style.display = "inline";
    delAllBtn.textContent = `delete all (${result.children.length})`;
  }
}

//----------- switch between inputs ------------//

title.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    price.focus();
  }
});

price.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    taxes.focus();
  }
});

taxes.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    ads.focus();
  }
});

ads.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    discount.focus();
  }
});

discount.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (mood === "create") {
      count.focus();
    } else {
      category.focus();
    }
  }
});

count.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    category.focus();
  }
});

category.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submit.click();
    category.blur();
  }
});

//--------- Get total price -----------//

function getTotalPrice() {
  total.style.cssText = `background-color: green;`;
  total.textContent =
    +price.value + +taxes.value + +ads.value - +discount.value;
  return +price.value + +taxes.value + +ads.value - +discount.value;
}

price.addEventListener("input", () => {
  if (price.value !== "") {
    getTotalPrice();
  } else {
    total.textContent = "";
    total.style.cssText = `background-color: #df1a1a;`;
  }
});

taxes.addEventListener("input", () => {
  if (price.value !== "") {
    getTotalPrice();
  }
});

ads.addEventListener("input", () => {
  if (price.value !== "") {
    getTotalPrice();
  }
});

discount.addEventListener("input", () => {
  if (price.value !== "") {
    getTotalPrice();
  }
});

//------------ Create new product --------------//

function createProduct() {
  for (let i = 0; i < count.value; i++) {
    let newProduct = {
      title: title.value,
      price: price.value,
      taxes: taxes.value | 0,
      ads: ads.value | 0,
      discount: discount.value | 0,
      total: total.textContent,
      count: count.value,
      category: category.value,
    };

    productsArr.push(newProduct);
  }

  localStorage.setItem("products", JSON.stringify(productsArr));
}

//------------- Read Products ---------------//

function showProducts() {
  result.innerHTML = "";

  for (let i = 0; i < productsArr.length; i++) {
    let product = `<tr id = "${i + 1}">
    <td>${i + 1}</td>
    <td>${productsArr[i].title}</td>
    <td>${productsArr[i].price}</td>
    <td>${productsArr[i].taxes}</td>
    <td>${productsArr[i].ads}</td>
    <td>${productsArr[i].discount}</td>
    <td>${productsArr[i].total}</td>
    <td>${productsArr[i].category}</td>
    <td><button onclick = "updateData(${i})" class = "updateBtn">update</button></td>
    <td><button onclick = "deleteProduct(${i})" class = "deleteBtn">delete</button></td>
    </tr>`;

    result.innerHTML += product;
  }
}

// validation inputs //

function validateTit() {
  if (/\w+/gi.test(title.value)) {
    title.style.cssText = `border: none`;
    return true;
  } else {
    title.style.cssText = `border: 1px solid red`;
    title.focus();
    return false;
  }
}

function validatePrice() {
  if (price.value <= 0 || price.value === "") {
    price.style.cssText = `border: 1px solid red`;
    price.focus();
    return false;
  } else {
    price.style.cssText = `border: none`;
    return true;
  }
}

function validateTaxes() {
  if (taxes.value < 0 && taxes.value !== "") {
    taxes.style.cssText = `border: 1px solid red`;
    taxes.focus();
    return false;
  } else {
    taxes.style.cssText = `border: none`;
    return true;
  }
}

function validateAds() {
  if (ads.value !== "" && ads.value < 0) {
    ads.style.cssText = `border: 1px solid red`;
    ads.focus();
    return false;
  } else {
    ads.style.cssText = `border: none`;
    return true;
  }
}

function validateDisc() {
  if ((discount.value !== "" && discount.value < 0) || getTotalPrice() < 0) {
    discount.style.cssText = `border: 1px solid red`;
    discount.focus();
    return false;
  } else {
    discount.style.cssText = `border: none`;
    return true;
  }
}

function validateCount() {
  if (mood === "create") {
    if (count.value === "" || count.value <= 0) {
      count.style.cssText = `border: 1px solid red`;
      count.focus();
      return false;
    } else {
      count.style.cssText = `border: none`;
      return true;
    }
  } else {
    return true;
  }
}

function validateCate() {
  if (/\w+/gi.test(category.value)) {
    category.style.cssText = `border: none`;
    return true;
  } else {
    category.style.cssText = `border: 1px solid red`;
    category.focus();
    return false;
  }
}

// delete product //

function deleteProduct(i) {
  productsArr.splice(i, 1);
  showProducts();
  if (result.innerHTML === "") {
    delAllBtn.style.display = "none";
  } else {
    delAllBtn.textContent = `delete all (${result.children.length})`;
  }

  localStorage.setItem("products", JSON.stringify(productsArr));
}

//--------- delete all -------//

function deleteAll() {
  localStorage.clear();
  productsArr = [];
  result.innerHTML = "";
  delAllBtn.style.display = "none";
}

let tmp;
function updateData(i) {
  title.value = productsArr[i].title;
  price.value = productsArr[i].price;
  taxes.value = productsArr[i].taxes;
  ads.value = productsArr[i].ads;
  discount.value = productsArr[i].discount;
  getTotalPrice();
  category.value = productsArr[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function addUpdatedDataToStorage() {
  productsArr[tmp].title = title.value;
  productsArr[tmp].price = price.value;
  productsArr[tmp].taxes = taxes.value;
  productsArr[tmp].ads = ads.value;
  productsArr[tmp].discount = discount.value;
  productsArr[tmp].total = total.textContent;
  productsArr[tmp].category = category.value;
  localStorage.setItem("products", JSON.stringify(productsArr));
  count.style.display = "inline";
  submit.textContent = "Create";
  mood = "create";
}

// search //

let srMood = "title";

function getTypeOfSearch(id) {
  if (id == "searchByTitle") {
    srMood = "title";
    search.placeholder = "Search by title";
  } else {
    srMood = "category";
    search.placeholder = "Search by category";
  }
  showProducts();
  search.value = "";
  search.focus();
}

function searchData(value) {
  let arr = ``;
  for (let i = 0; i < productsArr.length; i++) {
    if (srMood === "title") {
      if (productsArr[i].title.toLowerCase().includes(value.toLowerCase())) {
        arr += `<tr id = "${i + 1}">
        <td>${i + 1}</td>
        <td>${productsArr[i].title}</td>
        <td>${productsArr[i].price}</td>
        <td>${productsArr[i].taxes}</td>
        <td>${productsArr[i].ads}</td>
        <td>${productsArr[i].discount}</td>
        <td>${productsArr[i].total}</td>
        <td>${productsArr[i].category}</td>
        <td><button onclick = "updateData(${i})" class = "updateBtn">update</button></td>
        <td><button onclick = "deleteProduct(${i})" class = "deleteBtn">delete</button></td>
        </tr>`;
      }
    } else {
      if (productsArr[i].category.toLowerCase().includes(value.toLowerCase())) {
        arr += `<tr id = "${i + 1}">
        <td>${i + 1}</td>
        <td>${productsArr[i].title}</td>
        <td>${productsArr[i].price}</td>
        <td>${productsArr[i].taxes}</td>
        <td>${productsArr[i].ads}</td>
        <td>${productsArr[i].discount}</td>
        <td>${productsArr[i].total}</td>
        <td>${productsArr[i].category}</td>
        <td><button onclick = "updateData(${i})" class = "updateBtn">update</button></td>
        <td><button onclick = "deleteProduct(${i})" class = "deleteBtn">delete</button></td>
        </tr>`;
      }
    }
    result.innerHTML = arr;
  }
}

// events //

submit.onclick = () => {
  if (
    validateTit() &&
    validatePrice() &&
    validateTaxes() &&
    validateAds() &&
    validateDisc() &&
    validateCount() &&
    validateCate()
  ) {
    if (mood === "create") {
      createProduct();
    } else {
      addUpdatedDataToStorage();
    }
    showProducts();
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.textContent = "";
    count.value = "";
    category.value = "";
    total.style.cssText = `background-color: #df1a1a;`;
    delAllBtn.style.display = "inline";
    delAllBtn.textContent = `delete all (${result.children.length})`;
  }
  search.value = "";
};
