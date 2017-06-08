<?php
// information for DB
$db_host	= 'localhost';
$db_user	= 'root';
$db_pass	= '';
$db_name	= 'json_import';

// connect to db
$mysqli		= new mysqli($db_host, $db_user, $db_pass, $db_name);

// secure db is using utf8 
$mysqli->set_charset('utf8');

// if a file is uploaded
if ( isset($_FILES['json']) && !empty($_FILES['json']['tmp_name']) ) {
	// convert json-object in to a php-object
	$object = json_decode( file_get_contents( $_FILES['json']['tmp_name'] ) );

	// create a emty array 
	$value_array = [];

	// work every product in the object
	foreach ($object->products as $product) {
		/*echo "<pre>";
		print_r($product);
		echo "</pre>";*/

		// add values to the array for the insert
		$value_array[] = "('$product->is_customizable', '$product->delivery', '$product->kids', '$product->name', '$product->sizes', '$product->kid_adult', '$product->free_porto', '$product->image', '$product->package', '$product->price', '$product->url', '$product->online', '$product->price_old', '$product->currency', '$product->img_url', '$product->id', '$product->women')";
	}

	// prepere the insert
	$query = "INSERT INTO products (is_customizable, delivery, kids, name, sizes, kid_adult, free_porto, image, package, price, url, online, price_old, currency, img_url, id, women) VALUES ";

	// create array with values and convert to comma separated streng and add insert command
	$query .= implode(', ', $value_array);

	// send requist to db
	$result = $mysqli->query($query);

	echo "Din fil blev analyseret og der blev tilføjet $mysqli->affected_rows nye produkter til databasen";
}
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
	<h1>JSON</h1>
	<form method="post" enctype="multipart/form-data">
		<label>
			Fil med JSON-object:
			<input type="file" name="json" id="json" required>
		</label>
		<button type="submit">Upload</button>
	</form>
</body>
</html>