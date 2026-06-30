<!-- $Id: _content2.xsl,v 1.1 2003/09/22 10:54:08 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:variable name="pages" select="count(//figure)" />

<xsl:template match="content2">
	<xsl:for-each select="child::*">
		<xsl:choose>
			<xsl:when test="name()='figure'">
				<xsl:call-template name="content2.figure"/>
				<br/>
			</xsl:when>
			<xsl:when test="name()='ptxt'">
				<font class="ptxt"><xsl:apply-templates select="."/></font>
			</xsl:when>
			<xsl:when test="name()='atten2'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name()='atten3'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name()='atten4'">
				<xsl:apply-templates select="."/>
			</xsl:when>
		</xsl:choose>
	</xsl:for-each>
</xsl:template>

<xsl:template name="content2.figure">
	<xsl:apply-templates select="."/><br clear="all"/>
	<div class='pages'>
		<xsl:number level="any" /> / <xsl:value-of select="$pages"/>
	</div>
	<hr width='95%' color='#0000ff' />
</xsl:template>

</xsl:stylesheet>
