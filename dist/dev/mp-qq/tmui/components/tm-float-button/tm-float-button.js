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
  (tmIcon + tmText + tmButton + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const tmButton = () => "../tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-float-button",
  props: {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    position: {
      type: String,
      default: "br",
      validator: (val) => {
        let isv = ["bc", "bl", "br", "tc", "tl", "tr"].includes(val);
        if (!isv) {
          console.error("\u4F4D\u7F6E\u53C2\u6570\u4E3A:'bc','bl','br','tc','tl','tr'\u5176\u4E2D\u7684\u4E00\u9879");
        }
        return isv;
      }
    },
    actionsPos: {
      type: String,
      default: "top",
      validator: (val) => {
        let isv = ["left", "right", "top", "bottom"].includes(val);
        if (!isv) {
          console.error("\u4F4D\u7F6E\u53C2\u6570\u4E3A:'left','right','top','bottom'\u5176\u4E2D\u7684\u4E00\u9879");
        }
        return isv;
      }
    },
    width: {
      type: Number,
      default: 112
    },
    height: {
      type: Number,
      default: 112
    },
    offset: {
      type: Array,
      default: () => [32, 32]
    },
    actions: {
      type: Array,
      default: () => []
    },
    btn: {
      type: Object,
      default: () => {
      },
      required: true
    },
    showActions: {
      type: Boolean,
      default: false
    },
    clickHidnActions: {
      type: Boolean,
      default: true
    }
  },
  emits: ["click", "change"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    let { windowTop, windowWidth } = common_vendor.index.getSystemInfoSync();
    windowTop = windowTop || 0;
    const isH5 = common_vendor.ref(false);
    const showActions = common_vendor.ref((_a = props.showActions) != null ? _a : false);
    const BtnPos = common_vendor.computed$1(() => props.position);
    const AcionPos = common_vendor.computed$1(() => props.actionsPos);
    const _offset = common_vendor.computed$1(() => {
      var _a2;
      let ost = (_a2 = props.offset) != null ? _a2 : [0, 0];
      return ost;
    });
    const centerPosLeft = common_vendor.computed$1(() => {
      let ps = (windowWidth - common_vendor.index.upx2px(props.width * 1.5)) / 2 + common_vendor.index.upx2px(_offset.value[0]);
      ps = (windowWidth - common_vendor.index.upx2px(props.width * 2)) / 2 + common_vendor.index.upx2px(_offset.value[0]);
      return ps;
    });
    const _btn = common_vendor.computed$1(() => {
      var _a2;
      return __spreadValues({ icon: "tmicon-plus", fontSize: 20, color: "primary", linear: "", linearDeep: "accent", label: "", iconSize: 42, fontColor: "" }, (_a2 = props.btn) != null ? _a2 : {});
    });
    const _actionsItem = common_vendor.computed$1(() => {
      let asbtn = props.actions.map((el) => {
        let default_btn = { icon: "tmicon-plus", fontSize: 20, color: "primary", linear: "", linearDeep: "accent", label: "", fontColor: "", iconSize: 36 };
        return __spreadValues(__spreadValues({}, default_btn), el);
      });
      return asbtn;
    });
    const AcionPos_xy = common_vendor.computed$1(() => {
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bc") && AcionPos.value == "bottom") {
        return { top: `${props.height}rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
      }
      if ((BtnPos.value == "bl" || BtnPos.value == "br") && AcionPos.value == "bottom") {
        return { top: `${props.height}rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
      }
      if ((BtnPos.value == "bl" || BtnPos.value == "br") && AcionPos.value == "top") {
        return { top: `0px`, dispaly: "flex", "flex-direction": "column-reverse" };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bc") && AcionPos.value == "top") {
        return { top: `-0rpx`, height: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "column" };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tc" || BtnPos.value == "bl" || BtnPos.value == "br" || BtnPos.value == "bc") && AcionPos.value == "right") {
        return { left: `${props.height}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row" };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc" || BtnPos.value == "bl" || BtnPos.value == "br" || BtnPos.value == "bc") && AcionPos.value == "left") {
        return { right: `${props.height}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row-reverse" };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "right") {
        return { right: `${0}rpx`, width: props.actions.length * props.height + "rpx", dispaly: "flex", "flex-direction": "row" };
      }
    });
    const parent_style = common_vendor.computed$1(() => {
      let height_width = showActions.value ? (props.actions.length + 1) * props.height : props.height;
      if ((BtnPos.value == "tl" || BtnPos.value == "tr" || BtnPos.value == "tc") && AcionPos.value == "bottom") {
        return { height: height_width + "rpx" };
      }
      if (BtnPos.value == "tl" && AcionPos.value == "top") {
        let top = -(props.actions.length * props.height - _offset.value[1]);
        return {
          height: height_width + "rpx",
          transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if ((BtnPos.value == "tl" || BtnPos.value == "tc") && AcionPos.value == "right") {
        return { width: height_width + "rpx" };
      }
      if (BtnPos.value == "tl" && AcionPos.value == "left") {
        let left = -(props.actions.length * props.height - _offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}rpx) translateY(${_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "left") {
        -(props.actions.length * props.height - _offset.value[0]);
        return {
          width: height_width + "rpx",
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "top") {
        let top = -(props.actions.length * props.height - _offset.value[1]);
        return {
          height: height_width + "rpx",
          transform: `translateX(-${_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "tr" && AcionPos.value == "right") {
        let right = props.actions.length * props.height - _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${right}rpx) translateY(${_offset.value[1]}rpx)`
        };
      }
      if (BtnPos.value == "tc" && AcionPos.value == "left") {
        let left = centerPosLeft.value - common_vendor.index.upx2px(props.actions.length * props.height) - common_vendor.index.upx2px(_offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "tc" && AcionPos.value == "top") {
        let left = centerPosLeft.value + common_vendor.index.upx2px(_offset.value[0]);
        let top = -(props.actions.length * props.height - _offset.value[1]);
        return {
          height: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "bottom") {
        let top = props.actions.length * props.height - _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "top") {
        let top = -_offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "right") {
        return {
          width: height_width + "rpx"
        };
      }
      if (BtnPos.value == "bl" && AcionPos.value == "left") {
        let left = -(props.actions.length * props.height - _offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}rpx) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "bottom") {
        let top = props.actions.length * props.height - _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${-_offset.value[0]}rpx) translateY(${top}rpx)`
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "top") {
        let top = -_offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${-_offset.value[0]}rpx) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "right") {
        let right = props.actions.length * props.height - _offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${right}rpx) translateY(${-_offset.value[1]}rpx)`
        };
      }
      if (BtnPos.value == "br" && AcionPos.value == "left") {
        let left = -_offset.value[0];
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}rpx) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "left") {
        let left = centerPosLeft.value - common_vendor.index.upx2px(props.actions.length * props.height) - common_vendor.index.upx2px(_offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row-reverse"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "right") {
        let left = centerPosLeft.value + common_vendor.index.upx2px(_offset.value[0]);
        return {
          width: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${-_offset.value[1]}rpx)`,
          "flex-direction": "row"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "top") {
        let left = centerPosLeft.value + common_vendor.index.upx2px(_offset.value[0]);
        let top = -_offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${top}rpx)`,
          "flex-direction": "column-reverse"
        };
      }
      if (BtnPos.value == "bc" && AcionPos.value == "bottom") {
        let left = centerPosLeft.value + common_vendor.index.upx2px(_offset.value[0]);
        let top = props.actions.length * props.height + _offset.value[1];
        return {
          height: height_width + "rpx",
          transform: `translateX(${left}px) translateY(${top}rpx)`,
          "flex-direction": "column"
        };
      }
    });
    function onclick(e) {
      if (props.clickHidnActions) {
        showActions.value = !showActions.value;
      } else {
        showActions.value = true;
      }
      emits("click", e);
    }
    function change(index, item) {
      if (props.clickHidnActions) {
        showActions.value = false;
      }
      emits("change", index, item);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          userInteractionEnabled: false,
          ["follow-dark"]: false,
          color: common_vendor.unref(_btn).fontColor,
          name: common_vendor.unref(_btn).icon,
          ["font-size"]: common_vendor.unref(_btn).iconSize
        }),
        b: common_vendor.unref(_btn).label
      }, common_vendor.unref(_btn).label ? {
        c: common_vendor.p({
          userInteractionEnabled: false,
          ["follow-dark"]: false,
          color: common_vendor.unref(_btn).fontColor,
          label: common_vendor.unref(_btn).label,
          ["font-size"]: common_vendor.unref(_btn).fontSize
        })
      } : {}, {
        d: common_vendor.o(onclick),
        e: common_vendor.p({
          followTheme: props.followTheme,
          _class: "flex flex-col flex-col-center-center",
          shadow: 3,
          linear: common_vendor.unref(_btn).linear,
          ["linear-deep"]: common_vendor.unref(_btn).linearDeep,
          color: common_vendor.unref(_btn).color,
          margin: [0, 0],
          round: 16,
          padding: [0, 0],
          width: props.width - 12,
          height: props.height - 12
        }),
        f: common_vendor.p({
          transprent: true,
          padding: [0, 0],
          margin: [0, 0],
          color: common_vendor.unref(_btn).color
        }),
        g: common_vendor.s({
          width: props.width + "rpx",
          height: props.height + "rpx"
        }),
        h: common_vendor.unref(_actionsItem).length > 0 && showActions.value
      }, common_vendor.unref(_actionsItem).length > 0 && showActions.value ? {
        i: common_vendor.f(common_vendor.unref(_actionsItem), (item, index, i0) => {
          return common_vendor.e({
            a: "a3f731fa-5-" + i0 + "," + ("a3f731fa-4-" + i0),
            b: common_vendor.p({
              userInteractionEnabled: false,
              color: item.fontColor,
              name: item.icon,
              ["font-size"]: item.iconSize
            }),
            c: item.label
          }, item.label ? {
            d: "a3f731fa-6-" + i0 + "," + ("a3f731fa-4-" + i0),
            e: common_vendor.p({
              userInteractionEnabled: false,
              color: item.fontColor,
              label: item.label,
              ["font-size"]: item.fontSize
            })
          } : {}, {
            f: common_vendor.o(($event) => change(index, item), index),
            g: index,
            h: "a3f731fa-4-" + i0,
            i: common_vendor.p({
              followTheme: props.followTheme,
              _class: "flex flex-col flex-col-center-center",
              round: 16,
              shadow: 2,
              linear: item.linear,
              ["linear-deep"]: item.linearDeep,
              color: item.color,
              margin: [0, 0],
              padding: [0, 0],
              width: props.width - 12,
              height: props.height - 12
            })
          });
        }),
        j: common_vendor.s({
          width: props.width + "rpx",
          height: props.height + "rpx"
        }),
        k: showActions.value,
        l: common_vendor.s(common_vendor.unref(AcionPos_xy))
      } : {}, {
        m: common_vendor.s(common_vendor.unref(BtnPos) == "tl" ? {
          transform: `translateX(${common_vendor.unref(_offset)[0]}rpx) translateY(${common_vendor.unref(_offset)[1]}rpx)`
        } : ""),
        n: common_vendor.s(common_vendor.unref(BtnPos) == "tr" ? {
          transform: `translateX(-${common_vendor.unref(_offset)[0]}rpx) translateY(${common_vendor.unref(_offset)[1]}rpx)`,
          right: "0px"
        } : ""),
        o: common_vendor.s(common_vendor.unref(BtnPos) == "tc" ? {
          transform: `translateX(${common_vendor.unref(centerPosLeft)}px) translateY(${common_vendor.unref(_offset)[1]}rpx)`
        } : ""),
        p: common_vendor.s(common_vendor.unref(BtnPos) == "bl" ? {
          transform: `translateX(${common_vendor.unref(_offset)[0]}rpx) translateY(-${common_vendor.unref(_offset)[1]}rpx)`,
          bottom: "0px"
        } : ""),
        q: common_vendor.s(common_vendor.unref(BtnPos) == "br" ? {
          transform: `translateX(-${common_vendor.unref(_offset)[0]}rpx) translateY(-${common_vendor.unref(_offset)[1]}rpx)`,
          right: "0px",
          bottom: "0px"
        } : ""),
        r: common_vendor.s(common_vendor.unref(BtnPos) == "bc" ? {
          transform: `translateX(${common_vendor.unref(centerPosLeft)}px) translateY(-${common_vendor.unref(_offset)[1]}rpx)`,
          bottom: "0px"
        } : ""),
        s: common_vendor.s(!isH5.value && (common_vendor.unref(BtnPos) == "tl" || common_vendor.unref(BtnPos) == "tc" || common_vendor.unref(BtnPos) == "tr") ? {
          top: "0px"
        } : ""),
        t: common_vendor.s(common_vendor.unref(parent_style))
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-float-button/tm-float-button.vue"]]);
qq.createComponent(Component);
