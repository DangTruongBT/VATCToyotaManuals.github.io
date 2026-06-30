/* $Id: svg.js,v 1.7 2004/04/26 05:13:15 k-nagasaka Exp $ */
//===========================================================================
// SVG 操作関連 JavaScript
// for Translation
// function centerItem()
//   000 PARTS_NOT_FOUND_ERROR
//===========================================================================

// Itemテキストの色
var COLOR_DEF_NORM = "#808080";		// デフォルト色（リンクなし）
//var COLOR_DEF_LINK = "#000000";		// デフォルト色（リンクあり）
var COLOR_DEF_LINK = "#0000ff";		// デフォルト色（リンクあり）
var COLOR_OVER     = "#ffa500";		// OnFocus 時の色
var COLOR_SELECT   = "#ff0000";		// 選択時の色
var XCODE_LEN      = 10;			// 部品コードの先頭にXを付けて"_"後の長さ

// SVG画像の縦横比率
var HEIGHT_WIDTH_RATE = 1.35;

// 拡大縮小倍率（長さ比率）
var ZOOM_RATES  = new Array(
			0.50, 0.707, 0.837,
			1,
			1.225, 1.414, 1.732, 2
			);

// 標準倍率のインデックス
var NORM_RATE_INDEX   = 3;

// 現在の倍率インデックス
var g_iCurRateIndex = NORM_RATE_INDEX;

// 現在選択されているItemCodeとそのSVG画像Object. 選択されていない場合は空文字
var g_strCurItemCode = "";
var g_objCurSvgDoc;

// イベントを受け付けるか否か
var g_bAcceptEvent = true;

// SVGデフォルトサイズ（幅）
var g_iOrgSvgWidth;

// SVGデフォルトサイズ（高さ）
var g_aiOrgSvgHeight;

// テキスト色の状態遷移のためのデータ
var g_astrTextCol = new Array();

// 待機メッセージ消去までのポーリング時間
var ONLOAD_POLLING_TIME = 500;


//=============================================================================
//  initSvg  --  SVG画像ウィンドウの初期化関数
//=============================================================================
//【引数】
//    svgWin		: SVG画像が配置されているWindow Object
//【戻り値】
//    なし
//【処理内容】
//    1. フレーム幅を取得し、メンバ変数に保持する。
//    2. 画像サイズを初期化し、画像の高さをメンバ変数に保持する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function initSvg( svgWin )
{
	// フレーム幅を取得し、メンバ変数に保存
	// （仕様:画像は、幅をFitさせたサイズが初期設定となる）
	g_iOrgSvgWidth = svgWin.document.body.clientWidth-10;
	// 画像サイズの初期化
	// 全画像に対して処理を実行
	var _arSvgs = svgWin.document.all.tags('embed');
	// 初期化
	g_aiOrgSvgHeight = new Array(_arSvgs.length);
	for(var i = 0; i < _arSvgs.length; i++)
	{
		var _curSvg  = _arSvgs[i];
		var _elmSvg  = _curSvg.getSVGDocument().rootElement();
		var _viewBox = _elmSvg.getAttribute('viewBox');
		if ( _viewBox == null || _viewBox.length==0 ) return;
		var _arViews = _viewBox.split(/ /);
		var _viewWidth  = _arViews[2];
		var _viewHeight = _arViews[3];
		// 初期画像高さを計算
		var _embedHeight = g_iOrgSvgWidth * _viewHeight / _viewWidth;
		// 初期画像サイズを設定
		_curSvg.width  = g_iOrgSvgWidth;
		_curSvg.height = _embedHeight;
		// 初期画面サイズ(高さ)をメンバ変数に設定
		//      *** _embedHeight は、小数となるので使用しない。
		g_aiOrgSvgHeight[i] = _curSvg.height;
	}
	// リンク先のあるItemのテキスト色を変更
	// ☆☆☆
}

//=============================================================================
//  setIsAcceptEvent  --  SVG画像に対するイベント受付フラグ値の設定関数
//=============================================================================
//【引数】
//    isAccept		: true = 受け付ける / false = 受け付けない
//【戻り値】
//    なし
//【処理内容】
//    1. メンバ変数に値を設定する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function setIsAcceptEvent( isAccept )
{
	g_bAcceptEvent = isAccept;
}

