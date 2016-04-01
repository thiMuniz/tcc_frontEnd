'use strict';
angular.module('sbAdminApp')
        .factory("RotuloResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'rotulo/:id', {id: '@_id'});
        });