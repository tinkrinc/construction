app.factory('Projects', ['$resource', function($resource) {
	        
	return $resource('/projects/:id', null, {
		'update': { method: 'PUT' }
	});
	
}])