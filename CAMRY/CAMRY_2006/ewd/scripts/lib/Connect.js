/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/





function Connect(path)
{

	this.xmlDoc = loadXML( path );
}



function Connect.prototype.getConnectedEwdItem( lineID )
{
	var connection = new Connection();
	connection.setDataFromXML( this.xmlDoc, lineID );
	
	var ewdItemArray = this.extractEwdItem( connection );
	
	return ewdItemArray;
}



function Connect.prototype.extractEwdItem( connection )
{
	var ewdItemArray = new Array();
	

	for( var j = 0; j < connection.connPinArray.length; j++ ){
		var ewdItem = connection.connPinArray[j].ewdItem;
		var nIndex = this.checkSameEWDItemIndex(ewdItemArray, ewdItem );
		
		ewdItemArray[nIndex] = ewdItem;
	}
	
	return ewdItemArray;
}



function Connect.prototype.checkSameEWDItemIndex( ewdItemArray, ewdItem )
{
	var flgSub = true;
	var flgW2W = true;
	for( var cnt = 0; cnt < ewdItemArray.length; cnt++ ){
		if( ewdItemArray[cnt].isSame(ewdItem, flgSub, flgW2W) ){
			return cnt;
		}
	}
	
	return ewdItemArray.length;
}







function Connect.prototype.getConnectItem( lineIDArray )
{
	var connectionArray = new Array();
	
	for( var i = 0; i < lineIDArray.length; i++ ){
		connectionArray[i] = new Connection();
		connectionArray[i].setDataFromXML( this.xmlDoc, lineIDArray[i] );
	}
	
	var connectPinArray = this.extractConnectPin(connectionArray);
	
	return connectPinArray;
}



function Connect.prototype.extractConnectPin(connectionArray)
{
	var connectPinArray = new Array();

	for( var i=0; i < connectionArray.length; i++ ){
		for( var j=0; j < connectionArray[i].connPinArray.length; j++ ){
			var objConnPin =  connectionArray[i].connPinArray[j];
			var nIndex = this.checkSameConnectPinIndex( connectPinArray, objConnPin );
			
			if( nIndex >= connectPinArray.length ){

				connectPinArray[nIndex] = objConnPin;
			}
			else{

				connectPinArray[nIndex].addUsePin( objConnPin.usePin );
			}
		}
	}

	return connectPinArray;
}



function Connect.prototype.checkSameConnectPinIndex( connectPinArray, objConnPin )
{
	var flgSub = true;
	var flgW2W = false;
	for( var cnt = 0; cnt < connectPinArray.length; cnt++ ){
		if( connectPinArray[cnt].ewdItem.isSame(objConnPin.ewdItem, flgSub, flgW2W) ){
			return cnt;
		}
	}

	return connectPinArray.length;
}














function Connection()
{
	this.lineID = null;
	this.lineSpec = null;
	this.connPinArray = new Array();
}

function Connection.prototype.setDataFromXML( xmlDoc, lineID )
{
	this.lineID = lineID;
	var lineNodeArray = this.searchLine( xmlDoc, lineID );
	
	this.getDataFromLine( lineNodeArray );
}


function Connection.prototype.searchLine( xmlDoc, lineID )
{
	var lineNodeArray = new Array();
	
	var lineNodes = xmlDoc.getElementsByTagName("line");
	for( var i = 0; i < lineNodes.length; i++ ){
		if( this.isContainLine(lineID, lineNodes(i)) ){
			lineNodeArray[lineNodeArray.length] = lineNodes(i);
		}
	}
	
	return lineNodeArray;
}


function Connection.prototype.isContainLine(lineID, lineNode)
{



	var lineNodeID = lineNode.getAttribute("id");
	
	lineNodeIDArray = lineNodeID.split(":");
	for( var i=0; i < lineNodeIDArray.length; i++ ){
		if( lineNodeIDArray[i] == lineID ) return true;
	}
	
	return false;
}

function Connection.prototype.getDataFromLine( lineNodeArray )
{
	for( var i = 0; i < lineNodeArray.length; i++ ){
		this.lineSpec = lineNodeArray[i].getAttribute("spec");
		this.getParentData( lineNodeArray[i] );
		this.getChildData( lineNodeArray[i] );
	}
}

