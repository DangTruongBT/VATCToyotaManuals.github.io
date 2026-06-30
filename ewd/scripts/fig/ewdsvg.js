/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



var COLOR_HIGHLIGHT_PARTS = "#FF6666";
var COLOR_SELECTED_PARTS  = "#FF6666";
var COLOR_SELECTED_TEXT = "#FF0000";
var COLOR_DEFAULT_TEXT = "#000000";


var OPACITY_SELECTED_PARTS = "1.0";


var ATTR_BLINK_COUNT = "ewd:blinkCount";
var ATTR_OLD_COLOR = "ewd:oldColor";
var ATTR_BLINK = "ewd:blink";





function checkParentNode(node, nodeName, attr)
{
	for( var parentNode = node.getParentNode();
			parentNode != null;
				parentNode = parentNode.getParentNode() ){
		if( parentNode.getNodeName() == nodeName ){
			if( parentNode.getAttribute(attr) == node.getAttribute(attr) )
				return true;
		}
	}
	
	return false;
}



function getEWDFigNode( node )
{
	if( node == null )	return null;

	try{
		var parentNode = node.getParentNode();
		for( var i = 0; i < 10 && parentNode != null; i++ ){
			var nodeName = parentNode.getNodeName();
			if( nodeName == "a" )	return parentNode;

			if( nodeName == "svg" )	return null;
			parentNode = parentNode.getParentNode();
		}
		return null;
	}
	catch(e){
		return null;
	}
}


function doEWDMannerForMouseDown(evt, svgRootNode)
{
	try{
		var figNode = getEWDFigNode( evt.target );
		if( figNode == null )	return false;
		
		if( isInvalidNode(figNode) ){

		}
		else if( isEWDParts(figNode) ){
			execParts(figNode, svgRootNode);
		}
		else if( isInnerGroup(figNode) ){
			selectInnerGroup(figNode);
		}
		else if( isLineNode(figNode) ){
			execLine(figNode);
		}
		else{
			window.alert("figNode is Error.");
			return false;
		}
		return true;
	}
	catch(e){
		window.alert("MouseDownProcError:" + e.description);
		return false;
	}
}




function resetSVG( svgDoc )
{
	var rootNode = svgDoc.rootElement;
	
	

	resetAllParts( rootNode );
	

	resetBlink( rootNode );
	

	resetInnerGroup( rootNode );
}








function isInnerGroup( node )
{
	try{
		if( node.getAttribute( "ewd:innerGroupID" ).length != 0 )	return true;
	}
	catch(e){
		window.alert("not get attribute for innerWire ");
		return false;
	}
}

function selectInnerGroup(node)
{
	if( isSelectedInnerGroup(node) ){
		resetInnerGroupSelection(node);
		return;
	}
	setTextColor(node,"rgb(255,0,0)");
	setLineColor(node,"#FF0000");
	setSelectedMark(node);
}

function setSelectedMark(node)
{
	node.setAttribute("ewd:selection", 1);
}
function resetSelectedMark(node)
{
	node.setAttribute("ewd:selection", 0);
}

function setTextColor( node, color )
{
	var ns = node.getElementsByTagName("text");
	for( var i = 0; i < ns.length; i++ ){
		var svgStyle = ns.item(i).getStyle();
		if( svgStyle == null )	continue;
		svgStyle.setProperty("fill", color );
	}
}

function setLineColor(node, color)
{
	var ns = node.getElementsByTagName("path");
	for( var i = 0; i < ns.length; i++ ){
		var svgStyle = ns.item(i).getStyle();
		if( svgStyle == null )	continue;
		svgStyle.setProperty("stroke",color);
	}
}


function isSelectedInnerGroup(node){
	if( parseInt(node.getAttribute("ewd:selection")) > 0 )	return true;
	return false;
}

function resetInnerGroupSelection(node)
{
	setTextColor(node,"rgb(0,0,0)");
	setLineColor(node,"#000000");
	resetSelectedMark(node);
}






function resetInnerGroup( rootNode )
{
	var aNodes = rootNode.getElementsByTagName("a");
	
	for( var i=0; i < aNodes.length; i++ ){
		var aNode = aNodes.item(i);
		if( isInnerGroup(aNode) ){
			resetInnerGroupSelection(aNode);
		}
	}
}














function isInvalidNode( node )
{
	try{
		var type = node.getAttribute("ewd:figtype");
		if( type == "sp" )
			return true;
		else
			return false;
	}
	catch(e){
		window.alert("not get attribute for figtype ");
		return false;
	}
}


