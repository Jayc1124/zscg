<template>
<!-- <tm-navbar title="CDTU 青春成工" :shadow="0">
		</tm-navbar> -->
    <view v-if="dk">
        
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
		  <!-- <web-view :webview-styles="webviewStyles" src="http://www.baidu.com"></web-view> -->
    </view>
</template>

<script>

	import request from '@/common/request.js';
    export default {
      
		onLoad(e) {
      console.log("666")
        request.httpTokenRequest({
		url: 'getInfo/getEkToken',
    method:'post'
	}).then(res => {
    console.log(e.detailData)
		if (res.data.code == 200) {
       console.log(res.data.msg)
      this.data=res.data.msg
     

			this.url=JSON.parse(decodeURIComponent(e.detailData))+`&token=`+res.data.msg
            console.log(this.url)
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
