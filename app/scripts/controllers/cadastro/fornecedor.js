'use strict';
app.controller('FornecedorCtrl', function ($scope, $modal, $filter, PessoaResource, CONST, toastr, $stateParams, $httpParamSerializerJQLike) {
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Fornecedores";
  $scope.headerLista = "Nenhum fornecedor foi encontrado";
  $scope.labelCadastrarBtn = "Novo Fornecedor";

  toastr.warning(toastMsg, toastTitle);
//  carregarFornecedoresFront();
  carregarFornecedoresAPI();
 
  function carregarFornecedoresFront() {
    var pessoa = {id: "1", tipoPessoa: "pj", email: "email PJ1", telefone1: "tel 1 PJ1", telefone2: "tel 2 PJ1", imagem: "img/temp/imgFornecedor1.png", dtDesativacao: "", usuario: "User 1 PJ1", senha: "", permissao: ""};
    var pj = {razaoSocial: "razaoSocial PJ1", nomeFantasia: "nomeFantasia PJ1", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ1", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"};
    var endereco = {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
    var fornecedor1 = {pessoa: pessoa, pj: pj, endereco: endereco};
    
    pessoa = {id: "2", tipoPessoa: "pj", email: "email PJ2", telefone1: "tel 1 PJ2", telefone2: "tel 2 PJ2", imagem: "img/temp/imgFornecedor2.png", dtDesativacao: "", usuario: "User 2 PJ2", senha: "", permissao: ""};
    pj = {razaoSocial: "razaoSocial PJ2", nomeFantasia: "nomeFantasia PJ2", ramoAtividade: "Rótulos", cnpj: "000002", inscricaoEst: "2000000", dtAbertura: "02/02/2002", contato: "contato PJ2", tipo: "fornecedor", hrMinEntrega: "09:00", hrMaxEntrega: "17:00"};
    endereco = {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""};
    var fornecedor2 = {pessoa: pessoa, pj: pj, endereco: endereco};
    
    $scope.fornecedores = [
      fornecedor1,
      fornecedor2
    ];
  }

  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };

  toastr.info($stateParams.perfil);
    
  function carregarFornecedoresAPI() {
//    $scope.fornecedores = FornecedorResource.query();
    $scope.fornecedores = PessoaResource.listByPerfil({p:$httpParamSerializerJQLike({perfil:$stateParams.perfil})});
  }

  $scope.openInsertDialog = function () {
    $scope.fornecedor = new PessoaResource();
    $scope.fornecedor.perfil = $stateParams.perfil;
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: CONST.inserir.iconeHeaderDialog,
      tituloDialog: "Cadastrar Fornecedor",
      fornecedor: $scope.fornecedor
//      fornecedor: {
//        pessoa: {tipoPessoa: "pj", email: "", telefone1: "", telefone2: "", imagem: "", dtDesativacao: "", usuario: "", senha: "", permissao: ""},
//        pj: {razaoSocial: "", nomeFantasia: "", ramoAtividade: "", cnpj: "", inscricaoEst: "", dtAbertura: "", contato: "", tipo: "", hrMinEntrega: "", hrMaxEntrega: ""}, 
//        endereco: {cep: "", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""}
//      }
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
    modalInstance.result.then(function(result) {
      if (result.status == "sucesso") {//Se retorno da API com sucesso add a fornecedor à lista
        $scope.fornecedores.push(angular.copy(result.fornecedor));
//                  $scope.$apply();
//          toastMsg = "Fornecedor " + result.fornecedor.pj.nomeFantasia + " cadastrado com sucesso!";
//          toastr.success(toastMsg, "successo");
      } else {//Senão mostra msg erro                  
//          toastMsg = "Erro ao cadastrar Fornecedor " + result.fornecedor.pj.nomeFantasia + " !";
//          toastr.errror(toastMsg, "erro");
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
    modalInstance.result.then(function (result) {//quando foi fechado enviando dados
      if (result.fornecedor) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a fornecedor à lista
          $scope.fornecedores[index] = result.fornecedor;
//                  $scope.$apply(); 
//          toastMsg = "Fornecedor " + result.fornecedor.nome + " editado com sucesso!";
//          toastr.success(toastMsg, "sucesso");
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
        $scope.fornecedores[index] = fornecedor;
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

})
.controller('FornecedorDialogCtrl', function ($scope, $modalInstance, $http, params, CONST, toastr) {

  $scope.init = function () {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
//    if (params.fornecedor) {      
//      
//      $scope.fornecedor = angular.copy(params.fornecedor);
//      
//      console.log("params.fornecedor");
//      console.log(params.fornecedor);
////      $scope.fornecedor = params.fornecedor;      
//      console.log("scope.fornecedor");
//      console.log($scope.fornecedor);
////      $scope.fornecedorInit = angular.copy($scope.fornecedor);
////      console.log("fornecedorInit");
////      console.log($scope.fornecedorInit);
//    } else {
//      //        $scope.fornecedor = new FornecedorResource();
//      
//    }
    
    $scope.fornecedor = angular.copy(params.fornecedor);
    $scope.fornecedorInit = angular.copy(params.fornecedor);
    
      
    $scope.sexos = [
      {nome: "Masculino", valor: "masculino"},
      {nome: "Feminino", valor: "feminino"}
    ];
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

  $scope.clear = function () {
    $scope.fornecedor = angular.copy($scope.fornecedorInit);
  };

/*
modalInstance.result.then(function(result) {
      if (result.fornecedor) {
        if (result.status == "sucesso") {//Se retorno da API com sucesso add a fornecedor à lista
          $scope.fornecedores.push(angular.copy(result.fornecedor));
//                  $scope.$apply();
          toastMsg = "Fornecedor " + result.fornecedor.nome + " cadastrado com sucesso!";
          toastr.success(toastMsg, "successo");
        } else {//Senão mostra msg erro                  
          toastMsg = "Erro ao cadastrar Fornecedor " + result.fornecedor.dsCurta + " !";
          toastr.errror(toastMsg, "erro");
        }
      } else {
        toastr.warning("Formulário em branco", "Não cadastrado!");
      }
    }, function () {
      toastr.warning("Nada aconteceu", "Cancelado");
    });
    */

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
    //pegar retorno API e definir padrão p/ result
    //
//    $modalInstance.close({
//      fornecedor: $scope.fornecedor,
//      status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
////                            fornecedor: response.data,
////                            status: response.status
//    });
  };
  
  $scope.close = function(result){
    $modalInstance.close(result);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


  // controle abas
  $scope.steps = [
    'Passo 1 - Dados Gerais',
    'Passo 2 - Dados Pessoa Jurídica', // apenas pj em fornecedor
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
