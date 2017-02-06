(function() {

  angular.module('myApp')
    .controller('ProductsController', Products)

  Products.$inject = ['productInfoService', 'shoppingCartService', '$mdToast']

  function Products(productInfoService, shoppingCartService, $mdToast) {
    var productsVm = this

    var allProducts = []
    var categories = []
    productsVm.searchText = ''
    productsVm.products = []
    productsVm.categories = []
    productsVm.showFilters = true
    productsVm.productInfoUrl = '/files/data.json'
    productsVm.productInfo = {}
    productsVm.filters = {
      categories: []
    }
    productsVm.shoppingCart = []

    productsVm.loadJson = loadJson
    productsVm.sort = sort
    productsVm.updateFilters = updateFilters
    productsVm.toggleFilters = toggleFilters
    productsVm.getCategoryNameById = getCategoryNameById
    productsVm.addToCart = addToCart
    productsVm.refresh = activate
    productsVm.searchByName = searchByName

    activate()

    function activate() {
      productInfoService.getProductInfo(productsVm.productInfoUrl)
        .then(function(data) {
          parseProductsPrice(data.data.products)
          allProducts = data.data.products
          categories = data.data.categories
          productsVm.products = allProducts
          productsVm.categories = categories
          productsVm.productInfo = data.data
        })
        .catch(function() {})
    }

    function loadJson(file) {
      var fr = new FileReader();
      fr.onload = function(e) {
        var data=JSON.parse(e.target.result)
        parseProductsPrice(data.products)
        allProducts = data.products
        categories = data.categories
        productsVm.products = allProducts
        productsVm.categories = categories
        productsVm.productInfo = data
      };
      fr.readAsText(file);
    }

    function searchByName() {
      if (productsVm.searchText && productsVm.searchText != '') {
        productsVm.products = allProducts.filter(function(p) {
          return p.name.indexOf(productsVm.searchText) > -1
        })
      } else productsVm.products = allProducts
    }

    function sort(type) {
      switch (type) {
        case 'name':
          productsVm.products = _.sortBy(productsVm.products, function(p) {
            return p.name.toLowerCase()
          })
          break
        case 'price-asc':
          productsVm.products = _.sortBy(productsVm.products, 'price')
          break
        case 'price-des':
          productsVm.products = _.sortBy(productsVm.products, 'price')
            .reverse()
          break

        default:
      }
    }

    function updateFilters() {
      var filterFunctions = []
      if (productsVm.filters.categories.length != 0) {
        filterFunctions.push(filterByCategories)
      }
      if (productsVm.filters.availability && productsVm.filters.availability !=
        'any') {
        filterFunctions.push(filterByAvailability)
      }
      if (productsVm.filters.bestSeller) {
        filterFunctions.push(filterByBestSeller)
      }
      if (productsVm.filters.minPrice || productsVm.filters.maxPrice) {
        filterFunctions.push(filterByPrice)
      }


      productsVm.products = filterFunctions.reduce(function(memo, fn) {
        return fn(memo)
      }, allProducts)
    }

    function filterByCategories(products) {
      return products.filter(function(p) {
        return _.intersection(p.categories, productsVm.filters.categories
            .map(function(c) {
              return c.categori_id
            }))
          .length != 0
      })
    }

    function filterByAvailability(products) {
      return products.filter(function(p) {
        var shouldBeAvailable = productsVm.filters.availability ===
          'available' ? true : false
        return p.available === shouldBeAvailable
      })
    }

    function filterByBestSeller(products) {
      return products.filter(function(p) {
        return p.best_seller === true
      })
    }

    function filterByPrice(products) {
      var lb = productsVm.filters.minPrice || 0
      var ub = productsVm.filters.maxPrice || Number.MAX_SAFE_INTEGER
      return products.filter(function(p) {
        return p.price > lb && p.price < ub
      })
    }

    function parseProductsPrice(products) {
      products.forEach(function(p) {
        p.price = parseInt(
          p.price
          .split('.')
          .join(''))
      })
    }

    function addToCart(product) {
      shoppingCartService.addToCart(product)
      $mdToast.show(
        $mdToast.simple()
        .textContent('Producto Agregado')
        .position('top right')
        .hideDelay(3000)
      );
    }

    function getCategoryNameById(id) {
      return _.findWhere(categories, {
          categori_id: id
        })
        .name
    }

    function toggleFilters() {
      productsVm.showFilters = !productsVm.showFilters
    }
  }

})()
