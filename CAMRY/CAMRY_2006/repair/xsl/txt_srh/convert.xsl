<!-- $Id: convert.xsl,v 1.3 2004/04/26 05:16:11 k-nagasaka Exp $ -->
<!--========================================================================-->
<!--  convert.xsl                                                           -->
<!--                                                                        -->
<!--========================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="xml" indent="no" encoding="UTF-8" />

<xsl:template match="/">
	<tmc-service-search>
	<xsl:apply-templates select="pub/servcat/section/ttl/para/p">
		<xsl:sort select="@w" data-type="number" order="descending"/>
		<xsl:sort order="ascending"/>
	</xsl:apply-templates>
	</tmc-service-search>
</xsl:template>

<xsl:template match="p">
	<xsl:element name="hititem">
		<xsl:attribute name="category">
			<xsl:value-of select="ancestor::para/@category" />
		</xsl:attribute>
		<xsl:attribute name="paraid">
			<xsl:value-of select="ancestor::para/@id" />
		</xsl:attribute>
		<xsl:attribute name="procid">
			<xsl:value-of select="@id" />
		</xsl:attribute>
		<xsl:element name="dispstr">
			<xsl:value-of select="ancestor::servcat/@t" /> &gt; 
			<xsl:value-of select="ancestor::ttl/@t" /> &gt; 
			<xsl:value-of select="ancestor::para/name" />
			<xsl:if test="not(count(@t) = 0 or @t = '')"> &gt; <xsl:value-of select="@t" /> </xsl:if>
		</xsl:element>
	</xsl:element>
</xsl:template>

</xsl:stylesheet>