//=============================================================================
//  inFocusItem  --  Itemに対するフォーカスオーバー時の動作関数
//=============================================================================
//【引数】
//    evt	:	Event
//【戻り値】
//    なし
//【処理内容】
//    0. イベント処理が不可に設定されている場合は、すべての処理を行わない。
//    1. 選択された部品名コードを取得する。
//    2. DocumentNodeを取得する。
//    3. フォーカスのあたった部品の配色を変更する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function inFocusItem( evt )
{
	// イベントを受け付けない場合は、ここで終了
	if ( ! g_bAcceptEvent )
		return;
	var _evtNode = evt.getTarget();
	if (_evtNode.nodeName == "tspan")
	{
		// SVGファイルからID("部品名コード")を取得する
		var _itemCode = _evtNode.getParentNode().getAttribute('id');
		if (_itemCode.indexOf("XMLID_")==0) return;
		// Document Node を取得
		var _svgDoc = _evtNode;
		if( _evtNode.getNodeType() != 9 ) // if not Node.DOCUMENT_NODE
			_svgDoc = _evtNode.getOwnerDocument();
		// 色を変更
		var _elem = _svgDoc.getElementById(_itemCode);
		if( _elem != null )
		{
			var _curCol  = _elem.getStyle().getPropertyValue("fill");
			var _nextCol = getNextColOnEvt(_curCol, 0);
			_elem.getStyle().setProperty("fill", _nextCol);
		}
	}
}

//=============================================================================
//  outFocusItem  --  Itemに対するフォーカスアウト時の動作関数
//=============================================================================
//【引数】
//    evt	:	Event
//【戻り値】
//    なし
//【処理内容】
//    0. イベント処理が不可に設定されている場合は、すべての処理を行わない。
//    1. 選択された部品名コードを取得する。
//    2. DocumentNodeを取得する。
//    3. フォーカスの外れた部品の配色を変更する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function outFocusItem( evt )
{
	// イベントを受け付けない場合は、ここで終了
	if ( ! g_bAcceptEvent )
		return;
	var _evtNode = evt.getTarget();
	if (_evtNode.nodeName == "tspan")
	{
		// SVGファイルからID("部品名コード")を取得する
		var _itemCode = _evtNode.getParentNode().getAttribute('id');
		if (_itemCode.indexOf("XMLID_")==0) return;
		// Document Node を取得
		var _svgDoc = _evtNode;
		if( _evtNode.getNodeType() != 9 ) // if not DOCUMENT_NODE
			_svgDoc = _evtNode.getOwnerDocument();
		// 色を変更
		var _elem = _svgDoc.getElementById(_itemCode);
		if( _elem != null )
		{
			var _curCol  = _elem.getStyle().getPropertyValue("fill");
			var _nextCol = getNextColOnEvt(_curCol, 1);
			_elem.getStyle().setProperty("fill", _nextCol);
		}
	}
}

//=============================================================================
//  selectItem  --  Item 選択時の動作関数
//=============================================================================
//【引数】
//    evt	:	Event
//【戻り値】
//    なし
//【処理内容】
//    0. イベント処理が不可に設定されている場合は、すべての処理を行わない。
//    1. 選択された部品名コードを取得する。
//    2. をコールし、要領を表示する。
//    3. 要領が正常に表示された場合のみ以下の処理を実行する。
//        1. DocumentNodeを取得する。
//        2. 前回選択部品の配色を元に戻す。
//        3. 今回選択された部品の配色を変更する。
//        4. メンバ変数を更新し、現在の選択部品情報を保持する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function selectItem( evt )
{
	// イベントを受け付けない場合は、ここで終了
	if ( ! g_bAcceptEvent )
		return;
	var _evtNode = evt.getTarget();
	if (_evtNode.nodeName == "tspan")
	{
		// SVGファイルからID("部品名コード")を取得する
		var _itemCode = _evtNode.getParentNode().getAttribute('id');
		if (_itemCode.indexOf("XMLID_")==0) return;
		// 要領を表示
		var _isShowDetail = true;
		// 要領が登録されている場合
		if ( _isShowDetail == true )
		{
			// Document Node を取得
			var _svgDoc = _evtNode;
			if( _evtNode.getNodeType() != 9 ) // if not DOCUMENT_NODE
				_svgDoc = _evtNode.getOwnerDocument();
			// 前に選択されていた部品がある場合、元の色に変更
			if( g_strCurItemCode != "" )
			{
				var _elemPre = g_objCurSvgDoc.getElementById(g_strCurItemCode);
				if( _elemPre != null )
				{
					var _curCol  = _elemPre.getStyle().getPropertyValue("fill");
					var _nextCol = getNextColOnEvt(_curCol, 3);
					_elemPre.getStyle().setProperty("fill", _nextCol);
				}
			}
			// 選択された部品の色を変更
			var _elem = _svgDoc.getElementById(_itemCode);
			if( _elem != null )
			{
				var _curCol  = _elem.getStyle().getPropertyValue("fill");
				var _nextCol = getNextColOnEvt(_curCol, 2);
				_elem.getStyle().setProperty("fill", _nextCol);
			}
			// メンバ変数を更新し、現在の選択部品情報を保持
			g_strCurItemCode = _itemCode;
			g_objCurSvgDoc   = _svgDoc;
			parent.button.allDisplay();
		}
	}
}

