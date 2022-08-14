<template>

	<view class="container" style="background-color:#F3F3F3;">
		<!-- <tm-menubars title="个人中心" color="primary" :showback="false" flat ="true" theme="white" transparent="true" iconColor="white"></tm-menubars> -->
		<view class="header">
			<view class="userInfo" @tap="touserspace">
				<view class="avatar" @tap="touserspace">
					<image class="avatar" :src="homeinfo.userpic||'https://cdn2.jaycao.com/cdtu/a.png'"
						mode="aspectFill"></image>
				</view>
				<view class="name" @tap="touserspace">{{homeinfo.username}} </view>
				<view style="margin-left: 180upx;"> <text class="text-grey">uid:{{xh}}</text></view>
			</view>

			<!-- <view class="userInfo" v-else><view @click="getCode" class="login-btn">立即登录</view></view> -->

		</view>
			</view>
		<view class="" style="margin-top: 150upx;">
		<tm-sheet :round="3"  style=""> 
			<tm-text :font-size="40" _class="font-weight-b" label="个人中心"></tm-text>
			<!-- <tm-divider></tm-divider> -->
			<tm-grid :col="3" :width="630">
			
				<tm-grid-item text url="../chart/index" :height="180" >
					<tm-icon color="blue-grey" _class="pb-10" :font-size="52" name="tmicon-borderbottom-fill">
					</tm-icon>
					<tm-text :font-size="28" _class="font-weight-b" label="信息绑定"></tm-text>
					
				</tm-grid-item>
				<tm-grid-item text url="../chart/index" :height="180" >
					<tm-icon color="blue-grey" _class="pb-10" :font-size="52" name="tmicon-borderbottom-fill">
					</tm-icon>
					<tm-text :font-size="28" _class="font-weight-b" label="身份认证"></tm-text>
				
				</tm-grid-item>
				<tm-grid-item text url="../chart/index" :height="180" >
					<tm-icon color="blue-grey" _class="pb-10" :font-size="52" name="tmicon-borderbottom-fill">
					</tm-icon>
					<tm-text :font-size="28" _class="font-weight-b" :label="1"></tm-text>
				
				</tm-grid-item>
		
		
			</tm-grid>
		</tm-sheet>
			<view class="banner px-20 mt-20">
				<u-swiper :list="list" height="165" mode=""></u-swiper>
			</view>

		</view>

		<view class="bgColor"></view>
		<view class="tool-list">
				<view class="title">常用工具</view>
				<view class="flex">
					<view class="item" v-for="(item, index) in tools" :key="index" @click="goTool(item.url)">
				
							<image :src="item.icon" mode=""></image>
							<view>{{ item.title }}</view>
					
					</view>
				</view>
			</view>


</template>


