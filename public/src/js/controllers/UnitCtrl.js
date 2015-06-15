app.controller('UnitCtrl', ['$scope', 'Units', 'Projects', function ($scope, Units, Projects) {
    
	$scope.units = Units.query();
	
	Projects.query(function(res) {
		$scope.projects = res;
		$scope.unitProject = $scope.projects[0];
	});
	
	$scope.save = function() {
		
		if(!$scope.unitNumber || $scope.unitNumber.length < 1) return;
		
		var unit = new Units({ number: $scope.unitNumber, bedrooms: $scope.unitBedrooms, bathrooms: $scope.unitBathrooms, project: $scope.unitProject._id });
	
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
	
}]);