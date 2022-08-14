<template>
	<view class="grey text">
			<u-toast ref="uToast" />
			<u-top-tips ref="uTips"></u-top-tips>
			<tm-message ref="toast"></tm-message>
		<u-notice-bar mode="horizontal" type="primary" :list="list"></u-notice-bar>

		<tm-sheet  :shadow="24">
			<view class="text-size-l text-weight-b mb-24">
				一、开发不易,使用教评需要分享给三个好友或群,谢谢！
			
			</view>
					<view class="text-size-s text-weight-b mb-24">
						二、请开始你的自定义评分，一个小星星20分。
					</view>
					<view class="text-size-s text-weight-b mb-24">
						三、密码错误请到个人页绑定正确教务密码。
					</view>
					<view class="text-size-s text-bg-gradient-red-accent mb-24">
						四、授权请到公众号CDTU口袋君回复"教评"获取!
					</view>
				<view class="" style="margin-top: 20upx;margin-left: 20upx;">
							<u-field
								 v-model="sqm"
								label="授权码"
								placeholder="请先获取你的授权码"
							>
							</u-field>
							
						
				</view>
					<view class="" style="margin-top: 20upx;margin-left: 20upx;">
								<u-field
									
									label="评语"
									placeholder="请填写评语"
								>
								</u-field>
								
							
					</view>
					
					<view class="" style="margin-top: 30upx;margin-left: 40upx;" >
						评分等级：
						<u-rate  ></u-rate>
							
						
					
					</view>
				
				
				</tm-sheet>
				<view style="display: flex;justify-content: space-between;">
					
					
					<view class="u-body-item  " style="margin-left: 20upx;" >
						
					<u-button  type="primary" @click="jp">开始教评</u-button>
					</view>
					<view		style=""	>
					<u-button  type="primary" @click="jiaqun">加入群聊</u-button>
					</view>
					<view class="u-body-item  " style="margin-right: 20upx;" >
					<u-button  type="primary" @click="onAppShare">分享给好友</u-button>
						
					</view>
				</view>
			
				
				<view style="text-align:center;border:greensolid1px;"><image src="http://cdn.jaycao.com/wx.jpg">
				</image>
				
				
				<!-- <p>网页端长按二维码，公众号回复"教评"可获取授权码❤️</p> -->
				<p>APP端，公众号:CDTU口袋君回复"教评"可获取授权码❤️</p>
				</view>
					<view class="solid-bottom text-xs padding" style="margin-left: 420upx;">
										<text class="text-gray">公众号:CDTU口袋君</text>
									</view>
				
				
				
		
	</view>
</template>

