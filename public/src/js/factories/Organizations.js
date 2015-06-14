app.factory('Organizations', ['$resource', function($resource) {
	        
	return $resource('/organizations/:id', null, {
		'update': { method: 'PUT' }
	});
	
}])