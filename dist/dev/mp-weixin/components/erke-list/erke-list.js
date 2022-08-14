"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      time: "00.00.00",
      countdown: "",
      timer: null
    };
  },
  computed: {
    format1(status) {
      return function(status2) {
        if (status2 == 1)
          return "\u62A5\u540D\u4E2D";
        if (status2 == 3)
          return "\u8FDB\u884C\u4E2D";
        if (status2 == 4)
          return "\u5F85\u5B8C\u7ED3";
        if (status2 == 5)
          return "\u5DF2\u5B8C\u7ED3";
      };
    }
  },
  methods: {
    getDateDiff(data) {
      var timePublish = new Date(data);
      var timeNow = new Date();
      var minute = 1e3 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var result = "2";
      var diffValue = timePublish - timeNow;
      var diffDay = diffValue / day;
      var diffHour = diffValue / hour;
      result = parseInt(diffDay) + "\u5929";
      hour = parseInt(diffHour) % 24;
      result = result + hour + "\u5C0F\u65F6\u540E\u7ED3\u675F";
      if (parseInt(diffDay) < 0) {
        return "\u62A5\u540D\u5DF2\u622A\u81F3";
      }
      return result;
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    add(m) {
      return " \u79EF\u5206: " + m;
    }
  }
};
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_image2 = common_vendor.resolveComponent("tm-image");
  const _easycom_tm_tag2 = common_vendor.resolveComponent("tm-tag");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_result2 = common_vendor.resolveComponent("tm-result");
  (_easycom_tm_text2 + _easycom_tm_divider2 + _easycom_tm_image2 + _easycom_tm_tag2 + _easycom_tm_sheet2 + _easycom_tm_result2)();
}
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_image = () => "../../tmui/components/tm-image/tm-image.js";
const _easycom_tm_tag = () => "../../tmui/components/tm-tag/tm-tag.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_result = () => "../../tmui/components/tm-result/tm-result.js";
if (!Math) {
  (_easycom_tm_text + _easycom_tm_divider + _easycom_tm_image + _easycom_tm_tag + _easycom_tm_sheet + _easycom_tm_result)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.list, (good, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t$1(good.name),
        b: "dd0eb916-1-" + i0 + "," + ("dd0eb916-0-" + i0),
        c: "dd0eb916-2-" + i0 + "," + ("dd0eb916-0-" + i0),
        d: "dd0eb916-3-" + i0 + "," + ("dd0eb916-0-" + i0),
        e: common_vendor.p({
          preview: true,
          width: 300,
          round: 2,
          height: 200,
          src: good.logo
        }),
        f: "dd0eb916-4-" + i0 + "," + ("dd0eb916-0-" + i0),
        g: common_vendor.p({
          text: true,
          shadow: 0,
          color: "blue",
          size: "m",
          icon: "tmicon-tag-fill",
          label: good.category
        }),
        h: "dd0eb916-5-" + i0 + "," + ("dd0eb916-0-" + i0),
        i: common_vendor.p({
          text: true,
          shadow: 0,
          color: "green",
          size: "m",
          icon: "tmicon-position-fill",
          label: good.orgName
        }),
        j: "dd0eb916-6-" + i0 + "," + ("dd0eb916-0-" + i0),
        k: common_vendor.p({
          text: true,
          shadow: 0,
          icon: "tmicon-rank",
          color: "pink",
          size: "m",
          label: $options.add(good.hours)
        }),
        l: "dd0eb916-7-" + i0 + "," + ("dd0eb916-0-" + i0),
        m: common_vendor.p({
          text: true,
          shadow: 0,
          icon: "tmicon-weixinzhifu",
          color: "orange",
          size: "m",
          label: $options.format1(good.statusAll)
        }),
        n: "dd0eb916-8-" + i0 + "," + ("dd0eb916-0-" + i0),
        o: common_vendor.p({
          text: true,
          shadow: 0,
          icon: "tmicon-clock-fill",
          color: "purple",
          size: "m",
          label: $options.getDateDiff(good.endTime)
        }),
        p: "dd0eb916-0-" + i0
      }, $props.list.length == 0 ? {
        q: "dd0eb916-9-" + i0,
        r: common_vendor.p({
          showBtn: false
        })
      } : {}, {
        s: "good" + good.id,
        t: good.id
      });
    }),
    b: common_vendor.p({
      ["font-size"]: 30,
      _class: "font-weight-b",
      label: ""
    }),
    c: common_vendor.p({
      margin: [5, 5]
    }),
    d: $props.list.length == 0
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/erke-list/erke-list.vue"]]);
wx.createComponent(Component);
