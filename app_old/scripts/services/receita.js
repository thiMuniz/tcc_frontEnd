'use strict';
app.factory("ReceitaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'receita/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'receita/filtro?:p',
      params : {p:"p"}
    }
  });
});