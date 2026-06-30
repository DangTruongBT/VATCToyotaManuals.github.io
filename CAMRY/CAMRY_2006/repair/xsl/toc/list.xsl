<!-- $Id: list.xsl,v 1.7 2005/12/27 06:31:19 k-narumi Exp $ -->
<!--======================================================================-->
<!--  list.xsl                                                            -->
<!--                                                                      -->
<!--  for Translation                                                     -->
<!--    000 Section                                                       -->
<!--    001 Title                                                         -->
<!--    002 Contents                                                      -->
<!--    003 DIAGNOSTIC TROUBLE CODE CHART                                 -->
<!--======================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>
<xsl:param name="servcat_id"/>

<xsl:template match="/">
	<xsl:apply-templates select="tmc-service-db"/>
</xsl:template>

<xsl:template match="tmc-service-db">
	<xsl:apply-templates select="pub"/>
</xsl:template>

<xsl:template match="pub">
	<xsl:apply-templates select="servcat"/>
</xsl:template>

<xsl:template match="servcat">
	<xsl:if test="@id=$servcat_id">
		<table border="1" cellpadding="0" cellspacing="0" width="100%" bordercolor="#ffffff" style="word-break:break-all">
			<!--準備品を表示しないように-->
			<xsl:apply-templates select="section[not(starts-with(@id, '10003_') or  starts-with(@id, '10001_') or  starts-with(@id, '10035_') or  starts-with(@id, '10036_') or  starts-with(@id, '10037_') or  starts-with(@id, '10038_') 
												or  starts-with(@id, '10039_') or  starts-with(@id, '10040_') or  starts-with(@id, '10041_') or  starts-with(@id, '10042_')  or  starts-with(@id, '11') )]"/>
		</table>
	</xsl:if>
</xsl:template>

<xsl:template match="section">
	<xsl:variable name="pc" select="count(.//para[@category='C'])"/>
	<xsl:variable name="ps" select="count(.//para[@category='S'])"/>
	<xsl:variable name="pa" select="count(.//para)"/>
	<xsl:variable name="pt" select="count(.//ttl[para[@category='C' or @category='S']])"/>
	<xsl:variable name="rows" select="$pa - $pc - $ps + $pt" />
	<tr>
		<a name="{@id}"/>
		<th width="20%" class="tbl-head">Section</th> <!-- 000 -->
		<th width="40%" class="tbl-head">Title</th>   <!-- 001 -->
		<th width="40%" class="tbl-head">Contents</th><!-- 002 -->
	</tr>
	<tr>
		<td valign="middle" width="150" class="tbl-ttl" rowspan="{$rows}">
			<xsl:value-of select="name"/>
		</td>
		<xsl:apply-templates select="ttl"/>
	</tr>
</xsl:template>

<xsl:template match="ttl">
	<xsl:variable name="pc" select="count(.//para[@category='C'])"/>
	<xsl:variable name="ps" select="count(.//para[@category='S'])"/>
	<xsl:variable name="pa" select="count(.//para)"/>
	<xsl:variable name="rows">
		<xsl:choose>
		<xsl:when test=".//para[@category='C' or @category='S']">
			<xsl:value-of select="$pa - $pc - $ps + 1" />
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$pa - $pc - $ps" />
		</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:choose>
		<xsl:when test="position()!=1">
			<tr>
				<td valign="middle" class="tbl-ttl" rowspan="{$rows}">
					<xsl:value-of select="name"/>
				</td>
				<td class="tbl-par">
					<xsl:apply-templates select="para"/>
				</td>
			</tr>
		</xsl:when>
		<xsl:otherwise>
			<!--<tr>-->
			<td valign="middle" class="tbl-ttl" rowspan="{$rows}">
				<xsl:value-of select="name"/>
			</td>
			<td class="tbl-par">
				<xsl:apply-templates select="para"/>
			</td>
			<!--</tr>-->
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<!-- ダイアグ一覧関連(C,S)のパラグラフ -->
<xsl:template match="para[@category='C' or @category='S']">
	<xsl:choose>
		<!-- C,Sで最初に出現したパラグラフを処理する -->
		<xsl:when test="not(preceding-sibling::para[@category='C' or @category='S'])">
			<xsl:choose>
				<xsl:when test="position()=1">
					<xsl:call-template name="dtc-table"/>
				</xsl:when>
				<xsl:otherwise>
					<tr>
						<td class="tbl-par">
							<xsl:call-template name="dtc-table"/>
						</td>
					</tr>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<!-- C,Sで2回目以降に出現したパラグラフは処理しない -->
		<xsl:otherwise/>
	</xsl:choose>
</xsl:template>

<!-- C, S 以外の通常パラグラフ -->
<xsl:template match="para[not(@category='C') and not(@category='S')]">
	<xsl:choose>
		<xsl:when test="position()=1">
			<xsl:apply-templates select="name"/>
		</xsl:when>
		<xsl:otherwise>
			<tr>
				<td class="tbl-par">
					<xsl:apply-templates select="name"/>
				</td>
			</tr>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<!--ダイアグコード一覧は１つのtableとして作成しtdの中に入れる -->
<xsl:template name="dtc-table">
	<!--ダイアグコード（category='C'）のデータの件数は表示時必要，変数として設定-->
	<xsl:variable name="dispNameRows" select="count(../para[@category='C']/name)"/>
	<!--ダイアグコード一覧全部データ表示  開始-->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" bordercolor="#ffffff">
		<tr>
			<!--ダイアグコード一覧（category='S'）のデータ表示    開始-->
			<td width="40%">
				<xsl:choose>
					<xsl:when test="../para[@category='S']">
						<xsl:apply-templates select="../para[@category='S']/name"/>
					</xsl:when>
					<xsl:otherwise>
						<a class="tbl-para">DIAGNOSTIC TROUBLE CODE CHART</a><!-- 003 -->
					</xsl:otherwise>
				</xsl:choose>
			</td>
			<!--ダイアグコード一覧（category='S'）のデータ表示    終了-->
			<!--兄弟レベルの ダイアグコード（category='Ｃ'）  データ表示   開始 -->
			<td width="60%">
				<table width="100%" border="1" cellspacing="0" bordercolor="#ffffff">
					<xsl:variable name="ppp" select="../para[@category='C']/name" />
					<xsl:for-each select="../para[@category='C']/name">
						<xsl:if test="position() &lt;= ceiling($dispNameRows div 2)">
							<xsl:variable name="cur" select="position()" />
							<tr>
								<td width='50%' class="tbl-par">
									<xsl:apply-templates select="."/>
								</td>
								<td width='50%' class="tbl-par">
									<xsl:apply-templates select="$ppp[position()=$cur+ceiling($dispNameRows div 2)]" />
								</td>
							</tr>
						</xsl:if>
					</xsl:for-each>
				</table>
			</td>
			<!--兄弟レベルの ダイアグコード（category='Ｃ'）  データ表示   終了 -->
		</tr>
	</table>
	<!--ダイアグコード一覧全部データ表示  終了    -->
</xsl:template>

<!--パラ名称をリンクとして表示 -->
<xsl:template match="name">
	<xsl:variable name="dispName" select="."/>
	<xsl:variable name="hashPara" select="parent::*/@id"/>
	<xsl:variable name="id"       select="parent::*/@id"/>
	<xsl:variable name="category" select="parent::*/@category"/>
	<a name="{$hashPara}"/>
	<a href="javascript:parent.selectTypedLocation('{$id}', '{$category}');" class="tbl-para" target="_top">
		<xsl:value-of select="$dispName"/>
	</a>
</xsl:template>

</xsl:stylesheet>
