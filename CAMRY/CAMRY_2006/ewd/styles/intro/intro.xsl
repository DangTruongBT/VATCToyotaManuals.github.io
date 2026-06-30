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
				<P><xsl:value-of select="introduction/ptxt"/></P>
				<xsl:apply-templates select="introduction" />
			</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="introduction">
		<TABLE BORDER="1">
			<TR>
				<TH>Sections</TH>
				<TH>Title</TH>
				<TH>Contents</TH>
			</TR>
			<xsl:for-each select="section">
				<TR>
					<TD>
						<xsl:attribute name="ROWSPAN">
							<xsl:value-of select="count(title)"/>
						</xsl:attribute>
						<xsl:value-of select="name" />
					</TD>

					<TD>
						<xsl:value-of select="title/name" />
					</TD>
					<TD>
						<xsl:value-of select="title/contents" />
					</TD>
				</TR>

				<xsl:for-each select="title">
					<xsl:if test="position() &gt; 1">
						<TR>
							<TD>
								<xsl:value-of select="name" />
							</TD>
							<TD>
								<xsl:value-of select="contents" />
							</TD>
						</TR>
					</xsl:if>
				</xsl:for-each>

			</xsl:for-each>
		</TABLE>
	</xsl:template>
</xsl:stylesheet>
