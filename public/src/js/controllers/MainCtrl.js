app.controller('MainCtrl', ['$scope', '$location', 'AuthService', 'NotificationService', function ($scope, $location, AuthService, NotificationService) {

	$scope.logout = function() {

		AuthService
			.logout()
			.then(
				function(res) {
					$location.path('/login');
				},
				function(res) {
					//console.log(res);
				}
			);
		
	}
	
}]);