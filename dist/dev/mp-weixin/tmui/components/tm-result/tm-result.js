"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (tmIcon + tmSheet + tmTranslate + tmText)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmTranslate = () => "../tm-translate/tm-translate.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-result",
  props: {
    status: {
      type: String,
      default: "empty"
    },
    icon: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    btnText: {
      type: String,
      default: "\u786E\u8BA4"
    },
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    followDark: {
      type: [Boolean, String],
      default: true
    },
    dark: {
      type: [Boolean, String],
      default: false
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    clickDisabled: {
      type: Boolean,
      default: true
    }
  },
  emits: ["click", "resultClick"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const statusData = {
      empty: {
        icon: "tmicon-shiliangzhinengduixiang-",
        title: "\u6570\u636E\u7A7A",
        subTitle: "\u4E0B\u62C9\u5237\u65B0",
        color: "primary"
      },
      error: {
        icon: "tmicon-times",
        title: "\u9519\u8BEF",
        subTitle: "\u8BF7\u6839\u636E\u6307\u793A\u64CD\u4F5C",
        color: "red"
      },
      success: {
        icon: "tmicon-check",
        title: "\u64CD\u4F5C\u6B63\u786E",
        subTitle: "\u8BF7\u7A0D\u5019",
        color: "green"
      },
      warning: {
        icon: "tmicon-exclamation-circle",
        title: "\u5F02\u5E38",
        subTitle: "\u8BF7\u6839\u636E\u6307\u793A\u64CD\u4F5C",
        color: "orange"
      },
      lock: {
        icon: "tmicon-ios-unlock",
        title: "\u6388\u6743\u63D0\u9192",
        subTitle: "\u9700\u8981\u4F60\u7684\u6388\u6743\u8FDB\u4E00\u6B65\u64CD\u4F5C\u3002",
        color: "blue"
      },
      network: {
        icon: "tmicon-wifi-off",
        title: "\u7F51\u7EDC\u9519\u8BEF",
        subTitle: "\u8BF7\u5173\u6CE8\u4F60\u7684\u7F51\u7EDC\u60C5\u51B5",
        color: "blue"
      }
    };
    const icon_rp = common_vendor.computed$1(() => {
      if (props.icon)
        return props.icon;
      if (!props.status)
        return "";
      return statusData[props.status].icon || "";
    });
    const icon_title = common_vendor.computed$1(() => {
      if (props.title)
        return props.title;
      if (!props.status)
        return "";
      return statusData[props.status].title || "";
    });
    const icon_subtitle = common_vendor.computed$1(() => {
      if (props.subTitle)
        return props.subTitle;
      if (!props.status)
        return "";
      return statusData[props.status].subTitle || "";
    });
    const icon_color = common_vendor.computed$1(() => {
      if (props.color)
        return props.color;
      if (!props.status)
        return "";
      return statusData[props.status].color || "";
    });
    const onClick = (e) => {
      if (props.clickDisabled)
        return;
      emits("resultClick", e);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          _style: "line-height:normal",
          dark: props.dark,
          followDark: props.followDark,
          fontSize: 80,
          name: common_vendor.unref(icon_rp)
        }),
        b: common_vendor.p({
          dark: props.dark,
          followTheme: false,
          followDark: props.followDark,
          _class: "flex-center flex-row rounded",
          width: 140,
          height: 140,
          round: 25,
          color: common_vendor.unref(icon_color),
          text: true
        }),
        c: common_vendor.p({
          eventPenetrationEnabled: true,
          name: "zoom",
          delay: 300
        }),
        d: common_vendor.p({
          dark: props.dark,
          followDark: props.followDark,
          _class: "text-weight-b",
          fontSize: 34,
          label: common_vendor.unref(icon_title)
        }),
        e: common_vendor.p({
          dark: props.dark,
          followDark: props.followDark,
          _class: "opacity-6 ",
          fontSize: 24,
          label: common_vendor.unref(icon_subtitle)
        }),
        f: props.showBtn
      }, props.showBtn ? {
        g: common_vendor.p({
          userInteractionEnabled: false,
          dark: props.dark,
          _class: "text-size-n",
          followDark: props.followDark,
          label: __props.btnText
        }),
        h: common_vendor.o(($event) => emits("click", $event)),
        i: common_vendor.p({
          padding: [0, 0],
          height: 80,
          dark: __props.dark,
          followTheme: props.followTheme,
          followDark: props.followDark,
          shadow: 3,
          linear: "right",
          color: common_vendor.unref(icon_color),
          _style: "cursor: pointer;",
          round: 4,
          width: 420,
          _class: "flex-center",
          margin: [0, 32]
        })
      } : {}, {
        j: common_vendor.o(onClick)
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-result/tm-result.vue"]]);
wx.createComponent(Component);
