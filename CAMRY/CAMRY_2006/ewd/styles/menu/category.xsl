<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="Category" />
	</xsl:template>
	
	<xsl:template match="Category">
		<div id="head" class="lblIndex" style="display: none" >
			<xsl:if test="./Title = 'index'">
				Index
			</xsl:if>
			<xsl:if test="./Title = 'ewd'">
				System List
			</xsl:if>
		</div>
		<div class="readme-button">
			<xsl:if test="./ReadMe = 'no'">
				<xsl:attribute name="style">display:none;</xsl:attribute>
			</xsl:if>
			<a class="readme-button" href="#" onClick="call_runOnClickReadMe()">Read Me</a>
		</div>
		<div id="category" class="categorylist">
			<xsl:apply-templates select="CategoryInfo" />
		</div>
		<div id="info" class="category" style="display: none"
			onClick="call_runOnClickInfo()"
			onMouseOver="call_runOnMouseOverInfo()"
			onMouseOut="call_runOnMouseOutInfo()">INFORMATION
		</div>
	</xsl:template>
	
	<xsl:template match="CategoryInfo">
		<xsl:apply-templates select="System" />
		<p class='space'></p>
		<xsl:apply-templates select="Routing" />
		<p class='space'></p>
		<xsl:call-template name="Table">
			<xsl:with-param name="code">cfe</xsl:with-param>
			<xsl:with-param name="name">Connector List / Power Source</xsl:with-param>
			<xsl:with-param name="display">none</xsl:with-param>
		</xsl:call-template>
		<xsl:call-template name="Table">
			<xsl:with-param name="code">ps</xsl:with-param>
			<xsl:with-param name="name">Power Source</xsl:with-param>
			<xsl:with-param name="display">none</xsl:with-param>
		</xsl:call-template>
		<xsl:call-template name="Table">
			<xsl:with-param name="code">overall</xsl:with-param>
			<xsl:with-param name="name">Over All</xsl:with-param>
			<xsl:with-param name="display">none</xsl:with-param>
		</xsl:call-template>
		<xsl:call-template name="Table">
			<xsl:with-param name="code">gp</xsl:with-param>
			<xsl:with-param name="name">Ground Point</xsl:with-param>
			<xsl:with-param name="display">none</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	
	<xsl:template match="System">
		<xsl:for-each select="Item">
			<xsl:call-template name="Table">
				<xsl:with-param name="code" select="@code" />
				<xsl:with-param name="name" select="." />
			</xsl:call-template>
		</xsl:for-each>
		<p class='space'></p>
		<xsl:call-template name="Table">
			<xsl:with-param name="code">system</xsl:with-param>
			<xsl:with-param name="name">System</xsl:with-param>
			<xsl:with-param name="display">none</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	
	<xsl:template match="Routing">
		<xsl:call-template name="Table">
			<xsl:with-param name="code">location</xsl:with-param>
			<xsl:with-param name="name">Location</xsl:with-param>
			<xsl:with-param name="display">none</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	
	<xsl:template name="Table">
		<xsl:param name="code">No Code</xsl:param>
		<xsl:param name="name">No Name</xsl:param>
		<xsl:param name="display">block</xsl:param>
		<table cellspacing='0' cellpadding='0' class='list'>
			<xsl:attribute name="style">display:<xsl:value-of select="$display"/>;</xsl:attribute>
			<tr>
				<td width='10' height='10'>
					<img src='../../icon/b_icon0.png' width='10' height='100%' />
				</td>
				<td width='100%'>
					<div class='menu' onMouseOver='call_runOnMouseOver()' onMouseOut='call_runOnMouseOut()' onClick='call_runOnClick()'>
						<xsl:attribute name="id"><xsl:value-of select="$code"/></xsl:attribute>
						<xsl:value-of select="$name"/>
					</div>
				</td>
			</tr>
		</table>
	</xsl:template>
	
</xsl:stylesheet>
