<!-- $Id: _table.xsl,v 1.5 2005/07/19 09:09:51 k-narumi Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="table">
	<xsl:variable name="level" select="count(ancestor::*)"/>
	<xsl:variable name="table.fullwidth">
		<xsl:call-template name="fullWidth">
			<xsl:with-param name="colwid" select="tgroup/colspec"/>
		</xsl:call-template>
	</xsl:variable>
	<xsl:element name="table">
		<xsl:attribute name="border">1</xsl:attribute>
		<xsl:attribute name="cellspacing">0</xsl:attribute>
		<xsl:attribute name="cellpadding">2</xsl:attribute>
		<xsl:choose>
			<xsl:when test="//content4">
				<xsl:attribute name="width">98%</xsl:attribute>
			</xsl:when>
			<xsl:when test="$table.fullwidth &gt; 4.2">
				<xsl:attribute name="width">
					<xsl:choose>
						<xsl:when test="$level &lt; 10">98%</xsl:when>
						<xsl:when test="ancestor::s-1 or ancestor::testgrp">
							<xsl:value-of select="100-5.4*($level -9)" />%
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="100-3.5*($level -8)" />%
						</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
			</xsl:when>
			<xsl:when test="$table.fullwidth &gt; 0 and $table.fullwidth &lt;= 4.2">
				<xsl:attribute name="width">
					<xsl:choose>
						<xsl:when test="$level &lt; 10">
							48%
						</xsl:when>
						<xsl:when test="ancestor::s-1 or ancestor::testgrp">
							<xsl:value-of select="48-2.4*($level -9)" />%
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="48-1.6*($level -8)" />%
						</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
			</xsl:when>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="title and ancestor::para[@category != 'B']">
				<caption class="tbl-title"><xsl:value-of select="title"/>&#160;</caption>
			</xsl:when>
			<xsl:when test="string(title) and ancestor::para[@category = 'B']">
				<caption class="tbl-title"><xsl:value-of select="ancestor::para/name"/> / <xsl:value-of select="title"/></caption>
			</xsl:when>
			<xsl:when test="not(string(title)) and ancestor::para[@category = 'B']">
				<caption class="tbl-title"><xsl:value-of select="ancestor::para/name"/></caption>
			</xsl:when>
		</xsl:choose>
		<xsl:apply-templates select="tgroup"/>
		<xsl:apply-templates select="ptxt"/>
	</xsl:element>
</xsl:template>

<xsl:template match="tgroup">
	<xsl:variable name="table.fullwidth">
		<xsl:call-template name="fullWidth">
			<xsl:with-param name="colwid" select="colspec"/>
		</xsl:call-template>
	</xsl:variable>
	<xsl:for-each select="colspec">
		<xsl:element name="colgroup">
			<xsl:attribute name="align"><xsl:value-of select="ancestor::tgroup/@align"/></xsl:attribute>
			<xsl:variable name="table.cellwidth" select="substring-before(translate(@colwidth, ' ', ''), 'in')"/>
			<xsl:attribute name="width">
				<xsl:value-of select="round($table.cellwidth div $table.fullwidth * 100)"/>%
			</xsl:attribute>
			<xsl:element name="col">
				<xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
			</xsl:element>
		</xsl:element>
	</xsl:for-each>
	<xsl:apply-templates select="thead"/>
	<xsl:apply-templates select="tbody"/>
</xsl:template>

<xsl:template match="thead">
	<xsl:apply-templates select="row"/>
</xsl:template>

<xsl:template match="tbody">
	<xsl:apply-templates select="row"/>
</xsl:template>

<xsl:template match="row">
	<tr>
		<xsl:apply-templates select="entry"/>
	</tr>
</xsl:template>

<xsl:template match="entry">
	<xsl:param name="table.tag"/>
	<xsl:variable name="pos" select="position()"/>
<!--
	<xsl:variable name="table.cellwidth" select="substring-before(translate(ancestor::tgroup/colspec[$pos]/@colwidth, ' ', ''), 'in')"/>