function isEWDParts( node )
{
	try{
		var type = node.getAttribute("ewd:figtype");
		switch( type ){
			case "conn":
			case "w2w":
			case "gp":
			case "sp":
			case "jb":
			case "jbc":
			case "rb":
			case "r":
				return true;
				
			default:
				return false;
		}
	}
	catch(e){
		window.alert("not get attribute for figtype ");
		return false;
	}
}


function resetPartsList()
{
	parent.parent.d_partsinfo.showPartsInfo("conn", "");
	parent.parent.d_partslist.resetItemStyle();
}

function execParts( selectedFigNode, svgRootNode )
{

		resetSVG( svgRootNode.getOwnerDocument() );
		

		selectParts( selectedFigNode );
		

		var type = selectedFigNode.getAttribute("ewd:figtype");
		var code = selectedFigNode.getAttribute("ewd:code");
		parent.parent.d_partsinfo.showPartsInfo(type, code);
		

		parent.parent.d_partslist.resetItemStyle();
		parent.parent.d_partslist.setSelectedItemStyleByCode( code,type );
		
		return true;





}





function drawSymbol(code, type, flgSub, flgBlink)
{
	var svgDoc = view.fig.embedNode.getSVGDocument();
	
	

	resetSVG( svgDoc );
	
	

	var codeArray = code.split(",");
	var ewdItemArray = new Array();
	for( var i=0; i < codeArray.length; i++ ){
		ewdItemArray[i] = new EWDItem(type, codeArray[i]);
	}
	var destNodeArray = searchNode(svgDoc, ewdItemArray, flgSub, false);
	if( destNodeArray.length == 0 ) return;
	
	

	selectPartsAll( destNodeArray, flgBlink );
	
	

	centeringByBBox( destNodeArray[0].getBBox() );
}



function centeringByBBox( bbox )
{
	var centerX = bbox.x + (bbox.width/2);
	var centerY = bbox.y + (bbox.height/2);
	
	var svgSize    = parseInt(view.fig.svgRootNode.getAttribute("width"));
	var normalSize = parseInt(view.initFigRect.width);
	var zoomedSize = parseInt(view.fig.width);
	
	var centeringPoint = new Point(centerX, centerY);
	centeringPoint.magnify( normalSize / svgSize );
	centeringPoint.magnify( zoomedSize / normalSize );
	
	view.setViewRect( window.document.body );
	view.centering( centeringPoint );
}




function partsIntoView()
{

	var selectedSymbols = searchSelectedSymbols();


	if( selectedSymbols.length != 1 )	return;



	centeringByBBox(selectedSymbols[0].getBBox());

}


function searchSelectedSymbols()
{
	var svgDoc = view.fig.embedNode.getSVGDocument();

	var aNodes = svgDoc.getElementsByTagName("a");
	var hitNodeArray = new Array();
	for( var i=0; i < aNodes.getLength(); i++ ){
		if( isEWDParts( aNodes.item(i) ) == false ) continue;

		var pathList = aNodes.item(i).getElementsByTagName("path");
		if( pathList.length == 0 )
			pathList = aNodes.item(i).getElementsByTagName("text");

		for( var codeIndex=0; codeIndex < pathList.getLength(); codeIndex++ ){
			var gNode = pathList.item(codeIndex);
			try{
				var color = gNode.getAttribute(ATTR_OLD_COLOR);
				if( color == null || color == "" ) continue;
				hitNodeArray[hitNodeArray.length] = gNode;
			}
			catch(e){
				continue;
			}
		}
	}
	return	hitNodeArray;
}



function searchNode(svgDoc, ewdItemArray, flgSub, flgW2W)
{
	var hitNodeArray = new Array();
	
	var targetNodeList = svgDoc.getElementsByTagName("a");
	for( var index=0; index < targetNodeList.getLength(); index++ ){

		var targetNode = targetNodeList.item(index);
		var codeArrayOfNode = targetNode.getAttribute("ewd:code").split(",");
		var typeOfNode = targetNode.getAttribute("ewd:figtype");
		var pinNoOfNode = targetNode.getAttribute("ewd:pinNo");
		

		var bHit = false;
		for( i=0; i < codeArrayOfNode.length; i++ ){
			var ewdItemOfNode = new EWDItem(typeOfNode, codeArrayOfNode[i]);
			ewdItemOfNode.pinNo = pinNoOfNode;
			for( j=0; j < ewdItemArray.length; j++ ){
				if( ewdItemArray[j].isSame(ewdItemOfNode, flgSub, flgW2W) ){
					bHit = true;
					break;
				}
			}
			if( bHit ){
				hitNodeArray[hitNodeArray.length] = targetNode;
				break;
			}
		}
	}

	return	hitNodeArray;
}




