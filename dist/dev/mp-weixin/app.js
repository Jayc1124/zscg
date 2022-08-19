"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var common_vendor = require("./common/vendor.js");
var tmui_index = require("./tmui/index.js");
var tmui_tool_lib_tmpinia = require("./tmui/tool/lib/tmpinia.js");
var store_app = require("./store/app.js");
var common_request = require("./common/request.js");
require("./tmui/tool/lib/fetch.js");
require("./tmui/tool/theme/theme.js");
require("./tmui/tool/theme/colortool.js");
require("./tmui/tool/lib/interface.js");
require("./theme/index.js");
require("./tmui/tool/function/util.js");
require("./tmui/tool/function/preview.js");
require("./tmui/tool/lib/language.js");
require("./tmui/tool/lib/share.js");
require("./modules/pinia.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/search.js";
  "./pages/news/news.js";
  "./pages/login/login.js";
  "./pages/erke/erke.js";
  "./pages/kebiao/index.js";
  "./pages/login/wxLogin.js";
  "./pages/bizhi/bizhi.js";
  "./pages/bizhi/infotp.js";
  "./pages/news/detail/detail.js";
  "./pages/luntan/luntan.js";
  "./pages/webview/webview.js";
  "./pages/webview/webview_f.js";
  "./pages/webview/webview_w.js";
  "./pages/webview/webview_jw/index.js";
  "./pages/me/me2/me2.js";
  "./pages/me/abme/abme.js";
  "./pages/me/editme.js";
  "./pages/tool/barrage/start.js";
  "./pages/tool/barrage/barrage.js";
  "./pages/tool/jp/jp.js";
  "./pages/tool/phoneSign/phoneSign.js";
  "./pages/tool/getTeacherNumber.js";
  "./pages/tool/historyDeatil.js";
  "./pages/tool/eventHistory.js";
  "./pages/news/search/index.js";
  "./pages/webview/webwiew_erke/index.js";
  "./pages/webview/wb_ek1.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    store_app.useAppStore();
    common_vendor.onLaunch(() => {
      common_request.request.httpTokenRequest({
        url: "getInfo/getJwToken",
        method: "post"
      }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          common_vendor.index.setStorage({
            key: "jwToken",
            data: res.data.msg.substring(6).replace("&userType=2&toMenu=null", "")
          });
        }
      });
    });
    const tmStore = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const systemInfo = common_vendor.index.getSystemInfoSync();
    if (["light", "dark"].includes(common_vendor.index.getStorageSync("theme"))) {
      tmStore.setTmVuetifyDark(common_vendor.index.getStorageSync("theme") === "dark");
    } else if (["light", "dark"].includes(systemInfo.theme)) {
      tmStore.setTmVuetifyDark(systemInfo.theme === "dark");
    } else {
      tmStore.setTmVuetifyDark(false);
    }
    return () => {
    };
  }
});
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
