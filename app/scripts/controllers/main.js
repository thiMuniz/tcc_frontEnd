'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('MainCtrl', function ($scope, PedidoResource, ProdutoResource, InsumoResource, RotuloResource, EmbalagemResource, $httpParamSerializerJQLike, CONST) {

  //  $scope.setDashboards = function(){
    $scope.dashNewPedidos = PedidoResource.listFiltro({p:$httpParamSerializerJQLike({status:'EF'})});
    $scope.dashEmitirNf = PedidoResource.listFiltro({p:$httpParamSerializerJQLike({status:'NF'})});
    
    $scope.dashProdutos = ProdutoResource.listFiltro({p:$httpParamSerializerJQLike({alerta:'S'})});
    $scope.dashInsumos = InsumoResource.listFiltro({p:$httpParamSerializerJQLike({alerta:'S'})});
    $scope.dashRotulos = RotuloResource.listFiltro({p:$httpParamSerializerJQLike({alerta:'S'})});
    $scope.dashEmbalagens = EmbalagemResource.listFiltro({p:$httpParamSerializerJQLike({alerta:'S'})});
//  }
     
});