<script>
	// #ifdef H5
	// import { getBrowser } from '@/config/html5Utils.js';
	// #endif
		import request from '@/common/request.js';
		import tmFullView from "@/tm-vuetify/components/tm-fullView/tm-fullView.vue"
		// import tmFullView from "@/tm-vuetify/components/tm-fullView/tm-fullView.vue"
		import tmPassword from "@/tm-vuetify/components/tm-password/tm-password.vue"
		import tmSheet from "@/tm-vuetify/components/tm-sheet/tm-sheet.vue"
		import appShare, { closeShare } from '@/uni_modules/zhouWei-APPshare/js_sdk/appShare';
		import tmButton from "@/tm-vuetify/components/tm-button/tm-button.vue"
		import tmMessage from "@/tm-vuetify/components/tm-message/tm-message.vue"
		
	export default {
		components: {
			tmFullView,
			tmSheet,
			// tmMenubars,
			tmButton,
			tmMessage,
	
		},
		data() {
			return {
				list:[
					'一键教评，人数过多时，可能需要等待'
				],
				i:0,
				j:0,
				url:'',
				sqm:'',
				xh:'',
				form: {
								name: '',
								intro: '',
								sex: ''
							},
							checkboxList: [
											{
												name: '苹果',
												checked: false,
												disabled: false
											},
											{
												name: '雪梨',
												checked: false,
												disabled: false
											},
											{
												name: '柠檬',
												checked: false,
												disabled: false
											}
										],
			}
		},
		onLoad() {
			this.getjiaquninfo()
			// uni.setStorage({key: 'i',data: 0});
				
		},
		methods: {
			// APP分享
					onAppShare() {
						if(uni.getStorageSync('i')==3){
							this.$refs.uTips.show({
											title: '你已完成,无需再次分享,谢谢！',
											type: 'success',
											duration: '2300'
										})
										return
						}
						// #ifdef APP-PLUS
						let shareObj = appShare({
							shareUrl:"http://zscg.jaycao.com/",
							shareTitle:"掌上成工APP",
							shareContent:"只需一点,三秒完成教评!",
							shareImg:"http://zscg.jaycao.com/static/image/Pixel-True-Mockup.png",
							appId : "wxd0e0881530ee4444", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
							appPath : "pages/home/home",
							appWebUrl : "http://zscg.jaycao.com/",
						},res => {
							console.log("分享成功回调",res);
							// 分享成功后关闭弹窗
							// 第一种关闭弹窗的方式
							this.j=this.j+1
							if(this.j==0){
								uni.setStorageSync('i', 0);
							}
							if(this.j==1){
								uni.setStorageSync('i', 1);
							}
							if(this.j==2){
								uni.setStorageSync('i', 2);
							}
							if(this.j==3){
								uni.setStorageSync('i', 3);
							}
						
							this.$refs.uTips.show({
											title: '分享成功一次',
											type: 'success',
											duration: '2300'
										})
							closeAppShare();
										
										
						});
						setTimeout(() => {
							// 第二种关闭弹窗的方式
							shareObj.close();
						},5000); 
						// #endif
						// #ifndef APP-PLUS
						uni.showToast({
							title:"请在APP环境使用",
							icon:"none"
						});
						// #endif
					},
					onPublicShare(){
						// #ifdef H5
						 if (getBrowser() == '微信') {
						 	publicShare({
						 		shareUrl:"https://kemean.com/",
						 		shareTitle:"分享的标题",
						 		shareContent:"分享的描述",
						 		shareImg:"http://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg",
						 	},function(){
						 		uni.showToast({
						 			title: '分享设置成功！',
						 			icon: 'none'
						 		});
						 	});
						 } else {
						 	uni.showToast({
						 		title: '请在微信浏览器使用',
						 		icon: 'none'
						 	});
						 }
						// #endif
						// #ifndef H5
						uni.showToast({
							title: '请在微信浏览器使用',
							icon: 'none'
						});
						// #endif
					},
					onPageJump(url) {
						uni.navigateTo({
							url: url
						});
					},
				
				//用户点击分享
				onShareAppMessage(e) {
					// wxShare方法已挂载全局
					return this.wxShare();
				},
			getjiaquninfo() {
				request.httpRequest({
					url: 'notice/noticeBanner/getAppInfo/6'
				}).then(res => {
					if (res.data.code == 200) {
						console.log(res.data.data)
						// this.qq = res.data.data.img
						this.url = res.data.data.navurl
					}
			
			
				})
			},
			jiaqun() {
			
			
			
			
				//#ifdef APP-PLUS
				plus.runtime.openURL('https://qm.qq.com/cgi-bin/qm/qr?k=-58QbU4j1nW2LUNTUM_BNhCknlDHF1lV&jump_from=webapi');
				//#endif
				// #ifdef H5
				window.location.href ='https://qm.qq.com/cgi-bin/qm/qr?k=-58QbU4j1nW2LUNTUM_BNhCknlDHF1lV&jump_from=webapi'
				// #endif	
			
				//提示模板
			
			
				// uni.navigateTo({
				//     url: 'https://qm.qq.com/cgi-bin/qm/qr?k=-58QbU4j1nW2LUNTUM_BNhCknlDHF1lV&jump_from=webapi'
				// });
			
			
			
			},
			jp() {
				
				// console.log(this.i)
			let i=uni.getStorageSync('i')
				if(i<3){
					if(i==0){this.$refs.uTips.show({
									title: '还差3次分享就可以教评了哦',
									type: 'success',
									duration: '2300'
								})}
					if(i==1){
						this.$refs.uTips.show({
										title: '还差2次分享就可以教评了哦',
										type: 'success',
										duration: '2300'
									})
					}
					if(i==2){
						this.$refs.uTips.show({
										title: '还差1次分享就可以教评了哦',
										type: 'success',
										duration: '2300'
									})
					}
					
					return
				}
				this.$refs.uTips.show({
								title: '你已可以使用教评功能',
								type: 'success',
								duration: '2300'
							})
				this.$refs.toast.show({model:'load',mask:true,label:'正在教评中,请等待'})
				// console.log(this.url)
				this.xh=uni.getStorageSync('userinfo').xh
				this.xh=(this.xh-65)*11
				let opts = {
					url: this.url+'?xh='+this.xh+'&pwd='+uni.getStorageSync('userinfo').jwpwd+'&sqm='+this.sqm,
					method: 'get',
				};
				
				console.log(this.url+'?xh='+this.xh+'&pwd='+uni.getStorageSync('userinfo').jwpwd+'&sqm='+this.sqm)
				request.request(opts).then(res => {
					if(res.data.msg==200){
						console.log(res.data.msg.msg)
						this.$refs.toast.hide();
						this.$refs.toast.show({model:'success',mask:true,label:'教评已经完成,请前往教务系统查看'})
					}
					if(res.data.msg==401){
						console.log(res.data.msg.msg)
						this.$refs.toast.hide();
						this.$refs.toast.show({model:'error',mask:true,label:'授权码错误'})
					}
					if(res.data.msg==500){
						console.log(res.data.msg.msg)
						this.$refs.toast.hide();
						this.$refs.toast.show({model:'error',mask:true,label:'请前往个人页绑定正确的教务密码'})
					}
					
					
				}).catch(
				response =>{
					this.$refs.toast.hide()
					this.$refs.toast.show({model:'error',mask:true,label:'当前服务未开启,请加群查看开放时间'})
				}
				)
				
			},
		}
	}
</script>

<style>

</style>
