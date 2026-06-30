<!-- $Id: _content6.xsl,v 1.1 2003/09/22 10:54:08 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:variable name="content6.THRESHOLD" select="number(3.1)"/>

<xsl:template match="content6">
	<xsl:choose>
		<xsl:when test="count(figure) &gt;= 1 and number(substring-before(translate(figure/graphic/@width, ' ', ''), 'in')) &lt; $content6.THRESHOLD">
			<table class="float"><tr><td>
				<xsl:apply-templates select="figure"/>
			</td></tr></table>
			<xsl:for-each select="child::*">
				<xsl:call-template name="content6.all">
					<xsl:with-param name="fig" select="'no'"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:when>
		<xsl:otherwise>
			<xsl:for-each select="child::*">
				<xsl:call-template name="content6.all">
					<xsl:with-param name="fig" select="'yes'"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="content6.all">
	<xsl:param name="fig"/>
	<xsl:choose>
		<xsl:when test="name() = 'test1'">
			<ol class="s2">
				<xsl:apply-templates select="."/>
			</ol>
		</xsl:when>
		<xsl:when test="name() ='figure' and $fig != 'no'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name() ='ptxt'">
			<font class="ptxt"><xsl:apply-templates select="."/></font><br/>
		</xsl:when>
		<xsl:when test="name() ='list1'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name() ='spec'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name() ='table'">
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
		<xsl:when test="name() ='torque'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name() ='sst'">
			<xsl:apply-templates select="."/>
		</xsl:when>
	</xsl:choose>
	<xsl:if test="name(following-sibling::node()[1])='figure' and $fig != 'no'">
		<br clear="all"/>
	</xsl:if>
</xsl:template>

</xsl:stylesheet>