app.controller('UnitCtrl', ['$scope', '$localStorage', 'Functions', 'Units', 'Projects', function ($scope, $localStorage, Functions, Units, Projects) {
	
	Projects.query(function(res) {
		$scope.projects = res;
		
		$scope.contextProject = ($localStorage.project) ? Functions.search_array($localStorage.project._id, $scope.projects) :  $scope.projects[0];
		
		Units.query({ project: $scope.contextProject._id }, function(res) {
			$scope.units = res;
		});
	});
	
	$scope.save = function() {
		
		if(!$scope.unitNumber || $scope.unitNumber.length < 1) return;
		
		var unit = new Units({ number: $scope.unitNumber, bedrooms: $scope.unitBedrooms, bathrooms: $scope.unitBathrooms, project: $scope.contextProject._id });
	
		unit.$save(function() {
			$scope.units.push(unit);
			$scope.unitNumber = '';
			$scope.unitBedrooms = '';
			$scope.unitBathrooms = '';
		});
		
	}
	
	$scope.update = function(index) {
		
		var unit = $scope.units[index];
		
		Units.update({id: unit._id}, unit);

	}
	
	$scope.remove = function(index) {
		
		var unit = $scope.units[index];
		
		Units.remove({id: unit._id}, function() {
			$scope.units.splice(index, 1);
		});
		
	}
	
	$scope.updateContext = function() {
		
		$localStorage.project = $scope.contextProject;
		
		Units.query({ project: $scope.contextProject._id }, function(res) {
			$scope.units = res;
		});
		
	}
	
}]);