'use strict';
app.controller('SeloCtrl', function ($scope, $modal, SeloResource, CONST, toastr) {
  
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Selos dos Produtos";
  $scope.headerLista = "Nenhum selo foi encontrado";
  $scope.labelCadastrarBtn = "Novo Selo";
    
  $scope.atualizarLista = function(){
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
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
      if (result.status == "sucesso") {
//        $scope.selos[index] = result.selo;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };

  $scope.openUpdateDialog = function (selo) {    
//    index = $scope.selos.indexOf($filter('filter')($scope.selos, selo, true)[0]);    
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
    modalInstance.result.then(function (result) {
      if (result.status == "sucesso") {
//        $scope.selos[index] = result.selo;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };
  
  $scope.openAtivarDesativarDialog = function (selo) {
//    index = $scope.selos.indexOf($filter('filter')($scope.selos, selo, true)[0]);    
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
//      selo.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
      selo.dtDesativacao = (selo.dtDesativacao ? null : new Date());
      SeloResource.update(selo, function(){
//          $scope.selos[index] = selo;
          $scope.atualizarLista();
          toastMsg = selo.nome + (selo.dtDesativacao ? " desativada!" : " ativada!");
          toastr.success(toastMsg, "Sucesso!");
        }, function(){
          toastMsg = selo.nome + " não foi " + (selo.dtDesativacao ? "ativada!" : "desativada!");
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
  
  $scope.atualizarLista();
  
})
  .controller('SeloDialogCtrl', function ($scope, $modalInstance, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    
    $scope.selo = params.selo;
    $scope.seloInit = angular.copy($scope.selo);
    
    $scope.submit = function () {
      if ($scope.formTipo == 'insert') { //insert
        $scope.selo.$save(function(){
          var toastMsg = "Selo " + $scope.selo.nome + " cadastrada com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            selo: $scope.selo, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Selo " + $scope.selo.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.selo.$update(function(){
          var toastMsg = "Selo " + $scope.selo.nome + " editada com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            selo: $scope.selo, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Selo " + $scope.selo.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    $scope.clear = function () {
      $scope.selo = angular.copy($scope.seloInit);
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
