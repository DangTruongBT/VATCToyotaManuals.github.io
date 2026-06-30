/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/





var TITLE_TYPE_SYSTEM  = "system";
var TITLE_TYPE_ROUTING = "routing";
var TITLE_TYPE_RELAY   = "relay";

var TITLE_SUFFIX_PLATE = "-Inn-P";
var TITLE_SUFFIX_INNER = "-Inn";








function TitleList( path , type, subPath, pathPS )
{

	this.type = type;
	this.xmlDoc = null;
	this.titleArray = null;
	
	this.objGpList = null;
	this.objPSList = null;
	this.objAreaList = null;
	
	
	

	this.xmlDoc = loadXML( path );
	this.wordPack = new Title_WordPack(this.getLang());
	

	switch( type ){
		case TITLE_TYPE_SYSTEM:

			this.objGpList = new TitleListGP( subPath, this.wordPack );
			if( pathPS )	this.objPSList = new TitleListPS( pathPS, this.wordPack );
			if( getURLParam("category") == "overall"){

				this.titleArray = this.makeOverallTitleArray();
			}
			else{

				this.titleArray = this.makeSystemTitleArray();
			}
			break;
		
		case TITLE_TYPE_ROUTING:

		this.objAreaList = new AreaList( subPath );
		this.titleArray = this.makeRoutingTitleArray();		break;
		
		case TITLE_TYPE_RELAY:
		this.titleArray = this.makeRelayTitleArray();		break;
	}
}


function TitleList.prototype.getLang()
{
	return this.xmlDoc.documentElement.getAttribute("xml:lang");
}





function TitleList.prototype.filteringByTerm( term )
{
	if( term == null ) return;
	var filteredArray = new Array();
	
	var titleArray = this.titleArray;
	for( var i=0; i < titleArray.length; i++ ){
		if( titleArray[i].isInTerm(term) ){
			filteredArray[filteredArray.length] = titleArray[i];
		}
	}
	
	this.titleArray = filteredArray;
}



function TitleList.prototype.filteringGpByTerm( term )
{
	if( term == null ) return;
	var filteredArray = new Array();
	
	var titleArray = this.objGpList.titleArray;
	for( var i=0; i < titleArray.length; i++ ){
		if( titleArray[i].isInTerm(term) ){
			filteredArray[filteredArray.length] = titleArray[i];
		}
	}
	
	this.objGpList.titleArray = filteredArray;
}



function TitleList.prototype.filteringPsByTerm( term )
{
	if( term == null ) return;
	var filteredArray = new Array();
	
	var titleArray = this.objPSList.titleArray;
	for( var i=0; i < titleArray.length; i++ ){
		if( titleArray[i].isInTerm(term) ){
			filteredArray[filteredArray.length] = titleArray[i];
		}
	}
	
	this.objPSList.titleArray = filteredArray;
}






function TitleList.prototype.getExistScCodeArray()
{
	var scArray = new Array();
	
	for( var i=0; i < this.titleArray.length; i++ ){
		var code = this.titleArray[i].getSC();
		var bFound = false;
		for(var j=0; j < scArray.length; j++ ){
			if( scArray[j] == code ){
				bFound = true;
				break;
			}
		}
		if( bFound == false ){
			scArray[scArray.length] = code;
		}
	}
	
	return scArray;
}





function TitleList.prototype.makeRoutingGroupCodeArray()
{
	var groupCodeArray = new Array();
	
	for(var i=0; i < this.titleArray.length; i++ ){
		var groupCode = this.titleArray[i].getGroupCode();
		var bFound = false;
		for( var j=0; j < groupCodeArray.length; j++ ){
			if( groupCodeArray[j] == groupCode ){
				bFound = true;
				break;
			}
		}
		if( bFound == false ){
			groupCodeArray[groupCodeArray.length] = groupCode;
		}
	}
	
	return groupCodeArray;
}




function TitleList.prototype.getSystemTitleArrayBySC( sc )
{
	if( sc == null ) return this.titleArray;
	
	var retArray = new Array();
	
	for( var i=0; i < this.titleArray.length; i++ ){
		if( this.titleArray[i].getSC() == sc ){
			retArray[retArray.length] = this.titleArray[i];
		}
	}
	
	return retArray;
}




