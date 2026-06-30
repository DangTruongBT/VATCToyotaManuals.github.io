<!-- $Id: servcat.xsl,v 1.6 2004/01/14 09:07:11 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-db"/>
</xsl:template>

<xsl:template match="tmc-service-db">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<table cellspacing="0" cellpadding="6" width="100%">
		<xsl:apply-templates select="servcat"/>
	</table>
</xsl:template>

<xsl:template match="servcat">
	<xsl:if test="section/ttl/para[@category='R']">
		<tr>
			<td>
				<table cellspacing="0" cellpadding="0" class="menubox">
					<tr>
						<td class="whitebox">
							<a href="#" class="menu" onClick="clearDelay();dispSubMenu(this, p0{position()}.innerHTML)" onmouseout="delayUndisp()" id="popspan{position()}">
								<xsl:value-of select="shortname"/>
							</a>
							<div id="p0{position()}" style="display:none">
								<div class="popup">
									<xsl:apply-templates select="section/ttl/para[@category='R']"/>
								</div>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</xsl:if>
</xsl:template>

<xsl:template match="para">
	<xsl:variable name="ttlName">
		<xsl:value-of select="../name"/>
	</xsl:variable>
	<xsl:variable name="secId">
		<xsl:value-of select="substring-before(ancestor::section/@id, '_')"/>
	</xsl:variable>
	<xsl:if test="not(ancestor::section/preceding-sibling::section/ttl[name=$ttlName and child::para/@category='R'])">
		<a class="list" href="#" id="content.html?servcat={../../../@id}&amp;section={../../@id}&amp;ttl={../@id}&amp;parag={@id}">
			<xsl:value-of select="$ttlName"/>
			<xsl:if test="(count(//ttl[name=$ttlName]) &gt; 1) or (count(//section[substring-before(@id, '_')=$secId]) &gt; 1)">
				(<xsl:value-of select="ancestor::section/name"/>)
			</xsl:if>
		</a>
		<br/>
	<xsl:apply-templates select="ancestor::section/following-sibling::section/ttl[name=$ttlName]/para[@category='R']" mode="sametitle"/>
	</xsl:if>
</xsl:template>

<xsl:template match="para" mode="sametitle">
	<xsl:variable name="ttlName">
		<xsl:value-of select="../name"/>
	</xsl:variable>
	<xsl:variable name="secId">
		<xsl:value-of select="substring-before(ancestor::section/@id, '_')"/>
	</xsl:variable>
	<a class="list" href="#" id="content.html?servcat={../../../@id}&amp;section={../../@id}&amp;ttl={../@id}&amp;parag={@id}">
		<xsl:value-of select="$ttlName"/>
		<xsl:if test="(count(//ttl[name=$ttlName]) &gt; 1) or (count(//section[substring-before(@id, '_')=$secId]) &gt; 1)">
			(<xsl:value-of select="ancestor::section/name"/>)
		</xsl:if>
	</a>
	<br/>
</xsl:template>

</xsl:stylesheet>
