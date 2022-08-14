<template>
	<view>
		<timeline>
		            <timelineItem leftTime='22-06-29'>
		                <view class="tripItem">
		                    <view class="title">新增教评</view>
		                    <view class="tips">外网环境下自定义分数一键教务评价</view>
		                </view>
						<view class="tripItem">
						    <view class="title">效果</view>
						    <view class="tips">人工评教半小时减少至10s内。</view>
						</view>
		            </timelineItem>
		            <timelineItem leftTime='22-05-03'>
		                <view class="tripItem">
		                    <view class="title">完善教务功能</view>
		                    <view class="tips">内容：成绩、课表、教材、考试查询</view>
		                </view>
		        
		            </timelineItem>
					<timelineItem leftTime='22-03-26'>
					    <view class="tripItem">
					        <view class="title">新增二课</view>
					        <view class="tips">无需登录查看报名、</view>
					    </view>	
									<view class="tripItem">
									    <view class="title">青春成工</view>
									    <view class="tips">首次登陆外、无需再登录即可使用</view>
									</view>		
					</timelineItem>
					<timelineItem leftTime='22-03-06'>
					    <view class="tripItem">
					        <view class="title">新增社交圈子</view>
					        <view class="tips">匿名发布、点赞、评论</view>
					    </view>		        
					</timelineItem>
					<timelineItem leftTime='22-02-16'>
					    <view class="tripItem">
					        <view class="title">成工新闻同步</view>
					        <view class="tips">四大板块，数据与官网同步</view>
					    </view>		        
					</timelineItem>
		    </timeline>
	</view>
</template>

<script>
	import timeline from '@/components/chenbin-timeline/timeLine.vue'
	import timelineItem from '@/components/chenbin-timeline/timelineItem.vue'
	export default {
	        components:{
	            timeline,
	            timelineItem
	        }
	    }
	
</script>

<style>
.tripItem {
            height:140rpx;
            padding: 20rpx 30rpx;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 20px 0px rgba(0,0,0,0.08);
            border-radius:10px;
            margin-bottom: 30rpx;
            .title {
                font-size:28rpx;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
            .tips {
                font-size:22rpx;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(153,153,153,1);
                margin-top: 20rpx;

            }
        }
</style>
