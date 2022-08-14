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
  (tmIcon + tmText + TmButton + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const TmButton = () => "../tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-input",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "grey-4"
    },
    focusColor: {
      type: String,
      default: "primary"
    },
    fontColor: {
      type: String,
      default: ""
    },
    text: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    border: {
      type: Number,
      default: 0
    },
    transprent: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 3
    },
    shadow: {
      type: Number,
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
      type: Number,
      default: 64
    },
    prefix: {
      type: String,
      default: ""
    },
    prefixLabel: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    suffixLabel: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 30
    },
    search: {
      type: String,
      default: ""
    },
    searchLabel: {
      type: String,
      default: ""
    },
    showClear: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    errorLabel: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    align: {
      type: String,
      default: "left"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputPadding: {
      type: Array,
      default: () => [24, 0]
    },
    showCharNumber: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: "text"
    },
    cursorSpacing: {
      type: Number,
      default: 24
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    autoBlur: {
      type: Boolean,
      default: true
    },
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    adjustPosition: {
      type: Boolean,
      default: true
    },
    focus: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: Number,
      default: 0
    },
    showConfirmBar: {
      type: Boolean,
      default: true
    },
    selectionStart: {
      type: Number,
      default: -1
    },
    selectionEnd: {
      type: Number,
      default: -1
    },
    disableDefaultPadding: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", "click"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const { proxy } = common_vendor.getCurrentInstance();
    let parentFormItem = proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_a = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _a : void 0;
      }
    }
    const isAndroid = common_vendor.ref(false);
    isAndroid.value = common_vendor.index.getSystemInfoSync().platform == "android" ? true : false;
    const _height = common_vendor.computed$1(() => props.height);
    const _inputPadding = common_vendor.computed$1(() => {
      if (props.search !== "" || props.searchLabel !== "") {
        return [4, 0];
      }
      return props.inputPadding;
    });
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
    const propsDetail = common_vendor.computed$1(() => {
      return {
        focus: props.focus,
        prefix: props.prefix,
        prefixLabel: props.prefixLabel,
        fontSize: props.fontSize,
        fontSize_px: common_vendor.index.upx2px(props.fontSize),
        suffix: props.suffix,
        suffixLabel: props.suffixLabel,
        fontColor: props.fontColor,
        search: props.search,
        searchLabel: props.searchLabel,
        showClear: props.showClear,
        password: props.password,
        disabled: props.disabled,
        placeholder: props.placeholder,
        showCharNumber: props.showCharNumber,
        maxlength: props.maxlength,
        cursorSpacing: props.cursorSpacing,
        confirmType: props.confirmType,
        confirmHold: props.confirmHold,
        autoBlur: props.autoBlur,
        holdKeyboard: props.holdKeyboard,
        adjustPosition: props.adjustPosition,
        type: props.type,
        cursor: props.cursor,
        showConfirmBar: props.showConfirmBar,
        selectionStart: props.selectionStart,
        selectionEnd: props.selectionEnd,
        disableDefaultPadding: props.disableDefaultPadding,
        fixed: props.fixed
      };
    });
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    common_vendor.computed$1(() => tmui_tool_lib_minxs.computedStyle(props));
    common_vendor.computed$1(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const _requiredError = common_vendor.ref(false);
    const _foucsActive = common_vendor.ref(props.focus || false);
    common_vendor.watch(() => props.focus, () => {
      _foucsActive.value = props.focus;
    });
    const _color = common_vendor.computed$1(() => {
      let color = props.color;
      if (_foucsActive.value) {
        if (props.followTheme && store.tmStore.color) {
          color = store.tmStore.color;
        } else {
          color = props.focusColor;
        }
      }
      if (_requiredError.value)
        color = "red";
      return color;
    });
    const tmcomputed = common_vendor.computed$1(() => {
      const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
      return tmui_tool_lib_minxs.computedTheme(_props, isDark.value, tmcfg.value);
    });
    const showPasswordText = common_vendor.ref(propsDetail.value.password);
    const showPasswordIcon = common_vendor.computed$1(() => props.password);
    common_vendor.ref(props.errorLabel);
    const _value = common_vendor.ref(props.modelValue);
    const _valueLenChar = common_vendor.computed$1(() => {
      let str = String(_value.value).split("");
      return str.length;
    });
    common_vendor.watch(() => props.modelValue, () => _value.value = props.modelValue);
    const rulesObj = common_vendor.inject("tmFormItemRules", common_vendor.computed$1(() => {
      var _a2;
      return [{
        message: (_a2 = props == null ? void 0 : props.errorLabel) != null ? _a2 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
        required: false,
        validator: false
      }];
    }));
    function searchClick() {
      emits("search", _value.value);
    }
    function clearBtn() {
      _value.value = "";
      emits("update:modelValue", "");
      emits("clear");
    }
    function changeSeePassword() {
      showPasswordText.value = !showPasswordText.value;
    }
    function focus() {
      _foucsActive.value = true;
      emits("focus");
    }
    function blur() {
      _foucsActive.value = false;
      pushFormItem();
      emits("blur");
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function inputHandler(e) {
      _value.value = e.detail.value;
      emits("input", e.detail.value);
      emits("update:modelValue", e.detail.value);
      return e.detail.value;
    }
    function inputClick(e, type) {
      e.stopPropagation();
      debounce(() => emits("click", e), 150, true);
    }
    common_vendor.watch(_value, () => debounce(pushFormItem, 150));
    const tmFormFun = common_vendor.inject("tmFormFun", common_vendor.computed$1(() => ""));
    const validate = (rules) => {
      rules = rules.map((el) => {
        if (typeof el.validator === "function" && el.required === true) {
          return el;
        } else if (typeof el.validator === "boolean" && el.required === true) {
          return __spreadProps(__spreadValues({}, el), {
            validator: (val) => {
              return String(val).length == 0 || typeof val === null ? false : true;
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
            let vr = await el.validator(_value.value);
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
              value: _value.value,
              isRequiredError: false,
              componentsName: "tm-input",
              message: ev.length == 0 ? "" : ev[0].message
            });
          }).catch((er) => {
            parentFormItem.pushCom({
              value: _value.value,
              isRequiredError: true,
              componentsName: "tm-input",
              message: er.message
            });
          });
        }
      }
    }
    common_vendor.watch(tmFormFun, () => {
      if (tmFormFun.value == "validate") {
        pushFormItem();
      }
      if (tmFormFun.value == "reset") {
        _value.value = "";
        _requiredError.value = false;
        emits("update:modelValue", _value.value);
        pushFormItem(false);
      }
      if (tmFormFun.value == "clearValidate") {
        _requiredError.value = false;
        pushFormItem(false);
      }
    });
    pushFormItem(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel
      }, common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel ? {} : {}, {
        b: common_vendor.unref(propsDetail).prefix
      }, common_vendor.unref(propsDetail).prefix ? {
        c: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          name: common_vendor.unref(propsDetail).prefix
        })
      } : {}, {
        d: common_vendor.unref(propsDetail).prefixLabel
      }, common_vendor.unref(propsDetail).prefixLabel ? {
        e: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          label: common_vendor.unref(propsDetail).prefixLabel
        })
      } : {}, {
        f: !isAndroid.value
      }, !isAndroid.value ? common_vendor.e({
        g: common_vendor.unref(propsDetail).type != "textarea"
      }, common_vendor.unref(propsDetail).type != "textarea" ? {
        h: _value.value,
        i: common_vendor.unref(propsDetail).focus,
        j: common_vendor.o(focus),
        k: common_vendor.o(blur),
        l: common_vendor.o(confirm),
        m: common_vendor.o(inputHandler),
        n: common_vendor.o(($event) => emits("keyboardheightchange")),
        o: showPasswordText.value,
        p: common_vendor.unref(propsDetail).maxlength,
        q: common_vendor.unref(propsDetail).disabled,
        r: common_vendor.unref(propsDetail).cursorSpacing,
        s: common_vendor.unref(propsDetail).confirmType,
        t: common_vendor.unref(propsDetail).confirmHold,
        v: common_vendor.unref(propsDetail).autoBlur,
        w: common_vendor.unref(propsDetail).holdKeyboard,
        x: common_vendor.unref(propsDetail).adjustPosition,
        y: common_vendor.unref(propsDetail).type,
        z: common_vendor.unref(propsDetail).placeholder,
        A: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        B: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px`
      } : {}, {
        C: common_vendor.unref(propsDetail).type == "textarea"
      }, common_vendor.unref(propsDetail).type == "textarea" ? {
        D: _value.value,
        E: common_vendor.unref(propsDetail).focus,
        F: common_vendor.o(focus),
        G: common_vendor.o(blur),
        H: common_vendor.o(confirm),
        I: common_vendor.o(inputHandler),
        J: common_vendor.o(($event) => emits("keyboardheightchange")),
        K: common_vendor.unref(propsDetail).maxlength,
        L: common_vendor.unref(propsDetail).disabled,
        M: common_vendor.unref(propsDetail).placeholder,
        N: common_vendor.unref(propsDetail).cursorSpacing,
        O: common_vendor.unref(propsDetail).confirmHold,
        P: common_vendor.unref(propsDetail).autoBlur,
        Q: common_vendor.unref(propsDetail).holdKeyboard,
        R: common_vendor.unref(propsDetail).cursor,
        S: common_vendor.unref(propsDetail).showConfirmBar,
        T: common_vendor.unref(propsDetail).selectionStart,
        U: common_vendor.unref(propsDetail).selectionEnd,
        V: common_vendor.unref(propsDetail).disableDefaultPadding,
        W: common_vendor.unref(propsDetail).fixed,
        X: common_vendor.unref(propsDetail).adjustPosition,
        Y: common_vendor.unref(propsDetail).type,
        Z: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          width: "auto",
          "word-break": "break-word",
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        aa: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px`
      } : {}, {
        ab: common_vendor.o(inputClick),
        ac: common_vendor.s({
          width: "0px"
        })
      }) : {}, {
        ad: isAndroid.value
      }, isAndroid.value ? common_vendor.e({
        ae: common_vendor.unref(propsDetail).type != "textarea"
      }, common_vendor.unref(propsDetail).type != "textarea" ? {
        af: common_vendor.o(($event) => emits("click", $event)),
        ag: _value.value,
        ah: common_vendor.unref(propsDetail).focus,
        ai: common_vendor.o(focus),
        aj: common_vendor.o(blur),
        ak: common_vendor.o(confirm),
        al: common_vendor.o(inputHandler),
        am: common_vendor.o(($event) => emits("keyboardheightchange")),
        an: showPasswordText.value,
        ao: common_vendor.unref(propsDetail).disabled,
        ap: common_vendor.unref(propsDetail).cursorSpacing,
        aq: common_vendor.unref(propsDetail).confirmType,
        ar: common_vendor.unref(propsDetail).confirmHold,
        as: common_vendor.unref(propsDetail).autoBlur,
        at: common_vendor.unref(propsDetail).holdKeyboard,
        av: common_vendor.unref(propsDetail).adjustPosition,
        aw: common_vendor.unref(propsDetail).maxlength,
        ax: common_vendor.unref(propsDetail).type,
        ay: common_vendor.unref(propsDetail).placeholder,
        az: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        aA: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px`
      } : {}, {
        aB: common_vendor.unref(propsDetail).type == "textarea"
      }, common_vendor.unref(propsDetail).type == "textarea" ? {
        aC: common_vendor.o(($event) => emits("click", $event)),
        aD: _value.value,
        aE: common_vendor.unref(propsDetail).focus,
        aF: common_vendor.o(focus),
        aG: common_vendor.o(blur),
        aH: common_vendor.o(confirm),
        aI: common_vendor.o(inputHandler),
        aJ: common_vendor.o(($event) => emits("keyboardheightchange")),
        aK: common_vendor.unref(propsDetail).disabled,
        aL: common_vendor.unref(propsDetail).placeholder,
        aM: common_vendor.unref(propsDetail).cursorSpacing,
        aN: common_vendor.unref(propsDetail).confirmHold,
        aO: common_vendor.unref(propsDetail).autoBlur,
        aP: common_vendor.unref(propsDetail).holdKeyboard,
        aQ: common_vendor.unref(propsDetail).adjustPosition,
        aR: common_vendor.unref(propsDetail).maxlength,
        aS: common_vendor.unref(propsDetail).autoHeight,
        aT: common_vendor.unref(propsDetail).cursor,
        aU: common_vendor.unref(propsDetail).showConfirmBar,
        aV: common_vendor.unref(propsDetail).selectionStart,
        aW: common_vendor.unref(propsDetail).selectionEnd,
        aX: common_vendor.unref(propsDetail).disableDefaultPadding,
        aY: common_vendor.unref(propsDetail).fixed,
        aZ: common_vendor.unref(propsDetail).type,
        ba: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          width: "auto",
          "word-break": "break-word",
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        bb: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px`
      } : {}, {
        bc: common_vendor.s({
          width: "0px"
        })
      }) : {}, {
        bd: common_vendor.unref(propsDetail).showClear && common_vendor.unref(_valueLenChar) > 0
      }, common_vendor.unref(propsDetail).showClear && common_vendor.unref(_valueLenChar) > 0 ? {
        be: common_vendor.o(clearBtn),
        bf: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize * 0.9,
          name: "tmicon-times-circle-fill"
        })
      } : {}, {
        bg: _requiredError.value
      }, _requiredError.value ? {
        bh: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          name: "tmicon-exclamation-circle"
        })
      } : {}, {
        bi: common_vendor.unref(propsDetail).suffix
      }, common_vendor.unref(propsDetail).suffix ? {
        bj: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize * 0.85,
          name: common_vendor.unref(propsDetail).suffix
        })
      } : {}, {
        bk: common_vendor.unref(propsDetail).suffixLabel
      }, common_vendor.unref(propsDetail).suffixLabel ? {
        bl: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          label: common_vendor.unref(propsDetail).suffixLabel
        })
      } : {}, {
        bm: common_vendor.unref(showPasswordIcon)
      }, common_vendor.unref(showPasswordIcon) ? {
        bn: common_vendor.o(changeSeePassword),
        bo: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
        })
      } : {}, {
        bp: common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type != "textarea"
      }, common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type != "textarea" ? common_vendor.e({
        bq: common_vendor.p({
          label: common_vendor.unref(_valueLenChar)
        }),
        br: common_vendor.unref(propsDetail).maxlength > 0
      }, common_vendor.unref(propsDetail).maxlength > 0 ? {
        bs: common_vendor.p({
          label: "/" + common_vendor.unref(propsDetail).maxlength
        })
      } : {}) : {}, {
        bt: common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type == "textarea"
      }, common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type == "textarea" ? common_vendor.e({
        bv: common_vendor.p({
          label: common_vendor.unref(_valueLenChar)
        }),
        bw: common_vendor.unref(propsDetail).maxlength > 0
      }, common_vendor.unref(propsDetail).maxlength > 0 ? {
        bx: common_vendor.p({
          label: "/" + common_vendor.unref(propsDetail).maxlength
        })
      } : {}) : {}, {
        by: common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel
      }, common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel ? {
        bz: common_vendor.o(searchClick),
        bA: common_vendor.p({
          followTheme: props.followTheme,
          color: props.focusColor,
          ["font-size"]: 24,
          height: common_vendor.unref(_height) - 11,
          padding: [16, 0],
          block: true,
          margin: [0, 0],
          icon: common_vendor.unref(propsDetail).search,
          label: common_vendor.unref(propsDetail).searchLabel
        })
      } : {}, {
        bB: common_vendor.o(($event) => inputClick($event)),
        bC: common_vendor.n(common_vendor.unref(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"),
        bD: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`
        }),
        bE: common_vendor.p({
          transprent: props.transprent,
          round: props.round,
          ["no-level"]: true,
          margin: [0, 0],
          padding: common_vendor.unref(_inputPadding),
          border: props.border,
          text: props.text,
          color: common_vendor.unref(_color),
          outlined: props.outlined,
          shadow: props.shadow,
          linear: props.linear,
          linearDeep: props.linearDeep
        }),
        bF: common_vendor.p({
          transprent: true,
          margin: props.margin,
          padding: props.padding
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f58feaf"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-input/tm-input.vue"]]);
qq.createComponent(Component);
