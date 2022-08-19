<template>


	<tm-app>
		<tm-message ref="msg"></tm-message>
		<tm-sheet >
		 <tm-text :font-size="32" _class="font-weight-b" label="教评前必看"></tm-text>
            <tm-divider></tm-divider>
			 <tm-text :font-size="24" _class="font-weight-b " :margin="[0,24]" label="一、开发不易,使用教评需要分享给三个好友或群,谢谢！" style="white-space:pre-wrap;"></tm-text>
          <tm-divider></tm-divider>
			 <tm-text :font-size="24" _class="font-weight-b" :margin="[0,24]" label="二、请开始你的自定义评分，一个小星星20分。"  style="white-space:pre-wrap;"></tm-text>
             <tm-divider></tm-divider>
			 <tm-text :font-size="24" _class="font-weight-b" :margin="[0,24]" label="三、密码错误请到个人页绑定正确教务密码。"  style="white-space:pre-wrap;"></tm-text>
          <tm-divider></tm-divider>
		    <tm-text :font-size="24" _class="font-weight-b" :margin="[0,24]" label="四、使用教评功能时,不可连接校园网CDTU。"   style="white-space:pre-wrap;"></tm-text>
   <tm-divider></tm-divider>
			 <tm-text :font-size="24" _class="font-weight-b" color="red"  label="	五、授权请到公众号CDTU口袋君回复 教评 获取!" ></tm-text>
           
			</tm-sheet>
		<tm-sheet>
			<tm-input prefixLabel="评语:" placeholder="请输入评语" :transprent="true" ></tm-input>
			<tm-input  v-model="sqm" prefixLabel="授权码:" :margin="[0,24]" placeholder="请输入授权码" :transprent="true" ></tm-input>
				<tm-sheet :margin="[0,0]">
			<tm-text :font-size="24" _class="font-weight-b" label="评分"></tm-text>
			<tm-divider></tm-divider>
			<tm-rate :defaultValue="4"></tm-rate>
		</tm-sheet>

		<view class="flex flex-row flex-wrap ">

            <tm-button :margin="[26,12]" @click="jp" color="blue" :width="150" :height="70" :fontSize="26"  label="开始教评"></tm-button>
                <tm-button :margin="[26,12]" @click="jiaqun" color="pink" :width="150" :height="70" :fontSize="26"  label="加入群聊"></tm-button>
                <tm-button :margin="[26,12]" @click="" color="green" :width="150" :height="70" :fontSize="26"  label="分享给好友"></tm-button>
               
               
            </view>
		</tm-sheet>
		




		
		    <tm-sheet>
            <tm-text :font-size="24" _class="font-weight-b" label="APP端，公众号:CDTU口袋君回复‘教评’可获取授权码❤️"></tm-text>
            <tm-divider></tm-divider>
					<view class="solid-bottom text-xs padding" style="margin-left: 200upx;">
											 <tm-text  :font-size="24" color="grey" label="        点击预览并保存" ></tm-text>
									</view>
									<view style="text-align:center">
  <tm-image  preview :width="620" :height="500" src="http://cdn.jaycao.com/wx.jpg" ></tm-image>
									</view>
          
             
       
				<view class="" style="margin-left: 420upx;">
											 <tm-text  :font-size="24" color="grey" label="" >公众号:CDTU口袋君</tm-text>
									</view>
	
        </tm-sheet>
		

			


	
	



	

	</tm-app>
</template>

<script lang="ts" setup>

import { ref, getCurrentInstance } from "vue"
import { onShow, onLoad } from "@dcloudio/uni-app";
import tmApp from "@/tmui/components/tm-app/tm-app.vue"
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue"
import tmText from "@/tmui/components/tm-text/tm-text.vue"
import tmMessage from "@/tmui/components/tm-message/tm-message.vue"
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue"
import tmButton from "@/tmui/components/tm-button/tm-button.vue"
import request from '@/common/request.js';
import {share} from "@/tmui/tool/lib/share"
import TmDivider1 from "../../../tmui/components/tm-divider/tm-divider.vue";


const {proxy} = getCurrentInstance();
const msg = ref<InstanceType<typeof tmMessage> | null>(null)

let xh = ref(1)
let url = ref("")
let sqm = ref("")


onLoad(() => {
	getjiaquninfo()


})



function getjiaquninfo() {
	request.httpRequest({
		url: 'notice/noticeBanner/getAppInfo/6'
	}).then(res => {
		if (res.data.code == 200) {
			
			// qq = res.data.data.img
			url.value = res.data.data.navurl
		}


	})
}
function jiaqun() {




	//#ifdef APP-PLUS
	plus.runtime.openURL('https://qm.qq.com/cgi-bin/qm/qr?k=-58QbU4j1nW2LUNTUM_BNhCknlDHF1lV&jump_from=webapi');
	//#endif
	// #ifdef H5
	window.location.href = 'https://qm.qq.com/cgi-bin/qm/qr?k=-58QbU4j1nW2LUNTUM_BNhCknlDHF1lV&jump_from=webapi'
	// #endif	

	//提示模板


	// uni.navigateTo({
	//     url: 'https://qm.qq.com/cgi-bin/qm/qr?k=-58QbU4j1nW2LUNTUM_BNhCknlDHF1lV&jump_from=webapi'
	// });



}
function jp() {

	// console.log(i)


	proxy.msg.show({ model: 'load', mask: true, text: '正在教评中,请等待' })
	// console.log(url)
	xh.value = uni.getStorageSync('userinfo').xh
	xh.value = (xh.value - 65) * 11
	let opts = {
		url: url.value + '?xh=' + xh.value + '&pwd=' + uni.getStorageSync('userinfo').jwpwd + '&sqm=' + sqm.value,
		method: 'get',
	};

	console.log(url + '?xh=' + xh + '&pwd=' + uni.getStorageSync('userinfo').jwpwd + '&sqm=' + sqm)
	request.request(opts).then(res => {
		if (res.data.msg == 200) {
			console.log(res.data.msg.msg)
			proxy.msg.hide();
			proxy.msg.show({ model: 'success', mask: true, text: '教评已经完成,请前往教务系统查看' })
		}
		if (res.data.msg == 401) {
			console.log(res.data.msg.msg)
			proxy.msg.hide();
			proxy.msg.show({ model: 'error', mask: true, text: '授权码错误' })
		}
		if (res.data.msg == 500) {
			console.log(res.data.msg.msg)
			proxy.msg.hide();
			proxy.msg.show({ model: 'error', mask: true, text: '请前往个人页绑定正确的教务密码' })
		}


	}).catch(
		response => {
			proxy.msg.hide()
			proxy.msg.show({ model: 'error', mask: true, text: '当服务未开启,请加群查看开放时间' })
		}
	)

}


</script>

<style>
</style>
