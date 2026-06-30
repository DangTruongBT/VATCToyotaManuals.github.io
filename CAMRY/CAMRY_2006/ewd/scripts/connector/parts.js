/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



var MODE = "ConnectorList";




function getMode()
{
	return MODE;
}


function call_runOnLoadProc()
{
	try{

		if( parent != self ){
			parent.showGlobalNavi( true );
		}
		
		d_search.window.navigate("psearch.html" + window.location.search );
		d_list.window.navigate("partslist.html" + window.location.search );
		d_info.window.navigate("partsref.html" + window.location.search );
	}
	catch( e ){
		window.alert(e.description);
	}
}



function showNameList()
{
	d_list.window.navigate("partslist_name.html");
}

function showCodeList()
{
	d_list.window.navigate("partslist_code.html");
}

function showListByKey( key )
{
	d_list.showList(key);
}
