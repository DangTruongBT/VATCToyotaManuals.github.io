


function updateHTML(code)
{
	var xmlDoc = loadXML("./" + code + ".xml");
	var xslDoc = loadXML("../styles/intro/html_submenu.xsl");
	
	document.body.innerHTML = xmlDoc.transformNode(xslDoc);
}

function call_onClickItem(name)
{

	var colA = parent.d_contents.document.all.tags("A");
	if( colA != null ){
		for (var i=0; i<colA.length; i++){
			if( colA[i].name == name ){
				colA[i].scrollIntoView();
			}
		}
	}
}
