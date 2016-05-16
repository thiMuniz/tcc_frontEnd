'use strict';
app.factory("PessoaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'pessoa/:id', {id: '@_id'}, {
    listByPerfil:{
      method: 'GET',
      isArray : true,
      url : CONST.ws.urlSGP+'pessoa/filtro?:p',
      params : {p:"p"}                  
    },
    update: { method:'PUT' },
    login: { 
      method: 'POST',
      url : CONST.ws.urlSGP+'login',
    }
  });
});