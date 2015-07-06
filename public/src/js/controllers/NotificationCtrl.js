app.controller('NotificationCtrl', ['$scope', 'NotificationService', function ($scope, NotificationService) {
	
	$scope.notification = NotificationService.getNotification();
	
}]);