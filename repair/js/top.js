/* $Id: top.js,v 1.10 2004/01/21 01:26:43 maniwa Exp $ */
//===========================================================================
// 機能選択画面で使用するJavaScript
//===========================================================================

//===========================================================================
// SB一覧のURL、機能選択画面のURLを設定してください。
//
// variable SB_URL         - "Service Bulletain" page URL
// variable SELECT_CAR_URL - "Select Car Type"   page URL
//
// 設定がなければリンクは表示されません。
// e.g.
//   var SB_URL         = "foo/bar.html"; <- "foo/bar.html"へのリンクが出現
//   var SELECT_CAR_URL = "";             <- リンクが現れない
//
// ### 注意 ###
// SB_URLおよびSELECT_CAR_URLは本ファイルから削除またはコメントアウト
// しないでください。
// 使用しない場合には、値を空文字またはnullとしてください。
//===========================================================================
var SB_URL         = "snoop.html?aaaa=bbbb";
var SELECT_CAR_URL = "snoop.html?aaaa=bbbb";

//===========================================================================
// 車種情報をフィルタリングXMLから取得する
// (取得できなければModel Nameのみpub.xmlから取得する。)
//
// pub    パブXML
// flt    フィルタリングXML
// return 車種情報を持ったHashtable
//        (key) year name code body engine channel pubno
//===========================================================================
function getCarInformation(pub, flt) {
	var ret = new Hashtable();
	if (pub==null) return ret;
	pub.setProperty("SelectionLanguage", "XPath");
	if (flt!=null) {
		flt.setProperty("SelectionLanguage", "XPath");
		var yearNode = flt.selectSingleNode("//model-year");
		if (yearNode!=null) ret.put("year", yearNode.nodeTypedValue);
		var nameNode = flt.selectSingleNode("//model-name");
		if (nameNode==null) {
			pub.setProperty("SelectionLanguage", "XPath");
			nameNode = pub.selectSingleNode("//model-name");
		}
		if (nameNode!=null)	ret.put("name", nameNode.nodeTypedValue);
		var codeNode = flt.selectSingleNode("//model-code");
		if (codeNode!=null) ret.put("code", codeNode.nodeTypedValue);
		var bodyNode = flt.selectSingleNode("//body-type");
		if (bodyNode!=null) ret.put("body", bodyNode.nodeTypedValue);
		var engineNode = flt.selectSingleNode("//engine");
		if (engineNode!=null) ret.put("engine", engineNode.nodeTypedValue);
	} else {
		nameNode = pub.selectSingleNode("//model-name");
		if (nameNode!=null)	ret.put("name", nameNode.nodeTypedValue);
	}
	var channel = getChannelCode(pub);
	if (channel!=null) ret.put("channel", channel)
	var nation = getNation(pub);
	if (nation!=null) ret.put("nation", nation);
	var pubNo = getPubNo(pub);
	if (pubNo!=null) ret.put("pubno", pubNo);
	return ret;
}

//===========================================================================
// 適用連番を取得する(Array)
//
// pub   パブXML
// ewd   EWDXML
// NCF   NCFXML
//===========================================================================
function getProductionDates(pub, ewd, ncf) {
	if (pub==null) return null;
	var ret = new Array();
	var dateList = null;
	pub.setProperty("SelectionLanguage", "XPath");
	dateList = pub.selectNodes("//term/@date");
	for (var i=0; i<dateList.length; i++) {
		var date = dateList.item(i);
		ret.push(date.nodeTypedValue);
	}
	if(ewd!=null) {
	 	ewd.setProperty("SelectionLanguage", "XPath");
		dateList = ewd.selectNodes("//term/@date");
		for (var i=0; i<dateList.length; i++) {
			var date = dateList.item(i);
			if(!containsValue(ret, date.nodeTypedValue)) ret.push(date.nodeTypedValue);
		}
	}
	if(ncf!=null) {
		ncf.setProperty("SelectionLanguage", "XPath");
		dateList = ncf.selectNodes("//term/@date");
		for (var i=0; i<dateList.length; i++) {
			var date = dateList.item(i);
			if(!containsValue(ret, date.nodeTypedValue)) ret.push(date.nodeTypedValue);
		}
	}
	ret.sort();
	return (ret.length>0) ? ret : null;
}

