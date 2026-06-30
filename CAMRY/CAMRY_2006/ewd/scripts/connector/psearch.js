/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



function call_runOnLoadProc()
{
	try{
		var sort = getURLParam("parts_sort");
		var search_key = getURLParam("search_key");
		
		if( sort == null ) sort = "name";
		if( sort == "code" ){
			document.all("code_list").checked = true;
		}
		else {
			document.all("name_list").checked = true;
		}
		
		if( search_key != null ){
			document.all("edit").value = search_key;
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_onClickNameListProc()
{
	try{
		parent.showNameList();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_onClickCodeListProc()
{
	try{
		parent.showCodeList();
	}
	catch( e ){
		window.alert(e.description);
	}
}





function call_onClickSearchProc()
{
	try{
		var key = edit.value;
		parent.showListByKey(key);
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_onKeyPressEditProc()
{
	try{
		if( event.keyCode == 13 ){
			call_onClickSearchProc();
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}





function call_onClickShowAll()
{
	try{
		if( document.all("name_list").checked ){
			parent.showNameList();
		}
		else if( document.all("code_list").checked ){
			parent.showCodeList();
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function getNotFoundWord()
{
	return document.all("word_notfound").value;
}
