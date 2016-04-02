'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
app.directive('stats', function () {
  return {
    templateUrl: 'scripts/directives/main/stats/stats.html',
    restrict: 'E',
    replace: true,
    scope: {
      'model': '=',
      'comments': '@',
      'number': '@',
      'name': '@',
      'colour': '@',
      'details': '@',
      'type': '@',
      'goto': '@'
    }

  }
});
