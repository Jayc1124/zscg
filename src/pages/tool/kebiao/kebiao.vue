<!-- <template>
	
</template> -->
<template>
  <!-- 课表组件 -->
  <!-- <div class="class-table">
    <div class="table-wrapper">
      <div class="tabel-container">
		  <div v-html="message"></div>
      <div v-html="msg"></div>
	  <div v-html="msg1"></div>
	  <div v-html="msg2"></div>
      </div>
    </div>
  </div> -->
  <div>
	  <view class="u-content">
	  	<u-parse :html="msg2" :tag-style="style"></u-parse>
	  </view>
	  <view class="u-content">
	  	<u-parse :html="msg1" :tag-style="style"></u-parse>
	  </view>
	  <view class="u-content">
	  	<u-parse :html="msg" :tag-style="style"></u-parse>
	  </view>
	  <view class="u-content">
	  	<u-parse :html="message" :tag-style="style"></u-parse>
	  </view>
  </div>
</template>
 
<script>
	export default {
		data() {
			return {
				style:{
					td:'position: relative;padding: 9px 7px;min-height: 20px;line-height: 20px;font-size: 12px;border-width: 1px;border-style: solid;border-color: #e6e6e6;text-align: center;',
					table:'width: 100%;background-color: #fff;color: #272727',
					th:'text-align: center; background: #F8F8F8;border-width: 1px;border-style: solid;border-color: #e6e6e6;text-align: center;'
				},
				msg2:`<table  cellpadding="0" cellspacing="0" class="layui-table" >
<tr>　
                <th class="Nsb_r_list_thb" scope="col">课程编号</th>
<th class="Nsb_r_list_thb" scope="col" style="width: 180px;">课程名称</th>
<th class="Nsb_r_list_thb" scope="col" style="width: 150px;">ISBN书号</th>
<th class="Nsb_r_list_thb" scope="col" style="width: 200px;">教材名称</th>
<th class="Nsb_r_list_thb" scope="col">定价</th>
<th class="Nsb_r_list_thb" scope="col">版次</th>
<th class="Nsb_r_list_thb" scope="col" style="width: 180px;">出版社</th>
<th class="Nsb_r_list_thb" scope="col">上课教师</th>
<th class="Nsb_r_list_thb" scope="col">上课院系</th>
<th class="Nsb_r_list_thb" scope="col">征订状态</th>
<th class="Nsb_r_list_thb" scope="col">操作</th>
</tr>
<tr>
<td>150040009</td>
<td>计算机组成原理</td>
<td>9787040545180</td>
<td>计算机组成原理</td>
<td>45.00</td>
<td>第3版</td>
<td>高等教育出版社</td>
<td>陈晨</td>
<td>网络与通信工程学院</td>
<td>是</td>
<td>
</td>
</tr>
<tr>
<td>150030013</td>
<td>网络应用开发</td>
<td>9787302559801</td>
<td>JSP实用教程（第4版）</td>
<td>59.80</td>
<td>第四版</td>
<td>清华大学出版社</td>
<td>冯平兴</td>
<td>网络与通信工程学院</td>
<td>是</td>
<td>
</td>
</tr>
<tr>
<td>150030001</td>
<td>移动云计算编程技术</td>
<td>9787121324819</td>
<td>移动Web前端高效开发实战</td>
<td>89.00</td>
<td>1</td>
<td>电子工业出版社</td>
<td>张文丽</td>
<td>网络与通信工程学院</td>
<td>是</td>
<td>
</td>
</tr>
<tr>
<td>150010016</td>
<td>网络系统管理课程设计</td>
<td>202112001</td>
<td>网络系统管理课程设计</td>
<td>3.00</td>
<td>1</td>
<td>自编</td>
<td>宋车梅</td>
<td>网络与通信工程学院</td>
<td>是</td>
<td>
</td>
</tr>
<tr>
<td>150030013</td>
<td>网络应用开发</td>
<td>202112001</td>
<td>网络应用开发实验指导书</td>
<td>3.00</td>
<td>1</td>
<td>自编</td>
<td>冯平兴</td>
<td>网络与通信工程学院</td>
<td>是</td>
<td>
</td>
</tr>
<tr>
<td>150040009</td>
<td>计算机组成原理</td>
<td>202106001</td>
<td>计算机组成原理实验指导书</td>
<td>3.00</td>
<td>1</td>
<td>自编</td>
<td>陈晨</td>
<td>网络与通信工程学院</td>
<td>是</td>
<td>
</td>
</tr>
<tr>
<td>150010015</td>
<td>网络应用系统开发课程设计</td>
<td>202112001</td>
<td>网络应用系统开发课程设计</td>
<td>3.00</td>
<td>1</td>
<td>自编</td>
<td>冯平兴</td>
<td>网络与通信工程学院</td>
<td>是</td>
<td>
</td>
</tr>
<tr>
<td>150030001</td>
<td>移动云计算编程技术</td>
<td>202112001</td>
<td>移动云计算编程技术实验指导书</td>
<td>3.00</td>
<td>1</td>
<td>自编</td>
<td>张文丽</td>
<td>网络与通信工程学院</td>
<td>是</td>
<td>
</td>
</tr>
</table>]

Process finished with exit code 0
`,
				msg1:`<table  cellpadding="0" cellspacing="0" class="layui-table" id="dataList" width="100%">
<tr>
<th class="Nsb_r_list_thb" style="width: 35px;">序号</th>
<th class="Nsb_r_list_thb" style="width: 140px;">开课学期</th>
<th class="Nsb_r_list_thb" style="width: 110px;">课程编号</th>
<th class="Nsb_r_list_thb" style="width: 110px;">课程名称</th>
<th class="Nsb_r_list_thb" style="width: 60px;">
				成绩</th>
<th class="Nsb_r_list_thb" style="width: 50px;">成绩标识</th>
<th class="Nsb_r_list_thb" style="width: 50px;">学分</th>
<th class="Nsb_r_list_thb" style="width: 50px;">总学时</th>
<th class="Nsb_r_list_thb" style="width: 50px;">绩点</th>
<th class="Nsb_r_list_thb" style="width: 110px;">补重学期</th>
<th class="Nsb_r_list_thb" style="width: 60px;">考核方式</th>
<th class="Nsb_r_list_thb" style="width: 60px;">考试性质</th>
<th class="Nsb_r_list_thb" style="width: 60px;">课程属性</th>
<th class="Nsb_r_list_thb" style="width: 80px;">课程性质</th>
<th class="Nsb_r_list_thb" style="width: 80px;">通选课类别</th>
</tr>
<tr>
<td>1</td>
<td>2021-2022-1</td>
<td align="left">050020099</td>
<td align="left">项目管理</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											91
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>2</td>
<td>32</td>
<!-- 控制绩点显示 -->
<td>4</td>
<td></td>
<td>考查</td>
<td>正常考试</td>
<td>选修</td>
<td>专业选修课</td>
<td></td>
</tr>
<tr>
<td>2</td>
<td>2021-2022-1</td>
<td align="left">140002005</td>
<td align="left">形势与政策(五)</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											92
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>0.25</td>
<td>8</td>
<!-- 控制绩点显示 -->
<td>4</td>
<td></td>
<td>考查</td>
<td>正常考试</td>
<td>必修</td>
<td>通识必修课</td>
<td></td>
</tr>
<tr>
<td>3</td>
<td>2021-2022-1</td>
<td align="left">150010014</td>
<td align="left">网络规划与设计综合实践</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											90
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>1</td>
<td>22</td>
<!-- 控制绩点显示 -->
<td>4</td>
<td></td>
<td>考查</td>
<td>正常考试</td>
<td>必修</td>
<td>专业必修课</td>
<td></td>
</tr>
<tr>
<td>4</td>
<td>2021-2022-1</td>
<td align="left">150020018</td>
<td align="left">高级路由与交换技术</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											100
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>2</td>
<td>32</td>
<!-- 控制绩点显示 -->
<td>4</td>
<td></td>
<td>考查</td>
<td>正常考试</td>
<td>选修</td>
<td>专业选修课</td>
<td></td>
</tr>
<tr>
<td>5</td>
<td>2021-2022-1</td>
<td align="left">150030012</td>
<td align="left">数据通信原理</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											89
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>3</td>
<td>48</td>
<!-- 控制绩点显示 -->
<td>3.7</td>
<td></td>
<td>考试</td>
<td>正常考试</td>
<td>必修</td>
<td>专业必修课</td>
<td></td>
</tr>
<tr>
<td>6</td>
<td>2021-2022-1</td>
<td align="left">150030016</td>
<td align="left">Java程序设计基础</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											84
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>3</td>
<td>48</td>
<!-- 控制绩点显示 -->
<td>3.3</td>
<td></td>
<td>考查</td>
<td>正常考试</td>
<td>选修</td>
<td>专业选修课</td>
<td></td>
</tr>
<tr>
<td>7</td>
<td>2021-2022-1</td>
<td align="left">150030017</td>
<td align="left">网络操作系统</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											99
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>3</td>
<td>48</td>
<!-- 控制绩点显示 -->
<td>4</td>
<td></td>
<td>考查</td>
<td>正常考试</td>
<td>选修</td>
<td>专业选修课</td>
<td></td>
</tr>
<tr>
<td>8</td>
<td>2021-2022-1</td>
<td align="left">150030018</td>
<td align="left">Web应用基础</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											96
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>3</td>
<td>48</td>
<!-- 控制绩点显示 -->
<td>4</td>
<td></td>
<td>考查</td>
<td>正常考试</td>
<td>选修</td>
<td>专业选修课</td>
<td></td>
</tr>
<tr>
<td>9</td>
<td>2021-2022-1</td>
<td align="left">150030019</td>
<td align="left">网络攻防技术</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											98
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>3</td>
<td>48</td>
<!-- 控制绩点显示 -->
<td>4</td>
<td></td>
<td>考查</td>
<td>正常考试</td>
<td>选修</td>
<td>专业选修课</td>
<td></td>
</tr>
<tr>
<td>10</td>
<td>2021-2022-1</td>
<td align="left">150035004</td>
<td align="left">操作系统</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											87
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>3.5</td>
<td>56</td>
<!-- 控制绩点显示 -->
<td>3.7</td>
<td></td>
<td>考试</td>
<td>正常考试</td>
<td>必修</td>
<td>专业必修课</td>
<td></td>
</tr>
<tr>
<td>11</td>
<td>2021-2022-1</td>
<td align="left">150040008</td>
<td align="left">网络设计与集成</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											94
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>4</td>
<td>64</td>
<!-- 控制绩点显示 -->
<td>4</td>
<td></td>
<td>考试</td>
<td>正常考试</td>
<td>必修</td>
<td>专业必修课</td>
<td></td>
</tr>
<tr>
<td>12</td>
<td>2021-2022-1</td>
<td align="left">GXZHSN059</td>
<td align="left">新媒体与社会性别</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											88
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>1</td>
<td>16</td>
<!-- 控制绩点显示 -->
<td>3.7</td>
<td></td>
<td></td>
<td>正常考试</td>
<td>公选</td>
<td>通识公共选修课</td>
<td>文史哲学与人文素养</td>
</tr>
<tr>
<td>13</td>
<td>2021-2022-1</td>
<td align="left">GXZHSN18B</td>
<td align="left">大学生健康教育</td>
<!-- 控制成绩显示111 -->
<td style="  "><!-- 小于60分不及格显示红色 -->
                                
                                    
                                    

                                        
											
											88
											
                                        
                                    
                                

                            </td>
<td>
</td>
<td>1</td>
<td>16</td>
<!-- 控制绩点显示 -->
<td>3.7</td>
<td></td>
<td></td>
<td>正常考试</td>
<td>公选</td>
<td>通识公共选修课</td>
<td>文史哲学与人文素养</td>
</tr>
</table>]

Process finished with exit code 0
`,
				msg:`	<table id="dataList" width="100%"  cellspacing="0" cellpadding="0" class="layui-table">
		<tr>
			<th class="Nsb_r_list_thb" style="width: 40px;">序号</th>
			<th class="Nsb_r_list_thb" style="width: 100px;">校区</th>
			<th class="Nsb_r_list_thb" style="width: 120px;">考试场次</th>
			<th class="Nsb_r_list_thb" style="width: 120px;">课程编号</th>
			<th class="Nsb_r_list_thb" style="width: 200px;">课程名称</th>
			<th class="Nsb_r_list_thb" style="width: 150px;">授课教师</th>
			<th class="Nsb_r_list_thb" style="width: 110px;">考试时间</th>
			<th class="Nsb_r_list_thb" style="width: 140px;">考场</th>
			
			<th class="Nsb_r_list_thb" style="width: 60px;">座位号</th>
			

			<th class="Nsb_r_list_thb" style="width: 120px;">准考证号</th>
			<th class="Nsb_r_list_thb" style="width: 120px;">备注</th>
			<th class="Nsb_r_list_thb" style="width: 50px;">操作</th>
		</tr>
		
		<tr>
			<td>1</td>
			<td align="left">郫都校区</td>
			<td align="left">250406</td>
			<td align="left">090030008</td>
			<td align="left">概率论与数理统计（I）</td>
			<td></td>
			<td>2021-09-15 13:00~15:00</td>
			<td>允明楼1226</td>
			
			<td></td>
			
			<td></td>
			
			
				<td></td>
			
			<td><a href="javascript:fuc('AD3CA823136D4B1B8FE31842A41E22FA')">备注</a></td>
		</tr>
		
		<tr>
			<td>2</td>
			<td align="left">郫都校区</td>
			<td align="left">15qm091</td>
			<td align="left">150040008</td>
			<td align="left">网络设计与集成</td>
			<td>周文炯</td>
			<td>2021-12-29 15:20~17:20</td>
			<td>允明楼1120</td>
			
			<td>10</td>
			
			<td></td>
			
			
				<td></td>
			
			<td><a href="javascript:fuc('FF0447181EBB475480CF1B6AE943426E')">备注</a></td>
		</tr>
		
		<tr>
			<td>3</td>
			<td align="left">郫都校区</td>
			<td align="left">15qm088</td>
			<td align="left">150035004</td>
			<td align="left">操作系统</td>
			<td>宋车梅</td>
			<td>2021-12-31 15:20~17:20</td>
			<td>允明楼1126</td>
			
			<td>10</td>
			
			<td></td>
			
			
				<td></td>
			
			<td><a href="javascript:fuc('60713541665746368638C30030CF394C')">备注</a></td>
		</tr>
		
		<tr>
			<td>4</td>
			<td align="left">郫都校区</td>
			<td align="left">15qm001</td>
			<td align="left">150030012</td>
			<td align="left">数据通信原理</td>
			<td>丁姝郁</td>
			<td>2022-01-05 15:20~17:20</td>
			<td>允明楼1226</td>
			
			<td>11</td>
			
			<td></td>
			
			
				<td></td>
			
			<td><a href="javascript:fuc('829963289798487C90E3AEC0E797DC1C')">备注</a></td>
		</tr>
		
		
	</table>`,
				message: `
					<table border="1" bordercolor="#E5E5E5" id="timetable" style="border-color: silver" width="100%">
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                 
							            </th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="123">星期一</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="123">星期二</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="123">星期三</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="124">星期四</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="124">星期五</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="124">星期六</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="124">星期日</th>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第一时段 
							                    <br/>(01,02小节)
							                    <br>08:30-10:05
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-1-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-1-1">移动云计算编程技术<br/><font title="周次(节次)">1-8(周)</font><br/><font title="教室">允明楼1406</font><br/>----------------------<br/>移动云计算编程技术<br><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6903</font><br/></br></div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-1-2" style="display: none;">移动云计算编程技术<br/><font title="教师">张文丽</font><br/><font title="周次(节次)">1-8(周)[01-02节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【允明楼】</font><font title="教室">允明楼1406</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222852</font><br/><font color="black" name="xsks" style="display:none;">(讲课:32)<br/></font>---------------------<br/>移动云计算编程技术<br><font title="教师">张文丽</font><br/><font title="周次(节次)">9-12(周)[01-02节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6903</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222853</font><br/><font color="black" name="xsks" style="display:none;">((讲课:32),实验:16)<br/></font></br></div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-2-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-2-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-2-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-3-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-3-1">移动云计算编程技术<br/><font title="周次(节次)">1-8(周)</font><br/><font title="教室">允明楼1406</font><br/>----------------------<br/>移动云计算编程技术<br><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6903</font><br/></br></div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-3-2" style="display: none;">移动云计算编程技术<br/><font title="教师">张文丽</font><br/><font title="周次(节次)">1-8(周)[01-02节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【允明楼】</font><font title="教室">允明楼1406</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222852</font><br/><font color="black" name="xsks" style="display:none;">(讲课:32)<br/></font>---------------------<br/>移动云计算编程技术<br><font title="教师">张文丽</font><br/><font title="周次(节次)">9-12(周)[01-02节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6903</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222853</font><br/><font color="black" name="xsks" style="display:none;">((讲课:32),实验:16)<br/></font></br></div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-4-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-4-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-4-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-5-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-5-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-5-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-6-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-6-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-7-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-7-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第二时段 
							                    <br/>(03,04小节)
							                    <br>10:20-11:55
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-1-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-1-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-1-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-2-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-2-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-2-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-3-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-3-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-3-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-4-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-4-1">职业生涯规划与就业指导2<br/><font title="周次(节次)">12-15(周)</font><br/><font title="教室">允明楼1504</font><br/></div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-4-2" style="display: none;">职业生涯规划与就业指导2<br/><font title="教师">陈永华</font><br/><font title="周次(节次)">12-15(周)[03-04节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【允明楼】</font><font title="教室">允明楼1504</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222834</font><br/><font color="black" name="xsks" style="display:none;">(讲课:8,课外:8)<br/></font></div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-5-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-5-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-5-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-6-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-6-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-7-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-7-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第三时段 
							                    <br/>(05,06小节)
							                    <br>13:40-15:15
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-1">形势与政策(六)<br/><font title="周次(节次)">3-6(周)</font><br/><font title="教室">允明楼1132</font><br/></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-2" style="display: none;">形势与政策(六)<br/><font title="教师">朱睿,兰清</font><br/><font title="周次(节次)">3-6(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【允明楼】</font><font title="教室">允明楼1132</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222830</font><br/><font color="black" name="xsks" style="display:none;">(讲课:8)<br/></font></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-1">网络应用开发<br/><font title="周次(节次)">1-8(周)</font><br/><font title="教室">零号教室032</font><br/>----------------------<br/>网络应用开发<br><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6909</font><br/></br></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-2" style="display: none;">网络应用开发<br/><font title="教师">冯平兴</font><br/><font title="周次(节次)">1-8(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【零号楼】</font><font title="教室">零号教室032</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222844</font><br/><font color="black" name="xsks" style="display:none;">(讲课:32)<br/></font>---------------------<br/>网络应用开发<br><font title="教师">冯平兴</font><br/><font title="周次(节次)">9-12(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6909</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222845</font><br/><font color="black" name="xsks" style="display:none;">((讲课:32),实验:16)<br/></font></br></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-1"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-2" style="display: none;"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-1">网络应用开发<br/><font title="周次(节次)">1-8(周)</font><br/><font title="教室">零号教室032</font><br/>----------------------<br/>网络应用开发<br><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6909</font><br/></br></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-2" style="display: none;">网络应用开发<br/><font title="教师">冯平兴</font><br/><font title="周次(节次)">1-8(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【零号楼】</font><font title="教室">零号教室032</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222844</font><br/><font color="black" name="xsks" style="display:none;">(讲课:32)<br/></font>---------------------<br/>网络应用开发<br><font title="教师">冯平兴</font><br/><font title="周次(节次)">9-12(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6909</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222845</font><br/><font color="black" name="xsks" style="display:none;">((讲课:32),实验:16)<br/></font></br></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-1">计算机组成原理<br/><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6909</font><br/></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-2" style="display: none;">计算机组成原理<br/><font title="教师">陈晨</font><br/><font title="周次(节次)">9-12(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6909</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222881</font><br/><font color="black" name="xsks" style="display:none;">(实验:16)<br/></font></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-1"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-1"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第四时段 
							                    <br/>(07,08小节)
							                    <br>15:30-17:05
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-1-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-1-1">计算机组成原理<br/><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6909</font><br/></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-1-2" style="display: none;">计算机组成原理<br/><font title="教师">陈晨</font><br/><font title="周次(节次)">9-12(周)[07-08节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6909</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222881</font><br/><font color="black" name="xsks" style="display:none;">(实验:16)<br/></font></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-2-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-2-1">计算机组成原理<br/><font title="周次(节次)">1-12(周)</font><br/><font title="教室">零号教室032</font><br/></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-2-2" style="display: none;">计算机组成原理<br/><font title="教师">陈晨</font><br/><font title="周次(节次)">1-12(周)[07-08节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【零号楼】</font><font title="教室">零号教室032</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：2021202221893</font><br/><font color="black" name="xsks" style="display:none;">(讲课:48)<br/></font></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-3-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-3-1"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-3-2" style="display: none;"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-4-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-4-1">计算机组成原理<br/><font title="周次(节次)">1-12(周)</font><br/><font title="教室">零号教室032</font><br/></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-4-2" style="display: none;">计算机组成原理<br/><font title="教师">陈晨</font><br/><font title="周次(节次)">1-12(周)[07-08节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【零号楼】</font><font title="教室">零号教室032</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：2021202221893</font><br/><font color="black" name="xsks" style="display:none;">(讲课:48)<br/></font></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-5-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-5-1"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-5-2" style="display: none;"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-6-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-6-1"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-7-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-7-1"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第五时段 
							                    <br/>(09,10,11小节)
							                    <br>18:30-20:55
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-1-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-1-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-1-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-2-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-2-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-2-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-3-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-3-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-3-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-4-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-4-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-4-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-5-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-5-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-5-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-6-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-6-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-7-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-7-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                备注:
							            </th> <td align="left" colspan="7" style="color: #3B82FF;">网络应用开发 冯平兴 9-12周;计算机组成原理 陈晨 9-12周;移动云计算编程技术 张文丽 9-12周;网络系统管理课程设计 宋车梅 14周;网络应用系统开发课程设计 冯平兴 13周;</td>
							</tr>
							</table>, <table border="1" bordercolor="#E5E5E5" cellpadding="0" cellspacing="0" id="dataTables" style="margin-top: 20px" width="100%">
							<tr>
							<th align="left" colspan="11" height="28" style="font-size: 16px;" width="70">
							<b>无课表课程</b>
							</th>
							</tr>
							<tr>
							<th align="center" height="28" width="80">序号</th>
							<th align="center" height="28" width="80">上课班级</th>
							<th align="center" height="28" width="80">课程编号</th>
							<th align="center" height="28" width="120">课程名称</th>
							<th align="center" height="28" width="100">授课教师</th>
							<th align="center" height="28" width="80">排课人数</th>
							<th align="center" height="28" width="120">选课人数</th>
							<th align="center" height="28" width="60">课程性质</th>
							<th align="center" height="28" width="60">课程属性</th>
							</tr>
							<tr>
							<th align="center" width="70">
							                    1 
							            </th>
							<td align="center" height="28" valign="top">
							                    1-19网络工程[1-2]班
							            </td>
							<td align="center" height="28" valign="top">
							                    070010077
							            </td>
							<td align="center" height="28" valign="top">
							                        职业生涯规划与就业指导2
							                </td>
							<td align="center" height="28" valign="top">
							                    陈永华
							            </td>
							<td align="center" height="28" valign="top">
							                    73
							            </td>
							<td align="center" height="28" valign="top">
							                    73
							            </td>
							<td align="center" height="28" valign="top">
							                    通识必修课
							            </td>
							<td align="center" height="28" valign="top">
							                    必修
							            </td>
							</tr>
							<tr>
							<th align="center" width="70">
							                    2 
							            </th>
							<td align="center" height="28" valign="top">
							                    19网络工程1班
							            </td>
							<td align="center" height="28" valign="top">
							                    150010015
							            </td>
							<td align="center" height="28" valign="top">
							                        网络应用系统开发课程设计
							                </td>
							<td align="center" height="28" valign="top">
							                    冯平兴
							            </td>
							<td align="center" height="28" valign="top">
							                    39
							            </td>
							<td align="center" height="28" valign="top">
							                    39
							            </td>
							<td align="center" height="28" valign="top">
							                    集中实践教学环节
							            </td>
							<td align="center" height="28" valign="top">
							                    必修
							            </td>
							</tr>
							<tr>
							<th align="center" width="70">
							                    3 
							            </th>
							<td align="center" height="28" valign="top">
							                    19网络工程1班
							            </td>
							<td align="center" height="28" valign="top">
							                    150010016
							            </td>
							<td align="center" height="28" valign="top">
							                        网络系统管理课程设计
							                </td>
							<td align="center" height="28" valign="top">
							                    宋车梅
							            </td>
							<td align="center" height="28" valign="top">
							                    39
							            </td>
							<td align="center" height="28" valign="top">
							                    39
							            </td>
							<td align="center" height="28" valign="top">
							                    集中实践教学环节
							            </td>
							<td align="center" height="28" valign="top">
							                    必修
							            </td>
							</tr>
							</table>
				`
			}
		},
	}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  overflow-y:auto;
}

