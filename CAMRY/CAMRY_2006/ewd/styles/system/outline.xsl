<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

	<xsl:output method="html" encoding="UTF-8" /> 

	<xsl:template match="/">
		<html>
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
				<LINK REL="STYLESHEET" TYPE="text/css" HREF="../../../styles/system/outline.css"/>
			</head>
			<body>
				<xsl:apply-templates select="system-outline"/>
			</body>
		</html>
	</xsl:template>

	<xsl:template match="system-outline">
		<h3>System Outline</h3>
		<hr/>
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="out-title">
		<p>
			<b>
				<xsl:value-of select="."/>
			</b>
		</p>
	</xsl:template>
	
	<xsl:template match="br">
		<br/>
	</xsl:template>
	
	<xsl:template match="@* | node()">
		<xsl:copy>
			<xsl:apply-templates select="@* | node()"/>
		</xsl:copy>
	</xsl:template>
</xsl:stylesheet>
