<!-- $Id: _figure.xsl,v 1.3 2003/10/27 06:40:39 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:variable name="figure.THRESHOLD" select="number(3.1)"/>

<xsl:template match="figure">
	<xsl:value-of select="title"/>
	<xsl:apply-templates select="atten2"/>
	<xsl:apply-templates select="atten3"/>
	<xsl:apply-templates select="atten4"/>
	<xsl:apply-templates select="graphic"/>
	<xsl:apply-templates select="caption"/>
	<xsl:apply-templates select="callout"/>
</xsl:template>

<xsl:template match="graphic">
	<xsl:variable name="figure.width" select="number(substring-before(translate(@width, ' ', ''), 'in'))"/>
	<xsl:choose>
		<xsl:when test="parent::figure[@type='SVG']">
			<xsl:element name="embed">
				<xsl:attribute name="src">
					../../svgz/<xsl:value-of select="translate(@graphicname,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/><xsl:text>.svgz</xsl:text>
				</xsl:attribute>
				<xsl:attribute name="width">600</xsl:attribute>
				<xsl:attribute name="height">400</xsl:attribute>
				<xsl:attribute name="name">svgdata</xsl:attribute>
			</xsl:element>
		</xsl:when>
		<xsl:otherwise>
			<xsl:element name="img">
				<xsl:attribute name="src">
					../../png/<xsl:value-of select="translate(@graphicname,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/><xsl:text>.png</xsl:text>
				</xsl:attribute>
				<xsl:attribute name="name">
					<xsl:value-of select="@graphicname"/>
				</xsl:attribute>
				<xsl:attribute name="alt">
					<xsl:value-of select="@graphicname"/>
				</xsl:attribute>
				<xsl:choose>
					<xsl:when test="ancestor::*[//content4]">
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="class">
							<xsl:choose>
								<xsl:when test="not(@width) or ancestor::table">
									<xsl:value-of select="'none'"/>
								</xsl:when>
								<xsl:when test="$figure.width &lt; $figure.THRESHOLD">
									<xsl:value-of select="'half'"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="'full'"/>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:attribute>
				  </xsl:otherwise>
				</xsl:choose>
			</xsl:element>
			<xsl:if test="not(ancestor::*[//content4])">
				<img src="../../img/none.png" /><br/>
			</xsl:if>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="caption">
	<xsl:apply-templates select="text()|sub|sup|xref|xref-nonref|symbol"/>
</xsl:template>

<xsl:template match="callout">
	<br/>
	<xsl:apply-templates select="table"/>
</xsl:template>

</xsl:stylesheet>