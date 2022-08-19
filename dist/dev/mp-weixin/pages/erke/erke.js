"use strict";
var common_vendor = require("../../common/vendor.js");
var common_request = require("../../common/request.js");
const TabBar = () => "../../components/TheTabBar.js";
const _sfc_main = {
  components: {
    TabBar
  },
  data() {
    return {
      offset: 50,
      load: true,
      goods: [],
      tabs: [
        {
          key: "1",
          title: "\u7EBF\u4E0B",
          icon: "tmicon-ios-leaf"
        },
        {
          key: "2",
          title: "\u7EBF\u4E0A",
          icon: "tmicon-ios-umbrella"
        },
        {
          key: "3",
          title: "\u53EF\u62A5\u540D",
          icon: "tmicon-ios-rocket"
        }
      ],
      tabIndex: 1,
      listvedio: [
        "https://www.cdtu.edu.cn/images/20220671.png",
        {
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          img: "https://picsum.photos/200/300?id=43335",
          type: "video"
        },
        "https://www.cdtu.edu.cn/images/2021xiaofeng5chenggongjingshen.png"
      ]
    };
  },
  onLoad() {
    this.tabschange(1);
  },
  methods: {
    nav(index) {
      if (index == 1) {
        console.log("pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/numvail/index");
        common_vendor.index.navigateTo({
          url: "/pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/numvail/index"
        });
      }
      if (index == 2) {
        common_vendor.index.navigateTo({
          url: "/pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/project/index?go=0"
        });
      }
      if (index == 3) {
        common_vendor.index.navigateTo({
          url: "/pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/my/acti/bm/index?mode=0"
        });
      }
      if (index == 4) {
        common_vendor.index.navigateTo({
          url: "/pages/webview/webwiew_erke/index?detailData=https://erke.jaycao.com/#/pages/my/transcript/index"
        });
      }
    },
    tabschange(key) {
      this.tabIndex = key;
      let url = "";
      if (key == 2) {
        url = "wx/erke/getxx";
      } else if (key == 1) {
        url = "wx/erke/getxs";
      } else {
        url = "wx/erke/getbm";
      }
      common_request.request.httpTokenRequest({
        url,
        method: "get"
      }, {}).then((res) => {
        console.log(res);
        this.goods = [];
        this.goods = this.goods.concat(res.data.data.data.records);
        this.load = false;
      });
    }
  }
};
if (!Array) {
  const _easycom_tm_navbar2 = common_vendor.resolveComponent("tm-navbar");
  const _easycom_tm_tabs2 = common_vendor.resolveComponent("tm-tabs");
  const _easycom_tm_skeleton2 = common_vendor.resolveComponent("tm-skeleton");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_image2 = common_vendor.resolveComponent("tm-image");
  const _easycom_erke_list2 = common_vendor.resolveComponent("erke-list");
  const _easycom_tm_result2 = common_vendor.resolveComponent("tm-result");
  const _easycom_tm_sticky2 = common_vendor.resolveComponent("tm-sticky");
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_navbar2 + _easycom_tm_tabs2 + _easycom_tm_skeleton2 + _easycom_tm_sheet2 + _easycom_tm_image2 + _easycom_erke_list2 + _easycom_tm_result2 + _easycom_tm_sticky2 + _component_tab_bar + _easycom_tm_app2)();
}
const _easycom_tm_navbar = () => "../../tmui/components/tm-navbar/tm-navbar.js";
const _easycom_tm_tabs = () => "../../tmui/components/tm-tabs/tm-tabs.js";
const _easycom_tm_skeleton = () => "../../tmui/components/tm-skeleton/tm-skeleton.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_image = () => "../../tmui/components/tm-image/tm-image.js";
const _easycom_erke_list = () => "../../components/erke-list/erke-list.js";
const _easycom_tm_result = () => "../../tmui/components/tm-result/tm-result.js";
const _easycom_tm_sticky = () => "../../tmui/components/tm-sticky/tm-sticky.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_navbar + _easycom_tm_tabs + _easycom_tm_skeleton + _easycom_tm_sheet + _easycom_tm_image + _easycom_erke_list + _easycom_tm_result + _easycom_tm_sticky + _easycom_tm_app)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "CDTU \u6210\u5DE5\u4E8C\u8BFE",
      shadow: 0
    }),
    b: common_vendor.o($options.tabschange),
    c: common_vendor.p({
      list: $data.tabs,
      width: 1e3,
      itemWidth: 160,
      height: 300,
      ["default-name"]: "1"
    }),
    d: $data.load
  }, $data.load ? {
    e: common_vendor.p({
      model: "chat"
    }),
    f: common_vendor.p({
      model: "chat"
    }),
    g: common_vendor.p({
      model: "chat"
    }),
    h: common_vendor.p({
      model: "chat"
    })
  } : {}, {
    i: common_vendor.o(($event) => $options.nav(1)),
    j: common_vendor.p({
      width: 340,
      height: 120,
      round: 8,
      margin: [0, 10],
      src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7872818f-3545-4440-93a4-789b44167e33/59a588f5-0a84-4c34-a1a1-6b8b2b6634aa.png"
    }),
    k: common_vendor.o(($event) => $options.nav(4)),
    l: common_vendor.p({
      width: 340,
      height: 120,
      round: 8,
      margin: [0, 10],
      src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7872818f-3545-4440-93a4-789b44167e33/85853b73-2483-47d9-9815-659dd17b2a4c.png"
    }),
    m: common_vendor.o(($event) => $options.nav(3)),
    n: common_vendor.p({
      width: 340,
      height: 120,
      round: 8,
      margin: [0, 10],
      src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7872818f-3545-4440-93a4-789b44167e33/e51d2a74-d185-41c5-a084-773167b0c0d6.png"
    }),
    o: common_vendor.o(($event) => $options.nav(2)),
    p: common_vendor.p({
      width: 340,
      height: 120,
      round: 8,
      margin: [0, 10],
      src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7872818f-3545-4440-93a4-789b44167e33/a78cc092-d9dc-4f5c-bb77-7943ba787394.png"
    }),
    q: common_vendor.p({
      round: 10,
      margin: [10, 10]
    }),
    r: common_vendor.p({
      list: $data.goods
    }),
    s: $data.goods.length == 0
  }, $data.goods.length == 0 ? {
    t: common_vendor.p({
      showBtn: false
    })
  } : {}, {
    v: common_vendor.p({
      offset: "0"
    }),
    w: common_vendor.p({
      active: 2
    }),
    x: common_vendor.sr("app", "11373bc2-0")
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/erke/erke.nvue"]]);
wx.createPage(MiniProgramPage);
