'use strict';
app.controller('PedidoCtrl', function (
    $scope, 
    $modal, 
    $stateParams, 
    PedidoResource,  
    CONST, 
    toastr, 
    $httpParamSerializerJQLike,
    $filter,
    $http
){
      
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Pedidos";
  $scope.labelCadastrarBtn = "Novo Pedido";  
  
  $scope.atualizarLista = function(){
    $scope.pedidos = PedidoResource.query();
//    $scope.pedidos = PedidoResource.getCarrinho({p:$httpParamSerializerJQLike({idPessoa:9})});
  };
  
  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };  
  
  //funções chamadas no onClick dos botões da tela
  $scope.openInsertDialog = function () {
//    $scope.pedido = new PedidoResource();
//    $scope.pedido.statusPedido = [{ordem:1, dtStatus:$filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'), status:{id:1}}];
//    $scope.pedido.$save(
//    function(){
      $scope.params = {
        formTipo: 'insert',
        iconeHeaderDialog: CONST.inserir.iconeHeaderDialog,
        tituloDialog: "Lançar Pedido",
        pedido: new PedidoResource()
      };
      var modalInstance = $modal.open({
        templateUrl: 'views/producao/dialog/formPedido.html',
        controller: 'PedidoDialogCtrl',
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
          $scope.atualizarLista();
        } 
      });
//    },
//    function(){
//      toastMsg = "Não foi possível criar o Pedido";
//      toastr.error(toastMsg);
//    });
    
  };
  
  $scope.openUpdateDialog = function (pedido) {
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Pedido",
      pedido: angular.copy(pedido)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/producao/dialog/formPedido.html",
      controller: "PedidoDialogCtrl",
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
        $scope.atualizarLista();
      } 
    });
  };
    
  $scope.openAtivarDesativarDialog = function (pedido) {
//    index = $scope.pedidos.indexOf($filter('filter')($scope.pedidos, pedido, true)[0]);    
    swal({
      title: "Deseja mesmo" + (pedido.dtDesativacao ? " ativar" : " desativar") + " o Pedido " + pedido.codPedido + "?",
      text: "Você poderá" + (pedido.dtDesativacao ? " desativar" : " ativar") + " o Pedido novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (pedido.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
      var pedidoCopy = angular.copy(pedido);
      pedidoCopy.dtDesativacao = (pedido.dtDesativacao ? null : $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      pedidoCopy.$update(
      function(){
        $scope.atualizarLista();
        toastMsg = pedido.codPedido + (pedido.dtDesativacao ? " ativado!" : " desativado!");
        toastr.success(toastMsg, "Sucesso!");
      }, function(){
        toastMsg = pedido.codPedido + " não foi " + (pedido.dtDesativacao ? "ativado!" : "desativado!");
        toastr.error(toastMsg, "Erro!");
      });
    });
  };

  $scope.openInfoDialog = function (pedido) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Pedido",
      pedido: angular.copy(pedido)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/estoque/dialog/infoPedido.html",
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
.controller('PedidoDialogCtrl', function ($scope, $modal, $modalInstance, PedidoResource, PessoaResource, ProdutoResource, FormaEntregaResource, FormaVendaResource, $filter, $httpParamSerializerJQLike, params, CONST, toastr) {
  $scope.CONST = CONST;
  $scope.formTipo = params.formTipo;
  $scope.iconeHeaderDialog = params.iconeHeaderDialog;
  $scope.tituloDialog = params.tituloDialog;
  $scope.produtosAll = ProdutoResource.listFiltro({p:$httpParamSerializerJQLike({ativo:'S'})});
  $scope.clientesAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:'cliente'})});
  $scope.fornecedoresAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:'fornecedor'})});
  $scope.formasEntregaAll = FormaEntregaResource.query();
  $scope.formasVendaAll = FormaVendaResource.query();
  $scope.pedido = params.pedido;
  
  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };  

  $scope.pedido = params.pedido;
  $scope.pedidoInit = angular.copy($scope.pedido);
  if(!$scope.pedido.produtosPedido){
    $scope.pedido.produtosPedido = [];
  }

  $scope.temp = {};
