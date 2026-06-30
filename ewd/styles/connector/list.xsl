<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="PartsList">
		<xsl:apply-templates select="Parts" />
	</xsl:template>
	
	<xsl:template match="Parts">
		<xsl:call-template name="Table">
			<xsl:with-param name="code" select="@code" />
			<xsl:with-param name="name" select="." />
		</xsl:call-template>
	</xsl:template>
	
	<xsl:template name="Table">
		<xsl:param name="code">No Code</xsl:param>
		<xsl:param name="name">No Name</xsl:param>
		<table cellspacing="0" cellpadding="0" class="list">
			<tr>
				<td width="10" height="10">
					<img src="../../icon/b_icon0.png" width="10" height="100%" />
				</td>
				<td width="100%">
					<div class="menu" onMouseOver="call_runOnMouseOver()" onMouseOut="call_runOnMouseOut()" onClick="call_runOnClickItem()">
						<xsl:attribute name="id"><xsl:value-of select="$code"/></xsl:attribute>
						<xsl:value-of select="$name"/>
					</div>
				</td>
			</tr>
		</table>
	</xsl:template>
	
</xsl:stylesheet>
