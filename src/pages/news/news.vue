<!-- 吸顶轮播菜单导航 -->

<template>
	<tm-app ref="app">
		<tm-navbar title="CDTU 成工要闻" :shadow="0">
		</tm-navbar>

		<view>

			<mescroll-uni ref="mescrollRef" @init="mescrollInit" @up="upCallback" height="100%">

				<view>
					<!-- <tm-carousel autoplay :margin="[0,16]" align="right" :round="8" :width="686" :height="300" :list="listimg"></tm-carousel> -->
					<!-- <image style="width: 100%;height: 340rpx;" src="https://www.mescroll.com/img/swiper1.jpg"/> -->
					<view slot='header' @click="cu">
						<!-- Swiper-mfw轮播图带视频 [仿马蜂窝APP首页轮播图] -->
						<FatFatMeng-Swiper-mfw :list="SwiperMfwlist" :current="current" :autoplay="true"
							@change="change">
						</FatFatMeng-Swiper-mfw>
					</view>
					<!-- <image style="width: 100%;height: 245rpx; solid #f2f2f2"
						src="https://www.mescroll.com/img/beibei/beibei2.jpg" /> -->
				</view>
				<tm-sticky offset="0">
					<template v-slot:sticky>
						<tm-sheet :margin="[0, 0]">
							<tm-input placeholder="请输入关键字" :border="1" showClear prefix="tmicon-search" @search=''
								searchLabel="搜索"></tm-input>
							<tm-divider></tm-divider>
							<tm-tabs :list="tabs" :width="750" :height="80" :itemHeight="45" :itemWidth="140"
								default-name="1" @change="tabschange">
							</tm-tabs>
						</tm-sheet>


					</template>

					<tm-sheet v-if="load">
						<tm-skeleton model="chat"></tm-skeleton>
						<tm-skeleton model="chat"></tm-skeleton>
						<tm-skeleton model="chat"></tm-skeleton>
						<tm-skeleton model="chat"></tm-skeleton>
					</tm-sheet>
					<!-- 数据列表 -->
					<good-list :list="goods"></good-list>

				</tm-sticky>







			</mescroll-uni>
		</view>
		 <tab-bar :active="1"></tab-bar>
	</tm-app>
</template>

