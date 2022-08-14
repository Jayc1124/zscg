"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "FatFatMeng-Swiper-mfw",
  props: {
    list: {
      type: Array,
      default: []
    },
    current: {
      type: Number,
      default: 1
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      disable_touch: false
    };
  },
  watch: {},
  methods: {
    change(e) {
      let index = e.detail.current;
      let event = {
        current: index
      };
      this.$emit("change", event);
    },
    SwiperIndTap(e) {
      console.log(e);
    }
  },
  beforeCreate() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: item.Image,
        b: index
      };
    }),
    b: $props.autoplay,
    c: $props.current,
    d: $data.disable_touch,
    e: common_vendor.o((...args) => $options.change && $options.change(...args))
  }, {}, {
    f: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: $props.current == index
      }, $props.current == index ? common_vendor.e({
        b: item.mp4
      }, item.mp4 ? {} : {}, {
        c: common_vendor.t$1(item.title),
        d: item.UserImage,
        e: common_vendor.t$1(item.UserName),
        f: common_vendor.t$1(item.UserGPS),
        g: common_vendor.n($props.current == index ? "current" : "no")
      }) : {}, {
        h: index
      });
    }),
    g: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: Number(index) <= 4
      }, Number(index) <= 4 ? {
        b: common_vendor.n($props.current == index ? "current" : "no"),
        c: item.Image
      } : {}, {
        d: index,
        e: common_vendor.o(($event) => $options.SwiperIndTap(index), index)
      });
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4db70048"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/FatFatMeng-Swiper-mfw/components/FatFatMeng-Swiper-mfw/FatFatMeng-Swiper-mfw.vue"]]);
qq.createComponent(Component);
