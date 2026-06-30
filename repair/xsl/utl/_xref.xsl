<!-- $Id: _xref.xsl,v 1.4 2004/04/26 07:18:48 s-okino Exp $ -->
<!--========================================================================-->
<!-- for Translation                                                        -->
<!--  000 Click here                                                        -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xlink="http://www.w3.org/1999/xlink" exclude-result-prefixes="xlink" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:variable name="displayStr">Click here</xsl:variable><!-- 000 -->

<xsl:template match="xref">
	<xsl:if test="../../../s-1 or ../../../testgrp"> (</xsl:if>
	<xsl:element name="a">
		<xsl:attribute name="href">#</xsl:attribute>
		<xsl:attribute name="onclick">javascript:parent.seePage('<xsl:value-of select="@href"/>');return false;</xsl:attribute>
		<xsl:value-of select="$displayStr"/>
	</xsl:element>
	<xsl:if test="../../../s-1 or ../../../testgrp">)</xsl:if>
</xsl:template>

<xsl:template match="xref-nonref">
	<xsl:if test="../../../s-1 or ../../../testgrp"> (</xsl:if>
	<xsl:element name="a">
		<xsl:attribute name="href">#</xsl:attribute>
		<xsl:attribute name="onclick">javascript:parent.seePage('<xsl:value-of select="@href"/>');return false;</xsl:attribute>
		<xsl:value-of select="$displayStr"/>
	</xsl:element>
	<xsl:if test="../../../s-1 or ../../../testgrp">)</xsl:if>
</xsl:template>

</xsl:stylesheet>