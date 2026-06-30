/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



function call_runOnLoadProc()
{
	try{
		d_main.window.navigate("./index.html" + window.dialogArguments);
	}
	catch( e ){
		window.alert(e.description);
	}
}
