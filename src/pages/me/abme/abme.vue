<template>
	<view>
		<view class="content">
			<view class="jo-logo-box">
				<image class="jo-logo" src="/static/logo.png"></image>
				<view class="flex flex-column">
					<text class="title">掌上成工</text>
					<text class="version">当前版本：{{ version || '3.0.7' }}</text>
				</view>
			</view>
			<!-- <view class="jo-list" @click="goUpdateLog" hover-class="contentHover" hover-stay-time="50">
				<view class="list-text">更新日志</view>
				<view class="cuIcon-right list-icon"></view>
			</view> -->
			<!-- 可删去  开发者下，可编辑增删改查日志内容 -->
		
		<!-- 	<view class="padding flex flex-wrap justify-around align-center bg-white">
				<button class="cu-btn round" @click="isDeveloper">开发者:增删改查日志</button>
				<button class="cu-btn round" @click="unDeveloper">游客:仅预览日志</button>
			</view> -->
			<view class="u-content" style="width: 90%; margin: auto;">
					<u-parse :html="content"></u-parse>
				</view>
				<view class="footer">
					<view class="footer_pri">
						
						
											<!-- <navigator url='https://support.qq.com/products/408686/faqs/122141'>服务协议</navigator> -->
						<!-- <uni-link href="http://zscg.jaycao.com/fw.html" text="服务协议"></uni-link>
											<view class="linecenter">|</view>
						<uni-link href="http://zscg.jaycao.com/ys.html" text="隐私政策"></uni-link> -->
					
	

				
						
					</view>
					</view>
					<view class="footer_Copyright">{{ copyrightInfor }}CodeCJ</view>
				</view>
		</view>
		
	
</template>
<script>
export default {
	data() {
		return {
			copyrightInfor: `©${new Date().getFullYear()} 推客校园&CDTU口袋君`,
			version: '',
				content: `
						<p style="margin: 11px 0;text-align: justify;font-family: Calibri;font-size: 16px;white-space: normal;text-indent: 28px;line-height: 32px;background: rgb(255, 255, 255)">
						    <span style="color: rgb(51, 51, 51); font-family: 宋体; letter-spacing: 0px; font-size: 14px;">掌上成工是由网络与通信工程学院同学从零开发，是一款方便快捷，拥有安卓，苹果，小程序，H5的多平台APP。掌上成工具有许多方便同学们的功能，服务于广大的成都工业学院同学们。</span><span style="color: rgb(51, 51, 51); font-family: 宋体; font-size: 12px; letter-spacing: 0px;"><br/></span>
						</p>
						<h4>掌上成工开发团队 | 兴趣驱动,用爱发电</h4>
						<p style="margin: 11px 0;text-align: justify;font-family: Calibri;font-size: 16px;white-space: normal;text-indent: 28px;line-height: 32px;background: rgb(255, 255, 255)">
						    <span style="font-family: 宋体; color: rgb(51, 51, 51); letter-spacing: 0px; font-size: 14px;">掌上成工于2022年2月开始开发，由推客校园胡伟杰同学负责运营,网络与通信工程学院曹杰，彭良波完成了对APP前后端开发，更新迭代。截止到2022年5月，“掌上成工”已拥有有超过3000+同学使用过。出于对技术的热爱和对同学们服务的热情，掌上成工开发团队的成员们本着为成工学子服务为出发点，创造解决校园生活、学习中存在的痛点的可能，开发产品，服务同学，提升技术能力。感谢你使用掌上成工~</span>
							
						</p>
							                             
							
						</p>
						<p>
						    <br/>
						</p>
							`,
		};
	},
	mounted() {
		// #ifdef APP-PLUS
		//获取manifest.json的版本号
		plus.runtime.getProperty(plus.runtime.appid, function(wgtInfo) {
			this.version = wgtInfo.version;
		});
		// #endif
		// #ifdef MP-WEIXIN
		//获取小程序上线后的版本号（注意：需上线后才可查看）
		const accountInfo = wx.getAccountInfoSync();
		this.version = accountInfo.miniProgram.version;
		// #endif
	},
	methods: {
		isDeveloper() {
			uni.setStorageSync('isDeveloper', true);
			this.goUpdateLog();
		},
		unDeveloper() {
			uni.clearStorageSync('isDeveloper');
			this.goUpdateLog();
		},
		goUpdateLog() {
			uni.navigateTo({
				url: '../changelog/changelog'
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
}
.content {
	text-align: center;
	height: calc(86vh);
	display: flex;
	flex-direction: column;
}
.flex-column {
	flex-direction: column;
}

.jo-list {
	display: flex;
	justify-content: space-between;
	margin: 0 30rpx;
	padding: 30rpx 0;
	border-bottom: rgba(213, 213, 213, 0.5) solid 2rpx;

	.list-text {
		font-size: 30rpx;
		color: #3e4049;
	}
	.list-icon {
		font-size: 40rpx;
		color: #dadada;
	}
}

.jo-logo-box {
	margin: 40rpx 0 50rpx 0;
	.jo-logo {
		border-radius: 40rpx;
		width: 150rpx;
		height: 150rpx;
	}
	.title {
		font-size: 36rpx;
		color: #373737;
		font-weight: bold;
		margin: 20rpx 0 10rpx;
	}
	.version {
		font-size: 28upx;
		color: #7e7e83;
		vertical-align: text-top;
		line-height: 40rpx;
	}
}

.footer {
	position: flex;
	text-align: center;
	width: 100%;
	bottom: 0;

	&_pri {
		color: #0f58ff;
		font-size: 22rpx;
		display: flex;
		width: 100%;
		justify-content: center;
		text-decoration: underline;

		.linecenter {
			margin: 0 20rpx;
			margin-top: 5rpx;
		}
	}

	&_Copyright {
		color: #adafb4;
		font-size: 22rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
}
</style>
