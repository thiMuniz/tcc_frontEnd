'use strict';
app.factory("LoteResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'lote/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'lote/filtro?:p',
      params : {p:"p"}                  
    }    
  });
});