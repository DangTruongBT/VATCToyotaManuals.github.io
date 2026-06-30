/* $Id: txtsearch.js,v 1.14 2004/04/26 05:13:24 k-nagasaka Exp $ */
//===========================================================================
// 全文検索用JavaScript
//
// for Translation
// function getTitle
//   000 TITLE_DTC
//   001 TITLE_IST
//   002 TITLE_ISP
//   003 TITLE_OTH
//===========================================================================

var g_filter = null;
var g_term   = null;
var g_vin    = null;
var g_key    = null;
var g_catcd  = 0;      // 0:All  1:Diag  2:Install/Removal  3:Inspection  4:Other
var g_rstXml = null;
var g_fltXsl = null;
var g_carType = null;

var g_fstCnt       = 0;
var g_endCnt       = 0;
var MAXDISPNUM_ALL = 10;
var MAXDISPNUM_CAT = 20;
var g_hitDtc = 0;
var g_hitIst = 0;
var g_hitIsp = 0;
var g_hitOth = 0;

//===========================================================================
// 初期化処理
//   locationから各パラメータを取得し、保持する
//
//===========================================================================
function init(){
	g_filter = findParameterValue("filter");
	g_term   = findParameterValue("term");
	g_vin    = findParameterValue("vin");
	var keys = findParameterValue("keytxt");
	g_key    = (keys == null) ? "" : unescape(keys);
	var code = findParameterValue("catcd");
	g_catcd  = (code == null) ? 0 : parseInt(code);

	g_carType = getCarType(g_filter);
	g_fltXsl  = initXsl("../../xsl/utl/filter.xsl");
}

//===========================================================================
// 検索処理
//   内部保持している検索キーで、XMLの検索処理を実行する。
//   結果のXML及びHIT数は内部保持する。
//
//===========================================================================
function search(){
	// キーを分割
	var _crtKeys = g_key.split(" ");
	for(var index = 0; index < _crtKeys.length; index++){
		_crtKeys[index] = insertEscape(_crtKeys[index]);
	}

	// 負荷を計算
	var _cnt = _crtKeys.length;
	_w1 = 1;
	var _base = _cnt + 1;
	_w2 = _base;
	_w3 = _base * _base;
	_w4 = _base * _base * _base;

	var _orgXml = null;
	if( g_key.length == 0){
		_w1 = 0;
		_w2 = 0;
		_w3 = 0;
		_w4 = 0;
	}
	else{
		_orgXml = initXml("txt_search.xml");
	}

	// 空のXMLを作成する
	if( _orgXml == null ){
		var _orgXml = new ActiveXObject("Msxml2.DOMDocument");
		_orgXml.async = false;
		_orgXml.resolveExternals = false;
		_orgXml.loadXML("<pub/>");
	}
	_orgXml.setProperty("SelectionLanguage", "XPath");

	// Search
	for(var i = 0 ; i < _cnt; i++){
		if( _crtKeys[i] != null && _crtKeys[i].length != 0 ){
			_orgXml = getWordContains(_crtKeys[i], _orgXml, _w1, _w2, _w3, _w4);
		}
	}

	// filter をかける 
	//  (注)検索処理の後でかけること！
	if (g_filter != null) {
		_orgXml = setFilter(_orgXml, g_fltXsl, "../../filter/"+g_filter+".xml");
	}

	// 従属paraを展開
	expandDupPara(_orgXml);

	// 結果XMLに変換
	g_rstXml = new ActiveXObject("Msxml2.DOMDocument");
	g_rstXml.async = false;
	g_rstXml.validateOnParse = true;

	var _convXsl = initXsl("../../xsl/txt_srh/convert.xsl");
	if( _convXsl == null ){
		g_rstXml.loadXML("<tmc-service-searc/>");
	}
	else{
		var _objTemp = new ActiveXObject("Msxml2.XSLTemplate");
		_objTemp.stylesheet = _convXsl;
		var _objProc = _objTemp.createProcessor();
		_objProc.input  = _orgXml;
		_objProc.output = g_rstXml;
		_objProc.transform();
	}

	// Hit数をカウント
	recountHitCount(g_rstXml);
}

