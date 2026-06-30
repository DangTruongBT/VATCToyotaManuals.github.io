<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="ewd" /> 
	</xsl:template>

	<xsl:template match="ewd">
		<HTML>
			<HEAD>
			<LINK REL="STYLESHEET" TYPE="text/css" href="../styles/intro/intro.css"/>
			</HEAD>
			<BODY>
				<UL>
				<P><B><xsl:value-of select="intro/abbreviations/heading"/></B></P>
				<P><xsl:value-of select="intro/abbreviations/ptxt"/></P>
				<xsl:apply-templates select="intro/abbreviations" />
				</UL>
				<P><xsl:value-of select="intro/abbreviations/ptxt[position()=2]"/></P>
			</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="intro/abbreviations">
		<TABLE>
		<xsl:for-each select="abbreviation">
			<TR>
				<TD><xsl:value-of select="term" /></TD>
				<TD> = </TD>
				<TD><xsl:value-of select="meaning" /></TD>
			</TR>
		</xsl:for-each>
		</TABLE>
	</xsl:template>
</xsl:stylesheet>
