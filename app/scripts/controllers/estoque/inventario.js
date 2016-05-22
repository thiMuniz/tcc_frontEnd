'use strict';
app.controller('InventarioDialogCtrl', function ($scope, $modal, $modalInstance, LoteResource, $filter, $httpParamSerializerJQLike, params, CONST, toastr) {
  $scope.CONST = CONST;
  $scope.formTipo = params.formTipo;
  $scope.iconeHeaderDialog = params.iconeHeaderDialog;
  $scope.tituloDialog = params.tituloDialog;
  $scope.tipoItem = params.tipoItem;
  $scope.lotes = LoteResource.listFiltro({p:$httpParamSerializerJQLike({tipoItem: $scope.tipoItem.dsSing})});
  $scope.newSaldo = null;
  
  $scope.openNewSaldoDialog = function(lote){
    $scope.params = {
      formTipo: $scope.formTipo,
      iconeHeaderDialog: 'swap_vert',
      tituloDialog: "Alterar saldo",
      lote: angular.copy(lote)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/estoque/dialog/formSaldo.html",
      controller: "SaldoDialogCtrl",
      backdrop: 'static',
      size: 'sm',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result){
      lote.newSaldo = result.newSaldo;
    }, function(){
      toastr.warning("Saldo não alterado");
    });
  };

  $scope.submit = function(){
    if($scope.newSaldo && ($scope.newSaldo != $scope.loteOrig.estoqueDisponivel)){
      $scope.lote.estoqueDisponivel = $scope.newSaldo;
      LoteResource.inventario($scope.listaLotesTeste, function(){
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
      var toastMsg = "Saldo do Lote " + $scope.lote.codLote + " não foi alterado";
      toastr.warning(toastMsg, "Erro");
      $scope.cancel();
      //informar que saldo n foi alterado
    }
  };
  
  $scope.close = function (result) {
    $modalInstance.close(result);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});