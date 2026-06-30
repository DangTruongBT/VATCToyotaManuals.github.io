


function call_runOnClickClose()
{
	try{
		parent.window.close();
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickPrint()
{
	try{
		parent.d_preview.window.focus();
		parent.d_preview.window.print();
	}
	catch( e ){
		window.alert(e.description);
	}
}
