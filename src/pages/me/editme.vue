<template>
	<view>
		<u-toast ref="uToast" />
		<u-mask z-index='99999' :show="jz_show" @click="show = false">
			<view class="warp">
				<view class="rect u-f-ajc" @tap.stop>
					<view class="title">
						{{this.title}}
					</view>
					<u-loading size="30" class="loading" mode="circle" color="pink"></u-loading>
				</view>
			</view>
		</u-mask>
		<view class="u-flex-col u-p-30 u-col-center">
			<u-image width='150rpx' height='150rpx' :src="data.avatar" shape="circle"></u-image>
		</view>
		<u-cell-group>
			<u-cell-item title="用户名" :value="data.userName"></u-cell-item>
			<u-cell-item title="账号" :value="data.xh"></u-cell-item>
			<u-cell-item title="电话" :value="data.number"></u-cell-item>
			<u-cell-item title="性别" :value="data.sex||'保密'"></u-cell-item>
			<u-cell-item title="专业" :value="data.depName"></u-cell-item>
			<u-cell-item title="校区" :value="xq_xs" @click="bangding(2)"></u-cell-item>
			<u-cell-item title="教务密码" :value="jwpwd_xs" @click="bangding(0)"></u-cell-item>
			<u-cell-item title="邮箱" :value="email_xs" @click="bangding(1)"></u-cell-item>
		</u-cell-group>
		<u-picker @confirm="tijiao" mode="selector" v-model="show2"  :default-selector="[0]" :range="selectorObj" range-key="cateName"></u-picker>
		<u-popup width="500" height="500" border-radius="10" v-model="show" mode="center">
			<view style="display: flex; justify-content:center;flex-flow: column;align-items:center;">
				<view style="font-weight: bold;margin-right: 20upx;text-align: center; margin-top: 30upx;">
					教务系统密码
				</view>
				<view
					style=" margin-top: 80upx; display: flex; padding: 15upx;align-items: center;justify-content: center;">
					<input
						style=" border-radius: 10upx; height:100upx;background-color:rgba(0, 0, 255, 0.4);text-align: center;"
						type="text" v-model="jwpwd" />
				</view>
				<u-button style=" margin-top: 80upx;" @click="xiugai(0)">修改</u-button>
			</view>
		</u-popup>

		<u-popup width="500" height="500" border-radius="10" v-model="show1" mode="center">
			<view style="display: flex; justify-content:center;flex-flow: column;align-items:center;">
				<view style="font-weight: bold;margin-right: 20upx;text-align: center; margin-top: 30upx;">
					邮箱
				</view>
				<view
					style=" margin-top: 80upx; display: flex; padding: 15upx;align-items: center;justify-content: center;">
					<input
						style=" border-radius: 10upx; height:100upx;background-color:rgba(0, 0, 255, 0.4);text-align: center;"
						type="text" v-model="youxiang" />
				</view>
				<u-button style=" margin-top: 80upx;" @click="xiugai(1)">修改</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import request from '@/common/request.js';
	export default {
		data() {
			return {
				jz_show: false,
				title: '更改中...',
				data: {},
				show: false,
				show1: false,
				show2: false,
				jwpwd: '',
				youxiang: '',
				jwpwd_xs: '',
				email_xs: '',
				xq_xs: '',
				selectorObj: [{
						cateName: '郫都校区',
						id: 1
					},
					{
						cateName: '宜宾校区',
						id: 2
					}
				]
			}
		},
		onLoad(e) {
			this.data = uni.getStorageSync('userinfo')
			this.shuaxin()
			if(e.index == 0){
				this.show = true
			} else if(e.index == 1){
				this.show2 = true
			}
		},
		methods: {
			shuaxin() {
				if (this.data.xq) {
					if (this.data.xq == 1) {
						this.xq_xs = '郫都校区'
					} else {
						this.xq_xs = '宜宾校区'
					}
				} else {
					this.xq_xs = '点击设置校区'
				}
				if (this.data.jwpwd) {
					this.jwpwd = this.data.jwpwd
					this.jwpwd_xs = '******'
				} else {
					this.jwpwd_xs = '点击绑定密码'
				}
				if (this.data.email) {
					this.youxiang = this.data.email
					this.email_xs = this.data.email
				} else {
					this.email_xs = '点击绑定邮箱'
				}
			},
			bangding(index) {
				if (index == 0) {
					this.show = true
				} else if (index == 1) {
					this.show1 = true
				} else if (index == 2) {
					this.show2 = true
				}
			},
			tijiao(e){
				this.jz_show = true
				let id = this.selectorObj[e[0]].id
				request.httpTokenRequest({
					url: 'wx/user/updateXq/?xq=' + id,
					method: 'get'
				}).then(res => {
					this.jz_show = false
					if (res.data.code == 200) {
						this.data.xq = id
						uni.setStorageSync('userinfo', this.data)
						this.shuaxin()
					} else {
						this.$refs.uToast
							.show({
								title: '修改失败',
								// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
								type: 'error',
								// 如果不需要图标，请设置为false
								icon: true
							})
					}
				})
				
			},
			xiugai(index) {
				this.jz_show = true
				if (index == 0) {
					request.httpTokenRequest({
						url: 'wx/user/updateJw/?jwpwd=' + this.jwpwd,
						method: 'get'
					}).then(res => {
						this.jz_show = false
						if (res.data.code == 200) {
							this.data.jwpwd = this.jwpwd
							uni.setStorageSync('userinfo', this.data)
							this.shuaxin()
							this.show = false
						} else {
							this.$refs.uToast
								.show({
									title: '修改失败',
									// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
									type: 'error',
									// 如果不需要图标，请设置为false
									icon: true
								})
						}
					})
				} else if (index == 1) {
					request.httpTokenRequest({
						url: 'wx/user/updateEmail/?email=' + this.youxiang,
						method: 'get'
					}).then(res => {
						this.jz_show = false
						if (res.data.code == 200) {
							this.data.email = this.email
							uni.setStorageSync('userinfo', this.data)
							this.shuaxin()
							this.show1 = false
						} else {
							this.$refs.uToast
								.show({
									title: '修改失败',
									// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
									type: 'error',
									// 如果不需要图标，请设置为false
									icon: true
								})
						}
					})
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.popup {
		padding: 40upx;
	}

	.u-f-ajc {
		display: flex;
		justify-content: center;
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		border-radius: 20upx;
		width: 120px;
		height: 120px;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title {
		font-weight: bold;
	}
</style>
