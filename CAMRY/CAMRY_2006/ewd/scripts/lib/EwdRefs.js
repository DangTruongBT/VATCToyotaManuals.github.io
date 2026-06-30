/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



function EwdRefs(objEwdPartsList)
{

	this.m_objPartsArray = new Array();
	

	this.makePartsArray(objEwdPartsList);
}


function EwdRefs.prototype.makePartsArray( objEwdPartsList )
{
	for( var i=0; i < objEwdPartsList.ewdPartsArray.length; i++ ){
		var type = objEwdPartsList.ewdPartsArray[i].getType();
		var code = objEwdPartsList.ewdPartsArray[i].getCode();
		var subcode = objEwdPartsList.ewdPartsArray[i].getSubCode();
		if( this.searchSameParts(type, code, subcode) == null ){
			this.addPartsInfo(type, code, subcode);
		}
	}
}


function EwdRefs.prototype.searchSameParts(type, code, subcode)
{
	for( var i=0; i < this.m_objPartsArray.length; i++){
		if( this.m_objPartsArray[i].equals(type, code, subcode) ){
			return this.m_objPartsArray[i];
		}
	}
	
	return null;
}

function EwdRefs.prototype.addPartsInfo(type, code, subcode)
{
	var objParts = new EwdRefs_Parts(type, code, subcode);
	this.m_objPartsArray.push(objParts);
	
	return objParts;
}



function EwdRefs.prototype.appendRefsInfo( codesListObjArray )
{
	var titleObjArray = this.makeTitleObjArray( codesListObjArray );
	
	for(var i=0; i < codesListObjArray.length; i++){
		var codesDataArray = codesListObjArray[i].codesDataArray;
		for( var j=0; j < codesDataArray.length; j++ ){
			var itemArray = codesDataArray[j].selectEwdItem();
			for( var k=0; k < itemArray.length; k++ ){
				var type    = itemArray[k].type;
				var code    = itemArray[k].code;
				var subcode = itemArray[k].subcode;
				
				var objParts = this.searchSameParts(type, code, subcode);
				if( objParts == null ){
					continue;
					confirm("EwdRefs.appendRefsInfo(): Not Found Parts." + " - " + itemArray[k]);
				}
				
				objParts.addTitleInfo(titleObjArray[i]);
			}
		}
	}
}

function EwdRefs.prototype.makeTitleObjArray( codesListObjArray )
{
	var titleObjArray = new Array();
	
	for( var i=0; i < codesListObjArray.length; i++ ){
		var titleObj = new EwdRefs_EwdTitle( codesListObjArray[i].type, codesListObjArray[i].code );
		titleObjArray[titleObjArray.length] = titleObj;
	}
	
	return titleObjArray;
}




function EwdRefs.prototype.makeRefsPartsObj( type, code, subcode )
{
	for( var i=0; i < this.m_objPartsArray.length; i++ ){
		if( this.m_objPartsArray[i].equals(type, code, subcode) ){
			return new RefsParts( this.m_objPartsArray[i] );
		}
	}
	
	return null;
}











function EwdRefs_EwdTitle(type, code)
{
	this.type = type;
	this.code = code;
}

function EwdRefs_EwdTitle.prototype.equals(tmpType, tmpCode)
{

	if( this.code == tmpCode ){
		if( this.type == tmpType ){
			return true;
		}
	}
	
	return false;
}







function EwdRefs_Parts(type, code, subcode)
{
	this.code = code;
	this.type = type;
	this.subcode = subcode;
	this.ewdTitleArray = new Array();
}


function EwdRefs_Parts.prototype.equals(type, code, subcode)
{

	if( this.code != code )
		return false;
	if( adjustType(this.type) != adjustType(type) )
		return false;
	if( this.subcode != subcode )
		return false;
	
	return true;
}


function EwdRefs_Parts.prototype.addTitleInfo( titleObj )
{
	for(var i=0; i < this.ewdTitleArray.length; i++ ){

		if( this.ewdTitleArray[i].equals( titleObj.type, titleObj.code )){
			return;
		}
	}
	
	this.ewdTitleArray[this.ewdTitleArray.length] = titleObj;
}












function RefsParts( tmpObjParts )
{

	this.objParts = tmpObjParts;
}


function RefsParts.prototype.getTitleObjArray( titleList )
{
	var titleObjArray = new Array();
	
	for( var i=0; i < this.objParts.ewdTitleArray.length; i++ ){
		if( this.objParts.ewdTitleArray[i].type != titleList.type ) continue;
		
		var ewdCode = this.objParts.ewdTitleArray[i].code;
		var tmpObj = titleList.getTitleObjByCode( ewdCode );
		if( tmpObj != null ){
			titleObjArray[titleObjArray.length] = tmpObj;
		}
	}
	
	return titleObjArray;
}
