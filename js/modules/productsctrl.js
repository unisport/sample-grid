// App.js
define(["./config", "jquery", "handlebars", "modernizr"], function ( cfg, $, Handlebars, Modernizr ) {
  'use strict';
  
  var targ = cfg.domTarget;
  var products = [];

  $.getJSON( cfg.dataUrl, function ( data ) {
    
    $.each( data.products, function ( i, product ) {
      if ( product.price === '0,00' ) {
        product.price = null;
      }
      products.push( product ); 
    });

    var markup = '';

    var mod4 = Handlebars.compile( $('#tmpl-mode-4').html() );
    markup += mod4( {"products": products.slice( 0, 3 )} );

    markup += mod4( {"products": products.slice( 4, 7 )} );

    markup += mod4( {"products": products.slice( 8, 11 )} );
    
    $( targ ).html( markup );
  });
});
