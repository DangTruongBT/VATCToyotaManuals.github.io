/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var DEFAULT_FRAME_SIZE = null;


function call_runOnLoadProc()
{
	try{

		if( parent != self ){
			parent.showGlobalNavi( false );
		}
		
		DEFAULT_FRAME_SIZE = document.all("frame1").cols;
		loadCategory();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function loadCategory()
{

	d_category.window.navigate("category.html" + window.location.search );
}




function showLeftFrame( flag )
{
	if( flag ){
		document.all("frame1").cols = DEFAULT_FRAME_SIZE;
	}
	else{
		document.all("frame1").cols = "0,*";
	}
}
