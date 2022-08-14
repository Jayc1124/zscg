<template>
	<view>
		<web-view :webview-styles="webviewStyles" src="http://192.168.31.164:9999/h5/"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: ''
					}
				}
			}
		}
	}
</script>

<style>

</style>