"use strict";
var common_vendor = require("../../common/vendor.js");
var common_request = require("../../common/request.js");
const _sfc_main = {
  data() {
    return {
      data: []
    };
  },
  onLoad() {
    this.getData();
  },
  methods: {
    gotoDeatil(id) {
      common_vendor.index.navigateTo({
        url: "./historyDeatil?detailData=" + encodeURIComponent(JSON.stringify(id))
      });
    },
    getData() {
      let opts = {
        url: `https://v2.alapi.cn/api/eventHistory`,
        method: "get"
      };
      common_request.request.request(opts, {
        token: "NdbhV0rvD13eDGBI"
      }).then((res) => {
        console.log(res);
        this.data = res.data.data;
        console.log(this.data);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.data, (item, index, i0) => {
      return {
        a: common_vendor.t$1(item.date),
        b: common_vendor.t$1(item.title),
        c: common_vendor.o(($event) => $options.gotoDeatil(item.id)),
        d: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/eventHistory.vue"]]);
wx.createPage(MiniProgramPage);
