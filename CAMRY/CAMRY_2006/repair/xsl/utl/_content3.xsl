<!-- $Id: _content3.xsl,v 1.2 2005/03/29 11:45:24 k-narumi Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="content3">
	<xsl:for-each select="child::*">
		<xsl:choose>
			<xsl:when test="name()='ptxt'">
				<font class="ptxt"><xsl:apply-templates select="."/></font><br/>
			</xsl:when>
			<xsl:when test="name() ='list1'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='spec'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='figure'">
				<xsl:apply-templates select="."/>
			</xsl:when>
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
			<xsl:when test="name() ='torque'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='sst'">
				<xsl:apply-templates select="."/>
			</xsl:when>
		</xsl:choose>
	</xsl:for-each>
<!--
	<font class="ptxt"><xsl:apply-templates select="ptxt"/></font>
	<xsl:apply-templates select="list1"/>
	<xsl:apply-templates select="spec"/>
	<xsl:apply-templates select="figure"/>
	<xsl:apply-templates select="table"/>
	<xsl:apply-templates select="atten2"/>
	<xsl:apply-templates select="atten3"/>
	<xsl:apply-templates select="atten4"/>
	<xsl:apply-templates select="torque"/>
	<xsl:apply-templates select="sst"/>
-->
</xsl:template>

</xsl:stylesheet>