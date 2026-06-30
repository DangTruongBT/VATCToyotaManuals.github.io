/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/





function ServiceCategory(path)
{

	this.xmlDoc = null;
	

	this.xmlDoc = loadXML( path );
}





function ServiceCategory.prototype.getCategoryArrayByCodeArray( codeArray )
{
	var categoryArray = new Array();
	
	var nodeList = this.xmlDoc.getElementsByTagName("Category");
	for( var i=0; i < nodeList.length; i++ ){
		var code = nodeList(i).getAttribute("code");
		for( var j=0; j < codeArray.length; j++ ){
			if( code == codeArray[j] ){
				var category = new Category();
				category.init(nodeList(i));
				categoryArray[categoryArray.length] = category;
				break;
			}
		}
	}
	
	return categoryArray;
}




function ServiceCategory.prototype.getCategory( code )
{
	if( code == null ) return null;
	
	var categoryObj = null;
	
	var tagName = "Category";
	var nodeList = this.xmlDoc.getElementsByTagName(tagName);
	for( var i=0; i < nodeList.length; i++ ){
		if( nodeList.item(i).getAttribute("code") == code ){
			categoryObj = new Category();
			categoryObj.init(nodeList.item(i));
			break;
		}
	}
	
	return categoryObj;
}













function Category( code, name )
{

	this.code = code;
	this.name = name;
}




function Category.prototype.init( node )
{
	this.code = node.getAttribute("code");
	this.name = node.text;
}
