"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    direction: {
      type: String,
      default: "below"
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: String,
      default: "fit-content"
    },
    is_close: {
      type: Boolean,
      default: true
    },
    is_mask: {
      type: Boolean,
      default: true
    },
    maskFun: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    show() {
      this.open = true;
      this.$emit("watchOpen");
    },
    close(e) {
      if (e == 1 && !this.maskFun)
        return;
      this.open = false;
      this.$emit("watchClose");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.direction === "center" ? $data.open : true
  }, ($props.direction === "center" ? $data.open : true) ? common_vendor.e({
    b: $props.is_close
  }, $props.is_close ? {
    c: common_vendor.n($props.direction !== "below" && $props.direction !== "center" ? "iconfont-h5" : ""),
    d: common_vendor.o((...args) => $options.close && $options.close(...args))
  } : {}, {
    e: $props.width + "%",
    f: $props.height == "fit-content" ? $props.height : $data.open ? $props.height : "fit-content",
    g: common_vendor.n(($data.open ? "on" : "") + " " + $props.direction),
    h: common_vendor.o(() => {
    }),
    i: $props.is_mask
  }, $props.is_mask ? {
    j: common_vendor.o(() => {
    }),
    k: !$data.open,
    l: common_vendor.o(($event) => $options.close(1))
  } : {}, {
    m: common_vendor.n($props.direction === "center" ? "centers" : "")
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ef4c5ef"], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/ming-pop/ming-pop.vue"]]);
qq.createComponent(Component);
