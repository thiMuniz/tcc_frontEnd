'use strict';
app.factory("DestaqueResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'destaque/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'destaque/filtro?:p',
      params : {p:"p"}
    }
  });
});