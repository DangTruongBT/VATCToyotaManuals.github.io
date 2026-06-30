<!-- $Id: note_local.xsl,v 1.5 2003/11/25 02:18:38 takeo Exp $ -->
<!--========================================================================-->
<!-- note_local.xsl                                                         -->
<!--                                                                        -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-db"/>
</xsl:template>

<xsl:template match="tmc-service-db">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<br/>
	<ol class="number-no">
		<xsl:apply-templates select="servcat"/>
	</ol>
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
	<xsl:variable name="ttlName">
		<xsl:value-of select="../name" />
	</xsl:variable>
	<xsl:variable name="secId">
		<xsl:value-of select="substring-before(ancestor::section/@id, '_')"/>
	</xsl:variable>
	<xsl:if test="@category='M'">
		<li>
			<a class="procedure">
				<xsl:attribute name="href">JavaScript:selectId('<xsl:value-of select="@id"/>', this.document);</xsl:attribute>
				<xsl:attribute name="name"><xsl:value-of select="@id"/></xsl:attribute>
				<xsl:value-of select="../name"/>
				<xsl:if test="count(//ttl[name=$ttlName]) &gt; 1 or (count(//section[substring-before(@id, '_')=$secId]) &gt; 1)">
					(<xsl:value-of select="ancestor::section/name" />)
				</xsl:if>
				&gt; <xsl:value-of select="name"/>
			</a>
		</li><br/>
	</xsl:if>
</xsl:template>
</xsl:stylesheet>