'use strict';
angular.module('sbAdminApp')
        .controller('EmbalagemDialogCtrl', [
            '$scope', '$element', 'title', 'close',  
            function ($scope, $element, title, close) {
                $scope.name = "name1";
                $scope.age = 101;
                $scope.title = title;

                //  This close function doesn't need to use jQuery or bootstrap, because
                //  the button has the 'data-dismiss' attribute.
                $scope.close = function() {
//                    $element.modal('hide');
                    close({
                      name: $scope.name,
                      age: $scope.age
                    }, 1000); // close, but give 500ms for bootstrap to animate
                };

                //  This cancel function must use the bootstrap, 'modal' function because
                //  the doesn't have the 'data-dismiss' attribute.
                $scope.cancel = function() {

                  //  Manually hide the modal.
                  $element.modal('hide');
//                  $('modalTeste').modal('hide');

                  //  Now call close, returning control to the caller.
                  close({
                    name: $scope.name,
                    age: $scope.age
                  }, 1000); // close, but give 500ms for bootstrap to animate
                };





//                $scope.embalagem = {id: "", dsCurta: "", dsDetalhada: "", material: "", imagem: "", dimensoes: ""};
//                $scope.title = title;
//
//                //  This close function doesn't need to use jQuery or bootstrap, because
//                //  the button has the 'data-dismiss' attribute.
//                $scope.close = function () {
//                    close({
//                        Nome: $scope.embalagem.dsCurta,
//                        Descrição: $scope.embalagem.dsDetalhada
//                    }, 500); // close, but give 500ms for bootstrap to animate
//                };
//
//                //  This cancel function must use the bootstrap, 'modal' function because
//                //  the doesn't have the 'data-dismiss' attribute.
//                $scope.cancel = function () {
//
//                    //  Manually hide the modal.
//                    $element.modal('hide');
//
//                    //  Now call close, returning control to the caller.
//                    close({
//                        Nome: $scope.embalagem.dsCurta,
//                        Descrição: $scope.embalagem.dsDetalhada
//                    }, 500); // close, but give 500ms for bootstrap to animate
//                };

            }]);