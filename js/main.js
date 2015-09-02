requirejs.config({
  "baseUrl": "/js/vendor",
  "paths": {
    "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min",
    "modernizr": "//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min",
    "handlebars": "//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.0/handlebars.min",
    "modules": "../modules"
  }
});
// Define modules app file
requirejs(["modules/productsctrl"]);
