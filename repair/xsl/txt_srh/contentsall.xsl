<!-- $Id: contentsall.xsl,v 1.2 2004/04/26 05:15:56 k-nagasaka Exp $ -->
<!--========================================================================-->
<!--  contentsall.xsl                                                       -->
<!--                                                                        -->
<!--========================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:param name="title_dtc"/>
<xsl:param name="title_ist"/>
<xsl:param name="title_isp"/>
<xsl:param name="title_oth"/>
<xsl:param name="ecnt_dtc"/>
<xsl:param name="ecnt_ist"/>
<xsl:param name="ecnt_isp"/>
<xsl:param name="ecnt_oth"/>
<xsl:param name="count_dtc"/>
<xsl:param name="count_ist"/>
<xsl:param name="count_isp"/>
<xsl:param name="count_oth"/>

<xsl:template match="/">
	<xsl:call-template name="dispresult">
		<xsl:with-param name="title" select="$title_dtc" />
		<xsl:with-param name="fcnt"  select="1" />
		<xsl:with-param name="ecnt"  select="$ecnt_dtc" />
		<xsl:with-param name="tcat"  select="1" />
		<xsl:with-param name="count" select="$count_dtc" />
		<xsl:with-param name="nplink" select="false" />
	</xsl:call-template>
	<xsl:call-template name="dispresult">
		<xsl:with-param name="title" select="$title_ist" />
		<xsl:with-param name="fcnt"  select="1" />
		<xsl:with-param name="ecnt"  select="$ecnt_ist" />
		<xsl:with-param name="count" select="$count_ist" />
		<xsl:with-param name="tcat"  select="2" />
		<xsl:with-param name="nplink" select="false" />
	</xsl:call-template>
	<xsl:call-template name="dispresult">
		<xsl:with-param name="title" select="$title_isp" />
		<xsl:with-param name="fcnt"  select="1" />
		<xsl:with-param name="ecnt"  select="$ecnt_isp" />
		<xsl:with-param name="count" select="$count_isp" />
		<xsl:with-param name="tcat"  select="3" />
		<xsl:with-param name="nplink" select="false" />
	</xsl:call-template>
	<xsl:call-template name="dispresult">
		<xsl:with-param name="title" select="$title_oth" />
		<xsl:with-param name="fcnt"  select="1" />
		<xsl:with-param name="ecnt"  select="$ecnt_oth" />
		<xsl:with-param name="count" select="$count_oth" />
		<xsl:with-param name="tcat"  select="4" />
		<xsl:with-param name="nplink" select="false" />
	</xsl:call-template>
</xsl:template>


<xsl:include href="searchret.xsl"/>

</xsl:stylesheet>
