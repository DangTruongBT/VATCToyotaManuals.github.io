/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var g_paramTable = null;



function getURLParam( param )
{
	if( g_paramTable == null ){
		g_paramTable = makeParamTable( window.location.search );
	}
	
	return g_paramTable.get( param );
}



function getURLParamSize()
{
	if( g_paramTable == null ){
		g_paramTable = makeParamTable( window.location.search );
	}
	return g_paramTable.size();
}





function makeParamTable( search )
{
	var paramTable = new Hashtable();
	
	if( search == null ) return paramTable;
	if( search.length < 2 ) return paramTable;
	if( search.charAt(0) != "?" ) return paramTable;
	

	var paramArray = search.substr(1).split(/&|%26/);

	

	for(var i=0; i < paramArray.length; i++){

		var tmpArray = paramArray[i].split("=");
		if(tmpArray.length != 2) continue;
		paramTable.put(tmpArray[0], tmpArray[1]);
	}
	
	return paramTable;
}




function makeParamString( paramTable )
{
	var paramString = "";
	
	if( paramTable == null ) return paramString;
	
	var keys = paramTable.keys();
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		var val = paramTable.get(key);
		if( val == null || val == "" ) continue;
		if( paramString.length == 0 ){
			paramString += "?";
		} else {
			paramString += "&";
		}
		paramString += key + "=" + val;
	}
	return paramString;
}








function appendRequiredParam( paramTable, winObj )
{
	if( paramTable == null ) return;
	if( winObj == null ) winObj = self;
	
	
	var tmpKey;
	
	tmpKey = "term";
	paramTable.put(tmpKey, winObj.getURLParam(tmpKey));
	
	tmpKey = "filter";
	paramTable.put(tmpKey, winObj.getURLParam(tmpKey));
	
	tmpKey = "vin";
	paramTable.put(tmpKey, winObj.getURLParam(tmpKey));
}
