"use strict";
var common_vendor = require("../../common/vendor.js");
var store_course = require("../../store/course.js");
var tmui_tool_theme_theme = require("../../tmui/tool/theme/theme.js");
require("../../modules/pinia.js");
require("../../tmui/tool/theme/colortool.js");
require("../../tmui/tool/lib/interface.js");
require("../../theme/index.js");
if (!Math) {
  (tmText + tmSheet)();
}
const tmSheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const tmText = () => "../../tmui/components/tm-text/tm-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "TimeTableHeader",
  setup(__props) {
    const _width = common_vendor.index.getSystemInfoSync().windowWidth;
    const {
      currentMonth,
      originalWeekIndex,
      currentWeekIndex,
      originalWeekWeekIndex,
      currentWeekDayArray
    } = common_vendor.storeToRefs(store_course.useCourseStore());
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["font-size"]: 30,
          _class: "font-weight-b",
          label: common_vendor.unref(currentMonth)
        }),
        b: common_vendor.p({
          ["font-size"]: 26,
          _class: "font-weight-s",
          label: "\u6708"
        }),
        c: common_vendor.f(common_vendor.unref(currentWeekDayArray), (item, index, i0) => {
          return {
            a: common_vendor.t$1(common_vendor.unref(store_course.weekTitle)[index]),
            b: "14d0eb5c-3-" + i0 + ",14d0eb5c-0",
            c: common_vendor.p({
              color: common_vendor.unref(originalWeekWeekIndex) === index ? "primary" : "",
              ["font-size"]: 30,
              _class: "font-weight-b text-align-center"
            }),
            d: "14d0eb5c-4-" + i0 + ",14d0eb5c-0",
            e: common_vendor.p({
              ["font-size"]: 26,
              color: common_vendor.unref(originalWeekWeekIndex) === index ? "primary" : "",
              _class: "font-weight-n text-align-center",
              label: item,
              border: 5,
              ["border-direction"]: "bottom"
            }),
            f: index,
            g: common_vendor.s(common_vendor.unref(originalWeekWeekIndex) === index ? {
              borderBottomStyle: "solid",
              borderBottomWidth: "3px",
              borderBottomColor: common_vendor.unref(tmui_tool_theme_theme.theme).getColor("primary").csscolor,
              borderBottomLeftRadius: "1px",
              borderBottomRightRadius: "1px"
            } : {})
          };
        }),
        d: common_vendor.p({
          _class: "flex flex-row flex-around",
          blur: true,
          width: common_vendor.unref(_width),
          _style: {
            width: common_vendor.unref(_width) + "px"
          },
          margin: [0, 0],
          padding: [0, 12],
          height: 80,
          shadow: 0,
          unit: "rpx"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/components/timetable/TimeTableHeader.vue"]]);
wx.createComponent(Component);
