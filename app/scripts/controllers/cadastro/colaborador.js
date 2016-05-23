'use strict';
app.controller('ColaboradorCtrl', function ($scope, $modal, $filter, PessoaResource, CONST, toastr, $stateParams, $httpParamSerializerJQLike) {
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

  //var params = {limit:10,page:0}
  $scope.perfil = $stateParams.perfil;
  
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Colaboradores";
  $scope.headerLista = "Nenhum " + $scope.perfil + " foi encontrado";
  $scope.labelCadastrarBtn = "Novo "+$scope.perfil;

  $scope.atualizarLista = function(){
    $scope.colaboradores = PessoaResource.listByPerfil({p:$httpParamSerializerJQLike({perfil:$scope.perfil})});
    //incluir spinner enquanto esta carregando a lista
  };
  
  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };

  $scope.openInsertDialog = function () {
    $scope.colaborador = new PessoaResource();
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: CONST.inserir.iconeHeaderDialog,
      tituloDialog: "Cadastrar Colaborador",
      colaborador: $scope.colaborador,
      perfil: $scope.perfil
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formColaborador.html',
      controller: 'ColaboradorDialogCtrl',
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

  $scope.openUpdateDialog = function (colaborador) {
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Colaborador",
      colaborador: angular.copy(colaborador)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formColaborador.html",
      controller: "ColaboradorDialogCtrl",
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

  $scope.openAtivarDesativarDialog = function (colaborador) {
    swal({
      title: "Deseja mesmo" + (colaborador.dtDesativacao ? " ativar" : " desativar") + " o colaborador " + (colaborador.pf.nome) + "?",
      text: "Você poderá" + (colaborador.dtDesativacao ? " desativar" : " ativar") + " o colaborador novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (colaborador.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
      var colaboradorCopy = angular.copy(colaborador);
      colaboradorCopy.dtDesativacao = (colaborador.dtDesativacao ? null : $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      colaboradorCopy.$update({p:$httpParamSerializerJQLike({perfil:$scope.perfil})},
      function(){
        $scope.atualizarLista();
        toastMsg = (colaborador.pf.nome) + (colaborador.dtDesativacao ? " ativado!" : " desativado!");
        toastr.success(toastMsg, "Sucesso!");
      }, function(){
        toastMsg = (colaborador.pf.nome) + " não foi " + (colaborador.dtDesativacao ? "ativado!" : "desativado!");
        toastr.error(toastMsg, "Erro!");
      });
    });
  };

  $scope.openInfoDialog = function (colaborador) {
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Colaborador",
      colaborador: angular.copy(colaborador)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoColaborador.html",
      controller: "ColaboradorDialogCtrl",
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
.controller('ColaboradorDialogCtrl', function ($scope, $modal, $modalInstance, $http, params, CONST, toastr, $httpParamSerializerJQLike) {

//  $scope.init = function () {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.perfil = params.perfil;
    
    $scope.colaborador = angular.copy(params.colaborador);
    $scope.colaboradorInit = angular.copy($scope.colaborador);
      
    $scope.sexos = [
      {nome: "Masculino", valor: "masculino"},
      {nome: "Feminino", valor: "feminino"}
    ];
//  }
  
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
    expect(valid.getText()).toContain('formColaborador.input.$valid = false');
  };


  $scope.carregarCep = function () {
    $http.get(CONST.ws.urlCep + $scope.colaborador.endereco.cep + '/json/'
            ).success(function (endereco) {
      $scope.colaborador.endereco = endereco;
//              toastr.info(endereco);
    }).error(function (endereco) {
      console.log("deu ruim - endereco" + endereco);
//                        carregarColaboradoresFront();
    });
  };

  $scope.openImagemDialog = function(){
    $scope.params = {
      formTipo: $scope.formTipo,
      iconeHeaderDialog: $scope.iconeHeaderDialog,
      tituloDialog: params.formTipo == 'insert' ? "Cadastrar Imagem" : "Editar Imagem",
      imagens: $scope.colaborador.imagem ? [angular.copy($scope.colaborador.imagem)] : [],
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
      $scope.colaborador.imagem = imagens[0];
    }, function(){
      toastr.warning("A imagem não foi registrada");
    });
  };
  
  $scope.submit = function () {
    if ($scope.formTipo == 'insert') { //insert
      $scope.colaborador.$save({p:$httpParamSerializerJQLike({perfil:$scope.perfil})},
      function(){
        var toastMsg = "Colaborador " + $scope.colaborador.pf.nome + " cadastrado com sucesso!";
        toastr.success(toastMsg, "successo");
        var result = {
          colaborador: $scope.colaborador, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao cadastrar Colaborador " + $scope.colaborador.pf.nome;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    } else { //update
      $scope.colaborador.$update({p:$httpParamSerializerJQLike({perfil:$scope.colaborador.permissao.perfil})},
      function(){
        var toastMsg = "Colaborador " + $scope.colaborador.pf.nome + " editado com sucesso!";
        toastr.success(toastMsg, "Sucesso");
        var result = {
          colaborador: $scope.colaborador, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao editar Colaborador " + $scope.colaborador.pf.nome;
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    }
    //pegar retorno API e definir padrão p/ result
    //
//    $modalInstance.close({
//      colaborador: $scope.colaborador,
//      status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
////                            colaborador: response.data,
////                            status: response.status
//    });
  };

  // controle abas
  $scope.steps = [
    'Passo 1 - Dados Gerais',
    'Passo 2 - Dados Pessoa Física', // apenas pf em colaborador
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
    $scope.colaborador = angular.copy($scope.colaboradorInit);
  };
  
  $scope.close = function(result){
    $modalInstance.close(result);
  };
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
