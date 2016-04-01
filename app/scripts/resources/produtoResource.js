'use strict';
angular.module('sbAdminApp')
        .factory("ProdutoResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'produto/:id', {id: '@_id'});
        });