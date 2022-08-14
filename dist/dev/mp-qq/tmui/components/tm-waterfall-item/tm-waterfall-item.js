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
if (!Math) {
  (tmImage + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmImage = () => "../tm-image/tm-image.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
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
    const props = __props;
    const { proxy } = common_vendor.getCurrentInstance();
    const _width = common_vendor.inject("tmWaterFallItemRealWidth", common_vendor.computed$1(() => common_vendor.index.upx2px(_width.value)));
    let _nodeInfo = common_vendor.ref({
      id: common_vendor.index.$tm.u.getUid(2),
      width: _width.value,
      height: _width.value,
      imgWidth: _width.value,
      imgHeight: _width.value,
      bottom: 0,
      index: NaN,
      top: 0,
      left: 0
    });
    const isimgLoad = common_vendor.ref(props.img ? false : true);
    const _parentComs = getParent();
    const isPush = common_vendor.ref(false);
    if (!_parentComs) {
      console.error("\u8BF7\u4E0D\u8981\u5355\u72EC\u4F7F\u7528\u6B64\u7EC4\u4EF6\uFF0C\u8BF7\u653E\u7F6E\u5728:tm-waterfall\u5185\uFF1B");
    }
    _parentComs.sumTotal(_nodeInfo.value.id);
    common_vendor.onMounted(() => {
      common_vendor.nextTick(() => {
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
        common_vendor.nextTick(() => nvuegetClientRect());
      }, 50);
    }
    function getParent() {
      var _a;
      let parent = proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.parentNameId) == "tmWaterfallId" || !parent) {
          break;
        } else {
          parent = (_a = parent == null ? void 0 : parent.$parent) != null ? _a : void 0;
        }
      }
      return parent;
    }
    function nvuegetClientRect() {
      common_vendor.nextTick(function() {
        common_vendor.index.createSelectorQuery().in(proxy).select(".itemWall").boundingClientRect((res) => {
          if (res.height === 0 && res.width === 0) {
            nvuegetClientRect();
          } else {
            isimgLoad.value = true;
            const { width, height } = res;
            _nodeInfo.value = __spreadProps(__spreadValues({}, _nodeInfo.value), {
              height
            });
            if (isPush.value === false && isimgLoad.value) {
              pushKey();
              isPush.value = true;
            }
          }
        }).exec();
      });
    }
    async function pushKey() {
      if (_parentComs) {
        let pos = await _parentComs.pushKey(common_vendor.toRaw(_nodeInfo.value));
        _nodeInfo.value = pos;
      }
    }
    function onImgClick(e) {
      emits("img-click", e);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.img
      }, props.img ? {
        b: common_vendor.o(onImgClick),
        c: common_vendor.o(imgLoadSuccess),
        d: common_vendor.p({
          round: props.round,
          src: props.img,
          unit: "px",
          height: common_vendor.unref(_nodeInfo).imgHeight,
          width: common_vendor.unref(_nodeInfo).imgWidth
        })
      } : {}, {
        e: common_vendor.p({
          margin: [0, 0],
          padding: [0, 0],
          round: props.round,
          width: common_vendor.unref(_width),
          unit: "px",
          color: props.color,
          _class: "flex flex-col flex-col-top-start"
        }),
        f: common_vendor.s(!isPush.value ? {
          transform: "translateX(-1000px)"
        } : ""),
        g: common_vendor.s(isPush.value ? {
          transform: `translateX(${common_vendor.unref(_nodeInfo).left}px) translateY(${common_vendor.unref(_nodeInfo).top}px)`
        } : "")
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-waterfall-item/tm-waterfall-item.vue"]]);
qq.createComponent(Component);
