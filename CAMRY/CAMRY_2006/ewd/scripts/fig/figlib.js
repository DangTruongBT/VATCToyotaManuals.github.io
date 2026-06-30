var SCROLL_BAR_SIZE=20;
var MARGIN_HEIGHT=30;
var zoomState = new Array( 0.5, 0.6, 0.8, 1.0, 1.5, 2.0, 4.0 );
var initZoomStateIndex = 3;




function Point(x , y)
{
	this.x = x;
	this.y = y;
}

function Point.prototype.setLocation( x, y )
{
	this.x = x;
	this.y = y;
}

function Point.prototype.translate( x, y )
{
	this.x += x;
	this.y += y
}

function Point.prototype.magnify( scale )
{
	this.x = this.x * scale;
	this.y = this.y * scale;
}






function Rect(x, y, width, height )
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

function Rect.prototype.setRect( x, y, width, height )
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

function Rect.prototype.setSize( width, height )
{
	this.width = width;
	this.height = height;
}

function Rect.prototype.setLocation( x, y )
{
	this.x = x;
	this.y = y;
}

function Rect.prototype.translate( x, y )
{
	this.x += x;
	this.y += y;
}






function View()
{
	this.viewRect = new Rect(0,0,0,0);
	this.initFigRect = new Rect(0, 0, 0, 0);
	this.pOrg = new Point( 0, 0 );
	this.zoomStateIndex = initZoomStateIndex;
	this.fig = null;

	this.scrollBarSize = parseFloat(SCROLL_BAR_SIZE);
}

function View.prototype.setFig( fig )
{
	try{
		if( fig.svgRootNode == null )	return false;
		this.fig = fig;
	}
	catch(e){
		return false;
	}
	return true;
}

function View.prototype.setViewRect( obj )
{
	try{
		this.viewRect.setRect( 0, 0, obj.clientWidth - this.scrollBarSize, obj.clientHeight - this.scrollBarSize - MARGIN_HEIGHT );
		return false;
	}
	catch(e){
		return false;
	}
}

function View.prototype.fitToWindow(mode)
{
	var bMode = 0;
	var ratio = 1;

	var ratioWidth = this.culcRatio("width");
	var ratioHeight = this.culcRatio("height");

	if( mode == null || mode == "" ) return;

	if( mode == "height" ){
		ratio = ratioHeight;
	}
	else{
		ratio = (ratioWidth < ratioHeight) ? ratioWidth: ratioHeight;
	}
	this.initFigRect.setSize( this.fig.width * ratio, this.fig.height * ratio );
	this.fig.setSize( this.initFigRect.width, this.initFigRect.height );

	this.zoomStateIndex = initZoomStateIndex;

}

function View.prototype.culcRatio(mode)
{
	if( mode == "width" )	return parseFloat( this.viewRect.width / this.fig.width );
	else if( mode == "height" )	return parseFloat( this.viewRect.height / this.fig.height );
	return -1;
}

function View.prototype.zoom( mode )
{
	var nextIndex = this.zoomStateIndex;

	if( mode == "in" )	nextIndex++;
	else if( mode == "out" ) nextIndex--;
	else	return false;


	return this.setZoom( nextIndex );
}

function View.prototype.setZoom(nZoomIndex)
{
	if( nZoomIndex < 0 || nZoomIndex > zoomState.length - 1 )	return false;
	this.zoomStateIndex = nZoomIndex;



	this.fig.setSize( this.initFigRect.width * zoomState[nZoomIndex],
						this.initFigRect.height * zoomState[nZoomIndex] );
						
	return true;
}

function View.prototype.getCurrentZoom()
{
	return zoomState[this.zoomStateIndex];
}

function View.prototype.getZoomStateIndex()
{
	return this.zoomStateIndex;
}

function View.prototype.reculcTranslate()
{
	var currentPos = this.fig.svgRootNode.getCurrentTranslate();
	var asvScale = this.fig.svgRootNode.currentScale;


	var pDiff = new Point( currentPos.getX(), currentPos.getY() );


	pDiff.magnify( 1/ asvScale );

	return pDiff;
}

function View.prototype.culcZoomCenter()
{
	var currentPos = this.fig.svgRootNode.getCurrentTranslate();
	var asvScale = this.fig.svgRootNode.currentScale;


	var pCenter = new Point( this.fig.width / 2 - currentPos.getX(), this.fig.height / 2 - currentPos.getY() );


	pCenter.magnify( (this.initFigRect.width / this.fig.width) / asvScale );

	return pCenter;
}



function View.prototype.setLocation( p )
{
	p.magnify( this.fig.width / this.initFigRect.width );
	confirm( this.fig.width / this.initFigRect.width );
	window.scrollTo(p.x, p.y );
}

function View.prototype.getScrollCenterPosition()
{
	return new Point( (this.initFigRect.width - this.viewRect.width) / 2, (this.initFigRect.height - this.viewRect.height) /2 );
}



function View.prototype.centering( pCenter )
{
	window.scrollTo( pCenter.x - this.viewRect.width / 2 , pCenter.y - this.viewRect.height / 2 );

}

function View.prototype.scrollTo( x, y )
{
	window.scrollTo( x, y );
}

