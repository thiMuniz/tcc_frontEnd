'use strict';
//angular.module('sbAdminApp')
app.controller('ClienteCtrl', function ($scope,$position, $modal, $http, ClienteResource, WS, toastr) {
  toastr.success('Descrição do alemão', 'Título do alemão', {
    closeButton: true
  });
  $scope.titulo = "Cadastro Cliente";
  $scope.headerLista = "Nenhum cliente foi encontrado";
  $scope.labelAddBtn = "Novo Cliente";
//           $scope.endereco = [];

//            resetAlertInfo;
  setAlertInfo("Bem vindo programador lindão!! Boa sorte dessa vez...", "warning", "show");
carregarClientesFront();
  
  function setAlertInfo(msg, classe, acao) {
    var show;
    if (acao == "show") {
      show = true;
    } else {
      show = false;
    }
    $scope.alertInfoMessage = msg;
    $scope.alertInfoClass = classe;
    $scope.alertInfoShow = show;
  }


  function resetAlertInfo() { //Corrigir método (não oculta DIV)
    setAlertInfo("", "info", "hide");
  }

  function carregarClientesFront(){
  $scope.clientes = [
    {cpf: "000000090909", nome: "pessoa1", sobrenome: "silva1", email: "email@text1", usuario: "user1", dtNasc: new Date(), foto: "", senha: "", titulo: "", telefone1: "29372837293", telefone2: "29372987293", dtCadastro: new Date(), cep: "92839392", logradouro: "rua 1", numero: "1", complemento: "a", localidade: "b", bairro: "c", uf: "d"},
    {cpf: "000000090909", nome: "pessoa2", sobrenome: "silva2", email: "email@text2", usuario: "user2", dtNasc: new Date(), foto: "", senha: "", titulo: "", telefone1: "29372837387", telefone2: "29372987293", dtCadastro: new Date(), cep: "92839392", logradouro: "rua 2", numero: "1", complemento: "a", localidade: "b", bairro: "c", uf: "d"},
    {cpf: "000000090909", nome: "pessoa3", sobrenome: "silva3", email: "email@text3", usuario: "user3", dtNasc: new Date(), foto: "", senha: "", titulo: "", telefone1: "29372329387", telefone2: "29372987293", dtCadastro: new Date(), cep: "92839392", logradouro: "rua 3", numero: "1", complemento: "a", localidade: "b", bairro: "c", uf: "d"},
    {cpf: "000000090909", nome: "pessoa4", sobrenome: "silva4", email: "email@text4", usuario: "user4", dtNasc: new Date(), foto: "", senha: "", titulo: "", telefone1: "37298729387", telefone2: "29372987293", dtCadastro: new Date(), cep: "92839392", logradouro: "rua 4", numero: "1", complemento: "a", localidade: "b", bairro: "c", uf: "d"},
    {cpf: "000000090909", nome: "pessoa5", sobrenome: "silva5", email: "email@text5", usuario: "user5", dtNasc: new Date(), foto: "", senha: "", titulo: "", telefone1: "29293729387", telefone2: "29372987293", dtCadastro: new Date(), cep: "92839392", logradouro: "rua 5", numero: "1", complemento: "a", localidade: "b", bairro: "c", uf: "d"}
  ];
  }
  
  $scope.closeAlertInfo = function () {
    resetAlertInfo();
  }
  
  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };

console.log(WS.urlSGP + 'cliente/');


  function carregarClientesAPI() {
$scope.clientes = ClienteResource.query();

//    $http.get('http://192.168.25.8:11392/SGI/cliente/'
//            ).success(function (data, status) {
//      console.log("deu bom - data" + data);
//      console.log("status" + status);
//      $scope.clientes = data;
//    }).error(function (data, status) {
//      console.log("deu ruim - data" + data);
//      console.log("status" + status);
//      carregarClientesFront();
//    });
  }

  $scope.carregarCep = function () {
    $http.get('https://viacep.com.br/ws/83065020/json/'
            ).success(function (local) {
      $scope.formCadastroUser = local;
//                        console.log("deu bom - local"+local);
//                        $scope.endereco = local;
//                setAlertInfo(local, "success", "show");
    }).error(function (local) {
      console.log("deu ruim - local" + local);

//                        carregarClientesFront();
    });
  }
  
// $scope.headerLista = cont + " Clientes encontrados";
//        }   
  //valida email
  $scope.email = function () {
    email.clear();
    email.sendKeys('');
    expect(text.getText()).toEqual('text =');
    expect(valid.getText()).toContain('false');
  };
  //valida data       
  $scope.dtNasc = function () {
    setInput('');
    expect(value.getText()).toEqual('value =');
    expect(valid.getText()).toContain('myForm.input.$valid = false');
  };

///////////////////////////////////////////////////
  //funções chamadas no onClick dos botões da tela
  $scope.openInsertDialog = function () {
    resetAlertInfo();
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: "add_circle_outline",
      tituloDialog: "Cadastrar Cliente",
      cliente: {cpf: "", nome: "", sobrenome: "", email: "", usuario: "", dtNasc: "", foto: "", senha: "", titulo: "", telefone1: "", telefone2: "", dtCadastro: "", cep: "", logradouro: "", numero: "", complemento: "", localidade: "", bairro: "", uf: ""}
    }

    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formCliente.html',
      controller: 'ClienteDialogCtrl',
      backdrop: 'static',
      size: '', //sm, lg
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
    modalInstance.result.then(function (result) {
      if (result.cliente) {
        var msg = "";
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a cliente à lista
          $scope.clientes.push(angular.copy(result.cliente));
//                  $scope.$apply();
          msg = "Cliente " + result.cliente.nome + " cadastrado com sucesso!";
          setAlertInfo(msg, "success", "show");
        } else {//Senão mostra msg erro                  
          msg = "Erro ao cadastrar Cliente " + result.cliente.dsCurta + " !";
          setAlertInfo(msg, "danger", "show");
        }
      } else {
        setAlertInfo("formulário vazio ", "warning", "show");
      }
    }, function () {
      setAlertInfo("cancelado, dados perdidos", "warning", "show");
    });
  }

  $scope.openUpdateDialog = function (cliente, index) {
    resetAlertInfo();
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
        var msg = "";
//                setAlertInfo("dados submetidos - " + result.cliente.dsDetalhada, "success", "show");

        if (result.status == "sucesso") {//Se retorno da API com sucesso add a cliente à lista
          $scope.clientes[index] = result.cliente;
//                  $scope.$apply(); 
          var msg = "Cliente " + result.cliente.nome + " editado com sucesso!";
          setAlertInfo(msg, "success", "show");
        } else {//Senão mostra msg erro                  
          msg = "Erro ao editar Cliente " + result.cliente.nome + " !";
          setAlertInfo(msg, "danger", "show");
        }
      } else {
        setAlertInfo("formulário vazio ", "warning", "show");
      }
    }, function () {//quando é cancelado (dismiss)
      setAlertInfo("cancelado, dados perdidos", "warning", "show");
    });
  };

  $scope.openDesativarDialog = function (cliente, index) {
    resetAlertInfo();
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
              //metodo deleteCliente - passa a cliente por parâmetro para exclusão
              var msg = "Cliente " + cliente.nome + " desativado!";
              setAlertInfo(msg, "success", "show");
              $scope.$apply();//força atualização da variável $scope
              swal({
                title: msg,
                type: "success"
              });

            });
  };

  $scope.openInfoDialog = function (cliente) {
    resetAlertInfo();
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
        .controller('ClienteDialogCtrl', function ($scope, $http, params, $modalInstance) {
          $scope.formTipo = params.formTipo;
          $scope.iconeHeaderDialog = params.iconeHeaderDialog;
          $scope.tituloDialog = params.tituloDialog;
          $scope.cliente = params.cliente;


          $scope.clear = function () {
            delete $scope.cliente;
          };

          $scope.submit = function () {
            /*
             //chamar serviço API
             $http.post(WS.urlSGP+'cliente/', 
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

///////////////////////////////////////////////////

//                controla abas do formulario
//  $scope.steps = [
//    'Dados Pessoais',
//    'Dados Contato',
//    'Dados Localização'
//  ];
//  $scope.selection = $scope.steps[0];//esse indice que diz se sera comecar qual aba
//  $scope.getCurrentStepIndex = function () {
//    // Get the index of the current step given selection
//    return _.indexOf($scope.steps, $scope.selection);
//  };
//  // Go to a defined step index
//  $scope.goToStep = function (index) {
//    if (!_.isUndefined($scope.steps[index]))
//    {
//      $scope.selection = $scope.steps[index];
//    }
//  };
//  $scope.hasNextStep = function () {
//    var stepIndex = $scope.getCurrentStepIndex();
//    var nextStep = stepIndex + 1;
//    // Return true if there is a next step, false if not
//    return !_.isUndefined($scope.steps[nextStep]);
//  };
//  $scope.hasPreviousStep = function () {
//    var stepIndex = $scope.getCurrentStepIndex();
//    var previousStep = stepIndex - 1;
//    // Return true if there is a next step, false if not
//    return !_.isUndefined($scope.steps[previousStep]);
//  };
//  $scope.incrementStep = function () {
//    if ($scope.hasNextStep())
//    {
//      var stepIndex = $scope.getCurrentStepIndex();
//      var nextStep = stepIndex + 1;
//      $scope.selection = $scope.steps[nextStep];
//    }
//  };
//  $scope.decrementStep = function () {
//    if ($scope.hasPreviousStep())
//    {
//      var stepIndex = $scope.getCurrentStepIndex();
//      var previousStep = stepIndex - 1;
//      $scope.selection = $scope.steps[previousStep];
//    }
//  }
//                        fim da parde de controle de abas

});
