/* $Id: memo.js,v 1.2 2004/04/26 05:12:56 k-nagasaka Exp $ */
//===========================================================================
// メモ機能
//
// for Translation
//   000 Missing a file name.
//   001 Can not create a file.
//   002 Can not write.
//   003 can not access file!
//===========================================================================

//-------------メモJavaScript--------------
// メモ画面の幅 and 高さ
var WIN_WIDTH  = 450;
var WIN_HEIGHT = 270;

var IMG_PATH = "../../img/";
var WHITE_ICON_NAME = "memo.png";
var RED_ICON_NAME = "memo_red.png";
var REPAIR = "repair";
var FILE_SEP = "\\";

//現在メモの位置
var g_memo_margin = 0;
var g_winData;
var g_memoData;
var g_memoPath;

var g_document;

//==============================================================================
// メモ初期化 メモ画面PopUp
//==============================================================================
//【引数】
//		textId		：メモの文字ID
//		procId		：メモのProc-id
//【戻り値】
//		なし
//【処理内容】
//		メモ画面を表示する
//【作成者】
//		szg
//【履歴】
//		date		2003/03/13	修正	szg
//
//==============================================================================
function openMemo (textId, procId) {
	openMemoWin(textId, procId , REPAIR);
}

//==============================================================================
// メモ画面PopUp
//==============================================================================
//【引数】
//		textId		：メモの文字ID
//		procId		：メモのProc-id
//		mark 		：メモのマーク
//【戻り値】
//		なし
//【処理内容】
//		メモ画面を表示する
//【作成者】
//		szg
//【履歴】
//		date		2003/03/13	修正	szg
//
//==============================================================================
function openMemoWin (textId, procId , mark ) {
	if(g_winData ==null ){
		g_winData = new Hashtable();
	}
	var keys = g_winData.keys();
	for(i=0;i<keys.length;i++){
		try{
			g_winData.get(keys[i]).screenY;
			//alert(keys[i]+"   "+g_winData.get(keys[i]).screenY);
		}catch(e){
			g_winData.remove(keys[i])
		}
	}
	if(g_winData.size() == 0 ){
		g_memo_margin	= 0;
	}

	// メモ画面の幅 and 高さ
	var _width  = WIN_WIDTH;
	var _height = WIN_HEIGHT;

	// Window幅を取得
	var _x = 20 + g_memo_margin;
	var _y = screen.availHeight - _height - 30 - g_memo_margin;

	var _style = "dialogHeight:" + _height + "px;dialogWidth:" + _width 
						+ "px;dialogTop:" + _y + "px;dialogLeft:" + _x + "px;"
						+ " status=no; resizable=no; help=no; name=memo;"
						;

	//Open Memo Window
	var args = new Array();
	args[0] = textId;
	args[1] = procId;
	args[2] = mark;
	args[3] = window.self;

	var key = mark +procId;
	var win = g_winData.get(key);
	if( win != null ){
		try{
			win.focus();
			return;
		}catch(e){
		}
	}

	win = showModelessDialog("../etc/memo.html",args,_style);
	g_winData.put(key,win);
	g_memo_margin += 20;
	//alert(mwin);
}

//==============================================================================
// エイコンの色が変わる
//==============================================================================
//【引数】
//		memoId		：メモId
//【戻り値】
//		なし
//【処理内容】
//		エイコンが白になる
//【作成者】
//		szg
//【履歴】
//		date		2003/03/13	修正	szg
//
//==============================================================================
function changeIconWhite(memoId) {
	var imgObj = g_document.all.item(memoId);
	//alert("len="+imgObj.length);
	if( imgObj.length){
		for(i=0;i<imgObj.length;i++){
			imgObj[i].src = IMG_PATH + WHITE_ICON_NAME;
		}
	}else{
		imgObj.src = IMG_PATH + WHITE_ICON_NAME;
	}
}

