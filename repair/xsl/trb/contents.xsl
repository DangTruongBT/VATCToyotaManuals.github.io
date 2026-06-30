<!-- $Id: contents.xsl,v 1.11 2005/06/03 02:48:08 k-narumi Exp $ -->
<!--======================================================================-->
<!--  contents.xsl                                                        -->
<!--                                                                      -->
<!--  for Translation                                                     -->
<!--    000 Go to step                                                    -->
<!--    001 Go to step                                                    -->
<!--    002 Go to step                                                    -->
<!--======================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:param name="subparaId"/>
<xsl:param name="prt">1</xsl:param>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-inc" />
</xsl:template>

<xsl:template match="tmc-service-inc">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<xsl:apply-templates select="servcat"/>
</xsl:template>

<xsl:template match="servcat">
	<xsl:apply-templates select="section"/>
</xsl:template>

<xsl:template match="section">
	<xsl:apply-templates select="ttl"/>
</xsl:template>

<xsl:template match="ttl">
	<xsl:apply-templates select="para"/>
</xsl:template>

<xsl:template match="para">
	<xsl:choose>
		<xsl:when test="$subparaId">
			<xsl:apply-templates select="subpara[@id=string($subparaId)]"/>
			<xsl:if test="subpara[@id=string($subparaId)]/following-sibling::subpara[position()=1 and @category='01']">
				<xsl:variable name="nid">
					<xsl:value-of select="subpara[@id=string($subparaId)]/following-sibling::subpara[@category='01']/@id"/>
				</xsl:variable>
				<xsl:apply-templates select="subpara[@id=string($nid)]"/>
			</xsl:if>
		</xsl:when>
		<xsl:otherwise>
			<xsl:apply-templates select="subpara"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="subpara">
	<xsl:element name="a">
		<xsl:attribute name="name"><xsl:value-of select="@id"/></xsl:attribute>
	</xsl:element>
	<xsl:if test="@category!='01' and string(name)">
		<p class="subparaname">
			<xsl:value-of select="name"/>
		</p>
	</xsl:if>
	<xsl:apply-templates select="content5"/>
	<xsl:if test="testgrp">
		<xsl:apply-templates select="testgrp"/>
	</xsl:if>
	<br/>
</xsl:template>

<xsl:template match="testgrp">
	<xsl:if test="string(res)">
		<xsl:element name="a">
			<xsl:attribute name="name"><xsl:value-of select="@id"/></xsl:attribute>
		</xsl:element>
		<table width="100%" border="1" cellspacing="0" cellpadding="2">
			<tr>
				<td>
					<xsl:attribute name="class">
						<xsl:choose>
							<xsl:when test="(testtitle/xref or testtitle/xref-nonref) and string(res)">xrefcolor</xsl:when>
							<xsl:otherwise>s1</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:value-of select="count(preceding-sibling::testgrp[string(child::res)])+1"/>
					<xsl:text>.&#160;</xsl:text>
					<xsl:apply-templates select="testtitle"/>
				</td>
				<td align="right">
					<xsl:attribute name="class">
						<xsl:choose>
							<xsl:when test="(testtitle/xref or testtitle/xref-nonref) and string(res)">xrefcolor</xsl:when>
							<xsl:otherwise>s1</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:if test="@proc-id">
						<a href="javascript:parent.openMemo('{@id}','{@proc-id}');" style="visibility:hidden">
							<img src="../../img/memo.png" id="{@proc-id}" border="0" />
						</a>
					</xsl:if>
				</td>
			</tr>
		</table>
		<xsl:apply-templates select="content1"/>
		<xsl:apply-templates select="content6"/>
	</xsl:if>
	<xsl:if test="string(res)">
		<xsl:apply-templates select="res"/>
	</xsl:if>
</xsl:template>

