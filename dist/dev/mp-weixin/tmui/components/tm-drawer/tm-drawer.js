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
  (tmText + tmIcon + tmTranslate + tmOverlay)();
}
const tmTranslate = () => "../tm-translate/tm-translate.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmOverlay = () => "../tm-overlay/tm-overlay.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-drawer",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    mask: {
      type: [Boolean, String],
      default: true
    },
    placement: {
      type: String,
      default: "bottom"
    },
    show: {
      type: [Boolean],
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 600
    },
    round: {
      type: Number,
      default: 12
    },
    duration: {
      type: Number,
      default: 250
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    closeable: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    title: [String],
    okText: {
      type: [String],
      default: "\u5B8C\u6210"
    },
    okColor: {
      type: [String],
      default: "primary"
    },
    okLoading: {
      type: [Boolean, String],
      default: false
    },
    cancelText: {
      type: [String],
      default: "\u53D6\u6D88"
    },
    hideCancel: {
      type: [Boolean, String],
      default: false
    },
    hideHeader: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 401
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["click", "open", "close", "update:show", "ok", "cancel"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    const drawerANI = common_vendor.ref(null);
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    const customCSSStyle = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedTheme(props, isDark.value, tmcfg.value));
    const syswidth = common_vendor.ref(0);
    const sysheight = common_vendor.ref(0);
    const reverse = common_vendor.ref(true);
    const aniEnd = common_vendor.ref(false);
    const flag = common_vendor.ref(false);
    const timeid = common_vendor.ref(0);
    let timerId = NaN;
    common_vendor.ref("close");
    const drawerStauts = common_vendor.ref("close");
    let _show = common_vendor.ref(props.show);
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
    let sysinfo = common_vendor.index.getSystemInfoSync();
    syswidth.value = sysinfo.windowWidth;
    sysheight.value = sysinfo.windowHeight;
    common_vendor.index.hideKeyboard();
    let nowPage = getCurrentPages().pop();
    for (let i = 0; i < common_vendor.index.$tm.pages.length; i++) {
      if ((nowPage == null ? void 0 : nowPage.route) == common_vendor.index.$tm.pages[i].path && common_vendor.index.$tm.pages[i].custom == "custom") {
        break;
      }
    }
    timeid.value = common_vendor.index.$tm.u.getUid(4);
    if (_show.value) {
      reverse.value = false;
    }
    common_vendor.watch(() => props.show, (val) => {
      _show.value = props.show;
      if (val) {
        opens();
      } else {
        closeFun();
      }
    });
    common_vendor.onMounted(() => opens());
    const ok_loading = common_vendor.computed$1(() => props.okLoading);
    const round_rp = common_vendor.computed$1(() => {
      if (aniname.value == "left")
        return "round-r-" + props.round;
      if (aniname.value == "right")
        return "round-l-" + props.round;
      if (aniname.value == "up")
        return "round-b-" + props.round;
      if (aniname.value == "down")
        return "round-t-" + props.round;
      if (aniname.value == "zoom")
        return "round-" + props.round;
    });
    const reverse_rp = common_vendor.computed$1(() => {
      if (aniname.value != "zoom")
        return reverse.value;
      return !reverse.value;
    });
    const aniname = common_vendor.computed$1(() => {
      if (props.placement == "center")
        return "zoom";
      if (props.placement == "top")
        return "up";
      if (props.placement == "bottom")
        return "down";
      return props.placement;
    });
    const anwidth = common_vendor.computed$1(() => {
      if (aniname.value == "zoom") {
        return props.width + props.unit;
      }
      if (props.placement == "left" || props.placement == "right") {
        return props.width + props.unit;
      }
      return syswidth.value + "px";
    });
    const anheight = common_vendor.computed$1(() => {
      let wucha = 0;
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        return props.height + wucha + props.unit;
      }
      return sysheight.value + "px";
    });
    const contentHeight = common_vendor.computed$1(() => {
      let base_height = props.hideHeader ? 0 : 44;
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        let h = props.height;
        if (props.unit == "rpx") {
          h = common_vendor.index.upx2px(props.height);
        }
        return h - base_height + "px";
      }
      return sysheight.value - base_height + "px";
    });
    const align_rp = common_vendor.computed$1(() => {
      if (aniname.value == "down") {
        return "flex-col-bottom-center";
      }
      if (aniname.value == "up") {
        return "flex-top-custom";
      }
      if (aniname.value == "left") {
        return "flex-row-top-start";
      }
      if (aniname.value == "right") {
        return "flex-row-bottom-start";
      }
      if (aniname.value == "zoom") {
        return "flex-center";
      }
    });
    function ok() {
      if (props.disabled)
        return;
      debounce(() => {
        drawerStauts.value = "close";
        flag.value = true;
        emits("ok");
        closeFun();
      }, props.duration, true);
    }
    function cancel() {
      if (props.disabled)
        return;
      debounce(() => {
        drawerStauts.value = "close";
        flag.value = true;
        emits("cancel");
        closeFun();
      }, props.duration, true);
    }
    function OverLayOpen() {
      common_vendor.nextTick(() => {
        var _a2;
        if (!drawerANI.value)
          return;
        (_a2 = drawerANI.value) == null ? void 0 : _a2.play();
        flag.value = false;
      });
    }
    function opens() {
      if (props.disabled)
        return;
      if (flag.value)
        return;
      debounce(() => {
        flag.value = true;
        aniEnd.value = false;
        reverse.value = true;
        drawerStauts.value = "open";
      }, props.duration, true);
    }
    function open() {
      _show.value = true;
      if (props.disabled)
        return;
      if (flag.value)
        return;
      aniEnd.value = false;
      reverse.value = reverse.value === false ? true : false;
    }
    function animationClose() {
      aniEnd.value = true;
      if (drawerStauts.value == "open") {
        emits("open");
        flag.value = false;
      } else if (drawerStauts.value == "close") {
        emits("close");
        emits("update:show", false);
        _show.value = false;
        flag.value = false;
      }
      drawerStauts.value = "";
    }
    common_vendor.index.$tm.u.getUid(1);
    function close() {
      if (props.disabled)
        return;
      if (flag.value)
        return;
      drawerStauts.value = "close";
      flag.value = true;
      debounce(() => {
        emits("cancel");
        closeFun();
      }, props.duration, true);
    }
    function clickClose(e) {
      if (props.disabled || drawerStauts.value == "open")
        return;
      emits("click", e);
      if (!props.overlayClick)
        return;
      debounce(() => {
        drawerStauts.value = "close";
        flag.value = true;
        emits("cancel");
        closeFun();
      }, props.duration, true);
    }
    function closeFun() {
      if (props.disabled)
        return;
      reverse.value = false;
      if (!drawerANI.value)
        return;
      common_vendor.nextTick(function() {
        var _a2;
        (_a2 = drawerANI.value) == null ? void 0 : _a2.play();
      });
    }
    expose({ close, open });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_show)
      }, common_vendor.unref(_show) ? common_vendor.e({
        b: !props.closeable && !props.hideHeader
      }, !props.closeable && !props.hideHeader ? common_vendor.e({
        c: !props.hideCancel
      }, !props.hideCancel ? {
        d: common_vendor.o(cancel),
        e: common_vendor.p({
          label: props.cancelText
        })
      } : {}, {
        f: common_vendor.p({
          _class: "text-overflow-1 opacity-7",
          label: props.title
        }),
        g: !common_vendor.unref(ok_loading)
      }, !common_vendor.unref(ok_loading) ? {
        h: common_vendor.o(ok),
        i: common_vendor.p({
          color: __props.okColor,
          dark: props.dark,
          label: props.okText
        })
      } : {}, {
        j: common_vendor.unref(ok_loading)
      }, common_vendor.unref(ok_loading) ? {
        k: common_vendor.p({
          color: __props.okColor,
          spin: common_vendor.unref(ok_loading),
          dark: common_vendor.unref(isDark),
          _class: common_vendor.unref(isDark) !== true ? "opacity-4" : "",
          fontSize: 34,
          name: common_vendor.unref(ok_loading) ? "tmicon-jiazai_dan" : "tmicon-times-circle-fill"
        })
      } : {}) : {}, {
        l: props.closeable && !props.hideHeader
      }, props.closeable && !props.hideHeader ? {
        m: common_vendor.p({
          _class: "text-overflow-1 opacity-7",
          dark: props.dark,
          label: props.title
        }),
        n: common_vendor.o(cancel),
        o: common_vendor.p({
          dark: props.dark,
          _class: common_vendor.unref(isDark) !== true ? "opacity-3" : "",
          fontSize: 36,
          name: "tmicon-times-circle-fill"
        })
      } : {}, {
        p: common_vendor.s({
          height: common_vendor.unref(contentHeight)
        }),
        q: common_vendor.o(($event) => $event.stopPropagation()),
        r: common_vendor.s({
          width: common_vendor.unref(anwidth),
          height: common_vendor.unref(anheight)
        }),
        s: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).borderCss : ""),
        t: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).backgroundColorCss : ""),
        v: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).shadowColor : ""),
        w: common_vendor.s(common_vendor.unref(customCSSStyle)),
        x: common_vendor.n(common_vendor.unref(round_rp)),
        y: common_vendor.n(common_vendor.unref(customClass)),
        z: common_vendor.sr(drawerANI, "41bc5e8a-1,41bc5e8a-0", {
          "k": "drawerANI"
        }),
        A: common_vendor.o(animationClose),
        B: common_vendor.p({
          reverse: common_vendor.unref(reverse_rp),
          width: common_vendor.unref(anwidth),
          height: common_vendor.unref(anheight),
          ["auto-play"]: false,
          name: common_vendor.unref(aniname),
          duration: props.duration
        }),
        C: common_vendor.o(OverLayOpen),
        D: common_vendor.o(clickClose),
        E: common_vendor.o(($event) => common_vendor.isRef(_show) ? _show.value = $event : _show = $event),
        F: common_vendor.p({
          duration: 25,
          zIndex: props.zIndex,
          transprent: !props.mask,
          align: common_vendor.unref(align_rp),
          overlayClick: false,
          show: common_vendor.unref(_show)
        })
      }) : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-41bc5e8a"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-drawer/tm-drawer.vue"]]);
wx.createComponent(Component);
