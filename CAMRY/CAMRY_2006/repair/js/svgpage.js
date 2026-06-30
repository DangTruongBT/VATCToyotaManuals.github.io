/* $Id: svgpage.js,v 1.7 2003/11/13 08:20:33 takeo Exp $ */
//==================================================================
//    SVGページ一覧の処理
//==================================================================

//==================================================================
//  指定されたイラストのページ番号をハイライトさせる
//  illustId: イラストID
//==================================================================
function selPageColor(illustId) {
	tgt = document.getElementById(illustId);
	if (tgt == null) return;
	var tab = tgt.parentNode.parentNode;
	var trnum = tab.children.length;
	for (j=0; j<trnum ; j++) {
		var tr = tab.children[j];
		var td;
		var num = tr.children.length;
		for (i=0; i<num; i++) {
			td = tr.children[i];
			td.style.backgroundColor = "";
			td.style.borderColor = "";
		}
	}
	tgt.style.backgroundColor = "#cccccc";
	tgt.style.borderColor = "#666666";
}

//==================================================================
// 指定されたイラストを選択状態にし、更にそのイラストを
// コンテンツフレームに表示する
// illustId: イラストID
//==================================================================
function selPage(illustId) {
	selPageColor(illustId);
	try {
		parent.contents.location.href="contents.html?illust="+illustId;
	} catch (e) {
		//location.reload();
	}
}

//==================================================================
//  指定イラストIDをページとして番号表示する
//  maxLen を超えると改行する
//  SVGItem: イラストID配列
//==================================================================
function createList(SVGItem) {
	var  maxLen = 15;
	var dispPage = "";
	if (SVGItem.length==1) {
		return "";
	}
	if (SVGItem.length>maxLen) {
		dispPage = dispPage
			+ "<td><a name='0'></a>"
			+ "<table>"
			+ "<tr>";
	}
	for (var i=0;i<SVGItem.length;i++) { 
		dispPage = dispPage
			+"<td align='center'"
			+" id='"+SVGItem[i] +"'"
			+" class='page'>"
			+ "<a href=\"javascript:selPage(\'"+SVGItem[i]+"\')\" class='page'>"
			+ (i+1)
			+ "</a>"
			+ "</td>";
		if ((i+1)  == SVGItem.length) {
			break;
		}
		if ((i+1)%maxLen==0) {
			dispPage = dispPage 
				+"<td align=center class='page'"
				+">"
				+"<a href='#"+(i+1)+"' class='sign'>"
				+"↓"
				+"</a>"
				+"</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<a name='"+(i+1)+"'></a>";
		}
	}
	if (SVGItem.length>maxLen) {
		dispPage = dispPage 
			+"<td align=center class='page'"
			+">"
			+"<a href='#0' class='sign'>"
			+"↑"
			+"</a>"
			+"</td>"
			+ "</tr>"
			+ "</table>"
			+ "</td>";
	}
	return dispPage ;
}

//==================================================================
//  ボタンフレームの画面ソースを作成する
//  SVGItem: イラストID配列
//==================================================================
function createDispPage(SVGItem) {
	var  dispPage = "";  
	dispPage = "<table width='100%' border='0'>"
		+ "<tr>"
		+ createList(SVGItem)
		+ "<td align='right' valign='top'>"
		+ "  <table border='0' cellspacing='0' cellpadding='1'>"
		+     "<tr>"
		+      "<td>"
		+ "<button type='button' onClick='parent.contents.resetSize(window.parent.contents)' style='border-width:0px; width:39px; height:25px'>"
		+ "<img src='../../img/reset.png' class='button'>"
		+ "</button>"
		+     "</td>"
		+      "<td>"
		+ "<button type='button' onClick='parent.contents.zoomIn(window.parent.contents)' style='border-width:0px; width:25px; height:25px'>"
		+ "<img src='../../img/plus.png' class='button'>"
		+ "</button>"
		+     "</td>"
		+      "<td>"
		+ "<button type='button' onClick='parent.contents.zoomOut(window.parent.contents)' style='border-width:0px; width:25px; height:25px'>"
		+ "<img src='../../img/minus.png' class='button'>"
		+ "</button>"
		+     "</td>"
		+    "</tr>"
		+  "</table>"
		+ "</td>"
		;
	return dispPage;
}
