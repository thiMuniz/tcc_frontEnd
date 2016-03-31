'use strict';
angular.module('sbAdminApp')
        .factory("ProdutoResource", function ($resource) {
          return $resource('http://enderecodaapi/xxxxx/:id', {id: '@_id'});
        })