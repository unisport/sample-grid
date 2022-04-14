fetch('products.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function appendData(data) {
    var mainContainer = document.getElementById("productRow");
    for (var i = 0; i < data.length; i++) {
        var topDiv = document.createElement("div");
        topDiv.classList.add("col-7", "col-sm-6", "col-md-6", "col-lg-4", "px-1", "mx-auto");
        mainContainer.appendChild(topDiv);

        var card = document.createElement("div");
        card.classList.add("card", "border", "product-height", "my-2", "box-shadow");
        topDiv.appendChild(card);

        var img = document.createElement("img");
        img.classList.add("card-img-top", "img-fluid", "all-products-img", "mx-auto", "pt-2");
        img.src = data[i].image;
        card.appendChild(img);

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody);

        var title = document.createElement("h5");
        title.classList.add("lead", "product-name", "mx-auto");
        title.innerText = data[i].name;
        cardBody.appendChild(title);

        var price = document.createElement("p");
        price.classList.add("card-text", "price");
        price.innerText = data[i].prices.max_price + ' dkk';
        cardBody.appendChild(price);

        var sizes = document.createElement("p");
        sizes.classList.add("card-text", "sizes");
        sizes.innerText = "Størrelser: ";
        if (data[i].stock.length > 4) {
            sizes.innerText = "Adskillige størrelser tilgængelige"
        } else {
            for (var j = 0; j < data[i].stock.length; j++) {
                if (j == data[i].stock.length - 1) {
                    sizes.innerText += data[i].stock[j].name;
                } else {
                    sizes.innerText += data[i].stock[j].name + ", ";
                }
            }
        }
        cardBody.appendChild(sizes);
    }
    
}