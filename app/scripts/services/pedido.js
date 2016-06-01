'use strict';
app.factory("PedidoResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'pedido/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'pedido/filtro?:p',
      params : {p:"p"}
    }
  });
});