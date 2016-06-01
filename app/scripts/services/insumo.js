'use strict';
app.factory("InsumoResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'insumo/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'insumo/filtro?:p',
      params : {p:"p"}
    }
  });
});