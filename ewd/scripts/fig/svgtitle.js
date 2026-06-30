/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var RECT_FILL_COLOR = "#FFFFE7";
var FONT_FACE_NAME  = "Arial";
var NODE_TYPE = 3;
var HEIGHT_MARGIN = 1.25;
var SPACE_WIDTH = 0.25;
var SPACE_HEIGHT = 0.9;
var TITLE_OFFSET_X = 10;
var TITLE_OFFSET_Y = 35;
var MOVE_TO_VIEW_AREA_OFFSET = 50;



function Title(doc, s)
{
	this.element = null;

	Title.size = s;
	Title.scale = doc.getDocumentElement().getCurrentScale();
	Title.offset = doc.getDocumentElement().getCurrentTranslate();

	this.create(doc);
	rootElement = doc.getDocumentElement();
	addTitleEvents(rootElement);
	rootElement.addEventListener("SVGZoom", Title.zoom, false);
	window.svgTitle = this;
}


function Title.prototype.create(doc)
{
	this.rect = doc.createElement("rect");
	this.rect.setAttribute("y", -1 * SPACE_HEIGHT * Title.size);
	this.rect.setAttribute("x", -1 * SPACE_WIDTH  * Title.size);
	this.rect.setAttribute("width", "1");
	this.rect.setAttribute("height", HEIGHT_MARGIN * Title.size);
	this.rect.setAttribute("style", "stroke:black;fill:" + RECT_FILL_COLOR + ";stroke-width:0.8");

	this.str = doc.createTextNode("");

	this.text = doc.createElement("text")
	this.text.setAttribute("style", "font-family:" + FONT_FACE_NAME + "; font-size:" + Title.size + ";fill:black;");
	this.text.appendChild(this.str);

	this.group = doc.createElement("g"),
	this.group.setAttribute("transform", "translate(0,0)");
	this.group.setAttribute("visibility", "hidden");
	this.group.appendChild(this.rect);
	this.group.appendChild(this.text);

	doc.getDocumentElement().appendChild(this.group);
}



function Title.activate(evt)
{
	try {
		if (window.svgTitle.element == null)
		{
			var originalFigRect = view.fig.getOriginalSize();
			var currentFigRect = view.fig;
			if(originalFigRect == null || currentFigRect == null)	return;

			var svgPos = getSvgPos(evt.getClientX(), evt.getClientY());

			var x = svgPos.x + (TITLE_OFFSET_X/Title.scale) / (currentFigRect.width/originalFigRect.width);
			var y = svgPos.y + (TITLE_OFFSET_Y/Title.scale) / (currentFigRect.height/originalFigRect.height);

			window.svgTitle.element = evt.getCurrentTarget();
			window.svgTitle.element.removeEventListener("mouseover", Title.activate, false);
			window.svgTitle.element.addEventListener("mouseout", Title.passivate, false);
			window.svgTitle.str.setNodeValue(getText(getTitleElement(window.svgTitle.element)));

			var fontSize = Title.size / (currentFigRect.width/originalFigRect.width);
			window.svgTitle.text.setAttribute("style", "font-family:" + FONT_FACE_NAME + "; font-size:" + fontSize + ";fill:black;");
			var width = window.svgTitle.text.getComputedTextLength() + 2 * SPACE_WIDTH * (Title.size / (currentFigRect.width/originalFigRect.width));
			var height = HEIGHT_MARGIN * (Title.size / (currentFigRect.width/originalFigRect.width));

			var newPos = moveToViewArea(x, y, width, height);

			if((newPos.x != x) && (newPos.y != y)){
				newPos.x = newPos.x - MOVE_TO_VIEW_AREA_OFFSET/(currentFigRect.width/originalFigRect.width);
				newPos.y = newPos.y - MOVE_TO_VIEW_AREA_OFFSET/(currentFigRect.height/originalFigRect.height);
			}

			var strokeWidth = originalFigRect.width / currentFigRect.width;
			window.svgTitle.rect.setAttribute("width", width);
			window.svgTitle.rect.setAttribute("height", height);
			window.svgTitle.rect.setAttribute("x", (-1 * SPACE_WIDTH ) * (Title.size / (currentFigRect.width/originalFigRect.width)));
			window.svgTitle.rect.setAttribute("y", (-1 * SPACE_HEIGHT) * (Title.size / (currentFigRect.width/originalFigRect.width)));
			window.svgTitle.rect.setAttribute("style", "stroke:black;fill:" + RECT_FILL_COLOR + ";stroke-width:" + strokeWidth);
			window.svgTitle.group.setAttribute("transform", "translate(" + newPos.x + "," + newPos.y + ")");
			window.svgTitle.group.setAttribute("visibility", "visible");
		}
	}
	catch( e ){

	}
}


