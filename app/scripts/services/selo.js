'use strict';
app.factory("SeloResource", function ($resource, WS) {
  return $resource(WS.urlSGP + 'selo/:id', {id: '@_id'}, {
    update: { method:'PUT' }
  });
});