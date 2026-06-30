<!-- $Id: title_contents.xsl,v 1.6 2004/04/26 05:14:19 k-nagasaka Exp $ -->
<!--========================================================================-->
<!-- title_contents.xsl                                                     -->
<!--                                                                        -->
<!--  for Translation                                                       -->
<!-- 	000 Title                                                           -->
<!-- 	001 Total Number of Steps                                           -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:param name="TITLE">Title</xsl:param>	<!-- 000 -->
<xsl:param name="TOTAL_STEP">Total Number of Steps</xsl:param>	<!-- 001 -->
<xsl:param name="partsId"/>
<xsl:param name="tocXml" select="node()"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-db"/>
</xsl:template>

<xsl:template match="tmc-service-db">
	<table border="1" width="100%" cellspacing="0" cellpadding="0" bordercolor="#ffffff">
		<tr>
			<th class="pointdisplaytitle" width="75%"><b><xsl:value-of select="$TITLE"/></b></th>
			<th class="pointdisplaytitle" width="25%"><b><xsl:value-of select="$TOTAL_STEP"/></b></th>
		</tr>
		<xsl:apply-templates select="pub"/>
	</table>
</xsl:template>

<xsl:template match="pub">
	<xsl:apply-templates select="servcat"/>
</xsl:template>

<xsl:template match="servcat">
	<xsl:apply-templates select="section"/>
</xsl:template>

<xsl:template match="section">
	<xsl:choose>
		<xsl:when test="count(descendant::ttl[para[@category='A'] and child::parts[@id=$partsId]]) &gt; 1">
			<xsl:apply-templates select="ttl" mode="ttl1">
					<xsl:sort select="count(descendant::para[@category='A']/descendant::s-1)" data-type="number" order="ascending"/>
			</xsl:apply-templates>
		</xsl:when>
		<xsl:otherwise>
			<xsl:if test="count(descendant::ttl[para[@category='A']/subpara/s-1/parts[@id=$partsId]]) &gt; 1">
				<xsl:apply-templates select="ttl" mode="ttl2">
					<xsl:sort select="count(descendant::para[@category='A']/descendant::s-1)" data-type="number" order="ascending"/>
				</xsl:apply-templates>
			</xsl:if>
		</xsl:otherwise>
	</xsl:choose>

</xsl:template>

<xsl:template match="ttl" mode="ttl1">
	<xsl:if test="descendant::para[@category='A'] and parts[@id=$partsId]">
		<xsl:call-template name="common"/>
	</xsl:if>
</xsl:template>

<xsl:template match="ttl" mode="ttl2">
	<xsl:if test="descendant::para[@category='A']/descendant::s-1/parts[@id=$partsId]">
		<xsl:call-template name="common"/>
	</xsl:if>
</xsl:template>

<xsl:template name="common">
	<xsl:variable name="ttlId"><xsl:value-of select="@id"/></xsl:variable>
	<tr>
		<td class="tbl-par">
			<a href="#" class="tbl-para">
				<xsl:attribute name="onClick">returnValue='<xsl:value-of select="@id"/>';parent.window.close();</xsl:attribute>
					<xsl:for-each select="$tocXml">
						<xsl:value-of select="//ttl[@id=$ttlId]/name"/>
					</xsl:for-each>
			</a>
		</td>
		<td class="tbl-ttl" align="center">
			<xsl:value-of select="count(descendant::para[@category='A']/descendant::s-1)"/>
		</td>
	</tr>
</xsl:template>
</xsl:stylesheet>