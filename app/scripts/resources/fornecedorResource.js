'use strict';
angular.module('sbAdminApp')
        .factory("FornecedorResource", function ($resource) {
          return $resource('http://enderecodaapi/xxxxx/:id', {id: '@_id'});
        })