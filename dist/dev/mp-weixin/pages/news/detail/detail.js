"use strict";
var common_vendor = require("../../../common/vendor.js");
var tmui_tool_lib_tmpinia = require("../../../tmui/tool/lib/tmpinia.js");
var common_request = require("../../../common/request.js");
require("../../../tmui/tool/theme/theme.js");
require("../../../tmui/tool/theme/colortool.js");
require("../../../tmui/tool/lib/interface.js");
require("../../../theme/index.js");
require("../../../tmui/tool/function/util.js");
require("../../../tmui/tool/function/preview.js");
const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
const _sfc_main = {
  data() {
    return {
      tip: "\u53EF\u4EE5\u5206\u4EAB\u94FE\u63A5\u5230\u670B\u53CB\u5708\u4E86\u54E6",
      share: {
        title: "",
        imageUrl: "https://www.cdtu.edu.cn/images/2021xiaofeng4xiaoxun.png"
      },
      id: 39371,
      item: Object,
      pd: "",
      style: {
        p: "font-size:32rpx;margin-bottom:30rpx;text-indent: 2em;",
        img: "margin-left:-2em",
        span: "font-size: 30rpx"
      }
    };
  },
  methods: {
    getOrderList(index) {
      console.log("\u8FD9\u91CC\u51FA\u9519\u4E86\u561B");
      common_request.request.httpRequest({
        url: "news/getinfo/" + this.id,
        method: "get"
      }).then((res) => {
        console.log("\u8FD9\u91CC\u51FA\u9519\u4E86\u561B");
        this.item = res.data.data;
        common_vendor.index.setNavigationBarTitle({
          title: this.item.title
        });
      }, {});
    }
  },
  onLoad(e) {
    this.pd = store.tmStore.dark;
    console.log(this.pd);
    if (e.detailData != null) {
      console.log("\u6B63\u5E38\u8DF3\u8F6C\u9875\u9762");
      this.id = e.detailData;
      this.getOrderList();
    } else {
      console.log("\u5206\u4EAB\u8DEF\u53E3\u9875\u9762");
      this.id = e.id;
      this.getOrderList();
      console.log("onload\u4E2D\u7684" + this.id);
    }
  }
};
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_u_parse2 = common_vendor.resolveComponent("u-parse");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_text2 + _easycom_u_parse2 + _easycom_tm_sheet2 + _easycom_tm_app2)();
}
const _easycom_tm_text = () => "../../../tmui/components/tm-text/tm-text.js";
const _easycom_u_parse = () => "../../../uni_modules/vk-uview-ui/components/u-parse/u-parse.js";
const _easycom_tm_sheet = () => "../../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_app = () => "../../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_text + _easycom_u_parse + _easycom_tm_sheet + _easycom_tm_app)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      ["font-size"]: 32,
      _class: "font-weight-b",
      label: $data.item.title
    }),
    b: !$data.pd
  }, !$data.pd ? {
    c: common_vendor.p({
      html: $data.item.content,
      ["lazy-load"]: true,
      ["show-with-animation"]: true,
      ["tag-style"]: $data.style,
      selectable: true
    })
  } : {}, {
    d: $data.pd
  }, $data.pd ? {
    e: common_vendor.p({
      html: $data.item.content,
      ["lazy-load"]: true,
      ["show-with-animation"]: true,
      ["tag-style"]: $data.style,
      selectable: true
    })
  } : {}, {
    f: common_vendor.p({
      round: 3,
      margin: [5, 5]
    }),
    g: common_vendor.sr("app", "8a50fcd2-0")
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8a50fcd2"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/news/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
