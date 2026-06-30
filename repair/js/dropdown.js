/* $Id: dropdown.js,v 1.13 2004/09/24 10:55:31 k-narumi Exp $ */
//===========================================================================
// ドロップダウンリスト
//
// for Translation
//   000  ITEM_NOT_FOUND
//===========================================================================

var DROPDOWN_WIDTH    = 450;   // ドロップダウンの表示幅
var DROPDOWN_OFFSET_X = 3;     // ドロップダウンの表示位置X方向オフセット
var DROPDOWN_OFFSET_Y = 15;    // ドロップダウンの表示位置Y方向オフセット
var DROPDOWN_DELAY    = 2000;  // ドロップダウンを自動的消去までの時間
var SCROLL_THRESHOLD  = 5;     // スクロールバーを出現個数
var SCROLLBAR_MARGIN  = 16;    // スクロールバーのマージン
var LINE_HEIGHT       = 20;    // 1行の高さ

var g_dropdown        = null;  // ドロップダウンオブジェクト
var g_dtid            = null;  // ドロップダウン消去処理命令ID
var g_dclear          = false; // ドロップダウン消去フラグ
// 適用時期XPath
var g_queryFromTo     = "";
var g_queryFromOnly   = "";
var g_queryToOnly     = "";
var g_queryNone       = "((@from='' or not(@from)) and (@to='' or not(@to)))";

//===========================================================================
// ドロップダウンリストを表示
//
// pos         表示位置
// obj         表示内容
// windowTitle ウィンドウタイトル
//===========================================================================
function createDropDown(pos, obj, windowTitle) {
	innerURLs = obj.getElementsByTagName("a")
	if (innerURLs.length == 0) return;
	if (innerURLs.length < 2) {
	  var url = innerURLs[0];
		selectDropDown(url, windowTitle);
		return;
	}
	var height = LINE_HEIGHT * innerURLs.length + SCROLLBAR_MARGIN;
	if (height > LINE_HEIGHT * SCROLL_THRESHOLD + SCROLLBAR_MARGIN)
		height = LINE_HEIGHT * SCROLL_THRESHOLD + SCROLLBAR_MARGIN;
	g_dropdown = window.createPopup();
	g_dropdown.document.body.onmouseover = clearDropDownDelay;
	g_dropdown.document.body.onmouseout = setDropDownDelay;
	g_dropdown.document.createStyleSheet("../../css/dropdown.css");
	g_dropdown.document.body.style.overflow = "auto";
	g_dropdown.document.body.style.border = "solid 1px #999999";
	g_dropdown.document.body.innerHTML = obj.innerHTML;
	g_dropdown.show(DROPDOWN_OFFSET_X, DROPDOWN_OFFSET_Y, DROPDOWN_WIDTH, height, pos);
	g_dclear = false;
}

//===========================================================================
// ドロップダウンリストを消去する
//===========================================================================
function undispDropDown() {
	if (g_dropdown!=null) g_dropdown.hide();
}

//===========================================================================
// 指定時間後ドロップダウン消去設定を行なう
//===========================================================================
function setDropDownDelay() {
	g_dtid = setTimeout("undispDropDown()", DROPDOWN_DELAY);
	g_dclear = false;
}

//===========================================================================
// ドロップダウン消去設定を解除する
//===========================================================================
function clearDropDownDelay() {
	clearTimeout(g_dtid);
	g_dclear = true;
}

//===========================================================================
// 消去設定
//===========================================================================
function dropDownDelayUndisp() {
	if (!g_dclear) setDropDownDelay();
}

