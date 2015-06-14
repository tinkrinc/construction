app.factory('Units', ['$resource', function($resource) {
	        
	return $resource('/units/:id', null, {
		'update': { method: 'PUT' }
	});
	
}])