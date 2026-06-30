<!-- $Id: _diag.xsl,v 1.3 2004/02/24 16:12:00 kato Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:variable name="diag.THRESHOLD" select="number(3.1)"/>

<xsl:template match="descript-diag">
	<xsl:param name="ctt-id"/>
	<xsl:value-of select="title"/><br/>
	<xsl:apply-templates select="descript-testgroup">
		<xsl:with-param name="ctt-id" select="$ctt-id"/>
	</xsl:apply-templates>
</xsl:template>

<xsl:template match="descript-testgroup">
	<xsl:param name="ctt-id"/>
	<xsl:element name="a">
		<xsl:attribute name="name">
			<xsl:value-of select="ancestor::subpara/@proc-id"/><xsl:value-of select="$ctt-id"/><xsl:number level="any"/>
		</xsl:attribute>
	</xsl:element>
	<table width="100%" border="1" cellspacing="0" cellpadding="2">
		<tr>
			<td class="s1">
				<!--START SEEP表示改善対応　20040205-->
				<xsl:number format="1."/><xsl:apply-templates select="testtitle"/>
				<!--xsl:number format="1."/><xsl:value-of select="testtitle"/-->
				<!--END SEEP表示改善対応　20040205-->
			</td>
		</tr>
	</table>
	<xsl:apply-templates select="scantool"/>
	<ol class="s2">
	<xsl:call-template name="diag.float"/>
	</ol>
<!--
	<ol class="s2">
		<xsl:apply-templates select="test1"/>
	</ol>
-->
	<xsl:apply-templates select="results"/>
</xsl:template>

<xsl:template name="diag.all">
	<xsl:param name="fig"/>
		<xsl:choose>
			<xsl:when test="name() ='title'">
				<xsl:value-of select="title"/>
			</xsl:when>
			<xsl:when test="name() ='spec'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='sst'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='torque'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='atten2'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='atten3'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='atten4'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='figure' and $fig != 'no'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='list1'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='table'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='ptxt'">
				<font class="ptxt"><xsl:apply-templates select="."/></font>
			</xsl:when>
			<xsl:when test="name() ='test1'">
				<xsl:apply-templates select="."/>
			</xsl:when>
		</xsl:choose>
		<xsl:if test="name(following-sibling::*[1])='figure' and $fig != 'no'"> 
			<br clear="all"/>
		</xsl:if>
</xsl:template>

<xsl:template name="diag.float">
	<xsl:choose>
		<xsl:when test="count(figure) &gt;= 1 and number(substring-before(translate(figure/graphic/@width, ' ', ''), 'in')) &lt; $diag.THRESHOLD">
			<table class="float"><tr><td>
				<xsl:apply-templates select="figure"/>
			</td></tr></table>
			<xsl:for-each select="child::*">
				<xsl:call-template name="diag.all">
					<xsl:with-param name="fig" select="'no'"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:when>
		<xsl:otherwise>
			<xsl:for-each select="child::*">
				<xsl:call-template name="diag.all">
					<xsl:with-param name="fig" select="'yes'"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>
</xsl:stylesheet>

