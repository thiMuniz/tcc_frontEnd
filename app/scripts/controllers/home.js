'use strict';
app.controller('HomeCtrl', function ($scope, ProdutoResource, InsumoResource, RotuloResource, EmbalagemResource, $httpParamSerializerJQLike, CONST) {

  //  $scope.setDashboards = function(){
    $scope.dashProdutos = ProdutoResource.listFiltro({p:$httpParamSerializerJQLike({alerta:'S'})});
    $scope.dashInsumos = InsumoResource.listFiltro({p:$httpParamSerializerJQLike({alerta:'S'})});
    $scope.dashRotulos = RotuloResource.listFiltro({p:$httpParamSerializerJQLike({alerta:'S'})});
    $scope.dashEmbalagens = EmbalagemResource.listFiltro({p:$httpParamSerializerJQLike({alerta:'S'})});
//  }
     
});
