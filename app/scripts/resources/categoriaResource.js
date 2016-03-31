'use strict';
angular.module('sbAdminApp')
        .factory("CategoriaResource", function ($resource) {
          return $resource('http://enderecodaapi/xxxxx/:id', {id: '@_id'});
        })