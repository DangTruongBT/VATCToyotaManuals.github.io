<!-- $Id: _results.xsl,v 1.6 2005/06/03 02:48:08 k-narumi Exp $ -->
<!--========================================================================-->
<!-- for Translation                                                        -->
<!-- 要領中の"See Page"文字列の翻訳結果に一致させる必要あり                 -->
<!--  000 See page                                                          -->
<!--  001 See Page                                                          -->
<!--  002 see page                                                          -->
<!--========================================================================-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="results">
	<table width="100%" border="0" cellspacing="0" cellpadding="4">
		<xsl:for-each select="child::*">
			<xsl:choose>
				<xsl:when test="name()='result'">
					<xsl:call-template name="res.result"/>
				</xsl:when>
				<xsl:when test="name()='result-ci-down'">
					<xsl:call-template name="res.result-ci-down"/>
				</xsl:when>
			</xsl:choose>
		</xsl:for-each>
	</table>
</xsl:template>

<xsl:template name="res.result">
	<tr>
		<td align="right" width="50%">
			<table width="100%" border="0" cellspacing="0" cellpadding="0" height="28">
				<tr>
					<td width="60%"><br/></td>
					<td class="diag-next" style="border-right-width: 0px;">
						<xsl:value-of select="."/><span style="font: 0pt">.</span>
					</td>
					<td width="13" align="left">
						<img src="../../img/next_right.png" heigth="100%" width="13"/>
					</td>
				</tr>
			</table>
		</td>
		<td>
			<xsl:apply-templates select="following-sibling::node()[1]"/>
		</td>
	</tr>
</xsl:template>

<xsl:template name="res.result-ci-down">
	<tr>
		<td align="left" colspan="2">
			<table width="96%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="20%" class="diag-next" style="border-bottom-width: 0px;">
						<xsl:if test="not(text())">
							<br/>
						</xsl:if>
						<xsl:value-of select="."/>
					</td>
					<td width="80%"><br/></td>
				</tr>
				<tr>
					<td width="20%" align="center" valign="top">
						<img src="../../img/next_down.png" width="100%" height="13"/>
					</td>
					<td width="80%"><br/></td>
				</tr>
			</table>
		</td>
	</tr>
	<xsl:apply-templates select="following-sibling::node()[1]"/>
</xsl:template>

<xsl:template match="action-ci-right">
	<table width="100%" border="1" cellspacing="0" cellpadding="2">
		<tr>
			<td class="s1">
				<!--START SEEP表示改善対応　20040426-->
				<xsl:for-each select="node()">
					<xsl:if test="self::text()">
						<xsl:variable name="txt" select="normalize-space(self::text())"/>
						<xsl:choose>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'"><!-- 000 -->
								<xsl:value-of select="substring($txt,0,string-length($txt)-7)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'"><!-- 001 -->
								<xsl:value-of select="substring($txt,0,string-length($txt)-7)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'"><!-- 002 -->
								<xsl:value-of select="substring($txt,0,string-length($txt)-7)"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:apply-templates select="."/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:apply-templates select="self::xref-nonref|self::xref"/>
				</xsl:for-each>
				<!--END SEEP表示改善対応　20040426-->
			</td>
		</tr>
	</table>
</xsl:template>

<xsl:template match="action-ci-fin">
	<th colspan="2">
		<table width="100%" border="1" cellspacing="0" cellpadding="2">
			<tr>
				<td class="s1">
					<!--START SEEP表示改善対応　20040426-->
					<xsl:for-each select="node()">
						<xsl:if test="self::text()">
							<xsl:variable name="txt" select="normalize-space(self::text())"/>
							<xsl:choose>
								<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'"><!-- 000 -->
									<xsl:value-of select="substring($txt,0,string-length($txt)-7)"/>
								</xsl:when>
								<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'"><!-- 001 -->
									<xsl:value-of select="substring($txt,0,string-length($txt)-7)"/>
								</xsl:when>
								<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'"><!-- 002 -->
									<xsl:value-of select="substring($txt,0,string-length($txt)-7)"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:apply-templates select="."/>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:if>
						<xsl:apply-templates select="self::xref-nonref|self::xref"/>
					</xsl:for-each>
					<!--END SEEP表示改善対応　20040426-->
				</td>
			</tr>
		</table>
		<br/>
	</th>
</xsl:template>

</xsl:stylesheet>