// Unisport JS

/** For seeing the sorted JSON object **/
console.dir(JSON_obj);

// Angular functionalities

var app = angular.module("unisport_app", []);

// Angular directives

/** on-error-src for a default image, in case no image found **/
app.directive('onErrorSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.onErrorSrc) {
          attrs.$set('src', attrs.onErrorSrc);
        }
      });
    }
  }
});

// Angular controller

app.controller('unisport_product_controller', ['$scope', function($scope) {


  /** Setting up the JSON object from external source **/
	$scope.products = JSON_obj.products;

  /** Calculating discount **/
  $scope.get_discount = function(old_price, new_price) {

    old_price = parseInt(old_price.replace(/.00/g, '').replace(/\./g, ''));
    new_price = parseInt(new_price.replace(/.00/g, '').replace(/\./g, ''));

    var discount = ((old_price-new_price)/old_price) * 100;
    discount = parseInt(discount);

    return discount;
  }

  /** Making a whitespce after each comma for readability. 
      And limiting number of entries, if too many **/
  $scope.seperate = function(data) {

    var sizes_array = data.split(',');
    array_length = sizes_array.length;

    if (array_length>7) {
      var lowest_size = "Fra " + sizes_array[0];
      var highest_size = " til " + sizes_array[array_length-1];

      return lowest_size + highest_size;

    }else{

      data = data.replace(/,/g, ', ');
      return data;
    }
  }

}]);
