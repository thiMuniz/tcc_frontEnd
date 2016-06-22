'use strict';
app.controller('CategoriaCtrl', function ($scope, $modal, $filter, CategoriaResource, CONST, toastr) {
  
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Categorias dos Produtos";
  $scope.headerLista = "Nenhuma categoria foi encontrada";
  $scope.labelCadastrarBtn = "Nova Categoria";
  
  $scope.atualizarLista = function(){
    $scope.categorias = CategoriaResource.query();
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
      tituloDialog: "Cadastrar Categoria",
      categoria: new CategoriaResource()
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formCategoria.html',
      controller: 'CategoriaDialogCtrl',
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
//        $scope.categorias[index] = result.categoria;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };

  $scope.openUpdateDialog = function (categoria) {    
//    index = $scope.categorias.indexOf($filter('filter')($scope.categorias, categoria, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Categoria",
      categoria: angular.copy(categoria)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formCategoria.html",
      controller: "CategoriaDialogCtrl",
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
//        $scope.categorias[index] = result.categoria;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };
  
  $scope.openAtivarDesativarDialog = function (categoria) {
//    index = $scope.categorias.indexOf($filter('filter')($scope.categorias, categoria, true)[0]);    
    swal({
      title: "Deseja mesmo" + (categoria.dtDesativacao ? " ativar" : " desativar") + " a Categoria " + categoria.nome + "?",
      text: "Você poderá" + (categoria.dtDesativacao ? " desativar" : " ativar") + " a Categoria novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (categoria.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
      var categoriaCopy = angular.copy(categoria);
      categoriaCopy.dtDesativacao = (categoria.dtDesativacao ? null : $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      categoriaCopy.$update(
      function(){
        $scope.atualizarLista();
        toastMsg = categoria.nome + (categoria.dtDesativacao ? " ativada!" : " desativada!");
        toastr.success(toastMsg, "Sucesso!");
      }, function(){
        toastMsg = categoria.nome + " não foi " + (categoria.dtDesativacao ? "ativada!" : "desativada!");
        toastr.error(toastMsg, "Erro!");
      });
    });    
  };

  $scope.openInfoDialog = function (categoria) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Categoria",
      categoria: angular.copy(categoria)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoCategoria.html",
      controller: "CategoriaDialogCtrl",
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
  .controller('CategoriaDialogCtrl', function ($scope, $modalInstance, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;    
    
    $scope.categoria = params.categoria;
    $scope.categoriaInit = angular.copy($scope.categoria);
    
    $scope.toogleHelpIcon = function(){
      $scope.showHelpIcon = !$scope.showHelpIcon;
    };
    
    $scope.submit = function () {
      if ($scope.formTipo == 'insert') { //insert
        $scope.categoria.$save(function(){
          var toastMsg = "Categoria " + $scope.categoria.nome + " cadastrada com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            categoria: $scope.categoria, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Categoria " + $scope.categoria.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.categoria.$update(function(){
          var toastMsg = "Categoria " + $scope.categoria.nome + " editada com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            categoria: $scope.categoria, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Categoria " + $scope.categoria.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    $scope.clear = function () {
      $scope.categoria = angular.copy($scope.categoriaInit);
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
