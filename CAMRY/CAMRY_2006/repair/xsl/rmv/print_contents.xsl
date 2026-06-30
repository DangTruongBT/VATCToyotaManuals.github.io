<!-- $Id: print_contents.xsl,v 1.5 2004/01/08 05:40:57 takeo Exp $ -->
<!--========================================================================-->
<!-- print_contents.xsl                                                     -->
<!--                                                                        -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-inc" />
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
	<form name="f1">
		<xsl:apply-templates select="subpara"/>
	</form>
</xsl:template>

<xsl:template match="subpara">
	<xsl:apply-templates select="s-1"/>
</xsl:template>

<xsl:template match="s-1">
	<div>
		<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
		<xsl:if test="position()=1">
			<xsl:apply-templates select="ancestor::para/subpara[1]/content3"/>
		</xsl:if>
		<table width="100%" cellspacing="0" border="1">
			<tr>
				<td>
				<xsl:attribute name="class">
					<xsl:choose>
						<xsl:when test="ptxt[1]/xref">xrefcolor</xsl:when>
						<xsl:otherwise>s1</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<input>
					<xsl:attribute name="type">checkbox</xsl:attribute>
					<xsl:attribute name="name">
						<xsl:value-of select="@id"/>
					</xsl:attribute>
				</input>
				<xsl:number format="1"/>.
				<xsl:apply-templates select="ptxt[1]"/>
				</td>
			</tr>
		</table>
		<font class="ptxt"><xsl:call-template name="content.ptxt"/></font>
		<xsl:apply-templates select="content1"/>
		<xsl:apply-templates select="content6"/>
		<br clear="all"/>
	</div>
</xsl:template>

<xsl:template name="content.ptxt">
	<xsl:for-each select="ptxt[position() &gt; 1]">
		<xsl:value-of select="."/><br/>
	</xsl:for-each>
</xsl:template>

<xsl:include href="../utl/_content1.xsl"/>
<xsl:include href="../utl/_content3.xsl"/>
<xsl:include href="../utl/_content6.xsl"/>

<xsl:include href="../utl/_diag.xsl"/>
<xsl:include href="../utl/_testtitle.xsl"/>
<xsl:include href="../utl/_test1.xsl"/>
<xsl:include href="../utl/_results.xsl"/>

<xsl:include href="../utl/_table.xsl"/>
<xsl:include href="../utl/_figure.xsl"/>
<xsl:include href="../utl/_ptxt.xsl"/>
<xsl:include href="../utl/_list.xsl"/>
<xsl:include href="../utl/_sst.xsl"/>
<xsl:include href="../utl/_torque.xsl"/>
<xsl:include href="../utl/_atten.xsl"/>
<xsl:include href="../utl/_spec.xsl"/>
<xsl:include href="../utl/_xref.xsl"/>
<xsl:include href="../utl/_symbol.xsl"/>
<xsl:include href="../utl/_modifier.xsl"/>

</xsl:stylesheet>