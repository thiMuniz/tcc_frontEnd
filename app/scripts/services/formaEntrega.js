'use strict';
app.factory("FormaEntregaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'formaentrega/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'formaentrega/filtro?:p',
      params : {p:"p"}
    }
  });
});