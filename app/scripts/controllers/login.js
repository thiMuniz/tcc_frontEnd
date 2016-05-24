'use strict';
app.controller('LoginCtrl', function ($scope, $filter, $http, $cookies, $state, PessoaResource, $rootScope) {
  
  $scope.user = new PessoaResource();

  $scope.login = function(){
    $scope.user.$login(function(retorno){ /*success 200~299*/
      $rootScope.isLogged = true;
      swal({
        title: "Bem vindo(a) " + retorno.pessoa.pf.nome,
        text: "Sua sessão expira em " + $filter('date')(retorno.dtExpiracao, 'dd/MM/yyyy HH:mm:ss'),
        type: "success"
      });
      $cookies.putObject('objToken', retorno, {
//        secure: true, 
        expires: new Date(retorno.dtExpiracao)
      });
      $http.defaults.headers.common.Token = retorno.token;
      $state.go('main.home');        
    }, function(){/*error >299 */
       swal({
         title: "Usúario/senha incorretos",
         type: "error"
       });
    });
  };  
});
