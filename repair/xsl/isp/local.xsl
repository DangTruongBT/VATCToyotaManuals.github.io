<!-- $Id: local.xsl,v 1.3 2003/11/28 09:21:31 takeo Exp $ -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="*[name()!='name']" />
</xsl:template>

<xsl:template match="tmc-service-inc">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="pub">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="servcat">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="section">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="ttl">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="para">
	<div class="main-item"><xsl:value-of select="name"/></div>
	<xsl:apply-templates select="subpara[@category='01']"/>
</xsl:template>

<xsl:template match="subpara">
<div class="proc-items" id="procitems">
	<ol class="number-no">
		<xsl:apply-templates select="s-1"/>
	</ol>
</div>
</xsl:template>

<xsl:template match="s-1">
	<li>
		<xsl:element name="a">
			<xsl:attribute name="href">JavaScript:parent.selectId('<xsl:value-of select="@id"/>', this.document)</xsl:attribute>
			<xsl:attribute name="name">
					<xsl:value-of select="@id"/>
			</xsl:attribute>
			<xsl:attribute name="class">procedure</xsl:attribute>
			<xsl:apply-templates select="ptxt[1]"/>
		</xsl:element>
	</li>
</xsl:template>

<xsl:include href="../utl/_modifier.xsl"/>
<xsl:include href="../utl/_ptxt_skel.xsl"/>
<xsl:include href="../utl/_symbol.xsl"/>

</xsl:stylesheet>