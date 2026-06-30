/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/

function chkBrowserVersion()
{
	var app = navigator.appName.charAt(0);
	var ver = new String(navigator.appVersion);

	if( app != "M" ){
		window.alert("Need Internet Explorer");
		return;
	}

	if( ver.search(/5.01/) == -1 ){
		window.alert("Need Internet Explorer Version 5.01");
		return;
	}
}

