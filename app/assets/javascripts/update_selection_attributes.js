function update_selection_attributes(cord){
	x = cord.x;
	y = cord.y;
	x2 = cord.x2;
	y2 = cord.y2;
	w = cord.w;
	h = cord.h;
	
	toogle_controllers({to: true, button: true});
}

function print_cord(cord) {
	console.log('x='+cord.x+' y='+cord.y+' w='+cord.w+' h='+cord.h)
}