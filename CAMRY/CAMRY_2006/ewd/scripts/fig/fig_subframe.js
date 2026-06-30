/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/






function call_runOnLoadProc()
{

	try{
		loadHead();
		loadFigCtrl();
		loadFigMap();
	}
	catch( e ){
		window.alert(e.description);
	}
}


function loadHead()
{
	d_header.window.navigate("../common/figtitle.html" + window.location.search );
}

function loadFigCtrl()
{
	d_figctrl.window.navigate("../common/figctrl.html" + window.location.search );
}

function loadFigMap()
{
	d_figmap.window.navigate("../common/figmap.html" + window.location.search );
}