function TitleList.prototype.makeSystemTitleArray()
{
	var tagName = "System";
	
	var nodeList = this.xmlDoc.getElementsByTagName(tagName);
	var systemTitleArray = new Array(nodeList.length);
	for(var i=0; i < nodeList.length; i++ ){
		systemTitleArray[i] = new SystemTitle( nodeList(i) );
	}
	

	systemTitleArray = systemTitleArray.concat(this.objGpList.titleArray);
	
	return systemTitleArray;
}



function TitleList.prototype.makeOverallTitleArray()
{
	var tagName = "System";
	
	var nodeList = this.xmlDoc.getElementsByTagName(tagName);
	var overallTitleArray = new Array(nodeList.length);
	for(var i=0; i < nodeList.length; i++ ){
		overallTitleArray[i] = new OverallTitle( nodeList(i) );
	}
	
	return overallTitleArray;
}





function TitleList.prototype.makeRoutingTitleArray()
{
	var tagName = "Routing";
	
	var nodeList = this.xmlDoc.getElementsByTagName(tagName);
	var routingTitleArray = new Array(nodeList.length);
	for(var i=0; i < nodeList.length; i++ ){

		routingTitleArray[i] = new RoutingTitle( nodeList(i), this.objAreaList, this.wordPack );
	}
	
	return routingTitleArray;
}





function TitleList.prototype.makeRelayTitleArray()
{
	var tagName = "Relay";
	
	var nodeList = this.xmlDoc.getElementsByTagName(tagName);
	var relayTitleArray = new Array(nodeList.length);
	for(var i=0; i < nodeList.length; i++ ){
		relayTitleArray[i] = new RelayTitle( nodeList(i) );
	}
	
	return relayTitleArray;
}




function TitleList.prototype.getTitleArray()
{
	return this.titleArray;
}




function TitleList.prototype.getTitleObjByCode( code )
{
	if( code == null ) return null;
	
	var titleObj = null;
	for( var i=0; i < this.titleArray.length; i++ ){
		if( this.titleArray[i].getCode() == code ){
			titleObj = this.titleArray[i];
			break;
		}
	}
	
	return titleObj;
}


function TitleList.prototype.getTitleObjByBaseFig( baseFig )
{
	if( baseFig == null ) return null;
	
	var titleObj = null;
	for( var i=0; i < this.titleArray.length; i++ ){
		if( this.titleArray[i].getBaseFig() == baseFig ){
			titleObj = this.titleArray[i];
			break;
		}
	}
	
	return titleObj;
}




















function SystemTitle( node )
{

	this.titleNode = node;
}





function SystemTitle.prototype.getSC()
{
	var sc = this.titleNode.getAttribute("sc");
	
	return sc;
}




function SystemTitle.prototype.getCode()
{
	var code = this.titleNode.selectSingleNode("name").getAttribute("code");
	
	return code;
}





function SystemTitle.prototype.getName()
{
	var name = this.titleNode.selectSingleNode("name").text;
	
	return makeNameWithSpec(name, this.getSpec());
}



function SystemTitle.prototype.getSpec()
{
	var specNode = this.titleNode.selectSingleNode("spec");
	if( specNode != null ){
		return specNode.text;
	} else {
		return "";
	}
}



function SystemTitle.prototype.getBaseFig()
{
	var figNode = this.titleNode.selectSingleNode("fig");
	var figName = figNode.text;
	

	var pageIndex = figName.search(/_\d$/);
	if( pageIndex != -1 ){
		figName = figName.slice(0, pageIndex);
	}
	
	return figName;
}




function SystemTitle.prototype.getFigTextArray()
{
	var figTextArray = new Array();
	
	var figNodes = this.titleNode.selectNodes("fig");
	for (var i=0; i < figNodes.length; i++) {
		figTextArray[figTextArray.length] = figNodes.item(i).text;
	}
	
	return figTextArray;
}





function SystemTitle.prototype.getFigFileName(figNo)
{
	var figIndex = 0;
	if(isNaN(parseInt(figNo)) == false){
		figIndex = parseInt(figNo) - 1;
	}
	
	var figNodes = this.titleNode.selectNodes("fig");
	var fileName = figNodes.item(figIndex).text;
	var ext = figNodes.item(figIndex).getAttribute("type");
	fileName = fileName + "." + ext;
	
	return fileName;
}



