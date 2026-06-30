/* $Id: util.js,v 1.43 2005/08/26 01:25:40 k-narumi Exp $ */
//===========================================================================
// 雑多なJavaScript
//
// for Translation
// function checkIEVersion
//   000 BROWSER_ERROR(variable)
//   001 VERSION_ERROR(variable)
// function checkSvgViewer
//   100 SVG_ERROR(variable)
// function openPreparationItems
//   200 PREPARATION_ITEMS_ERROR
// function openTips
//   300 TIPS_ERROR
// function openPartsLocation
//   400 PARTS_LOCATION_ERROR
// function getFormatDate
//   500 MONTH
// function checkWordLength
//   046 INPUTWORD_ERROR
// function convSeepage
//   600 REFERENCE_PAGE_CHARACTER
//   601 REPLACE_REFERENCE_PAGE_CHARACTER
//===========================================================================

//===========================================================================
// URL文字列内から指定されたパラメータを探す。複数ヒット時には1番目を返す
//
// arg0      パラメータ名
// arg[1..n] パラメータを含むURL文字列
//===========================================================================
function findParameterValue() {
	if (arguments.length>0 && arguments.length<2) {
		return getParameterValue(arguments[0]);
	} else {
		var key = arguments[0];
		var paramList = null;
		for(var i = 1; i<arguments.length; i++){
			paramList = arguments[i];
			var ret = getParameterValue(key , paramList);
			if( ret != null ) return ret;
		}
	} 
	return null;
}

//===========================================================================
// 指定されたパラメータの値を取得する。
//
// arg0 パラメータ名
// arg1 パラメータを含むURL文字列
//===========================================================================
function getParameterValue() {
	var key=null;
	var paramList = null;
	if (arguments.length <= 0) {
		return null;
	} else if (arguments.length == 1) {
		paramList = getParameterList();
		key = arguments[0];
	} else {
		if (arguments[1] == null) return null;
		paramList = getParameterList(arguments[1]);
		key = arguments[0];
	}
	if (paramList==null) return null;
	for(var i=0; i<paramList.length; i++) {
		var param = paramList[i].split("=");
		if(param[0].match(key)) {
			return param[1];
		}
	}
	return null;
}

//===========================================================================
// URLパラメータにセットされた値をリスト形式で取得する。
// 
// arg0 パラメータを含むURL文字列
//===========================================================================
function getParameterValueList() {
	var str = (arguments.length <= 0) ? location.search : arguments[0];
	var paramList = getParameterList(str);
	var list = new Array();
	for(var i=0; i<paramList.length; i++) {
		var param = paramList[i].split("=");
		list.push(param[1]);
	}
	return list;
}

//===========================================================================
// URLパラメータを "param=val"形式の文字列を含むリストとして取得する。
//
// arg0 パラメータを含むURL文字列
//===========================================================================
function getParameterList() {
	var str;
	if (arguments.length <= 0) {
		str = location.search;
	} else {
		str = arguments[0].toString();
		var n = str.indexOf("?");
		str = str.substring(n,str.length);
	}
	var loc = str.toString().substring(1, str.length);
	var paramList = loc.split("&");
	return paramList;
}

//===========================================================================
// VIN, フィルタ, 適連などの全てのページで必要となるパラメータを作成する。
//
// term   適用時期文字列
// vin    VIN No文字列
// filter filter文字列
//===========================================================================
var DQ = "?";
var DA = "&";
function getDefaultParameter(term, vin, filter) {
	var contains = false;
	var param = "";
	if (term!=null) {
		param += "" + ((contains) ? DA : DQ) + "term=" + term;
		contains = true;
	}
	if (filter!=null) {
		param += "" + ((contains) ? DA : DQ) + "filter=" + filter;
		contains = true;
	}
	if (vin!=null) {
		param += "" + ((contains) ? DA : DQ) + "vin=" + vin;
		contains = true;
	}
	return param;
}

//===========================================================================
// 機能選択画面に遷移する
//
// term   適用時期文字列
// vin    VIN No文字列
// filter filter文字列
//===========================================================================
function openTopPage(term, vin, filter) {
	var param = getDefaultParameter(term, vin, filter);
	parent.location.href = "../index.html" + param;
}

