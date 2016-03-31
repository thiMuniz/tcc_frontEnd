'use strict';
angular.module('sbAdminApp')
        .factory("InsumoResource", function ($resource) {
          return $resource('http://enderecodaapi/xxxxx/:id', {id: '@_id'});
        })