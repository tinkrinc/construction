app.controller('RoleCtrl', ['$scope', 'Roles', function ($scope, Roles) {
    
    $scope.roles = Roles.query();
    
    $scope.access_users = {};
	$scope.access_roles = {};
    $scope.access_organizations = {};
    $scope.access_projects = {};
    $scope.access_inspections = {};
	
	$scope.save = function() {
		
		if(!$scope.name || $scope.name.length < 1) return;
		
		var role = new Roles({ 
			name: $scope.name, 
			access: {
				users: {
					create: $scope.access_users.create,
					read: $scope.access_users.read,
					update: $scope.access_users.update,
					delete: $scope.access_users.delete
				},
				roles: {
					create: $scope.access_roles.create,
					read: $scope.access_roles.read,
					update: $scope.access_roles.update,
					delete: $scope.access_roles.delete
				},
				organizations: {
					create: $scope.access_organizations.create,
					read: $scope.access_organizations.read,
					update: $scope.access_organizations.update,
					delete: $scope.access_organizations.delete
				},
				projects: {
					create: $scope.access_projects.create,
					read: $scope.access_projects.read,
					update: $scope.access_projects.update,
					delete: $scope.access_projects.delete
				},
				inspections: {
					create: $scope.access_inspections.create,
					read: $scope.access_inspections.read,
					update: $scope.access_inspections.update,
					delete: $scope.access_inspections.delete
				}
			} 
		});
	
		role.$save(function() {
			$scope.roles.push(role);
			$scope.name = ''; // clear textbox
		});
		
	}
	
	$scope.update = function(index) {
		
		var role = $scope.roles[index];
		console.log(role);
		
		Roles.update({id: role._id}, role);

	}
	
	$scope.remove = function(index) {
		
		var role = $scope.roles[index];
		
		Roles.remove({id: role._id}, function() {
			$scope.roles.splice(index, 1);
		});
		
	}
	
}]);