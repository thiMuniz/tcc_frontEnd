'use strict';
app.controller('LoginCtrl', function ($scope, $http, $state, PessoaResource, Base64Resource) { //userResource
  $scope.user = new PessoaResource();
  $scope.login = function () {
//    $scope.user.email = $scope.user.usuario + "@sgp.com.br";
    $scope.user.$login(function(retorno){ /*success 200~299*/
       swal({
         title: "Bem vindo <nome>",
         type: "success"
       });
       var encodeAuth = Base64Resource.encode($scope.user.usuario + ':' + $scope.user.senha);
       $http.defaults.headers.common.token =  encodeAuth; //substituir pelo retorno - token
//       $cookies.put('token',encodeAuth); //substituir pelo retorno - token
       console.log(retorno);
       $state.go('main.home');
         /*basic auth - restful*/
    }, function(){/*error >299 */
       swal({
         title: "Usúario/senha incorretos",
         type: "error"
       });
    });
  };
});
