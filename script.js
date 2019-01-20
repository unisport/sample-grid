let request = new XMLHttpRequest();
request.open(
  "GET",
  "https://www.unisport.dk/api/products/batch/?list=179249,179838,174351,180011,180020,178429"
);
request.onload = function() {
  let data = JSON.parse(request.responseText).products;
  data.sort(comparePrice);
  renderHTML(data);
  discountCheck(data);
};
request.send();

function renderHTML(data) {
  let slider = document.getElementById("slider");
  for (let i = 0; i < data.length; i++) {
    let converted_price = currencyFormat(data[i].price);
    slider.innerHTML +=
      '<div class="product">' +
      '<img class="sale-image" src="sale-tag.gif" alt="image" width="40" height="50">' +
      '<a href="' +
      data[i].url +
      '">' +
      '<div class="image-wrapper">' +
      '<img class="item-image" src="' +
      data[i].image +
      '" alt="image" width="100" height="100"></div>' +
      '<div class="name"><span>' +
      data[i].name +
      "</span></div>" +
      "</a>" +
      '<div class="price"><span>' +
      converted_price +
      "</span></div>" +
      '<div id="show" class="size"><select class="selectSize"></select></div>' +
      '<button id="addToCart" class="button">Add to cart  <i class="fas fa-shopping-cart"></i></button>' +
      "</div>";
    showSelect(i, data[i].sizes);
    discountCheck(i, data[i].discount_percentage);
  }
}

function currencyFormat(price) {
  let convertedPrice = [price.slice(0, price.length - 2),".",price.slice(price.length - 2)].join("");
  let formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2
  });
  return formatter.format(convertedPrice);
}

function comparePrice(a, b) {
  let priceA = Number(a.discount_percentage);
  let priceB = Number(b.discount_percentage);
  if (priceA < priceB) return -1;
  if (priceA > priceB) return 1;
  return 0;
}

function discountCheck(index, discount) {
  let productOnSale = document.getElementsByClassName("sale-image")[index];
  let translatedToNumber = Number(discount);
  if (translatedToNumber > 0) {
    productOnSale.style.display = "block";
  }
}

function showSelect(index, sizes) {
  let showSize = document.getElementsByClassName("selectSize")[index];
  let sizesArr = sizes.split([","]);
  sizesArr.unshift("Choose size");
  for (let size of sizesArr) {
    let option = document.createElement("option");
    option.innerHTML += size;
    option.value += size;
    showSize.appendChild(option);
  }
}
