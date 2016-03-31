'use strict';
angular.module('sbAdminApp')
        .factory("RotuloResource", function ($resource) {
          return $resource('http://enderecodaapi/xxxxx/:id', {id: '@_id'});
        })