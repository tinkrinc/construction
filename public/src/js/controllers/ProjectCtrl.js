app.controller('ProjectCtrl', ['$scope', '$localStorage', 'Projects', 'Organizations', function ($scope, $localStorage, Projects, Organizations) {
    
	Organizations.query(function(res) {
		$scope.organizations = res;
		$scope.contextOrganization = $scope.organizations[0];
		
		Projects.query({ organization: $scope.contextOrganization._id }, function(res) {
			$scope.projects = res;
		});
	});
	
	$scope.save = function() {
		
		if(!$scope.newProject || $scope.newProject.length < 1) return;
		
		var project = new Projects({ name: $scope.newProject, address: $scope.newAddress, organization: $scope.contextOrganization._id });
	
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
	
	$scope.updateContext = function() {
		
		Projects.query({ organization: $scope.contextOrganization._id }, function(res) {
			$scope.projects = res;
		});
		
	}
	
}]);