function SystemTitle.prototype.getPdfFileName()
{
	var ext = "pdf";
	var fileName = this.getBaseFig() + "." + ext;
	
	return fileName;
}



function SystemTitle.prototype.isInTerm( term )
{
	if( term == null ) return true;
	
	var termNodes = this.titleNode.selectNodes("term");
	for( var i=0; i < termNodes.length; i++ ){
		var from = parseInt(termNodes(i).getAttribute("from"));

		if( from == null ) continue;
		if( from > term ) continue;
		
		var to = parseInt(termNodes(i).getAttribute("to"));

		if( to != null ){
			if( to < term ) continue;
		}
		
		return true;
	}
	
	return false;
}



function SystemTitle.prototype.getType()
{
	return TITLE_TYPE_SYSTEM;
}















function OverallTitle( node )
{

	this.titleNode = node;
}





function OverallTitle.prototype.getSC()
{
	var sc = this.titleNode.getAttribute("sc");
	
	return sc;
}




function OverallTitle.prototype.getCode()
{
	var code = this.titleNode.selectSingleNode("name").getAttribute("code");
	
	return code;
}





function OverallTitle.prototype.getName()
{
	var name = this.titleNode.selectSingleNode("name").text;
	
	return makeNameWithSpec(name, this.getSpec());
}



function OverallTitle.prototype.getSpec()
{
	var specNode = this.titleNode.selectSingleNode("spec");
	if( specNode != null && specNode.text.charAt(0) != "*"){
		return specNode.text;
	} else {
		return "";
	}
}



function OverallTitle.prototype.getSpecList()
{
	var arraySpec = new Array();
	var specNodeList = this.titleNode.getElementsByTagName("spec");
	for( var i=0; i < specNodeList.length; i++ ){
		if( specNodeList.item(i).text.charAt(0) == '*'
			|| specNodeList.item(i).text.charAt(0) == '-' ){

			arraySpec[arraySpec.length] = specNodeList.item(i).text;
		}
	}
	return arraySpec

}


function OverallTitle.prototype.getBaseFig()
{
	var figNode = this.titleNode.selectSingleNode("fig");
	var figName = figNode.text;
	

	var pageIndex = figName.search(/_\d$/);
	if( pageIndex != -1 ){
		figName = figName.slice(0, pageIndex);
	}
	
	return figName;
}




function OverallTitle.prototype.getFigTextArray()
{
	var figTextArray = new Array();
	
	var figNodes = this.titleNode.selectNodes("fig");
	for (var i=0; i < figNodes.length; i++) {
		figTextArray[figTextArray.length] = figNodes.item(i).text;
	}
	
	return figTextArray;
}





function OverallTitle.prototype.getFigFileName(figNo)
{
	var figIndex = 0;
	if(isNaN(parseInt(figNo)) == false){
		figIndex = parseInt(figNo) - 1;
	}
	
	var figNodes = this.titleNode.selectNodes("fig");
	var fileName = figNodes.item(figIndex).text;
	var ext = figNodes.item(figIndex).getAttribute("type");
	fileName = fileName + "." + ext;
	
	return fileName;
}



function OverallTitle.prototype.getPdfFileName()
{
	var ext = "pdf";
	var fileName = this.getBaseFig() + "." + ext;
	
	return fileName;
}



function OverallTitle.prototype.isInTerm( term )
{
	if( term == null ) return true;
	
	var termNodes = this.titleNode.selectNodes("term");
	for( var i=0; i < termNodes.length; i++ ){
		var from = parseInt(termNodes(i).getAttribute("from"));

		if( from == null ) continue;
		if( from > term ) continue;
		
		var to = parseInt(termNodes(i).getAttribute("to"));

		if( to != null ){
			if( to < term ) continue;
		}
		
		return true;
	}
	
	return false;
}



function OverallTitle.prototype.getType()
{
	return TITLE_TYPE_SYSTEM;
}




























function RoutingTitle( node, areaList, wordPack )
{

	this.titleNode = node;
	this.objAreaList = areaList;
	this.txtIn = " " + wordPack.txtIn + " ";
}





