'use strict';
app.controller('HeaderCtrl', function ($scope, $filter, $http, $cookies, $state, $rootScope, PessoaResource) {
  
  if($cookies.getObject('objToken')){
    $rootScope.isLogged = true;
    $rootScope.usuario = $cookies.getObject('objToken').pessoa;
  }else{
    $rootScope.isLogged = false;
    $state.go('login');
  }
    
  $scope.logout = function(){
    $scope.user = new PessoaResource();
    $scope.user.$logout(function(retorno){ /*success 200~299*/
      swal({
        title: "Sessão finalizada",
        text: "Até logo " + $rootScope.usuario.pf.nome,
        type: "success"
      });
      $http.defaults.headers.common.Token = undefined;
      $cookies.remove('objToken');
      $state.go('login');
    }, function(){/*error >299 */
       swal({
         title: "Falha ao fazer logout",
         text: "Sua sessão ainda está ativa",
         type: "error"
       });
    });
  };
  
});
