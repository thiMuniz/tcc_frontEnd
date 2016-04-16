'use strict';
app.factory("InsumoResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'insumo/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});