<!-- $Id: contentscat.xsl,v 1.2 2004/04/26 05:16:04 k-nagasaka Exp $ -->
<!--========================================================================-->
<!--  contentscat.xsl                                                       -->
<!--                                                                        -->
<!--========================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:param name="title"/>
<xsl:param name="fcnt"/>
<xsl:param name="ecnt"/>
<xsl:param name="tcat"/>
<xsl:param name="count"/>
<xsl:param name="nplink"/>

<xsl:template match="/">
  <xsl:call-template name="dispresult">
    <xsl:with-param name="title" select="$title" />
    <xsl:with-param name="fcnt"  select="$fcnt" />
    <xsl:with-param name="ecnt"  select="$ecnt" />
    <xsl:with-param name="tcat"  select="$tcat" />
    <xsl:with-param name="count" select="$count" />
    <xsl:with-param name="nplink" select="$nplink" />
  </xsl:call-template>
</xsl:template>


<xsl:include href="searchret.xsl"/>

</xsl:stylesheet>
