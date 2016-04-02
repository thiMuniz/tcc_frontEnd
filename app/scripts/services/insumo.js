'use strict';
app.factory("InsumoResource", function ($resource, WS) {
  return $resource(WS.urlSGP + 'insumo/:id', {id: '@_id'});
});