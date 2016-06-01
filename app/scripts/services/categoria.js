'use strict';
app.factory("CategoriaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'categoria/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'categoria/filtro?:p',
      params : {p:"p"}
    }
  });
});