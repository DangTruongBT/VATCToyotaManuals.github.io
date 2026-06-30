<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="ewd" />
	</xsl:template>
	
	<xsl:template match="ewd">
		<HTML>
			<HEAD>
				<META http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
				<script type="text/javascript" src="../scripts/intro/top.js"></script>
				<LINK REL="STYLESHEET" TYPE="text/css" href="../styles/contents.css"/>
			</HEAD>
			<BODY>
				<xsl:apply-templates select="intro/index" />
			</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="intro/index">
		<table width='70%' border='1' cellspacing='0' cellpadding='0' bordercolor='#FFFFFF' align="center">
			<tr class='gray2'>
				<td width='35%'>Section</td>
				<td width='65%'>Contents</td>
			</tr>
			<xsl:apply-templates select="title1" />
		</table>
	</xsl:template>
	
	<xsl:template match="title1">
		<xsl:for-each select="title2">
			<tr>
				<xsl:if test="position() = 1">
					<td class='color1'>
						<xsl:attribute name="rowspan"><xsl:value-of select="count(../title2)"/></xsl:attribute>
						<xsl:value-of select="../name" />
					</td>
				</xsl:if>
				<td>
					<xsl:call-template name="link">
						<xsl:with-param name="code" select="@code"/>
						<xsl:with-param name="name" select="name"/>
					</xsl:call-template>
				</td>
			</tr>
		</xsl:for-each>
	</xsl:template>
	
	<xsl:template name="link">
		<xsl:param name="code">No Code</xsl:param>
		<xsl:param name="name">No Name</xsl:param>
		<xsl:param name="type">No Type</xsl:param>
		<div class='titlelist' onMouseOver='call_runOnMouseOver()' onMouseOut='call_runOnMouseOut()'>
			<xsl:attribute name="onClick">call_runOnClickContents('<xsl:value-of select="$code"/>', '<xsl:value-of select="$type"/>')</xsl:attribute>
			<xsl:value-of select="$name"/>
		</div>
	</xsl:template>
	
</xsl:stylesheet>
