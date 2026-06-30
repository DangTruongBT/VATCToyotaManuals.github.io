/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/




function openNewEWD( destURL, paramTable )
{
	paramTable.put("globalnavi","no");
	paramTable.put("localnavi","no");
	paramTable.put("imode","ewd");
	
	destURL += makeParamString(paramTable);
	
	var winStyle = makeWinStyleString();
	
	window.open( destURL , "newEwd" , winStyle);
}



function makeWinStyleString()
{

	var height = parent.d_map.window.document.body.clientHeight;
	var width = parent.d_map.window.document.body.clientWidth;
	var winY = window.screen.availHeight - height - 50;
	var winX = window.screen.availWidth - width - 20;
	
	var winStyle = "";
	winStyle += "height=" + height + ",width=" + width;
	winStyle += ",top=" + winY + ",left=" + winX;
	winStyle += ",status=no,resizable=yes,scrollbars=yes";
	
	return winStyle;
}


function openCompCheck(strParam)
{

	openWindowToCenter("../../../repair/html/isp_toc/ewd_frame.html" + strParam, true, 700, 600 );
}


function openWindowToCenter(url, blnResize, nWidth, nHeight )
{
	var nTop  = (window.screen.availHeight - nHeight) / 2;
	var nLeft = (window.screen.availWidth  - nWidth)  / 2;
	
	var strWinStyle = "width=" + nWidth + ",height=" + nHeight + ",top=" + nTop + ",left=" + nLeft
	if( blnResize ){
		strWinStyle = strWinStyle + ",resizable=yes";
	}
	
	window.open( url, "_blank", strWinStyle );
}


function openNewDialog( destURL,paramTable,width,height)
{
	var sFeatures = "dialogWidth=" + width +"px; dialogHeight=" + height + "px; status=yes; resizable=yes; help=no;"

	paramTable.put("globalnavi","no");
	paramTable.put("localnavi","no");
	paramTable.put("imode","ewd");

	showModalDialog(destURL, makeParamString(paramTable), sFeatures);
}



function openNewPrintDialog( name, bodyHTML )
{
	var args = new Array();
	args[0] = "print";
	args[1] = name;
	args[2] = bodyHTML;
	
	var path = "./common/print.html"
	var style = "dialogWidth:700px; dialogHeight:620px; resizable=yes; help=no;";
	window.showModalDialog( path, args, style );
}



function openOutlineDialog( systemCode )
{
	var args = new Array();
	args[0] = "print";
	args[1] = "outline";
	args[2] = systemCode;
	
	var path = "../common/print.html"
	var style = "dialogWidth:700px; dialogHeight:620px; resizable=yes; help=no;";
	window.showModalDialog( path, args, style );
}



function openReadMeDialog()
{
	var args = new Array();
	args[0] = "print";
	args[1] = "readme";
	
	var path = "../common/print.html"
	var style = "dialogWidth:800px; dialogHeight:620px; resizable=yes; help=no;";
	window.showModalDialog( path, args, style );
}
