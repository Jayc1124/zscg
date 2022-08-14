"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    nav(id) {
      console.log(id);
      common_vendor.index.navigateTo({
        url: "/pages/news/detail/detail?detailData=" + id
      });
    },
    conv(str) {
      return str.substring(0, 10);
    }
  }
};
if (!Array) {
  const _easycom_tm_image2 = common_vendor.resolveComponent("tm-image");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_tag2 = common_vendor.resolveComponent("tm-tag");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  (_easycom_tm_image2 + _easycom_tm_text2 + _easycom_tm_tag2 + _easycom_tm_sheet2)();
}
const _easycom_tm_image = () => "../../tmui/components/tm-image/tm-image.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_tag = () => "../../tmui/components/tm-tag/tm-tag.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
if (!Math) {
  (_easycom_tm_image + _easycom_tm_text + _easycom_tm_tag + _easycom_tm_sheet)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.list, (good, k0, i0) => {
      return {
        a: "02471c89-1-" + i0 + "," + ("02471c89-0-" + i0),
        b: common_vendor.p({
          preview: true,
          round: 2,
          width: 310,
          height: 200,
          src: good.img || "https://cdn2.jaycao.com/cdtu/cdtunews.jpg"
        }),
        c: common_vendor.t$1(good.title),
        d: "02471c89-2-" + i0 + "," + ("02471c89-0-" + i0),
        e: "02471c89-3-" + i0 + "," + ("02471c89-0-" + i0),
        f: common_vendor.p({
          text: true,
          shadow: 0,
          icon: "tmicon-clock-fill",
          color: "grey",
          size: "m",
          label: $options.conv(good.date)
        }),
        g: "02471c89-0-" + i0,
        h: common_vendor.o(($event) => $options.nav(good.id)),
        i: "good" + good.id,
        j: good.id
      };
    }),
    b: common_vendor.p({
      ["font-size"]: 30,
      _class: "font-weight-b text-overflow-2 text-weight-b",
      label: ""
    }),
    c: common_vendor.p({
      margin: [5, 5]
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/good-list/good-list.vue"]]);
qq.createComponent(Component);
