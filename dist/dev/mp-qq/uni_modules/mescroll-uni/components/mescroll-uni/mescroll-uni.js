"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption = require("./mescroll-uni-option.js");
var uni_modules_mescrollUni_components_mescrollUni_mescrollI18n = require("./mescroll-i18n.js");
var uni_modules_mescrollUni_components_mescrollUni_wxs_mixins = require("./wxs/mixins.js");
function MeScroll(options, isScrollBody) {
  let me = this;
  me.version = "1.3.7";
  me.options = options || {};
  me.isScrollBody = isScrollBody || false;
  me.isDownScrolling = false;
  me.isUpScrolling = false;
  let hasDownCallback = me.options.down && me.options.down.callback;
  me.initDownScroll();
  me.initUpScroll();
  setTimeout(function() {
    if ((me.optDown.use || me.optDown.native) && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll();
      } else {
        me.optDown.callback && me.optDown.callback(me);
      }
    }
    if (!me.isUpAutoLoad) {
      setTimeout(function() {
        me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
      }, 100);
    }
  }, 30);
}
MeScroll.prototype.extendDownScroll = function(optDown) {
  MeScroll.extend(optDown, {
    use: false,
    auto: true,
    native: false,
    autoShowLoading: false,
    isLock: false,
    offset: 80,
    startTop: 100,
    inOffsetRate: 1,
    outOffsetRate: 0.2,
    bottomOffset: 20,
    minAngle: 45,
    textInOffset: "\u4E0B\u62C9\u5237\u65B0",
    textOutOffset: "\u91CA\u653E\u66F4\u65B0",
    textLoading: "\u52A0\u8F7D\u4E2D ...",
    textSuccess: "\u52A0\u8F7D\u6210\u529F",
    textErr: "\u52A0\u8F7D\u5931\u8D25",
    beforeEndDelay: 0,
    bgColor: "transparent",
    textColor: "gray",
    inited: null,
    inOffset: null,
    outOffset: null,
    onMoving: null,
    beforeLoading: null,
    showLoading: null,
    afterLoading: null,
    beforeEndDownScroll: null,
    endDownScroll: null,
    afterEndDownScroll: null,
    callback: function(mescroll) {
      mescroll.resetUpScroll();
    }
  });
};
MeScroll.prototype.extendUpScroll = function(optUp) {
  MeScroll.extend(optUp, {
    use: true,
    auto: true,
    isLock: false,
    isBoth: true,
    callback: null,
    page: {
      num: 0,
      size: 10,
      time: null
    },
    noMoreSize: 5,
    offset: 150,
    textLoading: "\u52A0\u8F7D\u4E2D ...",
    textNoMore: "-- END --",
    bgColor: "transparent",
    textColor: "gray",
    inited: null,
    showLoading: null,
    showNoMore: null,
    hideUpScroll: null,
    errDistance: 60,
    toTop: {
      src: null,
      offset: 1e3,
      duration: 300,
      btnClick: null,
      onShow: null,
      zIndex: 9990,
      left: null,
      right: 20,
      bottom: 120,
      safearea: false,
      width: 72,
      radius: "50%"
    },
    empty: {
      use: true,
      icon: null,
      tip: "~ \u6682\u65E0\u76F8\u5173\u6570\u636E ~",
      btnText: "",
      btnClick: null,
      onShow: null,
      fixed: false,
      top: "100rpx",
      zIndex: 99
    },
    onScroll: false
  });
};
MeScroll.extend = function(userOption, defaultOption) {
  if (!userOption)
    return defaultOption;
  for (let key in defaultOption) {
    if (userOption[key] == null) {
      let def = defaultOption[key];
      if (def != null && typeof def === "object") {
        userOption[key] = MeScroll.extend({}, def);
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === "object") {
      MeScroll.extend(userOption[key], defaultOption[key]);
    }
  }
  return userOption;
};
MeScroll.prototype.hasColor = function(color) {
  if (!color)
    return false;
  let c = color.toLowerCase();
  return c != "#fff" && c != "#ffffff" && c != "transparent" && c != "white";
};
MeScroll.prototype.initDownScroll = function() {
  let me = this;
  me.optDown = me.options.down || {};
  if (!me.optDown.textColor && me.hasColor(me.optDown.bgColor))
    me.optDown.textColor = "#fff";
  me.extendDownScroll(me.optDown);
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false;
  }
  me.downHight = 0;
  if (me.optDown.use && me.optDown.inited) {
    setTimeout(function() {
      me.optDown.inited(me);
    }, 0);
  }
};
MeScroll.prototype.touchstartEvent = function(e) {
  if (!this.optDown.use)
    return;
  this.startPoint = this.getPoint(e);
  this.startTop = this.getScrollTop();
  this.startAngle = 0;
  this.lastPoint = this.startPoint;
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset;
  this.inTouchend = false;
};
MeScroll.prototype.touchmoveEvent = function(e) {
  if (!this.optDown.use)
    return;
  let me = this;
  let scrollTop = me.getScrollTop();
  let curPoint = me.getPoint(e);
  let moveY = curPoint.y - me.startPoint.y;
  if (moveY > 0 && (me.isScrollBody && scrollTop <= 0 || !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop))) {
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling && me.optUp.isBoth)) {
      if (!me.startAngle)
        me.startAngle = me.getAngle(me.lastPoint, curPoint);
      if (me.startAngle < me.optDown.minAngle)
        return;
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true;
        me.touchendEvent();
        return;
      }
      me.preventDefault(e);
      let diff = curPoint.y - me.lastPoint.y;
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1;
          me.isDownEndSuccess = null;
          me.optDown.inOffset && me.optDown.inOffset(me);
          me.isMoveDown = true;
        }
        me.downHight += diff * me.optDown.inOffsetRate;
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2;
          me.optDown.outOffset && me.optDown.outOffset(me);
          me.isMoveDown = true;
        }
        if (diff > 0) {
          me.downHight += diff * me.optDown.outOffsetRate;
        } else {
          me.downHight += diff;
        }
      }
      me.downHight = Math.round(me.downHight);
      let rate = me.downHight / me.optDown.offset;
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight);
    }
  }
  me.lastPoint = curPoint;
};
MeScroll.prototype.touchendEvent = function(e) {
  if (!this.optDown.use)
    return;
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      this.triggerDownScroll();
    } else {
      this.downHight = 0;
      this.endDownScrollCall(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {
    let isScrollUp = this.getPoint(e).y - this.startPoint.y < 0;
    if (isScrollUp) {
      let angle = this.getAngle(this.getPoint(e), this.startPoint);
      if (angle > 80) {
        this.triggerUpScroll(true);
      }
    }
  }
};
MeScroll.prototype.getPoint = function(e) {
  if (!e) {
    return {
      x: 0,
      y: 0
    };
  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    };
  } else {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
};
MeScroll.prototype.getAngle = function(p1, p2) {
  let x = Math.abs(p1.x - p2.x);
  let y = Math.abs(p1.y - p2.y);
  let z = Math.sqrt(x * x + y * y);
  let angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};
MeScroll.prototype.triggerDownScroll = function() {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this))
    ;
  else {
    this.showDownScroll();
    !this.optDown.native && this.optDown.callback && this.optDown.callback(this);
  }
};
MeScroll.prototype.showDownScroll = function() {
  this.isDownScrolling = true;
  if (this.optDown.native) {
    common_vendor.index.startPullDownRefresh();
    this.showDownLoadingCall(0);
  } else {
    this.downHight = this.optDown.offset;
    this.showDownLoadingCall(this.downHight);
  }
};
MeScroll.prototype.showDownLoadingCall = function(downHight) {
  this.optDown.showLoading && this.optDown.showLoading(this, downHight);
  this.optDown.afterLoading && this.optDown.afterLoading(this, downHight);
};
MeScroll.prototype.onPullDownRefresh = function() {
  this.isDownScrolling = true;
  this.showDownLoadingCall(0);
  this.optDown.callback && this.optDown.callback(this);
};
MeScroll.prototype.endDownScroll = function() {
  if (this.optDown.native) {
    this.isDownScrolling = false;
    this.endDownScrollCall(this);
    common_vendor.index.stopPullDownRefresh();
    return;
  }
  let me = this;
  let endScroll = function() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.endDownScrollCall(me);
    if (!me.isScrollBody) {
      me.setScrollHeight(0);
      me.scrollTo(0, 0);
    }
  };
  let delay = 0;
  if (me.optDown.beforeEndDownScroll) {
    delay = me.optDown.beforeEndDownScroll(me);
    if (me.isDownEndSuccess == null)
      delay = 0;
  }
  if (typeof delay === "number" && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};
