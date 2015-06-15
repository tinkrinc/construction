app.controller('MainCtrl', ['$scope', '$localStorage', '$location', 'Auth', function ($scope, $localStorage, $location, Auth) {
	
	$scope.logout = function() {
		
		Auth.logout.go({}, function(user) {
			$localStorage.$reset();
			$location.path('/login');
		});
		
	}
	
}]);