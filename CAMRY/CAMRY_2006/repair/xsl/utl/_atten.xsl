<!-- $Id: _atten.xsl,v 1.2 2004/04/26 05:16:28 k-nagasaka Exp $ -->
<!--========================================================================-->
<!-- for Translation                                                        -->
<!--  000 CAUTION:                                                          -->
<!--  001 NOTICE:                                                           -->
<!--  002 HINT:                                                             -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:variable name="atten.THRESHOLD" select="number(3.1)"/>

<xsl:template match="atten2">
	<xsl:if test="figure">
		<br clear="all"/>
	</xsl:if>
	<xsl:if test="table">
		<xsl:variable name="table.fullwidth">
			<xsl:call-template name="fullWidth">
				<xsl:with-param name="colwid" select="table/tgroup/colspec"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:if test="$table.fullwidth &gt; 4.2 and not(figure)">
			<br clear="all"/>
		</xsl:if>
	</xsl:if>
	<p>
	<dl class="warning">
		<dt class="warning">CAUTION:</dt><!-- 000 -->
		<dt class="warning"><xsl:value-of select="title"/></dt>
		<xsl:call-template name="atten.float">
		  <xsl:with-param name="atten" select="'warning'"/>
		</xsl:call-template>
	</dl>
	</p>
</xsl:template>

<xsl:template match="atten3">
	<xsl:if test="figure">
		<br clear="all"/>
	</xsl:if>
	<xsl:if test="table">
		<xsl:variable name="table.fullwidth">
			<xsl:call-template name="fullWidth">
				<xsl:with-param name="colwid" select="table/tgroup/colspec"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:if test="$table.fullwidth &gt; 4.2 and not(figure)">
			<br clear="all"/>
		</xsl:if>
	</xsl:if>
	<p>
	<dl class="caution">
		<dt class="caution">NOTICE:</dt><!-- 001 -->
		<dt class="caution"><xsl:value-of select="title"/></dt>
		<xsl:call-template name="atten.float">
			<xsl:with-param name="atten" select="'caution'"/>
		</xsl:call-template>
	</dl>
	</p>
</xsl:template>

<xsl:template match="atten4">
	<xsl:if test="figure">
		<br clear="all"/>
	</xsl:if>
	<xsl:if test="table">
		<xsl:variable name="table.fullwidth">
			<xsl:call-template name="fullWidth">
				<xsl:with-param name="colwid" select="table/tgroup/colspec"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:if test="$table.fullwidth &gt; 4.2 and not(figure)">
			<br clear="all"/>
		</xsl:if>
	</xsl:if>
	<p>
	<dl class="reference">
		<dt class="reference">HINT:</dt><!-- 002 -->
		<dt class="reference"><xsl:value-of select="title"/></dt>
		<xsl:call-template name="atten.float">
			<xsl:with-param name="atten" select="'reference'"/>
		</xsl:call-template>
	</dl>
	</p>
</xsl:template>

<xsl:template name="atten.all">
	<xsl:param name="fig"/>
	<xsl:param name="atten"/>
		<xsl:for-each select="child::*">
			<xsl:choose>
			<xsl:when test="name() ='figure' and $fig != 'no'">
				<dd>
					<xsl:attribute name="class"><xsl:value-of select="$atten"/></xsl:attribute>
					<xsl:apply-templates select="."/>
				</dd>
			</xsl:when>
			<xsl:when test="name() ='ptxt'">
				<dd>
					<xsl:attribute name="class"><xsl:value-of select="$atten"/></xsl:attribute>
					<xsl:apply-templates select="."/>
				</dd>
			</xsl:when>
			<xsl:when test="name() ='list1'">
				<dd>
					<xsl:attribute name="class"><xsl:value-of select="$atten"/></xsl:attribute>
					<xsl:apply-templates select="."/>
				</dd>
			</xsl:when>
			<xsl:when test="name() ='table'">
				<dd>
					<xsl:attribute name="class"><xsl:value-of select="$atten"/></xsl:attribute>
					<xsl:apply-templates select="."/>
				</dd>
			</xsl:when>
			</xsl:choose>
		</xsl:for-each>
	</xsl:template>

<xsl:template name="atten.float">
	<xsl:param name="atten"/>
	<xsl:choose>
		<xsl:when test="count(figure) &gt;= 1 and number(substring-before(translate(figure/graphic/@width, ' ', ''), 'in')) &lt; $atten.THRESHOLD">
			<table class="float"><tr><td>
			<dd><xsl:apply-templates select="figure"/></dd>
			</td></tr></table>
				<xsl:call-template name="atten.all">
					<xsl:with-param name="fig" select="'no'"/>
					<xsl:with-param name="atten" select="$atten"/>
				</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
				<xsl:call-template name="atten.all">
					<xsl:with-param name="fig" select="'yes'"/>
					<xsl:with-param name="atten" select="$atten"/>
				</xsl:call-template>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template> 

</xsl:stylesheet>