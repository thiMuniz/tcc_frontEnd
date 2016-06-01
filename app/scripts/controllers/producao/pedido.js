'use strict';
app.controller('PedidoCtrl', function (
    $scope, 
    $modal, 
    $stateParams, 
    PedidoResource,
//    ProdutoResource, 
//    LoteResource,     
    CONST, 
    toastr, 
    $httpParamSerializerJQLike,
    $filter,
    $http
){
      
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Pedidos";
  $scope.labelCadastrarBtn = "Sugerir pedido";
  
  
  $scope.atualizarLista = function(){
    $scope.pedidos = PedidoResource.query();
  };
  
  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };  
  
  //funções chamadas no onClick dos botões da tela
  $scope.openInsertDialog = function () {
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: CONST.inserir.iconeHeaderDialog,
      tituloDialog: "Cadastrar Lote",
      tipoItem: $scope.tipoItem,
      itens: getItensList(),
      lote: new LoteResource()
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/estoque/dialog/formLote.html',
      controller: 'PedidoDialogCtrl',
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
//        $scope.lotes[index] = result.lote;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };
    
  $scope.openAtivarDesativarDialog = function (lote) {
//    index = $scope.lotes.indexOf($filter('filter')($scope.lotes, lote, true)[0]);    
    swal({
      title: "Deseja mesmo" + (lote.dtDesativacao ? " ativar" : " desativar") + " o Lote " + lote.codLote + "?",
      text: "Você poderá" + (lote.dtDesativacao ? " desativar" : " ativar") + " o Lote novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (lote.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
      var loteCopy = angular.copy(lote);
      loteCopy.dtDesativacao = (lote.dtDesativacao ? null : $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      loteCopy.$update(
      function(){
        $scope.atualizarLista();
        toastMsg = lote.codLote + (lote.dtDesativacao ? " ativado!" : " desativado!");
        toastr.success(toastMsg, "Sucesso!");
      }, function(){
        toastMsg = lote.codLote + " não foi " + (lote.dtDesativacao ? "ativado!" : "desativado!");
        toastr.error(toastMsg, "Erro!");
      });
    });
  };

  $scope.openInfoDialog = function (lote) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Lote",
      lote: angular.copy(lote)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/estoque/dialog/infoLote.html",
      controller: "PedidoDialogCtrl",
      backdrop: 'static',
      size: '',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  };
  
  $scope.atualizarLista();
  
})
.controller('PedidoDialogCtrl', function ($scope, $modal, $modalInstance, LoteResource, $filter, $httpParamSerializerJQLike, params, CONST, toastr) {
  $scope.CONST = CONST;
  $scope.formTipo = params.formTipo;
  $scope.iconeHeaderDialog = params.iconeHeaderDialog;
  $scope.tituloDialog = params.tituloDialog;
  $scope.tipoItem = params.tipoItem;
  $scope.lotesNew = [];

  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };  

  $scope.atualizarLista = function(){
    $scope.lotes = LoteResource.listFiltro({p:$httpParamSerializerJQLike({idItem: params.itemEstoque.item.id})});
  };
  
  $scope.openUpdateDialog = function(lote){
//    index = $scope.lotes.indexOf($filter('filter')($scope.lotes, lote, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Lote",
      itens: params.itensList,
      lote: angular.copy(lote)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/estoque/dialog/formLote.html",
      controller: "PedidoDialogCtrl",
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
        $scope.atualizarListaEstoque = true;
        $scope.atualizarLista();
      }
    });
  };
  
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
  
  $scope.closeListLotesDialog = function(){
    if($scope.atualizarListaEstoque){
      var result = {
        status: "sucesso"
      };
      $scope.close(result);
    }else{
      $scope.cancel();
    }
  };

  $scope.clear = function () {
    $scope.lote = angular.copy($scope.loteInit);
    if(params.formTipo == 'lookup'){
      $scope.temp.fornecedoresItem = $scope.loteInit.fornecedores;      
    }
  };

  $scope.close = function(result){
    $modalInstance.close(result);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

