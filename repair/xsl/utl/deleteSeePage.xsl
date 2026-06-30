<!-- $Id: deleteSeePage.xsl,v 1.1 2006/01/11 08:48:09 k-narumi Exp $ -->
<!--======================================================================-->
<!-- for Translation                                                      -->
<!-- 要領中の"See Page"文字列の翻訳結果に一致させる必要あり               -->
<!--  000 See page                                                        -->
<!--  001 See Page                                                        -->
<!--  002 see page                                                        -->
<!--======================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="ptxt">
	<xsl:element name="ptxt">
		<xsl:for-each select="node()">
			<xsl:if test="self::text()">
				<xsl:variable name="txt" select="normalize-space(self::text())"/>
				<xsl:variable name="txt2" select="normalize-space(preceding-sibling::node()[position()=2])"/>
				<xsl:choose>
					<xsl:when test="starts-with(name(preceding-sibling::node()[position()=1]), 'xref') and starts-with($txt, ')') and substring($txt2, string-length($txt2)-8)='(See page'"><!-- 000 -->
						<xsl:choose>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="substring($txt,2,string-length($txt)-1)"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="starts-with(name(preceding-sibling::node()[position()=1]), 'xref') and starts-with($txt, ')') and substring($txt2, string-length($txt2)-8)='(See Page'"><!-- 001 -->
						<xsl:choose>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="substring($txt,2,string-length($txt)-1)"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="starts-with(name(preceding-sibling::node()[position()=1]), 'xref') and starts-with($txt, ')') and substring($txt2, string-length($txt2)-8)='(see page'"><!-- 002 -->
						<xsl:choose>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="substring($txt,2,string-length($txt)-1)"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See page'"><!-- 000 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-9)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See Page'"><!-- 001 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-9)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(see page'"><!-- 002 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-9)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'"><!-- 000 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-8)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'"><!-- 001 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-8)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'"><!-- 002 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-8)"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates select="current()"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:if>
			<xsl:apply-templates select="self::sub"/>
			<xsl:apply-templates select="self::sup"/>
			<xsl:apply-templates select="self::symbol"/>
		</xsl:for-each>
	</xsl:element>
</xsl:template>

<xsl:template match="testtitle">
	<xsl:element name="testtitle">
		<xsl:for-each select="node()">
			<xsl:if test="self::text()">
				<xsl:variable name="txt" select="normalize-space(self::text())"/>
				<xsl:variable name="txt2" select="normalize-space(preceding-sibling::node()[position()=2])"/>
				<xsl:choose>
					<xsl:when test="starts-with(name(preceding-sibling::node()[position()=1]), 'xref') and starts-with($txt, ')') and substring($txt2, string-length($txt2)-8)='(See page'"><!-- 000 -->
						<xsl:choose>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="substring($txt,2,string-length($txt)-1)"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="starts-with(name(preceding-sibling::node()[position()=1]), 'xref') and starts-with($txt, ')') and substring($txt2, string-length($txt2)-8)='(See Page'"><!-- 001 -->
						<xsl:choose>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="substring($txt,2,string-length($txt)-1)"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="starts-with(name(preceding-sibling::node()[position()=1]), 'xref') and starts-with($txt, ')') and substring($txt2, string-length($txt2)-8)='(see page'"><!-- 002 -->
						<xsl:choose>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-10)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'" ><!-- 000 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'" ><!-- 001 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'" ><!-- 002 -->
								<xsl:value-of select="substring($txt,2,string-length($txt)-9)"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="substring($txt,2,string-length($txt)-1)"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See page'"><!-- 000 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-9)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(See Page'"><!-- 001 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-9)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-8)='(see page'"><!-- 002 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-9)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'"><!-- 000 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-8)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'"><!-- 001 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-8)"/>
					</xsl:when>
					<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'"><!-- 002 -->
						<xsl:value-of select="substring($txt,1,string-length($txt)-8)"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates select="current()"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:if>
		</xsl:for-each>
	</xsl:element>
</xsl:template>

</xsl:stylesheet>
