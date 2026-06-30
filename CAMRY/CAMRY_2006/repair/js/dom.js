/* $Id: dom.js,v 1.16 2004/09/29 06:50:36 k-narumi Exp $ */
//===========================================================================
// DOM操作JavaScript
//
// xml.jsが必要
//
// for Translation
//   000 Your Select:
//   001 SST
//===========================================================================

//===========================================================================
// 車種情報を取得する。
//
// filter: フィルタ情報
//===========================================================================
var CAR_TYPE_PREFIX = "Your select: "; // 000
var DELIM           = " / ";
function getCarType(filter) {
	var objXml = null;
	if (filter==null) {
		objXml = initXml("pub.xml");
		return getCarTypeFromPub(objXml);
	} else {
		objXml = initXml("../../filter/"+filter.toLowerCase()+".xml", true, true);
		return getCarTypeFromFilter(objXml);
	}
}
// private member
function getCarTypeFromPub(objXml) {
	if (objXml==null) return "";
	objXml.setProperty("SelectionLanguage", "XPath");
	var modelName = objXml.selectSingleNode("//model-name").nodeTypedValue;
	return CAR_TYPE_PREFIX + modelName;
}
// private member
function getCarTypeFromFilter(objXml) {
	var pubXml = initXml("pub.xml");
	if (objXml==null) return getCarTypeFromPub(pubXml);

	objXml.setProperty("SelectionLanguage", "XPath");
	var filterInfo = objXml.selectSingleNode("//filter");
	if (filterInfo==null) return null;
	var tmpName = filterInfo.selectSingleNode("model-name");
	if (tmpName==null) return getCarTypeFromPub(pubXml);

	var carType = new Array();
	var tmpYear = filterInfo.selectSingleNode("model-year");
	var tmpCode = filterInfo.selectSingleNode("model-code");
	var tmpEng  = filterInfo.selectSingleNode("engine");
	var tmpBody = filterInfo.selectSingleNode("body-type")
	if (tmpYear!=null) {
		carType = CAR_TYPE_PREFIX + tmpYear.nodeTypedValue;
		carType += DELIM + tmpName.nodeTypedValue;
	} else {
		carType = CAR_TYPE_PREFIX + tmpName.nodeTypedValue;
	}
	carType += (tmpCode) ? DELIM + tmpCode.nodeTypedValue : "";
	carType += (tmpEng) ? DELIM + tmpEng.nodeTypedValue : "";
	carType += (tmpBody) ? DELIM + tmpBody.nodeTypedValue : "";
	return carType;
}

//===========================================================================
// パラグラフIDから親サービスカテゴリ名称を取得する
//
// arg0: パラグラフID
// arg1: 取得元オブジェクト(またはファイル名)     省略時: パラグラフID.xml
//===========================================================================
function getGroupName() {
	if(arguments==null) return "";

	var paraId = arguments[0];
	var objXml = null;
	if (arguments[1]==null || typeof(arguments[1])=="string") {
		var fileName = (arguments[1]==null)?arguments[0].toLowerCase()+".xml":arguments[1].toLowerCase();
		objXml = initXml(fileName);
	} else {
		objXml = arguments[1]
	}
	if (objXml==null) return "";

	objXml.setProperty("SelectionLanguage", "XPath");
	var sec = objXml.selectSingleNode("//section[descendant::para[@id='"+ paraId +"']]");
	var sct = objXml.selectSingleNode("//servcat[descendant::para[@id='"+ paraId +"']]");
	var dispName = sct.getElementsByTagName("name").item(0).nodeTypedValue;
	if (isNaN(sct.getAttribute("id").substring(0,1))){
		dispName = sec.getElementsByTagName("name").item(0).nodeTypedValue;
	}
	return dispName;
}

//===========================================================================
// パラグラフから親セクションの名称を取得する
//
// arg0: パラグラフID
// arg1: 取得元オブジェクト(またはファイル名)         省略時: パラグラフID.xml
//===========================================================================
function getSectionName() {
	if(arguments==null) return "";

	var paraId = arguments[0];
	var objXml = null;
	if (arguments[1]==null || typeof(arguments[1])=="string") {
		var fileName = (arguments[1]==null) ? arguments[0].toLowerCase()+".xml" : arguments[1].toLowerCase();
		objXml = initXml(fileName);
	} else {
		objXml = arguments[1];
	}
	if (objXml==null) return "";

	objXml.setProperty("SelectionLanguage", "XPath");
	var sec = objXml.selectSingleNode("//section[descendant::para[@id='"+ paraId +"']]");
	if (sec==null) return "";
	var secName = sec.getElementsByTagName("name").item(0).nodeTypedValue;
	if (secName==null) return;

	return secName;
}

