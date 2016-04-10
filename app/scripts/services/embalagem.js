//'use strict';
app.factory("EmbalagemResource", function ($resource, WS) {
//  return $resource(WS.urlSGP + 'embalagem/:id', {id: '@id'}, {
  return $resource(WS.urlSGP + 'embalagem', {}, {
    update: { method:'PUT' }
  });
});