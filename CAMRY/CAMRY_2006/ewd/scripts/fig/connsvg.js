/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/






function selectPinNoFromEvent( evt )
{
	var svgdoc = evt.target.getOwnerDocument();
	var gNodeList = svgdoc.getElementsByTagName("g");
	
	var pinNode = getPinNode(evt.target);
	if (pinNode == null) return;
	var pinNo = pinNode.getAttribute("ewd:pinNo");
	
	for (var i = 0; i < gNodeList.length; i++ ){
		var gNode = gNodeList.item(i);
		if( gNode.getAttribute("ewd:pinNo") == pinNo ){
			if( gNode.getElementsByTagName("circle").length == 0 ){
				addIndicatorNode(gNode);
			} else {
				deleteIndicatorNode(gNode);
			}
		}
	}
}




function getSelectedPinNoArray( svgDoc )
{
	var retArray = new Array();
	
	if ( svgDoc == null ) return retArray;
	
	var nodeList = svgDoc.getElementsByTagName("g");
	
	for (var i=0; i < nodeList.length; i++ ){
		var gNode = nodeList.item(i);
		var pinNo = gNode.getAttribute("ewd:pinNo");
		if ( pinNo == "" || pinNo == null ) continue;
		if ( gNode.getElementsByTagName("circle").length != 0 ){


			var bFound = false;
			for( var j=0; j < retArray.length; j++ ){
				if( retArray[j] == pinNo ){
					bFound = true;
					break;
				}
			}
			if( bFound == false ){
				retArray[retArray.length] = pinNo;
			}
		}
	}
	
	return retArray;
}



function selectPinNoByPinNoArray( svgDoc, pinNoArray )
{
	var gNodeList = svgDoc.getElementsByTagName("g");
	
	for( var i=0; i < gNodeList.length; i++ ){
		var gNode = gNodeList.item(i);
		var attrPinNo = gNode.getAttribute("ewd:pinNo");
		for( var j=0; j < pinNoArray.length; j++ ){
			if( gNode.getAttribute("ewd:pinNo") == pinNoArray[j] ){
				addIndicatorNode(gNode);
			}
		}
	}
}



function getPinNode(node){
	if( node == null )	return null;
	
	var parentNode = node.getParentNode();
	while( parentNode != null ){
		var nodeName = parentNode.getNodeName();
		if( nodeName == "g" ){
			var pinNo = parentNode.getAttribute("ewd:pinNo");
			if( pinNo != "" && pinNo != null ){
				return parentNode;
			}
		}
		if( nodeName == "svg" )	return null;
		parentNode = parentNode.getParentNode();
	}
	
	return null;
}


function addIndicatorNode( groupNode )
{
	var rect = groupNode.getBBox();

	var doc = groupNode.getOwnerDocument();
	var indicatorNode = doc.createElement( "circle" );

	indicatorNode.setAttribute("cx", getCenterX(rect) );
	indicatorNode.setAttribute("cy", getCenterY(rect) );
	indicatorNode.setAttribute("r", culcRadius(rect.height) );
	indicatorNode.setAttribute("fill", "red" );
	indicatorNode.setAttribute("opacity", 0.5 );

	groupNode.appendChild( indicatorNode );
}

function deleteIndicatorNode(node)
{
	var circleNodes = node.getElementsByTagName("circle");
	while( circleNodes.length != 0 ){
		var circleNode = circleNodes.item(0);
		circleNode.parentNode.removeChild(circleNode);
	}
}




function getCenterX( rect )
{
	return parseFloat(rect.x) + parseFloat(rect.width) / 2
}


function getCenterY( rect )
{
	return parseFloat(rect.y) + parseFloat(rect.height) / 2
}


function culcRadius( height )
{
	return (parseFloat(height) * 1.81) / 2;
}

