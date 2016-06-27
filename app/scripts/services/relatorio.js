'use strict';
app.factory("RelatorioResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'relatorio/:id', {id: '@_id'}, {
    getRelClientes: { 
      method:'GET' 
    },
    getRelFornecedores: { 
      method:'GET' 
    },
    getRelProdutividade: { 
      method:'GET' 
    },
    getRelPedidos: { 
      method:'GET' 
    },
    getRelVendas: { 
      method:'GET' 
    }
  });
});