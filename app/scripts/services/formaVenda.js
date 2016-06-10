'use strict';
app.factory("FormaVendaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'formavenda/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'formavenda/filtro?:p',
      params : {p:"p"}
    }
  });
});