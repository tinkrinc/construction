app.service('AuthService', ['$q', '$http', '$localStorage', function($q, $http, $localStorage) {
	
	//check
	this.check = function() {
		
		return ($localStorage.user) ? $localStorage.user : false;
		
	}
	
	//login
	this.login = function(u, p) {
		
		var deferred = $q.defer();
		var user = this.check();
		
		if(user !== false) {
			deferred.resolve();
		} else {
			
			$http.post('/auth/login/', { username: u, password: p })
				.then(
					function(res) {
						$localStorage.user = res.data;
						
						deferred.resolve();
					},
					function(res) {
						deferred.reject(res);
					}
				);
		
		}
		
		return deferred.promise;
		
	}
	
	//logout	
	this.logout = function() {
		
		var deferred = $q.defer();
		
		$http.post('/auth/logout/')
			.then(
				function(res) {
					$localStorage.$reset();
					
					deferred.resolve();
				},
				function(res) {
					deferred.reject(res);
				}
			);
		
		return deferred.promise;
		
	}
	
}]);