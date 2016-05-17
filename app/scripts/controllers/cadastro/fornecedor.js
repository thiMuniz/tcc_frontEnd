'use strict';
app.controller('FornecedorCtrl', function ($scope, $modal, $filter, PessoaResource, CONST, toastr, $stateParams, $httpParamSerializerJQLike) {
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Fornecedores";
  $scope.headerLista = "Nenhum fornecedor foi encontrado";
  $scope.labelCadastrarBtn = "Novo Fornecedor";

  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };
  
  $scope.atualizarLista = function(){
    $scope.fornecedores = PessoaResource.listByPerfil({p:$httpParamSerializerJQLike({perfil:$stateParams.perfil})});
    //incluir spinner enquanto esta carregando a lista
  };
  
  $scope.openInsertDialog = function () {
    $scope.fornecedor = new PessoaResource();
    $scope.fornecedor.perfil = $stateParams.perfil;
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: CONST.inserir.iconeHeaderDialog,
      tituloDialog: "Cadastrar Fornecedor",
      fornecedor: $scope.fornecedor
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formFornecedor.html',
      controller: 'FornecedorDialogCtrl',
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

  $scope.openUpdateDialog = function(fornecedor) {
    index = $scope.fornecedores.indexOf($filter('filter')($scope.fornecedores, fornecedor, true)[0]);
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Fornecedor",
      fornecedor: angular.copy(fornecedor)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formFornecedor.html",
      controller: "FornecedorDialogCtrl",
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

  $scope.openAtivarDesativarDialog = function(fornecedor) {
    index = $scope.fornecedores.indexOf($filter('filter')($scope.fornecedores, fornecedor, true)[0]);
    swal({
      title: "Deseja mesmo" + (fornecedor.dtDesativacao ? " ativar" : " desativar") + " o fornecedor " + fornecedor.pj.nomeFantasia + "?",
      text: "Você poderá" + (fornecedor.dtDesativacao ? " desativar" : " ativar") + " o fornecedor novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (fornecedor.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
//      $scope.fornecedores.splice(index, 1);
//      fornecedor.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
//      fornecedor.dtDesativacao = new Date();
      fornecedor.dtDesativacao = (fornecedor.dtDesativacao ? null : new Date());
      PessoaResource.update(fornecedor, function () {
        $scope.atualizarLista();
        toastMsg = fornecedor.pj.nomeFantasia + (fornecedor.dtDesativacao ? " desativado!" : " ativado!");
        toastr.success(toastMsg, "Sucesso!");
      }, function () {
        toastMsg = fornecedor.pj.nomeFantasia + " não foi " + (fornecedor.dtDesativacao ? "ativado!" : "desativado!");
        toastr.error(toastMsg, "Erro!");
      });
    });
  };

  $scope.openInfoDialog = function(fornecedor) {
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Fornecedor",
      fornecedor: angular.copy(fornecedor)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoFornecedor.html",
      controller: "FornecedorDialogCtrl",
      backdrop: 'static',
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  };
  
  $scope.openLookupFornecedor = function(){
//    index = $scope.fornecedores.indexOf($filter('filter')($scope.fornecedores, fornecedor, true)[0]);
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Fornecedor",
      fornecedor: angular.copy(fornecedor)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/lookupFornecedor.html",
      controller: "FornecedorDialogCtrl",
      backdrop: 'static',
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {//quando foi fechado enviando dados
      if (result.fornecedor) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a fornecedor à lista
          $scope.fornecedores[index] = result.fornecedor;
//                  $scope.$apply(); 
          toastMsg = "Fornecedor " + result.fornecedor.nome + " editado com sucesso!";
          toastr.success(toastMsg, "sucesso");
        } else {//Senão mostra msg erro                  
          toastMsg = "Erro ao editar Fornecedor " + result.fornecedor.nome + " !";
          toastr.error(toastMsg, "erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não cadastrado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });      
  };
  
  $scope.atualizarLista();

})
.controller('FornecedorDialogCtrl', function ($scope, $modal, $modalInstance, $http, params, CONST, toastr) {

  $scope.CONST = CONST;
  $scope.formTipo = params.formTipo;
  $scope.iconeHeaderDialog = params.iconeHeaderDialog;
  $scope.tituloDialog = params.tituloDialog;

  $scope.fornecedor = angular.copy(params.fornecedor);
  $scope.fornecedorInit = angular.copy(params.fornecedor);    

  $scope.sexos = [
    {nome: "Masculino", valor: "masculino"},
    {nome: "Feminino", valor: "feminino"}
  ];
  
  //valida email
  $scope.email = function () {
    email.clear();
    email.sendKeys('');
    expect(text.getText()).toEqual('text =');
    expect(valid.getText()).toContain('false');
  };
  //valida data       
  $scope.dtNascimento = function () {
    setInput('');
    expect(value.getText()).toEqual('value =');
    expect(valid.getText()).toContain('formFornecedor.input.$valid = false');
  };

  $scope.carregarCep = function () {
    $http.get(CONST.ws.urlCep + $scope.fornecedor.endereco.cep + '/json/'
            ).success(function (endereco) {
      $scope.fornecedor.endereco = endereco;
//              toastr.info(endereco);
    }).error(function (endereco) {
      console.log("deu ruim - endereco" + endereco);
//                        carregarFornecedoresFront();
    });
  };
    
  $scope.openImagemDialog = function(){
    $scope.params = {
      formTipo: $scope.formTipo,
      iconeHeaderDialog: $scope.iconeHeaderDialog,
      tituloDialog: params.formTipo == 'insert' ? "Cadastrar Imagem" : "Editar Imagem",
      imagens: $scope.fornecedor.imagem ? [angular.copy($scope.fornecedor.imagem)] : [],
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
      $scope.fornecedor.imagem = imagens[0];        
    }, function(){
      toastr.warning("A imagem não foi registrada");
    });
  };
    
  $scope.submit = function () {
    if ($scope.formTipo == 'insert') { //insert
      $scope.fornecedor.$save(function(){
        var toastMsg = "Fornecedor " + $scope.fornecedor.pj.nomeFantasia + " cadastrado com sucesso!";
        toastr.success(toastMsg, "successo");
        var result = {
          fornecedor: $scope.fornecedor, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao cadastrar Fornecedor " + $scope.fornecedor.pj.nomeFantasia;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    } else { //update
      $scope.fornecedor.$update(function(){
        var toastMsg = "Fornecedor " + $scope.fornecedor.pj.nomeFantasia + " editado com sucesso!";
        toastr.success(toastMsg, "Sucesso");
        var result = {
          fornecedor: $scope.fornecedor, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao editar Fornecedor " + $scope.fornecedor.pj.nomeFantasia;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    }    
  };
  
  // controle abas
  $scope.steps = [
    'Passo 1 - Dados Gerais',
    'Passo 2 - Dados Pessoa Jurídica', // apenas pj em fornecedor
    'Passo 3 - Endereço'
  ];
  $scope.selection = $scope.steps[0];//esse indice que diz se sera comecar qual aba
  $scope.getCurrentStepIndex = function () {
    // Get the index of the current step given selection
    return _.indexOf($scope.steps, $scope.selection);
  };
  // Go to a defined step index
  $scope.goToStep = function (index) {
    if (!_.isUndefined($scope.steps[index]))
    {
      $scope.selection = $scope.steps[index];
    }
  };
  $scope.hasNextStep = function () {
    var stepIndex = $scope.getCurrentStepIndex();
    var nextStep = stepIndex + 1;
    // Return true if there is a next step, false if not
    return !_.isUndefined($scope.steps[nextStep]);
  };
  $scope.hasPreviousStep = function () {
    var stepIndex = $scope.getCurrentStepIndex();
    var previousStep = stepIndex - 1;
    // Return true if there is a next step, false if not
    return !_.isUndefined($scope.steps[previousStep]);
  };
  $scope.incrementStep = function () {
    if ($scope.hasNextStep())
    {
      var stepIndex = $scope.getCurrentStepIndex();
      var nextStep = stepIndex + 1;
      $scope.selection = $scope.steps[nextStep];
    }
  };
  $scope.decrementStep = function () {
    if ($scope.hasPreviousStep())
    {
      var stepIndex = $scope.getCurrentStepIndex();
      var previousStep = stepIndex - 1;
      $scope.selection = $scope.steps[previousStep];
    }
  };
  // Fim controle abas

  $scope.clear = function () {
    $scope.fornecedor = angular.copy($scope.fornecedorInit);
  };
  
  $scope.close = function(result){
    $modalInstance.close(result);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
});
