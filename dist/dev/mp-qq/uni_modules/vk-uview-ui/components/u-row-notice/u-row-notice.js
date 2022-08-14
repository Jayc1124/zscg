"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  emits: ["close", "getMore"],
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
    show: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: [Number, String],
      default: 26
    },
    volumeSize: {
      type: [Number, String],
      default: 34
    },
    speed: {
      type: [Number, String],
      default: 160
    },
    playState: {
      type: String,
      default: "play"
    },
    padding: {
      type: [Number, String],
      default: "18rpx 24rpx"
    }
  },
  data() {
    return {
      textWidth: 0,
      boxWidth: 0,
      animationDuration: "10s",
      animationPlayState: "paused",
      showText: ""
    };
  },
  watch: {
    list: {
      immediate: true,
      handler(val) {
        this.showText = val.join("\uFF0C");
        this.$nextTick(() => {
          this.initSize();
        });
      }
    },
    playState(val) {
      if (val == "play")
        this.animationPlayState = "running";
      else
        this.animationPlayState = "paused";
    },
    speed(val) {
      this.initSize();
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
    computeBgColor() {
      if (this.bgColor)
        return this.bgColor;
      else if (this.type == "none")
        return "transparent";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSize();
    });
  },
  methods: {
    initSize() {
      let query = [];
      let textQuery = new Promise((resolve, reject) => {
        common_vendor.index.createSelectorQuery().in(this).select(`#u-notice-content`).boundingClientRect().exec((ret) => {
          this.textWidth = ret[0].width;
          resolve();
        });
      });
      query.push(textQuery);
      Promise.all(query).then(() => {
        this.animationDuration = `${this.textWidth / common_vendor.index.upx2px(this.speed)}s`;
        this.animationPlayState = "paused";
        setTimeout(() => {
          if (this.playState == "play" && this.autoplay)
            this.animationPlayState = "running";
        }, 10);
      });
    },
    click(index) {
      this.$emit("click");
    },
    close() {
      this.$emit("close");
    },
    getMore() {
      this.$emit("getMore");
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
    a: $props.show
  }, $props.show ? common_vendor.e({
    b: $props.volumeIcon
  }, $props.volumeIcon ? {
    c: common_vendor.p({
      name: "volume-fill",
      size: $props.volumeSize,
      color: $options.computeColor
    })
  } : {}, {
    d: common_vendor.t$1($data.showText),
    e: common_vendor.o((...args) => $options.click && $options.click(...args)),
    f: common_vendor.s($options.textStyle),
    g: common_vendor.n("u-type-" + $props.type),
    h: $data.animationDuration,
    i: $data.animationPlayState,
    j: $props.moreIcon
  }, $props.moreIcon ? {
    k: common_vendor.o($options.getMore),
    l: common_vendor.p({
      name: "arrow-right",
      size: 26,
      color: $options.computeColor
    })
  } : {}, {
    m: $props.closeIcon
  }, $props.closeIcon ? {
    n: common_vendor.o($options.close),
    o: common_vendor.p({
      name: "close",
      size: 24,
      color: $options.computeColor
    })
  } : {}, {
    p: $options.computeBgColor,
    q: $props.padding,
    r: common_vendor.n($props.type ? `u-type-${$props.type}-light-bg` : "")
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d9c5bc14"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/vk-uview-ui/components/u-row-notice/u-row-notice.vue"]]);
qq.createComponent(Component);
