app.controller('InspectionCtrl', ['$scope', '$localStorage', 'Functions', 'Organizations', 'Projects', 'Inspections', function ($scope, $localStorage, Functions, Organizations, Projects, Inspections) {
	
	$scope.organizations = Organizations.query(function(res) {
		$scope.organizations = res;
		
		$scope.contextOrganization = ($localStorage.organization) ? Functions.search_array($localStorage.organization._id, $scope.organizations) :  $scope.organizations[0];
		
		Projects.query({ organization: $scope.contextOrganization._id }, function(res) {
			$scope.projects = res;
			
			if($scope.projects.length > 0) {
				$scope.contextProject = $scope.projects[0];
				
				Inspections.query({ project: $scope.contextProject._id }, function(res) {
					$scope.inspections = res;
				});
			}
		});
	});
	
	
	$scope.save = function() {
		
		var inspection = new Inspections({ project: $scope.contextProject._id });
	
		inspection.$save(function() {
			$scope.inspections.push(inspection);
		});
		
	}
	
	$scope.update = function(index) {
		
		var inspection = $scope.inspections[index];
		
		Inspections.update({id: inspection._id}, inspection);

	}
	
	$scope.remove = function(index) {
		
		var inspection = $scope.inspections[index];
		
		Inspections.remove({id: inspection._id}, function() {
			$scope.inspections.splice(index, 1);
		});
		
	}
	
	$scope.updateContextOrganization = function() {
		
		$localStorage.organization = $scope.contextOrganization;
		
		Projects.query({ organization: $scope.contextOrganization._id }, function(res) {
			$scope.projects = res;
			
			if($scope.projects.length > 0) {
				$scope.contextProject = $scope.projects[0];
				$scope.updateContextInspection();
			} else {
				$scope.inspections = [];
			}
		});
		
	}
	
	$scope.updateContextInspection = function() {
		
		$localStorage.project = $scope.contextProject;
		
		Inspections.query({ project: $scope.contextProject._id }, function(res) {
			$scope.inspections = res;
		});
		
	}
	
}]);