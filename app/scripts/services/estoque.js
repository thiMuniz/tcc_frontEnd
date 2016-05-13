'use strict';
app.factory("EstoqueResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'estoque/:id', {id: '@_id'}, {
    listByTipoItem:{
      method: 'GET',
      isArray : true,
      url : CONST.ws.urlSGP+'estoque/filtro?:p',
      params : {p:"p"}                  
    },
    update: { method:'PUT' }
  });
});