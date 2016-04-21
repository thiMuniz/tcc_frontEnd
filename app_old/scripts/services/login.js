'use scrict';
app.factory('LoginResource', function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'user/:id', {id: '@_id'}, {    
    login: {
      method: "POST"
    }
  });
});
/* $get (get), $save(post), $query (get isArray:true)*/