//==============================================================================
// エイコンの色が変わる
//==============================================================================
//【引数】
//		memoId		：メモId
//【戻り値】
//		なし
//【処理内容】
//		エイコンが赤になる
//【作成者】
//		szg
//【履歴】
//		date		2003/03/13	修正	szg
//
//==============================================================================
function changeIconRed(memoId) {
	var imgObj = g_document.all.item(memoId);
	//alert("len="+imgObj.length);
	if( imgObj.length){
		for(i=0;i<imgObj.length;i++){
			imgObj[i].src = IMG_PATH + RED_ICON_NAME;
		}
	}else{
		imgObj.src = IMG_PATH + RED_ICON_NAME;
	}
	//g_document.all.item(memoId).src = IMG_PATH + RED_ICON_NAME;
}

//==============================================================================
// メモが存在かどうかチェック
//==============================================================================
//【引数】
//		memoId		：メモId
//		mark 		：メモのマーク
//【戻り値】
//		存在場合は	true
//【処理内容】
//		メモが存在かどうかチェック
//【作成者】
//		szg
//【履歴】
//		date		2003/03/13	修正	szg
//
//==============================================================================
function isMemoExist(memoId,mark) {
	var ret = readMemo(memoId,mark);
	if( ret ==null || ret =="" ) return false;
	return true;
}

//==============================================================================
// メモ画像かどうかチェック
//==============================================================================
//【引数】
//		imgObject	：
//		mark 		：メモのマーク
//【戻り値】
//		存在場合は	true
//【処理内容】
//		メモ画像かどうかチェック
//【作成者】
//		szg
//【履歴】
//		date		2003/05/28	修正	szg
//
//==============================================================================
function isMemoImg(imgObject,mark) {
	if( imgObject== null) return false;
	try{
		//alert("imgObject.src="+imgObject.src);
		if( imgObject.src.indexOf(WHITE_ICON_NAME)>0 ) return true;
		if( imgObject.src.indexOf(RED_ICON_NAME)>0 ) return true;
	}catch(e){
	}
	return false;
}

//==============================================================================
// 初期化
//==============================================================================
//【引数】
//		documentObject		：表示画面のdocument オブジェクト
//		mark 		：メモのマーク
//【戻り値】
//		なし
//【処理内容】
//		XMLデータから画面表示　入力したメモがあるかどうか判断して
//		ある場合は赤に表示、ない場合は白に表示
//【作成者】
//		szg
//【履歴】
//		date		2003/03/13	修正	szg
//
//==============================================================================
function loadMemoData (documentObject,mark) {
	g_document = documentObject;
	g_document.body.onunload=closeMemos;
	if( g_document == null) return;
	var  canLoadMemo =  canMemo();
	obj = documentObject.images;
	for ( var i = 0; i<obj.length; i++ ) {
		var memoId = obj[i].id;
		//alert("memoId ="+memoId + "  canLoadMemo ="+canLoadMemo );
		if ( memoId != null && isMemoImg(obj[i],mark) ) {
			if ( canLoadMemo ) {
				//内容があると赤くなる,ないと白くなる
				obj[i].parentNode.style.visibility="visible";
				if ( !isMemoExist(memoId,mark) ) {
					changeIconWhite(memoId);
				} else {
					changeIconRed(memoId);
				}
			}else{
				//一般パラグラフの場合はメモ画像を隠す
				var td = obj[i].parentNode.parentNode;
				if( td.getAttribute("id").toLowerCase().indexOf("memo") > 0 ){
					td.style.display="none";
				}
			}
		}//if end
	}//for end
}

//==============================================================================
// メモ内容を保存する
//==============================================================================
//【引数】
//		memoId		：メモId
//		memoText	：メモ内容
//		mark 		：メモのマーク
//【戻り値】
//		メモ内容
//【処理内容】
//		入力したメモ内容を保存する
//		ローカルファイルアクセスオブジェクトのResultメンバー変数に実行結果コード
//		0		ファイル書き込み成功
//		-1		ファイル作成失敗
//		-2		ファイル書き込み失敗
//		-3		ファイル名が指定されていない
//【作成者】
//		szg
//【履歴】
//		date		2003/03/13	修正	szg
//
//==============================================================================
function writeMemo (memoId, memoText, mark) {
	if(g_memoData==null){
		return null;
	}

	var axId = g_memoPath + memoId + ".txt";
	axId = axId.toLowerCase();

	if( memoText ==null || memoText =="" ){
		g_memoData.AxDeleteFile(axId);
		if ( g_memoData.Result == 0 ) {
			//return "";
		}else if ( g_memoData.Result == -1 ) {
			//alert("ファイル削除失敗");
		}else if ( g_memoData.Result == -2 ) {
			//alert("指定ファイルが存在しない");
		}else if ( g_memoData.Result == -3 ) {
			//alert("ファイル名が指定されていない");
			alert("Missing a file name.");  // 000
		}
		return "";
	}

	//g_memoData.put(memoId, memoText);return memoText;
	g_memoData.AxWriteFile(axId, memoText);
	if ( g_memoData.Result == 0 ) {
		return memoText;
	}else if ( g_memoData.Result == -1 ) {
		alert("Can not create a file."); // 001
	}else if ( g_memoData.Result == -2 ) {
		alert("Can not write.");         // 002
	}else if ( g_memoData.Result == -3 ) {
		alert("Missing a file name.");   // 000
	}
	return null;
}

