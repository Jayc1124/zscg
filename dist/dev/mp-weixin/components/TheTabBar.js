"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "tab-bar",
  props: {
    active: {
      type: Number,
      default() {
        return [];
      }
    }
  },
  methods: {
    beforeClick(index) {
      console.log(index);
      return this.active !== index;
    }
  }
};
if (!Array) {
  const _easycom_tm_tabbar_item2 = common_vendor.resolveComponent("tm-tabbar-item");
  const _easycom_tm_tabbar2 = common_vendor.resolveComponent("tm-tabbar");
  (_easycom_tm_tabbar_item2 + _easycom_tm_tabbar2)();
}
const _easycom_tm_tabbar_item = () => "../tmui/components/tm-tabbar-item/tm-tabbar-item.js";
const _easycom_tm_tabbar = () => "../tmui/components/tm-tabbar/tm-tabbar.js";
if (!Math) {
  (_easycom_tm_tabbar_item + _easycom_tm_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      activeColor: "primary",
      beforeClick: $options.beforeClick,
      data: 0,
      blur: true,
      active: $props.active === 0,
      transprent: true,
      ["open-type"]: "switchTab",
      url: "/pages/index/index",
      text: "\u4E3B\u9875",
      icon: "tmicon-wind-smile"
    }),
    b: common_vendor.p({
      url: "/pages/news/news",
      text: "\u5DE5\u9662",
      blur: true,
      beforeClick: $options.beforeClick,
      data: 1,
      transprent: true,
      ["open-type"]: "switchTab",
      unicon: "tmicon-news",
      icon: "tmicon-news"
    }),
    c: common_vendor.p({
      url: "/pages/erke/erke",
      beforeClick: $options.beforeClick,
      count: "",
      dotColor: "blue",
      data: 2,
      blur: true,
      transprent: true,
      text: "\u4E8C\u8BFE",
      ["open-type"]: "switchTab",
      unicon: "tmicon-layergroup-fill",
      icon: "tmicon-layergroup-fill"
    }),
    d: common_vendor.p({
      url: "/pages/kebiao/index",
      beforeClick: $options.beforeClick,
      count: "",
      dotColor: "blue",
      data: 3,
      blur: true,
      transprent: true,
      text: "\u8BFE\u8868",
      ["open-type"]: "switchTab",
      unicon: "tmicon-calendar-alt",
      icon: "tmicon-calendar-alt"
    }),
    e: common_vendor.p({
      url: "/pages/me/me2/me2",
      beforeClick: $options.beforeClick,
      count: "",
      dotColor: "blue",
      data: 4,
      blur: true,
      transprent: true,
      text: "\u6211\u7684",
      ["open-type"]: "switchTab",
      unicon: "tmicon-account",
      icon: "tmicon-account"
    }),
    f: common_vendor.p({
      transprent: true,
      blur: true,
      bottom: 0,
      round: 16,
      ["auto-select"]: false,
      active: $props.active,
      shadow: 8
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/TheTabBar.vue"]]);
wx.createComponent(Component);
