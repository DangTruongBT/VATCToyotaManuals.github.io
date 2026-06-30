/* $Id: style.js,v 1.14 2004/04/26 05:13:05 k-nagasaka Exp $ */
//===========================================================================
// スタイルシート操作関連JavaScript
// for Translation
// function printConfirm
//   000 SELECT_ERROR(variable)
//===========================================================================

//===========================================================================
// 印刷対象選択画面 ⇒ 印刷確認画面切替
//
// objctt 印刷対象フレーム
// objglb 印刷確認グローバルナビフレーム
//===========================================================================
var SELECT_ERROR = "Please choose the steps to be printed."; // 000
function printConfirm(objctt, objglb) {
	if( objctt.f1 == null || objctt.f1.elements == null ) return;
	var items=0;
	for (var i=0; i<objctt.f1.elements.length; i++) {
		var frm = objctt.f1.elements[i];
		if (!frm.checked) items++;
	}
	if (items==objctt.f1.elements.length) {
		alert(SELECT_ERROR);
		return;
	}
	for (var i=0; i<objctt.f1.elements.length; i++) {
		var frm = objctt.f1.elements[i];
		if (!frm.checked) {
			with( objctt.getElementById(frm.name).style ) {
				visibility="hidden";
				position="absolute";
				display="none";
			}
		} else {
			frm.style.visibility="hidden";
		}
	}
	with(objglb.getElementById("confirm").style) {
		visibility="hidden";
		position="absolute";
		display="none";
	}
	with(objglb.getElementById("selectall").style) {
		visibility="hidden";
		position="absolute";
		display="none";
	}
	with(objglb.getElementById("selectnone").style) {
		visibility="hidden";
		position="absolute";
		display="none";
	}
	with(objglb.getElementById("print").style) {
		visibility="visible";
		position="fixed";
		display="";
	}
}

//===========================================================================
// 印刷確認画面でチェックボックスを非表示にする。
//
// fm フォームエレメント
//===========================================================================
function hideCheckbox(fm) {
	for (var i=0; i<fm.elements.length; i++) {
		var frm = fm.elements[i];
		if (frm.type=="checkbox") {
			with(frm.style) {
				visibility="hidden";
				position="absolute";
			}
		}
	}
}

//===========================================================================
// 印刷対象全選択/解除切替
//
// fm   フォームエレメント
// bool 選択 true 解除 false
//===========================================================================
function allSelect(fm, bool) {
	if( fm == null || fm.elements == null ) return;
	for (var j=0; j<fm.elements.length; j++) {
		var frm = fm.elements[j];
		if (frm.type=="checkbox") {
			frm.checked=bool;
		}
	}
	return;
}

//===========================================================================
// 手順選択時の動作(リンク色替え, 頭出し)
//
// classNameはcss/local.cssを参考にしてください
//===========================================================================
var curChoice = null;
function selectId(procId, obj) {
	if (parent.contents!=null) parent.contents.location.hash = procId;
	if (curChoice!=null && obj.all(curChoice)!=null) {
		obj.all(curChoice).className = "procedure";
	}
	if (obj.all(procId)!=null) {
		obj.all(procId).className = "choice-procedure";
	}
	curChoice = procId;
  resize(obj);
}

//===========================================================================
// 現在選択中の手順IDを返す。(構成図表示で用いる)
//===========================================================================
function getCurChoice() {
	return curChoice;
}
//===========================================================================
// 手順表示領域のリサイズ
//===========================================================================
var procheight=156;		
var procoffset=0;		
var mainoffset=0;		
function resize(doc) {
  ph=doc.body.clientHeight-procheight+procoffset;
	mi=doc.all.tags("div")(1);
	if (mi==null) return;
	if (mi.className=="main-item" && mi.innerText!="") {
		ph=ph+mainoffset;
	}
 	pi = doc.all('procitems');
	if(ph>=0 && pi!=null) 
		pi.style.height = ph
}
