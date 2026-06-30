<!-- $Id: symptomlist.xsl,v 1.4 2006/01/19 04:34:51 k-narumi Exp $ -->
<!--======================================================================-->
<!--  symptomlist.xsl                                                     -->
<!--                                                                      -->
<!--  for Translation                                                     -->
<!--    000 Symptom                                                       -->
<!--    001 Suspected Area                                                -->
<!--======================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xlink="http://www.w3.org/1999/xlink" exclude-result-prefixes="xlink" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:param name="prt">0</xsl:param>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-inc"/>
</xsl:template>

<xsl:template match="tmc-service-inc">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<xsl:apply-templates select="servcat"/>
</xsl:template>

<xsl:template match="servcat">
	<xsl:apply-templates select="section"/>
</xsl:template>

<xsl:template match="section">
	<xsl:apply-templates select="ttl"/>
</xsl:template>

<xsl:template match="ttl">
	<xsl:apply-templates select="para"/>
</xsl:template>

<xsl:template match="para">
	<xsl:apply-templates select="subpara"/>
</xsl:template>

<xsl:template match="subpara">
	<xsl:apply-templates select="content5"/>
</xsl:template>

<xsl:template match="content5">
	<xsl:apply-templates select="descendant::table"/>
</xsl:template>

<xsl:template match="table">
	<table border="1" cellpadding="0" cellspacing="0" width="100%" bordercolor="#ffffff">
		<caption class="tbl-title"><xsl:value-of select="title"/></caption>
		<tr>
			<th width="40%" class="tbl-head">Symptom</th><!-- 000 -->
			<th width="60%" class="tbl-head">Suspected Area</th><!-- 001 -->
		</tr>
		<xsl:apply-templates select="tgroup"/>
	</table>
	<br/>
</xsl:template>

<xsl:template match="tgroup">
	<xsl:apply-templates select="tbody"/>
</xsl:template>

<xsl:template match="tbody">
	<xsl:apply-templates select="row"/>
</xsl:template>

<xsl:template match="row">
	<tr>
		<xsl:apply-templates select="entry">
			<xsl:with-param name="rowPosition" select="position()"/>
		</xsl:apply-templates>
	</tr>
</xsl:template>

<xsl:template match="entry[position()!=last()]">
	<xsl:param name="rowPosition"/>
	<xsl:element name="td">
		<xsl:if test="@morerows">
			<xsl:attribute name="rowspan">
				<xsl:value-of select="number(@morerows)+1"/>
			</xsl:attribute>
		</xsl:if>
		<xsl:attribute name="class">
			<xsl:choose>
				<xsl:when test="count(following-sibling::entry)=2 and position()=1">tbl-ttl</xsl:when>
				<xsl:otherwise>tbl-par</xsl:otherwise>
			</xsl:choose>
		</xsl:attribute>
		<xsl:choose>
			<xsl:when test="count(following-sibling::entry)=2 and position()=1">
				<xsl:value-of select="ptxt"/>
			</xsl:when>
			<xsl:when test="following-sibling::entry//xref">
				<xsl:element name="a">
					<xsl:choose>
						<xsl:when test="boolean(number($prt))"></xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="href">javascript:selectSuspectArea('<xsl:value-of select="following-sibling::entry//xref/@href"/>')</xsl:attribute>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:attribute name="class">tbl-para</xsl:attribute>
					<xsl:value-of select="ptxt"/>
				</xsl:element>
			</xsl:when>
			<xsl:otherwise>
				<a class="tbl-para"><xsl:value-of select="ptxt"/></a>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:element>
</xsl:template>

<xsl:template match="entry[position()=last()]">
</xsl:template>

</xsl:stylesheet>
