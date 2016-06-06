'use strict';
app.factory("ProdutoResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'produto/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'produto/filtro?:p',
      params : {p:"p"}
    }
  });
});