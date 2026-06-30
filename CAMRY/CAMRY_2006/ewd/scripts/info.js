/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/
function call_runOnClickInfo()
{
	var obj = window.event.srcElement;
	self.window.navigate("./" + obj.id + ".pdf");
}


function call_runOnMouseOver()
{
	try{
		window.event.srcElement.className = "titlelist_hover";
	}
	catch(e){
	}
}


function call_runOnMouseOut()
{
	try{
		window.event.srcElement.className = "titlelist";
	}
	catch(e){
	}
}

