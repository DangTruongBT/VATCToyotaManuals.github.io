<!-- $Id: searchret.xsl,v 1.4 2004/04/26 05:16:19 k-nagasaka Exp $ -->
<!--========================================================================-->
<!--  searchret.xsl                                                         -->
<!--                                                                        -->
<!-- for Translation                                                        -->
<!--    000  of            ... ( 1 - 20 of 233 )                            -->
<!--    001  No results were found for your search.                         -->
<!--    002  Prev                                                           -->
<!--    003  Next                                                           -->
<!--========================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template name="dispresult">
<xsl:param name="title"/>
<xsl:param name="fcnt"/>
<xsl:param name="ecnt"/>
<xsl:param name="tcat"/>
<xsl:param name="count"/>
<xsl:param name="nplink"/>

<table class='srh-ret' cellSpacing='0' cellPadding='2' width='100%' border='0'>
  <thead class='srh-ret'>
    <tr class='srh-ret'>
      <th class='srh-retnum'></th>
      <th class='srh-retcat'><xsl:value-of select="$title" /></th>
      <th class='srh-retnum'>
        <xsl:if test="not($count = 0)">
          <xsl:value-of select="$fcnt" /> - <xsl:value-of select="$ecnt" /> of <!-- 000 --><xsl:value-of select="$count" />
        </xsl:if>
      </th>
      <th class='srh-retnum' width='1'></th>
    </tr>
    <tr class='srh-ret'><th class='srh-ret-spacer' colSpan='4' height='1'></th></tr>
  </thead>
  <tbody class='srh-ret'>
    <tr class='srh-ret'><td colSpan='4'>
      <xsl:choose>
        <xsl:when test="($count = 0)">
          <ol class='srh-nohit'>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
              No results were found for your search.<!-- 001 -->
          </ol>
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates select="tmc-service-search">
            <xsl:with-param name="tcat" select="$tcat"/> 
            <xsl:with-param name="fcnt" select="$fcnt"/> 
            <xsl:with-param name="ecnt" select="$ecnt"/> 
          </xsl:apply-templates>
        </xsl:otherwise>
      </xsl:choose>
    </td></tr>
    <tr class='srh-ret'><td class='td-pagelink' colSpan='4' align='center'>
      <xsl:if test="boolean($nplink)">
      <table cellSpacing='0' cellPadding='0' width='200' border='0'>
        <font face='arial' size='2'><tr>
          <td width='100' align='center'>
            <xsl:if test="not($fcnt &lt; 2)">
            <xsl:element name="a">
              <xsl:attribute name="class">pagelink</xsl:attribute>
              <xsl:attribute name="href"> # </xsl:attribute>
              <xsl:attribute name="onclick">javascript:displayPrev();</xsl:attribute>
              <b><xsl:text disable-output-escaping="yes">&lt;&amp;nbsp;</xsl:text> Prev</b><!-- 002 -->
            </xsl:element>
            </xsl:if>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
          </td>
          <td width='100' align='center'>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
            <xsl:if test="$count &gt; $ecnt">
              <xsl:element name="a">
                <xsl:attribute name="class">pagelink</xsl:attribute>
                <xsl:attribute name="href"> # </xsl:attribute>
                <xsl:attribute name="onclick">javascript:displayNext();</xsl:attribute>
                <b>Next <xsl:text disable-output-escaping="yes">&amp;nbsp;&gt;</xsl:text></b><!-- 003 -->
              </xsl:element>
           </xsl:if>
          </td>
        </tr></font>
      </table>
      </xsl:if>
    </td></tr>
  </tbody>
</table>
</xsl:template>

<xsl:template match="tmc-service-search">
<xsl:param name="tcat" />
<xsl:param name="fcnt"/>
<xsl:param name="ecnt"/>
  <ol class='srh-ret-txt'>
  <xsl:attribute name="start">
    <xsl:value-of select="$fcnt" />
  </xsl:attribute>
  <xsl:if test="$tcat = 1">
    <xsl:apply-templates select="hititem[@category='C' or @category='J']">
      <xsl:with-param name="fcnt" select="$fcnt"/> 
      <xsl:with-param name="ecnt" select="$ecnt"/> 
    </xsl:apply-templates>
  </xsl:if>
  <xsl:if test="$tcat = 2">
    <xsl:apply-templates select="hititem[@category='A']">
      <xsl:with-param name="fcnt" select="$fcnt"/> 
      <xsl:with-param name="ecnt" select="$ecnt"/> 
    </xsl:apply-templates>
  </xsl:if>
  <xsl:if test="$tcat = 3">
    <xsl:apply-templates select="hititem[@category='G']">
      <xsl:with-param name="fcnt" select="$fcnt"/> 
      <xsl:with-param name="ecnt" select="$ecnt"/> 
    </xsl:apply-templates>
  </xsl:if>
  <xsl:if test="$tcat = 4">
    <xsl:apply-templates select="hititem[@category='F' or @category='L' or @category='K' or @category='H' or @category='M' or @category='N' or @category='R' or @category='S' or @category='T' or @category='D' or @category='U' or @category='V']">
      <xsl:with-param name="fcnt" select="$fcnt"/> 
      <xsl:with-param name="ecnt" select="$ecnt"/> 
    </xsl:apply-templates>
  </xsl:if>
  </ol>
</xsl:template>

<xsl:template match="hititem">
<xsl:param name="fcnt"/>
<xsl:param name="ecnt"/>
  <xsl:if test="(position() &gt; ($fcnt - 1)) and (position() &lt; ($ecnt + 1))">
    <li>
    <xsl:element name="a">
      <xsl:attribute name="class">srh-ret</xsl:attribute>
      <xsl:attribute name="href">javascript:selectRetItem(
            '<xsl:value-of select="@paraid" />',
            '<xsl:value-of select="@procid" />',
            '<xsl:value-of select="@category" />' );
      </xsl:attribute>
      <xsl:value-of select="dispstr" /><br/>
    </xsl:element>
    </li>
  </xsl:if>
</xsl:template>

</xsl:stylesheet>
