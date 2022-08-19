<script >
import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue";
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue";

// const props = defineProps<{
//   // 当前激活的tabbarItem的index
//   active: number;
// }>();

export default {
  name: "tab-bar",
  props: {
    active: {
      type: Number,
      default() {
        return [];
      },
    },
  },
  methods: {
    beforeClick(index) {
      console.log(index);
      return this.active !== index;
    },
  },
};
</script>

<template>
  <tm-tabbar
    transprent
    blur
    :bottom="0"
    :round="16"
    :auto-select="false"
    :active="active"
    :shadow="8"
  >
    <tm-tabbar-item
      activeColor="primary"
      :beforeClick="beforeClick"
      :data="0"
      blur
      :active="active === 0"
      transprent
      open-type="switchTab"
      url="/pages/index/index"
      text="主页"
      icon="tmicon-wind-smile"
    ></tm-tabbar-item>
    <tm-tabbar-item
      url="/pages/news/news"
      text="工院"
      blur
      :beforeClick="beforeClick"
      :data="1"
      transprent
      open-type="switchTab"
      unicon="tmicon-news"
      icon="tmicon-news"
    ></tm-tabbar-item>
    <tm-tabbar-item
      url="/pages/erke/erke"
      :beforeClick="beforeClick"
      count=""
      dotColor="blue"
      :data="2"
      blur
      transprent
      text="二课"
      open-type="switchTab"
      unicon="tmicon-layergroup-fill"
      icon="tmicon-layergroup-fill"
    ></tm-tabbar-item>
    <tm-tabbar-item
      url="/pages/kebiao/index"
      :beforeClick="beforeClick"
      count=""
      dotColor="blue"
      :data="3"
      blur
      transprent
      text="课表"
      open-type="switchTab"
      unicon="tmicon-calendar-alt"
      icon="tmicon-calendar-alt"
    ></tm-tabbar-item>
    <tm-tabbar-item
      url="/pages/me/me2/me2"
      :beforeClick="beforeClick"
      count=""
      dotColor="blue"
      :data="4"
      blur
      transprent
      text="我的"
      open-type="switchTab"
      unicon="tmicon-account"
      icon="tmicon-account"
    ></tm-tabbar-item>
  </tm-tabbar>
</template>
