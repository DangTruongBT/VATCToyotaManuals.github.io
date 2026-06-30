/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/

var DISP_NAME = "name";
var DISP_CODE = "code";

var PARTS_XML_NAME = "parts.xml";
var PARTS_XML_CODE = "partscode.xml";

var g_dispMode;

var g_ewdPartsList;




function call_runOnLoadProc()
{

	try{
		var sort = getURLParam("parts_sort");
		var search_key = getURLParam("search_key");
		var search_mode = getURLParam("search_mode");
		

		if( search_key == null ){
			if( sort == "code" )
				self.window.navigate("partslist_code.html" + window.location.search );
			else
				self.window.navigate("partslist_name.html" + window.location.search );
			return;
		}
		

		if( sort == "code" ){
			g_dispMode = DISP_CODE;
			g_ewdPartsList = new EwdPartsList(PARTS_XML_CODE);
		}
		else {
			g_dispMode = DISP_NAME;
			g_ewdPartsList = new EwdPartsList(PARTS_XML_NAME);
		}
		showList(search_key);
		
		

		var ewdItemCode = getURLParam("code");
		var ewdItemType = getURLParam("type");
		if( ewdItemCode != null ){
			ewdItemCode = ewdItemCode.replace(/\x2B/g, ",");
			setSelectedItemStyleByCode(ewdItemCode, ewdItemType);
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnLoadProcForNameList()
{
	try{
		g_dispMode = DISP_NAME;
		g_ewdPartsList = new EwdPartsList(PARTS_XML_NAME);
		

		var ewdItemCode = getURLParam("code");
		var ewdItemType = getURLParam("type");
		if( ewdItemCode != null ){
			ewdItemCode = ewdItemCode.replace(/\x2B/g, ",");
			setSelectedItemStyleByCode(ewdItemCode, ewdItemType);
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnLoadProcForCodeList()
{
	try{
		g_dispMode = DISP_CODE;
		g_ewdPartsList = new EwdPartsList(PARTS_XML_CODE);
		

		var ewdItemCode = getURLParam("code");
		var ewdItemType = getURLParam("type");
		if( ewdItemCode != null ){
			ewdItemCode = ewdItemCode.replace(/\x2B/g, ",");
			setSelectedItemStyleByCode(ewdItemCode, ewdItemType);
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_runOnMouseOver(){
	try{
		var obj = window.event.srcElement;
		if( obj.className == "menu_active" ) return;
		
		obj.className = "menu_hover";
	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_runOnMouseOut(){
	try{
		var obj = window.event.srcElement;
		if( obj.className == "menu_active" ) return;
		
		obj.className = "menu";
	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_runOnClickItem()
{
	try{

		var obj = window.event.srcElement;
		resetItemStyle();
		setSelectedItemStyle(obj);
		
		var type = getTypeFromID(obj.id);
		var code = getCodeFromID(obj.id);
		
		parent.d_info.showPartsInfo( type, code, true );
	}
	catch( e ){
		window.alert(e.description);
	}
}





function showList(key)
{

	var partsList = new PartsList();
	if( g_dispMode == DISP_NAME ){
		partsList.makePartsArrayForName(g_ewdPartsList.ewdPartsArray, key);
	} else {
		partsList.makePartsArrayForCode(g_ewdPartsList.ewdPartsArray, key);
	}
	
	
	if( partsList.partsArray.length == 0 ){
		document.body.innerHTML = parent.d_search.getNotFoundWord();
		return;
	}
	
	

	var xslPath = "../../styles/connector/list.xsl";
	document.body.innerHTML = partsList.makeHTML(xslPath);

}





function getListObj( ewdItemCode, ewdItemType )
{
	ewdItemCode = pickCode(ewdItemCode.split(",")[0], ewdItemType);
	ewdItemType = adjustType(ewdItemType)
	
	var objs = document.all.tags("div");
	for( var i=0; i < objs.length; i++ ){
		var tmpType = adjustType( getTypeFromID(objs(i).id) );
		if( tmpType != ewdItemType ) continue;
		
		var tmpCodeArray = getCodeFromID(objs(i).id).split(",");
		for( var j=0; j < tmpCodeArray.length; j++ ){
			if( ewdItemCode == pickCode(tmpCodeArray[j], tmpType) )
				return objs(i);
		}
	}
	
	return null;
}


function setSelectedItemStyleByCode( ewdItemCode, ewdItemType )
{
	var destObj = getListObj( ewdItemCode, ewdItemType );
	if( destObj == null ) return;
	
	setSelectedItemStyle( destObj );
	destObj.scrollIntoView();
}


function setSelectedItemStyle( destObj )
{
	if( destObj != null )
		destObj.className = "menu_active";
}



function resetItemStyle()
{
	var obj = document.all.tags("div");
	
	for(var i=0; i < obj.length; i++ ){
		if( obj(i).className != "menu" )
			obj(i).className = "menu";
	}
}
