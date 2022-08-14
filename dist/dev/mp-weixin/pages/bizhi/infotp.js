"use strict";
var common_vendor = require("../../common/vendor.js");
const pop = () => "../../components/ming-pop/ming-pop.js";
let videoAd = null;
var w = common_vendor.index.getSystemInfoSync().windowWidth;
var h = common_vendor.index.getSystemInfoSync().windowHeight;
const _sfc_main = {
  components: {
    pop
  },
  data() {
    return {
      loadFlag: true,
      loginShow: false,
      detail: {},
      staticUrl: "",
      adIntegral: 0,
      downShow: false,
      downIntegral: 0,
      downTitle: "",
      downBtn: "",
      adShow: false,
      isColl: false,
      isZan: false,
      zanStatus: true,
      collStatus: true,
      cssTran: false,
      indexCurrent: 1,
      activeCurrent: 0,
      videoids: "",
      adpid: "",
      mrcs: 5,
      mrcsjrk: 0,
      mrcsjr: 1,
      id: 0,
      mid: 0,
      isplaytext: "",
      price: 0,
      uid: 1,
      isfx: 0,
      signShow: false,
      signTitle: "",
      w,
      h
    };
  },
  onLoad(e) {
    if (e.fxid) {
      common_vendor.index.setStorage({
        key: "fxid",
        data: e.fxid
      });
    }
    if (e.isfx) {
      this.isfx = e.isfx;
    }
    this.staticUrl = "https://lhsk.demo.hongcd.com/img/";
    var that = this;
    var index = 0;
    that.indexCurrent = parseInt(index) + 1;
    that.activeCurrent = parseInt(index);
    that.loadFlag = false;
    if (e.id) {
      this.id = e.id;
      this.getinfo(this.id);
    }
    if (common_vendor.index.getStorageSync("userinfo").id) {
      this.uid = common_vendor.index.getStorageSync("userinfo").id;
    }
    this.ongrzlTap();
  },
  onShow() {
  },
  onHide() {
  },
  onUnload() {
  },
  onShareAppMessage(res) {
    var this_ = this;
    if (res.from === "menu") {
      console.log(res.target);
    }
    return {
      title: "\u516D\u53F7\u65F6\u7A7A",
      channel: true,
      path: "/pages/client/tuan/infotp?fxid=" + this_.uid + "&id=" + this_.id + "&isfx=1"
    };
  },
  methods: {
    async ongrzlTap() {
      let data = {};
      data.token = common_vendor.index.getStorageSync("userinfo").token;
      data.uid = common_vendor.index.getStorageSync("userinfo").id;
      common_vendor.index.request({
        url: "https://lhsk.demo.hongcd.com/api/index/index",
        data,
        success: (res) => {
          this.videoids = res.data.data.config.site.weixinxcx.videoAd;
          var mrcs = res.data.data.config.mrcs;
          var mrcsjr = res.data.data.config.mrcsjr;
          this.mrcs = mrcs;
          if (this.videoids || this.adpid) {
            this.mrcsjr = mrcsjr;
          }
          this.mrcsjrk = mrcs - mrcsjr;
          this.adLoad();
        },
        fail: (data2, code) => {
        }
      });
    },
    getinfo(id) {
      common_vendor.index.showLoading({
        title: "\u52A0\u8F7D\u4E2D"
      });
      let data = {};
      data.id = id;
      data.mid = this.mid;
      if (common_vendor.index.getStorageSync("userinfo").token) {
        data.token = common_vendor.index.getStorageSync("userinfo").token;
        this.isLogin = true;
      }
      common_vendor.index.request({
        url: "https://lhsk.demo.hongcd.com/api/video/infotp",
        data,
        success: (data2) => {
          common_vendor.index.hideLoading();
          if (common_vendor.index.getStorageSync("userinfo").token) {
            if (data2.data.isvip > 1) {
              this.price = data2.data.vipprice;
            } else {
              this.price = data2.data.price;
            }
          } else {
            this.price = data2.data.price;
          }
          data2.data.pricebuy = this.price;
          this.detail = data2.data;
          if (data2.data.isvip > 1) {
            if (data2.data.vipprice * 1 == 0) {
              this.isplaytext = "VIP\u514D\u8D39";
            }
          } else {
            if (data2.data.price * 1 == 0) {
              this.isplaytext = "\u514D\u8D39\u89C6\u9891";
            }
          }
        },
        fail: (data2, code) => {
          common_vendor.index.hideLoading();
        }
      });
    },
    opdownloadFile() {
      var that = this;
      common_vendor.index.showLoading({
        title: "\u6B63\u5728\u4FDD\u5B58\u56FE\u7247"
      });
      var url = that.detail.images[that.indexCurrent - 1];
      url.substring(url.lastIndexOf(".") + 1);
      new Date().valueOf();
      console.log(url);
      common_vendor.index.downloadFile({
        url,
        success: (res) => {
          var benUrl = res.tempFilePath;
          console.log(res);
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: benUrl,
            success: function(data) {
              common_vendor.index.hideLoading();
              common_vendor.index.showModal({
                title: "\u6E29\u99A8\u63D0\u793A",
                content: "\u4FDD\u5B58\u6210\u529F",
                showCancel: false,
                success(res2) {
                  if (res2.confirm)
                    ;
                }
              });
            },
            fail: function(err) {
              if (err.errMsg) {
                console.log(err.errMsg);
                common_vendor.index.showModal({
                  title: "\u63D0\u793A",
                  content: "\u65E0\u6743\u9650\uFF0C\u8BF7\u6253\u5F00\u4E0B\u8F7D\u6743\u9650\u540E\u518D\u8BD5\uFF01",
                  showCancel: false,
                  success(res2) {
                    if (res2.confirm) {
                      common_vendor.index.openSetting({
                        success(settingdata) {
                          if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.saveImageToPhotosAlbum({
                              filePath: benUrl,
                              success: function(data) {
                                common_vendor.index.hideLoading();
                                that.adShow = true;
                              }
                            });
                          } else {
                            common_vendor.index.showModal({
                              title: "\u6E29\u99A8\u63D0\u793A",
                              content: "\u6388\u6743\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u65B0\u83B7\u53D6",
                              showCancel: false
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }
              common_vendor.index.hideLoading();
            }
          });
        },
        fail: (error) => {
          console.log(error);
        }
      });
    },
    winClick() {
      if (common_vendor.index.getStorageSync("userinfo").id)
        ;
      else {
        common_vendor.index.showModal({
          title: "\u6E29\u99A8\u63D0\u793A",
          content: "\u8BF7\u5148\u767B\u540E\u4E0B\u8F7D",
          showCancel: true,
          confirmText: "\u786E\u5B9A",
          success: function(res) {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/pages/login/login"
              });
            } else if (res.cancel)
              ;
          }
        });
        return false;
      }
      if (this.detail.isplay == 0) {
        this.$refs.pop.show();
      } else {
        this.opdownloadFile();
      }
    },
    backClick() {
      console.log(this.isfx);
      if (this.isfx == 1) {
        common_vendor.index.switchTab({
          url: "/pages/client/indexpic"
        });
      } else {
        common_vendor.index.navigateBack();
      }
    },
    collectClick() {
      this.isColl = true;
      common_vendor.index.showToast({
        icon: "none",
        title: "\u6536\u85CF\u6210\u529F",
        mask: true,
        duration: 1e3
      });
    },
    zanClick() {
      this.isZan = true;
      common_vendor.index.showToast({
        icon: "none",
        title: "\u70B9\u8D5E\u6210\u529F",
        mask: true,
        duration: 1e3
      });
    },
    cssClick() {
      this.cssTran = !this.cssTran;
    },
    swiperChange(e) {
      this.indexCurrent = e.detail.current + 1;
    },
    adLoad() {
      console.log(this.detail.videoids);
      var that = this;
      if (wx.createRewardedVideoAd) {
        videoAd = wx.createRewardedVideoAd({
          adUnitId: that.videoids
        });
        videoAd.onError((err) => {
          console.log("videoAd onError", err);
        });
        videoAd.onClose((status) => {
          that.downShow = false;
          if (status && status.isEnded || status === void 0) {
            that.admoney();
            console.log("\u770B\u5B8C\u5E7F\u544A");
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: "\u64AD\u653E\u4E2D\u9014\u9000\u51FA\uFF0C\u83B7\u53D6\u5931\u8D25",
              mask: true,
              duration: 1e3
            });
            console.log("\u4E2D\u9014\u9000\u51FA");
          }
        });
      }
    },
    adClick() {
      var mrcs = this.mrcs;
      if (this.mrcsjrk <= 0) {
        common_vendor.index.showModal({
          title: "\u6E29\u99A8\u63D0\u793A",
          content: "\u6BCF\u65E5\u53EA\u80FD\u770B" + mrcs + "\u6B21",
          showCancel: false,
          confirmText: "\u786E\u5B9A",
          success: function(res) {
            if (res.confirm)
              ;
            else if (res.cancel)
              ;
          }
        });
        return false;
      }
      var that = this;
      if (!that.videoids) {
        common_vendor.index.showToast({ title: "adUnitId\u83B7\u53D6\u5931\u8D25", icon: "none" });
        return;
      }
      if (videoAd) {
        videoAd.show().catch((err) => {
          videoAd.load().then(() => videoAd.show());
        });
      }
    },
    async userIntegral() {
      var that = this;
      common_vendor.index.showLoading({
        mask: true,
        title: "\u52A0\u8F7D\u4E2D..."
      });
      let data = await common_vendor.rn.callFunction({
        name: "user_integral",
        data: {
          userId: that.vuex_user._id
        }
      });
      common_vendor.index.hideLoading();
      if (data.result.success) {
        that.getUser();
        that.signTitle = "<p style='font-weight: 550;font-size: 16px;'>\u89C2\u770B\u6210\u529F</p><p style='padding-top: 10px;'>\u83B7\u5F97<span class='num'>" + data.result.integral + "</span>\u79EF\u5206</p>";
        that.signShow = true;
      }
    },
    watchOpen() {
    },
    watchClose() {
    },
    async admoney() {
      var this_ = this;
      let data = {};
      if (common_vendor.index.getStorageSync("userinfo").token) {
        data.token = common_vendor.index.getStorageSync("userinfo").token;
      }
      let [err, res] = await this.$httpas.get("/api/user/admoney", data);
      if (!this.$httpas.errorCheck(err, res))
        return;
      if (res.data.code === 1) {
        common_vendor.index.setStorage({
          key: "config",
          data: res.data.data
        });
        common_vendor.index.showModal({
          title: "\u6E29\u99A8\u63D0\u793A",
          content: "\u83B7\u53D6\u6210\u529F \u662F\u5426\u9A6C\u4E0A\u5151\u6362",
          showCancel: true,
          confirmText: "\u5151\u6362",
          success: function(ress) {
            if (ress.confirm) {
              this_.duihss();
            } else if (ress.cancel)
              ;
          }
        });
      } else {
        common_vendor.index.showToast({ title: "\u83B7\u53D6\u5931\u8D25", icon: "none" });
      }
    },
    duihss() {
      if (this.mrcsjr == 0) {
        this.adClick();
      } else {
        var this_ = this;
        let data = this.detail;
        data.sum = 1;
        data.buytype = "\u4F59\u989D";
        data.lx = 1;
        data.smid = 0;
        data.namet = data.name;
        data.pricebuy = data.price;
        data.token = common_vendor.index.getStorageSync("userinfo").token;
        data.uid = common_vendor.index.getStorageSync("userinfo").id;
        console.log(data);
        common_vendor.index.request({
          url: this.configs.webUrl + "/api/pay/videopay",
          data,
          success: (resa) => {
            if (data.buytype == "\u5FAE\u4FE1") {
              if (this.wxlx == "wxxcx" && resa.data.code == 1) {
                this.wxxcx(resa.data.data);
              }
            } else if (data.buytype == "\u4F59\u989D") {
              if (resa.data.code == 1) {
                common_vendor.index.showModal({
                  title: "\u63D0\u793A",
                  content: "\u5151\u6362\u6210\u529F",
                  showCancel: false,
                  success: (res) => {
                    this_.getinfo(this.id);
                    this_.$refs.pop.close();
                    this_.opdownloadFile();
                  }
                });
              } else {
                if (resa.data.msg == "\u4F59\u989D\u4E0D\u8DB3") {
                  common_vendor.index.showModal({
                    title: "\u63D0\u793A",
                    content: "\u79EF\u5206\u4E0D\u8DB3\uFF0C\u770B\u5E7F\u544A\u53EF\u4EE5\u83B7\u53D6",
                    showCancel: true,
                    confirmText: "\u770B\u5E7F\u544A",
                    success: (res) => {
                      this_.adClick();
                    }
                  });
                } else {
                  common_vendor.index.showModal({
                    title: "\u63D0\u793A",
                    content: resa.data.msg,
                    showCancel: false,
                    success: (res) => {
                      common_vendor.index.navigateBack();
                    }
                  });
                }
              }
            }
          },
          fail: (data2, code) => {
            console.log("fail" + JSON.stringify(data2));
          }
        });
      }
    }
  }
};
if (!Array) {
  const _component_pop = common_vendor.resolveComponent("pop");
  _component_pop();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.detail.images, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: common_vendor.o((...args) => $options.cssClick && $options.cssClick(...args)),
    c: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args)),
    d: $data.activeCurrent,
    e: !$data.loadFlag
  }, !$data.loadFlag ? {
    f: common_vendor.t$1($data.indexCurrent),
    g: common_vendor.t$1($data.detail.imageslength),
    h: $data.staticUrl + "back.png",
    i: common_vendor.o(($event) => $options.backClick()),
    j: $data.isColl ? $data.staticUrl + "coll_art.png" : $data.staticUrl + "coll.png",
    k: common_vendor.t$1($data.isColl ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF"),
    l: common_vendor.o(($event) => $options.collectClick()),
    m: $data.staticUrl + "duihuan.png",
    n: common_vendor.o(($event) => $options.winClick($data.detail._id)),
    o: $data.isZan ? $data.staticUrl + "zan_art.png" : $data.staticUrl + "zan.png",
    p: common_vendor.t$1($data.isZan ? "\u5DF2\u70B9\u8D5E" : "\u70B9\u8D5E"),
    q: common_vendor.o(($event) => $options.zanClick()),
    r: $data.staticUrl + "shares.png",
    s: common_vendor.n($data.cssTran ? "closeCss" : "openCss")
  } : {}, {
    t: common_vendor.o(($event) => _ctx.a = false),
    v: common_vendor.o(($event) => _ctx.a = false),
    w: !$data.loadFlag,
    x: $data.loadFlag,
    y: $data.detail.isplay == 0
  }, $data.detail.isplay == 0 ? {
    z: common_vendor.o(($event) => $options.opdownloadFile())
  } : {
    A: common_vendor.t$1($data.price),
    B: common_vendor.o(($event) => $options.duihss())
  }, {
    C: common_vendor.o(($event) => $options.adClick()),
    D: common_vendor.sr("pop", "4648c125-0"),
    E: common_vendor.o($options.watchOpen),
    F: common_vendor.o($options.watchClose),
    G: common_vendor.p({
      direction: "center",
      is_close: true,
      is_mask: true,
      width: 90,
      height: "fit-content",
      maskFun: true
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/bizhi/infotp.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
