/* $Id: xml.js,v 1.23 2004/04/26 05:13:48 k-nagasaka Exp $ */
//===========================================================================
// XMLの読み込み、XSLT変換などを行なうJavaScript
//
// util.js, hashtable.jsを共に読み込ませて使用してください。
// for Translation
//  function seePage
//   000 SEEPAGE_NOT_FOUND
//===========================================================================

// 圧縮XMLファイルの拡張子
var GUNZIP_EXT  = ".siasgz";

//===========================================================================
// XMLファイルの相対パスを取得する。
// Tips, filterに対しては使用不可
//
// xmlFile XMLファイル名
//===========================================================================
function getXmlPath(xmlFile) {
	var treg = new RegExp("pub|toc|proc|components|parts|psearch|trouble|txt|link", "g");
	var preg = new RegExp("ppr", "g");
	var lreg = new RegExp("html\/.*\/.*\.html","g");
	var term = getParameterValue("term");
	var path;
	var defaultPath = (location.toString().search(lreg) >= 0) ? "../../" : "../";
	if (xmlFile.search(treg)>=0) {
		if (term==null || term=="") {
			path = defaultPath + "term/";
		} else {
			path = getTermPath(term);
		}
	} else if (xmlFile.search(preg)>=0) {
		path = defaultPath + "preparation/";
	} else {
		path = defaultPath + "contents/";
	}
	return path;
}

//===========================================================================
// 適連ディレクトリへの相対パスを取得する
//
// term 適用連番 6桁の数字 (e.g. 200101)
//===========================================================================
function getTermPath(term) {
	var lreg = new RegExp("html\/.*\/.*\.html","g");
	var defaultPath = (location.toString().search(lreg) >= 0) ? "../../" : "../";
	
	if (term == null || term == "") {
		return defaultPath + "term/";
	} 
	var objXml = new ActiveXObject("Msxml2.DOMDocument");
	objXml.async = false;
	try{objXml.setProperty("ForcedResync", false);}catch(e){/* MSXML3sp2 or lower */}

	if (isHttpProtocol()) {
		objXml.load((defaultPath + "term/pub.xml" + GUNZIP_EXT).toLowerCase());
		if (objXml.parseError.errorCode!=0) {
			GUNZIP_EXT = (GUNZIP_EXT=="") ? ".siasgz" : "";
			objXml.load((defaultPath + "term/pub.xml" + GUNZIP_EXT).toLowerCase());
		}
	} else {
		objXml.load((defaultPath + "term/pub.xml").toLowerCase());
	}
	if (objXml.parseError.errorCode!=0) {
		return defaultPath + "term/";
	}
	var termList = objXml.getElementsByTagName("term");
	var items = new Array();
	for (var i=0; i<termList.length; i++) {
		var date = termList.item(i).getAttribute("date");
		items.push(date);
	}
	items.sort();
	if(items[0]>term) return defaultPath + "term/";
	for (var i=1; i<items.length; i++) {
		if(items[i]>term)  return  defaultPath + items[i-1]+ "/";
	}
	return defaultPath + items[items.length-1]+ "/";
}

//===========================================================================
// XMLファイルインスタンスを作成する。
//
// xmlFile          XMLファイル名
// hasAbsolutePath  XMLファイル名指定にパスが含まれる場合 true
//                  それ以外                              false
// verbose          エラー表示を行なう                    true
//                  エラー表示を行なわない                false
//===========================================================================
function initXml(xmlFile, hasAbsolutePath, verbose) {
	var xmlPath = "";
	if (arguments.length==1 || !hasAbsolutePath) 
		xmlPath = getXmlPath(xmlFile);
	var objXml = new ActiveXObject("Msxml2.DOMDocument");
	objXml.async = false;
	objXml.validateOnParse = false;
	objXml.resolveExternals = false;
//try{objXml.setProperty("ForcedResync", false);}catch(e){/* MSXML3sp2 or lower */}
	if (isHttpProtocol()) {
		objXml.load((xmlPath + xmlFile + GUNZIP_EXT).toLowerCase());
		if (objXml.parseError.errorCode!=0) {
			GUNZIP_EXT = (GUNZIP_EXT=="") ? ".siasgz" : "";
			objXml.load((xmlPath + xmlFile + GUNZIP_EXT).toLowerCase());
		}
	} else {
		objXml.load((xmlPath + xmlFile).toLowerCase());
	}
	if (objXml.parseError.errorCode!=0) {
		var msg = objXml.parseError.reason;
		msg+= " [XML File:"+xmlPath +xmlFile+"]";
		if (arguments.length<3 || verbose) alert(msg);
		return null;
	}
	return objXml;
}