//===========================================================================
// パラグラフIDから親タイトルの名称を取得する
//
// arg0: パラグラフID
// arg1: 取得元オブジェクト(またはファイル名)         省略時: パラグラフID.xml
//===========================================================================
function getTitleName() {
	if(arguments==null) return "";

	var paraId = arguments[0];
	var objXml = null;
	if (arguments[1]==null || typeof(arguments[1])=="string") {
		var fileName = (arguments[1]==null) ? arguments[0].toLowerCase()+".xml" : arguments[1].toLowerCase();
		objXml = initXml(fileName);
	} else {
		objXml = arguments[1];
	}
	if (objXml==null) return "";

	objXml.setProperty("SelectionLanguage", "XPath");
	var ttl = objXml.selectSingleNode("//ttl[para[@id='"+ paraId +"']]");
	if (ttl==null) return "";
	var ttlName = ttl.getElementsByTagName("name").item(0).nodeTypedValue;
	if (ttlName==null) return "";

	return ttlName;
}

//===========================================================================
// パラグラフ名称を取得し、Arrayで返す
//
// arg0: パラグラフID
// arg1: パラグラフ名要素の名前  省略時: name要素
// arg2: 取得元                  省略時: パラグラフID.xml
//===========================================================================
function getParagraphNameList() {
	if (arguments==null) return null;

	var paraId = arguments[0];
	var objXml = null;
	if (arguments[2]==null || typeof(arguments[2])=="string") {
		var fileName = (arguments[2]==null) ? arguments[0].toLowerCase()+".xml" : arguments[2].toLowerCase();
		objXml = initXml(fileName);
	} else {
		objXml = arguments[2];
	}
	var name = (arguments[1]==null) ? "name" : arguments[1];
	if (objXml==null) return null;

	objXml.setProperty("SelectionLanguage", "XPath");
	var nameObjList = objXml.selectNodes("//para[@id='"+ paraId +"']/"+name);
	if (nameObjList.length==0) return null;
	var nameArray = new Array();
	for (var i=0; i<nameObjList.length; i++) {
		nameArray.push(nameObjList.item(i).nodeTypedValue);
	}
	return nameArray;
}

//===========================================================================
// 部品IDから部品名称を取得する
//
// partsId 部品ID
//===========================================================================
function getPartsName(partsId) {
	var objXml = initXml("parts.xml");
	if (objXml==null) return null;
	var parts  = objXml.selectSingleNode("//parts[@id='"+ partsId +"']/name");
	if(parts==null) return null;
	return parts.nodeTypedValue;
}

//===========================================================================
// 指定パラグラフが指定カテゴリの兄弟パラグラフを持つか調べる
//
// tocXml          文書構成XML
// paraId          調査対象XML(基本XML)
// siblingCategory 兄弟パラグラフのカテゴリ
// return          ある true
//                 ない false
//===========================================================================
function hasSiblingParagraph(tocXml, paraId, siblingCategory) {
	if (arguments==null || arguments.length!=3) return false;
	tocXml.setProperty("SelectionLanguage", "XPath");
	var ttl = tocXml.selectSingleNode("//ttl[para[@id='"+paraId+"']]");
	if (ttl==null)
		return false;
	var para = ttl.selectNodes("para[@category='"+siblingCategory+"']");
	return (para.length>0);
}

//===========================================================================
// 指定されたパラグラフの兄弟パラグラフの要素リストを取得する
//
// tocXml          取得元XML          
// paraId          取得元ID(パラ, サブパラ)
// siblingCategory 兄弟パラグラフのカテゴリ
//==========================================================================
function getSiblingList(paraId, tocXml, siblingCategory) {
	if (arguments==null || arguments.length!=3) return null;
	tocXml.setProperty("SelectionLanguage", "XPath");
	var ttl = tocXml.selectSingleNode("//ttl[para[@id='"+paraId+"']]");
	if (ttl==null) return null;
	var sibs = ttl.selectNodes("child::para[@category='"+siblingCategory+"' and @id!='"+paraId+"']");
	return sibs;
}

