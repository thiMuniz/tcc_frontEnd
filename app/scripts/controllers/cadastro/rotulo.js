'use strict';
app.controller('RotuloCtrl', function ($scope, $modal, $http, RotuloResource, WS, toastr) {
  
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

  $scope.titulo = "Cadastro de Rótulos dos Produtos";
  $scope.headerLista = "Nenhum rótulo foi encontrado";
  $scope.labelAddBtn = "Novo Rótulo";
  
  toastr.warning(toastMsg, toastTitle);
  toastr.info(WS.urlSGP + 'rotulo/', "urlSGP");
  carregarEmbalagensFront();
//            carregarEmbalagensAPI();

  
  function carregarEmbalagensFront() {
    $scope.rotulos = [
      {id: "1", dsCurta: "Rótulo Tostilha Cacau", dsDetalhada: "Detalhes do Rótulo 1", imagem: "..."},
      {id: "2", dsCurta: "Rótulo Pão Centeio", dsDetalhada: "Detalhes do Rótulo 2", imagem: "..."},
      {id: "3", dsCurta: "Rótulo Bisoito Sequilhos", dsDetalhada: "Detalhes do Rótulo 3", imagem: "..."},
      {id: "4", dsCurta: "Rótulo Panetone", dsDetalhada: "Detalhes do Rótulo 4", imagem: "..."}
    ];
    //$scope.rotulos = RotuloResource.query();
  }

  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };

  function carregarRotulosAPI() {
    $scope.rotulos = RotuloResource.query();

    /*
     * Trecho abaixo funciona             
     $http.get(WS.urlSGP+'rotulo/'
     ).success(function (data, status) {
     console.log("deu bom - data" + data);
     console.log("status" + status);
     $scope.rotulos = data;
     }).error(function (data, status) {
     console.log("deu ruim - data" + data);
     console.log("status" + status);
     carregarEmbalagensFront();
     });
     */
  }

  //funções chamadas no onClick dos botões da tela
  $scope.openInsertDialog = function () {    
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: "add_circle_outline",
      tituloDialog: "Cadastrar Rótulo",
      rotulo: {id: "5", dsCurta: "rot 5", dsDetalhada: "desc rot 5"}
    }

    var modalInstance = $modal.open({      
      templateUrl: 'views/cadastro/dialog/formRotulo.html',
      controller: 'RotuloDialogCtrl',
      backdrop: 'static',
      size: '', //sm, lg
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
//                  $scope.$apply();
          toastMsg = result.rotulo.dsCurta + " cadastrado";
          toastr.success(toastMsg, "Sucesso!");
        } else {//Senão mostra msg erro                  
          toastMsg = result.rotulo.dsCurta + " não cadastrado!";
          toastr.error(toastMsg, "Erro!");
        }
      } else {
        toastr.warning("Formulário em branco", "Não cadastrado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  }

  $scope.openUpdateDialog = function (rotulo, index) {    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: "edit",
      tituloDialog: "Editar Rótulo",
      rotulo: angular.copy(rotulo)
    }

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formRotulo.html",
      controller: "RotuloDialogCtrl",
      backdrop: 'static',
      size: '',
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
          toastMsg = "Dados do rótulo " + result.rotulo.dsCurta + " alterados com sucesso!";
          toastr.success(toastMsg, "Sucesso");
        } else {//Senão mostra msg erro                  
          toastMsg = "Dados do rótulo " + result.rotulo.dsCurta + " não foram alterados!";
          
          toastr.error(toastMsg, "Erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não alterado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  }

  $scope.openDesativarDialog = function (rotulo, index) {    
    swal({
      title: "Deseja mesmo desativar o Rótulo " + rotulo.dsCurta + "?",
      text: "Você poderá ativar o Rótulo novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonText: "Não, me tire daqui!",
      confirmButtonText: "Sim, quero desativar!"
//      closeOnConfirm: false
    },
    function () {
      $scope.rotulos.splice(index, 1);
      //metodo deleteRotulo - passa o rótulo por parâmetro para exclusão
      toastMsg = rotulo.dsCurta + " desativado!";

      $scope.$apply();//força atualização da variável $scope
//      swal({
//        title: toastMsg,
//        type: "success"
//      });
      toastr.success(toastMsg, "Sucesso!");      
    });    
  };

  $scope.openInfoDialog = function (rotulo) {
    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: "info_outline",
      tituloDialog: "Detalhes Rótulo",
      rotulo: angular.copy(rotulo)
    }

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formRotulo.html",
      controller: "RotuloDialogCtrl",
      backdrop: 'static',
      size: '',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  }
})
  .controller('RotuloDialogCtrl', function ($scope, $http, params, $modalInstance) {
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.rotulo = params.rotulo;

    $scope.clear = function () {
      delete $scope.rotulo;
    };

    $scope.submit = function () {
      /*
       //chamar serviço API
       $http.post(WS.urlSGP+'rotulo/', 
       $scope.rotulo                        
       ).then(function successCallback(response) {
       console.log("deu bom"+response.data);
       }, function errorCallback(response) {
       console.log("deu ruim"+response);
       console.log($scope.rotulo);
       });
       */

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