function RoutingTitle.prototype.getGroupCode()
{
	var groupCode = this.getSingleName();
	return groupCode;
}





function RoutingTitle.prototype.getCode()
{
	var code = this.titleNode.selectSingleNode("name").getAttribute("code");
	return code;
}





function RoutingTitle.prototype.getTitleName()
{
	var sectionCode = this.titleNode.getAttribute("section");
	var titleName = this.objAreaList.getNameByCode( sectionCode );
	
	titleName = makeNameWithSpec(titleName, this.getSpec());
	
	var note = this.titleNode.selectSingleNode("note");
	if( note != null ){
		if( note.text != "" )
			titleName = titleName + " " + note.text;
	}
	
	return titleName;
}



function RoutingTitle.prototype.getRoutingNote()
{
	return this.titleNode.getAttribute("note");
}



function RoutingTitle.prototype.getSingleName()
{
	var name = this.titleNode.selectSingleNode("name").text;
	return name;
}




function RoutingTitle.prototype.getName()
{

	var titleName = this.getSingleName() + this.txtIn + this.getTitleName();
	return titleName;
}



function RoutingTitle.prototype.getSpec()
{
	var specNode = this.titleNode.selectSingleNode("spec");
	if( specNode != null ){
		return specNode.text;
	} else {
		return "";
	}
}



function RoutingTitle.prototype.getBaseFig()
{
	var figNode = this.titleNode.selectSingleNode("fig");
	var figName = figNode.text;
	

	var pageIndex = figName.search(/_\d$/);
	if( pageIndex != -1 ){
		figName = figName.slice(0, pageIndex);
	}
	
	return figName;
}




function RoutingTitle.prototype.getFigTextArray()
{
	var figTextArray = new Array();
	
	var figNodes = this.titleNode.selectNodes("fig");
	for (var i=0; i < figNodes.length; i++) {
		figTextArray[figTextArray.length] = figNodes.item(i).text;
	}
	
	return figTextArray;
}





function RoutingTitle.prototype.getFigFileName(figNo)
{
	var figIndex = 0;
	if(isNaN(parseInt(figNo)) == false){
		figIndex = parseInt(figNo) - 1;
	}
	
	var figNodes = this.titleNode.selectNodes("fig");
	var fileName = figNodes.item(figIndex).text;
	var ext = figNodes.item(figIndex).getAttribute("type");
	fileName = fileName + "." + ext;
	
	return fileName;
}



function RoutingTitle.prototype.getPdfFileName()
{
	var ext = "pdf";
	var fileName = this.getBaseFig() + "." + ext;
	
	return fileName;
}



function RoutingTitle.prototype.isInTerm( term )
{
	if( term == null ) return true;
	
	var termNodes = this.titleNode.selectNodes("term");
	
	for( var i=0; i < termNodes.length; i++ ){
		var from = parseInt(termNodes(i).getAttribute("from"));

		if( from == null ) continue;
		if( from > term ) continue;
		
		var to = parseInt(termNodes(i).getAttribute("to"));

		if( to != null ){
			if( to < term ) continue;
		}
		
		return true;
	}
	
	return false;
}





function RoutingTitle.prototype.getType()
{
	return TITLE_TYPE_ROUTING;
}




























function RelayTitle( node )
{

	this.titleNode = node;
}






function RelayTitle.prototype.getCode()
{
	var code = this.titleNode.selectSingleNode("name").getAttribute("code");
	
	return code;
}





function RelayTitle.prototype.getName()
{
	var name = this.titleNode.selectSingleNode("name").text;
	
	return makeNameWithSpec(name, this.getSpec());
}



function RelayTitle.prototype.getSpec()
{
	var specNode = this.titleNode.selectSingleNode("spec");
	if( specNode != null ){
		return specNode.text;
	} else {
		return "";
	}
}


function RelayTitle.prototype.getNote()
{
	var elmNote = this.titleNode.selectSingleNode("note");
	if( elmNote != null ){
		return elmNote.text;
	} else {
		return "";
	}
}



function RelayTitle.prototype.getBaseFig()
{
	var figNode = this.titleNode.selectSingleNode("fig");
	var figName = figNode.text;
	

	var pageIndex = figName.search(/_\d$/);
	if( pageIndex != -1 ){
		figName = figName.slice(0, pageIndex);
	}
	
	return figName;
}



