"use strict";
var common_vendor = require("../../../common/vendor.js");
var tmui_tool_lib_language = require("../../tool/lib/language.js");
var tmui_components_tmMessage_interface = require("./interface.js");
var tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (tmIcon + tmText + tmSheet + tmTranslate + tmOverlay)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmTranslate = () => "../tm-translate/tm-translate.js";
const tmOverlay = () => "../tm-overlay/tm-overlay.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-message",
  props: {
    _style: {
      type: [Array, String, Object],
      default: () => {
      }
    },
    _class: {
      type: [Array, String],
      default: "flex-center"
    },
    mask: {
      type: [Boolean],
      default: true
    },
    duration: {
      type: Number,
      default: 1500
    }
  },
  emits: ["click"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const tranAni = common_vendor.ref(null);
    const uid = common_vendor.ref(common_vendor.index.$tm.u.getUid(5));
    const bgColor = common_vendor.ref("white");
    const model_ref = common_vendor.ref(tmui_components_tmMessage_interface.modelType.info);
    const showValue = common_vendor.ref(false);
    const icon_ref = common_vendor.ref("");
    const text_ref = common_vendor.ref("");
    const color_ref = common_vendor.ref("");
    const reverse = common_vendor.ref(false);
    const dur = common_vendor.ref(0);
    const initByWechat = common_vendor.ref(true);
    const showMask = common_vendor.ref(props.mask);
    const dark_ref = common_vendor.ref(false);
    common_vendor.onUnmounted(() => clearTimeout(uid.value));
    common_vendor.watch(() => props.mask, (val) => showMask.value = val);
    const zindex = { zIndex: "1000 !important" };
    const modelIcon = common_vendor.computed$1(() => {
      return {
        load: {
          icon: "tmicon-loading",
          color: "primary",
          text: tmui_tool_lib_language.language("message.load.text")
        },
        error: {
          icon: "tmicon-times-circle",
          color: "red",
          text: tmui_tool_lib_language.language("message.error.text")
        },
        info: {
          icon: "tmicon-info-circle",
          text: tmui_tool_lib_language.language("message.info.text"),
          color: "black"
        },
        warn: {
          icon: "tmicon-exclamation-circle",
          text: tmui_tool_lib_language.language("message.warn.text"),
          color: "orange"
        },
        quest: {
          icon: "tmicon-question-circle",
          text: tmui_tool_lib_language.language("message.quest.text"),
          color: "pink"
        },
        success: {
          icon: "tmicon-check-circle",
          text: tmui_tool_lib_language.language("message.success.text"),
          color: "green"
        },
        disabled: {
          icon: "tmicon-ban",
          text: tmui_tool_lib_language.language("message.disabled.text"),
          color: "red"
        },
        wait: {
          icon: "tmicon-ios-alarm",
          text: tmui_tool_lib_language.language("message.wait.text"),
          color: "black"
        }
      };
    });
    function msgOver() {
      var _a, _b;
      (_a = tranAni.value) == null ? void 0 : _a.stop();
      (_b = tranAni.value) == null ? void 0 : _b.reset();
      clearTimeout(uid.value);
      uid.value = setTimeout(function() {
        if (dur.value > 0 && model_ref.value != "load") {
          reverse.value = false;
          showValue.value = false;
        }
      }, dur.value);
    }
    function show(argFs) {
      let arg = argFs || {};
      let { duration, icon, text, color, dark, model, mask } = arg;
      model_ref.value = typeof model == "undefined" ? model_ref.value : model;
      icon_ref.value = icon = icon != null ? icon : modelIcon.value[model_ref.value].icon;
      text_ref.value = text = text != null ? text : modelIcon.value[model_ref.value].text;
      color_ref.value = color = color != null ? color : modelIcon.value[model_ref.value].color;
      showMask.value = typeof mask === "boolean" ? mask : showMask.value;
      if (dark === true) {
        bgColor.value = "black";
      }
      if (typeof dark !== "boolean") {
        dark = store.tmStore.dark;
      }
      if (color_ref.value == "white" || color_ref.value == "black") {
        color_ref.value = "";
      }
      dark_ref.value = dark;
      if (typeof duration === "undefined") {
        duration = props.duration;
      }
      dur.value = isNaN(parseInt(String(duration))) ? 1500 : parseInt(String(duration));
      reverse.value = false;
      showValue.value = true;
      setTimeout(() => {
        var _a;
        (_a = tranAni.value) == null ? void 0 : _a.play();
      }, 80);
    }
    function hide() {
      showValue.value = false;
    }
    expose({ show, hide });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showValue.value
      }, showValue.value ? {
        b: common_vendor.p({
          _style: "line-height: normal",
          _class: "pa-10",
          spin: model_ref.value == "load",
          color: color_ref.value,
          fontSize: 72,
          name: icon_ref.value
        }),
        c: common_vendor.p({
          ["font-size"]: 30,
          _class: "pt-8 text-overflow-1",
          label: text_ref.value
        }),
        d: common_vendor.p({
          blur: true,
          _style: props._style,
          _class: props._class,
          color: bgColor.value,
          border: 1,
          shadow: 10,
          width: 300,
          height: 300,
          margin: [40, 40],
          round: 12,
          padding: [24, 0]
        }),
        e: common_vendor.sr(tranAni, "269ede73-1,269ede73-0", {
          "k": "tranAni"
        }),
        f: common_vendor.o(msgOver),
        g: common_vendor.p({
          initByWechat: initByWechat.value,
          reverse: reverse.value,
          name: "zoom",
          duration: 160,
          ["auto-play"]: false
        }),
        h: common_vendor.o(($event) => showValue.value = $event),
        i: common_vendor.p({
          blur: true,
          duration: 0,
          transprent: !showMask.value,
          _style: zindex,
          overlayClick: false,
          show: showValue.value
        })
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-message/tm-message.vue"]]);
wx.createComponent(Component);
