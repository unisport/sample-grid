<?php 
//load all required files at once..
$files = array('product.php', 'header.php', 'front.php', 'footer.php');
		foreach ($files as $file) {
			require($file);
		}
?>