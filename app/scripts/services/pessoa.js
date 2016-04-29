'use strict';
app.factory("PessoaResource", function ($resource, CONST) {
  return $resource(CONST.ws.urlSGP + 'pessoa/:id', {id: '@_id'}, {
    listByPerfil:{method: 'GET',
                  isArray : true,
//                  url : CONST.ws.urlSGP+'pessoa/:perfil/:p',
//                  params : {p:"p",perfil:'perfil'}

                  url : CONST.ws.urlSGP+'pessoa?:p',
                  params : {p:"p"}
    },
    update: { method:'PUT' }
  });
});

/*
 * Dicas baca
 * 
ui-sref="app.blabla.url({id:ajaio,blalb:sakfd})

pesquise $stateParams
e pass params trough ui-sref

balbla = resource.query({param:blabl,param2:fksdak})

.factory("PersonResource",function($resource,urlApi){
return $resource(urlApi+'person/:id',{id:'@_id'},{
update : {
method: 'PUT'
},
search : {
method: 'GET',
isArray : true,
url : urlApi+'person/search/:p',
params : {p:'p'}
}
});
})
esse é o meu q passa parametro

       var result = PersonResource.search({p:$httpParamSerializerJQLike($scope.search.params)})
no caso
o meu $scope.search.params
é um objeto
com os filtros que eu queri
$httpParamSerializerJQLike
transforma o objeto
em 
name=fajfda&age=lfsdjklda
pro padrão de url
ps.. tem que ser declarado no inicio do controlleres = PessoaResource.query();
*/