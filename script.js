
var AppVM = AppVM || function(){
    var Products = ko.observableArray();
    var LoadJson = function (json) {
        jQuery.each( json.products, function (index,value) {
            Products.push(value);
        } );
    };
    var Visible = function(price,price_old){
        var old_p =parseFloat(price_old);
        var new_p =parseFloat(price);
        if(old_p > 0.00&&old_p!==new_p){
            return "visible";
        }else{
            return "hidden";
        }
    };
    var DiscountPercentage = function(price,price_old){

        var old_p =parseFloat(price_old);
        var new_p =parseFloat(price);
        if(old_p > 0.00){
            return parseInt(-100*(old_p-new_p)/old_p);
        }else{
            return 0;
        }
    };
    var BackgroundColor = function (price,price_old) {
        var BackgroundColor;
        var discount = -1*this.DiscountPercentage(price,price_old);
        if(discount>0&&discount<=20) {
            BackgroundColor="#0abf5a";
        }else if (discount>20&&discount<=100){
            BackgroundColor="#ff0";
        }else {
            BackgroundColor="none";
        }
        return BackgroundColor;
    }
    var Sort_priceLowest = function () {
        Products.sort(function(left,right){
            return parseFloat(left.price) == parseFloat(right.price) ? 0 :
                (parseFloat(left.price) < parseFloat(right.price) ? -1 : 1)
        });
        $("#orderby_input").val("Price lowest");
    }
    var Sort_priceHigest = function () {
        Products.sort(function(left,right){
            return parseFloat(left.price) == parseFloat(right.price) ? 0 :
                (parseFloat(left.price) > parseFloat(right.price) ? -1 : 1)
        });
        $("#orderby_input").val("Price Highest");
    }
    return{
        Products:Products,
        LoadJson:LoadJson,
        Visible:Visible,
        DiscountPercentage:DiscountPercentage,
        BackgroundColor:BackgroundColor,
        Sort_priceLowest:Sort_priceLowest,
        Sort_priceHigest:Sort_priceHigest
    }
}();
ko.applyBindings(AppVM);
$(document).ready(function(){
    $.getJSON("/../Unisport/data/product.json",function(data){
        AppVM.LoadJson(data);
    })
    $("#orderby_input").val("");
});

