(function() {

  angular.module('myApp')
    .controller('toolbarController', Toolbar)

  Toolbar.$inject = ['$mdDialog']

  function Toolbar($mdDialog) {
    var toolbarVm = this

    toolbarVm.openShoppingCart = openShoppingCart

    function openShoppingCart() {
      $mdDialog.show({
          controller: 'shoppingCartController as cartVm',
          templateUrl: 'shopping-cart/shopping-cart.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
        })
        .then(function(answer) {}, function() {});
    }

  }

})()