// private member
function containsValue(ar, val) {
	var contains = false;
	for (var i=0; i<ar.length; i++) {
		if(ar[i]==val) {
			contains = true;
			break;
		}
	}
	return contains;
}

//===========================================================================
// 適連選択時に選択された日付を保存する
// 
// obj  適連セレクトボックス
//===========================================================================
function setDate(obj) {
	var term = obj.options[obj.selectedIndex].value;
	g_term = term;
}

//===========================================================================
// 各機能画面へ遷移する
//
// url URL
// idx 目次一覧への遷移時のみ使用
//===========================================================================
function openPage(url, idx) {
	var param = "?";
	param += "term=" + g_term;
	if (g_filter!=null) param += "&filter=" + g_filter;
	if (g_vin!=null) param += "&vin=" + g_vin;
	if (idx) param += "&idx=" + idx;
	location.href = url + param;
}

//===========================================================================
// 車種情報からパラメータを作成し、SB画面へ遷移する
//
// info 車種情報を保存しているhashtableオブジェクト
//      getCarInformationを参照
//===========================================================================
function openSB(info) {
	var tmp = SB_URL.split("?");
	if (tmp.length<1 || tmp.length>2) return;
	var url = tmp[0];
	var param = (tmp.length==1) ? "" : ("?"+tmp[1]);
	param += "&modelname=" + info.get("name");
	param += "&channel=" + info.get("channel");
	param += (info.containsKey("code")) ? "&modelcode="+info.get("code") : "";
	param += (info.containsKey("year")) ? "&modelyear="+info.get("year") : "";
	param += (g_term!=null) ? "&term="+g_term : "";
	param += (g_filter!=null) ? "&filter="+g_filter : "";
	param += (g_vin!=null) ? "&vin="+g_vin : "";
	param += (info.containsKey("pubno")) ? "&pub="+info.get("pubno") : "";
	param += (info.containsKey("nation")) ? "&nation="+info.get("nation") : "";
	if (param.indexOf("?")<0) {
		param = "?" + param.substring(1, param.length);
	}
	location.href = url + param;
}

//===========================================================================
// 車種選択画面への遷移
//
// pub パブXMLオブジェクト
//===========================================================================
function openSelectCarType(pub) {
	var tmp = SELECT_CAR_URL.split("?");
	if (tmp.length<1 || tmp.length>2) return;
	var url = tmp[0];
	var param = (tmp.length==1) ? "" : ("?"+tmp[1]);
	var channel = getChannelCode(pub);
	var nation = getNation(pub);
	var param = param + "&channel=" + channel + "&nation=" + nation;
	if (param.indexOf("?")<0) {
		param = "?" + param.substring(1, param.length);
	}
	location.href = url + param;
}

//===========================================================================
// 販売店チャネル情報を取得する
//
// pub パブXMLオブジェクト
//===========================================================================
function getChannelCode(pub) {
	if(pub==null) return null;
	pub.setProperty("SelectionLanguage", "XPath");
	var channelNode = pub.selectSingleNode("//channel");
	return (channelNode!=null) ? channelNode.nodeTypedValue : null;
}

//===========================================================================
// 仕向けコードを取得する
//
// pub パブXMLオブジェクト
//===========================================================================
function getNation(pub) {
	if(pub==null) return null;
	pub.setProperty("SelectionLanguage", "XPath");
	var nationNode = pub.selectSingleNode("//market-code");
	return (nationNode!=null) ? nationNode.nodeTypedValue : null;
}

//===========================================================================
// パブNo.を取得する
//
// pub パブXMLオブジェクト
//===========================================================================
function getPubNo(pub) {
	if(pub==null) return null;
	pub.setProperty("SelectionLanguage", "XPath");
	var pubNoNode = pub.selectSingleNode("//pub/@id");
	return (pubNoNode!=null) ? pubNoNode.nodeTypedValue : null;
}
