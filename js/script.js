$(function(){

  //Change to actual API url when in production, using local file for now.
  var url = '/apisample.json';

  $.getJSON(url, function(json){
    var source   = $("#product-template").html();
    var template = Handlebars.compile(source);
    var html = template(json);
    $('.product-grid').append(html);

    //add Foundation class 'end' to display last line correctly.
    $('.product:last-child').addClass('end');
  });

  Handlebars.registerHelper('prettyPrice', function(options) {
    return new Handlebars.SafeString(
        options.fn(this).replace(/\,0*$/, "")
      );
  });

  Handlebars.registerHelper('csvToList', function(options) {
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

});