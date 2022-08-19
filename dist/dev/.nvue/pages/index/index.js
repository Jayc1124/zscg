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
import { r as requireNativePlugin, f as formatAppLog, _ as __easycom_3, a as __easycom_4, t as tmIcon, c as custom_props, u as useTmpiniaStore, b as computedDark, d as computedTheme, e as computedStyle, g as computedClass, h as tmTranslate, i as __easycom_0$1, o as onLoad, j as resolveEasycom, k as __easycom_8, l as __easycom_1$1 } from "../../tm-divider.js";
import { defineComponent, getCurrentInstance, inject, computed, ref, onMounted, nextTick, toRaw, openBlock, createElementBlock, normalizeStyle, unref, createVNode, withCtx, createBlock, createCommentVNode, createElementVNode, renderSlot, provide, onBeforeUnmount, watch, isRef, withModifiers, normalizeClass, resolveDynamicComponent, Fragment, renderList } from "vue";
import { _ as _export_sfc } from "../../plugin-vue_export-helper.js";
import { t as tmOverlay, a as tmInput, b as tmCell, c as tmMessage, d as tmButton } from "../../tm-cell.js";
import { t as tmBadge, _ as __easycom_7, a as __easycom_0$2, T as TabBar, r as request } from "../../request.js";
import "pinia";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "tm-waterfall-item",
  props: {
    img: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "white"
    },
    round: {
      type: Number,
      default: 4
    }
  },
  emits: ["img-click"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const dom = requireNativePlugin("dom");
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _width = inject("tmWaterFallItemRealWidth", computed(() => uni.upx2px(_width.value)));
    let _nodeInfo = ref({
      id: uni.$tm.u.getUid(2),
      width: _width.value,
      height: _width.value,
      imgWidth: _width.value,
      imgHeight: _width.value,
      bottom: 0,
      index: NaN,
      top: 0,
      left: 0
    });
    const isimgLoad = ref(props.img ? false : true);
    const _parentComs = getParent();
    const isPush = ref(false);
    if (!_parentComs) {
      formatAppLog("error", "at tmui/components/tm-waterfall-item/tm-waterfall-item.vue:64", "\u8BF7\u4E0D\u8981\u5355\u72EC\u4F7F\u7528\u6B64\u7EC4\u4EF6\uFF0C\u8BF7\u653E\u7F6E\u5728:tm-waterfall\u5185\uFF1B");
    }
    _parentComs.sumTotal(_nodeInfo.value.id);
    onMounted(() => {
      nextTick(() => {
        if (isimgLoad.value === true) {
          nvuegetClientRect();
        }
      });
    });
    function imgLoadSuccess(e) {
      const { width, height } = e.detail;
      let _w = _width.value;
      let _height = _w / (width / height);
      _nodeInfo.value = __spreadProps(__spreadValues({}, _nodeInfo.value), { imgWidth: _w, imgHeight: _height });
      setTimeout(() => {
        nextTick(() => nvuegetClientRect());
      }, 50);
    }
    function getParent() {
      var _a2;
      let parent = proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.parentNameId) == "tmWaterfallId" || !parent) {
          break;
        } else {
          parent = (_a2 = parent == null ? void 0 : parent.$parent) != null ? _a2 : void 0;
        }
      }
      return parent;
    }
    function nvuegetClientRect() {
      nextTick(function() {
        dom.getComponentRect(proxy.$refs.itemWall, function(res) {
          if (res == null ? void 0 : res.size) {
            if (res.size.height == 0 && res.size.width == 0) {
              nvuegetClientRect();
            } else {
              isimgLoad.value = true;
              const { width, height } = res.size;
              _nodeInfo.value = __spreadProps(__spreadValues({}, _nodeInfo.value), {
                height
              });
              if (isPush.value === false && isimgLoad.value) {
                pushKey();
                isPush.value = true;
              }
            }
          }
        });
      });
    }
    async function pushKey() {
      if (_parentComs) {
        let pos = await _parentComs.pushKey(toRaw(_nodeInfo.value));
        _nodeInfo.value = pos;
      }
    }
    function onImgClick(e) {
      emits("img-click", e);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        ref: "itemWall",
        class: "absolute itemWall",
        style: normalizeStyle([
          !isPush.value ? { transform: "translateX(-1000px)" } : "",
          isPush.value ? { transform: `translateX(${unref(_nodeInfo).left}px) translateY(${unref(_nodeInfo).top}px)` } : ""
        ])
      }, [
        createVNode(__easycom_3, {
          margin: [0, 0],
          padding: [0, 0],
          round: props.round,
          width: unref(_width),
          unit: "px",
          color: props.color,
          _class: "flex flex-col flex-col-top-start"
        }, {
          default: withCtx(() => [
            props.img ? (openBlock(), createBlock(__easycom_4, {
              key: 0,
              onClick: onImgClick,
              round: props.round,
              onLoad: imgLoadSuccess,
              src: props.img,
              unit: "px",
              height: unref(_nodeInfo).imgHeight,
              width: unref(_nodeInfo).imgWidth
            }, null, 8, ["round", "src", "height", "width"])) : createCommentVNode("v-if", true),
            createElementVNode("view", { class: "flex flex-col flex-1 flex-col-top-start" }, [
              renderSlot(_ctx.$slots, "default")
            ])
          ]),
          _: 3
        }, 8, ["round", "width", "color"])
      ], 4);
    };
  }
});
var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-waterfall-item/tm-waterfall-item.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "tm-waterfall",
  props: {
    width: {
      type: Number,
      default: 750
    },
    gutter: {
      type: Number,
      default: 12
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const _containerWidth = computed(() => props.width);
    const _itemRealWidth = computed(() => {
      return (_containerWidth.value - props.gutter) / 2;
    });
    const parentNameId = "tmWaterfallId";
    const _cacheList = ref([]);
    const _totalSort = ref([[], []]);
    const _list = ref([]);
    const _totalNum = ref([]);
    const _containerHeight = computed(() => {
      let lh = _totalSort.value[0].map((el) => el.height);
      let l_height = lh.length == 0 ? 0 : lh.reduce((a, b) => a + b);
      let rh = _totalSort.value[1].map((el) => el.height);
      let r_height = rh.length == 0 ? 0 : rh.reduce((a, b) => a + b);
      return { left: l_height, right: r_height, maxHeight: Math.max(r_height, l_height), minHeight: Math.min(r_height, l_height) };
    });
    provide("tmWaterFallItemRealWidth", computed(() => uni.upx2px(_itemRealWidth.value)));
    function sumTotal(id) {
      _totalNum.value.push(id);
    }
    async function pushKey(n) {
      let index2 = _cacheList.value.findIndex((el) => el.id == n.id);
      let item = n;
      if (index2 > -1) {
        _cacheList.value[index2] = item;
        return item;
      } else {
        _cacheList.value.push(item);
        return countPushSort(item);
      }
    }
    function countPushSort(item) {
      var _a, _b;
      let dir = _containerHeight.value.left > _containerHeight.value.right ? 1 : 0;
      let bottom = (_b = (_a = _totalSort.value[dir][_totalSort.value[dir].length - 1]) == null ? void 0 : _a.bottom) != null ? _b : 0;
      item.top = bottom + uni.upx2px(props.gutter);
      item.bottom = item.top + item.height;
      item.left = dir == 0 ? 0 : uni.upx2px(_itemRealWidth.value) + uni.upx2px(props.gutter);
      let index2 = _list.value.findIndex((el) => el.id == item.id);
      _totalSort.value[dir].push(item);
      if (index2 > -1) {
        _list.value[index2] = item;
      } else {
        _list.value.push(item);
      }
      return item;
    }
    expose({ parentNameId, pushKey, sumTotal });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", null, [
        createElementVNode("view", {
          class: "flex flex-col flex-col-top-start flex-between relative overflow",
          style: normalizeStyle([{ width: unref(_containerWidth) + "rpx", height: unref(_containerHeight).maxHeight + 50 + "px" }])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 4),
        createCommentVNode(" \u865A\u62DF\u52A0\u8F7D\u5360\u4F4D\u7B26\u3002 "),
        _totalNum.value.length != _list.value.length ? (openBlock(), createBlock(__easycom_3, {
          key: 0,
          _class: "flex flex-center",
          margin: [0, 0],
          padding: [0, 0]
        }, {
          default: withCtx(() => [
            createVNode(tmIcon, {
              name: "tmicon-loading",
              spin: ""
            })
          ]),
          _: 1
        })) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-waterfall/tm-waterfall.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "tm-grid-item",
  props: __spreadProps(__spreadValues({}, custom_props), {
    height: {
      type: Number,
      default: 100
    },
    transprent: {
      type: Boolean,
      default: true
    },
    dot: {
      type: [Boolean, String],
      default: false
    },
    icon: {
      type: [String],
      default: ""
    },
    count: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number, String],
      default: 999
    },
    bgColor: {
      type: String,
      default: "white"
    },
    color: {
      type: String,
      default: "red"
    },
    url: {
      type: String,
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = useTmpiniaStore();
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = computed(() => store.tmStore);
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => {
      return computedTheme(__spreadProps(__spreadValues({}, props), { color: props.bgColor }), isDark.value, tmcfg.value);
    });
    const _colWidth = inject("tmGridItemWidth", 0);
    const _tmGridshowBorder = inject("tmGridshowBorder", computed(() => false));
    const tmGridshowCachList = inject("tmGridshowCachList", computed(() => []));
    const uid = ref({
      id: uni.$tm.u.getUid(1),
      type: ""
    });
    let parentFormItem = proxy == null ? void 0 : proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.keyName) == "tmGrid" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    onMounted(() => {
      if (parentFormItem == null ? void 0 : parentFormItem.pushKey) {
        parentFormItem.pushKey(uid.value);
      }
    }), onBeforeUnmount(() => {
      parentFormItem.delKey(uid.value);
    });
    let wkStyle = ref(`width:${_colWidth}'rpx'`);
    watch([tmGridshowCachList, _tmGridshowBorder], () => {
      nextTick(() => setStyleFun());
    }, { deep: true });
    function setStyleFun() {
      let ar = tmGridshowCachList.value.filter((el) => el.id == uid.value.id);
      if (ar.length == 1) {
        uid.value = ar[0];
      }
      if (!_tmGridshowBorder.value) {
        wkStyle.value = `border:0rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
        return;
      }
      if (uid.value.type == 1) {
        wkStyle.value = `border:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
      }
      if (uid.value.type == 2) {
        wkStyle.value = `border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid rgba(0,0,0,0);border-top:1rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
      }
      if (uid.value.type == 3) {
        wkStyle.value = `border-top:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
      }
      if (uid.value.type == 4) {
        wkStyle.value = `border-left:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-top:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
      }
    }
    function onClick(e) {
      emits("click", e);
      if (props.url !== "") {
        try {
          uni.navigateTo({
            url: props.url
          });
        } catch (e2) {
        }
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        style: normalizeStyle(unref(wkStyle))
      }, [
        createVNode(__easycom_3, {
          color: props.bgColor,
          text: props.text,
          border: 0,
          "hover-class": "opacity-6",
          transprent: props.transprent,
          height: props.height,
          width: unref(_colWidth) - 0.5,
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex-col flex",
          onClick
        }, {
          default: withCtx(() => [
            createElementVNode("view", { class: "flex-1 flex flex-col-center-center" }, [
              createVNode(tmBadge, {
                userInteractionEnabled: true,
                fontSize: 20,
                dot: props.dot,
                count: props.count,
                "max-count": props.maxCount,
                icon: props.icon,
                color: props.color
              }, {
                default: withCtx(() => [
                  createElementVNode("view", { class: "flex-col flex-col-center-center flex px-10" }, [
                    renderSlot(_ctx.$slots, "default")
                  ])
                ]),
                _: 3
              }, 8, ["dot", "count", "max-count", "icon", "color"])
            ])
          ]),
          _: 3
        }, 8, ["color", "text", "transprent", "height", "width"])
      ], 4);
    };
  }
});
var tmGridItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-grid-item/tm-grid-item.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "tm-grid",
  props: __spreadProps(__spreadValues({}, custom_props), {
    round: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 750
    },
    col: {
      type: Number,
      default: 5
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: Boolean,
      default: false
    }
  }),
  setup(__props, { expose }) {
    const props = __props;
    let _cachList = ref([]);
    const _colWidth = computed(() => Math.ceil(props.width / props.col - 1));
    provide("tmGridItemWidth", _colWidth.value + (props.showBorder ? 1 : 0));
    provide("tmGridshowBorder", computed(() => props.showBorder));
    provide("tmGridshowCachList", computed(() => _cachList.value));
    function pushKey(e) {
      let index2 = _cachList.value.findIndex((el) => el.id == e.id);
      if (index2 == -1) {
        _cachList.value.push(e);
      } else {
        _cachList.value.splice(index2, 1, e);
      }
      setIndexType();
    }
    function delKey(e) {
      _cachList.value.findIndex((el) => el.id == e.id);
      setIndexType();
    }
    function setIndexType() {
      let totallen = _cachList.value.length;
      _cachList.value = _cachList.value.map((el, index2) => {
        let aIndex = index2 + 1;
        if (aIndex <= props.col) {
          el.type = 4;
          if (aIndex == totallen && totallen == 1 || aIndex == 1) {
            el.type = 1;
          }
        } else {
          if (aIndex % props.col == 1) {
            el.type = 3;
          } else {
            el.type = 2;
          }
        }
        return el;
      });
    }
    expose({
      pushKey,
      delKey,
      keyName: "tmGrid"
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(__easycom_3, {
        round: props.round,
        width: props.width,
        transprent: props.transprent,
        color: props.color,
        margin: [0, 0],
        padding: [0, 0],
        _class: "flex flex-row flex-row-top-start",
        contStyle: "flex-wrap:wrap;"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["round", "width", "transprent", "color"]);
    };
  }
});
var tmGrid = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-grid/tm-grid.vue"]]);
var _style_0 = { "flex-left-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-right-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-end" } }, "flex-top-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-end-custom": { "": { "display": "flex", "justifyContent": "flex-end", "alignItems": "flex-end" } }, "flex-center-custom": { "": { "display": "flex", "justifyContent": "center", "alignItems": "center", "flexDirection": "row" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-drawer",
  props: __spreadProps(__spreadValues({}, custom_props), {
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const props = __props;
    const drawerANI = ref(null);
    const store = useTmpiniaStore();
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = computed(() => store.tmStore);
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const isDark = computed(() => computedDark(props, tmcfg.value));
    const tmcomputed = computed(() => computedTheme(props, isDark.value, tmcfg.value));
    const syswidth = ref(0);
    const sysheight = ref(0);
    const reverse = ref(true);
    const aniEnd = ref(false);
    const flag = ref(false);
    const timeid = ref(0);
    let timerId = NaN;
    ref("close");
    const drawerStauts = ref("close");
    let _show = ref(props.show);
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
    let sysinfo = uni.getSystemInfoSync();
    syswidth.value = sysinfo.windowWidth;
    sysheight.value = sysinfo.windowHeight;
    uni.hideKeyboard();
    let nowPage = getCurrentPages().pop();
    let isCustomHeader = false;
    for (let i = 0; i < uni.$tm.pages.length; i++) {
      if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i].path && uni.$tm.pages[i].custom == "custom") {
        isCustomHeader = true;
        break;
      }
    }
    if (!isCustomHeader) {
      if (sysinfo.osName == "android") {
        sysheight.value = ((_d = (_c = sysinfo.safeArea) == null ? void 0 : _c.height) != null ? _d : sysinfo.windowHeight) - 44 - ((_f = (_e = sysinfo.safeAreaInsets) == null ? void 0 : _e.bottom) != null ? _f : 0);
      } else {
        sysheight.value = ((_h = (_g = sysinfo.safeArea) == null ? void 0 : _g.height) != null ? _h : sysinfo.windowHeight) - 44;
      }
    } else {
      sysheight.value = ((_j = (_i = sysinfo.safeArea) == null ? void 0 : _i.height) != null ? _j : sysinfo.windowHeight) + ((_k = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _k : 0) + ((_m = (_l = sysinfo.safeAreaInsets) == null ? void 0 : _l.bottom) != null ? _m : 0);
    }
    timeid.value = uni.$tm.u.getUid(4);
    if (_show.value) {
      reverse.value = false;
    }
    watch(() => props.show, (val) => {
      _show.value = props.show;
      if (val) {
        opens();
      } else {
        closeFun();
      }
    });
    onMounted(() => opens());
    const ok_loading = computed(() => props.okLoading);
    const round_rp = computed(() => {
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
    const reverse_rp = computed(() => {
      if (aniname.value != "zoom")
        return reverse.value;
      return !reverse.value;
    });
    const aniname = computed(() => {
      if (props.placement == "center")
        return "zoom";
      if (props.placement == "top")
        return "up";
      if (props.placement == "bottom")
        return "down";
      return props.placement;
    });
    const anwidth = computed(() => {
      if (aniname.value == "zoom") {
        return props.width + props.unit;
      }
      if (props.placement == "left" || props.placement == "right") {
        return props.width + props.unit;
      }
      return syswidth.value + "px";
    });
    const anheight = computed(() => {
      let wucha = 0;
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        return props.height + wucha + props.unit;
      }
      return sysheight.value + "px";
    });
    const contentHeight = computed(() => {
      let base_height = props.hideHeader ? 0 : 44;
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        let h = props.height;
        if (props.unit == "rpx") {
          h = uni.upx2px(props.height);
        }
        return h - base_height + "px";
      }
      return sysheight.value - base_height + "px";
    });
    const align_rp = computed(() => {
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
      nextTick(() => {
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
    uni.$tm.u.getUid(1);
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
      nextTick(function() {
        var _a2;
        (_a2 = drawerANI.value) == null ? void 0 : _a2.play();
      });
    }
    expose({ close, open });
    return (_ctx, _cache) => {
      return unref(_show) ? (openBlock(), createBlock(tmOverlay, {
        key: 0,
        duration: 25,
        onOpen: OverLayOpen,
        zIndex: props.zIndex,
        transprent: !props.mask,
        onClick: clickClose,
        align: unref(align_rp),
        overlayClick: false,
        show: unref(_show),
        "onUpdate:show": _cache[1] || (_cache[1] = ($event) => isRef(_show) ? _show.value = $event : _show = $event)
      }, {
        default: withCtx(() => [
          createVNode(tmTranslate, {
            onEnd: animationClose,
            reverse: unref(reverse_rp),
            width: unref(anwidth),
            height: unref(anheight),
            ref_key: "drawerANI",
            ref: drawerANI,
            "auto-play": false,
            name: unref(aniname),
            duration: props.duration
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $event.stopPropagation(), ["stop"])),
                style: normalizeStyle([
                  { width: unref(anwidth), height: unref(anheight) },
                  !props.transprent ? unref(tmcomputed).borderCss : "",
                  !props.transprent ? unref(tmcomputed).backgroundColorCss : "",
                  !props.transprent ? unref(tmcomputed).shadowColor : "",
                  unref(customCSSStyle)
                ]),
                class: normalizeClass([unref(round_rp), "flex flex-col overflow ", unref(customClass)])
              }, [
                !props.closeable && !props.hideHeader ? (openBlock(), createElementBlock("view", {
                  key: 0,
                  class: "flex flex-row flex-row-center-center flex-between px-24",
                  style: { "height": "44px" }
                }, [
                  createElementVNode("view", { class: "flex-4 flex-shrink" }, [
                    !props.hideCancel ? (openBlock(), createBlock(__easycom_0$1, {
                      key: 0,
                      onClick: cancel,
                      label: props.cancelText
                    }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                  ]),
                  createElementVNode("view", { class: "flex-8 px-32 flex-center" }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createVNode(__easycom_0$1, {
                        _class: "text-overflow-1 opacity-7",
                        label: props.title
                      }, null, 8, ["label"])
                    ])
                  ]),
                  createElementVNode("view", { class: "flex-4 flex-shrink flex-row flex-row-center-end" }, [
                    !unref(ok_loading) ? (openBlock(), createBlock(__easycom_0$1, {
                      key: 0,
                      color: __props.okColor,
                      onClick: ok,
                      dark: props.dark,
                      label: props.okText
                    }, null, 8, ["color", "dark", "label"])) : createCommentVNode("v-if", true),
                    unref(ok_loading) ? (openBlock(), createBlock(tmIcon, {
                      key: 1,
                      color: __props.okColor,
                      spin: unref(ok_loading),
                      dark: unref(isDark),
                      _class: unref(isDark) !== true ? "opacity-4" : "",
                      fontSize: 34,
                      name: unref(ok_loading) ? "tmicon-jiazai_dan" : "tmicon-times-circle-fill"
                    }, null, 8, ["color", "spin", "dark", "_class", "name"])) : createCommentVNode("v-if", true)
                  ])
                ])) : createCommentVNode("v-if", true),
                props.closeable && !props.hideHeader ? (openBlock(), createElementBlock("view", {
                  key: 1,
                  class: "flex flex-row flex-row-center-center flex-between px-24",
                  style: { "height": "44px" }
                }, [
                  createElementVNode("view", { class: "flex-9 pr-32" }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createVNode(__easycom_0$1, {
                        _class: "text-overflow-1 opacity-7",
                        dark: props.dark,
                        label: props.title
                      }, null, 8, ["dark", "label"])
                    ])
                  ]),
                  createElementVNode("view", { class: "flex-3 flex-shrink flex-row flex-row-center-end" }, [
                    createVNode(tmIcon, {
                      onClick: cancel,
                      dark: props.dark,
                      _class: unref(isDark) !== true ? "opacity-3" : "",
                      fontSize: 36,
                      name: "tmicon-times-circle-fill"
                    }, null, 8, ["dark", "_class"])
                  ])
                ])) : createCommentVNode("v-if", true),
                createElementVNode("scroll-view", {
                  scrollY: "",
                  style: normalizeStyle([{ height: unref(contentHeight) }]),
                  class: "overflow"
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 4)
              ], 6)
            ]),
            _: 3
          }, 8, ["reverse", "width", "height", "name", "duration"])
        ]),
        _: 3
      }, 8, ["zIndex", "transprent", "align", "show"])) : createCommentVNode("v-if", true);
    };
  }
});
var tmDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-drawer/tm-drawer.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const store = useTmpiniaStore();
    const { proxy } = getCurrentInstance();
    const str = ref("");
    const showCustomColor = ref("#60ab41");
    const showCustomName = ref("darkGreen");
    const showCustom = ref(false);
    const listimg = ref([]);
    const list2 = ref([]);
    const list = ref([]);
    const list_yule = ref([]);
    const list3 = ref([]);
    const navList = ref([]);
    const newslist = ref([]);
    ref(0);
    function get_gongneng() {
      request.httpTokenRequest({
        url: "wx/getTools",
        method: "get"
      }, {}).then((res) => {
        list.value = res.data.data[1].iconsList;
        list_yule.value = res.data.data[2].iconsList;
      });
    }
    function getbannaer() {
      request.httpRequest({
        url: "notice/noticeBanner/getAppInfo"
      }).then((res) => {
        if (res.data.code == 200) {
          navList.value = res.data.data;
          listimg.value = res.data.data.slice(0, 3);
          list3.value = res.data.data.slice(3, 7);
          list2.value = res.data.data.slice(7);
        }
      });
    }
    function openurl2(index2) {
      formatAppLog("log", "at pages/index/index.nvue:379", list3.value[index2].navurl);
      uni.navigateTo({
        url: list3.value[index2].navurl
      });
    }
    function navNews(id) {
      formatAppLog("log", "at pages/index/index.nvue:404", id);
      uni.navigateTo({
        url: "/pages/news/detail/detail?detailData=" + id
      });
    }
    function navNewsBar() {
      uni.switchTab({
        url: "/pages/news/news"
      });
    }
    function get_news() {
      request.httpTokenRequest({
        url: "news/item/1?pageNum=1",
        method: "get"
      }, {}).then((res) => {
        newslist.value = res.data.rows;
      });
    }
    function onChangeDark() {
      proxy.$refs.app.setDark();
      const anhei = uni.getStorageSync("anhei");
      uni.setStorageSync("anhei", !anhei);
    }
    function search() {
      if (str.value.trim() === "") {
        proxy.$refs.msg.show({
          model: "error",
          text: "\u4E0D\u80FD\u4E3A\u7A7A",
          mask: true
        });
        return;
      }
      uni.navigateTo({
        url: "search?key=" + str.value
      });
    }
    function changeCustomColor() {
      formatAppLog("log", "at pages/index/index.nvue:474", 1);
      if (!showCustomColor.value || !showCustomName.value) {
        proxy.$refs.msg.show({
          model: "error",
          text: "\u5FC5\u586B\u5185\u5BB9",
          mask: true
        });
        return;
      }
      showCustom.value = false;
      store.setTmVuetifyAddTheme(showCustomName.value, showCustomColor.value);
    }
    onLoad(() => {
      getbannaer();
      uni.setStorageSync("anhei", store.tmStore.dark);
      get_gongneng();
      get_news();
    });
    return (_ctx, _cache) => {
      const _component_tm_waterfall_item = resolveEasycom(resolveDynamicComponent("tm-waterfall-item"), __easycom_0);
      const _component_tm_waterfall = resolveEasycom(resolveDynamicComponent("tm-waterfall"), __easycom_1);
      return openBlock(), createElementBlock("scroll-view", {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
        style: { flexDirection: "column" }
      }, [
        createVNode(__easycom_8, { ref: "app" }, {
          default: withCtx(() => [
            createCommentVNode(' <view class="top-bc">\r\n		</view> '),
            createVNode(__easycom_7, { offset: "0" }, {
              default: withCtx(() => [
                createCommentVNode(` <template v-slot:sticky>\r
				\r
				<tm-sheet :margin="[0, 0]">\r
					<view class="flex-row flex-row-center-start pb-10">\r
						<tm-image :width="280" :height="75" :src="cdtulogo"></tm-image>\r
						<view class="pl-50 flex-1" style="width:0px">\r
							<tm-text _class="text-weight-b" :font-size="36" label="\u638C\u4E0A\u6210\u5DE5"></tm-text>\r
							<tm-text _class="opacity-6" label="\u6559\u52A1 \u4E8C\u8BFE \u8D44\u8BAF \u5168\u90E8\u62FF\u4E0B"></tm-text>\r
\r
\r
						</view>\r
						<tm-icon @click="onChangeDark" :color="store.tmStore.dark?'yellow':''" _class="pl-32"\r
							:font-size="42" name="tmicon-ios-sunny"></tm-icon>\r
\r
					</view>\r
				</tm-sheet>\r
\r
			</template> `),
                createVNode(__easycom_0$2, {
                  title: "CDTU \u638C\u4E0A\u6210\u5DE5",
                  shadow: 0,
                  "hide-home": ""
                }, {
                  left: withCtx(() => [
                    createElementVNode("view", { class: "flex flex-center flex-row" }, [
                      createVNode(tmIcon, {
                        onClick: onChangeDark,
                        color: unref(store).tmStore.dark ? "yellow" : "",
                        _class: "pl-32",
                        "font-size": 42,
                        name: "tmicon-ios-sunny"
                      }, null, 8, ["color"])
                    ])
                  ]),
                  _: 1
                }),
                createCommentVNode(' <view style="width: 95%;margin: auto;margin-top: 15upx;" >\r\n				<tm-image :width="280" :height="75" :src="cdtulogo"></tm-image>\r\n			</view> '),
                createCommentVNode(` <tm-sheet :margin="[0, 0]">\r
				<tm-input :transprent="true" :placeholder="language('index.search.tips')" :border="1" showClear prefix="tmicon-search"\r
					v-model="str" @search='search' :searchLabel="language('index.search.btntext')"></tm-input>\r
			</tm-sheet> `),
                createVNode(__easycom_3, { margin: [0, 0] }, {
                  default: withCtx(() => [
                    createVNode(tmInput, {
                      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
                      border: 1,
                      showClear: "",
                      prefix: "tmicon-search",
                      modelValue: str.value,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => str.value = $event),
                      onSearch: search,
                      searchLabel: "\u641C\u7D22\u529F\u80FD"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createElementVNode("view", { style: { "margin-top": "15upx", "margin-bottom": "15upx" } }, [
                  createCommentVNode(' <u-swiper\r\n          @click="openurl1"\r\n          :height="200"\r\n          :width="600"\r\n          :list="listimg"\r\n          name="img"\r\n          :border-radius="20"\r\n          mode="none"\r\n          :effect3d="true"\r\n          bg-color=""\r\n        ></u-swiper> '),
                  createCommentVNode(' <tm-carousel autoplay :margin="[0,16]" :round="3" :width="686" :height="200" :list="listimg" :indicatorDots="false" @change="c1"  @click="nav"></tm-carousel> ')
                ]),
                createVNode(__easycom_3, {
                  style: {},
                  round: 3,
                  margin: [0, 0]
                }, {
                  default: withCtx(() => [
                    createVNode(__easycom_0$1, {
                      "font-size": 36,
                      _class: "",
                      label: "\u6210\u5DE5",
                      style: { "float": "left", "font-size": "36rpx", "font-weight": "bold", "margin-left": "20upx" }
                    }),
                    createCommentVNode(" </tm-sheet> "),
                    createCommentVNode(" <tm-divider></tm-divider> "),
                    createElementVNode("view", { class: "flex flex-row flex-wrap flex-row-center-between" }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(list3.value, (item, index2) => {
                        return openBlock(), createElementBlock("view", { key: index2 }, [
                          createVNode(__easycom_4, {
                            width: 340,
                            height: 180,
                            round: 8,
                            margin: [0, 10],
                            src: item.img,
                            onClick: ($event) => openurl2(index2)
                          }, null, 8, ["src", "onClick"]),
                          createCommentVNode('   <tm-image  :width="340" :height="180" :round="8" :margin="[0, 10]" src="https://s1.ax1x.com/2022/08/04/vm11Bj.png"></tm-image>\r\n										  <tm-image :width="340" :height="180" :round="8" :margin="[0, 10]" src="https://s1.ax1x.com/2022/08/04/vm11Bj.png"></tm-image>\r\n										    <tm-image  :width="340" :height="180" :round="8" :margin="[0, 10]" src="https://s1.ax1x.com/2022/08/04/vm11Bj.png"></tm-image> ')
                        ]);
                      }), 128))
                    ])
                  ]),
                  _: 1
                }),
                createVNode(__easycom_3, {
                  style: {},
                  round: 3,
                  margin: [0, 0]
                }, {
                  default: withCtx(() => [
                    createVNode(__easycom_0$1, {
                      "font-size": 36,
                      _class: "",
                      label: "\u5B66\u4E60",
                      style: { "float": "left", "font-size": "32rpx", "font-weight": "bold", "margin-left": "20upx" }
                    })
                  ]),
                  _: 1
                }),
                createCommentVNode(" <tm-divider></tm-divider> "),
                createVNode(tmGrid, {
                  col: 4,
                  width: 750,
                  margin: [0, 0]
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item, index2) => {
                      return openBlock(), createElementBlock("view", {
                        key: index2,
                        style: { "margin": "left 0upx" }
                      }, [
                        createVNode(tmGridItem, {
                          url: item.url,
                          height: 150,
                          count: item.color,
                          color: item.ys,
                          dot: item.status
                        }, {
                          default: withCtx(() => [
                            createVNode(__easycom_4, {
                              width: 100,
                              height: 100,
                              round: 3,
                              src: item.cuicon
                            }, null, 8, ["src"]),
                            createVNode(__easycom_0$1, {
                              "font-size": 28,
                              "text-weight-b": "",
                              label: item.name,
                              class: "mt-10"
                            }, null, 8, ["label"])
                          ]),
                          _: 2
                        }, 1032, ["url", "count", "color", "dot"])
                      ]);
                    }), 128))
                  ]),
                  _: 1
                }),
                createCommentVNode(' <u-swiper\r\n        @click="openurl3"\r\n        :height="220"\r\n        :list="list2"\r\n        name="img"\r\n        mode="none"\r\n        bg-color=""\r\n      ></u-swiper> '),
                createCommentVNode(' <tm-carousel autoplay :margin="[0,0]" :round="6" :width="650" :height="200" :list="list2" :indicatorDots="false"></tm-carousel> '),
                createCommentVNode(' <tm-sheet style="margin: auto" :round="3" :margin="[5, 5]"> '),
                createVNode(__easycom_3, {
                  style: {},
                  round: 3,
                  margin: [0, 0]
                }, {
                  default: withCtx(() => [
                    createVNode(__easycom_0$1, {
                      "font-size": 36,
                      _class: "",
                      label: "\u5A31\u4E50",
                      style: { "float": "left", "font-size": "36rpx", "font-weight": "bold", "margin-left": "20upx" }
                    })
                  ]),
                  _: 1
                }),
                createCommentVNode(" <tm-divider></tm-divider> "),
                createVNode(tmGrid, {
                  col: 4,
                  width: 750
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(list_yule.value, (item, index2) => {
                      return openBlock(), createElementBlock("view", { key: index2 }, [
                        createVNode(tmGridItem, {
                          url: item.url,
                          height: 160,
                          count: item.color,
                          color: item.ys,
                          dot: item.status
                        }, {
                          default: withCtx(() => [
                            createVNode(__easycom_4, {
                              width: 100,
                              height: 100,
                              round: 3,
                              src: item.cuicon
                            }, null, 8, ["src"]),
                            createVNode(__easycom_0$1, {
                              "font-size": 28,
                              "text-weight-b": "",
                              label: item.name,
                              class: "mt-10"
                            }, null, 8, ["label"])
                          ]),
                          _: 2
                        }, 1032, ["url", "count", "color", "dot"])
                      ]);
                    }), 128))
                  ]),
                  _: 1
                }),
                createCommentVNode(" </tm-sheet> "),
                createVNode(__easycom_3, { margin: [0, 10] }, {
                  default: withCtx(() => [
                    createVNode(tmCell, {
                      margin: [0, 5],
                      padding: [0, 8],
                      rightText: "\u67E5\u770B\u66F4\u591A",
                      titleFontSize: 36,
                      title: "\u8981\u95FB\u{1F525}",
                      style: { "float": "left", "font-size": "36rpx", "font-weight": "bold", "margin-left": "10upx" },
                      onClick: navNewsBar
                    }),
                    createCommentVNode(" <tm-divider></tm-divider> "),
                    createElementVNode("view", { class: "flex flex-col flex-col-top-center" }, [
                      createVNode(_component_tm_waterfall, { width: 720 }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(newslist.value, (item, index2) => {
                            return openBlock(), createElementBlock("view", {
                              onClick: ($event) => navNews(item.id)
                            }, [
                              createVNode(_component_tm_waterfall_item, {
                                img: item.img || "https://cdn2.jaycao.com/cdtu/cdtunews.jpg"
                              }, {
                                default: withCtx(() => [
                                  createElementVNode("view", { class: "py-24" }, [
                                    createVNode(__easycom_0$1, {
                                      _class: "text-overflow-2",
                                      label: item.title
                                    }, null, 8, ["label"])
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["img"])
                            ], 8, ["onClick"]);
                          }), 256))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                createCommentVNode(' <tm-sheet :margin="[5,5]" >\r\n					\r\n					</tm-sheet> '),
                createElementVNode("view", { class: "py-32 mx-32" }, [
                  createVNode(__easycom_1$1, {
                    color: "grey-2",
                    label: "\u638C\u4E0A\u6210\u5DE5 3.0.0 \u5168\u7AEF\u517C\u5BB9,\u539F\u751F\u6E32\u67D3"
                  })
                ]),
                createCommentVNode(` <tm-float-button\r
        @click="onChangeDark"\r
        :btn="{ icon: 'tmicon-ios-sunny', color: 'pink', linear: 'right' }"\r
      >\r
      </tm-float-button> `),
                createVNode(tmMessage, { ref: "msg" }, null, 512),
                createVNode(tmDrawer, {
                  show: showCustom.value,
                  "onUpdate:show": _cache[3] || (_cache[3] = ($event) => showCustom.value = $event),
                  placement: "center",
                  hideHeader: "",
                  height: 450,
                  width: 600
                }, {
                  default: withCtx(() => [
                    createElementVNode("view", { class: "pa-32 flex flex-col" }, [
                      createElementVNode("view", { class: "text-align-center py-24" }, [
                        createVNode(__easycom_0$1, {
                          _class: "text-weight-b",
                          "font-size": 32,
                          label: "\u81EA\u5B9A\u4E49\u4E3B\u9898"
                        })
                      ]),
                      createVNode(tmInput, {
                        prefixLabel: "\u989C\u8272\u503C",
                        placeholder: "\u8BF7\u8F93\u5165\u989C\u8272\u503C,\u6BD4\u5982:#FF00FF",
                        border: 1,
                        showClear: "",
                        modelValue: showCustomColor.value,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => showCustomColor.value = $event)
                      }, null, 8, ["modelValue"]),
                      createVNode(tmInput, {
                        prefixLabel: "\u989C\u8272\u540D\u79F0",
                        margin: [0, 24],
                        placeholder: "\u5B57\u6BCD,\u5982:darkGreen",
                        border: 1,
                        showClear: "",
                        modelValue: showCustomName.value,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => showCustomName.value = $event)
                      }, null, 8, ["modelValue"]),
                      createVNode(tmButton, {
                        onClick: changeCustomColor,
                        block: "",
                        label: "\u786E\u8BA4\u5207\u6362"
                      })
                    ])
                  ]),
                  _: 1
                }, 8, ["show"])
              ]),
              _: 1
            }),
            createVNode(TabBar, { active: 0 })
          ]),
          _: 1
        }, 512)
      ]);
    };
  }
});
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/pages/index/index.nvue"]]);
export { index as default };