function Title.passivate(evt)

{
	if (window.svgTitle.element != null)
	{
		window.svgTitle.group.setAttribute("visibility", "hidden");
		window.svgTitle.element.removeEventListener("mouseout", Title.passivate, false);
		window.svgTitle.element.addEventListener("mouseover", Title.activate, false);
		window.svgTitle.element = null;
	}
}


function Title.zoom(evt)
{
	if (window.svgTitle.element != null){
		window.svgTitle.group.setAttribute("visibility", "hidden");
		window.svgTitle.element.removeEventListener("mouseout", Title.passivate, false);
		window.svgTitle.element.addEventListener("mouseover", Title.activate, false);
		window.svgTitle.element = null;
	}

	var newscale = evt.getTarget().getOwnerDocument().getDocumentElement().getCurrentScale();
	Title.size *= Title.scale/newscale;
	Title.scale = newscale;
	Title.offset = evt.getTarget().getOwnerDocument().getDocumentElement().getCurrentTranslate();

	window.svgTitle.rect.setAttribute("y", -1 * SPACE_HEIGHT * Title.size);
	window.svgTitle.rect.setAttribute("x", -1 * SPACE_WIDTH  * Title.size);
	window.svgTitle.rect.setAttribute("height", HEIGHT_MARGIN * Title.size);
	window.svgTitle.rect.setAttribute("style", "stroke:black;fill:" + RECT_FILL_COLOR + ";stroke-width:" + 1/Title.scale);
	window.svgTitle.text.setAttribute("style", "font-family:" + FONT_FACE_NAME + "; font-size:" + Title.size + ";fill:black;");
}


function Title.register(elem)

{
	if (getTitleElement(elem) != null){
		elem.addEventListener("mouseover", Title.activate, false);
	}
}



function getTitleElement(elem)
{
	var childs = elem.getChildNodes();

	for (var i=0; i<childs.getLength(); i++){
		if (childs.item(i).getNodeType() == 1 && childs.item(i).getNodeName() == "title"){
			return childs.item(i);
		}
	}

	return null;
}


function getText(elem)
{
	var childs = elem ? elem.getChildNodes() : null;

	for (var i=0; childs && i<childs.getLength(); i++){
		if (childs.item(i).getNodeType() == NODE_TYPE ){
			return childs.item(i).getNodeValue();
		}
	}

   return "";
}


function addTitleEvents(elem)
{
	var gNodeList = elem.getElementsByTagName("a");
	for( var i = 0; i < gNodeList.getLength(); i++ ){
		var figType = gNodeList.item(i).getAttribute( "ewd:figtype" );
		if( figType != null ){
			if( figType == "conn" ){
				if (getTitleElement(gNodeList.item(i)) != null){
					gNodeList.item(i).addEventListener("mouseover", Title.activate, false);
				}
			}
		}
	}
}


function getSvgPos(clientX, clientY)
{
	var tmpX = clientX - Title.offset.getX();
	var tmpY = clientY - Title.offset.getY();

	var originalFigRect = view.fig.getOriginalSize();
	var currentFigRect = view.fig;
	var posX = (originalFigRect.width * (tmpX / Title.scale))  / currentFigRect.width;
	var posY = (originalFigRect.height * (tmpY / Title.scale))  / currentFigRect.height;

	return new Point(posX, posY);
}


function moveToViewArea(newPosX,newPosY,width,height)
{
	var originalFigRect = view.fig.getOriginalSize();
	var currentFigRect = view.fig;

	var dispWidth = document.body.clientWidth - 20;
	var dispHeight = document.body.clientHeight - 30;

	if(currentFigRect.width < dispWidth)	dispWidth = currentFigRect.width;
	if(currentFigRect.height < dispHeight)	dispHeight = currentFigRect.height

	var dispRangeX = document.body.scrollLeft + dispWidth;
	var tmpSvgWidth = dispRangeX - Title.offset.getX();
	tmpSvgWidth = (originalFigRect.width * (tmpSvgWidth / Title.scale)) / currentFigRect.width;
	var tmpWidth = newPosX + width;

	var dispRangeY = document.body.scrollTop + dispHeight;
	var tmpSvgHeight = dispRangeY - Title.offset.getY();
	tmpSvgHeight = (originalFigRect.height * (tmpSvgHeight / Title.scale)) / currentFigRect.height;
	var tmpHeight = (newPosY + height);

	if(tmpSvgWidth < tmpWidth){
		var diff = tmpWidth - tmpSvgWidth;
		newPosX = newPosX - diff;
	}
	if(tmpSvgHeight < tmpHeight){
		var diff = tmpHeight - tmpSvgHeight;
		newPosY = newPosY - diff;
	}

	return new Point(newPosX, newPosY);
}