function resetSelectedPartsBlink(node)
{
	var aNodes = node.getElementsByTagName("a");
	
	for( var i=0; i < aNodes.length; i++ ){
		var aNode = aNodes.item(i);
		if( isEWDParts(aNode) == false ) continue;
		if( checkBlinkMark(aNode) == true ) continue;
		
		var pathNodes = aNode.getElementsByTagName("path");
		if( pathNodes.length == 0 )
			pathNodes = aNode.getElementsByTagName("text");
		
		for( var j=0; j < pathNodes.length; j++ ){
			removeBlinkNode( pathNodes.item(j) );
		}
	}
}




function resetAllParts(node)
{
	var aNodes = node.getElementsByTagName("a");
	
	for( var i=0; i < aNodes.length; i++ ){
		if( isEWDParts( aNodes.item(i) ) == false ) continue;
		
		var pathList = aNodes.item(i).getElementsByTagName("path");
		if( pathList.length == 0 )
			pathList = aNodes.item(i).getElementsByTagName("text");
		
		for( var codeIndex=0; codeIndex < pathList.getLength(); codeIndex++ ){
			var gNode = pathList.item(codeIndex);
			try{
				var color = gNode.getAttribute(ATTR_OLD_COLOR);
				if( color == null || color == "" ) continue;
				gNode.getStyle().setProperty("fill", color);
				gNode.getStyle().setProperty("opacity", "1" );
				
				gNode.removeAttribute(ATTR_OLD_COLOR);
			}
			catch(e){
				continue;
			}
		}
	}
}



function selectPartsAll( nodeArray, bBlink )
{
	if( nodeArray == null )	return;

	for( var i = 0; i < nodeArray.length; i++ ){

		if( checkParentNode(nodeArray[i], nodeArray[i].getNodeName(), "ewd:code") )
			continue;
		

		selectParts(nodeArray[i], bBlink);
	}
}





function selectParts( node , bBlink )
{
	var ns = node.getElementsByTagName("path");
	if( ns.length == 0 )
		ns = node.getElementsByTagName("text");
	
	var nodeAttr = node.getAttribute("ewd:figtype");
	for( var i = 0; i < ns.length; i++ ){

		changeFillColor( ns.item(i), nodeAttr );
	}
	

	if( bBlink ){
		for( var i = 0; i < ns.length; i++ ){
			var selectColor = getSelectColor(ns.item(i));
			var defColor = ns.item(i).getAttribute(ATTR_OLD_COLOR);
			appendBlinkNodeForParts( ns.item(i), "0.5", selectColor, defColor );
		}
	}
	
	var partsCode = node.getAttribute( "ewd:code" );
	if( partsCode == null || partsCode == "" )	window.alert("could not select parts");	
}





function changeFillColor( node, type )
{
	try{
		var style = node.getStyle();
		
		

		if( node.tagName == "path" )
			node.setAttribute(ATTR_OLD_COLOR, style.getPropertyValue("fill") );
		else
			node.setAttribute(ATTR_OLD_COLOR, COLOR_DEFAULT_TEXT);
		
		
		style.setProperty("opacity", OPACITY_SELECTED_PARTS );
		style.setProperty("fill", getSelectColor(node) );
	}
	catch(e){
		return;
	}
}



function getSelectColor( node )
{
	if( node.tagName == "path" ){
		var selectColor = COLOR_SELECTED_PARTS;
	} else if( node.tagName == "text" ) {
		var selectColor = COLOR_SELECTED_TEXT;
	}
	
	return selectColor;
}



function getDefaultColor( node )
{
	var defColor = node.getAttribute(ATTR_OLD_COLOR);
	if( defColor == null || defColor == "" ){
		defColor = node.getStyle().getPropertyValue("fill");
	}
	
	return defColor;
}


function getFillColor( str )
{
	var styleArray = str.split(";");

	for( var i = 0; i < styleArray.length; i++ ){
		var pos = styleArray[i].indexOf( "fill:" );
		if( pos >= 0 && styleArray[i].length == 12 ){
			return styleArray[i].substr( 5 );
		}
	}
	return "";

}













