"use strict";
var common_vendor = require("../../common/vendor.js");
var common_request = require("../../common/request.js");
const _sfc_main = {
  data() {
    return {
      encryptedData: "",
      phoneIv: "",
      appid: "wx421dd1550095f40c"
    };
  },
  onLoad() {
  },
  methods: {
    login() {
      common_vendor.index.getUserProfile({
        desc: "\u83B7\u53D6\u60A8\u7684\u5FAE\u4FE1\u4FE1\u606F\u4EE5\u6388\u6743\u5C0F\u7A0B\u5E8F",
        lang: "zh_CN",
        success: (res) => {
          console.log(res);
          common_vendor.index.login({
            provider: "weixin",
            success: function(res2) {
              console.log("----1:", res2.code);
              let opts = {
                url: `wx/user/wx5a488e3a5f3cd592/login`,
                method: "get"
              };
              let params = {
                code: res2.code
              };
              console.log(res2.code);
              common_request.request.httpRequest(opts, params).then((res3) => {
                common_vendor.index.setStorageSync("token", res3.data.data.token);
                common_vendor.index.setStorageSync("user", res3.data.data.user);
                console.log("xh" + res3.data.data.user.xh);
              });
              if (xh == null) {
                common_vendor.index.showToast({
                  title: "\u9996\u6B21\u767B\u5F55,\u8BF7\u5148\u7ED1\u5B9A\u5B66\u53F7",
                  icon: "none",
                  complete: function() {
                    common_vendor.index.reLaunch({
                      url: "/pages/me/setNumber/setNumber"
                    });
                  }
                });
              }
            }
          });
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o(($event) => $options.login()),
    c: common_vendor.o(($event) => $options.goBack())
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-912988e4"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/login/wxLogin.vue"]]);
wx.createPage(MiniProgramPage);
