<!-- $Id: local.xsl,v 1.3 2003/11/17 11:51:01 kato Exp $ -->
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
	<xsl:apply-templates select="subpara[@id=string($subparaId)]"/>
</xsl:template>

<xsl:template match="subpara">
	<xsl:if test="@category='05' and string(name)">
		<div class="main-item"><xsl:value-of select="name"/></div>
	</xsl:if>
	<div class="proc-items" id="procitems">
	<ol class="numbering">	
		<xsl:apply-templates select="following-sibling::subpara[1]/testgrp"/>
	</ol>
	</div>
</xsl:template>

<xsl:template match="testgrp">
	<xsl:if test="string(res)">
		<li>
			<xsl:element name="a">
				<xsl:attribute name="href">JavaScript:parent.selectId('<xsl:value-of select="@id"/>', this.document)</xsl:attribute>
				<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
				<xsl:attribute name="name"><xsl:value-of select="@id"/></xsl:attribute>
				<xsl:attribute name="class">procedure</xsl:attribute>
				<xsl:value-of select="testtitle"/>
			</xsl:element>
		</li>
	</xsl:if>
</xsl:template>

<xsl:include href="../utl/_modifier.xsl"/>
<xsl:include href="../utl/_ptxt_skel.xsl"/>
<xsl:include href="../utl/_symbol.xsl"/>

</xsl:stylesheet>
