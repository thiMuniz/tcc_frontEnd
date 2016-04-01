'use strict';
angular.module('sbAdminApp')
        .factory("ReceitaResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'receita/:id', {id: '@_id'});
        });