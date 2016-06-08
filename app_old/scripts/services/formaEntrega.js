'use strict';
app.factory("FormaEntregaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'formaEntrega/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'formaEntrega/filtro?:p',
      params : {p:"p"}
    }
  });
});