function RelayTitle.prototype.getFigTextArray()
{
	var figTextArray = new Array();
	
	var figNodes = this.titleNode.selectNodes("fig");
	for (var i=0; i < figNodes.length; i++) {
		figTextArray[figTextArray.length] = figNodes.item(i).text;
	}
	
	return figTextArray;
}




function RelayTitle.prototype.getFigFileName(figNo)
{
	var figIndex = 0;
	if(isNaN(parseInt(figNo)) == false){
		figIndex = parseInt(figNo) - 1;
	}
	
	var figNodes = this.titleNode.selectNodes("fig");
	var fileName = figNodes.item(figIndex).text;
	var ext = figNodes.item(figIndex).getAttribute("type");
	fileName = fileName + "." + ext;
	
	return fileName;
}




function RelayTitle.prototype.getPdfFileName()
{
	var ext = "pdf";
	var fileName = this.getBaseFig() + "." + ext;
	
	return fileName;
}




function RelayTitle.prototype.getRelayType()
{
	var type = this.titleNode.getAttribute("type");
	return type;
}


function RelayTitle.prototype.getLocation()
{
	var location = this.titleNode.getAttribute("location");
	return location;
}


function RelayTitle.prototype.getObject()
{
	var object = this.titleNode.getAttribute("object");
	return object;
}


function RelayTitle.prototype.getInner()
{
	var inner = this.titleNode.getAttribute("inner");
	return inner;
}


function RelayTitle.prototype.makeObjectCode()
{
	if( this.isPlate() ){
		var code = this.getCode();
		code = code.substr(0, code.length - TITLE_SUFFIX_PLATE.length);
		return code;
	}
	else{
		return this.getObject();
	}
}


function RelayTitle.prototype.makeInnerCode()
{
	if( this.isPlate() ){
		var code = this.getCode();
		code = code.substr(0, code.length - TITLE_SUFFIX_PLATE.length);
		code = code + TITLE_SUFFIX_INNER;
		return code;
	}
	else{
		return this.getInner();
	}
}


function RelayTitle.prototype.makePlateCode()
{
	if( this.isPlate() ){
		return this.getCode();
	}
	else if( this.isInner() ){
		return this.getObject() + TITLE_SUFFIX_PLATE;
	}
	else{
		return this.getCode() + TITLE_SUFFIX_PLATE;
	}
}


function RelayTitle.prototype.isPlate()
{

	var code = this.getCode();
	var index = code.lastIndexOf(TITLE_SUFFIX_PLATE);
	if( index != -1 ){
		if( code.substr(index) == TITLE_SUFFIX_PLATE )
			return true;
	}
	return false;
}


function RelayTitle.prototype.isInner()
{
	var type = this.getRelayType();
	if( type == "inner" )
		return true;
	else
		return false;
}


function RelayTitle.prototype.hasInner()
{
	var inner = this.getInner();
	if( inner != null && inner != "" )
		return true;
	else
		return false;
}


function RelayTitle.prototype.isInTerm( term )
{
	if( term == null ) return true;
	
	var termNodes = this.titleNode.selectNodes("term");
	
	for( var i=0; i < termNodes.length; i++ ){
		var from = parseInt(termNodes(i).getAttribute("from"));

		if( from == null ) continue;
		if( from > term ) continue;
		
		var to = parseInt(termNodes(i).getAttribute("to"));

		if( to != null ){
			if( to < term ) continue;
		}
		
		return true;
	}
	
	return false;
}


function RelayTitle.prototype.getSingleName()
{
	var name = this.titleNode.selectSingleNode("name").text;
	
	return name;
}



function RelayTitle.prototype.getType()
{
	return TITLE_TYPE_RELAY;
}






















function Title_WordPack(lang)
{
	this.gp = null;
	this.ps = "";
	this.txtIn = null;
	
	this.init( lang );
}

function Title_WordPack.prototype.init(lang)
{
	switch( lang )
	{
		case "fr":
			this.gp = "Point de mise à terre";
			this.ps = "Source d'alimentation";
			this.txtIn = "dans la";
			break;
		
		case "de":
			this.gp = "Massepunkt";
			this.ps = "Stromquelle";
			this.txtIn = "im";
			break;
		
		case "es":
			this.gp = "Punto a tierra";
			this.ps = "Alimentación";
			this.txtIn = "en el";
			break;
		
		case "en":
		default:
			this.gp = "Ground Point";
			this.ps = "Power Source";
			this.txtIn = "in";
			break;
	}
}











