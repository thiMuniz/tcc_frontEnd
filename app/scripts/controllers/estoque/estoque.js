'use strict';
app.controller('EstoqueCtrl', function ($scope, $modal, $stateParams, EstoqueResource, ProdutoResource, CONST, toastr, $httpParamSerializerJQLike) {
  
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Estoque de " + $stateParams.tipoItem;
  $scope.headerLista = "Nenhum lote de " + $stateParams.tipoItem + "foi encontrado";
  $scope.labelCadastrarBtn = "Novo Lote";
    
  $scope.atualizarLista = function(){
//    $scope.estoques = EstoqueResource.listByTipoItem({p:$httpParamSerializerJQLike({tipoItem: $stateParams.tipoItem})});
    $scope.estoques = EstoqueResource.query();
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
      tituloDialog: "Cadastrar Estoque",
      itens: ProdutoResource.query(),
      estoque: new EstoqueResource()
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/estoque/formLote.html',
      controller: 'EstoqueDialogCtrl',
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
//        $scope.estoques[index] = result.estoque;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };

  $scope.openUpdateDialog = function (estoque) {    
//    index = $scope.estoques.indexOf($filter('filter')($scope.estoques, estoque, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Estoque",
      estoque: angular.copy(estoque)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formEstoque.html",
      controller: "EstoqueDialogCtrl",
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
//        $scope.estoques[index] = result.estoque;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };
  
  $scope.openAtivarDesativarDialog = function (estoque) {
//    index = $scope.estoques.indexOf($filter('filter')($scope.estoques, estoque, true)[0]);    
    swal({
      title: "Deseja mesmo" + (estoque.dtDesativacao ? " ativar" : " desativar") + " o Estoque " + estoque.nome + "?",
      text: "Você poderá" + (estoque.dtDesativacao ? " desativar" : " ativar") + " o Estoque novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (estoque.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
//      estoque.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
      estoque.dtDesativacao = (estoque.dtDesativacao ? null : new Date());
      EstoqueResource.update(estoque, function(){
//          $scope.estoques[index] = estoque;
          $scope.atualizarLista();
          toastMsg = estoque.nome + (estoque.dtDesativacao ? " desativado!" : " ativado!");
          toastr.success(toastMsg, "Sucesso!");
        }, function(){
          toastMsg = estoque.nome + " não foi " + (estoque.dtDesativacao ? "ativado!" : "desativado!");
          toastr.error(toastMsg, "Erro!");
        });
    });
  };

  $scope.openInfoDialog = function (estoque) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Estoque",
      estoque: angular.copy(estoque)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoEstoque.html",
      controller: "EstoqueDialogCtrl",
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
  .controller('EstoqueDialogCtrl', function ($scope, $modal, $modalInstance, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    
    $scope.itensAll = params.itens;
    $scope.estoque = params.estoque;
    $scope.estoqueInit = angular.copy($scope.estoque);
        
    $scope.submit = function(){
      if ($scope.formTipo == 'insert') { //insert
        $scope.estoque.$save(function(){
          var toastMsg = "Estoque " + $scope.estoque.nome + " cadastrado com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            estoque: $scope.estoque, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Estoque " + $scope.estoque.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.estoque.$update(function(){
          var toastMsg = "Estoque " + $scope.estoque.nome + " editado com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            estoque: $scope.estoque, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Estoque " + $scope.estoque.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    $scope.clear = function () {
      $scope.estoque = angular.copy($scope.estoqueInit);
      if(params.formTipo == 'lookup'){
        $scope.temp.fornecedoresItem = $scope.estoqueInit.fornecedores;      
      }
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