</style>

<!-- <script>
	export default {
		data() {
			return {
				content: `
					<table border="1" bordercolor="#E5E5E5" id="timetable" style="border-color: silver" width="100%">
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                 
							            </th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="123">星期一</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="123">星期二</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="123">星期三</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="124">星期四</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="124">星期五</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="124">星期六</th>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="124">星期日</th>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第一时段 
							                    <br/>(01,02小节)
							                    <br>08:30-10:05
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-1-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-1-1">移动云计算编程技术<br/><font title="周次(节次)">1-8(周)</font><br/><font title="教室">允明楼1406</font><br/>----------------------<br/>移动云计算编程技术<br><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6903</font><br/></br></div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-1-2" style="display: none;">移动云计算编程技术<br/><font title="教师">张文丽</font><br/><font title="周次(节次)">1-8(周)[01-02节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【允明楼】</font><font title="教室">允明楼1406</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222852</font><br/><font color="black" name="xsks" style="display:none;">(讲课:32)<br/></font>---------------------<br/>移动云计算编程技术<br><font title="教师">张文丽</font><br/><font title="周次(节次)">9-12(周)[01-02节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6903</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222853</font><br/><font color="black" name="xsks" style="display:none;">((讲课:32),实验:16)<br/></font></br></div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-2-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-2-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-2-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-3-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-3-1">移动云计算编程技术<br/><font title="周次(节次)">1-8(周)</font><br/><font title="教室">允明楼1406</font><br/>----------------------<br/>移动云计算编程技术<br><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6903</font><br/></br></div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-3-2" style="display: none;">移动云计算编程技术<br/><font title="教师">张文丽</font><br/><font title="周次(节次)">1-8(周)[01-02节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【允明楼】</font><font title="教室">允明楼1406</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222852</font><br/><font color="black" name="xsks" style="display:none;">(讲课:32)<br/></font>---------------------<br/>移动云计算编程技术<br><font title="教师">张文丽</font><br/><font title="周次(节次)">9-12(周)[01-02节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6903</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222853</font><br/><font color="black" name="xsks" style="display:none;">((讲课:32),实验:16)<br/></font></br></div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-4-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-4-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-4-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-5-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-5-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-5-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-6-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-6-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="F95A803036AA40EB861A1FACCAED9A0B-7-4"/>
							<div class="kbcontent1" id="F95A803036AA40EB861A1FACCAED9A0B-7-1"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="F95A803036AA40EB861A1FACCAED9A0B-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第二时段 
							                    <br/>(03,04小节)
							                    <br>10:20-11:55
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-1-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-1-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-1-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-2-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-2-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-2-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-3-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-3-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-3-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-4-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-4-1">职业生涯规划与就业指导2<br/><font title="周次(节次)">12-15(周)</font><br/><font title="教室">允明楼1504</font><br/></div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-4-2" style="display: none;">职业生涯规划与就业指导2<br/><font title="教师">陈永华</font><br/><font title="周次(节次)">12-15(周)[03-04节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【允明楼】</font><font title="教室">允明楼1504</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222834</font><br/><font color="black" name="xsks" style="display:none;">(讲课:8,课外:8)<br/></font></div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-5-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-5-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-5-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-6-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-6-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="C3433C61F6344387972546D9D5C9E0BE-7-4"/>
							<div class="kbcontent1" id="C3433C61F6344387972546D9D5C9E0BE-7-1"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="C3433C61F6344387972546D9D5C9E0BE-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第三时段 
							                    <br/>(05,06小节)
							                    <br>13:40-15:15
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-1">形势与政策(六)<br/><font title="周次(节次)">3-6(周)</font><br/><font title="教室">允明楼1132</font><br/></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-2" style="display: none;">形势与政策(六)<br/><font title="教师">朱睿,兰清</font><br/><font title="周次(节次)">3-6(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【允明楼】</font><font title="教室">允明楼1132</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222830</font><br/><font color="black" name="xsks" style="display:none;">(讲课:8)<br/></font></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-1">网络应用开发<br/><font title="周次(节次)">1-8(周)</font><br/><font title="教室">零号教室032</font><br/>----------------------<br/>网络应用开发<br><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6909</font><br/></br></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-2" style="display: none;">网络应用开发<br/><font title="教师">冯平兴</font><br/><font title="周次(节次)">1-8(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【零号楼】</font><font title="教室">零号教室032</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222844</font><br/><font color="black" name="xsks" style="display:none;">(讲课:32)<br/></font>---------------------<br/>网络应用开发<br><font title="教师">冯平兴</font><br/><font title="周次(节次)">9-12(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6909</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222845</font><br/><font color="black" name="xsks" style="display:none;">((讲课:32),实验:16)<br/></font></br></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-1"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-2" style="display: none;"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-1">网络应用开发<br/><font title="周次(节次)">1-8(周)</font><br/><font title="教室">零号教室032</font><br/>----------------------<br/>网络应用开发<br><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6909</font><br/></br></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-2" style="display: none;">网络应用开发<br/><font title="教师">冯平兴</font><br/><font title="周次(节次)">1-8(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【零号楼】</font><font title="教室">零号教室032</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222844</font><br/><font color="black" name="xsks" style="display:none;">(讲课:32)<br/></font>---------------------<br/>网络应用开发<br><font title="教师">冯平兴</font><br/><font title="周次(节次)">9-12(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6909</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222845</font><br/><font color="black" name="xsks" style="display:none;">((讲课:32),实验:16)<br/></font></br></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-1">计算机组成原理<br/><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6909</font><br/></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-2" style="display: none;">计算机组成原理<br/><font title="教师">陈晨</font><br/><font title="周次(节次)">9-12(周)[05-06节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6909</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222881</font><br/><font color="black" name="xsks" style="display:none;">(实验:16)<br/></font></div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-1"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-4"/>
							<div class="kbcontent1" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-1"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="E9CA99B49BA84B1BA0CD4DE8C2AEA103-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第四时段 
							                    <br/>(07,08小节)
							                    <br>15:30-17:05
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-1-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-1-1">计算机组成原理<br/><font title="周次(节次)">9-12(周)</font><br/><font title="教室">甲工楼A座6909</font><br/></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-1-2" style="display: none;">计算机组成原理<br/><font title="教师">陈晨</font><br/><font title="周次(节次)">9-12(周)[07-08节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【甲工楼A座】</font><font title="教室">甲工楼A座6909</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：202120222881</font><br/><font color="black" name="xsks" style="display:none;">(实验:16)<br/></font></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-2-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-2-1">计算机组成原理<br/><font title="周次(节次)">1-12(周)</font><br/><font title="教室">零号教室032</font><br/></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-2-2" style="display: none;">计算机组成原理<br/><font title="教师">陈晨</font><br/><font title="周次(节次)">1-12(周)[07-08节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【零号楼】</font><font title="教室">零号教室032</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：2021202221893</font><br/><font color="black" name="xsks" style="display:none;">(讲课:48)<br/></font></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-3-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-3-1"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-3-2" style="display: none;"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-4-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-4-1">计算机组成原理<br/><font title="周次(节次)">1-12(周)</font><br/><font title="教室">零号教室032</font><br/></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-4-2" style="display: none;">计算机组成原理<br/><font title="教师">陈晨</font><br/><font title="周次(节次)">1-12(周)[07-08节]</font><br/><font name="jxlmc" style="display:none;" title="教学楼">【零号楼】</font><font title="教室">零号教室032</font><br/><font name="tzdbh" style="display:none;" title="通知单编号">通知单编号：2021202221893</font><br/><font color="black" name="xsks" style="display:none;">(讲课:48)<br/></font></div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-5-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-5-1"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-5-2" style="display: none;"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-6-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-6-1"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="B5F29C17A6F541B7875584AEBC7B6C97-7-4"/>
							<div class="kbcontent1" id="B5F29C17A6F541B7875584AEBC7B6C97-7-1"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="B5F29C17A6F541B7875584AEBC7B6C97-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                        第五时段 
							                    <br/>(09,10,11小节)
							                    <br>18:30-20:55
							                </br></th>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-1-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-1-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-1-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-1-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-1-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-1-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-2-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-2-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-2-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-2-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-2-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-2-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-3-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-3-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-3-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-3-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-3-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-3-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-4-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-4-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-4-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-4-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-4-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-4-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-5-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-5-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-5-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-5-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-5-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-5-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-6-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-6-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-6-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-6-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-6-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-6-4" style="display:none;"></div>
							</td>
							<td align="center" height="28" valign="top" width="123">
							<input name="jx0415zbdiv_1" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-7-1"/>
							<input name="jx0415zbdiv_2" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-7-2"/>
							<input name="jx0415zbdiv_4" type="hidden" value="E2BBEE1AD0514AA98983D83CC2B980B8-7-4"/>
							<div class="kbcontent1" id="E2BBEE1AD0514AA98983D83CC2B980B8-7-1"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-7-2" style="display: none;"> </div>
							<div class="kbcontent" id="E2BBEE1AD0514AA98983D83CC2B980B8-7-4" style="display:none;"></div>
							</td>
							</tr>
							<tr>
							<th align="center" height="28" style="background: rgb(222,225,230)" width="70">
							                备注:
							            </th> <td align="left" colspan="7" style="color: #3B82FF;">网络应用开发 冯平兴 9-12周;计算机组成原理 陈晨 9-12周;移动云计算编程技术 张文丽 9-12周;网络系统管理课程设计 宋车梅 14周;网络应用系统开发课程设计 冯平兴 13周;</td>
							</tr>
							</table>, <table border="1" bordercolor="#E5E5E5" cellpadding="0" cellspacing="0" id="dataTables" style="margin-top: 20px" width="100%">
							<tr>
							<th align="left" colspan="11" height="28" style="font-size: 16px;" width="70">
							<b>无课表课程</b>
							</th>
							</tr>
							<tr>
							<th align="center" height="28" width="80">序号</th>
							<th align="center" height="28" width="80">上课班级</th>
							<th align="center" height="28" width="80">课程编号</th>
							<th align="center" height="28" width="120">课程名称</th>
							<th align="center" height="28" width="100">授课教师</th>
							<th align="center" height="28" width="80">排课人数</th>
							<th align="center" height="28" width="120">选课人数</th>
							<th align="center" height="28" width="60">课程性质</th>
							<th align="center" height="28" width="60">课程属性</th>
							</tr>
							<tr>
							<th align="center" width="70">
							                    1 
							            </th>
							<td align="center" height="28" valign="top">
							                    1-19网络工程[1-2]班
							            </td>
							<td align="center" height="28" valign="top">
							                    070010077
							            </td>
							<td align="center" height="28" valign="top">
							                        职业生涯规划与就业指导2
							                </td>
							<td align="center" height="28" valign="top">
							                    陈永华
							            </td>
							<td align="center" height="28" valign="top">
							                    73
							            </td>
							<td align="center" height="28" valign="top">
							                    73
							            </td>
							<td align="center" height="28" valign="top">
							                    通识必修课
							            </td>
							<td align="center" height="28" valign="top">
							                    必修
							            </td>
							</tr>
							<tr>
							<th align="center" width="70">
							                    2 
							            </th>
							<td align="center" height="28" valign="top">
							                    19网络工程1班
							            </td>
							<td align="center" height="28" valign="top">
							                    150010015
							            </td>
							<td align="center" height="28" valign="top">
							                        网络应用系统开发课程设计
							                </td>
							<td align="center" height="28" valign="top">
							                    冯平兴
							            </td>
							<td align="center" height="28" valign="top">
							                    39
							            </td>
							<td align="center" height="28" valign="top">
							                    39
							            </td>
							<td align="center" height="28" valign="top">
							                    集中实践教学环节
							            </td>
							<td align="center" height="28" valign="top">
							                    必修
							            </td>
							</tr>
							<tr>
							<th align="center" width="70">
							                    3 
							            </th>
							<td align="center" height="28" valign="top">
							                    19网络工程1班
							            </td>
							<td align="center" height="28" valign="top">
							                    150010016
							            </td>
							<td align="center" height="28" valign="top">
							                        网络系统管理课程设计
							                </td>
							<td align="center" height="28" valign="top">
							                    宋车梅
							            </td>
							<td align="center" height="28" valign="top">
							                    39
							            </td>
							<td align="center" height="28" valign="top">
							                    39
							            </td>
							<td align="center" height="28" valign="top">
							                    集中实践教学环节
							            </td>
							<td align="center" height="28" valign="top">
							                    必修
							            </td>
							</tr>
							</table>

				`,
				style: {
					// 字符串的形式
					table:' table-layout: fixed;width: 100%;border-collapse: collapse;color: #677998;',
					th : 'font-weight: normal;height: 46px !important;'
				}
			}
		},
	}
</script> -->