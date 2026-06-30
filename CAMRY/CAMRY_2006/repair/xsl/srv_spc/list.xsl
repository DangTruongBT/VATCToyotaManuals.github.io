<!-- $Id: list.xsl,v 1.9 2004/04/26 05:14:28 k-nagasaka Exp $ -->
<!--========================================================================-->
<!-- list.xsl                                                               -->
<!--                                                                        -->
<!--  for Translation                                                       -->
<!--     001 Section                                                        -->
<!--     002 Title                                                          -->
<!--     003 Contents                                                       -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:variable name="srvdataNo">10004_</xsl:variable>
<xsl:param name="tablewidth">98%</xsl:param>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-db"/>
</xsl:template>

<xsl:template match="tmc-service-db">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<table align="center" width="{$tablewidth}" border="1" cellspacing="0" cellpadding="0" bordercolor="#ffffff">
		<tr>
			<!--a name="{servcat/section[starts-with(@id, $srvdataNo)]/@id}"/-->
			<th width="20%" class="tbl-head">Section</th>    <!-- 001 -->
			<th width="40%" class="tbl-head">Title</th>      <!-- 002 -->
			<th width="40%" class="tbl-head">Contents</th>   <!-- 003 -->
		</tr>
		<xsl:apply-templates select="servcat/section[starts-with(@id, $srvdataNo)]"/>
	</table>
</xsl:template>

<xsl:template match="section">
	<xsl:apply-templates select="ttl[para[string-length('@id')>0]]"/>
</xsl:template>

<xsl:template match="ttl">
	<xsl:choose>
		<xsl:when test="position()=1">
		<xsl:variable name="srvdata.srows" select="count(..//para)"/>
			<tr>
				<td class="tbl-ttl">
					<xsl:attribute name="rowspan">
						<xsl:value-of select="$srvdata.srows"/>
					</xsl:attribute>
					<xsl:value-of select="parent::section/name"/>
				</td>
				<xsl:variable name="srvdata.prows" select="count(.//para)"/>
				<td class="tbl-ttl">
					<xsl:attribute name="rowspan">
						<xsl:value-of select="$srvdata.prows"/>
					</xsl:attribute>
					<xsl:value-of select="name"/>
				</td>
				<td class="tbl-par">
					<a class="tbl-para" target="_top">
						<xsl:attribute name="href">
							javascript:parent.selectTypedLocation('<xsl:value-of select="para[1]/@id"/>', '<xsl:value-of select="para[1]/@category"/>');
						</xsl:attribute>
						<xsl:value-of select="para[1]/name"/>
					</a>
				</td>
			</tr>
			<!-- 第2パラグラフ以降 -->
			<xsl:for-each select="para[position()>1]">
				<tr>
					<td class="tbl-par">
						<a class="tbl-para" target="_top">
							<xsl:attribute name="href">
								javascript:parent.selectTypedLocation('<xsl:value-of select="@id"/>', '<xsl:value-of select="@category"/>');
							</xsl:attribute>
							<xsl:value-of select="name"/>
						</a>
					</td>
				</tr>
			</xsl:for-each>
		</xsl:when>
		<xsl:otherwise>
 			<xsl:apply-templates select="para"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="para">
	<xsl:choose>
		<xsl:when test="position()=1">
			<xsl:variable name="srvdata.prows" select="count(..//para)"/>
			<tr>
				<td class="tbl-ttl">
					<xsl:attribute name="rowspan">
						<xsl:value-of select="$srvdata.prows"/>
					</xsl:attribute>
					<xsl:value-of select="parent::ttl/name"/>
				</td>
				<td class="tbl-par">
					<a class="tbl-para" target="_top">
						<xsl:attribute name="href">
							javascript:parent.selectTypedLocation('<xsl:value-of select="@id"/>', '<xsl:value-of select="@category"/>');
						</xsl:attribute>
						<xsl:value-of select="name"/>
					</a>
				</td>
			</tr>
		</xsl:when>
		<xsl:otherwise>
			<tr>
				<td class="tbl-par">
					<a class="tbl-para" target="_top">
						<xsl:attribute name="href">
							javascript:parent.selectTypedLocation('<xsl:value-of select="@id"/>', '<xsl:value-of select="@category"/>');
						</xsl:attribute>
						<xsl:value-of select="name"/>
					</a>
				</td>
			</tr>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

</xsl:stylesheet>