var ZOOMINDEX_DEFAULT = 3;




function call_runOnLoadProc()
{
	try{
		var outline = getURLParam("outline");
		if( outline != "yes" ){
			displayOutlineBtn(false);
		}
		
		var connlist = getURLParam("connlist");
		if( connlist != "yes" ){
			displayConnListBtn(false);
		}
		
		var pageSelect = getURLParam("page_select");
		if( pageSelect != "yes" ){
			displayPageSelect(false);
		}
		else{

			if( getURLParam("page_plate") != "yes" ){
				displayPageSelectPlate(false);
			}
			

			var pageID = getURLParam("page");
			switch( pageID ){
				case "object":
					document.all("page_rect_object").className = "ctrl_page_rect_active";
					break;
				
				case "inner":
					document.all("page_rect_inner").className = "ctrl_page_rect_active";
					break;
				
				case "plate":
					document.all("page_rect_plate").className = "ctrl_page_rect_active";
					break;
			}
		}
		
		

		var figLength = getURLParam("fig_len");
		var figNo = getURLParam("fig_no");
		if( figLength == null ) figLength = "1";
		if( figNo == null ) figNo = "1";
		
		if( figLength == "1" ){
			displayFigSelect(false);
		}
		else{
			document.all("fig_no").innerHTML = figNo;
			
			if( figNo == "1" ){
				displayFigSelectBack(false);
			}
			if( figNo == figLength ){
				displayFigSelectNext(false);
			}
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickFigBack()
{
	try{
		var figLength = getURLParam("fig_len");
		var figNo = getURLParam("fig_no");
		if( figNo == null ) figNo = 1;
		
		var nextNo = parseInt(figNo) - 1;
		if( nextNo < 1 ) nextNo = figLength;
		

		parent.parent.loadMap(parent.parent.getTitleObj(), nextNo, null, null);
		

		parent.parent.d_partslist.resetItemStyle();
		

		parent.parent.d_partsinfo.resetPartsInfo();
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickFigNext()
{
	try{
		var figLength = getURLParam("fig_len");
		var figNo = getURLParam("fig_no");
		if( figNo == null ) figNo = 1;
		
		var nextNo = parseInt(figNo) + 1;
		if( nextNo > figLength ) nextNo = 1;
		

		parent.parent.loadMap(parent.parent.getTitleObj(), nextNo, null, null);
		

		parent.parent.d_partslist.resetItemStyle();
		

		parent.parent.d_partsinfo.resetPartsInfo();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickPage( page )
{
	try{
		parent.parent.changePage( page );
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_zoomIn()
{
	try{
		var result = window.parent.d_figmap.zoomCtrl("in");
		setZoomSelector( result );
	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_zoomOut()
{
	try{
		var result = window.parent.d_figmap.zoomCtrl("out");
		setZoomSelector( result );
	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_showWhole()
{
	try{
		window.parent.d_figmap.fitToWindow("all");
		setZoomSelector(ZOOMINDEX_DEFAULT);
	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_fitToWindow()
{
	try{

		window.parent.d_figmap.fitToWindow("height");
		

		window.parent.d_figmap.resetFig();
		

		setZoomSelector(ZOOMINDEX_DEFAULT);
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_zooming()
{
	try{
		window.parent.d_figmap.setZoom( window.document.all.d_zoomSelector.selectedIndex );
		return true;
	}
	catch(e){
		return false;
	}
}



function call_showConnectList()
{
	try{
		parent.parent.showConnectList();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_printEWD()
{
	try{
		var titleObj = parent.parent.getTitleObj();
		var fileName = titleObj.getPdfFileName();
		var ewdType = titleObj.getType();
		fileName = "../" + ewdType + "/pdf/" + fileName;
		
		parent.doPrintPDF( fileName );
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickSystemOutLine()
{
	try{

		var systemCode = parent.parent.getTitleObj().getBaseFig();
		
		openOutlineDialog( systemCode );
	}
	catch( e ){
		window.alert(e.description);
	}
}


function setZoomSelector( nIndex )
{
	if( nIndex < 0 )	return;
	try{
		window.document.all.d_zoomSelector.selectedIndex = nIndex;
	}
	catch(e){
		window.alert( "zoom select error" );
	}
}



function displayPageSelect( blnDisp )
{
	var obj = document.all("page_select");
	setStyleDisplay( obj, blnDisp );
}

function displayFigSelect( blnDisp )
{
	var obj = document.all("fig_select");
	setStyleDisplay( obj, blnDisp );
}

function displayOutlineBtn( blnDisp )
{
	var obj = document.all("btn_outline");
	setStyleDisplay( obj, blnDisp );
}

function displayConnListBtn( blnDisp )
{
	var obj = document.all("d_showConnList");
	setStyleVisible( obj, blnDisp );
}

function displayPageSelectPlate( blnDisp )
{
	var obj = document.all("page_rect_plate");
	setStyleVisible( obj, blnDisp );
}

function displayFigSelectBack( blnDisp )
{
	var obj = document.all("fig_back");
	setStyleVisible( obj, blnDisp );
}

function displayFigSelectNext( blnDisp )
{
	var obj = document.all("fig_next");
	setStyleVisible( obj, blnDisp );
}


function setStyleDisplay( objHtml, blnDisp )
{
	if( blnDisp )
		objHtml.style.display = "block";
	else
		objHtml.style.display = "none";
}

function setStyleVisible( objHtml, blnDisp )
{
	if( blnDisp )
		objHtml.style.visibility = "visible";
	else
		objHtml.style.visibility = "hidden";
}







function getCurFigNo()
{
	var figNo = document.all("fig_no").innerHTML;
	

	if( isNaN(parseInt(figNo)) ){
		figNo = null;
	}
	
	return figNo;
}
