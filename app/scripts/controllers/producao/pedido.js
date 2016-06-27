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
  $scope.imgCadastrarBtn = "shopping_cart";
  
  $scope.actionIconStatus = [
    {id:1, nome:'CARRINHO', icone:'add_shopping_cart', tooltipAction:'Alterar produtos carrinho'}, 
    {id:2, nome:'PEDIDO EFETIVADO', icone:'thumb_up', tooltipAction:'Efetivar pedido'},
    {id:3, nome:'PAGAMENTO', icone:'attach_money', tooltipAction:'Confirmar pagamento'},
    {id:4, nome:'ESTOQUE DISPONÍVEL', icone:'format_list_numbered', tooltipAction:'Confirmar disponibilidade estoque'},
    {id:5, nome:'PREPARADO EXPEDIÇÃO', icone:'view_quilt', tooltipAction:'Confirmar pedido separado p/ expedição'},
    {id:6, nome:'EMISSÃO NF', icone:'description', tooltipAction:'Confirmar NF emitida'},
    {id:7, nome:'ENTREGA', icone:'local_shipping', tooltipAction:'Pedido entregue'},
    {id:8, nome:'CONCLUÍDO', icone:'check_circle', tooltipAction:'Pedido concluído'},
    {id:9, nome:'CANCELADO', icone:'cancel', tooltipAction:'Pedido cancelado'}
  ];
  
  $scope.atualizarLista = function(){
    $scope.pedidos = PedidoResource.query(
      function(){ //monta variável utilizada pra ordenar pedidos por valor
        $scope.orderScriptStatus();
        $scope.setStatusAtualPedido();
        $scope.setValorTotalPedido();
    });
  };
  
  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };  
  
  $scope.getTextClass = function(pedido){    
    var classe;
    switch(pedido.statusAtual.status.nome){
      case 'CANCELADO':
        classe = 'text-danger';
        break;
      case 'CONCLUÍDO':
        classe = 'text-success';
        break;
      default: //pedido em aberto
        classe = 'text-info';
        break;
    }
    return classe;
  };
  
  $scope.showHideActBtn = function(pedido, status){  
    if(pedido.statusAtual.status.nome == 'CANCELADO' && status.status.nome == 'CANCELADO'){
      return true;
    }else if(pedido.statusAtual.status.nome == 'CONCLUÍDO' && status.status.nome == 'CONCLUÍDO'){
      return true;
    }else if(pedido.statusAtual.status.nome != 'CONCLUÍDO' && pedido.statusAtual.status.nome != 'CANCELADO'){
      return true;
    }else{
      return false;
    }
  };
  
  $scope.getActBtnClass = function(pedido, status){    
    var classe = 'act-pedido';
    switch(pedido.statusAtual.status.nome){
      case 'CANCELADO':
        if(status.status.nome == 'CANCELADO'){
          classe += ' text-danger'; 
        }else if(status.dtStatus){
          classe += ' text-success'; 
        }else{
          classe += ' text-muted'; 
        }
        classe +=  ' disabled'; 
        
        break;
      case 'CONCLUÍDO':
        if(status.status.nome == 'CANCELADO'){
          classe += ' text-muted';
        }else{
          classe += ' text-success'; 
        }
        classe +=  ' disabled'; 
        break;
      default: //pedido em aberto
        if(status.dtStatus){ 
          classe += ' text-success'; 
          if(pedido.statusAtual.status.nome != 'CARRINHO'){
            classe +=  ' disabled'; 
          }
        }else if(status.ordem == pedido.statusAtual.ordem + 1){
          classe += ' text-warning'; 
        }else{
          classe += ' text-muted'; 
          classe +=  ' disabled'; 
        }
        break;
    }
    return classe;
  };
  
  $scope.getSizeBtn = function(pedido, status){
    if(pedido.statusAtual.status.nome != 'CONCLUÍDO' &&
        pedido.statusAtual.status.nome != 'CANCELADO' &&
        status.ordem == pedido.statusAtual.ordem + 1){
      return 30; //30
    }else{
      return 24;
    }
  };
  
  $scope.getPrecoUnitario = function(pedido, produto){
    return pedido.pessoa && pedido.pessoa.pj ? produto.precoUnitarioPj : produto.precoUnitarioPf;
  };
  
  $scope.getTotalPedido = function(pedido){
    var valorTotalProdutos = 0;
    angular.forEach(pedido.produtosPedido, function(produtoPedido){
      valorTotalProdutos += produtoPedido.quantidade * $scope.getPrecoUnitario(pedido, produtoPedido.produto);
    });
    return valorTotalProdutos - pedido.desconto + (pedido.formaEntregaPedido ? pedido.formaEntregaPedido.valorCusto : 0);
//      return valorTotalProdutos;
  };
  
  $scope.orderScriptStatus = function(){
    angular.forEach($scope.pedidos, function(pedido){
      pedido.statusPedido = $filter('orderBy')(pedido.statusPedido, 'ordem');
    });
  };

  $scope.setStatusAtualPedido = function(){
    angular.forEach($scope.pedidos, function(pedido){
      angular.forEach(pedido.statusPedido, function(status){
//        console.log("verificar st "+status.status.nome);
        if(status.dtStatus){ //verificar se é cancelado - setar cada status cfm achar q tem dt e parar no 1º sem dt
          pedido.statusAtual = status;
//          pedido.statusAtualNome = status.status.nome;
//          pedido.statusAtualOrdem = status.ordem;
//          pedido.dtUltimaAlteracao = status.dtStatus;
//          console.log("setou st "+status.status.nome);
        }else{
//          console.log("st futuro "+status.status.nome);
        }
      });      
    });
  };
  
  $scope.setValorTotalPedido = function(){
    angular.forEach($scope.pedidos, function(pedido){
      pedido.valorTotal = $scope.getTotalPedido(pedido);
    });
  };
    
  
  //funções chamadas no onClick dos botões da tela
  $scope.openInsertDialog = function () {
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
    
  $scope.updateStatusPedido = function(pedido, status, isCancelar){
    $scope.updateStatus = isCancelar ?  {cancelar: 'S'} : {proximostatus: 'S'};
    
    swal({
      title: "Confirmar alteração do status do pedido " + (pedido.codPedido ? pedido.codPedido : "") + " para " + status.status.nome + "?",
      text: "Essa ação não poderá ser desfeita",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (isCancelar ? "#DD6B55" : "#428bca"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
      pedido.$update({p:$httpParamSerializerJQLike($scope.updateStatus)},
      function(){
        toastMsg = "Status do Pedido " + pedido.codPedido + " alterado com sucesso para " + status.status.nome;
        toastr.success(toastMsg, "Sucesso!");
        $scope.atualizarLista();
      }, function(){
        toastMsg = "Status do Pedido " + pedido.codPedido + " não foi alterado";
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
      templateUrl: "views/producao/dialog/infoPedido.html",
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
  
  $scope.openTimelineDialog = function (pedido) {    
    $scope.params = {
      formTipo: 'timeline',
      iconeHeaderDialog: 'history',
      tituloDialog: "Histórico Pedido",
      actionIconStatus: $scope.actionIconStatus,
      pedido: angular.copy(pedido)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/producao/dialog/timelinePedido.html",
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
  if($scope.formTipo == 'insert' || $scope.formTipo == 'update'){
    $scope.produtosAll = ProdutoResource.listFiltro({p:$httpParamSerializerJQLike({ativo:'S'})});
    $scope.clientesAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:'cliente'})});
    $scope.fornecedoresAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:'fornecedor'})});
    $scope.formasEntregaAll = FormaEntregaResource.query();
    $scope.formasVendaAll = FormaVendaResource.query();
  };
  $scope.actionIconStatus = params.actionIconStatus ? params.actionIconStatus : undefined;

  $scope.pedido = params.pedido;
  $scope.pedidoInit = angular.copy($scope.pedido);
  if(!$scope.pedido.produtosPedido){
    $scope.pedido.produtosPedido = [];
  };

  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };  
  
  $scope.toogleHelpIcon = function(){
    $scope.showHelpIcon = !$scope.showHelpIcon;
  };

  $scope.getInvertedClass = function(index){
    return (index % 2 == 0) ? '' : 'timeline-inverted';
  };
  
  $scope.getTimelineClass = function(pedido, status){
    var classe = 'timeline-badge ';
    switch(pedido.statusAtual.status.nome){
      case 'CONCLUÍDO':
        classe +=  'success'; 
        break;
      case 'CANCELADO':
        if(status.status.nome == 'CANCELADO'){
          classe += ' danger'; 
        }else if(status.dtStatus){
          classe += ' success'; 
        }else{
          classe += ' muted'; 
        }
        break;      
      default: //pedido em aberto
        if(status.dtStatus){ 
          classe += ' success'; 
//          if(pedido.statusAtual.status.nome != 'CARRINHO'){
//            classe +=  ' disabled'; 
//          }
        }else if(status.ordem == pedido.statusAtual.ordem + 1){
          classe += ' warning'; 
        }else{
          classe += ' text-muted'; 
        }
        break;
    }
    return classe;
  };
  
  

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
    return $scope.pedido.pessoa && $scope.pedido.pessoa.pj ? produto.precoUnitarioPj : produto.precoUnitarioPf;
  };
  
  $scope.getTotalProdutos = function(){
    $scope.temp.valorTotalProdutos = 0;
    angular.forEach($scope.pedido.produtosPedido, function(produtoPedido){
      $scope.temp.valorTotalProdutos += produtoPedido.quantidade * $scope.getPrecoUnitario(produtoPedido.produto);
    });
    return $scope.temp.valorTotalProdutos;
  };

  $scope.atualizarLista = function(){ //corrigir function pra permitir remover produto pela tabela
    $scope.temp.produtosPedido = $scope.pedido.produtosPedido;
  };
