var SVG_BOTTON_LEFT = 0;
var SVG_BOTTON_RIGHT = 2;

function processZoomEvent_svg(evt)
{

	try{
		if( view.fig.svgRootNode.currentScale == 1 )	return;;



		zoomAndPan(view.fig.svgRootNode);


		view.fig.svgRootNode.currentScale = 1;
		view.fig.svgRootNode.getCurrentTranslate().setX(0);
		view.fig.svgRootNode.getCurrentTranslate().setY(0);

		return;
	}
	catch(e){
		window.confirm( e );
	}
	return;
}

function processPanEvent_svg(evt)
{
	try{

		var currentPos = evt.target.getOwnerDocument().rootElement.getCurrentTranslate();
		currentPos.setX(0);
		currentPos.setY(0);
	}
	catch(e){
		window.confirm(e);
	}
}

function processMouseDownEvent_svg(evt)
{
	try{
		if( evt.button != SVG_BOTTON_LEFT )	return;
		if( evt.altKey == true )	return;
		if( evt.ctrlKey == true )	return;
		doEWDMannerForMouseDown(evt, view.fig.svgRootNode);
	}
	catch(e){
		window.confirm(e);
	}
}
