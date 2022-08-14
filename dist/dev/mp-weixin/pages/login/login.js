"use strict";
var common_vendor = require("../../common/vendor.js");
var common_request = require("../../common/request.js");
var tmui_tool_lib_tmpinia = require("../../tmui/tool/lib/tmpinia.js");
require("../../tmui/tool/theme/theme.js");
require("../../tmui/tool/theme/colortool.js");
require("../../tmui/tool/lib/interface.js");
require("../../theme/index.js");
require("../../tmui/tool/function/util.js");
require("../../tmui/tool/function/preview.js");
if (!Array) {
  const _easycom_tm_icon2 = common_vendor.resolveComponent("tm-icon");
  const _easycom_tm_navbar2 = common_vendor.resolveComponent("tm-navbar");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_image2 = common_vendor.resolveComponent("tm-image");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_icon2 + _easycom_tm_navbar2 + _easycom_tm_button2 + _easycom_tm_image2 + _easycom_tm_text2 + _easycom_tm_sheet2 + _easycom_tm_divider2 + _easycom_tm_input2 + _easycom_tm_app2)();
}
const _easycom_tm_icon = () => "../../tmui/components/tm-icon/tm-icon.js";
const _easycom_tm_navbar = () => "../../tmui/components/tm-navbar/tm-navbar.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_image = () => "../../tmui/components/tm-image/tm-image.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (tmMessage + _easycom_tm_icon + _easycom_tm_navbar + _easycom_tm_button + _easycom_tm_image + _easycom_tm_text + _easycom_tm_sheet + _easycom_tm_divider + _easycom_tm_input + _easycom_tm_app)();
}
const tmMessage = () => "../../tmui/components/tm-message/tm-message.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const str = common_vendor.ref("");
    common_vendor.ref(false);
    common_vendor.ref("#60ab41");
    common_vendor.ref("darkGreen");
    common_vendor.ref(false);
    const xh = common_vendor.ref(Object);
    const sjh = common_vendor.ref("");
    const next = common_vendor.ref(false);
    const ts = common_vendor.ref("\u8BF7\u8865\u5168\u4F60\u7684\u624B\u673A\u53F7");
    function getNum() {
      common_request.request.httpRequest({
        url: "getInfo/s/" + xh.value
      }, {}).then((res) => {
        console.log(res);
        if (res.data.code != 200) {
          proxy.$refs.msg.show({
            label: "\u8BF7\u5148\u524D\u5F80\u6210\u90FD\u5DE5\u4E1A\u5B66\u9662\u5FAE\u4FE1\u4E8B\u52A1\u5927\u5385\u7ED1\u5B9A\u624B\u673A\u53F7",
            model: "error"
          });
        } else {
          next.value = true;
          ts.value = "\u8BF7\u8865\u5168\u4F60\u7684\u624B\u673A\u53F7:" + res.data.data;
          sjh.value = res.data.data;
        }
      });
    }
    function login(str2) {
      sjh.value = sjh.value.substring(0, 3) + str2 + sjh.value.substring(7, 11);
      common_request.request.httpRequest({
        url: "wx/user/applogin/v2",
        method: "POST"
      }, {
        username: xh.value,
        code: null,
        password: sjh.value,
        uuid: null
      }).then((res) => {
        if (res.data.code === 200) {
          common_vendor.index.setStorage({
            key: "login_id",
            data: true
          });
          common_vendor.index.setStorage({
            key: "xh",
            data: res.data.data.xh
          });
          common_vendor.index.setStorage({
            key: "userinfo",
            data: res.data.data.userinfo
          });
          common_vendor.index.setStorage({
            key: "token",
            data: res.data.data.token,
            success: () => {
              common_vendor.index.switchTab({
                url: "/pages/index/index"
              });
            }
          });
        } else {
          proxy.$refs.toast.show({
            model: "error",
            label: res.data.msg
          }), this.get_captchaImage();
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.sr("msg", "3a56d113-1,3a56d113-0"),
        b: common_vendor.p({
          ["font-size"]: 32,
          name: "tmicon-cog-fill"
        }),
        c: common_vendor.o(_ctx.onChangeDark),
        d: common_vendor.p({
          color: common_vendor.unref(store).tmStore.dark ? "yellow" : "",
          _class: "pl-32",
          ["font-size"]: 42,
          name: "tmicon-ios-sunny"
        }),
        e: common_vendor.p({
          title: "CDTU \u638C\u4E0A\u6210\u5DE5",
          shadow: 0,
          ["hide-home"]: true
        }),
        f: common_vendor.o(($event) => common_vendor.unref(proxy).$refs.msg.show()),
        g: common_vendor.p({
          margin: [12, 12],
          color: "white",
          width: 120,
          height: 56,
          fontSize: 26,
          label: "\u9ED8\u8BA4"
        }),
        h: common_vendor.p({
          width: 108,
          height: 67.5,
          src: _ctx.logoimg
        }),
        i: common_vendor.p({
          _class: "text-weight-b",
          ["font-size"]: 36,
          label: "\u638C\u4E0A\u6210\u5DE5 3.0.74"
        }),
        j: common_vendor.p({
          _class: "opacity-6",
          label: "\u5168\u7AEF\u517C\u5BB9\u6559\u52A1 \u4E8C\u8BFE \u8981\u95FB\u516C\u544A"
        }),
        k: common_vendor.p({
          margin: [0, 0],
          followTheme: true
        }),
        l: !next.value
      }, !next.value ? {
        m: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
        }),
        n: common_vendor.o(($event) => xh.value = $event),
        o: common_vendor.p({
          modelValue: xh.value
        }),
        p: common_vendor.o(getNum)
      } : {}, {
        q: next.value
      }, next.value ? {
        r: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          label: ts.value
        }),
        s: common_vendor.o(($event) => str.value = $event),
        t: common_vendor.p({
          prefixLabel: "\u8865\u5168\u5BC6\u7801",
          margin: [0, 24],
          showCharNumber: true,
          maxlength: 4,
          modelValue: str.value
        }),
        v: common_vendor.o(($event) => login(str.value))
      } : {}, {
        w: common_vendor.sr("app", "3a56d113-0")
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
