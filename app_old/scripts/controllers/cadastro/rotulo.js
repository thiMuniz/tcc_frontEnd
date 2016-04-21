'use strict';
app.controller('RotuloCtrl', function ($scope, $modal, $filter, RotuloResource, CONST, toastr) {
  
//  $scope.rotulos = [
//    {id: "1", dsCurta: "Rótulo Tostilha Cacau", dsDetalhada: "Detalhes do Rótulo 1", imagem: "..."},
//    {id: "2", dsCurta: "Rótulo Pão Centeio", dsDetalhada: "Detalhes do Rótulo 2", imagem: "..."},
//    {id: "3", dsCurta: "Rótulo Bisoito Sequilhos", dsDetalhada: "Detalhes do Rótulo 3", imagem: "..."},
//    {id: "4", dsCurta: "Rótulo Panetone", dsDetalhada: "Detalhes do Rótulo 4", imagem: "..."}
//  ];
  
  var toastTitle = "";
  var toastMsg = "";
  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Rótulos dos Produtos";
  $scope.headerLista = "Nenhum rótulo foi encontrado";
  $scope.labelCadastrarBtn = "Novo Rótulo";
  
  atualizarLista();
  
  function atualizarLista() {
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
      size: 'lg', //sm, lg
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
      if (result.rotulo) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add o rótulo à lista
          $scope.rotulos.push(angular.copy(result.rotulo));
//          atualizarLista();
//          $scope.$apply();
          toastMsg = result.rotulo.nome + " cadastrado";
          toastr.success(toastMsg, "Sucesso!");
        } else {//Senão mostra msg erro
          toastMsg = result.rotulo.nome + " não cadastrado!";
          toastr.error(toastMsg, "Erro!");
        }
      }
    });
  };

  $scope.openUpdateDialog = function (rotulo) {    
    index = $scope.rotulos.indexOf($filter('filter')($scope.rotulos, rotulo, true)[0]);    
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
    modalInstance.result.then(function (result) {//quando foi fechado enviando dados
      if (result.rotulo) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add o rótulo à lista
          $scope.rotulos[index] = result.rotulo;
//                  $scope.$apply(); 
          toastMsg = "Dados do rótulo " + result.rotulo.nome + " alterados com sucesso!";
          toastr.success(toastMsg, "Sucesso");
        } else {//Senão mostra msg erro                  
          toastMsg = "Dados do rótulo " + result.rotulo.nome + " não foram alterados!";
          
          toastr.error(toastMsg, "Erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não alterado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  };
  
  $scope.openAtivarDesativarDialog = function (rotulo) {
    index = $scope.rotulos.indexOf($filter('filter')($scope.rotulos, rotulo, true)[0]);    
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
//      $scope.rotulos.splice(index, 1);
//      rotulo.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
//      rotulo.dtDesativacao = new Date();
      rotulo.dtDesativacao = (rotulo.dtDesativacao ? null : new Date());
      RotuloResource.update(rotulo, function(){
          $scope.rotulos[index] = rotulo;
          toastMsg = rotulo.nome + (rotulo.dtDesativacao ? " desativado!" : " ativado!");
          toastr.success(toastMsg, "Sucesso!");
        }, function(){
          toastMsg = rotulo.nome + " não foi " + (rotulo.dtDesativacao ? "ativado!" : "desativado!");
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
})
  .controller('RotuloDialogCtrl', function ($scope, $modalInstance, params, CONST, RotuloResource, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
//    if(params.rotulo){
        $scope.rotulo = params.rotulo;
//    }else{
//        $scope.rotulo = new RotuloResource();
//    }
//    if($scope.rotuloInit)delete $scope.rotuloInit;
    $scope.rotuloInit = angular.copy($scope.rotulo);
        
    $scope.clear = function () {
      $scope.rotulo = angular.copy($scope.rotuloInit);
    };    

    $scope.submit = function () {
      //incluir rotina de validação
      if ($scope.formTipo == 'insert') { //insert
        $scope.rotulo.$save(function (data) {
          // do something which you want with response
          console.log("insert ok");
          console.log(data);
          console.log(status);
        }, function(){
          console.log("erro");
          console.log(status);
        });
      } else { //update
        $scope.rotulo.$update(function(){
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
        rotulo: $scope.rotulo,
        status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
//       rotulo: response.data,
//       status: response.status
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });

