/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var g_templateXslDoc;

var g_ewdPartsList;
var g_routingTitleList;
var g_relayTitleList;

var g_objConnect




function call_runOnLoadProc()
{

	
	try{

		g_routingTitleList = new TitleList("../routing/title.xml", TITLE_TYPE_ROUTING, "../../defs/area.xml");
		g_relayTitleList = new TitleList("../relay/title.xml", TITLE_TYPE_RELAY);
		
		g_ewdPartsList = new EwdPartsList("parts.xml");
		

		g_objConnect = new Connect("../system/connect/" + parent.getTitleObj().getBaseFig() + ".xml" );
		
		

		g_templateXslDoc = loadXML("../../styles/connector/connectHtml.xsl");
		
		

		var lineID = getURLParam("line");
		if( lineID == null ) return;
		
		var connectPinArray = makeConnectPinArray( lineID.split("+") )
		var partsPinArray = makePartsPinArray( connectPinArray );
		partsPinArray = sortPartsPinArray( partsPinArray );
		
		showConnectList( partsPinArray );
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



function call_runOnMouseOver(){
	try{
		var obj = window.event.srcElement;
		obj.className = "text_hover_other";
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

function call_runOnClickLink(ewdID, ewdType, code, type)
{
	try{
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("ewd", ewdID);
		paramTable.put("ewd_type", ewdType);
		paramTable.put("code", code);
		paramTable.put("type", type);
		

		openNewDialog("../popup.html", paramTable, 900, 700);
	}
	catch( e ){
		window.alert(e.description);
	}
}




function makeConnectPinArray(lineIDArray)
{
	var connectPinArray = g_objConnect.getConnectItem( lineIDArray );
	connectPinArray = filterConnectPinArray( connectPinArray );
	
	return connectPinArray;
}


function filterConnectPinArray( connectPinArray )
{
	var retConnectPinArray = new Array();
	
	for( var i=0; i < connectPinArray.length; i++ ){
		if( connectPinArray[i].ewdItem.isFilteredItem4Connect() ) continue;
		retConnectPinArray[retConnectPinArray.length] = connectPinArray[i];
	}
	
	return retConnectPinArray;
}




function makePartsPinArray( connectPinArray )
{
	var partsPinArray = new Array();
	for( var i=0; i < connectPinArray.length; i++ ){
		var tmpItem = connectPinArray[i].ewdItem;
		var ewdPartsArray = new Array();

		if( ewdPartsArray.length == 0 )
			ewdPartsArray = g_ewdPartsList.getItemArray(tmpItem.type, tmpItem.code, tmpItem.subcode, true);

		if( ewdPartsArray.length == 0 )
			ewdPartsArray = g_ewdPartsList.getItemArray(tmpItem.type, tmpItem.code, "", true);

		if( ewdPartsArray.length == 0 )
			ewdPartsArray = g_ewdPartsList.getItemArray(tmpItem.type, tmpItem.code, "", false);
		

		if( ewdPartsArray.length == 0 ){
			ewdPartsArray[0] = g_ewdPartsList.makeItem( tmpItem.type, tmpItem.code, "" );
		}
		

		ewdPartsArray = parent.filterParts(ewdPartsArray, g_ewdPartsList);
		
		
		for( var j=0; j < ewdPartsArray.length; j++ ){
			var nIndex = getSamePartsIndex(partsPinArray, ewdPartsArray[j]);
			if( nIndex >= partsPinArray.length ){

				partsPinArray[nIndex] = new PartsPin( ewdPartsArray[j], connectPinArray[i].usePin );
			}
			else{

				partsPinArray[nIndex].addUsePin( connectPinArray[i].usePin );
			}
		}
	}
	return partsPinArray;
}



function sortPartsPinArray(partsPinArray)
{
	for( var i=0; i < partsPinArray.length; i++ ){
		partsPinArray[i].usePin = partsPinArray[i].usePin.sort(comparePinData);
	}
	
	return partsPinArray.sort(comparePartsPin);
}




function getSamePartsIndex(partsPinArray, ewdParts)
{
	for( var i=0; i < partsPinArray.length; i++ ){
		if( partsPinArray[i].ewdParts.getCode() != ewdParts.getCode() ) continue;
		if( partsPinArray[i].ewdParts.getType() != ewdParts.getType() ) continue;
		if( partsPinArray[i].ewdParts.getSpec() != ewdParts.getSpec() ) continue;
			return i;
	}
	return partsPinArray.length;
}


function showConnectList(partsPinArray)
{

	var html = makeBodyHTML( partsPinArray.length );
	document.body.innerHTML = html;
	
	var errObjArray = new Array();
	for( var i=0; i < partsPinArray.length; i++ ){
		var partsPin = partsPinArray[i];
		try{
			setInformation( partsPin.ewdParts, partsPin.usePin, i );
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
	var root = xmlDoc.createElement("Connect");
	xmlDoc.appendChild(root);
	for(var i=0; i < length; i++){
		var element = xmlDoc.createElement("ID");
		element.text = i;
		root.appendChild(element);
	}
	
	return xmlDoc.transformNode(g_templateXslDoc);
}


function setInformation( ewdParts, pinDataArray, nIndex )
{
	if (ewdParts == null) return;
	
	document.all("parts_name_" + nIndex).innerHTML = ewdParts.getName();
	document.all("parts_id_" + nIndex).innerHTML = ewdParts.getDispCode();
	document.all("parts_no_" + nIndex).innerHTML = ewdParts.getNo();
	document.all("parts_color_" + nIndex).innerHTML = ewdParts.getColor();
	document.all("parts_spec_" + nIndex).innerHTML = ewdParts.getSpec();

	
	document.all("parts_type_" + nIndex).value = ewdParts.getType();
	document.all("parts_code_" + nIndex).value = ewdParts.getCode();
	document.all("parts_subcode_" + nIndex).value = ewdParts.getSubCode();
	document.all("parts_namecode_" + nIndex).value = ewdParts.getNameCode();
	
	document.all("pin_info_" + nIndex).value = makePinNoString(pinDataArray);
	

	document.all("pin_spec_" + nIndex).innerHTML = makeHtmlAtPinSpec(pinDataArray, ewdParts.getSpec());
	
	var figFileName = ewdParts.getFigFileName();
	loadFigData( figFileName , nIndex);
	

	if (ewdParts.getNameCode() != "" && ewdParts.getNameCode() != null)
		document.all("single_" + nIndex).style.display = "block";
	else
		document.all("single_" + nIndex).style.display = "none";
	
	

	if( ewdParts.getType() == "w2w" ){
		document.all("parts_name_" + nIndex).style.display = "none";
	}
	

	setLinkInfo( nIndex, ewdParts );
}


function makePinNoString(pinDataArray)
{
	var pinNoArray = new Array();
	for( var i=0; i < pinDataArray.length; i++ ){

		var blnFound = false;
		for( var j=0; j < pinNoArray.length; j++ ){
			if( pinNoArray[j] == pinDataArray[i].pinNo ){
				blnFound = true;
				continue;
			}
		}
		

		if( !blnFound ){
			pinNoArray[pinNoArray.length] = pinDataArray[i].pinNo;
		}
	}
	

	return pinNoArray.join(",");
}


function makeHtmlAtPinSpec(pinDataArray, partsSpec)
{
	var strHTML = "";
	for( var i=0; i < pinDataArray.length; i++ ){
		if( pinDataArray[i].spec == "" ) continue;
		if( partsSpec != pinDataArray[i].spec ){
			strHTML += "<div>";
			strHTML += pinDataArray[i].pinNo + " : " + pinDataArray[i].spec;
			strHTML += "</div>";
		}
	}
	return strHTML;
}




function setLinkInfo(nIndex, ewdParts)
{
	var type    = ewdParts.getType();
	var code    = ewdParts.getCode();
	var subcode = ewdParts.getSubCode();
	

	var refsObj = parent.searchCodesRefsObj(type, code, subcode);
	

	if( refsObj == null ) return;
	
	
	

	var routingTitleObjArray = refsObj.getTitleObjArray("Routing", g_routingTitleList );
	routingTitleObjArray = filteringLinkInfo(routingTitleObjArray);
	

	var relayTitleObjArray = refsObj.getTitleObjArray("Relay", g_relayTitleList );
	relayTitleObjArray = filteringLinkInfo(relayTitleObjArray);
	
	
	

	var toWiringRouting = makeHtmlAtLinkToDiagram( routingTitleObjArray, type, code, subcode );
	var toRelayLocation = makeHtmlAtLinkToDiagram( relayTitleObjArray, type, code, subcode );
	document.all("to_wiringrouting_" + nIndex).innerHTML = toWiringRouting + toRelayLocation;
}






function makeHtmlAtLinkToDiagram( titleObjArray, type, code, subcode )
{
	var retHTML = "";
	
	
	code = combineCode(code, subcode);
	
	titleObjArray = titleObjArray.sort(compareTitleObj);
	
	for(var i=0; i < titleObjArray.length; i++ ){
		var mapCode = titleObjArray[i].getCode();
		var mapType = titleObjArray[i].getType();
		var mapName = titleObjArray[i].getName();
		
		retHTML += "<div id='" + mapType + "_" + i + "'";
		retHTML += " class='text'";
		retHTML += " onMouseOver='call_runOnMouseOver()'";
		retHTML += " onMouseOut='call_runOnMouseOut()'";
		retHTML += " onClick=\"call_runOnClickLink('" + mapCode + "','" + mapType + "','" + code + "','" + type + "')\">";
		retHTML += mapName + "</div>\r\n";
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
	
	

	var inputNode = embedNode.parentElement.all.tags("input")[0];
	selectPinNoByPinNoArray( svgDoc, inputNode.value.split(",") );
}




function showPartsInfo(type, code)
{

	
	var titleObj = parent.getTitleObj();
	
	var paramTable = makeParamTable();
	appendRequiredParam(paramTable);
	paramTable.put("code",code);
	paramTable.put("type",type);
	paramTable.put("ewd", titleObj.getCode());
	paramTable.put("ewd_type", titleObj.getType());
	
	window.navigate("../connector/pinfo.html" + makeParamString(paramTable));
	
	parent.showConnListFrame( false );
}



function resetPartsInfo()
{
	var titleObj = parent.getTitleObj();
	
	var paramTable = makeParamTable();
	appendRequiredParam(paramTable);
	paramTable.put("ewd", titleObj.getCode());
	paramTable.put("ewd_type", titleObj.getType());
	
	window.navigate("../connector/pinfo.html" + makeParamString(paramTable));
	
	parent.showConnListFrame( false );
}
