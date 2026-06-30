<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="ewd/intro" /> 
	</xsl:template>

	<xsl:template match="ewd/intro">
		<HTML>
			<HEAD>
			<LINK REL="STYLESHEET" TYPE="text/css" href="../styles/intro/intro.css"/>
			</HEAD>
			<BODY>
				<FONT size="+1"><B><xsl:value-of select="glossary/heading"/></B></FONT><BR/>
				<HR WIDTH="100%"/>
				<xsl:apply-templates select="glossary" />
			</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="glossary">
		<TABLE BORDER="1">
		<xsl:for-each select="item">
			<TR>
				<TD>
					<IMG>
						<xsl:attribute name="src">
							<xsl:value-of select="symbol/@fig" />
						</xsl:attribute>
						<xsl:attribute name="height">
							<xsl:value-of select="symbol/@height" />
						</xsl:attribute>
						<xsl:attribute name="width">
							<xsl:value-of select="symbol/@width" />
						</xsl:attribute>

					</IMG>
				</TD>
				<TD>
					<DL>
						<DT><B><xsl:value-of select="term" /></B></DT>
						<DD>
							<xsl:call-template name="cont.float"></xsl:call-template>
						</DD>
					</DL>
					<DL>
						<DT><B><xsl:value-of select="term[position()=2]" /></B></DT>
						<DD><xsl:value-of select="desc[position()=2]" /></DD>
					</DL>
				</TD>
			</TR>
		</xsl:for-each>
		</TABLE>
	</xsl:template>

	<xsl:template match="figchar">
		<IMG>
			<xsl:attribute name="src">
				<xsl:value-of select="@src" />
			</xsl:attribute>
			<xsl:attribute name="width">
				<xsl:value-of select="@width" />
			</xsl:attribute>
			<xsl:attribute name="height">
				<xsl:value-of select="@height" />
			</xsl:attribute>
			<xsl:attribute name="align">
				<xsl:value-of select="@align" />
			</xsl:attribute>
		</IMG>
	</xsl:template>

	<xsl:template name="cont.float">
		<xsl:for-each select="child::*">
			<xsl:call-template name="cont.all">
				<xsl:with-param name="fig" select="'yes'"/>
			</xsl:call-template>
		</xsl:for-each>
	</xsl:template>

	<xsl:template name="cont.all">
		<xsl:param name="fig"/>
		<xsl:choose>
			<xsl:when test="name() ='figchar'">
				<xsl:apply-templates select="."/>
			</xsl:when>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="name() ='desc'">
				<DD><xsl:apply-templates select="."/></DD>
			</xsl:when>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>
