"use strict";
var common_vendor = require("../../../common/vendor.js");
var tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
var tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-skeleton-line",
  props: {
    height: {
      type: Number,
      default: 60
    },
    dark: {
      type: [Boolean, String],
      default: false
    },
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    followDark: {
      type: [Boolean, String],
      default: true
    },
    round: {
      type: Number,
      default: 4
    }
  },
  setup(__props) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    common_vendor.onMounted(() => {
    });
    common_vendor.onUnmounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(`round-${props.round}`),
        b: common_vendor.s({
          backgroundColor: common_vendor.unref(isDark) ? "#1e1e1e" : "#ebebeb"
        }),
        c: common_vendor.s({
          paddingTop: props.height / 2 + "rpx",
          paddingBottom: props.height / 2 + "rpx"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c826222"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-skeleton-line/tm-skeleton-line.vue"]]);
wx.createComponent(Component);