function isLineNode( figNode )
{
	try{
		var lineID = figNode.getAttribute("ewd:lineID");
		if( lineID == null )
			return false;
		else if( lineID.length == 0 )
			return false;
		else
			return true;
	}
	catch(e){
		window.alert("not get attribute for LineID. : " + e.description);
		return false;
	}
}



function execLine( lineNode )
{
	try{
		if( checkBlinkMark( lineNode ) == false )
			blink( lineNode, 0.5 );
		else
			blinkStop( lineNode );
	}
	catch(e){
		window.alert("Line Select Error. : " + e.description);
	}
}



function blink( blinkNode, time )
{
	blinkLine( blinkNode, time );
	blinkPartsByLineNode( blinkNode, time );
}


function blinkLine( blinkNode, time )
{
	setBlinkMark( blinkNode, true );
	appendBlinkNodeForLine( blinkNode, time );
}



function blinkParts( blinkNode, time )
{
	incrementBlinkCounter( blinkNode );
	setBlinkMark( blinkNode, true );
	
	var pathNodes = blinkNode.getElementsByTagName("path");
	for( var j=0; j < pathNodes.length; j++ ){
		var pathNode = pathNodes.item(j);
		appendBlinkNodeForParts( pathNode, time, COLOR_HIGHLIGHT_PARTS, getDefaultColor(pathNode) );
	}
}



function blinkPartsByLineNode( blinkNode, time )
{
	var partsNodeArray = searchConnectedNode( blinkNode );
	
	for( var i=0; i < partsNodeArray.length; i++ ){
		blinkParts( partsNodeArray[i], time );
	}
}




function blinkStop( blinkNode )
{
	blinkStopLine( blinkNode );
	blinkStopPartsByLineNode( blinkNode );
}



function blinkStopLine( blinkNode )
{
	setBlinkMark( blinkNode, false );
	removeBlinkNode( blinkNode );
}





function blinkStopParts( blinkNode , bReset)
{
	if( bReset ){
		resetBlinkCounter( blinkNode );
	} else {
		decrementBlinkCounter( blinkNode );
	}
	
	if( checkBlinkCounter(blinkNode) == true ){
		setBlinkMark( blinkNode, false );
		
		var pathNodes = blinkNode.getElementsByTagName("path");
		if( pathNodes.length == 0 )
			pathNodes = blinkNode.getElementsByTagName("text");
		
		for( var j=0; j < pathNodes.length; j++ ){
			removeBlinkNode( pathNodes.item(j) );
		}
	}
}



function blinkStopPartsByLineNode( blinkNode )
{
	var partsNodeArray = searchConnectedNode( blinkNode );
	
	for( var i=0; i < partsNodeArray.length; i++ ){
		blinkStopParts( partsNodeArray[i] );
	}
}


function searchConnectedNode( blinkNode )
{
	var lineID = blinkNode.getAttribute("ewd:lineID");
	


	
	var ewdItemArray = searchConnectedParts( lineID );
	var partsNodeArray = searchNode( blinkNode.getOwnerDocument(), ewdItemArray, true, true );
	
	return partsNodeArray;
}






function resetBlink( rootNode )
{
	var nodes = rootNode.getElementsByTagName("a");
	for( var i = 0; i < nodes.length; i++ ){
		var node = nodes.item(i);
		if( node.hasAttribute("ewd:lineID") )
			blinkStopLine(node);
		else if( node.hasAttribute("ewd:code") )
			blinkStopParts(node, true);
	}
}


function checkBlinkMark( destNode )
{
	if( destNode.getAttribute( ATTR_BLINK ) == "true" )	return true;
	return false;

}

function setBlinkMark( blinkNode, flag )
{
	blinkNode.setAttribute( ATTR_BLINK, flag );
}




function checkBlinkCounter( blinkNode )
{
	var cnt = blinkNode.getAttribute( ATTR_BLINK_COUNT );
	cnt = parseInt(cnt);
	if( cnt <= 0 ){
		return true;
	} else {
		return false;
	}
}




function resetBlinkCounter( blinkNode )
{
	blinkNode.setAttribute( ATTR_BLINK_COUNT , "0");
}



function incrementBlinkCounter( blinkNode )
{
	var cnt = blinkNode.getAttribute( ATTR_BLINK_COUNT );
	cnt = incrementCount( cnt );
	blinkNode.setAttribute( ATTR_BLINK_COUNT , cnt);
}


