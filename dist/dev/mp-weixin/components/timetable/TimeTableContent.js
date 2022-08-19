"use strict";
var common_vendor = require("../../common/vendor.js");
var store_course = require("../../store/course.js");
var common_request = require("../../common/request.js");
require("../../modules/pinia.js");
if (!Array) {
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  _easycom_tm_sheet2();
}
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
if (!Math) {
  (tmText + tmTranslate + _easycom_tm_sheet + tmOverlay)();
}
const tmText = () => "../../tmui/components/tm-text/tm-text.js";
const tmTranslate = () => "../../tmui/components/tm-translate/tm-translate.js";
const tmOverlay = () => "../../tmui/components/tm-overlay/tm-overlay.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "TimeTableContent",
  setup(__props) {
    common_vendor.reactive({
      data: "",
      token: ""
    });
    common_vendor.onLoad(() => {
      getCourse();
    });
    function getCourse() {
      common_request.request.httpJwRequest({
        url: "student/curriculum?week=&kbjcmsid=",
        method: "post"
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
        }
      });
    }
    const parserCourseTitle = (title) => {
      return title.length > 12 ? title.substring(0, 12) : title;
    };
    const showCourseCard = common_vendor.ref(false);
    const ClickCourse = (course) => {
      showCourseCard.value = true;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(store_course.courseTimeList), (courseTime, courseIndex, i0) => {
          return {
            a: "2a2634ba-0-" + i0,
            b: common_vendor.p({
              _class: "font-weight-b",
              ["font-size"]: 20,
              label: courseIndex + 1
            }),
            c: common_vendor.t$1(courseTime.s),
            d: "2a2634ba-1-" + i0,
            e: common_vendor.t$1(courseTime.e),
            f: "2a2634ba-2-" + i0,
            g: courseIndex
          };
        }),
        b: common_vendor.p({
          _class: "font-weight-s",
          color: "grey-darken-1",
          ["font-size"]: 18
        }),
        c: common_vendor.p({
          _class: "font-weight-s",
          color: "grey-darken-1",
          ["font-size"]: 18
        }),
        d: common_vendor.f([1, 2, 3, 4, 5], (_, dIndex, i0) => {
          return {
            a: common_vendor.f([1, 2, 3, 4, 5, 6, 7], (_2, tIndex, i1) => {
              return {
                a: common_vendor.unref(store_course.colorArrayList)[0][Math.floor(Math.random() * (7 - tIndex + 1) + 0)],
                b: "2a2634ba-3-" + i0 + "-" + i1,
                c: common_vendor.s("width:13vw;margin-left:" + tIndex * 13 + "vw;margin-top:" + dIndex * 14.5 + "vh;"),
                d: tIndex
              };
            }),
            b: dIndex
          };
        }),
        e: common_vendor.t$1(parserCourseTitle("\u5E02\u573A\u8425\u9500\u5B66")),
        f: common_vendor.t$1(`
@XC4213`),
        g: ("XC4213".length >= 5 ? "20" : "22") + "rpx",
        h: common_vendor.o(ClickCourse),
        i: common_vendor.p({
          name: "fade",
          autoPlay: true,
          duration: 500
        }),
        j: `100vh`,
        k: common_vendor.p({
          label: "todo: \u8BFE\u7A0B\u5361\u7247\u5C55\u793A\u8BE6\u60C5"
        }),
        l: common_vendor.o(() => {
        }),
        m: common_vendor.o(($event) => showCourseCard.value = $event),
        n: common_vendor.p({
          show: showCourseCard.value
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/components/timetable/TimeTableContent.vue"]]);
wx.createComponent(Component);
