<!-- 
	2021/6/29
	xjm
	2524931333@qq.com s
-->
<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		onLoad(res) {
			plus.screen.lockOrientation("portrait-primary")
			if(res.home){
			
				uni.switchTab({
					url: '/pages/tool/index'
				})
			}else{
				uni.redirectTo({
				    url: '/pages/tool/index'
				});
				
			}
		},
		created() {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
