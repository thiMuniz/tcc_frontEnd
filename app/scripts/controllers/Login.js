'use strict';
angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope,$state,userResource) {
     $scope.user = new userResource();
     $scope.login = function(){
         $scope.user.$login(/*success 200~299*/function(){
             alert("deu certo");
              $state.go("main.home");
              /*basic auth - restful*/
         },
         /*error >299 */function(){
             alert("deu ruim");
         });
     };
  });