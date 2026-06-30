/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



var MODE = "FigMap";
var g_titleObj = null;

var g_flgExistPlate = false;



function getMode()
{
	return MODE;
}



function getTitleObj()
{
	return g_titleObj;
}



function call_runOnLoadProc()
{
	try{

		if( parent != self ){
			parent.showGlobalNavi( true );
		}
		

		var bSuccess = initialize();
		if( bSuccess == false ) return;
		
		loadLocalNavi();
		
		loadMapForInit();
	}
	catch( e ){
		window.alert(e.description);
	}
}


function initialize()
{
	var ewdCode = getURLParam("ewd");
	var ewdType = getURLParam("ewd_type");
	if( ewdCode == null ) return false;
	if( ewdType == null ) return false;
	

	var subPath = null;
	var pathPS = "";
	switch( ewdType ){
		case TITLE_TYPE_SYSTEM:
			subPath = "../system/title-gp.xml";
			pathPS = "../system/title-ps.xml";
			break;

		case TITLE_TYPE_ROUTING:
			subPath = "../../defs/area.xml";		break;
	}
	
	var filePath = "../" + ewdType + "/title.xml";
	var titleList = new TitleList(filePath, ewdType, subPath, pathPS);
	g_titleObj = titleList.getTitleObjByCode(ewdCode);
	if( g_titleObj == null ) return false;
	
	

	searchPlateTitle(titleList, g_titleObj);
	
	
	return true;
}





function loadMapForInit()
{
	var paramTable = makeParamTable(window.location.search);
	
	

	var figNo = null;
	if( getURLParam("fig_search") == "yes" ){
		var type = getURLParam("type");
		var code = getURLParam("code");
		var figNoArray = g_codesListObj.searchFigNoArray(type, pickCode(code, type), pickSubcode(code, type));
		figNo = figNoArray[0];
	} else {
		figNo = getURLParam("fig_no");
	}
	
	var figFilePath = makeFigFilePath(g_titleObj, figNo);
	var figLength = g_titleObj.getFigTextArray().length;
	
	paramTable.put("fig_no",  figNo);
	paramTable.put("figname", figFilePath);
	paramTable.put("fig_len", figLength);
	
	
	setFigCtrlParam(g_titleObj, paramTable);
	
	
	if( getURLParam("localnavi") == "no" ){
		paramTable.put("frm_ctrl","close");
	}
	else {
		if( getListLength() == 0 )
			paramTable.put("frm_ctrl","close");
		else
			paramTable.put("frm_ctrl","open");
	}
	
	
	d_map.window.navigate( "../common/fig_subframe.html" + makeParamString(paramTable) );
}


function loadMap(titleObj, figNo, partsCode, partsType)
{
	var paramTable = makeParamTable();
	
	
	var figFilePath = makeFigFilePath(titleObj, figNo)
	var figLength = titleObj.getFigTextArray().length;
	
	paramTable.put("fig_no",  figNo);
	paramTable.put("figname", figFilePath);
	paramTable.put("fig_len", figLength);
	
	
	setFigCtrlParam(titleObj, paramTable);
	
	
	if( d_map.d_header.isOpenFrame() ){
		paramTable.put("frm_ctrl","open");
	} else {
		paramTable.put("frm_ctrl","close");
	}
	
	
	if( partsCode != null ){
		paramTable.put("code", partsCode.replace(/,/g, "+"));
		paramTable.put("type", partsType);
	}
	
	
	d_map.window.navigate("../common/fig_subframe.html" + makeParamString(paramTable));
}


function makeFigFilePath(titleObj, figNo)
{
	return "../" + titleObj.getType() + "/fig/" + titleObj.getFigFileName(figNo);
}


function setFigCtrlParam(titleObj, paramTable)
{
	if( titleObj.getType() == TITLE_TYPE_SYSTEM ){
		paramTable.put("connlist","yes");
		if( existOutline(titleObj) ){
			paramTable.put("outline", "yes");
		}
	}
	else if( titleObj.getType() == TITLE_TYPE_RELAY ){
		if( titleObj.isInner() || titleObj.hasInner() ){
			paramTable.put("page_select","yes");
			

			if( g_flgExistPlate ){
				paramTable.put("page_plate", "yes");
			}
			
			if( titleObj.isInner() ){

				if( titleObj.isPlate() ){
					paramTable.put("page", "plate");
				}else{	
					paramTable.put("page", "inner");
				}
			}
			else{
				paramTable.put("page", "object");
			}
		}
	}
}


function existOutline(titleObj)
{

	var path = "../system/outline/" + titleObj.getBaseFig() + ".xml";
	try{
		loadXML( path );
		return true;
	}
	catch(e){

		return false;
	}
}


function searchPlateTitle(titleList, titleObj)
{
	if( titleObj.getType() == TITLE_TYPE_RELAY ){
		if( titleObj.isInner() || titleObj.hasInner() ){
			var plateCode = titleObj.makePlateCode();
			var plateObj = titleList.getTitleObjByCode(plateCode)
			if( plateObj != null)
				g_flgExistPlate = true;
		}
	}
}







function showConnectList()
{
	var titleObj = getTitleObj();
	if( titleObj.getType() != TITLE_TYPE_SYSTEM ) return;
	

	var rootNode = d_map.d_figmap.view.fig.svgRootNode;
	d_map.d_figmap.resetSelectedPartsBlink(rootNode);
	d_map.d_figmap.resetAllParts(rootNode);
	

	var lineIDArray = d_map.d_figmap.getBlinkingLineIDArray();
	
	var urlParamString = makeURLParamString( titleObj, lineIDArray );


	d_partsinfo.window.navigate("../connector/connect.html" + urlParamString);
	showConnListFrame( true );
}




function makeURLParamString(titleObj, lineIDArray)
{
	var paramTable = makeParamTable();
	appendRequiredParam(paramTable);
	paramTable.put("ewd",titleObj.getCode());
	paramTable.put("line", lineIDArray.join("+"));
	
	return makeParamString(paramTable);
}






function changePage( pageID )
{
	var titleObj = getTitleObj();
	if( titleObj.getType() != TITLE_TYPE_RELAY ) return;
	
	var ewdCode;
	if( pageID == "object" ){
		ewdCode = titleObj.makeObjectCode();
	}
	else if( pageID == "inner" ){
		ewdCode = titleObj.makeInnerCode();
	}
	else if( pageID == "plate" ){
		ewdCode = titleObj.makePlateCode();
	}
	if( ewdCode == null || ewdCode == "" ) return;
	
	var paramTable = makeParamTable();
	appendRequiredParam(paramTable);
	paramTable.put("ewd",ewdCode);
	paramTable.put("ewd_type", "relay");
	paramTable.put("code", d_partsinfo.getDispEwdItemCode().replace(/,/g, "+"));
	paramTable.put("type", d_partsinfo.getDispEwdItemType());
	
	self.window.navigate( "../common/fig_frame.html" + makeParamString(paramTable) );
}



function getSubcodeFlag()
{
	if( g_titleObj.getType() == TITLE_TYPE_SYSTEM )
		return true;
	else
		return false;
}
