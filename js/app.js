$(function () {
	var $container = $(".productsContainer div"),
		html = '',
		source = $("#productsListTemplate").html(),
		template = Handlebars.compile(source);

	$.getJSON('data/data.json',function (data) {
		var products = data.latest;

		html = template({products: products});
		$container.html(html);

		/**
		 * Sort actions
		 */
		$(".jqs-sortButton").on('click', function (ev) {
			var target = ev.currentTarget, sortedProducts = [];
			ev.preventDefault();

			if (target.id === 'sortByName') { //check which sort should be used
				sortedProducts = _.sortBy(products, function (product) {

					return product.name;
				});
			} else {
				sortedProducts = _.sortBy(products, function (product) {
					var str = product.price.replace(".", "").replace(",", ".");

					return  parseFloat(str);
				});
			}
			html = template({products: sortedProducts});
			$container.html(html);
		});
	}).fail(function () {
			source = $("#errorTemplate").html();
			template = Handlebars.compile(source);
			html = template({error: 'Sorry, but there is a problem with obtaining products data, please try again later.'});

			$(".errorContainer div").html(html);
		});
});