'use strict';
app.controller('DestaqueCtrl', function ($scope, $modal, $filter, DestaqueResource, ProdutoResource, PessoaResource, CONST, toastr, $stateParams, $httpParamSerializerJQLike) {
  
  var toastMsg = "";
  $scope.tipoDestaque = $stateParams.tipo;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Destaques do E-Commerce ("+$scope.tipoDestaque+"s)";
  $scope.headerLista = "Nenhum Destaque foi encontrado";
  $scope.labelCadastrarBtn = "Novo Destaque";
  
  
  $scope.atualizarLista = function(){
    $scope.destaques = DestaqueResource.listFiltro({p:$httpParamSerializerJQLike({tipo: $scope.tipoDestaque})});
//    $scope.destaques = DestaqueResource.query();
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
      tituloDialog: "Cadastrar Destaque",
      tipo: $scope.tipoDestaque,
      destaque: new DestaqueResource()
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/ecom/dialog/formDestaque.html',
      controller: 'DestaqueDialogCtrl',
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

  $scope.openUpdateDialog = function (destaque) {
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Destaque",
      tipo: $scope.tipoDestaque,
      destaque: angular.copy(destaque)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/ecom/dialog/formDestaque.html",
      controller: "DestaqueDialogCtrl",
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
  
  $scope.openDeleteDialog = function (destaque) {
    swal({
      title: "Deseja mesmo excluir o Destaque " + destaque.nome + "?",
      text: "A ação não poderá ser desfeita!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: ("#DD6B55"),
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
      var destaqueCopy = angular.copy(destaque);
      destaqueCopy.$delete(
//      destaqueCopy.$delete({id: destaque.id},
      function(){
        $scope.atualizarLista();
        toastMsg = "Destaque " + destaque.nome + " excluído com sucesso";
        toastr.success(toastMsg);
      }, function(){
        toastMsg = "O destaque " + destaque.nome + " não foi excluído";
        toastr.error(toastMsg, "Erro!");
      });
    });    
  };

  $scope.openInfoDialog = function (destaque) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Destaque",
      destaque: angular.copy(destaque)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/ecom/dialog/infoDestaque.html",
      controller: "DestaqueDialogCtrl",
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
  .controller('DestaqueDialogCtrl', function ($scope, $modal, $filter, ProdutoResource, PessoaResource, $modalInstance, $httpParamSerializerJQLike, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.tipo = params.tipo;
    
    if($scope.tipo == "produto"){
      $scope.produtosAll = ProdutoResource.listFiltro({p:$httpParamSerializerJQLike({ativo:'S'})});
    }else{
      $scope.parceirosAll = PessoaResource.listFiltro({p:$httpParamSerializerJQLike({perfil: 'cliente', ativo:'S'})}); //tipoPessoa: 'PJ'
    }
              
    $scope.destaque = params.destaque;
    $scope.destaqueInit = angular.copy($scope.destaque);
    
    $scope.ordenar = function (campo) {
      $scope.campo = campo;
      $scope.ascDsc = !$scope.ascDsc;
    };
    
    $scope.toogleHelpIcon = function(){
      $scope.showHelpIcon = !$scope.showHelpIcon;
    };
        
    $scope.removerProdutoDestaque = function(index){
      $scope.destaque.produtos.splice(index, 1);
    };
    
    $scope.removerParceiroDestaque = function(index){
      $scope.destaque.parceiros.splice(index, 1);
    };

    $scope.openImagemDialog = function(){
      $scope.params = {
        formTipo: $scope.formTipo,
        iconeHeaderDialog: $scope.iconeHeaderDialog,
        tituloDialog: params.formTipo == 'insert' ? "Cadastrar Imagem" : "Editar Imagem",
        imagens: $scope.destaque.imagem ? [angular.copy($scope.destaque.imagem)] : [],
        maxImagens: 1,
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
        $scope.destaque.imagem = imagens[0];
      }, function(){
        toastr.warning("A imagem não foi registrada");
      });
    };
     
    $scope.submit = function () {
      if ($scope.formTipo == 'insert') { //insert
        $scope.destaque.tipo = $scope.tipo;
        $scope.destaque.$save(function(){
          var toastMsg = "Destaque " + $scope.destaque.nome + " cadastrado com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            destaque: $scope.destaque, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Destaque " + $scope.destaque.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.destaque.$update(function(){
          var toastMsg = "Destaque " + $scope.destaque.nome + " editado com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            destaque: $scope.destaque, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Destaque " + $scope.destaque.nome;
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
      $scope.tipo == "produto" ? 'Passo 2 - Produtos' : 'Passo 2 - Parceiros'
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
      $scope.destaque = angular.copy($scope.destaqueInit);      
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });