'use strict';
app.factory("RotuloResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'rotulo/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});