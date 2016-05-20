'use strict';
app.controller('LoginCtrl', function ($scope, $http, $cookies, $state, PessoaResource, Base64Resource) {
  $scope.user = new PessoaResource();
  $scope.login = function(){
//    $scope.user.email = $scope.user.usuario + "@sgp.com.br";
    $scope.user.$login(function(retorno){ /*success 200~299*/
      swal({
        title: "Bem vindo <nome>",
//        title: "Bem vindo "+retorno.pessoa.pf ? retorno.pessoa.pf.nome : retorno.pessoa.pj.nomeFantasia,
        type: "success"
      });
//      var encodeAuth = Base64Resource.encode($scope.user.usuario + ':' + $scope.user.senha);
//      $cookies.put('token', retorno.token);
      $cookies.putObject('objToken', retorno, {secure: true, expires: retorno.dtDesativacao});
//      $cookies.put('login',encodeAuth); //substituir pelo retorno - token
      
      $http.defaults.headers.common.Token =  $cookies.get(retorno.token); //substituir pelo retorno - token
//      console.log("$Cookies.get('token'): "+$cookies.get('token'));
//      console.log('retorno:');
//      console.log(retorno);
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