//=============================================================================
//  getNextColOnEvt  --  Itemに対する色の判定
//=============================================================================
//【引数】
//    curColor	:	現在の色
//    actNo		:	Actionコード。値の対応は以下。
//    					0 = Focus IN
//    					1 = Focus OUT
//    					2 = Select
//    					3 = UnSelect
//【戻り値】
//    変更する色
//【処理内容】
//    1. 現在の配色（状態）と、イベントによって、どの配色（状態）に
//       遷移すればよいか判定し、配色を返す。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function getNextColOnEvt( curColor, actNo )
{
	// 初期化
	// 状態遷移のデータを作成
	if (g_astrTextCol.length == 0)
	{
		// メモリを確保。省略不可
		for( var i = 0; i < 4; i++ ) {
			g_astrTextCol[i] = new Array(4);
		}
		// COLOR_DEF_NORM の場合
		g_astrTextCol[0][0] = COLOR_DEF_NORM;
		g_astrTextCol[0][1] = COLOR_DEF_NORM;
		g_astrTextCol[0][2] = COLOR_DEF_NORM;
		g_astrTextCol[0][3] = COLOR_DEF_NORM;
		// COLOR_DEF_LINK の場合
		g_astrTextCol[1][0] = COLOR_OVER;
		g_astrTextCol[1][1] = COLOR_DEF_LINK;
		g_astrTextCol[1][2] = COLOR_SELECT;
		g_astrTextCol[1][3] = COLOR_DEF_LINK;
		// COLOR_OVER の場合
		g_astrTextCol[2][0] = COLOR_OVER;
		g_astrTextCol[2][1] = COLOR_DEF_LINK;
		g_astrTextCol[2][2] = COLOR_SELECT;
		g_astrTextCol[2][3] = COLOR_OVER;
		// COLOR_SELECT の場合
		g_astrTextCol[3][0] = COLOR_SELECT;
		g_astrTextCol[3][1] = COLOR_SELECT;
		g_astrTextCol[3][2] = COLOR_SELECT;
		g_astrTextCol[3][3] = COLOR_DEF_LINK;
	}
	// 現在の色を数値に変換
	var _iColNo = 1;
	if( curColor != null )
	{
		if(      curColor == COLOR_DEF_NORM )  _iColNo = 0;
		else if( curColor == COLOR_DEF_LINK )  _iColNo = 1;
		else if( curColor == COLOR_OVER     )  _iColNo = 2;
		else if( curColor == COLOR_SELECT   )  _iColNo = 3;
	}
	// 変更後の色を取得
	var _nextColor = g_astrTextCol[ _iColNo ][ actNo ];
	return _nextColor;
}

//=============================================================================
//  forceChangeTxtCol  --  部品コードの色を変更する
//=============================================================================
//【引数】
//    itemCode	:	色を変更したい部品名コード
//    svgObj	:	部品の記述されているSVG画像オブジェクト
//    nextColor	:	変更したい色
//【戻り値】
//    なし
//【処理内容】
//    1. 該当する部品のテキスト色を変更する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function forceChangeTxtCol( itemCode, svgObj, nextColor )
{
	//SVG用部品IDを変換
	itemCodes = getSVGPartID(itemCode);
	for(var i=0;i<itemCodes.length;i++){
		var _elem = svgObj.getSVGDocument().getElementById( itemCodes[i] );
		if (_elem != null)
		{
			_elem.getStyle().setProperty("fill", nextColor);
		}
	}
}

