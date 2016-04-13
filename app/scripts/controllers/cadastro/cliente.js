'use strict';
//angular.module('sbAdminApp')
app.controller('ClienteCtrl', function ($scope, $modal, ClienteResource, CONST, toastr) {
  var toastTitle = "Bem vindo programador!!";
  var toastMsg = "Boa sorte dessa vez...";

  $scope.titulo = "Cadastro Cliente";
  $scope.headerLista = "Nenhum cliente foi encontrado";
  $scope.labelAddBtnPf = "Novo Cliente PF";
  $scope.labelAddBtnPj = "Novo Cliente PJ";
  
  

  toastr.warning(toastMsg, toastTitle);
  toastr.info(CONST.ws.urlSGP + 'cliente/', "urlSGP");
  carregarClientesFront();

//tipo pessoa fica em pessoa
//pf(cpf,rg,nome,sobrenome,titulo, dtNasc)]
//pj(cnpj, inscricaoEst,razaoSocial,nomeFantasia,contato,tipo,hrMinEntrega,hrMaxEntrega)
//local=dados endereco
$scope.pf= {cpf: "000000090909",rg:"", nome: "pessoa1", sobrenome: "silva1",titulo: "", dtNascimento: new Date()};
$scope.pj= {cnpj:"", inscricaoEst:"",razaoSocial:"",nomeFantasia:"",contato:"",tipo:"",hrMinEntrega:"",hrMaxEntrega:""};
$scope.local= {cep: "92839392", logradouro: "rua 1", numero: "1", complemento: "a", localidade: "b", bairro: "c", uf: "d"};
$scope.tipoPessoa={tipo:""};
  function carregarClientesFront() {
    $scope.clientes = [
      { pf: $scope.pf,
        pj: $scope.pj,
        tipoPessoa: $scope.tipoPessoa,
        email: "email@text1", usuario: "user1", foto: "", senha: "",  telefone1: "29372837293", telefone2: "29372987293", dtCadastro: new Date(),
        local: $scope.local}
    ];
  }


  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };

//  console.log(CONST.ws.urlSGP + 'cliente/');


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


  $scope.openInsertDialog = function () {
   
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: "add_circle_outline",
      tituloDialog: "Cadastrar Cliente",
      cliente: {tipo:"",cpf: "", nome: "", sobrenome: "", email: "", usuario: "", dtNascimento: "", foto: "", senha: "", titulo: "", telefone1: "", telefone2: "", dtCadastro: "",local:{ cep: "", logradouro: "", numero: "", complemento: "", localidade: "", bairro: "", uf: ""}}
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
.controller('ClienteDialogCtrl', function ($scope, params, $modalInstance, CONST, toastr) {
  $scope.formTipo = params.formTipo;
  $scope.iconeHeaderDialog = params.iconeHeaderDialog;
  $scope.tituloDialog = params.tituloDialog;
  $scope.cliente = params.cliente;
          
          
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
          
// $scope.$watch('files', function () {
//        $scope.upload($scope.files);
//    });
//    $scope.$watch('file', function () {
//        if ($scope.file != null) {
//            $scope.files = [$scope.file]; 
//        }
//    });
//    $scope.log = '';
//
//    $scope.upload = function (files) {
//       
//      if (files && files.length) {
//            for (var i = 0; i < files.length; i++) {
//              var file = files[i];
//              if (!file.$error) {
//                console.log(file); 
////                 $scope.testeFoto=file;
////                 console.log(testeFoto);
//            Upload.upload({
////                  $http.post('/api/affiche').success(function(data){
//                    url:"$location..path();",
////                    url:'https://angular-file-upload-cors-srv.appspot.com/upload',
//                    data: {
////                      username: $scope.username,
//                      file:  file  
//                    }
//                    
//                }).then(function (resp) {
//                    $timeout(function() {
//                     
//                     $scope.cliente.foto=resp.config.data.file;
//                        $scope.log = 'file: ' +
//                        resp.config.data.file.name +
//                        ', Response: ' + JSON.stringify(resp.data) +
//                        '\n' + $scope.log;
//                
//                    });
//                }, null, function (evt) {
//                    var progressPercentage = parseInt(100.0 *
//                    		evt.loaded / evt.total);
//                    $scope.log = 'progress: ' + progressPercentage + 
//                    	'% ' + evt.config.data.file.name + '\n' + 
//                      $scope.log;
//                });
//              }
//            }
//        }
//    };          
//        

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
               
          
     
//                controla abas do formulario
             $scope.steps = [
            'Dados Pessoa Fisica',
            'Dados Contato',
            'Dados Localização'
          ] 
          $scope.selection = $scope.steps[0];//esse indice que diz se sera comecar qual aba
          $scope.getCurrentStepIndex = function () {
            // Get the index of the current step given selection
            return _.indexOf($scope.steps, $scope.selection);
          };
          // Go to a defined step index
//          $scope.goToStep = function (index) {
//            if (!_.isUndefined($scope.steps[index]))
//            {
//              $scope.selection = $scope.steps[index];
//            }
//          };
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
//                        fim da parde de controle de abas

        });
