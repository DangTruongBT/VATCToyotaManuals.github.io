<!-- $Id: tips.xsl,v 1.3 2004/04/26 05:17:36 k-nagasaka Exp $ -->
<!--========================================================================-->
<!-- for Translation                                                        -->
<!--                                                                        -->
<!--  000 Date                                                              -->
<!--  001 Tips No.                                                          -->
<!--  002 Subject                                                           -->
<!--========================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-tips"/>
</xsl:template>

<xsl:template match="tmc-service-tips">
	<table width="100%" border="1" cellspacing="0" cellpadding="0" bordercolor="#ffffff">
		<tr>
			<th class="tbl-head">Date</th>    <!-- 000 -->
			<th class="tbl-head">Tips No.</th><!-- 001 -->
			<th class="tbl-head">Subject</th> <!-- 002 -->
		</tr>
		<xsl:apply-templates/>
	</table>
</xsl:template>

<xsl:template match="tips">
	<tr>
		<td class="tbl-ttl"><xsl:value-of select="@date"/></td>
		<td class="tbl-ttl"><xsl:value-of select="@id"/></td>
		<td class="tbl-par">
			<xsl:element name="a">
				<xsl:attribute name="href">#</xsl:attribute>
				<xsl:attribute name="onClick">javascript:openTips('<xsl:value-of select="@url"/>')</xsl:attribute>
				<xsl:attribute name="class">tbl-para</xsl:attribute>
				<xsl:value-of select="child::subject"/>
			</xsl:element>
		</td>
	</tr>
</xsl:template>

</xsl:stylesheet>