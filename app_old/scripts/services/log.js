'use strict';
app.factory("LogResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'log/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});