//  
//  $scope.efetivarPedido = function(){
//    $scope.pedido.statusPedido.push({ordem:2, dtStatus:'', status:{id:2}});
//    $scope.submit();
//  };
  
  $scope.updateStatusPedido = function(isCancelar){
    $scope.updateStatus = isCancelar ?  {cancelar: 'S'} : {proximostatus: 'S'};
    $scope.submit();
  };
  
  $scope.submit = function(){
    if ($scope.formTipo == 'insert') { //insert
      $scope.pedido.$save(function(){
        var toastMsg = "Pedido " + $scope.pedido.codPedido + " cadastrado com sucesso!";
        toastr.success(toastMsg, "successo");
        if($scope.updateStatus){
          $scope.formTipo = 'update';
          $scope.submit();
        }else{
          var result = {
            pedido: $scope.pedido, 
            status: "sucesso"
          };
          $scope.close(result);
        }
      }, function(){
        var toastMsg = "Erro ao cadastrar Pedido " + $scope.pedido.codPedido;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    } else { //update
//      $scope.pedido.statusPedido[$scope.pedido.statusPedido.length - 1].dtStatus = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
      $scope.pedido.$update({p:$httpParamSerializerJQLike($scope.updateStatus)},
      function(){        
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
    'Passo 3 - Entrega',
    'Passo 4 - Pagamento'    
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
//    if(params.formTipo == 'lookup'){
      $scope.temp.produtosPedido = $scope.pedidoInit.produtosPedido;      
//    }
  };

  $scope.close = function(result){
    $modalInstance.close(result);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

