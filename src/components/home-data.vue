<template>
	<view class="home-data u-f-a">
		<block v-for="(item,index) in homedata" :key="index">
			<view class="u-f-ajc u-f1 u-f-l"><text>{{item.num}}</text>{{item.name}}</view>
		</block>
	</view>
</template>

<script>
	export default{
		props:{
			homedata:Array,
			index:Number
		}
	}
</script>

<style scoped>
.home-data{
	padding: 30rpx;
}
.home-data>view{
	color: #999999;
}
.home-data>view>text{
	color: #343434;
	font-size: 33rpx;
	font-weight: bold;
}	
</style>
