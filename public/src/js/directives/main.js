app.directive('main', [function() {
	return {
		restrict: "E",
		scope: false,
		transclude: true,
		replace: true,
		templateUrl: 'templates/partials/main.html',
		controller: 'MainCtrl'
	}
}]);