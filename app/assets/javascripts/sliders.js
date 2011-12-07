function on_success(data) {
	$('#result_image').html(data); 
	
	toogle_controllers();
	
	$('.image').Jcrop({onSelect: update_selection_attributes });
	$('.spinner').css({visibility: 'hidden'})
}

function setup_sliders() {
	sliders_enabled = false;
	
	$("#blur_slider").slider({
		disabled: true,
		min: 1,
		max: 10,
		change: function() {
			$.ajax({
				url: 'http://localhost:3000/process',
				type: 'POST',
				data: 'blur_slider='+$("#blur_slider").slider('value') +"&" + 'segmentation_slider='+$("#sementation_slider").slider('value') + '&authenticity_token='+encodeURIComponent(authenticity_token),
				beforeSend: function() { 
					$('.spinner').css({visibility: 'visible'})		
					toogle_controllers(); 				
					}, 

				success: function(data) { 
					on_success(data);
				}
			})
		},
		slide: function () {
			$('#blur_slider_value').html($("#blur_slider").slider('value'));

		}
	});
	
	$("#segmentation_slider").slider({
		disabled: true,
		min: 0,
		max: 20,
		change: function() {
			$.ajax({
				url: 'http://localhost:3000/process',
				type: 'POST',
				data: 'blur_slider='+$("#blur_slider").slider('value') +"&" + 'segmentation_slider='+$("#segmentation_slider").slider('value') + '&authenticity_token='+encodeURIComponent(authenticity_token),
				beforeSend: function() {
				$('.spinner').css({visibility: 'visible'})
					toogle_controllers(); 
					$("#result_image").animate({borderColor: 'yellow'}, "fast").animate({borderColor: '#DEDEDE'}, "fast");
				}, 
				success: function(data) { 
					on_success(data);
				}
			})
		},
		
		slide: function () {
			$('#segmentation_slider_value').html($("#segmentation_slider").slider('value'));

		}
	});
}

function toogle_controllers(force) {
	if (typeof force == "undefined"){
		if (sliders_enabled) {
			$("#blur_slider").slider({ disabled: true});
			$("#segmentation_slider").slider({ disabled: true});
			$('.crop_button').button({disabled: true})
		
			sliders_enabled = false;
		}else {
			$("#blur_slider").slider({ disabled: false});
			$("#segmentation_slider").slider({ disabled: false});
			$('.crop_button').button({disabled: false})
		
			sliders_enabled = true;
		}
	}else{
			$("#blur_slider").slider({ disabled: !force.to});
			$("#segmentation_slider").slider({ disabled: !force.to});
			$('.crop_button').button({disabled: !force.button})
			sliders_enabled = force.to
	}
}