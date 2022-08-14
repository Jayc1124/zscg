"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_request = require("../../../common/request.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      tools: [
        {
          url: "1",
          icon: "../../../static/tools-1.png",
          title: "\u6210\u5DE5\u6392\u884C",
          show: true
        },
        {
          url: "2",
          icon: "../../../static/tools-2.png",
          title: "\u7528\u6237\u7EDF\u8BA1",
          show: true
        },
        {
          url: "3",
          icon: "../../../static/tools-3.png",
          title: "\u610F\u89C1\u53CD\u9988",
          show: true
        },
        {
          url: "4",
          icon: "../../../static/tools-7.png",
          title: "\u66F4\u65B0\u8BB0\u5F55",
          status: 0,
          statusFlag: 1,
          show: true
        },
        {
          url: "5",
          icon: "../../../static/vip.png",
          title: "\u7BA1\u7406\u7533\u8BF7",
          status: 0,
          show: true
        },
        {
          url: "6",
          icon: "../../../static/tools-6.png",
          title: "\u52A0\u5165Q\u7FA4",
          show: false
        },
        {
          url: "7",
          icon: "../../../static/tools-8.png",
          title: "\u6E05\u9664\u7F13\u5B58",
          show: false
        },
        {
          url: "8",
          icon: "../../../static/tools-8.png",
          title: "\u5173\u4E8E\u5F00\u53D1\u8005",
          show: false
        }
      ],
      orders: [
        {
          id: 1,
          icon: "../../../static/my_service/images/my_service_8_8.jpg",
          title: "\u52A8\u6001"
        },
        {
          id: 2,
          icon: "../../../static/my_service/images/my_service_11_11.jpg",
          title: "\u8BC4\u8BBA"
        },
        {
          id: 3,
          icon: "../../../static/my_service/images/my_service_14_14.jpg",
          title: "\u4FE1\u606F\u7ED1\u5B9A"
        },
        {
          id: 4,
          icon: "../../../static/my_service/images/my_service_17_17.jpg",
          title: "\u8EAB\u4EFD\u8BA4\u8BC1"
        },
        {
          id: 5,
          icon: "../../../static/order-5.png",
          title: "\u5DF2\u5B8C\u6210"
        }
      ],
      bgColor: "transparent",
      userinfo: {},
      homeinfo: {
        username: "\u68A6\u60F3",
        userpic: "https://cdn2.jaycao.com/cdtu/a.png",
        totalnum: 10,
        todaynum: 10
      },
      homedata: [
        {
          name: "\u52A8\u6001",
          num: 0
        },
        {
          name: "\u8BC4\u8BBA",
          num: 0
        },
        {
          name: "\u6536\u85CF",
          num: 0
        }
      ],
      storageSize: "",
      spaceShow: true,
      pic: "",
      url: "",
      qq: "",
      xh: "",
      userName: "\u540C\u5B66",
      nickName: "\u540C\u5B66",
      modalName: null,
      status: "\u672A\u8BA4\u8BC1",
      picName: "\u6D41\u661F\u4E4B\u591C",
      list: [
        {
          image: "https://cdn2.jaycao.com/cdtu/tool1.png",
          title: "\u6628\u591C\u661F\u8FB0\u6628\u591C\u98CE\uFF0C\u753B\u697C\u897F\u7554\u6842\u5802\u4E1C"
        },
        {
          image: "https://cdn2.jaycao.com/cdtu/wban.png",
          title: "\u8EAB\u65E0\u5F69\u51E4\u53CC\u98DE\u7FFC\uFF0C\u5FC3\u6709\u7075\u7280\u4E00\u70B9\u901A"
        }
      ],
      pic: [{
        link: "https://wx.jaycao.com/zjx_me_bg1.jpeg",
        name: "\u6625\u5929"
      }, {
        link: "https://wx.jaycao.com/zjx_me_bg2.jpeg",
        name: "\u590F\u5929"
      }, {
        link: "https://cdn.zhoukaiwen.com/zjx_me_bg3.jpeg",
        name: "\u79CB\u5929"
      }, {
        link: "https://cdn.zhoukaiwen.com/zjx_me_bg4.jpeg",
        name: "\u51AC\u5929"
      }, {
        link: "https://cdn.zhoukaiwen.com/zjx_me_bg5.jpeg",
        name: "\u5E7D\u9759"
      }, {
        link: "https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg",
        name: "\u5929\u7A7A"
      }],
      topBackGroupImageIndex: 3,
      inter: [{
        title: "mimicry",
        name: "\u6D3B\u529B\u6625\u5929",
        color: ""
      }, {
        title: "theme",
        name: "\u6E05\u723D\u590F\u65E5",
        color: ""
      }, {
        title: "theme",
        name: "\u91D1\u79CB\u4E4B\u97F5",
        color: ""
      }, {
        title: "theme",
        name: "\u51AC\u65E5\u4E4B\u9633",
        color: ""
      }, {
        title: "theme",
        name: "\u5E7D\u5170\u661F\u7A7A",
        color: ""
      }, {
        title: "theme",
        name: "\u6D41\u661F\u4E4B\u591C",
        color: ""
      }]
    };
  },
  onShareAppMessage(res) {
    return {
      title: "\u770B\u770B\u8FD9\u4E2A\u5C0F\u7A0B\u5E8F\u591A\u597D\u73A9\uFF5E"
    };
  },
  watch: {
    topBackGroupImageIndex(val) {
      console.log(val);
      if (val == 4 || val == 5) {
        this.spaceShow = true;
      } else {
        this.spaceShow = false;
      }
    }
  },
  onLoad() {
    if (common_vendor.index.getStorageSync("userinfo").avatar) {
      this.homeinfo.userpic = common_vendor.index.getStorageSync("userinfo").avatar;
    }
    this.homeinfo.username = common_vendor.index.getStorageSync("userinfo").userName;
    this.getStorageSize();
    this.getjiaquninfo();
    if (common_vendor.index.getStorageSync("xh") != null) {
      this.status = "\u5DF2\u8BA4\u8BC1";
      console.log(this.status);
    }
  },
  mounted() {
    this.xh = ((parseInt(common_vendor.index.getStorageSync("userinfo").xh) + 8888) * 12).toString();
  },
  methods: {
    goOrder(id) {
      if (!common_vendor.index.getStorageSync("xh")) {
        return;
      }
      if (id == 1)
        this.touserspace();
      else if (id == 2)
        this.touserspace();
      else if (id == 3)
        this.getInfo();
      else if (id == 4)
        this.vertify();
    },
    goTool(url) {
      if (!common_vendor.index.getStorageSync("xh")) {
        return;
      }
      if (url == 1) {
        common_vendor.index.navigateTo({
          url: "../../me/salary"
        });
      } else if (url == 2) {
        common_vendor.index.navigateTo({
          url: "../../me/charts"
        });
      } else if (url == 3)
        this.fk();
      else if (url == 4) {
        common_vendor.index.navigateTo({
          url: "../../me/log/log"
        });
      } else if (url == 5)
        this.jiaqun();
      else if (url == 6)
        this.jiaqun();
      else if (url == 7)
        this.clearStorage();
      else if (url == 8)
        this.goAboutMe();
    },
    touserspace() {
      common_vendor.index.navigateTo({
        url: "../../../pages/userspace/userspace?xh=" + this.xh
      });
    },
    fk() {
      common_vendor.index.navigateTo({
        url: "../../webView/webView?detailData=" + encodeURIComponent(JSON.stringify("https://support.qq.com/embed/phone/408686"))
      });
    },
    submit() {
      common_vendor.index.request({
        url: "https://support.qq.com/product/408686",
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          nickname: this.homeinfo.username.substr(0, 1) + "\u540C\u5B66",
          avatar: this.homeinfo.userpic,
          openid: this.homeinfo.username
        },
        success: (res) => {
        }
      });
    },
    getjiaquninfo() {
      common_request.request.httpRequest({
        url: "notice/noticeBanner/getAppInfo/5"
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data);
          this.qq = res.data.data.img;
          this.url = res.data.data.navurl;
        }
      });
    },
    fuzhiqq() {
      common_vendor.index.setClipboardData({
        data: this.qq,
        success: () => {
          common_vendor.index.showToast({
            title: "QQ\u7FA4\u5DF2\u590D\u5236\uFF0C\u82E5\u52A0\u7FA4\u5931\u8D25,\u8BF7\u624B\u52A8\u52A0\u7FA4"
          });
        }
      });
    },
    jiaqun() {
    },
    vertify() {
      const xh = common_vendor.index.getStorageSync("xh");
      if (xh == null) {
        common_vendor.index.navigateTo({
          url: "../../me/setNumber/setNumber"
        });
      } else {
        common_vendor.index.showToast({
          title: "\u5DF2\u8BA4\u8BC1"
        });
      }
    },
    getStorageSize: function() {
      let that = this;
      common_vendor.index.getStorageInfo({
        success(res) {
          let size = res.currentSize;
          if (size < 1024) {
            that.storageSize = size + " B";
          } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
            that.storageSize = Math.floor(size / 1024 * 100) / 100 + " KB";
          } else if (size / 1024 / 1024 >= 1) {
            that.storageSize = Math.floor(size / 1024 / 1024 * 100) / 100 + " M";
          }
        }
      });
    },
    clearStorage: function() {
      let that = this;
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u786E\u5B9A\u6E05\u9664\u7F13\u5B58\u5417?",
        confirmText: "\u7ACB\u5373\u6E05\u9664",
        success(res) {
          if (res.confirm) {
            common_vendor.index.clearStorageSync();
            that.getStorageSize();
            common_vendor.index.showToast({
              title: "\u6E05\u9664\u6210\u529F"
            });
            common_vendor.index.reLaunch({
              url: "../../login/login"
            });
          }
        }
      });
    },
    getGitee() {
      common_vendor.index.setClipboardData({
        data: "https://gitee.com/kevin_chou",
        success: function() {
          console.log("success");
        }
      });
    },
    switchImage(index, name) {
      this.topBackGroupImageIndex = index;
      this.modalName = null;
      this.picName = name;
    },
    showModal(e) {
      this.modalName = e.currentTarget.dataset.target;
    },
    showGitee(e) {
      this.modalName = e.currentTarget.dataset.target;
    },
    hideModal(e) {
      this.modalName = null;
    },
    getInfo() {
      common_vendor.index.navigateTo({
        url: "../../me/editme"
      });
    },
    goAboutMe() {
      common_vendor.index.navigateTo({
        url: "../../me/abme/abme"
      });
    }
  }
};
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_icon2 = common_vendor.resolveComponent("tm-icon");
  const _easycom_tm_grid_item2 = common_vendor.resolveComponent("tm-grid-item");
  const _easycom_tm_grid2 = common_vendor.resolveComponent("tm-grid");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  (_easycom_tm_text2 + _easycom_tm_icon2 + _easycom_tm_grid_item2 + _easycom_tm_grid2 + _easycom_tm_sheet2 + _easycom_u_swiper2)();
}
const _easycom_tm_text = () => "../../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_icon = () => "../../../tmui/components/tm-icon/tm-icon.js";
const _easycom_tm_grid_item = () => "../../../tmui/components/tm-grid-item/tm-grid-item.js";
const _easycom_tm_grid = () => "../../../tmui/components/tm-grid/tm-grid.js";
const _easycom_tm_sheet = () => "../../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_u_swiper = () => "../../../uni_modules/vk-uview-ui/components/u-swiper/u-swiper.js";
if (!Math) {
  (_easycom_tm_text + _easycom_tm_icon + _easycom_tm_grid_item + _easycom_tm_grid + _easycom_tm_sheet + _easycom_u_swiper)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.homeinfo.userpic || "https://cdn2.jaycao.com/cdtu/a.png",
    b: common_vendor.o((...args) => $options.touserspace && $options.touserspace(...args)),
    c: common_vendor.t$1($data.homeinfo.username),
    d: common_vendor.o((...args) => $options.touserspace && $options.touserspace(...args)),
    e: common_vendor.t$1($data.xh),
    f: common_vendor.o((...args) => $options.touserspace && $options.touserspace(...args)),
    g: common_vendor.p({
      ["font-size"]: 40,
      _class: "font-weight-b",
      label: "\u4E2A\u4EBA\u4E2D\u5FC3"
    }),
    h: common_vendor.p({
      color: "blue-grey",
      _class: "pb-10",
      ["font-size"]: 52,
      name: "tmicon-borderbottom-fill"
    }),
    i: common_vendor.p({
      ["font-size"]: 28,
      _class: "font-weight-b",
      label: "\u4FE1\u606F\u7ED1\u5B9A"
    }),
    j: common_vendor.p({
      text: true,
      url: "../chart/index",
      height: 180
    }),
    k: common_vendor.p({
      color: "blue-grey",
      _class: "pb-10",
      ["font-size"]: 52,
      name: "tmicon-borderbottom-fill"
    }),
    l: common_vendor.p({
      ["font-size"]: 28,
      _class: "font-weight-b",
      label: "\u8EAB\u4EFD\u8BA4\u8BC1"
    }),
    m: common_vendor.p({
      text: true,
      url: "../chart/index",
      height: 180
    }),
    n: common_vendor.p({
      color: "blue-grey",
      _class: "pb-10",
      ["font-size"]: 52,
      name: "tmicon-borderbottom-fill"
    }),
    o: common_vendor.p({
      ["font-size"]: 28,
      _class: "font-weight-b",
      label: 1
    }),
    p: common_vendor.p({
      text: true,
      url: "../chart/index",
      height: 180
    }),
    q: common_vendor.p({
      col: 3,
      width: 630
    }),
    r: common_vendor.p({
      round: 3
    }),
    s: common_vendor.p({
      list: $data.list,
      height: "165",
      mode: ""
    }),
    t: common_vendor.f($data.tools, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t$1(item.title),
        c: index,
        d: common_vendor.o(($event) => $options.goTool(item.url), index)
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/me/me2/me2.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
