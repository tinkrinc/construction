app.factory('Inspections', ['$resource', function($resource) {
	        
	return $resource('/inspections/:id', null, {
		'update': { method: 'PUT' }
	});
	
}])