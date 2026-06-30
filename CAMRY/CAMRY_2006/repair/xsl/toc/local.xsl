<!-- $Id: local.xsl,v 1.5 2006/01/11 08:48:08 k-narumi Exp $ -->
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
	<xsl:choose>
		<xsl:when test="string(name)">
			<div class="main-item"><xsl:value-of select="name"/></div>
		</xsl:when>
		<xsl:otherwise>
			<div class="main-item"><xsl:value-of select="content5/title"/></div>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:apply-templates select="content5"/>
</xsl:template>

<xsl:template match="content5">
	<xsl:variable name="ctt-id" select="position()"/>
	<div class="proc-items" id="procitems">
	<xsl:for-each select="*">
		<xsl:if test="name()='step1' or name()='descript-diag'">
		  <ol>
			<xsl:attribute name="class">
				<xsl:choose>
					<xsl:when test="self::step1 and (ancestor::para[@category='L'] or ancestor::para[@category='N'])">numbering</xsl:when>
					<xsl:when test="self::descript-diag">numbering</xsl:when>
					<xsl:otherwise>number-no</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:apply-templates select=".">
				<xsl:with-param name="ctt-id" select="$ctt-id"/>
			</xsl:apply-templates>
		</ol>
		</xsl:if>
	</xsl:for-each>
	</div>
</xsl:template>

<xsl:template match="step1">
	<xsl:param name="ctt-id"/>
	<li>
		<xsl:if test="preceding-sibling::step1">
			<xsl:attribute name="value"><xsl:value-of select="count(preceding-sibling::step1)+1"/></xsl:attribute>
		</xsl:if>
		<xsl:element name="a">
			<xsl:variable name="anch"><xsl:value-of select="ancestor::subpara/@proc-id"/><xsl:value-of select="$ctt-id"/><xsl:number level="any"/>step</xsl:variable>
			<xsl:attribute name="class">procedure</xsl:attribute>
			<xsl:attribute name="id"><xsl:value-of select="$anch"/></xsl:attribute>
			<xsl:attribute name="href">JavaScript:parent.selectId('<xsl:value-of select="$anch"/>', this.document)</xsl:attribute>
			<xsl:apply-templates select="ptxt[1]"/>
		</xsl:element>
	</li>
</xsl:template>

<xsl:template match="descript-diag">
	<xsl:param name="ctt-id"/>
	<xsl:apply-templates select="descript-testgroup">
		<xsl:with-param name="ctt-id" select="$ctt-id"/>
	</xsl:apply-templates>
</xsl:template>

<xsl:template match="descript-testgroup">
	<xsl:param name="ctt-id"/>
	<li>
		<xsl:element name="a">
			<xsl:variable name="anch"><xsl:value-of select="ancestor::subpara/@proc-id"/><xsl:value-of select="$ctt-id"/><xsl:number level="any"/></xsl:variable>
			<xsl:attribute name="id"><xsl:value-of select="$anch"/></xsl:attribute>
			<xsl:attribute name="href">JavaScript:parent.selectId('<xsl:value-of select="$anch"/>', this.document)</xsl:attribute>
<!--
			<xsl:value-of select="testtitle"/>
-->
			<xsl:apply-templates select="testtitle"/>
		</xsl:element>
	</li>
</xsl:template>

<xsl:include href="../utl/_modifier.xsl"/>
<!--
<xsl:include href="../utl/_ptxt_skel.xsl"/>
-->
<xsl:include href="../utl/_symbol.xsl"/>
<xsl:include href="../utl/deleteSeePage.xsl"/>
</xsl:stylesheet>
