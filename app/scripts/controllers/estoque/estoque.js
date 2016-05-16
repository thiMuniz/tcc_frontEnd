'use strict';
app.controller('EstoqueCtrl', function (
    $scope, 
    $modal, 
    $stateParams, 
    EmbalagemResource, 
    RotuloResource, 
    InsumoResource, 
    ProdutoResource, 
    LoteResource,     
    CONST, 
    toastr, 
    $httpParamSerializerJQLike
){
  
  switch($stateParams.tipoItem){
    case 'embalagem':
      $scope.tipoItem = {dsSing:"Embalagem", dsPlur:"Embalagens", rsc: "EmbalagemResource"};
      break;
    case 'rotulo':
      $scope.tipoItem = {dsSing:"Rótulo", dsPlur:"Rótulos", rsc: "RotuloResource"};
      break;
    case 'insumo':
      $scope.tipoItem = {dsSing:"Insumo", dsPlur:"Insumos", rsc: "InsumoResource"};
      break;
    case 'produto':
      $scope.tipoItem = {dsSing:"Produto", dsPlur:"Produtos", rsc: "ProdutoResource"};
      break;
  }
    
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Estoque de " + $scope.tipoItem.dsPlur;
  $scope.labelCadastrarBtn = "Entrada";
  
  $scope.calcularEstoque = function(){
    $scope.estoque = [];
    angular.forEach($scope.lotes, function(value, key){
      var thisItemEstoque = {
        item: value.item,
        estoqueDisponivel: value.estoqueDisponivel
      };
//      var thisItemEstoque = angular.copy(value);
      var addEstoque = true;
      angular.forEach($scope.estoque, function(value, key){
        if(value.item.id == thisItemEstoque.item.id){
          value.estoqueDisponivel = value.estoqueDisponivel + thisItemEstoque.estoqueDisponivel;
          addEstoque = false;
        }
      });
      if(addEstoque){
        $scope.estoque.push(thisItemEstoque);
      }
    });
  };
  
  $scope.atualizarLista = function(){
    $scope.lotes = LoteResource.listTotalPorItem({p:$httpParamSerializerJQLike({tipoItem: $stateParams.tipoItem, totalPorItem: 'S'})},
    function(){
      $scope.calcularEstoque();
      $scope.setHeaderLista();
    }); //definir c gustavo tipo || tipoItem
//    $scope.lotes = LoteResource.query();
  };
  
  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };  
  
  function getItensList(){
    switch($stateParams.tipoItem){
      case 'embalagem':
        return EmbalagemResource.query();
      case 'rotulo':
        return RotuloResource.query();
      case 'insumo':
        return InsumoResource.query();
      case 'produto':
        return ProdutoResource.query();
    }
  };
  
  $scope.setHeaderLista = function(){
    if($scope.estoque.length > 0){
      $scope.headerLista = "Há " + $scope.estoque.length + " " + ($scope.estoque.length > 1 ? $scope.tipoItem.dsPlur : $scope.tipoItem.dsSing) + " com saldo em estoque";
    }else{
      $scope.headerLista = "Não há " + $scope.tipoItem.dsPlur + " com saldo em estoque";
    }
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
      controller: 'LoteDialogCtrl',
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
  
  $scope.openInventarioDialog = function(){
    $scope.params = {
      formTipo: 'inventario',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Inventário",
      tipoItem: $scope.tipoItem,
      lotes: angular.copy($scope.lotes)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/estoque/dialog/formInventario.html",
      controller: "LoteDialogCtrl",
      backdrop: 'static',
      size: 'lg',
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

  $scope.openUpdateDialog = function (lote) {    
//    index = $scope.lotes.indexOf($filter('filter')($scope.lotes, lote, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Lote",
      itens: getItensList(),
      lote: angular.copy(lote)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/estoque/dialog/formLote.html",
      controller: "LoteDialogCtrl",
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
  
  $scope.openUpdateSaldoDialog = function(itemEstoque){
    $scope.params = {
      formTipo: 'updateSaldo',
      iconeHeaderDialog: 'settings',
      tituloDialog: "Atualizar Saldo Lotes",
      tipoItem: $scope.tipoItem,
      lotesAll: angular.copy($scope.lotes),
      itemEstoque: angular.copy(itemEstoque)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/estoque/dialog/formSaldo.html",
      controller: "LoteDialogCtrl",
      backdrop: 'static',
      size: 'lg',
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
//      lote.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
      lote.dtDesativacao = (lote.dtDesativacao ? null : new Date());
      LoteResource.update(lote, function(){
//          $scope.lotes[index] = lote;
          $scope.atualizarLista();
          toastMsg = lote.codLote + (lote.dtDesativacao ? " desativado!" : " ativado!");
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
      controller: "LoteDialogCtrl",
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
  .controller('LoteDialogCtrl', function ($scope, $modal, $modalInstance, LoteResource, $filter, $httpParamSerializerJQLike, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.tipoItem = params.tipoItem;
    if($scope.formTipo == "updateSaldo"){
      
//      toastr.info(params.itemEstoque);
      $scope.itemEstoque = params.itemEstoque;
      $scope.lotes = LoteResource.listLotesItem({p:$httpParamSerializerJQLike({idItem: params.itemEstoque.item.id})});
//      $scope.lotes = $filter('filter')(params.lotesAll, {$: params.itemEstoque.item.nome});
//      console.log($scope.lotes);
    }else{
      $scope.itensAll = params.itens;
      $scope.lote = params.lote;
      $scope.loteInit = angular.copy($scope.lote);
      $scope.lotes = params.lotes ? params.lotes : null;
    }
    
    $scope.openNewSaldoDialog = function(){
      $scope.params = {
        formTipo: $scope.formTipo,
        iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
        tituloDialog: "Informe o novo saldo",
        newSaldo: null
      };
      var modalInstance = $modal.open({
        templateUrl: "views/estoque/dialog/formNewSaldo.html",
        controller: "NewSaldoDialogCtrl",
        backdrop: 'static',
        size: 'sm',
        resolve: {
          params: function () {
            return $scope.params;
          } 
        }
      });
      modalInstance.result.then(function (newSaldo) {
        toastr.success("Novo saldo recebido");
        $scope.produto.imagens = imagens;
      }, function(){
        toastr.warning("Saldo não alterado");
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

  })
  .controller('NewSaldoDialogCtrl', function ($scope, $modal, $modalInstance, LoteResource, $filter, $httpParamSerializerJQLike, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.tipoItem = params.tipoItem;
    
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
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });

