"use strict";
var common_vendor = require("../../../common/vendor.js");
var _self;
var bgtime;
var dmtime;
var time;
const _sfc_main = {
  onShow(option) {
  },
  onLoad(option) {
    _self = this;
    console.log("\u5F39\u5E55\u53C2\u6570");
    _self.data = JSON.parse(option.data);
    console.log(_self.data);
    _self.data.speed = _self.data.speed * 3;
    console.log(_self.data.text.length);
    if (_self.data.roll) {
      _self.data.size = _self.data.size * 7 / _self.data.text.length;
    } else {
      _self.data.size = _self.data.size * 7;
    }
    _self.data.bgspeed = 2e3 - _self.data.bgspeed * 20;
    _self.data.dmspeed = 2e3 - _self.data.dmspeed * 20;
    if (_self.data.bgchecked) {
      bgtime = setInterval(() => {
        _self.data.bgcolor = _self.colorRound();
      }, _self.data.bgspeed);
    }
    if (_self.data.dmchecked) {
      dmtime = setInterval(() => {
        _self.data.dmcolor = _self.colorRound();
      }, _self.data.dmspeed);
    }
    plus.navigator.setFullscreen(true);
  },
  onHide() {
    console.log("\u9875\u9762\u9690\u85CF");
  },
  onUnload() {
    console.log("\u9875\u9762\u5378\u8F7D");
    clearInterval(bgtime);
    clearInterval(dmtime);
    clearInterval(time);
  },
  data() {
    return {
      data: {
        text: ["\u563F\u563F"],
        bgcolor: "rgb(25,255,255)",
        dmcolor: "rgb(0,0,0)",
        speed: 50,
        bgchecked: false,
        dmchecked: false,
        bgspeed: 50,
        dmspeed: 50,
        size: 500,
        roll: false
      },
      quit: false
    };
  },
  methods: {
    colorRound() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      var color = "rgba(" + r + "," + g + "," + b + ",1)";
      return color;
    },
    quitF() {
      if (!_self.quit) {
        console.log("\u89E6\u53D1");
        _self.quit = true;
        clearInterval(time);
        time = setInterval(function(e) {
          _self.quit = false;
          console.log("\u7ED3\u675F");
        }, 3e3);
      }
    },
    exit() {
      console.log("\u9000\u51FA");
      plus.navigator.setFullscreen(false);
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  }
};
if (!Array) {
  const _easycom_u_notice_bar2 = common_vendor.resolveComponent("u-notice-bar");
  _easycom_u_notice_bar2();
}
const _easycom_u_notice_bar = () => "../../../uni_modules/vk-uview-ui/components/u-notice-bar/u-notice-bar.js";
if (!Math) {
  _easycom_u_notice_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.quit
  }, $data.quit ? {
    b: common_vendor.o(($event) => $options.exit())
  } : {}, {
    c: !$data.data.roll
  }, !$data.data.roll ? {
    d: common_vendor.p({
      color: $data.data.dmcolor,
      type: "none",
      ["font-size"]: $data.data.size,
      padding: "0px 0px",
      speed: $data.data.speed,
      ["volume-icon"]: false,
      list: $data.data.text
    }),
    e: $data.data.bgcolor
  } : {}, {
    f: $data.data.roll
  }, $data.data.roll ? {
    g: common_vendor.t$1($data.data.text[0]),
    h: $data.data.size + "rpx",
    i: $data.data.dmcolor,
    j: $data.data.bgcolor
  } : {}, {
    k: common_vendor.o(($event) => $options.quitF())
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0da7bac0"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/barrage/start.vue"]]);
wx.createPage(MiniProgramPage);
