'use strict';
app.factory("LoteResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'lote/:id', {id: '@_id'}, {
    listByTipoItem:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'lote/filtro?:p',
      params : {p:"p"}                  
    },
    update: { method:'PUT' },
    updateSaldos:{
      method: 'PUT',
      url: CONST.ws.urlSGP+'lote/inventario?:p',
      params : {p:"p"}                  
    },
    listTotalPorItem:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'lote/filtro?:p',
      params : {p:"p"}                  
    },
    listLotesItem:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'lote/filtro?:p',
      params : {p:"p"}                  
    },
  });
});