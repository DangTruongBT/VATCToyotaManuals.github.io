/* $Id: servcat.js,v 1.1 2003/09/26 05:55:49 takeo Exp $ */
//
// サービスカテゴリタイプのリンクをクリックされた場合に表示される
// 簡易ポップアップに関する処理
//

// 簡易ポップアップ幅
var SUB_MENU_WIDTH = 600;
// 簡易ポップアップ高さ
var SUB_MENU_HEIGHT = 250;
// 簡易ポップアップ表示位置X方向オフセット
var SUB_MENU_OFFSET_X = 180;
// 簡易ポップアップ表示位置Y方向オフセット
var SUB_MENU_OFFSET_Y = -3;
// 簡易ポップアップからフォーカスが外れた時にウィンドウを消すまでのタイムアウト時間
var DELAY_TIME = 2000;

// 簡易ポップアップオブジェクト
var g_popup = null;
// 簡易ポップアップを消す命令ID
var g_tid = null;
// 簡易ポップアップの消去フラグ
var g_clear = false;

// 簡易ポップアップを作成する
//  win        簡易ポップアップの親ウィンドウ
//  clickfunc  簡易ポップアップ内でクリックされた場合は実行するJavascript関数
function createSubMenu(win, clickfunc) {
	// create popup
	g_popup = win.createPopup();
	// set event handler
	g_popup.document.body.onclick = clickfunc;
	g_popup.document.body.onmouseover = clearDelay;
	g_popup.document.body.onmouseout = setDelay;
	// set style
	g_popup.document.body.style.overflow = "auto";
	g_popup.document.body.style.border = "solid #666666 1px";
}

// 簡易ポップアップを表示する
//  obj  相対表示位置の元となるオブジェクト
//  src  実際に表示する内容
function dispSubMenu(obj, src) {
	window.focus();
	// set source HTML
	g_popup.document.body.innerHTML = src;
	// Shows the actual popup object with correct height.
	g_popup.show(SUB_MENU_OFFSET_X, SUB_MENU_OFFSET_Y, SUB_MENU_WIDTH, SUB_MENU_HEIGHT, obj);
	g_clear = false;
}

// 簡易ポップアップを消す
function undispSubMenu() {
	g_popup.hide();
}

// 簡易ポップアップが表示されている場合のみポップアップを消す設定をする
function delayUndisp() {
	if (!g_clear) setDelay();
}

// 指定時間後に簡易ポップアップを消す設定をする
function setDelay() {
	g_tid = setTimeout("undispSubMenu()", DELAY_TIME);
	g_clear = false;
}

// 簡易ポップアップを消す設定を解除する
function clearDelay() {
	clearTimeout(g_tid);
	g_clear = true;
}

// マウスクリック時のイベントを取得する
function getSrcElement(){
	return g_popup.document.parentWindow.event.srcElement;
}
