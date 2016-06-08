'use strict';
app.factory("CorreiosResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlCep + ':cep'+'/json/', {cep: '@_cep',
    transformRequest: [function(data, headersGetter) {
      var headers = angular.toJson(headersGetter());
      var headers2 = angular.toJson(headersGetter());
      console.log(headers);
//      delete headers;
      return headers2;
      }]
    }, {
  });
});