//=============================================================================
//  forceChangeAllTxtCol  --  部品コードの色を変更する
//=============================================================================
//【引数】
//    svgObj	:	部品の記述されているSVG画像オブジェクト
//    nextColor	:	変更したい色
//【戻り値】
//    なし
//【処理内容】
//    1. SVG内の部品のテキスト色を変更する。
//=============================================================================
function forceChangeAllTxtCol( svgObj, nextColor )
{
  var elems = svgObj.getSVGDocument().getElementsByTagName("text");
  if(elems!=null) {
	for (var i = 0; i < elems.length; i++) {
	  var itm=elems.item(i);
	  if (itm!=null && itm.getAttribute('id').indexOf("XMLID_")!=0)	{
		elems.item(i).getStyle().setProperty("fill", nextColor);
	  }
	}
  }
}

//=============================================================================
//  zoomIn  --  拡大関数
//=============================================================================
//【引数】
//    svgWin	: SVG画像が配置されているWindow Object
//【戻り値】
//    なし
//【処理内容】
//    1. 現在の拡大率が最大値を超えていないかチェックし、
//       超えていない場合のみ、zoomInOut() をコールして画像を拡大する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function zoomIn( svgWin )
{
	// 拡大できるかチェック
	if ( (ZOOM_RATES.length-1) > g_iCurRateIndex )
	{
		// 拡大率を指定し、SVGを拡大する
		var _nextRateIndex = g_iCurRateIndex + 1;
		zoomInOut(svgWin, _nextRateIndex);
	}
}

//=============================================================================
//  zoomOut  --  縮小関数
//=============================================================================
//【引数】
//    svgWin	: SVG画像が配置されているWindow Object
//【戻り値】
//    なし
//【処理内容】
//    1. 現在の拡大率が最小値を下回っていないか、
//       下回っていない場合のみ、zoomInOut() をコールして画像を縮小する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function zoomOut( svgWin )
{
	// 縮小できるかチェック
	if ( 0 < g_iCurRateIndex  )
	{
		// 縮小率を指定し、SVGを縮小する
		var _nextRateIndex = g_iCurRateIndex - 1;
		zoomInOut(svgWin, _nextRateIndex);
	}
}

//=============================================================================
//  resetSize  --  標準に戻す関数
//=============================================================================
//【引数】
//    svgWin	: SVG画像が配置されているWindow Object
//【戻り値】
//    なし
//【処理内容】
//    1. zoomInOut() をコールして画像を標準サイズに設定する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function resetSize( svgWin )
{
	// 率を標準値に指定し、SVGを拡縮する
	zoomInOut(svgWin, NORM_RATE_INDEX);
}

//=============================================================================
//  zoomInOut  --  拡大縮小関数
//=============================================================================
//【引数】
//    svgWin	: SVG画像が配置されているWindow Object
//    rateIndex	: 変更したい基準サイズからの倍率インデックス
//【戻り値】
//    なし
//【処理内容】
//    1. 全SVG画像のObjectを取得する。
//    2. 取得したSVG Object 全てに対して、画像を拡縮する。
//    3. メンバ変数を更新し、現在の倍率を内部保持する。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
function zoomInOut( svgWin, rateIndex )
{
	// 全SVG画像のObjectを取得する
	var _arSvgs = svgWin.document.all.tags('embed');
	// SVG画像を拡縮する
	for (var i = 0; i < _arSvgs.length; i++)
	{
		var _curSvg  = _arSvgs[i];
		_curSvg.width  = g_iOrgSvgWidth * ZOOM_RATES[ rateIndex ];
		if(g_aiOrgSvgHeight[i]==null) {
		    g_aiOrgSvgHeight[i] = g_iOrgSvgWidth*HEIGHT_WIDTH_RATE;
		}
		_curSvg.height = g_aiOrgSvgHeight[i] * ZOOM_RATES[ rateIndex ];
	}
	if (_curSvg.getSVGDocument().rootElement==null) return;
	// 標準の場合のみは以下のコード
	if (rateIndex == NORM_RATE_INDEX) {
		_curSvg.getSVGDocument().rootElement.currentScale = 1;
		_curSvg.getSVGDocument().rootElement.currentTranslate.x = 0;
		_curSvg.getSVGDocument().rootElement.currentTranslate.y = 0;
    window.scrollTo(0,0);
	}
	// メンバ変数を更新し、現在の倍率を保持
	g_iCurRateIndex = rateIndex;
}

