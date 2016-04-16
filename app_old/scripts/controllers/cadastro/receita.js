'use strict';
app.controller('ReceitaCtrl', function ($scope, $position) {
  $scope.titulo = "Cadastro de Receitas";

  $scope.produtos = [
    {name: "Teste1", preco: "10", categoria: "Cat Teste"},
    {name: "Teste2", preco: "20", categoria: "Cat Teste1"},
    {name: "Teste3", preco: "30", categoria: "Cat Teste2"},
    {name: "Teste4", preco: "40", categoria: "Cat Teste3"},
    {name: "Teste5", preco: "50", categoria: "Cat Teste4"},
    {name: "Teste6", preco: "60", categoria: "Cat Teste5"}
  ];
  //$scope.produtos = ProdutoResource.query();
});
