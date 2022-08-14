<!-- 个人中心 -->
<template>
	<view class="components-theme">
		<!-- <navigator target="miniProgram" app-id='' version='release' hover-class="none">
			<view class="dong">
				<view class="monster">
					<view class="monster__face">
						<view class="monster__eye avatar-eye avatar-eye--green eye--left">
							<view class="avatar-eye-pupil pupil--green"><span class="avatar-eye-pupil-blackThing"><span
										class="avatar-eye-pupil-lightReflection"></span></span></view>
						</view>
						<view class="monster__eye avatar-eye avatar-eye--violet eye--right">
							<view class="avatar-eye-pupil pupil--pink"><span class="avatar-eye-pupil-blackThing"><span
										class="avatar-eye-pupil-lightReflection"></span></span></view>
						</view>
						<view class="monster__noses">
							<view class="monster__nose"></view>
							<view class="monster__nose"></view>
						</view>
						<view class="monster__mouth">
							<view class="monster__top"></view>
							<view class="monster__bottom"></view>
						</view>
					</view>
				</view>
			</view>
		</navigator> -->
		<!-- 弹窗确认 -->
		<view class="cu-modal " :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog" style="padding: 300rpx 0 70rpx;">
				<view class="modal_bg"></view>
				<view class="modal_main">
					<view class='nav-list margin-top'>
						<view :class="'nav-li bg-zt' + (index+1)" v-for="(item, index) in inter" :key="index"
							@click="switchImage(index,item.name)">
							<view class="nav-name">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部背景 -->

		<view class='UCenter-bg' :style="'background-image: url(' + pic[topBackGroupImageIndex].link + ');margin-top:' + CustomBar +
		 
		 
		 'px;'">
			<view class='space' v-show="spaceShow">
				<view class="stars ">
					<view class="star "></view>
					<view class="star pink "></view>
					<view class="star blue "></view>
					<view class="star yellow "></view>
				</view>
			</view>
			<homeInfo :homeinfo="homeinfo"></homeInfo>
			<!-- 数据 -->
			<!-- <homeData :homedata="homedata"></homeData> -->
			<!-- <block>
				<view class='text-center' @click="getInfo()">
					<view class="cu-avatar2 round xl margin-right-sm shadow-blur-lg bg-img open-data "
						style="background-image:url(https://cdn2.jaycao.com/cdtu/a.png)">
					</view>
					<view class="padding  text-xl text-bold" style="color:#2979ff ;">
						你好，{{userName}}同学
					</view>

				</view>
			</block> -->

			<image
				src='https://cdn.nlark.com/yuque/0/2019/gif/280373/1570670848649-assets/web-upload/3dbaa72a-062b-470f-9b9d-058ff8f85ab8.gif'
				mode='scaleToFill' class='gif-wave'></image>
		</view>

		<!-- <block>
			<view class='padding flex text-center text-grey bg-white shadow-warp-my'>
				<view class='flex flex-sub flex-direction solid-right'>
					<view class="text-xxl text-orange">8.5k+</view>
					<view class="margin-top-sm">
						<text class='cuIcon-hot'></text> 访客</view>
				</view>
				<view class='flex flex-sub flex-direction solid-right'>
					<view class="text-xxl text-blue">1.1k</view>
					<view class="margin-top-sm">
						<text class='cuIcon-share'></text> 分享</view>
				</view>
				<view class='flex flex-sub flex-direction'>
					<view class="text-xxl text-red">1.4k+</view>
					<view class="margin-top-sm">
						<text class='cuIcon-like'></text> 点赞</view>
				</view>
			</view> -->

		<!-- <official-account></official-account> -->
		<view
			class="cu-list menu card-menu margin-top-lg margin-bottom-sm shadow-shop bg-white text-black my-radius sm-border">
			<view class="cu-item" @tap="showModal" data-target="Modal">
				<view class='content'>
					<image src='../../static/me/icon/zhuti.png' class='png' mode='aspectFit'></image>
					<text class='text-lg margin-sm'>主题切换</text>
				</view>
				<view class='action'>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-gradual-blue'>
							<view style="clear: both;"></view>
						</view>
						<view class="cu-tag line-blue">
							{{picName}}
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item ">
				<button class='content cu-btn' @click="getInfo">
					<image
						src='https://jaycao-demo01.oss-cn-chengdu.aliyuncs.com/%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF.png'
						class='png' mode='aspectFit'></image>
					<text class='text-lg margin-sm'>个人信息</text>

				</button>
				<view class="action">
					<view class="cu-tag round bg-red light">美丽</view>
					<view class="cu-tag round bg-olive light">帅气</view>
					<view class="cu-tag round bg-blue light">聪明</view>
				</view>
			</view>
			<view class="cu-item ">
				<button class='content cu-btn' @click="vertify">
					<image
						src='https://jaycao-demo01.oss-cn-chengdu.aliyuncs.com/CDTU%E5%8F%A3%E8%A2%8B%E5%90%9BBanner/%E8%AE%A4%E8%AF%81.png'
						class='png' mode='aspectFit'></image>
					<text class='text-lg margin-sm'>身份认证</text>

				</button>
				<view class="action">
					<view class="cu-tag round bg-red light">{{status}}</view>
					<!-- 			<view class="cu-tag round bg-olive light">性格</view>
															<view class="cu-tag round bg-blue light">星座</view> -->
				</view>
			</view>


		</view>

		<view
			class="cu-list menu card-menu margin-top-lg margin-bottom-lg shadow-shop bg-white text-black my-radius sm-border">


			<view class="cu-item ">
				<button class='content cu-btn' @click="jiaqun">
					<image src='../../static/qz.png' class='png' mode='aspectFit'></image>
					<view style="display: flex;justify-content: space-between;">
						<text class='text-lg margin-sm'>一键加入QQ群</text>


					</view>

				</button>
				<view class="action" @click="fuzhiqq">
					<view class="cu-tag round bg-red light">{{qq}}</view>

				</view>

			</view>



			<!-- 	<view class="cu-item" @click="callPhoneNumber" data-number="18629591093">
					<view class='content'>
						<image src='../../static/me/icon/dengta.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>技术支持</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-blue light">186 2959 1093</view>
					</view>
				</view> -->

			<!-- 	<view class="cu-item">
					<button class='content cu-btn' open-type="feedback">
						<image src='../../static/me/icon/chucuo.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>问题反馈</text>
					</button>
				</view> -->
					
			<view class="cu-item">
				<button class='content cu-btn' @click="goAboutMe">
					<image src='../../static/me/icon/xiaoxi.png' class='png' mode='aspectFit'></image>
					<text class='text-lg margin-sm'>关于开发者</text>
				</button>
			</view>
			<view class="cu-item">
				
				    <button class='content cu-btn' @click="fk">
				    	<image src='../../static/me/icon/xiaoxi.png' class='png' mode='aspectFit'></image>
				    	<text class='text-lg margin-sm'>问题反馈</text>
				    </button>
				</form>
				
			
				
			</view>
		</view>
		<view class="padding">
			<!-- <button class="cu-btn block bg-blue margin-tb-sm lg" disabled type="" >清除缓存：{{storageSize}}</button> -->
			<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="clearStorage">重新登录 缓存大小：{{storageSize}}</button>
		</view>
		</block>



	</view>
