/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var g_htmlOpenBtn;
var g_htmlCloseBtn;



function call_runOnLoadProc()
{
	
	try{

		showHeaderTitle();
		
		

		g_htmlOpenBtn = loadXML("../../styles/common/figtitle_default.xml").xml;
		g_htmlCloseBtn = loadXML("../../styles/common/figtitle_closed.xml").xml;
		

		var frmCtrl = getURLParam("frm_ctrl");
		if( frmCtrl == "close" ){
			changeButton(false);
		}
		else {
			changeButton(true);
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_showLocalNavi()
{
	try{
		var val = window.event.srcElement.value;
		
		if( val == "<" ){
			parent.parent.showLocalNavi(false);
			changeButton(false);
		}
		else if( val == ">" ){
			parent.parent.showLocalNavi(true);
			changeButton(true);
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}


function changeButton( val )
{
	var destObj = document.all("button_place");
	if( val ){
		destObj.innerHTML = g_htmlOpenBtn;
	}
	else {
		destObj.innerHTML = g_htmlCloseBtn;
	}
}




function isOpenFrame()
{
	if( document.all("btnFrmCtrl").value == "<" )
		return true;
	else
		return false;
}







function showHeaderTitle()
{
	var saparateText = " > ";
	var name1 = "";
	var name2 = "";
	var name3 = "";
	
	
	var titleObj = parent.parent.getTitleObj();
	switch( titleObj.getType() ){
		case "system":
			if( titleObj.getSC() == null ){
				name1 = titleObj.getName();
				name2 = "";
				name3 = "";
				saparateText = "";
			}
			else{
				var scObj = new ServiceCategory("../../defs/sc.xml");
				name1 = document.all("system_name").innerHTML;
				name2 = scObj.getCategory( titleObj.getSC() ).name;
				name3 = titleObj.getName();
			}
			break;
		
		
		case "routing":
			name1 = document.all("location_name").innerHTML;
			name2 = titleObj.getSingleName();
			name3 = titleObj.getTitleName();
			break;
		
		
		case "relay":
			name1 = document.all("location_name").innerHTML;
			name2 = document.all("relay_name").innerHTML;
			name3 = titleObj.getName();
			break;
	}
	
	var titleName = name1 + saparateText + name2 + saparateText + name3;
	document.all("debug_title").innerHTML = titleName;
}
