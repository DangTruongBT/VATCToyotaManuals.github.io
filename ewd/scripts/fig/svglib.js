/**
 * 引数で渡されたノードの図形ノードを取得する

 *
 * param1 node 検索対象ノード

 * return 図形ノード

 */
function getFigNode_svg( node )
{
	if( node == null )	return false;

	var parentNode = node.getParentNode();
	for( var i = 0; i < 10 && parentNode != null; i++ ){
		var nodeName = parentNode.getNodeName();
		if( nodeName == "a" )	return parentNode;
		if( nodeName == "g" )	return parentNode;
		if( nodeName == "svg" )	return null;
		parentNode = parentNode.getParentNode();
	}
	return null;
}