<!-- 診断結果表示 -->
<xsl:template match="res">
	<br clear="all"/>
	<table width="96%" border="0" cellspacing="0" cellpadding="4">
		<xsl:for-each select="right">
			<tr>
				<td width="50%">
					<table width="100%" border="0" cellspacing="0" cellpadding="0" height="28">
						<tr>
							<td width="60%"><br/></td>
							<td>
								<xsl:attribute name="class">
									<xsl:choose>
										<xsl:when test="@fin='true'">diag-fin</xsl:when>
										<xsl:otherwise>diag-next</xsl:otherwise>
									</xsl:choose>
								</xsl:attribute>
								<xsl:attribute name="style">
									border-right-width: 0px;
								</xsl:attribute>
								<xsl:value-of select="."/>
								<xsl:if test="not(string(.))"><br/></xsl:if>
							</td>
							<td width="13" align="left">
								<xsl:choose>
									<xsl:when test="@fin='true'">
										<img src="../../img/fin_right.png" height="100%" width="13"/>
									</xsl:when>
									<xsl:otherwise>
										<img src="../../img/next_right.png" height="100%" width="13"/>
									</xsl:otherwise>
								</xsl:choose>
							</td>
						</tr>
					</table>
				</td>
				<td width="50%">
					<xsl:variable name="rightid" select="@ref"/>
					<table width="100%" border="1" cellspacing="0" cellpadding="2">
						<tr>
							<td class="s1">
								<xsl:choose>
									<xsl:when test="@fin='true'">
										<xsl:choose>
											<xsl:when test="string(//testgrp[@id=$rightid]/testtitle)">
												<xsl:apply-templates select="//testgrp[@id=$rightid]/testtitle"/>
											</xsl:when>
											<xsl:otherwise>* * * *</xsl:otherwise>
										</xsl:choose>
									</xsl:when>
									<xsl:otherwise>
										<!-- 手順番号を出す場合 -->
										<xsl:variable name="rightpos">
											<xsl:call-template name="getPosition">
												<xsl:with-param name="tests" select="ancestor::subpara//testgrp[string(child::res)]"/>
												<xsl:with-param name="posid" select="$rightid"/>
											</xsl:call-template>
										</xsl:variable>
										<xsl:choose>
											<xsl:when test="$rightpos &gt; 0">
												<xsl:element name="a">
													<xsl:attribute name="name">pvElement</xsl:attribute>
													<xsl:if test="boolean(number($prt))">
														<xsl:attribute name="href">#<xsl:value-of select="$rightid"/></xsl:attribute>
														<xsl:attribute name="onClick">parent.selectId('<xsl:value-of select="$rightid"/>', (parent.local!=null)?parent.local.document:null); if(parent.local!=null){parent.local.location.hash='<xsl:value-of select="$rightid"/>'}</xsl:attribute>
													</xsl:if>
													Go to step <xsl:value-of select="$rightpos"/><!-- 000 -->
												</xsl:element>
											</xsl:when>
											<xsl:otherwise>Go to step * * * * </xsl:otherwise><!-- 001 -->
										</xsl:choose>
									</xsl:otherwise>
								</xsl:choose>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr><td height="4px"></td></tr>
		</xsl:for-each>
	</table>

	<xsl:if test="down">
		<table width="96%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td width="20%">
					<xsl:attribute name="class">
						<xsl:choose>
							<xsl:when test="down[@fin='true']">diag-fin</xsl:when>
							<xsl:otherwise>diag-next</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="style">
						border-bottom-width: 0px;
					</xsl:attribute>
					<xsl:value-of select="down"/>
					<xsl:if test="not(string(down))"><br/></xsl:if>
				</td>
				<td width="80%"><br/></td>
			</tr>
			<tr>
				<td width="20%" align="center" valign="top">
					<xsl:choose>
						<xsl:when test="down[@fin='true']">
							<img src="../../img/fin_down.png" width="100%" height="13"/>
						</xsl:when>
						<xsl:otherwise>
							<img src="../../img/next_down.png" width="100%" height="13" />
						</xsl:otherwise>
					</xsl:choose>
				</td>
				<td width="80%"><br/></td>
			</tr>
			<xsl:if test="down[@fin='true']">
				<xsl:variable name="downid" select="down/@ref"/>
				<tr>
					<td colspan="2">
						<table width="100%" border="1" cellspacing="0" cellpadding="2">
							<tr>
								<td class="s1">
									<xsl:choose>
										<xsl:when test="//testgrp[@id=$downid]/testtitle">
											<xsl:apply-templates select="//testgrp[@id=$downid]/testtitle"/>
										</xsl:when>
										<xsl:otherwise>* * * *</xsl:otherwise>
									</xsl:choose>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</xsl:if>
		</table>
		<br/>
	</xsl:if>

	<xsl:variable name="nextTestId" select="parent::*/following-sibling::testgrp[child::res][1]/@id"/>
	<xsl:variable name="downTestId" select="down/@ref"/>
	<xsl:if test="$nextTestId!=$downTestId and string(//testgrp[@id=$downTestId]/res)">
		<table width="100%" border="1" cellspacing="0" cellpadding="2">
			<tr>
				<td class="s1">
					<xsl:variable name="downpos">
						<xsl:call-template name="getPosition">
							<xsl:with-param name="tests" select="ancestor::subpara//testgrp[string(child::res)]"/>
							<xsl:with-param name="posid" select="$downTestId"/>
						</xsl:call-template>
					</xsl:variable>
					<xsl:element name="a">
						<xsl:attribute name="name">pvElement</xsl:attribute>
						<xsl:if test="boolean(number($prt))">
							<xsl:attribute name="href">#<xsl:value-of select="$downTestId"/></xsl:attribute>
							<xsl:attribute name="onClick">parent.selectId('<xsl:value-of select="$downTestId"/>', (parent.local!=null)?parent.local.document:null); if(parent.local!=null){parent.local.location.hash='<xsl:value-of select="$downTestId"/>'};</xsl:attribute>
						</xsl:if>
						Go to step <xsl:value-of select="$downpos"/><!-- 002 -->
					</xsl:element>
				</td>
			</tr>
		</table>
		<br/>
	</xsl:if>
