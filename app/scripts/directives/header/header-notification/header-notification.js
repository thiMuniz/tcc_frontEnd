'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
app.directive('headerNotification', function () {
  return {
    templateUrl: 'scripts/directives/header/header-notification/header-notification.html',
    restrict: 'E',
    replace: true,
  }
});


