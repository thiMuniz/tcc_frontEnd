'use strict';
angular.module('sbAdminApp')
        .controller('EmbalagemCtrl', ['$scope', '$position','ModalService', function ($scope, $position, ModalService) {
            $scope.complexResult = "antes do dialog";
    
            $scope.titulo = "Cadastro de Embalagens dos Produtos";
            $scope.headerLista = "Nenhuma embalagem foi encontrado";
            $scope.labelAddBtn = "Nova Embalagem";

            //setar embalagens no método $scope.read()
            $scope.embalagens = [
                {id: "1", dsCurta: "Caixa Nº1", dsDetalhada: "Detalhes da Embalagem 1", material: "papel", imagem: "...", dimensoes: "12x20x2"},
                {id: "2", dsCurta: "Pacote Pão", dsDetalhada: "Detalhes da Embalagem 2", material: "plástico", imagem: "...", dimensoes: "..."},
                {id: "3", dsCurta: "Pacote Nº1", dsDetalhada: "Detalhes da Embalagem 3", material: "plástico", imagem: "...", dimensoes: "..."},
                {id: "4", dsCurta: "Caixa Nº2", dsDetalhada: "Detalhes da Embalagem 4", material: "papel", imagem: "...", dimensoes: "..."},
                {id: "5", dsCurta: "Pacote Nº2", dsDetalhada: "Detalhes da Embalagem 5", material: "plástico", imagem: "...", dimensoes: "..."}
            ];
            //$scope.embalagens = EmbalagemResource.query();

            $scope.openInsertDialog2 = function () {
                ModalService.showModal({                    
                    templateUrl: "views/cadastro/dialog/formEmbalagem.html",
                    controller: "EmbalagemDialogCtrl",
                    keyboard: false, //permite fechar clicando fora do form
//                    animation: false,
                    closeByEscape: true,
                    backdrop: 'static',
                    inputs: {
//                        title: "Funcionou!! Carai :)",
                        iconeHeaderDialog: "add_circle_outline",
                        tituloDialog: "Cadastrar Embalagem",
                        //criar new embalagaem a partir do factory - resource
                        embalagem: {id: "1", dsCurta: "1", dsDetalhada: "1", material: "1", imagem: "1", dimensoes: "1"}
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $scope.embalagem = result;
                        $scope.complexResult = result;
                        $('.modal-backdrop').remove(); //hot fix ;)
                    });
                    
                });


//                ModalService.showModal({
//                    templateUrl: 'views/cadastro/dialog/formCadastroEmbalagem.html',
//                    controller: "EmbalagemDialogCtrl"
//                }).then(function(modal){
//                    modal.element.modal();
//                    modal.close.then(function(result){
//                        $scope.message = "oi";
//                    })
//                })


//                $scope.idTargetModal = "#formModal";
//                $scope.iconeHeaderDialog = "add_circle_outline";
//                $scope.tituloDialog = "Cadastrar Embalagem";
//                $scope.embalagem = {id: "", dsCurta: "", dsDetalhada: "", material: "", imagem: "", dimensoes: ""};
            };
            
            //funções chamadas no onClick dos botões da tela
            $scope.openInsertDialog = function () {
                $scope.idTargetModal = "#formModal";
                $scope.iconeHeaderDialog = "add_circle_outline";
                $scope.tituloDialog = "Cadastrar Embalagem";
                $scope.embalagem = {id: "", dsCurta: "", dsDetalhada: "", material: "", imagem: "", dimensoes: ""};
            };

            $scope.openUpdateDialog = function (embalagem) {
                $scope.idTargetModal = "#formModal";
                $scope.iconeHeaderDialog = "edit";
                $scope.tituloDialog = "Editar Embalagem";
                $scope.embalagem = angular.copy(embalagem);
            };

            $scope.openDesativarDialog = function (embalagem, index) {
                swal({
                    title: "Deseja mesmo desativar a Embalagem " + embalagem.dsCurta + "?",
                    text: "Você poderá ativar a Embalagem novamente!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    cancelButtonText: "Não, me tire daqui!",
                    confirmButtonText: "Sim, quero desativar!",
                    closeOnConfirm: false},
                        function () {
//                            embalagem.$delete(function(){
                                $scope.embalagens.splice(index,1);
                                $scope.$apply(); //força atualização da lista
                                //metodo deleteEmbalagem - passa a embalagem por parâmetro para exclusão
                                swal({
                                    title: "Embalagem desativada!",
                                    type: "success"
                                });
//                            },
//                            function(){
//                                //metodo deleteEmbalagem - passa a embalagem por parâmetro para exclusão
//                                swal({
//                                    title: "Erro ao desativar embalagem!",
//                                    type: "error"
//                                });
//                            })
                        });                        
            };

            $scope.openInfoDialog = function (embalagem) {
                $scope.tituloModal = "Detalhes Embalagem";
                $scope.embalagem = angular.copy(embalagem);
            };
            
            $scope.clearObjectDialog = function () {
//                $scope.embalagem = {id: "", dsCurta: "", dsDetalhada: "", material: "", imagem: "", dimensoes: ""};
                delete $scope.embalagem;
            };
            
            $scope.saveObjectDialog = function () {
                $scope.embalagens.push(angular.copy($scope.embalagem));
                delete $scope.embalagem;
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


            /*
             //        $scope.funcImageTest = function($scope){
             $scope.myImage='';
             $scope.myCroppedImage='';
             
             var handleFileSelect=function(evt) {
             var file=evt.currentTarget.files[0];
             var reader = new FileReader();
             reader.onload = function (evt) {
             $scope.$apply(function($scope){
             $scope.myImage=evt.target.result;
             });
             };
             reader.readAsDataURL(file);
             };
             angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
             //        }
             */


        }])
            .controller('EmbalagemDialogCtrl', [
            '$scope', '$element', 'close', 'iconeHeaderDialog', 'tituloDialog', 'embalagem',  
            function ($scope, $element, close, iconeHeaderDialog, tituloDialog, embalagem) {
                $scope.iconeHeaderDialog = iconeHeaderDialog;
                $scope.tituloDialog = tituloDialog;
                $scope.embalagem = embalagem;


                $scope.clear = function () {
                    delete $scope.embalagem;
                };
                
                $scope.submit = function () {
                    
                    close({ 
                        id: $scope.embalagem.id, 
                        dsCurta: $scope.embalagem.dsCurta, 
                        dsDetalhada: $scope.embalagem.dsDetalhada,
                        material: $scope.embalagem.material,
                        imagem: $scope.embalagem.imagem,
                        dimensoes: $scope.embalagem.dimensoes
                    }, 500); // close, but give 500ms for bootstrap to animate
                };
                
                $scope.cancel = function() {
                  //  Manually hide the modal.
//                  $element.modal('hide');
                  close("Cancelado"); // parâmetro será recebido pela variável return
                };
                
                //  This close function doesn't need to use jQuery or bootstrap, because
                //  the button has the 'data-dismiss' attribute.
                $scope.close = function() {
//                    $element.modal('hide');
                    close({
                      name: $scope.name,
                      age: $scope.age
                    }, 500); // close, but give 500ms for bootstrap to animate
                };

                //  This cancel function must use the bootstrap, 'modal' function because
                //  the doesn't have the 'data-dismiss' attribute.
                

            }]);
    
