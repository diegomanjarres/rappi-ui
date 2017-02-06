(function() {
  angular.module('myApp')
    .service('shoppingCartService', ShoppingCart)

  ShoppingCart.$inject = []

  function ShoppingCart() {
    var shoppingCart = []

    this.addToCart = function(product) {
      shoppingCart.push(product)
    }

    this.removeAllFromCart = function(product) {
      shoppingCart = _.reject(shoppingCart, function(p){
        return p.name==product.name
      })
    }

    this.getShoppingCart = function() {
      return shoppingCart
    }

    this.getProductCount = function() {
      return _.countBy(shoppingCart, function(p) {
        return p.name
      });
    }

  }
})()
