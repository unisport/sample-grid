document.addEventListener("DOMContentLoaded", function () {
    
    /*request data from the API*/
    /*not being on the same domain CORS blocked the connection to the api*/
    /*yql - yahoo query language is a web crawler method to get data from an website and avoid CORS*/
    function GetData() {
        $.getJSON("http://query.yahooapis.com/v1/public/yql", {
            /*the query of what we want select and the source*/
            q: "select * from json where url=\"https://www.unisport.dk/api/sample\"",
            format: "json"
        },
        function (data) {
            //if there's any data, the callback is executed
            if (data.query.results) {
                    GetDataCB(data.query.results.json.products);
                } else {
                    /*in case something wrong happened there will be an alert so that we know there's a problem*/
                    alert('Connection not established');
                }
            }
        );
    }

    function GetDataCB(data) {
    var ul = document.getElementById("productsWrapper");
        for (var i=0; i<data.length; i++) {
        
        /*each object will be added to the unordered list and grab data from the specific product*/
        /*the structure below is the same as unisport.dk has*/
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
    
    /*call the method of getting data as soon as the DOM is loaded*/
    GetData();
});