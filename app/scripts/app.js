'use strict'; 
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var app = angular.module('sbAdminApp', [
  'oc.lazyLoad',
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'ngMdIcons',          
  'ngMessages',
  'ngResource',
  'mwl.calendar',
  'ngCpfCnpj',
  'toastr',
  'ngImgCrop',
  'ngFileUpload',
  'ui.select',
  'as.sortable',
  '720kb.datepicker',
  'ngCookies',
  'datatables',
  'ui.utils.masks'          
])
.constant("CONST", {
  ws:{
    urlSGP: "http://naturefibrasltda.com/",  //HTTP  SGP
//    urlSGP: "http://192.168.25.5:8080/sgitcc/",  //Local Gustavo
//    urlSGP: "https://45.55.228.230:8181/",   //HTTPS SGP
//    urlSGP: "http://naturefibrasltda.com/uat/",  //HTTP  UAT
//    urlSGP: "https://45.55.228.230:8181/uat/", //HTTPS UAT
    urlCep: "https://viacep.com.br/ws/",
    urlCorreios: "",
    urlRF: ""
  },
  sessao: {alive: "Tempo restante: ", dead: "Sessão encerrada !"},
  inserir: {iconeBtn: "add_circle", iconeHeaderDialog: "add_circle_outline", tooltipBtn:"Cadastrar"},
  editar: {iconeAcao: "edit", iconeHeaderDialog: "edit", tooltipAcao:"Editar"},
  ativar: {iconeAcao: "settings_backup_restore", tooltipAcao:"Ativar"},
  desativar: {iconeAcao: "block", tooltipAcao:"Desativar"},
  excluir: {iconeAcao: "delete", tooltipAcao:"Excluir"},
  info: {iconeAcao: "info", iconeHeaderDialog: "info_outline", tooltipAcao:"Detalhes"}

})
.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

  $ocLazyLoadProvider.config({
    debug: false,
    events: true
  });

  $urlRouterProvider.otherwise('/login');

  $stateProvider
  .state('main', {
    url: '/main',
    templateUrl: 'views/main/main.html',
    resolve: {
      loadMyDirectives: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/directives/header/header.js',
            'scripts/directives/header/header-notification/header-notification.js',
            'scripts/directives/sidebar/sidebar.js',
            'scripts/directives/sidebar/sidebar-search/sidebar-search.js',                              
            'scripts/services/pessoa.js',
            'scripts/controllers/cadastro/imagem.js',
            'scripts/controllers/header.js',
            'scripts/services/correios.js',
          ]
        }),
        $ocLazyLoad.load({
          name: 'toggle-switch',
          files: [
            "bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
            "bower_components/angular-toggle-switch/angular-toggle-switch.css"
          ]
        }),
        $ocLazyLoad.load({
          name: 'ngAnimate',
          files: ['bower_components/angular-animate/angular-animate.js']
        });
        $ocLazyLoad.load({
          name: 'ngCookies',
          files: ['bower_components/angular-cookies/angular-cookies.js']
        });
        $ocLazyLoad.load({
          name: 'ngResource',
          files: ['bower_components/angular-resources/angular-resource.js']
        });
        $ocLazyLoad.load({
          name: 'ngSanitize',
          files: ['bower_components/angular-sanitize/angular-sanitize.js']
        });
        $ocLazyLoad.load({
          name: 'ngTouch',
          files: ['bower_components/angular-touch/angular-touch.js']
        });
      }
    }
  })
  .state('main.home', {
    url: '/home',
    controller: 'MainCtrl',
    templateUrl: 'views/main/home.html',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/main.js',
            'scripts/directives/timeline/timeline.js',
            'scripts/directives/notifications/notifications.js',
            'scripts/directives/chat/chat.js',
            'scripts/directives/main/stats/stats.js'
          ]
        });
      }
    }
  })
  .state('main.form', {
    templateUrl: 'views/form.html',
    url: '/form'
  })
  .state('main.blank', {
    templateUrl: 'views/pages/blank.html',
    url: '/blank'
  })
  .state('login', {
    templateUrl: 'views/login.html',
    url: '/login',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/login.js',
            'scripts/services/pessoa.js'
          ]
        });
      }
    }
  })
  .state('main.chart', {
    templateUrl: 'views/chart.html',
    url: '/chart',
    controller: 'ChartCtrl',
    resolve: {
      loadMyFile: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'chart.js',
          files: [
            'bower_components/angular-chart.js/dist/angular-chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.css'
          ]
        }),
        $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/chartContoller.js']
        });
      }
    }
  })
  .state('main.table', {
    templateUrl: 'views/table.html',
    url: '/table'
  })
  .state('main.panels-wells', {
    templateUrl: 'views/ui-elements/panels-wells.html',
    url: '/panels-wells'
  })
  .state('main.buttons', {
    templateUrl: 'views/ui-elements/buttons.html',
    url: '/buttons'
  })
  .state('main.notifications', {
    templateUrl: 'views/ui-elements/notifications.html',
    url: '/notifications'
  })
  .state('main.typography', {
    templateUrl: 'views/ui-elements/typography.html',
    url: '/typography'
  })
  .state('main.icons', {
    templateUrl: 'views/ui-elements/icons.html',
    url: '/icons'
  })
  .state('main.grid', {
    templateUrl: 'views/ui-elements/grid.html',
    url: '/grid'
  })
  .state('main.calendar', {
    templateUrl: 'views/calendar.html',
    url: '/calendario'
  })
  .state('main.cadastro', {
    template: '<div ui-view></div>',
    abstract: true,
    url: '/cadastro'
  })
  .state('main.cadastro.fornecedor', {
    templateUrl: 'views/cadastro/fornecedor.html',
    url: '/fornecedor/:perfil',
    params : {
      perfil:''
    },
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/fornecedor.js'

          ]
        });
      }
    }
  })
  .state('main.cadastro.colaborador', {
    templateUrl: 'views/cadastro/colaborador.html',
    url: '/colaborador/:perfil',
    params : {
      perfil:''
    },
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/colaborador.js'
          ]
        });
      }
    }
  })
  .state('main.cadastro.cliente', {
    templateUrl: 'views/cadastro/cliente.html',
    url: '/cliente/:perfil',
    params : {
      perfil:''
    },
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/cliente.js',                              
            'scripts/services/formaPgto.js'
          ]
        });
      }
    }
  })
  .state('main.cadastro.receita', {
    templateUrl: 'views/cadastro/receita.html',
    url: '/receita',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/receita.js',
            'scripts/services/receita.js',
            'scripts/services/insumo.js'
          ]
        });
      }
    }
  })
  .state('main.cadastro.selo', {
    templateUrl: 'views/cadastro/selo.html',
    url: '/selo',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/selo.js',
            'scripts/services/selo.js'

          ]
        });
      }
    }
  })
  .state('main.cadastro.categoria', {
    templateUrl: 'views/cadastro/categoria.html',
    url: '/categoria',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/categoria.js',
            'scripts/services/categoria.js'
          ]
        });
      }
    }
  })
  .state('main.cadastro.produto', {
    templateUrl: 'views/cadastro/produto.html',
    url: '/produto',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/produto.js',
            'scripts/services/produto.js',
            'scripts/services/categoria.js',
            'scripts/services/receita.js',
            'scripts/services/selo.js',
            'scripts/services/embalagem.js',                              
            'scripts/services/rotulo.js'
          ]
        });
      }
    }
  })
  .state('main.cadastro.insumo', {
    templateUrl: 'views/cadastro/insumo.html',
    url: '/insumo',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/insumo.js',
            'scripts/services/insumo.js'
          ]
        });
      }
    }
  })
  .state('main.cadastro.embalagem', {
    templateUrl: 'views/cadastro/embalagem.html',
    url: '/embalagem',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/embalagem.js',
            'scripts/services/embalagem.js'
          ]
        });
      }
    }
  })
  .state('main.cadastro.rotulo', {
    templateUrl: 'views/cadastro/rotulo.html',
    url: '/rotulo',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/cadastro/rotulo.js',
            'scripts/services/rotulo.js'
          ]
        });
      }
    }
  })
  .state('main.estoque', {
    templateUrl: 'views/estoque/estoque.html',
    url: '/estoque/:tipoItem',
    params : {
      tipoItem:''
    },
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/estoque/estoque.js',
            'scripts/controllers/estoque/saldoLote.js',
            'scripts/controllers/estoque/inventario.js',
            'scripts/services/lote.js',
            'scripts/services/embalagem.js',
            'scripts/services/rotulo.js',
            'scripts/services/insumo.js',
            'scripts/services/produto.js'
          ]
        });
      }
    }
  })
  .state('main.producao', {
    template: '<div ui-view></div>',
    abstract: true,
    url: '/producao'
  })
  .state('main.producao.pedido', {
    templateUrl: 'views/producao/pedido.html',
    url: '/pedido/',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/producao/pedido.js',
            'scripts/services/pedido.js',
            'scripts/services/produto.js',
            'scripts/services/formaEntrega.js',
            'scripts/services/formaVenda.js'
          ]
        });
      }
    }
  })
  .state('main.ecom', {
    template: '<div ui-view></div>',
    abstract: true,
    url: '/ecom'
  })
  .state('main.ecom.promocao', {
    templateUrl: 'views/ecom/promocao.html',
    url: '/promocao/',
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/ecom/promocao.js',
            'scripts/services/promocao.js',
            'scripts/services/produto.js'
          ]
        });
      }
    }
  })
  .state('main.ecom.destaque', {
//    template: '<div ui-view></div>',
//    abstract: true,
    templateUrl: 'views/ecom/destaque.html',
    url: '/destaque/:tipo',    
    params : {
      tipo:''
    },
    resolve: {
      loadMyFiles: function ($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: [
            'scripts/controllers/ecom/destaque.js',
            'scripts/services/destaque.js',
            'scripts/services/produto.js',
            'scripts/services/pessoa.js'
          ]
        });
      }
    }
  })
