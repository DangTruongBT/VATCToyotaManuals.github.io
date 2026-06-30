/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/

var XML_SYSTEM  = "../system/title.xml";
var XML_ROUTING = "../routing/title.xml";

var XML_TITLE_GP = "../system/title-gp.xml";
var XML_AREA     = "../../defs/area.xml";

var XML_PS = "ps.xml";
var XML_GP = "gp.xml";

var XSL_PS_CAPACITY = "../../styles/loads/ps_cap.xsl";
var XSL_PS_NAME     = "../../styles/loads/ps_name.xsl";

var XSL_PS_CAPACITY_PRINT = "../../styles/loads/ps_cap_print.xsl";
var XSL_PS_NAME_PRINT     = "../../styles/loads/ps_name_print.xsl";

var XSL_GP          = "../../styles/loads/gp.xsl";

var MODE = "Loads";

var g_bodyHtml4Print = "";



function call_runOnLoadProc()
{
	try{

		if( isPrintDialog() ) {
			document.body.innerHTML = self.dialogArguments[2];
			return;
		}
		
		

		if( parent != self ){
			parent.showGlobalNavi( true );
		}
		
		var loads = getURLParam("loads");
		var sort = getURLParam("loads_sort");
		var targetID = getURLParam("loads_scroll");
		

		if( loads == "gp" ){
			showGpMatrix();
		}
		else if( loads == "ps" ){
			if( sort == "capacity" )
				showPsMatrixOrderByCapacity();
			else if( sort == "name" )
				showPsMatrixOrderByName();
			else 
				showPsMatrixOrderByCapacity();
		}
		
		

		if( document.all(targetID) != null ){
			document.all(targetID).scrollIntoView();
		}
	}
	catch(e){
		window.alert(e.description);
	}
}



function call_runOnClickSystemProc( code, partsCode )
{
	try{

		if( isPrintDialog() ) return;
		
		
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		
		paramTable.put("ewd", code);
		paramTable.put("ewd_type", "system");
		if( partsCode != "" ){
			paramTable.put("code", partsCode)
			paramTable.put("type", "gp")
		}
		
		self.window.navigate("../common/fig_frame.html" + makeParamString(paramTable) );
	}
	catch(e){
		window.alert(e.description);
	}
}


function call_runOnClickRoutingProc( code, partsCode )
{
	try{

		if( isPrintDialog() ) return;
		
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("ewd", code);
		paramTable.put("ewd_type", "routing");
		if( partsCode != "" ){
			paramTable.put("code", partsCode)
			paramTable.put("type", "gp")
		}
		
		self.window.navigate("../common/fig_frame.html" + makeParamString(paramTable) );
	}
	catch(e){
		window.alert(e.description);
	}
}


function call_runOnClickRelayProc( code )
{
	try{

		if( isPrintDialog() ) return;
		
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		if( code.search(/^C:/) == -1 || code.indexOf("+") == -1 ){

			paramTable.put("ewd", code);
			paramTable.put("ewd_type", "relay");
		}
		else{

			var tmpArray = code.split("+");
			paramTable.put("ewd", tmpArray[1]);
			paramTable.put("ewd_type", "routing");
			paramTable.put("code", tmpArray[0].split(":")[1]);
			paramTable.put("type", "conn");
		}
		
		self.window.navigate("../common/fig_frame.html" + makeParamString(paramTable) );
	}
	catch(e){
		window.alert(e.description);
	}
}



function call_runOnMouseOverProc( obj )
{
	try{
		obj.className = "loads_ref_hover";
	}
	catch(e){
		window.alert(e.description);
	}
}


function call_runOnMouseOutProc( obj )
{
	try{
		obj.className = "loads_ref";
	}
	catch(e){
		window.alert(e.description);
	}
}



function call_runOnClickOrder( order )
{
	try{

		if( isPrintDialog() ) return;
		
		
		switch( order ){
			case "capacity":
			showPsMatrixOrderByCapacity();
			break;
			
			case "name":
			showPsMatrixOrderByName();
			break;
		}
	}
	catch(e){
		window.alert(e.description);
	}
}







function getMode()
{
	return MODE;
}



function getPrintBodyHTML()
{
	return g_bodyHtml4Print;
}


function showPsMatrixOrderByCapacity()
{
	var loadsList = new LoadsList( XML_PS );
	var systemTitle = new TitleList( XML_SYSTEM, TITLE_TYPE_SYSTEM, XML_TITLE_GP );
	var term = getURLParam("term");
	
	var xslPath       = XSL_PS_CAPACITY;
	var xslPath4Print = XSL_PS_CAPACITY_PRINT;
	var nOrder        = LOADS_LIST_ORDER_BY_CAPACITY;
	
	loadsList.filtering( systemTitle, term );
	

	g_bodyHtml4Print = loadsList.makeBodyHTML( xslPath4Print, nOrder );
	
	var html = loadsList.makeBodyHTML( xslPath, nOrder );
	document.body.innerHTML = html;
}


function showPsMatrixOrderByName()
{
	var loadsList = new LoadsList( XML_PS );
	var systemTitle = new TitleList( XML_SYSTEM, TITLE_TYPE_SYSTEM, XML_TITLE_GP );
	var term = getURLParam("term");
	
	var xslPath       = XSL_PS_NAME;
	var xslPath4Print = XSL_PS_NAME_PRINT;
	var nOrder        = LOADS_LIST_ORDER_BY_NAME;
	
	loadsList.filtering( systemTitle, term );
	

	g_bodyHtml4Print = loadsList.makeBodyHTML( xslPath4Print, nOrder );
	
	var html = loadsList.makeBodyHTML( xslPath, nOrder );
	document.body.innerHTML = html;
}


function showGpMatrix()
{
	var loadsList = new LoadsList( XML_GP );
	var systemTitle = new TitleList( XML_SYSTEM, TITLE_TYPE_SYSTEM, XML_TITLE_GP );
	var routingTitle = new TitleList( XML_ROUTING, TITLE_TYPE_ROUTING, XML_AREA );
	var term = getURLParam("term");
	
	loadsList.filtering( systemTitle, term );
	loadsList.filtering( routingTitle, term );
	
	var html = loadsList.makeBodyHTML( XSL_GP );
	document.body.innerHTML = html;
}




function isPrintDialog()
{
	if( self.dialogArguments != null ) {
		if( self.dialogArguments[0] == "print" )
			return true;
		else
			return false;
	}
}
