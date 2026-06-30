/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



function call_runOnLoadProc()
{
	try{
		showPSTitleList();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickTitle( code, type )
{
	try{
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("ewd", code);
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




function showPSTitleList()
{

	var xmlDoc = createListXML();

	var xslDoc = loadXML("../../styles/menu/ps_index.xsl");
	document.body.innerHTML = xmlDoc.transformNode(xslDoc);

}


function createListXML()
{
	var xmlDoc = createDOM();
	

	var root = xmlDoc.createElement("List");
	xmlDoc.appendChild(root);
	

	var elList = xmlDoc.createElement("TitleList");
	root.appendChild(elList);
	

	var psArray = getPSArray();
	for(var i=0; i < psArray.length; i++ ){
		var elTitle = xmlDoc.createElement("Title");
		elTitle.setAttribute("code", psArray[i].getCode());
		elTitle.text = psArray[i].getName();
		elList.appendChild(elTitle);
	}
	
	return xmlDoc;
}


function getPSArray()
{
	var titleList = new TitleList("../system/title.xml", TITLE_TYPE_SYSTEM, "../system/title-gp.xml", "../system/title-ps.xml");
	titleList.filteringPsByTerm(getURLParam("term"));
	
	var psTitleArray = titleList.objPSList.titleArray;
	
	return psTitleArray;
}