//    $scope.temp.produtosPedido = $scope.pedidoInit.produtosPedido;
  $scope.temp.produtosPedido = [];

  angular.forEach($scope.pedidoInit.produtosPedido, 
  function(produtoPedido){
    $scope.temp.produtosPedido.push(produtoPedido.produto);
  });

  $scope.addProdutoPedido = function(produto){
    var produtoPedido = {
      produto : produto,
      quantidade : null
    };
    $scope.pedido.produtosPedido.push(produtoPedido);
    //colocar focus na qtd do ultimo elemento
  };

  $scope.removeProdutoPedido = function(produto){
    angular.forEach($scope.pedido.produtosPedido, function(produtoPedido){
      if(produtoPedido.produto.id === produto.id){
        $scope.pedido.produtosPedido.splice($scope.pedido.produtosPedido.indexOf(produtoPedido), 1);
//          $scope.atualizarLista();
        return;
      }
    });
  };
  
  $scope.getPrecoUnitario = function(produto){
    return $scope.pedido.pessoa.pf ? produto.precoUnitarioPf : produto.precoUnitarioPj;
  };
  
  $scope.getTotalProdutos = function(){
    var total = 0;
    angular.forEach($scope.pedido.produtosPedido, 
    function(produtoPedido){
      total += produtoPedido.quantidade * getPrecoUnitario(produtoPedido.produto);
    });
    return total;
  };

  $scope.atualizarLista = function(){ //corrigir function pra permitir remover produto pela tabela
    $scope.temp.produtosPedido = $scope.pedido.produtosPedido;
  };
    
  $scope.submit = function(){
    if ($scope.formTipo == 'insert') { //insert
      $scope.pedido.statusPedido = [{ordem:1, dtStatus:$filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'), status:{id:1}}];
      $scope.pedido.$save(function(){
        var toastMsg = "Pedido " + $scope.pedido.codPedido + " cadastrado com sucesso!";
        toastr.success(toastMsg, "successo");
        var result = {
          pedido: $scope.pedido, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao cadastrar Pedido " + $scope.pedido.codPedido;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    } else { //update
      $scope.pedido.$update(function(){
//        $scope.pedido.statusPedido = [{dtStatus:$filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss')}]; // implementar para permitir dar update da dtStatus da ultima movimentação sem alteração de status
        var toastMsg = "Pedido " + $scope.pedido.codPedido + " editado com sucesso!";
        toastr.success(toastMsg, "Sucesso");
        var result = {
          pedido: $scope.pedido, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao editar Pedido " + $scope.pedido.codPedido;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    }
  };
  
  $scope.closeListPedidosDialog = function(){
    if($scope.atualizarListaEstoque){
      var result = {
        status: "sucesso"
      };
      $scope.close(result);
    }else{
      $scope.cancel();
    }
  };

  // inicio controle de abas
  $scope.steps = [
    'Passo 1 - Dados Pedido',
    'Passo 2 - Produtos',
    'Passo 3 - Entrega e Pagamento'
    
  ];
  $scope.selection = $scope.steps[0];//esse indice que diz se sera comecar qual aba
  $scope.getCurrentStepIndex = function () {
    // Get the index of the current step given selection
    return _.indexOf($scope.steps, $scope.selection);
  };
  // Go to a defined step index
  $scope.goToStep = function (index) {
    if (!_.isUndefined($scope.steps[index]))
    {
      $scope.selection = $scope.steps[index];
    }
  };
  $scope.hasNextStep = function () {
    var stepIndex = $scope.getCurrentStepIndex();
    var nextStep = stepIndex + 1;
    // Return true if there is a next step, false if not
    return !_.isUndefined($scope.steps[nextStep]);
  };
  $scope.hasPreviousStep = function () {
    var stepIndex = $scope.getCurrentStepIndex();
    var previousStep = stepIndex - 1;
    // Return true if there is a next step, false if not
    return !_.isUndefined($scope.steps[previousStep]);
  };
  $scope.incrementStep = function () {
    if ($scope.hasNextStep())
    {
      var stepIndex = $scope.getCurrentStepIndex();
      var nextStep = stepIndex + 1;
      $scope.selection = $scope.steps[nextStep];
    }
  };
  $scope.decrementStep = function () {
    if ($scope.hasPreviousStep())
    {
      var stepIndex = $scope.getCurrentStepIndex();
      var previousStep = stepIndex - 1;
      $scope.selection = $scope.steps[previousStep];
    }
  };
  // Fim controle abas
    
  $scope.clear = function () {
    $scope.pedido = angular.copy($scope.pedidoInit);
    if(params.formTipo == 'lookup'){
      $scope.temp.fornecedoresItem = $scope.pedidoInit.fornecedores;      
    }
  };

  $scope.close = function(result){
    $modalInstance.close(result);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