//===========================================================================
// 一つ前の画面に遷移する
//
// term   適用時期文字列
// vin    VIN No文字列
// filter filter文字列
// idx    目次一覧系の画面のディレクトリ名
//        Index -> "toc", Service Specification -> "srv_spc"
//        general -> "mnt"
//===========================================================================
function openBackPage(term, vin, filter, idx) {
	var backpage = "";
	if (idx!=null) backpage = "../"+idx+"/frame.html";
	var param = getDefaultParameter(term, vin, filter);
	var bp = findParameterValue("bp");
	var bi = findParameterValue("bi");
	var paraId = findParameterValue("parag");
	var illustId = findParameterValue("illust");
	var tocTypes = new RegExp("toc|srv_spc|mnt", "g");
	var addParam = ((idx=="toc"||idx=="srv_spc"||idx=="mnt") ? "&idx=" + idx : "")
							 + ((bi!=null) ? "&idx=" + bi : "")
							 + ((bp!=null) ? "&parag=" + bp : "&parag=" + paraId)
							 + ((illustId!=null) ? "&illust=" +illustId : "");
	var tmp = backpage + param + addParam;
	// 全てのパラメータの区切りが'&'の場合対策
	if (tmp.indexOf("?")<0) {
		var strs = tmp.split("&");
		tmp = strs[0];
		for (var i=1; i<strs.length; i++) {
			tmp += (i==1) ? "?"+strs[i] : "&"+strs[i];
		}
	}
	parent.location.href = tmp;
}

//===========================================================================
// ダイアログ生成に関連する引数を設定する
//
// args[] 必要なダイアログ引数の列挙
//===========================================================================
var dialogArgs = new Array();
function setDialogArgs() {
	dialogArgs=arguments;
}

//===========================================================================
// ダイアログ生成に関連する引数の設定を解除する
//===========================================================================
function clearDialogArgs() {
	dialogArgs=new Array();
}

//===========================================================================
// 印刷画面を表示する
//
// objXml        印刷を行なうXML
// objXsl        印刷用XSL
// windowTitle   印刷画面ウィンドウタイトル
// selectable    印刷項目選択可(Installation/Removeのみtrue指定)
//===========================================================================
function openPrintPreview(objXml, objXsl, xslArgs, windowTitle, dialogTitle, selectable) {
	if (objXml==null || objXsl==null) {
		return;
	}
	setDialogArgs(objXml, objXsl, xslArgs, windowTitle, dialogTitle, selectable);
	openDialog("../etc/prt_frame.html", "prt");
	clearDialogArgs();
}

//===========================================================================
// 準備品一覧画面を表示する
// 
// pprXmlList  準備品XMLのリスト
// dialogTitle 表題
//===========================================================================
var PREPARATION_ITEMS_ERROR = "There are no preparation items available."; //200
function openPreparationItems(pprXmlList, dialogTitle) {
	if (pprXmlList==null) {
		alert(PREPARATION_ITEMS_ERROR);
		return;
	}
	setDialogArgs(pprXmlList, dialogTitle);
	openDialog("../etc/ppr_frame.html", "ppr");
	clearDialogArgs();
}

//===========================================================================
// Tips(一覧)画面を表示する
// 
// tipsXml     Tips連携XML
// dialogTitle 表題
//===========================================================================
var TIPS_ERROR = "There are no technical tips available."; // 300
function openTips(tipsXml, dialogTitle) {
	if (tipsXml==null) {
		alert(TIPS_ERROR);
		return;
	}
	var tips = tipsXml.selectNodes("//tips");
	if (tips.length==1) {
		var url = tips.item(0).getAttribute("url");
		openNewWindow(url, "");
		return;
	}
	setDialogArgs(tipsXml, dialogTitle);
	openDialog("../etc/tps_frame.html", "tps");
	clearDialogArgs();
}

//===========================================================================
// 部品配置図画面を表示する
// 
// parts       部品ID
// illust      部品配置図
// dialogTitle 表題
// paraId      パラグラフID
//===========================================================================
var PARTS_LOCATION_ERROR = "There are no illustrations available."; //400
function openPartsLocation(parts, illust, dialogTitle, paraId) {
	if (parts==null || illust==null) {
		alert(PARTS_LOCATION_ERROR);
		return;
	}
	setDialogArgs(parts, illust, dialogTitle, paraId);
	openDialog("../etc/pts_frame.html", "pts");
	clearDialogArgs();
}

