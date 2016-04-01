'use strict';
angular.module('sbAdminApp')
        .factory("InsumoResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'insumo/:id', {id: '@_id'});
        });