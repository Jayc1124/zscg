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
var tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
var tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
var router_index = require("../../../router/index.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-app",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    theme: {
      type: String,
      default: "grey-5"
    },
    bgImg: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "grey-4"
    },
    darkColor: {
      type: String,
      default: "#050505"
    },
    blur: {
      type: [Boolean, String],
      default: false
    },
    navbar: {
      type: Object,
      default: () => {
        return {
          background: "#ffffff",
          fontColor: "#000000"
        };
      }
    },
    showMenu: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["update:showMenu"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b, _c, _d;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let pages = getCurrentPages().pop();
    common_vendor.nextTick(() => {
      var _a2;
      router_index.useTmRouterBefore({
        path: (_a2 = pages == null ? void 0 : pages.route) != null ? _a2 : "",
        context: proxy
      });
    });
    common_vendor.onLoad((opts) => {
      var _a2;
      router_index.useTmRouterAfter({
        path: (_a2 = pages == null ? void 0 : pages.route) != null ? _a2 : "",
        opts,
        context: proxy
      });
    });
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    const isSetThemeOk = common_vendor.ref(false);
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedTheme(props, isDark.value, tmcfg.value));
    const _showMenu = common_vendor.ref(props.showMenu);
    const sysinfo = common_vendor.index.getSystemInfoSync();
    const view_width = common_vendor.ref(sysinfo.windowWidth);
    let view_height = common_vendor.ref(sysinfo.windowHeight);
    let nowPage = getCurrentPages().pop();
    let isCustomHeader = false;
    for (let i = 0; i < common_vendor.index.$tm.pages.length; i++) {
      if ((nowPage == null ? void 0 : nowPage.route) == common_vendor.index.$tm.pages[i].path && common_vendor.index.$tm.pages[i].custom == "custom") {
        isCustomHeader = true;
        break;
      }
    }
    let isTabbarPage = false;
    let barLit = (_d = (_c = common_vendor.index.$tm.tabBar) == null ? void 0 : _c.list) != null ? _d : [];
    for (let i = 0; i < barLit.length; i++) {
      if ((nowPage == null ? void 0 : nowPage.route) == barLit[i].pagePath) {
        isTabbarPage = true;
        break;
      }
    }
    const _blurEffect = common_vendor.computed$1(() => {
      if (props.blur === true && isDark.value)
        return "dark";
      if (props.blur === true && !isDark.value)
        return "extralight";
      return "none";
    });
    let appConfig = common_vendor.ref({
      width: view_width,
      height: view_height,
      theme: tmcomputed.value.backgroundColor,
      bgImg: props.bgImg,
      dark: isDark.value
    });
    function setAppStyle() {
      if (isDark.value) {
        appConfig.value.theme = props.darkColor;
      } else {
        appConfig.value.theme = tmcomputed.value.backgroundColor;
      }
      common_vendor.index.setBackgroundColor({
        backgroundColor: appConfig.value.theme,
        backgroundColorBottom: appConfig.value.theme,
        backgroundColorTop: appConfig.value.theme
      });
      if (isDark.value) {
        if (!isCustomHeader) {
          common_vendor.index.setNavigationBarColor({
            backgroundColor: appConfig.value.theme,
            frontColor: "#ffffff"
          });
        }
        if (isTabbarPage) {
          common_vendor.index.setTabBarStyle({
            backgroundColor: "#000000",
            borderStyle: "#1a1a1a",
            color: "#ffffff",
            selectedColor: common_vendor.index.$tm.tabBar.selectedColor || tmcomputed.value.textColor
          });
        }
      } else {
        if (!isCustomHeader) {
          common_vendor.index.setNavigationBarColor({
            backgroundColor: props.navbar.background,
            frontColor: props.navbar.fontColor
          });
        }
        if (isTabbarPage) {
          common_vendor.index.setTabBarStyle({
            backgroundColor: common_vendor.index.$tm.tabBar.backgroundColor || props.navbar.background,
            borderStyle: common_vendor.index.$tm.tabBar.borderStyle || "#888888",
            color: common_vendor.index.$tm.tabBar.color || props.navbar.fontColor,
            selectedColor: common_vendor.index.$tm.tabBar.selectedColor || tmcomputed.value.textColor
          });
        }
      }
      isSetThemeOk.value = true;
    }
    common_vendor.provide("appTextColor", common_vendor.computed$1(() => tmcomputed.value.textColor));
    common_vendor.provide("custom_space_size", [0, 0]);
    function setTheme(colorName) {
      store.setTmVuetifyTheme(colorName);
    }
    function setDark(dark) {
      let maindark = !isDark.value;
      if (typeof dark !== "undefined" && typeof dark == "boolean") {
        maindark = dark;
      }
      appConfig.value.dark = maindark;
      store.setTmVuetifyDark(maindark);
    }
    expose({
      setTheme,
      setDark
    });
    common_vendor.onBeforeMount(() => setAppStyle());
    common_vendor.watch(() => props.showMenu, () => {
      _showMenu.value = props.showMenu;
    });
    common_vendor.watch([() => tmcfg.value.color, isDark], () => {
      isSetThemeOk.value = false;
      setAppStyle();
    });
    function toogleOpen(type) {
      _showMenu.value = type;
      emits("update:showMenu", _showMenu.value);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(__props.blur ? "blur" : ""),
        b: common_vendor.s({
          zIndex: 1,
          width: common_vendor.unref(appConfig).width + "px",
          minHeight: common_vendor.unref(appConfig).height + "px"
        }),
        c: common_vendor.s(__props.blur ? {
          backgroundColor: common_vendor.unref(isDark) ? "rgba(0,0,0,0.3)" : "rgba(248, 248, 248, 0.7)"
        } : ""),
        d: common_vendor.r("menu", {
          sys: {
            width: common_vendor.unref(appConfig).width * 0.7,
            height: common_vendor.unref(appConfig).height,
            statusBarHeight: common_vendor.unref(sysinfo).statusBarHeight
          }
        }),
        e: common_vendor.o(() => {
        }),
        f: common_vendor.unref(appConfig).width * 0.7 + "px",
        g: common_vendor.unref(appConfig).height + "px",
        h: common_vendor.unref(appConfig).width * 0.7 + "px",
        i: common_vendor.unref(appConfig).height + "px",
        j: common_vendor.unref(_blurEffect),
        k: common_vendor.o(($event) => toogleOpen(false)),
        l: common_vendor.n(_showMenu.value ? "menuOn" : ""),
        m: common_vendor.unref(appConfig).width + "px",
        n: common_vendor.unref(appConfig).height + "px",
        o: common_vendor.s(common_vendor.unref(appConfig).theme ? {
          background: common_vendor.unref(appConfig).theme
        } : ""),
        p: common_vendor.s({
          width: common_vendor.unref(appConfig).width + "px",
          minHeight: common_vendor.unref(appConfig).height + "px"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a00065e2"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-app/tm-app.vue"]]);
wx.createComponent(Component);
