<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:include href="const_ps.xsl" />
	
	<xsl:template match="/">
		<div id="ps_matrix">
			<xsl:apply-templates select="LoadList" /> 
		</div>
	</xsl:template>

	<xsl:template match="LoadList">
		<div id="div_header"></div>
		<input id="term" type="hidden" />
		<table style="margin: 10px">
			<tr>
				<td class="loads_title"><xsl:value-of select="$const_title" /></td>
				<td width="100"></td>
				<td>
					<input type="radio" name="sort" id="optCapacity" onClick="call_runOnClickOrder('capacity');" />
					<span class="loads_ps_order"><xsl:value-of select="$const_order_capacity" /></span>
				</td>
				<td>
					<input type="radio" name="sort" id="optName" onClick="call_runOnClickOrder('name');" />
					<span class="loads_ps_order"><xsl:value-of select="$const_order_name" /></span>
				</td>
			</tr>
		</table>
		
		<table class="p_table" style="margin: 40px">
			<xsl:apply-templates select="Block" /> 
		</table>
	</xsl:template>

	<xsl:template match="Block">
		<tr>
			<td colspan="3" class="gray">
				<xsl:call-template name="displayButton">
					<xsl:with-param name="attri" select="@code"/>
					<xsl:with-param name="value" select="blockname/text()"/>
				</xsl:call-template>
			</td>
		</tr>
		<tr>
			<td class="gray2" colspan="2"><xsl:value-of select="$const_fuse" /></td>
			<td class="gray2"><xsl:value-of select="$const_system" /></td>
		</tr>
		<xsl:apply-templates select="Fuse">
			<xsl:sort select="@capacity" order="ascending" data-type="number"/>
		</xsl:apply-templates>
		<tr><td colspan="3" height="30"></td></tr>
	</xsl:template>

	<xsl:template match="Fuse">
		<TR>
			<TD class="gray3"><xsl:value-of select="@capacity" />A</TD>
			<TD class="gray3"><xsl:value-of select="name" /></TD>
			<TD class="gray4_no_text">
				<xsl:for-each select="refs/System">
					<xsl:sort select="." data-type="text" order="ascending"/>
					<div class="loads_ref">
						<xsl:attribute name="onClick">call_runOnClickSystemProc('<xsl:value-of select="./@code"/>','')</xsl:attribute>
						<xsl:attribute name="onMouseOver">call_runOnMouseOverProc(this)</xsl:attribute>
						<xsl:attribute name="onMouseOut">call_runOnMouseOutProc(this)</xsl:attribute>
						<xsl:value-of select="." />
					</div>
				</xsl:for-each>
			</TD>
		</TR>
	</xsl:template>
	
	<xsl:template name="displayButton">
		<xsl:param name="attri"/>
		<xsl:param name="value"/>
		<xsl:param name="attriBefore" select="substring-before($attri,';')"/>
		<xsl:param name="attriAfter" select="substring-after($attri,';')"/>
		<xsl:param name="valueBefore" select="substring-before($value,';')"/>
		<xsl:param name="valueAfter" select="substring-after($value,';')"/>
		<xsl:choose>
			<xsl:when test="$valueBefore != '' ">
				<xsl:call-template name="BlockName">
					<xsl:with-param name="id"   select="$attriBefore"/>
					<xsl:with-param name="name" select="$valueBefore"/>
				</xsl:call-template>
				<xsl:call-template name="displayButton">
					<xsl:with-param name="attri" select="$attriAfter"/>
					<xsl:with-param name="value" select="$valueAfter"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="BlockName">
					<xsl:with-param name="id"   select="$attri"/>
					<xsl:with-param name="name" select="$value"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="BlockName">
		<xsl:param name="id"/>
		<xsl:param name="name"/>
		<div class="blockname">
			<xsl:attribute name="id"><xsl:value-of select="$id" /></xsl:attribute>
			<xsl:value-of select="$name" />
		</div>
	</xsl:template>
	
</xsl:stylesheet>
