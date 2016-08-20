$(function() {
  console.log("dziala");

  //variables for main ul list
  var productLists = $('.product-container');
  //variables for url
  var productUrl = 'https://www.unisport.dk/api/sample';


  /* Insert Products to DOM  */
  function insertContent(content) {
    $.each(content, function(indexProduct, product) {
       // create new elements
        var div = $('<div>', {class: "col-4 product"});
        var img = $('<img>', {src: product.image});
        var p = $('<p>', {class: 'name'}).text(product.name);


      //append elements to DOM
        div.append(img);
        div.append(p);

        productLists.append(div);
    });
  }

  /* Load products and insert them into the DOM
  */
  function loadProducts() {
        $.ajax({
            	url: productUrl
        }).done(function(response){
     		    insertContent(response.products)
    	 }).fail(function(error) {
           console.log(error)
       })
  }

  loadProducts();

});
