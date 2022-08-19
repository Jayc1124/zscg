<template>
    <view v-if="dk">
        
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
		  <!-- <web-view :webview-styles="webviewStyles" src="http://www.baidu.com"></web-view> -->
    </view>
</template>

<script>

	import request from '@/common/request.js';
    export default {
      
		onLoad(e) {
        request.httpTokenRequest({
		url: 'getInfo/getToken',
    method:'post'
	}).then(res => {
		if (res.data.code == 200) {
      this.data=res.data.msg
     
      
			this.url=e.detailData+`?`+res.data.msg
    		 this.dk=true
      
		}
	})
		
	
  
     
    
			// this.url = JSON.parse(decodeURIComponentl=e.detailData))
			// this.data=JSON.parse(decodeURIComponent(e.data))
	
		},
		methods:{
 gettoken(){

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
