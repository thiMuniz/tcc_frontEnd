'use strict';
app.controller('CategoriaCtrl', function ($scope, $modal, $filter, CategoriaResource, CONST, toastr) {
  
//  $scope.categorias = [
//    {id: "1", dsCurta: "Pães", dsDetalhada: "Detalhes da Categoria 1"},
//    {id: "2", dsCurta: "Biscoitos Doces Açúcar", dsDetalhada: "Detalhes da Categoria 2"},
//    {id: "3", dsCurta: "Biscoitos Doces Adoçante", dsDetalhada: "Detalhes da Categoria 3"},
//    {id: "4", dsCurta: "Biscoitos Salgados", dsDetalhada: "Detalhes da Categoria 4"},
//    {id: "5", dsCurta: "Panetones", dsDetalhada: "Detalhes da Categoria 5"},
//  ];
  
  var toastTitle = "";
  var toastMsg = "";
  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Categorias dos Produtos";
  $scope.headerLista = "Nenhuma categoria foi encontrada";
  $scope.labelCadastrarBtn = "Nova Categoria";
  
  atualizarLista();
  
  function atualizarLista() {
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
      size: 'lg', //sm, lg
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
      if (result.categoria) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a categoria à lista
          $scope.categorias.push(angular.copy(result.categoria));
//          atualizarLista();
//          $scope.$apply();
          toastMsg = result.categoria.nome + " cadastrada";
          toastr.success(toastMsg, "Sucesso!");
        } else {//Senão mostra msg erro
          toastMsg = result.categoria.nome + " não cadastrada!";
          toastr.error(toastMsg, "Erro!");
        }
      }
    });
  };

  $scope.openUpdateDialog = function (categoria) {    
    index = $scope.categorias.indexOf($filter('filter')($scope.categorias, categoria, true)[0]);    
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
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {//quando foi fechado enviando dados
      if (result.categoria) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a categoria à lista
          $scope.categorias[index] = result.categoria;
//                  $scope.$apply(); 
          toastMsg = "Dados da categoria " + result.categoria.nome + " alterados com sucesso!";
          toastr.success(toastMsg, "Sucesso");
        } else {//Senão mostra msg erro                  
          toastMsg = "Dados da categoria " + result.categoria.nome + " não foram alterados!";
          
          toastr.error(toastMsg, "Erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não alterado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  };
  
  $scope.openAtivarDesativarDialog = function (categoria) {
    index = $scope.categorias.indexOf($filter('filter')($scope.categorias, categoria, true)[0]);    
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
//      $scope.categorias.splice(index, 1);
//      categoria.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
//      categoria.dtDesativacao = new Date();
      categoria.dtDesativacao = (categoria.dtDesativacao ? null : new Date());
      CategoriaResource.update(categoria, function(){
          $scope.categorias[index] = categoria;
          toastMsg = categoria.nome + (categoria.dtDesativacao ? " desativada!" : " ativada!");
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
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  };
})
  .controller('CategoriaDialogCtrl', function ($scope, $modalInstance, params, CONST, CategoriaResource, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
//    if(params.categoria){
        $scope.categoria = params.categoria;
//    }else{
//        $scope.categoria = new CategoriaResource();
//    }
//    if($scope.categoriaInit)delete $scope.categoriaInit;
    $scope.categoriaInit = angular.copy($scope.categoria);
        
    $scope.clear = function () {
      $scope.categoria = angular.copy($scope.categoriaInit);
    };    

    $scope.submit = function () {
      //incluir rotina de validação
      if ($scope.formTipo == 'insert') { //insert
        $scope.categoria.$save(function (data) {
          // do something which you want with response
          console.log("insert ok");
          console.log(data);
          console.log(status);
        }, function(){
          console.log("erro");
          console.log(status);
        });
      } else { //update
        $scope.categoria.$update(function(){
          console.log("update ok");
          console.log(status);
        }, function(){
          console.log("erro");
          console.log(status);
        });
      }

      //pegar retorno API e definir padrão p/ result
      //
      $modalInstance.close({
        categoria: $scope.categoria,
        status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
//       categoria: response.data,
//       status: response.status
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
