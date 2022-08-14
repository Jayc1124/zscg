"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-checkbox",
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
    name: {
      type: [String, Number],
      default: ""
    },
    shape: {
      type: String,
      default: ""
    },
    disabled: {
      type: [String, Boolean],
      default: ""
    },
    labelDisabled: {
      type: [String, Boolean],
      default: ""
    },
    activeColor: {
      type: String,
      default: ""
    },
    iconSize: {
      type: [String, Number],
      default: ""
    },
    labelSize: {
      type: [String, Number],
      default: ""
    },
    size: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      parentDisabled: false,
      newParams: {}
    };
  },
  created() {
    this.parent = this.$u.$parent.call(this, "u-checkbox-group");
    this.parent && this.parent.children.push(this);
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    isDisabled() {
      return this.disabled !== "" ? this.disabled : this.parent ? this.parent.disabled : false;
    },
    isLabelDisabled() {
      return this.labelDisabled !== "" ? this.labelDisabled : this.parent ? this.parent.labelDisabled : false;
    },
    checkboxSize() {
      return this.size ? this.size : this.parent ? this.parent.size : 34;
    },
    checkboxIconSize() {
      return this.iconSize ? this.iconSize : this.parent ? this.parent.iconSize : 20;
    },
    elActiveColor() {
      return this.activeColor ? this.activeColor : this.parent ? this.parent.activeColor : "primary";
    },
    elShape() {
      return this.shape ? this.shape : this.parent ? this.parent.shape : "square";
    },
    iconStyle() {
      let style = {};
      if (this.elActiveColor && this.valueCom && !this.isDisabled) {
        style.borderColor = this.elActiveColor;
        style.backgroundColor = this.elActiveColor;
      }
      style.width = this.$u.addUnit(this.checkboxSize);
      style.height = this.$u.addUnit(this.checkboxSize);
      return style;
    },
    iconColor() {
      return this.valueCom ? "#ffffff" : "transparent";
    },
    iconClass() {
      let classes = [];
      classes.push("u-checkbox__icon-wrap--" + this.elShape);
      if (this.valueCom == true)
        classes.push("u-checkbox__icon-wrap--checked");
      if (this.isDisabled)
        classes.push("u-checkbox__icon-wrap--disabled");
      if (this.valueCom && this.isDisabled)
        classes.push("u-checkbox__icon-wrap--disabled--checked");
      return classes.join(" ");
    },
    checkboxStyle() {
      let style = {};
      if (this.parent && this.parent.width) {
        style.width = this.parent.width;
        style.float = "left";
      }
      if (this.parent && this.parent.wrap) {
        style.width = "100%";
      }
      return style;
    }
  },
  mounted() {
    this._emitEvent();
  },
  watch: {
    valueCom: {
      handler: function(newVal, oldVal) {
        this._emitEvent();
      }
    }
  },
  methods: {
    _emitEvent() {
      let value = this.valueCom;
      let obj = {
        value,
        name: this.name
      };
      if (this.parent && this.parent.emitEvent)
        this.parent._emitEvent(obj);
    },
    onClickLabel() {
      if (!this.isLabelDisabled && !this.isDisabled) {
        this.setValue();
      }
    },
    toggle() {
      if (!this.isDisabled) {
        this.setValue();
      }
    },
    emitEvent() {
      let obj = {
        value: !this.valueCom,
        name: this.name
      };
      this.$emit("change", obj);
      if (this.parent && this.parent.emitEvent)
        this.parent.emitEvent(obj);
    },
    setValue() {
      let value = this.valueCom;
      let checkedNum = 0;
      if (this.parent && this.parent.children) {
        this.parent.children.map((val) => {
          if (val.value)
            checkedNum++;
        });
      }
      if (value == true) {
        this.emitEvent();
        this.$emit("input", !value);
        this.$emit("update:modelValue", !value);
      } else {
        if (this.parent && checkedNum >= this.parent.max) {
          return this.$u.toast(`\u6700\u591A\u53EF\u9009${this.parent.max}\u9879`);
        }
        this.emitEvent();
        this.$emit("input", !value);
        this.$emit("update:modelValue", !value);
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
  return {
    a: common_vendor.p({
      name: "checkbox-mark",
      size: $options.checkboxIconSize,
      color: $options.iconColor
    }),
    b: common_vendor.o((...args) => $options.toggle && $options.toggle(...args)),
    c: common_vendor.n($options.iconClass),
    d: common_vendor.s($options.iconStyle),
    e: common_vendor.o((...args) => $options.onClickLabel && $options.onClickLabel(...args)),
    f: _ctx.$u.addUnit($props.labelSize),
    g: common_vendor.s($options.checkboxStyle)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-375af514"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/vk-uview-ui/components/u-checkbox/u-checkbox.vue"]]);
wx.createComponent(Component);
