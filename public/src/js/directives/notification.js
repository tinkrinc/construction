app.directive('notification', ['NotificationService', function(NotificationService) {
	return {
		restrict: "E",
		scope: false,
		transclude: true,
		replace: true,
		templateUrl: 'templates/partials/notification.html',
		controller: 'NotificationCtrl'
	}
}]);