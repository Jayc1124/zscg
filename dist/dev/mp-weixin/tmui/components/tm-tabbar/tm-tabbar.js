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
  tmSheet();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-tabbar",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    transprent: {
      type: [Boolean],
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
    round: {
      type: [Number],
      default: 0
    },
    shadow: {
      type: [Number],
      default: 0
    },
    width: {
      type: [Number],
      default: 0
    },
    bottom: {
      type: [Number],
      default: 0
    },
    showSafe: {
      type: [Boolean],
      default: false
    },
    active: {
      type: Number,
      default: -1
    },
    autoSelect: {
      type: Boolean,
      default: true
    }
  }),
  emits: ["change", "update:active"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    tmui_tool_lib_tmpinia.useTmpiniaStore();
    let sys = common_vendor.index.getSystemInfoSync();
    const _width = common_vendor.index.upx2px(props.width) || ((_a = sys == null ? void 0 : sys.windowWidth) != null ? _a : 0);
    const _blur = common_vendor.computed$1(() => props.blur);
    const _activeUrl = common_vendor.ref("");
    const _activeUid = common_vendor.ref("");
    const tmTabbarId = "tmTabbarId";
    const _cachlist = common_vendor.ref([]);
    const _showSafe = common_vendor.ref(props.showSafe);
    const _activeIndex = common_vendor.ref(props.active);
    const win_bottom = (_c = (_b = sys == null ? void 0 : sys.safeAreaInsets) == null ? void 0 : _b.bottom) != null ? _c : 0;
    if (win_bottom > 0) {
      _showSafe.value = true;
    }
    const _totalBarHeight = common_vendor.computed$1(() => {
      if (_showSafe.value)
        return 90;
      return 75;
    });
    const _BarHeight = common_vendor.computed$1(() => {
      if (_showSafe.value)
        return 75;
      return 60;
    });
    function setNowurl(url, nowuid) {
      _activeUrl.value = url;
      _activeUid.value = String(nowuid);
    }
    function pushKey(uid) {
      _cachlist.value = [.../* @__PURE__ */ new Set([..._cachlist.value, uid])];
    }
    function delKey(uid) {
      _cachlist.value = _cachlist.value.filter((el) => el != uid);
    }
    expose({ tmTabbarId, setNowurl, pushKey, delKey });
    common_vendor.provide("tmTabbarUrl", common_vendor.computed$1(() => _activeUrl.value));
    common_vendor.provide("tmTabbarUid", common_vendor.computed$1(() => _activeUid.value));
    common_vendor.provide("tmTabbarWidth", common_vendor.computed$1(() => Math.ceil(_width / _cachlist.value.length)));
    common_vendor.provide("tmTabbarItemList", common_vendor.computed$1(() => _cachlist.value));
    common_vendor.provide("tmTabbarItemActive", common_vendor.computed$1(() => _activeIndex.value));
    common_vendor.provide("tmTabbarItemSafe", _showSafe.value);
    common_vendor.provide("tmTabbarItemAutoSelect", common_vendor.computed$1(() => props.autoSelect));
    common_vendor.watch(() => props.active, () => {
      if (props.active == _activeIndex.value)
        return;
      _activeIndex.value = props.active;
    });
    common_vendor.watch(_activeIndex, () => {
      emits("change", _activeIndex.value);
      emits("update:active", _activeIndex.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          blur: common_vendor.unref(_blur),
          color: props.color,
          parenClass: "relative",
          followTheme: props.followTheme,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: 0,
          borderDirection: "top",
          text: props.text,
          transprent: false,
          linear: props.linear,
          linearDeep: props.linearDeep,
          margin: [0, 0],
          padding: [0, 0],
          height: common_vendor.unref(_BarHeight),
          width: common_vendor.unref(_width),
          unit: "px"
        }),
        b: common_vendor.unref(_width) + "px",
        c: common_vendor.unref(_width) + "px",
        d: common_vendor.unref(_totalBarHeight) + "px",
        e: common_vendor.unref(_width) + "px",
        f: common_vendor.unref(_totalBarHeight) + "px",
        g: `translateY(${props.bottom}rpx)`
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabbar/tm-tabbar.vue"]]);
wx.createComponent(Component);