function Connection.prototype.getParentData( lineNode )
{
	var connNode = lineNode.parentNode.parentNode;
	this.getPartsInfo( connNode );
}


function Connection.prototype.getChildData( lineNode )
{
	var connNodeList = lineNode.getElementsByTagName("connector");
	for( var i = 0; i < connNodeList.length; i++ ){
		this.getPartsInfo( connNodeList[i] );
	}
}




function Connection.prototype.getPartsInfo( connNode )
{

	var pinData = this.getPinData( connNode );
	var pinDataArray = this.makePinDataArray(connNode, pinData);
	
	var type = connNode.getAttribute("type");
	var code = connNode.getAttribute("code");
	var subcode = connNode.getAttribute("subcode");
	

	var ewdItem = new EWDItem(type, code);
	ewdItem.setSubcode(subcode);
	ewdItem.setPinNo(pinData.pinNo);
	

	this.connPinArray[this.connPinArray.length] = new ConnectPin(ewdItem, pinDataArray);
}




function Connection.prototype.getPinData( connNode )
{
	var pinNode = connNode.selectSingleNode("pin");
	var pinNo = pinNode.getAttribute("no");
	var spec  = pinNode.getAttribute("spec");
	

	if( spec == null ) spec = this.lineSpec;
	
	return new PinData(pinNo, spec);
}





function Connection.prototype.makePinDataArray( connNode, objPin )
{
	var pinDataArray = new Array();
	var junctionNode = connNode.selectSingleNode("pin/junction");
	if( junctionNode == null ){
		pinDataArray[0] = objPin;
	}
	else{
		var pointNode = junctionNode.selectSingleNode("point");
		var pinNodes = pointNode.getElementsByTagName("pin");
		for( var i = 0; i < pinNodes.length; i++ ){
			var tmpPinNo = pinNodes[i].getAttribute("no");
			pinDataArray[i] = new PinData(tmpPinNo, objPin.spec);
		}
	}
	
	return pinDataArray;
}








function ConnectPin(ewdItem, pinDataArray)
{
	this.ewdItem = ewdItem;
	this.usePin  = pinDataArray;
}


function ConnectPin.prototype.addUsePin( pinDataArray )
{
	for( var i=0; i < pinDataArray.length; i++ ){

		var bFound = false;
		for( var j=0; j < this.usePin.length; j++ ){
			if( this.usePin[j].isSame(pinDataArray[i]) ){
				bFound = true;
				break;
			}
		}
		if( bFound ) continue;
		

		this.usePin[this.usePin.length] = pinDataArray[i];
	}
}



function PartsPin(ewdParts, pinDataArray)
{
	this.ewdParts = ewdParts;
	this.usePin   = pinDataArray;
}


function PartsPin.prototype.addUsePin( pinDataArray )
{
	for( var i=0; i < pinDataArray.length; i++ ){

		var bFound = false;
		for( var j=0; j < this.usePin.length; j++ ){
			if( this.usePin[j].isSame(pinDataArray[i]) ){
				bFound = true;
				break;
			}
		}
		if( bFound ) continue;
		

		this.usePin[this.usePin.length] = pinDataArray[i];
	}
}





function PinData(pinNo, spec)
{
	this.pinNo = (pinNo != null) ? pinNo : "0";
	this.spec  = (spec  != null) ? spec  : "";
}

function PinData.prototype.isSame(objPinData)
{
	if( this.pinNo == objPinData.pinNo ){
		if( this.spec == objPinData.spec )
			return true;
	}
	
	return false;
}











function comparePartsPin(obj1, obj2)
{
	var val1 = obj1.ewdParts.getCode();
	var val2 = obj2.ewdParts.getCode();
	
	return compareCommon(val1, val2);
}



function comparePinData(obj1, obj2)
{
	var val1 = parseInt(obj1.pinNo);
	var val2 = parseInt(obj2.pinNo);
	
	return compareCommon(val1, val2);
}



function compareCommon(val1, val2)
{
	if( val1 < val2 )
		return -1;
	else if( val1 > val2 )
		return 1;
	else
		return 0;
}
