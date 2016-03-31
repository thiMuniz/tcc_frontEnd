'use strict';
angular.module('sbAdminApp')
        .factory("ClienteResource", function ($resource) {
          return $resource('http://enderecodaapi/xxxxx/:id', {id: '@_id'});
        })