<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-form-group">
			<view class="title">主题</view>
			<input v-model="text"   style="padding-bottom: 6.5upx;"> 
			<button @click="create()" class='cu-btn bg-blue shadow'>生成</button>
		</view>
		
		
		<view class="cu-form-group">
			<view class="title">字数</view>
			<input v-model="size"  type="number"> 
			<button @click="copy()" v-if="res" class='cu-btn bg-blue shadow'>复制</button>
		</view>
		
		
		<view class="cu-form-group">
			<textarea auto-height maxlength="-1" v-model="res" placeholder="生成结果仅供娱乐哦!"></textarea>
		</view>
		
		
	</view>
</template>

<script>
	import request from '@/common/request.js';
	var _self
	export default {
		onLoad() {
			_self = this
		},
		data() {
			return {
				text:"你为什么这么帅?",
				size: 1000,
				res:''
			}
		},
		methods: {
			create(){
				var that = this
			
					
					uni.showLoading({
					    title: '生成中'
					});
					
					//https://ppgjx.com
					request.request({
						url: "https://ppgjx.com/functions/ArticleCreate/create", //仅为示例，并非真实接口地址。
						method:"POST",
						// data: {
						// 	text:_self.text,
						// 	size:_self.size
						// },
						header:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					},{
							text:_self.text,
							size:_self.size
						}).then(res => {
						if(res.data.code == 0){
							_self.res = res.data.data	
						}
						uni.hideLoading(); 
					}).catch(err => {
						uni.hideLoading(); 
					})
					
				
			},
			copy(){
				uni.setClipboardData({
						data: this.res
					});
			}
		}
	}
</script>

<style>

</style>
