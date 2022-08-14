"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-notice-bar",
  emits: ["click", "close", "getMore", "end"],
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    type: {
      type: String,
      default: "warning"
    },
    volumeIcon: {
      type: Boolean,
      default: true
    },
    volumeSize: {
      type: [Number, String],
      default: 34
    },
    moreIcon: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "horizontal"
    },
    show: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: [Number, String],
      default: 28
    },
    duration: {
      type: [Number, String],
      default: 2e3
    },
    speed: {
      type: [Number, String],
      default: 160
    },
    isCircular: {
      type: Boolean,
      default: true
    },
    playState: {
      type: String,
      default: "play"
    },
    disableTouch: {
      type: Boolean,
      default: true
    },
    borderRadius: {
      type: [Number, String],
      default: 0
    },
    padding: {
      type: [Number, String],
      default: "18rpx 24rpx"
    },
    noListHidden: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isShow() {
      if (this.show == false || this.noListHidden == true && this.list.length == 0)
        return false;
      else
        return true;
    }
  },
  methods: {
    click(index) {
      this.$emit("click", index);
    },
    close() {
      this.$emit("close");
    },
    getMore() {
      this.$emit("getMore");
    },
    end() {
      this.$emit("end");
    }
  }
};
if (!Array) {
  const _easycom_u_row_notice2 = common_vendor.resolveComponent("u-row-notice");
  const _easycom_u_column_notice2 = common_vendor.resolveComponent("u-column-notice");
  (_easycom_u_row_notice2 + _easycom_u_column_notice2)();
}
const _easycom_u_row_notice = () => "../u-row-notice/u-row-notice.js";
const _easycom_u_column_notice = () => "../u-column-notice/u-column-notice.js";
if (!Math) {
  (_easycom_u_row_notice + _easycom_u_column_notice)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.isShow
  }, $options.isShow ? common_vendor.e({
    b: $props.mode == "horizontal" && $props.isCircular
  }, $props.mode == "horizontal" && $props.isCircular ? {
    c: common_vendor.o($options.getMore),
    d: common_vendor.o($options.close),
    e: common_vendor.o($options.click),
    f: common_vendor.p({
      type: $props.type,
      color: $props.color,
      bgColor: $props.bgColor,
      list: $props.list,
      volumeIcon: $props.volumeIcon,
      moreIcon: $props.moreIcon,
      volumeSize: $props.volumeSize,
      closeIcon: $props.closeIcon,
      mode: $props.mode,
      fontSize: $props.fontSize,
      speed: $props.speed,
      playState: $props.playState,
      padding: $props.padding
    })
  } : {}, {
    g: $props.mode == "vertical" || $props.mode == "horizontal" && !$props.isCircular
  }, $props.mode == "vertical" || $props.mode == "horizontal" && !$props.isCircular ? {
    h: common_vendor.o($options.getMore),
    i: common_vendor.o($options.close),
    j: common_vendor.o($options.click),
    k: common_vendor.o($options.end),
    l: common_vendor.p({
      type: $props.type,
      color: $props.color,
      bgColor: $props.bgColor,
      list: $props.list,
      volumeIcon: $props.volumeIcon,
      moreIcon: $props.moreIcon,
      closeIcon: $props.closeIcon,
      mode: $props.mode,
      volumeSize: $props.volumeSize,
      ["disable-touch"]: $props.disableTouch,
      fontSize: $props.fontSize,
      duration: $props.duration,
      playState: $props.playState,
      padding: $props.padding
    })
  } : {}, {
    m: $props.borderRadius + "rpx"
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-054d64d6"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/vk-uview-ui/components/u-notice-bar/u-notice-bar.vue"]]);
qq.createComponent(Component);
