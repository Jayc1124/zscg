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
var tmui_tool_theme_theme = require("../../tool/theme/theme.js");
var tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
var tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-icon",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    label: {
      type: String,
      default: ""
    },
    fontSize: {
      type: [Number],
      default: 34
    },
    color: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    spin: {
      type: [Boolean],
      defalut: true
    },
    unit: {
      type: String,
      default: "rpx"
    },
    lineHeight: {
      type: [Number],
      default: -1
    }
  }),
  emits: ["click", "longpress"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    const customCSSStyle = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    common_vendor.computed$1(() => tmui_tool_lib_minxs.computedTheme(props, isDark.value, tmcfg.value));
    function clickhandle(e) {
      emits("click", e);
    }
    const appTextColor = common_vendor.inject("appTextColor", common_vendor.computed$1(() => void 0));
    const textColor = common_vendor.computed$1(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      let isColorHex = tmui_tool_theme_theme.theme.isCssColor(props.color);
      if (isColorHex)
        return props.color;
      if (props.color && !isColorHex) {
        let nowcolor = tmui_tool_theme_theme.theme.getColor(props.color);
        return nowcolor.csscolor;
      }
      if (appTextColor.value)
        return appTextColor.value;
      return "rgba(34, 34, 34, 1.0)";
    });
    const fontSizeComputed = common_vendor.computed$1(() => {
      return { fontSize: (props.fontSize || 30) + props.unit, lineHeight: props.lineHeight > -1 ? props.lineHeight + props.unit : (props.fontSize || 30) + props.unit };
    });
    const prefx = common_vendor.computed$1(() => {
      let prefix = props.name.split("-")[0];
      return prefix;
    });
    const iconComputed = common_vendor.computed$1(() => {
      return props.name;
    });
    const isImg = common_vendor.computed$1(() => {
      if (props.name[0] == "." || props.name[0] == "/" || props.name.substring(0, 5) == "data:" || props.name.substring(0, 4) == "http" || props.name.substring(0, 5) == "https" || props.name.substring(0, 3) == "ftp") {
        return true;
      }
      return false;
    });
    const spinComputed = common_vendor.computed$1(() => props.spin);
    const custom_space_size = common_vendor.inject("custom_space_size", [0, 0]);
    common_vendor.computed$1(() => parseInt(props.fontSize || 34) + custom_space_size[0]);
    common_vendor.computed$1(() => parseInt(props.fontSize || 34) + custom_space_size[1]);
    common_vendor.ref(null);
    common_vendor.watch(spinComputed, () => {
    });
    common_vendor.onBeforeMount(() => {
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onUnmounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(isImg)
      }, !common_vendor.unref(isImg) ? {
        b: common_vendor.o(clickhandle),
        c: common_vendor.o(($event) => emits("longpress", $event)),
        d: common_vendor.n(common_vendor.unref(spinComputed) ? "spin" : ""),
        e: common_vendor.n(common_vendor.unref(prefx)),
        f: common_vendor.n(common_vendor.unref(iconComputed)),
        g: common_vendor.n(common_vendor.unref(customClass)),
        h: common_vendor.s(common_vendor.unref(fontSizeComputed)),
        i: common_vendor.s({
          color: common_vendor.unref(textColor)
        }),
        j: common_vendor.s(common_vendor.unref(customCSSStyle))
      } : {}, {
        k: common_vendor.unref(isImg)
      }, common_vendor.unref(isImg) ? {
        l: common_vendor.o(clickhandle),
        m: common_vendor.o(($event) => emits("longpress", $event)),
        n: common_vendor.unref(iconComputed),
        o: common_vendor.n(common_vendor.unref(spinComputed) ? "spin" : ""),
        p: common_vendor.n(common_vendor.unref(customClass)),
        q: common_vendor.s({
          width: (props.fontSize || 30) + props.unit,
          height: (props.fontSize || 30) + props.unit
        }),
        r: common_vendor.s(common_vendor.unref(customCSSStyle))
      } : {}, {
        s: common_vendor.s({
          marginRight: common_vendor.unref(custom_space_size)[0] + "rpx",
          marginBottom: common_vendor.unref(custom_space_size)[1] + "rpx"
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-513b896a"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-icon/tm-icon.vue"]]);
qq.createComponent(Component);
