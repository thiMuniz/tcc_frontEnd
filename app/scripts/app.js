'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var app = angular
        .module('sbAdminApp', [
          'oc.lazyLoad',
          'ui.router',
          'ui.bootstrap',
          'angular-loading-bar',
          'ngMdIcons',
          'ngImgCrop',
          'ngMessages',
          'ngResource',
          'mwl.calendar',
          'ngCpfCnpj',
          'toastr'
        ])        
        .constant("WS", {
          urlSGP: "http://192.168.25.8:11392/SGI/",
          urlCorreios: "",
          urlRF: ""
        })
        .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

            $ocLazyLoadProvider.config({
              debug: false,
              events: true
            });

            $urlRouterProvider.otherwise('/main/home');

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
                              'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
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
//      .state('login',{
//        templateUrl:'views/pages/login.html',
//        url:'/login'
//    })
                    .state('login', {
                      templateUrl: 'views/login.html',
                      url: '/login',
                      resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                          return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: ['scripts/controllers/login.js']
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
                      url: '/fornecedor',
                      resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                          return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                              'scripts/controllers/cadastro/fornecedor.js',
                              'scripts/services/fornecedor.js'
                            ]
                          });
                        }
                      }
                    })
                    .state('main.cadastro.colaborador', {
                      templateUrl: 'views/cadastro/colaborador.html',
                      url: '/colaborador',
                      resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                          return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                              'scripts/controllers/cadastro/colaborador.js',
                              'scripts/services/colaborador.js'
                            ]
                          });
                        }
                      }
                    })
                    .state('main.cadastro.cliente', {
                      templateUrl: 'views/cadastro/cliente.html',
                      url: '/cliente',
                      resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                          return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                              'scripts/controllers/cadastro/cliente.js',
                              'scripts/services/cliente.js'
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
                              'scripts/services/receita.js'
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
                              'scripts/services/produto.js'
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
                    });
          }]);