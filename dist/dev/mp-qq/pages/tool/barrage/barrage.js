"use strict";
var common_vendor = require("../../../common/vendor.js");
var _self;
const tColorPicker = () => "../../../components/t-color-picker/t-color-picker.js";
const _sfc_main = {
  onLoad() {
    _self = this;
  },
  components: {
    tColorPicker
  },
  data() {
    return {
      index: "",
      color: { r: 255, g: 0, b: 0, a: 1 },
      data: {
        text: ["\u563F\u563F"],
        bgcolor: "rgb(255,255,255)",
        dmcolor: "rgb(0,0,0)",
        speed: 50,
        bgchecked: false,
        dmchecked: false,
        bgspeed: 50,
        dmspeed: 50,
        size: 50,
        roll: false
      }
    };
  },
  methods: {
    open(item) {
      _self.index = item;
      _self.$refs.colorPicker.open();
    },
    confirm(e) {
      var data = e.rgba;
      console.log("\u9009\u62E9" + _self.index);
      _self.data[`${_self.index}`] = "rgb(" + data.r + "," + data.g + "," + data.b + ")";
    },
    start(e) {
      console.log("pages/tool/barrage/start?data=" + JSON.stringify(_self.data));
      common_vendor.index.navigateTo({
        url: "./start?data=" + JSON.stringify(_self.data)
      });
    }
  }
};
if (!Array) {
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_slider2 = common_vendor.resolveComponent("u-slider");
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  const _easycom_t_color_picker2 = common_vendor.resolveComponent("t-color-picker");
  (_easycom_u_checkbox2 + _easycom_u_slider2 + _easycom_u_switch2 + _easycom_t_color_picker2)();
}
const _easycom_u_checkbox = () => "../../../uni_modules/vk-uview-ui/components/u-checkbox/u-checkbox.js";
const _easycom_u_slider = () => "../../../uni_modules/vk-uview-ui/components/u-slider/u-slider.js";
const _easycom_u_switch = () => "../../../uni_modules/vk-uview-ui/components/u-switch/u-switch.js";
const _easycom_t_color_picker = () => "../../../components/t-color-picker/t-color-picker.js";
if (!Math) {
  (_easycom_u_checkbox + _easycom_u_slider + _easycom_u_switch + _easycom_t_color_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.data.text[0],
    b: common_vendor.o(($event) => $data.data.text[0] = $event.detail.value),
    c: common_vendor.o(($event) => $data.data.bgchecked = $event),
    d: common_vendor.p({
      modelValue: $data.data.bgchecked
    }),
    e: common_vendor.o(($event) => $options.open("bgcolor")),
    f: $data.data.bgcolor,
    g: common_vendor.o(($event) => $data.data.dmchecked = $event),
    h: common_vendor.p({
      modelValue: $data.data.dmchecked
    }),
    i: common_vendor.o(($event) => $options.open("dmcolor")),
    j: $data.data.dmcolor,
    k: common_vendor.t$1($data.data.size),
    l: common_vendor.o(($event) => $data.data.size = $event),
    m: common_vendor.p({
      modelValue: $data.data.size
    }),
    n: common_vendor.t$1($data.data.speed),
    o: common_vendor.o(($event) => $data.data.speed = $event),
    p: common_vendor.p({
      modelValue: $data.data.speed
    }),
    q: common_vendor.o(($event) => $data.data.roll = $event),
    r: common_vendor.p({
      ["active-color"]: "#0081ff",
      modelValue: $data.data.roll
    }),
    s: $data.data.bgchecked
  }, $data.data.bgchecked ? {
    t: common_vendor.t$1($data.data.bgspeed),
    v: common_vendor.o(($event) => $data.data.bgspeed = $event),
    w: common_vendor.p({
      modelValue: $data.data.bgspeed
    })
  } : {}, {
    x: $data.data.dmchecked
  }, $data.data.dmchecked ? {
    y: common_vendor.t$1($data.data.dmspeed),
    z: common_vendor.o(($event) => $data.data.dmspeed = $event),
    A: common_vendor.p({
      modelValue: $data.data.dmspeed
    })
  } : {}, {
    B: common_vendor.o((...args) => $options.start && $options.start(...args)),
    C: common_vendor.sr("colorPicker", "ecab1884-7"),
    D: common_vendor.o($options.confirm),
    E: common_vendor.p({
      color: $data.color
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ecab1884"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/barrage/barrage.vue"]]);
qq.createPage(MiniProgramPage);
