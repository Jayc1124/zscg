"use strict";
var common_request = require("../../../common/request.js");
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  onLoad(e) {
    console.log("1231");
    common_request.request.httpTokenRequest({
      url: "getInfo/getEkToken",
      method: "post"
    }).then((res) => {
      if (res.data.code == 200) {
        this.data = res.data.msg;
        console.log(e.detailData + `&token=` + res.data.msg);
        this.url = e.detailData + `?token=` + res.data.msg;
        this.dk = true;
      }
    });
  },
  methods: {
    gettoken() {
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
  return common_vendor.e({
    a: $data.dk
  }, $data.dk ? {
    b: $data.webviewStyles,
    c: $data.url
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/webview/webwiew_erke/index.vue"]]);
wx.createPage(MiniProgramPage);
