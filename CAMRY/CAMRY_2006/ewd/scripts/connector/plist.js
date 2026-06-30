/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var g_titleObj;

var g_partsList;
var g_codesListObj;

function call_runOnLoadProc()
{

	
	try{
		var mapCode = getURLParam("ewd");
		var mapType = getURLParam("ewd_type");
		

		g_titleObj = parent.getTitleObj();
		g_codesListObj = parent.g_codesListObj;
		g_partsList = parent.g_partsList;
		

		showPartsList();
		

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
		var type = getTypeFromID(obj.id);
		var code = getCodeFromID(obj.id);
		

		try{
			selectSvgSymbol(type, code);
		}
		catch(e){
			window.alert(e.description);
			return;
		}
		

		resetItemStyle();
		setSelectedItemStyle(obj);
		

		parent.d_partsinfo.showPartsInfo( type, code, true );
	}
	catch( e ){
		window.alert(e.description);
	}
}




function selectSvgSymbol(type, codeString)
{

	if( existEwdItem(type, codeString) ){
		var flgSub = parent.getSubcodeFlag();
		parent.d_map.d_figmap.drawSymbol(codeString, type, flgSub, true);
	}
	else {
		loadMapWithEwdItem(type, codeString);
	}
}





function existEwdItem(type, codeString)
{
	var figNo = parent.d_map.d_figctrl.getCurFigNo();
	if( figNo == null ) figNo = 1;
	var figIndex = figNo - 1;
	var codesData = g_codesListObj.codesDataArray[figIndex];
	
	var codeArray = codeString.split(",");
	for(var i=0; i < codeArray.length; i++){
		var code = pickCode(codeArray[i], type);
		var subcode = pickSubcode(codeArray[i], type);
		if( codesData.isContain(type, code, subcode) ){
			return true;
		}
	}
	
	return false;
}


function loadMapWithEwdItem(type, codeString)
{
	var figNoArray = new Array();
	var codeArray = codeString.split(",");
	for( var i=0; i < codeArray.length; i++ ){
		var code = pickCode(codeArray[i], type);
		var subcode = pickSubcode(codeArray[i], type);
		var tmpFigNoArray = g_codesListObj.searchFigNoArray(type, code, subcode);
		figNoArray = figNoArray.concat(tmpFigNoArray);
	}

	figNoArray = figNoArray.sort();
	

	parent.loadMap(g_titleObj, figNoArray[0], codeString, type);
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


function showPartsList()
{

	var xslPath = "../../styles/connector/list.xsl";
	document.body.innerHTML = g_partsList.makeHTML(xslPath);

}
