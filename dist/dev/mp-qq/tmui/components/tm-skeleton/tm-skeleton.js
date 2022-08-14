"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  tmSkeletonLine();
}
const tmSkeletonLine = () => "../tm-skeleton-line/tm-skeleton-line.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
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
      return common_vendor.e({
        a: props.model == "line"
      }, props.model == "line" ? {
        b: common_vendor.f(props.rows, (item, k0, i0) => {
          return {
            a: "fa9199d2-0-" + i0,
            b: item
          };
        }),
        c: common_vendor.p({
          height: props.height
        }),
        d: common_vendor.p({
          height: props.height * 2
        }),
        e: common_vendor.p({
          height: props.height * 2
        }),
        f: common_vendor.p({
          height: props.height * 2
        }),
        g: common_vendor.p({
          height: props.height * 2
        })
      } : {}, {
        h: props.model == "rect"
      }, props.model == "rect" ? {
        i: common_vendor.f(props.rows, (item, k0, i0) => {
          return {
            a: "fa9199d2-5-" + i0,
            b: "fa9199d2-6-" + i0,
            c: "fa9199d2-7-" + i0,
            d: "fa9199d2-8-" + i0,
            e: item
          };
        }),
        j: common_vendor.p({
          height: props.height * 2
        }),
        k: common_vendor.p({
          height: props.height * 2
        }),
        l: common_vendor.p({
          height: props.height * 2
        }),
        m: common_vendor.p({
          height: props.height * 2
        })
      } : {}, {
        n: props.model == "card"
      }, props.model == "card" ? {
        o: common_vendor.p({
          height: props.height
        }),
        p: common_vendor.p({
          height: props.height
        }),
        q: common_vendor.p({
          height: props.height
        }),
        r: common_vendor.p({
          height: props.height * 4
        }),
        s: common_vendor.p({
          height: props.height
        }),
        t: common_vendor.p({
          height: props.height
        }),
        v: common_vendor.p({
          height: props.height
        }),
        w: common_vendor.p({
          height: props.height
        })
      } : {}, {
        x: props.model == "chat"
      }, props.model == "chat" ? {
        y: common_vendor.p({
          height: props.height * 2
        }),
        z: common_vendor.s({
          height: props.height * 2 + "rpx"
        }),
        A: common_vendor.p({
          height: props.height
        }),
        B: common_vendor.p({
          height: props.height
        }),
        C: common_vendor.p({
          height: props.height
        }),
        D: common_vendor.p({
          height: props.height
        })
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-skeleton/tm-skeleton.vue"]]);
qq.createComponent(Component);
