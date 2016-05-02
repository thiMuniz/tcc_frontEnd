'use strict';
app.controller('ImagemDialogCtrl', function ($scope, $modalInstance, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;    
    $scope.imagemInit = params.imagemInit;
    $scope.textImgBtn = params.formTipo == 'insert' ? CONST.inserir.textImgBtn : CONST.editar.textImgBtn;
    
//    $scope.imagemNew;
    
    $scope.submit = function () {
      if($scope.imagemNew){
        $scope.close($scope.imagemNew);
      }else{
        $scope.cancel();
      }
    };
    
    $scope.clear = function () {
      delete $scope.imagemNew;
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
