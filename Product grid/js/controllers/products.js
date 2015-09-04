angular.module('productGrid').controller('ProductListCtrl', function ($scope, $http, ngDialog) {

    //I used it like this because of the CORS problems with borowser other than Mozilla Firefox
    var data = { "end-point": "/api/sample/", "products": [{ "kids": "0", "name": "Gavekort", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "0,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/gavekort/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/1_maxi_0.jpg", "id": "1", "women": "0" }, { "kids": "0", "name": "adidas - Copa Mundial FG", "sizes": "EU 36/UK 3\u00bd,EU 36\u2154/UK 4,EU 37\u2153/UK 4\u00bd,EU 39\u2153/UK 6,EU 40/UK 6\u00bd,EU 40\u2154/UK 7,EU 41\u2153/UK 7\u00bd,EU 42/UK 8,EU 42\u2154/UK 8\u00bd,EU 43\u2153/UK 9,EU 44/UK 9\u00bd,EU 44\u2154/UK 10,EU 46/UK 11,EU 46\u2154/UK 11\u00bd,EU 47\u2153/UK 12,EU 48/UK 12\u00bd,EU 48\u2154/UK 13", "kid_adult": "1", "free_porto": "0", "price": "899,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldstoevler/adidas-copa-mundial-fg/107/", "price_old": "1.099,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/107_maxi_0.jpg", "id": "107", "women": "0" }, { "kids": "0", "name": "adidas - Spezial Sort", "sizes": "EU 36/UK 3\u00bd,EU 36\u2154/UK 4,EU 37\u2153/UK 4\u00bd,EU 38/UK 5,EU 38\u2154/UK 5\u00bd,EU 39\u2153/UK 6,EU 40/UK 6\u00bd,EU 40\u2154/UK 7,EU 41\u2153/UK 7\u00bd,EU 42/UK 8,EU 42\u2154/UK 8\u00bd,EU 43\u2153/UK 9,EU 44/UK 9\u00bd,EU 44\u2154/UK 10,EU 45\u2153/UK 10\u00bd,EU 46/UK 11,EU 46\u2154/UK 11\u00bd,EU 47\u2153/UK 12,EU 48/UK 12\u00bd,EU 48\u2154/UK 13", "kid_adult": "1", "free_porto": "0", "price": "499,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldstoevler/adidas-spezial-sort/3028/", "price_old": "599,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/3028_maxi_0.jpg", "id": "3028", "women": "0" }, { "kids": "0", "name": "Select - L\u00e6derbalsam", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "47,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldstoevler/select-lderbalsam/3292/", "price_old": "59,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/3292_maxi_0.jpg", "id": "3292", "women": "0" }, { "kids": "0", "name": "Select - Gymnastikpose", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "49,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldudstyr/select-gymnastikpose/6710/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/6710_maxi_0.jpg", "id": "6710", "women": "0" }, { "kids": "0", "name": "Select - Linjevogterflag Amat\u00f8r", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "129,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldudstyr/select-linjevogterflag-amatr/6715/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/6715_maxi_0.jpg", "id": "6715", "women": "0" }, { "kids": "0", "name": "Hummel - Sokker Basic 3-Pack Hvid", "sizes": "32-35,36-40,46-48", "kid_adult": "1", "free_porto": "0", "price": "49,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodbold365/hummel-sokker-basic-3-pack-hvid/18292/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/18292_maxi_0.jpg", "id": "18292", "women": "0" }, { "kids": "0", "name": "adidas - World Cup SG", "sizes": "EU 36\u2154/UK 4,EU 37\u2153/UK 4\u00bd,EU 38/UK 5,EU 39\u2153/UK 6,EU 40/UK 6\u00bd,EU 40\u2154/UK 7,EU 41\u2153/UK 7\u00bd,EU 42/UK 8,EU 42\u2154/UK 8\u00bd,EU 43\u2153/UK 9,EU 44/UK 9\u00bd,EU 46/UK 11,EU 46\u2154/UK 11\u00bd,EU 47\u2153/UK 12,EU 48/UK 12\u00bd,EU 48\u2154/UK 13", "kid_adult": "1", "free_porto": "0", "price": "799,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldstoevler/adidas-world-cup-sg/22874/", "price_old": "999,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/22874_maxi_0.jpg", "id": "22874", "women": "0" }, { "kids": "0", "name": "Chelsea - T\u00e6ppe Fleece", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "249,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldtroejer/chelsea-taeppe-fleece/22930/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/22930_maxi_0.jpg", "id": "22930", "women": "0" }, { "kids": "0", "name": "Puma - King Top DI FG ", "sizes": "EU 36/UK 3\u00bd,EU 37/UK 4,EU 37\u00bd/UK 4\u00bd,EU 38/UK 5,EU 38\u00bd/UK 5\u00bd,EU 39/UK 6,EU 40/UK 6\u00bd,EU 40\u00bd/UK 7,EU 41/UK 7\u00bd,EU 42/UK 8,EU 42\u00bd/UK 8\u00bd,EU 43/UK 9,EU 44/UK 9\u00bd,EU 45/UK 10\u00bd,EU 46/UK 11,EU 46\u00bd/UK 11\u00bd,EU 48\u00bd/UK 13", "kid_adult": "0", "free_porto": "0", "price": "699,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldstoevler/puma-king-top-di-fg/26487/", "price_old": "999,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/26487_maxi_0.jpg", "id": "26487", "women": "0" }, { "kids": "0", "name": "Nike - Benskinneholdere Hvid", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "49,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/benskinner/nike-benskinneholdere-hvid/28091/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/28091_maxi_0.jpg", "id": "28091", "women": "0" }, { "kids": "0", "name": "Nike - Benskinneholdere Sort", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "49,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/benskinner/nike-benskinneholdere-sort/28092/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/28092_maxi_0.jpg", "id": "28092", "women": "0" }, { "kids": "0", "name": "Select - Bolds\u00e6k", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "199,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldudstyr/select-boldsk/29044/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/29044_maxi_0.jpg", "id": "29044", "women": "0" }, { "kids": "0", "name": "Woly Sport - Liquid Tex Protection", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "54,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldstoevler/woly-sport-liquid-tex-protection/30142/", "price_old": "109,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/30142_maxi_0.jpg", "id": "30142", "women": "0" }, { "kids": "0", "name": "Newcastle United - Pin", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "29,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldtroejer/newcastle-united-pin/30495/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/30495_maxi_0.jpg", "id": "30495", "women": "0" }, { "kids": "0", "name": "Select - Tr\u00e6nings/Frisparksfigur Voksen", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "999,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldudstyr/select-trningsfrisparksfigur-voksen/34761/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/34761_maxi_0.jpg", "id": "34761", "women": "0" }, { "kids": "0", "name": "Select - Senior Medicintaske M/Indhold", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "849,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldudstyr/select-senior-medicintaske-mindhold/34800/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/34800_maxi_0.jpg", "id": "34800", "women": "0" }, { "kids": "0", "name": "Select - Str\u00f8mpetape Klassisk 1,9 cm R\u00f8d", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "15,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/benskinner/select-strmpetape-klassisk-19-cm-rd/35606/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/35606_maxi_0.jpg", "id": "35606", "women": "0" }, { "kids": "0", "name": "Select - Str\u00f8mpetape Klassisk 1,9 cm Bl\u00e5", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "15,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/benskinner/select-strmpetape-klassisk-19-cm-bla/35607/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/35607_maxi_0.jpg", "id": "35607", "women": "0" }, { "kids": "0", "name": "Select - Str\u00f8mpetape Klassisk 1,9 cm Sort", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "15,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/benskinner/select-strmpetape-klassisk-19-cm-sort/35608/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/35608_maxi_0.jpg", "id": "35608", "women": "0" }, { "kids": "0", "name": "Select - Str\u00f8mpetape Klassisk 1,9 cm Hvid", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "15,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/benskinner/select-strmpetape-klassisk-19-cm-hvid/35609/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/35609_maxi_0.jpg", "id": "35609", "women": "0" }, { "kids": "0", "name": "Select - Profcare Tandbeskytter Lys", "sizes": "One Size Junior", "kid_adult": "0", "free_porto": "0", "price": "39,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldudstyr/select-profcare-tandbeskytter-lys/36184/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/36184_maxi_0.jpg", "id": "36184", "women": "0" }, { "kids": "0", "name": "Unisport - Drikkedunk", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "25,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldudstyr/unisport-drikkedunk/36456/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/36456_maxi_0.jpg", "id": "36456", "women": "0" }, { "kids": "0", "name": "Liverpool - Blyants\u00e6t", "sizes": "One Size", "kid_adult": "0", "free_porto": "0", "price": "29,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldtroejer/liverpool-blyantst/43212/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/43212_maxi_0.jpg", "id": "43212", "women": "0" }, { "kids": "0", "name": "Select - Profcare Albuebind", "sizes": "X-Small,Small,Medium,Large,X-Large,XX-Large", "kid_adult": "0", "free_porto": "0", "price": "199,00", "package": "0", "delivery": "1-2 dage", "url": "https://www.unisport.dk/fodboldudstyr/select-profcare-albuebind/44003/", "price_old": "0,00", "img_url": "https://s3-eu-west-1.amazonaws.com/product-img/44003_maxi_0.jpg", "id": "44003", "women": "0" }] };

    $scope.products = data.products;

    /* Uncoment this section to use AJAX request to the JSON file
    $http.get('unisport.json').success(function (data) {
        $scope.products = data.products;
    });
    */


    $scope.showDetails = function (product) {
        $scope.product = product;
        $scope.priceNotNull = parseFloat(product.price_old) != 0.0;
        var sizes = product.sizes.split(',');
        var measurments = [];
        var keepGoing = true;
        angular.forEach(sizes, function (value, key) {
            if (keepGoing) {
                if (value == "" || value == undefined || value == null) keepGoing = false;
                else {
                    if (value.indexOf('/') == -1) this.push(value);
                    else {
                        var items = value.replace('/', "  /  ");
                        this.push(items);
                    }
                }
            }
        }, measurments)
        $scope.measurments = measurments;
        ngDialog.open({
            template: 'productDetails',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };

    $scope.scale = function (id) {
        var $container = $('#productContainer'),
              $articles = $container.children(),
              timeout;
        var $article = $('#' + id);
        clearTimeout(timeout);
        timeout = setTimeout(function () {

            if ($article.hasClass('active')) return false;

            $articles.not($article.removeClass('blur').addClass('active'))
                     .removeClass('active')
                     .addClass('blur');

        }, 65);
    };

    $scope.defaultView = function () {
        var $container = $('#productContainer'),
              $articles = $container.children(),
              timeout;
        clearTimeout(timeout);
        $articles.removeClass('active blur');
    }

});