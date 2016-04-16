'use strict';
//angular.module('sbAdminApp')
app.controller('ClienteCtrl', function ($scope, $modal, $filter, ClienteResource, CONST, toastr) {
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Clientes";
  $scope.headerLista = "Nenhum cliente foi encontrado";
  $scope.labelCadastrarBtn = "Novo Cliente";

  toastr.warning(toastMsg, toastTitle);
  carregarClientesFront();

//tipo pessoa fica em pessoa
//pf(cpf,rg,nome,sobrenome,titulo, dtNasc)]
//pj(cnpj, inscricaoEst,razaoSocial,nomeFantasia,contato,tipo,hrMinEntrega,hrMaxEntrega)
//local=dados endereco
  $scope.pessoa = {tipoPessoa: "pj", email: "", telefone1: "", telefone2: "", imagem: "", dtDesativacao: "", usuario: "", senha: "", permissao: ""};
  $scope.pf = {nome: "pessoa1", sobrenome: "silva1", titulo: "", rg: "", cpf: "000000090909", dtNascimento: new Date()};
  $scope.pj = {razaoSocial: "", nomeFantasia: "", ramoAtividade: "", cnpj: "", inscricaoEst: "", dtAbertura: "", contato: "", tipo: "", hrMinEntrega: "", hrMaxEntrega: ""};
  $scope.endereco = {cep: "92839392", logradouro: "rua 1", numero: "1", complemento: "a", bairro: "c", localidade: "b", uf: "d"};


  function carregarClientesFront() {
    $scope.clientes = [
      {
        pessoa: $scope.pessoa, pf: $scope.pf, endereco: $scope.endereco
      }
    ];
  }

  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };

  function carregarClientesAPI() {
    $scope.clientes = ClienteResource.query();
  }

  $scope.openInsertDialog = function () {

    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: CONST.inserir.iconeHeaderDialog,
      tituloDialog: "Cadastrar Cliente"
              //      cliente: new ClienteResource()
    }

    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formCliente.html',
      controller: 'ClienteDialogCtrl',
      backdrop: 'static',
      size: 'lg', //sm, lg
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
      if (result.cliente) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a cliente à lista
          $scope.clientes.push(angular.copy(result.cliente));
//                  $scope.$apply();
          toastMsg = "Cliente " + result.cliente.nome + " cadastrado com sucesso!";
          toastr.success(toastMsg, "successo");
        } else {//Senão mostra msg erro                  
          toastMsg = "Erro ao cadastrar Cliente " + result.cliente.dsCurta + " !";
          toastr.errror(toastMsg, "erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não cadastrado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  }

  $scope.openUpdateDialog = function (cliente) {
    index = $scope.clientes.indexOf($filter('filter')($scope.clientes, cliente, true)[0]);
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Cliente",
      cliente: angular.copy(cliente)
    }

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formCliente.html",
      controller: "ClienteDialogCtrl",
      backdrop: 'static',
      size: '',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {//quando foi fechado enviando dados
      if (result.cliente) {

        if (result.status == "sucesso") {//Se retorno da API com sucesso add a cliente à lista
          $scope.clientes[index] = result.cliente;
//                  $scope.$apply(); 
          toastMsg = "Cliente " + result.cliente.nome + " editado com sucesso!";
          toastr.success(toastMsg, "sucesso");
        } else {//Senão mostra msg erro                  
          toastMsg = "Erro ao editar Cliente " + result.cliente.nome + " !";
          toastr.error(toastMsg, "erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não cadastrado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
  };

  $scope.openAtivarDesativarDialog = function (cliente) {
    index = $scope.clientes.indexOf($filter('filter')($scope.clientes, embalagem, true)[0]);
    swal({
      title: "Deseja mesmo" + (cliente.pessoa.dtDesativacao ? " ativar" : " desativar") + " O cliente " + cliente.pessoa.nome + "?",
      text: "Você poderá" + (cliente.pessoa.dtDesativacao ? " desativar" : " ativar") + " O cliente novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (cliente.pessoa.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
            function () {
//      $scope.clientes.splice(index, 1);
//      cliente.pessoa.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
//      cliente.pessoa.dtDesativacao = new Date();
              cliente.pessoa.dtDesativacao = (cliente.pessoa.dtDesativacao ? null : new Date());
              EmbalagemResource.update(embalagem, function () {
                $scope.clientes[index] = embalagem;
                toastMsg = cliente.pessoa.nome + (cliente.pessoa.dtDesativacao ? " desativado!" : " ativado!");
                toastr.success(toastMsg, "Sucesso!");
              }, function () {
                toastMsg = cliente.pessoa.nome + " não foi " + (cliente.pessoa.dtDesativacao ? "ativado!" : "desativado!");
                toastr.error(toastMsg, "Erro!");
              });
            });
  };

  $scope.openInfoDialog = function (cliente) {
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Cliente",
      cliente: angular.copy(cliente)
    }

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formCliente.html",
      controller: "ClienteDialogCtrl",
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
.controller('ClienteDialogCtrl', function ($scope, $modalInstance, $http, params, CONST, toastr) {

  $scope.init = function () {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    if (params.cliente) {
      $scope.cliente = params.cliente;
    } else {
      //        $scope.cliente = new ClienteResource();
      $scope.pessoa = {tipoPessoa: "pj", email: "", telefone1: "", telefone2: "", imagem: "", dtDesativacao: "", usuario: "", senha: "", permissao: ""};
      $scope.pf = {nome: "", sobrenome: "", titulo: "", rg: "", cpf: "", dtNascimento: ""};
      $scope.pj = {razaoSocial: "", nomeFantasia: "", ramoAtividade: "", cnpj: "", inscricaoEst: "", dtAbertura: "", contato: "", tipo: "", hrMinEntrega: "", hrMaxEntrega: ""};
      $scope.endereco = {cep: "", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
      $scope.cliente = {pessoa: $scope.pessoa, endereco: $scope.endereco};
      $scope.toogleTipoPessoa();
    }

    $scope.sexos = [
      {nome: "masculino"},
      {nome: "feminino"}
    ];
  }

  $scope.toogleTipoPessoa = function () {
    var abaPF = 'Passo 2 - Dados Pessoa - Física';
    var abaPJ = 'Passo 2 - Dados Pessoa - Jurídica';
    if ($scope.pessoa.tipoPessoa == 'pf') {
      delete $scope.cliente.pj;
      $scope.cliente.pf = $scope.pf;
      $scope.steps[1] = abaPF;
    } else {
      delete $scope.cliente.pf;
      $scope.cliente.pj = $scope.pj;
      $scope.steps[1] = abaPJ;
    }
  };


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
    expect(valid.getText()).toContain('formCliente.input.$valid = false');
  };


  $scope.carregarCep = function () {
    $http.get(CONST.ws.urlCep + $scope.cliente.local.cep + '/json/'
            ).success(function (local) {
      $scope.cliente.local = local;
//              toastr.info(local);
    }).error(function (local) {
      console.log("deu ruim - local" + local);
//                        carregarClientesFront();
    });
  };

  $scope.clear = function () {
    delete $scope.cliente;
  };

  $scope.submit = function () {

    /*
     //chamar serviço API
     $http.post(CONST.ws.urlSGP+'cliente/', 
     $scope.cliente                        
     ).then(function successCallback(response) {
     console.log("deu bom"+response.data);
     }, function errorCallback(response) {
     console.log("deu ruim"+response);
     console.log($scope.cliente);
     });
     */

    //pegar retorno API e definir padrão p/ result
    //
    $modalInstance.close({
      cliente: $scope.cliente,
      status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
//                            cliente: response.data,
//                            status: response.status
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


  // Fim controle abas
  $scope.steps = [
    'Passo 1 - Dados Gerais',
    '', //pf default
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
