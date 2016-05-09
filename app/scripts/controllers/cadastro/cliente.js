'use strict';
app.controller('ClienteCtrl', function ($scope, $modal, $filter, PessoaResource, CONST, toastr, $stateParams, $httpParamSerializerJQLike) {
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

//  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Clientes";
  $scope.headerLista = "Nenhum cliente foi encontrado";
  $scope.labelCadastrarBtn = "Novo Cliente";

  toastr.warning(toastMsg, toastTitle);
//  carregarClientesFront();
//  carregarClientesAPI();
 
//  function carregarClientesFront() {
//    var pessoa = {id: "1", tipoPessoa: "pf", email: "email PF", telefone1: "tel 1 PF", telefone2: "tel 2 PF", imagem: "img/adm/AdmThiagoMM.jpg", dtDesativacao: "", usuario: "User 1 PF", senha: "", permissao: ""};
//    var pf = {nome: "nome Pf", sobrenome: "sobrenome PF", rg: "000001", cpf: "1000000", dtNascimento: "01/01/2001"};    
//    var endereco = {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
//    var cliente1 = {pessoa: pessoa, pf: pf, endereco: endereco};
//    
//    pessoa = {id: "2", tipoPessoa: "pj", email: "email PJ", telefone1: "tel 1 PJ", telefone2: "tel 2 PJ", imagem: "img/adm/AdmEvertonWB.jpg", dtDesativacao: "", usuario: "User 2 PJ", senha: "", permissao: ""};
//    var pj = {razaoSocial: "razaoSocial PJ", nomeFantasia: "nomeFantasia PJ", ramoAtividade: "ramo ativ. PJ", cnpj: "000002", inscricaoEst: "2000000", dtAbertura: "02/02/2002", contato: "contato PJ", tipo: "cliente", hrMinEntrega: "09:00", hrMaxEntrega: "17:00"};
//    endereco = {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
//    var cliente2 = {pessoa: pessoa, pj: pj, endereco: endereco};
//    
//    $scope.clientes = [
//      cliente1,
//      cliente2
//    ];
//  }

  $scope.atualizarLista = function(){
//    $scope.clientes = ClienteResource.query();
    $scope.clientes = PessoaResource.listByPerfil({p:$httpParamSerializerJQLike({perfil:$stateParams.perfil})});
  }
  
  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };  

  $scope.openInsertDialog = function () {
    $scope.cliente = new PessoaResource();
    $scope.cliente.perfil = $stateParams.perfil;
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: CONST.inserir.iconeHeaderDialog,
      tituloDialog: "Cadastrar Cliente",
            cliente: $scope.cliente
//      cliente: {
//        pessoa: {tipoPessoa: "pj", email: "", telefone1: "", telefone2: "", imagem: "", dtDesativacao: "", usuario: "", senha: "", permissao: ""},
//        pf: {nome: "", sobrenome: "", rg: "", cpf: "", dtNascimento: ""},
//        pj: {razaoSocial: "", nomeFantasia: "", ramoAtividade: "", cnpj: "", inscricaoEst: "", dtAbertura: "", contato: "", tipo: "", hrMinEntrega: "", hrMaxEntrega: ""}, 
//        endereco: {cep: "", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""}
//      }
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
      if (result.status == "sucesso") {
//        $scope.rotulos[index] = result.rotulo;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };

  $scope.openUpdateDialog = function (cliente) {
//    index = $scope.clientes.indexOf($filter('filter')($scope.clientes, cliente, true)[0]);
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
    modalInstance.result.then(function (result) {
      if (result.status == "sucesso") {
//        $scope.rotulos[index] = result.rotulo;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };

  $scope.openAtivarDesativarDialog = function (cliente) {
//    index = $scope.clientes.indexOf($filter('filter')($scope.clientes, cliente, true)[0]);
    swal({
      title: "Deseja mesmo" + (cliente.dtDesativacao ? " ativar" : " desativar") + " o cliente " + (cliente.pf ? cliente.pf.nome : cliente.pj.nomeFantasia) + "?",
      text: "Você poderá" + (cliente.dtDesativacao ? " desativar" : " ativar") + " o cliente novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (cliente.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
//      $scope.clientes.splice(index, 1);
//      cliente.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
//      cliente.dtDesativacao = new Date();
      cliente.dtDesativacao = (cliente.dtDesativacao ? null : new Date());
      ClienteResource.update(cliente, function () {
//        $scope.clientes[index] = cliente;
        $scope.atualizarLista();
        toastMsg = (cliente.pf ? cliente.pf.nome : cliente.pj.nomeFantasia) + (cliente.dtDesativacao ? " desativado!" : " ativado!");
        toastr.success(toastMsg, "Sucesso!");
      }, function () {
        toastMsg = (cliente.pf ? cliente.pf.nome : cliente.pj.nomeFantasia) + " não foi " + (cliente.dtDesativacao ? "ativado!" : "desativado!");
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
  
  $scope.atualizarLista();

})
.controller('ClienteDialogCtrl', function ($scope, $modal, $modalInstance, $http, params, CONST, toastr) {
  $scope.tipoPessoa;

  $scope.CONST = CONST;
  $scope.formTipo = params.formTipo;
  $scope.iconeHeaderDialog = params.iconeHeaderDialog;
  $scope.tituloDialog = params.tituloDialog;
  $scope.abaPF = 'Passo 2 - Dados Pessoa Física';
  $scope.abaPJ = 'Passo 2 - Dados Pessoa Jurídica';

  $scope.cliente = angular.copy(params.cliente);
  $scope.clienteInit = angular.copy(params.cliente);

  $scope.sexos = [
    {nome: "Masculino", valor: "masculino"},
    {nome: "Feminino", valor: "feminino"}
  ];
  
  $scope.initAbas = function () {
    $scope.isPf = $scope.cliente.pj ? false : true;
    $scope.setAbaPfPj();
  };
    
  $scope.toogleTipoPessoa = function () {
    console.log($scope.tipoPessoa);
    $scope.isPf = !$scope.isPf;
    $scope.setAbaPfPj();
  };
  
  $scope.setAbaPfPj = function(){
    if($scope.isPf){
      delete $scope.cliente.pj;
      $scope.tipoPessoa = "pf";
      $scope.cliente.pf = $scope.clienteInit.pf;
      $scope.steps[1] = $scope.abaPF;
    }else{
      delete $scope.cliente.pf;
      $scope.tipoPessoa = "pj";
      $scope.cliente.pj = $scope.clienteInit.pj;
      $scope.steps[1] = $scope.abaPJ;
    }
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
    expect(valid.getText()).toContain('formCliente.input.$valid = false');
  };

  $scope.carregarCep = function () {
    $http.get(CONST.ws.urlCep + $scope.cliente.endereco.cep + '/json/'
            ).success(function (endereco) {
      $scope.cliente.endereco = endereco;
    }).error(function (endereco) {
      console.log("deu ruim - endereco" + endereco);
    });
  };
  
  $scope.openImagemDialog = function(){
    $scope.params = {
      formTipo: $scope.formTipo,
      iconeHeaderDialog: $scope.cliente.imagem ? CONST.editar.iconeHeaderDialog : CONST.inserir.iconeHeaderDialog,
      tituloDialog: $scope.cliente.imagem ? "Editar Imagem" : "Cadastrar Imagem",
      imagemInit: angular.copy(params.cliente.imagem ? params.cliente.imagem : null)
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
    modalInstance.result.then(function (imagemNova) {
      toastr.success("Imagem recebida", "Sucesso");
      $scope.cliente.imagem = imagemNova;
    }, function(){
      toastr.warning("Imagem não recebida", "Atenção");
    });
  };
  
  $scope.submit = function () {
    if ($scope.formTipo == 'insert') { //insert
      $scope.cliente.$save(function(){
        var toastMsg = "Cliente " + ($scope.cliente.pf ? $scope.cliente.pf.nome : $scope.cliente.pj.nomeFantasia) + " cadastrado com sucesso!";
        toastr.success(toastMsg, "successo");
        var result = {
          cliente: $scope.cliente, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao cadastrar Cliente " + ($scope.cliente.pf ? $scope.cliente.pf.nome : $scope.cliente.pj.nomeFantasia);
        toastr.error(toastMsg, "Erro");
        var result = {
          status: "erro"
        };
        $scope.close(result);
      });
    } else { //update
      $scope.cliente.$update(function(){
        var toastMsg = "Cliente " + ($scope.cliente.pf ? $scope.cliente.pf.nome : $scope.cliente.pj.nomeFantasia) + " editado com sucesso!";
        toastr.success(toastMsg, "Sucesso");
        var result = {
          cliente: $scope.cliente, 
          status: "sucesso"
        };
        $scope.close(result);
      }, function(){
        var toastMsg = "Erro ao editar Cliente " + ($scope.cliente.pf ? $scope.cliente.pf.nome : $scope.cliente.pj.nomeFantasia);
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
  
  $scope.clear = function () {
    $scope.cliente = angular.copy($scope.clienteInit);
  };
  
  $scope.close = function(result){
    $modalInstance.close(result);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
