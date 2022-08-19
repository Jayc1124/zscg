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
  (tmIcon + TmText)();
}
const tmIcon = () => "../tm-icon/tm-icon.js";
const TmText = () => "../tm-text/tm-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-rate",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    count: {
      type: Number,
      default: 5
    },
    modelvalue: {
      type: Number,
      default: 0
    },
    defaultValue: {
      type: Number,
      default: 0
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "tmicon-collection-fill"
    },
    size: {
      type: Number,
      default: 42
    },
    color: {
      type: [Array, String],
      default: "orange"
    },
    gutter: {
      type: Number,
      default: 16
    },
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    dark: {
      type: [Boolean, String],
      default: false
    },
    followDark: {
      type: [Boolean, String],
      default: true
    },
    label: {
      type: String,
      default: ""
    },
    showLabel: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click", "change", "update:modelValue"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _count = common_vendor.computed$1(() => props.count);
    const _start = common_vendor.ref(props.defaultValue);
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const _color = common_vendor.computed$1(() => {
      if (props.followTheme && tmcfg.value.color)
        return tmcfg.value.color;
      if (typeof props.color == "string")
        return props.color;
      if (Array.isArray(props.color)) {
        if (props.color[_start.value - 1]) {
          return props.color[_start.value - 1];
        }
        return props.color[props.color.length - 1];
      }
      return "grey-2";
    });
    const _label = common_vendor.computed$1(() => {
      if (props.label != "")
        return props.label;
      return _start.value + ".0";
    });
    common_vendor.watch(() => props.modelvalue, () => {
      let valueStart = props.modelvalue >= _count.value ? _count.value : props.modelvalue;
      _start.value = valueStart <= 0 ? 0 : valueStart;
    });
    function startClick(index) {
      if (props.disabled)
        return;
      if (props.readonly) {
        emits("click", index - 1);
        return;
      }
      _start.value = index;
      emits("change", _start.value);
      emits("update:modelValue", _start.value);
      emits("click", index - 1);
      pushFormItem();
    }
    const rulesObj = common_vendor.inject("tmFormItemRules", common_vendor.computed$1(() => {
      return [
        {
          message: "\u8BF7\u9009\u62E9",
          required: false,
          validator: false
        }
      ];
    }));
    let parentFormItem = proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    const validate = (rules) => {
      rules = rules.map((el) => {
        if (typeof el.validator === "function" && el.required === true) {
          return el;
        } else if (typeof el.validator === "boolean" && el.required === true) {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return val == 0 ? false : true;
            }
          });
        } else {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return true;
            }
          });
        }
      });
      let rules_filter = rules.filter((el) => {
        return typeof el.validator === "function" && el.required === true;
      });
      let rules_fun = rules_filter.map((el) => {
        return new Promise(async (res, rej) => {
          if (typeof el.validator === "function") {
            let vr = await el.validator(_start.value);
            if (vr) {
              res({
                message: String(el.message),
                validator: true
              });
            } else {
              rej({
                message: el.message,
                validator: false
              });
            }
          } else {
            res({
              message: el.message,
              validator: true
            });
          }
        });
      });
      return Promise.all(rules_fun);
    };
    async function pushFormItem(isCheckVail = true) {
      if (parentFormItem) {
        if (isCheckVail) {
          validate(common_vendor.toRaw(rulesObj.value)).then((ev) => {
            parentFormItem.pushCom({
              value: _start.value,
              isRequiredError: false,
              componentsName: "tm-rate",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _start.value,
              isRequiredError: true,
              componentsName: "tm-rate",
              message: er.message
            });
          });
        }
      }
    }
    pushFormItem();
    const tmFormFun = common_vendor.inject("tmFormFun", common_vendor.computed$1(() => ""));
    common_vendor.watch(tmFormFun, () => {
      if (tmFormFun.value == "reset") {
        _start.value = 0;
        emits("update:modelValue", _start.value);
        pushFormItem(false);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(_count), (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => startClick(item)),
            b: "11c50f3d-0-" + i0,
            c: common_vendor.p({
              ["follow-dark"]: false,
              color: item <= _start.value ? common_vendor.unref(_color) : "grey-2",
              ["font-size"]: props.size,
              name: props.icon
            }),
            d: item
          };
        }),
        b: common_vendor.n(`pr-${__props.gutter}`),
        c: common_vendor.n(props.disabled ? "opacity-5" : ""),
        d: __props.showLabel
      }, __props.showLabel ? {
        e: common_vendor.p({
          dark: common_vendor.unref(isDark),
          color: common_vendor.unref(_color),
          label: common_vendor.unref(_label)
        })
      } : {}, {
        f: common_vendor.o(() => {
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-rate/tm-rate.vue"]]);
wx.createComponent(Component);
