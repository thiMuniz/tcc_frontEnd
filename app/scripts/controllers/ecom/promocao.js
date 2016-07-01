'use strict';
app.controller('PromocaoCtrl', function ($scope, $modal, $filter, PromocaoResource, ProdutoResource, CONST, toastr, $httpParamSerializerJQLike) {
  
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Promoções do E-Commerce";
  $scope.headerLista = "Nenhuma Promoção foi encontrada";
  $scope.labelCadastrarBtn = "Nova Promoção";
  
  $scope.atualizarLista = function(){
    $scope.promocoes = PromocaoResource.query();
    //incluir spinner enquanto esta carregando a lista
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
      tituloDialog: "Cadastrar Promoção",      
      promocao: new PromocaoResource()
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/ecom/dialog/formPromocao.html',
      controller: 'PromocaoDialogCtrl',
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

  $scope.openUpdateDialog = function (promocao) {    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Promoção",
      produtos: ProdutoResource.listFiltro({p:$httpParamSerializerJQLike({ativo:'S'})}),
      promocao: angular.copy(promocao)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/ecom/dialog/formPromocao.html",
      controller: "PromocaoDialogCtrl",
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
  
  $scope.openInfoDialog = function (promocao) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Promoção",
      promocao: angular.copy(promocao)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/ecom/dialog/infoPromocao.html",
      controller: "PromocaoDialogCtrl",
      backdrop: 'static',
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  };
  
  $scope.atualizarLista();
  
})
  .controller('PromocaoDialogCtrl', function ($scope, $modal, $filter, $modalInstance, $httpParamSerializerJQLike, ProdutoResource, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.produtosAll = ProdutoResource.listFiltro({p:$httpParamSerializerJQLike({ativo:'S'})});
          
    $scope.promocao = params.promocao;
    $scope.promocaoInit = angular.copy($scope.promocao);
    
//    if(!$scope.promocao.produtos){
//      $scope.promocao.ptodutos = [];
//    }
    
    $scope.ordenar = function (campo) {
      $scope.campo = campo;
      $scope.ascDsc = !$scope.ascDsc;
    };
    
    $scope.toogleHelpIcon = function(){
      $scope.showHelpIcon = !$scope.showHelpIcon;
    };
    
    $scope.removerProdutoPromocao = function(index){
      $scope.promocao.produtos.splice(index, 1);
    };
    
    $scope.calcularDesconto = function(){
      if($scope.promocao.produtos && $scope.promocao.descPercentual){
        angular.forEach($scope.promocao.produtos, 
        function(produto){
          produto.precoUnitarioPfDesc = produto.precoUnitarioPf - (produto.precoUnitarioPf * $scope.promocao.descPercentual);
          produto.precoUnitarioPjDesc = produto.precoUnitarioPj - (produto.precoUnitarioPj * $scope.promocao.descPercentual);
        });
      }
    };
    
    $scope.openImagemDialog = function(){
//      var cropOpt = {areaType: "rectangle", aspectRatio: '1.7', resultImageSize:"{w: 500,h: 300}"};
      $scope.params = {
        formTipo: $scope.formTipo,
        iconeHeaderDialog: $scope.iconeHeaderDialog,
        tituloDialog: params.formTipo == 'insert' ? "Cadastrar Imagem" : "Editar Imagem",
        imagens: $scope.promocao.imagem ? [angular.copy($scope.promocao.imagem)] : [],
        maxImagens: 1,
//        cropOpt: cropOpt
        areaType: 'rectangle'
        
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
        $scope.promocao.imagem = imagens[0];
      }, function(){
        toastr.warning("A imagem não foi registrada");
      });
    };
     
    $scope.submit = function () {
      if ($scope.formTipo == 'insert') { //insert
        $scope.promocao.$save(function(){
          var toastMsg = "Promoção " + $scope.promocao.nome + " cadastrada com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            promocao: $scope.promocao, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Promoção " + $scope.promocao.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.promocao.$update(function(){
          var toastMsg = "Promoção " + $scope.promocao.nome + " editada com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            promocao: $scope.promocao, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Promoção " + $scope.promocao.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    // inicio controle de abas
    $scope.steps = [
      'Passo 1 - Dados Gerais',
      'Passo 2 - Produtos'
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
      $scope.promocao = angular.copy($scope.promocaoInit);      
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
