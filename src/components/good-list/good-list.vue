<template>

	<view class="erke-list" style="width: 95%;margin: auto;">

		<view :id="'good'+good.id" class="good-li" v-for="good in list" :key="good.id">
			<view @click="nav(good.id)">
				<tm-sheet :margin="[5, 5]" >
					<!-- <tm-divider></tm-divider> -->
					<view style="display: flex; flex-flow:row;justify-content: space-between;">
						<view style="width:49%;">
							<tm-image preview :round="2" :width="310" :height="200"
								:src="good.img||'https://cdn2.jaycao.com/cdtu/cdtunews.jpg'">
							</tm-image>
						</view>
						<view style="width:49%;display:flex;flex-flow: column;justify-content:space-between;" class="">
							<view>
								<tm-text :font-size="30" _class="font-weight-b text-overflow-2 text-weight-b" label="">{{good.title}}</tm-text>
							</view>
							<view>
								<tm-tag text :shadow="0" icon="tmicon-clock-fill" color="grey" size="m"
									:label="conv(good.date)" style=""></tm-tag>
							</view>
						</view>
						
					
					</view>




				</tm-sheet>
			</view>
			<!-- <tm-result :showBtn="false" v-if="list.length==0"></tm-result> -->
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,

				default () {
					return []
				}
			}
		},


		data() {
			return {

			};
		},
		computed: {




		},
		methods: {
			nav(id) {
				console.log(id);
				uni.navigateTo({
					url: "/pages/news/detail/detail?detailData=" + id
				})
			},
			conv(str) {
				return str.substring(0, 10)
			}
		}
	}
</script>

<style lang="scss">
	.erke-list {
		// width: 95%;
		// margin: auto;
		// padding: 20upx;
		// background-color: #FFFFFF;
		// border-radius: 10upx;
		// margin-top: 10upx;
		// margin-bottom: 10upx;
		// position: relative;
	}

	.flex {
		display: flex;
		margin-top: 15upx;
	}
</style>
