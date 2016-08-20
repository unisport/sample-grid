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
        var divProduct = $('<div>', {class: "col-4 product"}).data("kids", product.kids).data('kid-adult', product.kid_adult).data('women', product.women); //main product-div
        // console.log(divProduct.data());
        var aWrap = $('<a>', {href: product.url, target: "_blank"}) //link to Product
          aWrap.on('click', function (event) {
            event.preventDefault();
          })
        var img = $('<img>', {src: product.image}).data("bla", product.img_url); //product img + data-url for maxi-img
        // console.log(img.data());
        var divNameWrap = $('<div>', {class: "name-wrap"}); //div for Name
        var spanName = $('<span>').text(product.name); //span for Name

        var divPriceWrap = $('<div>', {class: "price-wrap"}); //div for Price
        var spanPrice = $('<span>', {class: "price"}).text(product.price); //span for Price
        var spanCurrency = $('<span>', {class: "currency"}).text(product.currency); //currency for Price
        var pOldPrice = $('<p>', {class: "old-price"}); //old Price
          if ((product.price_old) != "0,00") { //only display when the product indeed had old price
            pOldPrice.text("Before: " + product.price_old);
          } else {
            pOldPrice.text('');
          }
        var divDeliveryWrap = $('<div>', {class: "delivery-wrap"}); //div for Delivery
        var spanDelivery = $('<span>').text("Delivery: " + product.delivery); //span for Delivery
        var divSizeWrap = $('<div>', {class: "size-wrap"}); //div for size-wrap
        var spanSizeLabel = $('<span>').text("Sizes: "); //span for Size-Label
        var spanSizes = $('<span>').text(product.sizes); //span for Sizes
        //rest of data
        var divOtherWrap = $('<div>', {class: "other-wrap"}); //div for other-wrap
        var pInStock = $('<p>', {class: "in-stock"}); //Online (does it mean in Stock?)
          if (product.online === "1") { //text for displaying when product is in stock
            pInStock.text("In Stock");
          } else {
            pInStock.text("Sold Out");
          }
        var pPackage = $('<p>', {class: "package"}); //pPackage ?????????
          if (product.package === "1") {
            pPackage.text("Package: Yes")
          } else {
            pPackage.text("Package: No");
          }
        var pPorto = $('<p>', {class: "porto"});
          if (product.free_porto === "1") {
            pPorto.text("Free Shipping: Yes");
          } else {
            pPorto.text("Free Shipping: No");
          }
        var pIdNumber = $('<p>', {class: "id-number"}).text("Product No: ");
        var spanIdNumber = $('<span>').text(product.id);


      //append elements to DOM
        divProduct.append(aWrap);
        aWrap.append(img);
        //Name
        aWrap.append(divNameWrap);
        divNameWrap.append(spanName);
        //Price
        aWrap.append(divPriceWrap);
        divPriceWrap.append(spanPrice);
        divPriceWrap.append(spanCurrency);
        divPriceWrap.append(pOldPrice);
        //Delivery
        aWrap.append(divDeliveryWrap);
        divDeliveryWrap.append(spanDelivery);
        //Sizes
        aWrap.append(divSizeWrap);
        divSizeWrap.append(spanSizeLabel);
        divSizeWrap.append(spanSizes);
        //other
        aWrap.append(divOtherWrap);
        divOtherWrap.append(pInStock);
        divOtherWrap.append(pPackage);
        divOtherWrap.append(pPorto);
        divOtherWrap.append(pIdNumber);
        pIdNumber.append(spanIdNumber);
        // product to DOM
        productLists.append(divProduct);
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
