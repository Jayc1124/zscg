"use strict";
var common_vendor = require("../../common/vendor.js");
var common_request = require("../../common/request.js");
const _sfc_main = {
  data() {
    return {
      jz_show: false,
      title: "\u66F4\u6539\u4E2D...",
      data: {},
      showWin: false,
      show: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      jwpwd: "",
      youxiang: "",
      jwpwd_xs: "",
      email_xs: "",
      xq_xs: "",
      selectorObj: [
        {
          cateName: "\u90EB\u90FD\u6821\u533A",
          id: 1
        },
        {
          cateName: "\u5B9C\u5BBE\u6821\u533A",
          id: 2
        }
      ]
    };
  },
  onLoad(e) {
    this.data = common_vendor.index.getStorageSync("userinfo");
    console.log(this.data);
    this.shuaxin();
    if (e.index == 0) {
      this.show = true;
    } else if (e.index == 1) {
      this.show2 = true;
    }
  },
  methods: {
    shuaxin() {
      if (this.data.xq) {
        if (this.data.xq == 1) {
          this.xq_xs = "\u90EB\u90FD\u6821\u533A";
        } else {
          this.xq_xs = "\u5B9C\u5BBE\u6821\u533A";
        }
      } else {
        this.xq_xs = "\u70B9\u51FB\u8BBE\u7F6E\u6821\u533A";
      }
      if (this.data.jwpwd) {
        this.jwpwd = this.data.jwpwd;
        this.jwpwd_xs = "******";
      } else {
        this.jwpwd_xs = "\u70B9\u51FB\u7ED1\u5B9A\u5BC6\u7801";
      }
      if (this.data.email) {
        this.youxiang = this.data.email;
        this.email_xs = this.data.email;
      } else {
        this.email_xs = "\u70B9\u51FB\u7ED1\u5B9A\u90AE\u7BB1";
      }
      if (this.data.qq) {
        this.qq = this.data.qq;
        this.qq_xs = this.data.qq;
      } else {
        this.qq_xs = "\u70B9\u51FB\u7ED1\u5B9AQQ,\u7528\u4E8E\u8FDB\u7FA4\u81EA\u52A8\u6FC0\u6D3B(\u5FC5\u586B)";
      }
      if (this.data.erkePwd) {
        this.erkePwd = this.data.erkePwd;
        this.erkePwd_xs = this.data.erkePwd;
      } else {
        this.erkePwd_xs = "\u70B9\u51FB\u7ED1\u5B9AQQ,\u7528\u4E8E\u8FDB\u7FA4\u81EA\u52A8\u6FC0\u6D3B(\u5FC5\u586B)";
      }
    },
    bangding(index) {
      if (index == 0) {
        this.show = true;
      } else if (index == 1) {
        this.show1 = true;
      } else if (index == 2) {
        this.show2 = true;
      } else if (index == 3) {
        this.show3 = true;
      } else if (index == 4) {
        this.show4 = true;
      }
    },
    tijiao(e) {
      this.jz_show = true;
      let id = this.selectorObj[e[0]].id;
      common_request.request.httpTokenRequest({
        url: "wx/user/updateXq/?xq=" + id,
        method: "get"
      }).then((res) => {
        this.jz_show = false;
        if (res.data.code == 200) {
          this.data.xq = id;
          common_vendor.index.setStorageSync("userinfo", this.data);
          this.shuaxin();
        } else {
          common_vendor.index.showToast({
            title: "\u4FEE\u6539\u5931\u8D25"
          });
        }
      });
    },
    xiugai(index) {
      this.showWin = true;
      this.jz_show = true;
      if (index == 0) {
        common_request.request.httpTokenRequest({
          url: "wx/user/updateJw/?jwpwd=" + this.jwpwd,
          method: "get"
        }).then((res) => {
          this.jz_show = false;
          if (res.data.code == 200) {
            this.data.jwpwd = this.jwpwd;
            common_vendor.index.setStorageSync("userinfo", this.data);
            this.shuaxin();
            this.show = false;
          } else {
            common_vendor.index.showToast({
              title: "\u4FEE\u6539\u5931\u8D25"
            });
          }
        });
      } else if (index == 1) {
        common_request.request.httpTokenRequest({
          url: "wx/user/updateEmail/?email=" + this.youxiang,
          method: "get"
        }).then((res) => {
          this.jz_show = false;
          if (res.data.code == 200) {
            this.data.email = this.email;
            common_vendor.index.setStorageSync("userinfo", this.data);
            this.shuaxin();
            this.show1 = false;
          } else {
            common_vendor.index.showToast({
              title: "\u4FEE\u6539\u5931\u8D25"
            });
          }
        });
      } else if (index == 2) {
        common_request.request.httpTokenRequest({
          url: "wx/user/updateXq/?xq=" + this.data.xq,
          method: "get"
        }).then((res) => {
          if (res.data.code == 200) {
            this.data.xq = this.data.xq;
            common_vendor.index.setStorageSync("userinfo", this.data);
            this.shuaxin();
          } else {
            common_vendor.index.showToast({
              title: "\u4FEE\u6539\u5931\u8D25"
            });
          }
        });
      } else if (index == 3) {
        common_request.request.httpTokenRequest({
          url: "wx/user/updateQq/?qq=" + this.qq,
          method: "get"
        }).then((res) => {
          this.jz_show = false;
          if (res.data.code == 200) {
            this.data.qq = this.qq;
            common_vendor.index.setStorageSync("userinfo", this.data);
            this.shuaxin();
            this.show1 = false;
          } else {
            this.$refs.uToast.show({
              title: "\u4FEE\u6539\u5931\u8D25",
              type: "error",
              icon: true
            });
          }
        });
      } else if (index == 4) {
        common_request.request.httpTokenRequest({
          url: "wx/user/erkePwd/?mm=" + this.erkePwd,
          method: "get"
        }).then((res) => {
          this.jz_show = false;
          if (res.data.code == 200) {
            this.data.erkePwd = this.erkePwd;
            common_vendor.index.setStorageSync("userinfo", this.data);
            this.shuaxin();
            this.show1 = false;
          } else {
            this.$refs.uToast.show({
              title: "\u4FEE\u6539\u5931\u8D25",
              type: "error",
              icon: true
            });
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_tm_navbar2 = common_vendor.resolveComponent("tm-navbar");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_tag2 = common_vendor.resolveComponent("tm-tag");
  const _easycom_tm_cell2 = common_vendor.resolveComponent("tm-cell");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_drawer2 = common_vendor.resolveComponent("tm-drawer");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_navbar2 + _easycom_tm_text2 + _easycom_tm_divider2 + _easycom_tm_sheet2 + _easycom_tm_tag2 + _easycom_tm_cell2 + _easycom_tm_input2 + _easycom_tm_drawer2 + _easycom_tm_app2)();
}
const _easycom_tm_navbar = () => "../../tmui/components/tm-navbar/tm-navbar.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_tag = () => "../../tmui/components/tm-tag/tm-tag.js";
const _easycom_tm_cell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_drawer = () => "../../tmui/components/tm-drawer/tm-drawer.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_navbar + _easycom_tm_text + _easycom_tm_divider + _easycom_tm_sheet + _easycom_tm_tag + _easycom_tm_cell + _easycom_tm_input + _easycom_tm_drawer + _easycom_tm_app)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "\u4E2A\u4EBA\u4FE1\u606F",
      beforeBack: false,
      hideBack: true,
      hideHome: true
    }),
    b: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-b",
      color: "grey",
      label: "1.\u4F7F\u7528\u6559\u52A1\u529F\u80FD\u548C\u4E8C\u8BFE\u62A5\u540D\u5FC5\u987B\u5F97\u7ED1\u5B9A\u4E2A\u4EBA\u5BC6\u7801"
    }),
    c: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-b ",
      color: "grey",
      label: "3.\u8BA9\u540C\u5B66\u8FDB\u7FA4,\u5E0C\u671B\u80FD\u83B7\u5F97\u5927\u5BB6\u7684\u53CD\u9988,\u624D\u6709\u7EE7\u7EED\u7684\u5FC5\u8981"
    }),
    d: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-b ",
      color: "grey",
      label: "1.\u5174\u8DA3\u9A71\u52A8,\u7528\u7231\u53D1\u7535~"
    }),
    e: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-b ",
      color: "grey",
      label: "4.\u6211\u6E29\u4F60\u54ED,\u6211\u5728\u7FA4\u91CC\u7B49\u4F60~"
    }),
    f: common_vendor.p({
      text: true,
      shadow: 0,
      icon: "tmicon-weixinzhifu",
      color: "orange",
      size: "l",
      label: $data.data.sign == 1 ? "\u5DF2\u52A0\u7FA4" : "\u672A\u52A0\u7FA4"
    }),
    g: common_vendor.p({
      showAvatar: true,
      avatar: "https://picsum.photos/200",
      margin: [0, 0],
      titleFontSize: 30,
      title: ""
    }),
    h: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-c",
      color: "grey",
      label: $data.data.userName
    }),
    i: common_vendor.p({
      margin: [0, 0],
      titleFontSize: 30,
      title: "\u59D3\u540D"
    }),
    j: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-c",
      color: "grey",
      label: $data.data.xh
    }),
    k: common_vendor.p({
      margin: [0, 0],
      titleFontSize: 30,
      title: "\u8D26\u53F7"
    }),
    l: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-c",
      color: "grey",
      label: $data.data.sex || "\u4FDD\u5BC6"
    }),
    m: common_vendor.p({
      margin: [0, 0],
      titleFontSize: 30,
      title: "\u6027\u522B"
    }),
    n: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-c",
      color: "grey",
      label: $data.data.depName
    }),
    o: common_vendor.p({
      margin: [0, 0],
      titleFontSize: 30,
      title: "\u4E13\u4E1A"
    }),
    p: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-c",
      color: "grey",
      label: $data.data.xq == 1 ? "\u90EB\u90FD\u6821\u533A" : "\u5B9C\u5BBE\u6821\u533A"
    }),
    q: common_vendor.o(($event) => $options.bangding(2)),
    r: common_vendor.p({
      margin: [0, 0],
      titleFontSize: 30,
      title: "\u6821\u533A"
    }),
    s: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-c",
      color: "grey",
      label: $data.data.jwpwd || "\u70B9\u51FB\u7ED1\u5B9A\u6559\u52A1\u5BC6\u7801"
    }),
    t: common_vendor.o(($event) => $options.bangding(0)),
    v: common_vendor.p({
      margin: [0, 0],
      titleFontSize: 30,
      title: "\u6559\u52A1\u5BC6\u7801"
    }),
    w: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-c",
      color: "grey",
      label: $data.data.erkePwd || "\u70B9\u51FB\u7ED1\u5B9A\u9752\u6625\u6210\u5DE5\u5BC6\u7801"
    }),
    x: common_vendor.o(($event) => $options.bangding(4)),
    y: common_vendor.p({
      margin: [0, 0],
      titleFontSize: 30,
      title: "\u9752\u6625\u6210\u5DE5\u5BC6\u7801"
    }),
    z: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-c",
      color: "grey",
      label: $data.youxiang || "\u70B9\u51FB\u7ED1\u5B9A\u90AE\u7BB1"
    }),
    A: common_vendor.o(($event) => $options.bangding(1)),
    B: common_vendor.p({
      margin: [0, 0],
      titleFontSize: 30,
      title: "\u90AE\u7BB1"
    }),
    C: common_vendor.p({
      ["font-size"]: 24,
      _class: "font-weight-c",
      color: "grey",
      label: $data.data.qq || "\u70B9\u51FB\u7ED1\u5B9AQQ"
    }),
    D: common_vendor.o(($event) => $options.bangding(3)),
    E: common_vendor.p({
      margin: [0, 0],
      titleFontSize: 30,
      title: "QQ"
    }),
    F: common_vendor.o(($event) => $data.jwpwd = $event),
    G: common_vendor.p({
      modelValue: $data.jwpwd
    }),
    H: common_vendor.o(($event) => $options.xiugai(0)),
    I: common_vendor.o(($event) => $data.show = $event),
    J: common_vendor.p({
      placement: "center",
      okText: "\u4FEE\u6539",
      show: $data.show
    }),
    K: common_vendor.o(($event) => $data.youxiang = $event),
    L: common_vendor.p({
      modelValue: $data.youxiang
    }),
    M: common_vendor.o(($event) => $options.xiugai(1)),
    N: common_vendor.o(($event) => $data.show1 = $event),
    O: common_vendor.p({
      placement: "center",
      okText: "\u4FEE\u6539",
      show: $data.show1
    }),
    P: common_vendor.p({
      label: "1\u662F\u6210\u90FD2\u662F\u5B9C\u5BBE"
    }),
    Q: common_vendor.o(($event) => $data.data.xq = $event),
    R: common_vendor.p({
      modelValue: $data.data.xq
    }),
    S: common_vendor.o(($event) => $options.xiugai(2)),
    T: common_vendor.o(($event) => $data.show2 = $event),
    U: common_vendor.p({
      placement: "center",
      okText: "\u4FEE\u6539",
      show: $data.show2
    }),
    V: common_vendor.o(($event) => _ctx.qq = $event),
    W: common_vendor.p({
      modelValue: _ctx.qq
    }),
    X: common_vendor.o(($event) => $options.xiugai(3)),
    Y: common_vendor.o(($event) => $data.show3 = $event),
    Z: common_vendor.p({
      placement: "center",
      okText: "\u4FEE\u6539",
      show: $data.show3
    }),
    aa: common_vendor.o(($event) => $data.data.erkePwd = $event),
    ab: common_vendor.p({
      modelValue: $data.data.erkePwd
    }),
    ac: common_vendor.o(($event) => $options.xiugai(4)),
    ad: common_vendor.o(($event) => $data.show4 = $event),
    ae: common_vendor.p({
      placement: "center",
      show: $data.show4
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/me/editme.vue"]]);
wx.createPage(MiniProgramPage);
