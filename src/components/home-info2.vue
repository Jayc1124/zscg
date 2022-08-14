<template>
	<view class="home-islogin u-f-a" @tap="touserspace">
		<!-- <image :src="homeinfo.userpic" mode="widthFix" lazy-load></image> -->
		<u-avatar :src="homeinfo.userpic"></u-avatar>
		<view class="home-islogin-info u-f1">
			<view style="margin-left: 20upx;">{{homeinfo.username}} </view>
			
			<!-- <view>粉丝 {{homeinfo.totalnum}} 关注 {{homeinfo.todaynum}}</view> -->
		</view>
		<view class="u-f-ajc cuIcon-right"></view>
		
		
	</view>
</template>

<script>
	export default{
		props:{
			homeinfo:Object
		},
		data(){
			return {
				xh:''
			}
		},
		mounted() {
			let userinfo = uni.getStorageSync('userinfo')
			this.xh = ((parseInt(userinfo.xh) + 8888)*12).toString()
		},
		methods:{
			touserspace(){
				uni.navigateTo({
					url: '../../me/editme'
				})
			}
		}
	}
</script>

<style scoped>
.home-islogin{
	padding: 0rpx 10rpx;
	display: flex;
	/* margin-right: 10upx; */
}
.home-islogin>image{
	width: 100rpx;
	height: 100rpx;
	border-radius: 100%;
	flex-shrink: 0;
	margin-right: 15rpx;
}
.home-islogin>view:first-of-type>view:nth-child(1){
	font-size: 32rpx;
}
.home-islogin>view:first-of-type>view:nth-child(2){
	color: #929292;
}
.home-islogin>view:last-of-type{
	height: 100%;
}	
</style>
