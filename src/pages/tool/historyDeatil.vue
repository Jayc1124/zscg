<template>
	<view>
		<view class="title">
			{{item.title}}
		</view>
		<view class="u-content">
			<u-parse :html="item.content" :lazy-load="true" :show-with-animation="true" :tag-style="style"></u-parse>
		</view>

	</view>
</template>

<script>
	import request from '@/common/request.js';
	export default {
		onLoad(e) {
			this.id = JSON.parse(decodeURIComponent(e.detailData))
			this.getHistory()
		},
		data() {
			return {
				id: 0,
				item: Object,
				style: {
					// 字符串的形式
					p: 'font-size:32rpx;margin-bottom:30rpx;text-indent: 2em;',
					img: 'margin-left:-2em',
					span: 'font-size: 30rpx'
				}
			}
		},
		methods: {
			getHistory(id) {
				request.request({
					url: 'https://v2.alapi.cn/api/eventHistory/get',
					method: 'get'
				},{
					token:'NdbhV0rvD13eDGBI',
					id:this.id
				}).then(res => {
					console.log(res)
					this.item = res.data.data
					uni.setNavigationBarTitle({
						title: this.item.title
					});
				}, {})
			},
		}
	}
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