//===========================================================================
// XML検索処理
//   指定された単語 key で objXml 内を検索し、負荷を計算する。
//   各負荷を objXml 内に追加し、hit しなかった要素を削除した
//   XMLオブジェクトを返す。
//
// key    :  検索キー
// objXml :  XMLオブジェクト
// w1     :  weight1 (srvcat 用)
// w2     :  weight2 (ttl 用)
// w3     :  weight3 (para 用)
// w4     :  weight4 (p 用)
//
// return : 検索結果を反映したXMLオブジェクト
//===========================================================================
function getWordContains( key, objXml, w1, w2, w3, w4 ){

	var _pubNode   = objXml.selectSingleNode("//pub");
	var _firstList = _pubNode.selectNodes("servcat");

	for(var i = 0; i < _firstList.length; i++){
		var _node1   = _firstList.item(i);
		var _name1   = _node1.getAttribute("t");
		var _weight1 = (isContainWord(key, _name1)) ? w1 : 0 ;

		var _secList = _node1.selectNodes("section/ttl");
		if( _secList.length == 0 ) continue;

		for(var j = 0; j < _secList.length; j++){
			var _node2   = _secList.item(j);
			var _name2   = _node2.getAttribute("t");
			var _weight2 = (isContainWord(key, _name2)) ? (_weight1 + w2) : _weight1 ;

			var _thirdList = _node2.selectNodes("para");
			if( _thirdList.length == 0 ) continue;

			for(var k = 0; k < _thirdList.length; k++){
				var _node3   = _thirdList.item(k);

				var _name3NodeList = _node3.selectNodes("name");
				var _weight3 = new Array(_name3NodeList.length);

				for(var k2 = 0; k2 < _name3NodeList.length; k2++){
					var _name3Node = _name3NodeList.item(k2);
					var _name3   = (_name3Node == null) ? "" : _name3Node.text;
					_weight3[k2] = (isContainWord(key, _name3)) ? (_weight2 + w3) : _weight2 ;
				}

				var _fourthList = _node3.selectNodes("p");
				if( _fourthList.length == 0 ) continue;
				for(var l = 0; l < _fourthList.length; l++){
					var _node4  = _fourthList.item(l);
					var _name4   = _node4.getAttribute("t");
					var _weight4 = new Array(_weight3.length);

					var _crtw4 = 0;
					if( isContainWord(key, _name4) ){
						_crtw4 = w4;
					}
					for(var l2 = 0; l2 < _weight3.length; l2++){
						_weight4[l2] = _weight3[l2] + _crtw4;
					}

					var _weight = 0;
					var _wtext  = "";
					var _wattr = _node4.getAttribute("w");
					var _curw = ( _wattr == null ) ? (new Array(0)) : _wattr.split(",");

					for(var l3 = 0; l3 < _weight4.length; l3++){
						_weight = _weight + _weight4[l3];
						if( _curw[l3] == null || _weight4[l3] == 0 ) _wint = _weight4[l3];
						else{
							var _curint = parseInt(_curw[l3]);
							_wint = ( _curint == 0 ) ? 0 : (_weight4[l3] + _curint);
						}

						_wtext += "" + _wint;
						if(l3 != (_weight4.length - 1) ){
							_wtext += ",";
						}
					}

					if(_weight == 0){
						_node3.removeChild(_node4);
					}
					else{
						_node4.setAttribute("w") = _wtext;
					}
				}

				// 子Nodeが全て消えていたら、削除する
				if( _node3.selectNodes("p").length == 0 ){
					_node2.removeChild(_node3);
				}
			}

			// 子Nodeが全て消えていたら、削除する
			if( _node2.selectNodes("para").length == 0 ){
				var _parentNode2 = _node2.parentNode;
				_parentNode2.removeChild(_node2);
			}
		}

		// 子Nodeが全て消えていたら、削除する
		if( _node1.selectNodes("section/ttl").length == 0 ){
			_pubNode.removeChild(_node1);
		}
	}
	return objXml;
}

//===========================================================================
// 従属 para 名称を持つ para 要素を、名称を１つずつ保持するように
// 展開して返す。
//
// objXml : XMLオブジェクト
//
// return : 展開結果を反映したXMLオブジェクト
//===========================================================================
function expandDupPara( objXml ){
	// para の Name が複数ある場合、para 配下を複製する
	var _paraList = objXml.selectNodes("//pub/servcat/section/ttl/para");

	for(var ip = 0; ip < _paraList.length; ip++){
		var _para = _paraList.item(ip);
		var _nameList = _para.selectNodes("name");

		if( _nameList.length > 1 ){
			var _ttl = _para.parentNode;
			var _child = _para.selectNodes("p");

			_ttl.removeChild(_para);
			for(var is = 0; is < _nameList.length; is++){
				var _newPara = _para.cloneNode(false);

				for(var ina = 0; ina < _child.length; ina++){
					var _crtw = _child.item(ina).getAttribute("w").split(",");
					if( parseInt(_crtw[is]) != 0 ){
						var _newProc = _child.item(ina).cloneNode(true);
						_newProc.setAttribute("w", _crtw[is]);
						_newPara.appendChild(_newProc);
					}
				}

				if( _newPara.selectNodes("p").length != 0 ){
					_newPara.appendChild(_nameList.item(is));
					_ttl.appendChild(_newPara);
				}
			}
		}
	}

	return objXml;
}

