<template>
    <tm-app >
		<tm-navbar title="个人信息" :beforeBack="false" :hideBack="true" :hideHome="true">
			<template v-slot:right>
				<!-- <tm-icon name="tmicon-plus"></tm-icon> -->
			</template>
		</tm-navbar>
        <tm-sheet>
            <tm-text :font-size="24" _class="font-weight-b" color="grey" label="1.使用教务功能和二课报名必须得绑定个人密码"></tm-text>
			<tm-divider></tm-divider>
			<tm-text :font-size="24" _class="font-weight-b " color="grey" label="3.让同学进群,希望能获得大家的反馈,才有继续的必要"></tm-text>
																<tm-divider></tm-divider>
			<tm-text :font-size="24" _class="font-weight-b " color="grey" label="1.兴趣驱动,用爱发电~"></tm-text>
											<tm-divider></tm-divider>
			<tm-text :font-size="24" _class="font-weight-b " color="grey" label="4.我温你哭,我在群里等你~"></tm-text>
	
		
			
        </tm-sheet>
 
        <view class="mb-32 mx-32 round-3 overflow">
            <tm-cell showAvatar avatar="https://picsum.photos/200"  :margin="[0, 0]" :titleFontSize="30" title="">
			  <template v-slot:right>
                                 <tm-tag text :shadow="0" icon="tmicon-weixinzhifu" color="orange" size="l" :label="data.sign==1?'已加群':'未加群'"></tm-tag>
                </template> </tm-cell>
            <tm-cell  :margin="[0, 0]" :titleFontSize="30" title="姓名">
                <template v-slot:right>
                   <tm-text :font-size="24" _class="font-weight-c" color="grey" :label="data.userName"></tm-text>
                </template>
            </tm-cell>
		  <tm-cell  :margin="[0, 0]" :titleFontSize="30" title="账号">
                <template v-slot:right>
                   <tm-text :font-size="24" _class="font-weight-c" color="grey" :label="data.xh"></tm-text>
                </template>
            </tm-cell>

			  <tm-cell  :margin="[0, 0]" :titleFontSize="30" title="性别">
                <template v-slot:right>
                   <tm-text :font-size="24" _class="font-weight-c" color="grey" :label="data.sex||'保密'"></tm-text>
                </template>
            </tm-cell>

			  <tm-cell  :margin="[0, 0]" :titleFontSize="30" title="专业">
                <template v-slot:right>
                   <tm-text :font-size="24" _class="font-weight-c" color="grey" :label="data.depName"></tm-text>
                </template>
            </tm-cell>

			  <tm-cell  :margin="[0, 0]" :titleFontSize="30" title="校区"  @click="bangding(2)">
                <template v-slot:right>
                   <tm-text :font-size="24" _class="font-weight-c" color="grey" :label="data.xq==1? '郫都校区':'宜宾校区'"></tm-text>
                </template>
            </tm-cell>

		  <tm-cell  :margin="[0, 0]" :titleFontSize="30" title="教务密码" @click="bangding(0)">
                <template v-slot:right>
                   <tm-text :font-size="24" _class="font-weight-c" color="grey" :label="data.jwpwd||'点击绑定教务密码'"></tm-text>
                </template>
            </tm-cell>

			  <tm-cell  :margin="[0, 0]" :titleFontSize="30" title="青春成工密码" @click="bangding(4)">
                <template v-slot:right>
                   <tm-text :font-size="24" _class="font-weight-c" color="grey" :label="data.erkePwd||'点击绑定青春成工密码'"></tm-text>
                </template>
            </tm-cell>

			
		  <tm-cell  :margin="[0, 0]" :titleFontSize="30" title="邮箱" @click="bangding(1)">
                <template v-slot:right>
                   <tm-text :font-size="24" _class="font-weight-c" color="grey" :label="youxiang||'点击绑定邮箱'"></tm-text>
                </template>
            </tm-cell>
				  <tm-cell  :margin="[0, 0]" :titleFontSize="30" title="QQ" @click="bangding(3)">
                <template v-slot:right>
                   <tm-text :font-size="24" _class="font-weight-c" color="grey" :label="data.qq||'点击绑定QQ'"></tm-text>
                </template>
            </tm-cell>
		
          
        </view>
   
	<view>
	
		 <tm-drawer placement="center" v-model:show="show"  @ok="xiugai(0)" okText="修改">
		 <tm-input  v-model="jwpwd"></tm-input></tm-drawer>

		 	 <tm-drawer placement="center" v-model:show="show1" @ok="xiugai(1)" okText="修改">
		 <tm-input  v-model="youxiang"></tm-input></tm-drawer>
		 
		 		 	 <tm-drawer placement="center" v-model:show="show2" @ok="xiugai(2)" okText="修改">
					 <tm-text label="1是成都2是宜宾"></tm-text>
		 <tm-input  v-model="data.xq"></tm-input></tm-drawer>


		 		 	 <tm-drawer placement="center" v-model:show="show3" @ok="xiugai(3)" okText="修改">
		 <tm-input  v-model="qq"></tm-input></tm-drawer>

		 		

 	 <tm-drawer placement="center" v-model:show="show4" @ok="xiugai(4)">
		 <tm-input  v-model="data.erkePwd"></tm-input></tm-drawer>
	

	</view>
	 </tm-app>
