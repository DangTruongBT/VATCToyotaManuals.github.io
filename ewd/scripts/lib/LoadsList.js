/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var LOADS_LIST_ORDER_BY_CAPACITY = 1;
var LOADS_LIST_ORDER_BY_NAME     = 2;


function LoadsList( path )
{
	this.xmlDoc = null;
	

	this.xmlDoc = loadXML( path );
}





function LoadsList.prototype.makeBodyHTML( xslPath, nOrder )
{

	var xslDoc = loadXML(xslPath);
	

	switch( nOrder ){
		case LOADS_LIST_ORDER_BY_CAPACITY:
			this.setCheckedAttribute( xslDoc, "optCapacity" );	break;
		case LOADS_LIST_ORDER_BY_NAME:
			this.setCheckedAttribute( xslDoc, "optName" );		break;
	}
	
	var html = this.xmlDoc.transformNode(xslDoc);
	
	return html;
}


function LoadsList.prototype.setCheckedAttribute( xslDoc, strID )
{
	var lstInput = xslDoc.getElementsByTagName("input");
	
	var elmInput = null;
	for( var i=0; i < lstInput.length; i++ ){
		if( lstInput.item(i).getAttribute("id") == strID ){
			elmInput = lstInput.item(i);
			break;
		}
	}
	
	if( elmInput != null ){
		elmInput.setAttribute("checked","checked");
	}
}






function LoadsList.prototype.filtering( titleList, term )
{

	if( term == null || term == "" ) return;
	

	titleList.filteringByTerm(term);
	

	var tagName = null;
	if( titleList.type == "system" )
		tagName = "System";
	else
		tagName = "Routing";
	var destNodes = this.xmlDoc.getElementsByTagName( tagName );
	

	for(var i=0; i < destNodes.length; i++){
		var destNode = destNodes.item(i);
		var code = destNode.getAttribute("code");
		var titleObj = titleList.getTitleObjByCode(code);
		
		if( titleObj == null ){
			destNode.parentNode.removeChild(destNode);
		}
	}
}
