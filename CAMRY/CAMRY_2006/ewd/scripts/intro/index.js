/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var MODE = "Intro";

var DEFAULT_FRAME_SIZE = null;


function getMode()
{
	return MODE;
}



function call_runOnLoadProc()
{
	try{

		if( parent != self ){
			parent.showGlobalNavi( false );
		}
		
		DEFAULT_FRAME_SIZE = document.all("frsCols").cols;
		showLeftFrame(false);
	}
	catch( e ){
		window.alert(e.description);
	}
}


function showLeftFrame( flag )
{
	if( flag ){
		document.all("frsCols").cols = DEFAULT_FRAME_SIZE;
	}
	else{
		document.all("frsCols").cols = "0,*";
	}
}
