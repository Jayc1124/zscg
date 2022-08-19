"use strict";
var common_vendor = require("../../common/vendor.js");
var store_course = require("../../store/course.js");
var common_util = require("../../common/util.js");
require("../../modules/pinia.js");
require("../../tmui/tool/lib/tmpinia.js");
require("../../tmui/tool/theme/theme.js");
require("../../tmui/tool/theme/colortool.js");
require("../../tmui/tool/lib/interface.js");
require("../../theme/index.js");
require("../../tmui/tool/function/util.js");
require("../../tmui/tool/function/preview.js");
if (!Math) {
  (tmIcon + tmText + tmNavbar + timeTableAction + timeTableHeader + timeTableContent + tmSticky + tmActionMenu + TabBar + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmIcon = () => "../../tmui/components/tm-icon/tm-icon.js";
const tmText = () => "../../tmui/components/tm-text/tm-text.js";
const TabBar = () => "../../components/TheTabBar.js";
const tmNavbar = () => "../../tmui/components/tm-navbar/tm-navbar.js";
const tmSticky = () => "../../tmui/components/tm-sticky/tm-sticky.js";
const tmActionMenu = () => "../../tmui/components/tm-action-menu/tm-action-menu.js";
const timeTableHeader = () => "../../components/timetable/TimeTableHeader.js";
const timeTableAction = () => "../../components/timetable/TimeTableAction.js";
const timeTableContent = () => "../../components/timetable/TimeTableContent.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const show = common_vendor.ref(false);
    const showTimeTableAction = common_vendor.ref(false);
    const list = common_vendor.ref([
      { text: "\u82F9\u679C", id: "1" },
      { text: "\u83E0\u841D", id: "2" },
      { text: "\u9999\u8549", id: "3" }
    ]);
    const courseStore = store_course.useCourseStore();
    common_vendor.onShow(async () => {
      console.log("App Show");
      const someDate = new Date("2022-08-01");
      courseStore.setStartDay(someDate);
    });
    common_vendor.onPullDownRefresh(async () => {
      console.log("\u4E0B\u62C9\u5237\u65B0");
      common_vendor.index.stopPullDownRefresh();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(common_vendor.unref(common_util.onChangeDark)),
        b: common_vendor.p({
          ["font-size"]: 40,
          _class: "pr-20",
          name: common_vendor.unref(common_util.IsDark)() ? "tmicon-md-moon" : "tmicon-ios-sunny"
        }),
        c: common_vendor.o(($event) => show.value = true),
        d: common_vendor.p({
          ["font-size"]: 32,
          _class: "pl-20",
          name: "tmicon-cog-fill"
        }),
        e: common_vendor.p({
          ["font-size"]: 30,
          _class: "text-weight-b text-overflow-1 pl-24 pr-8"
        }),
        f: common_vendor.p({
          ["font-size"]: 36,
          _class: "b-16",
          name: showTimeTableAction.value ? "tmicon-sort-down" : "tmicon-sort-up"
        }),
        g: common_vendor.o(($event) => showTimeTableAction.value = !showTimeTableAction.value),
        h: common_vendor.p({
          title: "",
          hideHome: true,
          blur: true,
          padding: [0, 0],
          margin: [0, 0],
          shadow: 0,
          isFixed: false
        }),
        i: common_vendor.o(($event) => showTimeTableAction.value = false),
        j: common_vendor.p({
          show: showTimeTableAction.value,
          list: list.value
        }),
        k: common_vendor.p({
          offset: 0
        }),
        l: common_vendor.o(($event) => show.value = $event),
        m: common_vendor.p({
          list: list.value,
          modelValue: show.value
        }),
        n: common_vendor.p({
          active: 3
        }),
        o: common_vendor.sr("app", "5e7a35ac-0"),
        p: common_vendor.p({
          color: "white"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/pages/kebiao/index.nvue"]]);
wx.createPage(MiniProgramPage);
