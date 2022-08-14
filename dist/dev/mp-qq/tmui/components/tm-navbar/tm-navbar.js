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
  (tmIcon + tmText + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-navbar",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: [String],
      default: "white"
    },
    text: {
      type: [Boolean],
      default: false
    },
    border: {
      type: [Number],
      default: 0
    },
    shadow: {
      type: [Number],
      default: 1
    },
    borderDirection: {
      type: String,
      default: "bottom"
    },
    round: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    height: {
      type: [Number],
      default: 44
    },
    leftWidth: {
      type: [Number],
      default: 220
    },
    rightWidth: {
      type: [Number],
      default: 220
    },
    fontSize: {
      type: [Number],
      default: 30
    },
    iconFontSize: {
      type: [Number],
      default: 37
    },
    title: {
      type: [String],
      default: "\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898"
    },
    fontColor: {
      type: [String],
      default: ""
    },
    homeColor: {
      type: [String],
      default: ""
    },
    hideHome: {
      type: Boolean,
      default: false
    },
    hideBack: {
      type: Boolean,
      default: true
    },
    homePath: {
      type: [String],
      default: "/pages/index/index"
    },
    beforeBack: {
      type: [Boolean, Function],
      default: () => true
    },
    blur: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["click", "close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    tmui_tool_lib_tmpinia.useTmpiniaStore();
    const _height = common_vendor.computed$1(() => props.height);
    const _width = common_vendor.index.getSystemInfoSync().windowWidth;
    const statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const _barHeight = common_vendor.computed$1(() => statusBarHeight + _height.value);
    const _leftWidth = common_vendor.computed$1(() => props.leftWidth);
    const _rightWidth = common_vendor.computed$1(() => props.rightWidth);
    const contentwidth = common_vendor.computed$1(() => {
      return _width - common_vendor.index.upx2px(_leftWidth.value) - common_vendor.index.upx2px(_rightWidth.value);
    });
    const _title = common_vendor.computed$1(() => props.title);
    const _fontColor = common_vendor.computed$1(() => props.fontColor);
    const _homeColor = common_vendor.computed$1(() => props.homeColor);
    const _blur = common_vendor.computed$1(() => props.blur);
    const _pages = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      _pages.value = getCurrentPages().length;
    });
    const backhome = () => {
      common_vendor.index.reLaunch({
        url: props.homePath
      });
    };
    let timerId = NaN;
    function debounce(func, wait = 500, immediate = false) {
      if (!isNaN(timerId))
        clearTimeout(timerId);
      if (immediate) {
        var callNow = !timerId;
        timerId = setTimeout(() => {
          timerId = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
    const goback = () => {
      debounce(async () => {
        if (typeof props.beforeBack === "function") {
          let p = await props.beforeBack();
          if (typeof p === "function") {
            p = await p();
          }
          if (!p)
            return;
        }
        common_vendor.index.navigateBack({});
      }, 250, true);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_barHeight) + "px",
        b: common_vendor.unref(statusBarHeight) + "px",
        c: _pages.value > 1 && props.hideBack
      }, _pages.value > 1 && props.hideBack ? {
        d: common_vendor.o(goback),
        e: common_vendor.p({
          unit: props.unit,
          ["font-size"]: props.iconFontSize,
          _class: "pointer pb-12 pt-12 pr-12",
          color: common_vendor.unref(_homeColor),
          name: "tmicon-angle-left"
        })
      } : {}, {
        f: _pages.value == 1 && !__props.hideHome
      }, _pages.value == 1 && !__props.hideHome ? {
        g: common_vendor.o(backhome),
        h: common_vendor.p({
          unit: props.unit,
          _class: "pointer  pb-12 pt-12 pr-12",
          color: common_vendor.unref(_homeColor),
          ["font-size"]: props.iconFontSize,
          name: "tmicon-md-home"
        })
      } : {}, {
        i: common_vendor.unref(_leftWidth) + "rpx",
        j: common_vendor.p({
          unit: props.unit,
          _class: "text-weight-b text-overflow-1",
          color: common_vendor.unref(_fontColor),
          ["font-size"]: props.fontSize,
          label: common_vendor.unref(_title)
        }),
        k: common_vendor.unref(contentwidth) + "px",
        l: common_vendor.unref(_rightWidth) + "rpx",
        m: common_vendor.o(($event) => emits("click", $event)),
        n: common_vendor.p({
          blur: common_vendor.unref(_blur),
          color: props.color,
          _class: _ctx._class,
          _style: _ctx._style,
          followTheme: props.followTheme,
          ["follow-dark"]: props.followDark,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          margin: props.margin,
          padding: props.padding,
          height: common_vendor.unref(_barHeight),
          width: common_vendor.unref(_width),
          unit: "px"
        }),
        o: common_vendor.unref(_width) + "px",
        p: common_vendor.unref(_barHeight) + "px"
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18fa0d39"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-navbar/tm-navbar.vue"]]);
qq.createComponent(Component);
