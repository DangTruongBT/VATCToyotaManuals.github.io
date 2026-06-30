<!-- $Id: _ptxt_skel.xsl,v 1.1 2003/09/22 10:54:08 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="ptxt">
	<xsl:for-each select="node()">
		<xsl:value-of select="self::text()"/>
		<xsl:apply-templates select="self::sub"/>
		<xsl:apply-templates select="self::sup"/>
		<xsl:if test="parent::node()/parent::node()/parent::node()[not(s-1 or testgrp)]">
		</xsl:if>
		<xsl:apply-templates select="self::symbol"/>
	</xsl:for-each>
</xsl:template>

</xsl:stylesheet>