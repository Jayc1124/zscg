var __renderjsModules={};

__renderjsModules["5a9dc23f"] = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => stdin_default
  });

  // src/uni_modules/mescroll-uni/components/mescroll-uni/wxs/renderjs.js
  var me = {};
  if (window && !window.$mescrollRenderInit) {
    window.$mescrollRenderInit = true;
    window.addEventListener("touchstart", function(e) {
      if (me.disabled())
        return;
      me.startPoint = me.getPoint(e);
    }, { passive: true });
    window.addEventListener("touchmove", function(e) {
      if (me.disabled())
        return;
      if (me.getScrollTop() > 0)
        return;
      var curPoint = me.getPoint(e);
      var moveY = curPoint.y - me.startPoint.y;
      if (moveY > 0) {
        if (!me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling && me.isUpBoth)) {
          var el = e.target;
          var isMescrollTouch = false;
          while (el && el.tagName && el.tagName !== "UNI-PAGE-BODY" && el.tagName != "BODY") {
            var cls = el.classList;
            if (cls && cls.contains("mescroll-render-touch")) {
              isMescrollTouch = true;
              break;
            }
            el = el.parentNode;
          }
          if (isMescrollTouch && e.cancelable && !e.defaultPrevented)
            e.preventDefault();
        }
      }
    }, { passive: false });
  }
  me.getScrollTop = function() {
    return me.scrollTop || 0;
  };
  me.disabled = function() {
    return !me.optDown || !me.optDown.use || me.optDown.native;
  };
  me.getPoint = function(e) {
    if (!e) {
      return { x: 0, y: 0 };
    }
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].pageX, y: e.touches[0].pageY };
    } else if (e.changedTouches && e.changedTouches[0]) {
      return { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
    } else {
      return { x: e.clientX, y: e.clientY };
    }
  };
  function propObserver(wxsProp) {
    me.optDown = wxsProp.optDown;
    me.scrollTop = wxsProp.scrollTop;
    me.isDownScrolling = wxsProp.isDownScrolling;
    me.isUpScrolling = wxsProp.isUpScrolling;
    me.isUpBoth = wxsProp.isUpBoth;
  }
  var renderBiz = {
    data() {
      return {
        propObserver
      };
    }
  };
  var renderjs_default = renderBiz;

  // <stdin>
  var stdin_default = {
    mixins: [renderjs_default]
  };
  return __toCommonJS(stdin_exports);
})();
