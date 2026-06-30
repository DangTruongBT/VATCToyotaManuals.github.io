<!-- $Id: _content5.xsl,v 1.3 2003/10/29 02:59:08 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:variable name="content5.THRESHOLD" select="number(3.1)"/>

<xsl:template match="content5">
	<xsl:variable name="ctt-id" select="position()"/>
	<xsl:if test="string(title)">
		<p class="gray4"><xsl:value-of select="title"/></p>
	</xsl:if>
	<xsl:for-each select="child::*">
		<xsl:choose>
			<xsl:when test="name()!='title'">
				<xsl:call-template name="content5.all">
					<xsl:with-param name="ctt-id" select="$ctt-id"/>
					<xsl:with-param name="fig" select="'yes'"/>
				</xsl:call-template>
			</xsl:when>
		</xsl:choose>
	</xsl:for-each>
</xsl:template>

<xsl:template match="step1">
	<xsl:param name="ctt-id"/>
	<br clear="all"/>
	<xsl:element name="a">
		<xsl:attribute name="name"><xsl:value-of select="ancestor::subpara/@proc-id"/><xsl:value-of select="$ctt-id"/><xsl:number level="any"/>step</xsl:attribute>
	</xsl:element>
	<table width="100%" border="1" cellspacing="0">
		<tr>
			<td class="s1">
				<xsl:choose>
					<xsl:when test="ancestor::para[@category='L' or @category='N']">
						<xsl:number format="1."/>
					</xsl:when>
					<xsl:otherwise></xsl:otherwise>
				</xsl:choose>
				<xsl:apply-templates select="ptxt[1]"/>
			</td>
		</tr>
	</table>
	<font class="ptxt">
		<xsl:for-each select="ptxt[position() &gt; 1]">
			<xsl:apply-templates select="."/><br/>
		</xsl:for-each>
	</font>
	<xsl:call-template name="content5.float"></xsl:call-template>
	<xsl:if test="step2">
		<ol class="s2">
			<xsl:apply-templates select="step2"/>
		</ol>
	</xsl:if>
</xsl:template>

<xsl:template match="step2">
	<xsl:if test="figure or child::*/figure">
		<p clear="all"/>
	</xsl:if>
	<li>
		<p>
			<xsl:call-template name="content5.float"></xsl:call-template>
			<xsl:if test="step3">
				<br/>
				<ol class="s3">
					<xsl:apply-templates select="step3"/>
				</ol>
			</xsl:if>
		</p>
	</li>
</xsl:template>

<xsl:template match="step3">
	<xsl:if test="figure">
		<p clear="all"/>
	</xsl:if>
	<li>
		<p>
			<xsl:call-template name="content5.float"></xsl:call-template>
		</p>
	</li>
</xsl:template>

<xsl:template match="topic">
	<ol class="topic">
	<li>
		<xsl:value-of select="title"/><br/>
		<xsl:for-each select="child::*">
			<xsl:call-template name="content5.all">
				<xsl:with-param name="fig" select="'yes'"/>
			</xsl:call-template>
		</xsl:for-each>
	</li>
	</ol>
</xsl:template>

<xsl:template name="content5.float">
	<xsl:param name="ctt-id"/>
	<xsl:choose>
		<xsl:when test="count(figure) &gt;= 1 and number(substring-before(translate(figure/graphic/@width, ' ', ''), 'in')) &lt; $content5.THRESHOLD">
			<table class="float"><tr><td>
				<xsl:apply-templates select="figure"/>
			</td></tr></table>
			<xsl:for-each select="child::*">
				<xsl:call-template name="content5.all">
					<xsl:with-param name="fig" select="'no'"/>
					<xsl:with-param name="ctt-id" select="$ctt-id"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:when>
		<xsl:otherwise>
			<xsl:for-each select="child::*">
				<xsl:call-template name="content5.all">
					<xsl:with-param name="fig" select="'yes'"/>
					<xsl:with-param name="ctt-id" select="$ctt-id"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="content5.all">
	<xsl:param name="ctt-id"/>
	<xsl:param name="fig"/>
	<xsl:choose>
		<xsl:when test="name() ='figure' and $fig != 'no'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name() ='ptxt' and name(parent::node()) !='step1'">
			<font class="ptxt"><xsl:apply-templates select="."/></font><br/>
		</xsl:when>
		<xsl:when test="name()='list1'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name()='spec'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name()='table'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name()='atten2'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name()='atten3'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name()='atten4'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name()='torque'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name()='sst'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name()='topic'">
			<xsl:apply-templates select="."/>
		</xsl:when>
		<xsl:when test="name()='descript-diag'">
			<xsl:apply-templates select=".">
				<xsl:with-param name="ctt-id" select="$ctt-id"/>
			</xsl:apply-templates>
		</xsl:when>
		<xsl:when test="name()='step1'">
			<xsl:apply-templates select=".">
				<xsl:with-param name="ctt-id" select="$ctt-id"/>
			</xsl:apply-templates>
		</xsl:when>
	</xsl:choose>
	<xsl:if test="name(following-sibling::node()[1])='figure' and $fig != 'no'">
		<br clear="all"/>
	</xsl:if>
</xsl:template>

</xsl:stylesheet>
