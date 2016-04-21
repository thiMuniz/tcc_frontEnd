'use strict';
app.controller('ColaboradorCtrl', function ($scope, $modal, $filter, ColaboradorResource, CONST, toastr) {
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Colaboradores";
  $scope.headerLista = "Nenhum colaborador foi encontrado";
  $scope.labelCadastrarBtn = "Novo Colaborador";

  toastr.warning(toastMsg, toastTitle);
  carregarColaboradoresFront();
 
  function carregarColaboradoresFront() {
    var pessoa = {id: "1", tipoPessoa: "pf", email: "email pf1", telefone1: "tel 1 pf1", telefone2: "tel 2 pf1", imagem: "img/adm/AdmThiagoMM.jpg", dtDesativacao: "", usuario: "User 1 pf1", senha: "", permissao: ""};
    var pf = {nome: "nome Pf", sobrenome: "sobrenome PF", rg: "000001", cpf: "1000000", dtNascimento: "01/01/2001"};    
    var endereco = {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
    var colaborador1 = {pessoa: pessoa, pf: pf, endereco: endereco};
    
    pessoa = {id: "2", tipoPessoa: "pf", email: "email pf2", telefone1: "tel 1 pf2", telefone2: "tel 2 pf2", imagem: "img/adm/AdmEvertonWB.jpg", dtDesativacao: "", usuario: "User 2 pf2", senha: "", permissao: ""};
    pf = {nome: "nome Pf", sobrenome: "sobrenome PF", rg: "000001", cpf: "1000000", dtNascimento: "01/01/2001"};    
    endereco = {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
    var colaborador2 = {pessoa: pessoa, pf: pf, endereco: endereco};
    
    $scope.colaboradores = [
      colaborador1,
      colaborador2
    ];
  }

  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };

  function carregarColaboradoresAPI() {
    $scope.colaboradores = ColaboradorResource.query();
  }

  $scope.openInsertDialog = function () {
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: CONST.inserir.iconeHeaderDialog,
      tituloDialog: "Cadastrar Colaborador",
      //      colaborador: new ColaboradorResource()
      colaborador: {
        pessoa: {tipoPessoa: "pf", email: "", telefone1: "", telefone2: "", imagem: "", dtDesativacao: "", usuario: "", senha: "", permissao: ""},
         pf : {nome: "", sobrenome: "", titulo: "", rg: "", cpf: "", dtNascimento: ""},    
        endereco: {cep: "", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""}
      }
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
      if (result.colaborador) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a colaborador à lista
          $scope.colaboradores.push(angular.copy(result.colaborador));
//                  $scope.$apply();
          toastMsg = "Colaborador " + result.colaborador.pf.nome + " cadastrado com sucesso!";
          toastr.success(toastMsg, "successo");
        } else {//Senão mostra msg erro                  
          toastMsg = "Erro ao cadastrar Colaborador " + result.colaborador.dsCurta + " !";
          toastr.errror(toastMsg, "erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não cadastrado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  };

  $scope.openUpdateDialog = function (colaborador) {
    index = $scope.colaboradores.indexOf($filter('filter')($scope.colaboradores, colaborador, true)[0]);
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
    modalInstance.result.then(function (result) {//quando foi fechado enviando dados
      if (result.colaborador) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a colaborador à lista
          $scope.colaboradores[index] = result.colaborador;
//                  $scope.$apply(); 
          toastMsg = "Colaborador " + result.colaborador.pf.nome + " editado com sucesso!";
          toastr.success(toastMsg, "sucesso");
        } else {//Senão mostra msg erro                  
          toastMsg = "Erro ao editar Colaborador " + result.colaborador.pf.nome + " !";
          toastr.error(toastMsg, "erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não cadastrado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  };

  $scope.openAtivarDesativarDialog = function (colaborador) {
    index = $scope.colaboradores.indexOf($filter('filter')($scope.colaboradores, colaborador, true)[0]);
    swal({
      title: "Deseja mesmo" + (colaborador.pessoa.dtDesativacao ? " ativar" : " desativar") + " o colaborador " + (colaborador.pf.nome) + "?",
      text: "Você poderá" + (colaborador.pessoa.dtDesativacao ? " desativar" : " ativar") + " o colaborador novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (colaborador.pessoa.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
//      $scope.colaboradores.splice(index, 1);
//      colaborador.pessoa.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
//      colaborador.pessoa.dtDesativacao = new Date();
      colaborador.pessoa.dtDesativacao = (colaborador.pessoa.dtDesativacao ? null : new Date());
      ColaboradorResource.update(colaborador, function () {
        $scope.colaboradores[index] = colaborador;
        toastMsg = (colaborador.pf.nome) + (colaborador.pessoa.dtDesativacao ? " desativado!" : " ativado!");
        toastr.success(toastMsg, "Sucesso!");
      }, function () {
        toastMsg = (colaborador.pf.nome) + " não foi " + (colaborador.pessoa.dtDesativacao ? "ativado!" : "desativado!");
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

})
.controller('ColaboradorDialogCtrl', function ($scope, $modalInstance, $http, params, CONST, toastr) {

  $scope.init = function () {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
//    if (params.colaborador) {      
//      
//      $scope.colaborador = angular.copy(params.colaborador);
//      
//      console.log("params.colaborador");
//      console.log(params.colaborador);
////      $scope.colaborador = params.colaborador;      
//      console.log("scope.colaborador");
//      console.log($scope.colaborador);
////      $scope.colaboradorInit = angular.copy($scope.colaborador);
////      console.log("colaboradorInit");
////      console.log($scope.colaboradorInit);
//    } else {
//      //        $scope.colaborador = new ColaboradorResource();
//      
//    }
    
    $scope.colaborador = angular.copy(params.colaborador);
    $scope.colaboradorInit = angular.copy(params.colaborador);
    
      
    $scope.sexos = [
      {nome: "Masculino", valor: "masculino"},
      {nome: "Feminino", valor: "feminino"}
    ];
  }
  
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

  $scope.clear = function () {
    $scope.colaborador = angular.copy($scope.colaboradorInit);
  };

  $scope.submit = function () {

    /*
     //chamar serviço API
     $http.post(CONST.ws.urlSGP+'colaborador/', 
     $scope.colaborador                        
     ).then(function successCallback(response) {
     console.log("deu bom"+response.data);
     }, function errorCallback(response) {
     console.log("deu ruim"+response);
     console.log($scope.colaborador);
     });
     */

    //pegar retorno API e definir padrão p/ result
    //
    $modalInstance.close({
      colaborador: $scope.colaborador,
      status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
//                            colaborador: response.data,
//                            status: response.status
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


  // controle abas
  $scope.steps = [
    'Passo 1 - Dados Gerais',
    'Passo 2 - Dados Pessoa Física', // apenas f em colaborador
    'Passo 3 - Endereço e Contato'
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

});
