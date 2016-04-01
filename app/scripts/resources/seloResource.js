'use strict';
angular.module('sbAdminApp')
        .factory("SeloResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'selo/:id', {id: '@_id'});
        });