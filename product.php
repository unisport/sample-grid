<?php 

$data = file_get_contents("https://www.unisport.dk/api/sample/");
$json = json_decode($data);

foreach ($json->products as $i) {
	$item['price'] = (int)$i->price;
	$item['name'] = ucfirst($i->name);
	$item['sizes'] = $i->sizes;
	$item['image'] = $i->image;
	$item['discount%'] = getDiscount($i->price_old, $i->price); 
	$notSorted[] = $item;
}

function replaceSizes($text){
	$newText = str_replace("2XL","XXL", $text);

	return $text;
}

function compareLtH($a, $b){
    if ($a == $b){
        return 0;
    }
    return ($a > $b);
}

function compareHtL($a, $b){
    if ($a == $b){
        return 0;
    }

    return ($a < $b);
}

function getDiscount($old, $new){
	if($old <= "0,00") {
		return "0";
	}
	else {
	$diff = $old - $new;
	$percentage = $diff/$old * 100;
	if($percentage > 0){
		return (int)$percentage."%";
		}
	}
}

 ?>