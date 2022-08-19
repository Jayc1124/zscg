<template>
	<tm-app ref="app">
		<view class="header">

			<view class="uesr">
				<view class="top-xh">
					<view class="h2">
						<tm-text :font-size="40" _class="font-weight-b" label="个人中心"></tm-text>
					</view>
					<view class="pic">
						<!-- <image src="../../../static/cy-my/xiaoxi.png" style="width: 40rpx;" mode="widthFix"></image> -->
					</view>
				</view>

				<view class="fot-xh">
					<navigator url="/pages/me/editme" hover-class="none">
						<view class="pic">
							<!-- <image :src="userinfo.avatar" style="width: 130rpx;" mode="widthFix" round>
						</image> -->

							<tm-avatar :round="12" text :margin="[10, 0]" :size="110" :label="pic" trigger
								triggerIcon="tmicon-check"></tm-avatar>
						</view>
						<view class="txt">
							<view class="name">
								<view class="h3">
									<tm-text :font-size="30" _class="font-weight-b" :label="userinfo.userName">
									</tm-text>
								</view>

								<view style="margin-top:15upx">
									<tm-text :font-size="30" _class="font-weight-n " :label="userinfo.xh"></tm-text>
								</view>
							</view>
						</view>
					</navigator>
				</view>



			</view>

			<!-- <view class="about">
			<view class="m-a1">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../../static/cy-my/tianjia.png" style="width: 76rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text class="s1">点击此处添加宝宝</text>
						<text>记录宝宝成长</text>
					</view>
				</navigator>
			</view>
		</view> -->
			<!-- <view class="banner px-20 mb-30" >
				<u-swiper :list="list2" height="250" name="img" mode="" bg-color="" @click="openurl3"></u-swiper>
			</view> -->
			<tm-sheet :margin="[10, 0]" :round="10">

				<view class="ul-list1-xh">
					<!-- <view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../../static/cy-my/qianbao.png" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
					  <tm-text :font-size="24" _class="font-weight-b" label="意见反馈"></tm-text>
					</view>
				</navigator>
			</view> -->


					<view class="li">
						<navigator url="/pages/me/editme" hover-class="none">
							<view class="pic">
								<image src="../../../static/me/yijian.png" style="width: 35rpx;" mode="widthFix">
								</image>
							</view>
							<view class="txt">
								<tm-text :font-size="32" _class="font-weight-b" label="个人信息"></tm-text>
							</view>
						</navigator>
					</view>
					<tm-divider></tm-divider>
					<view class="li">
						<navigator
							:url="'/pages/webview/webview?detailData=' + 'https://support.qq.com/embed/phone/408686'"
							hover-class="none">
							<view class="pic">
								<image src="../../../static/me/shehzi.png" style="width: 35rpx;" mode="widthFix">
								</image>
							</view>
							<view class="txt" style="border-bottom: none;">
								<tm-text :font-size="32" _class="font-weight-b" label="意见反馈"></tm-text>
							</view>
						</navigator>
					</view>
					<tm-divider></tm-divider>
					<view class="li">
						<navigator url="/pages/me/abme/abme" hover-class="none">
							<view class="pic">
								<image src="../../../static/me/guanyhu.png" style="width: 35rpx;" mode="widthFix">
								</image>
							</view>
							
							<view class="txt">
								<tm-text :font-size="32" _class="font-weight-b" label="关于我们"></tm-text>
							</view>
						</navigator>
					</view>

				</view>
				          <tm-button block label="退出登录" @click="clearStorage"></tm-button>
			</tm-sheet>

		</view>
		
		<view class="py-32 mx-32">
				<!-- <tm-divider color="grey-2" label="掌上成工 5.0.0 谢谢你的使用"></tm-divider> -->
				<tm-divider color="grey-2" label="CodeCJ "></tm-divider>
				
			</view>
			 <tab-bar :active="4"></tab-bar>
	</tm-app>
</template>

