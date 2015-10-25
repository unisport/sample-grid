<!DOCTYPE html>

<head>

	<!-- Meta -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

	<!-- CSS -->
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/unisport_test_css.css">
</head>

<body ng-app="unisport_app">

	<!-- Top-menu -->
	<nav class="navbar navbar-default">
		<div class="container">
			<a href="#">
				<img src="http://static-3.unisport.dk/JEtrC2d2OkJVPmLUMPltrGdA7Kq" id="page_logo">
			</a>
		</div>
	</nav>

	<!-- Main-content -->
	<div ng-controller="unisport_product_controller" class="container main_content_container">
		<div ng-repeat="product in products">
			<div class="col-xs-6 col-md-4 product_element">
				<h4>{{ product.name }}</h4>
				<div class="text-center product_discount" ng-if="product.price_old != '0,00'">
					<p>-{{ get_discount(product.price_old, product.price) }}%</p>
				</div>

				<a ng-href="{{ product.url }}">
				<img ng-src="{{ product.img_url }}" on-error-src="http://s3.amazonaws.com/storefront-media/nyheder_img/15576.jpg" class="img-responsive img-rounded" width="100%" height="250px">
				</a>

				<!-- Not quite sure about the purpose of this value:
				<p ng-if="product.kid_adult != 0">kid_adult</p>-->	
				
				<p ng-if="product.kids != 0">kids</p>
				<p ng-if="product.package != 0">package</p>

				<p class="text-center product_price" ng-if="product.price != '0,00'">{{ product.price }} kr.</p>
				<p class="text-center product_price" ng-if="product.price == '0,00'">Bestem selv beløb</p>

				<p class="text-center product_old_price" ng-if="product.price_old != '0,00'"><del>{{ product.price_old }}</del> kr</p>
				<p class="text-center product_old_price" ng-if="product.price_old == '0,00'"><br></p>

				<p class="text-center text-info">Levering: {{ product.delivery }}</p>
				<p ng-if="product.free_porto != 0">Gratis levering</p>

				<p class="product-sizes text-center"><b>Størrelse: </b><span class="text-info">{{ seperate(product.sizes) }}</span></p>				
				<p ng-if=" product.women != 0">Kvinder</p>
			</div>
		</div>
	</div>

	<!-- Data retrieval -->
	<?php 
		$data = file_get_contents('https://www.unisport.dk/api/sample/'); 
	?>

	<!-- Scripts -->
	<script type="text/javascript">
		var JSON_obj = JSON.parse('<?php echo $data ?>')
	</script>
	<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
	<script type="text/javascript" src="js/unisport_js.js"></script>
</body>
</html>
