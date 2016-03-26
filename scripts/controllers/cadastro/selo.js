'use strict';
angular.module('sbAdminApp')
  .controller('SeloCtrl', function($scope,$position) {
        $scope.titulo = "Cadastro de Selos" ;
        $scope.headerLista = "Nenhum selo foi encontrado";
        $scope.labelAddBtn = "Novo Selo";
        
        //setar selos no método $scope.read()
        $scope.selos = [ 
            {id:"1",dsCurta:"Selo Gastronomia 2016",dsDetalhada:"Detalhes do Selo 1",imagem:"..."},
            {id:"2",dsCurta:"0% Gosdura Trans",dsDetalhada:"Detalhes do Selo 2",imagem:"..."},
            {id:"3",dsCurta:"Não Contém Glúten",dsDetalhada:"Detalhes do Selo 3",imagem:"..."},
            {id:"4",dsCurta:"Baixo Teor de Gorduras",dsDetalhada:"Detalhes do Selo 4",imagem:"..."}
        ];
        //$scope.selos = SeloResource.query();
        
        var cont = 4; //contador recebe o numero de resultados da query
//        if(se cont > 0){
            $scope.headerLista = cont+" Selos encontrados";
//        } 

        $scope.demo = {
            showTooltip : false,
            tipDirection : ''
        };
        $scope.demo.delayTooltip = undefined;
        $scope.$watch('demo.delayTooltip',function(val) {
            $scope.demo.delayTooltip = parseInt(val, 10) || 0;
        });
        $scope.$watch('demo.tipDirection',function(val) {
            if (val && val.length ) {
                $scope.demo.showTooltip = true;
            }
        })
          
        $scope.openDialog = function(clickEvent,selectedSelo){
            var acao = clickEvent.currentTarget.getAttribute("data-id");
            
            switch(acao){
                case 'inserir':
                    $scope.iconeFormModal = "add_circle_outline";
                    $scope.tituloModal = "Cadastrar Selo"; 
                    $scope.selo = {id:"",dsCurta:"",dsDetalhada:"",imagem:""};
                    break;
                    
                case 'editar':
                    $scope.iconeFormModal = "edit";
                    $scope.tituloModal = "Editar Selo"; 
                    $scope.selo = selectedSelo;
                    break;
                    
                case 'desativar':
                    swal({
                        title: "Deseja mesmo desativar o Selo "+selectedSelo.dsCurta+"?",
                        text: "Você poderá ativar o Selo novamente!",
                        type: "warning",                        
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        cancelButtonText: "Não, me tire daqui!",
                        confirmButtonText: "Sim, quero desativar!",
                        closeOnConfirm: false,imagem:""}, 
                        function(){                             
                            //metodo deleteSelo - passa a selo por parâmetro para exclusão
                            
                            swal({
                                title: "Selo desativado!", 
                                type: "success"
                            });                            
                        });
                    break;
                    
                case 'info':
                    $scope.tituloModal = "Detalhes Selo"; 
                    $scope.selo = selectedSelo;
                    break;
                    
                default:
                    //mostrar alerta na tela de ação desconhecida
                    break;
            }
        }
        
        $scope.create = function(acao){
          // desenvolver método que consome API
        }
      
        $scope.read = function(selectedSelo){
         // desenvolver método que consome API
        }
        
        $scope.update = function(selectedSelo){
         // desenvolver método que consome API
        }
        
        $scope.delete = function(selectedSelo){
         // desenvolver método que consome API
        }
        
  });
