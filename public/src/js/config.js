app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	
	$httpProvider.interceptors.push('AuthInterceptor');
	
	$routeProvider
		.when('/login', {
			templateUrl: '/templates/login.html',
			controller: 'LoginCtrl'
		})
		
		.when('/users', {
			templateUrl: '/templates/users.html',
			controller: 'UserCtrl'
		})
		
		.when('/roles', {
			templateUrl: '/templates/roles.html',
			controller: 'RoleCtrl'
		})
		
		.when('/organizations', {
			templateUrl: '/templates/organizations.html',
			controller: 'OrganizationCtrl'
		})
		
		.when('/projects', {
			templateUrl: '/templates/projects.html',
			controller: 'ProjectCtrl'
		})
		
		.when('/units', {
			templateUrl: '/templates/units.html',
			controller: 'UnitCtrl'
		})
		
		.otherwise({
        	redirectTo: '/login'
      	});
}]);