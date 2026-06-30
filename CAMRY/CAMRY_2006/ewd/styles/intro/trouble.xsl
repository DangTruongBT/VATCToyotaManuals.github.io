<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8" />
	<xsl:template match="/">
		<xsl:apply-templates select="ewd/intro" /> 
	</xsl:template>

	<xsl:template match="ewd/intro">
		<HTML>
			<HEAD>
			<LINK REL="STYLESHEET" TYPE="text/css" href="../styles/intro/intro.css"/>
			</HEAD>
			<BODY>
			<xsl:apply-templates select="troubleshooting" />
			</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="troubleshooting">
		<xsl:apply-templates select="step1" />
	</xsl:template>


	<xsl:template match="step1">
		<TABLE cellspacing="0" width="100%" border="1">
			<TR>
				<TD class="s1">
					<A>
						<xsl:attribute name="NAME"><xsl:value-of select="concat('step1-', position())" /></xsl:attribute>
					</A>
					<xsl:value-of select="ptxt" />
					<BR/>
					<xsl:value-of select="ptxt[position()=2]" />
				</TD>
			</TR>
		</TABLE>
		<xsl:apply-templates select="cont" />
	</xsl:template>

	<xsl:template match="*/figure">
		<TABLE class="float">
			<TBODY>
				<TR>
					<TD>
						<IMG>
							<xsl:attribute name="src">
								<xsl:value-of select="@src" />
							</xsl:attribute>
						</IMG>
					</TD>
				</TR>
			</TBODY>
		</TABLE>
	</xsl:template>

	<xsl:template match="figchar">
		<IMG>
			<xsl:attribute name="src">
				<xsl:value-of select="@src" />
			</xsl:attribute>
			<xsl:attribute name="align">
				<xsl:value-of select="@align" />
			</xsl:attribute>
		</IMG>
	</xsl:template>

	<xsl:template match="cont">
		<xsl:if test="figure">
			<BR clear="all"/>
		</xsl:if>
		<xsl:call-template name="cont.float"></xsl:call-template>
	</xsl:template>


	<xsl:template match="step2">
		<LI>
			<xsl:attribute name="value">
				<xsl:value-of select="count(preceding-sibling::step2)+1"/>
			</xsl:attribute>
				<xsl:call-template name="cont.float"></xsl:call-template>
		</LI>
	</xsl:template>

	<xsl:template match="step-n2">
		<LI>
			<xsl:attribute name="value">
				<xsl:value-of select="count(preceding-sibling::step-n2)+1"/>
			</xsl:attribute>
				<xsl:value-of select="ptxt"/>
		</LI>
	</xsl:template>

	<xsl:template match="step3">
		<LI>
			<xsl:attribute name="value">
				<xsl:value-of select="count(preceding-sibling::step3)+1"/>
			</xsl:attribute>
				<xsl:call-template name="cont.float"></xsl:call-template>
		</LI>
	</xsl:template>
	<xsl:template match="step-n4">
		<LI>
			<xsl:attribute name="value">
				<xsl:value-of select="count(preceding-sibling::step-n4)+1"/>
			</xsl:attribute>
			<xsl:value-of select="ptxt"/>
		</LI>
	</xsl:template>

	<xsl:template name="cont.float">
				<xsl:for-each select="child::*">
					<xsl:call-template name="cont.all">
						<xsl:with-param name="fig" select="'yes'"/>
					</xsl:call-template>
				</xsl:for-each>
	</xsl:template>

	<xsl:template name="cont.all">
		<xsl:param name="fig"/>
		<xsl:choose>
			<xsl:when test="name() = 'step2'">
				<ol class="s2">
					<xsl:apply-templates select="."/>
				</ol>
			</xsl:when>
			<xsl:when test="name() = 'step3'">
				<ol class="s3">
					<xsl:apply-templates select="."/>
				</ol>
			</xsl:when>
			<xsl:when test="name() ='figure' and $fig != 'no'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='figchar'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='ptxt'">
				<font class="ptxt"><xsl:apply-templates select="."/></font><BR/>
			</xsl:when>
			<xsl:when test="name() ='example'">
				<xsl:call-template name="example"/>
			</xsl:when>
			<xsl:when test="name() ='notice'">
				<xsl:call-template name="notice"/>
			</xsl:when>
			<xsl:when test="name() ='caution'">
				<xsl:call-template name="caution"/>
			</xsl:when>
			<xsl:when test="name() ='table'">
				<xsl:apply-templates select="."/>
			</xsl:when>
			<xsl:when test="name() ='hint'">
				<xsl:call-template name="hint"/>
			</xsl:when>
			<xsl:when test="name() ='norm'">
				<xsl:call-template name="cont.float"></xsl:call-template>
			</xsl:when>
			<xsl:when test="name() = 'case'">
				<xsl:apply-templates select="."/>
			</xsl:when>

			<xsl:when test="name() ='uline'">
				<xsl:apply-templates select="."/>
			</xsl:when>
		</xsl:choose>

		<xsl:if test="name(following-sibling::*[1])='figure' and $fig != 'no'">
			<BR clear="all"/>
		</xsl:if>

	</xsl:template>

	<xsl:template match="case">
		<P><FONT class="ptxt">
			<DL>
				<DT>"Case <xsl:value-of select="@no"/>"</DT>
				<DD><xsl:call-template name="cont.float"></xsl:call-template></DD>
			</DL>
		</FONT></P>
	</xsl:template>

	<xsl:template name="example">
		<P>
		<DL class="example">
			<DT class="example">Example:</DT>
			<DD class="example">
					<xsl:apply-templates select="deflist"/>
					<xsl:apply-templates select="table"/>
			</DD>
		</DL>
		</P>
	</xsl:template>

	<xsl:template match="deflist">
		<TABLE border="0">
			<xsl:for-each select="l-item">
			<TR>
				<TD valign="top"><xsl:value-of select="label"/></TD>
				<TD valign="top"> - </TD>
				<TD><xsl:value-of select="desc"/></TD>
			</TR>
			</xsl:for-each>
		</TABLE>
	</xsl:template>

	<xsl:template match="table">
		<TABLE border="0">
			<xsl:attribute name="border">
				<xsl:if test="@frame = 'none'">0</xsl:if>
			</xsl:attribute>
			<xsl:for-each select="tbody/row">
			<TR>
				<xsl:for-each select="entry">
					<xsl:choose>
						<xsl:when test="ptxt/uline">
							<TD><U><xsl:value-of select="."/></U></TD>
						</xsl:when>
						<xsl:otherwise>
							<TD><xsl:value-of select="."/></TD>
						</xsl:otherwise>
					</xsl:choose>

				</xsl:for-each>
			</TR>
			</xsl:for-each>
		</TABLE>
	</xsl:template>

	<xsl:template name="hint">
		<P>
		<DL class="hint">
			<DT class="hint">HINT:</DT>
			<DD class="hint"><xsl:value-of select="ptxt"/></DD>
			<DD class="hint"><OL type="1"><xsl:apply-templates select="step-n4"/></OL></DD>
		</DL>
		</P>
	</xsl:template>

	<xsl:template name="notice">
		<P>
		<DL class="notice">
			<DT class="notice">NOTICE:</DT>
			<DD class="notice"><xsl:value-of select="ptxt"/></DD>
		</DL>
		</P>
	</xsl:template>

	<xsl:template name="caution">
		<P>
		<DL class="caution">
			<DT class="caution">CAUTION:</DT>
			<DD class="caution"><OL type="a"><xsl:apply-templates select="step-n2"/></OL></DD>
		</DL>
		</P>
	</xsl:template>

	<xsl:template match="uline">
		<U><xsl:value-of select="."/></U>
	</xsl:template>

</xsl:stylesheet>