</xsl:template>

<!-- 診断結果表示内容を｢手順?へ｣と表示する場合の手順No.を取得する。 -->
<xsl:template name="getPosition">
	<xsl:param name="tests"/>
	<xsl:param name="posid"/>
	<xsl:choose>
		<xsl:when test="$tests[@id=$posid]">
			<xsl:variable name="recur">
				<xsl:call-template name="getPosition">
				<xsl:with-param name="tests" select="$tests[position()>1]"/>
				<xsl:with-param name="posid" select="$posid"/>
				</xsl:call-template>
			</xsl:variable>
			<xsl:value-of select="1+$recur"/>
		</xsl:when>
		<xsl:otherwise>0</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:include href="../utl/_content1.xsl"/>
<xsl:include href="../utl/_content5.xsl"/>
<xsl:include href="../utl/_content6.xsl"/>

<xsl:include href="../utl/_diag.xsl"/>
<xsl:include href="../utl/_testtitle.xsl"/>
<xsl:include href="../utl/_test1.xsl"/>
<xsl:include href="../utl/_results.xsl"/>

<xsl:include href="../utl/_table.xsl"/>
<xsl:include href="../utl/_ptxt.xsl"/>
<xsl:include href="../utl/_list.xsl"/>
<xsl:include href="../utl/_sst.xsl"/>
<xsl:include href="../utl/_torque.xsl"/>
<xsl:include href="../utl/_atten.xsl"/>
<xsl:include href="../utl/_spec.xsl"/>
<xsl:include href="../utl/_xref.xsl"/>
<xsl:include href="../utl/_figure.xsl"/>
<xsl:include href="../utl/_symbol.xsl"/>
<xsl:include href="../utl/_modifier.xsl"/>

</xsl:stylesheet>