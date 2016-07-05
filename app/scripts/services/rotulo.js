'use strict';
app.factory("RotuloResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'rotulo/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'rotulo/filtro?:p',
      params : {p:"p"}
    }
  });
});