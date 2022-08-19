"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onLoad(e) {
    this.url = e.detailData;
    setTimeout(() => {
      this.nav();
    }, 500);
  },
  methods: {
    nav() {
    }
  },
  data() {
    return {
      data: "",
      dk: false,
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
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/webview/webview_w.vue"]]);
wx.createPage(MiniProgramPage);
