/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var g_templateXslDoc;

var g_ewdPartsList;
var g_systemTitleList;
var g_routingTitleList;
var g_relayTitleList;

var g_titleObj = null;

function call_runOnLoadProc()
{
	try{

		var bSuccess = initialize();
		if( bSuccess == false ) return;
		
		

		g_templateXslDoc = loadXML("../../styles/connector/partsInfoHtml.xsl");
		
		

		var ewdItemCode = getURLParam("code");
		var ewdItemType = getURLParam("type");
		if( ewdItemCode != null && ewdItemType != null ){
			ewdItemCode = ewdItemCode.replace(/\x2B/g, ",");
			showPartsInfo( ewdItemType, ewdItemCode );
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnResizeProc()
{
	try{
		for( var i=0; i < document.embeds.length; i++ ){
			var embedNode = document.embeds[i];
			var svgDoc = embedNode.getSVGDocument();
			if( svgDoc.rootElement == null ) continue;
			var svgWidth = svgDoc.rootElement.getAttribute("width");
			var svgHeight = svgDoc.rootElement.getAttribute("height");
			fitToWindow( embedNode, svgWidth, svgHeight );
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnMouseOver( fOther ){
	try{
		var obj = window.event.srcElement;
		if( fOther == true )
			obj.className = "text_hover_other";
		else
			obj.className = "text_hover";
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnMouseOut(){
	try{
		var obj = window.event.srcElement;
		obj.className = "text";
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickLink(ewdCode, ewdType, partsCode, partsType, fOther)
{
	try{
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("fig_search", "yes");
		paramTable.put("ewd", ewdCode);
		paramTable.put("ewd_type", ewdType);
		paramTable.put("code", partsCode);
		paramTable.put("type", partsType);
		if( ewdCode == partsCode ){
			paramTable.put("code", "" );
			paramTable.put("type", "" );
		}
		
		var path = "../common/fig_frame.html";
		


			openNewDialog("../popup.html", paramTable, 900, 700);


	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickPartCheck(index)
{
	try{
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("parts", document.all("parts_namecode_" + index).value);
		


		openCompCheck(makeParamString(paramTable));

	}
	catch( e ){
		window.alert(e.description);
	}
}




function call_runOnClickFuse( index )
{
	try{

		var id = document.all("ps_block_code_" + index).value;
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("loads", "ps");
		paramTable.put("loads_sort", "capacity");
		paramTable.put("loads_scroll", id);
		
		var destURL = "../loads/matrix.html" + makeParamString(paramTable);
		var winStyle = makeWinStyleString();
		

		openNewDialog("../loads/matrix_pop.html", paramTable, 700, 600 );
	}
	catch( e ){
		window.alert(e.description);
	}
}



function resetPartsInfo()
{
	var html = makeBodyHTML( 1 );
	document.body.innerHTML = html;
	
	document.all("fig_view_0").style.display = "none";
	document.all("single_0" ).style.display = "none";
	document.all("fuse_0").style.display = "none";
}



function getTitleObj(mapCode, mapType)
{
	var titleObj;
	switch(mapType) {
		case "system":
		titleObj = g_systemTitleList.getTitleObjByCode(mapCode);		break;
		
		case "routing":
		titleObj = g_routingTitleList.getTitleObjByCode(mapCode);		break;
		
		case "relay":
		titleObj = g_relayTitleList.getTitleObjByCode(mapCode);		break;
	}
	
	return titleObj;
}





function initialize()
{
	g_systemTitleList = new TitleList("../system/title.xml", TITLE_TYPE_SYSTEM, "../system/title-gp.xml");
	g_routingTitleList = new TitleList("../routing/title.xml", TITLE_TYPE_ROUTING, "../../defs/area.xml");
	g_relayTitleList = new TitleList("../relay/title.xml", TITLE_TYPE_RELAY);
	
	g_ewdPartsList = new EwdPartsList("parts.xml");
	g_ewdPartsList.appendRelayPartsInfo( g_relayTitleList );
	
	
	var ewdCode = getURLParam("ewd");
	var ewdType = getURLParam("ewd_type");
	g_titleObj = getTitleObj(ewdCode, ewdType)
	if( g_titleObj == null ) return false;
	
	
	return true;
}




function showPartsInfo( ewdItemType, ewdItemCode, flgSub )
{

	

	if( ewdItemCode == "" ){
		var titleObj = parent.getTitleObj();
		
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("code",ewdItemCode);
		paramTable.put("type",ewdItemType);
		paramTable.put("ewd", titleObj.getCode());
		paramTable.put("ewd_type", titleObj.getType());
		
		window.navigate("../connector/pinfo.html" + makeParamString(paramTable));
		
		parent.showConnListFrame( false );
		return;
	}



	

	var ewdPartsArray = new Array();
	var codeArray = ewdItemCode.split(",");
	if( flgSub == null ) flgSub = parent.getSubcodeFlag();
	for( var i=0; i < codeArray.length; i++ ){
		var code = pickCode(codeArray[i], ewdItemType);
		var subcode = pickSubcode(codeArray[i], ewdItemType);
		var tmpArray = g_ewdPartsList.getItemArray( ewdItemType, code, subcode, flgSub );
		ewdPartsArray = ewdPartsArray.concat(tmpArray);
	}
	

	if( ewdPartsArray.length == 0 ){
		ewdPartsArray[0] = g_ewdPartsList.makeItem( ewdItemType, code, "" );
	}
		

	ewdPartsArray = parent.filterParts(ewdPartsArray, g_ewdPartsList);
	

	if( g_titleObj.getType() == TITLE_TYPE_ROUTING ){
		ewdPartsArray = parent.filterByCodes(ewdPartsArray);
	}
	
	

	var html = makeBodyHTML( ewdPartsArray.length );
	document.body.innerHTML = html;
	

	var errObjArray = new Array();
	for(var i=0; i < ewdPartsArray.length; i++ ){
		try{
			setPartsInfo( ewdPartsArray[i], i );
		}
		catch(e){
			errObjArray[errObjArray.length] = e;
		}
	}
	

	for(var i=0; i < errObjArray.length; i++ ){
		window.alert("showPartsInfo Error:\r\n" + errObjArray[i].description);
	}
}




function makeBodyHTML( length )
{
	var xmlDoc = createDOM();
	var root = xmlDoc.createElement("PartsInfo");
	xmlDoc.appendChild(root);
	for(var i=0; i < length; i++){
		var element = xmlDoc.createElement("ID");
		element.text = i;
		root.appendChild(element);
	}
	
	return xmlDoc.transformNode(g_templateXslDoc);
}




function setPartsInfo( ewdParts, nIndex )
{
	if (ewdParts == null) return;
	
	document.all("parts_id_" + nIndex).innerHTML = ewdParts.getDispCode();
	document.all("parts_no_" + nIndex).innerHTML = ewdParts.getNo();
	document.all("parts_color_" + nIndex).innerHTML = ewdParts.getColor();
	document.all("parts_spec_" + nIndex).innerHTML = ewdParts.getSpec();

	
	document.all("parts_type_" + nIndex).value = ewdParts.getType();
	document.all("parts_code_" + nIndex).value = ewdParts.getCode();
	document.all("parts_subcode_" + nIndex).value = ewdParts.getSubCode();
	document.all("parts_namecode_" + nIndex).value = ewdParts.getNameCode();
	

	if( ewdParts.getType() == "relay" )
		document.all("ps_block_code_" + nIndex).value = ewdParts.getTitleCode();
	
	var figFileName = ewdParts.getFigFileName();
	loadFigData( figFileName , nIndex);
	
	

	if (ewdParts.getNameCode() != "" && ewdParts.getNameCode() != null)
		document.all("single_" + nIndex).style.display = "block";
	else
		document.all("single_" + nIndex).style.display = "none";
	
	

	if (ewdParts.getType() == "relay" )
		document.all("fuse_" + nIndex).style.display = "block";
	else
		document.all("fuse_" + nIndex).style.display = "none";
	
	
	setLinkInfo( nIndex, ewdParts );
}






function setLinkInfo(nIndex, ewdParts)
{
	var type    = ewdParts.getType();
	var code    = ewdParts.getCode();
	var subcode = ewdParts.getSubCode();
	

	var refsObj = parent.searchCodesRefsObj(type, code, subcode);
	

	if( refsObj == null ) return;
	
	
	

	var systemTitleObjArray = refsObj.getTitleObjArray("System", g_systemTitleList);
	systemTitleObjArray = filteringLinkInfo(systemTitleObjArray);
	

	var routingTitleObjArray = refsObj.getTitleObjArray("Routing", g_routingTitleList);
	routingTitleObjArray = filteringLinkInfo(routingTitleObjArray);
	

	var relayTitleObjArray = refsObj.getTitleObjArray("Relay", g_relayTitleList);
	relayTitleObjArray = filteringLinkInfo(relayTitleObjArray);
	
	
	

	var toSystemCircuit = makeHtmlAtLinkToDiagram( systemTitleObjArray, type, code, subcode );
	document.all("to_systemcircuit_" + nIndex).innerHTML = toSystemCircuit;
	

	var toWiringRouting = makeHtmlAtLinkToDiagram( routingTitleObjArray, type, code, subcode );
	var toRelayLocation = makeHtmlAtLinkToDiagram( relayTitleObjArray, type, code, subcode );
	document.all("to_wiringrouting_" + nIndex).innerHTML = toWiringRouting + toRelayLocation;
	
	
	

	var nSystemNum = systemTitleObjArray.length;
	var nLocationNum = routingTitleObjArray.length + relayTitleObjArray.length;
	chgLinkInfoDisplay(nIndex, nSystemNum, nLocationNum);
}



function chgLinkInfoDisplay(nIndex, nSystemNum, nLocationNum)
{
	var linkToSystemBlockObj = document.all("system_block_" + nIndex);
	var linkToRoutingBlockObj = document.all("routing_block_" + nIndex);
	
	if( nSystemNum != 0 ){
		linkToSystemBlockObj.style.display = "block";
	}
	
	if( nLocationNum != 0 ){
		linkToRoutingBlockObj.style.display = "block";
	}
}




function makeHtmlAtLinkToDiagram( titleObjArray, type, code, subcode )
{
	var retHTML = "";
	
	var fOther = true;
	code = combineCode(code, subcode);
	
	titleObjArray = titleObjArray.sort(compareTitleObj);
	
	for(var i=0; i < titleObjArray.length; i++ ){
		var ewdCode = titleObjArray[i].getCode();
		var ewdType = titleObjArray[i].getType();
		var ewdName = titleObjArray[i].getName();
		
		retHTML += "<div id='" + ewdType + "_" + i + "'";
		retHTML += " class='text'";
		retHTML += " onMouseOver='call_runOnMouseOver(" + fOther + ")'";
		retHTML += " onMouseOut='call_runOnMouseOut()'";
		retHTML += " onClick=\"call_runOnClickLink('" + ewdCode + "','" + ewdType + "','" + code + "','" + type + "'," + fOther +")\">";
		retHTML += ewdName + "</div>\r\n";
	}
	
	return retHTML;
}


function filteringLinkInfo(titleObjArray)
{
	var filteredArray = new Array();
	
	var term = getURLParam("term");
	for( var i=0; i < titleObjArray.length; i++ ){
		if( titleObjArray[i].isInTerm(term) == false ) continue;
		if( titleObjArray[i].getType() == TITLE_TYPE_RELAY ){
			if( titleObjArray[i].getRelayType() == "inner" ) continue;
		}
		
		filteredArray[filteredArray.length] = titleObjArray[i];
	}
	
	return filteredArray;
}





function loadFigData( figFileName, nIndex )
{
	var embedNode = document.embeds[nIndex];
	if( figFileName != null && figFileName != ""){
		embedNode.setAttribute("src", "fig/" + figFileName);
	}
	else {
		document.all("fig_view_" + nIndex).style.display = "none";
	}
}




function getEmbedIndexBySvgDoc( svgDoc )
{
	var retIndex = -1;
	

	for (var i=0; i < document.embeds.length; i++){
		if( document.embeds[i] == null ) continue;
		if( svgDoc == document.embeds[i].getSVGDocument() ){
			retIndex = i;
			break;
		}
	}
	
	return retIndex;
}



function fitToWindow( embedNode, svgWidth, svgHeight )
{
	if( embedNode == null )	return;
	
	var maxSize =  document.body.clientWidth-(15+25);
	svgWidth = parseInt(svgWidth);
	svgHeight = parseInt(svgHeight);

	if(svgWidth > svgHeight){
		var width = maxSize;
		var height = svgHeight * (width/svgWidth);
	}
	else{
		var height = maxSize;
		var width = svgWidth * (height/svgHeight);
	}
	
	embedNode.setAttribute( "width" , width );
	embedNode.setAttribute( "height" , height );
}



function zoomFig( svgDoc )
{

	var index = getEmbedIndexBySvgDoc(svgDoc);
	if(index == -1)return;
	var embedNode = document.embeds[index];
	
	var scale = svgDoc.rootElement.currentScale;
	

	embedNode.width  = embedNode.width  * scale;
	embedNode.height = embedNode.height * scale;
	
	svgDoc.rootElement.currentScale = 1;
	
	svgDoc.rootElement.getCurrentTranslate().setX(0);
	svgDoc.rootElement.getCurrentTranslate().setY(0);
}



function sendOnloadMsg(svgFig)
{
	var svgDoc = svgFig.svgRootNode.getOwnerDocument();
	var embedNode = document.embeds[ getEmbedIndexBySvgDoc(svgDoc) ];
	
	fitToWindow(embedNode, svgFig.width, svgFig.height)
}





function getDispEwdItemCode()
{
	var codeArray = new Array();
	
	for( var i=0; ; i++ ){
		var destObj = document.all("parts_code_" + i);
		if( destObj != null ){
			codeArray[i] = destObj.value;
		}else{
			break;
		}
	}
	
	return codeArray.join(",");
}



function getDispEwdItemType()
{
	var partsType = "";
	var destObj = document.all("parts_type_0");
	if( destObj != null ){
		partsType = destObj.value;
	}
	
	return partsType;
}
