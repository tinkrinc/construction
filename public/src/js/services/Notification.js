app.service('NotificationService', ['$timeout', function($timeout) {
	
	var notification = {
		visible: false,
		type: '',
		message: 'test',
		timer: undefined
	}
	
	this.setError = function(message) {
		
		notification.visible = true;
		notification.type = 'e';
		notification.message = message;
		
		timer = $timeout(function() {
			notification.visible = false;
		}, 5000);
	}
	
	this.getNotification = function() {
		return notification;
	}
	
	this.clearNotification = function() {
		$timeout.cancel(timer);
		notification.visible = false;
	}
	
}]);