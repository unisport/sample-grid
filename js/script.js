$(function(){

  var url = '/apisample.json';

  $.getJSON(url, function(json){
    var source   = $('#product-template').html();
    var template = Handlebars.compile(source);
    var html = template(json);
    $('.product-grid').append(html);
    $('.product:last-child').addClass('end');
  });

  Handlebars.registerHelper('prettyPrice', function(options) {
    return new Handlebars.SafeString(
        options.fn(this).replace(/\,0*$/, "")
      );
  });

  Handlebars.registerHelper('commaToLineBreak', function(options) {
    separator = ",";
    context = options.fn(this).split(separator);
    var ret = "";
    for(var i=0, j=context.length; i<j; i++) {
      ret += context[i];
      if (i < context.length-1) {
        ret += ", \n";
      }
    }
    return ret;
  });

 Handlebars.registerHelper('capitalize', function(options) {
    var string = options.fn(this);
    return new Handlebars.SafeString(
    string.charAt(0).toUpperCase() + string.slice(1)      
     );
 }); 

});