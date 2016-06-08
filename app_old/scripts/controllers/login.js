'use strict';
app.controller('LoginCtrl', function ($scope, $filter, $http, $cookies, $state, PessoaResource, $rootScope, $httpParamSerializerJQLike) {
  
  $scope.showLogin = true;
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
  
  $scope.toogleShowLogin = function(){
    $scope.showLogin = !$scope.showLogin;
  };
  
  $scope.recuperarSenha = function(){
    $scope.user.$recuperarSenha(
    function(retorno){
      swal({
        title: "Senha alterada com sucesso!",
        text: "Uma nova senha foi enviada para o endereço de E-mail cadastrado. ",
        type: "success"
      });
      $scope.toogleShowLogin();
    }, function(){
       swal({
         title: "Senha não alterada!",
         text: "O CPF infomado não corresponde a nenhum colaborador ativo.",
         type: "error"
       });
    });
  };
  
});