//===========================================================================
// searchStr 内に keyword を含むかどうか判定する。
// この際、keyword は、単語ごとに前方一致で判定を行う。
//
// keyword   : 検索キー
// searchStr : 検索対象文字列
//
// return : true = keywordを含む / false = keywordを含まない
//===========================================================================
function isContainWord( keyword, searchStr ) {
	var _sk = "\\b" + keyword;
	var _regEx = new RegExp(_sk, "i");
	return _regEx.test(searchStr);
}

//===========================================================================
// rstXml から検索結果のHIT数をカウントし、内部保持する。
//
// rstXml   : 検索結果XMLオブジェクト
//===========================================================================
function recountHitCount( rstXml ){
	var _itemNode = rstXml.selectNodes("//hititem[@category='C' or @category='J']");
	g_hitDtc = _itemNode.length;

	_itemNode = g_rstXml.selectNodes("//hititem[@category='A']");
	g_hitIst  = _itemNode.length;

	_itemNode = g_rstXml.selectNodes("//hititem[@category='G']");
	g_hitIsp  = _itemNode.length;

	_itemNode = g_rstXml.selectNodes("//hititem[@category='F' or @category='L' or @category='K' or @category='H' or @category='M' or @category='N' or @category='R' or @category='S' or @category='T' or @category='D' or @category='U' or @category='V']");
	g_hitOth  = _itemNode.length;
}

//===========================================================================
// 内部保持している検索結果から、内部保持している選択カテゴリ(g_catcd)に
// 合わせた検索結果表示用のHTML文書を作成し、返す。
//
// return : 検索結果HTML
//===========================================================================
function getResultHtml(){
	if( g_catcd == 0 ){
		return getDispRetHTMLForAll();
	}
	else{
		return getDispRetHTML(g_catcd, true);
	}
}

//===========================================================================
// 内部保持している検索結果から、All カテゴリ用のHTML文書を作成し、返す。
//
// return : 検索結果HTML (All カテゴリ用)
//===========================================================================
function getDispRetHTMLForAll(){
	var _objTemp2 = new ActiveXObject("Msxml2.XSLTemplate");
	var _dispXsl  = initXsl("../../xsl/txt_srh/contentsall.xsl");
	if( _dispXsl == null ){
		return "";
	}

	_objTemp2.stylesheet = _dispXsl;
	_objProc = _objTemp2.createProcessor();
	_objProc.input = g_rstXml;
	_objProc.addParameter("title_dtc", getTitle(1)); // title text
	_objProc.addParameter("title_ist", getTitle(2)); // title text
	_objProc.addParameter("title_isp", getTitle(3)); // title text
	_objProc.addParameter("title_oth", getTitle(4)); // title text
	_objProc.addParameter("ecnt_dtc", (g_hitDtc > MAXDISPNUM_ALL) ? MAXDISPNUM_ALL : g_hitDtc); // end count
	_objProc.addParameter("ecnt_ist", (g_hitIst > MAXDISPNUM_ALL) ? MAXDISPNUM_ALL : g_hitIst); // end count
	_objProc.addParameter("ecnt_isp", (g_hitIsp > MAXDISPNUM_ALL) ? MAXDISPNUM_ALL : g_hitIsp); // end count
	_objProc.addParameter("ecnt_oth", (g_hitOth > MAXDISPNUM_ALL) ? MAXDISPNUM_ALL : g_hitOth); // end count
	_objProc.addParameter("count_dtc", g_hitDtc); // hit count
	_objProc.addParameter("count_ist", g_hitIst); // hit count
	_objProc.addParameter("count_isp", g_hitIsp); // hit count
	_objProc.addParameter("count_oth", g_hitOth); // hit count

	_objProc.transform();
	return _objProc.output;
}

//===========================================================================
// 内部保持している検索結果から、All 以外のカテゴリ用のHTML文書を作成し、
// 返す。
//
// catcd  : カテゴリ種別
// nplink : true  = [Next],{Prev] リンクを必要であれば表示
//          false = [Next],{Prev] リンクを非表示
//
// return : 検索結果HTML (All 以外のカテゴリ用)
//===========================================================================
function getDispRetHTML( catcd, nplink ){
	var _objTemp2 = new ActiveXObject("Msxml2.XSLTemplate");
	var _dispXsl = initXsl("../../xsl/txt_srh/contentscat.xsl");
	if( _dispXsl == null ){
		return "";
	}
	_objTemp2.stylesheet = _dispXsl;
	_objProc = _objTemp2.createProcessor();
	_objProc.input = g_rstXml;

	_objProc.addParameter("title", getTitle(catcd)); // title text
	_objProc.addParameter("fcnt", g_fstCnt); // first count
	_objProc.addParameter("ecnt", g_endCnt); // end count
	_objProc.addParameter("tcat", catcd); // Tab Code
	_objProc.addParameter("count", getHitCount(catcd)); // hit count
	_objProc.addParameter("nplink", nplink); // Is Display [Next & Prev] Link
	_objProc.transform();
	return _objProc.output;
}

