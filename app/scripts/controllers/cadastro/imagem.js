'use strict';
app.controller('ImagemDialogCtrl', function ($scope, $modalInstance, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.textImgBtn = params.formTipo == 'insert' ? CONST.inserir.textImgBtn : CONST.editar.textImgBtn;
    $scope.imagens = params.imagens;
    $scope.imagensInit = angular.copy(params.imagens);
    $scope.maxImagens = params.maxImagens;    
    
    $scope.addImagem = function(){
      $scope.imagens.push(angular.copy($scope.imagemNew));
      $scope.limparCamposImagem();
    };
    
    $scope.removerImagem = function(index){
      $scope.imagens.splice(index, 1);
    };
    
    $scope.limparCamposImagem = function(){
      $scope.imagemNew.arquivo = null;
      $scope.imgSelecionada  = null;
    };
    
    $scope.submit = function () {
      $scope.close($scope.imagens);
    };
    
    $scope.clear = function () {
      $scope.imagens = $scope.imagensInit;
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
