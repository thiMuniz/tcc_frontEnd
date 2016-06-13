'use strict';
app.factory("PedidoResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'pedido/:id', {id: '@_id'}, {
    update: { 
      method:'PUT',
      url: CONST.ws.urlSGP+'pedido?:p',
      params : {p:"p"}
    },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'pedido/filtro?:p',
      params : {p:"p"}
    },
  });
});