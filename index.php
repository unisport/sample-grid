<?php 
    //Get data from url and decode
    $data = file_get_contents('http://www.unisport.dk/api/sample/');
    $json = json_decode($data);

    //Correct the first letter of names where upper case is not present
    foreach ($json->products as $product) {
        if (ctype_upper($product->name[0]) == false){
            $product->name = ucfirst($product->name);
        }
    }

    //Sorting functions
    function sort_by_name($a, $b){
        return strcmp ($a->name, $b->name);
    }
    function sort_by_price($a, $b){
        return strnatcmp ($a->price, $b->price);
    }

    //Ignore error notices beyond this point
    error_reporting(E_ALL & ~E_NOTICE);
?>

<!doctype html>
<html lang="dk">

<head>
    <title>Unisport Employment Assignment</title>

    <!-- Meta -->
    <meta name="description" content="Her er vores liste af produkter">
    <meta name="keywords" content="unisport, products, produkter">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Stylesheets -->
    <link rel="stylesheet" type="text/css" href="main.css" />

    <!-- Scripts -->
    <script src="plugins/jquery-3.2.1.min.js"></script>
    <script src="plugins/clamp.min.js"></script>
    <script src="custom.js"></script>

</head>

<body>
    <div class="header">
        <a href="index.php"><h1>Unisport Sample</h1></a>
    </div>
    <div class="menu">
        <div id="sort_price_button" class="switch_button <?php if($_GET["sort"] == "price"){echo("active");} ?>">
            Sorter efter pris
        </div>
    </div>
    <div id="content">
        
        <?php 

        //Switch for sorting the products
        switch ($_GET["sort"]) {
            case "name":
            usort ($json->products, "sort_by_name");
                break;
            case "price":
            usort ($json->products, "sort_by_price");
                break;
            default:
            usort ($json->products, "sort_by_name");
        }
        

        foreach ($json->products as $product) {
            
            $discount = "";
            /*
            If there's a discount on the product, 
            include the old price and the discount percentage
            */ 
            if ($product->discount_type != "None"){
                $percent = ceil($product->price / $product->price_old * 100);

                $discount = '<div class="price_old price_old_resp"><span>' . $product->price_old . '</span> (' . $percent . '%)</div>';
            }

            //Echo the html for every product
            echo('
            <div class="product">
                <a href="product.php?id=' . $product->id . '">
                    <h2>' . $product->name . '</h2>
                </a>
                <img src="' . $product->image . '" alt="' . $product->name . '">
                <div class="pricebox">
                    <div class="price price_resp">' . $product->price . " " . $product->currency . '</div>
                    ' . $discount . '
                </div>
            </div>
            ');
        }

        ?>

    </div>

</body>

</html>