'use strict';
app.controller('ReceitaCtrl', function ($scope, $modal, $filter, ReceitaResource, InsumoResource, CONST, toastr, $httpParamSerializerJQLike) {
  
  var toastMsg = "";
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Receitas dos Produtos";
  $scope.headerLista = "Nenhuma Receita foi encontrada";
  $scope.labelCadastrarBtn = "Nova Receita";
  
  $scope.atualizarLista = function(){
    $scope.receitas = ReceitaResource.query();
    //incluir spinner enquanto esta carregando a lista
  };
  
  $scope.ordenar = function (campo) {
    $scope.campo = campo;
    $scope.ascDsc = !$scope.ascDsc;
  };  
  
  //funções chamadas no onClick dos botões da tela
  $scope.openInsertDialog = function () {
    $scope.params = {
      formTipo: 'insert',
      iconeHeaderDialog: CONST.inserir.iconeHeaderDialog,
      tituloDialog: "Cadastrar Receita",
      insumos: InsumoResource.query(),
      receita: new ReceitaResource()
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formReceita.html',
      controller: 'ReceitaDialogCtrl',
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
//        $scope.receitas[index] = result.receita;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };

  $scope.openUpdateDialog = function (receita) {    
//    index = $scope.receitas.indexOf($filter('filter')($scope.receitas, receita, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Receita",
      insumos: InsumoResource.query(),
      receita: angular.copy(receita)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formReceita.html",
      controller: "ReceitaDialogCtrl",
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
//        $scope.receitas[index] = result.receita;
        $scope.atualizarLista();
//        scope.$apply(); 
      } 
    });
  };
  
  $scope.openAtivarDesativarDialog = function (receita) {
//    index = $scope.receitas.indexOf($filter('filter')($scope.receitas, receita, true)[0]);    
    swal({
      title: "Deseja mesmo" + (receita.dtDesativacao ? " ativar" : " desativar") + " a Receita " + receita.nome + "?",
      text: "Você poderá" + (receita.dtDesativacao ? " desativar" : " ativar") + " a Receita novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (receita.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
      var receitaCopy = angular.copy(receita);
      receitaCopy.dtDesativacao = (receita.dtDesativacao ? null : $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      receitaCopy.$update(
      function(){
        $scope.atualizarLista();
        toastMsg = receita.nome + (receita.dtDesativacao ? " ativada!" : " desativada!");
        toastr.success(toastMsg, "Sucesso!");
      }, function(){
        toastMsg = receita.nome + " não foi " + (receita.dtDesativacao ? "ativada!" : "desativada!");
        toastr.error(toastMsg, "Erro!");
      });
    });    
  };

  $scope.openInfoDialog = function (receita) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Receita",
      receita: angular.copy(receita)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoReceita.html",
      controller: "ReceitaDialogCtrl",
      backdrop: 'static',
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  };
  
  $scope.openItemReceitaDialog = function(receita, item){
    var itemResource;
    var templateUrl;
    switch(item){
      case 'insumo':
        itemResource = InsumoResource.query();
        templateUrl = "views/cadastro/dialog/formInsumoReceita.html";
        break;
      case 'selo':
        itemResource = SeloResource.query();
        templateUrl = "views/cadastro/dialog/formSeloReceita.html";
        break;
      case 'embalagem':
        itemResource = EmbalagemResource.query();
        templateUrl = "views/cadastro/dialog/formEmbalagemReceita.html";
        break;
      case 'rotulo':
        itemResource = RotuloResource.query();
        templateUrl = "views/cadastro/dialog/formRotuloReceita.html";
        break;
    }
    $scope.params = {
      formTipo: 'lookup',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Lookup " + item,
      receita: angular.copy(receita),
      item: item,
      itemResource: itemResource
    };
    var modalInstance = $modal.open({
      templateUrl: templateUrl,
      controller: "ReceitaDialogCtrl",
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
  
  $scope.atualizarLista();
  
})
  .controller('ReceitaDialogCtrl', function ($scope, $modal, $filter, $modalInstance, params, CONST, toastr) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    $scope.insumosAll = params.insumos;
          
    $scope.receita = params.receita;
    $scope.receitaInit = angular.copy($scope.receita);
    if(!$scope.receita.insumosReceita){
      $scope.receita.insumosReceita = [];
    }
    
    $scope.temp = {};
//    $scope.temp.insumosReceita = $scope.receitaInit.insumosReceita;
    $scope.temp.insumosReceita = [];
    
    angular.forEach($scope.receitaInit.insumosReceita, 
    function(insumoReceita){
      $scope.temp.insumosReceita.push(insumoReceita.insumo);
    });

//    $scope.form = [];
    
//    $scope.form = {
//       insumos : []
//    }
    
//    $scope.$watch("receita.insumosReceita",function(){
//      angular.forEach($scope.receita.insumosReceita,function(v){
//        var ins = {
//          insumo : v,
//          quantidade : 0
//        }
//        console.log(ins);
//          $scope.form.insumos.push(ins);
//      });
//    });
// 
    $scope.addInsumoReceita = function(insumo){
      var insumoReceita = {
        insumo : insumo,
        quantidade : null
      };
      $scope.receita.insumosReceita.push(insumoReceita);
      //colocar focus na qtd do ultimo elemento
    };
    
    $scope.removeInsumoReceita = function(insumo){
      angular.forEach($scope.receita.insumosReceita, function(insumoReceita){
        if(insumoReceita.insumo.id === insumo.id){
          $scope.receita.insumosReceita.splice($scope.receita.insumosReceita.indexOf(insumoReceita), 1);
//          $scope.atualizarLista();
          return;
        }
      });
    };
    
    $scope.atualizarLista = function(){ //corrigir function pra permitir remover insumo pela tabela
      $scope.temp.insumosReceita = $scope.receita.insumosReceita;
    };
    
    if(!$scope.receita.passos){
      $scope.receita.passos = [];
    }
    
    $scope.ordenar = function (campo) {
      $scope.campo = campo;
      $scope.ascDsc = !$scope.ascDsc;
    };
    
    $scope.addPasso = function(){
      var passo = {
        ordem: $scope.receita.passos ? $scope.receita.passos.length+1 : 1,
        nome: "",
        descricao: ""
      };
      $scope.receita.passos.push(passo);
    };
    
    $scope.removerPasso = function(indexToRemove){
      $scope.receita.passos.splice(indexToRemove, 1);
      angular.forEach($scope.receita.passos, function(passo, passoIndex){
        if(passoIndex >= indexToRemove){
         passo.ordem = passo.ordem - 1;
        }
      });
    };
    
    $scope.passoSwap = function(curIndex, newIndex){
      var passoTemp = angular.copy($scope.receita.passos[curIndex]);
      $scope.receita.passos[curIndex].nome = $scope.receita.passos[newIndex].nome;
      $scope.receita.passos[curIndex].descricao = $scope.receita.passos[newIndex].descricao;
      $scope.receita.passos[newIndex].nome = passoTemp.nome;
      $scope.receita.passos[newIndex].descricao = passoTemp.descricao;
    };
    
    $scope.openImagemDialog = function(){      
      $scope.params = {
        formTipo: $scope.formTipo,
        iconeHeaderDialog: $scope.receita.imagens ? CONST.editar.iconeHeaderDialog : CONST.inserir.iconeHeaderDialog,
        tituloDialog: $scope.receita.imagens ? "Editar Imagem" : "Cadastrar Imagem",
        imagemInit: angular.copy(params.receita.imagens ? params.receita.imagens[0] : null)
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
      modalInstance.result.then(function (imagemNova){
        $scope.receita.imagens = [imagemNova];
      }, function(){
        toastr.warning("A imagem não foi registrada");
      });
    };
    
    $scope.submit = function () {
      if ($scope.formTipo == 'insert') { //insert
        $scope.receita.$save(function(){
          var toastMsg = "Receita " + $scope.receita.nome + " cadastrada com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            receita: $scope.receita, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Receita " + $scope.receita.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.receita.$update(function(){
          var toastMsg = "Receita " + $scope.receita.nome + " editada com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            receita: $scope.receita, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Receita " + $scope.receita.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    $scope.steps = [
      'Passo 1 - Dados Receita',
      'Passo 2 - Ingredientes',
      'Passo 3 - Instruções'
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
      $scope.receita = angular.copy($scope.receitaInit);      
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
