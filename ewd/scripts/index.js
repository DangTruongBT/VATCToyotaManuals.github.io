/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



function call_runOnLoadProc()
{
	try{
		d_mainframe.window.navigate("./ewd_main.html" + window.location.search);
	}
	catch( e ){
		window.alert(e.description);
	}
}
