function products(data){
	
	// Vis på siden hvor mange produkter der er i denne kategori
	var amountProducts = data.products.length+" produkter i denne kategori";
	$('#amount-products').append(amountProducts);
		
	// For hver produkt i samlpe.json lav et for loop
	for(i = 0; i < data.products.length; i++){
		var $productGrid = $('#product-grid');
		
		// Variable som gør koden mere læsbar og nemmere at vedligeholde
		var url = data.products[i].url;
		var image = data.products[i].image;
		var name = data.products[i].name;
		var price = parseInt(data.products[i].price);
		var currency = data.products[i].currency;
		var oldPrice = parseInt(data.products[i].price_old);
		var delivery = data.products[i].delivery;
		var sizes =  data.products[i].sizes;
		var saveProcent = (oldPrice-price)/oldPrice*100;
		var kidAdult = data.products[i].kid_adult;
		var women = data.products[i].women;
	
		// Produkterne er placeret i et Bootstrap grid som gør siden responsiv
		// Fx 4 produkter på pc og computer, 3 produkter på tablet bred format, 2 produkter på tablet langformat, 1 produkt på smartphone.
		products = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"><a href="' + url + '">\
		<img class="img-fluid product-image" src="' + image + '">\
		<p class="product-name">' + name +'</p>';
		
		// Hvis prisen er lig 0, hvilket gavekortet er, vil der stå "vælg beløb" i stedet for "0"
		if(price == 0){
			products += '<p class="product-price">Vælg beløb</p>';
		} 
		
		// Hvis prisen er over 0, vis prisen rundet til nærmeste decimal, da det ser ud til ingen priser koster noget med øre.
		else if(price > 0) {
			products += '<p class="product-price">' + Math.round(price) + ' <small class="product-currency">' + currency + '</small></p>'; 
		}
		
		// Hvis den gamle pris er større end nuværende pris, vis et rabatmærke i procent samt normalprisen for produktet.
		// Dette er især smart hvis prisen for et produkt bliver sat op, så vil den gamle lavere pris ikke bliver vist.
		if(oldPrice > price){
			products += '<p class="product-price-old">Normalpris ' + oldPrice + '</p>';
			products += '<div class="save-circle">-' + Math.round(saveProcent) + '%</div>';
		}
		
		products +='<p class="product-delivery">Levering ' + delivery + '</p>';
		
		// Jeg har antaget at værdien 1 betyder produktet er til børn.
		if(kidAdult == 1){
			products += '<p class="product-size">Børn: ' + sizes + '</p></a></div>';
		}
		
		// Jeg har antaget at værdien 1 betyder produktet er til kvinder.
		else if(women == 1){
			products += '<p class="product-size">Kvinder: ' + sizes + '</p></a></div>';
		}
		
		// Jeg har antaget at værdien 0 betyder produktet er "one size".		
		else if(kidAdult == 0){
			products += '<p class="product-size">Størrelse: ' + sizes + '</p></a></div>';
		}
		
		// Tilføj html med et produkt af gangen frem for alle produkter på en gang.
		// Denne løsning er valgt så de øverste produkter loader først, uden man behøver at vente på alle produkter er loadet.
		// En forbedring kunne være kun at loade x antal produkter af gang, indtil den besøgende aktivt klikker på en "vis flere" knap eller "gå til næste side"
		$productGrid.append(products);	
	}
}

$(function () {
	$.ajax({
		type: 'GET',
		url: 'sample.json',
        success: function(data) {
            	products(data);
            	// Kun til fejlfinding 
            	//success = 'json data blev hentet';
            	//$("#error-products").text(success);
        },
        error: function(data) {
        	// Fejlmeddelelse kan ikke besøgende se produkter. 
        	// Fejlnummer #126 gør det nemt at identificere hvor fejlen er.
            	error = 'Det er sket en fejl #126. Kontakt support@unisport.dk med fejlnummeret'; 
            	$("#error-products").text(error);
        },
	});
});