<script>
import TabBar from "@/components/TheTabBar.vue";
import request from '@/common/request.js';
export default {
			 components: {
 TabBar
  },
	data() {
		return {
			title: 'Hello',
			userinfo: '',
			pic: '',
			storageSize:'',
			list: [{
				image: 'https://cdn2.jaycao.com/cdtu/tool1.png',
				title: '昨夜星辰昨夜风，画楼西畔桂堂东'
			},
			{
				image: 'https://cdn2.jaycao.com/cdtu/wban.png',
				title: '身无彩凤双飞翼，心有灵犀一点通'
			}
			],
			list2: []
		}
	},
	onLoad() {
		this.getbannaer()
		this.userinfo = uni.getStorageSync("userinfo")
		var str = this.userinfo.userName
		console.log(str)
		this.pic = str.charAt(str.length - 1)
	},
	methods: {
		getStorageSize: function() {
				let that = this;
				uni.getStorageInfo({
					success(res) {
						let size = res.currentSize;
						if (size < 1024) {
							that.storageSize = size + ' B';
						} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
							that.storageSize = Math.floor(size / 1024 * 100) / 100 + ' KB';
						} else if (size / 1024 / 1024 >= 1) {
							that.storageSize = Math.floor(size / 1024 / 1024 * 100) / 100 + ' M';
						}
					}
				})
			},
		clearStorage: function() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定清除缓存吗?',
					confirmText: '立即清除',
					success(res) {
						if (res.confirm) {
							uni.clearStorageSync();
							//重新获取并显示清除后的缓存大小
							that.getStorageSize();
							uni.showToast({
								title: '清除成功'
							})
							uni.reLaunch({
								url: "../../login/login"
							})
						}
					}
				})
			},
		getbannaer() {
			request.httpRequest({
				url: 'notice/noticeBanner/getAppInfo'
			}).then(res => {
				if (res.data.code == 200) {


					this.list2 = res.data.data.slice(7)

				}
			})
		},
		 openurl3(index) {
	console.log(this.list2[index].navurl)
	uni.navigateTo({
		url: this.list2[index].navurl
	})
	// // #ifdef H5
	// window.location.href = listimg[index].navurl
	// // #endif
	// // #ifdef APP-PLUS
	 plus.runtime.openURL(this.list2[index].navurl);
	// //#endif

}
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
	/* overflow: hidden; */
	margin-top: 80upx;
	padding: 0 20rpx;
	/* background: url(https://jaycao-demo01.oss-cn-chengdu.aliyuncs.com/CDTU%E5%8F%A3%E8%A2%8B%E5%90%9BBanner/1.png) no-repeat 0 center; */

	height: 300rpx;
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



.fot-xh .txt .name .phone {
	height: 40rpx;
	line-height: 40rpx;
	font-size: 20rpx;
	width: 330rpx;
	/* background: url(../../../static/cy-my/jifen.png) no-repeat right center; */
	background-size: 100rpx;

}

.fot-xh .name::after {
	content: '';
	position: absolute;
	/* border-top: 4rpx solid rgb(179, 179, 179); */
	/* border-left: 4rpx solid rgb(179, 179, 179); */
	width: 14rpx;
	height: 14rpx;
	right: 5rpx;
	top: 30%;
	transform: rotate(135deg);
}

.m-a1 {
	overflow: hidden;
	padding: 20rpx;
	/* background-color: #fff; */
	margin: 0 60rpx;
	/* box-shadow: 0rpx 5rpx 16rpx 0rpx rgb(226, 236, 255); */
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
	/* color: rgb(179, 179, 179); */
}

.m-a1 .txt .s1 {
	font-size: 24rpx;
	margin-bottom: 10rpx;
	/* color: rgb(0, 0, 0); */
	font-weight: bold;
}

.ul-list1-xh {
	overflow: hidden;
	padding: 0 30rpx;
	padding-top: 30rpx;
	padding-bottom: 20rpx;
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
	font-size: 32rpx;
	padding-bottom: 20rpx;
	/* border-bottom: 1px solid rgb(242, 242, 242); */
}

.ul-list1-xh .li::after {
	content: '';
	position: absolute;
	/* border-top: 3rpx solid rgb(179, 179, 179);
		border-left: 3rpx solid rgb(179, 179, 179); */
	width: 12rpx;
	height: 12rpx;
	right: 5rpx;
	top: 30%;
	transform: rotate(135deg);
}
</style>