</template>

<script>
	import homeInfo from '../../components/home-info.vue';
	import homeData from '../../components/home-data.vue';
	import request from '@/common/request.js';
	export default {
		components: {
			homeInfo,
			homeData
		},
		data() {
			return {
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
				CustomBar: this.CustomBar,
				storageSize: '',
				spaceShow: true,
				pic: '',
				url: '',
				qq: '',
				userName: '同学',
				nickName: '同学',
				modalName: null,
				status: '未认证',
				picName: '流星之夜',
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
			// if(uni.getStorageSync('nickname')==''){
			// 	this.userName='点我授权'
			// }else{
			// this.userName=(uni.getStorageSync('nickname'))}
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
			// uni.showToast({
			//     title: '暂未开放,敬请期待',
			// 	icon: 'none',
			//     duration: 2000
			// });

			// this.status=uni.getStorageSync('xh')

		},
		methods: {
			fk(){
		
		
			//     /**
			//      * 发起接入请求
			//      * @param  {Number} productId  需要接入产品 id
			//      * @param  {[Object]} data     需要传递的用户信息            
			//      */
			 //    let productId=408686
				// let data ={nickname: this.homeinfo.username.substr(0,1)+"同学", 
				// avatar: this.homeinfo.userpic , 
				// openid: this.homeinfo.username,}
				// console.log(encodeURIComponent(JSON.stringify(data)))
				uni.navigateTo({
					url: '../webView/webView?detailData=' + encodeURIComponent(JSON.stringify('https://support.qq.com/embed/phone/408686?')),
				});
			//         var form = document.createElement("form");
			//         form.id = "form";
			//         form.name = "form";
			//         document.body.appendChild(form);
			
			//         // 设置相应参数 
			//         for (let key1 in data) {
			//             var input = document.createElement("input");
			//             input.type = "text";
			//             input.name = key1;
			//             input.value = data[key1];
			//             // 将该输入框插入到 form 中 
			//             form.appendChild(input);
			//         }
			//         // form 的提交方式 
			//         form.method = "POST";
			//         // form 提交路径 
			//         form.action = "https://support.qq.com/product/" + productId;
			//         // 对该 form 执行提交 
			//         form.submit();
			//         // 删除该 form 
			//         document.body.removeChild(form);
			    
			   
			
	
										
			},
			submit(){
				uni.request({
						url: "https://support.qq.com/product/408686",
						method:'POST',
						header:{'content-type' : "application/x-www-form-urlencoded"},
						data:{
							// 对于上面的form表单提交，我们可以直接在uni.request的data属性中直接提交就行了
							nickname: this.homeinfo.username.substr(0,1)+"同学",
							avatar: this.homeinfo.userpic , 
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
						url: '../me/setNumber/setNumber'
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
						//console.log(res.keys);
						//console.log(res.limitSize);
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
								url: "../login/login"
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

			// 答题测试
			// mentalTest() {
			// 	uni.navigateTo({
			// 		url: '../me/mentalTest/list'
			// 	})
			// },
			//拨打固定电话
			// callPhoneNumber() {
			// 	uni.makePhoneCall({
			// 		phoneNumber: "18629591093",
			// 	});
			// },
			getInfo() {
				uni.navigateTo({
					url: '../me/editme'
				})
			},
			// 关于作者
			goAboutMe() {
				uni.navigateTo({
					url: '../me/aboutMe'
				})
			},
			// goSet() {
			// 	uni.navigateTo({
			// 		url: '../me/set'
			// 	})
			// },
			// 薪资排名
			// goSalary() {
			// 	uni.navigateTo({
			// 		url: '../me/salary'
			// 	})
			// },
			// // 课班信息
			// goCourse() {
			// 	uni.navigateTo({
			// 		url: '../me/course'
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.UCenter-bg {
		background: #fff;
		background-size: 100% 100%;
		/* background-size: cover; */
		height: 550rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		// align-items: center;
		// color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}


	// 头像
	.cu-avatar2 {
		font-variant: small-caps;
		margin: 0;
		padding: 0;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background: #ccc;
		color: #fff;
		white-space: nowrap;
		position: relative;
		width: 150rpx;
		height: 150rpx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
		font-size: 1.5em;
		z-index: 99;
	}

	.name {
		text-shadow: 2px 2px 1px #2f9bfe;
	}

	.dialog2 {
		background: none;
	}

	.saicode {
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
	}

	.img-big image {
		top: -40px;
		width: 280rpx;
		height: 280rpx;
	}


	.shadow-me {
		box-shadow: 0rpx 0rpx 100rpx 0rpx rgba(0, 0, 0, 0.1);
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.35);
	}

	.my_logo {
		background: none;
		padding: 50rpx 0 30rpx 0;
	}

	.my-radius {
		border-radius: 12rpx;
		overflow: hidden
	}

	.my-icon image {
		width: 100rpx;
		height: 100rpx;
		display: inline-block;
		margin: 0 auto
	}

	.my-iconcolor {
		background: rgba(255, 255, 255, 0.96)
	}

	.shadow-shop {
		box-shadow: 0rpx 0rpx 90rpx 0rpx rgba(0, 0, 0, 0.1);
	}

	.qrcode-img {
		position: fixed;
		width: 80rpx;
		height: 80rpx;
		bottom: 350rpx;
		right: 30rpx;
		z-index: 1024;
		opacity: 0.8;
		box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.3);
		border: none
	}


	/* 数字背景 */
	.shadow-warp-my {
		position: relative;
		box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.shadow-warp-my:before,
	.shadow-warp-my:after {
		position: absolute;
		content: "";
		top: 20rpx;
		bottom: 30rpx;
		left: 20rpx;
		width: 50%;
		box-shadow: 0 30rpx 20rpx rgba(0, 0, 0, 0.16);
		transform: rotate(-6deg);
		z-index: -1;
	}

	.shadow-warp-my:after {
		right: 20rpx;
		left: auto;
		transform: rotate(6deg);
	}


	.bg-product {
		background-image: linear-gradient(rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0));
		color: #fff;
	}

	.margin-bottom-my {
		margin-bottom: 150rpx;
	}

	.giteeClass {
		margin-top: 30rpx;
		font-size: 34rpx;
		color: #2440B3;
		text-decoration: underline;
	}

	.cu-dialog {
		background: #FFFFFF;
		overflow: visible;
	}

	.modal_bg {
		width: 100%;
		height: 400rpx;
		position: absolute;
		top: -100rpx;
		background-image: url(https://zhoukaiwen.com/img/qdpz/modal_bg.png);
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.modal_main {
		background-color: #FFFFFF;
	}

	/* 主题色 */
	.bg-zt1 {
		color: #fff;
		background: #81d949;
	}

	.bg-zt2 {
		color: #fff;
		background: #b2e6ff;
	}

	.bg-zt3 {
		color: #fff;
		background: #f3cd41;
	}

	.bg-zt4 {
		color: #fff;
		background: #ddecf7;
	}

	.bg-zt5 {
		color: #fff;
		background: #152e9d;
	}

	.bg-zt6 {
		color: #fff;
		background: #0f1358;
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 22upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(../../static/me/NyU04x.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	// 好玩动态
	.dong {
		z-index: 9999;
		position: fixed;
		top: -40px;
		right: -80px;
		transform: scale(0.24);
		-webkit-transform: scale(0.24);
		-moz-transform: scale(0.24);

	}

	.monster {
		transform: rotate(-50deg);
		-ms-transform: rotate(-50deg);
		/* IE 9 */
		-moz-transform: rotate(-50deg);
		/* Firefox */
		-webkit-transform: rotate(-50deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(-50deg);
		/* Opera */
		display: flex;
		justify-content: center;
		position: relative;
		width: 170px;
		height: 400px;
		border-top-left-radius: 200px;
		border-top-right-radius: 200px;
		background-color: #3C47D7;
		box-shadow: 20px 20px 60px #4650E5;
	}

	.monster__face {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: absolute;
		top: 14%;
		width: 75%;
		height: 160px;
	}

	.monster__noses {
		top: 50%;
		display: flex;
		justify-content: space-between;
		width: 28%;
		height: auto;
		margin-bottom: 10px;
	}

	.monster__nose {
		width: 8px;
		height: 12px;
		border-radius: 20px;
		background: rgba(0, 0, 0, 0.5);
		box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.1);
	}

	.monster__mouth {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
		height: 0%;
		overflow: hidden;
		border: 25px solid #FFC333;
		border-radius: 100px;
		background-color: #810332;
		animation: mouth 1.75s infinite;
		box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
	}

	.monster__mouth::before {
		content: '';
		position: absolute;
		width: 150px;
		height: 80px;
		border-radius: 100px;
		background-color: #400018;
	}

	.monster__mouth::after {
		content: '';
		position: absolute;
		bottom: -80px;
		width: 160px;
		height: 80px;
		border-top-left-radius: 50%;
		border-top-right-radius: 50%;
		background-color: #DC1B50;
		animation: tongue 1.75s infinite;
	}

	.monster__top {
		position: absolute;
		top: -30px;
		width: 170px;
		height: 30px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		background-color: #ffffff;
		z-index: 100;
		animation: t 1.75s infinite;
	}

	.monster__bottom {
		position: absolute;
		bottom: 0;
		width: 100px;
		height: 30px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-color: #ffffff;
		z-index: 100;
		animation: b 1.75s infinite;
	}


	.avatar-eye {
		position: absolute;
		top: -10%;
		width: 65px;
		height: 65px;
		background: linear-gradient(105deg, white, #cb87f4);
		border-radius: 100%;
		box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
		margin: 3px;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}


	.avatar-eye--green {
		background: linear-gradient(to bottom, #fdfdfd, #c3efea);
	}

	.avatar-eye--violet {
		background: linear-gradient(to bottom, #fdfdfd, #e6d6f6);
	}


	.eye--left {
		left: 10%;
	}

	.eye--right {
		left: 85%;
	}

	.eye--center {
		left: 45%;
		top: 10%;
	}

	.avatar-eye-pupil {
		position: absolute;
		width: 55%;
		height: 55%;
		left: 50%;
		top: 25%;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
		z-index: 100;
		border-radius: 100%;
	}


	.pupil--green {
		background: linear-gradient(135deg, rgba(188, 248, 177, 0.7), #2fa38c 75%);
	}

	.pupil--pink {
		background: linear-gradient(135deg, #f1a183, #8535cd);
	}


	.avatar-eye-pupil-blackThing {
		position: absolute;
		width: 55%;
		height: 55%;
		left: 50%;
		top: 25%;
		background: #2c2f32;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
		border-radius: 100%;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	}

	.avatar-eye-pupil-lightReflection {
		position: absolute;
		width: 7px;
		height: 7px;
		left: 25%;
		top: 10%;
		background: #ebebeb;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
		border-radius: 100%;
		box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.2);
	}

	/**/
	@keyframes t {

		0%,
		10%,
		80%,
		100% {
			top: -30px;
		}

		20% {
			top: 0px;
		}

		30% {
			top: -20px;
		}

		40% {
			top: -0px;
		}

		50% {
			top: -25px;
		}

		70% {
			top: 0px;
		}
	}

	@keyframes b {

		0%,
		10%,
		80%,
		100% {
			bottom: -30px;
		}

		20% {
			bottom: 0px;
		}

		30% {
			bottom: -20px;
		}

		40% {
			bottom: -0px;
		}

		50% {
			bottom: -25px;
		}

		70% {
			bottom: 0px;
		}
	}

	@keyframes mouth {

		0%,
		10%,
		100% {
			width: 100%;
			height: 0%;
		}

		15% {
			width: 90%;
			height: 30%;
		}

		20% {
			width: 50%;
			height: 70%;
		}

		25% {
			width: 70%;
			height: 70%;
		}

		30% {
			width: 80%;
			height: 60%;
		}

		35% {
			width: 60%;
			height: 70%;
		}

		40% {
			width: 55%;
			height: 75%;
		}

		45% {
			width: 50%;
			height: 90%;
		}

		50% {
			width: 40%;
			height: 70%;
		}

		55% {
			width: 70%;
			height: 95%;
		}

		60% {
			width: 40%;
			height: 50%;
		}

		65% {
			width: 100%;
			height: 60%;
		}

		70% {
			width: 100%;
			height: 70%;
		}

		75% {
			width: 90%;
			height: 70%;
		}

		80% {
			width: 50%;
			height: 70%;
		}

		85% {
			width: 90%;
			height: 50%;
		}

		85% {
			width: 40%;
			height: 70%;
		}

		90% {
			width: 90%;
			height: 30%;
		}

		95% {
			width: 100%;
			height: 10%;
		}
	}

	@keyframes tongue {

		0%,
		20%,
		100% {
			bottom: -80px;
		}

		30%,
		90% {
			bottom: -40px;
		}

		40% {
			bottom: -45px;
		}

		50% {
			bottom: -50px;
		}

		70% {
			bottom: -80px;
		}

		90% {
			bottom: -40px;
		}
	}


	// 顶部流星
	.space {
		position: absolute;
		top: 0;
		left: 0;
	}

	.planet {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		background: #333;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -75rpx 0 0 -75rpx;
		overflow: hidden;
		z-index: 2;
	}

	.planet_shadow {
		position: absolute;
		border-radius: 50%;
		height: 100%;
		width: 100%;
		top: -40%;
		right: -10%;
		border: 35rpx solid rgba(0, 0, 0, .15);
	}

	.star {
		display: block;
		width: 5rpx;
		height: 5rpx;
		border-radius: 50%;
		background: #FFF;
		top: 100rpx;
		left: 400rpx;
		position: relative;
		transform-origin: 100% 0;
		animation: star-ani 6s infinite ease-out;
		box-shadow: 0 0 5rpx 5rpx rgba(255, 255, 255, .3);
		opacity: 0;
		z-index: 2;
	}

	.star:after {
		content: '';
		display: block;
		top: 0rpx;
		left: 4rpx;
		border: 0rpx solid #fff;
		border-width: 0rpx 90rpx 2rpx 90rpx;
		border-color: transparent transparent transparent rgba(255, 255, 255, .3);
		transform: rotate(-45deg) translate3d(1rpx, 3rpx, 0);
		box-shadow: 0 0 1rpx 0 rgba(255, 255, 255, .1);
		transform-origin: 0% 100%;
		animation: shooting-ani 3s infinite ease-out;
	}

	.pink {
		top: 30rpx;
		left: 395rpx;
		background: #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.pink:after {
		border-color: transparent transparent transparent #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.blue {
		top: 35rpx;
		left: 432rpx;
		background: cyan;
		animation-delay: 7s;
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
	}

	.blue:after {
		/* border-color: transpareanimation-delay: 12s; */
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
		animation-delay: 7s;
	}

	.yellow {
		top: 50rpx;
		left: 600rpx;
		background: #ffcd5c;
		animation-delay: 5.8s;
	}

	.yellow:after {
		border-color: transparent transparent transparent #ffcd5c;
		animation-delay: 5.8s;
	}

	@keyframes star-ani {
		0% {
			opacity: 0;
			transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
		}

		50% {
			opacity: 1;
			transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
		}

		100% {
			opacity: 0;
			transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
		}
	}
</style>
