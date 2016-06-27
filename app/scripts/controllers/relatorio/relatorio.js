'use strict';
app.controller('RelatorioCtrl', function ($scope, $modal, $http, $filter, ProdutoResource, InsumoResource, PessoaResource, CONST, toastr, $stateParams, $httpParamSerializerJQLike) {

  var toastMsg = "";
  $scope.rel = $stateParams.rel;
  $scope.CONST = CONST;
  $scope.tituloView = "Relatório de " + $scope.rel;
  
  $scope.temp = {};
  $scope.objRel = {};
  
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
      $scope.status = [
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
      $scope.clientesAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil:"cliente"})});
      $scope.tiposPessoa = [
        {key: '', value: 'Todos'},
        {key: 'pj', value: 'Pessoa Jurídica'},
        {key: 'pf', value: 'Pessoa Física'}
      ];
      break;
  };
  

  $scope.toogleHelpIcon = function(){
    $scope.showHelpIcon = !$scope.showHelpIcon;
  };
  
  $scope.setTipoPessoa = function(tipoPessoa){
    $scope.objRel.tipo = tipoPessoa.key;
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
  
  
  $scope.clear = function () {
    $scope.objRel = {};
    $scope.temp = {};
  };
  
  $scope.getRelatorio = function () {
    $http.post(CONST.ws.urlSGP + 'relatorio/' + $stateParams.rel, $scope.objRel, {responseType: 'arraybuffer'})
            .success(function (response) {
              console.log("Success response: ");
              console.log(response);
              var fileName = "relatorio_"+$scope.rel+".pdf";
              var a = document.createElement("a");
              document.body.appendChild(a);
              a.style = "display: none";
              var file = new Blob([response], {type: 'application/pdf'});
              var fileURL = URL.createObjectURL(file);
              a.href = fileURL;
              a.download = fileName;
              a.click();
              //    var teste = $sce.trustAsResourceUrl(fileURL);
            })
            .error(function(response){
              console.log("Error response: ");
              console.log(response);
            });
  };

//  $scope.submit = function () {
//    if ($scope.formTipo == 'insert') { //insert
//      $scope.destaque.tipo = $scope.tipo;
//      $scope.destaque.$save(function () {
//        var toastMsg = "Destaque " + $scope.destaque.nome + " cadastrado com sucesso!";
//        toastr.success(toastMsg, "successo");
//        var result = {
//          destaque: $scope.destaque,
//          status: "sucesso"
//        };
//        $scope.close(result);
//      }, function () {
//        var toastMsg = "Erro ao cadastrar Destaque " + $scope.destaque.nome;
//        toastr.error(toastMsg, "Erro");
//        var result = {
//          status: "erro"
//        };
//        $scope.close(result);
//      });
//    } else { //update
//      $scope.destaque.$update(function () {
//        var toastMsg = "Destaque " + $scope.destaque.nome + " editado com sucesso!";
//        toastr.success(toastMsg, "Sucesso");
//        var result = {
//          destaque: $scope.destaque,
//          status: "sucesso"
//        };
//        $scope.close(result);
//      }, function () {
//        var toastMsg = "Erro ao editar Destaque " + $scope.destaque.nome;
//        toastr.error(toastMsg, "Erro");
//        var result = {
//          status: "erro"
//        };
//        $scope.close(result);
//      });
//    }
//  };
});