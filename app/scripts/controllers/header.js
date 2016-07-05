'use strict';
app.controller('HeaderCtrl', function (
  $scope, 
  $filter, 
  $modal, 
  $http, 
  $cookies, 
  $state, 
  $rootScope, 
  PessoaResource, 
  ProdutoResource,
  InsumoResource,
  RotuloResource,
  EmbalagemResource,
  $httpParamSerializerJQLike,
  CONST
) {
  
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
  
  $scope.openUpdateSenhaDialog = function(){
    var user = new PessoaResource();
    user.id = $rootScope.usuario.id;
    user.permissao = $rootScope.usuario.permissao;
    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Alterar Senha",
      user: user
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formSenha.html",
      controller: "SenhaDialogCtrl",
      backdrop: 'static',
      size: '',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
      if (result.status == "sucesso") {
        //msg sucesso?
      } 
    });
  };
  
  
});
