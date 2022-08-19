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
import { c as custom_props, u as useTmpiniaStore, r as requireNativePlugin, g as computedClass, _ as __easycom_3$1, t as tmIcon, i as __easycom_0, b as computedDark, e as computedStyle, h as tmTranslate, f as formatAppLog, j as resolveEasycom, l as __easycom_1$1, a as __easycom_4, k as __easycom_8 } from "../../tm-divider.js";
import { t as tmBadge, T as TabBar, r as request, a as __easycom_0$1, _ as __easycom_7 } from "../../request.js";
import { defineComponent, getCurrentInstance, ref, computed, watchEffect, watch, onMounted, nextTick, onUnmounted, toRaw, provide, openBlock, createElementBlock, normalizeStyle, unref, createCommentVNode, renderSlot, createVNode, withCtx, normalizeClass, Fragment, renderList, createElementVNode, createBlock, withModifiers, resolveDynamicComponent, toDisplayString, resolveComponent } from "vue";
import { _ as _export_sfc } from "../../plugin-vue_export-helper.js";
import { _ as __easycom_6 } from "../../tm-result.js";
import "pinia";
var _style_0$2 = { "tmTabsPane": { "": { "transitionDelay": 0, "transitionTimingFunction": "ease", "transitionProperty": "transform", "transitionDuration": 300 } }, "anilineBar": { "": { "transitionDelay": 0, "transitionTimingFunction": "ease", "transitionProperty": "transform,width", "transitionDuration": 300 } }, "@TRANSITION": { "tmTabsPane": { "delay": 0, "timingFunction": "ease", "property": "transform", "duration": 300 }, "anilineBar": { "delay": 0, "timingFunction": "ease", "property": "transform,width", "duration": 300 } } };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "tm-tabs",
  props: __spreadProps(__spreadValues({}, custom_props), {
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
    const store = useTmpiniaStore();
    var dom = weex.requireModule("dom");
    const Binding = requireNativePlugin("bindingx");
    const animation = requireNativePlugin("animation");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const bindxToken = ref(null);
    const _align = computed(() => {
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
    const _active = ref(props.defaultName);
    emits("update:activeName", _active.value);
    const cstomClass = computed(() => computedClass(props));
    const _scrollToId = ref("");
    const modelStyle = computed(() => {
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
    const _tabPos = computed(() => props.tabPos);
    const cacheTabs = ref([]);
    const isDulitabs = computed(() => props.list.length > 0);
    const tabsid = "tabs_id_" + uni.$tm.u.getUid(1) + "_";
    const isNvue = ref(false);
    const _itemheight = Math.ceil(uni.upx2px(props.itemHeight));
    const totalWidth = computed(() => uni.upx2px(cacheTabs.value.length * props.width));
    const _itemwidth = Math.ceil(uni.upx2px(props.itemWidth + 40));
    const _sliderBarwidth = Math.ceil(uni.upx2px(40));
    const _width = Math.ceil(uni.upx2px(props.width));
    const contentWidth = computed(() => {
      let width = (props.itemWidth + 40) * cacheTabs.value.length;
      if (width <= props.width) {
        width = props.width;
      }
      return width;
    });
    computed(() => {
      let width = _itemwidth * cacheTabs.value.length;
      if (width <= props.width) {
        width = uni.upx2px(props.width);
      }
      return Math.ceil(width);
    });
    const anitLineLeft = ref(0);
    isNvue.value = true;
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
    const _startx = ref(0);
    const _starty = ref(0);
    ref(0);
    ref(0);
    const _x = ref(0);
    const _y = ref(0);
    const directoStyle = ref("");
    const isEndMove = ref(true);
    const maxLen = 40;
    const activeIndex = computed(() => cacheTabs.value.findIndex((el) => el.key == _active.value));
    let ctxLeft = 0;
    let ctxTop = 0;
    let timeDetail = 1;
    let isMoveEnb = false;
    let dirType = ref("none");
    let isDrag = ref(false);
    let sliderBarWidth = uni.upx2px(40);
    let widthDrag = ref(sliderBarWidth);
    watchEffect(() => {
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
    watch(() => props.activeName, () => {
      if (props.activeName == _active.value)
        return;
      changeKey(props.activeName, false);
    });
    onMounted(() => {
      setTimeout(() => {
        _scrollToId.value = tabsid + _active.value;
        nextTick(() => {
          dom.getComponentRect(proxy.$refs.tabsDom, function(res) {
            if (res == null ? void 0 : res.size) {
              ctxLeft = Math.floor(res.size.left);
              ctxTop = Math.floor(res.size.top);
              spinNvueAniEnd(0, -uni.upx2px(activeIndex.value * props.width), 1);
            }
          });
          setTabsBarLineLeft(props.defaultName);
        });
      }, 300);
    });
    watchEffect(() => {
      directoStyle.value = String(Math.ceil(uni.upx2px(-activeIndex.value * props.width)));
      spinNvueAniEnd(0, -uni.upx2px(activeIndex.value * props.width), timeDetail);
    });
    watch(() => _active.value, () => {
      nextTick(() => {
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
      const oldindex = activeIndex.value;
      let nowLeft = uni.upx2px(activeIndex.value * props.width);
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
        spinNvueAniEnd(-nowLeft, x, 0);
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
        spinNvueAniEnd(-nowLeft, x, 0);
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
        nextTick(() => {
          if (oldindex == activeIndex.value) {
            uni.$tm.u.debounce(() => {
              timeDetail = 250;
              spinNvueAniEnd(-nowLeft - x, x, 250);
              nextTick(() => {
                _x.value = 0;
                _y.value = 0;
              });
            }, 50, true);
          } else {
            timeDetail = 250;
            nextTick(() => {
              _x.value = 0;
              _y.value = 0;
            });
          }
        });
      }
      function setLeftDirLeft() {
        if (Math.abs(x) < maxLen || activeIndex.value >= cacheTabs.value.length - 1) {
          directoStyle.value = -nowLeft;
        } else {
          _active.value = cacheTabs.value[activeIndex.value + 1].key;
        }
        nextTick(() => {
          if (oldindex == activeIndex.value) {
            uni.$tm.u.debounce(() => {
              timeDetail = 250;
              spinNvueAniEnd(-nowLeft - x, x, 250);
              nextTick(() => {
                _x.value = 0;
                _y.value = 0;
              });
            }, 50, true);
          } else {
            timeDetail = 250;
            nextTick(() => {
              _x.value = 0;
              _y.value = 0;
            });
          }
        });
      }
    }
    onUnmounted(() => {
      if (bindxToken.value) {
        Binding.unbind({
          token: bindxToken.value,
          eventType: "timing"
        });
      }
    });
    function spinNvueAniEnd(start, end, time = timeDetail) {
      var _a2;
      if (!props.swiper)
        return;
      if (!((_a2 = proxy.$refs) == null ? void 0 : _a2.tabsDom))
        return;
      animation.transition(proxy.$refs.tabsDom, {
        styles: {
          transform: `translateX(${start + end}px)`,
          transformOrigin: "center center"
        },
        duration: time,
        timingFunction: "linear",
        delay: 50
      }, () => {
      });
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
      emits("update:activeName", toRaw(_active.value));
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
    provide("tabsActiveName", computed(() => _active.value));
    provide("tabsActiveCacheTabse", computed(() => cacheTabs.value));
    provide("tabsWidth", computed(() => props.width));
    provide("tabsheight", computed(() => {
      if (!props.height)
        return 0;
      return props.height - props.itemHeight - props.gutter;
    }));
    provide("tabsSwiper", computed(() => props.swiper));
    expose({
      pushKey,
      changeKey,
      unbindKey,
      setTitle,
      tmTabsId
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col overflow",
        style: normalizeStyle([
          props.height && unref(isDulitabs) == false ? { height: __props.height + "rpx" } : "",
          { width: props.width + "rpx" }
        ])
      }, [
        createCommentVNode(" \u6B64\u6E90\u7801\u6709uniapp bug.\u5982\u679C\u5728nvue\u9875\u9762\u7F16\u8BD1\u81F3h5\u5E73\u53F0\u65F6\uFF0C\u5F00\u542Fenable-flexr\u540E\u9700\u8981\u91CC\u9762\u518D\u5957\u5C42view\u518D\u5199flex\u624D\u80FD\u771F\u6B63\u7684\u5F00flex "),
        createCommentVNode(" \u56E0\u6B64\u4E0B\u9762\u7684\u5185\u5BB9\u4F5C\u4E86\u6761\u4EF6\u7F16\u8BD1\u5206\u4E3Anvue\u548C\u975Envue "),
        createCommentVNode(" https://ask.dcloud.net.cn/question/143230 "),
        createCommentVNode(' @touchmove="onMove"\r\n		@touchend="onEnd" \r\n		@touchstart="onStart" '),
        unref(_tabPos) == "bottom" && unref(isDulitabs) == false ? (openBlock(), createElementBlock("view", {
          key: 0,
          onTouchmove: onMove,
          onTouchend: onEnd,
          onTouchstart: onStart,
          ref: "tabsDom",
          style: normalizeStyle({ width: props.swiper ? `${unref(totalWidth)}px` : `${props.width}rpx`, transform: `translateX(0px)` }),
          class: "flex flex-row flex-nowrap overflow"
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 36)) : createCommentVNode("v-if", true),
        createVNode(__easycom_3$1, {
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
          height: props.itemHeight + unref(modelStyle).border + props.gutter + 4,
          _class: ["flex-center flex-row nonvue", unref(cstomClass)],
          _style: props._style,
          width: props.width
        }, {
          default: withCtx(() => [
            !props.showTabsLineAni && props.itemWidth == 0 ? (openBlock(), createElementBlock("scroll-view", {
              key: 0,
              scrollIntoView: _scrollToId.value,
              scrollX: true,
              scrollWithAnimation: true,
              showScrollbar: false,
              enableFlex: "",
              class: normalizeClass(["flex-row", [unref(_align)]]),
              style: normalizeStyle([{ width: `${props.width}rpx`, height: `${props.itemHeight + 4}rpx` }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(cacheTabs.value, (item, index) => {
                return openBlock(), createElementBlock("view", {
                  id: tabsid + item.key,
                  key: index
                }, [
                  createVNode(__easycom_3$1, {
                    onClick: ($event) => changeKey(item.key),
                    round: props.itemRound,
                    linear: props.itemLinear,
                    linearDeep: props.itemLinearDeep,
                    borderDirection: "bottom",
                    text: item.key === _active.value ? unref(modelStyle).text : false,
                    border: item.key === _active.value ? unref(modelStyle).border : 0,
                    transprent: item.key === _active.value ? unref(modelStyle).transprent : true,
                    color: props.activeColor && item.key === _active.value ? props.activeColor : props.color,
                    width: props.itemWidth,
                    _class: "flex-center flex-row",
                    margin: [0, 0],
                    padding: [20, 0],
                    height: props.itemHeight,
                    unit: "rpx"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmBadge, {
                        dot: item.dot,
                        count: item.count,
                        color: item.dotColor
                      }, {
                        default: withCtx(() => [
                          createElementVNode("view", { class: "flex flex-row flex-center" }, [
                            item.icon ? (openBlock(), createBlock(tmIcon, {
                              key: 0,
                              userInteractionEnabled: false,
                              _class: "pr-5",
                              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
                              "font-size": item.key === _active.value ? props.activeFontSize : props.itemFontSize,
                              name: item.icon
                            }, null, 8, ["color", "font-size", "name"])) : createCommentVNode("v-if", true),
                            createVNode(__easycom_0, {
                              userInteractionEnabled: false,
                              "font-size": item.key === _active.value ? props.activeFontSize : props.itemFontSize,
                              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
                              label: item.title
                            }, null, 8, ["font-size", "color", "label"])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["dot", "count", "color"])
                    ]),
                    _: 2
                  }, 1032, ["onClick", "round", "linear", "linearDeep", "text", "border", "transprent", "color", "width", "height"])
                ], 8, ["id"]);
              }), 128)),
              props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("view", {
                key: 0,
                class: "absolute l-0 b-0",
                style: normalizeStyle({
                  width: `${unref(contentWidth)}rpx`,
                  height: "1px",
                  backgroundColor: props.showTabsLineAni ? unref(store).tmStore.dark ? "#616161" : "#ebebeb" : ""
                })
              }, null, 4)) : createCommentVNode("v-if", true),
              props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("view", {
                key: 1,
                class: "anilineBar absolute l-0 b-0",
                style: normalizeStyle({ transform: `translateX(${anitLineLeft.value}px)` })
              }, [
                createVNode(__easycom_3$1, {
                  round: 10,
                  "follow-dark": false,
                  width: 40,
                  color: props.tabsLineAniColor,
                  height: 8,
                  margin: [0, 0],
                  padding: [0, 0]
                }, null, 8, ["color"])
              ], 4)) : createCommentVNode("v-if", true)
            ], 14, ["scrollIntoView"])) : createCommentVNode("v-if", true),
            props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("scroll-view", {
              key: 1,
              scrollIntoView: _scrollToId.value,
              scrollX: true,
              scrollWithAnimation: true,
              showScrollbar: false,
              enableFlex: "",
              class: normalizeClass(["flex-row", [unref(_align)]]),
              style: normalizeStyle([{ width: `${unref(_width)}px`, height: `${props.itemHeight + 4}rpx` }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(cacheTabs.value, (item, index) => {
                return openBlock(), createElementBlock("view", {
                  id: tabsid + item.key,
                  key: index
                }, [
                  createVNode(__easycom_3$1, {
                    onClick: ($event) => changeKey(item.key),
                    round: props.itemRound,
                    linear: props.itemLinear,
                    linearDeep: props.itemLinearDeep,
                    borderDirection: "bottom",
                    text: item.key === _active.value ? unref(modelStyle).text : false,
                    border: item.key === _active.value ? unref(modelStyle).border : 0,
                    transprent: item.key === _active.value ? unref(modelStyle).transprent : true,
                    color: props.activeColor && item.key === _active.value ? props.activeColor : props.color,
                    width: unref(_itemwidth),
                    _class: "flex-center flex-row",
                    margin: [0, 0],
                    padding: [0, 0],
                    height: unref(_itemheight),
                    unit: "px"
                  }, {
                    default: withCtx(() => [
                      createVNode(tmBadge, {
                        dot: item.dot,
                        count: item.count,
                        color: item.dotColor
                      }, {
                        default: withCtx(() => [
                          createElementVNode("view", { class: "flex flex-row flex-center" }, [
                            item.icon ? (openBlock(), createBlock(tmIcon, {
                              key: 0,
                              userInteractionEnabled: false,
                              _class: "pr-5",
                              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
                              "font-size": item.key === _active.value ? props.activeFontSize : props.itemFontSize,
                              name: item.icon
                            }, null, 8, ["color", "font-size", "name"])) : createCommentVNode("v-if", true),
                            createVNode(__easycom_0, {
                              userInteractionEnabled: false,
                              "font-size": item.key === _active.value ? props.activeFontSize : props.itemFontSize,
                              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
                              label: item.title
                            }, null, 8, ["font-size", "color", "label"])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["dot", "count", "color"])
                    ]),
                    _: 2
                  }, 1032, ["onClick", "round", "linear", "linearDeep", "text", "border", "transprent", "color", "width", "height"])
                ], 8, ["id"]);
              }), 128)),
              props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("view", {
                key: 0,
                class: "absolute l-0 b-0",
                style: normalizeStyle({
                  width: `${unref(contentWidth)}rpx`,
                  height: "1px",
                  backgroundColor: props.showTabsLineAni ? unref(store).tmStore.dark ? "#616161" : "#ebebeb" : ""
                })
              }, null, 4)) : createCommentVNode("v-if", true),
              props.showTabsLineAni && props.itemWidth > 0 ? (openBlock(), createElementBlock("view", {
                key: 1,
                class: "anilineBar absolute l-0 b-0",
                style: normalizeStyle({ transform: `translateX(${anitLineLeft.value}px)` })
              }, [
                createVNode(__easycom_3$1, {
                  round: 10,
                  "follow-dark": false,
                  width: 40,
                  color: props.tabsLineAniColor,
                  height: 8,
                  margin: [0, 0],
                  padding: [0, 0]
                }, null, 8, ["color"])
              ], 4)) : createCommentVNode("v-if", true)
            ], 14, ["scrollIntoView"])) : createCommentVNode("v-if", true)
          ]),
          _: 1
        }, 8, ["transprent", "color", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "linear", "linearDeep", "height", "_class", "_style", "width"]),
        createCommentVNode(' @touchmove="onMove"\r\n		@touchend="onEnd" \r\n		@touchstart="onStart" '),
        unref(_tabPos) == "top" && unref(isDulitabs) == false ? (openBlock(), createElementBlock("view", {
          key: 1,
          onTouchmove: onMove,
          onTouchend: onEnd,
          onTouchcancel: onEnd,
          onTouchstart: onStart,
          ref: "tabsDom",
          style: normalizeStyle({ width: props.swiper ? `${unref(totalWidth)}px` : `${props.width}rpx`, transform: `translateX(0px)` }),
          class: "flex flex-row flex-nowrap overflow"
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 36)) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
});
var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["styles", [_style_0$2]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabs/tm-tabs.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "tm-skeleton-line",
  props: {
    height: {
      type: Number,
      default: 60
    },
    dark: {
      type: [Boolean, String],
      default: false
    },
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    followDark: {
      type: [Boolean, String],
      default: true
    },
    round: {
      type: Number,
      default: 4
    }
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const store = useTmpiniaStore();
    requireNativePlugin("bindingx");
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    onMounted(() => {
      try {
        nextTick(function() {
        });
      } catch (e) {
      }
    });
    onUnmounted(() => {
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "dombg",
        class: normalizeClass(["tmSkeletonLine flex-12 my-10", [`round-${props.round}`]]),
        style: normalizeStyle([
          { backgroundColor: unref(isDark) ? "#1e1e1e" : "#ebebeb" },
          { paddingTop: props.height / 2 + "rpx", paddingBottom: props.height / 2 + "rpx" }
        ])
      }, null, 6);
    };
  }
});
var tmSkeletonLine = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-skeleton-line/tm-skeleton-line.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "tm-skeleton",
  props: {
    height: {
      type: Number,
      default: 60
    },
    rows: {
      type: Number,
      default: 3
    },
    model: {
      type: String,
      default: "line"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", { class: "flex flex-col" }, [
        props.model == "line" ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "ma-32"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.rows, (item) => {
            return openBlock(), createElementBlock("view", {
              key: item,
              class: "flex flex-col"
            }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]);
          }), 128)),
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-2" }, [
              createVNode(tmSkeletonLine, {
                height: props.height * 2
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-2 mx-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height * 2
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-2 mr-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height * 2
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-4" }, [
              createVNode(tmSkeletonLine, {
                height: props.height * 2
              }, null, 8, ["height"])
            ])
          ])
        ])) : createCommentVNode("v-if", true),
        props.model == "rect" ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: "ma-32"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.rows, (item) => {
            return openBlock(), createElementBlock("view", {
              key: item,
              class: "flex flex-row"
            }, [
              createElementVNode("view", { class: "flex-2" }, [
                createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ]),
              createElementVNode("view", { class: "flex-4 mx-24" }, [
                createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ]),
              createElementVNode("view", { class: "flex-2 mr-24" }, [
                createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ]),
              createElementVNode("view", { class: "flex-2" }, [
                createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ])
            ]);
          }), 128))
        ])) : createCommentVNode("v-if", true),
        props.model == "card" ? (openBlock(), createElementBlock("view", {
          key: 2,
          class: "ma-32"
        }, [
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-1" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-10 mx-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-1" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ])
          ]),
          createElementVNode("view", { class: "" }, [
            createVNode(tmSkeletonLine, {
              height: props.height * 4
            }, null, 8, ["height"])
          ]),
          createElementVNode("view", { class: "flex flex-row" }, [
            createElementVNode("view", { class: "flex-2" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-4 mx-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-2 mr-24" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ]),
            createElementVNode("view", { class: "flex-2" }, [
              createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ])
          ])
        ])) : createCommentVNode("v-if", true),
        props.model == "chat" ? (openBlock(), createElementBlock("view", {
          key: 3,
          class: "flex flex-row ma-32"
        }, [
          createElementVNode("view", {
            class: "flex-2",
            style: normalizeStyle([{ height: props.height * 2 + "rpx" }])
          }, [
            createVNode(tmSkeletonLine, {
              height: props.height * 2
            }, null, 8, ["height"])
          ], 4),
          createElementVNode("view", { class: "flex-8 mx-24" }, [
            createVNode(tmSkeletonLine, {
              height: props.height
            }, null, 8, ["height"]),
            createVNode(tmSkeletonLine, {
              height: props.height
            }, null, 8, ["height"]),
            createVNode(tmSkeletonLine, {
              height: props.height
            }, null, 8, ["height"]),
            createVNode(tmSkeletonLine, {
              height: props.height
            }, null, 8, ["height"])
          ])
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-skeleton/tm-skeleton.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-tag",
  props: __spreadProps(__spreadValues({}, custom_props), {
    followTheme: {
      type: [Boolean],
      default: true
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    border: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 2
    },
    shadow: {
      type: [Number],
      default: 1
    },
    margin: {
      type: Array,
      default: () => [10, 10]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    checkable: {
      type: [Boolean, String],
      default: false
    },
    checked: {
      type: [Boolean, String],
      default: false
    },
    load: {
      type: [Boolean, String],
      default: false
    },
    size: {
      type: [String],
      default: "m"
    },
    fontSize: {
      type: [Number],
      default: 0
    },
    closable: {
      type: [Boolean],
      default: false
    },
    icon: {
      type: [String],
      default: ""
    },
    label: {
      type: [String],
      default: ""
    },
    fontColor: {
      type: String,
      default: ""
    }
  }),
  emits: ["click", "close", "change", "update:checked"],
  setup(__props, { emit: emits }) {
    const props = __props;
    requireNativePlugin("bindingx");
    requireNativePlugin("dom");
    const anitag = ref(null);
    const customCSSStyle = computed(() => computedStyle(props));
    computed(() => computedClass(props));
    const show = ref(true);
    const _checked_ = ref(false);
    const _fontColor = computed(() => props.fontColor);
    const loading = computed(() => props.load);
    const checked_com = computed({
      get: function() {
        return _checked_.value;
      },
      set: function(val) {
        _checked_.value = val;
        emits("update:checked", _checked_.value);
      }
    });
    checked_com.value = props.checked;
    watch(() => props.checked, (newval) => {
      checked_com.value = newval;
      emits("change", checked_com.value);
    });
    const wh = computed(() => {
      if (props.size == "xs") {
        return {
          px: props.padding[0] || 10,
          py: props.padding[1] || 4,
          fontSize: props.fontSize || 22
        };
      } else if (props.size == "s") {
        return {
          px: props.padding[0] || 14,
          py: props.padding[1] || 4,
          fontSize: props.fontSize || 24
        };
      } else if (props.size == "m") {
        return {
          px: props.padding[0] || 16,
          py: props.padding[1] || 8,
          fontSize: props.fontSize || 26
        };
      } else if (props.size == "n") {
        return {
          px: props.padding[0] || 18,
          py: props.padding[1] || 10,
          fontSize: props.fontSize || 28
        };
      } else if (props.size == "g") {
        return {
          px: props.padding[0] || 20,
          py: props.padding[1] || 12,
          fontSize: props.fontSize || 32
        };
      } else if (props.size == "lg") {
        return {
          px: props.padding[0] || 24,
          py: props.padding[1] || 16,
          fontSize: props.fontSize || 36
        };
      }
      return {
        px: props.padding[0],
        py: props.padding[1],
        fontSize: props.fontSize
      };
    });
    function onclick(e) {
      e.stopPropagation();
      e.preventDefault();
      emits("click", e);
      if (loading.value)
        return;
      checked_com.value = !checked_com.value;
    }
    function aniEnd() {
      show.value = false;
    }
    function closeTag(e) {
      if (loading.value)
        return;
      e.stopPropagation();
      emits("close");
      if (anitag.value) {
        anitag.value.play();
      } else {
        show.value = false;
      }
    }
    return (_ctx, _cache) => {
      return show.value ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: normalizeClass(["flex flex-row", [unref(loading) ? "opacity-5" : ""]])
      }, [
        createVNode(tmTranslate, {
          onEnd: aniEnd,
          ref_key: "anitag",
          ref: anitag,
          name: "zoom",
          reverse: "",
          autoPlay: false
        }, {
          default: withCtx(() => [
            createVNode(__easycom_3$1, {
              "hover-class": "opacity-6",
              onClick: onclick,
              transprent: props.transprent,
              color: props.color,
              _class: "flex-row flex flex-row-center-center",
              _style: unref(customCSSStyle),
              followTheme: props.followTheme,
              followDark: props.followDark,
              dark: props.dark,
              round: props.round,
              shadow: props.checkable && unref(checked_com) || !props.checkable ? props.shadow : 0,
              outlined: props.checkable && !unref(checked_com) ? true : props.outlined,
              border: props.border,
              borderStyle: props.borderStyle,
              borderDirection: props.borderDirection,
              text: props.checkable && !unref(checked_com) ? true : props.text,
              linear: props.linear,
              linearDeep: props.linearDeep,
              margin: props.margin,
              padding: [unref(wh).px, unref(wh).py]
            }, {
              default: withCtx(() => [
                props.icon ? (openBlock(), createBlock(tmIcon, {
                  key: 0,
                  color: unref(_fontColor),
                  name: props.icon,
                  followDark: props.followDark,
                  fontSize: unref(wh).fontSize,
                  dark: props.dark,
                  userInteractionEnabled: false
                }, null, 8, ["color", "name", "followDark", "fontSize", "dark"])) : createCommentVNode("v-if", true),
                createElementVNode("view", { class: "flex-1 flex flex-center" }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createVNode(__easycom_0, {
                      color: unref(_fontColor),
                      _class: props.icon ? "pl-10" : "",
                      fontSize: unref(wh).fontSize,
                      followDark: props.followDark,
                      userInteractionEnabled: false,
                      dark: props.dark,
                      label: props.label
                    }, null, 8, ["color", "_class", "fontSize", "followDark", "dark", "label"])
                  ])
                ]),
                createElementVNode("view", {
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  props.closable && !unref(loading) ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    color: unref(_fontColor),
                    onClick: closeTag,
                    followDark: props.followDark,
                    _class: "pl-10",
                    fontSize: unref(wh).fontSize * 0.8,
                    name: "tmicon-times",
                    dark: props.dark
                  }, null, 8, ["color", "followDark", "fontSize", "dark"])) : createCommentVNode("v-if", true)
                ]),
                unref(loading) ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  userInteractionEnabled: false,
                  class: "pl-10 flex flex-center flex-row",
                  style: { "line-height": "0" }
                }, [
                  createVNode(tmIcon, {
                    color: unref(_fontColor),
                    followDark: props.followDark,
                    fontSize: unref(wh).fontSize * 0.8,
                    name: "tmicon-loading",
                    spin: "",
                    dark: _ctx.dark
                  }, null, 8, ["color", "followDark", "fontSize", "dark"])
                ])) : createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 8, ["transprent", "color", "_style", "followTheme", "followDark", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "linear", "linearDeep", "margin", "padding"])
          ]),
          _: 3
        }, 512)
      ], 2)) : createCommentVNode("v-if", true);
    };
  }
});
var __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tag/tm-tag.vue"]]);
var _style_0$1 = { "flex": { "": { "display": "flex", "marginTop": "15rpx" } } };
const _sfc_main$1 = {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      time: "00.00.00",
      countdown: "",
      timer: null
    };
  },
  computed: {
    format1(status) {
      return function(status2) {
        if (status2 == 1)
          return "\u62A5\u540D\u4E2D";
        if (status2 == 3)
          return "\u8FDB\u884C\u4E2D";
        if (status2 == 4)
          return "\u5F85\u5B8C\u7ED3";
        if (status2 == 5)
          return "\u5DF2\u5B8C\u7ED3";
      };
    }
  },
  methods: {
    nav(id) {
      formatAppLog("log", "at components/erke-list/erke-list.vue:85", id);
      uni.navigateTo({
        url: "/pages/webview/wb_ek1?detailData=" + encodeURIComponent(JSON.stringify("https://erke.jaycao.com/#/pages/acti/info?key=" + id))
      });
    },
    getDateDiff(data) {
      var timePublish = new Date(data);
      var timeNow = new Date();
      var minute = 1e3 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var result = "2";
      var diffValue = timePublish - timeNow;
      var diffDay = diffValue / day;
      var diffHour = diffValue / hour;
      result = parseInt(diffDay) + "\u5929";
      hour = parseInt(diffHour) % 24;
      result = result + hour + "\u5C0F\u65F6\u540E\u7ED3\u675F";
      if (parseInt(diffDay) < 0) {
        return "\u62A5\u540D\u5DF2\u622A\u81F3";
      }
      return result;
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    add(m) {
      return " \u79EF\u5206: " + m;
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tm_text = resolveEasycom(resolveDynamicComponent("tm-text"), __easycom_0);
  const _component_tm_divider = resolveEasycom(resolveDynamicComponent("tm-divider"), __easycom_1$1);
  const _component_tm_image = resolveEasycom(resolveDynamicComponent("tm-image"), __easycom_4);
  const _component_tm_tag = resolveEasycom(resolveDynamicComponent("tm-tag"), __easycom_3);
  const _component_tm_sheet = resolveEasycom(resolveDynamicComponent("tm-sheet"), __easycom_3$1);
  const _component_tm_result = resolveEasycom(resolveDynamicComponent("tm-result"), __easycom_6);
  return openBlock(), createElementBlock("view", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.list, (good) => {
      return openBlock(), createElementBlock("view", {
        onClick: ($event) => $options.nav(good.id),
        id: "good" + good.id,
        class: "good-li",
        key: good.id
      }, [
        createVNode(_component_tm_sheet, {
          margin: [5, 5],
          round: 10
        }, {
          default: withCtx(() => [
            createVNode(_component_tm_text, {
              "font-size": 30,
              _class: "font-weight-b",
              label: ""
            }, {
              default: withCtx(() => [
                createElementVNode("u-text", null, toDisplayString(good.name), 1)
              ]),
              _: 2
            }, 1024),
            createVNode(_component_tm_divider),
            createElementVNode("view", { class: "flex-row flex-row-center-start" }, [
              createVNode(_component_tm_image, {
                width: 300,
                round: 2,
                height: 200,
                src: good.logo,
                onClick: ($event) => $options.nav(good.id)
              }, null, 8, ["src", "onClick"]),
              createElementVNode("view", {
                class: "pl-16 flex-1",
                style: { "width": "0px" }
              }, [
                createVNode(_component_tm_tag, {
                  text: "",
                  shadow: 0,
                  color: "blue",
                  size: "m",
                  icon: "tmicon-tag-fill",
                  label: good.category,
                  style: { "margin-bottom": "10upx" },
                  onClick: ($event) => $options.nav(good.id)
                }, null, 8, ["label", "onClick"]),
                createVNode(_component_tm_tag, {
                  text: "",
                  shadow: 0,
                  color: "green",
                  size: "m",
                  icon: "tmicon-position-fill",
                  label: good.orgName,
                  style: {},
                  onClick: ($event) => $options.nav(good.id)
                }, null, 8, ["label", "onClick"])
              ]),
              createCommentVNode(' 	<tm-text _class="text-overflow-2" style="margin-bottom: 10upx;" :label="good.orgName"></tm-text> ')
            ]),
            createElementVNode("view", {
              class: "flex flex-row flex-row-top-end",
              onClick: ($event) => $options.nav(good.id)
            }, [
              createVNode(_component_tm_tag, {
                text: "",
                shadow: 0,
                icon: "tmicon-rank",
                color: "pink",
                size: "m",
                label: $options.add(good.hours),
                style: {},
                onClick: ($event) => $options.nav(good.id)
              }, null, 8, ["label", "onClick"]),
              createCommentVNode(' <view class="cu-tag round bg-blue light"  style="">{{good.hours}}\u5206</view> '),
              createVNode(_component_tm_tag, {
                text: "",
                shadow: 0,
                icon: "tmicon-weixinzhifu",
                color: "orange",
                size: "m",
                label: $options.format1(good.statusAll),
                style: {},
                onClick: ($event) => $options.nav(good.id)
              }, null, 8, ["label", "onClick"]),
              createVNode(_component_tm_tag, {
                text: "",
                shadow: 0,
                icon: "tmicon-clock-fill",
                color: "purple",
                size: "m",
                label: $options.getDateDiff(good.endTime),
                style: {},
                onClick: ($event) => $options.nav(good.id)
              }, null, 8, ["label", "onClick"])
            ], 8, ["onClick"])
          ]),
          _: 2
        }, 1024)
      ], 8, ["onClick", "id"]);
    }), 128)),
    $props.list.length == 0 ? (openBlock(), createBlock(_component_tm_result, {
      key: 0,
      showBtn: false
    })) : createCommentVNode("v-if", true)
  ]);
}
var __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["styles", [_style_0$1]], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/erke-list/erke-list.vue"]]);
var _style_0 = { "sticky-tabs": { "": { "zIndex": 990, "position": "sticky", "top": 0 } }, "demo-tip": { "": { "fontSize": "24rpx", "textAlign": "center" } } };
const _sfc_main = {
  components: {
    TabBar
  },
  data() {
    return {
      offset: 50,
      load: true,
      goods: [],
      tabs: [
        {
          key: "1",
          title: "\u7EBF\u4E0B",
          icon: "tmicon-ios-leaf"
        },
        {
          key: "2",
          title: "\u7EBF\u4E0A",
          icon: "tmicon-ios-umbrella"
        },
        {
          key: "3",
          title: "\u53EF\u62A5\u540D",
          icon: "tmicon-ios-rocket"
        }
      ],
      tabIndex: 1,
      listvedio: [
        "https://www.cdtu.edu.cn/images/20220671.png",
        {
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          img: "https://picsum.photos/200/300?id=43335",
          type: "video"
        },
        "https://www.cdtu.edu.cn/images/2021xiaofeng5chenggongjingshen.png"
      ]
    };
  },
  onLoad() {
    this.tabschange(1);
  },
  methods: {
    nav(index) {
      if (index == 1) {
        formatAppLog("log", "at pages/erke/erke.nvue:177", "pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/numvail/index");
        uni.navigateTo({
          url: "/pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/numvail/index"
        });
      }
      if (index == 2) {
        uni.navigateTo({
          url: "/pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/project/index?go=0"
        });
      }
      if (index == 3) {
        uni.navigateTo({
          url: "/pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/my/acti/bm/index?mode=0"
        });
      }
      if (index == 4) {
        uni.navigateTo({
          url: "/pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/my/transcript/index"
        });
      }
    },
    tabschange(key) {
      this.tabIndex = key;
      let url = "";
      if (key == 2) {
        url = "wx/erke/getxx";
      } else if (key == 1) {
        url = "wx/erke/getxs";
      } else {
        url = "wx/erke/getbm";
      }
      request.httpTokenRequest({
        url,
        method: "get"
      }, {}).then((res) => {
        formatAppLog("log", "at pages/erke/erke.nvue:230", res);
        this.goods = [];
        this.goods = this.goods.concat(res.data.data.data.records);
        this.load = false;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tm_navbar = resolveEasycom(resolveDynamicComponent("tm-navbar"), __easycom_0$1);
  const _component_tm_tabs = resolveEasycom(resolveDynamicComponent("tm-tabs"), __easycom_1);
  const _component_tm_skeleton = resolveEasycom(resolveDynamicComponent("tm-skeleton"), __easycom_2);
  const _component_tm_sheet = resolveEasycom(resolveDynamicComponent("tm-sheet"), __easycom_3$1);
  const _component_tm_image = resolveEasycom(resolveDynamicComponent("tm-image"), __easycom_4);
  const _component_erke_list = resolveEasycom(resolveDynamicComponent("erke-list"), __easycom_5);
  const _component_tm_result = resolveEasycom(resolveDynamicComponent("tm-result"), __easycom_6);
  const _component_tm_sticky = resolveEasycom(resolveDynamicComponent("tm-sticky"), __easycom_7);
  const _component_tab_bar = resolveComponent("tab-bar");
  const _component_tm_app = resolveEasycom(resolveDynamicComponent("tm-app"), __easycom_8);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createVNode(_component_tm_app, { ref: "app" }, {
      default: withCtx(() => [
        createVNode(_component_tm_navbar, {
          title: "CDTU \u6210\u5DE5\u4E8C\u8BFE",
          shadow: 0
        }, {
          left: withCtx(() => [
            createElementVNode("view", { class: "flex flex-center flex-row" })
          ]),
          _: 1
        }),
        createCommentVNode(' <mescroll-uni\r\n      ref="mescrollRef"\r\n      @init="mescrollInit"\r\n      @up="upCallback"\r\n      height="100%"\r\n    > '),
        createVNode(_component_tm_sticky, { offset: "0" }, {
          sticky: withCtx(() => [
            createVNode(_component_tm_tabs, {
              list: $data.tabs,
              width: 1e3,
              itemWidth: 160,
              height: 300,
              "default-name": "1",
              onChange: $options.tabschange
            }, null, 8, ["list", "onChange"])
          ]),
          default: withCtx(() => [
            $data.load ? (openBlock(), createBlock(_component_tm_sheet, { key: 0 }, {
              default: withCtx(() => [
                createVNode(_component_tm_skeleton),
                createVNode(_component_tm_skeleton, { model: "chat" }),
                createVNode(_component_tm_skeleton, { model: "chat" }),
                createVNode(_component_tm_skeleton, { model: "chat" }),
                createVNode(_component_tm_skeleton, { model: "chat" })
              ]),
              _: 1
            })) : createCommentVNode("v-if", true),
            createVNode(_component_tm_sheet, {
              style: {},
              round: 10,
              margin: [10, 10]
            }, {
              default: withCtx(() => [
                createCommentVNode(' <tm-text\r\n          :font-size="36"\r\n          _class=""\r\n          label="\u9752\u6625\u6210\u5DE5"\r\n          style="float: left; font-size: 36rpx; font-weight: bold;margin-left:20upx"\r\n        ></tm-text> '),
                createCommentVNode(" </tm-sheet> "),
                createCommentVNode(" <tm-divider></tm-divider> "),
                createElementVNode("view", { class: "flex flex-row flex-wrap flex-row-center-between" }, [
                  createElementVNode("view", null, [
                    createVNode(_component_tm_image, {
                      width: 340,
                      height: 120,
                      round: 8,
                      margin: [0, 10],
                      src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7872818f-3545-4440-93a4-789b44167e33/59a588f5-0a84-4c34-a1a1-6b8b2b6634aa.png",
                      onClick: _cache[0] || (_cache[0] = ($event) => $options.nav(1))
                    })
                  ]),
                  createElementVNode("view", null, [
                    createVNode(_component_tm_image, {
                      width: 340,
                      height: 120,
                      round: 8,
                      margin: [0, 10],
                      src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7872818f-3545-4440-93a4-789b44167e33/85853b73-2483-47d9-9815-659dd17b2a4c.png",
                      onClick: _cache[1] || (_cache[1] = ($event) => $options.nav(4))
                    })
                  ]),
                  createElementVNode("view", null, [
                    createVNode(_component_tm_image, {
                      width: 340,
                      height: 120,
                      round: 8,
                      margin: [0, 10],
                      src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7872818f-3545-4440-93a4-789b44167e33/e51d2a74-d185-41c5-a084-773167b0c0d6.png",
                      onClick: _cache[2] || (_cache[2] = ($event) => $options.nav(3))
                    })
                  ]),
                  createElementVNode("view", null, [
                    createVNode(_component_tm_image, {
                      width: 340,
                      height: 120,
                      round: 8,
                      margin: [0, 10],
                      src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7872818f-3545-4440-93a4-789b44167e33/a78cc092-d9dc-4f5c-bb77-7943ba787394.png",
                      onClick: _cache[3] || (_cache[3] = ($event) => $options.nav(2))
                    })
                  ])
                ]),
                createCommentVNode('   <tm-image  :width="340" :height="180" :round="8" :margin="[0, 10]" src="https://s1.ax1x.com/2022/08/04/vm11Bj.png"></tm-image>\r\n										  <tm-image :width="340" :height="180" :round="8" :margin="[0, 10]" src="https://s1.ax1x.com/2022/08/04/vm11Bj.png"></tm-image>\r\n										    <tm-image  :width="340" :height="180" :round="8" :margin="[0, 10]" src="https://s1.ax1x.com/2022/08/04/vm11Bj.png"></tm-image> ')
              ]),
              _: 1
            }),
            createVNode(_component_erke_list, { list: $data.goods }, null, 8, ["list"]),
            $data.goods.length == 0 ? (openBlock(), createBlock(_component_tm_result, {
              key: 1,
              showBtn: false
            })) : createCommentVNode("v-if", true)
          ]),
          _: 1
        }),
        createCommentVNode(" </mescroll-uni> "),
        createVNode(_component_tab_bar, { active: 2 })
      ]),
      _: 1
    }, 512)
  ]);
}
var erke = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/erke/erke.nvue"]]);
export { erke as default };
