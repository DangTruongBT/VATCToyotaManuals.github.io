<!-- $Id: preparation.xsl,v 1.1 2003/09/26 05:53:50 takeo Exp $ -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<xsl:apply-templates select="tmc-service-inc"/>
	</table>
</xsl:template>

<xsl:template match="tmc-service-inc">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<xsl:apply-templates select="servcat"/>
</xsl:template>

<xsl:template match="servcat">
	<xsl:apply-templates select="section"/>
</xsl:template>

<xsl:template match="section">
	<xsl:apply-templates select="ttl"/>
</xsl:template>

<xsl:template match="ttl">
	<xsl:apply-templates select="para"/>
</xsl:template>

<xsl:template match="para">
	<xsl:apply-templates select="subpara"/>
</xsl:template>

<xsl:template match="subpara">
	<tr><td align="center"><xsl:apply-templates select="content4"/></td></tr>
	<tr><td><br/></td></tr>
</xsl:template>

<xsl:include href="_content4.xsl"/>
<xsl:include href="_table.xsl"/>
<xsl:include href="_atten.xsl"/>
<xsl:include href="_ptxt.xsl"/>
<xsl:include href="_list.xsl"/>
<xsl:include href="_figure.xsl"/>

</xsl:stylesheet>