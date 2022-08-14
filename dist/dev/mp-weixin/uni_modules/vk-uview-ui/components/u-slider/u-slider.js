"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-slider",
  emits: ["update:modelValue", "input", "start", "moving", "end"],
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    blockWidth: {
      type: [Number, String],
      default: 30
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    height: {
      type: [Number, String],
      default: 6
    },
    activeColor: {
      type: String,
      default: "#2979ff"
    },
    inactiveColor: {
      type: String,
      default: "#c0c4cc"
    },
    blockColor: {
      type: String,
      default: "#ffffff"
    },
    blockStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      startX: 0,
      status: "end",
      newValue: 0,
      distanceX: 0,
      startValue: 0,
      barStyle: {},
      sliderRect: {
        left: 0,
        width: 0
      }
    };
  },
  watch: {
    valueCom(n) {
      if (this.status == "end")
        this.updateValue(this.valueCom, false);
    }
  },
  created() {
    this.updateValue(this.valueCom, false);
  },
  mounted() {
    this.$uGetRect(".u-slider").then((rect) => {
      this.sliderRect = rect;
    });
  },
  computed: {
    valueCom() {
      return this.modelValue;
    }
  },
  methods: {
    onTouchStart(event) {
      if (this.disabled)
        return;
      this.startX = 0;
      let touches = event.touches[0];
      this.startX = touches.clientX;
      this.startValue = this.format(this.valueCom);
      this.status = "start";
    },
    onTouchMove(event) {
      if (this.disabled)
        return;
      if (this.status == "start")
        this.$emit("start");
      let touches = event.touches[0];
      this.distanceX = touches.clientX - this.sliderRect.left;
      this.newValue = this.distanceX / this.sliderRect.width * 100;
      this.status = "moving";
      this.$emit("moving");
      this.updateValue(this.newValue, true);
    },
    onTouchEnd() {
      if (this.disabled)
        return;
      if (this.status === "moving") {
        this.updateValue(this.newValue, false);
        this.$emit("end");
      }
      this.status = "end";
    },
    updateValue(value, drag) {
      const width = this.format(value);
      if (width > this.max || width > 100)
        return;
      let barStyle = {
        width: width + "%"
      };
      if (drag == true) {
        barStyle.transition = "none";
      } else {
        delete barStyle.transition;
      }
      this.$emit("input", width);
      this.$emit("update:modelValue", width);
      this.barStyle = barStyle;
    },
    format(value) {
      return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step;
    },
    onClick(event) {
      if (this.disabled)
        return;
      const value = (event.detail.x - this.sliderRect.left) / this.sliderRect.width * 100;
      this.updateValue(value, false);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.$slots.default || _ctx.$slots.$default
  }, _ctx.$slots.default || _ctx.$slots.$default ? {} : {
    b: common_vendor.s($props.blockStyle),
    c: common_vendor.s({
      height: $props.blockWidth + "rpx",
      width: $props.blockWidth + "rpx",
      backgroundColor: $props.blockColor
    })
  }, {
    d: common_vendor.o((...args) => $options.onTouchStart && $options.onTouchStart(...args)),
    e: common_vendor.o((...args) => $options.onTouchMove && $options.onTouchMove(...args)),
    f: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args)),
    g: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args)),
    h: common_vendor.s($data.barStyle),
    i: common_vendor.s({
      height: $props.height + "rpx",
      backgroundColor: $props.activeColor
    }),
    j: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    k: common_vendor.n($props.disabled ? "u-slider--disabled" : ""),
    l: $props.inactiveColor
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-604d93b6"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/vk-uview-ui/components/u-slider/u-slider.vue"]]);
wx.createComponent(Component);
