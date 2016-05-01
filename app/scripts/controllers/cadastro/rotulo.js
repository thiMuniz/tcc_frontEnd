'use strict';
app.controller('RotuloCtrl', function ($scope, $modal, RotuloResource, CONST, toastr) {
  
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Rótulos dos Produtos";
  $scope.headerLista = "Nenhum rótulo foi encontrado";
  $scope.labelCadastrarBtn = "Novo Rótulo";
    
  $scope.atualizarLista = function(){
    $scope.rotulos = RotuloResource.query();
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
      tituloDialog: "Cadastrar Rótulo",
      rotulo: new RotuloResource()
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formRotulo.html',
      controller: 'RotuloDialogCtrl',
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
//        $scope.rotulos[index] = result.rotulo;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };

  $scope.openUpdateDialog = function (rotulo) {    
//    index = $scope.rotulos.indexOf($filter('filter')($scope.rotulos, rotulo, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Rótulo",
      rotulo: angular.copy(rotulo)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formRotulo.html",
      controller: "RotuloDialogCtrl",
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
//        $scope.rotulos[index] = result.rotulo;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };
  
  $scope.openAtivarDesativarDialog = function (rotulo) {
//    index = $scope.rotulos.indexOf($filter('filter')($scope.rotulos, rotulo, true)[0]);    
    swal({
      title: "Deseja mesmo" + (rotulo.dtDesativacao ? " ativar" : " desativar") + " o Rótulo " + rotulo.nome + "?",
      text: "Você poderá" + (rotulo.dtDesativacao ? " desativar" : " ativar") + " o Rótulo novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (rotulo.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
//      rotulo.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
      rotulo.dtDesativacao = (rotulo.dtDesativacao ? null : new Date());
      RotuloResource.update(rotulo, function(){
//          $scope.rotulos[index] = rotulo;
          $scope.atualizarLista();
          toastMsg = rotulo.nome + (rotulo.dtDesativacao ? " desativada!" : " ativada!");
          toastr.success(toastMsg, "Sucesso!");
        }, function(){
          toastMsg = rotulo.nome + " não foi " + (rotulo.dtDesativacao ? "ativada!" : "desativada!");
          toastr.error(toastMsg, "Erro!");
        });
    });    
  };

  $scope.openInfoDialog = function (rotulo) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Rótulo",
      rotulo: angular.copy(rotulo)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoRotulo.html",
      controller: "RotuloDialogCtrl",
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
  .controller('RotuloDialogCtrl', function ($scope, $modalInstance, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.imagemAux = params.rotulo.imagens ? params.rotulo.imagens[0] : null;
    console.log($scope.imagemAux);
    
    $scope.rotulo = params.rotulo;
    $scope.rotuloInit = angular.copy($scope.rotulo);
        
    $scope.submit = function(){
//      $scope.rotulo.imagens.push(angular.copy($scope.arquivo));
      $scope.rotulo.imagens = [$scope.imagemAux];
      if ($scope.formTipo == 'insert') { //insert
        $scope.rotulo.$save(function(){
          var toastMsg = "Rótulo " + $scope.rotulo.nome + " cadastrada com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            rotulo: $scope.rotulo, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Rótulo " + $scope.rotulo.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.rotulo.$update(function(){
          var toastMsg = "Rótulo " + $scope.rotulo.nome + " editada com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            rotulo: $scope.rotulo, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Rótulo " + $scope.rotulo.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    $scope.clear = function () {
      $scope.rotulo = angular.copy($scope.rotuloInit);
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
