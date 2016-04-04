'use strict';
app.factory("RotuloResource", function ($resource, WS) {
  return $resource(WS.urlSGP + 'rotulo/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});