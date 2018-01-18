<div class="container">
	<div class="row">
		<select class="price-selector" id="price">
			<option id="name">Default</option>
			<option id="Lp">Sort By Lowest Price</option>
			<option id="hp">Sort By Highest Price</option>
		</select>

		<center><h2 class="category">PRODUCTS</h2></center>
		<div id="ns" class=" page col-xs-12">
			<?php 
			foreach ($notSorted as $product) { ?>
					<div class="col-xs-12 col-md-3 product-container">
					<?php echo '<center><img src="'.$product['image'].'" width="100px"></center>'; ?>
					<?php echo '<center><div class="col-xs-12 product-name">'.$product['name'].'</div></center>'; ?>
					<?php echo '<center><div class="col-xs-12 product-price"><span class="price">'.$product['price'].'</span> <span class="currency">Dkk</span></div></center>'; ?>
					<?php if($product['discount%'] > "0"){
					 echo '<div class="col-xs-2 product-discount"><p>'.$product['discount%'].'</p></div>'; 
					}?>					
					<?php echo '<center><div class="col-xs-12 product-sizes">Sizes: <span>'.$product['sizes'].'</span></div></center>'; ?>
					<?php echo '<center><button class="btn"> Add to Cart </button></center>'; ?>
					</div>
			<?php } 
			?>
		</div>

		<div id="bap" class="page col-xs-12" style="display: none;">
			<?php 
			usort($notSorted, "compareLtH");
			foreach ($notSorted as $product) { ?>
					<div class="col-xs-12 col-md-3 product-container">
					<?php echo '<center><img src="'.$product['image'].'" width="100px"></center>'; ?>
					<?php echo '<center><div class="col-xs-12 product-name">'.$product['name'].'</div></center>'; ?>
					<?php echo '<center><div class="col-xs-12 product-price"><span class="price">'.$product['price'].'</span> <span class="currency">Dkk</span></div></center>'; ?>
					<?php if($product['discount%'] > "0"){
					 echo '<div class="col-xs-2 product-discount"><p>'.$product['discount%'].'</p></div>'; 
					}?>					
					<?php echo '<center><div class="col-xs-12 product-sizes">Sizes: <span>'.$product['sizes'].'</span></div></center>'; ?>
					<?php echo '<center><button class="btn"> Add to Cart </button></center>'; ?>
					</div>
			<?php } 
			?>
		</div>

		<div id="bdp" class=" page col-xs-12" style="display: none;">
			<?php 
			usort($notSorted, "compareHtL");
			foreach ($notSorted as $product) { ?>
					<div class="col-xs-12 col-md-3 product-container">
					<?php echo '<center><img src="'.$product['image'].'" width="100px"></center>'; ?>
					<?php echo '<center><div class="col-xs-12 product-name">'.$product['name'].'</div></center>'; ?>
					<?php echo '<center><div class="col-xs-12 product-price"><span class="price">'.$product['price'].'</span> <span class="currency">Dkk</span></div></center>'; ?>
					<?php if($product['discount%'] > "0"){
					 echo '<div class="col-xs-2 product-discount"><p>'.$product['discount%'].'</p></div>'; 
					}?>					
					<?php echo '<center><div class="col-xs-12 product-sizes">Sizes: <span>'.$product['sizes'].'</span></div></center>'; ?>
					<?php echo '<center><button class="btn"> Add to Cart </button></center>'; ?>
					</div>
			<?php } 
			?>
		</div>
	</div>
</div>

<script>
	var activeElement = 'ns';
	var mobile = false;
	var tablet = false;
	var desktop = false;

		if($(window).width() < 400){
		mobile = true;
		}

		if($(window).width() < 850 && $(window).width() > 650){
		tablet = true;
		}

		if($(window).width() < 1200  && $(window).width() > 900){
		desktop = true;
		}

		

		if(mobile){
 				//$('#price').removeClass( "price-selector" ).addClass( "price-selector-mobile" );
 				$('.container').css({"margin-top": "150px"});
 				$('#price').css({"top": "130px", "right": "5%", "width": "90%"});
 				$('.product-discount').css({"right":"10%"});
		}

		if(tablet){
			$('.container').css({"margin-top": "100px"});
			$('#price').css({"top":"130px", "right": "5%"});
			$('.product-discount').css({"right":"30%", "width":"50px"});
		}

		if(desktop){
			$('#price').css({"top":"210px", "right": "5%"});
		}

$('#price').change(function(){
	console.log($('#price').val());
	if($('#price').val() == "Sort By Lowest Price" && activeElement != "bap"){
		$('#' + activeElement).fadeOut(800);
		setTimeout(function(){
			$('#' + activeElement).hide();
			$('#bap').fadeIn(800);
			activeElement = "bap";
		}, 800);
	}
	else if($('#price').val() == "Sort By Highest Price" && activeElement != "bdp"){
		$('#' + activeElement).fadeOut(800);
		setTimeout(function(){
			$('#' + activeElement).hide();
			$('#bdp').fadeIn(800);
			activeElement = "bdp";
		}, 800);
	}
	else if($('#price').val() == "Default" && activeElement != "ns"){
		$('#' + activeElement).fadeOut(800);
		setTimeout(function(){
			$('#' + activeElement).hide();
			$('#ns').fadeIn(800);
			activeElement = "ns";
		}, 800);
	}
});
	
</script>