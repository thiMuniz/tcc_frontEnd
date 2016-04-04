'use strict';
app.factory("ProdutoResource", function ($resource, WS) {
  return $resource(WS.urlSGP + 'produto/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});