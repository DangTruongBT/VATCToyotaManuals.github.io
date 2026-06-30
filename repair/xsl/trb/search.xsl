<!-- $Id: search.xsl,v 1.3 2004/04/26 05:15:36 k-nagasaka Exp $ -->
<!--========================================================================-->
<!-- for Translation                                                        -->
<!--    000 DTC Code                                                        -->
<!--    001 Detection Item                                                  -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:param name="code"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-db"/>
</xsl:template>

<xsl:template match="tmc-service-db">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<xsl:apply-templates select="servcat"/>
	</table>
</xsl:template>

<xsl:template match="servcat">
	<xsl:apply-templates select="section"/>
</xsl:template>

<xsl:template match="section">
	<xsl:apply-templates select="ttl"/>
</xsl:template>

<xsl:template match="ttl">
	<xsl:choose>
		<xsl:when test="string-length($code)=5">
			<xsl:if test="dtc/dtccode[starts-with(., $code)]">
				<tr><td><br/></td></tr>
				<tr>
					<td align="left">
						<xsl:value-of select="parent::section/name"/> &gt; <xsl:value-of select="name"/>
						<table width="100%" border="1" cellspacing="0" cellpadding="0" bordercolor="#ffffff">
							<xsl:apply-templates select="dtc/dtccode[starts-with(., $code)]"/>
						</table>
					</td>
				</tr>
			</xsl:if>
		</xsl:when>
		<xsl:when test="string-length($code)=2">
			<xsl:if test="dtc/dtccode[substring(., 7, 2)=$code or .=$code]">
				<tr><td><br/></td></tr>
				<tr>
					<td align="left">
						<xsl:value-of select="parent::section/name"/> &gt; <xsl:value-of select="name"/>
						<table width="100%" border="1" cellspacing="0" cellpadding="0" bordercolor="#ffffff">
							<xsl:apply-templates select="dtc/dtccode[substring(., 7, 2)=$code or .=$code]"/>
						</table>
					</td>
				</tr>
			</xsl:if>
		</xsl:when>
	</xsl:choose>
</xsl:template>

<xsl:template match="dtc">
	<xsl:apply-templates select="dtccode"/>
</xsl:template>

<xsl:template match="dtccode">
	<xsl:if test="position()=1">
		<tr class="tbl-head">
			<td width="25%">DTC Code</td><!-- 000 -->
			<td width="75%">Detection Item</td><!-- 001 -->
		</tr>
	</xsl:if>
	<tr>
		<td width="25%" class="tbl-par">
			<xsl:element name="a">
				<xsl:attribute name="href">
					javascript:parent.selectDtc('<xsl:value-of select="parent::dtc/@id"/>');
				</xsl:attribute>
				<xsl:attribute name="class">tbl-para</xsl:attribute>
				<xsl:value-of select="."/>
			</xsl:element>
		</td>
		<td width="75%" class="tbl-ttl">
			<xsl:value-of select="following-sibling::detection-item"/>
		</td>
	</tr>
</xsl:template>

</xsl:stylesheet>