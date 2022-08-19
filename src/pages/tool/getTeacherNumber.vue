<template>
	<view>
			<!-- <tm-message ref="toast"></tm-message> -->
		
		<view class="bannerBg" @tap="plateShow = true">
			<image src="https://zhoukaiwen.com/img/keyboard.jpeg" mode="widthFix"></image>

		</view>

		<view style="margin-top: 110rpx;" class="cu-list menu">

			<view class="cu-item">
				<view class="content">
					<!-- <image src="https://jaycao-demo01.oss-cn-chengdu.aliyuncs.com/1-210326133036.png" class="png" mode="aspectFit"></image> -->
				

				</view>
				<view class="action">
					<!-- <input v-model="name"></input> -->
	<tm-input  v-model="name" prefixLabel="姓名" :margin="[0,24]" placeholder="请输入姓名" ></tm-input>
					<!-- 	<view v-if="PageCur=='1'" class="cu-tag round bg-blue light">{{plateNo | plateNoF}}</view>
					<view v-if="PageCur!='1'" class="cu-tag round bg-green light">{{plateNo | plateNoF}}</view> -->
				</view>
			</view>
			<view class="">
				<button type="default" @click="getinfo">查询</button>
				<!-- <uni-button class="but"  >提交</uni-button> -->
			</view>
			<view class="cu-list menu" v-for="(item,index) in res">
				<view class="cu-item">
					<view class="content">
						
						<text class="text-grey">教师姓名</text>
					</view>
					<view >
						{{item.name}}
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
				
						<text class="text-grey">院系</text>
					</view>
					<view>
						{{item.depname}}
					</view>
				</view>
				
				
				<view class="cu-item">
					<view class="content">
						
						<text class="text-grey">手机号</text>
					</view>
					<view>
						{{item.mphone}}
					</view>
				</view>
				<view v-if="res.length >= 2" style="margin-top: 20upx;"></view>
			</view>

		</view>

		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view class="text-lg">
						<text class="cuIcon-titles text-blue margin-right-xs"></text> 教师查询
					</view>
					<view class="text-gray">
						说明：只包含辅导员和任课老师
					</view>
					<view class="text-gray">
						温馨提醒：数据由同学们收集而来,准确性无法保证;更多信息查询请加入QQ群
					</view>
				</view>
			</view>
		</view>
	
		

	
	</view>

</template>

<script>
	import request from '@/common/request.js';
	// import tmMessage from "@/tm-vuetify/components/tm-message/tm-message.vue"
	export default {
		components: {
			// tmMessage
		},
		data() {
			return {
				name: null,
				number: '',
				dept: '',
				plateNo: '',
				plateShow: false,
				inputDisabled: true,
				PageCur: 1,
				res: [{
					name:'',
					mphone:'',
					depname:''
				}]
			};
		},
		onLoad() {},
		methods: {
			getinfo() {
				let opts = {
					url: `getInfo/teacher/${this.name}`,
					method: 'get',
				};
				// let params = {
				// 	code: res.code
				// };
				// console.log(this.name)
				
				console.log(this.name)
				// if(this.name==null){
				// this.$refs.toast.show({model:'info',label:"请输入教师姓名",wait:"primary"})
				// }
				// this.$refs.toast.show({model:'load',mask:true})
				request.httpTokenRequest(opts).then(res => {
					if(res.data.data==500){
						this.$refs.toast.show({
							model: 'info',
							label: res.data.data.msg
						
						});
					}
					
					if (res.data.code == 200) {
							// this.$refs.toast.hide()
						this.res = res.data.data
						this.number = res.data.data.mphone
						this.dept = res.data.data.depname
						uni.hideLoading();	}		
					if(res.data.data.length==0 ) {
						console.log("213")
						this.$refs.toast.show({model:'info',label:"查询老师不存在",wait:500})
					}
					uni.hideLoading();	
					

				})
			},
			setPlate(plate) {
				console.log(plate)
				if (plate.length >= 7) this.plateNo = plate;
				this.plateShow = false;
			},
			typeChange(e) {
				console.log(e);
				this.PageCur = e;
				this.plateNo = '';
			},
			close() {
				this.PageCur = 1;
			}
		},
		filters: {
			plateNoF(val) {
				if (val == '') {
					return '请先填写教师姓名'
				} else {
					let arr = val.split('');
					arr.splice(2, 0, ' · ');
					return arr.join('')
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.bannerBg {
		width: 750rpx;
		position: relative;

		image {
			width: 750rpx;
		}

		.carNumBox {
			position: absolute;
			width: 650rpx;
			height: 180rpx;
			background-color: #ffffff;
			bottom: -90rpx;
			left: 50%;
			z-index: 9;
			margin-left: -325rpx;
			border-radius: 12rpx;
		}

		.plate-box {
			position: relative;
			width: 420rpx;
			height: 50rpx;
			padding: 24rpx;
			background: #2d66d8;
			box-sizing: content-box;
			margin: auto;
			border-radius: 10rpx;
			-webkit-transition: all 1s;
			transition: all 1s;
			margin-top: 42rpx;
		}

		.plate-box.green {
			background: -webkit-linear-gradient(#f8f8f8 20%, #16b235);
			background: linear-gradient(#f8f8f8 20%, #16b235);
			box-shadow: 0 0 4rpx 0 #ebebeb;
		}

		.plate-box::before {
			content: '';
			border: 2rpx solid #ffffff;
			position: absolute;
			top: 4rpx;
			left: 4rpx;
			width: 455rpx;
			border-radius: 10rpx;
			height: 86rpx;
		}

		.plate-box.green::before {
			border: 1px solid #000000;
		}

		.plate-box uni-label {
			position: relative;
			vertical-align: middle;
			display: inline-block;
			width: 50rpx;
			color: #fff;
			text-align: center;
			font-size: 50rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-shadow: 0rpx 0rpx 2rpx #000;
		}

		.plate-box.green uni-label {
			color: #222;
			text-shadow: 0 0 1px #fff;
		}

		.plate-box uni-label.xinnengyuan::before {
			content: '';
			position: absolute;
			left: 12%;
			top: 12%;
			width: 76%;
			height: 76%;
			background-size: 100%;
			background-repeat: no-repeat;
			background-image: url(https://zhoukaiwen.com/img/icon/keyboard_icon.png);
		}

		.plate-box uni-label:nth-child(2) {
			margin-right: 20rpx;
		}

		.plate-box::after {
			content: '·';
			position: absolute;
			left: 126rpx;
			top: 30rpx;
			color: #fff;
			font-size: 50rpx;
			line-height: 40rpx;
		}

		.plate-box.green::after {
			content: '';
			position: absolute;
			left: 120rpx;
			top: 38rpx;
			width: 26rpx;
			height: 26rpx;
			background-size: 100%;
			background-repeat: no-repeat;
			background-image: url(https://zhoukaiwen.com/img/car_d_logo.png);
			background-repeat-x: no-repeat;
			background-repeat-y: no-repeat;
		}
	}

	.cu-form-group {
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}

	.but {
		// position: absolute;
		left: 250rpx;
		width: 200rpx;
		height: 100rpx;
	}
</style>
