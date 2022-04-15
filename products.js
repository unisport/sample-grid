// get json
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

// pass json array to function to use data in loop
function appendData(data) {

    // function to sort json objects 
    function GetSortOrder() {    
        return function(a, b) {    
            if (a.prices.discount_percentage > b.prices.discount_percentage) {    
                return 1;    
            } else if (a.prices.discount_percentage < b.prices.discount_percentage) {    
                return -1;    
            }    
            return 0;    
        }    
    }    
    // pass json array using function to sort
    data.sort(GetSortOrder());
    // reverse so highest discount comes first
    data.reverse();  
 
    // reference main row and add elements using bootstrap cards and additional personal styling
    var mainRow = document.getElementById("productRow");
    for (var i = 0; i < data.length; i++) {
        var topDiv = document.createElement("div");
        topDiv.classList.add("col-6", "col-md-4", "col-lg-3", "px-2", "mx-auto", "hover");
        mainRow.appendChild(topDiv);

        // add bootstrap card
        var card = document.createElement("div");
        card.classList.add("card", "border", "product-height", "my-2", "box-shadow");
        topDiv.appendChild(card);

        // creating a container for the potential info tags
        var infoBox = document.createElement("div");
        infoBox.classList.add("info-container", "text-center");
        card.appendChild(infoBox);

        // if discount present then add corner div
        if (data[i].prices.discount_percentage > 0) {
            var discountMark = document.createElement("div");
            discountMark.classList.add("discount", "mb-2");
            discountMark.innerText = "-" + data[i].prices.discount_percentage + "%";
            infoBox.appendChild(discountMark);
        }
        
        // If members only then add the label
        if (data[i].labels.length > 0 && data[i].labels[0].name === "Kun medlemmer") {
            var membersOnly = document.createElement("div");
            membersOnly.classList.add("members");
            membersOnly.innerText = "Kun medlemmer";
            infoBox.appendChild(membersOnly);
        }

        // add product image to card
        var img = document.createElement("img");
        img.classList.add("card-img-top", "img-fluid", "mx-auto", "pt-2");
        img.src = data[i].image;
        card.appendChild(img);

        // add card body
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody);

        // add title to card body
        var title = document.createElement("h5");
        title.classList.add("lead", "product-name", "mx-auto");
        // set max title string length to 60 chars
        var titleShortened = data[i].name.slice(0, 40) + (data[i].name.length > 40 ? "..." : "");
        title.innerText = titleShortened;
        cardBody.appendChild(title);

        // create price container to host price/old price
        var priceContainer = document.createElement("div");
        priceContainer.classList.add("price-container");
        cardBody.appendChild(priceContainer);

        // create price, will be added after logic underneath
        var price = document.createElement("div");
        price.classList.add("card-text", "price");
        
        // if discount present then old price is crossed out and shown underneath, updated price shown
        if (data[i].prices.discount_percentage > 0) {
            // calculating discount and rounding down to two decimals
            let calculatedNewPrice = data[i].prices.max_price*(1-(data[i].prices.discount_percentage/100));
            let NewPriceRoundedDown = Math.floor(calculatedNewPrice);
            price.innerHTML = NewPriceRoundedDown + ' kr';
            priceContainer.appendChild(price);

            // adding old price crossed out underneath
            var oldPrice = document.createElement("div");
            oldPrice.classList.add("card-text", "old-price", "text-muted", "pb-2");
            oldPrice.innerHTML = "<s>" + data[i].prices.max_price +  " kr</s>";
            priceContainer.appendChild(oldPrice);
        } else {
            // regular price added if no discount
            price.innerText = Math.floor(data[i].prices.max_price) + ' kr';
            price.classList.add("pb-2");
            priceContainer.appendChild(price);
        }

        // Sizes added, but if end string longer than 45 chars it wil be replaced with standard sentence
        var sizes = document.createElement("p");
        sizes.classList.add("card-text", "sizes", "text-muted");
        sizes.innerHTML = "<b>Størrelser: </b><br>";
        for (var j = 0; j < data[i].stock.length; j++) {
            if (j == data[i].stock.length - 1) {
                sizes.innerHTML += data[i].stock[j].name;
            } else {
                sizes.innerHTML += data[i].stock[j].name + ", ";
            }
        }

        if (sizes.innerText.length > 45) {
            sizes.innerHTML = "<b>Størrelser: </b><br>Mange størrelser tilgængelige";
        }
        cardBody.appendChild(sizes);
    }

}