//===========================================================================
// ダイアログを生成
//
// arg0 URL
// arg1 type
//===========================================================================
function openDialog() {
	// dialog type definition
	var normal = "dialogWidth=700px; dialogHeight=600px; status=yes; resizable=yes; help=no;";
	var margin = "dialogWidth=700px; dialogHeight=600px; status=yes; resizable=yes; help=no; dialogLeft="+g_margin+";";
	var select = "dialogWidth=700px; dialogHeight=300px; status=yes; resizable=yes; help=no;";
	var note   = "dialogWidth=950px; dialogHeight=650px; status=yes; resizable=yes; help=no;";

	if(arguments.length!=2) return;
	var url  = arguments[0];
	var type = arguments[1];
	switch(type) {
		case "pts": // Parts Location
		case "ppr": // Preparation
		case "tps": // Tips
		case "prt": // Print Preview
			showModalDialog(url, dialogArgs, normal);
			break;
		case "det": // DTC Detail
			var ret=showModalDialog(url, dialogArgs, normal);
			return ret;
		case "sep": // See Page
		case "nts": // Diag Notes
			showModalDialog(url, dialogArgs, margin);
			break;
		case "tls": // Title Selection
		case "dtc": // Title Selection
			var ret=showModalDialog(url, dialogArgs, select);
			return ret;
		case "pdt": // Production Date
			var ret=showModalDialog(url, dialogArgs, select);
			return ret;
		case "nte": // Note Dialog
			var ret=showModalDialog(url, dialogArgs, note);
      return ret;
		default:
	}
	return;
}

//===========================================================================
// 新規ウィンドウを生成
// 指定URLに既にパラメータを設定している場合にはterm, vin, filterはnullと
// してください。
//
// url    URL
// name   ウィンドウタイトル
// term   適用時期
// vin    VIN No.
// filter フィルタ
//===========================================================================
function openNewWindow(url, name, term, vin, filter) {
	if (arguments==null) return;
	name = (name!=null) ? name : "";
	var tmpURL = url.split("?");
	var defParam = getDefaultParameter(term, vin, filter)
	if (defParam.length>0) {
		url = tmpURL[0] + defParam + "&" + tmpURL[1];
	} else {
		url = tmpURL[0] + "?" + tmpURL[1];
	}
	if (tmpURL.length>2) {
		for (var i=2; i<tmpURL.length; i++) {
			url += "&" + tmpURL[i];
		}
	}
	//url += getDefaultParameter(term, vin, filter);

	win = window.open("about:blank", name, "");
	try {
		win.resizeTo(970, 740);
		win.moveTo(30, 12);
		win.focus();
		win.location.href=url;
	} catch (e) {}
	return win;
}

//===========================================================================
// カテゴリタイプにより画面遷移を変更する
//
// arg0 パラId
// arg1 パラカテゴリ  カテゴリ文字の前に'P'をつけた場合POPUP表示する
// arg2 前頁パラId
// arg3 手順ID        全文検索時のみ使用を想定
//===========================================================================
function selectTypedLocation() {
	if (arguments==null || arguments.length<2) return;
	var paraId = arguments[0];
	var bp = arguments[2];
	var s1 = arguments[3];
	var term = findParameterValue("term", location.search, parent.location.search);
	var vin = findParameterValue("vin", location.search, parent.location.search);
	var filter = findParameterValue("filter", location.search, parent.location.search);
	var idx = findParameterValue("idx", location.search, parent.location.search);
	var defParam = ((bp!=null) ? "&bp="+bp : "")
							 + ((term!=null) ? "&term="+term : "")
							 + ((vin!=null) ? "&vin="+vin : "")
							 + ((filter!=null) ? "&filter="+filter : "")
							 + ((idx!=null) ? "&idx="+idx : "")
							 + ((s1!=null) ? "&s1="+s1 : "");
	var ret = null;
	switch(arguments[1]) {
		case "A":
			parent.location.href="../rmv_ctt/frame.html?parag="+paraId+defParam;
			break;
		case "PA":
			ret=openNewWindow("../rmv_ctt/frame.html?parag="+paraId+defParam, "");
			break;
		case "K":
			parent.location.href="../rmv_toc/frame.html?parag="+paraId+defParam;
			break;
		case "PK":
			ret=openNewWindow("../rmv_toc/frame.html?parag="+paraId+defParam, "");
			break;
		case "G":
			parent.location.href="../isp_ctt/frame.html?parag="+paraId+defParam;
			break;
		case "PG":
			ret=openNewWindow("../isp_ctt/frame.html?parag="+paraId+defParam, "");
			break;
		case "R":
			parent.location.href="../isp_toc/frame.html?parag="+paraId+defParam;
			break;
		case "PR":
			ret=openNewWindow("../isp_toc/frame.html?parag="+paraId+defParam, "");
			break;
		case "C":
		case "J":
			parent.location.href="../trb_dag/frame.html?parag="+paraId+defParam;
			break;
		case "PC":
		case "PJ":
			ret=openNewWindow("../trb_dag/frame.html?parag="+paraId+defParam, "");
			break;
		default:
			if (arguments[1].length>1 && arguments[1].charAt(0)=='P')
				ret=openNewWindow("../toc/gen_frame.html?parag="+paraId+defParam, "");
			else
				parent.location.href="../toc/gen_frame.html?parag="+paraId+defParam;
			break;
	}
	return ret;
}

