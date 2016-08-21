$(function() {
  console.log("dziala");

  //variables for main ul list
  var productLists = $('.product-container');
  //variable for api url
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
        var img = $('<img>', {src: product.image, class: "small-photo"}); //product img + data-url for maxi-img
        // console.log(img.data());
        var bigPhotoIcon = $('<img>', {src:"D:/WORKSPACE/sample-grid/images/more-zoom.png", class:'big-photo-icon'}).data("big", product.img_url).addClass('hidden');
        console.log(bigPhotoIcon.data());
        var divNameWrap = $('<div>', {class: "name-wrap"}); //div for Name
        var spanName = $('<span>').text(product.name); //span for Name

        var divPriceWrap = $('<div>', {class: "price-wrap"}); //div for Price
        var spanPrice = $('<span>', {class: "price"}).text(product.price); //span for Price
        var supCurrency = $('<sup>', {class: "currency"}).text(" " + product.currency); //currency for Price
        var pOldPrice = $('<p>', {class: "old-price"}); //old Price
          if (product.price_old != "0,00") { //only display when the product indeed had old price
            pOldPrice.text("Before: " + product.price_old);
          } else {
            pOldPrice.text('');
          }
        var divDeliveryWrap = $('<div>', {class: "delivery-wrap"}).addClass("hidden"); //div for Delivery
        var spanDelivery = $('<span>').text("Delivery: " + product.delivery); //span for Delivery
        var formSizeWrap = $('<form>', {class: "size-wrap"}).addClass('hidden'); //form for size-wrap
        var spanSizeLabel = $('<span>').text("Sizes: "); //span for Size-Label
        var spanSizes = $('<span>', {class: "sizes"}).text(product.sizes); //span for Sizes
        //rest of data
        var divOtherWrap = $('<div>', {class: "other-wrap"}); //div for other-wrap
        var pInStock = $('<p>', {class: "in-stock"}); //Online (does it mean in Stock?)
          if (product.online === "1") { //text for displaying when product is in stock
            pInStock.text("In Stock");
          } else {
            pInStock.text(" ");
          }
        var pPackage = $('<p>', {class: "package"}); //pPackage ?????????
          if (product.package === "1") {
            pPackage.text("Package: Yes")
          } else {
            pPackage.text("Package: No");
          }
        var pPorto = $('<p>', {class: "porto"}); //shipping??
          if (product.free_porto === "1") {
            pPorto.text("Free Shipping: Yes");
          } else {
            pPorto.text("Free Shipping: No");
          }
        var pIdNumber = $('<p>', {class: "id-number"}).text("Product No: "); //ID
        var spanIdNumber = $('<span>').text(product.id);


        //create other elements (not json data)
        var divReadMore = $('<div>', {class: "read-more"});
        var aReadMore = $('<a>').text("READ MORE");


      //append elements to DOM
        divProduct.append(aWrap);
        aWrap.append(img);
        aWrap.append(bigPhotoIcon);
        //Name
        aWrap.append(divNameWrap);
        divNameWrap.append(spanName);
        //Price
        aWrap.append(divPriceWrap);
        divPriceWrap.append(spanPrice);
        divPriceWrap.append(supCurrency);
        divPriceWrap.append(pOldPrice);
        //read MORE
        aWrap.append(divReadMore);
        divReadMore.append(aReadMore);
        //Delivery
        aWrap.append(divDeliveryWrap);
        divDeliveryWrap.append(spanDelivery);
        //Sizes
        aWrap.append(formSizeWrap);
        formSizeWrap.append(spanSizeLabel);
        formSizeWrap.append(spanSizes);
        //other
        aWrap.append(divOtherWrap);
        divOtherWrap.append(pInStock);
        divOtherWrap.append(pPackage);
        divOtherWrap.append(pPorto);
        divOtherWrap.append(pIdNumber);
        pIdNumber.append(spanIdNumber);
        // product to DOM
        productLists.append(divProduct);

        //function for showing big photo
        function showBigPhoto() {
          //show and hide zoom icon when hovering on photo
          img.each(function(i,v){
            $(this).on("mouseover", function(){
              $(this).next().removeClass('hidden');
            });
            $(this).on("mouseleave", function(){
              $(this).next().addClass('hidden');
            });
          })

        //show big photo
          bigPhotoIcon.each(function(i,v){
            $(this).on("mouseover", function(){
              $(this).removeClass('hidden');
            });
            $(this).click(function(){
              var imageSource = $(this).data('big');

              var bigImg = $('<img>'); //create big image
              var fullScreen = $('<div>'); // create div that contains big image
              var closeButton = $('<div>'); //create button that exits full screen

              fullScreen.addClass('fullScreen').fadeIn('slow').appendTo($('.photomax-box'));//add fullScreen class and attach to <body>
              bigImg.attr('src', imageSource).appendTo(fullScreen);//add img src and attach to <fullScreen>
              closeButton.addClass('closeButton').appendTo(fullScreen);//add closeButton and attach to <fullScreen>

              $('body').on('click', '.closeButton', function(){ //exits full screen
                fullScreen.fadeOut('slow');
              });
            })
          //hide zoom icon
            $(this).on("mouseleave", function(){
              $(this).addClass('hidden');
            });
          })
        }
        showBigPhoto();
    });
  }

  //Load products and insert them into the DOM
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