function decrementBlinkCounter( blinkNode )
{
	var cnt = blinkNode.getAttribute( ATTR_BLINK_COUNT );
	cnt = decrementCount( cnt );
	blinkNode.setAttribute( ATTR_BLINK_COUNT , cnt );
}


function incrementCount( cnt )
{
	if( cnt == null || cnt == "" )	return 1;
	var count = parseInt( cnt ) + 1;
	return count;
}


function decrementCount( cnt ){
	if( cnt == null || cnt == "" )	return 0;
	var count = parseInt(cnt) - 1;
	if( count < 0 ) count = 0;
	return count;
}


function appendBlinkNodeForLine( blinkNode, time )
{
	var doc = blinkNode.getOwnerDocument();
	
	removeBlinkNode( blinkNode );
	
	var blinkSetNode = doc.createElement("set");
	with(blinkSetNode){
		setAttribute("id", "V");
		setAttribute("attributeName", "opacity");
		setAttribute("begin", "mouseup; 0s; H.end");
		setAttribute("dur", time + "s");
		setAttribute("to", "0.35");
		setAttribute("fill", "freeze");
	}

	var blinkSetNode2 = doc.createElement("set");
	with(blinkSetNode2){
		setAttribute("id", "H");
		setAttribute("attributeName", "opacity");
		setAttribute("begin", "V.end");
		setAttribute("dur", time + "s");
		setAttribute("to", "1");
		setAttribute("fill", "freeze");
	}

	blinkNode.appendChild(blinkSetNode);
	blinkNode.appendChild(blinkSetNode2);

	doc.rootElement.setCurrentTime(0);
}



function appendBlinkNodeForParts( blinkNode, time, selectColor, defaultColor )
{
	var doc = blinkNode.getOwnerDocument();
	
	removeBlinkNode( blinkNode );
	
	var blinkSetNode1 = doc.createElement("set");
	with( blinkSetNode1 ){
		setAttribute("id", "V");
		setAttribute("attributeName", "fill");
		setAttribute("begin", "mouseup; 0s; H.end");
		setAttribute("dur", time + "s");
		setAttribute("to", selectColor );
		setAttribute("fill", "freeze");
	}
	
	var blinkSetNode2 = doc.createElement("set");
	with( blinkSetNode2 ){
		setAttribute("id", "H");
		setAttribute("attributeName", "fill");
		setAttribute("begin", "V.end");
		setAttribute("dur", time + "s");
		setAttribute("to", defaultColor );
		setAttribute("fill", "freeze");
	}
	

	var blinkSetNode3 = doc.createElement("set");
	with( blinkSetNode3 ){
		setAttribute("id", "V_opacity");
		setAttribute("attributeName", "opacity");
		setAttribute("begin", "mouseup; 0s; H.end");
		setAttribute("dur", time + "s");
		setAttribute("to", OPACITY_SELECTED_PARTS);
		setAttribute("fill", "freeze");
	}
	

	var blinkSetNode4 = doc.createElement("set");
	with( blinkSetNode4 ){
		setAttribute("id", "H_opacity");
		setAttribute("attributeName", "opacity");
		setAttribute("begin", "V.end");
		setAttribute("dur", time + "s");
		setAttribute("to", "1");
		setAttribute("fill", "freeze");
	}

	blinkNode.appendChild(blinkSetNode1);
	blinkNode.appendChild(blinkSetNode2);
	blinkNode.appendChild(blinkSetNode3);
	blinkNode.appendChild(blinkSetNode4);

	doc.rootElement.setCurrentTime(0);
}



function removeBlinkNode( blinkNode )
{
	var setNodes = blinkNode.getElementsByTagName("set");
	while( setNodes.length != 0 ){
		var setNode = setNodes.item(0);
		setNode.parentNode.removeChild(setNode);
	}
}







function getBlinkingLineIDArray()
{
	var lineIDArray = new Array();
	var svgDoc = view.fig.embedNode.getSVGDocument();

	var nodes = svgDoc.getElementsByTagName("a");
	for( var i = 0; i < nodes.length; i++ ){
		var node = nodes.item(i);
		if( checkBlinkMark(node) == false )	continue;
		
		var lineID = node.getAttribute("ewd:lineID");
		if( lineID == "" || lineID == null ) continue;
		


		
		lineIDArray[lineIDArray.length] = lineID;
	}

	return lineIDArray;
}
