app.factory('Functions', [function() {
	        
	return {
		search_array: function(key, array) {
	
		    for(var i = 0; i < array.length; i++)
		        if(array[i]._id === key)
		            return array[i];
		    
		    return undefined;
		    
		}
	}
	
}])