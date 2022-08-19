"use strict";
var __defProp = Object.defineProperty;
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
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (tmText + tmButton + tmSheet + tmDrawer)();
}
const tmDrawer = () => "../tm-drawer/tm-drawer.js";
const tmButton = () => "../tm-button/tm-button.js";
const tmText = () => "../tm-text/tm-text.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-action-menu",
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    rangKey: {
      type: String,
      default: "text"
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    activeFontColor: {
      type: String,
      default: "primary"
    },
    active: {
      type: Number,
      default: NaN
    },
    allowClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue", "update:active", "change", "cancel"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c, _d;
    const props = __props;
    const drawer = common_vendor.ref(null);
    const show = common_vendor.ref((_a = props == null ? void 0 : props.modelValue) != null ? _a : false);
    const _active = common_vendor.ref(props.active);
    const _list = common_vendor.computed$1(() => {
      var _a2;
      let plist = (_a2 = props == null ? void 0 : props.list) != null ? _a2 : [];
      let listdata = [];
      listdata = plist.map((el) => {
        let d = {};
        if (typeof el == "string" || typeof el == "number") {
          d.text = el;
          d.disabled = false;
        } else if (typeof el == "object") {
          d.text = el[props.rangKey];
          d = __spreadValues(__spreadValues({}, d), el);
        }
        return d;
      });
      return listdata;
    });
    let win_bottom = (_d = (_c = (_b = common_vendor.index.getSystemInfoSync()) == null ? void 0 : _b.safeAreaInsets) == null ? void 0 : _c.bottom) != null ? _d : 0;
    const cHeight = common_vendor.computed$1(() => {
      let len = _list.value.length + 1;
      return len * 80 + 180 + win_bottom;
    });
    const _color = common_vendor.computed$1(() => props.color);
    common_vendor.watchEffect(() => {
      show.value = props.modelValue;
    });
    common_vendor.watch(() => props.active, () => {
      _active.value = props.active;
    });
    function change(item, index) {
      var _a2;
      emits("change", item, index);
      _active.value = index;
      emits("update:active", index);
      if (props.allowClose) {
        (_a2 = drawer.value) == null ? void 0 : _a2.close();
      }
    }
    function cancel() {
      var _a2;
      emits("cancel");
      (_a2 = drawer.value) == null ? void 0 : _a2.close();
    }
    function drawerClose() {
      emits("update:modelValue", false);
    }
    function drawerOpen() {
      emits("update:modelValue", true);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          _class: "opacity-5 text-align-center",
          ["font-size"]: 24,
          label: "\u8BF7\u9009\u62E9"
        }),
        b: common_vendor.f(common_vendor.unref(_list), (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => change(item, index), index),
            b: index,
            c: "480436da-3-" + i0 + ",480436da-1",
            d: common_vendor.p({
              transprent: true,
              fontColor: _active.value == index ? props.activeFontColor : "",
              followTheme: false,
              disabled: item.disabled,
              label: item.text,
              ["font-size"]: 28,
              margin: [0, 0],
              color: "white",
              block: true,
              shadow: 0,
              round: -1
            })
          };
        }),
        c: common_vendor.p({
          round: 2
        }),
        d: common_vendor.o(cancel),
        e: common_vendor.p({
          round: 5,
          fontColor: props.activeFontColor,
          followTheme: false,
          label: "\u53D6\u6D88",
          ["font-size"]: 28,
          margin: [32, 8],
          color: common_vendor.unref(_color),
          block: true,
          shadow: 0
        }),
        f: common_vendor.o(() => {
        }),
        g: common_vendor.sr(drawer, "480436da-0", {
          "k": "drawer"
        }),
        h: common_vendor.o(drawerClose),
        i: common_vendor.o(drawerOpen),
        j: common_vendor.o(($event) => show.value = $event),
        k: common_vendor.p({
          height: common_vendor.unref(cHeight),
          show: show.value,
          transprent: true,
          ["hide-header"]: true
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-action-menu/tm-action-menu.vue"]]);
wx.createComponent(Component);
