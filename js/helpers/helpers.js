/**
 * Replace string by another string
 */
Handlebars.registerHelper("replace", function (str, oldValue, newValue) {
	var res = str.split(oldValue).join(newValue);

	return res;
});

/**
 * Check if product have discount, if yes then process inner template
 */
Handlebars.registerHelper('isDiscount', function (oldPrice, options) {
	if (parseInt(oldPrice) !== 0) {

		return options.fn(this)
	}
});

/**
 * Count discount (percentage value)
 */
Handlebars.registerHelper('discount', function (currentPrice, oldPrice) {

	var priceBefore = oldPrice.replace(".", "").replace(",", "."), //normalize str to float
		priceAfter = currentPrice.replace(".", "").replace(",", "."),
		discount;

	priceBefore = parseFloat(priceBefore);
	priceAfter = parseFloat(priceAfter);
	discount = ((priceBefore - priceAfter) / priceBefore) * 100;

	return Math.floor(discount);
});