//===========================================================================
// 検索結果の表示に使用する、カテゴリのタイトルを返す。
//
// catcd  : カテゴリ種別
//
// return : カテゴリのタイトル
//===========================================================================
var TITLE_DTC = "Diagnostics Category Matches";            // 000
var TITLE_IST = "Installation / Removal Category Matches"; // 001
var TITLE_ISP = "Inspection Category Matches";             // 002
var TITLE_OTH = "Other Category Matches";                  // 003

function getTitle( catcd ){
	var _ret = "";
	if(      catcd == 1 ){ _ret = TITLE_DTC; }
	else if( catcd == 2 ){ _ret = TITLE_IST; }
	else if( catcd == 3 ){ _ret = TITLE_ISP; }
	else if( catcd == 4 ){ _ret = TITLE_OTH; }
	return _ret;
}

//===========================================================================
// カテゴリ種別を更新する。
//
// newcatcd  : 新しいカテゴリ種別
//===========================================================================
function setCatCode( newcatcd ){
	g_catcd = newcatcd;
}

//===========================================================================
// 表示する First Count(g_fstCnt)と、End Count(g_endCnt) を初期化する。
//
//===========================================================================
function resetDispCount(){
	g_fstCnt = 0;
	g_endCnt = 0;
	changeDispCount(true);
}

//===========================================================================
// 表示する First Count(g_fstCnt)と、End Count(g_endCnt) を
// Next または、Prev 方向に変更する。
//
// next : true = next方向  false = previous方向
//===========================================================================
function changeDispCount( next ){
	var _cnt    = getHitCount( g_catcd );
	var _maxcnt = ( g_catcd == 0 ) ? MAXDISPNUM_ALL : MAXDISPNUM_CAT;

	if( _cnt == 0 ) {
		g_fstCnt = 0;
		g_endCnt = 0;
		return;
	}

	if( next ){
		g_fstCnt = g_endCnt + 1;
		g_endCnt = ((_cnt-g_endCnt) > _maxcnt) ? (g_endCnt + _maxcnt) : _cnt;
	}
	else{
		g_fstCnt = g_fstCnt - _maxcnt;
		g_endCnt = g_fstCnt + _maxcnt - 1 ;
	}
}

//===========================================================================
// 指定されたカテゴリのHIT数を返す。
//
// catcd : カテゴリ種別
//===========================================================================
function getHitCount( catcd ){
	if(      catcd == 1 )	return g_hitDtc;
	else if( catcd == 2 )	return g_hitIst;
	else if( catcd == 3 )	return g_hitIsp;
	else if( catcd == 4 )	return g_hitOth;
	else                   	return 0;
}

//===========================================================================
// 再検索を実行する場合の location を作成し、返す。
//
// key : 検索キー
//
// return : 再検索時のlocation
//===========================================================================
function getReSearchLocation( key ){
	var _del = new RegExp(" *|");
	key  = key.replace(_del, "");
	_del = new RegExp(" *$");
	key  = key.replace(_del, "");

	var _reKey = escape(key);
	var _param = getDefaultParameter(g_term, g_vin, g_filter);

	var _contains = (_param == "") ? false : true;
	if( _reKey != "" ) {
		_param += "" + ((_contains) ? "&" : "?") + "keytxt=" + _reKey;
		_contains = true;
	}
	_param += "" + ((_contains) ? "&" : "?") + "catcd=" + g_catcd;

	return _param;
}

//===========================================================================
// 正規表現に使用される文字の直前にエスケープ記号を挿入する
//
// str : エスケープ記号を挿入したい文字列
//
// return : エスケープ記号挿入後の文字列
//===========================================================================
function insertEscape( str ){
	if( str == null ) return null;
	var _ret = "";
	for(var index = 0; index < str.length; index++){
		var _ch = str.charAt(index);
		if( _ch == '!' || _ch == '$' || _ch == '(' || _ch == ')'
		 || _ch == '=' || _ch == '^' || _ch == '|' || _ch == '\\'
		 || _ch == '[' || _ch == ']' || _ch == '{' || _ch == '}'
		 || _ch == ':' || _ch == '*' || _ch == ';' || _ch == '+'
		 || _ch == '?' || _ch == '/' || _ch == '.' || _ch == ','
		 || _ch == '-'
		) {
			_ret = _ret.concat("\\");
		}
		_ret = _ret.concat(_ch);
	}
	return _ret;
}
