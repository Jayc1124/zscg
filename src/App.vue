<script  lang="ts">

</script>
<style>
	/* #ifdef APP-NVUE */
	@import './tmui/scss/nvue.css';
	/* #endif */
	/* #ifndef APP-NVUE */
	@import './tmui/scss/noNvue.css';
	/* #endif */

/* 解决小程序和app滚动条的问题 */

/* #ifdef MP-WEIXIN || APP-PLUS */

::-webkit-scrollbar{

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
	
	text{
		font-family:"sans-serif";
	}
	/* #endif */
</style>
