<script  lang="ts" setup>
import { onLaunch, onShow, onHide, onThemeChange } from "@dcloudio/uni-app";
import { useTmpiniaStore } from "./tmui/tool/lib/tmpinia";
import { storeToRefs } from "pinia";
import { useAppStore } from "./store/app";
import request from "@/common/request.js";
const appStore = useAppStore();

onLaunch( () => {
   request.httpTokenRequest({
		url: 'getInfo/getJwToken',
    method:'post'
	}).then(res => {
      console.log(res.data)
		if (res.data.code == 200) {
  
    	uni.setStorage({
				key: 'jwToken',
				data: res.data.msg.substring(6).replace('&userType=2&toMenu=null','')
			})
    
  
		}
	})
});
//  const { isAuth } = storeToRefs(appStore);
// #ifdef APP-PLUS

  uni.preloadPage({url: "/pages/erke/erke"});
  uni.preloadPage({url: "/pages/news/news"});
  uni.preloadPage({url: "/pages/me/me2/me2"});
  // #endif
const tmStore = useTmpiniaStore();

const systemInfo = uni.getSystemInfoSync();

// const appStore = useAppStore();
 // #ifdef H5
 uni.hideTabBar({});


  // 夜间模式监听
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  tmStore.setTmVuetifyDark(colorScheme.matches);
  colorScheme.addEventListener("change", (e: MediaQueryListEvent) =>
    tmStore.setTmVuetifyDark(e.matches)
  );

  // 页面大小改变刷新页面
  // window.addEventListener("resize", () => {
  //   window.location.reload();
  // });

  // #endif
   /**
   * 设置主题，用户配置优先
   */
  // #ifdef MP-WEIXIN
  if (["light", "dark"].includes(uni.getStorageSync("theme"))) {
    tmStore.setTmVuetifyDark(uni.getStorageSync("theme") === "dark");
  } else if (["light", "dark"].includes(systemInfo.theme as string)) {
    tmStore.setTmVuetifyDark(systemInfo.theme === "dark");
  } else {
    tmStore.setTmVuetifyDark(false);
  }
  // #endif


</script>
<style lang="scss">
// @import './ui/scss/ui.scss';
/* #ifdef APP-NVUE */
@import './tmui/scss/nvue.css';
/* #endif */
/* #ifndef APP-NVUE */
@import './tmui/scss/noNvue.css';
/* #endif */

/* 解决小程序和app滚动条的问题 */

/* #ifdef MP-WEIXIN || APP-PLUS */

::-webkit-scrollbar {

	display: none;

}

/* #endif */

/* 解决H5 的问题 */

/* #ifdef H5 */

uni-scroll-view .uni-scroll-view::-webkit-scrollbar {

	/* 隐藏滚动条，但依旧具备可以滚动的功能 */

	display: none
}

/* #endif */

/* @import "./uni_modules/vk-uview-ui/index.scss"; */

// @import "./uni_modules/uview-plus/index.scss";

/* #ifdef H5 */
body::-webkit-scrollbar,
div::-webkit-scrollbar,
*::-webkit-scrollbar {
	display: none;
}

body.pages-index-index uni-page-body,
body {
	padding-bottom: 0 !important;

}

text {
	font-family: "sans-serif";
}

/* #endif */
</style>
