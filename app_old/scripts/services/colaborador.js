'use strict';
app.factory("ColaboradorResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'colaborador/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});