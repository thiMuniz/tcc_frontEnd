'use strict';
app.factory("ClienteResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'cliente/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});