//===========================================================================
// 指定パラグラフに対応する準備品のXMLオブジェクトのArrayを返す
//
// objXml   パラグラフXMLインスタンス
// tocXml   文書構成XMLインスタンス
//===========================================================================
var SST_PARANAME = "SST";	// 001
var sctPprList = null;
function getPreparationArray(objXml, tocXml) {
	if (objXml==null || tocXml==null) return null;
	objXml.setProperty("SelectionLanguage", "XPath");
	tocXml.setProperty("SelectionLanguage", "XPath");
	var paraId = objXml.selectSingleNode("//para/@id").nodeValue;
	var pprXml = initXml("ppr_"+paraId.toLowerCase()+".xml", false, false);
	if (sctPprList==null) {
		var sctName = objXml.selectSingleNode("//section/name").nodeTypedValue;
		sctPprList = tocXml.selectNodes("//ttl[name=\""+sctName+"\"]/para[@category='B']");
	}
	if(pprXml==null && sctPprList.length==0) return null;

	var retArray = new Array();
	if(pprXml!=null) retArray.push(pprXml);
	for (var i=0; i<sctPprList.length; i++) {
		var pprPara = sctPprList.item(i);
		var paraName = pprPara.selectSingleNode("name").nodeTypedValue;
		if (paraName==SST_PARANAME) continue;
		var paraId = pprPara.selectSingleNode("@id").nodeValue;
		var para = initXml(paraId.toLowerCase()+".xml", false, false);
		if (para==null) continue;
		retArray.push(para);
	}
	return (retArray.length==0) ? null : retArray;
}

//===========================================================================
// 指定パラグラフに対応するTipsXMLオブジェクトを返す
//
// objXml   パラグラフXMLインスタンス
//===========================================================================
function getTips(objXml) {
	var tipsXml=null;
	if (objXml==null) return null;

	objXml.setProperty("SelectionLanguage", "XPath");
	var paraId = objXml.selectSingleNode("//para/@id").nodeValue;
	tipsXml = initXml("../../tips/"+paraId.toLowerCase()+".xml", true, false);
	return tipsXml;
}

//===========================================================================
// パラグラフIDからパラグラフに含まれる構成図(部品配置図)イラストIDの
// リストを取得
//
// paraId   パラグラフID
//===========================================================================
function getIllustIdList(paraId) {
	if (paraId==null) return null;
	var fileName = "components.xml";
	var objXml = initXml(fileName);
	var illustNodes = objXml.selectNodes("//para[@id='"+ paraId +"']//illust");
	var illustIds = new Array();
	for (var i=0; i<illustNodes.length; i++) {
		var id = illustNodes.item(i).getAttribute("id");
		illustIds.push(id);
	}
	return illustIds;
}

//===========================================================================
// 絵目次から各要領へ遷移する場合に必要なパラメータを取得する。
//
// bparaId   現在の表示している絵目次のパラグラフID
// illustId  現在の表示している絵目次のイラストID
// termId    適連
// vin       VIN No
// filter    フィルター情報
// ttlId     遷移後に表示されるパラグラフのタイトルID
// tocXmlObj 文書構成XML
//===========================================================================
function getCttLink(bparaId, illustId, termId, vin, filter, ttlId, tocXmlObj) {
	if (tocXmlObj==null) return null;
	var ttlItem = tocXmlObj.selectSingleNode("//ttl[@id='"+ ttlId +"']");
	if (ttlItem == null) return null;
	var secItem = ttlItem.parentNode;
	var idx = findParameterValue("idx", parent.location.search, location.search);
	var lik = "?section="+secItem.getAttribute("id")
					+ "&ttl=" + ttlItem.getAttribute("id")
					+ "&illust=" + illustId
					+ ((termId!=null) ? "&term=" + termId : "")
					+ ((vin!=null) ? "&vin=" + vin : "")
					+ ((filter!=null) ? "&filter=" + filter : "")
					+ ((bparaId!=null) ? "&bp=" + bparaId : "")
					+ ((idx!=null) ? "&bi=" + idx : "");
	return lik;
}