app.controller('LoginCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
	
	$scope.error = '';
	
	//check if user is already logged in
	if(AuthService.check() !== false)
		$location.path('/users');
	
	//login event
	$scope.login = function() {
		
		AuthService
			.login($scope.username, $scope.password)
			.then(
				function(res) {
					
					$scope.error = '';
					$location.path('/users');
						
				},
				function(res) {
					
					if(res.status == 401)
						$scope.error = 'Invalid credentials';
					else
						$scope.error = 'Something went wrong';
						
				}
			);
		
	}
	
}]);