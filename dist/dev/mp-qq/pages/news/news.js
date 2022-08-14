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
      current: 0,
      goods: [],
      SwiperMfwlist: [
        {
          id: 1,
          Image: "https://b1-q.mafengwo.net/s17/M00/78/09/CoUBXmERFxyAMagZAAd7ujMYDZU158.png",
          mp4: "",
          title: "\u3010\u5C9B\u5C7F\u6765\u4FE1\u3011\u5728\u51B0\u5C9B\u5199\u4E86\u5C01\u4FE1\uFF0C\u5BC4\u7ED915\u5C81\u7684\u81EA\u5DF1",
          UserImage: "https://n1-q.mafengwo.net/s12/M00/D1/C3/wKgED1v3uaOADWepACAWS9q5Rhg19.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
          UserName: "\u8BD7\u7684PHOTO",
          UserGPS: "\u676D\u5DDE"
        },
        {
          id: 2,
          Image: "https://b1-q.mafengwo.net/s15/M00/29/CD/CoUBGWEOpSGAGvNEAAcdPGsxn34626.png",
          mp4: "",
          title: "\u3010\u8702\u999611\u5468\u5E74\u7EAA\u5FF5\u30114018\u5929\u540E\uFF0C\u6211\u4EEC\u7EE7\u7EED\u7EA6\u5B9A\uFF01",
          UserImage: "https://b1-q.mafengwo.net/s10/M00/73/96/wKgBZ1kSsyKAa_91AACgQYkA64o659.png?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
          UserName: "\u6E38\u8BB0\u603B\u7F16\u8F91",
          UserGPS: "\u5317\u4EAC"
        },
        {
          id: 3,
          Image: "https://n1-q.mafengwo.net/s16/M00/EB/2D/CoUBUmDlheiAdABtAAgo3xeAaaQ458.jpg?imageMogr2/thumbnail/!440x300r/strip/gravity/Center/crop/!440x300/quality/90",
          mp4: "",
          title: "\u4E00\u534A\u98CE\u5149\u4E00\u534A\u4EBA\u6587\uFF0C\u4E0E\u4F60\u5954\u8D74\u85CF\u5730\u627E\u5BFB\u4E16\u754C\u5982\u521D\u7684\u6A21\u6837",
          UserImage: "https://p1-q.mafengwo.net/s10/M00/5C/55/wKgBZ1mRHV2APLX9AABt9unXidc25.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
          UserName: "\u90ED\u5C0Fyan",
          UserGPS: "\u5E7F\u5DDE"
        },
        {
          id: 4,
          Image: "https://b1-q.mafengwo.net/s18/M00/21/34/CoUBYWEHpHOAU3amAAQzcB1XxYQ493.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90",
          mp4: "",
          title: "\u6D77\u5DDE\u65E5\u8BB0\uFF1A\u5C71\u6D77\u8FBD\u9614\u6D6A\u6F2B \u6D77\u9C9C\u8BF1\u60D1\u96BE\u6321\uFF0C\u5168\u662F\u4EBA\u95F4\u503C\u5F97\uFF01",
          UserImage: "https://b1-q.mafengwo.net/s9/M00/B3/D4/wKgBs1hgfP-Ae9emABNBFw8wn4U38.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
          UserName: "\u98CE\u4E4B\u4E03\u5F69",
          UserGPS: "\u65E0\u9521"
        },
        {
          id: 5,
          Image: "https://n1-q.mafengwo.net/s16/M00/40/C8/CoUBUmD1sDWAAeQFAAnK3yTNs_I942.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90",
          mp4: "",
          title: "\u897F\u5317\u5927\u73AF\u7EBF\u81EA\u9A7E\u4E28\u521D\u590F\uFF0C\u4E00\u573A7\u65E5\u9003\u79BB\u300C\u5730\u7403\u300D\u7684\u65C5\u884C",
          UserImage: "https://n1-q.mafengwo.net/s1/M00/9A/AA/wKgIC1uEE6SAF_DOAACyC15Thk811.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
          UserName: "\u5E06\u59AE\u513F",
          UserGPS: "\u5317\u4EAC"
        },
        {
          id: 6,
          Image: "https://n1-q.mafengwo.net/s16/M00/81/40/CoUBUmD5W1iAanT9ABE22ZlvQlg407.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90",
          mp4: "",
          title: "\u5728\u7F19\u4E91\uFF0C\u6211\u53D1\u73B0\u4E86\u53BB\u4ED9\u4FA0\u5B87\u5B99\u7684\u4F20\u9001\u95E8",
          UserImage: "https://b1-q.mafengwo.net/s15/M00/8E/41/CoUBGV3h1xqAdMEiACG5XnWSoMA99.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
          UserName: "\u838E\u838E\u7231\u65C5\u884C",
          UserGPS: "\u4E0A\u6D77"
        },
        {
          id: 7,
          Image: "https://n1-q.mafengwo.net/s16/M00/42/A2/CoUBUmDw8T6AdDCjABhWy-clT_M281.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90",
          mp4: "",
          title: "\u3010\u9B54\u90FD\u6F2B\u6B65\u3011\u53BB\u4E0A\u6D77\uFF0C\u7A7F\u8D8A\u65F6\u7A7A\u7684\u76DB\u590F",
          UserImage: "https://b1-q.mafengwo.net/s15/M00/92/A8/CoUBGWECgimABvHVAAlxqNsMSGw93.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
          UserName: "goericgo",
          UserGPS: "\u9752\u5C9B"
        }
      ],
      tabs: [
        {
          key: "1",
          title: "\u6210\u5DE5\u8981\u95FB"
        },
        {
          key: "2",
          title: "\u65B0\u65F6\u4EE3\u9AD8\u6559"
        },
        {
          key: "3",
          title: "\u901A\u77E5\u4E0E\u516C\u544A"
        },
        {
          key: "4",
          title: "\u5F18\u6BC5\u8BB2\u575B"
        },
        {
          key: "5",
          title: "\u5A92\u4F53\u770B\u5B66\u6821"
        }
      ],
      tabIndex: 1,
      listimg: [
        "https://picsum.photos/200/300?id=43335",
        "https://picsum.photos/200/300?id=433",
        "https://picsum.photos/200/300?id=439",
        "https://picsum.photos/200/300?id=459"
      ]
    };
  },
  onLoad() {
    console.log(this.goods);
  },
  methods: {
    cu() {
      console.log("\u5F53\u524D" + this.current);
    },
    change(e) {
      this.current = e.current;
    },
    tabschange(key) {
      this.tabIndex = key;
      this.goods = [];
      this.mescroll.resetUpScroll();
    },
    upCallback(page) {
      common_request.request.httpTokenRequest({
        url: "news/item/" + this.tabIndex + "?pageNum=" + page.num,
        method: "get"
      }, {}).then((res) => {
        if (page.num == 1)
          this.goods = [];
        this.goods = this.goods.concat(res.data.rows);
        this.mescroll.endSuccess(res.data.length);
        this.load = false;
      });
    }
  }
};
if (!Array) {
  const _easycom_tm_navbar2 = common_vendor.resolveComponent("tm-navbar");
  const _easycom_FatFatMeng_Swiper_mfw2 = common_vendor.resolveComponent("FatFatMeng-Swiper-mfw");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_tabs2 = common_vendor.resolveComponent("tm-tabs");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_skeleton2 = common_vendor.resolveComponent("tm-skeleton");
  const _easycom_good_list2 = common_vendor.resolveComponent("good-list");
  const _easycom_tm_sticky2 = common_vendor.resolveComponent("tm-sticky");
  const _easycom_mescroll_uni2 = common_vendor.resolveComponent("mescroll-uni");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_navbar2 + _easycom_FatFatMeng_Swiper_mfw2 + _easycom_tm_input2 + _easycom_tm_divider2 + _easycom_tm_tabs2 + _easycom_tm_sheet2 + _easycom_tm_skeleton2 + _easycom_good_list2 + _easycom_tm_sticky2 + _easycom_mescroll_uni2 + _easycom_tm_app2)();
}
const _easycom_tm_navbar = () => "../../tmui/components/tm-navbar/tm-navbar.js";
const _easycom_FatFatMeng_Swiper_mfw = () => "../../uni_modules/FatFatMeng-Swiper-mfw/components/FatFatMeng-Swiper-mfw/FatFatMeng-Swiper-mfw.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_tabs = () => "../../tmui/components/tm-tabs/tm-tabs.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_skeleton = () => "../../tmui/components/tm-skeleton/tm-skeleton.js";
const _easycom_good_list = () => "../../components/good-list/good-list.js";
const _easycom_tm_sticky = () => "../../tmui/components/tm-sticky/tm-sticky.js";
const _easycom_mescroll_uni = () => "../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_navbar + _easycom_FatFatMeng_Swiper_mfw + _easycom_tm_input + _easycom_tm_divider + _easycom_tm_tabs + _easycom_tm_sheet + _easycom_tm_skeleton + _easycom_good_list + _easycom_tm_sticky + _easycom_mescroll_uni + _easycom_tm_app)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "CDTU \u6210\u5DE5\u8981\u95FB",
      shadow: 0
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      list: $data.SwiperMfwlist,
      current: $data.current,
      autoplay: true
    }),
    d: common_vendor.o((...args) => $options.cu && $options.cu(...args)),
    e: common_vendor.o(() => {
    }),
    f: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57",
      border: 1,
      showClear: true,
      prefix: "tmicon-search",
      searchLabel: "\u641C\u7D22"
    }),
    g: common_vendor.o($options.tabschange),
    h: common_vendor.p({
      list: $data.tabs,
      width: 750,
      height: 80,
      itemHeight: 45,
      itemWidth: 140,
      ["default-name"]: "1"
    }),
    i: common_vendor.p({
      margin: [0, 0]
    }),
    j: $data.load
  }, $data.load ? {
    k: common_vendor.p({
      model: "chat"
    }),
    l: common_vendor.p({
      model: "chat"
    }),
    m: common_vendor.p({
      model: "chat"
    }),
    n: common_vendor.p({
      model: "chat"
    })
  } : {}, {
    o: common_vendor.p({
      list: $data.goods
    }),
    p: common_vendor.p({
      offset: "0"
    }),
    q: common_vendor.sr("mescrollRef", "a851f742-2,a851f742-0"),
    r: common_vendor.o(_ctx.mescrollInit),
    s: common_vendor.o($options.upCallback),
    t: common_vendor.p({
      height: "100%"
    }),
    v: common_vendor.sr("app", "a851f742-0")
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/news/news.vue"]]);
qq.createPage(MiniProgramPage);
