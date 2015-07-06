app.directive('login', [function() {
	return {
		restrict: "E",
		scope: false,
		transclude: true,
		replace: true,
		templateUrl: 'templates/partials/login.html'
	}
}]);