'use strict';
app.controller('InsumoCtrl', function ($scope, $modal, InsumoResource, CONST, toastr) {
  
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Insumos dos Produtos";
  $scope.headerLista = "Nenhum rótulo foi encontrado";
  $scope.labelCadastrarBtn = "Novo Insumo";
    
  $scope.atualizarLista = function(){
    $scope.insumos = InsumoResource.query();
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
      tituloDialog: "Cadastrar Insumo",
      insumo: new InsumoResource()
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formInsumo.html',
      controller: 'InsumoDialogCtrl',
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
//        $scope.insumos[index] = result.insumo;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };

  $scope.openUpdateDialog = function (insumo) {    
//    index = $scope.insumos.indexOf($filter('filter')($scope.insumos, insumo, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Insumo",
      insumo: angular.copy(insumo)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formInsumo.html",
      controller: "InsumoDialogCtrl",
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
//        $scope.insumos[index] = result.insumo;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };
  
  $scope.openAtivarDesativarDialog = function (insumo) {
//    index = $scope.insumos.indexOf($filter('filter')($scope.insumos, insumo, true)[0]);    
    swal({
      title: "Deseja mesmo" + (insumo.dtDesativacao ? " ativar" : " desativar") + " o Insumo " + insumo.nome + "?",
      text: "Você poderá" + (insumo.dtDesativacao ? " desativar" : " ativar") + " o Insumo novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (insumo.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
//      insumo.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
      insumo.dtDesativacao = (insumo.dtDesativacao ? null : new Date());
      InsumoResource.update(insumo, function(){
//          $scope.insumos[index] = insumo;
          $scope.atualizarLista();
          toastMsg = insumo.nome + (insumo.dtDesativacao ? " desativada!" : " ativada!");
          toastr.success(toastMsg, "Sucesso!");
        }, function(){
          toastMsg = insumo.nome + " não foi " + (insumo.dtDesativacao ? "ativada!" : "desativada!");
          toastr.error(toastMsg, "Erro!");
        });
    });    
  };

  $scope.openInfoDialog = function (insumo) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Insumo",
      insumo: angular.copy(insumo)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoInsumo.html",
      controller: "InsumoDialogCtrl",
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
  .controller('InsumoDialogCtrl', function ($scope, $modalInstance, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.imagemAux = params.insumo.imagens ? params.insumo.imagens[0] : null;
    
    $scope.insumo = params.insumo;
    $scope.insumoInit = angular.copy($scope.insumo);
    
    $scope.submit = function () {
      $scope.insumo.imagens = [$scope.imagemAux];
      if ($scope.formTipo == 'insert') { //insert
        $scope.insumo.$save(function(){
          var toastMsg = "Insumo " + $scope.insumo.nome + " cadastrada com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            insumo: $scope.insumo, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Insumo " + $scope.insumo.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.insumo.$update(function(){
          var toastMsg = "Insumo " + $scope.insumo.nome + " editada com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            insumo: $scope.insumo, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Insumo " + $scope.insumo.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    $scope.clear = function () {
      $scope.insumo = angular.copy($scope.insumoInit);
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
