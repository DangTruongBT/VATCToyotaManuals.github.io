/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/

var JPN = 0;
var ENG = 1;

var lung = JPN;




var IE_VERS_ERR			= new Array("IE5.01では未対応です",
									"IE5.01 has not corresponded.");

var SVGVIEWER_VERS_ERR	= new Array("SVG viewer 3.0 以上を使用してください",
									"SVG viewer version 3.0 or more are required.");

var NOT_FND_ERR			= new Array("見つかりませんでした。",
									"not found.");

var NOT_FND_CONN_NO_ERR = new Array("コネクタNoが見つかりませんでした。",
									"not found connector number.");

var SELECT_PARTS_ERR	= new Array("部品が選択されていません。",
									"not selected parts.");



function showMessage(type)
{
	window.alert(type[lung]);
}
