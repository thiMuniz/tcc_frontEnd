'use strict';
app.factory("ColaboradorResource", function ($resource, WS) {
  return $resource(WS.urlSGP + 'colaborador/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});