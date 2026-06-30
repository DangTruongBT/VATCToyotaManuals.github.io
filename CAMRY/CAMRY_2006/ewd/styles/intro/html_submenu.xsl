<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8" />
	<xsl:template match="/">
		<xsl:apply-templates select="ewd/intro" /> 
	</xsl:template>

	<xsl:template match="ewd/intro">
		<xsl:apply-templates select="troubleshooting" />
	</xsl:template>

	<xsl:template match="troubleshooting">
		<DIV id="disp">
			<DIV class="proc-items">
				<OL class="number-no">
					<xsl:apply-templates select="step1" />
				</OL>
			</DIV>
		</DIV>
	</xsl:template>


	<xsl:template match="step1">
		<LI>
			<A>
				<xsl:attribute name="HREF">javascript:call_onClickItem('<xsl:value-of select="concat('step1-', position())" />')</xsl:attribute>
				<xsl:value-of select="ptxt" />
				<xsl:value-of select="ptxt[position()=2]" />
			</A>
		</LI>
	</xsl:template>



</xsl:stylesheet>