</template>

<script>
	import request from '@/common/request.js';

	export default {

		data() {
			return {
				jz_show: false,
				title: '更改中...',
				data: {},
				showWin:false,
				show: false,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				// ekpwd:'',
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
			console.log(this.data)
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
						if (this.data.qq) {
					this.qq = this.data.qq
					this.qq_xs = this.data.qq
				} else {
					this.qq_xs = '点击绑定QQ,用于进群自动激活(必填)'
				}
					if (this.data.erkePwd) {
					this.erkePwd = this.data.erkePwd
					this.erkePwd_xs = this.data.erkePwd
				} else {
					this.erkePwd_xs = '点击绑定QQ,用于进群自动激活(必填)'
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
				else if (index == 3) {
					this.show3 = true
				}
				else if (index == 4) {
					this.show4 = true
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
						uni.showToast({
								title: '修改失败',
								// // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
								// type: 'error',
								// // 如果不需要图标，请设置为false
								// icon: true
							})
					}
				})
				
			},
			xiugai(index) {
				this.showWin=true
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
							uni.showToast({
									title: '修改失败',
									// // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
									// type: 'error',
									// // 如果不需要图标，请设置为false
									// icon: true
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
							uni.showToast({
									title: '修改失败',
									// // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
									// type: 'error',
									// // 如果不需要图标，请设置为false
									// icon: true
								})
						}
					})
				}
				else if (index == 2) {
				request.httpTokenRequest({
					url: 'wx/user/updateXq/?xq=' + this.data.xq,
					method: 'get'
				}).then(res => {
					// this.jz_show = false
					if (res.data.code == 200) {
						this.data.xq =this.data.xq
						uni.setStorageSync('userinfo', this.data)
						this.shuaxin()
					} else {
						uni.showToast({
								title: '修改失败',
								// // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
								// type: 'error',
								// // 如果不需要图标，请设置为false
								// icon: true
							})
					}
				})
				}
				else if (index == 3) {
					request.httpTokenRequest({
						url: 'wx/user/updateQq/?qq=' + this.qq,
						method: 'get'
					}).then(res => {
						this.jz_show = false
						if (res.data.code == 200) {
							this.data.qq = this.qq
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
				else if (index == 4) {
					request.httpTokenRequest({
						url: 'wx/user/erkePwd/?mm=' + this.erkePwd,
						method: 'get'
					}).then(res => {
						this.jz_show = false
						if (res.data.code == 200) {
							this.data.erkePwd = this.erkePwd
							uni.setStorageSync('userinfo', this.data)
							this.shuaxin()
							this.show1= false
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
