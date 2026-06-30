<!-- $Id: _symbol.xsl,v 1.1 2003/09/22 10:54:08 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="symbol">
	<xsl:element name="img">
		<xsl:attribute name="src">
			../../png/<xsl:value-of select="translate(@name ,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/><xsl:text>.png</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="alt">
			<xsl:value-of select="@name"/>
		</xsl:attribute>
		<xsl:attribute name="width">
			<xsl:value-of select="@width"/>
		</xsl:attribute>
		<xsl:attribute name="height">
			<xsl:value-of select="@height"/>
		</xsl:attribute>
	</xsl:element>
</xsl:template>

</xsl:stylesheet>