<script>
	// import homeInfo from '../../../components/home-info.vue';
	// import homeInfo2 from '../../../components/home-info2.vue';
	// import homeData from '../../../components/home-data.vue';
	import request from '@/common/request.js';
	export default {
		components: {

			// homeInfo,
			// homeInfo2,

			// homeData
		},
		data() {

			return {
				tools: [{
						url: '1',
						icon: '../../../static/tools-1.png',
					title: '成工排行',
					show: true
				},
				{
					url: '2',
					icon: '../../../static/tools-2.png',
				title: '用户统计',
				show: true
			}, {
				url: '3',
				icon: '../../../static/tools-3.png',
			title: '意见反馈',
				show: true
		},
		{
			url: '4',
			icon: '../../../static/tools-7.png',
		title: '更新记录',
		status: 0,
		statusFlag: 1,
		show: true
	}, {
		url: '5',
		icon: '../../../static/vip.png',
	title: '管理申请',
		status: 0,
		show: true
	}, {
		url: '6',
		icon: '../../../static/tools-6.png',
	title: '加入Q群',
		show: false
	}, {
		url: '7',
		icon: '../../../static/tools-8.png',
	title: '清除缓存',
		show: false
	}, {
		url: '8',
		icon: '../../../static/tools-8.png',
	title: '关于开发者',
		show: false
	}
	],
	orders: [{
				id: 1,
				icon: '../../../static/my_service/images/my_service_8_8.jpg',
				title: '动态',
			},
			{
				id: 2,
				icon: '../../../static/my_service/images/my_service_11_11.jpg',
			title: '评论',
		}, {
			id: 3,
			icon: '../../../static/my_service/images/my_service_14_14.jpg',
		title: '信息绑定',
	}, {
		id: 4,
		icon: '../../../static/my_service/images/my_service_17_17.jpg',
	title: '身份认证',
	}, {
		id: 5,
		icon: '../../../static/order-5.png',
	title: '已完成',
	}
	],
	// background: {
	// 	backgroundColor: '#001f3f',

	// 	// 导航栏背景图
	// 	background: 'url(https://youjin.phpcaff.cn/uploads/20220503/38638bc88a85e10507bdffbbacd1fff8.png) no-repeat',
	// 	// 还可以设置背景图size属性
	// 	// backgroundSize: 'cover',

	// 	// 渐变色
	// 	// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
	// },
	bgColor: 'transparent',
		userinfo: {},
		homeinfo: {
			username: '梦想',
			userpic: 'https://cdn2.jaycao.com/cdtu/a.png',
			totalnum: 10,
			todaynum: 10
		},
		homedata: [{
				name: '动态',
				num: 0
			},
			{
				name: '评论',
				num: 0
			},
			{
				name: '收藏',
				num: 0
			}
		],
		// Custom: this.Custom,

		storageSize: '',
		spaceShow: true,
		pic: '',
		url: '',
		qq: '',
		xh: '',
		userName: '同学',
		nickName: '同学',
		modalName: null,
		status: '未认证',
		picName: '流星之夜',
		list: [{
				image: 'https://cdn2.jaycao.com/cdtu/tool1.png',
				title: '昨夜星辰昨夜风，画楼西畔桂堂东'
			},
			{
				image: 'https://cdn2.jaycao.com/cdtu/wban.png',
				title: '身无彩凤双飞翼，心有灵犀一点通'
			}
		],
		pic: [{
			link: 'https://wx.jaycao.com/zjx_me_bg1.jpeg',
			name: '春天'
		}, {
			link: 'https://wx.jaycao.com/zjx_me_bg2.jpeg',
			name: '夏天'
		}, {
			link: 'https://cdn.zhoukaiwen.com/zjx_me_bg3.jpeg',
			name: '秋天'
		}, {
			link: 'https://cdn.zhoukaiwen.com/zjx_me_bg4.jpeg',
			name: '冬天'
		}, {
			link: 'https://cdn.zhoukaiwen.com/zjx_me_bg5.jpeg',
			name: '幽静'
		}, {
			link: 'https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg',
			name: '天空'
		}],
		topBackGroupImageIndex: 3,
		inter: [{
			title: 'mimicry',
			name: '活力春天',
			color: ''
		}, {
			title: 'theme',
			name: '清爽夏日',
			color: ''
		}, {
			title: 'theme',
			name: '金秋之韵',
			color: ''
		}, {
			title: 'theme',
			name: '冬日之阳',
			color: ''
		}, {
			title: 'theme',
			name: '幽兰星空',
			color: ''
		}, {
			title: 'theme',
			name: '流星之夜',
			color: ''
		}]
	}
	},
	// 分享小程序
	onShareAppMessage(res) {
			return {
				title: '看看这个小程序多好玩～',
			};
		},
		watch: {
			topBackGroupImageIndex(val) {
				console.log(val)
				if (val == 4 || val == 5) {
					this.spaceShow = true;
				} else {
					this.spaceShow = false;
				}
			}
		},
		onLoad() {

			if (uni.getStorageSync('userinfo').avatar) {
				this.homeinfo.userpic = uni.getStorageSync('userinfo').avatar

			}

			this.homeinfo.username = uni.getStorageSync('userinfo').userName
			this.getStorageSize();
			this.getjiaquninfo();
			if (uni.getStorageSync('xh') != null) {

				this.status = '已认证'
				console.log(this.status)
			}
		},
		mounted() {

			this.xh = ((parseInt(uni.getStorageSync('userinfo').xh) + 8888) * 12).toString()

		},
		methods: {
			goOrder(id) {
				if (!uni.getStorageSync('xh')) {
					// this.$tools.toast('请先登录');
					return;
				}
				if (id == 1) this.touserspace()
				else if (id == 2) this.touserspace()
				else if (id == 3) this.getInfo()
				else if (id == 4) this.vertify()
			},
			goTool(url) {
				if (!uni.getStorageSync('xh')) {
					// this.$tools.toast('请先登录');
					return;
				}
				if (url == 1) {
					uni.navigateTo({
						url: '../../me/salary'
					})
				} else if (url == 2) {
					uni.navigateTo({
						url: '../../me/charts'
					})
				} else if (url == 3) this.fk()
				else if (url == 4) {
					uni.navigateTo({
						url: '../../me/log/log'
					})
				} else if (url == 5) this.jiaqun()
				else if (url == 6) this.jiaqun()
				else if (url == 7) this.clearStorage()
				else if (url == 8) this.goAboutMe()
			},
			touserspace() {
				uni.navigateTo({
					url: '../../../pages/userspace/userspace?xh=' + this.xh
				})
			},
			fk() {

				uni.navigateTo({
					url: '../../webView/webView?detailData=' + encodeURIComponent(JSON.stringify(
						'https://support.qq.com/embed/phone/408686')),
				});




			},
			submit() {
				uni.request({
					url: "https://support.qq.com/product/408686",
					method: 'POST',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						// 对于上面的form表单提交，我们可以直接在uni.request的data属性中直接提交就行了
						nickname: this.homeinfo.username.substr(0, 1) + "同学",
						avatar: this.homeinfo.userpic,
						openid: this.homeinfo.username,
					},
					success: (res) => {
						// 服务器返回结果
					}
				})
			},
			getjiaquninfo() {
				request.httpRequest({
					url: 'notice/noticeBanner/getAppInfo/5'
				}).then(res => {
					if (res.data.code == 200) {
						console.log(res.data.data)
						this.qq = res.data.data.img
						this.url = res.data.data.navurl
					}


				})
			},
			fuzhiqq() {
				uni.setClipboardData({
					data: this.qq, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: 'QQ群已复制，若加群失败,请手动加群'
						})
					}
				});
			},
			jiaqun() {




				//#ifdef APP-PLUS
				plus.runtime.openURL(this.url);
				//#endif
				// #ifdef H5
				window.location.href = this.url
				// #endif	

				//提示模板


				// uni.navigateTo({
				//     url: 'https://qm.qq.com/cgi-bin/qm/qr?k=-58QbU4j1nW2LUNTUM_BNhCknlDHF1lV&jump_from=webapi'
				// });



			},
			vertify() {
				const xh = uni.getStorageSync('xh')
				if (xh == null) {
					uni.navigateTo({
						url: '../../me/setNumber/setNumber'
					})
				} else {
					uni.showToast({
						title: '已认证'
					})
				}
			},
			getStorageSize: function() {
				let that = this;
				uni.getStorageInfo({
					success(res) {
						let size = res.currentSize;
						if (size < 1024) {
							that.storageSize = size + ' B';
						} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
							that.storageSize = Math.floor(size / 1024 * 100) / 100 + ' KB';
						} else if (size / 1024 / 1024 >= 1) {
							that.storageSize = Math.floor(size / 1024 / 1024 * 100) / 100 + ' M';
						}
					}
				})
			},
			clearStorage: function() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定清除缓存吗?',
					confirmText: '立即清除',
					success(res) {
						if (res.confirm) {
							uni.clearStorageSync();
							//重新获取并显示清除后的缓存大小
							that.getStorageSize();
							uni.showToast({
								title: '清除成功'
							})
							uni.reLaunch({
								url: "../../login/login"
							})
						}
					}
				})
			},

			// authUserInfo(){
			// 	uni.getUserProfile ({
			// 		desc:'weixin',
			// 		lang:'zh_CN',
			// 		success:res=>{
			// 			console.log("用户",JSON.stringify(res));
			// 			uni.setStorageSync('nickname',res.userInfo.nickName)
			// 			this.userName=uni.getStorageSync('nickname'),
			// 			this.userInfo={
			// 			nickname:res.userInfo.nickName,

			// 			// sex:res.userinfo.gender===1,
			// 			avatar:res.userInfo.avatarUrl,
			// 			// city:res.userInfo.city,
			// 			}
			// 			console.log("userinfo",this.userInfo);
			// 			let opts = {
			// 			url:'wx/user/wx421dd1550095f40c/postAuth',
			// 			method: 'post'
			// 			};
			// 			request.httpTokenRequest(opts,this.userInfo).then(res=>{
			// 					console.log(res)
			// 				}
			// 			)

			// 		}

			// 	})
			// },
			getGitee() {
				uni.setClipboardData({
					data: 'https://gitee.com/kevin_chou',
					success: function() {
						console.log('success');
					}
				});
			},
			switchImage(index, name) {
				this.topBackGroupImageIndex = index;
				this.modalName = null;
				this.picName = name;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			showGitee(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},


			getInfo() {
				uni.navigateTo({
					url: '../../me/editme'
				})
			},
			// 关于作者
			goAboutMe() {
				uni.navigateTo({
					url: '../../me/abme/abme'
				})
			},

		}
	}
