(function() {

  angular.module('myApp')
    .controller('shoppingCartController', shoppingCart)

  shoppingCart.$inject = ['shoppingCartService','$mdDialog']

  function shoppingCart(shoppingCartService,$mdDialog) {
    var cartVm = this

    cartVm.productsCount = []
    cartVm.removeFromCart = removeFromCart
    cartVm.closeDialog=$mdDialog.hide


    activate()

    function activate() {
      updateCart()
    }

    function removeFromCart(p) {
      shoppingCartService.removeAllFromCart(p)
      updateCart()
    }

    function updateCart() {
      var pCount = shoppingCartService.getProductCount()
      cartVm.productsCount = Object.keys(pCount)
        .map(function(k) {
          return {
            name: k,
            qty: pCount[k]
          }
        })
    }

  }

})()
