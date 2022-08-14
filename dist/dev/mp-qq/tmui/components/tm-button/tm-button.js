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
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
if (!Math) {
  (tmIcon + tmText + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-button",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    transprent: {
      type: Boolean,
      default: false
    },
    followTheme: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "normal"
    },
    fontSize: {
      type: Number,
      default: 0
    },
    fontColor: {
      type: String,
      default: ""
    },
    margin: {
      type: Array,
      default: () => [0, 16]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    shadow: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    block: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    formType: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: ""
    },
    appParameter: {
      type: String,
      default: ""
    },
    sessionFrom: {
      type: String,
      default: ""
    },
    sendMessageTitle: {
      type: String,
      default: ""
    },
    sendMessagePath: {
      type: String,
      default: ""
    },
    sendMessageImg: {
      type: String,
      default: ""
    },
    sendMessageCard: {
      type: String,
      default: ""
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "tap", "longpress", "getphonenumber", "getUserInfo", "getUserProfile", "error", "opensetting", "launchapp", "contact"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const { proxy } = common_vendor.getCurrentInstance();
    const formtype = common_vendor.computed$1(() => props.formType);
    let FormParent = null;
    if (formtype.value == "reset" || formtype.value == "submit") {
      FormParent = proxy == null ? void 0 : proxy.$parent;
      while (FormParent) {
        if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
          break;
        } else {
          FormParent = (_a = FormParent == null ? void 0 : FormParent.$parent) != null ? _a : void 0;
        }
      }
    }
    const customCSSStyle = common_vendor.computed$1(() => {
      return __spreadValues({ height: btnSizeObj.value.h + props.unit }, tmui_tool_lib_minxs.computedStyle(props));
    });
    const customClass = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedClass(props));
    const isclickOn = common_vendor.ref(false);
    const _load = common_vendor.computed$1(() => props.loading);
    const _disabled = common_vendor.computed$1(() => props.disabled);
    const _label = common_vendor.computed$1(() => props.label);
    const _icon = common_vendor.computed$1(() => props.icon);
    const sizeObj = common_vendor.computed$1(() => {
      if (props.unit == "px") {
        return {
          block: { w: 0, h: 80, fontSize: 28, round: 3 },
          mini: { w: 44, h: 18, fontSize: 10, round: 2 },
          small: { w: 60, h: 28, fontSize: 11, round: 3 },
          normal: { w: 110, h: 40, fontSize: 14, round: 3 },
          middle: { w: 180, h: 40, fontSize: 15, round: 3 },
          large: { w: 268, h: 44, fontSize: 16, round: 4 }
        };
      }
      return {
        block: { w: 0, h: 80, fontSize: 28, round: 3 },
        mini: { w: 88, h: 36, fontSize: 20, round: 2 },
        small: { w: 120, h: 56, fontSize: 22, round: 3 },
        normal: { w: 220, h: 80, fontSize: 28, round: 3 },
        middle: { w: 360, h: 80, fontSize: 30, round: 3 },
        large: { w: 535, h: 88, fontSize: 32, round: 4 }
      };
    });
    const btnSizeObj = common_vendor.computed$1(() => {
      let fontSize = props.fontSize || 0;
      if (props.block) {
        return { w: 0, h: props.height || sizeObj.value.block.h, fontSize: fontSize || sizeObj.value.block.fontSize, round: props.round == -1 ? 0 : props.round || sizeObj.value.normal.round };
      }
      return {
        w: props.width || sizeObj.value[props.size].w,
        h: props.height || sizeObj.value[props.size].h,
        fontSize: fontSize || sizeObj.value[props.size].fontSize,
        round: props.round == -1 ? 0 : props.round || sizeObj.value[props.size].round
      };
    });
    const _fontColor = common_vendor.computed$1(() => props.fontColor);
    function touchstart(e) {
      isclickOn.value = true;
      emits("touchstart", e);
    }
    function touchend(e) {
      isclickOn.value = false;
      emits("touchend", e);
    }
    function onclick(e) {
      if (FormParent != null && typeof FormParent != "undefined" && formtype.value && !props.loading) {
        FormParent[formtype.value]();
      }
      emits("click", e);
      if (props.url !== "" && typeof props.url === "string") {
        let url = props.url;
        if (url[0] !== "/")
          url = "/" + url;
        common_vendor.index.navigateTo({
          url
        });
        return;
      }
      if (props.openType == "getUserInfo" || props.openType == "getUserProfile")
        ;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_icon)
      }, common_vendor.unref(_icon) ? {
        b: common_vendor.p({
          userInteractionEnabled: false,
          color: common_vendor.unref(_fontColor),
          _class: common_vendor.unref(_label) ? "pr-10" : "",
          unit: props.unit,
          fontSize: common_vendor.unref(btnSizeObj).fontSize * 0.9,
          name: common_vendor.unref(_icon)
        })
      } : {}, {
        c: common_vendor.p({
          userInteractionEnabled: false,
          color: common_vendor.unref(_fontColor),
          fontSize: common_vendor.unref(btnSizeObj).fontSize,
          unit: props.unit,
          label: common_vendor.unref(_label)
        }),
        d: common_vendor.o(onclick),
        e: common_vendor.o(touchstart),
        f: common_vendor.o(touchend),
        g: common_vendor.o(($event) => emits("longpress", $event)),
        h: common_vendor.o(($event) => {
          isclickOn.value = false;
          emits("touchcancel", $event);
        }),
        i: common_vendor.o(($event) => emits("touchmove", $event)),
        j: common_vendor.o(($event) => emits("getphonenumber", $event)),
        k: common_vendor.o(($event) => emits("error", $event)),
        l: common_vendor.o(($event) => emits("opensetting", $event)),
        m: common_vendor.o(($event) => emits("launchapp", $event)),
        n: common_vendor.o(($event) => emits("contact", $event)),
        o: props.formType,
        p: props.openType,
        q: props.appParameter,
        r: props.sessionFrom,
        s: props.sendMessageTitle,
        t: props.sendMessagePath,
        v: props.sendMessageImg,
        w: props.sendMessageCard,
        x: common_vendor.unref(_load),
        y: common_vendor.unref(_disabled),
        z: common_vendor.n(common_vendor.unref(customClass)),
        A: common_vendor.s(common_vendor.unref(customCSSStyle)),
        B: common_vendor.p({
          ["no-level"]: true,
          _style: [{
            opacity: isclickOn.value || common_vendor.unref(_disabled) ? 0.7 : 1
          }],
          ["hover-class"]: "bhover",
          round: common_vendor.unref(btnSizeObj).round,
          width: common_vendor.unref(btnSizeObj).w,
          height: common_vendor.unref(btnSizeObj).h,
          padding: props.padding,
          margin: props.margin,
          color: props.color,
          shadow: props.shadow,
          transprent: props.transprent,
          linear: props.linear,
          ["linear-deep"]: props.linearDeep,
          text: props.text,
          outlined: props.outlined,
          dark: props.dark,
          ["follow-dark"]: props.followDark,
          ["follow-theme"]: props.followTheme,
          ["border-direction"]: props.borderDirection,
          ["border-style"]: props.borderStyle,
          border: props.border,
          blur: props.blur,
          unit: props.unit,
          _class: "flex flex-row flex-center pointer"
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fbe2c206"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-button/tm-button.vue"]]);
qq.createComponent(Component);