</script>
<style lang="scss">
	// .bgColor {
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	background: #F3F3F3;
	// 	z-index: -1;
	// }

	.header {
		background: url(https://youjin.phpcaff.cn/uploads/20220503/38638bc88a85e10507bdffbbacd1fff8.png) no-repeat;
		background-size: cover;
		padding-top: 30px;
	}

	.userInfo {
		padding: 60px 30upx 0;
		border-radius: 12upx 12upx 0px 0px;
		height: 130upx;
		display: flex;
		align-items: center;

		.avatar {
			width: 130upx;
			height: 130upx;
			border-radius: 100%;
			position: relative;

			.level {
				width: 32upx;
				height: 32upx;
				position: absolute;
				right: 0;
				top: 0;
			}
		}

		.name {
			margin-left: 28upx;
			font-size: 36upx;
			font-weight: 500;
			color: #000000;
		}

		.login-btn {
			flex: 1;
			font-size: 32upx;
			font-weight: 500;
			color: #3bb061;
			line-height: 176upx;
			text-align: center;
		}
	}

	.card-group {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 50upx 8upx;
		border-radius: 0px 0px 12upx 12upx;

		.item {
			width: 172upx;
			padding-bottom: 38upx;
			border-radius: 12upx;
			text-align: center;

			.num {
				font-size: 42upx;
				font-weight: bold;
				color: #333333;
				line-height: 1;
				margin-top: 20upx;
			}

			.title {
				font-size: 24upx;
				font-weight: 500;
				color: #999999;
				line-height: 1;
				margin-top: 20upx;
			}
		}
	}

	.order {
		background: #ffffff;
		border-radius: 16upx;
		// margin: 20upx;



		.title {
			font-size: 34upx;
			font-weight: bold;
			color: #333333;
			padding: 42upx 32upx 46upx;
		}

		.flex {
			font-size: 26upx;
			font-weight: 400;
			color: #999999;
		}

		.list {
			// @include menu-list(5);
			padding-bottom: 30upx;

			.item {
				image {
					width: 52upx;
					height: 52upx;
				}

				view {
					font-size: 26upx;
					color: #666666;
					margin-top: 10upx;
				}
			}
		}
	}

	// .banner {
	// 	margin: 20upx 0;

	// image {
	// 		width: 100%;
	// 		height: 120upx;
	// 	}
	// }

	.tool-list {
		background: #fff;
		border-radius: 16upx;
		margin: 20upx;

		.title {
			font-size: 34upx;
			font-weight: bold;
			color: #333333;
			padding: 42upx 32upx 46upx;
		}

		.flex {
			flex-wrap: wrap;
		}

		.item {
			width: 25%;
			text-align: center;
			margin-bottom: 60upx;
			font-size: 28upx;
			font-weight: 400;
			color: #222222;
			position: relative;

			.tip {
				position: absolute;
				right: 60upx;
				top: 0;
				z-index: 100;
				width: 20upx;
				height: 20upx;
				border-radius: 100%;
				// background: $color-error;
			}

			image {
				width: 60upx;
				height: 60upx;
				margin-bottom: 10upx;
			}
		}
	}
</style>
