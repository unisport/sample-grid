define(['jquery', 'handlebars'], function($, Handlebars) {

	//handlebar helper, til at indsætte bootstrap row hver 4 produkt.
Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});


//henter json og indsætter det i handlebars template
	$.getJSON('js/data/produkter.json', function(data) {
		var template = $('#produkter').html();
		var html = Handlebars.compile(template)(data);
		$('body').html(html);
	});

});