//===========================================================================
// フレームを指定して印刷する
//
// arg0 印刷対象フレーム
//===========================================================================
function framePrint(frameName) {
	var disp = frameName.disp;
	var chgSeepage = false;
	if (disp!= null) {
		// 印刷前の状態を退避
		var orgHtml = disp.innerHTML;
		// 参照ページ部変換
		chgSeepage = convSeepage(disp);
	}
	frameName.focus();
	frameName.print();
	// 印刷前の状態に戻す
	if (disp!= null && chgSeepage) {
		disp.innerHTML = orgHtml;
	}
}

//===========================================================================
// HTTPプロトコルかを判断する
// 
// 戻り値 HTTP     true
//        それ以外 false
//===========================================================================
function isHttpProtocol() {
	return (location.protocol.indexOf("http")==0) ? true : false;
}

//===========================================================================
// ブラウザ判別
//
// 戻り値 IE 5.5 以上 true;
//        それ以外    false;
//===========================================================================
var BROWSER_ERROR = "This system does not support except for Internet Explorer."
                  + "\n"
                  + "Please use Internet Explorer version 5.5 or later." // 000
var VERSION_ERROR = "This system does not support Internet Explorer 5 or lower."
                  + "\n"
                  + "Please use Internet Explorer version 5.5 or later." // 001
function checkIEVersion() {
	// テストを簡単にするために全文字列を小文字に変換
	var agt=navigator.userAgent.toLowerCase();

	// ブラウザバージョン
	var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
	if( !ie ) {
		alert(BROWSER_ERROR);
		return false;
	}
	var m  = agt.indexOf("msie")+4;
	var n  = agt.indexOf(";",m);
	var   iestring  = agt.substring(m,n);
	var IEVersion = parseFloat( iestring ) ;
	if( IEVersion < 5.5 ) {
		alert(VERSION_ERROR);
		return false;
	}
	return true;
}

//===========================================================================
// ActiveXインストール済み判別
//
// 戻り値 インストール済み true;
//        それ以外         false;
//===========================================================================
function checkActiveX(name,msg,verbose) {
	//MSXML　判断
	try {
		var objXml = new ActiveXObject(name);
		if( objXml == null){
			if (arguments.length<3 || verbose) alert(msg);
			return false;
		}
	} catch(e) {
		if (arguments.length<3 || verbose) alert(msg);
		return false;
	}	
	return true;
}

//===========================================================================
// SVG Viewerインストール済み判別
//
// 戻り値 インストール済み true;
//        それ以外         false;
//===========================================================================
var SVG_ERROR = "Please install 'SVG Viewer PlugIn'"; // 100
function checkSvgViewer() {
	try {
		var objSvg = document.all.tags('embed');
		if( objSvg[0].getSVGDocument() == null){
			alert(SVG_ERROR);
			return false;
		}
	} catch(e) {
		alert(SVG_ERROR);
		return false;
	}	
	return true;
}

