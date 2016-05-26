'use strict';
app.controller('SaldoDialogCtrl', function ($scope, $modal, $modalInstance, LoteResource, $filter, $httpParamSerializerJQLike, params, CONST, toastr) {
  $scope.CONST = CONST;
  $scope.formTipo = params.formTipo;
  $scope.iconeHeaderDialog = params.iconeHeaderDialog;
  $scope.tituloDialog = params.tituloDialog;
  $scope.tipoItem = params.tipoItem;
  $scope.lote = params.lote;
  $scope.loteOrig = angular.copy(params.lote);
  $scope.newSaldo = null;
  $scope.temp = { motivo: null };

  $scope.motivos = [
    'motivo 1',
    'motivo 2',
    'motivo 3',
    'motivo 4',
    'motivo 5',
    'motivo 6',
    'motivo 7'
  ];
  
  $scope.submit = function(){
    if($scope.formTipo == 'updateLotes'){
      $scope.lote.estoqueDisponivel = $scope.newSaldo;
      $scope.lote.$updateSaldo({p:$httpParamSerializerJQLike({motivo: $scope.temp.motivo})}, function(){
        var toastMsg = "Saldo do Lote " + $scope.lote.codLote + " alterado com sucesso!";
        toastr.success(toastMsg);
        var result = {
          lote: $scope.lote, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao alterar saldo do Lote " + $scope.lote.codLote;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    }else{
      var toastMsg = "Saldo do Lote " + $scope.lote.codLote + " alterado com sucesso!";
      toastr.success(toastMsg);
      var result = {
        lote: $scope.lote,
        newSaldo: $scope.newSaldo
      };
      $scope.close(result);
    }
  };
  
  $scope.close = function (result) {
    $modalInstance.close(result);
  };

  $scope.cancel = function(){
    var toastMsg = "Saldo do Lote " + $scope.lote.codLote + " não foi alterado";
    toastr.warning(toastMsg, "Erro");    
    $modalInstance.dismiss('cancel');
  };

});