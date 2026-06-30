<!-- $Id: list.xsl,v 1.8 2005/06/03 02:48:08 k-narumi Exp $-->
<!--========================================================================-->
<!-- list.xsl                                                               -->
<!--                                                                        -->
<!--  for Translation                                                       -->
<!--     001 Title                                                          -->
<!--     002 Contents                                                       -->
<!--     003 Maintenance                                                    -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

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
			<th width="20%" class="tbl-head"></th>
			<th width="40%" class="tbl-head">Title</th>      <!-- 001 -->
			<th width="40%" class="tbl-head">Contents</th>   <!-- 002 -->
		</tr>
		<xsl:call-template name="mnt.list"/>
	</table>
</xsl:template>

<xsl:template name="mnt.list">
	<xsl:variable name="mnt.srows" select="count(//para[@category='N'])"/>
	<xsl:for-each select="//para[@category='N']">
		<xsl:variable name="ttlName"><xsl:value-of select="../name"/></xsl:variable>
		<xsl:variable name="secId">
			<xsl:value-of select="substring-before(ancestor::section/@id, '_')"/>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="position()=1">
				<tr>
					<td class="tbl-ttl">
						<xsl:attribute name="rowspan">
							<xsl:value-of select="$mnt.srows"/>
						</xsl:attribute>
						Maintenance
					</td><!-- 003 -->
					<xsl:variable name="mnt.prows" select="count(../para[@category='N'])"/>
					<td class="tbl-ttl">
						<xsl:attribute name="rowspan">
							<xsl:value-of select="$mnt.prows"/>
						</xsl:attribute>
						<xsl:value-of select="../name"/>
						<xsl:if test="(count(//ttl[name=$ttlName]) &gt; 1) or (count(//section[substring-before(@id, '_')=$secId]) &gt; 1)">
							(<xsl:value-of select="ancestor::section/name"/>)
						</xsl:if>
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
				<xsl:choose>
					<!--
					1. 同一タイトル内にメンテナンスパラが自パラグラフより前にある
							⇒ パラ名のみ
					2. 同一タイトル内にメンテナンスパラが自パラグラフより後にある
							⇒ タイトル名(rowspan付き) + パラ名
					3. 同一タイトル内にメンテナンスパラが単独で出現
							⇒ タイトル名 + パラ名
					-->
					<xsl:when test="preceding-sibling::para[@category='N']">
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
					</xsl:when>
					<xsl:when test="following-sibling::para[@category='N']">
						<xsl:variable name="mnt.mrows" select="count(../para[@category='N'])"/>
						<tr>
							<td class="tbl-ttl">
								<xsl:attribute name="rowspan">
									<xsl:value-of select="$mnt.mrows"/>
								</xsl:attribute>
								<xsl:value-of select="../name"/>
								<xsl:if test="(count(//ttl[name=$ttlName]) &gt; 1) or (count(//section[substring-before(@id, '_')=$secId]) &gt; 1)">
									(<xsl:value-of select="ancestor::section/name"/>)
								</xsl:if>
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
							<td class="tbl-ttl">
								<xsl:value-of select="../name"/>
								<xsl:if test="(count(//ttl[name=$ttlName]) &gt; 1) or (count(//section[substring-before(@id, '_')=$secId]) &gt; 1)">
									(<xsl:value-of select="ancestor::section/name"/>)
								</xsl:if>
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
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:for-each>
</xsl:template>

</xsl:stylesheet>