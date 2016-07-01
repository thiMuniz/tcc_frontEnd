'use strict';
app.controller('RelatorioCtrl', function ($sce, $window, $scope, $modal, $http, $filter, ProdutoResource, InsumoResource, PessoaResource, CONST, toastr, $stateParams, $httpParamSerializerJQLike) {

  var toastMsg = "";
  $scope.rel = $stateParams.rel;
  $scope.CONST = CONST;
  $scope.tituloView = "Relatório de " + $scope.rel;
  
  $scope.objRelInit = {
    tipoEmissao: 'newTab'
  };
  $scope.objRel = $scope.objRelInit;
  $scope.temp = {};
  
  switch($scope.rel){
    case 'clientes':
      $scope.tiposPessoa = [
        {key: '', value: 'Todos'},
        {key: 'pj', value: 'Pessoa Jurídica'},
        {key: 'pf', value: 'Pessoa Física'}
      ];
      break;
    case 'fornecedores':
      $scope.fornecedoresAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:"fornecedor"})});
      $scope.insumosAll = InsumoResource.query();
      break;
    case 'produtividade':
      $scope.produtosAll = ProdutoResource.query();
      break;
    case 'pedidos':
      $scope.statusAll = [
        {id:'', nome:'TODOS'},
        {id:1, nome:'CARRINHO'},
        {id:2, nome:'PEDIDO EFETIVADO'},
        {id:3, nome:'PAGAMENTO'},
        {id:4, nome:'ESTOQUE DISPONÍVEL'},
        {id:5, nome:'PREPARADO EXPEDIÇÃO'},
        {id:6, nome:'EMISSÃO NF'},
        {id:7, nome:'ENTREGA'},
        {id:8, nome:'CONCLUÍDO'},
        {id:9, nome:'CANCELADO'}
      ];
      $scope.clientesAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:"cliente"})});
      break;
    case 'vendas':
      $scope.tiposPessoa = [
        {key: '', value: 'Todos'},
        {key: 'pj', value: 'Pessoa Jurídica'},
        {key: 'pf', value: 'Pessoa Física'}
      ];
      $scope.clientesAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:"cliente"})});
      $scope.produtosAll = ProdutoResource.query();
      break;
  };
  

  $scope.toogleHelpIcon = function(){
    $scope.showHelpIcon = !$scope.showHelpIcon;
  };
  
  $scope.setTipoPessoa = function(tipoPessoa){
    $scope.objRel.tipoPessoa = tipoPessoa.key;
    if($scope.rel == 'vendas' || $scope.rel == 'pedidos'){
      if(tipoPessoa.key != ''){
        $scope.clientesAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:"cliente", tipoPessoa: tipoPessoa.key})});
      }else{
        $scope.clientesAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:"cliente"})});
      }
    }
  };
  
  $scope.setFornecedor = function(fornecedor){
    $scope.objRel.idFornecedor = fornecedor.id;
  };
  
  $scope.setInsumo = function(insumo){
    $scope.objRel.idInsumo = insumo.id;
  };
  
  $scope.setProduto = function(produto){
    $scope.objRel.idProduto = produto.id;
  };
  
  $scope.setCliente = function(cliente){
    $scope.objRel.idCliente = cliente.id;
  };
  
  $scope.setStatus = function(status){
    $scope.objRel.idStatus = status.id;
  };
  
  $scope.clear = function () {
    $scope.objRel = $scope.objRelInit;
    $scope.temp = {};
  };
  
  $scope.getRelatorio = function () {
    $http.get(CONST.ws.urlSGP + 'relatorio/' + $stateParams.rel, $scope.objRel, {responseType: 'arraybuffer'})
            .success(function (response) {
              toastMsg = "Relatório de "+$scope.rel+" gerado com sucesso";
              toastr.success(toastMsg);
              $scope.fileName = "relatorio_"+$scope.rel+".pdf";
              var fileURL = URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
              if($scope.objRel.tipoEmissao == 'download'){
                $scope.downloadReport(fileURL);
              }else{
                $scope.openReport(fileURL);
              }
//              
            })
            .error(function(response){
              toastMsg = "Erro ao gerar relatório";
              toastr.error(toastMsg);
              console.log(response);
            });
  };
  
  $scope.downloadReport = function (fileURL) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = fileURL;
    a.download = $scope.fileName;              
    a.click();
  };
  
  $scope.openReport = function (fileURL) {
    $window.open($sce.trustAsResourceUrl(fileURL));
  };
});