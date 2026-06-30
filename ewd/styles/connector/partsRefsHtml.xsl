<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="/">
		<div id="div_header"></div>
		<xsl:apply-templates select="PartsRef" />
	</xsl:template>
	
	<xsl:template match="PartsRef">
		<xsl:apply-templates select="ID" />
	</xsl:template>
	
	<xsl:template match="ID">
		<xsl:if test=". != '0'">
			<hr/><br/>
		</xsl:if>
		<table class="p_table">
			<col width="150"/>
			<tr>
				<td class="gray3_dark_left">Name</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_name_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
			<tr>
				<td class="gray3_dark_left">Code</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_id_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
			<tr>
				<td class="gray3_dark_left">Part Number</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_no_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
			<tr>
				<td class="gray3_dark_left">Color</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_color_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
			<tr>
				<td class="gray3_dark_left">Spec</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_spec_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
<!--
			<tr>
				<td class="gray3_dark_left">Repair W/H</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_repair_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
-->
		</table>
		<input type="hidden">
			<xsl:attribute name="id">parts_type_<xsl:value-of select="."/></xsl:attribute>
		</input>
		<input type="hidden">
			<xsl:attribute name="id">parts_code_<xsl:value-of select="."/></xsl:attribute>
		</input>
		<input type="hidden">
			<xsl:attribute name="id">parts_subcode_<xsl:value-of select="."/></xsl:attribute>
		</input>
		<input type="hidden">
			<xsl:attribute name="id">parts_namecode_<xsl:value-of select="."/></xsl:attribute>
		</input>
		
		<table style="margin: 5px;">
			<xsl:attribute name="id">tblFig_<xsl:value-of select="."/></xsl:attribute>
			<tr>
				<td style="padding: 40px;">
					<input type="radio">
						<xsl:attribute name="id">optAllPin_<xsl:value-of select="."/></xsl:attribute>
						<xsl:attribute name="name">pin_<xsl:value-of select="."/></xsl:attribute>
					</input>
					<span class="terminal">All terminals</span><br/>
					<input type="radio">
						<xsl:attribute name="id">optSelectedPin_<xsl:value-of select="."/></xsl:attribute>
						<xsl:attribute name="name">pin_<xsl:value-of select="."/></xsl:attribute>
					</input>
					<span class="terminal">Choice terminal</span><br/>
					<p> </p>
					<input type="button" value="show" class="button1">
						<xsl:attribute name="onClick">call_runOnClickChangeDisplayedLink(<xsl:value-of select="."/>)</xsl:attribute>
					</input>
				</td>
				<td align="center" style="padding: 5px, 70px;background:#ECF0F2;" >
					<div>
						<xsl:attribute name="id">fig_view_<xsl:value-of select="."/></xsl:attribute>
						<embed type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/"/>
						<input type="hidden">
							<xsl:attribute name="id">pin_info_<xsl:value-of select="."/></xsl:attribute>
						</input>
					</div>
				</td>
			</tr>
		</table>
		
		<div class="text" style="display:none;">
			<xsl:attribute name="id">single_<xsl:value-of select="."/></xsl:attribute>
			<xsl:attribute name="onClick">call_runOnClickPartCheck(<xsl:value-of select="."/>)</xsl:attribute>
			<xsl:attribute name="onMouseOver">call_runOnMouseOver(true)</xsl:attribute>
			<xsl:attribute name="onMouseOut">call_runOnMouseOut()</xsl:attribute>
			Inspection Procedure
		</div>
		
		<table>
			<tr>
				<td colspan="2">Location</td>
			</tr>
			<tr>
				<td width="50"></td>
				<td>
					<xsl:attribute name="id">to_wiringrouting_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
			<tr>
				<td colspan="2">System</td>
			</tr>
			<tr>
				<td width="50"></td>
				<td>
					<xsl:attribute name="id">to_systemcircuit_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
		</table>
	</xsl:template>
</xsl:stylesheet>
