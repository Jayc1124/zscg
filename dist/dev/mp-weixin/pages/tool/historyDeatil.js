"use strict";
var common_vendor = require("../../common/vendor.js");
var common_request = require("../../common/request.js");
const _sfc_main = {
  onLoad(e) {
    this.id = JSON.parse(decodeURIComponent(e.detailData));
    this.getHistory();
  },
  data() {
    return {
      id: 0,
      item: Object,
      style: {
        p: "font-size:32rpx;margin-bottom:30rpx;text-indent: 2em;",
        img: "margin-left:-2em",
        span: "font-size: 30rpx"
      }
    };
  },
  methods: {
    getHistory(id) {
      common_request.request.request({
        url: "https://v2.alapi.cn/api/eventHistory/get",
        method: "get"
      }, {
        token: "NdbhV0rvD13eDGBI",
        id: this.id
      }).then((res) => {
        console.log(res);
        this.item = res.data.data;
        common_vendor.index.setNavigationBarTitle({
          title: this.item.title
        });
      }, {});
    }
  }
};
if (!Array) {
  const _component_u_parse = common_vendor.resolveComponent("u-parse");
  _component_u_parse();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t$1($data.item.title),
    b: common_vendor.p({
      html: $data.item.content,
      ["lazy-load"]: true,
      ["show-with-animation"]: true,
      ["tag-style"]: $data.style
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-334f3598"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/historyDeatil.vue"]]);
wx.createPage(MiniProgramPage);
