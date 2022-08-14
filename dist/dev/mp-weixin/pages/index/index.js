"use strict";
var common_vendor = require("../../common/vendor.js");
var tmui_tool_lib_tmpinia = require("../../tmui/tool/lib/tmpinia.js");
var common_request = require("../../common/request.js");
require("../../tmui/tool/theme/theme.js");
require("../../tmui/tool/theme/colortool.js");
require("../../tmui/tool/lib/interface.js");
require("../../theme/index.js");
require("../../tmui/tool/function/util.js");
require("../../tmui/tool/function/preview.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_tm_waterfall_item2 = common_vendor.resolveComponent("tm-waterfall-item");
  const _easycom_tm_waterfall2 = common_vendor.resolveComponent("tm-waterfall");
  (_easycom_u_swiper2 + _easycom_tm_waterfall_item2 + _easycom_tm_waterfall2)();
}
const _easycom_u_swiper = () => "../../uni_modules/vk-uview-ui/components/u-swiper/u-swiper.js";
const _easycom_tm_waterfall_item = () => "../../tmui/components/tm-waterfall-item/tm-waterfall-item.js";
const _easycom_tm_waterfall = () => "../../tmui/components/tm-waterfall/tm-waterfall.js";
if (!Math) {
  (tmIcon + tmNavbar + tmInput + tmSheet + _easycom_u_swiper + tmCell + tmImage + tmText + tmGridItem + tmGrid + tmDivider + _easycom_tm_waterfall_item + _easycom_tm_waterfall + tmFloatButton + tmMessage + tmButton + tmDrawer + tmSticky + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmSheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const tmButton = () => "../../tmui/components/tm-button/tm-button.js";
const tmFloatButton = () => "../../tmui/components/tm-float-button/tm-float-button.js";
const tmMessage = () => "../../tmui/components/tm-message/tm-message.js";
const tmInput = () => "../../tmui/components/tm-input/tm-input.js";
const tmSticky = () => "../../tmui/components/tm-sticky/tm-sticky.js";
const tmDivider = () => "../../tmui/components/tm-divider/tm-divider.js";
const tmIcon = () => "../../tmui/components/tm-icon/tm-icon.js";
const tmGridItem = () => "../../tmui/components/tm-grid-item/tm-grid-item.js";
const tmGrid = () => "../../tmui/components/tm-grid/tm-grid.js";
const tmNavbar = () => "../../tmui/components/tm-navbar/tm-navbar.js";
const tmCell = () => "../../tmui/components/tm-cell/tm-cell.js";
const tmImage = () => "../../tmui/components/tm-image/tm-image.js";
const tmText = () => "../../tmui/components/tm-text/tm-text.js";
const tmDrawer = () => "../../tmui/components/tm-drawer/tm-drawer.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const str = common_vendor.ref("");
    const showCustomColor = common_vendor.ref("#60ab41");
    const showCustomName = common_vendor.ref("darkGreen");
    const showCustom = common_vendor.ref(false);
    const listimg = common_vendor.ref([]);
    const list2 = common_vendor.ref([]);
    const list = common_vendor.ref([]);
    const list_yule = common_vendor.ref([]);
    const list3 = common_vendor.ref([]);
    const navList = common_vendor.ref([]);
    const newslist = common_vendor.ref([]);
    common_vendor.ref(0);
    function get_gongneng() {
      common_request.request.httpTokenRequest({
        url: "wx/getTools",
        method: "get"
      }, {}).then((res) => {
        list.value = res.data.data[1].iconsList;
        list_yule.value = res.data.data[2].iconsList;
      });
    }
    function getbannaer() {
      common_request.request.httpRequest({
        url: "notice/noticeBanner/getAppInfo"
      }).then((res) => {
        if (res.data.code == 200) {
          navList.value = res.data.data;
          listimg.value = res.data.data.slice(0, 3);
          list3.value = res.data.data.slice(3, 7);
          list2.value = res.data.data.slice(7);
        }
      });
    }
    function openurl1(index) {
      console.log(listimg.value[index].navurl);
      common_vendor.index.navigateTo({
        url: listimg.value[index].navurl
      });
    }
    function openurl2(index) {
      console.log(list3.value[index].navurl);
      common_vendor.index.navigateTo({
        url: list3.value[index].navurl
      });
    }
    function openurl3(index) {
      console.log(list2.value[index].navurl);
      common_vendor.index.navigateTo({
        url: list2.value[index].navurl
      });
    }
    function navNews(id) {
      console.log(id);
      common_vendor.index.navigateTo({
        url: "/pages/news/detail/detail?detailData=" + id
      });
    }
    function navNewsBar() {
      common_vendor.index.switchTab({
        url: "/pages/news/news"
      });
    }
    function get_news() {
      common_request.request.httpTokenRequest({
        url: "news/item/1?pageNum=1",
        method: "get"
      }, {}).then((res) => {
        newslist.value = res.data.rows;
      });
    }
    function onChangeDark() {
      proxy.$refs.app.setDark();
    }
    function search() {
      if (str.value.trim() === "") {
        proxy.$refs.msg.show({
          model: "error",
          text: "\u4E0D\u80FD\u4E3A\u7A7A",
          mask: true
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "search?key=" + str.value
      });
    }
    function changeCustomColor() {
      console.log(1);
      if (!showCustomColor.value || !showCustomName.value) {
        proxy.$refs.msg.show({
          model: "error",
          text: "\u5FC5\u586B\u5185\u5BB9",
          mask: true
        });
        return;
      }
      showCustom.value = false;
      store.setTmVuetifyAddTheme(showCustomName.value, showCustomColor.value);
    }
    common_vendor.onLoad(() => {
      getbannaer();
      common_vendor.index.setStorageSync("anhei", store.tmStore.dark);
      get_gongneng();
      get_news();
      let interstitialAd = null;
      if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
          adUnitId: "adunit-197d1e1914ce88ec"
        });
        interstitialAd.onLoad(() => {
        });
        interstitialAd.onError((err) => {
        });
        interstitialAd.onClose(() => {
        });
      }
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err);
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onChangeDark),
        b: common_vendor.p({
          color: common_vendor.unref(store).tmStore.dark ? "yellow" : "",
          _class: "pl-32",
          ["font-size"]: 42,
          name: "tmicon-ios-sunny"
        }),
        c: common_vendor.p({
          title: "CDTU \u638C\u4E0A\u6210\u5DE5",
          shadow: 0,
          ["hide-home"]: true
        }),
        d: common_vendor.o(search),
        e: common_vendor.o(($event) => str.value = $event),
        f: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
          border: 1,
          showClear: true,
          prefix: "tmicon-search",
          searchLabel: "\u641C\u7D22\u529F\u80FD",
          modelValue: str.value
        }),
        g: common_vendor.p({
          margin: [0, 0]
        }),
        h: common_vendor.o(openurl1),
        i: common_vendor.p({
          height: 200,
          width: 600,
          list: listimg.value,
          name: "img",
          ["border-radius"]: 10,
          mode: "none",
          effect3d: true,
          ["bg-color"]: ""
        }),
        j: common_vendor.o(navNewsBar),
        k: common_vendor.p({
          margin: [0, 0],
          padding: [0, 5],
          rightText: "",
          titleFontSize: 32,
          title: "\u9189\u7F8E\u6210\u5DE5"
        }),
        l: common_vendor.f(list3.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => openurl2(index)),
            b: "d82620ce-9-" + i0 + ",d82620ce-7",
            c: common_vendor.p({
              width: 340,
              height: 180,
              round: 8,
              margin: [0, 10],
              src: item.img
            }),
            d: index
          };
        }),
        m: common_vendor.p({
          round: 3,
          margin: [5, 5]
        }),
        n: common_vendor.o(navNewsBar),
        o: common_vendor.p({
          margin: [0, 0],
          padding: [0, 5],
          rightText: "\u67E5\u770B\u66F4\u591A",
          titleFontSize: 32,
          title: "\u5B66\u4E60"
        }),
        p: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: "d82620ce-14-" + i0 + "," + ("d82620ce-13-" + i0),
            b: common_vendor.p({
              width: 100,
              height: 100,
              round: 3,
              src: item.cuicon
            }),
            c: "d82620ce-15-" + i0 + "," + ("d82620ce-13-" + i0),
            d: common_vendor.p({
              ["font-size"]: 28,
              ["text-weight-b"]: true,
              label: item.name
            }),
            e: "d82620ce-13-" + i0 + ",d82620ce-12",
            f: common_vendor.p({
              url: item.url,
              height: 160,
              count: item.color,
              color: item.ys,
              dot: item.status
            }),
            g: index
          };
        }),
        q: common_vendor.p({
          col: 4,
          width: 698
        }),
        r: common_vendor.p({
          round: 3,
          margin: [5, 0]
        }),
        s: common_vendor.o(openurl3),
        t: common_vendor.p({
          height: 220,
          list: list2.value,
          name: "img",
          mode: "none",
          ["bg-color"]: ""
        }),
        v: common_vendor.o(navNewsBar),
        w: common_vendor.p({
          margin: [0, 0],
          padding: [0, 5],
          rightText: "\u67E5\u770B\u66F4\u591A",
          titleFontSize: 32,
          title: "\u5A31\u4E50"
        }),
        x: common_vendor.f(list_yule.value, (item, index, i0) => {
          return {
            a: "d82620ce-21-" + i0 + "," + ("d82620ce-20-" + i0),
            b: common_vendor.p({
              width: 100,
              height: 100,
              round: 3,
              src: item.cuicon
            }),
            c: "d82620ce-22-" + i0 + "," + ("d82620ce-20-" + i0),
            d: common_vendor.p({
              ["font-size"]: 28,
              ["text-weight-b"]: true,
              label: item.name
            }),
            e: "d82620ce-20-" + i0 + ",d82620ce-19",
            f: common_vendor.p({
              url: item.url,
              height: 160,
              count: item.color,
              color: item.ys,
              dot: item.status
            }),
            g: index
          };
        }),
        y: common_vendor.p({
          col: 4,
          width: 698
        }),
        z: common_vendor.p({
          round: 3,
          margin: [5, 5]
        }),
        A: common_vendor.o(navNewsBar),
        B: common_vendor.p({
          margin: [0, 0],
          padding: [0, 0],
          rightText: "\u67E5\u770B\u66F4\u591A",
          titleFontSize: 32,
          title: "\u6210\u5DE5\u9662 \xB7 \u6700\u65B0\u8981\u95FB\u{1F525}"
        }),
        C: common_vendor.f(newslist.value, (item, index, i0) => {
          return {
            a: "d82620ce-28-" + i0 + "," + ("d82620ce-27-" + i0),
            b: common_vendor.p({
              _class: "text-overflow-2",
              label: item.title
            }),
            c: "d82620ce-27-" + i0 + ",d82620ce-26",
            d: common_vendor.p({
              img: item.img || "https://cdn2.jaycao.com/cdtu/cdtunews.jpg"
            }),
            e: common_vendor.o(($event) => navNews(item.id))
          };
        }),
        D: common_vendor.p({
          width: 720
        }),
        E: common_vendor.p({
          margin: [0, 0]
        }),
        F: common_vendor.p({
          color: "grey-2",
          label: "\u638C\u4E0A\u6210\u5DE5 3.0.0 \u5168\u7AEF\u517C\u5BB9,\u539F\u751F\u6E32\u67D3"
        }),
        G: common_vendor.o(onChangeDark),
        H: common_vendor.p({
          btn: {
            icon: "tmicon-ios-sunny",
            color: "pink",
            linear: "right"
          }
        }),
        I: common_vendor.sr("msg", "d82620ce-31,d82620ce-1"),
        J: common_vendor.p({
          _class: "text-weight-b",
          ["font-size"]: 32,
          label: "\u81EA\u5B9A\u4E49\u4E3B\u9898"
        }),
        K: common_vendor.o(($event) => showCustomColor.value = $event),
        L: common_vendor.p({
          prefixLabel: "\u989C\u8272\u503C",
          placeholder: "\u8BF7\u8F93\u5165\u989C\u8272\u503C,\u6BD4\u5982:#FF00FF",
          border: 1,
          showClear: true,
          modelValue: showCustomColor.value
        }),
        M: common_vendor.o(($event) => showCustomName.value = $event),
        N: common_vendor.p({
          prefixLabel: "\u989C\u8272\u540D\u79F0",
          margin: [0, 24],
          placeholder: "\u5B57\u6BCD,\u5982:darkGreen",
          border: 1,
          showClear: true,
          modelValue: showCustomName.value
        }),
        O: common_vendor.o(changeCustomColor),
        P: common_vendor.p({
          block: true,
          label: "\u786E\u8BA4\u5207\u6362"
        }),
        Q: common_vendor.o(($event) => showCustom.value = $event),
        R: common_vendor.p({
          placement: "center",
          hideHeader: true,
          height: 450,
          width: 600,
          show: showCustom.value
        }),
        S: common_vendor.p({
          offset: "0"
        }),
        T: common_vendor.sr("app", "d82620ce-0")
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/pages/index/index.nvue"]]);
wx.createPage(MiniProgramPage);
