//'use strict';
app.factory("EmbalagemResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'embalagem/:id', {id: '@_id'}, {
//  return $resource(CONST.ws.urlSGP + 'embalagem', {}, {
//    save: {headers: { 
//        'Accept': 'application/json',
//        'Content-Type': 'application/json' }
//    },
    update: { method:'PUT' }
  });
});