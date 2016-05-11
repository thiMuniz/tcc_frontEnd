'use strict';
app.factory("StatusResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'status/:id', {id: '@_id'}, {
    getByNome: {
      method:'GET',
      url : CONST.ws.urlSGP+'status/filtro?:p',
      params : {p: "p"}
    }
  });
});