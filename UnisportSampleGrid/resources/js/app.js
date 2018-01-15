//Everything is enclosed inside an IIFE to allow for extensions or to later incorporate the module pattern
(function(){
    /*********************
    *******SETUP**********
    *********************/
    //Declare variables
    var products; //This variable will contain the JSON data as an array of objects
    
    //Send request to fetch the initial JSON when the page loads
    $(document).ready(function() {
        init();
    });

    /******************************
     ******MAIN FUNCTIONS**********
    ******************************/
    function init(){
 
        //This is the CORS-Anywhere proxy server which will add CORS headers to the getJSON request
        const proxy = 'https://cors-anywhere.herokuapp.com/'; 

        //Makes an Ajax call to retrieve the JSON file and display it
        $.getJSON(proxy + 'https://www.unisport.dk/api/sample/', function(data) {
            products = data.products;
            displayProducts();
        });

        //Button listeners for sorting
        $('.sortAsc').on('click',function(){
            sortProducts('asc');
        });
        $('.sortDesc').on('click',function(){
            sortProducts('desc');
        });
    };

    //Create the following structure for each product and display them:
    //<div class="row"> (Create a new row for each 4th product on display)
    //<div class="col span-1-of-4"><ul>
    // Discount shown in top-right of the ul with absolute positioning 
    // <li>Image</li>
    // <li>Name</li>
    // <li>Price (Discount)</li>
    // <li>Price_old</li>
    // <li>Delivery</li>
    // <li>Sizes</li>
    //</ul></div></div>
    function displayProducts(){
        var row;
        var gridArea = document.querySelector('section'); //The section of the page is where the list will be displayed
        var rowNumber = 0;
        var productNumber;

        $.each(products, function(id, product){
            // Create new rows for every 4th product
            if(id % 4 === 0){
            row = document.createElement('DIV');
            $(row).addClass('row');
            gridArea.appendChild(row);
            rowNumber++;
            productNumber = 1;
            }
            
            //Each product will have its own column to populate
            let itemBox = document.createElement('DIV');
            $(itemBox).addClass('col span-1-of-4');

            //The discount of each product is calculated
            let discount = (100 - (convertToInt(product.price) / convertToInt(product.price_old) * 100)).toFixed(0);
            if(isNaN(discount) || convertToInt(product.price_old) === 0) {discount = 0};

            //Constructing the list of information for each product
            itemBox.innerHTML = '<ul><span class="discount">-' + discount + '%</span><li><a href="' + product.url + '"><img src="' + product.image + '"></a></li><li><span class="name">' + product.name + '</span></li><li>Pris: <span class="price">' + product.price + '</span>DKK</li><li><span class="price_old">Vejl. pris:' + product.price_old + 'DKK</span></li><li>Levering: ' + product.delivery + '</li><li><span class="sizes">Størrelse: ' + product.sizes + '</span></li></ul>';

            //Adding the column with the product information to the corresponding row
            row.appendChild(itemBox);

             //Change CSS depending on if sale or not. Removing the discount sticker and 'vejl. pris'.
            if(!onSale(product)){
                $('section div:nth-child(' + rowNumber + ') div:nth-of-type(' + productNumber + ') span.discount').css('display','none');
                $('section div:nth-child(' + rowNumber + ') div:nth-of-type(' + productNumber + ') span.price_old').css('display','none');
             };
             productNumber++;
        });
    };

    //Determine if a product is on sale. Also considers if the old price is 0 as not-on-sale.
    function onSale(product){
        if(convertToInt(product.price) === convertToInt(product.price_old) || convertToInt(product.price_old) === 0)
            return false;
        
        return true;
    };

    //Sorts the list of products by price depending on the argument (will be 'asc' or 'desc')
    //Can be expanded to facilitate additional sorting methods
    function sortProducts(direction){

        if(direction === 'asc'){
            products.sort(function(a, b){
                if (convertToInt(a.price) < convertToInt(b.price)) {return -1};
        
                if(convertToInt(a.price) > convertToInt(b.price)) {return 1};
        
                return 0;
            });
        };

        if(direction === 'desc'){
            products.sort(function(a, b){
                if (convertToInt(a.price) > convertToInt(b.price)) {return -1};
        
                if(convertToInt(a.price) < convertToInt(b.price)) {return 1};
        
                return 0;
            });
        };

        removeProducts();
        displayProducts();
    };

    //Removes the rows containing the products, to empty the grid
    //This allows for repopulating the grid with a different sorting
    function removeProducts(){
        let elements = document.querySelectorAll('section .row');
        $.each(elements, function(index, element){
            $(element).remove();
        });
    };

    /**************************
    *****HELPER FUNCTIONS******
    **************************/
    //Helper function that returns the number value of a string, removing excess '.' as that confuses the parseInt function
    function convertToInt(string){
        return parseInt(string.replace(/\./g,''),10);
    };

})();