-->
	<xsl:variable name="table.fullwidth">
		<xsl:call-template name="fullWidth">
			<xsl:with-param name="colwid" select="ancestor::tgroup/colspec"/>
		</xsl:call-template>
	</xsl:variable>
	<xsl:element name="td">
		<xsl:if test="string(@morerows)">
			<xsl:attribute name="rowspan">
				<xsl:value-of select="number(@morerows)+1"/>
			</xsl:attribute>
		</xsl:if>
		<xsl:if test="string(@namest) and string(@nameend)">
			<xsl:variable name="nst"><xsl:value-of select="@namest"/></xsl:variable>
			<xsl:variable name="ned"><xsl:value-of select="@nameend"/></xsl:variable>
			<xsl:variable name="stpos">
				<xsl:for-each select="ancestor::*/preceding-sibling::colspec">
					<xsl:if test="@colname=$nst">
						<xsl:value-of select="position()"/>
					</xsl:if>
				</xsl:for-each>
			</xsl:variable>
			<xsl:variable name="edpos">
				<xsl:for-each select="ancestor::*/preceding-sibling::colspec">
					<xsl:if test="@colname=$ned">
						<xsl:value-of select="position()"/>
					</xsl:if>
				</xsl:for-each>
			</xsl:variable>
			<xsl:attribute name="colspan">
				<xsl:variable name="span"><xsl:value-of select="($edpos - $stpos)+1"/></xsl:variable>
				<xsl:choose>
					<xsl:when test="$span &gt; 0"><xsl:value-of select="$span"/></xsl:when>
					<xsl:otherwise>1</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="width">
				<xsl:variable name="table.cellwidth">
					<xsl:call-template name="sumwidth">
						<xsl:with-param name="width" select="number(substring-before(translate(ancestor::tgroup/colspec[number($stpos)]/@colwidth, ' ', ''), 'in'))"/>
						<xsl:with-param name="roop_cnt" select="$edpos - $stpos"/>
						<xsl:with-param name="edpos" select="$edpos"/>
					</xsl:call-template>
				</xsl:variable>
				<xsl:value-of select="round($table.cellwidth div $table.fullwidth * 100)"/>%
			</xsl:attribute>
		</xsl:if>
		<xsl:if test="@align != ''">
			<xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
		</xsl:if>
<!--
		<xsl:attribute name="width">
			<xsl:value-of select="round($table.cellwidth div $table.fullwidth * 100)"/>%
		</xsl:attribute>
-->
		<xsl:if test="title">
			<xsl:value-of select="title"/><br/>
		</xsl:if>
		<xsl:for-each select="child::*">
			<xsl:choose>
				<xsl:when test="name()='ptxt'">
					<xsl:apply-templates select="."/><br/>
				</xsl:when>
				<xsl:otherwise><xsl:apply-templates select="."/></xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
		<xsl:if test="not(string(node()))"><br/></xsl:if>
	</xsl:element>
</xsl:template>

<xsl:template name="fullWidth">
	<xsl:param name="colwid"/>
	<xsl:choose>
		<xsl:when test="$colwid">
			<xsl:variable name="recur_res">
				<xsl:call-template name="fullWidth">
					<xsl:with-param name="colwid" select="$colwid[position() > 1]"/>
				</xsl:call-template>
			</xsl:variable>
			<xsl:value-of select="number(substring-before(translate($colwid[1]/@colwidth, ' ', ''), 'in')) + $recur_res"/>
		</xsl:when>
		<xsl:otherwise>0</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="sumwidth">
	<xsl:param name="width"/>
	<xsl:param name="roop_cnt"/>
	<xsl:param name="edpos"/>
	<xsl:choose>
		<xsl:when test="$roop_cnt &gt; 0">
			<xsl:variable name="nextwidth">
				<xsl:call-template name="sumwidth">
					<xsl:with-param name="width" select="number(substring-before(translate(ancestor::tgroup/colspec[number($edpos - $roop_cnt + 1)]/@colwidth, ' ', ''), 'in'))"/>
					<xsl:with-param name="roop_cnt" select="$roop_cnt - 1"/>
					<xsl:with-param name="edpos" select="$edpos"/>
				</xsl:call-template>
			</xsl:variable>
			<xsl:value-of select="$width + $nextwidth"/>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$width"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

</xsl:stylesheet>