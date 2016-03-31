'use strict';
angular.module('sbAdminApp')
        .factory("ReceitaResource", function ($resource) {
          return $resource('http://enderecodaapi/xxxxx/:id', {id: '@_id'});
        })