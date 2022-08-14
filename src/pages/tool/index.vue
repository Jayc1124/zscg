<template>
	<view>
		<!-- 	<view v-if="list.length">
				<luyj-grid-link :list="list" @gridExc="clickGrid"></luyj-grid-link>
		</view> -->
		<!-- 
		<tm-pullBottom  :height="2000" :loading.sync="loading" @refresh="getinfo"> -->
		<!-- 	<view v-if="testData == 0" class="flex-center pa-24 mt-24">默认刷新，下拉测试</view> -->
			<!-- <tm-menubars title="功能" color="primary" :showback="false" flat ="true" theme="white" transparent="true" iconColor="white"></tm-menubars> -->
		<view>
			<u-notice-bar type="none" bg-color="rgba(240, 240, 240, 0.5)" mode="horizontal" :list="ls"></u-notice-bar>
		</view>
		<view @click="navurl()"
			style="border-radius: 10upx;margin-top: 20upx; height: 200upx;width: 80%;margin: auto;margin-bottom: 20upx;	box-shadow: 0rpx 0rpx 60rpx 0rpx rgba(0, 170, 255, 0.1);">
			<image style="width: 100%;height: 100%;border-radius: 10upx;" :src="img"></image>
		</view>
		<view v-if="list.length">
			<luyj-grid-link :list="list" @gridExc="clickGrid"></luyj-grid-link>
		</view>


	</view>
</template>

<script>
	import tmImages from "@/tm-vuetify/components/tm-images/tm-images.vue"
	import request from '@/common/request.js';
	import tmPullBottom from '@/tm-vuetify/components/tm-pullBottom/tm-pullBottom.vue'
		import tmMenubars from '@/tm-vuetify/components/tm-menubars/tm-menubars'

	export default {
		components: {
			tmPullBottom,
			tmMenubars,
			tmImages,
		},
		onLoad() {
			this.getgonggao()
			this.getinfo()
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			plus.screen.lockOrientation("portrait-primary");
			// #endif
			uni.startPullDownRefresh();
		
			
			
		},

		data() {
			return {
				loading: false,
				img:'',
				ls: [],
				url: 'http://www.baidu.com',
				list: [],
				list1: []
				
			}
		},
		methods: {
			getgonggao(){
				request.httpRequest({
					url: 'notice/noticeBanner/getAppInfo/3'
				}).then(res => {
					if (res.data.code = 200) {
						console.log(res.data.data)
						this.url = res.data.data.navurl;
				
						this.img=res.data.data.img
						this.ls.push(res.data.data.notice)
						console.log(this.ls)
				
					}
				})
			},
	
			navurl() {
				//#ifdef APP-PLUS
				plus.runtime.openURL(this.url);
				//#endif
				// #ifdef H5
				window.location.href = this.url
				// #endif	
			},
			onPullDownRefresh() {
				this.list = [];
				this.ls=[];
				this.getinfo();
				this.getgonggao();
				
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 500);
			},
			getinfo() {
				let opts = {
					url: `wx/getTools`,
					method: 'get',
				};
				// let params = {
				// 	code: res.code
				// };
				// console.log(this.name)

				request.httpTokenRequest(opts).then(res => {
					if (res.data.code == 200) {
						this.list = res.data.data
					} else {
						uni.showToast({

							title: '请求失败',
							duration: 2000

						})
					}

				})
			},
		}
	}
</script>

<style lang="scss">
	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>
