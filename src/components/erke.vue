<template>
	<view>
		<view class="wrap">
			<!-- <u-toast ref="uToast"></u-toast>
			<tm-message ref="toast"></tm-message> -->
				<view class="u-tabs-box">
					
					<u-tabs-swiper activeColor="#4e9bff" ref="tabs" :list="erkenarlist" :current="ek_current" @change="change1"
						:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
						
						<tm-tabs :list="erkenarlist" :width="1000" :height="300" default-name="0" @change="tabschange">
						</tm-tabs>
				</view>
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="ek_swiperek_current"
				@transition="transition1" @animationfinish="animationfinish1">
				
				<swiper-item class="swiper-item" v-for="(item,indexs) in erkeList" :key="indexs" >
					
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view class="" v-for="(res, index) in item" :key="index" @click="notice">
								<erke-list :list="res"></erke-list>
							</view>
							<view v-if="item.length>4">
								<u-loadmore :status="ek_loadStatus[indexs]" bgColor="#f2f2f2"></u-loadmore>
							</view>
							
							<view style="padding: 2%;" v-show="!more[indexs]">
								数据与成工青年同步
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import erkeList from './erke-list';
	import request from '@/common/request.js';
	// import tmMessage from "@/tm-vuetify/components/tm-message/tm-message.vue"
	export default {
		components:{
			erkeList
		},
		data() {
			return {
				erkeList: [
					[],
					[],
					[]
				],
				erkenarlist: [
					{
						name: '线下'
					},
					{
						name: '线上'
					},{
						name: '可报名'
					}
				],
				ek_current: 0,
				ek_swiperek_current: 0,
				ek_dx: 0,
				ek_loadStatus: ['nomore', 'nomore', 'nomore'],
				ek_pageid: [1, 1, 1],
				more:[0,0,0],
				swiperheight: 200,
				stuat: true
			};
		},
		
		created() {
			uni.getSystemInfo({
			    success: (res)=> {
			        let height=res.windowHeight
					this.swiperheight=height;
			    }
			})
			this.timer = setTimeout( () => {
			    // 这里添加您的逻辑		
				this.getErkeList(0)
			}, 500)
			
			
		},
		onHide() {
			if(this.timer) {  
				clearTimeout(this.timer);  
				this.timer = null;  
			}  
		},
		methods: {
			// 页面数据
			   
			getErkeList(index) {
				
				let url =''
				if(index == 0){
						// this.$refs.toast.show({model:'load',mask:true})
					url = 'wx/erke/getxx'
				} else if(index == 1){
					// this.$refs.toast.show({model:'load',mask:true})
					url = 'wx/erke/getxs'
				} else {
					// this.$refs.toast.show({model:'load',mask:true})
					url = 'wx/erke/getbm'
				}
				
				request.httpTokenRequest({
					url: url,
					method: 'get'
				}, {}).then(res => {
					if (res.data.code == 200) {
						  // this.$refs.toast.hide();
						this.ek_pageid[index]++
						for (let i = 0; i < res.data.data.data.records.length; i++) {
							this.erkeList[index].push(res.data.data.data.records[i]);
						}
						if(!this.erkeList[index].length){
							this.more[index] = 0
						} else {
							this.more[index] = 1
						}
					}
				})
				// console.log(res.data.rows)


			},
			notice(){
				//
					// this.$refs.toast.show({model:'info',mask:true,label:'1秒后跳转到青春成工'})
					
					
					setTimeout(function(){
					// uni.navigateTo({
					// url:'http://wxex.com.cn/LBWX/wx/main-member'
					// })
					  // this.$refs.toast.hide();
			
					},1000)
				setTimeout(function(){
				// uni.navigateTo({
				// url:'http://wxex.com.cn/LBWX/wx/main-member'
				// })
				  uni.navigateTo({
				  	url: '../webView/webView?detailData=' + encodeURIComponent(JSON.stringify('http://cdtu.cliv2.dongst.cn/#/')),
				  });
							
				},1000)
				
				
				// uni.showModal({
				//     title: '提示',
				//     content: '即将跳转青春成工',
				//     // success: function (res) {
				//     //     if (res.confirm) {
				//     //         console.log('用户点击确定');
				//     //     } else if (res.cancel) {
				//     //         console.log('用户点击取消');
				//     //     }
				//     // }
				// });
				
				// //#ifdef APP-PLUS
				// // let url1=""
				// plus.runtime.openURL("");
				// //#endif
				// // #ifdef H5
				// window.location.href = "http://cdtu.cliv2.dongst.cn/#/"
				// #endif	
		
			},
			// tab栏切��
			change1(index) {
				this.ek_swiperek_current = index;
			},
			transition1({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish1({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.ek_swiperek_current = current;
				this.ek_current = current;
				if (this.ek_pageid[this.ek_current] == 1) {
					this.getErkeList(this.ek_current)
				}
			}
		}
	};
</script>



<style lang="scss" scoped>
	page {
		height: 100%;
		background-color: #f4f6f6;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
	}
</style>
