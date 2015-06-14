app.controller('ProjectCtrl', ['$scope', 'Projects', 'Organizations', function ($scope, Projects, Organizations) {
    
	$scope.projects = Projects.query();
	Organizations.query(function(res) {
		$scope.organizations = res;
		$scope.projectOrganization = $scope.organizations[0];
	});
	
	$scope.save = function() {
		
		if(!$scope.newProject || $scope.newProject.length < 1) return;
		
		var project = new Projects({ name: $scope.newProject, address: $scope.newAddress, organization: $scope.projectOrganization._id });
	
		project.$save(function() {
			$scope.projects.push(project);
			$scope.newProject = ''; // clear textbox
		});
		
	}
	
	$scope.update = function(index) {
		
		var project = $scope.projects[index];
		
		Projects.update({id: project._id}, project);

	}
	
	$scope.remove = function(index) {
		
		var project = $scope.projects[index];
		
		Projects.remove({id: project._id}, function() {
			$scope.projects.splice(index, 1);
		});
		
	}
	
}]);