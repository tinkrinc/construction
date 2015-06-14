app.controller('OrganizationCtrl', ['$scope', 'Organizations', function ($scope, Organizations) {
    
	$scope.organizations = Organizations.query();
	
	$scope.save = function() {
		
		if(!$scope.newOrganization || $scope.newOrganization.length < 1) return;
		
		var organization = new Organizations({ name: $scope.newOrganization });
	
		organization.$save(function() {
			$scope.organizations.push(organization);
			$scope.newOrganization = ''; // clear textbox
		});
		
	}
	
	$scope.update = function(index) {
		
		var organization = $scope.organizations[index];
		
		Organizations.update({id: organization._id}, organization);

	}
	
	$scope.remove = function(index) {
		
		var organization = $scope.organizations[index];
		
		Organizations.remove({id: organization._id}, function() {
			$scope.organizations.splice(index, 1);
		});
		
	}
	
}]);