<!-- 蓝色登录页面2 -->
<template>
	<view style="height:100vh;background: #fff;">
		<view class="img-a">
			<view class="t-b">
				您好，
				<br />
				请先登录,若不想登录点击返回即可
				<br/>
			
			</view>
		</view>
		<view class="login-view" style="">
			<view class="t-login">
				<form class="cl">
					<view class="t-a">
						<text class="txt">账号</text>
						<input type="number" name="xh" placeholder="请输入您的账号" maxlength="10" v-model="xh" />
					</view>
					<view class="t-a">
						<text class="txt">密码</text>
						<input type="number" name="phone" placeholder="请输入您的密码" maxlength="11" v-model="phone" />
					</view>
					
					<button @tap="login()">登 陆</button>
					<!-- <view class="reg" @tap="reg()">注 册</view> -->
				</form>
				
				<view  class="cu-list menu">
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view class="text-gray">
								初始账号为你的学号
								密码是已经绑定的手机号
							</view>
							<view class="text-lg">
								<text class="cuIcon-titles text-blue margin-right-xs"></text> 如何查看正确的手机号
							</view>
							<view class="text-gray">
								若提示不匹配
							</view>
							<view class="text-gray">
								进入成都工业学院微信事务大厅,
							</view>
							<view class="text-gray">
									点击===>我的===>修改个人信息-即可查看正确的手机号	
							</view>
						
						</view>
					</view>
			
				
		 <image style="width: 300px; height: 500px; background-color: #eeeeee" src="https://jaycao-demo01.oss-cn-chengdu.aliyuncs.com/30%244EBQVG%7D%294VK3%29JXB%5D%5D%7BT.png" ></image>
			</view>
						
			</view>
		</view>
	</view>
</template>
<script>
	import request from '@/common/request.js';
export default {
	data() {
		return {
			phone: '', //手机号码
			xh: '' ,//密码,
		
		};
	},
	onLoad() {},
	methods: {
		// 跳转第二个登陆模版
	
		//当前登录按钮操作
		login() {
			var that = this;
			if (!that.phone) {
				uni.showToast({ title: '请输入正确的学号', icon: 'none' });
				return;
			}
			if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.phone)) {
				uni.showToast({ title: '请输入正确手机号', icon: 'none' });
				return;
			}
			let opts = {
				url: `getInfo/set?number=${this.xh}&phoneNumber=${this.phone}`,
				method: 'post',
			};
			uni.showLoading({
			    title: '提交中'
			});
			request.httpTokenRequest(opts).then(res => {
				if(res.data.code==200){
					 uni.hideLoading();
					uni.login({
						provider: 'weixin',
						success: res => {
							console.log(res);
							let opts = {
								url: `wx/user/wx5a488e3a5f3cd592/login`,
								method: 'get',
							};
							let params = {
								code: res.code
							};
							console.log('index主页异步执行中')
							request.httpRequest(opts, params).then(res => {
								// console.log(1)
								// console.log(res.data.data.user.xh)
								// console.log(res.data.user.nickname)
								console.log(res.data.data.token)
								uni.setStorageSync('xh', null)
								uni.setStorageSync('token', res.data.data.token)
							
								if (res.data.data.user == null) {
									
									
										uni.showModal({
											title: '不强制要求',
											content: '检测到当前尚进行身份认证,考虑到学校数据隐私权限,点击确定跳转到认证身份页面,若未认证访问将受限',
											   success: function (res) {
											        if (res.confirm) {
														console.log('/pages/me/setNumber/setNumber')
											            uni.navigateTo({
											            	url: '/pages/me/setNumber/setNumber'
											            });
											        } else if (res.cancel) {
											            console.log('用户点击取消');
											        }
											    }
										});
										 resolve('');
									
								}else{
										uni.setStorageSync('xh', res.data.data.user.xh)
										
										uni.setStorageSync('userinfo', res.data.data.user)
										
									
										uni.setStorageSync('xm', res.data.data.user.userName)
									   resolve('');
								}
								// uni.setStorageSync('number', res.data.data.user.number)
								console.log('index主页异步执行完成')
					
					
					
							})
						},
					
					});
					uni.showToast({ title: '认证成功！', icon: 'none',duration: 2000});
					// complete: function() {
					// 	
					uni.navigateBack({
					    delta: 2
					});
					// 	}
					// });
				
					console.log('/pages/index/index')
					
					

				}else{
					uni.showToast({ title: res.data.msg, icon: 'none',duration: 2000});
				}			
				
				console.log(res)
			})
			
			
			
			
			
		},
		//注册按钮点击
		
	}
};
</script>
<style>
.txt {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
}
.img-a {
	width: 100%;
	height: 450rpx;
	background-image: url(https://zhoukaiwen.com/img/loginImg/head.png);
	background-size: 100%;
}
.reg {
	font-size: 28rpx;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
	background: #f5f6fa;
	color: #000000;
	text-align: center;
	margin-top: 30rpx;
}

.login-view {
	width: 100%;
	position: relative;
	margin-top: -120rpx;
	background-color: #ffffff;
	border-radius:50upx;
}
.img{
	width: 100%;
}

.t-login {
	width: 600rpx;
	margin: 0 auto;
	font-size: 28rpx;
	padding-top: 80rpx;
}

.t-login button {
	font-size: 28rpx;
	background: #2796f2;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
}

.t-login input {
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	border-bottom: 1px solid #e9e9e9;
	font-size: 28rpx;
}

.t-login .t-a {
	position: relative;
}

.t-b {
	text-align: left;
	font-size: 30rpx;
	color: #ffffff;
	padding: 80rpx 0 0 70rpx;
	font-weight: bold;
	line-height: 70rpx;
	margin-bottom: 30upx;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 100%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 150rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #aeaeae;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