//==============================================================================
// メモ内容をリロードする
//==============================================================================
//【引数】
//		memoId		：メモId
//		mark 		：メモのマーク
//【戻り値】
//		メモ内容
//【処理内容】
//		入力したメモ内容をリロードする
//		ローカルファイルアクセスオブジェクトのResultメンバー変数に実行結果コード
//		0		ファイル読み込み成功
//		-1		ファイルオープン失敗
//		-2		ファイル読み込み失敗
//		-3		指定ファイルが存在しない
//		-4		ファイル名が指定されていない
//【作成者】
//		szg
//【履歴】
//		date		2003/03/13	修正	szg
//
//==============================================================================
function readMemo(memoId, mark) {
	if(g_memoData==null){
		try{
			//g_memoData = new Hashtable();
			g_memoData = new ActiveXObject("AxPlug.FileAccess.1");
			g_memoPath = mark+FILE_SEP+"memo"+FILE_SEP;
		}catch(e){
			return null;
		} 
	}
	var axId = g_memoPath + memoId + ".txt";
	axId = axId.toLowerCase();

	//var ret  = g_memoData.get(memoId);
	var ret  = g_memoData.AxReadFile( axId );
	if ( g_memoData.Result == 0 ) {
		//ファイル読み込み成功;
	}else if ( g_memoData.Result == -1 ) {
		//alert();
	}else if ( g_memoData.Result == -2 ) {
		//alert();
	}else if ( g_memoData.Result == -3 ) {
		//alert();
	}else if ( g_memoData.Result == -4 ) {
		alert("Missing a file name."); // 000
	}
	if (ret == null ) ret = "";
	return ret ;
}

//==============================================================================
// メモ画面を閉じる
//==============================================================================
//【引数】
//		memoId		：メモId
//		memoText	：メモ内容
//		mark 		：メモのマーク
//【戻り値】
//		なし
//【処理内容】
//		メモ画面を閉じる
//【作成者】
//		szg
//【履歴】
//		date		2003/03/13	修正	szg
//
//==============================================================================
function closeMemo(memoId, memoText, mark) {
	var inputData = writeMemo(memoId, memoText,mark);
	//alert("changeIconRed["+memoText+"]"+(inputData == ""));
	if ( (inputData == null) || (inputData == "") ) {
		//alert("changeIconWhite");
		changeIconWhite(memoId);
	} else {
		changeIconRed(memoId);
	}
}

//==============================================================================
// メモ機能があるかどうか
//==============================================================================
//【引数】
//		なし
//【戻り値】
//		true	メモ機能を持っている
//【処理内容】
//		メモ機能があるかどうか
//【作成者】
//		szg
//【履歴】
//		date		2003/05/27	新規	szg
//
//==============================================================================
function canMemo() {
	var ret = checkActiveX("AxPlug.FileAccess.1","can not access file!",false); // 003
	return ret;
}

//==============================================================================
// メモ画面を閉じる
//==============================================================================
//【引数】
//		なし
//【戻り値】
//		なし
//【処理内容】
//		メモ画面を閉じる
//【作成者】
//		szg
//【履歴】
//		date		2003/06/13	修正	szg
//
//==============================================================================
function closeMemos() {
	if( g_winData == null) return;
	var keys = g_winData.keys();
	for(i=0;i<keys.length;i++){
		try{
			g_winData.get(keys[i]).close();
		}catch(e){
		}
		g_winData.remove(keys[i])
	}
}
