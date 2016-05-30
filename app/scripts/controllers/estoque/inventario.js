'use strict';
app.controller('InventarioDialogCtrl', function ($scope, $modal, $modalInstance, LoteResource, $filter, $httpParamSerializerJQLike, params, CONST, toastr) {
  $scope.CONST = CONST;
  $scope.formTipo = params.formTipo;
  $scope.iconeHeaderDialog = params.iconeHeaderDialog;
  $scope.tituloDialog = params.tituloDialog;
  $scope.tipoItem = params.tipoItem;
  $scope.lotes = LoteResource.listFiltro({p:$httpParamSerializerJQLike({tipoItem: $scope.tipoItem.dsSing})},
  function(){
    $scope.lotesInit = angular.copy($scope.lotes);
  });
    
  $scope.removeSaldo = function(index){
    $scope.lotes[index].estoqueDisponivel = $scope.lotes[index].estoqueDisponivel - 1;
  };
  
  $scope.addSaldo = function(index){
    $scope.lotes[index].estoqueDisponivel = $scope.lotes[index].estoqueDisponivel + 1;
  };
  
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
    LoteResource.inventario($scope.lotes,
    function(){
      var toastMsg = "Inventário de " + $scope.tipoItem.dsPlur + " realizado com sucesso!";
      toastr.success(toastMsg);
      var result = {
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
  };
  
  $scope.close = function (result) {
    $modalInstance.close(result);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});