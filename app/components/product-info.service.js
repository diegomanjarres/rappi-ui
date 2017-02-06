(function() {
  angular.module('myApp')
    .service('productInfoService', ProductInfo)

  ProductInfo.$inject = ['$http']

  function ProductInfo($http) {
    this.getProductInfo = function(url) {
      return $http.get(url)
    }
  }
})()
