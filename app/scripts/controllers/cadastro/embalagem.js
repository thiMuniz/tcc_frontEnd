'use strict';
app.controller('EmbalagemCtrl', function ($scope, $modal, $filter, EmbalagemResource, PessoaResource, CONST, toastr) {
  
  var toastTitle = "";
  var toastMsg = "";
  var index;
  $scope.CONST = CONST;
  $scope.tituloView = "Cadastro de Embalagens dos Produtos";
  $scope.headerLista = "Nenhuma embalagem foi encontrada";
  $scope.labelCadastrarBtn = "Nova Embalagem";
  
  $scope.atualizarLista = function(){
    $scope.embalagens = EmbalagemResource.query();
/*
    $scope.embalagens = [
    { id: "1", nome: "emb 1", descricao: "Detalhes da emb 1", 
      imagem:{
        id:"",
        arquivo:"img/temp/embalagem_papel_kraft_1.jpg",
        principal:""
      }, 
      fornecedores:[
        {id: "1", tipoPessoa: "pj", email: "email PJ1", telefone1: "tel 1 PJ1", telefone2: "tel 2 PJ1", imagem: "img/temp/imgFornecedor1.png", dtDesativacao: "1", usuario: "User 1 PJ1", senha: "", permissao: "",
          pj: {razaoSocial: "razaoSocial PJ1", nomeFantasia: "nomeFantasia PJ1", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ1", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"},
          endereco: {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""}},
        {id: "2", tipoPessoa: "pj", email: "email PJ2", telefone1: "tel 1 PJ2", telefone2: "tel 2 PJ2", imagem: "img/temp/imgFornecedor2.png", dtDesativacao: "1", usuario: "User 2 PJ2", senha: "", permissao: "",
          pj: {razaoSocial: "razaoSocial PJ2", nomeFantasia: "nomeFantasia PJ2", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ2", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"},
          endereco: {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""}},
        {id: "3", tipoPessoa: "pj", email: "email PJ3", telefone1: "tel 1 PJ3", telefone2: "tel 2 PJ3", imagem: "img/temp/imgFornecedor3.png", dtDesativacao: "1", usuario: "User 3 PJ3", senha: "", permissao: "",
          pj: {razaoSocial: "razaoSocial PJ3", nomeFantasia: "nomeFantasia PJ3", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ3", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"},
          endereco: {cep: "83040", logradouro: "", numero: "", complemento: "", bairro: "", localidade: "", uf: ""}},
    ]},
    {id: "2", nome: "emb 2", descricao: "Detalhes da emb 2", 
      imagem:{
        id:"",
        arquivo:"img/temp/embalagem_papelao_1.jpg",
        principal:""
      }, 
      fornecedores:[
        {razaoSocial: "razaoSocial PJ1", nomeFantasia: "nomeFantasia PJ1", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ1", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"},
        {razaoSocial: "razaoSocial PJ2", nomeFantasia: "nomeFantasia PJ2", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ2", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"},
        {razaoSocial: "razaoSocial PJ3", nomeFantasia: "nomeFantasia PJ3", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ3", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"}
    ]},
    {id: "3", nome: "emb 3", descricao: "Detalhes da emb 3", 
      imagem:{
        id:"",
        arquivo:"img/temp/embalagem_polietileno_1.jpg",
        principal:""
      }, 
      fornecedores:[
        {razaoSocial: "razaoSocial PJ1", nomeFantasia: "nomeFantasia PJ1", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ1", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"},
        {razaoSocial: "razaoSocial PJ2", nomeFantasia: "nomeFantasia PJ2", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ2", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"},
        {razaoSocial: "razaoSocial PJ3", nomeFantasia: "nomeFantasia PJ3", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ3", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"}
    ]},
    {id: "4", nome: "emb 4", descricao: "Detalhes da emb 4", imagem:{
        id:"",
        arquivo:"img/temp/embalagem_polipropileno_1.jpg",
        principal:""
      }, 
      fornecedores:[
        {razaoSocial: "razaoSocial PJ1", nomeFantasia: "nomeFantasia PJ1", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ1", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"},
        {razaoSocial: "razaoSocial PJ2", nomeFantasia: "nomeFantasia PJ2", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ2", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"},
        {razaoSocial: "razaoSocial PJ3", nomeFantasia: "nomeFantasia PJ3", ramoAtividade: "Embalagens", cnpj: "000001", inscricaoEst: "1000000", dtAbertura: "01/01/2001", contato: "contato PJ3", tipo: "fornecedor", hrMinEntrega: "08:00", hrMaxEntrega: "18:00"}
    ]}
  ];    
  */
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
      tituloDialog: "Cadastrar Embalagem",
      embalagem: new EmbalagemResource()
    };
    var modalInstance = $modal.open({
      templateUrl: 'views/cadastro/dialog/formEmbalagem.html',
      controller: 'EmbalagemDialogCtrl',
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

  $scope.openUpdateDialog = function (embalagem) {    
//    index = $scope.embalagens.indexOf($filter('filter')($scope.embalagens, embalagem, true)[0]);    
    $scope.params = {
      formTipo: 'update',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Editar Embalagem",
      embalagem: angular.copy(embalagem)
    };

    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/formEmbalagem.html",
      controller: "EmbalagemDialogCtrl",
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
  
  $scope.openAtivarDesativarDialog = function (embalagem) {
    swal({
      title: "Deseja mesmo" + (embalagem.dtDesativacao ? " ativar" : " desativar") + " a Embalagem " + embalagem.nome + "?",
      text: "Você poderá" + (embalagem.dtDesativacao ? " desativar" : " ativar") + " a Embalagem novamente!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: (embalagem.dtDesativacao ? "#428bca" : "#DD6B55"), //#f0ad4e
      cancelButtonText: "NÃO",
      confirmButtonText: "SIM"
    },
    function () {
//      embalagem.dtDesativacao = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
      embalagem.dtDesativacao = (embalagem.dtDesativacao ? null : new Date());
      EmbalagemResource.update(embalagem, function(){
//          $scope.embalagens[index] = embalagem;
          $scope.atualizarLista();
          toastMsg = embalagem.nome + (embalagem.dtDesativacao ? " desativada!" : " ativada!");
          toastr.success(toastMsg, "Sucesso!");
        }, function(){
          toastMsg = embalagem.nome + " não foi " + (embalagem.dtDesativacao ? "ativada!" : "desativada!");
          toastr.error(toastMsg, "Erro!");
        });
    });    
  };

  $scope.openInfoDialog = function (embalagem) {    
    $scope.params = {
      formTipo: 'info',
      iconeHeaderDialog: CONST.info.iconeHeaderDialog,
      tituloDialog: "Detalhes Embalagem",
      embalagem: angular.copy(embalagem)
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/infoEmbalagem.html",
      controller: "EmbalagemDialogCtrl",
      backdrop: 'static',
      size: 'lg',
      resolve: {
        params: function () {
          return $scope.params;
        }
      }
    });
  };
  
  $scope.openFornecedorEmbalagemDialog = function(embalagem){
//    index = $scope.fornecedores.indexOf($filter('filter')($scope.fornecedores, fornecedor, true)[0]);
    $scope.params = {
      formTipo: 'lookup',
      iconeHeaderDialog: CONST.editar.iconeHeaderDialog,
      tituloDialog: "Lookup Fornecedor",
      embalagem: embalagem
    };
    var modalInstance = $modal.open({
      templateUrl: "views/cadastro/dialog/listFornecedorEmbalagem.html",
      controller: "EmbalagemDialogCtrl",
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
  
  $scope.atualizarLista();
  
})
  .controller('EmbalagemDialogCtrl', function ($scope, $modal, $modalInstance, params, CONST, EmbalagemResource, PessoaResource, toastr, $http) {
    $scope.CONST = CONST;
    $scope.formTipo = params.formTipo;
    $scope.iconeHeaderDialog = params.iconeHeaderDialog;
    $scope.tituloDialog = params.tituloDialog;
    
    $scope.embalagem = params.embalagem;
    $scope.embalagemInit = angular.copy($scope.embalagem);
    
    $scope.materiais = [
      {nome: "PE - Polietileno", tipo: "Plástico"},
      {nome: "PP - Polipropileno", tipo: "Plástico"},
      {nome: "PC - Papel Clabin", tipo: "Papel"},
      {nome: "PG - Papel Gordura", tipo: "Papel"}
    ];
    
    $scope.openImagemDialog = function(){
      $scope.params = {
        formTipo: $scope.formTipo,
        iconeHeaderDialog: $scope.embalagem.imagens ? CONST.editar.iconeHeaderDialog : CONST.inserir.iconeHeaderDialog,
        tituloDialog: $scope.embalagem.imagens ? "Editar Imagem" : "Cadastrar Imagem",
        imagemInit: angular.copy(params.embalagem.imagens ? params.embalagem.imagens[0] : null)
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
        $scope.embalagem.imagens = [imagemNova];
      }, function(){
        toastr.warning("Imagem não recebida", "Atenção");
      });
    };    
    
    $scope.submit = function () {
      if ($scope.formTipo == 'insert') { //insert
        $scope.embalagem.$save(function(){
          var toastMsg = "Embalagem " + $scope.embalagem.nome + " cadastrada com sucesso!";
          toastr.success(toastMsg, "successo");
          var result = {
            embalagem: $scope.embalagem, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao cadastrar Embalagem " + $scope.embalagem.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      } else { //update
        $scope.embalagem.$update(function(){
          var toastMsg = "Embalagem " + $scope.embalagem.nome + " editada com sucesso!";
          toastr.success(toastMsg, "Sucesso");
          var result = {
            embalagem: $scope.embalagem, 
            status: "sucesso"
          };
          $scope.close(result);
        }, function(){
          var toastMsg = "Erro ao editar Embalagem " + $scope.embalagem.nome;
          toastr.error(toastMsg, "Erro");
          var result = {
            status: "erro"
          };
          $scope.close(result);
        });
      }
    };
    
    $scope.clear = function () {
      $scope.embalagem = angular.copy($scope.embalagemInit);
    };
    
    $scope.close = function(result){
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
    
  });

