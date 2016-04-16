'use strict';
app.factory("CategoriaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'categoria/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});