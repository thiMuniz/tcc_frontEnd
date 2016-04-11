'use strict';
app.factory("ProdutoResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'produto/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});