'use strict';
app.factory("CategoriaResource", function ($resource, WS) {
  return $resource(WS.urlSGP + 'categoria/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});