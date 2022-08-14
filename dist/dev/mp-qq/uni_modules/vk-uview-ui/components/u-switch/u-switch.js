"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-switch",
  emits: ["update:modelValue", "input", "change"],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 50
    },
    activeColor: {
      type: String,
      default: "#2979ff"
    },
    inactiveColor: {
      type: String,
      default: "#ffffff"
    },
    vibrateShort: {
      type: Boolean,
      default: false
    },
    activeValue: {
      type: [Number, String, Boolean],
      default: true
    },
    inactiveValue: {
      type: [Number, String, Boolean],
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    switchStyle() {
      let style = {};
      style.fontSize = this.size + "rpx";
      style.backgroundColor = this.valueCom ? this.activeColor : this.inactiveColor;
      return style;
    },
    loadingColor() {
      return this.valueCom ? this.activeColor : null;
    }
  },
  methods: {
    onClick() {
      if (!this.disabled && !this.loading) {
        if (this.vibrateShort)
          common_vendor.index.vibrateShort();
        this.$emit("input", !this.valueCom);
        this.$emit("update:modelValue", !this.valueCom);
        this.$nextTick(() => {
          this.$emit("change", this.valueCom ? this.activeValue : this.inactiveValue);
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_loading2 = common_vendor.resolveComponent("u-loading");
  _easycom_u_loading2();
}
const _easycom_u_loading = () => "../u-loading/u-loading.js";
if (!Math) {
  _easycom_u_loading();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      show: $props.loading,
      size: $props.size * 0.6,
      color: $options.loadingColor
    }),
    b: _ctx.$u.addUnit($props.size),
    c: _ctx.$u.addUnit($props.size),
    d: common_vendor.n($options.valueCom == true ? "u-switch--on" : ""),
    e: common_vendor.n($props.disabled ? "u-switch--disabled" : ""),
    f: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    g: common_vendor.s($options.switchStyle)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0ead5116"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/vk-uview-ui/components/u-switch/u-switch.vue"]]);
qq.createComponent(Component);
