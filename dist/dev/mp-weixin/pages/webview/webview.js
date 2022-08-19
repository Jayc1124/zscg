"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onLoad(e) {
    console.log(e);
    this.url = e.detailData;
  },
  data() {
    return {
      data: "",
      url: "",
      webviewStyles: {
        progress: {
          color: false
        }
      }
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.webviewStyles,
    b: $data.url
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/webview/webview.vue"]]);
wx.createPage(MiniProgramPage);
