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
  (tmText + tmIcon + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-badge",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
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
    const customCSSStyle = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedClass(props));
    const istext = common_vendor.computed$1(() => {
      return isNaN(parseInt(String(props.count)));
    });
    const show = common_vendor.computed$1(() => {
      if (!props.dot && !props.icon && !props.count)
        return false;
      return true;
    });
    const size = common_vendor.computed$1(() => {
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
    const _icon = common_vendor.computed$1(() => props.icon);
    const _dot = common_vendor.computed$1(() => props.dot);
    const _count = common_vendor.computed$1(() => props.count);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !props.status
      }, !props.status ? {} : {}, {
        b: common_vendor.unref(show)
      }, common_vendor.unref(show) ? common_vendor.e({
        c: common_vendor.unref(_count) > 0 && !common_vendor.unref(istext)
      }, common_vendor.unref(_count) > 0 && !common_vendor.unref(istext) ? {
        d: common_vendor.p({
          color: "white",
          ["font-size"]: props.fontSize,
          _class: common_vendor.unref(size).h == 0 ? "py-3 px-8" : "",
          label: common_vendor.unref(_count) > props.maxCount ? props.maxCount + "+" : common_vendor.unref(_count)
        })
      } : {}, {
        e: common_vendor.unref(_count) && common_vendor.unref(istext)
      }, common_vendor.unref(_count) && common_vendor.unref(istext) ? {
        f: common_vendor.p({
          color: "white",
          ["font-size"]: props.fontSize,
          _class: common_vendor.unref(size).h == 0 ? "py-3 px-8" : "",
          label: common_vendor.unref(_count)
        })
      } : {}, {
        g: common_vendor.unref(_icon)
      }, common_vendor.unref(_icon) ? {
        h: common_vendor.p({
          color: "white",
          ["font-size"]: props.fontSize,
          name: common_vendor.unref(_icon)
        })
      } : {}, {
        i: common_vendor.o(($event) => emits("click", $event)),
        j: common_vendor.p({
          color: props.color,
          _class: [common_vendor.unref(customClass), "flex-center flex-col"],
          _style: [common_vendor.unref(customCSSStyle), {
            flexShrink: 1
          }],
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
          width: common_vendor.unref(size).w,
          height: common_vendor.unref(size).h,
          margin: props.margin,
          padding: props.padding
        }),
        k: common_vendor.n((common_vendor.unref(_dot) || common_vendor.unref(_count) || common_vendor.unref(_icon)) && !props.status ? "absolute flex-top-start-end r-0" : "")
      }) : {}, {
        l: props.status
      }, props.status ? {
        m: common_vendor.p({
          ["font-size"]: props.fontSize,
          _class: "ml-10",
          label: props.label
        })
      } : {}, {
        n: common_vendor.n(props.status ? "flex-row flex-row-center-center mx-8" : "")
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-badge/tm-badge.vue"]]);
qq.createComponent(Component);
