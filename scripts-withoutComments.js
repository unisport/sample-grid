document.addEventListener("DOMContentLoaded", function () {
    
    function GetData() {
        $.getJSON("http://query.yahooapis.com/v1/public/yql", {
            q: "select * from json where url=\"https://www.unisport.dk/api/sample\"",
            format: "json"
        },
        function (data) {
            if (data.query.results) {
                    GetDataCB(data.query.results.json.products);
                } else {
                    alert('Connection not established');
                }
            }
        );
    }

    function GetDataCB(data) {
    var ul = document.getElementById("productsWrapper");
        for (var i=0; i<data.length; i++) {
        
            ul.innerHTML += `<li>\
    <div class="product">\
        <a class="product-slider-tagref" href="`+ data[i].url +`">\
        <div class="splash"></div>\

            <div class="image-wrap">\
               <img data-src="" src="`+ data[i].image +`" alt="` + data[i].name +`">\
            </div>\

            <div class="shadow "></div>\

            <div class="name-wrap">\
                <span>` + data[i].name +`</span>\
            </div>\

            <div class="price-wrap">\
                <span class="price">` + data[i].price +`</span>\
                <span class="currency">` + data[i].currency +`</span>\
            </div>\

            <div class="delivery-wrap">\

                    <p class="price-p"><span class="price-label"></span>&nbsp;<span class="price"></span></p>\


                <p class="delivery-p">Levering: <span class="delivery">` +  data[i].delivery +`</span></p>\
            </div>\

            <div class="sizes-wrap">\
                <span class="size-label">STØRRELSE:</span>\
                <span class="sizes">` + data[i].sizes +`</span>\
            </div>\
        </a>\
    </div>\
    </li>`;
        }
    }
    
    GetData();
});