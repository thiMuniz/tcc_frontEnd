'use strict';
angular.module('sbAdminApp')
  .controller('CategoriaCtrl', function($scope,$position) {
        $scope.titulo = "Cadastro de Categorias dos Produtos" ;
        $scope.headerLista = "Nenhuma categoria foi encontrada";
        $scope.labelAddBtn = "Nova Categoria";
        
        //setar categorias no método $scope.read()
        $scope.categorias = [
            {id:"1",dsCurta:"Pães",dsDetalhada:"Detalhes da Categoria 1"},
            {id:"2",dsCurta:"Biscoitos Doces Açúcar",dsDetalhada:"Detalhes da Categoria 2"},
            {id:"3",dsCurta:"Biscoitos Doces Adoçante",dsDetalhada:"Detalhes da Categoria 3"},
            {id:"4",dsCurta:"Biscoitos Salgados",dsDetalhada:"Detalhes da Categoria 4"},
            {id:"5",dsCurta:"Panetones",dsDetalhada:"Detalhes da Categoria 5"},
        ];
        //$scope.categorias = CategoriaResource.query();
        
        var cont = 5; //contador recebe o numero de resultados da query
//        if(se cont > 0){
            $scope.headerLista = cont+" Categorias encontradas";
//        }   

        $scope.openDialog = function(clickEvent,selectedCategoria){
            var acao = clickEvent.currentTarget.getAttribute("data-id");
            
            switch(acao){
                case 'inserir':
                    $scope.iconeFormModal = "add_circle_outline";
                    $scope.tituloModal = "Cadastrar Categoria"; 
                    $scope.categoria = {id:"",dsCurta:"",dsDetalhada:""};
                    break;
                    
                case 'editar':
                    $scope.iconeFormModal = "edit";
                    $scope.tituloModal = "Editar Categoria"; 
                    $scope.categoria = selectedCategoria;
                    break;
                    
                case 'desativar':
                    swal({
                        title: "Deseja mesmo desativar a Categoria "+selectedCategoria.dsCurta+"?",
                        text: "Você poderá ativar a Categoria novamente!",
                        type: "warning",                        
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        cancelButtonText: "Não, me tire daqui!",
                        confirmButtonText: "Sim, quero desativar!",
                        closeOnConfirm: false}, 
                        function(){                             
                            //metodo deleteCategoria - passa a categoria por parâmetro para exclusão
                            
                            swal({
                                title: "Categoria desativada!", 
                                type: "success"
                            });                            
                        });
                    break;
                    
                case 'info':
                    $scope.tituloModal = "Detalhes Categoria"; 
                    $scope.categoria = selectedCategoria;
                    break;
                    
                default:
                    //mostrar alerta na tela de ação desconhecida
                    break;
            }
        }
        
        $scope.create = function(acao){
          // desenvolver método que consome API
        }
      
        $scope.read = function(selectedCategoria){
         // desenvolver método que consome API
        }
        
        $scope.update = function(selectedCategoria){
         // desenvolver método que consome API
        }
        
        $scope.delete = function(selectedCategoria){
         // desenvolver método que consome API
        }
        
        
        //CONTROLE ABAS MODELO SITE ANGULAR JS
//        $scope.steps = [
//          'Step 1: Team Info',
//          'Step 2: Campaign Info',
//          'Step 3: Campaign Media'
//        ];
//        $scope.selection = $scope.steps[0];
//
//        $scope.getCurrentStepIndex = function(){
//          // Get the index of the current step given selection
//          return _.indexOf($scope.steps, $scope.selection);
//        };
//
//          // Go to a defined step index
//        $scope.goToStep = function(index) {
//          if ( !_.isUndefined($scope.steps[index]) )
//          {
//            $scope.selection = $scope.steps[index];
//          }
//        };
//
//        $scope.hasNextStep = function(){
//          var stepIndex = $scope.getCurrentStepIndex();
//          var nextStep = stepIndex + 1;
//          // Return true if there is a next step, false if not
//          return !_.isUndefined($scope.steps[nextStep]);
//        };
//
//        $scope.hasPreviousStep = function(){
//          var stepIndex = $scope.getCurrentStepIndex();
//          var previousStep = stepIndex - 1;
//          // Return true if there is a next step, false if not
//          return !_.isUndefined($scope.steps[previousStep]);
//        };
//
//        $scope.incrementStep = function() {
//          if ( $scope.hasNextStep() )
//          {
//            var stepIndex = $scope.getCurrentStepIndex();
//            var nextStep = stepIndex + 1;
//            $scope.selection = $scope.steps[nextStep];
//          }
//        };
//          
//        $scope.decrementStep = function() {
//          if ( $scope.hasPreviousStep() )
//          {
//            var stepIndex = $scope.getCurrentStepIndex();
//            var previousStep = stepIndex - 1;
//            $scope.selection = $scope.steps[previousStep];
//          }
//        };
        //CONTROLE ABAS MODELO SITE ANGULAR JS - FIM
                
  });
