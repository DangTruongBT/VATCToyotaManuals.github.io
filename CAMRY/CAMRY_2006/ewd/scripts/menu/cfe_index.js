/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/





function call_runOnClickConnectorList()
{
	try{
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		
		parent.window.navigate( "../connector/parts.html" + makeParamString(paramTable) );
	}
	catch( e ){
		window.alert(e.description);
	}
}





function call_runOnClickLoads( loads )
{
	try{
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("loads",loads);
		
		parent.window.navigate( "../loads/matrix.html" + makeParamString(paramTable) );
	}
	catch( e ){
		window.alert(e.description);
	}
}



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

