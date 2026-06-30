


function call_runOnLoadProc()
{
	try{

		document.body.innerHTML = self.dialogArguments[2];
	}
	catch( e ){
		window.alert(e.description);
	}
}
