$(document).foundation()

/* JSON - data - udtræk */
$.getJSON("js/sample.json",{}, function(result){
	/* Dette er en ganske almindelig foreach løkke - som kører gennem et loop*/
	$.each(result.products, function(key, val){
		/* Her er vi nød til at skabe lidt html-elementer selv - blandt andet fordi vi skal kunne dele vores grid op */
		var largeThreeColumns = $("<div/>").attr({"class":"large-3 columns"});
		var callOut = $("<div/>").attr({"class":"callout success thumbnail"});
		var pCallout = $("<div/>").attr({"class":"callout"});
		var myRow = $("<div/>").attr({"class":"row"});
		var pCurrency = $("<span/>").attr({"class":"currency"}).append(val.currency);

		/* den er lidt lakrids - her tjekker jeg på om der kun er en størrelse. For er der kun det, så er der ingen grund til at køre hele listen igennem*/
		if(val.sizes != "One Size"){
			var splitedSizes = val.sizes.split(',');
			var prodDropdownLI = $("<div/>").attr({"class":" warning"}).append(val.sizes);
			var pDetailsCallout = $("<p/>").attr({"class":"callout"}).append("Størrelser:").append(prodDropdownLI);
		}
		
		var buyCallout = $("<div/>").attr({"class":"callout offBorder"});
		var image = $("<img/>").attr({"class":"b-lazy","data-src":val.image, "src":"images/placeholder-image.png", "alt":val.name});
		var largeTwelveColumns = $("<div/>").attr({"class":"large-12 columns"});
		var largeNineColumns = $("<div/>").attr({"class":"large-9 columns"});
		var prodDescription = $("<p/>").append("<h4>"+val.name+"</h4>");
		var prodDelivery = $("<p/>").attr({"class":" warning label"}).append("Levering: " + val.delivery);

		/* eftersom jeres førpriser er...screwed, så virker min udregning helt i skoven*/
		/***
			Her prøvede jeg at lave en slags procent beregner, altså den rabat du spare i procent, men det...koden virker som den skal, men priserne er lidt løjerlige
		***/
		var calculatedDiscount  = parseFloat(parseInt(val.price, 10) * 100)/ parseInt(val.price_old, 10);
		if (!isFinite(calculatedDiscount)) calculatedDiscount = 0;
		var prodDiscountPrice = $("<span/>").attr({"class":"alert label"}).append("F&oslash;r pris; "+val.price_old + " - Du sparer;" + calculatedDiscount || '' +'%');

		var pTag = $("<p/>").attr({"class":""});
		var prodBuyNowBtn;

		/***
			Det her kan være lidt tricky, men egentlig tjekker jeg bare på om prisen er kr. 0 eller mere. Hvis prisen er kr.0, er der jo ingen grund til at sige brugeren kan købe noget, 
			så i stedet beder vi brugeren kontakte unisport personligt...det er dog ikke det der sker bagved, men det var min tanke.
		***/
		if(val.price != "0,00" ){
			var prodPrice = $("<span/>").attr({"class":" small button success break price"}).append(val.price).append(pCurrency);
			prodBuyNowBtn = $("<a/>").attr({"class":"small button break buyNow", "href":val.url, "target":"_blank"}).append("Køb nu");
		}else{
			prodBuyNowBtn = $("<a/>").attr({"class":"small button break", "href":val.url, "target":"_blank"}).append("Forh&oslash;r hos unisport.dk");
		}

		/***
			Hernede appender vi alt vores kode til de forskellige ting. Det vil sige - vi siger til vores DOM-træ; hej B du skal være under P...f.eks.
		***/
		buyCallout.append(pTag.append(prodPrice).append(prodBuyNowBtn));
		callOut.append(image);
		pCallout.append(prodDescription).append(prodDiscountPrice).append(prodDelivery);
		largeThreeColumns.append(callOut).append(buyCallout);
		largeTwelveColumns.append(pCallout.append(myRow.append(largeNineColumns.append(pDetailsCallout )  ).append(largeThreeColumns)));
		/***
			Til sidst binder vi vores virtuelle DOM-træ til en div på selv siden
		***/
		$("div#unisportProdukt").append( largeTwelveColumns);		
	});
});