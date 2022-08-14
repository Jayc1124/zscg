"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  emits: ["close", "getMore", "end"],
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
    direction: {
      type: String,
      default: "row"
    },
    show: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: [Number, String],
      default: 26
    },
    duration: {
      type: [Number, String],
      default: 2e3
    },
    volumeSize: {
      type: [Number, String],
      default: 34
    },
    speed: {
      type: Number,
      default: 160
    },
    isCircular: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: "horizontal"
    },
    playState: {
      type: String,
      default: "play"
    },
    disableTouch: {
      type: Boolean,
      default: true
    },
    padding: {
      type: [Number, String],
      default: "18rpx 24rpx"
    }
  },
  computed: {
    computeColor() {
      if (this.color)
        return this.color;
      else if (this.type == "none")
        return "#606266";
      else
        return this.type;
    },
    textStyle() {
      let style = {};
      if (this.color)
        style.color = this.color;
      else if (this.type == "none")
        style.color = "#606266";
      style.fontSize = this.fontSize + "rpx";
      return style;
    },
    vertical() {
      if (this.mode == "horizontal")
        return false;
      else
        return true;
    },
    computeBgColor() {
      if (this.bgColor)
        return this.bgColor;
      else if (this.type == "none")
        return "transparent";
    }
  },
  data() {
    return {};
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
    change(e) {
      let index = e.detail.current;
      if (index == this.list.length - 1) {
        this.$emit("end");
      }
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.volumeIcon
  }, $props.volumeIcon ? {
    b: common_vendor.p({
      name: "volume-fill",
      size: $props.volumeSize,
      color: $options.computeColor
    })
  } : {}, {
    c: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: common_vendor.t$1(item),
        b: common_vendor.o(($event) => $options.click(index)),
        c: index
      };
    }),
    d: common_vendor.s($options.textStyle),
    e: common_vendor.n("u-type-" + $props.type),
    f: $props.disableTouch,
    g: common_vendor.o((...args) => $options.change && $options.change(...args)),
    h: $props.autoplay && $props.playState == "play",
    i: $options.vertical,
    j: $props.duration,
    k: $props.moreIcon
  }, $props.moreIcon ? {
    l: common_vendor.o($options.getMore),
    m: common_vendor.p({
      name: "arrow-right",
      size: 26,
      color: $options.computeColor
    })
  } : {}, {
    n: $props.closeIcon
  }, $props.closeIcon ? {
    o: common_vendor.o($options.close),
    p: common_vendor.p({
      name: "close",
      size: 24,
      color: $options.computeColor
    })
  } : {}, {
    q: $options.computeBgColor,
    r: $props.padding,
    s: common_vendor.n($props.type ? `u-type-${$props.type}-light-bg` : "")
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-480d35c6"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/vk-uview-ui/components/u-column-notice/u-column-notice.vue"]]);
qq.createComponent(Component);