MeScroll.prototype.endDownScrollCall = function() {
  this.optDown.endDownScroll && this.optDown.endDownScroll(this);
  this.optDown.afterEndDownScroll && this.optDown.afterEndDownScroll(this);
};
MeScroll.prototype.lockDownScroll = function(isLock) {
  if (isLock == null)
    isLock = true;
  this.optDown.isLock = isLock;
};
MeScroll.prototype.lockUpScroll = function(isLock) {
  if (isLock == null)
    isLock = true;
  this.optUp.isLock = isLock;
};
MeScroll.prototype.initUpScroll = function() {
  let me = this;
  me.optUp = me.options.up || { use: false };
  if (!me.optUp.textColor && me.hasColor(me.optUp.bgColor))
    me.optUp.textColor = "#fff";
  me.extendUpScroll(me.optUp);
  if (me.optUp.use === false)
    return;
  me.optUp.hasNext = true;
  me.startNum = me.optUp.page.num + 1;
  if (me.optUp.inited) {
    setTimeout(function() {
      me.optUp.inited(me);
    }, 0);
  }
};
MeScroll.prototype.onReachBottom = function() {
  if (this.isScrollBody && !this.isUpScrolling) {
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};
MeScroll.prototype.onPageScroll = function(e) {
  if (!this.isScrollBody)
    return;
  this.setScrollTop(e.scrollTop);
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};
MeScroll.prototype.scroll = function(e, onScroll) {
  this.setScrollTop(e.scrollTop);
  this.setScrollHeight(e.scrollHeight);
  if (this.preScrollY == null)
    this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;
  this.isScrollUp && this.triggerUpScroll(true);
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
  this.optUp.onScroll && onScroll && onScroll();
};
MeScroll.prototype.triggerUpScroll = function(isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    if (isCheck === true) {
      let canUp = false;
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {
          canUp = true;
        }
      }
      if (canUp === false)
        return;
    }
    this.showUpScroll();
    this.optUp.page.num++;
    this.isUpAutoLoad = true;
    this.num = this.optUp.page.num;
    this.size = this.optUp.page.size;
    this.time = this.optUp.page.time;
    this.optUp.callback(this);
  }
};
MeScroll.prototype.showUpScroll = function() {
  this.isUpScrolling = true;
  this.optUp.showLoading && this.optUp.showLoading(this);
};
MeScroll.prototype.showNoMore = function() {
  this.optUp.hasNext = false;
  this.optUp.showNoMore && this.optUp.showNoMore(this);
};
MeScroll.prototype.hideUpScroll = function() {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this);
};
MeScroll.prototype.endUpScroll = function(isShowNoMore) {
  if (isShowNoMore != null) {
    if (isShowNoMore) {
      this.showNoMore();
    } else {
      this.hideUpScroll();
    }
  }
  this.isUpScrolling = false;
};
MeScroll.prototype.resetUpScroll = function(isShowLoading) {
  if (this.optUp && this.optUp.use) {
    let page = this.optUp.page;
    this.prePageNum = page.num;
    this.prePageTime = page.time;
    page.num = this.startNum;
    page.time = null;
    if (!this.isDownScrolling && isShowLoading !== false) {
      if (isShowLoading == null) {
        this.removeEmpty();
        this.showUpScroll();
      } else {
        this.showDownScroll();
      }
    }
    this.isUpAutoLoad = true;
    this.num = page.num;
    this.size = page.size;
    this.time = page.time;
    this.optUp.callback && this.optUp.callback(this);
  }
};
MeScroll.prototype.setPageNum = function(num) {
  this.optUp.page.num = num - 1;
};
MeScroll.prototype.setPageSize = function(size) {
  this.optUp.page.size = size;
};
MeScroll.prototype.endByPage = function(dataSize, totalPage, systime) {
  let hasNext;
  if (this.optUp.use && totalPage != null)
    hasNext = this.optUp.page.num < totalPage;
  this.endSuccess(dataSize, hasNext, systime);
};
MeScroll.prototype.endBySize = function(dataSize, totalSize, systime) {
  let hasNext;
  if (this.optUp.use && totalSize != null) {
    let loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize;
    hasNext = loadSize < totalSize;
  }
  this.endSuccess(dataSize, hasNext, systime);
};
MeScroll.prototype.endSuccess = function(dataSize, hasNext, systime) {
  let me = this;
  if (me.isDownScrolling) {
    me.isDownEndSuccess = true;
    me.endDownScroll();
  }
  if (me.optUp.use) {
    let isShowNoMore;
    if (dataSize != null) {
      let pageNum = me.optUp.page.num;
      let pageSize = me.optUp.page.size;
      if (pageNum === 1) {
        if (systime)
          me.optUp.page.time = systime;
      }
      if (dataSize < pageSize || hasNext === false) {
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          isShowNoMore = false;
          me.showEmpty();
        } else {
          let allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty();
        }
      } else {
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty();
      }
    }
    me.endUpScroll(isShowNoMore);
  }
};
MeScroll.prototype.endErr = function(errDistance) {
  if (this.isDownScrolling) {
    this.isDownEndSuccess = false;
    let page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    if (this.isScrollBody && errDistance !== 0) {
      if (!errDistance)
        errDistance = this.optUp.errDistance;
      this.scrollTo(this.getScrollTop() - errDistance, 0);
    }
  }
};
MeScroll.prototype.showEmpty = function() {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};
MeScroll.prototype.removeEmpty = function() {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};
MeScroll.prototype.showTopBtn = function() {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};
MeScroll.prototype.hideTopBtn = function() {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};
MeScroll.prototype.getScrollTop = function() {
  return this.scrollTop || 0;
};
MeScroll.prototype.setScrollTop = function(y) {
  this.scrollTop = y;
};
MeScroll.prototype.scrollTo = function(y, t) {
  this.myScrollTo && this.myScrollTo(y, t);
};
MeScroll.prototype.resetScrollTo = function(myScrollTo) {
  this.myScrollTo = myScrollTo;
};
MeScroll.prototype.getScrollBottom = function() {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};
MeScroll.prototype.getStep = function(star, end, callback, t, rate) {
  let diff = end - star;
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300;
  rate = rate || 30;
  let count = t / rate;
  let step = diff / count;
  let i = 0;
  let timer = setInterval(function() {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer);
      clearInterval(timer);
    }
  }, rate);
};
MeScroll.prototype.getClientHeight = function(isReal) {
  let h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function(h) {
  this.clientHeight = h;
};
MeScroll.prototype.getScrollHeight = function() {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function(h) {
  this.scrollHeight = h;
};
MeScroll.prototype.getBodyHeight = function() {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function(h) {
  this.bodyHeight = h;
};
MeScroll.prototype.preventDefault = function(e) {
  if (e && e.cancelable && !e.defaultPrevented)
    e.preventDefault();
};
var block0 = (Component2) => {
  if (!Component2.wxsCallMethods) {
    Component2.wxsCallMethods = [];
  }
  Component2.wxsCallMethods.push("wxsCall");
};
const MescrollTop = () => "./components/mescroll-top.js";
const _sfc_main = {
  name: "mescroll-uni",
  mixins: [uni_modules_mescrollUni_components_mescrollUni_wxs_mixins.WxsMixin],
  components: {
    MescrollTop
  },
  props: {
    down: Object,
    up: Object,
    i18n: Object,
    top: [String, Number],
    topbar: [Boolean, String],
    bottom: [String, Number],
    safearea: Boolean,
    fixed: {
      type: Boolean,
      default: true
    },
    height: [String, Number],
    bottombar: {
      type: Boolean,
      default: true
    },
    disableScroll: Boolean
  },
  data() {
    return {
      mescroll: { optDown: {}, optUp: {} },
      viewId: "id_" + Math.random().toString(36).substr(2, 16),
      downHight: 0,
      downRate: 0,
      downLoadType: 0,
      upLoadType: 0,
      isShowEmpty: false,
      isShowToTop: false,
      scrollTop: 0,
      scrollAnim: false,
      windowTop: 0,
      windowBottom: 0,
      windowHeight: 0,
      statusBarHeight: 0
    };
  },
  computed: {
    isFixed() {
      return !this.height && this.fixed;
    },
    scrollHeight() {
      if (this.isFixed) {
        return "auto";
      } else if (this.height) {
        return this.toPx(this.height) + "px";
      } else {
        return "100%";
      }
    },
    numTop() {
      return this.toPx(this.top);
    },
    fixedTop() {
      return this.isFixed ? this.numTop + this.windowTop + "px" : 0;
    },
    padTop() {
      return !this.isFixed ? this.numTop + "px" : 0;
    },
    numBottom() {
      return this.toPx(this.bottom);
    },
    fixedBottom() {
      return this.isFixed ? this.numBottom + this.windowBottom + "px" : 0;
    },
    padBottom() {
      return !this.isFixed ? this.numBottom + "px" : 0;
    },
    isDownReset() {
      return this.downLoadType === 3 || this.downLoadType === 4;
    },
    transition() {
      return this.isDownReset ? "transform 300ms" : "";
    },
    translateY() {
      return this.downHight > 0 ? "translateY(" + this.downHight + "px)" : "";
    },
    scrollable() {
      if (this.disableScroll)
        return false;
      return this.downLoadType === 0 || this.isDownReset;
    },
    isDownLoading() {
      return this.downLoadType === 3;
    },
    downRotate() {
      return "rotate(" + 360 * this.downRate + "deg)";
    },
    downText() {
      if (!this.mescroll)
        return "";
      switch (this.downLoadType) {
        case 1:
          return this.mescroll.optDown.textInOffset;
        case 2:
          return this.mescroll.optDown.textOutOffset;
        case 3:
          return this.mescroll.optDown.textLoading;
        case 4:
          return this.mescroll.isDownEndSuccess ? this.mescroll.optDown.textSuccess : this.mescroll.isDownEndSuccess == false ? this.mescroll.optDown.textErr : this.mescroll.optDown.textInOffset;
        default:
          return this.mescroll.optDown.textInOffset;
      }
    }
  },
  methods: {
    toPx(num) {
      if (typeof num === "string") {
        if (num.indexOf("px") !== -1) {
          if (num.indexOf("rpx") !== -1) {
            num = num.replace("rpx", "");
          } else if (num.indexOf("upx") !== -1) {
            num = num.replace("upx", "");
          } else {
            return Number(num.replace("px", ""));
          }
        } else if (num.indexOf("%") !== -1) {
          let rate = Number(num.replace("%", "")) / 100;
          return this.windowHeight * rate;
        }
      }
      return num ? common_vendor.index.upx2px(Number(num)) : 0;
    },
    scroll(e) {
      this.mescroll.scroll(e.detail, () => {
        this.$emit("scroll", this.mescroll);
      });
    },
    emptyClick() {
      this.$emit("emptyclick", this.mescroll);
    },
    toTopClick() {
      this.mescroll.scrollTo(0, this.mescroll.optUp.toTop.duration);
      this.$emit("topclick", this.mescroll);
    },
    setClientHeight() {
      if (this.mescroll.getClientHeight(true) === 0 && !this.isExec) {
        this.isExec = true;
        this.$nextTick(() => {
          this.getClientInfo((data) => {
            this.isExec = false;
            if (data) {
              this.mescroll.setClientHeight(data.height);
            } else if (this.clientNum != 3) {
              this.clientNum = this.clientNum == null ? 1 : this.clientNum + 1;
              setTimeout(() => {
                this.setClientHeight();
              }, this.clientNum * 100);
            }
          });
        });
      }
    },
    getClientInfo(success) {
      let query = common_vendor.index.createSelectorQuery();
      query = query.in(this);
      let view = query.select("#" + this.viewId);
      view.boundingClientRect((data) => {
        success(data);
      }).exec();
    }
  },
  created() {
    let vm = this;
    let diyOption = {
      down: {
        inOffset() {
          vm.downLoadType = 1;
        },
        outOffset() {
          vm.downLoadType = 2;
        },
        onMoving(mescroll, rate, downHight) {
          vm.downHight = downHight;
          vm.downRate = rate;
        },
        showLoading(mescroll, downHight) {
          vm.downLoadType = 3;
          vm.downHight = downHight;
        },
        beforeEndDownScroll(mescroll) {
          vm.downLoadType = 4;
          return mescroll.optDown.beforeEndDelay;
        },
        endDownScroll() {
          vm.downLoadType = 4;
          vm.downHight = 0;
          vm.downResetTimer && clearTimeout(vm.downResetTimer);
          vm.downResetTimer = setTimeout(() => {
            if (vm.downLoadType === 4)
              vm.downLoadType = 0;
          }, 300);
        },
        callback: function(mescroll) {
          vm.$emit("down", mescroll);
        }
      },
      up: {
        showLoading() {
          vm.upLoadType = 1;
        },
        showNoMore() {
          vm.upLoadType = 2;
        },
        hideUpScroll(mescroll) {
          vm.upLoadType = mescroll.optUp.hasNext ? 0 : 3;
        },
        empty: {
          onShow(isShow) {
            vm.isShowEmpty = isShow;
          }
        },
        toTop: {
          onShow(isShow) {
            vm.isShowToTop = isShow;
          }
        },
        callback: function(mescroll) {
          vm.$emit("up", mescroll);
          vm.setClientHeight();
        }
      }
    };
    let i18nType = uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.getType();
    let i18nOption = { type: i18nType };
    MeScroll.extend(i18nOption, vm.i18n);
    MeScroll.extend(i18nOption, uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.i18n);
    MeScroll.extend(diyOption, i18nOption[i18nType]);
    MeScroll.extend(diyOption, { down: uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.down, up: uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.up });
    let myOption = JSON.parse(JSON.stringify({ "down": vm.down, "up": vm.up }));
    MeScroll.extend(myOption, diyOption);
    vm.mescroll = new MeScroll(myOption);
    vm.mescroll.viewId = vm.viewId;
    vm.mescroll.i18n = i18nOption;
    vm.$emit("init", vm.mescroll);
    const sys = common_vendor.index.getSystemInfoSync();
    if (sys.windowTop)
      vm.windowTop = sys.windowTop;
    if (sys.windowBottom)
      vm.windowBottom = sys.windowBottom;
    if (sys.windowHeight)
      vm.windowHeight = sys.windowHeight;
    if (sys.statusBarHeight)
      vm.statusBarHeight = sys.statusBarHeight;
    vm.mescroll.setBodyHeight(sys.windowHeight);
    vm.mescroll.resetScrollTo((y, t) => {
      vm.scrollAnim = t !== 0;
      if (typeof y === "string") {
        vm.getClientInfo(function(rect) {
          let mescrollTop = rect.top;
          let selector;
          if (y.indexOf("#") == -1 && y.indexOf(".") == -1) {
            selector = "#" + y;
          } else {
            selector = y;
          }
          common_vendor.index.createSelectorQuery().select(selector).boundingClientRect(function(rect2) {
            if (rect2) {
              let curY2 = vm.mescroll.getScrollTop();
              let top = rect2.top - mescrollTop;
              top += curY2;
              if (!vm.isFixed)
                top -= vm.numTop;
              vm.scrollTop = curY2;
              vm.$nextTick(function() {
                vm.scrollTop = top;
              });
            } else {
              console.error(selector + " does not exist");
            }
          }).exec();
        });
        return;
      }
      let curY = vm.mescroll.getScrollTop();
      if (t === 0 || t === 300) {
        vm.scrollTop = curY;
        vm.$nextTick(function() {
          vm.scrollTop = y;
        });
      } else {
        vm.mescroll.getStep(curY, y, (step) => {
          vm.scrollTop = step;
        }, t);
      }
    });
    if (vm.up && vm.up.toTop && vm.up.toTop.safearea != null)
      ;
    else {
      vm.mescroll.optUp.toTop.safearea = vm.safearea;
    }
    common_vendor.index.$on("setMescrollGlobalOption", (options) => {
      if (!options)
        return;
      let i18nType2 = options.i18n ? options.i18n.type : null;
      if (i18nType2 && vm.mescroll.i18n.type != i18nType2) {
        vm.mescroll.i18n.type = i18nType2;
        uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.setType(i18nType2);
        MeScroll.extend(options, vm.mescroll.i18n[i18nType2]);
      }
      if (options.down) {
        let down = MeScroll.extend({}, options.down);
        vm.mescroll.optDown = MeScroll.extend(down, vm.mescroll.optDown);
      }
      if (options.up) {
        let up = MeScroll.extend({}, options.up);
        vm.mescroll.optUp = MeScroll.extend(up, vm.mescroll.optUp);
      }
    });
  },
  mounted() {
    this.setClientHeight();
  },
  destroyed() {
    common_vendor.index.$off("setMescrollGlobalOption");
  }
};
if (!Array) {
  const _easycom_mescroll_empty2 = common_vendor.resolveComponent("mescroll-empty");
  const _component_mescroll_top = common_vendor.resolveComponent("mescroll-top");
  (_easycom_mescroll_empty2 + _component_mescroll_top)();
}
const _easycom_mescroll_empty = () => "../mescroll-empty/mescroll-empty.js";
if (!Math) {
  _easycom_mescroll_empty();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.topbar && $data.statusBarHeight
  }, $props.topbar && $data.statusBarHeight ? {
    b: $props.topbar
  } : {}, {
    c: $data.mescroll.optDown.use
  }, $data.mescroll.optDown.use ? {
    d: $options.isDownLoading ? 1 : "",
    e: $data.mescroll.optDown.textColor,
    f: $options.downRotate,
    g: common_vendor.t$1($options.downText),
    h: $data.mescroll.optDown.bgColor,
    i: $data.mescroll.optDown.textColor
  } : {}, {
    j: $data.isShowEmpty
  }, $data.isShowEmpty ? {
    k: common_vendor.o($options.emptyClick),
    l: common_vendor.p({
      option: $data.mescroll.optUp.empty
    })
  } : {}, {
    m: $data.mescroll.optUp.use && !$options.isDownLoading && $data.upLoadType !== 3
  }, $data.mescroll.optUp.use && !$options.isDownLoading && $data.upLoadType !== 3 ? common_vendor.e({
    n: $data.mescroll.optUp.textColor,
    o: common_vendor.t$1($data.mescroll.optUp.textLoading),
    p: $data.upLoadType === 1,
    q: $data.upLoadType === 2
  }, $data.upLoadType === 2 ? {
    r: common_vendor.t$1($data.mescroll.optUp.textNoMore)
  } : {}, {
    s: $data.mescroll.optUp.bgColor,
    t: $data.mescroll.optUp.textColor
  }) : {}, {
    v: $options.translateY,
    w: $options.transition,
    x: _ctx.callProp,
    y: $props.safearea
  }, $props.safearea ? {} : {}, {
    z: _ctx.wxsProp,
    A: $data.viewId,
    B: $options.isFixed ? 1 : "",
    C: $options.scrollHeight,
    D: $options.padTop,
    E: $options.padBottom,
    F: $options.fixedTop,
    G: $options.fixedBottom,
    H: $data.scrollTop,
    I: $data.scrollAnim,
    J: common_vendor.o((...args) => $options.scroll && $options.scroll(...args)),
    K: $options.scrollable,
    L: common_vendor.o($options.toTopClick),
    M: common_vendor.o(($event) => $data.isShowToTop = $event),
    N: common_vendor.p({
      option: $data.mescroll.optUp.toTop,
      modelValue: $data.isShowToTop
    }),
    O: _ctx.renderBiz.propObserver,
    P: _ctx.wxsProp
  });
}
if (typeof block0 === "function")
  block0(_sfc_main);
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue"]]);
qq.createComponent(Component);
