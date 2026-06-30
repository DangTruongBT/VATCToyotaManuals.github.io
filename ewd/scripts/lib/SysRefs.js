/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/




function SysRefs(path)
{

	this.xmlDoc = null;
	

	this.xmlDoc = loadXML( path );
}




function SysRefs.prototype.makeTitleObjArray( ewdParts, systemTitleList )
{
	var connNode = this.getConnNode( ewdParts );
	
	var systemNodeArray = this.getSystemNodeArray( connNode );
	


	var titleObjArray = this.cvtSystemNodeArray( systemNodeArray, systemTitleList );
	titleObjArray = this.filtering(titleObjArray);
	
	return titleObjArray;
}




function SysRefs.prototype.makeTitleObjArrayByPinNoArray( ewdParts, pinNoArray, systemTitleList )
{
	var connNode = this.getConnNode( ewdParts );
	
	var systemNodeArray = this.getSystemNodeArrayByPinNoArray( connNode, pinNoArray );
	


	var titleObjArray = this.cvtSystemNodeArray( systemNodeArray, systemTitleList );
	titleObjArray = this.filtering(titleObjArray);
	
	return titleObjArray;
}




function SysRefs.prototype.getConnNode( ewdParts )
{
	var ewdItem = new EWDItem(ewdParts.getType(), ewdParts.getCode());
	ewdItem.setSubcode(ewdParts.getSubCode());
	
	var connNodes = this.xmlDoc.getElementsByTagName("connector");
	for( var i=0; i < connNodes.length; i++ ){
		var tmpEwdItem = this.makeEwdItemFromNode( connNodes(i) );
		if( ewdItem.isSame(tmpEwdItem, true, false) ){
			return connNodes(i);
		}
	}
	
	return null;
}


function SysRefs.prototype.makeEwdItemFromNode( node )
{
	var type = node.getAttribute("type");
	var code = node.getAttribute("code");
	var subcode = node.getAttribute("subcode");
	
	var ewdItem = new EWDItem(type, code);
	ewdItem.setSubcode(subcode);
	
	return ewdItem;
}



function SysRefs.prototype.getSystemNodeArray( connNode )
{
	if( connNode == null ) return new Array();
	
	var systemNodes = connNode.getElementsByTagName("system");
	
	var systemNodeArray = new Array();
	for( var i=0; i < systemNodes.length; i++ ){
		systemNodeArray[i] = systemNodes.item(i);
	}
	
	return systemNodeArray;
}




function SysRefs.prototype.getSystemNodeArrayByPinNoArray( connNode, pinNoArray )
{
	if( connNode == null ) return new Array();
	
	var systemNodes = connNode.getElementsByTagName("system");
	
	var systemNodeArray = new Array();
	for( var i=0; i < systemNodes.length; i++ ){
		var attrPinNo = systemNodes(i).parentNode.getAttribute("no");
		for( var j=0; j < pinNoArray.length; j++ ){
			if( attrPinNo == pinNoArray[j] ){
				systemNodeArray[systemNodeArray.length] = systemNodes.item(i);
				break;
			}
		}
	}
	
	return systemNodeArray;
}





function SysRefs.prototype.cvtSystemNodeArray( systemNodeArray, systemTitleList )
{
	var retTitleObjArray = new Array();
	
	var titleObjArray = systemTitleList.getTitleArray();
	
	for( var i=0; i < titleObjArray.length; i++ ){
		for( var j=0; j < systemNodeArray.length; j++ ){
			if( titleObjArray[i].getCode() == systemNodeArray[j].getAttribute("code") ){
				retTitleObjArray[retTitleObjArray.length] = titleObjArray[i];
				break;
			}
		}
	}
	
	return retTitleObjArray;
}




function SysRefs.prototype.filtering( titleObjArray )
{
	var retTitleObjArray = new Array();
	
	for( var i=0; i < titleObjArray.length; i++ ){
		var bFound = false;
		for( var j=0; j < retTitleObjArray.length; j++ ){
			if( titleObjArray[i].getCode() == retTitleObjArray[j].getCode() ){
				bFound = true;
				break;
			}
		}
		if(bFound) continue;
		
		retTitleObjArray[retTitleObjArray.length] = titleObjArray[i]
	}
	
	return retTitleObjArray;
}
