'use strict';
app.controller('ProdutoCtrl', function ($scope, $modal, $filter, ProdutoResource, CategoriaResource, ReceitaResource, SeloResource, EmbalagemResource, RotuloResource, CONST, toastr, $httpParamSerializerJQLike) {
  
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Produtos";
  $scope.headerLista = "Nenhum Produto foi encontrado";
  $scope.labelCadastrarBtn = "Novo Produto";
  
  $scope.atualizarLista = function(){
    $scope.produtos = ProdutoResource.query();
//    $scope.produtos = [
//      {nome:"prod1", imagens:[{id:1, caminhoArquivo:"img/produto/max_e_bafinho.jpg"}, {id:2, caminhoArquivo:"img/produto/rabujento.jpg"}]},
//      {nome:"prod2", imagens:[{id:2, caminhoArquivo:"img/produto/rabujento.jpg"}]}
//    ];
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
      tituloDialog: "Cadastrar Produto",
      categorias: CategoriaResource.query(),
      receitas: ReceitaResource.query(),
      produto: new ProdutoResource()
//      produto: {imagens: ""}
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formProduto.html',
      controller: 'ProdutoDialogCtrl',
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
//        $scope.produtos[index] = result.produto;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };

  $scope.openUpdateDialog = function (produto) {    
//    index = $scope.produtos.indexOf($filter('filter')($scope.produtos, produto, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Produto",
      categorias: CategoriaResource.query(),
      receitas: ReceitaResource.query(),
      produto: angular.copy(produto)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formProduto.html",
      controller: "ProdutoDialogCtrl",
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
//        $scope.produtos[index] = result.produto;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };
  
  $scope.openAtivarDesativarDialog = function (produto) {
//    index = $scope.produtos.indexOf($filter('filter')($scope.produtos, produto, true)[0]);    
    swal({
      title: "Deseja mesmo" + (produto.dtDesativacao ? " ativar" : " desativar") + " o Produto " + produto.nome + "?",
      text: "Você poderá" + (produto.dtDesativacao ? " desativar" : " ativar") + " o Produto novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (produto.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
      var produtoCopy = angular.copy(produto);
      produtoCopy.dtDesativacao = (produto.dtDesativacao ? null : $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      produtoCopy.$update(
      function(){
        $scope.atualizarLista();
        toastMsg = produto.nome + (produto.dtDesativacao ? " ativado!" : " desativado!");
        toastr.success(toastMsg, "Sucesso!");
      }, function(){
        toastMsg = produto.nome + " não foi " + (produto.dtDesativacao ? "ativado!" : "desativado!");
        toastr.error(toastMsg, "Erro!");
      });
    });    
  };

  $scope.openInfoDialog = function (produto) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Produto",
      produto: angular.copy(produto)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoProduto.html",
      controller: "ProdutoDialogCtrl",
      backdrop: 'static',
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  };
  
  $scope.openItemProdutoDialog = function(produto, item){
    var itemResource;
    var templateUrl;
    var iconeHeaderDialog;
    switch(item){
      case 'selo':
        itemResource = SeloResource.query();
        templateUrl = "views/cadastro/dialog/formSeloProduto.html";
        iconeHeaderDialog = "stars";
        break;
      case 'embalagem':
        itemResource = EmbalagemResource.query();
        templateUrl = "views/cadastro/dialog/formEmbalagemProduto.html";
        iconeHeaderDialog = "inbox";
        break;
      case 'rotulo':
        itemResource = RotuloResource.query();
        templateUrl = "views/cadastro/dialog/formRotuloProduto.html";
        iconeHeaderDialog = "label_outline";
        break;
    }
    $scope.params = {
      formTipo: 'lookupItem',
      iconeHeaderDialog: iconeHeaderDialog,
      tituloDialog: "Lookup " + item,
      produto: angular.copy(produto),
      item: item,
      itemResource: itemResource
    };
    var modalInstance = $modal.open({
      templateUrl: templateUrl,
      controller: "ProdutoDialogCtrl",
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
  
  $scope.atualizarLista();
  
})
  .controller('ProdutoDialogCtrl', function ($scope, $modal, $modalInstance, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    
    $scope.categoriasAll = params.categorias ? params.categorias  : null;
    $scope.receitasAll = params.receitas ? params.receitas  : null;
    $scope.produto = params.produto;
    $scope.produtoInit = angular.copy($scope.produto);
        
    if(params.formTipo == 'lookupItem'){
      switch(params.item){
        case 'selo':
          $scope.selosAll = params.itemResource;
          break;
        case 'embalagem':
          $scope.embalagensAll = params.itemResource;
          break;
        case 'rotulo':
          $scope.rotulosAll = params.itemResource;
          break;
      }
    }
    
    $scope.unidadesMedida = [
      {nome: "gramas", sigla: "(g)"}
    ];
    
    $scope.openImagemDialog = function(){
      $scope.params = {
        formTipo: $scope.formTipo,
        iconeHeaderDialog: $scope.produto.imagens ? CONST.editar.iconeHeaderDialog : CONST.inserir.iconeHeaderDialog,
        tituloDialog: $scope.produto.imagens ? "Editar Imagem" : "Cadastrar Imagem",
        imagens: $scope.produto.imagens ? angular.copy($scope.produto.imagens) : [],
        maxImagens: 4
      };
      var modalInstance = $modal.open({
        templateUrl: "views/cadastro/dialog/formImagem.html",
        controller: "ImagemDialogCtrl",
        backdrop: 'static',
        size: 'lg',
        resolve: {
          params: function () {
            return $scope.params;
          } 
        }
      });
      modalInstance.result.then(function (imagens) {
        $scope.produto.imagens = imagens;
      }, function(){
        toastr.warning("As imagens não foram registradas");
      });
    };
          
    $scope.ordenar = function (campo) {
      $scope.campo = campo;
      $scope.ascDsc = !$scope.ascDsc;
    };

    $scope.removerSeloProduto = function(index){
      $scope.produto.selos.splice(index, 1);
    };
    
    $scope.removerEmbalagemProduto = function(index){
      $scope.produto.embalagens.splice(index, 1);
    };
    
    $scope.removerRotuloProduto = function(index){
      $scope.produto.rotulos.splice(index, 1);
    };

    $scope.submit = function () {
      if ($scope.formTipo == 'insert') { //insert
        $scope.produto.$save(function(){
          var toastMsg = "Produto " + $scope.produto.nome + " cadastrada com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            produto: $scope.produto, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Produto " + $scope.produto.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.produto.$update(function(){
          var toastMsg = "Produto " + $scope.produto.nome + " editada com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            produto: $scope.produto, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Produto " + $scope.produto.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    $scope.clear = function () {
      $scope.produto = angular.copy($scope.produtoInit);
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
