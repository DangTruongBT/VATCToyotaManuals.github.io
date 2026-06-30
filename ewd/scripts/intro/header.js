

var g_titleName;

function call_onLoadProc()
{
	initTitleName();
	
	var title = document.all("title");
	title.innerHTML = g_titleName;
}

function initTitleName()
{
	var xmlDoc = loadXML("top.xml");
	
	var elmTitle1 = xmlDoc.getElementsByTagName("title1")(0);
	var elmName = elmTitle1.getElementsByTagName("name")(0);
	
	g_titleName = elmName.text;
}

function updateHTML(name)
{
	var title = document.all("title");
	title.align = "left";
	title.innerHTML = g_titleName + "　＞　" + name;
	
	if( parent.parent.d_selector != null )
		parent.parent.d_selector.showPrintButton( true );
}
