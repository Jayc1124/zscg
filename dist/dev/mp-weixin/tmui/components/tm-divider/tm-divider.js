"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../common/vendor.js");
var tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
var tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  tmText();
}
const tmText = () => "../tm-text/tm-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-divider",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    color: {
      type: String,
      default: "grey-3"
    },
    fontColor: {
      type: String,
      default: "grey-1"
    },
    fontSize: {
      type: Number,
      default: 26
    },
    vertical: {
      type: [Boolean],
      default: false
    },
    height: {
      type: [Number, String],
      default: 26
    },
    label: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: "center"
    },
    margin: {
      type: Array,
      default: () => [16, 24]
    },
    border: {
      type: [Number],
      default: 1
    },
    realColor: {
      type: [Boolean],
      default: false
    }
  }),
  setup(__props) {
    var _a, _b;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const borderDir = common_vendor.computed$1(() => props.vertical ? "left" : "bottom");
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), tmcfg.value));
    const tmcomputed = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedTheme(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), isDark.value, tmcfg.value));
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !props.label || props.vertical
      }, !props.label || props.vertical ? {
        b: common_vendor.s({
          backgroundColor: props.realColor ? common_vendor.unref(tmcomputed).color : common_vendor.unref(tmcomputed).border
        }),
        c: common_vendor.s(props.vertical ? {
          width: props.border + "rpx",
          height: props.height + "rpx"
        } : ""),
        d: common_vendor.n(props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`)
      } : {}, {
        e: __props.label && !props.vertical
      }, __props.label && !props.vertical ? {
        f: common_vendor.s(common_vendor.unref(tmcomputed) ? {
          backgroundColor: props.realColor ? common_vendor.unref(tmcomputed).color : common_vendor.unref(tmcomputed).border,
          height: props.border + "rpx"
        } : ""),
        g: common_vendor.n(`my-${props.margin[1]}`),
        h: common_vendor.n(__props.align == "left" ? "flex-2" : ""),
        i: common_vendor.n(__props.align == "right" ? "flex-10" : ""),
        j: common_vendor.n(__props.align == "center" ? "flex-1" : ""),
        k: common_vendor.p({
          fontSize: props.fontSize,
          dark: common_vendor.unref(isDark),
          followTheme: props.followTheme,
          color: props.fontColor,
          label: props.label,
          _class: ["mx-32"]
        }),
        l: common_vendor.n(common_vendor.unref(isDark) ? "opacity-4" : ""),
        m: common_vendor.s(common_vendor.unref(tmcomputed) ? {
          backgroundColor: props.realColor ? common_vendor.unref(tmcomputed).color : common_vendor.unref(tmcomputed).border,
          height: props.border + "rpx"
        } : ""),
        n: common_vendor.n(`my-${props.margin[1]}`),
        o: common_vendor.n(__props.align == "left" ? "flex-10" : ""),
        p: common_vendor.n(__props.align == "right" ? "flex-2" : ""),
        q: common_vendor.n(__props.align == "center" ? "flex-1" : "")
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-divider/tm-divider.vue"]]);
wx.createComponent(Component);
