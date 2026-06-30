<!-- $Id: detailslist.xsl,v 1.3 2003/10/24 10:58:51 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:xlink="http://www.w3.org/1999/xlink" 
	exclude-result-prefixes="xlink"
	version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-inc"/>
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
	<xsl:apply-templates select="content5"/>
</xsl:template>

<xsl:include href="../utl/_content5.xsl"/>
<xsl:include href="../utl/_ptxt.xsl"/>
<xsl:include href="../utl/_list.xsl"/>
<xsl:include href="../utl/_spec.xsl"/>
<xsl:include href="../utl/_table_diag.xsl"/>
<xsl:include href="../utl/_figure.xsl"/>
<xsl:include href="../utl/_atten.xsl"/>
<xsl:include href="../utl/_torque.xsl"/>
<xsl:include href="../utl/_sst.xsl"/>
<xsl:include href="../utl/_diag.xsl"/>
<xsl:include href="../utl/_symbol.xsl"/>
<xsl:include href="../utl/_results.xsl"/>
<xsl:include href="../utl/_modifier.xsl"/>
<xsl:include href="../utl/_test1.xsl"/>
<xsl:include href="../utl/_xref.xsl"/>

</xsl:stylesheet>