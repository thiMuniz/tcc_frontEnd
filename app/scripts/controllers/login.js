'use strict';
app.controller('LoginCtrl', function ($scope, $state) { //userResource
//     $scope.user = new userResource();
  $scope.login = function () {
    if ($scope.user.username == 'user' && $scope.user.password == '0000') {
      swal({
        title: "O mestre logou!!",
        type: "success"
      });
      $state.go('main.home');
    } else {
      swal({
        title: "Na traaaaave!",
        type: "error"
      });
    }


    ////////// USAR COD ABAIXO QND TIVER RESOURCE /////////////////
//         $scope.user.$login(/*success 200~299*/function(){
//             alert("deu certo");
//              $state.go("main.home");
//              /*basic auth - restful*/
//         },
//         /*error >299 */function(){
//             alert("deu ruim");
//         });

  };
});