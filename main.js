const sectionProductsList = document.getElementById("section__products-list");
const tplProductCard = document.getElementById("template__product").content;

// Fetching the data from Unisport
fetch("https://www.unisport.dk/api/products/batch/?list=179249,179838,174351,180011,180020,178429")
  .then(data => data.json())
  .then(allInfo => {
    // Calling a function to sort the data and storing it in a new variable
    let productsList = allInfo.products.sort(sortByDiscount);
    // Calling a function to populate the Products Section
    populateProductsSection(productsList);
  });

// Populate the Products Section
function populateProductsSection(productsList) {
  // Taking data of each product and putting it in cloned card template
  productsList.forEach((product, i) => {
    let productCardClone = tplProductCard.cloneNode(true);
    let isCustomizable = parseInt(product.is_customizable);
    let fixedPrice = convertPriceToDkk(product.price);

    productCardClone.querySelector("img").src = product.image;
    productCardClone.querySelector(".product__name").innerHTML = product.name;
    productCardClone.querySelector(".product__like").classList.add(`product${i}`);
    productCardClone.querySelector(".product__price--new").innerHTML = fixedPrice + " DKK";
    // Adding "Heart" clicked animation
    productCardClone.querySelector(`.product${i}`).addEventListener("click", () => {
      document.querySelector(`.product${i}`).classList.toggle("product__like--clicked");
    });

    if (product.discount_type) {
      let oldFixedPrice = convertPriceToDkk(product.price_old);
      productCardClone.getElementById("product__discount--amount").innerHTML = product.discount_percentage;
      productCardClone.querySelector(".product__price--old").innerHTML = oldFixedPrice + " DKK";
      productCardClone.querySelector(".product__price--new").style.color = "#0BBF5A";
    } else {
      productCardClone.querySelector("svg").style.display = "none";
      productCardClone.querySelector(".product__price--old").style.display = "none";
      productCardClone.querySelector(".product__price--new").style.color = "#000000";
    }

    if (!isCustomizable) {
      productCardClone.querySelector(".product__custom").style.display = "none";
      productCardClone.querySelector(".product__icons").style.justifyContent = "flex-end";
    }
    // Prepend the ready card into the Products List Section
    sectionProductsList.prepend(productCardClone);
  })
}

// Sorting fetched elements => lower discount first
function sortByDiscount(a, b) {
  let discountA = parseInt(a.discount_percentage) || 0;
  let discountB = parseInt(b.discount_percentage) || 0;
  if (discountA < discountB) {
    return -1;
  }
  if (discountA > discountB) {
    return 1;
  }
  return 0;
}

// Converting price to DKK, removing 2 last digits
function convertPriceToDkk(price) {
  return price.substring(0, price.length-2);
}




