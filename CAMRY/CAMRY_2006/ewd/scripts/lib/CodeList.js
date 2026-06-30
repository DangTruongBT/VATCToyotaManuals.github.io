/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/




function CodesList( titleObj, rootPath )
{

	this.code = titleObj.getCode();
	this.type = titleObj.getType();
	this.codesDataArray = new Array();
	

	this.codesDataArray = this.makeCodesDataArray( titleObj, rootPath );
}

function CodesList.prototype.makeCodesFilePath(ewdType, figName, rootPath)
{
	var path = rootPath + ewdType + "/codes/" + figName + ".xml";
	return path;
}



function CodesList.prototype.makeCodesDataArray( titleObj, rootPath )
{
	var codeListArray = new Array();
	
	var figTextArray = titleObj.getFigTextArray()
	for( var i=0; i < figTextArray.length; i++ ){
		var path = this.makeCodesFilePath( this.type, figTextArray[i], rootPath );
		codeListArray[i] = new CodesData(path);
	}
	
	return codeListArray;
}




function CodesList.prototype.searchFigNoArray( type, code, subcode )
{
	var figNoArray = new Array();
	
	for( var i=0; i < this.codesDataArray.length; i++ ){
		if( this.codesDataArray[i].isContain(type, code, subcode) ){
			figNoArray[figNoArray.length] = i + 1;
		}
	}
	
	return figNoArray;
}




function CodesList.prototype.selectEwdItem( type )
{
	var itemArray = new Array();
	for( var i=0; i < this.codesDataArray.length; i++ ){
		itemArray = itemArray.concat(this.codesDataArray[i].selectEwdItem(type));
	}
	
	

	if( itemArray.length == 0 ) return itemArray;
	
	

	var uniqueArray = new Array();
	var blnFound;
	for( var i=0; i < itemArray.length; i++ ){
		blnFound = false;
		for( var j=0; j < uniqueArray.length; j++ ){
			if( itemArray[i].isSame(uniqueArray[j], true, false) ){
				blnFound = true;
				break;
			}
		}
		if( blnFound == false ){
			uniqueArray[uniqueArray.length] = itemArray[i];
		}
	}
	
	return uniqueArray;
}


function CodesList.prototype.makeCodesRefs( type, code, subcode )
{
	for( var i=0; i < this.codesDataArray.length; i++ ){
		var refsObj = this.codesDataArray[i].makeCodesRefs( type, code, subcode );
		if( refsObj != null ) return refsObj;
	}
	return null;
}









function CodesData( path )
{

	this.xmlDoc = null;
	

	this.xmlDoc = loadXML( path );
}



function CodesData.prototype.selectEwdItem( type )
{
	var ewdItemArray = new Array();
	
	var tagName = "Code";
	if( type != null ) tagName = tagName + "[@type='" + type + "']";
	
	var codeNodes = this.xmlDoc.getElementsByTagName(tagName);
	for( var i=0; i < codeNodes.length; i++ ){
		var tmpEwdItem = this.makeEwdItemFromNode( codeNodes(i) );
		ewdItemArray[ewdItemArray.length] = tmpEwdItem;
	}
	
	return ewdItemArray;
}




function CodesData.prototype.isContain( type, code, subcode )
{
	var ewdItem = new EWDItem(type, code);
	ewdItem.setSubcode(subcode);
	
	var tagName = "Code";
	var codeNodes = this.xmlDoc.getElementsByTagName(tagName);
	for( var i=0; i < codeNodes.length; i++ ){
		var tmpEwdItem = this.makeEwdItemFromNode( codeNodes(i) );
		if( ewdItem.isSame(tmpEwdItem, true, false) ){
			return true;
		}
	}
	return false;
}



function CodesData.prototype.makeCodesRefs( type, code, subcode )
{
	var ewdItem = new EWDItem(type, code);
	ewdItem.setSubcode(subcode);
	
	var tagName = "Code";
	var codeNodes = this.xmlDoc.getElementsByTagName(tagName);
	for( var i=0; i < codeNodes.length; i++ ){
		var tmpEwdItem = this.makeEwdItemFromNode( codeNodes(i) );
		if( ewdItem.isSame(tmpEwdItem, true, false) ){
			return new CodesRefs(codeNodes(i).getElementsByTagName("refs"));
		}
	}
	return null;
}


function CodesData.prototype.makeEwdItemFromNode( node )
{
	var type = node.getAttribute("type");
	var code = node.getAttribute("id");
	var subcode = node.getAttribute("subcode");
	
	var ewdItem = new EWDItem(type, code);
	ewdItem.setSubcode(subcode);
	
	return ewdItem;
}







function CodesRefs( nodeList )
{

	this.refsNodes = nodeList;
}


function CodesRefs.prototype.getTitleObjArray( tagName, titleList )
{
	var titleObjArray = new Array();
	
	for( var i=0; i < this.refsNodes.length; i++ ){
		if( this.refsNodes(i).getAttribute("type") != tagName.toLowerCase() ) continue;
		var ewdCode = this.refsNodes(i).getAttribute("code");
		var tmpObj = titleList.getTitleObjByCode( ewdCode );
		if( tmpObj != null ){
			titleObjArray[titleObjArray.length] = tmpObj;
		}
	}
	
	return titleObjArray;
}
