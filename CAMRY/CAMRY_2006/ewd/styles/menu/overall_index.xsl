<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="List" />
	</xsl:template>
	
	<xsl:template match="List">
		<div id="title" class="title" align="center">
			<xsl:value-of select="Header"/>
		</div>
		<div id="list" align="center">
			<xsl:apply-templates select="TitleList"/>
		</div>
	</xsl:template>


	<xsl:template match="TitleList">
		<table width='80%' border='1' cellspacing='0' cellpadding='0' bordercolor='#FFFFFF'>
			<tr class='gray2'><td>Overall EWD</td></tr>
			<xsl:for-each select="Title">
				<tr>
					<td>
						<div class='titlelist' onMouseOver='call_runOnMouseOver()' onMouseOut='call_runOnMouseOut()'>
							<xsl:attribute name="onClick">
								call_runOnClickTitle('<xsl:value-of select="@code"/>', '<xsl:value-of select="@type"/>', '<xsl:value-of select="@pdf"/>')
							</xsl:attribute>
							<xsl:value-of select="text()"/>
							<xsl:if test="@spec-num='multi'">
								<xsl:apply-templates select="spec"/>
							</xsl:if>
						</div>
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>

	<xsl:template match="spec">
		<BR/>
		<xsl:text disable-output-escaping="yes">
				&amp;nbsp;
				&amp;nbsp;
		</xsl:text>
		<xsl:value-of select="text()"/>
		<xsl:apply-templates select="spec2"/>
	</xsl:template>

	<xsl:template match="spec2">
		<BR/>
		<xsl:text disable-output-escaping="yes">
				&amp;nbsp;
				&amp;nbsp;
				&amp;nbsp;
				&amp;nbsp;
		</xsl:text>
		<xsl:value-of select="text()"/>
	</xsl:template>
</xsl:stylesheet>
