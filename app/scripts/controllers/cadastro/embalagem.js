'use strict';
app.controller('EmbalagemCtrl', function ($scope, $modal, $filter, EmbalagemResource, PessoaResource, CONST, toastr, $httpParamSerializerJQLike) {
  
  var toastTitle = "";
  var toastMsg = "";
  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Embalagens dos Produtos";
  $scope.headerLista = "Nenhuma embalagem foi encontrada";
  $scope.labelCadastrarBtn = "Nova Embalagem";
  
  $scope.atualizarLista = function(){
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
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
        if (result.status == "sucesso") {
          $scope.atualizarLista();
      }
    });
  };

  $scope.openUpdateDialog = function (embalagem) {
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
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
        if (result.status == "sucesso") {
          $scope.atualizarLista();
        }
    });
  };
  
  $scope.openAtivarDesativarDialog = function (embalagem) {
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
      var embalagemCopy = angular.copy(embalagem);
      embalagemCopy.dtDesativacao = (embalagem.dtDesativacao ? null : $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      embalagemCopy.$update(
      function(){
        $scope.atualizarLista();
        toastMsg = embalagem.nome + (embalagem.dtDesativacao ? " ativada!" : " desativada!");
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
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  };
  
  $scope.openFornecedorItemDialog = function(embalagem){
    $scope.params = {
      formTipo: 'lookup',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Lookup Fornecedor",
      embalagem: angular.copy(embalagem),
      fornecedores: PessoaResource.listByPerfil({p:$httpParamSerializerJQLike({perfil:"fornecedor"})})
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formFornecedorItem.html",
      controller: "EmbalagemDialogCtrl",
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
          $scope.atualizarLista();
        }
    });
  };
  
  $scope.atualizarLista();
  
})
  .controller('EmbalagemDialogCtrl', function ($scope, $modal, $modalInstance, params, CONST, EmbalagemResource, PessoaResource, toastr, $http) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
        
    $scope.embalagem = params.embalagem;
    $scope.embalagemInit = angular.copy($scope.embalagem);
    
    if(params.formTipo == 'lookup'){
      $scope.fornecedoresAll = params.fornecedores;
      $scope.temp = {};
      $scope.temp.fornecedoresItem = $scope.embalagemInit.fornecedores;
    }
    
    $scope.materiais = [
      {nome: "PP - Polipropileno", tipo: "Plástico"},
      {nome: "PK - Papel Klabin", tipo: "Papel"}
    ];
    
    $scope.atualizarLista = function(){
      $scope.embalagem.fornecedores = $scope.temp.fornecedoresItem;
    };
    
    $scope.removerFornecedor = function(index){
      $scope.temp.fornecedoresItem.splice(index, 1);
      $scope.atualizarLista();
    };
        
    $scope.openImagemDialog = function(){
      $scope.params = {
        formTipo: $scope.formTipo,
        iconeHeaderDialog: $scope.embalagem.imagens ? CONST.editar.iconeHeaderDialog : CONST.inserir.iconeHeaderDialog,
        tituloDialog: $scope.embalagem.imagens ? "Editar Imagem" : "Cadastrar Imagem",
        imagens: $scope.embalagem.imagens ? angular.copy($scope.embalagem.imagens) : [],
        maxImagens: 1
      };
      var modalInstance = $modal.open({
        templateUrl: "views/cadastro/dialog/formImagem.html",
        controller: "ImagemDialogCtrl",
        backdrop: 'static',
        size: 'lg',
        resolve: {
          params: function () {
            return $scope.params;
          }
        }
      });
      modalInstance.result.then(function (imagens) {
        $scope.embalagem.imagens = imagens;
      }, function(){
        toastr.warning("A imagem não foi registrada");
      });
    };
    
    $scope.submit = function () {
      if ($scope.formTipo == 'insert') { //insert
        $scope.embalagem.$save(function(){
          var toastMsg = "Embalagem " + $scope.embalagem.nome + " cadastrada com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            embalagem: $scope.embalagem, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Embalagem " + $scope.embalagem.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update ou lookup
        $scope.embalagem.$update(function(){
          var toastMsg = "Embalagem " + $scope.embalagem.nome + " editada com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            embalagem: $scope.embalagem, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Embalagem " + $scope.embalagem.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };    
    
    $scope.clear = function () {
      $scope.embalagem = angular.copy($scope.embalagemInit);
      if(params.formTipo == 'lookup'){
        $scope.temp.fornecedoresItem = $scope.embalagemInit.fornecedores;      
      }
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };    
    
  });

