<template>
	<view class="header">
		<view class="uesr">
			<view class="top-xh">
				<view class="h2">
					个人中心
				</view>
				<view class="pic">
					<image src="../../static/cy-my/xiaoxi.png" style="width: 40rpx;" mode="widthFix"></image>
				</view>
			</view>
			<view class="fot-xh">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/pic-m1.png" style="width: 130rpx;" mode="widthFix">
						</image>
					</view>
					<view class="txt">
						<view class="name">
							<view class="h3">
								用户昵称
							</view>
							<view class="phone">
								178****6589
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<view class="about">
			<view class="m-a1">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/tianjia.png" style="width: 76rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text class="s1">点击此处添加宝宝</text>
						<text>记录宝宝成长</text>
					</view>
				</navigator>
			</view>
		</view>
		<view class="ul-list1-xh">
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/qianbao.png" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>我的钱包</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/dingdan.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>我的订单</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/dizhi.png" style="width: 33rpx;  height:45rpx;" mode="widthFix">
						</image>
					</view>
					<view class="txt">
						<text>我的地址</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/yijian.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>意见反馈</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/guanyhu.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>关于我们</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/shehzi.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt" style="border-bottom: none;">
						<text>设置</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
.top-xh {
		padding-top: 40rpx;
		overflow: hidden;
		margin-bottom: 60rpx;

	}

	.top-xh .h2 {
		float: left;
		font-size: 32rpx;
		font-weight: bold;
	}

	.top-xh .pic {
		float: right;
	}

	.uesr {
		overflow: hidden;
		padding: 0 30rpx;
		background: url(../../static/cy-my/beijing1_03.png) no-repeat 0 center;

		height: 345rpx;
	}

	.fot-xh .pic {
		float: left;
		margin-right: 30rpx;
	}

	.fot-xh .txt {
		padding: 20rpx 0;
		overflow: hidden;
	}

	.fot-xh .txt .name {
		position: relative;
		display: block;
	}

	.fot-xh .txt .name .h3 {
		font-size: 24rpx;
		margin-bottom: 13rpx;
		font-weight: bold;
	}

	.fot-xh .txt .name .phone {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		width: 330rpx;
		background: url(../../static/cy-my/jifen.png) no-repeat right center;
		background-size: 100rpx;
		color: rgb(68, 68, 68);
	}

	.fot-xh .name::after {
		content: '';
		position: absolute;
		border-top: 4rpx solid rgb(179, 179, 179);
		border-left: 4rpx solid rgb(179, 179, 179);
		width: 14rpx;
		height: 14rpx;
		right: 5rpx;
		top: 30%;
		transform: rotate(135deg);
	}

	.m-a1 {
		overflow: hidden;
		padding: 20rpx;
		background-color: #fff;
		margin: 0 60rpx;
		box-shadow: 0rpx 5rpx 16rpx 0rpx rgb(226, 236, 255);
		margin-top: -40rpx;
		border-radius: 40rpx;

	}

	.m-a1 .txt {
		overflow: hidden;
	}

	.m-a1 .pic {
		float: left;
		margin-right: 20rpx;
	}

	.m-a1 text {
		display: block;
		font-size: 24rpx;
		color: rgb(179, 179, 179);
	}

	.m-a1 .txt .s1 {
		font-size: 24rpx;
		margin-bottom: 10rpx;
		color: rgb(0, 0, 0);
		font-weight: bold;
	}

	.ul-list1-xh {
		overflow: hidden;
		padding: 0 30rpx;
		padding-top: 30rpx;
		padding-bottom: 300rpx;
	}

	.ul-list1-xh .li {
		padding: 20rpx 0;
		overflow: hidden;
		position: relative;

	}

	.ul-list1-xh .li .pic {
		float: left;
		margin-right: 20rpx;

	}

	.ul-list1-xh .li .txt {
		overflow: hidden;
		font-size: 24rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid rgb(242, 242, 242);
	}

	.ul-list1-xh .li::after {
		content: '';
		position: absolute;
		border-top: 3rpx solid rgb(179, 179, 179);
		border-left: 3rpx solid rgb(179, 179, 179);
		width: 12rpx;
		height: 12rpx;
		right: 5rpx;
		top: 30%;
		transform: rotate(135deg);
	}
</style>