function TitleListGP(path, wordPack)
{

	this.xmlDoc = null;
	this.titleArray = null;
	this.loaded = false;
	
	this.xmlDoc = createDOM();
	this.loaded = this.xmlDoc.load(path);
	if( this.loaded ){
		this.titleArray = this.makeTitleArray();
	}
	else{
		this.titleArray = this.makeTitleArray4NoData(wordPack);
	}
}

function TitleListGP.prototype.makeTitleArray()
{
	var tagName = "Item";
	
	var nodeList = this.xmlDoc.getElementsByTagName(tagName);
	var gpTitleArray = new Array(nodeList.length);
	for(var i=0; i < nodeList.length; i++ ){
		gpTitleArray[i] = new SystemTitle( nodeList(i) );
	}
	
	return gpTitleArray;
}

function TitleListGP.prototype.makeTitleArray4NoData(wordPack)
{
	var GP_CODE = "GP";
	
	
	var elmItem = this.xmlDoc.createElement("Item");
	
	var elmName = this.xmlDoc.createElement("name");
	elmName.setAttribute("code", GP_CODE);
	elmName.text = wordPack.gp;
	
	var elmFig = this.xmlDoc.createElement("fig");
	elmFig.setAttribute("type", "svgz");
	elmFig.text = GP_CODE;
	
	elmItem.appendChild(elmName);
	elmItem.appendChild(elmFig);
	
	
	

	var gpTitleArray = new Array();
	gpTitleArray[0] = new SystemTitle( elmItem );
	
	return gpTitleArray;
}






function TitleListPS(path, wordPack)
{

	this.xmlDoc = null;
	this.titleArray = null;
	this.loaded = false;
	
	this.xmlDoc = createDOM();
	this.loaded = this.xmlDoc.load(path);
	if( this.loaded ){
		this.titleArray = this.makeTitleArray();
	}
	else{
		this.titleArray = this.makeTitleArray4NoData(wordPack);
	}
}

function TitleListPS.prototype.makeTitleArray()
{
	var tagName = "Item";
	
	var nodeList = this.xmlDoc.getElementsByTagName(tagName);
	var psTitleArray = new Array(nodeList.length);
	for(var i=0; i < nodeList.length; i++ ){
		psTitleArray[i] = new SystemTitle( nodeList(i) );
	}
	
	return psTitleArray;
}

function TitleListPS.prototype.makeTitleArray4NoData(wordPack)
{
	var PS_CODE = "PS";
	
	
	var elmItem = this.xmlDoc.createElement("Item");
	
	var elmName = this.xmlDoc.createElement("name");
	elmName.setAttribute("code", PS_CODE);
	elmName.text = wordPack.ps;
	
	var elmFig = this.xmlDoc.createElement("fig");
	elmFig.setAttribute("type", "svgz");
	elmFig.text = PS_CODE;
	
	elmItem.appendChild(elmName);
	elmItem.appendChild(elmFig);
	
	
	

	var psTitleArray = new Array();
	psTitleArray[0] = new SystemTitle( elmItem );
	
	return psTitleArray;
}







function AreaList(path)
{

	this.xmlDoc = null;
	

	this.xmlDoc = loadXML( path );
}

function AreaList.prototype.getNameByCode( code )
{
	var name = null;
	
	var tagName = "Area";
	var nodeList = this.xmlDoc.getElementsByTagName(tagName);
	for( var i=0; i < nodeList.length; i++ ){
		if( nodeList.item(i).getAttribute("code") == code ){
			name = nodeList.item(i).text;
			break;
		}
	}
	
	return name;
}



function makeNameWithSpec(name, spec){
	if( spec != "" )
		return name + " (" + spec + ")";
	else
		return name;
}


function compareTitleObj(val1, val2)
{
	var name1 = val1.getName();
	var name2 = val2.getName();
	
	if( name1 < name2 )			return -1;
	else if( name1 > name2 )	return 1;
	else						return 0;
}
