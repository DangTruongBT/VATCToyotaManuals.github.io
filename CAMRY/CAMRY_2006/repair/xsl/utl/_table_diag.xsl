<!-- $Id: _table_diag.xsl,v 1.2 2004/12/07 12:29:53 k-narumi Exp $ -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:xlink="http://www.w3.org/1999/xlink" 
	exclude-result-prefixes="xlink"
	version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="table">
	<br/>
	<table border="1" cellpadding="0" cellspacing="0" width="100%" bordercolor="#ffffff">
		<caption class="tbl-title"><xsl:value-of select="title"/></caption>
		<xsl:apply-templates select="tgroup"/>
	</table>
</xsl:template>

<xsl:template match="tgroup">
	<xsl:element name="col">
		<xsl:attribute name="span"><xsl:value-of select="number(@cols)-1"/></xsl:attribute>
		<xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
	</xsl:element>
	<xsl:apply-templates select="thead"/>
	<xsl:apply-templates select="tbody"/>
</xsl:template>

<xsl:template match="thead">
	<xsl:apply-templates select="row"/>
</xsl:template>

<xsl:template match="tbody">
	<xsl:apply-templates select="row"/>
</xsl:template>

<xsl:template match="row">
	<xsl:variable name="fullwidth">
		<xsl:call-template name="fullWidth">
			<xsl:with-param name="colwid" select="ancestor::tgroup/colspec"/>
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="reducedWidth">
		<xsl:value-of select="number($fullwidth)-number(substring-before(translate(ancestor::tgroup/colspec[position()=last()]/@colwidth, ' ', ''), 'in'))"/>
	</xsl:variable>
	<xsl:choose>
		<xsl:when test="parent::thead">
			<tr>
				<xsl:for-each select="entry">
					<xsl:variable name="pos" select="position()"/>
					<xsl:variable name="cellWidth" select="substring-before(translate(ancestor::tgroup/colspec[$pos]/@colwidth, ' ', ''), 'in')"/>
					<xsl:choose>
						<xsl:when test="position()=last()"></xsl:when>
						<xsl:otherwise>
							<th class="tbl-head">
								<xsl:attribute name="width">
									<xsl:value-of select="($cellWidth div $reducedWidth) * 100"/>%
								</xsl:attribute>
								<xsl:value-of select="ptxt"/>
							</th>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:for-each>
			</tr>
		</xsl:when>
		<xsl:otherwise>
			<tr>
				<xsl:for-each select="entry">
					<xsl:choose>
						<xsl:when test="position()=1">
							<td class="tbl-par">
								<xsl:attribute name="align"><xsl:value-of select="@align"/></xsl:attribute>
								<xsl:element name="a">
									<xsl:attribute name="class">tbl-para</xsl:attribute>
									<xsl:attribute name="href">#</xsl:attribute>
									<xsl:attribute name="onClick">returnValue='<xsl:value-of select="following-sibling::entry[position()=last()]//xref/@href"/>'; parent.window.close();</xsl:attribute>
									<xsl:apply-templates />
								</xsl:element>
							</td>
						</xsl:when>
						<xsl:when test="position()=last()"></xsl:when>
						<xsl:otherwise>
							<td class="tbl-ttl">
								<xsl:attribute name="align">
									<xsl:value-of select="@align"/>
								</xsl:attribute>
								<xsl:for-each select="child::*">
									<xsl:choose>
										<xsl:when test="name()='ptxt'">
											<xsl:apply-templates select="."/><br/>
										</xsl:when>
										<xsl:otherwise><xsl:apply-templates select="."/></xsl:otherwise>
									</xsl:choose>
								</xsl:for-each>
							</td>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:for-each>
			</tr>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="fullWidth">
	<xsl:param name="colwid"/>
	<xsl:choose>
		<xsl:when test="$colwid">
			<xsl:variable name="recur_res">
				<xsl:call-template name="fullWidth">
					<xsl:with-param name="colwid" select="$colwid[position() > 1]"/>
				</xsl:call-template>
			</xsl:variable>
			<xsl:value-of select="number(substring-before(translate($colwid[1]/@colwidth, ' ', ''), 'in')) + $recur_res"/>
		</xsl:when>
		<xsl:otherwise>0</xsl:otherwise>
	</xsl:choose>
</xsl:template>

</xsl:stylesheet>