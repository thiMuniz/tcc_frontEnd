'use strict';
angular.module('sbAdminApp')
        .factory("SeloResource", function ($resource) {
          return $resource('http://enderecodaapi/xxxxx/:id', {id: '@_id'});
        })