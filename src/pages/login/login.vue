<template>
	<tm-app ref="app">
  <tm-message ref="msg"></tm-message>
		<tm-navbar title="CDTU 掌上成工" :shadow="0" hide-home>
			<template v-slot:left>
				<view class="flex flex-center flex-row">
					<navigator url="settheme" class="pl-10 pr-12">
						<tm-icon :font-size="32" name="tmicon-cog-fill"></tm-icon>
					</navigator>
					<tm-icon @click="onChangeDark" :color="store.tmStore.dark?'yellow':''" _class="pl-32"
						:font-size="42" name="tmicon-ios-sunny"></tm-icon>
				</view>
			</template>
		</tm-navbar>
		  <tm-button :margin="[12,12]" @click="proxy.$refs.msg.show()" color="white" :width="120" :height="56" :fontSize="26"  label="默认"></tm-button>
		<tm-sheet :margin="[0, 0]" :followTheme="true">
			<view class="flex-row flex-row-center-start pb-10">
				<tm-image :width="108" :height="67.5" :src="logoimg"></tm-image>
				<view class="pl-16 flex-1" style="width:0px">
					<tm-text _class="text-weight-b" :font-size="36" label="掌上成工 3.0.74"></tm-text>
					<tm-text _class="opacity-6" label="全端兼容教务 二课 要闻公告"></tm-text>
				</view>
			</view>

		</tm-sheet>
	<tm-sheet v-if="!next">
		<tm-text :font-size="24" _class="font-weight-b" label="基础示例,更多见文档"></tm-text>
		<tm-divider></tm-divider>
		<tm-input v-model="xh" ></tm-input>
		  
		<tm-button @click="getNum">下一步</tm-button>
	</tm-sheet>
	
	   
	       <tm-sheet v-if="next">
	               <tm-text :font-size="24" _class="font-weight-b" :label="ts"></tm-text>
	               <tm-divider></tm-divider>
	               <!-- <tm-codeinput @click="show=true" :value="str"></tm-codeinput> -->
				   <tm-input prefixLabel="补全密码" :margin="[0,24]" v-model="str" showCharNumber :maxlength="4" ></tm-input>
				   <tm-button @click="login(str)">登录</tm-button>
	           </tm-sheet>
			       <!-- <tm-keyborad  v-model:show="show" v-model="str"	></tm-keyborad> -->
				   
	</tm-app>
	
</template>
<script lang="ts" setup>
	import request from '@/common/request.js';
	import tmMessage from "@/tmui/components/tm-message/tm-message.vue";
	import {
		ref,
		getCurrentInstance,
		nextTick
	} from "vue"
	import {
		onShow,
		onLoad,
	} from "@dcloudio/uni-app";
	
	import {
		language
	} from "@/tmui/tool/lib/language"
	import {
		useTmpiniaStore
	} from '@/tmui/tool/lib/tmpinia';

	const store = useTmpiniaStore();
	const {
		proxy
	} = getCurrentInstance();
	const str = ref("")
	const show=ref(false)

	const showCustomColor = ref("#60ab41")
	const showCustomName = ref("darkGreen")
	const showCustom = ref(false)
	const xh= ref(Object)
	const sjh=ref("")
	const next=ref(false)
	const ts=ref("请补全你的手机号")
	

	function getNum() {
		request.httpRequest({
			url: 'getInfo/s/'+xh.value
		}, {}).then(res => {
			console.log(res)
			if (res.data.code != 200) {
				proxy.$refs.msg.show({
					label: '请先前往成都工业学院微信事务大厅绑定手机号',
					// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
					model: 'error'
					// 如果不需要图标，请设置为false
	
				})
			}else{
				next.value=true;
				ts.value="请补全你的手机号:"+res.data.data
				sjh.value=res.data.data
			}
			})
	
	
	};
	function login(str) {
			sjh.value=sjh.value.substring(0,3)+str+sjh.value.substring(7,11)
		request.httpRequest({
			url: 'wx/user/applogin/v2',
			method: 'POST',

		},{username:xh.value,	code: null,
					password: sjh.value,
					uuid: null
		} ).then(res => {
		if (res.data.code === 200) {	
			uni.setStorage({
				key: 'login_id',
				data: true
			})
			// uni.setStorageSync('data',this.data)
			uni.setStorage({
				key: 'xh',
				data: res.data.data.xh
			})
			uni.setStorage({
				key: 'userinfo',
				data: res.data.data.userinfo
			})
	
			uni.setStorage({
				key: 'token',
				data: res.data.data.token,
				success: () => {
					
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			});
		} else {
			proxy.$refs.toast.show({
					model: 'error',
					label: res.data.msg
				}),
				this.get_captchaImage()
		}
		})
	};
</script>