//===========================================================================
// XSLファイルインスタンスを作成する
//
// xslPath XSLファイルのパス
//===========================================================================
function initXsl(xslPath) {
	var objXsl = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
	objXsl.async = false;
	try{objXsl.setProperty("ForcedResync", false);}catch(e){/* MSXML3sp2 or lower */}
	objXsl.load(xslPath.toLowerCase());
	if (objXsl.parseError.errorCode!=0) {
		var msg = objXsl.parseError.reason;
		msg+= " [XSL File:"+xslPath+"]";
		alert(msg);
		return;
	}
	return objXsl;
}

//===========================================================================
// XMLファイルをフィルタリングし、結果をオブジェクトで返す
// 
// objXml フィルタリングを行なうXMLファイルインスタンス
// objXsl フィルタリング用XSLのインスタンス
// filter フィルタリングXML名
//===========================================================================
function setFilter(objXml, objXsl, filter) {
	var fltXml = initXml(filter, true, true);
	if (fltXml==null) return objXml;
	fltXml.setProperty("SelectionLanguage", "XPath");
	var objTemp = new ActiveXObject("Msxml2.XSLTemplate");
	objTemp.stylesheet=objXsl;
	var objProc = objTemp.createProcessor();
	var tmp = new ActiveXObject("MSXML2.DOMDOcument");
	objProc.addParameter("filter", fltXml, "");
	objProc.input = objXml;
	objProc.output = tmp;
	objProc.transform();

	// NOTE: Remove elements which have no child(1.section, 2.servcat)
	// 1. Remove section
	tmp.setProperty("SelectionLanguage", "XPath");
	var secList = tmp.selectNodes("//section[count(child::ttl)<1]");
	for (var i=0; i<secList.length; i++) {
		var sec = secList.item(i);
		var sct = sec.parentNode;
		sct.removeChild(sec);
	}
	// 2. Remove servcat
	var sctList = tmp.selectNodes("//servcat[count(child::section)<1]");
	for (var i=0; i<sctList.length; i++) {
		var sct = sctList.item(i);
		var pub = sct.parentNode;
		pub.removeChild(sct);
	}
	return tmp;
}

//===========================================================================
// XML(ファイルインスタンス、文字列), XSL(ファイルインスタンス)を受け取り
// 指定されたHTML要素に出力します。
//
// tmpXml   XMLファイルインスタンスまたはXML文字列
// objXsl   XSLファイルインスタンス
// objHtml  出力先HTML要素
// args     XSLに渡す引数(Hashtableオブジェクト)
//===========================================================================
function display(tmpXml, objXsl, objHtml, args) {
	if (arguments.length!=4) return;
	var objXml=null;
	if (typeof(tmpXml)=="string") {
		objXml=new ActiveXObject("Msxml2.DOMDocument");
		objXml.async=false;
//		try{objXml.setProperty("ForcedResync", false);}catch(e){/* MSXML3sp2 or lower */}
		objXml.loadXML(tmpXml);
	} else {
		objXml=tmpXml;
	}
	var objTemp = new ActiveXObject("Msxml2.XSLTemplate");
	objTemp.stylesheet=objXsl;
	var objProc = objTemp.createProcessor();
	if (args != null) {
		var keys = args.keys();
		for (var i=0; i<args.size(); i++) {
			var val = args.get(keys[i]);
			objProc.addParameter(keys[i], args.get(keys[i]).toString());
		}
	}
	objProc.input = objXml;
	objProc.transform();
	objHtml.innerHTML=objProc.output;
}

