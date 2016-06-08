'use strict';
app.factory("TarefaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'tarefa/:id', {id: '@_id'}, {
    update: { method:'PUT' },
    listFiltro:{
      method: 'GET',
      isArray: true,
      url: CONST.ws.urlSGP+'tarefa/filtro?:p',
      params : {p:"p"}
    }
  });
});