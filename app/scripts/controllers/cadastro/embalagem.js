'use strict';
app.controller('EmbalagemCtrl', function ($scope, $modal, $filter, EmbalagemResource, CONST, toastr) {
  
  var toastTitle = "";
  var toastMsg = "";
  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Embalagens dos Produtos";
  $scope.headerLista = "Nenhuma embalagem foi encontrada";
  $scope.labelCadastrarBtn = "Nova Embalagem";
  
  atualizarLista();
  
  function atualizarLista() {
    $scope.embalagens = EmbalagemResource.query();
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
      tituloDialog: "Cadastrar Embalagem",
      embalagem: new EmbalagemResource()
    };

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
//          atualizarLista();
//          $scope.$apply();
          toastMsg = result.embalagem.nome + " cadastrada";
          toastr.success(toastMsg, "Sucesso!");
        } else {//Senão mostra msg erro
          toastMsg = result.embalagem.nome + " não cadastrada!";
          toastr.error(toastMsg, "Erro!");
        }
      }
    });
  };

  $scope.openUpdateDialog = function (embalagem) {    
    index = $scope.embalagens.indexOf($filter('filter')($scope.embalagens, embalagem, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Embalagem",
      embalagem: angular.copy(embalagem)
    };

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
          toastMsg = "Dados da embalagem " + result.embalagem.nome + " alterados com sucesso!";
          toastr.success(toastMsg, "Sucesso");
        } else {//Senão mostra msg erro                  
          toastMsg = "Dados da embalagem " + result.embalagem.nome + " não foram alterados!";
          
          toastr.error(toastMsg, "Erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não alterado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  };
  
  $scope.openAtivarDesativarDialog = function (embalagem) {
    index = $scope.embalagens.indexOf($filter('filter')($scope.embalagens, embalagem, true)[0]);    
    swal({
      title: "Deseja mesmo" + (embalagem.dtDesativacao ? " ativar" : " desativar") + " a Embalagem " + embalagem.nome + "?",
      text: "Você poderá" + (embalagem.dtDesativacao ? " desativar" : " ativar") + " a Embalagem novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (embalagem.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
//      $scope.embalagens.splice(index, 1);
//      embalagem.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
//      embalagem.dtDesativacao = new Date();
      embalagem.dtDesativacao = (embalagem.dtDesativacao ? null : new Date());
      EmbalagemResource.update(embalagem, function(){
          $scope.embalagens[index] = embalagem;
          toastMsg = embalagem.nome + (embalagem.dtDesativacao ? " desativada!" : " ativada!");
          toastr.success(toastMsg, "Sucesso!");
        }, function(){
          toastMsg = embalagem.nome + " não foi " + (embalagem.dtDesativacao ? "ativada!" : "desativada!");
          toastr.error(toastMsg, "Erro!");
        });
    });    
  };

  $scope.openInfoDialog = function (embalagem) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Embalagem",
      embalagem: angular.copy(embalagem)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoEmbalagem.html",
      controller: "EmbalagemDialogCtrl",
      backdrop: 'static',
      size: '',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  };
})
  .controller('EmbalagemDialogCtrl', function ($scope, $modalInstance, params, CONST, EmbalagemResource, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
//    if(params.embalagem){
        $scope.embalagem = params.embalagem;
//    }else{
//        $scope.embalagem = new EmbalagemResource();
//    }
//    if($scope.embalagemInit)delete $scope.embalagemInit;
    $scope.embalagemInit = angular.copy($scope.embalagem);
    
    $scope.materiais = [
      {nome: "PE - Polietileno", tipo: "Plástico"},
      {nome: "PP - Polipropileno", tipo: "Plástico"},
      {nome: "PC - Papel Clabin", tipo: "Papel"},
      {nome: "PG - Papel Gordura", tipo: "Papel"}
    ];
    
    $scope.clear = function () {
      $scope.embalagem = angular.copy($scope.embalagemInit);
    };    

    $scope.submit = function () {
      //incluir rotina de validação
      if ($scope.formTipo == 'insert') { //insert
        $scope.embalagem.$save(function (data) {
          // do something which you want with response
          console.log("insert ok");
          console.log(data);
          console.log(status);
        }, function(){
          console.log("erro");
          console.log(status);
        });
      } else { //update
        $scope.embalagem.$update(function(){
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

