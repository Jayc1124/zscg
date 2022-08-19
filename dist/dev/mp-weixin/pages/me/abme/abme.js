"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      copyrightInfor: `\xA9${new Date().getFullYear()} \u63A8\u5BA2\u6821\u56ED&CDTU\u53E3\u888B\u541B`,
      version: "",
      content: `
						<p style="margin: 11px 0;text-align: justify;font-family: Calibri;font-size: 16px;white-space: normal;text-indent: 28px;line-height: 32px;background: rgb(255, 255, 255)">
						    <span style="color: rgb(51, 51, 51); font-family: \u5B8B\u4F53; letter-spacing: 0px; font-size: 14px;">\u638C\u4E0A\u6210\u5DE5\u662F\u7531\u7F51\u7EDC\u4E0E\u901A\u4FE1\u5DE5\u7A0B\u5B66\u9662\u540C\u5B66\u4ECE\u96F6\u5F00\u53D1\uFF0C\u662F\u4E00\u6B3E\u65B9\u4FBF\u5FEB\u6377\uFF0C\u62E5\u6709\u5B89\u5353\uFF0C\u82F9\u679C\uFF0C\u5C0F\u7A0B\u5E8F\uFF0CH5\u7684\u591A\u5E73\u53F0APP\u3002\u638C\u4E0A\u6210\u5DE5\u5177\u6709\u8BB8\u591A\u65B9\u4FBF\u540C\u5B66\u4EEC\u7684\u529F\u80FD\uFF0C\u670D\u52A1\u4E8E\u5E7F\u5927\u7684\u6210\u90FD\u5DE5\u4E1A\u5B66\u9662\u540C\u5B66\u4EEC\u3002</span><span style="color: rgb(51, 51, 51); font-family: \u5B8B\u4F53; font-size: 12px; letter-spacing: 0px;"><br/></span>
						</p>
						<h4>\u638C\u4E0A\u6210\u5DE5\u5F00\u53D1\u56E2\u961F | \u5174\u8DA3\u9A71\u52A8,\u7528\u7231\u53D1\u7535</h4>
						<p style="margin: 11px 0;text-align: justify;font-family: Calibri;font-size: 16px;white-space: normal;text-indent: 28px;line-height: 32px;background: rgb(255, 255, 255)">
						    <span style="font-family: \u5B8B\u4F53; color: rgb(51, 51, 51); letter-spacing: 0px; font-size: 14px;">\u638C\u4E0A\u6210\u5DE5\u4E8E2022\u5E742\u6708\u5F00\u59CB\u5F00\u53D1\uFF0C\u7531\u63A8\u5BA2\u6821\u56ED\u80E1\u4F1F\u6770\u540C\u5B66\u8D1F\u8D23\u8FD0\u8425,\u7F51\u7EDC\u4E0E\u901A\u4FE1\u5DE5\u7A0B\u5B66\u9662\u66F9\u6770\uFF0C\u5F6D\u826F\u6CE2\u5B8C\u6210\u4E86\u5BF9APP\u524D\u540E\u7AEF\u5F00\u53D1\uFF0C\u66F4\u65B0\u8FED\u4EE3\u3002\u622A\u6B62\u52302022\u5E745\u6708\uFF0C\u201C\u638C\u4E0A\u6210\u5DE5\u201D\u5DF2\u62E5\u6709\u6709\u8D85\u8FC73000+\u540C\u5B66\u4F7F\u7528\u8FC7\u3002\u51FA\u4E8E\u5BF9\u6280\u672F\u7684\u70ED\u7231\u548C\u5BF9\u540C\u5B66\u4EEC\u670D\u52A1\u7684\u70ED\u60C5\uFF0C\u638C\u4E0A\u6210\u5DE5\u5F00\u53D1\u56E2\u961F\u7684\u6210\u5458\u4EEC\u672C\u7740\u4E3A\u6210\u5DE5\u5B66\u5B50\u670D\u52A1\u4E3A\u51FA\u53D1\u70B9\uFF0C\u521B\u9020\u89E3\u51B3\u6821\u56ED\u751F\u6D3B\u3001\u5B66\u4E60\u4E2D\u5B58\u5728\u7684\u75DB\u70B9\u7684\u53EF\u80FD\uFF0C\u5F00\u53D1\u4EA7\u54C1\uFF0C\u670D\u52A1\u540C\u5B66\uFF0C\u63D0\u5347\u6280\u672F\u80FD\u529B\u3002\u611F\u8C22\u4F60\u4F7F\u7528\u638C\u4E0A\u6210\u5DE5~</span>
							
						</p>
							                             
							
						</p>
						<p>
						    <br/>
						</p>
							`
    };
  },
  mounted() {
    const accountInfo = wx.getAccountInfoSync();
    this.version = accountInfo.miniProgram.version;
  },
  methods: {
    isDeveloper() {
      common_vendor.index.setStorageSync("isDeveloper", true);
      this.goUpdateLog();
    },
    unDeveloper() {
      common_vendor.index.clearStorageSync("isDeveloper");
      this.goUpdateLog();
    },
    goUpdateLog() {
      common_vendor.index.navigateTo({
        url: "../changelog/changelog"
      });
    }
  }
};
if (!Array) {
  const _component_u_parse = common_vendor.resolveComponent("u-parse");
  _component_u_parse();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t$1($data.version || "3.0.7"),
    b: common_vendor.p({
      html: $data.content
    }),
    c: common_vendor.t$1($data.copyrightInfor)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/me/abme/abme.vue"]]);
wx.createPage(MiniProgramPage);
