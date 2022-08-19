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
  (tmIcon + tmText + tmBadge + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmBadge = () => "../tm-badge/tm-badge.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-tabs",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    list: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    itemHeight: {
      type: Number,
      default: 80
    },
    height: {
      type: Number,
      default: 1e3
    },
    gutter: {
      type: Number,
      default: 0
    },
    defaultName: {
      type: [String, Number],
      default: ""
    },
    activeName: {
      type: [String, Number],
      default: ""
    },
    tabPos: {
      type: String,
      default: "top"
    },
    itemWidth: {
      type: Number,
      default: 0
    },
    activeColor: {
      type: String,
      default: "primary"
    },
    activeFontColor: {
      type: String,
      default: "primary"
    },
    activeFontSize: {
      type: Number,
      default: 28
    },
    itemModel: {
      type: String,
      default: "text"
    },
    unSelectedColor: {
      type: String,
      default: ""
    },
    itemFontSize: {
      type: Number,
      default: 28
    },
    itemLinear: {
      type: String,
      default: ""
    },
    itemLinearDeep: {
      type: String,
      default: "light"
    },
    itemRound: {
      type: Number,
      default: 0
    },
    align: {
      type: String,
      default: "left"
    },
    swiper: {
      type: Boolean,
      default: false
    },
    showTabsLineAni: {
      type: Boolean,
      default: false
    },
    tabsLineAniColor: {
      type: String,
      default: "primary"
    }
  }),
  emits: ["update:activeName", "change", "click"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    common_vendor.ref(null);
    const _align = common_vendor.computed$1(() => {
      let align_list = {
        right: "flex-row-center-end",
        left: "flex-row-center-start",
        center: "flex-row-center-center",
        around: "flex-around"
      };
      let key = "center";
      if (align_list.hasOwnProperty(props.align)) {
        key = props.align;
      }
      return align_list[key];
    });
    const _active = common_vendor.ref(props.defaultName);
    emits("update:activeName", _active.value);
    const cstomClass = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedClass(props));
    const _scrollToId = common_vendor.ref("");
    const modelStyle = common_vendor.computed$1(() => {
      if (props.itemModel == "text") {
        return {
          transprent: true,
          border: 0,
          text: false
        };
      } else if (props.itemModel == "line") {
        return {
          transprent: true,
          border: 4,
          text: false
        };
      } else if (props.itemModel == "textLight") {
        return {
          transprent: false,
          border: 4,
          text: true
        };
      } else if (props.itemModel == "card") {
        return {
          transprent: false,
          border: 0,
          text: false
        };
      }
      return {
        transprent: true,
        border: 0,
        text: false
      };
    });
    const tmTabsId = "tmTabsId";
    const _tabPos = common_vendor.computed$1(() => props.tabPos);
    const cacheTabs = common_vendor.ref([]);
    const isDulitabs = common_vendor.computed$1(() => props.list.length > 0);
    const tabsid = "tabs_id_" + common_vendor.index.$tm.u.getUid(1) + "_";
    const isNvue = common_vendor.ref(false);
    Math.ceil(common_vendor.index.upx2px(props.itemHeight));
    const totalWidth = common_vendor.computed$1(() => common_vendor.index.upx2px(cacheTabs.value.length * props.width));
    const _itemwidth = Math.ceil(common_vendor.index.upx2px(props.itemWidth + 40));
    const _sliderBarwidth = Math.ceil(common_vendor.index.upx2px(40));
    const _width = Math.ceil(common_vendor.index.upx2px(props.width));
    const contentWidth = common_vendor.computed$1(() => {
      let width = (props.itemWidth + 40) * cacheTabs.value.length;
      if (width <= props.width) {
        width = props.width;
      }
      return width;
    });
    common_vendor.computed$1(() => {
      let width = _itemwidth * cacheTabs.value.length;
      if (width <= props.width) {
        width = common_vendor.index.upx2px(props.width);
      }
      return Math.ceil(width);
    });
    const anitLineLeft = common_vendor.ref(0);
    let timerId = NaN;
    let timerId2 = NaN;
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
    function debounce2(func, wait = 500, immediate = false) {
      if (!isNaN(timerId2))
        clearTimeout(timerId2);
      if (immediate) {
        var callNow = !timerId2;
        timerId2 = setTimeout(() => {
          timerId2 = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId2 = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
    const _startx = common_vendor.ref(0);
    const _starty = common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    const _x = common_vendor.ref(0);
    const _y = common_vendor.ref(0);
    const directoStyle = common_vendor.ref("");
    const isEndMove = common_vendor.ref(true);
    const maxLen = 40;
    const activeIndex = common_vendor.computed$1(() => cacheTabs.value.findIndex((el) => el.key == _active.value));
    let ctxLeft = 0;
    let ctxTop = 0;
    let timeDetail = 1;
    let isMoveEnb = false;
    let dirType = common_vendor.ref("none");
    let isDrag = common_vendor.ref(false);
    let sliderBarWidth = common_vendor.index.upx2px(40);
    let widthDrag = common_vendor.ref(sliderBarWidth);
    common_vendor.watchEffect(() => {
      cacheTabs.value = [];
      props.list.forEach((el, index) => {
        var _a2, _b2, _c, _d, _e, _f;
        cacheTabs.value.push({
          key: (_a2 = el == null ? void 0 : el.key) != null ? _a2 : String(index),
          title: (_b2 = el == null ? void 0 : el.title) != null ? _b2 : String(index),
          icon: (_c = el == null ? void 0 : el.icon) != null ? _c : "",
          dot: (_d = el == null ? void 0 : el.dot) != null ? _d : false,
          count: (_e = el == null ? void 0 : el.count) != null ? _e : "",
          dotColor: (_f = el == null ? void 0 : el.dotColor) != null ? _f : "red"
        });
      });
    });
    function setTabsBarLineLeft(key = "") {
      if (!props.showTabsLineAni)
        return;
      let keybl = key || _active.value;
      let index = cacheTabs.value.findIndex((el) => el.key == keybl);
      if (index > -1) {
        let leftPx = _itemwidth * index + (_itemwidth - _sliderBarwidth) / 2;
        if (props.align == "center") {
          leftPx = leftPx + (_width - _itemwidth * cacheTabs.value.length) / 2 - 1;
        }
        anitLineLeft.value = Math.ceil(leftPx);
      }
    }
    function unbindKey(key) {
      let index = cacheTabs.value.findIndex((el) => el.key == key);
      if (index > -1) {
        cacheTabs.value.splice(index, 1);
      }
      let index2 = cacheTabs.value.findIndex((el) => el.key == _active.value);
      if (index2 == -1 && cacheTabs.value.length > 0) {
        changeKey(cacheTabs.value[0].key, false);
      } else if (cacheTabs.value.length == 0) {
        changeKey("", false);
      }
    }
    common_vendor.watch(() => props.activeName, () => {
      if (props.activeName == _active.value)
        return;
      changeKey(props.activeName, false);
    });
    common_vendor.onMounted(() => {
      setTimeout(() => {
        _scrollToId.value = tabsid + _active.value;
        common_vendor.nextTick(() => {
          setTabsBarLineLeft(props.defaultName);
        });
      }, 300);
    });
    common_vendor.watchEffect(() => {
      directoStyle.value = String(Math.ceil(common_vendor.index.upx2px(-activeIndex.value * props.width)));
      spinNvueAniEnd(0, -common_vendor.index.upx2px(activeIndex.value * props.width), timeDetail);
    });
    common_vendor.watch(() => _active.value, () => {
      common_vendor.nextTick(() => {
        var _a2, _b2;
        let index = cacheTabs.value.findIndex((el) => el.key == _active.value);
        if (index > -1) {
          if (typeof cacheTabs.value[index - 2] !== "undefined") {
            _scrollToId.value = tabsid + ((_a2 = cacheTabs.value[index - 2]) == null ? void 0 : _a2.key);
          } else {
            _scrollToId.value = tabsid + ((_b2 = cacheTabs.value[0]) == null ? void 0 : _b2.key);
          }
        } else {
          _scrollToId.value = tabsid + _active.value;
        }
        setTabsBarLineLeft();
      });
    });
    function onStart(event) {
      if (!props.swiper)
        return;
      isEndMove.value = true;
      isMoveEnb = true;
      isDrag.value = true;
      if (event == null ? void 0 : event.preventDefault)
        event == null ? void 0 : event.preventDefault();
      if (event == null ? void 0 : event.stopPropagation)
        event == null ? void 0 : event.stopPropagation();
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        if (typeof (touch == null ? void 0 : touch.pageX) !== "undefined") {
          _startx.value = touch.pageX - ctxLeft;
          _starty.value = touch.pageY - ctxTop;
        } else {
          _startx.value = touch.x;
          _starty.value = touch.y;
        }
      } else {
        _startx.value = event.pageX - event.currentTarget.offsetLeft - ctxLeft;
        _starty.value = event.pageY - event.currentTarget.offsetTop - ctxTop;
      }
    }
    function onMove(event) {
      if (!props.swiper || isMoveEnb == false)
        return;
      if (event == null ? void 0 : event.preventDefault)
        event == null ? void 0 : event.preventDefault();
      if (event == null ? void 0 : event.stopPropagation)
        event == null ? void 0 : event.stopPropagation();
      let nowx = 0;
      let nowy = 0;
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        if (typeof (touch == null ? void 0 : touch.pageX) !== "undefined") {
          nowx = touch.pageX - ctxLeft;
          nowy = touch.pageY - ctxTop;
        } else {
          nowx = touch.x;
          nowy = touch.y;
        }
      } else {
        nowx = event.pageX - event.currentTarget.offsetLeft - ctxLeft;
        nowy = event.pageY - event.currentTarget.offsetTop - ctxTop;
      }
      _x.value = nowx - _startx.value;
      _y.value = nowy - _starty.value;
      setDirXy(_x.value, _y.value);
    }
    function onEnd(event) {
      if (!props.swiper || !isMoveEnb)
        return;
      isEndMove.value = false;
      debounce2(() => {
        setDirXy(_x.value, _y.value, true);
        isDrag.value = false;
      }, 250, true);
      isMoveEnb = false;
    }
    function setDirXy(x, y, isEnd = false) {
      activeIndex.value;
      let nowLeft = common_vendor.index.upx2px(activeIndex.value * props.width);
      debounce(() => {
        if (x > 0 && Math.abs(x) > Math.abs(y)) {
          dirType.value = "right";
        } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
          dirType.value = "left";
        } else if (y > 0 && Math.abs(y) > Math.abs(x)) {
          dirType.value = "down";
        } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
          dirType.value = "up";
        } else {
          dirType.value = "none";
        }
      }, 300, true);
      if (dirType.value == "right") {
        if (activeIndex.value == 0)
          return;
        directoStyle.value = x - nowLeft;
        let sx = Math.abs(_x.value) * 1.0002;
        sx = sx <= sliderBarWidth ? sliderBarWidth : sx;
        sx = sx >= sliderBarWidth * 2 ? sliderBarWidth * 2 : sx;
        widthDrag.value = sx;
        if (isEnd) {
          setRightDirRight();
          widthDrag.value = sliderBarWidth;
        }
      } else if (dirType.value == "left") {
        if (activeIndex.value == cacheTabs.value.length - 1)
          return;
        directoStyle.value = x - nowLeft;
        let sx = Math.abs(_x.value) * 1.0002;
        sx = sx <= sliderBarWidth ? sliderBarWidth : sx;
        sx = sx >= sliderBarWidth * 2 ? sliderBarWidth * 2 : sx;
        widthDrag.value = sx;
        if (isEnd) {
          setLeftDirLeft();
          widthDrag.value = sliderBarWidth;
        }
      } else if (dirType.value == "down")
        ;
      function setRightDirRight() {
        if (x < maxLen || activeIndex.value <= 0) {
          directoStyle.value = -nowLeft;
        } else {
          _active.value = cacheTabs.value[activeIndex.value - 1].key;
        }
      }
      function setLeftDirLeft() {
        if (Math.abs(x) < maxLen || activeIndex.value >= cacheTabs.value.length - 1) {
          directoStyle.value = -nowLeft;
        } else {
          _active.value = cacheTabs.value[activeIndex.value + 1].key;
        }
      }
    }
    common_vendor.onUnmounted(() => {
    });
    function spinNvueAniEnd(start, end, time = timeDetail) {
      if (!props.swiper)
        return;
    }
    function pushKey(o) {
      let index = cacheTabs.value.findIndex((el) => el.key === o.key);
      if (index > -1) {
        cacheTabs.value.splice(index, 1, __spreadValues(__spreadValues({}, cacheTabs.value[0]), o));
      } else {
        cacheTabs.value.push(o);
      }
      if (_active.value == "") {
        changeKey(cacheTabs.value[0].key, false);
      }
    }
    function changeKey(key, isclick = true) {
      isEndMove.value = true;
      _active.value = key;
      timeDetail = 1;
      emits("update:activeName", common_vendor.toRaw(_active.value));
      emits("change", key);
      if (isclick) {
        emits("click", key);
      }
    }
    function setTitle(o) {
      let index = cacheTabs.value.findIndex((el) => el.key == o.key);
      if (index > -1) {
        cacheTabs.value.splice(index, 1, o);
      }
    }
    common_vendor.provide("tabsActiveName", common_vendor.computed$1(() => _active.value));
    common_vendor.provide("tabsActiveCacheTabse", common_vendor.computed$1(() => cacheTabs.value));
    common_vendor.provide("tabsWidth", common_vendor.computed$1(() => props.width));
    common_vendor.provide("tabsheight", common_vendor.computed$1(() => {
      if (!props.height)
        return 0;
      return props.height - props.itemHeight - props.gutter;
    }));
    common_vendor.provide("tabsSwiper", common_vendor.computed$1(() => props.swiper));
    expose({
      pushKey,
      changeKey,
      unbindKey,
      setTitle,
      tmTabsId
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_tabPos) == "bottom" && common_vendor.unref(isDulitabs) == false
      }, common_vendor.unref(_tabPos) == "bottom" && common_vendor.unref(isDulitabs) == false ? {
        b: common_vendor.o(onMove),
        c: common_vendor.o(onEnd),
        d: common_vendor.o(onStart),
        e: common_vendor.o(onMove),
        f: common_vendor.o(onEnd),
        g: common_vendor.o(onEnd),
        h: common_vendor.o(onStart),
        i: props.swiper ? `${common_vendor.unref(totalWidth)}px` : `${props.width}rpx`,
        j: props.swiper ? `translateX(${directoStyle.value}px)` : `translateX(0px)`,
        k: common_vendor.n(!isEndMove.value || isNvue.value ? "tmTabsPane" : "")
      } : {}, {
        l: common_vendor.f(cacheTabs.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.icon
          }, item.icon ? {
            b: "07988156-2-" + i0 + "," + ("07988156-1-" + i0),
            c: common_vendor.p({
              userInteractionEnabled: false,
              _class: "pr-5",
              color: item.key == _active.value ? props.activeFontColor : props.unSelectedColor,
              ["font-size"]: item.key == _active.value ? props.activeFontSize : props.itemFontSize,
              name: item.icon
            })
          } : {}, {
            d: "07988156-3-" + i0 + "," + ("07988156-1-" + i0),
            e: common_vendor.p({
              userInteractionEnabled: false,
              ["font-size"]: item.key == _active.value ? props.activeFontSize : props.itemFontSize,
              _class: item.key == _active.value ? "text-weight-b" : "",
              color: item.key == _active.value ? props.activeFontColor : props.unSelectedColor,
              label: item.title
            }),
            f: item.dot && !item.count
          }, item.dot && !item.count ? {
            g: `${props.itemHeight / 2}rpx`,
            h: "07988156-4-" + i0 + "," + ("07988156-1-" + i0),
            i: common_vendor.p({
              dot: true,
              color: item.dotColor
            })
          } : {}, {
            j: item.count && !item.dot
          }, item.count && !item.dot ? {
            k: `${props.itemHeight - 20}rpx`,
            l: "07988156-5-" + i0 + "," + ("07988156-1-" + i0),
            m: common_vendor.p({
              count: item.count,
              color: item.dotColor
            })
          } : {}, {
            n: common_vendor.o(($event) => changeKey(item.key)),
            o: "07988156-1-" + i0 + ",07988156-0",
            p: common_vendor.p({
              round: props.itemRound,
              linear: props.itemLinear,
              linearDeep: props.itemLinearDeep,
              borderDirection: "bottom",
              text: item.key == _active.value ? common_vendor.unref(modelStyle).text : false,
              border: item.key == _active.value ? common_vendor.unref(modelStyle).border : 0,
              transprent: item.key == _active.value ? common_vendor.unref(modelStyle).transprent : true,
              color: props.activeColor && item.key == _active.value ? props.activeColor : props.color,
              width: props.itemWidth,
              _class: "flex-col flex-col-center-center",
              margin: [0, 0],
              padding: [20, 0],
              height: props.itemHeight
            }),
            q: tabsid + item.key,
            r: index
          });
        }),
        m: common_vendor.s(props.itemWidth > 0 ? {
          width: props.itemWidth + "rpx"
        } : {}),
        n: common_vendor.n(common_vendor.unref(_align)),
        o: common_vendor.s({
          height: `${props.itemHeight + 4}rpx`
        }),
        p: props.showTabsLineAni && props.itemWidth > 0
      }, props.showTabsLineAni && props.itemWidth > 0 ? {
        q: `${common_vendor.unref(contentWidth)}rpx`,
        r: `${props.itemHeight}rpx`,
        s: props.showTabsLineAni ? common_vendor.unref(store).tmStore.dark ? "#616161" : "#ebebeb" : ""
      } : {}, {
        t: props.showTabsLineAni && props.itemWidth > 0
      }, props.showTabsLineAni && props.itemWidth > 0 ? {
        v: common_vendor.p({
          ["follow-dark"]: false,
          color: props.tabsLineAniColor,
          width: 40,
          height: 8,
          margin: [0, 0],
          padding: [0, 0]
        }),
        w: `translateX(${anitLineLeft.value}px)`,
        x: `${props.itemHeight - 2}rpx`
      } : {}, {
        y: common_vendor.s({
          width: `${props.width}rpx`,
          height: `${props.itemHeight + 4}rpx`
        }),
        z: _scrollToId.value,
        A: common_vendor.p({
          transprent: props.transprent,
          color: props.color,
          followTheme: props.followTheme,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          linear: props.linear,
          linearDeep: props.linearDeep,
          margin: [0, 0],
          padding: [0, 0],
          height: props.itemHeight + common_vendor.unref(modelStyle).border + props.gutter + 4,
          _class: ["flex-center flex-row nonvue", common_vendor.unref(cstomClass)],
          _style: props._style,
          width: props.width
        }),
        B: common_vendor.unref(_tabPos) == "top" && common_vendor.unref(isDulitabs) == false
      }, common_vendor.unref(_tabPos) == "top" && common_vendor.unref(isDulitabs) == false ? {
        C: common_vendor.o(onMove),
        D: common_vendor.o(onEnd),
        E: common_vendor.o(onStart),
        F: common_vendor.o(onEnd),
        G: common_vendor.o(onMove),
        H: common_vendor.o(onEnd),
        I: common_vendor.o(onEnd),
        J: common_vendor.o(onStart),
        K: props.swiper ? `${common_vendor.unref(totalWidth)}px` : `${props.width}rpx`,
        L: props.swiper ? `translateX(${directoStyle.value}px)` : `translateX(0px)`,
        M: common_vendor.n(!isEndMove.value || isNvue.value ? "tmTabsPane" : "")
      } : {}, {
        N: common_vendor.s(props.height && common_vendor.unref(isDulitabs) == false ? {
          height: __props.height + "rpx"
        } : ""),
        O: common_vendor.s({
          width: props.width + "rpx"
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07988156"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabs/tm-tabs.vue"]]);
wx.createComponent(Component);
