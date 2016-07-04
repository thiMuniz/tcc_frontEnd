'use strict';
app.factory("PessoaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'pessoa/:id', {id: '@_id'}, {
    listFiltro:{
      method: 'GET',
      isArray : true,
      url : CONST.ws.urlSGP+'pessoa/filtro?:p',
      params : {p:"p"}                  
    },
    save:{
      method: 'POST',
      url : CONST.ws.urlSGP+'pessoa?:p',
      params : {p:"p"}                  
    },
    update: { 
      method:'PUT',
      url : CONST.ws.urlSGP+'pessoa?:p',
      params : {p:"p"}
    },
    login: { 
      method: 'POST',
      url : CONST.ws.urlSGP+'login?:p',
      params : {p:"p"}
    },
    logout: { 
      method: 'POST',
      url : CONST.ws.urlSGP+'logout'
    },
    recuperarSenha: { 
      method: 'POST',
      url : CONST.ws.urlSGP+'pessoa/recuperarsenha'
    },
    updateSenha: { 
      method: 'PUT',
      url : CONST.ws.urlSGP+'pessoa/updatesenha?:p',
      params : {p:"p"}
    }
  });
});