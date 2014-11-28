/*$.getJSON('data.json', function(data) {
        var output="<table cellspacing=\"0\">";
        for (var i in data.latest) {
        	output+="<tr><td>" + data.latest[i].kids + "</td><td>" + data.latest[i].name + "</td><td>" + data.latest[i].sizes + "</td><td>" + data.latest[i].kid_adult + "</td><td>" + data.latest[i].free_porto + "</td><td>" + data.latest[i].price + "</td><td>" + data.latest[i].package + "</td><td>" + data.latest[i].delivery + "</td><td>" + '<a href="' + data.latest[i].url + '">' + 'url</a>' + "</td><td>" + data.latest[i].price_old + "</td><td>" + '<img scr="' + data.latest[i].img_url + '" />' + "</td><td>" + data.latest[i].id + "</td><td>" + data.latest[i].women + "</td></tr>";
        }

        output+="</table";
        document.getElementById("placeholder").innerHTML=output;
        $("#placeholder").css("font-size","80%");
        $("tr:even").css("background-color","#ff6633");
        $("td").css("padding","2em");
  });*/

$.getJSON('data.json', function(data) {
        var output="<ul>";
        for (var i in data.latest) {
        	output+="<li>"
        	output+= '<img src="' + data.latest[i].img_url + '" />'
        			 + '<div id="description">' + '<ul>' + '<li id="heading"><h3>' + data.latest[i].name + '</h3>' + '</li>' + '<li>' + '<strong>Varenr.:</strong>' + data.latest[i].id  + '</li>' +'<li>' + data.latest[i].sizes + '</li>' + '<li>' + data.latest[i].delivery + '</li>' +'<li id="old_price">' + data.latest[i].price_old + '</li>' + '<li>' + data.latest[i].price + '</li>'+ '</ul>' + '</div>' + '<a class="button" href="#">køb nu</a>';
        	output+="</li>";
        	
        }

        output+="</ul>";
        $("#placeholder").html(output);

  });