<script  >
import TabBar from "@/components/TheTabBar.vue";
	import request from '@/common/request.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	

	export default {
		 components: {
 TabBar
  },
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {

				offset: 50,
				// #ifdef H5
				offset: 68,
				// #endif
				load: true,
				current: 0,
				goods: [], // 数据列表
				SwiperMfwlist: [{
						id: 1,
						Image: 'https://b1-q.mafengwo.net/s17/M00/78/09/CoUBXmERFxyAMagZAAd7ujMYDZU158.png', //轮播图(封面图)
						mp4: '',
						title: '【岛屿来信】在冰岛写了封信，寄给15岁的自己', //标题
						UserImage: 'https://n1-q.mafengwo.net/s12/M00/D1/C3/wKgED1v3uaOADWepACAWS9q5Rhg19.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90', // 用户头像
						UserName: '诗的PHOTO', // 用户名
						UserGPS: '杭州' // 当前所在的城市
					},
				
					{
						id: 3,
						Image: 'https://n1-q.mafengwo.net/s16/M00/EB/2D/CoUBUmDlheiAdABtAAgo3xeAaaQ458.jpg?imageMogr2/thumbnail/!440x300r/strip/gravity/Center/crop/!440x300/quality/90', //轮播图(封面图)
						mp4: '',
						title: '一半风光一半人文，与你奔赴藏地找寻世界如初的模样', //标题
						UserImage: 'https://p1-q.mafengwo.net/s10/M00/5C/55/wKgBZ1mRHV2APLX9AABt9unXidc25.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90', // 用户头像
						UserName: '郭小yan', // 用户名
						UserGPS: '广州' // 当前所在的城市
					},
					{
						id: 4,
						Image: 'https://b1-q.mafengwo.net/s18/M00/21/34/CoUBYWEHpHOAU3amAAQzcB1XxYQ493.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90', //轮播图(封面图)
						mp4: '',
						title: '海州日记：山海辽阔浪漫 海鲜诱惑难挡，全是人间值得！', //标题
						UserImage: 'https://b1-q.mafengwo.net/s9/M00/B3/D4/wKgBs1hgfP-Ae9emABNBFw8wn4U38.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90', // 用户头像
						UserName: '风之七彩', // 用户名
						UserGPS: '无锡' // 当前所在的城市
					},
					{
						id: 5,
						Image: 'https://n1-q.mafengwo.net/s16/M00/40/C8/CoUBUmD1sDWAAeQFAAnK3yTNs_I942.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90', //轮播图(封面图)
						mp4: '',
						title: '西北大环线自驾丨初夏，一场7日逃离「地球」的旅行', //标题
						UserImage: 'https://n1-q.mafengwo.net/s1/M00/9A/AA/wKgIC1uEE6SAF_DOAACyC15Thk811.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90', // 用户头像
						UserName: '帆妮儿', // 用户名
						UserGPS: '北京' // 当前所在的城市
					},
					{
						id: 6,
						Image: 'https://n1-q.mafengwo.net/s16/M00/81/40/CoUBUmD5W1iAanT9ABE22ZlvQlg407.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90', //轮播图(封面图)
						mp4: '',
						title: '在缙云，我发现了去仙侠宇宙的传送门', //标题
						UserImage: 'https://b1-q.mafengwo.net/s15/M00/8E/41/CoUBGV3h1xqAdMEiACG5XnWSoMA99.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90', // 用户头像
						UserName: '莎莎爱旅行', // 用户名
						UserGPS: '上海' // 当前所在的城市
					},
					{
						id: 7,
						Image: 'https://n1-q.mafengwo.net/s16/M00/42/A2/CoUBUmDw8T6AdDCjABhWy-clT_M281.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90', //轮播图(封面图)
						mp4: '',
						title: '【魔都漫步】去上海，穿越时空的盛夏', //标题
						UserImage: 'https://b1-q.mafengwo.net/s15/M00/92/A8/CoUBGWECgimABvHVAAlxqNsMSGw93.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90', // 用户头像
						UserName: 'goericgo', // 用户名
						UserGPS: '青岛' // 当前所在的城市
					}
				],
				tabs: [{
						key: "1",
						title: "成工要闻"
					},
					{
						key: "2",
						title: "新时代高教"
					},
					{
						key: "3",
						title: "通知与公告"

					},
					{
						key: "4",
						title: "弘毅讲坛"

					},
					{
						key: "5",
						title: "媒体看学校"

					},
				],
				tabIndex: 1, // tab下标

				listimg: ["https://picsum.photos/200/300?id=43335",
					"https://picsum.photos/200/300?id=433",
					"https://picsum.photos/200/300?id=439",
					"https://picsum.photos/200/300?id=459",
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			cu() {
				console.log("当前" + this.current)
			},
			change(e) {
				this.current = e.current
		
			},
			tabschange(key) {


				this.tabIndex = key
				this.goods = []; // 置空列表,显示加载进度条
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {

				request.httpTokenRequest({
					url: 'news/item/' + this.tabIndex + '?pageNum=' + page.num,
					method: 'get'
				}, {}).then(res => {

					if (page.num == 1) this.goods = []; //如果是第一页需手动制空列表
					this.goods = this.goods.concat(res.data.rows); //追加新数据

					this.mescroll.endSuccess(res.data.length); // 隐藏加载状态栏
					this.load = false;
				})
				// apiGoods(page.num, page.size, keyword).then(res=>{
				// 	if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
				// 	this.goods=this.goods.concat(res.list); //追加新数据
				// 	this.mescroll.endSuccess(res.list.length); // 隐藏加载状态栏
				// }).catch(()=>{
				// 	//联网失败, 结束加载
				// 	this.mescroll.endErr();
				// })
			},
			// 切换菜单
		}
	}
</script>

<style lang="scss">

</style>
