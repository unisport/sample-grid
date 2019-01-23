$(document).ready(function(){
	//Retrives data from api and the following function handles the data.
	$.getJSON("https://www.unisport.dk/api/products/batch/?list=179249,179838,174351,180011,180020,178429", function(data){			
		
		//The first <div> for the boostrap card.
		var html = '<div class="row card-deck container-fluid">'			

		//Puts the data from the api in an empty array.
		var productList = [];												
		$.each(data.products, function(key, item){
			productList.push(item);
		});

		//Sorts through the discount percentage value and arrange them from lowest to highest.
		productList.sort(function(a, b){									
				return a.discount_percentage - b.discount_percentage;
			});

		//This would reverse the discount percentage value order from highest to lowest.
		//productList.reverse(); 	

		//Takes an interger and formats it to danish currency.
		const formatter = new Intl.NumberFormat('da-DK', {			
			style: 'currency',
			currency: 'DKK',
			minimumFractionDigits: 2,
		});

		//This function uses the data from the api and inserts each of the products in a bootstrap card in the html file.		
		$.each(productList, function(key, item){
			var sizeList = [];			
			var productHtml = '<div class="col-md-4">'
				productHtml += '<div class="card mb-4">'

				productHtml += '<div class="card-body">'
				productHtml += '<img src="' + item.image + '" class="card-img-top" alt="">' 
				productHtml += '<h5 class="card-title">' + item.name + '</h5>'
				productHtml += '<button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + "Størrelse" + '</button>'
				productHtml += '<ul class="dropdown-menu aria-labelledby="dropdownMenuButton">' 
				
				//Splits the sizes and adds them to the unorded list above.
				sizeList = item.sizes.split(",");
				$.each(sizeList, function(k, size){
					productHtml += '<li class="dropdown-item" href="#">' + size + '</li>'
				});
				productHtml += '</ul>'

				//Use of the formatter.
				productHtml += '<p class="card-text">' + formatter.format(parseInt(item.price.slice(0,-2))) + '</p>'	 
				productHtml += '<p class="card-text delivery">'+ "Levering " + item.delivery + '</p>'

				//This closes all the <div>'s.
				productHtml += '</div></div></div>'				
					
					html += productHtml;
				})

				//This closes the start <div>.
				html += '</div>'			

				//Puts the whole bootstrap card into the html file.			
				$("#showData").append(html);					

		});

	});
