'use strict';
angular.module('sbAdminApp')
        .factory("ClienteResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'cliente/:id', {id: '@_id'});
        });