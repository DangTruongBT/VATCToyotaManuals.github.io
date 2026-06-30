var view = null;
var svgEmbedName = "svgEmbed";
var bZoom = true;
var TITLE_SIZE = 14;

var g_objConnect = null;


function call_runOnload()
{
	try{
		var fileName = getURLParam("figname");
		if( fileName == null )	return;
		
		createConnectObj();
		
		showSVG( document.all.d_svgfig, fileName, svgEmbedName );
	}
	catch( e ){
		window.alert(e.description);
	}
}


function createConnectObj()
{
	var titleObj = parent.parent.getTitleObj();
	if( titleObj.getType() == "system" ){

		g_objConnect = new Connect( "../system/connect/" + titleObj.getBaseFig() + ".xml" );
	}
}


function changeStyle_svgmap()
{
	document.all('d_msg').style.display="none";
}


function showSVG( dest, fileName, naming )
{
	if( dest == null || fileName == null || naming == null )	return false;
	dest.innerHTML = makeEmbedNode( fileName, naming );
}


function loadSVG(fileName)
{
	showSVG( document.all.d_svgfig, fileName, svgEmbedName );
}

function makeEmbedNode( fileName, naming )
{

	var embedString = "<embed src=\""  + fileName + "\" ";
	embedString +=	"name=\"" + naming + "\" ";
	embedString +=	"id=\"" + naming + "\" ";

	embedString +=	"width=\"0\" ";
	embedString +=	"height=\"0\" ";

	embedString +=	"type=\"imagesvg+xml\" ";
	embedString +=	"pluginspage=\"http://www.adobe.com/svg/viewer/install/\" />";

	return(embedString);

}

function sendOnloadMsg(svgFig)
{
	svgFig.setEmbedNode( getEmbedNode(window.document, "d_svgfig") );
	changeStyle_svgmap();
	view = new View();
	view.setFig(svgFig);
	fitToWindow("height");

	new Title( svgFig.svgRootNode.getOwnerDocument(), TITLE_SIZE );
	
	

	var ewdItemCode = getURLParam("code");
	var ewdItemType = getURLParam("type");
	var flgSub = parent.parent.getSubcodeFlag();
	if( ewdItemCode != null ){
		ewdItemCode = ewdItemCode.replace(/\x2B/g, ",");
		drawSymbol(ewdItemCode, ewdItemType, flgSub, true);
	}
}

function fitToWindow(mode)
{


	view.setViewRect( window.document.body );

	view.fitToWindow(mode);
	


}

function resetFig()
{


	resetSVG(view.fig.svgRootNode.getOwnerDocument());


	resetPartsList();
}

function getEmbedNode( doc, id )
{
	return doc.all(id).getElementsByTagName("embed").item(0);
}

function zoomAndPan( svgNode )
{
	var bZoomed;


	view.setViewRect( window.document.body );


	var pCenter = view.culcZoomCenter();

	if( svgNode.currentScale > 1 )	bZoomed = view.zoom("in");
	else					bZoomed = view.zoom("out");

	if( bZoomed == false )	return;


	pCenter.magnify( view.fig.width / view.initFigRect.width );


	view.centering( pCenter );

	setZoomSelector();

}

function setZoomSelector()
{
	try{
		window.parent.d_figctrl.setZoomSelector(view.zoomStateIndex);
	}
	catch(e){
		alert("Zoom Selector error");
	}
}

function zoomCtrl(mode)
{

	var bZoomed = view.zoom(mode);

	if( bZoomed == false )	return -1;

	var index = view.getZoomStateIndex();

	partsIntoView();

	return index;
}

function setZoom(nIndex)
{
	view.setZoom(nIndex);
	

	partsIntoView();
}

function translateToScroll( pos )
{
	window.confirm("not implemented");
}









function searchConnectedParts( lineID )
{
	var ewdItemArray = g_objConnect.getConnectedEwdItem( lineID );
	ewdItemArray = filterEwdItemArray( ewdItemArray );
	
	return ewdItemArray;
}

function filterEwdItemArray( ewdItemArray )
{
	var retEwdItemArray = new Array();
	
	for( var i=0; i < ewdItemArray.length; i++ ){
		if( ewdItemArray[i].isFilteredItem4Connect() ) continue;
		retEwdItemArray[retEwdItemArray.length] = ewdItemArray[i];
	}
	
	return retEwdItemArray;
}


function makeLineIDWithFigNo(lineID)
{
	var figNo = parent.d_figctrl.getCurFigNo();
	if (figNo != null)	lineID = figNo + "." + lineID;
	
	return lineID;
}





function getFigName()
{
	var fileName = getURLParam("figname");
	
	var index = fileName.lastIndexOf("/") + 1;
	fileName = fileName.substring(index);
	
	index = fileName.lastIndexOf(".");
	if( index != -1 ){
		fileName = fileName.substring(0,index);
	}
	
	return fileName;
}
