app.controller('LoginCtrl', ['$scope', '$location', 'AuthService', 'NotificationService', function ($scope, $location, AuthService, NotificationService) {
	
	$scope.form = {
		username: '',
		password: ''
	}
	
	//check if user is already logged in
	if(AuthService.check() !== false)
		$location.path('/users');
	
	//login event
	$scope.login = function() {
		
		console.log($scope.form.username);
		
		AuthService
			.login($scope.form.username, $scope.form.password)
			.then(
				function(res) {
					
					$scope.error = '';
					$location.path('/users');
						
				},
				function(res) {
					
					console.log(res);
					
					if(res.status == 401)
						NotificationService.setError('Invalid credentials');
					else
						NotificationService.setError('Something went wrong');
						
				}
			);
		
	}
	
}]);