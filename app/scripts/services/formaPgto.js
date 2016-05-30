'use strict';
app.factory("FormaPgtoResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'formapgto/:id', {id: '@_id'});
});