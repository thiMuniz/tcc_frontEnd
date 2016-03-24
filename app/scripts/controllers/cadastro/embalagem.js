'use strict';
angular.module('sbAdminApp')
        .controller('EmbalagemCtrl', function ($scope, $position) {
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

            var cont = 5; //contador recebe o numero de resultados da query
//        if(se cont > 0){
            $scope.headerLista = cont + " Rótulos encontrados";
//        }   

//funções chamadas no onClick dos botões da tela
            $scope.openInsertDialog = function () {
                $scope.idTargetModal = "#formModal";
                $scope.iconeHeaderDialog = "add_circle_outline";
                $scope.tituloDialog = "Cadastrar Embalagem";
                $scope.embalagem = {id: "", dsCurta: "", dsDetalhada: "", material: "", imagem: "", dimensoes: ""};
            }

            $scope.openUpdateDialog = function (embalagem) {
                $scope.idTargetModal = "#formModal";
                $scope.iconeHeaderDialog = "edit";
                $scope.tituloDialog = "Editar Embalagem";
                $scope.embalagem = angular.copy(embalagem);
            }

            $scope.clearObjectDialog = function () {
                $scope.embalagem = {id: "", dsCurta: "", dsDetalhada: "", material: "", imagem: "", dimensoes: ""};
            }

            $scope.desativar = function (embalagem) {
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
                            //metodo deleteEmbalagem - passa a embalagem por parâmetro para exclusão
                            swal({
                                title: "Embalagem desativada!",
                                type: "success"
                            });
                        });
            }

            $scope.openInfoDialog = function (embalagem) {
                $scope.tituloModal = "Detalhes Embalagem";
                $scope.embalagem = angular.copy(embalagem);
            }
            
            $scope.saveObjectDialog = function () {
                $scope.embalagens.push(angular.copy($scope.embalagem));
                delete $scope.embalagem;
            }
            

            $scope.create = function (acao) {
                // desenvolver método que consome API
            }

            $scope.read = function (selectedRotulo) {
                // desenvolver método que consome API
            }

            $scope.update = function (selectedRotulo) {
                // desenvolver método que consome API
            }

            $scope.delete = function (selectedRotulo) {
                // desenvolver método que consome API
            }


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


        });
