<!-- $Id: contents.xsl,v 1.3 2004/02/24 16:12:00 kato Exp $ -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:param name="subparaId"/>

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
	<xsl:if test="@category='0'">
		<p class="paraname"><xsl:value-of select="name"/></p>
	</xsl:if>
	<xsl:choose>
		<xsl:when test="$subparaId">
			<xsl:apply-templates select="subpara[@id=string($subparaId)]"/>
		</xsl:when>
		<xsl:otherwise>
			<xsl:apply-templates select="subpara"/>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:apply-templates select="content5"/>
</xsl:template>

<xsl:template match="subpara">
	<xsl:element name="a">
		<xsl:attribute name="name"><xsl:value-of select="@id"/></xsl:attribute>
	</xsl:element>
	<xsl:if test="string(name)">
		<p class="subparaname"><xsl:value-of select="name"/></p>
	</xsl:if>
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
<!--START SEEP表示改善対応　20040205-->
<xsl:include href="../utl/_testtitle.xsl"/>
<!--END SEEP表示改善対応　20040205-->

</xsl:stylesheet>
