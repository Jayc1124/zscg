"use strict";
var common_request = require("../../common/request.js");
var uni_modules_mescrollUni_components_mescrollUni_mescrollMixins = require("../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mescrollMixins.MescrollMixin],
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
    downCallback() {
      this.mescroll.resetUpScroll();
    },
    tabschange(key) {
      console.log(key);
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
      this.mescroll.resetUpScroll();
    }
  }
};
if (!Array) {
  const _easycom_tm_navbar2 = common_vendor.resolveComponent("tm-navbar");
  const _easycom_tm_tabs2 = common_vendor.resolveComponent("tm-tabs");
  const _easycom_tm_skeleton2 = common_vendor.resolveComponent("tm-skeleton");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_erke_list2 = common_vendor.resolveComponent("erke-list");
  const _easycom_tm_result2 = common_vendor.resolveComponent("tm-result");
  const _easycom_tm_sticky2 = common_vendor.resolveComponent("tm-sticky");
  const _easycom_mescroll_uni2 = common_vendor.resolveComponent("mescroll-uni");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_navbar2 + _easycom_tm_tabs2 + _easycom_tm_skeleton2 + _easycom_tm_sheet2 + _easycom_erke_list2 + _easycom_tm_result2 + _easycom_tm_sticky2 + _easycom_mescroll_uni2 + _easycom_tm_app2)();
}
const _easycom_tm_navbar = () => "../../tmui/components/tm-navbar/tm-navbar.js";
const _easycom_tm_tabs = () => "../../tmui/components/tm-tabs/tm-tabs.js";
const _easycom_tm_skeleton = () => "../../tmui/components/tm-skeleton/tm-skeleton.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_erke_list = () => "../../components/erke-list/erke-list.js";
const _easycom_tm_result = () => "../../tmui/components/tm-result/tm-result.js";
const _easycom_tm_sticky = () => "../../tmui/components/tm-sticky/tm-sticky.js";
const _easycom_mescroll_uni = () => "../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_navbar + _easycom_tm_tabs + _easycom_tm_skeleton + _easycom_tm_sheet + _easycom_erke_list + _easycom_tm_result + _easycom_tm_sticky + _easycom_mescroll_uni + _easycom_tm_app)();
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
    i: common_vendor.p({
      list: $data.goods
    }),
    j: $data.goods.length == 0
  }, $data.goods.length == 0 ? {
    k: common_vendor.p({
      showBtn: false
    })
  } : {}, {
    l: common_vendor.p({
      offset: "0"
    }),
    m: common_vendor.sr("mescrollRef", "4a0b9cdf-2,4a0b9cdf-0"),
    n: common_vendor.o(_ctx.mescrollInit),
    o: common_vendor.o(_ctx.upCallback),
    p: common_vendor.p({
      height: "100%"
    }),
    q: common_vendor.sr("app", "4a0b9cdf-0")
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/erke/erke.vue"]]);
qq.createPage(MiniProgramPage);
