"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var common_vendor = require("./common/vendor.js");
var tmui_index = require("./tmui/index.js");
require("./tmui/tool/lib/fetch.js");
require("./tmui/tool/theme/theme.js");
require("./tmui/tool/theme/colortool.js");
require("./tmui/tool/lib/interface.js");
require("./theme/index.js");
require("./tmui/tool/function/util.js");
require("./tmui/tool/function/preview.js");
require("./tmui/tool/lib/language.js");
require("./tmui/tool/lib/share.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/search.js";
  "./pages/news/news.js";
  "./pages/login/login.js";
  "./pages/erke/erke.js";
  "./pages/login/wxLogin.js";
  "./pages/bizhi/bizhi.js";
  "./pages/bizhi/infotp.js";
  "./pages/news/detail/detail.js";
  "./pages/luntan/luntan.js";
  "./pages/webview/webview.js";
  "./pages/webview/webview_f.js";
  "./pages/webview/webview_w.js";
  "./pages/me/me2/me2.js";
  "./pages/tool/barrage/start.js";
  "./pages/tool/barrage/barrage.js";
}
const _sfc_main = {};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  app.use(tmui_index.tmui);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
