app.controller('MainCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
	
	$scope.logout = function() {
		
		AuthService
			.logout()
			.then(
				function(res) {
					$location.path('/login');
				},
				function(res) {}
			);
		
	}
	
}]);