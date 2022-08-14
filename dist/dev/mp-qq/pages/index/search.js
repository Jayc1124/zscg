"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
if (!Math) {
  (tmImage + tmText + tmInput + tmSheet + tmResult + tmCell + tmIcon + tmDivider + tmMessage + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmSheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const tmMessage = () => "../../tmui/components/tm-message/tm-message.js";
const tmInput = () => "../../tmui/components/tm-input/tm-input.js";
const tmDivider = () => "../../tmui/components/tm-divider/tm-divider.js";
const tmIcon = () => "../../tmui/components/tm-icon/tm-icon.js";
const tmCell = () => "../../tmui/components/tm-cell/tm-cell.js";
const tmImage = () => "../../tmui/components/tm-image/tm-image.js";
const tmText = () => "../../tmui/components/tm-text/tm-text.js";
const tmResult = () => "../../tmui/components/tm-result/tm-result.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const totalList = [
      { path: "/pages/showdata/avatar", title: "\u5934\u50CF Avatar" },
      { path: "/pages/showdata/qrcode", title: "\u4E8C\u7EF4\u7801 Qrcode" },
      { path: "/pages/showdata/badge", title: "\u5FBD\u6807 Badge" },
      { path: "/pages/showdata/card", title: "\u5361\u7247 Card" },
      { path: "/pages/showdata/carousel", title: "\u8F6E\u64AD Carousel" },
      { path: "/pages/showdata/collapse", title: "\u6298\u53E0\u9762\u677F Collapse" },
      { path: "/pages/showdata/comment", title: "\u8BC4\u8BBA Comment" },
      { path: "/pages/showdata/cell", title: "\u5355\u5143\u683C Cell" },
      { path: "/pages/showdata/countdown", title: "\u5012\u8BA1\u65F6 Countdown" },
      { path: "/pages/showdata/descriptions", title: "\u63CF\u8FF0 Descriptions" },
      { path: "/pages/showdata/image", title: "\u56FE\u7247 Image" },
      { path: "/pages/showdata/indexes", title: "\u5217\u8868\u7D22\u5F15 Indexes" },
      { path: "/pages/showdata/more", title: "\u663E\u793A\u66F4\u591A More" },
      { path: "/pages/showdata/result", title: "\u7ED3\u679C\u9875 Result" },
      { path: "/pages/showdata/popover", title: "\u6C7D\u6CE1\u5361\u7247 Popover" },
      { path: "/pages/showdata/statistic", title: "\u6570\u503C\u663E\u793A Statistic" },
      { path: "/pages/showdata/table", title: "\u8868\u683C Table" },
      { path: "/pages/showdata/tabs", title: "\u9009\u9879\u5361 Tabs" },
      { path: "/pages/showdata/tag", title: "\u6807\u7B7E Tag" },
      { path: "/pages/showdata/timeline", title: "\u65F6\u95F4\u8F74 Timeline" },
      { path: "/pages/showdata/tree", title: "\u6811 Tree" },
      { path: "/pages/showdata/virtual", title: "\u865A\u62DF\u5217\u8868 Virtual" },
      { path: "/pages/showdata/waterfall", title: "\u7011\u5E03\u6D41 Waterfall" },
      { path: "/pages/other/codeinput", title: "\u9A8C\u8BC1\u7801\u8F93\u5165\u6846 Codeinput" },
      { path: "/pages/other/cropimg", title: "\u56FE\u7247\u88C1\u526A Cropimg" },
      { path: "/pages/other/floatButton", title: "\u60AC\u6D6E\u6309\u94AE FloatButton" },
      { path: "/pages/other/sticky", title: "\u5438\u9876 Sticky" },
      { path: "/pages/layout/divider", title: "\u5206\u5272\u7EBF Divider" },
      { path: "/pages/layout/grid", title: "\u5BAB\u683C Grid" },
      { path: "/pages/layout/row", title: "\u5E03\u5C40 Row" },
      { path: "/pages/layout/sheet", title: "\u57FA\u7840\u5BB9\u5668 Sheet" },
      { path: "/pages/form/cascader", title: "\u7EA7\u8054\u5668(\u70B9\u9009) Cascader" },
      { path: "/pages/form/checkbox", title: "\u590D\u9009\u6846 Checkbox" },
      { path: "/pages/form/calendar", title: "\u65E5\u5386 Calendar" },
      { path: "/pages/form/city", title: "\u57CE\u5E02\u9009\u62E9 City" },
      { path: "/pages/form/form", title: "\u8868\u5355 Form" },
      { path: "/pages/form/input", title: "\u8F93\u5165\u6846 Input" },
      { path: "/pages/form/keyborad", title: "\u952E\u76D8 Keyborad" },
      { path: "/pages/form/picker", title: "\u9009\u62E9\u5668 Picker" },
      { path: "/pages/form/rate", title: "\u8BC4\u5206 Rate" },
      { path: "/pages/form/radio", title: "\u5355\u9009\u6846 Radio" },
      { path: "/pages/form/stepper", title: "\u6B65\u8FDB\u5668 Stepper" },
      { path: "/pages/form/slider", title: "\u6ED1\u5757 Slider" },
      { path: "/pages/form/switch", title: "\u5F00\u5173 Switch" },
      { path: "/pages/form/time", title: "\u65F6\u95F4\u9009\u62E9\u5668 Time" },
      { path: "/pages/form/upload", title: "\u56FE\u7247\u4E0A\u4F20 Upload" },
      { path: "/pages/form/weekbar", title: "\u65F6\u95F4\u5468 Weekbar" },
      { path: "/pages/fankui/alert", title: "\u8B66\u544A\u63D0\u793A Alert" },
      { path: "/pages/fankui/drawer", title: "\u62BD\u5C49 Drawer" },
      { path: "/pages/fankui/darglist", title: "\u5217\u8868\u62D6\u52A8\u6392\u5E8F DragList" },
      { path: "/pages/fankui/modal", title: "\u5BF9\u8BDD\u6846 Modal" },
      { path: "/pages/fankui/message", title: "\u5168\u5C40\u63D0\u793A Message" },
      { path: "/pages/fankui/overlay", title: "\u906E\u7F69 Overlay" },
      { path: "/pages/fankui/progress", title: "\u8FDB\u5EA6\u6761 Progress" },
      { path: "/pages/fankui/spin", title: "\u52A0\u8F7D\u4E2D Spin" },
      { path: "/pages/fankui/skeleton", title: "\u9AA8\u67B6\u5C4F Skeleton" },
      { path: "/pages/fankui/translate", title: "\u52A8\u6548 Translate" },
      { path: "/pages/fankui/notification", title: "\u901A\u77E5\u63D0\u9192 Notificat, nextTickion", nextTick: common_vendor.nextTick },
      { path: "/pages/fankui/slideSwitch", title: "\u5DE6\u6ED1\u64CD\u4F5C\u680F slideSwitch" },
      { path: "/pages/daohang/actionMenu", title: "\u5E95\u90E8\u64CD\u4F5C\u680F ActionMenu" },
      { path: "/pages/daohang/dropdown", title: "\u4E0B\u62C9\u9009\u9879 Dropdown" },
      { path: "/pages/daohang/pagination", title: "\u5206\u9875 Pagination" },
      { path: "/pages/daohang/segtab", title: "\u5206\u6BB5\u5668 Segtab" },
      { path: "/pages/daohang/steps", title: "\u6B65\u9AA4\u6761 Steps" },
      { path: "/pages/changyong/app", title: "\u6839\u8282\u70B9 App" },
      { path: "/pages/changyong/button", title: "\u6309\u94AE Button" },
      { path: "/pages/changyong/icon", title: "\u56FE\u6807 Icon" },
      { path: "/pages/changyong/text", title: "\u6587\u672C\u6807\u7B7E Text" },
      { path: "/pages/daohang/navbar", title: "\u6807\u9898\u5BFC\u822A\u680F Navbar" },
      { path: "/pages/daohang/tabbar", title: "\u5E95\u90E8\u5BFC\u822A Tabbar" },
      { path: "/pages/other/signBoard", title: "\u7B7E\u540D\u677F SignBoard" },
      { path: "/pages/fankui/rollNotice", title: "\u6EDA\u52A8\u901A\u77E5 RollNotice" },
      { path: "/pages/other/barCode", title: "\u6761\u5F62\u7801 BarCode" }
    ];
    const result = common_vendor.ref([]);
    const str = common_vendor.ref("");
    common_vendor.onLoad((obj) => {
      if (typeof (obj == null ? void 0 : obj.key) === "string" && (obj == null ? void 0 : obj.key) != "") {
        str.value = obj == null ? void 0 : obj.key;
        common_vendor.nextTick(() => search());
      }
    });
    function search() {
      if (str.value.trim() == "") {
        result.value = [];
        return;
      }
      let _str = str.value.toLocaleLowerCase();
      let list = totalList.filter((el) => {
        let _lsttr = el.title.toLocaleLowerCase();
        return _lsttr.indexOf(_str) > -1;
      });
      if (list.length === 0) {
        proxy.$refs.msg.show({ model: "error", text: "\u8BF7\u6362\u4E2A\u5173\u952E\u8BCD" });
      } else {
        proxy.$refs.msg.show({ model: "success", text: `\u5DF2\u67E5\u8BE2\u5230${list.length}\u4E2A` });
      }
      result.value = [...list];
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          width: 108,
          height: 67.5,
          src: common_vendor.unref(common_assets.logoimg)
        }),
        b: common_vendor.p({
          _class: "text-weight-b",
          ["font-size"]: 36,
          label: "TMUI 3.0.0"
        }),
        c: common_vendor.p({
          color: "grey",
          label: "\u5168\u7AEF\u517C\u5BB9vue3 TypeScript pinia\u7EC4\u4EF6\u5E93"
        }),
        d: common_vendor.o(search),
        e: common_vendor.o(search),
        f: common_vendor.o(($event) => str.value = $event),
        g: common_vendor.p({
          placeholder: "\u7EC4\u4EF6\u4E2D\u6587/\u82F1\u6587\u540D\u79F0",
          border: 1,
          showClear: true,
          prefix: "tmicon-search",
          searchLabel: "\u641C\u7D22\u7EC4\u4EF6",
          modelValue: str.value
        }),
        h: common_vendor.p({
          darkBgColor: "#050505",
          margin: [0, 0]
        }),
        i: result.value.length === 0
      }, result.value.length === 0 ? {
        j: common_vendor.p({
          showBtn: false,
          subTitle: "\u8BF7\u91CD\u65B0\u8F93\u5165\u5173\u952E\u8BCD"
        })
      } : {}, {
        k: result.value.length > 0
      }, result.value.length > 0 ? {
        l: common_vendor.f(result.value, (item, index, i0) => {
          return {
            a: index,
            b: "938c8c4e-7-" + i0 + ",938c8c4e-0",
            c: common_vendor.p({
              url: item.path,
              margin: [0, 0],
              titleFontSize: 30,
              title: item.title
            })
          };
        })
      } : {}, {
        m: common_vendor.p({
          color: "orange",
          ["font-size"]: 38,
          name: "tmicon-heart-fill"
        }),
        n: common_vendor.p({
          showAvatar: true,
          round: 3,
          titleFontSize: 30,
          title: "\u884C\u52A8\u652F\u6301",
          rightText: "\u770B\u5E7F\u544A\u8D5A\u79EF\u5206"
        }),
        o: common_vendor.p({
          color: "grey-2",
          label: "tmui 3.0.0 \u539F\u751F\u6E32\u67D3\uFF0C\u5168\u7AEF\u517C\u5BB9"
        }),
        p: common_vendor.sr("msg", "938c8c4e-11,938c8c4e-0")
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/pages/index/search.nvue"]]);
qq.createPage(MiniProgramPage);
