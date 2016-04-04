'use scrict';
app.factory('LoginResource', function ($resource, WS) {
  return $resource(WS.urlSGP + 'user/:id', {id: '@_id'}, {    
    login: {
      method: "POST"
    }
  });
});
/* $get (get), $save(post), $query (get isArray:true)*/