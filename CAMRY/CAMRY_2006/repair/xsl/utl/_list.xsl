<!-- $Id: _list.xsl,v 1.5 2004/01/27 15:30:59 kato Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:variable name="list.THRESHOLD" select="number(3.1)"/>

<xsl:template match="list1">
	<xsl:if test="figure">
		<br clear="all"/>
	</xsl:if>
	<xsl:if test="title">
		<div class="list-ttl"><xsl:value-of select="title"/></div>
	</xsl:if>
	<ol>
		<xsl:choose>
			<xsl:when test = "@type='unordered'">
				<xsl:attribute name="style">list-style-type: disc</xsl:attribute>
			</xsl:when>
			<xsl:when test = "@type='nonmark'">
				<xsl:attribute name="style">list-style-type: none</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:attribute name="style">list-style-type: decimal</xsl:attribute>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:for-each select="child::*">
			<xsl:choose>
				<xsl:when test="name()='item'">
					<xsl:call-template name="list.item"/>
				</xsl:when>
				<xsl:when test="name()='figure'">
					<xsl:call-template name="list.figure"/>
				</xsl:when>
				<xsl:when test="name()='symbol'">
					<xsl:call-template name="list.symbol"/>
				</xsl:when>
				<xsl:when test="name()='list2'">
					<xsl:apply-templates select="."/>
				</xsl:when>
			</xsl:choose>
		</xsl:for-each>
	</ol>
</xsl:template>

<xsl:template match="list2">
	<xsl:if test="figure">
		<br clear="all"/>
	</xsl:if>
	<xsl:if test="title">
		<div class="list-ttl"><xsl:value-of select="title"/></div>
	</xsl:if>
	<ol>
		<xsl:choose>
			<xsl:when test = "@type='unordered'">
				<xsl:attribute name="style">list-style-type: disc</xsl:attribute>
			</xsl:when>
			<xsl:when test = "@type='nonmark'">
				<xsl:attribute name="style">list-style-type: none</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:attribute name="style">list-style-type: decimal</xsl:attribute>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:for-each select="child::*">
			<xsl:choose>
				<xsl:when test="name()='item'">
					<xsl:call-template name="list.item"/>
				</xsl:when>
				<xsl:when test="name()='figure'">
					<xsl:call-template name="list.figure"/>
				</xsl:when>
				<xsl:when test="name()='symbol'">
					<xsl:call-template name="list.symbol"/>
				</xsl:when>
				<xsl:when test="name()='list3'">
					<xsl:apply-templates select="."/>
				</xsl:when>
			</xsl:choose>
		</xsl:for-each>
	</ol>
</xsl:template>

<xsl:template match="list3">
	<xsl:if test="figure">
		<br clear="all"/>
	</xsl:if>
	<xsl:if test="title">
		<div class="list-ttl"><xsl:value-of select="title"/></div>
	</xsl:if>
	<ol>
		<xsl:choose>
			<xsl:when test = "@type='unordered'">
				<xsl:attribute name="style">list-style-type: disc</xsl:attribute>
			</xsl:when>
			<xsl:when test = "@type='nonmark'">
				<xsl:attribute name="style">list-style-type: none</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:attribute name="style">list-style-type: decimal</xsl:attribute>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:for-each select="child::*">
			<xsl:choose>
				<xsl:when test="name()='item'">
					<xsl:call-template name="list.item"/>
				</xsl:when>
				<xsl:when test="name()='figure'">
					<xsl:call-template name="list.figure"/>
				</xsl:when>
				<xsl:when test="name()='symbol'">
					<xsl:call-template name="list.symbol"/>
				</xsl:when>
			</xsl:choose>
		</xsl:for-each>
	</ol> 
</xsl:template>

<xsl:template name="list.figure">
	<xsl:for-each select=".">
		<li><xsl:apply-templates select="."/></li>
	</xsl:for-each>
</xsl:template>

<xsl:template name="list.symbol">
	<xsl:for-each select=".">
		<li><xsl:apply-templates select="."/></li>
	</xsl:for-each>
</xsl:template>

<xsl:template name="list.item">
	 <xsl:if test="figure">
		 <br clear="all"/>
	 </xsl:if>
	<xsl:for-each select=".">
		<li>
			<xsl:choose>
			  <xsl:when test="ancestor::atten2">
			    <xsl:attribute name="class">atten2</xsl:attribute>
	      </xsl:when>
			  <xsl:when test="ancestor::atten3">
			    <xsl:attribute name="class">atten3</xsl:attribute>
	      </xsl:when>
			  <xsl:when test="ancestor::atten4">
			    <xsl:attribute name="class">atten4</xsl:attribute>
	      </xsl:when>
			  <xsl:otherwise></xsl:otherwise>
			</xsl:choose>
			<xsl:call-template name="item.float"/></li>
	</xsl:for-each>
</xsl:template>

<xsl:template name="item.all">
 <xsl:param name="fig"/>
	<xsl:choose>
			<xsl:when test="name() ='ptxt'">
				<xsl:apply-templates select="."/><br/>
			</xsl:when>
  		<xsl:when test="name() ='figure' and $fig != 'no'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='table'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='spec'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='atten2'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='atten3'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='atten3'">
				<xsl:apply-templates select="."/>
			</xsl:when>	
			<xsl:when test="name() ='atten4'">
				<xsl:apply-templates select="."/>
			</xsl:when>
		</xsl:choose>
		<xsl:if test="name(following-sibling::*[1])='figure' and $fig!='no'"> 
			<br clear="all"/>
		</xsl:if>
</xsl:template>

<xsl:template name="item.float">
	<xsl:choose>
		<xsl:when test="count(figure) &gt;= 1 and number(substring-before(translate(figure/graphic/@width, ' ', ''), 'in')) &lt; $list.THRESHOLD">
			<table class="float"><tr><td>
				<xsl:apply-templates select="figure"/>
			</td></tr></table>
			<xsl:for-each select="child::*">
				<xsl:call-template name="item.all">
					<xsl:with-param name="fig" select="'no'"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:when>
		<xsl:otherwise>
			<xsl:for-each select="child::*">
				<xsl:call-template name="item.all">
					<xsl:with-param name="fig" select="'yes'"/>
				</xsl:call-template>
			</xsl:for-each>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template> 		

</xsl:stylesheet>

