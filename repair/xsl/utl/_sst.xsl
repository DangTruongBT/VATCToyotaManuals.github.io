<!-- $Id: _sst.xsl,v 1.2 2004/04/26 05:16:48 k-nagasaka Exp $ -->
<!--========================================================================-->
<!-- for Translation                                                        -->
<!--  000 SST                                                               -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="sst">
<dl class="sst">
	<dt class="sst">SST</dt><!-- 000 -->
	<dd class="sst">
		<xsl:apply-templates select="sstitem"/>
	</dd>
</dl>
</xsl:template>

<xsl:template match="sstitem">
	<xsl:apply-templates select="s-number"/>
	<xsl:if test="s-subnumber">
		(<xsl:apply-templates select="s-subnumber"/>)
	</xsl:if>
	<xsl:if test="string(ptxt)">
		<br/><xsl:apply-templates select="ptxt"/>
	</xsl:if>
	<br/>
</xsl:template>

<xsl:template match="s-number">
	<xsl:value-of select="."/><xsl:text>&#160;&#160;</xsl:text>
</xsl:template>

<xsl:template match="s-subnumber">
	<xsl:value-of select="."/>
	<xsl:if test="position()!=last()">,&#160;</xsl:if>
</xsl:template>

</xsl:stylesheet>