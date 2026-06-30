/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/





function doPrintPDF( filePath )
{

	
	var style = "left = 0, top = 0, width=700, height=600, toolbar=no, menubar=no, location=no, status=no, resizable=yes, scrollbars=yes";
	window.open( filePath, "_pdf", style );
}
