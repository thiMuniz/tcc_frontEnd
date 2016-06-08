'use strict';
app.factory("LoteResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'lote/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    updateSaldo: { 
      method:'PUT',
      url: CONST.ws.urlSGP+'lote?:p',
      params : {p:"p"}
    },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'lote/filtro?:p',
      params : {p:"p"}
    },
    inventario:{
      method: 'PUT',
      isArray: true,
      url: CONST.ws.urlSGP+'lote/inventario'
    }
  });
});