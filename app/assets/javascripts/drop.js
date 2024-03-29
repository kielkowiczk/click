	function setup_drop_here_block() {
		$('.image').Jcrop({onSelect: update_selection_attributes, onChange: print_cord });
			
		drop_here = document.getElementById('drop_here');
		
		drop_here.addEventListener("dragenter", do_nothing, false);
		drop_here.addEventListener("dragexit", out_drop_block, false);
		drop_here.addEventListener("dragover", over_drop_block, false);
		
		drop_here.addEventListener("drop", droped_something, false);
	}
	
	filereader = false;
	
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		filereader = true;
	}else {
		$('#no_support_modal').dialog({modal: true, draggable: false, resizable: false, closeOnEscape: false, width: 600});
		$(".ui-dialog-titlebar").hide();
		
	}
	
	function set_border_color_normal() {
		$('#drop_here').css({'border-color': '#DEDEDE'});	
	}
	
	function out_drop_block(event){
		prevent_default(event);
		set_border_color_normal();
	}
	
	function over_drop_block(event) {
		prevent_default(event);
		$('#drop_here').css({'border-color': 'red'});
	}

	function prevent_default(event) {
	   event.stopPropagation();
	   event.preventDefault();
	 }
 
	function do_nothing(event) {
	   	prevent_default(event);
	 }
	
	function do_funky_stuff_with_droped_file(file) {
		reader = new FileReader();
		
		reader.onload = function (finished_reading_file_event) {
			var f_content = finished_reading_file_event.target.result;
			var f_name = file.name;
			var f_size = finished_reading_file_event.total;
			
			var boundary = "xxxxxxxxx";
			
			xhr = new XMLHttpRequest();
			
			xhr.open("POST", app_root_path + "/upload", true);
			
			xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary="+boundary);
			xhr.setRequestHeader("Content-Length", f_size);
			
			xhr.overrideMimeType('text/plain; charset=utf-8');
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					document.getElementById('dest').innerHTML = xhr.response;
					toogle_controllers( {to: true, button: false} );
					setup_drop_here_block();
				}
			}
			
			xhr.upload.addEventListener("progress", function(e) {  
			        if (e.lengthComputable) {  
			          var percentage = Math.round((e.loaded * 100) / e.total);  
			          $( "#progress_bar" ).progressbar( {value:  percentage} );
			        }  
			      }, false);
		    
		    xhr.upload.addEventListener("load", function(e) {  
				          $("#progress_bar").progressbar({value: 100});
				      }, false);
			
			var body = "--" + boundary + "\r\n";  
		  	body += "Content-Disposition: form-data; name=image; filename=" + f_name + "\r\n";  
		  	//body += "Content-Type: image/jpeg\r\n\r\n";  
			body += "Content-Type: application/octet-stream\r\n\r\n";  
		  	//body += $.base64Encode(f_content) + "\r\n";  
			body += f_content + "\r\n";  
		  	body += "--" + boundary + "--"; 
		
			xhr.send(body);
					   
		}
		
		$("#progress_bar").fadeIn('slow');
		
		reader.readAsDataURL(file);
	}
	
	function droped_something(event) {
	  	prevent_default(event);
	  
		files_droped = event.dataTransfer.files;
		var file = files_droped[0];
		
		if (file.size > 100000){
			$.gritter.add({title: 'File size error!', text: 'Please use smaller image file! File should be less then 100KB!', image: error_img_path });
			set_border_color_normal();
			
			return false;
		}
		
		var imageType = /image\/jpeg/;

	    if (!file.type.match(imageType)) {
			$.gritter.add({title: 'File type error!', text: 'Please use only JPG files.', image: error_img_path });

	        set_border_color_normal();
			return false;
	    }
	
		if (files_droped.length >= 1)
			do_funky_stuff_with_droped_file(files_droped[0]);
		
		return false;
	}
