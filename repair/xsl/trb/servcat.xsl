<!-- $Id: servcat.xsl,v 1.8 2004/01/14 09:07:11 takeo Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-db"/>
</xsl:template>

<xsl:template match="tmc-service-db">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<div class="proc-items" id="procitems">
	<table class="box" cellspacing="0" cellpadding="6" width="100%">
		<xsl:apply-templates select="servcat"/>
	</table>
	</div>
</xsl:template>

<xsl:template match="servcat">
	<xsl:if test="section/ttl/para[@category='S' or @category='T']">
		<tr>
			<td>
				<table cellspacing="0" cellpadding="0" class="menubox">
					<tr>
						<td class="whitebox">
							<a href="#" class="menu" onClick="clearDelay(); dispSubMenu(this, p0{position()}.innerHTML)" onmouseout="delayUndisp()" id="popspan{position()}">
								<xsl:value-of select="shortname"/>
							</a>
							<div id="p0{position()}" style="display:none">
								<div class="popup">
									<xsl:apply-templates select="section/ttl[child::para/@category='S' or child::para/@category='T']"/>
								</div>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</xsl:if>
</xsl:template>

<xsl:template match="ttl">
	<xsl:variable name="ttlName">
		<xsl:value-of select="name"/>
	</xsl:variable>
	<xsl:if test="not(ancestor::section/preceding-sibling::section/ttl[name=$ttlName and (child::para/@category='S' or child::para/@category='T')])">
		<xsl:variable name="secId">
			<xsl:value-of select="substring-before(ancestor::section/@id, '_')"/>
		</xsl:variable>
		<xsl:variable name="secName">
			<xsl:if test="(count(//ttl[name=$ttlName]) &gt; 1) or (count(//section[substring-before(@id, '_')=$secId]) &gt; 1)">
				(<xsl:value-of select="ancestor::section/name"/>)
			</xsl:if>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="( para[@category='S'] and  para[@category='T'] )">
				<xsl:call-template name="dispItem">
					<xsl:with-param name="paracat">S</xsl:with-param>
					<xsl:with-param name="secName">
						<xsl:value-of select="$secName"/>
					</xsl:with-param>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="( para[@category='S'] )">
						<xsl:call-template name="dispItem">
							<xsl:with-param name="paracat">S</xsl:with-param>
							<xsl:with-param name="secName">
								<xsl:value-of select="$secName"/>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="( para[@category='T'] )">
								<xsl:call-template name="dispItem">
									<xsl:with-param name="paracat">T</xsl:with-param>
									<xsl:with-param name="secName">
										<xsl:value-of select="$secName"/>
									</xsl:with-param>
								</xsl:call-template>
							</xsl:when>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:apply-templates select="ancestor::section/following-sibling::section/ttl[(name=$ttlName) and (child::para[@category='S' or @category='T'])]" mode="sametitle"/>
	</xsl:if>
</xsl:template>

<xsl:template match="ttl" mode="sametitle">
	<xsl:variable name="ttlName">
		<xsl:value-of select="name"/>
	</xsl:variable>
	<xsl:variable name="secId">
		<xsl:value-of select="substring-before(ancestor::section/@id, '_')"/>
	</xsl:variable>
	<xsl:variable name="secName">
		<xsl:if test="(count(//ttl[name=$ttlName]) &gt; 1) or (count(//section[substring-before(@id, '_')=$secId]) &gt; 1)">
			(<xsl:value-of select="ancestor::section/name"/>)
		</xsl:if>
	</xsl:variable>
	<xsl:choose>
		<xsl:when test="( para[@category='S'] and  para[@category='T'] )">
			<xsl:call-template name="dispItem">
				<xsl:with-param name="paracat">S</xsl:with-param>
				<xsl:with-param name="secName">
					<xsl:value-of select="$secName"/>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:choose>
				<xsl:when test="( para[@category='S'] )">
					<xsl:call-template name="dispItem">
						<xsl:with-param name="paracat">S</xsl:with-param>
						<xsl:with-param name="secName">
							<xsl:value-of select="$secName"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:when>
				<xsl:otherwise>
					<xsl:choose>
						<xsl:when test="( para[@category='T'] )">
							<xsl:call-template name="dispItem">
								<xsl:with-param name="paracat">T</xsl:with-param>
								<xsl:with-param name="secName">
									<xsl:value-of select="$secName"/>
								</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="dispItem">
	<xsl:param name="paracat">S</xsl:param>
	<xsl:param name="secName"/>
	<a class="list" href="#" id="content.html?servcat={../../@id}&amp;section={../@id}&amp;ttl={@id}&amp;parag={para[@category=substring($paracat,1,1)]/@id}&amp;status={./name}&amp;paracat={$paracat}">
		<xsl:value-of select="./name"/><xsl:value-of select="$secName"/>
	</a>
	<br/>
</xsl:template>

</xsl:stylesheet>
