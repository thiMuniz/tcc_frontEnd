//'use strict';
app.factory("EmbalagemResource", function ($resource, CONST) {
//  return $resource(CONST.ws.urlSGP + 'embalagem/:id', {id: '@id'}, {
  return $resource(CONST.ws.urlSGP + 'embalagem', {}, {
    update: { method:'PUT' }
  });
});