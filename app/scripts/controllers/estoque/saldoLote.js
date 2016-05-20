'use strict';
app.controller('NewSaldoDialogCtrl', function ($scope, $modal, $modalInstance, LoteResource, $filter, $httpParamSerializerJQLike, params, CONST, toastr) {
  $scope.CONST = CONST;
  $scope.formTipo = params.formTipo;
  $scope.iconeHeaderDialog = params.iconeHeaderDialog;
  $scope.tituloDialog = params.tituloDialog;
  $scope.tipoItem = params.tipoItem;
  $scope.lote = params.lote;
  $scope.loteOrig = angular.copy(params.lote);
  $scope.newSaldo = null;
  $scope.motivo = null;

//  $scope.submit = function () {
//    $scope.close($scope.newSaldo);
//  };
  $scope.submit = function(){
    if ($scope.formTipo == 'insert') { //insert
      $scope.lote.$save(function(){
        var toastMsg = "Lote " + $scope.lote.codLote + " cadastrado com sucesso!";
        toastr.success(toastMsg, "successo");
        var result = {
          lote: $scope.lote, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao cadastrar Lote " + $scope.lote.codLote;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    } else { //update
      $scope.lote.$update(function(){
        var toastMsg = "Lote " + $scope.lote.codLote + " editado com sucesso!";
        toastr.success(toastMsg, "Sucesso");
        var result = {
          lote: $scope.lote, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao editar Lote " + $scope.lote.codLote;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    }
  };
  
  $scope.close = function (result) {
    $modalInstance.close(result);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});