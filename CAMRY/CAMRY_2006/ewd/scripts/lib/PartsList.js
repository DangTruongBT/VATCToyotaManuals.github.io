/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/




function PartsList()
{

	this.partsArray = new Array();
}



function PartsList.prototype.getSamePartsIndex( objParts )
{
	var nIndex = -1;
	if( this.partsArray == null )	return nIndex;
	
	var length = this.partsArray.length;
	for( var i = 0; i < this.partsArray.length; i++ ){
		if( this.partsArray[i].isSameParts(objParts) ){
			nIndex = i;
			break;
		}
	}
	
	return nIndex;
}



function PartsList.prototype.addParts( objParts )
{
	var nIndex = this.getSamePartsIndex( objParts );
	if( nIndex < 0 ){
		this.partsArray[this.partsArray.length] = objParts;
	}
	else{

		this.partsArray[nIndex].addInfo( objParts );
	}
}






function PartsList.prototype.makePartsArrayForMap( codesListObj, ewdPartsList, filteringType, flagShowCode )
{
	this.partsArray = new Array();
	if( ewdPartsList == null ) return;
	if( codesListObj == null )	return;
	
	var itemArray = codesListObj.selectEwdItem(filteringType);
	
	for( var i = 0; i < itemArray.length; i++ ){
		var type    = itemArray[i].type;
		var code    = itemArray[i].code;
		var subcode = itemArray[i].subcode;
		

		var objEwdPartsArray = ewdPartsList.getItemArray(type, code, subcode, true);
		
		
		

		for( var j=0; j < objEwdPartsArray.length; j++ ){

			var name = objEwdPartsArray[j].getName();
			if( flagShowCode )	name = name + " - " + code;
			

			var partsObj = new Parts( type, code, subcode, name );
			this.addParts( partsObj );
		}
	}
}














function PartsList.prototype.makePartsArrayForCode( ewdPartsArray, query )
{
	this.partsArray = new Array();
	if( ewdPartsArray == null ) return;
	if( query != null )	query = query.toUpperCase();
	
	var size = ewdPartsArray.length;
	for( var i = 0; i < size; i++ ){
		var type    = ewdPartsArray[i].getType();
		var code    = ewdPartsArray[i].getCode();
		var subcode = ewdPartsArray[i].getSubCode();
		var name    = ewdPartsArray[i].getCode();
		var spec    = ewdPartsArray[i].getSpec();
		
		if( query != null && query != ""){
			if( name.toUpperCase().indexOf( query ) == -1 ) continue;
		}
		

		if( subcode != "" ){
			name += "(" + subcode + ")";
			if( spec != "" ){
				name += "[" + spec + "]";
			}
		}
		

		var partsObj = new Parts( type, code, subcode, name );
		this.addParts( partsObj );
	}
}





function PartsList.prototype.makePartsArrayForName( ewdPartsArray, query )
{
	this.partsArray = new Array();
	if( ewdPartsArray == null ) return;
	if( query != null )	query = query.toUpperCase();
	
	var size = ewdPartsArray.length;
	for( var i = 0; i < size; i++ ){
		var type    = ewdPartsArray[i].getType();
		var code    = ewdPartsArray[i].getCode();
		var subcode = ewdPartsArray[i].getSubCode();
		var name    = ewdPartsArray[i].getName();
		
		if( query != null && query != ""){
			if( name.toUpperCase().indexOf( query ) == -1 ) continue;
		}
		

		var partsObj = new Parts( type, code, subcode, name );
		this.addParts( partsObj );
	}
}




function PartsList.prototype.sort()
{
	this.partsArray = this.partsArray.sort(this.compareParts);
}


function PartsList.prototype.compareParts(obj1, obj2)
{
	var val1 = obj1.name;
	var val2 = obj2.name;
	
	if( val1 < val2 )
		return -1;
	else if( val1 > val2 )
		return 1;
	else
		return 0;
}



function PartsList.prototype.makeHTML(xslPath)
{
	var xmlDoc = this.makeListDoc();
	var xslDoc = loadXML(xslPath);
	return xmlDoc.transformNode(xslDoc);
}


function PartsList.prototype.makeListDoc()
{
	var xmlDoc = createDOM();
	

	var root = xmlDoc.createElement("PartsList");
	xmlDoc.appendChild(root);
	
	for(var i=0; i < this.partsArray.length; i++ ){
		var code = this.partsArray[i].getHtmlID();
		var name = this.partsArray[i].name;
		
		var elParts = xmlDoc.createElement("Parts");
		elParts.setAttribute("code", code);
		elParts.text = name;
		
		root.appendChild(elParts);
	}
	
	return xmlDoc;
}












function Parts(type, code, subcode, name)
{
	this.codeArray = new Array();
	
	this.type = type;
	this.codeArray[0] = combineCode(code, subcode);
	this.name = name;
}


function Parts.prototype.isSameParts( objParts )
{
	if( objParts.name != this.name )	return false;
	if( objParts.type != this.type )	return false;
	return true;
}


function Parts.prototype.addInfo( objParts )
{
	for( var i=0; i < this.codeArray.length; i++ ){
		if(this.codeArray[i] == objParts.codeArray[0]) return;
	}
	
	this.codeArray[this.codeArray.length] = objParts.codeArray[0];
}


function Parts.prototype.getHtmlID()
{
	return makeID(this.codeArray.join(","), this.type);
}

