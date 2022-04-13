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
        var card = document.createElement("div");
        card.classList.add("card");
        card.style.width = '18rem';
        mainContainer.appendChild(card);

        var img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = data[i].image;
        card.appendChild(img);

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody);

        var cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = data[i].name;
        cardBody.appendChild(cardTitle);

        var cardParagraph = document.createElement("p");
        cardParagraph.classList.add("card-text");
        cardParagraph.innerText = data[i].prices.max_price + ' dkk';
        cardBody.appendChild(cardParagraph);

        // div.innerHTML = 'Name: ' + data[i].name;
        // mainContainer.appendChild(div);

        
    }
}

{/* <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}