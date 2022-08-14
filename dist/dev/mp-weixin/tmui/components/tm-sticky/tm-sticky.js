"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-sticky",
  props: {
    model: {
      type: String,
      default: "top"
    },
    offset: {
      type: [String, Number],
      default: "0px"
    },
    zIndex: {
      type: Number,
      default: 50
    }
  },
  setup(__props) {
    const props = __props;
    const _offset = common_vendor.computed$1(() => {
      if (typeof props.offset === "number")
        return props.offset + "rpx";
      return props.offset;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(props.model == "top" ? {
          top: `${common_vendor.unref(_offset)}`
        } : ""),
        b: common_vendor.s(props.model == "left" ? {
          left: `${common_vendor.unref(_offset)}`
        } : ""),
        c: common_vendor.s({
          "z-index": props.zIndex
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4329f4ab"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-sticky/tm-sticky.vue"]]);
wx.createComponent(Component);
