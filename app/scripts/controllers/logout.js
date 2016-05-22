'use strict';
app.controller('LoginCtrl', function ($scope, $http, $cookies, $state, toastr, PessoaResource) {
  
  if($cookies.getObject('objToken')){
    $scope.logout();
  }else{
    toastr.error('Usuário não localizado nos cookies');
  }  
  
  $scope.logout = function(){
    $scope.user = new PessoaResource();
    $scope.user.$logout(function(retorno){ /*success 200~299*/
      swal({
        title: "Sessão finalizada",
        text: "Até logo " + (retorno.pessoa.pf ? retorno.pessoa.pf.nome : retorno.pessoa.pj.nomeFantasia),
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
