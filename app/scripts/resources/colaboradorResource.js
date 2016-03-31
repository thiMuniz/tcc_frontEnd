'use strict';
angular.module('sbAdminApp')
        .factory("ColaboradorResource", function ($resource) {
          return $resource('http://enderecodaapi/xxxxx/:id', {id: '@_id'});
        })