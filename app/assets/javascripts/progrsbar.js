function setup_progresbar() {
	$("#progress_bar").progressbar({
		value: 0, 
		create: function() { 
			$("#progress_bar").hide();
			}, 
		complete: function(event, ui) { 
			$("#progress_bar").fadeOut('slow'); 
			} 
	});
}