$(document).ready(function() {

    //Add ellipsis for overflow on the second line of h2s
    //This uses the clamp.min.js plugin
    $("h2").each(function(index, element) {
        $clamp(element, { clamp: 2 });
    });

    //Event for clicking on the sort by price button
    $("#sort_price_button").click(function() {
        if ($(this).hasClass("active")) {
            window.location.replace('index.php?sort=name');
        } else {
            window.location.replace('index.php?sort=price');
        }
    });

    //Event for clicking on switch buttons
    $(".switch_button").click(function() {
        if ($(this).hasClass("active")) {
            $(this).css({ "background-color": "rgb(102, 102, 102)" });
        } else {
            $(this).css({ "background-color": "rgb(0, 87, 0)" });
        }
    });

    //Event for hovering over a size button
    var hover = "";
    var active = "";
    $(".size").hover(function() {
        hover = "#" + this.id;
        if (hover != active) {
            $(hover).css({ "background-color": "rgb(77, 77, 77)", "cursor": "pointer" });
        }
    }, function() {
        if (hover != active) {
            $(hover).css({ "background-color": "rgb(44, 44, 44)" });
        }
        hover = "";
    });

    //Event for clicking on a size button 
    $(".size").click(function() {
        active = "#" + this.id;
        $(".size").css({ "background-color": "rgb(44, 44, 44)" });
        $(active).css({ "background-color": "rgb(0, 87, 0)", "cursor": "default" });
    });

    //Event for clicking on a buy button
    $(".buy_button").click(function() {
        if (active == "") {
            alert("Vælg venligst en størrelse (Please select a size)")
        } else {
            alert(
                "Added " +
                $(".product_header").text() + " " +
                $(active).text() +
                " to cart. Just kidding, this is just a sample after all."
            );
        }
    });

});