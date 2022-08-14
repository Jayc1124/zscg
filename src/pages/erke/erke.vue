<!-- 吸顶轮播菜单导航 -->

<template>
  <tm-app ref="app">
    <tm-navbar title="CDTU 成工二课" :shadow="0">
      <template v-slot:left>
        <view class="flex flex-center flex-row"> </view>
      </template>
    </tm-navbar>

    <mescroll-uni
      ref="mescrollRef"
      @init="mescrollInit"
      @up="upCallback"
      height="100%"
    >
      <tm-sticky offset="0">
        <template v-slot:sticky>
          <tm-tabs
            :list="tabs"
            :width="1000"
            :itemWidth="160"
            :height="300"
            default-name="1"
            @change="tabschange"
          ></tm-tabs>
        </template>

        <tm-sheet v-if="load">
          <tm-skeleton model="chat"></tm-skeleton>
          <tm-skeleton model="chat"></tm-skeleton>
          <tm-skeleton model="chat"></tm-skeleton>
          <tm-skeleton model="chat"></tm-skeleton>
        </tm-sheet>
        <!-- 数据列表 -->

        <!-- #ifdef MP-WEIXIN -->
        <view>
          <ad-custom unit-id="adunit-495491043be208ba"></ad-custom>
        </view>

        <!-- #endif -->
        <erke-list :list="goods"></erke-list>
        <!-- #ifdef MP-WEIXIN -->
        <view>
          <ad-custom unit-id="adunit-495491043be208ba"></ad-custom>
        </view>

        <!-- #endif -->

        <tm-result :showBtn="false" v-if="goods.length == 0"></tm-result>
      </tm-sticky>
    </mescroll-uni>
  </tm-app>
</template>

<script>
import request from "@/common/request.js";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";

export default {
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      offset: 50,
      // #ifdef H5
      offset: 68,
      // #endif
      load: true,
      goods: [], // 数据列表
      tabs: [
        {
          key: "1",
          title: "线下",
          icon: "tmicon-ios-leaf",
        },
        {
          key: "2",
          title: "线上",
          icon: "tmicon-ios-umbrella",
        },
        {
          key: "3",
          title: "可报名",
          icon: "tmicon-ios-rocket",
        },
      ],
      tabIndex: 1, // tab下标

      listvedio: [
        "https://www.cdtu.edu.cn/images/20220671.png",
        {
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          img: "https://picsum.photos/200/300?id=43335",
          type: "video",
        },
        "https://www.cdtu.edu.cn/images/2021xiaofeng5chenggongjingshen.png",
      ],
    };
  },
  onLoad() {
    this.tabschange(1);
  },
  methods: {
    /*下拉刷新的回调 */
    downCallback() {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据

      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
      this.mescroll.resetUpScroll();
    },
    tabschange(key) {
      console.log(key);
      this.tabIndex = key;
      let url = "";
      if (key == 2) {
        // this.$refs.toast.show({model:'load',mask:true})
        url = "wx/erke/getxx";
      } else if (key == 1) {
        // this.$refs.toast.show({model:'load',mask:true})
        url = "wx/erke/getxs";
      } else {
        // this.$refs.toast.show({model:'load',mask:true})
        url = "wx/erke/getbm";
      }
      request
        .httpTokenRequest(
          {
            url: url,
            method: "get",
          },
          {}
        )
        .then((res) => {
          console.log(res);
          this.goods = []; //如果是第一页需手动制空列表
          this.goods = this.goods.concat(res.data.data.data.records); //追加新数据
          this.load = false;
        });
      this.mescroll.resetUpScroll();
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */

    // 切换菜单
  },
};
</script>

<style lang="scss">
/*
	sticky生效条件：
	1、父元素不能overflow:hidden或者overflow:auto属性。(mescroll-body设置:sticky="true"即可, mescroll-uni本身没有设置overflow)
	2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
	3、父元素的高度不能低于sticky元素的高度
	4、sticky元素仅在其父元素内生效,所以父元素必须是 mescroll
	*/
.sticky-tabs {
  z-index: 990;
  position: sticky;
  top: 0;

  // background-color: #fff;
}

.demo-tip {
  // padding: 18rpx;
  font-size: 24rpx;
  text-align: center;
}
</style>
