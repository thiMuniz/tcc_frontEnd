'use strict';
app.factory("ClienteResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'cliente/:id', {id: '@_id'}, {
    query:{method: 'GET',
          isArray : true,
          params : {perfil: "cliente"}
    },
    update: { method:'PUT' }
  });
});