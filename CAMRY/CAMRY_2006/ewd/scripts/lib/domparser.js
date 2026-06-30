/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/




function loadXML( path )
{
	var xmlDoc = createDOM();
	
	if( xmlDoc.load(path) == false ){
		var err = new Error(0, "\r\n" + 
							"ファイル:　" + path + "\r\n" + 
							"行数:　" + xmlDoc.parseError.line + "\r\n" + 
							"内容:　" + xmlDoc.parseError.reason);
		throw err;
	}
	
	return xmlDoc;
}



function createDOM()
{

	var dom = new ActiveXObject("MSXML2.DOMDocument");

	
	dom.async = false;


	
	
	return dom;
}
