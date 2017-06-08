<?php 
$host = 'localhost';
$user = 'root';
$pass = '';
$db = "campain";
$mysqli	 = new mysqli($host,$user,$pass,$db); 

$mysqli->set_charset('utf8');

$result = $mysqli->query 
        //SELECT queries are always return as mysqli result objects
        ("SELECT * FROM products") 
        or die($mysqli->error); 



function getProducts(){
	global $mysqli	;
	$get_products = "select * from products";
	$run_products = mysqli_query($mysqli, $get_products);
	while($row_ofProducts=mysqli_fetch_array($run_products)) {
		
		$product_id = $row_ofProducts['id'];
		$product_online = $row_ofProducts['online'];
		$product_is_customizable= $row_ofProducts['is_customizable'];
		$product_kids = $row_ofProducts['kids'];
		$product_kid_adult = $row_ofProducts['kid_adult'];
		$product_women = $row_ofProducts['women'];
		$product_free_porto = $row_ofProducts['free_porto'];
		$product_package = $row_ofProducts['package'];	
		$product_name = $row_ofProducts['name'];
		$product_image = $row_ofProducts['image'];
		$product_img_url = $row_ofProducts['img_url'];
		$product_url = $row_ofProducts['url'];
		$product_sizes= $row_ofProducts['sizes'];
		$product_delivery = $row_ofProducts['delivery'];
		$product_delivery = $row_ofProducts['delivery'];
		$product_corrency = $row_ofProducts['corrency'];
		$product_price= $row_ofProducts['price'];
		$product_price_old = $row_ofProducts['price_old'];
	
		echo "
		<div class='box'>
		
		 <div class='box' >
                <img  src='img/football-155528.svg'' alt=''/>
                <div class='text-block'>
                    <h3 class='title'>$product_name</h3>
                    <h4 class='pris'><span class='old'>$product_price</h4>
                    <p class='størrelser'>
                       $product_sizes
                    </p>
                </div>
		</div>
		";
		
	}

	
}

?>