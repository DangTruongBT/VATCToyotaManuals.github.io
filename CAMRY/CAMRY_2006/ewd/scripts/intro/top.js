


function call_runOnMouseOver()
{
	try{
		window.event.srcElement.className = "titlelist_hover";
	}
	catch(e){
		window.alert(e.description);
	}
}

function call_runOnMouseOut()
{
	try{
		window.event.srcElement.className = "titlelist";
	}
	catch(e){
		window.alert(e.description);
	}
}

function call_runOnClickContents(code)
{
	var name = window.event.srcElement.innerHTML;

	
	if( code == "help" ){

		parent.window.navigate("../howto/index.html");
	}
	else{
		parent.showLeftFrame(true);
		
		parent.d_header.updateHTML(name);
		parent.d_menu.updateHTML(name);
		parent.d_submenu.updateHTML(code);
		
		self.window.navigate(code + ".xml");
	}
}
