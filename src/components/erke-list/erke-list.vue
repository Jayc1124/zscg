<template>



	<view >
		<view @click="nav(good.id)" :id="'good' + good.id" class="good-li" v-for="good in list" :key="good.id">
			<tm-sheet :margin="[5, 5]" :round="10">
				<tm-text :font-size="30" _class="font-weight-b" label="">{{ good.name }}</tm-text>

				<tm-divider></tm-divider>
				<view class="flex-row flex-row-center-start">

					<tm-image  :width="300" :round="2" :height="200" :src="good.logo" @click="nav(good.id)"></tm-image>
					<view class="pl-16 flex-1" style="width:0px">
						<tm-tag text :shadow="0" color="blue" size="m" icon="tmicon-tag-fill" :label="good.category"
							style="margin-bottom: 10upx;" @click="nav(good.id)">
						</tm-tag>
						<tm-tag text :shadow="0" color="green" size="m" icon="tmicon-position-fill"
							:label="good.orgName" style="" @click="nav(good.id)"></tm-tag>

					</view>
					<!-- 	<tm-text _class="text-overflow-2" style="margin-bottom: 10upx;" :label="good.orgName"></tm-text> -->
				</view>
				<view class="flex flex-row flex-row-top-end" @click="nav(good.id)">
					<tm-tag text :shadow="0" icon="tmicon-rank" color="pink" size="m" :label="add(good.hours)" style="" @click="nav(good.id)">
					</tm-tag>
					<!-- <view class="cu-tag round bg-blue light"  style="">{{good.hours}}分</view> -->
					<tm-tag text :shadow="0" icon="tmicon-weixinzhifu" color="orange" size="m"
						:label="format1(good.statusAll)" style="" @click="nav(good.id)"></tm-tag>


					<tm-tag text :shadow="0" icon="tmicon-clock-fill" color="purple" size="m"
						:label="getDateDiff(good.endTime)" style="" @click="nav(good.id)"></tm-tag>
				</view>

			</tm-sheet>
		</view>
		<tm-result :showBtn="false" v-if="list.length == 0"></tm-result>
	</view>



</template>

<script>
export default {
	props: {
		list: {
			type: Array,

			default() {
				return []
			}
		}
	},


	data() {
		return {
			time: '00.00.00',
			countdown: '',
			timer: null, //定义计时器，以便全局访问

		};
	},
	computed: {


		format1(status) {
			return function (status) {
				if (status == 1)
					return '报名中'
				if (status == 3)
					return '进行中'
				if (status == 4)
					return '待完结'
				if (status == 5)
					return '已完结'
			}
		},

	},
	methods: {
		nav(id) {
			console.log(id)
			uni.navigateTo({
				url: '/pages/webview/wb_ek1?detailData='+encodeURIComponent(JSON.stringify('https://erke.jaycao.com/#/pages/acti/info?key=' +id))
			})
		},
		getDateDiff(data) {
			// 传进来的data必须是日期格式，不能是时间戳
			//var str = data;
			//将字符串转换成时间格式
			var timePublish = new Date(data);
			var timeNow = new Date();
			var minute = 1000 * 60;
			var hour = minute * 60;
			var day = hour * 24;
			var month = day * 30;
			var result = "2";

			var diffValue = timePublish - timeNow;
			var diffMonth = diffValue / month;
			var diffWeek = diffValue / (7 * day);
			var diffDay = diffValue / day;
			var diffHour = diffValue / hour;
			var diffMinute = diffValue / minute;

			// console.log('diffValue：'+diffValue+' ' +'diffMonth：'+diffMonth+' ' +'diffWeek：'+diffWeek+' ' +'diffDay：'+diffDay+' ' +'diffHour：'+diffHour+' ' +'diffMinute：'+diffMinute);
			result = parseInt(diffDay) + "天";
			hour = parseInt(diffHour) % 24
			result = result + hour + "小时后结束";
			if (parseInt(diffDay) < 0) {
				return "报名已截至"
			}
			return result;
		},



		add0(m) {
			return m < 10 ? '0' + m : m
		},
		add(m) {
			return ' 积分: ' + m
		},
	}
}
</script>

<style lang="scss">
.flex {
	display: flex;
	margin-top: 15upx;
}
</style>