//=============================================================================
//  centerItem  --  指定されたItemをセンタリングする関数
//=============================================================================
//【引数】
//    itemCode		: センタリングしたい部品名コード
//    svgWin		: SVG画像が配置されているWindow Object
//    svgObj		: 部品の記述されているSVG画像オブジェクト
//【戻り値】
//    なし
//【処理内容】
//    1. SVG画像中の部品位置を取り出し、中央に配置されるよう画像を
//       スクロールする。
//【作成者】
//    Miki Sugita
//【履歴】
//    2003.03.13    create    Miki Sugita
//=============================================================================
var PARTS_NOT_FOUND_ERROR = "There are no parts available"; // 000
function centerItem( itemCode, svgWin, svgObj )
{

	//SVG用部品IDを変換
	itemCodes = getSVGPartID(itemCode);
	// SVG画像の表示ポイントを取得
	var _elem    ;
	for(var i=0;i<itemCodes.length;i++){
		_elem = svgObj.getSVGDocument().getElementById( itemCodes[i] );
		if (_elem != null)
		{
			break;
		}
	}

	if( _elem  == null  ){
		alert(PARTS_NOT_FOUND_ERROR);
		return;
	}
	var tmp = _elem.getElementsByTagName("text").item(0);
	if (tmp!=null) _elem = tmp;
	var _xSvg   = _elem.getCTM().e;
	var _ySvg   = _elem.getCTM().f;

	// SVG画像サイズを取得
	var _svgWidth  = svgObj.width;
	var _svgHeight = svgObj.height;

	// フレームのサイズを取得
	var _frameWidth  = svgWin.document.body.clientWidth;
	var _frameHeight = svgWin.document.body.clientHeight;

	// 表示領域を取得
	var _rootElm = svgObj.getSVGDocument().rootElement();
	var _viewBox = _rootElm.getAttribute('viewBox');
	var _arViews = _viewBox.split(/ /);

	var _viewX      = _arViews[0];
	var _viewY      = _arViews[1];
	var _viewWidth  = _arViews[2];
	var _viewHeight = _arViews[3];

	var _xpos = (_xSvg - _viewX) / _viewWidth;
	var _ypos = (_ySvg - _viewY) / _viewHeight;

	svgWin.scrollTo( _svgWidth  * _xpos - (_frameWidth / 2),
	                 _svgHeight * _ypos - (_frameHeight / 2) );
}

//=============================================================================
//  hideMessage  --  待機メッセージを消す
//=============================================================================
//【引数】
//    なし
//【戻り値】
//    なし
//【処理内容】
//    1. SVG画像表示までの間表示させるメッセージ（「しばらくおまちください」等）
//       を一定時間後に消す。
//    2. まだSVG画像が表示されていない場合は、一定時間後に再度チェックする
//=============================================================================
function hideMessage() {
	var svgobj = document.all('svgdata');
	if (svgobj != null) {
		var msg = document.all('msg');
		if (msg != null) {
			msg.style.display = "none";
		}
		svgobj.style.display = "inline";
	} else {
		setTimeout("hideMessage()", ONLOAD_POLLING_TIME);
	}
}

//=============================================================================
//  getXMLSelectPartID  --  XML用部品IDを返す
//=============================================================================
//【引数】
//    なし
//【戻り値】
//    必要ない文字を消したXML用部品ID
//【処理内容】
//    1. 必要ない文字を消し
//    2. XML用部品IDを返す
//=============================================================================
function getXMLSelectPartID() {
	var ret = "";
	if (g_strCurItemCode == null) {
		return null;
	}
	if (g_strCurItemCode == "") {
		return "";
	}
	var indexX =  g_strCurItemCode.indexOf("_");
	if (indexX == -1) {
		return g_strCurItemCode;
	}
	//cut   X   and after the "_"
	ret = g_strCurItemCode.substring(1,indexX);
	return ret;
}

//=============================================================================
//  getSVGPartID  --  SVG用部品IDを返す
//=============================================================================
//【引数】
//    partId		XML用部品ID
//【戻り値】
//    SVG用部品ID
//【処理内容】
//    1. 必要文字を追加する
//    2. SVG用部品IDを返す
//=============================================================================
function getSVGPartID(partId) {
	var ret = new Array();
	if (partId == null || partId == "") {
		return ret;
	}
	for(var i=0;i<XCODE_LEN;i++){
		ret.push("x"+partId+"_"+(i+1)+"_");
	}
	//add   X   and after the "_"
	//ret = "X"+partId+"_n";
	return ret;
}
