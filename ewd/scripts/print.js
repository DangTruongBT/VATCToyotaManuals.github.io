/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/






function showPrintWindow()
{
	if( parent.d_mainframe.getMode == null ) return;
	var mode = parent.d_mainframe.getMode();
	
	switch (mode) {
		case "Intro":
			showPrintDialogIntro();
			break;
		
		case "ConnectorList":
			showPrintDialogConn();
			break;
		
		case "Loads":
			showPrintDialogLoads();
			break;
			
		case "FigMap":
			openPDF();
			break;
			
		default:
			break;
	}
}




function showPrintDialogIntro()
{
	var name = "intro";
	var bodyHTML = parent.d_mainframe.d_contents.window.document.body.innerHTML;
	
	openNewPrintDialog( name, bodyHTML );
}





function showPrintDialogConn()
{

	parent.d_mainframe.d_info.setHighlightPinInfo();
	
	var name = "parts";
	var bodyHTML = parent.d_mainframe.d_info.window.document.body.innerHTML;
	
	openNewPrintDialog( name, bodyHTML );
}




function showPrintDialogLoads()
{
	var name = "loads_ps";

	var bodyHTML = parent.d_mainframe.getPrintBodyHTML();
	
	openNewPrintDialog( name, bodyHTML );
}





function openPDF()
{
	var titleObj = parent.d_mainframe.getTitleObj();

	var fileName = titleObj.getPdfFileName();
	var ewdType = titleObj.getType();
	fileName = "./" + ewdType + "/pdf/" + fileName;

	

	doPrintPDF( fileName );
}







function getPrintDialogHeader()
{
	var xmlDoc = loadXML("../styles/common/print_head.xml");
	return xmlDoc.xml;
}
