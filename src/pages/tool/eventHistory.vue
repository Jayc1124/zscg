<template>
	<view>
		<view  class="body" v-for="(item,index) in data" :key="index">
			<view @click="gotoDeatil(item.id)">
				<view style="font-weight: bold; font-size: 35upx;">{{item.date}}</view>
				<view style="color: #a7a7a7;">{{item.title}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import request from '@/common/request.js';
	export default {
		data() {
			return {
				data:[]
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			gotoDeatil(id){
				uni.navigateTo({
					url:'./historyDeatil?detailData=' + encodeURIComponent(JSON.stringify(id))
				})
			},
			getData() {
				let opts = {
					url: `https://v2.alapi.cn/api/eventHistory`,
					method: 'get',
				};
				// let params = {
				// 	code: res.code
				// };
				// console.log(this.name)
				request.request(opts,{
					token:'NdbhV0rvD13eDGBI'
				}).then(res => {
					console.log(res)
					this.data = res.data.data
					console.log(this.data)
				})
			},
		}
	}
</script>

<style>
.body{
	background-color: #FFFFFF;
	width: 90%;
	margin: auto;
	margin-top: 20upx;
	/* height: 200upx; */
	border-radius: 10upx;
	margin-bottom: 10upx;
}
.body>view>view{
	padding: 20upx 30upx;
}
</style>
