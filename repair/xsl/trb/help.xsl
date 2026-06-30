<!-- $Id: help.xsl,v 1.1 2003/10/10 12:03:24 takeo Exp $ -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-inc" />
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
	<xsl:apply-templates select="subpara[@category='03']"/>
</xsl:template>

<xsl:template match="subpara">
	<xsl:element name="a">
		<xsl:attribute name="name"><xsl:value-of select="@id"/></xsl:attribute>
	</xsl:element>
	<p class="subparaname"><xsl:value-of select="name"/></p>
	<xsl:apply-templates select="content5"/>
</xsl:template>

<xsl:include href="../utl/_content5.xsl"/>
<xsl:include href="../utl/_ptxt.xsl"/>
<xsl:include href="../utl/_list.xsl"/>
<xsl:include href="../utl/_spec.xsl"/>
<xsl:include href="../utl/_figure.xsl"/>
<xsl:include href="../utl/_table.xsl"/>
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