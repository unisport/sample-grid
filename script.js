var productContainer = document.querySelector("#product-container");
var data = void 0; // This variable will be used for the Products Array
var proxy = 'https://cors-anywhere.herokuapp.com/'; //Proxy for Json request
var filterValue = 0; // Depending on the filter value, the products will be sorted by price
// if value = 1 : sort ascending ; if value = 2 : sort descending

// get json Data, assign it to data and run function
$.getJSON(proxy + 'https://cors-anywhere.herokuapp.com/https://www.unisport.dk/api/sample/', function (jsonData) {
    data = jsonData;
    displayProducts();
});

//Display all products
function displayProducts() {
    for (i = 0; i < 25; i++) {
        // Create new product
        createProduct(i);
    }
};

// Display products:
// 1. Create div with class "product-number" and products
// 2. Add <a href="www.productUrl.com"><img src="www.productImage.com" alt="Product description></a>
// 3. Add <a href="www.productUrl.com"><h4>Product Description</h4></a>
// 4.A. Add Product price with class="product-price" or
// 4.B. Add Product new price with class="product-price-new" and add Product price-old with class="product-price-old" and add Product discount percentage with class="product-price-discount"
// 5. Add Product delivery with class="product-delivery"
// 6. Add Product size with class="product-sizes"
// 7. Add them to the div with id="product-container"
function createProduct(i) {
    // Get products curreny
    var productCurrency = data.products[i].currency;

    // Create new div for product
    var newProduct = document.createElement('div');

    // Add class names to product div
    newProduct.className = "product-" + (i + 1) + " products";

    // Add product image and make it clickable with opening the product in a new tab
    newProduct.innerHTML = "<a target=\"_blank\" href=\"" + data.products[i].url + "\"> <img src=\"" + data.products[i].image + "\" alt=\"" + data.products[i].name + "\"></a>";

    // Add product description header and make it clickable with opening the product in a new tab
    newProduct.innerHTML += "<a target=\"_blank\" href=\"" + data.products[i].url + "\"> <h4>" + data.products[i].name + "</h4></a>";

    // Replace "," with "." and return the string as a decimal number
    var tempOldPrice = data.products[i].price_old.replace(",", ".");
    var oldPrice = parseFloat(tempOldPrice).toFixed(2);

    // Replace "," with "." and return the string as a decimal number
    var tempPrice = data.products[i].price.replace(",", ".");
    var price = parseFloat(tempPrice).toFixed(2);

    // CHECK FOR DISCOUNT
    // Discount is displayed different than non-discount
    if (price != oldPrice) {

        if (oldPrice > 0.00) {
            // Add old and new price tags
            newProduct.innerHTML += "<p class=\"product-price-new\">" + productCurrency + " " + data.products[i].price + "</p>";
            newProduct.innerHTML += "<p class=\"product-price-old\">" + productCurrency + " " + data.products[i].price_old + "</p>";

            // Add discount percentage
            var calculateDiscountPercentage = Math.floor(Math.abs(price / oldPrice * 100 - 100));
            newProduct.innerHTML += "<p class=\"product-price-discount\">" + calculateDiscountPercentage + "% OFF</p>";
        } else {
            // else add price tag if non-discount
            newProduct.innerHTML += "<p class=\"product-price\">" + productCurrency + " " + data.products[i].price + "</p>";
        }
    } else {
        // else add price tag if non-discount
        newProduct.innerHTML += "<p class=\"product-price\">" + productCurrency + " " + data.products[i].price + "</p>";
    }

    // Add product delivery description
    newProduct.innerHTML += "<p class=\"product-delivery\">Levering: " + data.products[i].delivery + "</p>";

    // Add product size description
    newProduct.innerHTML += "<p class=\"product-sizes\"><strong>Størrelse:</strong> " + data.products[i].sizes + "</p>";

    // Append created product to the div id="product-container"
    productContainer.appendChild(newProduct);
}

var filter = document.querySelector(".filter-by");

// Change the product list order depending on the price ascending or descending
function changeFilter() {
    // If "Price Low to High" has been selected, apply changes
    if (parseInt(filter.options[filter.selectedIndex].value) === 1) {
        filterValue = 1;
        clearProducts();
        sortAscend();
        displayProducts();
    }
    // If "Price High to Low" has been selected, apply changes
    else if (parseInt(filter.options[filter.selectedIndex].value) === 2) {
            filterValue = 2;
            clearProducts();
            sortDescend();
            displayProducts();
        }
};

//Sort data depending on price low to high
function sortAscend() {
    data.products.sort(function (a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });
}

//Sort data depending on price high to low
function sortDescend() {
    data.products.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
    });
}

//Clear Products for new layout
function clearProducts() {
    while (productContainer.firstChild) {
        productContainer.removeChild(productContainer.firstChild);
    }
}
