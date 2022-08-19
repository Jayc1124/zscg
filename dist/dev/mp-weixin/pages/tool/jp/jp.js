"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_request = require("../../../common/request.js");
if (!Array) {
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_rate2 = common_vendor.resolveComponent("tm-rate");
  const _easycom_tm_image2 = common_vendor.resolveComponent("tm-image");
  (_easycom_tm_input2 + _easycom_tm_rate2 + _easycom_tm_image2)();
}
const _easycom_tm_input = () => "../../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_rate = () => "../../../tmui/components/tm-rate/tm-rate.js";
const _easycom_tm_image = () => "../../../tmui/components/tm-image/tm-image.js";
if (!Math) {
  (tmMessage + tmText + tmDivider + tmSheet + _easycom_tm_input + _easycom_tm_rate + tmButton + _easycom_tm_image + tmApp)();
}
const tmApp = () => "../../../tmui/components/tm-app/tm-app.js";
const tmSheet = () => "../../../tmui/components/tm-sheet/tm-sheet.js";
const tmText = () => "../../../tmui/components/tm-text/tm-text.js";
const tmMessage = () => "../../../tmui/components/tm-message/tm-message.js";
const tmDivider = () => "../../../tmui/components/tm-divider/tm-divider.js";
const tmButton = () => "../../../tmui/components/tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "jp",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const msg = common_vendor.ref(null);
    let xh = common_vendor.ref(1);
    let url = common_vendor.ref("");
    let sqm = common_vendor.ref("");
    common_vendor.onLoad(() => {
      getjiaquninfo();
    });
    function getjiaquninfo() {
      common_request.request.httpRequest({
        url: "notice/noticeBanner/getAppInfo/6"
      }).then((res) => {
        if (res.data.code == 200) {
          url.value = res.data.data.navurl;
        }
      });
    }
    function jiaqun() {
    }
    function jp() {
      proxy.msg.show({ model: "load", mask: true, text: "\u6B63\u5728\u6559\u8BC4\u4E2D,\u8BF7\u7B49\u5F85" });
      xh.value = common_vendor.index.getStorageSync("userinfo").xh;
      xh.value = (xh.value - 65) * 11;
      let opts = {
        url: url.value + "?xh=" + xh.value + "&pwd=" + common_vendor.index.getStorageSync("userinfo").jwpwd + "&sqm=" + sqm.value,
        method: "get"
      };
      console.log(url + "?xh=" + xh + "&pwd=" + common_vendor.index.getStorageSync("userinfo").jwpwd + "&sqm=" + sqm);
      common_request.request.request(opts).then((res) => {
        if (res.data.msg == 200) {
          console.log(res.data.msg.msg);
          proxy.msg.hide();
          proxy.msg.show({ model: "success", mask: true, text: "\u6559\u8BC4\u5DF2\u7ECF\u5B8C\u6210,\u8BF7\u524D\u5F80\u6559\u52A1\u7CFB\u7EDF\u67E5\u770B" });
        }
        if (res.data.msg == 401) {
          console.log(res.data.msg.msg);
          proxy.msg.hide();
          proxy.msg.show({ model: "error", mask: true, text: "\u6388\u6743\u7801\u9519\u8BEF" });
        }
        if (res.data.msg == 500) {
          console.log(res.data.msg.msg);
          proxy.msg.hide();
          proxy.msg.show({ model: "error", mask: true, text: "\u8BF7\u524D\u5F80\u4E2A\u4EBA\u9875\u7ED1\u5B9A\u6B63\u786E\u7684\u6559\u52A1\u5BC6\u7801" });
        }
      }).catch((response) => {
        proxy.msg.hide();
        proxy.msg.show({ model: "error", mask: true, text: "\u5F53\u670D\u52A1\u672A\u5F00\u542F,\u8BF7\u52A0\u7FA4\u67E5\u770B\u5F00\u653E\u65F6\u95F4" });
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(msg, "548cb858-1,548cb858-0", {
          "k": "msg"
        }),
        b: common_vendor.p({
          ["font-size"]: 32,
          _class: "font-weight-b",
          label: "\u6559\u8BC4\u524D\u5FC5\u770B"
        }),
        c: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b ",
          margin: [0, 24],
          label: "\u4E00\u3001\u5F00\u53D1\u4E0D\u6613,\u4F7F\u7528\u6559\u8BC4\u9700\u8981\u5206\u4EAB\u7ED9\u4E09\u4E2A\u597D\u53CB\u6216\u7FA4,\u8C22\u8C22\uFF01"
        }),
        d: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          margin: [0, 24],
          label: "\u4E8C\u3001\u8BF7\u5F00\u59CB\u4F60\u7684\u81EA\u5B9A\u4E49\u8BC4\u5206\uFF0C\u4E00\u4E2A\u5C0F\u661F\u661F20\u5206\u3002"
        }),
        e: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          margin: [0, 24],
          label: "\u4E09\u3001\u5BC6\u7801\u9519\u8BEF\u8BF7\u5230\u4E2A\u4EBA\u9875\u7ED1\u5B9A\u6B63\u786E\u6559\u52A1\u5BC6\u7801\u3002"
        }),
        f: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          margin: [0, 24],
          label: "\u56DB\u3001\u4F7F\u7528\u6559\u8BC4\u529F\u80FD\u65F6,\u4E0D\u53EF\u8FDE\u63A5\u6821\u56ED\u7F51CDTU\u3002"
        }),
        g: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          color: "red",
          label: "	\u4E94\u3001\u6388\u6743\u8BF7\u5230\u516C\u4F17\u53F7CDTU\u53E3\u888B\u541B\u56DE\u590D \u6559\u8BC4 \u83B7\u53D6!"
        }),
        h: common_vendor.p({
          prefixLabel: "\u8BC4\u8BED:",
          placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BED",
          transprent: true
        }),
        i: common_vendor.o(($event) => common_vendor.isRef(sqm) ? sqm.value = $event : sqm = $event),
        j: common_vendor.p({
          prefixLabel: "\u6388\u6743\u7801:",
          margin: [0, 24],
          placeholder: "\u8BF7\u8F93\u5165\u6388\u6743\u7801",
          transprent: true,
          modelValue: common_vendor.unref(sqm)
        }),
        k: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          label: "\u8BC4\u5206"
        }),
        l: common_vendor.p({
          defaultValue: 4
        }),
        m: common_vendor.p({
          margin: [0, 0]
        }),
        n: common_vendor.o(jp),
        o: common_vendor.p({
          margin: [26, 12],
          color: "blue",
          width: 150,
          height: 70,
          fontSize: 26,
          label: "\u5F00\u59CB\u6559\u8BC4"
        }),
        p: common_vendor.o(jiaqun),
        q: common_vendor.p({
          margin: [26, 12],
          color: "pink",
          width: 150,
          height: 70,
          fontSize: 26,
          label: "\u52A0\u5165\u7FA4\u804A"
        }),
        r: common_vendor.o(() => {
        }),
        s: common_vendor.p({
          margin: [26, 12],
          color: "green",
          width: 150,
          height: 70,
          fontSize: 26,
          label: "\u5206\u4EAB\u7ED9\u597D\u53CB"
        }),
        t: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          label: "APP\u7AEF\uFF0C\u516C\u4F17\u53F7:CDTU\u53E3\u888B\u541B\u56DE\u590D\u2018\u6559\u8BC4\u2019\u53EF\u83B7\u53D6\u6388\u6743\u7801\u2764\uFE0F"
        }),
        v: common_vendor.p({
          ["font-size"]: 24,
          color: "grey",
          label: "        \u70B9\u51FB\u9884\u89C8\u5E76\u4FDD\u5B58"
        }),
        w: common_vendor.p({
          preview: true,
          width: 620,
          height: 500,
          src: "http://cdn.jaycao.com/wx.jpg"
        }),
        x: common_vendor.p({
          ["font-size"]: 24,
          color: "grey",
          label: ""
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/jp/jp.vue"]]);
wx.createPage(MiniProgramPage);
