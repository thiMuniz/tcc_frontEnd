'use strict';
angular.module('sbAdminApp')
        .controller('EmbalagemCtrl', function ($scope, $modal, $http, $resource, EmbalagemResource) {

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
          function setAlertInfo(msg, classe, acao) {
            var show;
            if (acao == "show") {
              show = true;
            } else {
              show = false;
            }
            $scope.alertInfoMessage = msg;
            $scope.alertInfoClass = classe;
            $scope.alertInfoShow = show;
          }

          function resetAlertInfo() { //Corrigir método (não oculta DIV)
            setAlertInfo("", "info", "hide");
          }

          function carregarEmbalagensFront() {
            $scope.embalagens = [
              {id: "1", dsCurta: "Caixa Nº1", dsDetalhada: "Detalhes da Embalagem 1", material: "papel", imagem: "...", dimensoes: "12x20x2"},
              {id: "2", dsCurta: "Pacote Pão", dsDetalhada: "Detalhes da Embalagem 2", material: "plástico", imagem: "...", dimensoes: "..."},
              {id: "3", dsCurta: "Pacote Nº1", dsDetalhada: "Detalhes da Embalagem 3", material: "plástico", imagem: "...", dimensoes: "..."},
              {id: "4", dsCurta: "Caixa Nº2", dsDetalhada: "Detalhes da Embalagem 4", material: "papel", imagem: "...", dimensoes: "..."},
              {id: "5", dsCurta: "Pacote Nº2", dsDetalhada: "Detalhes da Embalagem 5", material: "plástico", imagem: "...", dimensoes: "..."}
            ];
          }

          function carregarEmbalagensAPI() {
            $scope.embalagens = EmbalagemResource.query();
            
            /*
             * Trecho abaixo funciona             
            $http.get('http://192.168.25.8:11392/SGI/embalagem/'
                    ).success(function (data, status) {
              console.log("deu bom - data" + data);
              console.log("status" + status);
              $scope.embalagens = data;
            }).error(function (data, status) {
              console.log("deu ruim - data" + data);
              console.log("status" + status);
              carregarEmbalagensFront();
            });
            */
          }

          //funções chamadas no onClick dos botões da tela
          $scope.openInsertDialog = function () {
            resetAlertInfo();
            $scope.params = {
              formTipo: 'insert',
              iconeHeaderDialog: "add_circle_outline",
              tituloDialog: "Cadastrar Embalagem",
              embalagem: {id: "6", dsCurta: "emb 6", dsDetalhada: "desc emb 6", material: "mat x", imagem: "...", dimensoes: "dim xyz"}
            }

            var modalInstance = $modal.open({
              templateUrl: 'views/cadastro/dialog/formEmbalagem.html',
              controller: 'EmbalagemDialogCtrl',
              backdrop: 'static',
              size: '', //sm, lg
              resolve: {
                params: function () {
                  return $scope.params;
                }
              }
            });
            modalInstance.result.then(function (result) {
              if (result.embalagem) {
                var msg = "";
//                setAlertInfo("dados submetidos - " + result.embalagem.dsDetalhada, "success", "show");
                
                if(result.status == "sucesso"){//Se retorno da API com sucesso add a embalagem à lista
                  $scope.embalagens.push(angular.copy(result.embalagem));
  //                delete $scope.embalagem;
                  msg = "Embalagem "+result.embalagem.dsCurta+" cadastrada com sucesso!";
                  setAlertInfo(msg, "success", "show");
                  swal({
                    title: msg,
                    type: "success"
                  });
                }else{//Senão mostra msg erro                  
                  msg = "Erro ao cadastrar Embalagem "+result.embalagem.dsCurta+" !";
                  setAlertInfo(msg, "danger", "show");
                  swal({
                    title: msg,
                    type: "error"
                  });   
                }
                
              } else {
                setAlertInfo("formulário vazio ", "warning", "show");
              }
            }, function () {
              setAlertInfo("cancelado, dados perdidos", "warning", "show");
            });
          }
         
          $scope.openUpdateDialog = function (embalagem, index) {
            resetAlertInfo();
            $scope.params = {
              formTipo: 'update',
              iconeHeaderDialog: "edit",
              tituloDialog: "Editar Embalagem",
              embalagem: angular.copy(embalagem)
            }

            var modalInstance = $modal.open({
              templateUrl: "views/cadastro/dialog/formEmbalagem.html",
              controller: "EmbalagemDialogCtrl",              
              backdrop: 'static',
              size: '',
              resolve: {
                params: function () {
                  return $scope.params;
                }
              }
            });
            modalInstance.result.then(function (result) {
              if (result.embalagem) {
                var msg = "";
//                setAlertInfo("dados submetidos - " + result.embalagem.dsDetalhada, "success", "show");
                
                if(result.status == "sucesso"){//Se retorno da API com sucesso add a embalagem à lista
                  $scope.embalagens[index] = result.embalagem;
//                  $scope.$apply(); 
                  var msg = "Embalagem " + result.embalagem.dsCurta + " editada com sucesso!";
                  setAlertInfo(msg, "success", "show");
                  swal({
                    title: msg,
                    type: "success"
                  });
                }else{//Senão mostra msg erro                  
                  msg = "Erro ao editar Embalagem "+result.embalagem.dsCurta+" !";
                  setAlertInfo(msg, "danger", "show");
                  swal({
                    title: msg,
                    type: "error"
                  });   
                }                
              } else {
                setAlertInfo("formulário vazio ", "warning", "show");
              }
            }, function () {
              setAlertInfo("cancelado, dados perdidos", "warning", "show");
            });
          }

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
                      $scope.embalagens.splice(index, 1);
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
            resetAlertInfo();
            $scope.params = {
              formTipo: 'info',
              iconeHeaderDialog: "info_outline",
              tituloDialog: "Detalhes Embalagem",
              embalagem: angular.copy(embalagem)
            }

            var modalInstance = $modal.open({
              templateUrl: "views/cadastro/dialog/formEmbalagem.html",
              controller: "EmbalagemDialogCtrl",              
              backdrop: 'static',
              size: '',
              resolve: {
                params: function () {
                  return $scope.params;
                }
              }
            });
//            modalInstance.result.then(function (result) {},function(){
//              setAlertInfo("cancelado", "warning", "show");
//            });
          }
            
            
          /*
           * testes img-crop
           * 
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


        })
        .controller('EmbalagemDialogCtrl', function ($scope, $http, params, $modalInstance) {
          $scope.formTipo = params.formTipo;
          $scope.iconeHeaderDialog = params.iconeHeaderDialog;
          $scope.tituloDialog = params.tituloDialog;
          $scope.embalagem = params.embalagem;

          $scope.clear = function () {
            delete $scope.embalagem;
          };

          $scope.submit = function () {
            /*
             //chamar serviço API
             $http.post('http://192.168.25.8:11392/SGI/embalagem/', 
             $scope.embalagem                        
             ).then(function successCallback(response) {
             console.log("deu bom"+response.data);
             }, function errorCallback(response) {
             console.log("deu ruim"+response);
             console.log($scope.embalagem);
             });
             */

            //pegar retorno API e definir padrão p/ result
            //
            $modalInstance.close({
              embalagem: $scope.embalagem,
              status: "sucesso" //pegar retorno padrão da API ou protocolo HTTP
//                            embalagem: response.data,
//                            status: response.status
            });
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

        });

