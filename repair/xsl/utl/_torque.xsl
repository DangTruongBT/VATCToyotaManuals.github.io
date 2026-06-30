<!-- $Id: _torque.xsl,v 1.7 2004/12/08 05:52:44 k-narumi Exp $ -->
<!--========================================================================-->
<!-- for Translation                                                        -->
<!--  000 Torque:                                                           -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="torque">
	<p>
	<dl class="torque">
		<dt class="torque">
			Torque: <!-- 000 -->
		</dt>
		<xsl:apply-templates select="torqueitem|subtitle"/>
	</dl>
	</p>
</xsl:template>

<xsl:template match="torqueitem">
	<dd class="torque">
		<xsl:for-each select="child::*">
			<xsl:choose>
			<xsl:when test="name()!='ptxt'">
				<xsl:call-template name="torque.t-value"/>
			</xsl:when>
			<xsl:otherwise>
				}
				<xsl:call-template name="torque.ptxt"/>
			</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
		<xsl:if test="not(ptxt)">
		}
		</xsl:if>
	</dd>
</xsl:template>

<xsl:template match="subtitle">
	<dd class="subtitle">
		<xsl:value-of select="."/>:
	</dd>
</xsl:template>

<xsl:template name="torque.t-value">
	<xsl:choose>
	<xsl:when test="name()='t-value1'">
		<xsl:value-of select="."/> N*m{
	</xsl:when>
	<xsl:when test="name()='t-value2'">
		<xsl:value-of select="."/> kgf*cm
	</xsl:when>
	<xsl:when test="name()='t-value3'">
		, <xsl:value-of select="."/> in.*lbf
	</xsl:when>
	<xsl:when test="name()='t-value4'">
		, <xsl:value-of select="."/> ft.*lbf
	</xsl:when>
	</xsl:choose>
</xsl:template>

<xsl:template name="torque.ptxt">
	<xsl:apply-templates select="."/>
</xsl:template>

</xsl:stylesheet>
