requirejs.config({
	paths: {
		'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min',
		'bootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min',
		'handlebars': 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.2/handlebars.min',
		'respond': 'https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js'
	},
	shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

requirejs(["modules/produkter"]);