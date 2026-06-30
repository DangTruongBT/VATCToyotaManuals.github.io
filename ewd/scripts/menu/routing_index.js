/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



function call_runOnLoadProc()
{
	try{
		showRoutingTitleList();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickTitle( routingCode, type )
{
	try{
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("ewd", routingCode);
		paramTable.put("ewd_type", type);
		
		parent.window.navigate("../common/fig_frame.html" + makeParamString(paramTable) );
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




function showRoutingTitleList()
{

	var xmlDoc = createListXML();

	var xslDoc = loadXML("../../styles/menu/routing_index.xsl");
	document.body.innerHTML = xmlDoc.transformNode(xslDoc);

}



function createListXML()
{
	var xmlDoc = createDOM();
	

	var root = xmlDoc.createElement("List");
	xmlDoc.appendChild(root);
	

	var elList = xmlDoc.createElement("TitleList");
	root.appendChild(elList);
	

	var routingArray = getRoutingArray();
	for(var i=0; i < routingArray.length; i++ ){
		if( routingArray[i].length == 0 ) continue;
		
		var elRouting = xmlDoc.createElement("Routing");
		elRouting.setAttribute("num", routingArray[i].length);
		elList.appendChild(elRouting);
		var elName = xmlDoc.createElement("Name");
		elName.text = routingArray[i][0].getGroupCode();
		elRouting.appendChild(elName);
		
		for(var j=0; j < routingArray[i].length; j++ ){
			var elTitle = xmlDoc.createElement("Title");
			elTitle.setAttribute("code", routingArray[i][j].getCode());
			elTitle.text = routingArray[i][j].getTitleName();
			elRouting.appendChild(elTitle);
		}
	}
	

	var relayArray = getRelayArray();
	if( relayArray.length != 0 ){
		var elRelay = xmlDoc.createElement("Relay");
		elRelay.setAttribute("num", relayArray.length);
		elList.appendChild(elRelay);
		
		for( var i=0; i < relayArray.length; i++ ){
			if( relayArray[i].getRelayType() == "inner" ) continue;
			
			var elTitle = xmlDoc.createElement("Title");
			elTitle.setAttribute("code", relayArray[i].getCode());
			elTitle.text = relayArray[i].getName();
			elRelay.appendChild(elTitle);
		}
	}
	
	return xmlDoc;
}




function getRelayArray()
{
	var titleList = new TitleList("../relay/title.xml", TITLE_TYPE_RELAY);
	titleList.filteringByTerm(getURLParam("term"));
	
	var relayTitleArray = titleList.getTitleArray();
	
	return relayTitleArray;
}




function getRoutingArray()
{
	var titleList = new TitleList("../routing/title.xml", TITLE_TYPE_ROUTING, "../../defs/area.xml");
	titleList.filteringByTerm(getURLParam("term"));
	
	var routingTitleArray = titleList.getTitleArray();
	var groupCodeArray = titleList.makeRoutingGroupCodeArray();
	
	routingTitleArray = groupRoutingTitle( routingTitleArray, groupCodeArray );
	
	return routingTitleArray;
}



function groupRoutingTitle(titleArray, groupCodeArray)
{
	if( titleArray == null ) return null;
	if( groupCodeArray == null ) return null;
	
	

	var routingArray = new Array();
	for( var i=0; i < groupCodeArray.length; i++) {
		routingArray[i] = new Array();
	}
	

	for( var i=0; i < titleArray.length; i++ ){
		var groupCode = titleArray[i].getGroupCode();
		for( var j=0; j < groupCodeArray.length; j++ ){
			if( groupCodeArray[j] == groupCode ){

				routingArray[j][routingArray[j].length] = titleArray[i];
				break;
			}
		}
	}
	
	return routingArray;
}
