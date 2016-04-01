'use strict';
angular.module('sbAdminApp')
        .factory("CategoriaResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'categoria/:id', {id: '@_id'});
        });