var app = angular.module('app',[]);

app.controller('MainController',function($scope,$http){
    
$http.get('data/json.json')
    .then(function(res){
        angular.forEach(res.data.latest,function(value,key){
            var t = res.data.latest[key].sizes;
            var sizeArr = t.split(',');
            res.data.latest[key].sizeList = sizeArr;
        });
        $scope.unisportResult = res.data.latest;
    })
});