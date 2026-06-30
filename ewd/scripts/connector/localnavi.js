/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved.
*/

var DEFAULT_COLS_SIZE = null;
var DEFAULT_ROWS_SIZE = null;

var g_partsList = null;
var g_codesListObj = null;

var g_prevColsSize = null;



function loadLocalNavi()
{
	initLocalNavi();
	initFrameSize();
	
	d_partslist.window.navigate("../connector/plist.html" + window.location.search );
	d_partsinfo.window.navigate("../connector/pinfo.html" + window.location.search );
}



function initLocalNavi()
{
	var titleObj = getTitleObj();
	g_codesListObj = new CodesList( titleObj, "../" );
	g_partsList = makePartsList( titleObj, g_codesListObj );
}



function makePartsList( titleObj, codesListObj )
{
	var partsList = new PartsList();
	
	var ewdPartsList   = new EwdPartsList("../connector/parts.xml");
	var relayTitleList = new TitleList("../relay/title.xml", TITLE_TYPE_RELAY);
	ewdPartsList.appendRelayPartsInfo( relayTitleList );
	
	

	var filteringType = "conn";
	var flagShowCode = false;
	if( titleObj.getType() == TITLE_TYPE_RELAY ){
		filteringType = null;
		if( titleObj.getRelayType() == "object" || titleObj.getRelayType() == "inner"){
			flagShowCode = true;
		}
	}
	
	

	partsList.makePartsArrayForMap(codesListObj, ewdPartsList, filteringType, flagShowCode);
	partsList.sort();
	
	return partsList;
}




function initFrameSize()
{
	DEFAULT_COLS_SIZE = document.all("Frame1").cols;
	DEFAULT_ROWS_SIZE = document.all("Frame2").rows;
	
	g_prevColsSize = DEFAULT_COLS_SIZE;
	
	if( getURLParam("localnavi") == "no" || getListLength() == 0 ){
		document.all("Frame1").cols = "0,*";
	}
}





function searchCodesRefsObj( type, code, subcode )
{
	return g_codesListObj.makeCodesRefs( type, code, subcode );
}



function filterByCodes( ewdPartsArray )
{
	var retArray = new Array();
	
	for(var i=0; i < ewdPartsArray.length; i++ ){
		var objParts = ewdPartsArray[i];
		var tmpArray = g_codesListObj.searchFigNoArray(
				objParts.getType(), objParts.getCode(), objParts.getSubCode() );
		

		if( tmpArray.length != 0 ){
			retArray[retArray.length] = objParts;
		}
	}
	
	return retArray;
}



function filterParts( ewdPartsArray, objEwdPartsList )
{
	var retArray = new Array();
	
	for( var i=0; i < ewdPartsArray.length; i++ ){
		var tmpParts = ewdPartsArray[i];
		
		for( var j=0; j < retArray.length; j++ ){

			if( objEwdPartsList.isSameParts(retArray[j], tmpParts.getType(), tmpParts.getCode(), tmpParts.getSubCode(), true) ){

				if( retArray[j].getSpec() == tmpParts.getSpec() ){

					if( retArray[j].getColor() == tmpParts.getColor() ){
						tmpParts = null;
						break;
					}
				}
			}
		}
		

		if( tmpParts != null ){
			retArray[retArray.length] = tmpParts;
		}
	}
	
	return retArray;
}


function getListLength()
{
	try{
		var length = g_partsList.partsArray.length;
		return length;
	}
	catch(e){
		window.alert(e.description);
		return null;
	}
}



function showConnListFrame( bool )
{
	var destObj = document.all("Frame2");
	
	if( bool ){
		destObj.rows = "0,*";
	}
	else {
		destObj.rows = DEFAULT_ROWS_SIZE;
	}
}


function showLocalNavi( bool )
{
	var destObj = document.all("Frame1");
	
	if( bool ){
		if( g_prevColsSize == null ) return;
		destObj.cols = g_prevColsSize;
		g_prevColsSize = null;
		setNoResize( destObj.children(0), false );
	}
	else {
		g_prevColsSize = destObj.cols;
		destObj.cols = "0,*";
		setNoResize( destObj.children(0), true );
	}
}


function setNoResize( frmset, val )
{
	for( i = 0; i < frmset.children.length; i++ ){
		frmset.children(i).noResize=val;
	}
}
