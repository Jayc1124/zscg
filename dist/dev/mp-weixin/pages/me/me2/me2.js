"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_request = require("../../../common/request.js");
const TabBar = () => "../../../components/TheTabBar.js";
const _sfc_main = {
  components: {
    TabBar
  },
  data() {
    return {
      title: "Hello",
      userinfo: "",
      pic: "",
      storageSize: "",
      list: [
        {
          image: "https://cdn2.jaycao.com/cdtu/tool1.png",
          title: "\u6628\u591C\u661F\u8FB0\u6628\u591C\u98CE\uFF0C\u753B\u697C\u897F\u7554\u6842\u5802\u4E1C"
        },
        {
          image: "https://cdn2.jaycao.com/cdtu/wban.png",
          title: "\u8EAB\u65E0\u5F69\u51E4\u53CC\u98DE\u7FFC\uFF0C\u5FC3\u6709\u7075\u7280\u4E00\u70B9\u901A"
        }
      ],
      list2: []
    };
  },
  onLoad() {
    this.getbannaer();
    this.userinfo = common_vendor.index.getStorageSync("userinfo");
    var str = this.userinfo.userName;
    console.log(str);
    this.pic = str.charAt(str.length - 1);
  },
  methods: {
    getStorageSize: function() {
      let that = this;
      common_vendor.index.getStorageInfo({
        success(res) {
          let size = res.currentSize;
          if (size < 1024) {
            that.storageSize = size + " B";
          } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
            that.storageSize = Math.floor(size / 1024 * 100) / 100 + " KB";
          } else if (size / 1024 / 1024 >= 1) {
            that.storageSize = Math.floor(size / 1024 / 1024 * 100) / 100 + " M";
          }
        }
      });
    },
    clearStorage: function() {
      let that = this;
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u786E\u5B9A\u6E05\u9664\u7F13\u5B58\u5417?",
        confirmText: "\u7ACB\u5373\u6E05\u9664",
        success(res) {
          if (res.confirm) {
            common_vendor.index.clearStorageSync();
            that.getStorageSize();
            common_vendor.index.showToast({
              title: "\u6E05\u9664\u6210\u529F"
            });
            common_vendor.index.reLaunch({
              url: "../../login/login"
            });
          }
        }
      });
    },
    getbannaer() {
      common_request.request.httpRequest({
        url: "notice/noticeBanner/getAppInfo"
      }).then((res) => {
        if (res.data.code == 200) {
          this.list2 = res.data.data.slice(7);
        }
      });
    },
    openurl3(index) {
      console.log(this.list2[index].navurl);
      common_vendor.index.navigateTo({
        url: this.list2[index].navurl
      });
    }
  }
};
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_avatar2 = common_vendor.resolveComponent("tm-avatar");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_text2 + _easycom_tm_avatar2 + _easycom_tm_divider2 + _easycom_tm_button2 + _easycom_tm_sheet2 + _component_tab_bar + _easycom_tm_app2)();
}
const _easycom_tm_text = () => "../../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_avatar = () => "../../../tmui/components/tm-avatar/tm-avatar.js";
const _easycom_tm_divider = () => "../../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_button = () => "../../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_sheet = () => "../../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_app = () => "../../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_text + _easycom_tm_avatar + _easycom_tm_divider + _easycom_tm_button + _easycom_tm_sheet + _easycom_tm_app)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["font-size"]: 40,
      _class: "font-weight-b",
      label: "\u4E2A\u4EBA\u4E2D\u5FC3"
    }),
    b: common_vendor.p({
      round: 12,
      text: true,
      margin: [10, 0],
      size: 110,
      label: $data.pic,
      trigger: true,
      triggerIcon: "tmicon-check"
    }),
    c: common_vendor.p({
      ["font-size"]: 30,
      _class: "font-weight-b",
      label: $data.userinfo.userName
    }),
    d: common_vendor.p({
      ["font-size"]: 30,
      _class: "font-weight-n ",
      label: $data.userinfo.xh
    }),
    e: common_vendor.p({
      ["font-size"]: 32,
      _class: "font-weight-b",
      label: "\u4E2A\u4EBA\u4FE1\u606F"
    }),
    f: common_vendor.p({
      ["font-size"]: 32,
      _class: "font-weight-b",
      label: "\u610F\u89C1\u53CD\u9988"
    }),
    g: "/pages/webview/webview?detailData=https://support.qq.com/embed/phone/408686",
    h: common_vendor.p({
      ["font-size"]: 32,
      _class: "font-weight-b",
      label: "\u5173\u4E8E\u6211\u4EEC"
    }),
    i: common_vendor.o($options.clearStorage),
    j: common_vendor.p({
      block: true,
      label: "\u9000\u51FA\u767B\u5F55"
    }),
    k: common_vendor.p({
      margin: [10, 0],
      round: 10
    }),
    l: common_vendor.p({
      color: "grey-2",
      label: "CodeCJ "
    }),
    m: common_vendor.p({
      active: 4
    }),
    n: common_vendor.sr("app", "09fa27e4-0")
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/me/me2/me2.vue"]]);
wx.createPage(MiniProgramPage);
