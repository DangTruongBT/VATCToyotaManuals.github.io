/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/





function call_runOnLoadProc()
{
	try{
		if(getURLParam("category") == "overall"){
			document.styleSheets(0).href = "../../styles/contents2.css";
		}
		
		showCategoryList();
		
		loadTitleList();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClick()
{
	try{
		selectCategory( window.event.srcElement );
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnMouseOver(){
	try{
		var obj = window.event.srcElement;
		if( obj.className == "menu_active" ) return;
		obj.className = "menu_hover";
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnMouseOut(){
	try{
		var obj = window.event.srcElement;
		if( obj.className == "menu_active" ) return;
		obj.className = "menu";
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickInfo()
{
	try{
		selectInfo( window.event.srcElement );
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickReadMe()
{
	try{
		openReadMeDialog();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnMouseOverInfo(){
	try{
		var obj = window.event.srcElement;
		if( obj.className == "category_active" ) return;
		obj.className = "category_hover";
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnMouseOutInfo(){
	try{
		var obj = window.event.srcElement;
		if( obj.className == "category_active" ) return;
		obj.className = "category";
	}
	catch( e ){
		window.alert(e.description);
	}
}





function showCategoryList()
{

	var xmlDoc = createCategoryXML();
	var xslDoc = loadXML("../../styles/menu/category.xsl");
	document.body.innerHTML = xmlDoc.transformNode(xslDoc);
}



function createCategoryXML()
{
	var xmlDoc = createDOM();
	
	

	var root = xmlDoc.createElement("Category");
	xmlDoc.appendChild(root);
	
	
	

	var elTitle = xmlDoc.createElement("Title");
	if( getURLParam("imode") == null )
		elTitle.text = "index"
	else
		elTitle.text = "ewd"
	root.appendChild(elTitle);
	
	

	var elReadMe = xmlDoc.createElement("ReadMe");
	elReadMe.text = "no";
	if( getURLParam("category") != "overall" ){
		if( existsReadMeHTML() ) elReadMe.text = "yes";
	}
	root.appendChild(elReadMe);
	
	

	var elCategory = xmlDoc.createElement("CategoryInfo");
	root.appendChild(elCategory);
	

	var elSystem = xmlDoc.createElement("System");
	elCategory.appendChild(elSystem);
	var serviceCategory = new ServiceCategory("../../defs/sc.xml");
	var scArray = getExistSCArray();
	var categoryObjArray = serviceCategory.getCategoryArrayByCodeArray( scArray );
	for(var i=0; i < categoryObjArray.length; i++ ){
		var elItem = xmlDoc.createElement("Item");
		elItem.setAttribute("code", categoryObjArray[i].code);
		elItem.text = categoryObjArray[i].name;
		elSystem.appendChild(elItem);
	}
	

	var elRouting = xmlDoc.createElement("Routing");
	elCategory.appendChild(elRouting);
	
	return xmlDoc;
}




function existsReadMeHTML()
{
	var ERR_NOT_FOUND_OBJECT = -2146697210;
	var ERR_NOT_FOUND_SPACE  = -1072896759;
	
	var xmlDoc = createDOM();
	xmlDoc.load("../../intro/readme.html");
	if( xmlDoc.parseError.errorCode == ERR_NOT_FOUND_OBJECT )
		return false;
	else
		return true;
}



function getExistSCArray()
{

	var strTitlePath;
	if(getURLParam("category") == "overall"){
		strTitlePath = "../overall/title.xml";
	}
	else{
		strTitlePath = "../system/title.xml";
	}
	
	var titleList = new TitleList(strTitlePath, TITLE_TYPE_SYSTEM, "../system/title-gp.xml");
	titleList.filteringByTerm(getURLParam("term"));
	
	return titleList.getExistScCodeArray();
}





function loadTitleList()
{
	var category = getURLParam("category");
	var sc = getURLParam("sc");
	

	var destObj = document.all(category);
	if( sc != null ){
		destObj = document.all( sc );
	}
	selectCategory( destObj );
}





function selectCategory( obj )
{
	if ( obj == null ) return;
	
	
	resetCategoryStyle();
	setSelectedCategoryStyle( obj );
	
	
	var d_destFrame = parent.d_titlelist;
	if ( d_destFrame == null ) return;
	
	var paramTable = makeParamTable();
	appendRequiredParam(paramTable);
	
	

	var tmpURL = null;
	switch( obj.id ){
		case "system":
		case "overall":

			tmpURL = "system_top.html";
			break;
		
		case "location":
			parent.showLeftFrame(false);
			tmpURL = "location_index.html";
			break;
		
		case "gp":
			parent.showLeftFrame(false);
			tmpURL = "gp_index.html";
			break;

		case "ps":
			parent.showLeftFrame(false);
			tmpURL = "ps_index.html";
			break;

		default:

			tmpURL = "system_index.html";
			paramTable.put("sc", obj.id);
			paramTable.put("category", getURLParam("category"));
			break;
	}
	if( tmpURL != null){
		d_destFrame.window.navigate(tmpURL + makeParamString(paramTable));
	}
}




function selectInfo( obj )
{
	if ( obj == null ) return;
	
	resetCategoryStyle();
	setSelectedInfoStyle( obj );
	
	parent.d_titlelist.window.navigate("../common/index.html");
}




function resetCategoryStyle()
{

	document.all("info").className = "category";
	

	var destObj = document.all("category");
	for(var i=0; i < destObj.all.tags("div").length; i++ ){
		destObj.all.tags("div")(i).className = "menu";
	}
}




function setSelectedCategoryStyle(obj)
{
	obj.className = "menu_active";
}


function setSelectedInfoStyle(obj)
{
	obj.className = "category_active";
}
