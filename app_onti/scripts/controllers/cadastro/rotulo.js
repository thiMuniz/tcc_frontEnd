'use strict';
angular.module('sbAdminApp')
  .controller('RotuloCtrl', function($scope,$position) {
        $scope.titulo = "Cadastro de Rótulos dos Produtos" ;
        $scope.headerLista = "Nenhum rótulo foi encontrado";
        $scope.labelAddBtn = "Novo Rótulo";
        
        //setar rotulos no método $scope.read()
        $scope.rotulos = [ 
            {id:"1",dsCurta:"Rótulo Tostilha Cacau",dsDetalhada:"Detalhes do Rótulo 1",imagem:"...",idProduto:"..."},
            {id:"2",dsCurta:"Rótulo Pão Centeio",dsDetalhada:"Detalhes do Rótulo 2",imagem:"...",idProduto:"..."},
            {id:"3",dsCurta:"Rótulo Bisoito Sequilhos",dsDetalhada:"Detalhes do Rótulo 3",imagem:"...",idProduto:"..."},
            {id:"4",dsCurta:"Rótulo Panetone",dsDetalhada:"Detalhes do Rótulo 4",imagem:"...",idProduto:"..."}
        
        ];
        //$scope.rotulos = RotuloResource.query();
        
        var cont = 4; //contador recebe o numero de resultados da query
//        if(se cont > 0){
            $scope.headerLista = cont+" Rótulos encontrados";
//        }   

        $scope.openDialog = function(clickEvent,selectedRotulo){
            var acao = clickEvent.currentTarget.getAttribute("data-id");
            
            switch(acao){
                case 'inserir':
                    $scope.iconeFormModal = "add_circle_outline";
                    $scope.tituloModal = "Cadastrar Rótulo"; 
                    $scope.rotulo = {id:"",dsCurta:"",dsDetalhada:""};
                    break;
                    
                case 'editar':
                    $scope.iconeFormModal = "edit";
                    $scope.tituloModal = "Editar Rótulo"; 
                    $scope.rotulo = selectedRotulo;
                    break;
                    
                case 'desativar':
                    swal({
                        title: "Deseja mesmo desativar o Rótulo "+selectedRotulo.dsCurta+"?",
                        text: "Você poderá ativar o Rótulo novamente!",
                        type: "warning",                        
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        cancelButtonText: "Não, me tire daqui!",
                        confirmButtonText: "Sim, quero desativar!",
                        closeOnConfirm: false}, 
                        function(){                             
                            //metodo deleteRotulo - passa o rótulo por parâmetro para exclusão
                            
                            swal({
                                title: "Rótulo desativado!", 
                                type: "success"
                            });                            
                        });
                    break;
                    
                case 'info':
                    $scope.tituloModal = "Detalhes Rótulo"; 
                    $scope.rotulo = selectedRotulo;
                    break;
                    
                default:
                    //mostrar alerta na tela de ação desconhecida
                    break;
            }
        }
        
        $scope.create = function(acao){
          // desenvolver método que consome API
        }
      
        $scope.read = function(selectedRotulo){
         // desenvolver método que consome API
        }
        
        $scope.update = function(selectedRotulo){
         // desenvolver método que consome API
        }
        
        $scope.delete = function(selectedRotulo){
         // desenvolver método que consome API
        }
  });
