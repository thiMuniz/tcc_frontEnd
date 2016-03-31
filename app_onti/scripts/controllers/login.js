'use strict';
angular.module('sbAdminApp')
  .controller('LoginCtrl', '$state', '$scope', "$http", '$state', function($scope, $http, $state) {
//     $scope.user = new userResource();
//     $scope.login = function(){
//         $scope.user.$login(/*success 200~299*/function(){
//             alert("deu certo");
//              $state.go("main.home");
//              /*basic auth - restful*/
//         },
//         /*error >299 */function(){
//             alert("deu ruim");
//         });
//     };

        
        concole.log('carregou LoginCtrl');
        $scope.usuario = {usuario: "userTeste", senha: "pass"};
        
        function autenticarUsuario(){
            console.log($scope.usuario);
            var logado = false;
            if (logado){
                console.log('tesao pia!!');
                $state.go('main');
            }else{
                console.log('bostio...');
                
            }
            /*
            $http.get('http://172.31.83.216:11392/SGI/login/',$scope.usuario
                ).success(function (data, status) {
                    console.log("login ok - data"+data);
                    console.log("status"+status);
                    $scope.embalagens = data;
                }).error(function (data, status) {
                    console.log("login not ok - data"+data);
                    console.log("status"+status);
                    carregarEmbalagensFront();
                });
                */
        }
  });