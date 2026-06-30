<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="xml" version="4.0" encoding="UTF-8"/>
<xsl:param name="filter" select="node()"/>

<xsl:template match="tmc-service-db | pub | servcat | para | subpara | s-1 | name | shortname | bits | bitptn | illust |parts | dtc | dtccode | detection-item | p">
	<xsl:copy>
		<xsl:copy-of select="@*"/>
		<xsl:apply-templates/>
	</xsl:copy>
</xsl:template>

<xsl:template match="section | ttl">
	<xsl:value-of select="$filter//name"/>
	<xsl:variable name="elemId" select="@id"/>
	<xsl:if test="$filter//descendant::*[@id=$elemId]/@visible!='no' or not($filter//descendant::*[@id=$elemId]/@visible)">
		<xsl:copy>
			<xsl:copy-of select="@*"/>
			<xsl:apply-templates/>
		</xsl:copy>
	</xsl:if>
</xsl:template>

</xsl:stylesheet>