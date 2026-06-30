/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/





function call_runOnLoadProc()
{
	try{
		var mode = getURLParam("imode");
		switch( mode ){

			case "category":
			self.window.navigate( "./menu/category_frame.html" + window.location.search );
			break;
			

			case "parts":
			self.window.navigate( "./connector/parts.html" + window.location.search );
			break;
			

			case "loads":
			self.window.navigate( "./loads/matrix.html" + window.location.search );
			break;
			

			case "ewd":
			self.window.navigate( "./common/fig_frame.html" + window.location.search );
			break;
			
			default:
			var paramTable = makeParamTable(window.location.search);
			paramTable.put("category","system");
			self.window.navigate( "./menu/category_frame.html" + makeParamString(paramTable) );
			break;
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}
