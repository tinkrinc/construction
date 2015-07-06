app.controller('InspectionCtrl', ['$scope', '$localStorage', 'Functions', 'Organizations', 'Projects', 'Inspections', 'NotificationService', function ($scope, $localStorage, Functions, Organizations, Projects, Inspections, NotificationService) {
	
	$scope.organizations = Organizations.query().$promise.then(
			function(res) {
				
				$scope.organizations = res;
		
				$scope.contextOrganization = ($localStorage.organization) ? Functions.search_array($localStorage.organization._id, $scope.organizations) :  $scope.organizations[0];
				
				return Projects.query({ organization: $scope.contextOrganization._id }).$promise;
				
			}
		).then(
			function(res) {
				
				$scope.projects = res;
				
				if($scope.projects.length > 0) {
					$scope.contextProject = $scope.projects[0];
					
					return Inspections.query({ project: $scope.contextProject._id }).$promise;
				}
				
			}
		).then(
			function(res) {
				
				$scope.inspections = res;
				
			}
		).catch(function(e) {
			NotificationService.setError('Unable to load organization data');
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
		
		Projects.query({ organization: $scope.contextOrganization._id }).$promise.then(
			function(res) {
				
				$scope.projects = res;
			
				if($scope.projects.length > 0) {
					$scope.contextProject = $scope.projects[0];
					$scope.updateContextInspection();
				} else {
					$scope.inspections = [];
				}
				
			},
			function(res) {
				NotificationService.setError('Unable to load organization data');
			}
		);
		
	}
	
	$scope.updateContextInspection = function() {
		
		$localStorage.project = $scope.contextProject;
		
		Inspections.query({ project: $scope.contextProject._id }).$promise.then(
			function(res) {
				$scope.inspections = res;
			},
			function(res) {
				NotificationService.setError('Unable to load project data');
			}
		);
		
	}
	
}]);