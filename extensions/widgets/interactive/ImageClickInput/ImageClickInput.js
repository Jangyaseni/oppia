// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Directive for the GraphInput interactive widget.
 *
 * IMPORTANT NOTE: The naming convention for customization args that are passed
 * into the directive is: the name of the parameter, followed by 'With',
 * followed by the name of the arg.
 */

oppia.directive('oppiaInteractiveImageClickInput', [
  '$rootScope', '$sce', 'oppiaHtmlEscaper', function($rootScope, $sce, oppiaHtmlEscaper) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'interactiveWidget/ImageClickInput',
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        $scope.filepath = oppiaHtmlEscaper.escapedJsonToObj($attrs.imageAndRegionsWithValue).imagePath;
        $scope.imageUrl = $sce.trustAsResourceUrl(
          '/imagehandler/' + $rootScope.explorationId + '/' +
          encodeURIComponent($scope.filepath)
        );
        $scope.onClickImage = function(event) {
          var image = $($element).find('.oppia-image-click-img');
          var mouseX = event.pageX - image.offset().left;
          var mouseY = event.pageY - image.offset().top;
          console.log(mouseX," ",mouseY);
          $scope.$parent.$parent.submitAnswer([mouseX, mouseY], 'submit');
        }
      }]
    };
  }
]);
