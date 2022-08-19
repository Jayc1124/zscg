<template>
      <!-- <web-view :webview-styles="webviewStyles" :src="url"></web-view> -->
</template>

<script>

	import request from '@/common/request.js';
    export default {
      
		onLoad(e) {
     	this.url=e.detailData
		setTimeout(() => {
			 this.nav()
		}, 500);
		
		},
		methods:{
 nav() {




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



}
    },
        data() {
			
            return {
				data:'',
        dk:false,
				url:'',
                webviewStyles: {
                    progress: {
                        color: false
                    }
                }
            }
        }
    }
</script>

<style>

</style>
