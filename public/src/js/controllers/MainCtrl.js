app.controller('MainCtrl', ['$scope', '$localStorage', '$location', 'AuthService', function ($scope, $localStorage, $location, AuthService) {
	
	$scope.logout = function() {
		
		AuthService
			.logout()
			.then(
				function(res) {
					
					$localStorage.$reset();
					$location.path('/login');
							
				},
				function(res) {
					
					
					
				}
			);
		
	}
	
}]);