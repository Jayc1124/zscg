<template>
	<tm-app ref="app">
		<!-- <tm-navbar :title="item.title" :shadow="0" iconFontSize="2"> -->
			
		<!-- </tm-navbar> -->

		    <tm-sheet  :round="3" :margin="[5, 5]">
		            <tm-text :font-size="32" _class="font-weight-b" :label="item.title" class="title" style="text-align:center"></tm-text>
					<view v-if="!pd" style="color: 	#000000;">
		
						<u-parse :html="item.content" :lazy-load="true" :show-with-animation="true" :tag-style="style" :selectable="true"></u-parse>
					</view>
					
					<view v-if="pd" style="color: #ffffff;">
						
						<u-parse :html="item.content" :lazy-load="true" :show-with-animation="true" :tag-style="style" :selectable="true"></u-parse>
					</view>
		        </tm-sheet>

			<!-- #ifdef MP-WEIXIN -->
			<ad unit-id="adunit-76de44ddd1d6eae3" ad-type="video" ad-theme="white"></ad>
			<!-- #endif -->
	</tm-app>
</template>

<script>
	// import uParse from '@/uni_modules/u-parse/u-parse.vue'
	<!-- #ifndef APP-PLUS -->
import {useTmpiniaStore} from '@/tmui/tool/lib/tmpinia';
const store = useTmpiniaStore();
<!-- #endif -->
			import request from '@/common/request.js';
export default{

		data() {
			return {
				tip: '可以分享链接到朋友圈了哦',
				share: {
					title: '',
					imageUrl: 'https://www.cdtu.edu.cn/images/2021xiaofeng4xiaoxun.png',
				},
				id: 39371,
				item: Object,
				pd:'',
				style: {
					// 字符串的形式
					p: 'font-size:32rpx;margin-bottom:30rpx;text-indent: 2em;',
					img: 'margin-left:-2em',
					span: 'font-size: 30rpx'
				}
			}
		},
		methods:{
			getOrderList(index) {
				console.log('这里出错了嘛')
				request.httpRequest({
					
					url: 'news/getinfo/'+this.id,
					method: 'get'
				}).then(res => {
					console.log('这里出错了嘛')
					this.item = res.data.data
					uni.setNavigationBarTitle({
						title: this.item.title,
						
					});
				}, {})
			},
		},
		
		onLoad(e){
		<!-- #ifndef APP-PLUS -->
		this.pd=store.tmStore.dark
		<!-- #endif -->
		
		<!-- #ifdef APP-plus -->
		this.pd=uni.getStorageSync('anhei')
		<!-- #endif -->
			
		
				console.log(this.pd)
				//JSON.parse(decodeURIComponent(e.detailData))
				if (e.detailData != null) {
					console.log("正常跳转页面")
					this.id = e.detailData
					this.getOrderList()
				} else {
					console.log("分享路口页面")
					this.id = e.id
					this.getOrderList()
					console.log("onload中的" + this.id)
				}
		
		
			}}
</script>

<style lang="scss" scoped>
	.u-content {
		margin: 50rpx 15rpx;
		// margin: auto;
	}

	.title {
		text-align: center;
		font-weight: bolder;
		margin: 15upx 0;
	}
</style>
