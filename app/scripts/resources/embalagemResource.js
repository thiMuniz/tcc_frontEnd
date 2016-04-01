//'use strict';
angular.module('sbAdminApp')
        .factory("EmbalagemResource", function ($resource, WS) {
          return $resource(WS.urlSGP+'embalagem/:id', {id: '@_id'});
        });