//===========================================================================
// 複数のXML(ファイルインスタンス)を単一XSL(ファイルインスタンス)により
// 指定されたHTML要素に出力します。
//
// objXmlArray XMLファイルインスタンスまたはXML文字列
// objXsl      XSLファイルインスタンス
// objHtml     出力先HTML要素
//===========================================================================
function iterateDisplay(objXmlArray, objXsl, objHtml) {
	if (arguments.length!=3) return;
	var objTemp = new ActiveXObject("Msxml2.XSLTemplate");
	objTemp.stylesheet=objXsl;
	var objProc = objTemp.createProcessor();

	for (var i=0; i<objXmlArray.length; i++) {
		var objXml = objXmlArray[i];
		objProc.input = objXml;
		objProc.transform();
		if (i==0) 
			objHtml.innerHTML=objProc.output;
		else
			objHtml.innerHTML+=objProc.output;
	}
}

//===========================================================================
// seePageオープン準備idの分割、適切なobjXml、objXsl作成
//
// xlink xlink文字列
//===========================================================================
var SEEPAGE_WIDTH  = 650;
var SEEPAGE_OFFSET = 30;
var SEEPAGE_NOT_FOUND = "There is no reference page available." // 000

var g_margin;
function seePage(xlink){
	var objXsl = null;
	var xlinkSub = null;
	var xlinkS1 = null;
	var xlinks = xlink.toLowerCase().split("_");
	var objXml = initXml(xlinks[0]+".xml", false, false);
	if ( objXml == null ) {
		alert(SEEPAGE_NOT_FOUND);
		return;
	}
	if(xlinks[1] != null) {
		xlinkSub = xlinks[0]+"_"+xlinks[1];
		if(xlinks[2] != null) xlinkS1 = xlink;
	}

	var category = objXml.selectSingleNode("//para").getAttribute("category");
	var rmvCate = new RegExp("A|M|N");
	var ispCate = new RegExp("G");
	var trbCate = new RegExp("C|J");
	var genCate = new RegExp("L|F|H|S|T|D|U|V");
	var locCate = new RegExp("K|R");
	if(category.search(rmvCate) >= 0) {
	  objXsl = initXsl("../../xsl/rmv/contents.xsl");
	} else if (category.search(ispCate) >= 0) {
		objXsl = initXsl("../../xsl/isp/contents.xsl");
	} else if (category.search(trbCate) >= 0) {
		objXsl = initXsl("../../xsl/trb/contents.xsl");
	} else if (category.search(genCate) >= 0) {
		objXsl = initXsl("../../xsl/toc/contents.xsl");
	}	else if (category.search(locCate) >= 0) {
		objXsl = initXsl("../../xsl/toc/comp_contents.xsl");
	}

	var args = new Hashtable();
	//path この関数が呼ばされた先のパス
	args.put("xml", objXml);
	args.put("xsl", objXsl);
	if (g_margin==null) {
		g_margin = (screen.width - SEEPAGE_WIDTH) / 2;
	} else if (g_margin + SEEPAGE_WIDTH + SEEPAGE_OFFSET + 10 > screen.width) {
		g_margin = 5;
	}
	args.put("margin", g_margin);

	if (xlinkSub!=null) args.put("sub", xlinkSub);
	if (xlinkS1 != null) args.put("s1", xlinkS1);
	openSeePage(args);
}

//===========================================================================
// 現在のSeepagePOPUPの画面表示位置マージンを取得
//===========================================================================
function getSeePageMargin(){
	return g_margin;
}

//===========================================================================
// 現在のSeepagePOPUPの画面表示位置マージンを設定
//
// mar 現在のマージン
//===========================================================================
function setSeePageMargin(mar){
	g_margin = mar;
}
