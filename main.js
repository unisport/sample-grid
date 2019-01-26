const sectionProductsList = document.getElementById("section__products-list");
const tplProductCard = document.getElementById("template__product").content;

fetch("https://www.unisport.dk/api/products/batch/?list=179249,179838,174351,180011,180020,178429")
  .then(data => data.json())
  .then(allInfo => {
    let productsList = allInfo.products.sort(sortByDiscount);

    productsList.forEach((product, i) => {
      console.log(product);
      let productCardClone = tplProductCard.cloneNode(true);
      productCardClone.querySelector("img").src = product.image;
      productCardClone.querySelector(".product__name").innerHTML = product.name;
      productCardClone.querySelector(".product__like").classList.add(`product${i}`);
      productCardClone.querySelector(`.product${i}`).addEventListener("click", ()=> {
        document.querySelector(`.product${i}`).classList.toggle("product__like--clicked");
      });

      let fixedPrice = convertPriceToDkk(product.price);
      productCardClone.querySelector(".product__price--new").innerHTML = fixedPrice + " DKK";
      if (product.discount_type){
        productCardClone.getElementById("product__discount--amount").innerHTML = product.discount_percentage;
        let oldFixedPrice = convertPriceToDkk(product.price_old);
        productCardClone.querySelector(".product__price--old").innerHTML = oldFixedPrice + " DKK";
        productCardClone.querySelector(".product__price--new").style.color = "#0BBF5A";

      } else {
        productCardClone.querySelector("svg").style.display = "none";
        productCardClone.querySelector(".product__price--old").style.display = "none";
        productCardClone.querySelector(".product__price--new").style.color = "#000000";
      }
      let isCustomizable = parseInt(product.is_customizable);
      if (!isCustomizable) {
        productCardClone.querySelector(".product__custom").style.display = "none";
        productCardClone.querySelector(".product__icons").style.justifyContent = "flex-end";
      }

      sectionProductsList.appendChild(productCardClone);
    })
  });

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

function convertPriceToDkk(price) {
  return price.substring(0, price.length-2);
}




