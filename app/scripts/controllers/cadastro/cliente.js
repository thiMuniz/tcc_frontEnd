'use strict';
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
 
  function carregarClientesFront() {
    var pessoa = {id: "1", tipoPessoa: "pf", email: "email PF", telefone1: "tel 1 PF", telefone2: "tel 2 PF", imagem: "img/adm/AdmThiagoMM.jpg", dtDesativacao: "", usuario: "User 1 PF", senha: "", permissao: ""};
    var pf = {nome: "nome Pf", sobrenome: "sobrenome PF", titulo: "titulo PF", rg: "000001", cpf: "1000000", dtNascimento: "01/01/2001"};    
    var endereco = {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
    var cliente1 = {pessoa: pessoa, pf: pf, endereco: endereco};
    
    pessoa = {id: "2", tipoPessoa: "pj", email: "email PJ", telefone1: "tel 1 PJ", telefone2: "tel 2 PJ", imagem: "img/adm/AdmEvertonWB.jpg", dtDesativacao: "", usuario: "User 2 PJ", senha: "", permissao: ""};
    var pj = {razaoSocial: "razaoSocial PJ", nomeFantasia: "nomeFantasia PJ", ramoAtividade: "ramo ativ. PJ", cnpj: "000002", inscricaoEst: "2000000", dtAbertura: "02/02/2002", contato: "contato PJ", tipo: "cliente", hrMinEntrega: "09:00", hrMaxEntrega: "17:00"};
    endereco = {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
    var cliente2 = {pessoa: pessoa, pj: pj, endereco: endereco};
    
    $scope.clientes = [
      cliente1,
      cliente2
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
      tituloDialog: "Cadastrar Cliente",
      //      cliente: new ClienteResource()
      cliente: {
        pessoa: {tipoPessoa: "pj", email: "", telefone1: "", telefone2: "", imagem: "", dtDesativacao: "", usuario: "", senha: "", permissao: ""},
        pf: {nome: "", sobrenome: "", titulo: "", rg: "", cpf: "", dtNascimento: ""},
        pj: {razaoSocial: "", nomeFantasia: "", ramoAtividade: "", cnpj: "", inscricaoEst: "", dtAbertura: "", contato: "", tipo: "", hrMinEntrega: "", hrMaxEntrega: ""}, 
        endereco: {cep: "", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""}
      }
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formCliente.html',
      controller: 'ClienteDialogCtrl',
      backdrop: 'static',
      size: 'lg',
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
  };

  $scope.openUpdateDialog = function (cliente) {
    index = $scope.clientes.indexOf($filter('filter')($scope.clientes, cliente, true)[0]);
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Cliente",
      cliente: angular.copy(cliente)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formCliente.html",
      controller: "ClienteDialogCtrl",
      backdrop: 'static',
      size: 'lg',
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
    index = $scope.clientes.indexOf($filter('filter')($scope.clientes, cliente, true)[0]);
    swal({
      title: "Deseja mesmo" + (cliente.pessoa.dtDesativacao ? " ativar" : " desativar") + " o cliente " + (cliente.pf ? cliente.pf.nome : cliente.pj.nomeFantasia) + "?",
      text: "Você poderá" + (cliente.pessoa.dtDesativacao ? " desativar" : " ativar") + " o cliente novamente!",
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
      ClienteResource.update(cliente, function () {
        $scope.clientes[index] = cliente;
        toastMsg = (cliente.pf ? cliente.pf.nome : cliente.pj.nomeFantasia) + (cliente.pessoa.dtDesativacao ? " desativado!" : " ativado!");
        toastr.success(toastMsg, "Sucesso!");
      }, function () {
        toastMsg = (cliente.pf ? cliente.pf.nome : cliente.pj.nomeFantasia) + " não foi " + (cliente.pessoa.dtDesativacao ? "ativado!" : "desativado!");
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
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoCliente.html",
      controller: "ClienteDialogCtrl",
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
.controller('ClienteDialogCtrl', function ($scope, $modalInstance, $http, params, CONST, toastr) {

  $scope.init = function () {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
//    if (params.cliente) {      
//      
//      $scope.cliente = angular.copy(params.cliente);
//      
//      console.log("params.cliente");
//      console.log(params.cliente);
////      $scope.cliente = params.cliente;      
//      console.log("scope.cliente");
//      console.log($scope.cliente);
////      $scope.clienteInit = angular.copy($scope.cliente);
////      console.log("clienteInit");
////      console.log($scope.clienteInit);
//    } else {
//      //        $scope.cliente = new ClienteResource();
//      
//    }
    
    $scope.cliente = angular.copy(params.cliente);
    $scope.clienteInit = angular.copy(params.cliente);
    
    $scope.toogleTipoPessoa();
      
    $scope.sexos = [
      {nome: "Masculino", valor: "masculino"},
      {nome: "Feminino", valor: "feminino"}
    ];
  }
  

  $scope.toogleTipoPessoa = function () {
    var abaPF = 'Passo 2 - Dados Pessoa Física';
    var abaPJ = 'Passo 2 - Dados Pessoa Jurídica';
    if ($scope.cliente.pessoa.tipoPessoa == 'pf') {
      delete $scope.cliente.pj;
      $scope.cliente.pf = $scope.cliente.pf;
      $scope.steps[1] = abaPF;
    } else {
      delete $scope.cliente.pf;
      $scope.cliente.pj = $scope.cliente.pj;
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
    $http.get(CONST.ws.urlCep + $scope.cliente.endereco.cep + '/json/'
            ).success(function (endereco) {
      $scope.cliente.endereco = endereco;
//              toastr.info(endereco);
    }).error(function (endereco) {
      console.log("deu ruim - endereco" + endereco);
//                        carregarClientesFront();
    });
  };

  $scope.clear = function () {
    $scope.cliente = angular.copy($scope.clienteInit);
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


  // controle abas
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