//  .state('main.ecom.destaque.produto', {
//    templateUrl: 'views/ecom/destaque.html',
//    url: '/produto/',
//    resolve: {
//      loadMyFiles: function ($ocLazyLoad) {
//        return $ocLazyLoad.load({
//          name: 'sbAdminApp',
//          files: [
//            'scripts/controllers/ecom/destaque.js',
//            'scripts/services/destaque.js',
//            'scripts/services/produto.js',
//            'scripts/services/pessoa.js'
//          ]
//        });
//      }
//    }
//  })
//  .state('main.ecom.destaque.parceiro', {
//    templateUrl: 'views/ecom/destaque.html',
//    url: '/parceiro/',
//    resolve: {
//      loadMyFiles: function ($ocLazyLoad) {
//        return $ocLazyLoad.load({
//          name: 'sbAdminApp',
//          files: [
//            'scripts/controllers/ecom/destaque.js',
//            'scripts/services/destaque.js',
//            'scripts/services/produto.js',
//            'scripts/services/pessoa.js'
//          ]
//        });
//      }
//    }
//  })
  ;

})

.run(function ($http, $cookies, $interval, $rootScope, CONST) {
//          
  if($cookies.getObject('objToken')){
    $http.defaults.headers.common.Token = $cookies.getObject('objToken').token;
  }else{
    $http.defaults.headers.common.Token = undefined;
  }

  $interval(function(){
    if($cookies.getObject('objToken')){
      var expDt = $cookies.getObject('objToken').dtExpiracao;
      var curDt = new Date();
      $rootScope.sessionCountDown = CONST.sessao.alive + (moment.utc(moment(expDt).diff(moment(curDt))).format("HH:mm:ss"));
    } else {
      $rootScope.isLogged = false;
      $rootScope.sessionCountDown = CONST.sessao.dead;
      if($http.defaults.headers.common.Token){
        $http.defaults.headers.common.Token = undefined;
      }
        //chamar pop up de login
    }
  }, 1*1000);
  //}, 1*60*1000); //é possível incluir um 3º param para limitar o numero de iterações da function

});