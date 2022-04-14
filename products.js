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
    // reverse to highest discount comes first
    data.reverse();  
 
    // reference main row and add elements using bootstrap cards and additional styling
    var mainRow = document.getElementById("productRow");
    for (var i = 0; i < data.length; i++) {
        var topDiv = document.createElement("div");
        topDiv.classList.add("col-7", "col-sm-6", "col-md-6", "col-lg-4", "px-1", "mx-auto");
        mainRow.appendChild(topDiv);

        var card = document.createElement("div");
        card.classList.add("card", "border", "product-height", "my-2", "box-shadow");
        topDiv.appendChild(card);

        var discountMark = document.createElement("div");
        discountMark.classList.add("label-container", "text-center");
        discountMark.innerText = data[i].prices.discount_percentage + "%";
        if (data[i].prices.discount_percentage > 0) {
            card.appendChild(discountMark);
        }

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
        sizes.innerHTML = "<b>Størrelser: </b>";
        if (data[i].stock.length > 4) {
            sizes.innerText = "Mange størrelser tilgængelige"
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