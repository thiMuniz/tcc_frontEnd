//'use strict';
angular.module('sbAdminApp')
        .factory("EmbalagemResource", function ($resource) {
          return $resource('http://192.168.25.8:11392/SGI/embalagem/:id', {id: '@_id'});
        })