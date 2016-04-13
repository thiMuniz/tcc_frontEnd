'use strict';
app.factory("FornecedorResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'fornecedor/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});