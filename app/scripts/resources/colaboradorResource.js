'use strict';
angular.module('sbAdminApp')
        .factory("ColaboradorResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'colaborador/:id', {id: '@_id'});
        });