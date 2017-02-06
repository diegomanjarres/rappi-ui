(function() {

  angular.module('myApp', [
      'ngRoute',
      'ngMaterial',
      'pascalprecht.translate',
      'ngFileUpload'
    ])
    .config(myAppConfig)

  myAppConfig.$inject = ['$mdThemingProvider','$locationProvider', '$routeProvider','$mdAriaProvider']

  function myAppConfig($mdThemingProvider,$locationProvider, $routeProvider,$mdAriaProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('teal');

    $locationProvider.hashPrefix('!');

    $mdAriaProvider.disableWarnings()

    $routeProvider.when('/products', {
      templateUrl: 'products/products.html',
      controller: 'ProductsController',
      controllerAs: 'productsVm'
    });

    $routeProvider.otherwise({
      redirectTo: '/products'
    });
  }

})()
