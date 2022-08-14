<template>
	<view style="margin-top: 20rpx;" class="cu-list menu">

		<view class="cu-item">
			<view class="content">
				<image src="https://jaycao-demo01.oss-cn-chengdu.aliyuncs.com/1-210326133036.png" class="png"
					mode="aspectFit"></image>
				<text class="text-grey">输入你的Cooike:</text>

			</view>
			<view class="action">
				<input v-model="cooike"></input>

				<!-- 	<view v-if="PageCur=='1'" class="cu-tag round bg-blue light">{{plateNo | plateNoF}}</view>
				<view v-if="PageCur!='1'" class="cu-tag round bg-green light">{{plateNo | plateNoF}}</view> -->
			</view>

		</view>
		<view class="cu-item">
			<view class="content">
				<image src="../../../static/email.png" class="png"
					mode="aspectFit"></image>
				<text class="text-grey">输入你的邮箱:</text>

			</view>
			<view class="action">
				<input v-model="email"></input>

				<!-- 	<view v-if="PageCur=='1'" class="cu-tag round bg-blue light">{{plateNo | plateNoF}}</view>
				<view v-if="PageCur!='1'" class="cu-tag round bg-green light">{{plateNo | plateNoF}}</view> -->
			</view>

		</view>
		<view class="">
			<button type="default" style="bg-blue" @click="submit">提交</button>
			<!-- <uni-button class="but"  >提交</uni-button> -->
		</view>
		<view class="text-lg">
			<text class="cuIcon-titles text-blue margin-right-xs"></text>如何查看自己的Cooike
		</view>

		<view class="padding-xs flex align-center">

			<view class="flex-sub ">

				<view class="solid-bottom text-df padding">1、教程:请查看公众号("CDTU口袋君")最新一篇文章</view>
				<view class="solid-bottom text-df padding">
					2、提交一次即可,假如你没打卡,五分钟内将会自动打卡,并且收到邮件。若未收到邮件,则可能打卡失败或你已经打卡,请检查提交的信息是否正确。要修改信息,上方重新提交即可</view>
				<view class="solid-bottom text-df padding">
					3、打卡:提交后将进入自动打卡队列,此后将在每天早上8点左右自动打卡。</view>
				<view class="solid-bottom text-df padding">
					4、可靠性测试:提交过信息后,若你已经打卡,到学校疫情打卡界面点击重新打卡。大概几分钟后你能收到自动打卡成功的邮件。再进入疫情打卡界面查看你是否打卡成功</view>
				<view class="solid-bottom text-df padding">5、提醒：cooike具有时效性,为了防止失效请通过教程获取到后，及时点击上方提交</view>

				<view class="solid-bottom text-df padding">
					6、说明：本功能使用体温36度其他全部正常+你真实位置进行打卡,若你的位置或身体情况发生变更,请停止使用本功能,前往疫情打卡界面手动打卡</view>


			</view>
		</view>

	</view>
</template>

<script>
	import QQMapWX from '@/common/qqmap-wx-jssdk.js'
	import request from '@/common/request.js';
	export default {
		data() {
			return {

				cooike: '',
				json: "{'jd':'103.88359832763672','wd':'30.7857666015625','tw':'36','hbzz':'否','qgwh':'否','glqk':'否','jkm':'绿色','jzd':'校内','xwjzd':'','qjcx':'否'}",
				email: '',
				// address: '四川成都',
				jd: '',
				wd: '',


			};
		},
		onLoad() {
			//
			// console.log(this.form.cooike);
			this.getMapAddress();
			console.log(this.json)

		},
		methods: {
			submit() {
				this.address=uni.getStorageSync('local').substring(0,6)
				
				let json1 = this.json + `'jd':'${this.jd}','wd':'${this.wd}'}`;
				
				console.log(json1);
				console.log(this.cooike);
				let opts = {
					url: `wx/yqdk/set`,
					method: 'post'
				};
				let data = {
					email: this.email,
					json: this.json,
					cooike: this.cooike,

				};
				if (this.cooike == '' || this.email == '') {
					uni.showModal({
						title: '提示',
						content: '大哥，你还没填呢'

					});
					return
				}
				request.httpTokenRequest(opts, data).then(res => {

					if (res.data.code == 200) {
						console.log("cg")
						uni.showModal({
							title: '提示',
							content: res.data.msg,

						});
					}
					// 	if (res.data.code == 200) {

					// 		this.res = res.data.data
					// 		this.number = res.data.data.mphone
					// 		this.dept = res.data.data.depname
					// 		uni.hideLoading();	}		
					// 	if(res.data.data.length==0 ) {
					// 		uni.showToast({
					// 			title: '查询教师不存在',
					// 			duration: 2000

					// 		})
					// 	}



				})
			},
			getMapAddress() {
				const tMap = new QQMapWX({
					key: '4DABZ-MTZ2R-PZLW2-WX6FG-W5IXE-APFAF' //开发者密钥
				});
				//使用 uni.getLocation获取用户所在经纬度

				//使用 uni.getLocation获取用户所在经纬度
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res) => {
						console.log("获取经纬度成功");
						this.wd = res.latitude;
						this.jd = res.longitude;
						console.log("经度:" + this.jd + "维度：" + this.wd)
					},
					fail: () => {
						console.log("获取经纬度失败");
					},
					complete: () => {
						// 使用腾讯sdk的reverseGeocoder方法 解析经纬度
						tMap.reverseGeocoder({
							location: {
								latitude: this.wd,
								longitude: this.jd
							},

							success: function(res) {
								console.log("解析地址成功", res);
								this.address = res.result.address
									
								console.log("当前地址address：" + this.address);
								console.log("当前街道")
								//保存缓存
								uni.setStorage({
																	key:'local',
																	data:res.result.address,
																	success() {
																		console.log("用户地址信息已缓存")
																	}
																})
			
							},
							fail: function(res) {
								uni.showToast({
									title: '定位失败',
									duration: 2000,
									icon: "none"
								})
								console.log(res);
							}

						})
					}
				})
			},
		}
	};
</script>
