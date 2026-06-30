/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/




function EwdPartsList( path )
{

	this.xmlDoc = null;
	this.ewdPartsArray = new Array();
	this.relayPartsArray = new Array();
	this.partsArray = null;
	
	

	this.xmlDoc = loadXML( path );
	this.wordPack = new Parts_WordPack(this.getLang());
	
	this.ewdPartsArray = this.makeEwdPartsArray();
	this.updatePartsArray();
}

function EwdPartsList.prototype.updatePartsArray()
{
	this.partsArray = this.ewdPartsArray.concat(this.relayPartsArray);
}


function EwdPartsList.prototype.appendRelayPartsInfo( relayTitleList )
{
	for( var i=0; i < relayTitleList.titleArray.length; i++ ){
		this.relayPartsArray[this.relayPartsArray.length] = new EwdRelayParts(relayTitleList.titleArray[i]);
	}
	
	this.updatePartsArray();
}




function EwdPartsList.prototype.makeEwdPartsArray()
{
	var tagName = "CodedItem";
	
	var nodeList = this.xmlDoc.getElementsByTagName(tagName);
	var itemClsArray = new Array(nodeList.length);
	for(var i=0; i < nodeList.length; i++ ){
		itemClsArray[i] = new EwdParts( nodeList(i) );
	}
	
	return itemClsArray;
}


function EwdPartsList.prototype.getItemArray( type, code, subcode, flgSub )
{
	var retArray = new Array();
	
	if( type == "sp" || type == "gp" ){
		retArray[retArray.length] = new EwdItemParts( type, code, "", this.wordPack );
	}
	else
	{
		for( var i=0; i < this.partsArray.length; i++ ){
			var tmpParts = this.partsArray[i];
			if( this.isSameParts( tmpParts, type, code, subcode, flgSub ) ){
				retArray[retArray.length] = tmpParts;
			}
		}
	}
	
	return retArray;
}


function EwdPartsList.prototype.getItem( type, code, subcode, flgSub )
{
	var retParts = null;
	
	if( type == "sp" || type == "gp" ){
		retParts = new EwdItemParts( type, code, "", this.wordPack );
	}
	else
	{
		for( var i=0; i < this.partsArray.length; i++ ){
			var tmpParts = this.partsArray[i];
			if( this.isSameParts( tmpParts, type, code, subcode, flgSub ) ){
				retParts = tmpParts;
			}
		}
	}
	
	return retParts;
}



function EwdPartsList.prototype.makeItem( type, code, name )
{
	return new EwdItemParts( type, code, name, this.wordPack );
}




function EwdPartsList.prototype.isSameParts( objEwdParts, type, code, subcode, flgSub )
{
	if( objEwdParts.getCode() != code )
		return false;
	if( adjustType(objEwdParts.getType()) != adjustType(type) )
		return false;
	if( flgSub ){
		if( objEwdParts.getSubCode() != subcode ){
			return false;
		}
	}
	
	return true;
}


function EwdPartsList.prototype.getLang()
{
	return this.xmlDoc.documentElement.getAttribute("xml:lang");
}







function EwdParts( node )
{

	this.ewdPartsNode = node;
}


function EwdParts.prototype.getCode()
{
	var code = this.ewdPartsNode.getAttribute("code");
	return code;
}

function EwdParts.prototype.getType()
{
	var type = this.ewdPartsNode.getAttribute("type");
	return type;
}

function EwdParts.prototype.getName()
{
	var name = this.ewdPartsNode.selectSingleNode("name").text;
	return name;
}


function EwdParts.prototype.getNameCode()
{
	var code = this.ewdPartsNode.selectSingleNode("name").getAttribute("code");
	return code;
}

function EwdParts.prototype.getNo()
{
	var no = this.ewdPartsNode.selectSingleNode("partNo").text;
	return no;
}

function EwdParts.prototype.getColor()
{
	var color = this.ewdPartsNode.selectSingleNode("color").text;
	return color;
}

