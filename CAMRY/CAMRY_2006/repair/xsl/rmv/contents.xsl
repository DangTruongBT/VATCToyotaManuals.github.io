<!-- $Id: contents.xsl,v 1.3 2003/10/29 10:11:21 maniwa Exp $ -->
<!--========================================================================-->
<!-- contents.xsl                                                           -->
<!--                                                                        -->
<!--========================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="tmc-service-inc">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="pub">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="servcat">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="section">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="ttl">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="para">
	<xsl:apply-templates select="*[name()!='name']"/>
</xsl:template>

<xsl:template match="subpara">
	<xsl:apply-templates/>
</xsl:template>

<xsl:template match="s-1">
	<br clear="all"/>
	<a>
		<xsl:attribute name="name"><xsl:value-of select="@id"/></xsl:attribute>
	</a>
	<table width="100%" border="1" cellspacing="0" >
		<tr>
			<td>
				<xsl:attribute name="class">
					<xsl:choose>
						<xsl:when test="ptxt[1]/xref">xrefcolor</xsl:when>
						<xsl:otherwise>s1</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:number format="1"/>.
				<xsl:apply-templates select="ptxt[1]"/>
			</td>
			<td align="right">
				<xsl:attribute name="class">
					<xsl:choose>
						<xsl:when test="ptxt[1]/xref">xrefcolor</xsl:when>
						<xsl:otherwise>s1</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:if test="@proc-id">
					<a href="javascript:parent.openMemo('{@id}','{@proc-id}');" style="visibility:hidden">
						<img src="../../img/memo.png" id="{@proc-id}" border="0" />
					</a>
				</xsl:if>
			</td>
		</tr>
	</table>
	<font class="ptxt">
		<xsl:for-each select="ptxt[position() &gt; 1]">
			<xsl:apply-templates select="."/><br/>
		</xsl:for-each>
	</font>
	<xsl:apply-templates select="content1"/>
	<xsl:apply-templates select="content6"/>
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