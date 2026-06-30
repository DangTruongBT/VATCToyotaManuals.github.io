/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var DEFAULT_GNAVI_SIZE = "50,*";


var g_fLoaded = false;

function setLoadedFlag(flag)
{
	g_fLoaded = flag;
}

function getLoadedFlag()
{
	return g_fLoaded;
}


function showGlobalNavi( flgShowPrint )
{
	if( getLoadedFlag() == true ){
		d_selector.showPrintButton( flgShowPrint );
	}
	else{
		var strUrlParam;
		if( flgShowPrint )
			strUrlParam = "?print=yes";
		else
			strUrlParam = "?print=no";
		
		d_selector.window.navigate("../select.html" + strUrlParam);
		setLoadedFlag(true);
	}
	

	var globalNavi = getURLParam("globalnavi");
	if( globalNavi != "no" ){
		document.all("frame1").rows = DEFAULT_GNAVI_SIZE;
	}
}
