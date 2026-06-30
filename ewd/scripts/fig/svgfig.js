function SVGFig()
{
	this.embedNode = null;
	this.svgRootNode = null;
	this.width = 0;
	this.heigth = 0;
}


function SVGFig.prototype.getOriginalSize()
{
	try{
		return new Rect(0, 0, this.svgRootNode.getAttribute("width"), this.svgRootNode.getAttribute("height") );
	}
	catch(e){
		return null;
	}
}

function SVGFig.prototype.setFigData(doc)
{
	this.svgRootNode = doc.rootElement;
	this.height = this.svgRootNode.getAttribute("height");
	this.width = this.svgRootNode.getAttribute("width");
}

function SVGFig.prototype.setSize(width, height)
{
	try{
		this.embedNode.setAttribute("width", width);
		this.embedNode.setAttribute("height", height);

		this.width = width;
		this.height = height;
		return true;
	}
	catch(e){
		window.alert(e.description);
		return false;
	}

}

function SVGFig.prototype.setEmbedNode( node )
{
	this.embedNode = node;
}

function SVGFig.prototype.addEventListener()
{
	try{
		this.svgRootNode.addEventListener("SVGZoom", processZoomEvent_svg, false);

		return true;
	}
	catch(e){
		window.alert("EWD Viewer: event error occured");
		return false;
	}
}

function SVGFig.prototype.addFigCtrlEventListener()
{
	try{
		this.svgRootNode.addEventListener("SVGScroll", processPanEvent_svg, false);
		this.svgRootNode.addEventListener("mousedown", processMouseDownEvent_svg, false);

		return true;
	}
	catch(e){
		return false;
	}
}


function call_execInitLoadProc_svg(type)
{
	var svgFig = new SVGFig();
	svgFig.setFigData(document);

	svgFig.addEventListener();

		svgFig.addFigCtrlEventListener();

	sendOnloadMsg(svgFig);
}

