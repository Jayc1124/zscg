"use strict";
var common_vendor = require("../../../common/vendor.js");
var _self;
const _sfc_main = {
  data() {
    return {
      canvasName: "handWriting",
      ctx: "",
      startX: null,
      startY: null,
      canvasWidth: 0,
      canvasHeight: 0,
      selectColor: "black",
      lineColor: "#1A1A1A",
      lineSize: 5
    };
  },
  onLoad() {
    _self = this;
    switch (_self.$store.state.platform) {
      case "android":
        console.log("\u8FD0\u884CAndroid\u4E0A");
        break;
      case "ios":
        Vue.prototype.requestIosPermission("photoLibrary", "\u76F8\u518C");
        console.log("\u8FD0\u884CiOS\u4E0A");
        break;
      default:
        console.log("\u8FD0\u884C\u5728\u5F00\u53D1\u8005\u5DE5\u5177\u4E0A");
        break;
    }
  },
  onReady() {
    this.ctx = common_vendor.index.createCanvasContext("handWriting");
    common_vendor.index.createSelectorQuery().select(".handCenter").boundingClientRect((rect) => {
      this.canvasWidth = rect.width;
      this.canvasHeight = rect.height;
      this.setCanvasBg("#fff");
    }).exec();
  },
  methods: {
    uploadScaleStart(e) {
      this.startX = e.changedTouches[0].x;
      this.startY = e.changedTouches[0].y;
      this.ctx.setStrokeStyle(this.lineColor);
      this.ctx.setLineWidth(this.lineSize);
      this.ctx.setLineCap("round");
      this.ctx.beginPath();
    },
    uploadScaleMove(e) {
      let temX = e.changedTouches[0].x;
      let temY = e.changedTouches[0].y;
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(temX, temY);
      this.ctx.stroke();
      this.startX = temX;
      this.startY = temY;
      this.ctx.draw(true);
    },
    retDraw() {
      this.ctx.clearRect(0, 0, 700, 730);
      this.ctx.draw();
      this.setCanvasBg("#fff");
    },
    selectColorEvent(str, color) {
      this.selectColor = str;
      this.lineColor = color;
    },
    subCanvas() {
      this.ctx.draw(true, () => {
        common_vendor.index.canvasToTempFilePath({
          canvasId: "handWriting",
          fileType: "png",
          quality: 1,
          success(res) {
            common_vendor.index.showToast({
              title: "\u5DF2\u4FDD\u5B58"
            });
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res2) {
                common_vendor.index.showToast({
                  title: "\u4FDD\u5B58\u5B8C\u6BD5",
                  duration: 2e3
                });
              }
            });
          }
        });
      });
    },
    saveCanvasAsImg() {
      common_vendor.index.canvasToTempFilePath({
        canvasId: "handWriting",
        fileType: "png",
        quality: 1,
        success(res) {
          console.log(res.tempFilePath, "canvas\u751F\u6210\u56FE\u7247\u5730\u5740");
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res2) {
              common_vendor.index.showToast({
                title: "\u5DF2\u4FDD\u5B58\u5230\u76F8\u518C",
                duration: 2e3
              });
            }
          });
        }
      });
    },
    previewCanvasImg() {
      common_vendor.index.canvasToTempFilePath({
        canvasId: "handWriting",
        fileType: "jpg",
        quality: 1,
        success(res) {
          common_vendor.index.previewImage({
            urls: [res.tempFilePath]
          });
        }
      });
    },
    setCanvasBg(color) {
      this.ctx.rect(0, 0, this.canvasWidth, this.canvasHeight - 4);
      this.ctx.setFillStyle(color);
      this.ctx.fill();
      this.ctx.draw();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.selectColorEvent("black", "#1A1A1A")),
    b: $data.selectColor === "black" ? "/static/images/phoneSign/color_black_selected.png" : "/static/images/phoneSign/color_black.png",
    c: common_vendor.n($data.selectColor === "black" ? "color_select" : ""),
    d: common_vendor.o(($event) => $options.selectColorEvent("red", "#ca262a")),
    e: $data.selectColor === "red" ? "/static/images/phoneSign/color_red_selected.png" : "/static/images/phoneSign/color_red.png",
    f: common_vendor.n($data.selectColor === "red" ? "color_select" : ""),
    g: common_vendor.o((...args) => $options.retDraw && $options.retDraw(...args)),
    h: common_vendor.o((...args) => $options.saveCanvasAsImg && $options.saveCanvasAsImg(...args)),
    i: common_vendor.o((...args) => $options.previewCanvasImg && $options.previewCanvasImg(...args)),
    j: common_vendor.o((...args) => $options.subCanvas && $options.subCanvas(...args)),
    k: common_vendor.o((...args) => $options.uploadScaleStart && $options.uploadScaleStart(...args)),
    l: common_vendor.o((...args) => $options.uploadScaleMove && $options.uploadScaleMove(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/phoneSign/phoneSign.vue"]]);
wx.createPage(MiniProgramPage);
