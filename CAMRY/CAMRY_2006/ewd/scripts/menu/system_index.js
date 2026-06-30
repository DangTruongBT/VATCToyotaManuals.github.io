/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



var g_xmlFile;
var g_xslFile;


function call_runOnLoadProc()
{
	try{
		if(getURLParam("category") == "overall"){
			document.styleSheets(0).href = "../../styles/contents2.css";
			g_xmlFile = "../overall/title.xml";
			g_xslFile = "../../styles/menu/overall_index.xsl";
		}else{
			g_xmlFile = "../system/title.xml";
			g_xslFile = "../../styles/menu/system_index.xsl";
		}
		
		showSystemTitleList();
	}
	catch( e ){
		window.alert(e.description);
	}
}




function call_runOnClickTitle( code, type, pdfName )
{
	try{
		if( getURLParam("category") == "overall" ){
			parent.window.navigate("../overall/pdf/" + pdfName);
		}
		else{
			var paramTable = makeParamTable();
			appendRequiredParam(paramTable);
			paramTable.put("ewd", code);
			paramTable.put("ewd_type", type);
			
			parent.window.navigate("../common/fig_frame.html" + makeParamString(paramTable) );
		}
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




function showSystemTitleList()
{
	var xmlDoc = createListXML();

	var xslDoc = loadXML(g_xslFile);
	document.body.innerHTML = xmlDoc.transformNode(xslDoc);

}



function createListXML()
{
	var xmlDoc = createDOM();
	

	var root = xmlDoc.createElement("List");
	xmlDoc.appendChild(root);
	
	

	var elHeader = xmlDoc.createElement("Header");
	elHeader.text = getScName();
	root.appendChild(elHeader);
	
	

	var elList = xmlDoc.createElement("TitleList");
	root.appendChild(elList);
	var systemArray = getSystemArray();
	for(var i=0; i < systemArray.length; i++ ){
		var elTitle = xmlDoc.createElement("Title");
		elTitle.setAttribute("code", systemArray[i].getCode());
		elTitle.setAttribute("pdf", systemArray[i].getPdfFileName());
		elTitle.text = systemArray[i].getName();

		if(getURLParam("category") == "overall"){
			appendSpecInfo(xmlDoc, elTitle, systemArray[i]);
		}
		elList.appendChild(elTitle);
	}
	
	return xmlDoc;
}





function appendSpecInfo(xmlDoc, elParent, systemTitleObj)
{
	var arraySpec = systemTitleObj.getSpecList();
	var elSpec;

	if( arraySpec.length > 1 ){
		elParent.setAttribute("spec-num", "multi");
	}

	for( var j=0; j < arraySpec.length; j++ ){
		if( j == 0 ){

			elSpec = xmlDoc.createElement("spec");
			elSpec.text = arraySpec[j];
			elParent.appendChild(elSpec);
		}
		else if( arraySpec[j].charAt(0) == "*" ){

			elSpec = xmlDoc.createElement("spec");
			elSpec.text = arraySpec[j];
			elParent.appendChild(elSpec);
		}
		else if( arraySpec[j].charAt(0) == "*" && arraySpec[j-1] == '-'){

			elSpec = xmlDoc.createElement("spec");
			elSpec.text = arraySpec[j];
			elParent.appendChild(elSpec);
		}
		else if( arraySpec[j].charAt(0) == "-" && arraySpec[j-1] == '*'){

			var elSpec2 = xmlDoc.createElement("spec2");
			elSpec2.text = arraySpec[j];
			elSpec.appendChild(elSpec2);
		}
		else if( arraySpec[j].charAt(0) == '-' ){

			var elSpec2 = xmlDoc.createElement("spec2");
			elSpec2.text = arraySpec[j];
			elSpec.appendChild(elSpec2);
		}
	}
}


function getSystemArray()
{
	var titleList = new TitleList(g_xmlFile, TITLE_TYPE_SYSTEM, "../system/title-gp.xml");
	titleList.filteringByTerm(getURLParam("term"));
	
	var sc = getURLParam("sc");
	var systemTitleArray = titleList.getSystemTitleArrayBySC(sc);
	

	
	return systemTitleArray;
}




function getScName()
{
	var serviceCategory = new ServiceCategory("../../defs/sc.xml");
	var category = serviceCategory.getCategory( getURLParam("sc") );
	if( category == null ) return "";
	
	return category.name;
}
