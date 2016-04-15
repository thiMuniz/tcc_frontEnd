'use strict';
//angular.module('sbAdminApp')
app.controller('ClienteCtrl', function ($scope, $modal, ClienteResource, CONST, toastr) {
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

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
//        pf: $scope.pf,
//        pj: $scope.pj,
//        tipoPessoa: $scope.tipoPessoa,
//        email: "email@text1", usuario: "user1", foto: "", senha: "",  telefone1: "29372837293", telefone2: "29372987293", dtCadastro: new Date(),
//        local: $scope.local}
        pessoa: $scope.pessoa, pf: $scope.pf, endereco: $scope.endereco}
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
      iconeHeaderDialog: "add_circle_outline",
      tituloDialog: "Cadastrar Cliente",
//      cliente: new ClienteResource(),
      cliente: {tipoPessoa: "", email: "", telefone1: "", telefone2: "", imagem: "", dtDesativacao: "", usuario: "", senha: "", permissao: "", endereco: {cep: "", logradouro: "", numero: "", complemento: "", localidade: "", bairro: "", uf: ""}}
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

  $scope.openUpdateDialog = function (cliente, index) {

    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: "edit",
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
  $scope.openDesativarDialog = function (cliente, index) {
//    
    swal({
      title: "Deseja mesmo desativar o Cliente " + cliente.nome + "?",
      text: "Você poderá ativar o Cliente novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonText: "Não, me tire daqui!",
      confirmButtonText: "Sim, quero desativar!",
      closeOnConfirm: false
    },
            function () {
              $scope.clientes.splice(index, 1);
              toastMsg = cliente.nome + " desativado!";
              $scope.$apply();//força atualização da variável $scope
              swal({
                title: toastMsg,
                type: "success"
              });
            });
  };

  $scope.openInfoDialog = function (cliente) {

    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: "info_outline",
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

  $scope.saveObjectDialog = function () {
    $scope.clientes.push(angular.copy($scope.cliente));
    delete $scope.cliente;
    //close no form
  };


  $scope.create = function (acao) {
    // desenvolver método que consome API
  };

  $scope.read = function (selectedRotulo) {
    // desenvolver método que consome API
  };

  $scope.update = function (selectedRotulo) {
    // desenvolver método que consome API
  };

  $scope.delete = function (selectedRotulo) {
    // desenvolver método que consome API
  };



})
  .controller('ClienteDialogCtrl', function ($scope, $modalInstance, $http, params, CONST, toastr) {
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    
//    $scope.cliente = params.cliente;

    $scope.pessoa = {tipoPessoa: "", email: "", telefone1: "", telefone2: "", imagem: "", dtDesativacao: "", usuario: "", senha: "", permissao: ""};
    $scope.pf = {nome: "", sobrenome: "", titulo: "", rg: "", cpf: "", dtNascimento: ""};
    $scope.pj = {razaoSocial: "", nomeFantasia: "", ramoAtividade: "", cnpj: "", inscricaoEst: "", dtAbertura: "", contato: "", tipo: "", hrMinEntrega: "", hrMaxEntrega: ""};
    $scope.endereco = {cep: "", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
    $scope.cliente = {pessoa: $scope.pessoa, pf: $scope.pf, pj: $scope.pj, endereco: $scope.endereco};

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
    }

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


//carrega as steps default como pf    
    $scope.steps = [
      'Geral',
      'PF',
      'Endereço'
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
    }
//seta a aba pf apartir do radio button de tipo pessoa
$scope.setPf = function() {
    $scope.steps = [
      'Geral',
      'PF',
      'Endereço'
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
    }

    };
//seta a aba pJ apartir do radio button de tipo pessoa
$scope.setPj = function() {
    $scope.steps = [
      'Geral',
      'PJ',
      'Endereço'
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
    }
    
};

  });
