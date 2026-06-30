<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="List" />
	</xsl:template>
	
	<xsl:template match="List">
		<div id="title" class="title" align="center">
			Location
		</div>
		<div id="list" align="center">
			<xsl:apply-templates select="TitleList"/>
		</div>
	</xsl:template>
	
	<xsl:template match="TitleList">
		<table width='70%' border='1' cellspacing='0' cellpadding='0' bordercolor='#FFFFFF'>
			<tr class='gray2'>
				<td width='35%'>Type</td>
				<td width='65%'>Location</td>
			</tr>
			<xsl:apply-templates select="Routing" />
			<xsl:apply-templates select="Relay" />
		</table>
	</xsl:template>
	
	<xsl:template match="Routing">
		<xsl:for-each select="Title">
			<tr>
				<xsl:if test="position() = 1">
					<td class='color1'>
						<xsl:attribute name="rowspan"><xsl:value-of select="../@num"/></xsl:attribute>
						<xsl:value-of select="../Name" />
					</td>
				</xsl:if>
				<td>
					<xsl:call-template name="Title">
						<xsl:with-param name="code" select="@code"/>
						<xsl:with-param name="name" select="."/>
						<xsl:with-param name="type">routing</xsl:with-param>
					</xsl:call-template>
				</td>
			</tr>
		</xsl:for-each>
	</xsl:template>
	
	<xsl:template match="Relay">
		<xsl:for-each select="Title">
			<tr>
				<xsl:if test="position() = 1">
					<td class='color1'>
						<xsl:attribute name="rowspan"><xsl:value-of select="../@num"/></xsl:attribute>
						Relay Location
					</td>
				</xsl:if>
				<td>
					<xsl:call-template name="Title">
						<xsl:with-param name="code" select="@code"/>
						<xsl:with-param name="name" select="."/>
						<xsl:with-param name="type">relay</xsl:with-param>
					</xsl:call-template>
				</td>
			</tr>
		</xsl:for-each>
	</xsl:template>
	
	<xsl:template name="Title">
		<xsl:param name="code">No Code</xsl:param>
		<xsl:param name="name">No Name</xsl:param>
		<xsl:param name="type">No Type</xsl:param>
		<div class='titlelist' onMouseOver='call_runOnMouseOver()' onMouseOut='call_runOnMouseOut()'>
			<xsl:attribute name="onClick">call_runOnClickTitle('<xsl:value-of select="$code"/>', '<xsl:value-of select="$type"/>')</xsl:attribute>
			<xsl:value-of select="$name"/>
		</div>
	</xsl:template>
	
</xsl:stylesheet>
