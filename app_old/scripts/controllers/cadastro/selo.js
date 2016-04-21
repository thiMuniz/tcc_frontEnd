'use strict';
app.controller('SeloCtrl', function ($scope, $modal, $filter, SeloResource, CONST, toastr) {
  
//  $scope.selos = [
//    {id: "1", dsCurta: "Selo Gastronomia 2016", dsDetalhada: "Detalhes do Selo 1", imagem: "..."},
//    {id: "2", dsCurta: "0% Gosdura Trans", dsDetalhada: "Detalhes do Selo 2", imagem: "..."},
//    {id: "3", dsCurta: "Não Contém Glúten", dsDetalhada: "Detalhes do Selo 3", imagem: "..."},
//    {id: "4", dsCurta: "Baixo Teor de Gorduras", dsDetalhada: "Detalhes do Selo 4", imagem: "..."}
//  ];
  
  var toastTitle = "";
  var toastMsg = "";
  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Selos dos Produtos";
  $scope.headerLista = "Nenhum selo foi encontrado";
  $scope.labelCadastrarBtn = "Novo Selo";
  
  atualizarLista();
  
  function atualizarLista() {
    $scope.selos = SeloResource.query();
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
      tituloDialog: "Cadastrar Selo",
      selo: new SeloResource()
    };

    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formSelo.html',
      controller: 'SeloDialogCtrl',
      backdrop: 'static',
      size: 'lg', //sm, lg
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
      if (result.selo) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add o selo à lista
          $scope.selos.push(angular.copy(result.selo));
//          atualizarLista();
//          $scope.$apply();
          toastMsg = result.selo.nome + " cadastrado";
          toastr.success(toastMsg, "Sucesso!");
        } else {//Senão mostra msg erro
          toastMsg = result.selo.nome + " não cadastrado!";
          toastr.error(toastMsg, "Erro!");
        }
      }
    });
  };

  $scope.openUpdateDialog = function (selo) {    
    index = $scope.selos.indexOf($filter('filter')($scope.selos, selo, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Selo",
      selo: angular.copy(selo)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formSelo.html",
      controller: "SeloDialogCtrl",
      backdrop: 'static',
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {//quando foi fechado enviando dados
      if (result.selo) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add o selo à lista
          $scope.selos[index] = result.selo;
//                  $scope.$apply(); 
          toastMsg = "Dados do selo " + result.selo.nome + " alterados com sucesso!";
          toastr.success(toastMsg, "Sucesso");
        } else {//Senão mostra msg erro                  
          toastMsg = "Dados do selo " + result.selo.nome + " não foram alterados!";
          
          toastr.error(toastMsg, "Erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não alterado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  };
  
  $scope.openAtivarDesativarDialog = function (selo) {
    index = $scope.selos.indexOf($filter('filter')($scope.selos, selo, true)[0]);    
    swal({
      title: "Deseja mesmo" + (selo.dtDesativacao ? " ativar" : " desativar") + " o Selo " + selo.nome + "?",
      text: "Você poderá" + (selo.dtDesativacao ? " desativar" : " ativar") + " o Selo novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (selo.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
//      $scope.selos.splice(index, 1);
//      selo.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
//      selo.dtDesativacao = new Date();
      selo.dtDesativacao = (selo.dtDesativacao ? null : new Date());
      SeloResource.update(selo, function(){
          $scope.selos[index] = selo;
          toastMsg = selo.nome + (selo.dtDesativacao ? " desativado!" : " ativado!");
          toastr.success(toastMsg, "Sucesso!");
        }, function(){
          toastMsg = selo.nome + " não foi " + (selo.dtDesativacao ? "ativado!" : "desativado!");
          toastr.error(toastMsg, "Erro!");
        });
    });    
  };

  $scope.openInfoDialog = function (selo) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Selo",
      selo: angular.copy(selo)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoSelo.html",
      controller: "SeloDialogCtrl",
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
  .controller('SeloDialogCtrl', function ($scope, $modalInstance, params, CONST, SeloResource, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
//    if(params.selo){
        $scope.selo = params.selo;
//    }else{
//        $scope.selo = new SeloResource();
//    }
//    if($scope.seloInit)delete $scope.seloInit;
    $scope.seloInit = angular.copy($scope.selo);
        
    $scope.clear = function () {
      $scope.selo = angular.copy($scope.seloInit);
    };    

    $scope.submit = function () {
      //incluir rotina de validação
      if ($scope.formTipo == 'insert') { //insert
        $scope.selo.$save(function (data) {
          // do something which you want with response
          console.log("insert ok");
          console.log(data);
          console.log(status);
        }, function(){
          console.log("erro");
          console.log(status);
        });
      } else { //update
        $scope.selo.$update(function(){
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
        selo: $scope.selo,
        status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
//       selo: response.data,
//       status: response.status
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });

