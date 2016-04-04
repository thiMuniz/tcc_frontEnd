//'use strict';
app.factory("EmbalagemResource", function ($resource, WS) {
  return $resource(WS.urlSGP + 'embalagem/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});