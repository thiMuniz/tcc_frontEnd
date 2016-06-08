'use strict';
app.factory("FormaVendaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'formaVenda/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'formaVenda/filtro?:p',
      params : {p:"p"}
    }
  });
});