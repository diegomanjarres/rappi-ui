(function() {
  angular.module('myApp')
    .config(SpanishTranslations);

  SpanishTranslations.$inject = ['$translateProvider']

  function SpanishTranslations($translateProvider) {
    $translateProvider.translations('es', {
      FILTERS_TITLE: 'Filtros',
      CATEGORIES_FILTER: 'Filtro de Categorías',
      CATEGORIES_FILTER_ACTIVE: 'Filtrando:',
      AVAILABILITY_FILTER: 'Filtro de Disponibilidad',
      PRODUCT_AVAILABLE: 'disponible',
      PRODUCT_NOT_AVAILABLE: 'no-disponible',
      BEST_SELLER_FILTER: 'Filtro de Best Seller',
      PRICE_FILTER: 'Filtro de Precio',
      PRICE_FILTER_MORE_THAN: 'desde',
      PRICE_FILTER_LESS_THAN: 'hasta',
      UPDATE_FILTERS: 'Aplicar Filtros',
      SHOPPING_CART_TITLE: 'Carrito de compras',
      SHOPPING_CART_ACCEPT: 'Aceptar',
      SHOPPING_CART_CANCEL: 'Cancelar',
      SHOPPING_CART_CLOSE: 'Cerrar Dialogo',
      EMPTY_CAR: 'Carrito Vacío',
      JSON_URL: 'URL del JSON',
      FETCH_JSON: 'Consultar JSON',
      UPLOAD_JSON_FILE:'Cargar JSON',
      PRODUCT_SEARCH: 'Busqueda producto',
      SORT_NAME: 'A->Z',
      SORT_PRICE_DES: '$$$->$',
      SORT_PRICE_ASC: '$->$$$',


    });

    $translateProvider.preferredLanguage('es');
  }
})()
