'use strict';
angular.module('sbAdminApp')
        .factory("FornecedorResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'fornecedor/:id', {id: '@_id'});
        });