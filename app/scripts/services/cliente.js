'use strict';
app.factory("ClienteResource", function ($resource, WS) {
  return $resource(WS.urlSGP + 'cliente/:id', {id: '@_id'});
});