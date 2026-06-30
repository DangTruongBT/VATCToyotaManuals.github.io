/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


function call_runOnClickClose()
{
	try{
		parent.window.close()
	}
	catch( e ){
		window.alert(e.description);
	}
}
