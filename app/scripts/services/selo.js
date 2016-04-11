'use strict';
app.factory("SeloResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'selo/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});