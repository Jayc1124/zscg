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
import { c as custom_props, e as computedStyle, g as computedClass, _ as __easycom_3, i as __easycom_0$2, t as tmIcon, u as useTmpiniaStore, f as formatAppLog, j as resolveEasycom } from "./tm-divider.js";
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, renderSlot, createCommentVNode, unref, createVNode, withCtx, createBlock, getCurrentInstance, ref, inject, onUnmounted, watch, nextTick, createElementVNode, provide, normalizeStyle, resolveDynamicComponent, onMounted } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.js";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "tm-badge",
  props: __spreadProps(__spreadValues({}, custom_props), {
    round: {
      type: [Number],
      default: 6
    },
    border: {
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
    transprent: {
      type: [Boolean],
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 22
    },
    status: {
      type: [Boolean],
      default: false
    },
    dot: {
      type: [Boolean],
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
      type: [Number],
      default: 999
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const customCSSStyle = computed(() => computedStyle(props));
    const customClass = computed(() => computedClass(props));
    const istext = computed(() => {
      return isNaN(parseInt(String(props.count)));
    });
    const show = computed(() => {
      if (!props.dot && !props.icon && !props.count)
        return false;
      return true;
    });
    const size = computed(() => {
      if (props.status || props.dot) {
        return {
          w: 12,
          h: 12,
          pr: 6,
          t: 3
        };
      }
      if (props.icon) {
        let p = props.fontSize * 1.6;
        return {
          w: p,
          h: p,
          pr: 12,
          t: 10
        };
      }
      if (isNaN(parseInt(String(props.count)))) {
        return {
          w: 0,
          h: 0,
          pr: 10,
          t: 10
        };
      }
      if (props.count < 10) {
        return {
          w: 30,
          h: 30,
          pr: 12,
          t: 10
        };
      }
      if (props.count >= 10) {
        return {
          w: 0,
          h: 0,
          pr: 10,
          t: 10
        };
      }
      return {
        w: 0,
        h: 0,
        pr: 0,
        t: 0
      };
    });
    const _icon = computed(() => props.icon);
    const _dot = computed(() => props.dot);
    const _count = computed(() => props.count);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass(["flex relative", [props.status ? "flex-row flex-row-center-center mx-8" : ""]])
      }, [
        !props.status ? (openBlock(), createElementBlock("view", { key: 0 }, [
          renderSlot(_ctx.$slots, "default")
        ])) : createCommentVNode("v-if", true),
        unref(show) ? (openBlock(), createElementBlock("view", {
          key: 1,
          class: normalizeClass([
            (unref(_dot) || unref(_count) || unref(_icon)) && !props.status ? "absolute flex-top-start-end r-0" : ""
          ]),
          style: { zIndex: 10 }
        }, [
          createVNode(__easycom_3, {
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            color: props.color,
            _class: [unref(customClass), "flex-center flex-col"],
            _style: [unref(customCSSStyle), { flexShrink: 1 }],
            followTheme: props.followTheme,
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
            width: unref(size).w,
            height: unref(size).h,
            margin: props.margin,
            padding: props.padding
          }, {
            default: withCtx(() => [
              unref(_count) > 0 && !unref(istext) ? (openBlock(), createBlock(__easycom_0$2, {
                key: 0,
                color: "white",
                "font-size": props.fontSize,
                _class: unref(size).h == 0 ? "py-3 px-8" : "",
                label: unref(_count) > props.maxCount ? props.maxCount + "+" : unref(_count)
              }, null, 8, ["font-size", "_class", "label"])) : createCommentVNode("v-if", true),
              unref(_count) && unref(istext) ? (openBlock(), createBlock(__easycom_0$2, {
                key: 1,
                color: "white",
                "font-size": props.fontSize,
                _class: unref(size).h == 0 ? "py-3 px-8" : "",
                label: unref(_count)
              }, null, 8, ["font-size", "_class", "label"])) : createCommentVNode("v-if", true),
              unref(_icon) ? (openBlock(), createBlock(tmIcon, {
                key: 2,
                color: "white",
                "font-size": props.fontSize,
                name: unref(_icon)
              }, null, 8, ["font-size", "name"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"])
        ], 2)) : createCommentVNode("v-if", true),
        props.status ? (openBlock(), createBlock(__easycom_0$2, {
          key: 2,
          "font-size": props.fontSize,
          _class: "ml-10",
          label: props.label
        }, null, 8, ["font-size", "label"])) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var tmBadge = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-badge/tm-badge.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "tm-tabbar-item",
  props: __spreadProps(__spreadValues({}, custom_props), {
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
    const store = useTmpiniaStore();
    const proxy = (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _btnTop = computed(() => props.btnTop);
    const _transprent = computed(() => {
      if (_btnTop.value === true)
        return false;
      return true;
    });
    const _styletop = computed(() => {
      if (_btnTop.value !== true)
        return "top:15px";
      return "top:0px";
    });
    const _padding = computed(() => {
      return [0, 0];
    });
    const _load = ref(props.load);
    const _active = ref(false);
    const c_font_style = computed(() => {
      return { dotColor: props.dotColor, text: props.text, icon: props.icon, textSize: props.textSize, iconSize: props.iconSize, unicon: props.unicon };
    });
    const uid = uni.$tm.u.getUid(1);
    const tmTabbarWidth = inject("tmTabbarWidth", computed(() => 50));
    const _width = computed(() => {
      if (_btnTop.value === true)
        return 60;
      return tmTabbarWidth.value;
    });
    inject("tmTabbarUrl", computed(() => ""));
    const tmTabbarItemList = inject("tmTabbarItemList", computed(() => []));
    const nowUid = inject("tmTabbarUid", computed(() => ""));
    inject("tmTabbarItemSafe", false);
    const tmTabbarItemActive = inject("tmTabbarItemActive", computed(() => -1));
    const tmTabbarItemAutoSelect = inject("tmTabbarItemAutoSelect", computed(() => false));
    const _color = computed(() => {
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
    onUnmounted(() => {
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
    watch([nowUid, () => props.active], () => {
      if (tmTabbarItemAutoSelect.value) {
        setActive();
      }
    });
    watch(tmTabbarItemActive, () => {
      if (!tmTabbarItemAutoSelect.value) {
        if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
          nextTick(() => {
            _active.value = true;
          });
        } else {
          nextTick(() => {
            _active.value = false;
          });
        }
      }
    });
    watch([() => props.load], () => {
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
      nextTick(() => {
        if (tmTabbarItemAutoSelect.value) {
          if (parent) {
            parent.setNowurl(props.url, uid);
          }
          setActive();
        }
        if (props.url == "")
          return;
        uni.$tm.u.routerTo(props.url, props.openType);
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "flex flex-col flex-col-top-center",
        style: { "height": "75px" }
      }, [
        createVNode(__easycom_3, {
          height: 60,
          width: unref(_width),
          round: 24,
          unit: "px",
          _class: "flex-center flex ",
          parenClass: "relative",
          class: "relative",
          _style: unref(_styletop),
          followTheme: unref(_btnTop) && props.followTheme,
          transprent: unref(_transprent),
          color: props.color,
          margin: [0, 0],
          padding: unref(_padding),
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          linear: props.linear,
          linearDeep: props.linearDeep,
          onClick: itemClick
        }, {
          default: withCtx(() => [
            createVNode(tmBadge, {
              fontSize: 20,
              color: unref(c_font_style).dotColor,
              eventPenetrationEnabled: true,
              dot: props.dot,
              count: props.count,
              icon: props.dotIcon,
              maxCount: props.maxCount
            }, {
              default: withCtx(() => [
                createElementVNode("view", {
                  class: normalizeClass([[_active.value ? "anifun" : ""], "flex flex-col flex-col-center-center"]),
                  style: { width: 65 + "px", height: "30px" }
                }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    !_load.value ? (openBlock(), createBlock(tmIcon, {
                      key: 0,
                      _style: "line-height: 0px;",
                      color: unref(_color),
                      "font-size": unref(c_font_style).iconSize,
                      name: _active.value ? unref(c_font_style).icon : unref(c_font_style).unicon || unref(c_font_style).icon
                    }, null, 8, ["color", "font-size", "name"])) : createCommentVNode("v-if", true)
                  ]),
                  _load.value ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    spin: "",
                    _style: "line-height: 0px;",
                    color: unref(_color),
                    "font-size": unref(c_font_style).iconSize,
                    name: "tmicon-loading"
                  }, null, 8, ["color", "font-size"])) : createCommentVNode("v-if", true)
                ], 2)
              ]),
              _: 3
            }, 8, ["color", "dot", "count", "icon", "maxCount"]),
            unref(c_font_style).text !== "" ? (openBlock(), createBlock(__easycom_0$2, {
              key: 0,
              color: unref(_color),
              _class: "pb-0",
              "font-size": unref(c_font_style).textSize,
              label: unref(c_font_style).text
            }, null, 8, ["color", "font-size", "label"])) : createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["width", "_style", "followTheme", "transprent", "color", "padding", "shadow", "outlined", "border", "borderStyle", "borderDirection", "linear", "linearDeep"])
      ]);
    };
  }
});
var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabbar-item/tm-tabbar-item.vue"]]);
var _style_0$2 = { "barcont": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "space-around", "alignItems": "center" } } };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "tm-tabbar",
  props: __spreadProps(__spreadValues({}, custom_props), {
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
    useTmpiniaStore();
    let sys = uni.getSystemInfoSync();
    const _width = uni.upx2px(props.width) || ((_a = sys == null ? void 0 : sys.windowWidth) != null ? _a : 0);
    const _blur = computed(() => props.blur);
    const _activeUrl = ref("");
    const _activeUid = ref("");
    const tmTabbarId = "tmTabbarId";
    const _cachlist = ref([]);
    const _showSafe = ref(props.showSafe);
    const _activeIndex = ref(props.active);
    const win_bottom = (_c = (_b = sys == null ? void 0 : sys.safeAreaInsets) == null ? void 0 : _b.bottom) != null ? _c : 0;
    if (win_bottom > 0) {
      _showSafe.value = true;
    }
    const _totalBarHeight = computed(() => {
      if (_showSafe.value)
        return 90;
      return 75;
    });
    const _BarHeight = computed(() => {
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
    provide("tmTabbarUrl", computed(() => _activeUrl.value));
    provide("tmTabbarUid", computed(() => _activeUid.value));
    provide("tmTabbarWidth", computed(() => Math.ceil(_width / _cachlist.value.length)));
    provide("tmTabbarItemList", computed(() => _cachlist.value));
    provide("tmTabbarItemActive", computed(() => _activeIndex.value));
    provide("tmTabbarItemSafe", _showSafe.value);
    provide("tmTabbarItemAutoSelect", computed(() => props.autoSelect));
    watch(() => props.active, () => {
      if (props.active == _activeIndex.value)
        return;
      _activeIndex.value = props.active;
    });
    watch(_activeIndex, () => {
      emits("change", _activeIndex.value);
      emits("update:active", _activeIndex.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: "fixed l-0 b-0 flex",
        style: normalizeStyle({ width: unref(_width) + "px", height: unref(_totalBarHeight) + "px", transform: `translateY(${props.bottom}rpx)` })
      }, [
        createCommentVNode(` 			@click="emits('click', $event)"    `),
        createElementVNode("view", {
          class: "relative",
          style: { "top": "15px" }
        }, [
          createVNode(__easycom_3, {
            blur: unref(_blur),
            color: props.color,
            parenClass: "relative",
            class: "relative",
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
            height: unref(_BarHeight),
            width: unref(_width),
            unit: "px"
          }, null, 8, ["blur", "color", "followTheme", "dark", "round", "shadow", "outlined", "text", "linear", "linearDeep", "height", "width"])
        ]),
        createElementVNode("view", {
          class: "absolute flex flex-col l-0",
          style: normalizeStyle({ width: unref(_width) + "px", height: unref(_totalBarHeight) + "px" })
        }, [
          createElementVNode("view", {
            class: "relative barcont flex flex-row flex-row-top-center flex-around flex-1",
            style: normalizeStyle({ width: unref(_width) + "px" })
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 4)
        ], 4)
      ], 4);
    };
  }
});
var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["styles", [_style_0$2]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabbar/tm-tabbar.vue"]]);
const _sfc_main$2 = {
  name: "tab-bar",
  props: {
    active: {
      type: Number,
      default() {
        return [];
      }
    }
  },
  methods: {
    beforeClick(index) {
      formatAppLog("log", "at components/TheTabBar.vue:22", index);
      return this.active !== index;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tm_tabbar_item = resolveEasycom(resolveDynamicComponent("tm-tabbar-item"), __easycom_0$1);
  const _component_tm_tabbar = resolveEasycom(resolveDynamicComponent("tm-tabbar"), __easycom_1);
  return openBlock(), createBlock(_component_tm_tabbar, {
    transprent: "",
    blur: "",
    bottom: 0,
    round: 16,
    "auto-select": false,
    active: $props.active,
    shadow: 8
  }, {
    default: withCtx(() => [
      createVNode(_component_tm_tabbar_item, {
        activeColor: "primary",
        beforeClick: $options.beforeClick,
        data: 0,
        blur: "",
        active: $props.active === 0,
        transprent: "",
        "open-type": "switchTab",
        url: "/pages/index/index",
        text: "\u4E3B\u9875",
        icon: "tmicon-wind-smile"
      }, null, 8, ["beforeClick", "active"]),
      createVNode(_component_tm_tabbar_item, {
        url: "/pages/news/news",
        text: "\u5DE5\u9662",
        blur: "",
        beforeClick: $options.beforeClick,
        data: 1,
        transprent: "",
        "open-type": "switchTab",
        unicon: "tmicon-news",
        icon: "tmicon-news"
      }, null, 8, ["beforeClick"]),
      createVNode(_component_tm_tabbar_item, {
        url: "/pages/erke/erke",
        beforeClick: $options.beforeClick,
        count: "",
        dotColor: "blue",
        data: 2,
        blur: "",
        transprent: "",
        text: "\u4E8C\u8BFE",
        "open-type": "switchTab",
        unicon: "tmicon-layergroup-fill",
        icon: "tmicon-layergroup-fill"
      }, null, 8, ["beforeClick"]),
      createVNode(_component_tm_tabbar_item, {
        url: "/pages/kebiao/index",
        beforeClick: $options.beforeClick,
        count: "",
        dotColor: "blue",
        data: 3,
        blur: "",
        transprent: "",
        text: "\u8BFE\u8868",
        "open-type": "switchTab",
        unicon: "tmicon-calendar-alt",
        icon: "tmicon-calendar-alt"
      }, null, 8, ["beforeClick"]),
      createVNode(_component_tm_tabbar_item, {
        url: "/pages/me/me2/me2",
        beforeClick: $options.beforeClick,
        count: "",
        dotColor: "blue",
        data: 4,
        blur: "",
        transprent: "",
        text: "\u6211\u7684",
        "open-type": "switchTab",
        unicon: "tmicon-account",
        icon: "tmicon-account"
      }, null, 8, ["beforeClick"])
    ]),
    _: 1
  }, 8, ["active"]);
}
var TabBar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/TheTabBar.vue"]]);
var _style_0$1 = { "tm-sticky": { "": { "position": "sticky" } } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "tm-sticky",
  props: {
    model: {
      type: String,
      default: "top"
    },
    offset: {
      type: [String, Number],
      default: "0px"
    },
    zIndex: {
      type: Number,
      default: 50
    }
  },
  setup(__props) {
    const props = __props;
    const _offset = computed(() => {
      if (typeof props.offset === "number")
        return props.offset + "rpx";
      return props.offset;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", null, [
        createElementVNode("view", {
          class: "tm-sticky flex flex-col",
          style: normalizeStyle([
            props.model == "top" ? { top: `${unref(_offset)}` } : "",
            props.model == "left" ? { left: `${unref(_offset)}` } : "",
            { "z-index": props.zIndex }
          ])
        }, [
          createElementVNode("view", { class: "flex flex-col" }, [
            renderSlot(_ctx.$slots, "sticky")
          ])
        ], 4),
        createElementVNode("view", null, [
          renderSlot(_ctx.$slots, "default")
        ])
      ]);
    };
  }
});
var __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0$1]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-sticky/tm-sticky.vue"]]);
var _style_0 = { "statusHeightTop": { "": { "zIndex": 400 } } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tm-navbar",
  props: __spreadProps(__spreadValues({}, custom_props), {
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
    var _a, _b;
    const props = __props;
    useTmpiniaStore();
    (_b = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _height = computed(() => props.height);
    const _width = uni.getSystemInfoSync().windowWidth;
    const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    const _barHeight = computed(() => statusBarHeight + _height.value);
    const _leftWidth = computed(() => props.leftWidth);
    const _rightWidth = computed(() => props.rightWidth);
    const contentwidth = computed(() => {
      return _width - uni.upx2px(_leftWidth.value) - uni.upx2px(_rightWidth.value);
    });
    const _title = computed(() => props.title);
    const _fontColor = computed(() => props.fontColor);
    const _homeColor = computed(() => props.homeColor);
    const _blur = computed(() => props.blur);
    const _pages = ref(0);
    onMounted(() => {
      _pages.value = getCurrentPages().length;
    });
    const backhome = () => {
      uni.reLaunch({
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
        uni.navigateBack({});
      }, 250, true);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", null, [
        createElementVNode("view", {
          class: "statusHeight",
          style: normalizeStyle({ height: unref(_barHeight) + "px" })
        }, null, 4),
        createElementVNode("view", {
          class: "fixed l-0 t-0 statusHeightTop flex",
          style: normalizeStyle({ width: unref(_width) + "px", height: unref(_barHeight) + "px" })
        }, [
          createVNode(__easycom_3, {
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            blur: unref(_blur),
            color: props.color,
            _class: _ctx._class,
            _style: _ctx._style,
            followTheme: props.followTheme,
            "follow-dark": props.followDark,
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
            height: unref(_barHeight),
            width: unref(_width),
            unit: "px"
          }, {
            default: withCtx(() => [
              createElementVNode("view", {
                class: "statusHeight",
                style: normalizeStyle({ height: unref(statusBarHeight) + "px" })
              }, null, 4),
              createElementVNode("view", { class: "flex flex-row flex-1 flex-row flex-row-center-betweent" }, [
                createElementVNode("view", {
                  class: "flex-row flex flex-row-center-start",
                  style: normalizeStyle({ width: unref(_leftWidth) + "rpx" })
                }, [
                  _pages.value > 1 && props.hideBack ? (openBlock(), createBlock(tmIcon, {
                    key: 0,
                    unit: props.unit,
                    "font-size": props.iconFontSize,
                    _class: "pointer pb-12 pt-12 px-24",
                    color: unref(_homeColor),
                    onClick: goback,
                    name: "tmicon-angle-left"
                  }, null, 8, ["unit", "font-size", "color"])) : createCommentVNode("v-if", true),
                  _pages.value == 1 && !__props.hideHome ? (openBlock(), createBlock(tmIcon, {
                    key: 1,
                    unit: props.unit,
                    _class: "pointer  pb-12 pt-12 px-24",
                    onClick: backhome,
                    color: unref(_homeColor),
                    "font-size": props.iconFontSize,
                    name: "tmicon-md-home"
                  }, null, 8, ["unit", "color", "font-size"])) : createCommentVNode("v-if", true),
                  renderSlot(_ctx.$slots, "left")
                ], 4),
                createElementVNode("view", {
                  class: "flex flex-row-center-center",
                  style: normalizeStyle({ width: unref(contentwidth) + "px" })
                }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createVNode(__easycom_0$2, {
                      unit: props.unit,
                      _class: "text-weight-b text-overflow-1",
                      color: unref(_fontColor),
                      "font-size": props.fontSize,
                      label: unref(_title)
                    }, null, 8, ["unit", "color", "font-size", "label"])
                  ])
                ], 4),
                createElementVNode("view", {
                  class: "flex-row flex flex-row-center-end",
                  style: normalizeStyle({ width: unref(_rightWidth) + "rpx" })
                }, [
                  renderSlot(_ctx.$slots, "right")
                ], 4)
              ])
            ]),
            _: 3
          }, 8, ["blur", "color", "_class", "_style", "followTheme", "follow-dark", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "margin", "padding", "height", "width"])
        ], 4)
      ]);
    };
  }
});
var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-navbar/tm-navbar.vue"]]);
const baseUrl = "https://wx.jaycao.com/";
const request = (opts, data) => {
  uni.onNetworkStatusChange(function(res) {
    if (!res.isConnected) {
      uni.showToast({
        title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
        icon: "none"
      });
    }
    return false;
  });
  let httpDefaultOpts = {
    url: opts.url,
    data,
    method: opts.method,
    header: opts.method == "get" ? {
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    } : {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json; charset=UTF-8"
    },
    dataType: "json"
  };
  let promise = new Promise(function(resolve, reject) {
    uni.request(httpDefaultOpts).then((res) => {
      resolve(res);
    }).catch((response) => {
      reject(response);
    });
  });
  return promise;
};
const httpRequest = (opts, data) => {
  uni.showLoading({
    title: "\u52A0\u8F7D\u4E2D"
  });
  uni.onNetworkStatusChange(function(res) {
    if (!res.isConnected) {
      uni.showToast({
        title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
        icon: "none"
      });
    }
    return false;
  });
  let httpDefaultOpts = {
    url: baseUrl + opts.url,
    data,
    method: opts.method,
    header: opts.method == "get" ? {
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    } : {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json; charset=UTF-8"
    },
    dataType: "json"
  };
  let promise = new Promise(function(resolve, reject) {
    uni.request(httpDefaultOpts).then((res) => {
      uni.hideLoading();
      resolve(res);
    }).catch((response) => {
      uni.hideLoading();
      reject(response);
    });
  });
  return promise;
};
const httpTokenRequest = (opts, data) => {
  uni.onNetworkStatusChange(function(res) {
    if (!res.isConnected) {
      uni.showToast({
        title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
        icon: "none"
      });
    }
    return false;
  });
  let token = uni.getStorageSync("token");
  if (token == "" || token == void 0 || token == null) {
    uni.showToast({
      title: "\u8D26\u53F7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
      icon: "none",
      complete: function() {
        uni.setStorage({
          key: "login_id",
          data: false,
          success: () => {
            uni.reLaunch({
              url: "/pages/login/login"
            });
          }
        });
      }
    });
  } else {
    uni.showLoading({});
    let httpDefaultOpts = {
      url: baseUrl + opts.url,
      data,
      method: opts.method,
      header: opts.method == "get" ? {
        "Authorization": "wx " + token,
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      } : {
        "Authorization": "wx " + token,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json; charset=UTF-8"
      },
      dataType: "json"
    };
    let promise = new Promise(function(resolve, reject) {
      uni.request(httpDefaultOpts).then((res) => {
        if (res.data.code == 200) {
          uni.hideLoading();
          resolve(res);
        } else {
          uni.hideLoading();
          if (res.data.code == 401) {
            uni.showToast({
              title: "Token\u5DF2\u8FC7\u671F",
              icon: "none"
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/login/login"
              });
              uni.setStorageSync("login_id", false);
            }, 1e3);
          } else {
            uni.hideLoading();
            resolve(res);
          }
        }
      }).catch((response) => {
        uni.hideLoading();
        reject(response);
      });
    });
    return promise;
  }
};
const httpupload = (opts, data) => {
  uni.onNetworkStatusChange(function(res) {
    if (!res.isConnected) {
      uni.showToast({
        title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
        icon: "none"
      });
    }
    return false;
  });
  let token = uni.getStorageSync("token");
  if (token == "" || token == void 0 || token == null) {
    uni.showToast({
      title: "\u8D26\u53F7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
      icon: "none",
      complete: function() {
        uni.setStorage({
          key: "login_id",
          data: false,
          success: () => {
            uni.reLaunch({
              url: "/pages/login/login"
            });
          }
        });
      }
    });
  } else {
    let httpDefaultOpts = {
      url: baseUrl + opts.url,
      filePath: opts.filePath,
      name: "image",
      formData: {},
      header: {
        "Authorization": "wx " + token,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    let promise = new Promise(function(resolve, reject) {
      uni.uploadFile(httpDefaultOpts).then((res) => {
        if (res[1].data.code == 200) {
          resolve(res[1]);
        } else {
          if (res[1].data.code == 401) {
            uni.showToast({
              title: "Token\u5DF2\u8FC7\u671F",
              icon: "none"
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/login/login"
              });
              uni.setStorageSync("login_id", false);
            }, 1e3);
          } else {
            resolve(res[1]);
          }
        }
      }).catch((response) => {
        reject(response);
      });
    });
    return promise;
  }
};
const hadToken = () => {
  let token = uni.getStorageSync("token");
  if (token == "" || token == void 0 || token == null) {
    uni.showToast({
      title: "\u8D26\u53F7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
      icon: "none",
      complete: function() {
        uni.reLaunch({
          url: "/pages/login/login"
        });
      }
    });
    return false;
  }
  return true;
};
var request$1 = {
  baseUrl,
  httpRequest,
  httpTokenRequest,
  hadToken,
  request,
  httpupload
};
export { TabBar as T, __easycom_7 as _, __easycom_0 as a, request$1 as r, tmBadge as t };
