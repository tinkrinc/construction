app.directive('navigation', function() {
	return {
		restrict: "E",
		scope: false,
		transclude: true,
		replace: true,
		templateUrl: 'templates/partials/navigation.html',
		controller: function($scope, $element) {}
	}
});