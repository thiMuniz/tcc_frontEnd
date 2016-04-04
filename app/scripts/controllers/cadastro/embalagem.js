'use strict';
app.controller('EmbalagemCtrl', function ($scope, $modal, $http, EmbalagemResource, WS, toastr) {
  
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

  $scope.titulo = "Cadastro de Embalagens dos Produtos";
  $scope.headerLista = "Nenhuma embalagem foi encontrada";
  $scope.labelAddBtn = "Nova Embalagem";
  
  toastr.warning(toastMsg, toastTitle);
  toastr.info(WS.urlSGP + 'embalagem/', "urlSGP");
  carregarEmbalagensFront();
//            carregarEmbalagensAPI();

  
  function carregarEmbalagensFront() {
    $scope.embalagens = [
      {id: "1", dsCurta: "Caixa Nº1", dsDetalhada: "Detalhes da Embalagem 1", material: "papel", imagem: "...", dimensoes: "12x20x2"},
      {id: "2", dsCurta: "Pacote Pão", dsDetalhada: "Detalhes da Embalagem 2", material: "plástico", imagem: "...", dimensoes: "..."},
      {id: "3", dsCurta: "Pacote Nº1", dsDetalhada: "Detalhes da Embalagem 3", material: "plástico", imagem: "...", dimensoes: "..."},
      {id: "4", dsCurta: "Caixa Nº2", dsDetalhada: "Detalhes da Embalagem 4", material: "papel", imagem: "...", dimensoes: "..."},
      {id: "5", dsCurta: "Pacote Nº2", dsDetalhada: "Detalhes da Embalagem 5", material: "plástico", imagem: "...", dimensoes: "..."}
    ];
  }

  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };

  function carregarEmbalagensAPI() {
    $scope.embalagens = EmbalagemResource.query();

    /*
     * Trecho abaixo funciona             
     $http.get(WS.urlSGP+'embalagem/'
     ).success(function (data, status) {
     console.log("deu bom - data" + data);
     console.log("status" + status);
     $scope.embalagens = data;
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
      tituloDialog: "Cadastrar Embalagem",
      embalagem: {id: "6", dsCurta: "emb 6", dsDetalhada: "desc emb 6", material: "mat x", imagem: "...", dimensoes: "dim xyz"}
    }

    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formEmbalagem.html',
      controller: 'EmbalagemDialogCtrl',
      backdrop: 'static',
      size: '', //sm, lg
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
      if (result.embalagem) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a embalagem à lista
          $scope.embalagens.push(angular.copy(result.embalagem));
//                  $scope.$apply();
          toastMsg = result.embalagem.dsCurta + " cadastrada";
          toastr.success(toastMsg, "Sucesso!");
        } else {//Senão mostra msg erro                  
          toastMsg = result.embalagem.dsCurta + " não cadastrada!";
          toastr.error(toastMsg, "Erro!");
        }
      } else {
        toastr.warning("Formulário em branco", "Não cadastrado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  }

  $scope.openUpdateDialog = function (embalagem, index) {    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: "edit",
      tituloDialog: "Editar Embalagem",
      embalagem: angular.copy(embalagem)
    }

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formEmbalagem.html",
      controller: "EmbalagemDialogCtrl",
      backdrop: 'static',
      size: '',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {//quando foi fechado enviando dados
      if (result.embalagem) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a embalagem à lista
          $scope.embalagens[index] = result.embalagem;
//                  $scope.$apply(); 
          toastMsg = "Dados da embalagem " + result.embalagem.dsCurta + " alterados com sucesso!";
          toastr.success(toastMsg, "Sucesso");
        } else {//Senão mostra msg erro                  
          toastMsg = "Dados da embalagem " + result.embalagem.dsCurta + " não foram alterados!";
          
          toastr.error(toastMsg, "Erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não alterado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  }

  $scope.openDesativarDialog = function (embalagem, index) {    
    swal({
      title: "Deseja mesmo desativar a Embalagem " + embalagem.dsCurta + "?",
      text: "Você poderá ativar a Embalagem novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonText: "Não, me tire daqui!",
      confirmButtonText: "Sim, quero desativar!"
//      closeOnConfirm: false
    },
    function () {
      $scope.embalagens.splice(index, 1);
      //metodo deleteEmbalagem - passa a embalagem por parâmetro para exclusão
      toastMsg = embalagem.dsCurta + " desativada!";

      $scope.$apply();//força atualização da variável $scope
//      swal({
//        title: toastMsg,
//        type: "success"
//      });
      toastr.success(toastMsg, "Sucesso!");      
    });    
  };

  $scope.openInfoDialog = function (embalagem) {
    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: "info_outline",
      tituloDialog: "Detalhes Embalagem",
      embalagem: angular.copy(embalagem)
    }

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formEmbalagem.html",
      controller: "EmbalagemDialogCtrl",
      backdrop: 'static',
      size: '',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  }


  /*
   * testes img-crop
   * 
   //        $scope.funcImageTest = function($scope){
   $scope.myImage='';
   $scope.myCroppedImage='';
   
   var handleFileSelect=function(evt) {
   var file=evt.currentTarget.files[0];
   var reader = new FileReader();
   reader.onload = function (evt) {
   $scope.$apply(function($scope){
   $scope.myImage=evt.target.result;
   });
   };
   reader.readAsDataURL(file);
   };
   angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
   //        }
   */


})
  .controller('EmbalagemDialogCtrl', function ($scope, $http, params, $modalInstance) {
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.embalagem = params.embalagem;

    $scope.clear = function () {
      delete $scope.embalagem;
    };

    $scope.submit = function () {
      /*
       //chamar serviço API
       $http.post(WS.urlSGP+'embalagem/', 
       $scope.embalagem                        
       ).then(function successCallback(response) {
       console.log("deu bom"+response.data);
       }, function errorCallback(response) {
       console.log("deu ruim"+response);
       console.log($scope.embalagem);
       });
       */

      //pegar retorno API e definir padrão p/ result
      //
      $modalInstance.close({
        embalagem: $scope.embalagem,
        status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
//       embalagem: response.data,
//       status: response.status
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });

