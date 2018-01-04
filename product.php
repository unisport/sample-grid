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

    //Function for searching a multidimensional array by id
    function search_by_id($array, $id){
        $length = sizeof($array);
        
        $key = -1;
        foreach($array as $item){
            $key++;
            if($item->id == $id){
                return $key;
            }
        }
        return null;
    }

    //Find the data for the product
    $key = search_by_id($json->products, $_GET["id"]);
    $product_data = $json->products[$key];

    //Function for finding, slicing and displaying sizes
    function layout_sizes($sizes){
        $html = "";
        $sizes = explode(", ", $sizes);
        $key = 1;
        foreach($sizes as $size){
            $html .= '<h5 id="size_' . $key . '" class="size">' . $size . '</h5>';
            $key++;
        }
        return $html;
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
    <div>
        
        <?php 
        //Info
        $free_porto = "Nej";
            if($product_data->free_porto == "1"){
                $free_porto = "Ja";
            }
        $is_customizable = "Nej";
            if($product_data->is_customizable == "1"){
                $is_customizable = "Ja";
            }

        //Sizes
        $sizes = layout_sizes($product_data->sizes);
        
        //Availability
        $availability_online = "red";
        $availability_store = "red";
        if($product_data->online == "1"){
            $availability_online = "green";
        }
        if($product_data->package == "1"){
            $availability_store = "green";
        }
        $availability = '
        <div class="availability_box">
            <div class="switch_div switch_div_' . $availability_online . '"><b>Online</b></div>
            <div class="switch_div switch_div_' . $availability_store . '"><b>Butik</b></div>
        </div>
        ';

        $discount = "</div>";
            /*
            If there's a discount on the product, 
            include the old price and the discount percentage
            */ 
            if ($product_data->discount_type != "None"){
                $percent = ceil($product_data->price / $product_data->price_old * 100);

                $discount = '
                    <div class="price_old">
                        <span>' . $product_data->price_old . '</span> (' . $percent . '%)
                    </div>
                </div>
                <div class="discount_limit">
                    <b>Tilbud gælder hele ' . $product_data->discount_type . '</b>
                </div>
                ';
            }
        

        echo('
        <h2 class="product_header">' . $product_data->name .'</h2>
        <div product_content>
            <img class="img_large" src="' . $product_data->img_url . '" alt="' . $product_data->name .'">
            <div class="product_info">
                <h4>Leveringstid: ' . $product_data->delivery .'</h4>
                <h4>Fri porto: ' . $free_porto .'</h4>
                <h4>Customizable: ' . $is_customizable .'</h4>
                <h4>Størrelse:</h4>
                ' . $sizes . '
                <br>
                <h4>Tilgængelig:</h4>
                ' . $availability . '
                <br><br><br><br><br>
                <div class="discountbox">
                    <div class="pricebox">
                    <div class="price">' . $product_data->price . " " . $product_data->currency . '</div>
                    ' . $discount . '
                </div>
                <div class="buy_button"><b>Føj til kurven</b></div>
            </div>
            
        </div>
        ');
        ?>

        

    </div>

</body>

</html>