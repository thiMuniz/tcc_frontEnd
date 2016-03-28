'use strict';
angular.module('sbAdminApp')
        .controller('EmbalagemCtrl', ['$scope', '$position','ModalService', '$http', function ($scope, $position, ModalService, $http) {
            
            $scope.titulo = "Cadastro de Embalagens dos Produtos";
            $scope.headerLista = "Nenhuma embalagem foi encontrada";
            $scope.labelAddBtn = "Nova Embalagem";
            
//            resetAlertInfo;
            setAlertInfo("Bem vindo programador lindão!! Boa sorte dessa vez...", "warning", "show");
            carregarEmbalagensFront();
//            carregarEmbalagensAPI();

            /**
             * 
             * @param {String} msg (mensagem que deseja exibir)
             * @param {String} classe (info | success | warning | danger)
             * @param {String} show (show | hide)
             * @returns {null}
             */
            function setAlertInfo(msg, classe, acao){
                var show;
                if (acao == "show"){
                    show = true;
                }else{
                    show = false;
                }
                $scope.alertInfoMessage = msg;
                $scope.alertInfoClass = classe;
                $scope.alertInfoShow = show;
            }
            
            function resetAlertInfo(){ //Corrigir método (não oculta DIV)
                setAlertInfo("", "info", "hide");
            }            

            function carregarEmbalagensFront(){
                $scope.embalagens = [
                    {id: "1", dsCurta: "Caixa Nº1", dsDetalhada: "Detalhes da Embalagem 1", material: "papel", imagem: "...", dimensoes: "12x20x2"},
                    {id: "2", dsCurta: "Pacote Pão", dsDetalhada: "Detalhes da Embalagem 2", material: "plástico", imagem: "...", dimensoes: "..."},
                    {id: "3", dsCurta: "Pacote Nº1", dsDetalhada: "Detalhes da Embalagem 3", material: "plástico", imagem: "...", dimensoes: "..."},
                    {id: "4", dsCurta: "Caixa Nº2", dsDetalhada: "Detalhes da Embalagem 4", material: "papel", imagem: "...", dimensoes: "..."},
                    {id: "5", dsCurta: "Pacote Nº2", dsDetalhada: "Detalhes da Embalagem 5", material: "plástico", imagem: "...", dimensoes: "..."}
                ];
            }
            
            function carregarEmbalagensAPI(){
                //setar embalagens no método $scope.read();
                //$scope.embalagens = EmbalagemResource.query();
                $http.get('http://192.168.25.8:11392/SGI/embalagem/'
                    ).success(function (data, status) {
                        console.log("deu bom - data"+data);
                        console.log("status"+status);
                        $scope.embalagens = data;
                    }).error(function (data, status) {
                        console.log("deu ruim - data"+data);
                        console.log("status"+status);
                        carregarEmbalagensFront();
                    });
            }            
                    
            $scope.openInsertDialog = function () {
                resetAlertInfo();
                ModalService.showModal({                    
                    templateUrl: "views/cadastro/dialog/formEmbalagem.html",
                    controller: "EmbalagemDialogCtrl",
                    keyboard: false, //permite fechar clicando fora do form
//                    animation: false,
                    closeByEscape: true,
                    backdrop: 'static',
                    inputs: {
                        formTipo: 'insert',
                        iconeHeaderDialog: "add_circle_outline",
                        tituloDialog: "Cadastrar Embalagem",
                        //criar new embalagaem a partir do factory - resource
                        embalagem: {id: "6", dsCurta: "emb 6", dsDetalhada: "desc emb 6", material: "mat x", imagem: "...", dimensoes: "dim xyz"}
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
//                        $scope.embalagem = result;
                        if(result.status != "cancelado"){
                            if(result.status == "sucesso"){
                                $scope.embalagens.push(angular.copy(result.embalagem));
//                                delete $scope.embalagem;
                                var msg = "Embalagem "+result.embalagem.dsCurta+" cadastrada com sucesso!";
                                setAlertInfo(msg, "success", "show");
                                swal({
                                    title: msg,
                                    type: "success"
                                });
                            }else{
                                var msg = "Erro ao cadastrar Embalagem "+result.embalagem.dsCurta+" !";
                                setAlertInfo(msg, "danger", "show");
                                swal({
                                    title: msg,
                                    type: "error"
                                });
                            }                        
                        }
                        $('.modal-backdrop').remove(); //hot fix ;)
                    });                    
                });
            };
            
            $scope.openUpdateDialog = function (embalagem, index) {
                resetAlertInfo();
                ModalService.showModal({                    
                    templateUrl: "views/cadastro/dialog/formEmbalagem.html",
                    controller: "EmbalagemDialogCtrl",
                    keyboard: false, //permite fechar clicando fora do form
//                    animation: false,
                    closeByEscape: true,
                    backdrop: 'static',
                    inputs: {
                        formTipo: 'update',
                        iconeHeaderDialog: "edit",
                        tituloDialog: "Editar Embalagem",
                        embalagem: angular.copy(embalagem)
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        if(result.status != "cancelado"){
//                           $scope.embalagem = result;
                            if(result.status == "sucesso"){
                                $scope.embalagens[index] = result.embalagem;
//                                $scope.$apply(); 
                                var msg = "Embalagem "+result.embalagem.dsCurta+" editada com sucesso!";
                                setAlertInfo(msg, "success", "show");
                                swal({
                                    title: msg,
                                    type: "success"
                                });
                            }else{
                                var msg = "Erro ao editar Embalagem "+result.embalagem.dsCurta+" !";
                                setAlertInfo(msg, "danger", "show");
                                swal({
                                    title: msg,
                                    type: "error"
                                });
                            }                        
                        }
                        $('.modal-backdrop').remove(); //hot fix ;)  
                    });                    
                });
            };
            
            $scope.openInfoDialog = function (embalagem) {
                resetAlertInfo();
                ModalService.showModal({                    
                    templateUrl: "views/cadastro/dialog/formEmbalagem.html",
                    controller: "EmbalagemDialogCtrl",
                    keyboard: false, //permite fechar clicando fora do form
//                    animation: false,
                    closeByEscape: true,
                    backdrop: 'static',
                    inputs: {
                        formTipo: 'info',
                        iconeHeaderDialog: "info_outline",
                        tituloDialog: "Detalhes Embalagem",
                        embalagem: angular.copy(embalagem)
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $('.modal-backdrop').remove(); //hot fix ;)  
                    });                    
                });
            };
            
            
            //funções chamadas no onClick dos botões da tela
            $scope.openInsertDialog2 = function () {
                $scope.idTargetModal = "#formModal";
                $scope.iconeHeaderDialog = "add_circle_outline";
                $scope.tituloDialog = "Cadastrar Embalagem";
                $scope.embalagem = {id: "", dsCurta: "", dsDetalhada: "", material: "", imagem: "", dimensoes: ""};
            };

            $scope.openUpdateDialog2 = function (embalagem) {
                resetAlertInfo();                
                $scope.idTargetModal = "#formModal";
                $scope.iconeHeaderDialog = "edit";
                $scope.tituloDialog = "Editar Embalagem";
                $scope.embalagem = angular.copy(embalagem);
            };

            $scope.openDesativarDialog = function (embalagem, index) {
                resetAlertInfo();
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

            $scope.openInfoDialog2 = function (embalagem) {
                resetAlertInfo();
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
            '$scope', '$element', '$http', 'close', 'iconeHeaderDialog', 'tituloDialog', 'embalagem', 'formTipo',
            function ($scope, $element, $http, close, iconeHeaderDialog, tituloDialog, embalagem, formTipo) {
                console.log(formTipo);
                $scope.formTipo = formTipo;
                $scope.iconeHeaderDialog = iconeHeaderDialog;
                $scope.tituloDialog = tituloDialog;
                $scope.embalagem = embalagem;

                $scope.clear = function () {
                    delete $scope.embalagem;
                };
                
                $scope.submit = function () {
                    /*
                    //chamar serviço API
                    console.log("vamo ve a bosta");
                    $http.post('http://192.168.25.8:11392/SGI/embalagem/', 
                    $scope.embalagem                        
                    ).then(function successCallback(response) {
                        console.log("deu bom"+response.data);
                    }, function errorCallback(response) {
                        console.log("deu ruim"+response);
                        console.log($scope.embalagem);
                    });
                    */
                    
                        //pegar retorno API
                        //
                        close({
                            embalagem: $scope.embalagem, 
                            status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
//                            embalagem: response.data,
//                            status: response.status
                            });
                        /*
                    close({$scope.embalagem}, 500); // close, but give 500ms for bootstrap to animate
                    */
                };
                
                $scope.cancel = function() {
                  //  Manually hide the modal.
                  $element.modal('hide');
                  close({status: "cancelado"}); // parâmetro será recebido pela variável return
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
    
