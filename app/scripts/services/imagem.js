'use strict';
app.factory("ImagemResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'imagem/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});