'use strict';
app.factory("PromocaoResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'promocao/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'promocao/filtro?:p',
      params : {p:"p"}
    }
  });
});