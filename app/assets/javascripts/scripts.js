jQuery('documnet').ready(function () {
	//setup tour
	tour();
	
	//slinde on clicing on alfa sig
	$('.alfa_sign').slideto({
		target: '.dest',
		speed: 'slow'
	});

	setup_sliders();
	
	setup_button();
	
	//logout link
	$(".logout_link").click( function() { FB.logout(); });
	
	//page sliding from left

	$('a.pageslide').pageSlide({ width: "350px", direction: "left" });
	
	setup_progresbar();
	
	//setup drop and file upload
	if (FB.getUserID() != 0) {
		setup_drop_here_block();
	}
	
	$(".zoom_to").click(function(evt) {
						evt.stopPropagation();
						evt.preventDefault();
	
						$(this).zoomTo({debug:true});
	})
	
	$(window).click(function(evt) {
						evt.stopPropagation();
						$("body").zoomTo({targetsize:1.0});
	});
})