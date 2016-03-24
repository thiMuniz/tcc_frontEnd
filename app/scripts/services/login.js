'use scrict';

angular.module('sbAdminApp')
        .factory('LoginResource', 
            function($resource) {
            var urlApi = "http://localhost:9000/"; //colocar porta que tiver na API java
            return $resource(urlApi+'user/:id',{id:'@_id'},{
                /* $get (get), $save(post), $query (get isArray:true)*/
                login : {
                    method : "POST"
                }
            });
      
    });
