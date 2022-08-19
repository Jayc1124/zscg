<template>
    <view>

        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
		  <!-- <web-view :webview-styles="webviewStyles" src="http://www.baidu.com"></web-view> -->
    </view>
</template>

<script>
	// import request from '@/common/request.js';
    export default {
		onLoad(e) {
			// setTimeout(()=>{
			// uni.setNavigationBarTitle({
			// title:'请点击上方左侧按钮返回'
			// })
			// },500)
			console.log(e)
			this.url=e.detailData
			// this.url = JSON.parse(decodeURIComponentl=e.detailData))
			// this.data=JSON.parse(decodeURIComponent(e.data))
	
		},
		
        data() {
			
            return {
				data:'',
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
