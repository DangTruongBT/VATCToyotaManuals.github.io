<!-- $Id: servcat.xsl,v 1.3 2005/12/27 04:45:21 k-narumi Exp $ -->
<!--======================================================================-->
<!-- servcat.xsl                                                          -->
<!--======================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-db"/>
</xsl:template>

<xsl:template match="tmc-service-db">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<table cellspacing="0" cellpadding="1" width="100%">
		<xsl:apply-templates select="servcat"/>
	</table>
</xsl:template>

<xsl:template match="servcat">
	<xsl:choose>
		<xsl:when test="position()=1 and string(number(@id))='NaN'">
			<xsl:for-each select="../servcat[ not((number(substring(@id,1,1))) &gt; -1) ]">
				<xsl:call-template name="getSectionName"/>
			</xsl:for-each>
			<tr>
				<td><br/></td>
			</tr>
		</xsl:when>
		<xsl:when test="(number(substring(@id,1,1))) &gt; -1">
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
										<xsl:apply-templates select="section[not(starts-with(@id, '10003_') or  starts-with(@id, '10001_') or  starts-with(@id, '10035_') or  starts-with(@id, '10036_') or  starts-with(@id, '10037_') or  starts-with(@id, '10038_') 
																			or starts-with(@id, '10039_') or  starts-with(@id, '10040_') or  starts-with(@id, '10041_') or  starts-with(@id, '10042_') or  starts-with(@id, '11') )]"/>
									</div>
								</div>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</xsl:when>
		<xsl:otherwise></xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="section">
	<a class="list" href="#" name="{../@id}" id="content.html?servcat={../@id}&amp;section={@id}&amp;ttl={ttl/@id}&amp;parag={ttl/para/@id}&amp;status={../name}" >
		<xsl:value-of select="name"/>
	</a>
	<br/>
</xsl:template>

<xsl:template name="getSectionName">
	<xsl:for-each select="section[ttl/para[string-length('@id')>0]] ">
		<!--準備品を表示しないように-->
		<xsl:if  test="not(starts-with(@id, '10003_') or starts-with(@id, '10001_') or starts-with(@id, '10035_') or starts-with(@id, '10036_') or starts-with(@id, '10037_') or starts-with(@id, '10038_') 
							or starts-with(@id, '10039_') or  starts-with(@id, '10040_') or  starts-with(@id, '10041_') or  starts-with(@id, '10042_') or  starts-with(@id, '11') )">
			<tr>
				<td onMouseOver="window.focus();undispSubMenu();"  onclick="clickMenu('{../@id}','{@id}','{../section/ttl/para/@id}')" >
					<a class="mokuji" href="#" >
						<xsl:apply-templates select="name"/>
					</a>
				</td>
			</tr>
		</xsl:if>
	</xsl:for-each>
</xsl:template>

</xsl:stylesheet>
