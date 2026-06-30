/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



function EWDItem(type, code)
{
	this.type = adjustType(type);
	this.orgType = type;
	
	this.code = pickCode(code, type);
	this.subcode = pickSubcode(code, type);
	
	this.pinNo = null;
}


function EWDItem.prototype.setSubcode( subcode )
{

	if( subcode == null ) subcode = "";
	this.subcode = subcode;
}


function EWDItem.prototype.setPinNo( pinNo )
{
	this.pinNo = pinNo;
}



function EWDItem.prototype.isSame( ewdItem, flgSub, flgPinNo )
{
	if( this.code != ewdItem.code )	return false;
	if( this.type != ewdItem.type )	return false;
	

	if( flgSub ){
		if( this.subcode != ewdItem.subcode ) return false;
	}
	

	if( flgPinNo ){
		if( ewdItem.type == "w2w" ){
			if( this.pinNo != ewdItem.pinNo ) return false;
		}
	}
	
	return true;
}



function EWDItem.prototype.isFilteredItem4Connect()
{
	if( this.type == "relay" ) return true;
	if( this.type == "NON"   ) return true;
	if( this.type == "sp"    ) return true;
	return false;
}







function adjustType( type )
{
	if( type == "jc" || type == "jbc" )
		return "conn";
	else if( type == "jb" || type == "rb" || type == "r" )
		return "relay";
	else
		return type;
}


function makeID( code, type )
{
	return type + ":" + code;
}


function getCodeFromID( id )
{
	var tmpArray = id.split(";");
	return tmpArray[0].split(":")[1];
}


function getTypeFromID( id )
{
	var tmpArray = id.split(";");
	return tmpArray[0].split(":")[0];
}


function combineCode( code, subcode )
{
	return (subcode == "") ? code : code + "-" + subcode;
}

function pickCode( code, type )
{
	if( type != "conn" ) return code;
	
	if( code == null ) return code;
	var tmpArray = code.split("-");
	return (tmpArray.length >= 1) ? tmpArray[0] : "";
}

function pickSubcode( code, type )
{
	if( type != "conn" ) return "";
	
	if( code == null ) return code;
	var tmpArray = code.split("-");
	return (tmpArray.length >= 2) ? tmpArray[1] : "";
}
