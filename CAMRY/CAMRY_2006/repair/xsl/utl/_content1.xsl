<!-- $Id: _content1.xsl,v 1.1 2003/09/22 10:54:08 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:variable name="content1.THRESHOLD" select="number(3.1)"/>

<xsl:template match="content1">
	<xsl:if test="figure">
		<br clear="all"/>
	</xsl:if>
	<xsl:call-template name="content1.float"></xsl:call-template>
</xsl:template>

<xsl:template match="s2">
	<xsl:if test="figure or child::*/figure">
		<p clear="all"/>
	</xsl:if>
	<li>
		<xsl:attribute name="value"><xsl:value-of select="count(preceding-sibling::s2)+1"/></xsl:attribute>
		<p>
			<xsl:call-template name="content1.float"></xsl:call-template>
			<xsl:if test="s3">
				<br/>
				<ol class="s3">
					<xsl:apply-templates select="s3"/>
				</ol>
			</xsl:if>
		</p>
	</li>
</xsl:template>

<xsl:template match="s3">
	<xsl:if test="figure">
		<p clear="all"/>
	</xsl:if>
	<li>
		<p>
			<xsl:call-template name="content1.float"></xsl:call-template>
		</p>
	</li>
	<xsl:if test="name(following-sibling::*[1]) !='s3'">
	</xsl:if>
</xsl:template>

<xsl:template name="content1.float">
	<xsl:choose>
		<xsl:when test="count(figure) &gt;= 1 and number(substring-before(translate(figure/graphic/@width, ' ', ''), 'in')) &lt; $content1.THRESHOLD">
			<table class="float"><tr><td>
				<xsl:apply-templates select="figure"/>
			</td></tr></table>
			<xsl:for-each select="child::*">
				<xsl:call-template name="content1.all">
					<xsl:with-param name="fig" select="'no'"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:when>
		<xsl:otherwise>
			<xsl:for-each select="child::*">
				<xsl:call-template name="content1.all">
					<xsl:with-param name="fig" select="'yes'"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="content1.all">
	<xsl:param name="fig"/>
	<xsl:choose>
		<xsl:when test="name() = 's2'">
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
	<xsl:if test="name(following-sibling::*[1])='figure' and $fig != 'no'">
		<br clear="all"/>
	</xsl:if>
</xsl:template>

</xsl:stylesheet>