//===========================================================================
// ドロップダウン選択でPOPUP表示
//
// obj          HTMLアンカーオブジェクト(IDは'paraId_subparaId'形式)
// windowTitle  クリックした時に表示されるウィンドウのタイトル
//===========================================================================
var ITEM_NOT_FOUND = "There are no information available." // 000
function selectDropDown(obj, windowTitle) {
	var objId = obj.id;
	var paraId = objId;
	var regOther = new RegExp("ncf|ewd", "g");
	if (paraId.search(regOther)>0) {
		openNewWindow(paraId, "", g_term, g_vin, g_filter);
		return null;
	}
	var ids = objId.split("_");
	paraId = ids[0];
	var subparaId = (ids.length>1) ? ids[0]+"_"+ids[1] : null;

	var objXml = initXml(paraId.toLowerCase()+".xml", false, false);
	if (objXml==null) {
		alert(ITEM_NOT_FOUND);
		return null;
	}
	var objCat = objXml.selectSingleNode("//para/@category").nodeTypedValue;
	var objXsl = (objCat=="C" || objCat=="J") 
						 ? initXsl("../../xsl/trb/help.xsl")
						 : initXsl("../../xsl/toc/contents.xsl")
	var args = new Hashtable();
	args.put("xml", objXml);
	args.put("xsl", objXsl);
	args.put("title", windowTitle);
	setSeePageMargin((screen.width - SEEPAGE_WIDTH) / 2);
	args.put("margin", getSeePageMargin());
	if (subparaId!=null) args.put("subparaId", subparaId);
	setDialogArgs(args);
	openDialog("../etc/notes_frame.html", "nts");
	clearDialogArgs();
}

//===========================================================================
// ドロップダウン表示内容を作成する
//
// itemNodeList   表示対象のノードリスト
// obj            表示場所となるオブジェクト
// windowTitle    ウィンドウタイトル
// htmlFile       呼び出し元のHTMLファイル
//===========================================================================
function createDropDownItem(itemNodeList, obj, windowTitle, htmlFile) {
	var ret = "";
	for (var i=0; i<itemNodeList.length; i++) {
		var itemNode = itemNodeList.item(i);
		var itemId = itemNode.getAttribute("id");
		var itemName = itemNode.selectSingleNode("name").nodeTypedValue;
		ret += "<div>";
		ret += "<a id='"+itemId+"' href='#' class='inside' onClick='top."+htmlFile+".selectDropDown(this, \""+windowTitle +"\")'>";
		ret += itemName;
		ret += "</a>";
		ret += "</div>";
	}
	obj.innerHTML=ret;
}

//===========================================================================
// EWD, NCFのドロップダウンリストを作成する
//
// objXml     配線図、解説書XML
// obj        ドロップダウンリストの内容を作成するHTMLオブジェクト
// titleName  システム名(修理書: タイトル名)
// type       コンテンツのタイプ文字列("ewd" or "ncf")
// term       適用時期
//===========================================================================
function createDropDownOther(objXml, obj, titleName, type, term) {
	if (objXml==null || titleName==null || titleName.length==0) return;
	createTermXPath(term);
	if (g_queryFromTo.length==0) return;
	objXml.setProperty("SelectionLanguage", "XPath");
	var urlNodes = new Array();
	urlNodes_tmp = objXml.selectNodes("//para["+g_queryFromTo+" or "+g_queryFromOnly+" or "+g_queryToOnly+" or "+g_queryNone+"]");
	for (var i=urlNodes_tmp.length-1; i>=0; i--) {
		var nodePara = urlNodes_tmp.item(i);
		listSysName = nodePara.getElementsByTagName("system-name");
		for (var j=0; j<listSysName.length; j++) {
			var sysName = listSysName.item(j).nodeTypedValue;
			if (titleName==sysName) {
				urlNodes.push(nodePara);
			}
		}
	}
	var ret = "";
	var length= urlNodes.length;
	for (var i=0; i<length; i++) {
		var itemNode = urlNodes.pop();
		var itemName = "";
		var itemUrl  = "../../../"+type+"/";
		if (itemNode.selectSingleNode("name")!=null) {
			itemName = itemNode.selectSingleNode("name").nodeTypedValue;
			itemUrl += itemNode.getAttribute("url");
		} else {
			itemName = itemNode.selectSingleNode("ancestor::section/name").nodeTypedValue;
			itemUrl += itemNode.selectSingleNode("ancestor::section").getAttribute("url");
		}
		ret += "<div>";
		ret += "<a id='"+itemUrl+"' href='#' class='inside' onClick='parent.selectDropDown(this, \"\")'>";
		ret += itemName;
		ret += "</a>";
		ret += "</div>";
	}
	obj.innerHTML=ret;
}

//===========================================================================
// 適用時期用のXPath文字列を作成する(private member)
// 
// term 適用時期
//===========================================================================
function createTermXPath(term) {
	if (term==null) return;
	g_queryFromTo   = "(@from <= "+term+" and "+term+" < @to)";
	g_queryFromOnly = "(@from <= "+term+" and (@to='' or not(@to)))";
	g_queryToOnly   = "((@from='' or not(@from)) and "+term+" < @to)";
}