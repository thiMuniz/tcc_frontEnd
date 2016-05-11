'use strict';
app.factory("PessoaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'pessoa/:id', {id: '@_id'}, {
    listByPerfil:{method: 'GET',
                  isArray : true,
                  url : CONST.ws.urlSGP+'pessoa?:p',
                  params : {p:"p"}
                  
    },
    update: { method:'PUT' }
  });
});