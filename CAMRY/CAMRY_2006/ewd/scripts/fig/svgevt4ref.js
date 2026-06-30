/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var SVG_BOTTON_LEFT = 0;
var SVG_BOTTON_RIGHT = 2;

function processZoomEvent_svg(evt)
{
	try{
		var svgdoc = evt.target.getOwnerDocument();
		if( svgdoc.rootElement.currentScale == 1 )	return;
		zoomFig( svgdoc );
	}
	catch(e){
		window.alert(e.description);
	}
}

function processPanEvent_svg(evt)
{
	try{

		var currentPos = evt.target.getOwnerDocument().rootElement.getCurrentTranslate();
		currentPos.setX(0);
		currentPos.setY(0);
	}
	catch(e){
		window.alert(e.description);
	}
}

function processMouseDownEvent_svg(evt)
{
	try{
		if( evt.button != SVG_BOTTON_LEFT )	return;
		if( evt.altKey == true )	return;
		if( evt.ctrlKey == true )	return;
		selectPinNoFromEvent( evt );
	}
	catch(e){
		window.alert(e.description);
	}
}
