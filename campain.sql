-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 06. 06 2017 kl. 07:52:38
-- Serverversion: 10.1.19-MariaDB
-- PHP-version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campain`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `products`
--

CREATE TABLE `products` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `online` tinyint(3) UNSIGNED NOT NULL,
  `is_customizable` tinyint(3) UNSIGNED NOT NULL,
  `kids` tinyint(3) UNSIGNED NOT NULL,
  `kid_adult` tinyint(3) UNSIGNED NOT NULL,
  `women` tinyint(3) UNSIGNED NOT NULL,
  `free_porto` tinyint(3) UNSIGNED NOT NULL,
  `package` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `sizes` varchar(255) NOT NULL,
  `delivery` varchar(50) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `price_old` decimal(7,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `products`
--

INSERT INTO `products` (`id`, `online`, `is_customizable`, `kids`, `kid_adult`, `women`, `free_porto`, `package`, `name`, `image`, `img_url`, `url`, `sizes`, `delivery`, `currency`, `price`, `price_old`) VALUES
(58304, 1, 0, 0, 0, 0, 0, 0, 'Nike Benskinneholdere Blå', 'https://d23m35kqv7rxx3.cloudfront.net/product/58304/4f5cb7b9e8f4.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/58304_maxi_0.jpg', 'https://www.unisport.dk/benskinner/nike-benskinneholdere-bla/58304/', 'One Size', '1-2 dage', 'DKK', '49.00', '49.00'),
(92025, 1, 0, 0, 0, 0, 0, 1, 'Lyngby BK Hjemmebanesæt Årgang 2006 Drenge', 'https://dhmmnhg6rkouo.cloudfront.net/product/92025/81ab22a22d8a.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/92025_maxi_0.jpg', 'https://www.unisport.dk/team-sport/lyngby-bk-hjemmebanest-argang-2006-drenge/92025/', '', '1-2 dage', 'DKK', '575.00', '687.00'),
(112510, 1, 0, 0, 0, 0, 0, 0, 'Tottenham Plakat', 'https://dxjm75mafwy8p.cloudfront.net/product/112510/dcfeadc1fe6e.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/112510_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/tottenham-plakat/112510/', 'One Size', '4-8 dage', 'DKK', '49.00', '49.00'),
(134179, 1, 0, 0, 0, 0, 0, 0, 'Leeds United Blade Puttercover + Markør', 'https://d34aj0jffcqapo.cloudfront.net/product/134179/252672733f41.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/134179_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/leeds-united-blade-puttercover-markr/134179/', 'One Size', '4-8 dage', 'DKK', '189.00', '189.00'),
(146876, 1, 0, 1, 0, 0, 0, 0, 'Tyrkiet Hjemmebanetrøje 2016/17 ARDA Børn', 'https://d2qmfz594u0oa4.cloudfront.net/product/146876/6c06c5fc7489.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/146876_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/tyrkiet-hjemmebanetrje-201617-arda-brn/146876/', 'Boys XS: 122-128 cm, Boys S: 128-137 cm, Boys M: 137-147 cm, Boys XL: 158-170 cm', '2-3 dage', 'DKK', '546.00', '679.00'),
(150173, 1, 1, 1, 0, 0, 0, 0, 'Valencia Hjemmebanetrøje 2016/17 Børn', 'https://d2ij1pxeion66i.cloudfront.net/product/150173/038c84829a39.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/150173_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/valencia-hjemmebanetrje-201617-brn/150173/', '128 cm, 140 cm, 152 cm, 164 cm', '1-2 dage', 'DKK', '238.00', '529.00'),
(152795, 1, 1, 0, 0, 0, 0, 0, 'Newcastle United 3. Trøje 2016/17', 'https://d2qmfz594u0oa4.cloudfront.net/product/152795/64a37e3df0f8.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/152795_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/newcastle-united-3-trje-201617/152795/', 'X-Small, Small, Medium, Large, X-Large, XX-Large', '1-2 dage', 'DKK', '324.00', '649.00'),
(153150, 1, 0, 0, 0, 0, 0, 0, 'Lejerbo BK - Baselayer L/Æ Hvid', 'https://dhmmnhg6rkouo.cloudfront.net/product/153150/ebb844871ed0.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/153150_maxi_0.jpg', 'https://www.unisport.dk/team-sport/lejerbo-bk-baselayer-l-hvid/153150/', 'X-Large, XX-Large', '1-2 dage', 'DKK', '279.00', '279.00'),
(153166, 1, 1, 0, 0, 0, 0, 0, 'Dortmund Hjemmebanetrøje 2016/17 Champions League', 'https://dxjm75mafwy8p.cloudfront.net/product/153166/e16bceb44120.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/153166_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/dortmund-hjemmebanetrje-201617-champions-league/153166/', 'Medium, Large, X-Large, XX-Large', '1-2 dage', 'DKK', '324.00', '649.00'),
(153339, 1, 0, 0, 1, 0, 0, 0, 'Lyngby BK Udebanesokker 2016/17', 'https://d23m35kqv7rxx3.cloudfront.net/product/153339/a49c1aad13e9.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/153339_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/lyngby-bk-udebanesokker-201617/153339/', '37-39, 40-42, 43-45, 46-48', '1-2 dage', 'DKK', '119.00', '119.00'),
(153341, 1, 1, 1, 0, 0, 0, 0, 'Lyngby BK Hjemmebaneshorts 2016/17 Børn', 'https://d2qmfz594u0oa4.cloudfront.net/product/153341/6e413d078950.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/153341_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/lyngby-bk-hjemmebaneshorts-201617-brn/153341/', '164 cm', '1-2 dage', 'DKK', '67.00', '269.00'),
(153638, 1, 0, 0, 0, 0, 0, 1, 'Chelsea 3. sæt 2016/17', 'https://d23m35kqv7rxx3.cloudfront.net/product/153638/46da93725847.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/153638_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/chelsea-3-st-201617/153638/', '', '1-2 dage', 'DKK', '767.00', '767.00'),
(153643, 1, 0, 1, 0, 0, 0, 1, 'Chelsea 3. sæt 2016/17 Børn', 'https://d23m35kqv7rxx3.cloudfront.net/product/153643/46da93725847.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/153643_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/chelsea-3-st-201617-brn/153643/', '', '1-2 dage', 'DKK', '822.00', '917.00'),
(154012, 1, 1, 1, 0, 0, 0, 0, 'Manchester United Målmandstrøje 2016/17 Børn DE GEA 1', 'https://dxjm75mafwy8p.cloudfront.net/product/154012/adc11e972215.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/154012_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/manchester-united-malmandstrje-201617-brn-de-gea-1/154012/', '176 cm', '2-3 dage', 'DKK', '479.00', '479.00'),
(155777, 1, 0, 1, 0, 0, 0, 1, 'Barcelona Hjemmebanesæt 2016/17 Børn', 'https://d23m35kqv7rxx3.cloudfront.net/product/155777/a4b3c8136e8e.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/155777_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/barcelona-hjemmebanest-201617-brn/155777/', '', '1-2 dage', 'DKK', '725.00', '907.00'),
(155778, 1, 0, 0, 0, 0, 0, 1, 'Barcelona Hjemmebanesæt 2016/17', 'https://d23m35kqv7rxx3.cloudfront.net/product/155778/a4b3c8136e8e.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/155778_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/barcelona-hjemmebanest-201617/155778/', '', '1-2 dage', 'DKK', '799.00', '799.00'),
(155823, 1, 0, 0, 0, 0, 0, 0, 'Chelsea Sutteflaske', 'https://dxjm75mafwy8p.cloudfront.net/product/155823/db1499b2e8b0.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/155823_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/chelsea-sutteflaske/155823/', 'One Size', '1-2 dage', 'DKK', '35.00', '59.00'),
(156164, 1, 1, 0, 0, 0, 0, 0, 'PUMA evoPOWER Vigor 3 FG - Gul/Navy/Orange', 'https://dhmmnhg6rkouo.cloudfront.net/product/156164/8c08260eab5f.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/156164_maxi_0.jpg', 'https://www.unisport.dk/fodboldstoevler/puma-evopower-vigor-3-fg-gulnavyorange/156164/', 'EU 39/UK 6, EU 40/UK 6½, EU 40½/UK 7, EU 41/UK 7½, EU 42/UK 8, EU 42½/UK 8½, EU 43/UK 9, EU 44/UK 9½, EU 44½/UK 10, EU 45/UK 10½, EU 46/UK 11, EU 46½/UK 11½, EU 47/UK 12', '1-2 dage', 'DKK', '559.00', '699.00'),
(156965, 1, 0, 0, 0, 0, 0, 0, 'adidas Trænings T-Shirt Tango - Blå', 'https://dhmmnhg6rkouo.cloudfront.net/product/156965/cfab84a549b6.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/156965_maxi_0.jpg', 'https://www.unisport.dk/fodboldudstyr/adidas-trnings-t-shirt-tango-bla/156965/', 'X-Small, Small, Medium, Large, X-Large, XX-Large', '1-2 dage', 'DKK', '136.00', '249.00'),
(157128, 1, 0, 0, 0, 0, 0, 0, 'adidas Træningsbukser Z.N.E. Road Trip - Grå', 'https://d2ij1pxeion66i.cloudfront.net/product/157128/010c01d20cac.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/157128_maxi_0.jpg', 'https://www.unisport.dk/fodboldudstyr/adidas-trningsbukser-zne-road-trip-gra/157128/', 'XX-Large', '1-2 dage', 'DKK', '359.00', '799.00'),
(157462, 1, 0, 0, 0, 0, 0, 0, 'Under Armour Hættetrøje Sportstyle Fleece - Grå/Sort', 'https://dxjm75mafwy8p.cloudfront.net/product/157462/1bdb5c5fc155.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/157462_maxi_0.jpg', 'https://www.unisport.dk/fodboldudstyr/under-armour-httetrje-sportstyle-fleece-grasort/157462/', 'X-Small, Small, Medium, Large, X-Large, XX-Large', '1-2 dage', 'DKK', '539.00', '599.00'),
(157466, 1, 0, 0, 0, 0, 0, 0, 'Under Armour Hættetrøje Sportstyle Fleece - Grå/Sort', 'https://d23m35kqv7rxx3.cloudfront.net/product/157466/46d070fad1e4.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/157466_maxi_0.jpg', 'https://www.unisport.dk/fodboldudstyr/under-armour-httetrje-sportstyle-fleece-grasort/157466/', 'X-Large', '1-2 dage', 'DKK', '449.00', '599.00'),
(157755, 1, 0, 0, 0, 0, 0, 0, 'Select Nål Protection - Sort', 'https://dhmmnhg6rkouo.cloudfront.net/product/157755/8900b1658d61.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/157755_maxi_0.jpg', 'https://www.unisport.dk/fodboldudstyr/select-nal-protection-sort/157755/', 'One Size', '1-2 dage', 'DKK', '9.00', '9.00'),
(161437, 1, 1, 1, 0, 0, 0, 0, 'Lyon Hjemmebanesæt 2017/18 Mini-Kit Børn', 'https://dxjm75mafwy8p.cloudfront.net/product/161437/1379174ec063.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/161437_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/lyon-hjemmebanest-201718-mini-kit-brn/161437/', '92cm, 98cm, 104cm, 110cm, 116cm', '1-2 dage', 'DKK', '499.00', '499.00'),
(161439, 1, 1, 1, 0, 0, 0, 0, 'Lyon Udebaneshorts 2017/18 Børn', 'https://d2ij1pxeion66i.cloudfront.net/product/161439/f0930fdcda2d.jpg', 'https://s3-eu-west-1.amazonaws.com/product-img/161439_maxi_0.jpg', 'https://www.unisport.dk/fodboldtroejer/lyon-udebaneshorts-201718-brn/161439/', '128 cm, 140 cm, 152 cm, 164 cm, 176 cm', '1-2 dage', 'DKK', '269.00', '269.00');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161440;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
