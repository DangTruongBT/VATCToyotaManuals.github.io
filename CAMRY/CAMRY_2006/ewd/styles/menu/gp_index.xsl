<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="List" />
	</xsl:template>
	
	<xsl:template match="List">
		<div id="title" class="title" align="center">
			Ground Point
		</div>
		<div id="list" align="center">
			<xsl:apply-templates select="TitleList"/>
		</div>
	</xsl:template>
	
	<xsl:template match="TitleList">
		<table width='60%' border='1' cellspacing='0' cellpadding='0' bordercolor='#FFFFFF'>
			<tr class='gray2'><td>Ground Point</td></tr>
			<xsl:for-each select="Title">
				<tr>
					<td>
						<xsl:call-template name="Title">
							<xsl:with-param name="type">system</xsl:with-param>
							<xsl:with-param name="code" select="@code"/>
							<xsl:with-param name="name" select="."/>
						</xsl:call-template>
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
	
	<xsl:template name="Title">
		<xsl:param name="code">No Code</xsl:param>
		<xsl:param name="name">No Name</xsl:param>
		<xsl:param name="type">No Type</xsl:param>
		<div class='titlelist' onMouseOver='call_runOnMouseOver()' onMouseOut='call_runOnMouseOut()'>
			<xsl:attribute name="onClick">call_runOnClickTitle('<xsl:value-of select="$code"/>', '<xsl:value-of select="$type"/>')</xsl:attribute>
			<xsl:value-of select="$name"/>
		</div>
	</xsl:template>
	
</xsl:stylesheet>
