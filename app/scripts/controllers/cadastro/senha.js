'use strict';
app.controller('SenhaDialogCtrl', function ($scope, $modalInstance, params, CONST, toastr, PessoaResource, $httpParamSerializerJQLike){
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.user = params.user;
    $scope.userInit = angular.copy($scope.user);
    
    
    $scope.validarSenha = function(){
      if($scope.user.newSenha1 === $scope.user.newSenha2){
        return true;
      }else{
        toastr.error("As senhas informadas não são iguais");
        return false;
      }
    };

    $scope.submit = function () {
      if($scope.validarSenha()){
        $scope.user.senha = $scope.user.newSenha1;
        $scope.user.$updateSenha({p:$httpParamSerializerJQLike({senha:$scope.user.currentSenha})},
        function(){
          var toastMsg = "Senha alterada com sucesso";
          toastr.success(toastMsg);
          var result = {
            user: $scope.user, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "A senha não foi alterada";
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    $scope.clear = function () {
      $scope.user = $scope.userInit;
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
