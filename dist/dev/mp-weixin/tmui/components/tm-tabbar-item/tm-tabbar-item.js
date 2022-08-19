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
  (tmIcon + tmBadge + tmText + tmSheet)();
}
const tmBadge = () => "../tm-badge/tm-badge.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-tabbar-item",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    transprent: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "white"
    },
    fontColor: {
      type: String,
      default: "grey-darken-1"
    },
    linear: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: "primary"
    },
    active: {
      type: Boolean,
      default: false
    },
    btnTop: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    unicon: {
      type: String,
      default: ""
    },
    textSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 38
    },
    dot: {
      type: [Boolean],
      default: false
    },
    dotColor: {
      type: [String],
      default: "red"
    },
    dotIcon: {
      type: [String],
      default: ""
    },
    count: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number],
      default: 99
    },
    url: {
      type: [String],
      default: ""
    },
    openType: {
      type: String,
      default: "navigate"
    },
    beforeClick: {
      type: [Function, Boolean],
      default: () => false
    },
    load: {
      type: [Boolean, String],
      default: false
    },
    data: {
      type: [Object, String, Number],
      default: () => void 0
    }
  }),
  emits: ["click", "beforeClick"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _btnTop = common_vendor.computed$1(() => props.btnTop);
    const _transprent = common_vendor.computed$1(() => {
      if (_btnTop.value === true)
        return false;
      return true;
    });
    const _styletop = common_vendor.computed$1(() => {
      if (_btnTop.value !== true)
        return "top:15px";
      return "top:0px";
    });
    const _padding = common_vendor.computed$1(() => {
      return [0, 0];
    });
    const _load = common_vendor.ref(props.load);
    const _active = common_vendor.ref(false);
    const c_font_style = common_vendor.computed$1(() => {
      return { dotColor: props.dotColor, text: props.text, icon: props.icon, textSize: props.textSize, iconSize: props.iconSize, unicon: props.unicon };
    });
    const uid = common_vendor.index.$tm.u.getUid(1);
    const tmTabbarWidth = common_vendor.inject("tmTabbarWidth", common_vendor.computed$1(() => 50));
    const _width = common_vendor.computed$1(() => {
      if (_btnTop.value === true)
        return 60;
      return tmTabbarWidth.value;
    });
    common_vendor.inject("tmTabbarUrl", common_vendor.computed$1(() => ""));
    const tmTabbarItemList = common_vendor.inject("tmTabbarItemList", common_vendor.computed$1(() => []));
    const nowUid = common_vendor.inject("tmTabbarUid", common_vendor.computed$1(() => ""));
    common_vendor.inject("tmTabbarItemSafe", false);
    const tmTabbarItemActive = common_vendor.inject("tmTabbarItemActive", common_vendor.computed$1(() => -1));
    const tmTabbarItemAutoSelect = common_vendor.inject("tmTabbarItemAutoSelect", common_vendor.computed$1(() => false));
    const _color = common_vendor.computed$1(() => {
      if (_active.value === true && !_btnTop.value) {
        if (store.tmStore.color && props.followTheme) {
          return store.tmStore.color;
        }
        return props.activeColor;
      }
      return props.fontColor;
    });
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmTabbarId) == "tmTabbarId" || !parent) {
        break;
      } else {
        parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
      }
    }
    if (parent) {
      parent.pushKey(uid);
    }
    common_vendor.onUnmounted(() => {
      if (parent) {
        parent.delKey(uid);
      }
    });
    if (tmTabbarItemAutoSelect.value) {
      _active.value = props.active || false;
    } else {
      if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
        _active.value = true;
      } else {
        _active.value = false;
      }
    }
    function setActive() {
      if (nowUid.value == uid) {
        _active.value = true;
      } else {
        _active.value = false;
      }
    }
    common_vendor.watch([nowUid, () => props.active], () => {
      if (tmTabbarItemAutoSelect.value) {
        setActive();
      }
    });
    common_vendor.watch(tmTabbarItemActive, () => {
      if (!tmTabbarItemAutoSelect.value) {
        if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
          common_vendor.nextTick(() => {
            _active.value = true;
          });
        } else {
          common_vendor.nextTick(() => {
            _active.value = false;
          });
        }
      }
    });
    common_vendor.watch([() => props.load], () => {
      _load.value = props.load;
    });
    async function itemClick() {
      if (_load.value)
        return;
      if (typeof props.beforeClick === "function") {
        _load.value = true;
        let p = await props.beforeClick(props.data);
        if (typeof p === "function") {
          p = await p(props.data);
        }
        _load.value = false;
        if (!p)
          return;
      }
      emits("click");
      common_vendor.nextTick(() => {
        if (tmTabbarItemAutoSelect.value) {
          if (parent) {
            parent.setNowurl(props.url, uid);
          }
          setActive();
        }
        if (props.url == "")
          return;
        common_vendor.index.$tm.u.routerTo(props.url, props.openType);
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_load.value
      }, !_load.value ? {
        b: common_vendor.p({
          _style: "line-height: 0px;",
          color: common_vendor.unref(_color),
          ["font-size"]: common_vendor.unref(c_font_style).iconSize,
          name: _active.value ? common_vendor.unref(c_font_style).icon : common_vendor.unref(c_font_style).unicon || common_vendor.unref(c_font_style).icon
        })
      } : {}, {
        c: _load.value
      }, _load.value ? {
        d: common_vendor.p({
          spin: true,
          _style: "line-height: 0px;",
          color: common_vendor.unref(_color),
          ["font-size"]: common_vendor.unref(c_font_style).iconSize,
          name: "tmicon-loading"
        })
      } : {}, {
        e: common_vendor.n(_active.value ? "anifun" : ""),
        f: 65 + "px",
        g: common_vendor.p({
          fontSize: 20,
          color: common_vendor.unref(c_font_style).dotColor,
          eventPenetrationEnabled: true,
          dot: props.dot,
          count: props.count,
          icon: props.dotIcon,
          maxCount: props.maxCount
        }),
        h: common_vendor.unref(c_font_style).text !== ""
      }, common_vendor.unref(c_font_style).text !== "" ? {
        i: common_vendor.p({
          color: common_vendor.unref(_color),
          _class: "pb-0",
          ["font-size"]: common_vendor.unref(c_font_style).textSize,
          label: common_vendor.unref(c_font_style).text
        })
      } : {}, {
        j: common_vendor.o(itemClick),
        k: common_vendor.p({
          height: 60,
          width: common_vendor.unref(_width),
          round: 24,
          unit: "px",
          _class: "flex-center flex ",
          parenClass: "relative",
          _style: common_vendor.unref(_styletop),
          followTheme: common_vendor.unref(_btnTop) && props.followTheme,
          transprent: common_vendor.unref(_transprent),
          color: props.color,
          margin: [0, 0],
          padding: common_vendor.unref(_padding),
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          linear: props.linear,
          linearDeep: props.linearDeep
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3a8aa8ef"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabbar-item/tm-tabbar-item.vue"]]);
wx.createComponent(Component);