//===========================================================================
// 年月文字列(MMM, yyyy)をyyyyMM文字列から取得する
//
// yyyyMM yyyyMM形式の年月文字列
//===========================================================================
// 500
var MONTH = new Array("Jan, ", "Feb, ", "Mar, ", "Apr, ", "May, ", "Jun, ", 
                      "Jul, ", "Aug, ", "Sep, ", "Oct, ", "Nov, ", "Dec, ");
function getFormatDate(yyyyMM) {
	var yyyy = yyyyMM.substring(0, 4);
	var MM = yyyyMM.substring(4, 6);
	var ret = MONTH[eval(MM)-1] + (yyyy.toString());
	return ret;
}

//===========================================================================
// SeePageのオープン/xml.js_seePage()から引数渡す 
//
// args: subpara_id&s-1_IdのHashTable
//===========================================================================
function openSeePage(subs1Id){
	setDialogArgs(subs1Id);
	openDialog("../etc/seepage_frame.html", "sep");
	clearDialogArgs();
}

//===========================================================================
// 検索文字列長チェック
//
// 戻り値 1000文字以内     true;
//        それ以外         false;
//===========================================================================
var INPUTWORD_ERROR = "The inputted word is too long.";// 046
function checkWordLength(word) {
	if(word.length >= 1000){
		alert(INPUTWORD_ERROR);
		return false;
	}
	return true;
}

//===========================================================================
// 参照ページ部をセクション<タイトル<パラ(適用時期)に変換する
// initXml使用の為、xml.jsがインポートされていない箇所からの呼び出しは不可
//
// arg0 対象html
//===========================================================================
var REFERENCE_PAGE_CHARACTER = "Click here";// 600
var REPLACE_REFERENCE_PAGE_CHARACTER = "Refer to";// 601
function convSeepage(disp) {
	var chgSeepage = false;
	var refList = disp.getElementsByTagName("a");
	var tocXml = null;
	if (refList.length > 0) {
		tocXml = initXml("toc_rpr.xml");
	}
	for (var i=0; i<refList.length; i++) {
		var ref = refList.item(i);
		// Click hereが含まれる場合
		if (ref.innerText.indexOf(REFERENCE_PAGE_CHARACTER) != -1) {
			chgSeepage = true;
			var onclickStr = ref.getAttribute("onclick").toString();
			var paraId = onclickStr.substring(onclickStr.indexOf("'") + 1, onclickStr.lastIndexOf("'"));
			// パラID取り出し(サブパラ、手順参照用)
			paraId = paraId.substring(0, 15);

			// リンク削除
			ref.setAttribute("onclick", "");
			ref.removeAttribute("href");

			// 文書構成からセクション、タイトル、パラを取得
			var secNode = tocXml.selectSingleNode("//section[ttl[para[@id='"+paraId+"']]]");
			var secName = "";
			var ttlName = "";
			var paraName = "";
			var term = "";
			if (secNode != null) {
				secName = secNode.getElementsByTagName("name").item(0).nodeTypedValue;
				var ttlNode = secNode.selectSingleNode("//ttl[para[@id='"+paraId+"']]");
				ttlName = ttlNode.getElementsByTagName("name").item(0).nodeTypedValue;
				var paraNode = ttlNode.selectSingleNode("//para[@id='"+paraId+"']");
				var nameList = paraNode.getElementsByTagName("name");
				for (var j=0; j<nameList.length; j++) {
					paraName += nameList.item(j).nodeTypedValue;
					if (j != nameList.length - 1) {
						paraName += " / ";
					}
				}
				// 適用時期取得
				var termFrom = paraNode.getAttribute("from");
				var termTo = paraNode.getAttribute("to");
				if (termFrom != null || termTo != null) {
					term += "(";
					if (termFrom != null) {
						term += termFrom;
					}
					term += " - ";
					if (termTo != null) {
						term += termTo;
					}
					term += ")";
				}
			}
			// Click hereを置換
			var delString = new RegExp(REFERENCE_PAGE_CHARACTER, "ig");
			var replaceString = "<span>" + REPLACE_REFERENCE_PAGE_CHARACTER + " </span>";
			if (secNode != null) {
				replaceString += "<span class='printseepage'>" + secName + " > " + ttlName + " > " + paraName + term + "</span>";
			}
			ref.innerHTML = ref.innerHTML.replace(delString, replaceString);
		}
	}
	return chgSeepage;
}
