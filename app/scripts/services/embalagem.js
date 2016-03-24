'use scrict';
angular.module('sbAdminApp')
        .factory('EmbalagemResource', function($resource) {
            return $resource('/api/entries/:id'); // Note the full endpoint address
});

//    get()
//    query()
//    save()
//    remove()
//    delete()