function EwdParts.prototype.getSpec()
{
	var spec = this.ewdPartsNode.selectSingleNode("spec").text;
	return spec;
}


function EwdParts.prototype.getRepair()
{
	var repair = this.ewdPartsNode.selectSingleNode("repairWire").text;
	return repair;
}


function EwdParts.prototype.getFigFileName()
{
	var fig = this.ewdPartsNode.selectSingleNode("fig").text;
	if( fig != null && fig != "" ){
		fig = fig + "." + this.ewdPartsNode.selectSingleNode("fig").getAttribute("type");
	}
	return fig;
}


function EwdParts.prototype.getSubCode()
{
	var code = this.ewdPartsNode.getAttribute("subcode");
	return (code != null) ? code : "";
}


function EwdParts.prototype.getDispCode()
{
	var subcode = this.getSubCode();
	if( subcode == "" )
		return this.getCode();
	else
		return this.getCode() + "(" + subcode + ")";
}






function EwdRelayParts( relayTitleObj )
{

	this.titleObj = relayTitleObj;
}


function EwdRelayParts.prototype.getCode()
{

	var code = this.titleObj.getNote();
	return code;
}

function EwdRelayParts.prototype.getType()
{
	var type = this.titleObj.getType();
	return type;
}

function EwdRelayParts.prototype.getName()
{

	var name = this.titleObj.getSingleName();
	return name;
}


function EwdRelayParts.prototype.getNameCode()
{
	return "";
}

function EwdRelayParts.prototype.getNo()
{
	return "";
}

function EwdRelayParts.prototype.getColor()
{
	return "";
}

function EwdRelayParts.prototype.getSpec()
{
	return "";
}


function EwdRelayParts.prototype.getRepair()
{
	return "";
}

function EwdRelayParts.prototype.getFigFileName()
{
	return "";
}


function EwdRelayParts.prototype.getSubCode()
{
	return "";
}


function EwdRelayParts.prototype.getDispCode()
{
	var subcode = this.getSubCode();
	if( subcode == "" )
		return this.getCode();
	else
		return this.getCode() + "(" + subcode + ")";
}


function EwdRelayParts.prototype.getTitleCode()
{
	return this.titleObj.getCode();
}



function EwdItemParts(  type, code, name, wordPack )
{

	this.type = type;
	this.code = code;
	this.name = name;
	
	if( this.type == "gp" ) this.name = wordPack.gp;
	if( this.type == "sp" ) this.name = wordPack.sp;
}

function EwdItemParts.prototype.getCode()
{
	return this.code;
}

function EwdItemParts.prototype.getType()
{
	return this.type;
}

function EwdItemParts.prototype.getName()
{
	return this.name;
}


function EwdItemParts.prototype.getNameCode()
{
	return "";
}

function EwdItemParts.prototype.getNo()
{
	return "";
}

function EwdItemParts.prototype.getColor()
{
	return "";
}

function EwdItemParts.prototype.getSpec()
{
	return "";
}


function EwdItemParts.prototype.getRepair()
{
	return "";
}

function EwdItemParts.prototype.getFigFileName()
{
	return "";
}


function EwdItemParts.prototype.getSubCode()
{
	return "";
}


function EwdItemParts.prototype.getDispCode()
{
	var subcode = this.getSubCode();
	if( subcode == "" )
		return this.getCode();
	else
		return this.getCode() + "(" + subcode + ")";
}






function Parts_WordPack(lang)
{
	this.gp = null;
	this.sp = null;
	
	this.init( lang );
}

function Parts_WordPack.prototype.init(lang)
{
	switch( lang )
	{
		case "fr":
			this.gp = "Points de mise à terre";
			this.sp = "Points d'épissage";
			break;
		
		case "de":
			this.gp = "Masseanschlüsse";
			this.sp = "Verbindungsstellen";
			break;
		
		case "es":
			this.gp = "Puntos a tierra";
			this.sp = "Puntos de la unión";
			break;
		
		case "en":
		default:
			this.gp = "Ground Point";
			this.sp = "Splice Point";
			break;
	}
}
