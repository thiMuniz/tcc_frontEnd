'use strict';
app.factory("ReceitaResource", function ($resource, WS) {
  return $resource(WS.urlSGP + 'receita/:id', {id: '@_id'});
});