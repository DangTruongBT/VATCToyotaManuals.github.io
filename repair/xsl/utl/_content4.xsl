<!-- $Id: _content4.xsl,v 1.2 2005/03/29 11:45:24 k-narumi Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="content4">
	<xsl:value-of select="title"/>
	<xsl:for-each select="child::*">
		<xsl:choose>
			<xsl:when test="name() ='table'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='atten2'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='atten3'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='atten4'">
				<xsl:apply-templates select="."/>
			</xsl:when>
		</xsl:choose>
	</xsl:for-each>
<!--
	<xsl:apply-templates select="table"/>
	<xsl:apply-templates select="atten2"/>
	<xsl:apply-templates select="atten3"/>
	<xsl:apply-templates select="atten4"/>
-->
</xsl:template>

</xsl:stylesheet>