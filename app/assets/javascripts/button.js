function setup_button(){
	$('.crop_button').button({disabled: true});
	// $('.pageslide_button').button();
	
	$('.crop_button').click(function() {
		if (typeof x == "undefined"){
			alert('Please select area first');
			return false;
		}
			
			
		console.log('x='+x+', y=' + y);
		
		$.ajax({
			url: 'crop_image',
			type: 'post',
			data: 'x='+x+'&y='+y+'&x2='+x2+'&y2='+y2+'&w='+w+'&h='+h,
			beforeSend: function() { 
				$('.spinner').css({visibility: 'visible'})		
				toogle_controllers(); 				
				}, 
			success: function(data) { 
				on_success(data);
			}
		});
	});

	// $('.pageslide_button').click(function() {
	// 	$.pageslide({ href: 'order', width: "350px", direction: "left" });
	// });
	
}