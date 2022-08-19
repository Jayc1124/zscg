"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // vue-ns:vue
  var require_vue = __commonJS({
    "vue-ns:vue"(exports, module) {
      module.exports = Vue;
    }
  });

  // pinia-ns:pinia
  var require_pinia = __commonJS({
    "pinia-ns:pinia"(exports, module) {
      module.exports = uni.Pinia;
    }
  });

  // dist/dev/.nvue/tm-divider.js
  var import_vue = __toESM(require_vue());

  // dist/dev/.nvue/plugin-vue_export-helper.js
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val2] of props) {
      target[key] = val2;
    }
    return target;
  };

  // dist/dev/.nvue/tm-divider.js
  var import_pinia = __toESM(require_pinia());
  var __defProp2 = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp2.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var _a;
  var _b;
  Object.freeze({});
  Object.freeze([]);
  var isString = (val2) => typeof val2 === "string";
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var ON_LOAD = "onLoad";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = toTypeString(v).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  function requireNativePlugin(name2) {
    return weex.requireModule(name2);
  }
  function resolveEasycom(component, easycom) {
    return isString(component) ? easycom : component;
  }
  var createHook = (lifecycle) => (hook, target = (0, import_vue.getCurrentInstance)()) => {
    !import_vue.isInSSRComponentSetup && (0, import_vue.injectHook)(lifecycle, hook, target);
  };
  var onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  var colortool = {
    rgbaToHsla(scolor) {
      let { r, g, b, a } = scolor;
      r = r / 255;
      g = g / 255;
      b = b / 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var l = (min + max) / 2;
      var difference = max - min;
      var h2 = 0, s = 0;
      if (max == min) {
        h2 = 0;
        s = 0;
      } else {
        s = l > 0.5 ? difference / (2 - max - min) : difference / (max + min);
        switch (max) {
          case r:
            h2 = (g - b) / difference + (g < b ? 6 : 0);
            break;
          case g:
            h2 = 2 + (b - r) / difference;
            break;
          case b:
            h2 = 4 + (r - g) / difference;
            break;
        }
        h2 = Math.round(h2 * 60);
      }
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      return { h: h2, s, l, a };
    },
    hslaToRgba(scolor) {
      let { h: h2, s, l, a } = scolor;
      h2 = h2 / 360;
      s = s / 100;
      l = l / 100;
      var rgb = [];
      if (s == 0) {
        rgb = [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255)];
      } else {
        var q = l >= 0.5 ? l + s - l * s : l * (1 + s);
        var p = 2 * l - q;
        rgb[0] = h2 + 1 / 3;
        rgb[1] = h2;
        rgb[2] = h2 - 1 / 3;
        for (var i = 0; i < rgb.length; i++) {
          var tc = rgb[i];
          if (tc < 0) {
            tc = tc + 1;
          } else if (tc > 1) {
            tc = tc - 1;
          }
          switch (true) {
            case tc < 1 / 6:
              tc = p + (q - p) * 6 * tc;
              break;
            case (1 / 6 <= tc && tc < 0.5):
              tc = q;
              break;
            case (0.5 <= tc && tc < 2 / 3):
              tc = p + (q - p) * (4 - 6 * tc);
              break;
            default:
              tc = p;
              break;
          }
          rgb[i] = Math.round(tc * 255);
        }
      }
      return { r: rgb[0], g: rgb[1], b: rgb[2], a };
    },
    cssToRgba: function(sColor) {
      if (!sColor) {
        return { r: 0, g: 0, b: 0, a: 0 };
      }
      let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      sColor = sColor.toLowerCase();
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          let sColorNew = "#";
          for (let i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return {
          r: sColorChange[0],
          g: sColorChange[1],
          b: sColorChange[2],
          a: 1
        };
      } else if (/^(rgb|RGB|rgba|RGBA)/.test(sColor)) {
        let arr = sColor.replace(/(?:\(|\)|rgb|RGB|RGBA|rgba)*/g, "").split(",");
        let p = arr.map((val2) => Number(val2));
        if (p.length < 3) {
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          };
        }
        if (p.length == 3) {
          p.push(1);
        }
        return {
          r: p[0],
          g: p[1],
          b: p[2],
          a: p[3]
        };
      } else {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        };
      }
    },
    rgbaToHsva: function(rgba2) {
      if (!rgba2)
        return {
          h: 0,
          s: 1,
          v: 1,
          a: 1
        };
      const r = rgba2.r / 255;
      const g = rgba2.g / 255;
      const b = rgba2.b / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h2 = 0;
      if (max !== min) {
        if (max === r) {
          h2 = 60 * (0 + (g - b) / (max - min));
        } else if (max === g) {
          h2 = 60 * (2 + (b - r) / (max - min));
        } else if (max === b) {
          h2 = 60 * (4 + (r - g) / (max - min));
        }
      }
      if (h2 < 0)
        h2 = h2 + 360;
      const s = max === 0 ? 0 : (max - min) / max;
      const hsv = [h2, s, max];
      return {
        h: hsv[0],
        s: hsv[1],
        v: hsv[2],
        a: rgba2.a
      };
    },
    hsvaToRgba: function(sColor) {
      var { h: h2, s, v, a } = sColor;
      var r = 0;
      var g = 0;
      var b = 0;
      var i;
      var f;
      var p;
      var q;
      var t;
      i = Math.floor(h2 * 6);
      f = h2 * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
      return { r, g, b, a };
    },
    rgbaToCss: function(sColor) {
      return `rgba(${sColor.r},${sColor.g},${sColor.b},${sColor.a})`;
    }
  };
  var cssDirection = /* @__PURE__ */ ((cssDirection2) => {
    cssDirection2["left"] = "left";
    cssDirection2["right"] = "right";
    cssDirection2["bottom"] = "bottom";
    cssDirection2["top"] = "top";
    cssDirection2["leftright"] = "x";
    cssDirection2["topbottom"] = "y";
    cssDirection2["topleft"] = "top-left";
    cssDirection2["topright"] = "top-right";
    cssDirection2["bottomleft"] = "bottom-left";
    cssDirection2["bottomright"] = "bottom-right";
    cssDirection2["all"] = "all";
    return cssDirection2;
  })(cssDirection || {});
  var linearDirection = /* @__PURE__ */ ((linearDirection2) => {
    linearDirection2["left"] = "to left";
    linearDirection2["right"] = "to right";
    linearDirection2["top"] = "to top";
    linearDirection2["bottom"] = "to bottom";
    linearDirection2["none"] = "";
    return linearDirection2;
  })(linearDirection || {});
  var linearDeep = /* @__PURE__ */ ((linearDeep2) => {
    linearDeep2["light"] = "light";
    linearDeep2["dark"] = "dark";
    linearDeep2["accent"] = "accent";
    return linearDeep2;
  })(linearDeep || {});
  var borderStyle = /* @__PURE__ */ ((borderStyle2) => {
    borderStyle2["solid"] = "solid";
    borderStyle2["dashed"] = "dashed";
    borderStyle2["dotted"] = "dotted";
    return borderStyle2;
  })(borderStyle || {});
  var theme$1 = {};
  var colors = [];
  var colorObj = __spreadValues({
    red: "#ff2414",
    pink: "#ea2a6a",
    purple: "#9C27B0",
    "deep-purple": "#673AB7",
    indigo: "#3F51B5",
    blue: "#2196F3",
    "light-blue": "#03A9F4",
    cyan: "#00BCD4",
    teal: "#009688",
    green: "#4ec752",
    "light-green": "#8BC34A",
    lime: "#CDDC39",
    yellow: "#ffe814",
    amber: "#FFC107",
    orange: "#ffa114",
    "deep-orange": "#FF5722",
    brown: "#795548",
    "blue-grey": "#607D8B",
    grey: "#9E9E9E",
    black: "#000000",
    white: "#FFFFFF",
    primary: "#3B5CF0",
    "grey-5": "#fafafa",
    "grey-4": "#f5f5f5",
    "grey-3": "#eeeeee",
    "grey-2": "#e0e0e0",
    "grey-1": "#bdbdbd",
    "grey-darken-1": "#757575",
    "grey-darken-2": "#616161",
    "grey-darken-3": "#424242",
    "grey-darken-4": "#212121",
    "grey-darken-5": "#131313",
    "grey-darken-6": "#0a0a0a"
  }, theme$1);
  for (const key in colorObj) {
    if (Object.prototype.hasOwnProperty.call(colorObj, key)) {
      const element = String(colorObj[key]);
      if (isCssColor(element)) {
        let rgba = colortool.cssToRgba(element);
        colors.push({
          name: key,
          value: element,
          hsva: colortool.rgbaToHsva(colortool.cssToRgba(element)),
          rgba: colortool.cssToRgba(element),
          hsla: colortool.rgbaToHsla(rgba),
          csscolor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        });
      }
    }
  }
  function isCssColor(color) {
    const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    const reg2 = /^(rgb|RGB|rgba|RGBA)/;
    return reg1.test(color) || reg2.test(color);
  }
  function getColor(colorName) {
    let isHand = colors.findIndex(function(el, index2) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      colorName = "primary";
      isHand = colors.findIndex(function(el, index2) {
        return el.name == colorName;
      });
      formatAppLog("error", "at tmui/tool/theme/theme.ts:80", "\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
    }
    return colors[isHand];
  }
  var themeColors = class {
    constructor(c = colors) {
      __publicField(this, "colors", []);
      this.colors = c;
    }
    add(colorName = "", value = "") {
      let isHand = this.colors.filter(function(el, index2) {
        return el.name == colorName;
      });
      if (isHand.length > 0) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:96", "\u5DF2\u5B58\u5728\u76F8\u5173\u989C\u8272\u540D\u79F0!!!");
        return this.colors;
      }
      if (!value) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:100", "\u989C\u8272\u503C\u5FC5\u586B!!!");
        return this.colors;
      }
      let rgba = colortool.cssToRgba(value);
      let color = {
        csscolor: "",
        hsva: { h: 0, s: 0, v: 0, a: 0 },
        hsla: { h: 0, s: 0, l: 0, a: 0 },
        rgba: { r: 0, g: 0, b: 0, a: 0 },
        name: colorName,
        value
      };
      color.csscolor = colortool.rgbaToCss(rgba);
      color.hsva = colortool.rgbaToHsva(rgba);
      color.rgba = rgba;
      color.hsla = colortool.rgbaToHsla(rgba);
      this.colors.push(color);
      return this.colors;
    }
    del(colorName) {
      let isHand = this.colors.findIndex(function(el, index2) {
        return el.name == colorName;
      });
      if (isHand == -1) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:123", "\u5220\u9664\u5931\u8D25\uFF0C\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
        return;
      }
      this.colors.splice(isHand, 1);
    }
    getColor(colorName) {
      let isHand = this.colors.findIndex(function(el, index2) {
        return el.name == colorName;
      });
      if (isHand == -1) {
        colorName = "primary";
        isHand = this.colors.findIndex(function(el, index2) {
          return el.name == colorName;
        });
        formatAppLog("error", "at tmui/tool/theme/theme.ts:137", "\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
      }
      return this.colors[isHand];
    }
    getTheme(config = { colorname: "primary", dark: false }) {
      var _a2;
      if (!config["colorname"]) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:145", "\u989C\u8272\u540D\u79F0\u5FC5\u586B");
        config.colorname = "primary";
      }
      let index2 = this.colors.findIndex((el) => el.name == config.colorname);
      if (index2 == -1) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:150", "\u4E3B\u9898\u4E0D\u5B58\u5728\uFF0C\u9ED8\u8BA4\u4E3Aprimary");
        config.colorname = "primary";
      }
      let isBlack = false;
      let isWhite = false;
      let isBlackAndWhite = false;
      let isGrey = false;
      let nowColor = __spreadValues({}, this.colors[index2]);
      config.borderWidth = isNaN(parseInt(String(config["borderWidth"]))) ? 0 : config["borderWidth"];
      config.borderStyle = config["borderStyle"] ? config["borderStyle"] : "solid";
      config.borderDirection = config["borderDirection"] || cssDirection.all;
      config.linearDirection = config["linearDirection"] || linearDirection.none;
      config.linearDeep = config["linearDeep"] || linearDeep.light;
      config.shadow = isNaN(parseInt(String(config["shadow"]))) ? 6 : config["shadow"];
      config.round = isNaN(parseInt(String(config["round"]))) ? 4 : config["round"];
      config.opaticy = isNaN(parseInt(String(config["opaticy"]))) ? 1 : config["opaticy"];
      config.outlined = typeof config["outlined"] == "boolean" ? config["outlined"] : false;
      config.text = typeof config["text"] == "boolean" ? config["text"] : false;
      config.blur = typeof config["blur"] == "boolean" ? config["blur"] : false;
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
        isBlack = true;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
        isWhite = true;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l < 100) {
        isGrey = true;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        isBlackAndWhite = true;
      }
      let css = {};
      css.color = nowColor.value;
      css.config = __spreadValues({}, config);
      css.isBlackAndWhite = isBlackAndWhite;
      css.gradientColor = [];
      css.colorname = config.colorname;
      let borderhsl = __spreadValues({}, nowColor.hsla);
      css.borderCss = {};
      let bghsl = __spreadValues({}, nowColor.hsla);
      if (config.dark) {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          bghsl.l = 40;
        }
      }
      if (config.blur) {
        bghsl.a = 0.85;
      }
      css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadValues({}, bghsl)));
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config.dark) {
        css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, bghsl), { l: 8 })));
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config.dark && nowColor.hsla.l == 100) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 90 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config.dark && nowColor.hsla.l == 0) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
      }
      css.backgroundColorCss = { "background-color": css.backgroundColor };
      let txcolor = __spreadValues({}, nowColor.hsla);
      if (config.dark) {
        txcolor.l = 95;
      } else {
        if (((_a2 = nowColor.hsla) == null ? void 0 : _a2.l) <= 65) {
          txcolor.l = 95;
        } else {
          if (isGrey) {
            txcolor.l = 10;
          } else {
            txcolor.l = 20;
          }
        }
      }
      if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
        txcolor.l = 20;
      }
      if (config.outlined) {
        txcolor.l = 50;
        if (config.dark) {
          txcolor.l = 55;
        } else {
          if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        if ((isBlack || isWhite) && config.dark) {
          txcolor.l = 100;
        }
        config.borderWidth = config["borderWidth"] || 2;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 0, a: 0 };
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_bgcss;
        css.backgroundColorCss = { "background-color": o_bgcss };
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
        css.border = css.textColor;
      }
      if (config.text) {
        txcolor.l = 90;
        if (isGrey) {
          txcolor.l = 15;
        } else {
          txcolor.l = 55;
          if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        if (config.dark) {
          txcolor.l = 55;
        }
        if (isBlack) {
          txcolor.l = 90;
        }
        if (isWhite) {
          txcolor.l = 15;
        }
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config.dark) {
          txcolor.l = 90;
        }
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
        css.border = css.textColor;
        let o_now_bgColor = nowColor.csscolor;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 96, a: nowColor.hsla.a };
        if (config.dark) {
          if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            n_hsl.l = 12;
            n_hsl.s = 35;
          } else {
            n_hsl.l = 12;
            n_hsl.s = 0;
          }
        }
        if (config.blur) {
          n_hsl.a = 0.85;
        }
        o_now_bgColor = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_now_bgColor;
        css.backgroundColorCss = { "background-color": o_now_bgColor };
      }
      if (config.shadow) {
        let n_hsl = { h: nowColor.hsla.h, s: 100, l: 50, a: 0.2 };
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          n_hsl = { h: 0, s: 0, l: 20, a: 0.07 };
        }
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.shadowColor = {
          boxShadow: `0rpx ${config.shadow * 2.5}rpx ${config.shadow * 6}rpx ${o_bgcss}`
        };
      }
      if (config.linearDirection) {
        let liner_color_1 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let liner_color_2 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let dir_str = linearDirection[config.linearDirection];
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
          if (config.linearDeep == "light") {
            liner_color_1.l = 80;
            liner_color_2.l = 20;
          } else {
            liner_color_1.l = 50;
            liner_color_2.l = 40;
          }
        } else if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
          if (config.linearDeep == "light") {
            liner_color_1.l = 40;
            liner_color_2.l = 10;
          } else {
            liner_color_1.l = 30;
            liner_color_2.l = 0;
          }
        } else {
          liner_color_2.h = nowColor.hsla.h;
          liner_color_2.s = nowColor.hsla.s;
          liner_color_1.h = nowColor.hsla.h;
          liner_color_1.s = nowColor.hsla.s;
          if (config.linearDeep == "light") {
            liner_color_1.l = 70;
            liner_color_1.s = 95;
            liner_color_1.h -= 5;
            liner_color_2.l = 45;
            liner_color_2.s = 95;
            liner_color_2.h += 5;
          } else if (config.linearDeep == "dark") {
            liner_color_1.l = 70;
            liner_color_1.s = 50;
            liner_color_2.l = 45;
            liner_color_2.s = 100;
          } else if (config.linearDeep == "accent") {
            liner_color_1.h -= 0;
            liner_color_1.s = 80;
            liner_color_1.l = 55;
            liner_color_2.l = 65;
            liner_color_2.h -= 35;
            liner_color_2.s = 80;
          }
        }
        if (config.dark) {
          liner_color_1.l = 40;
          liner_color_2.l = 40;
          txcolor.l = 90;
        }
        let color_t_1 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_1));
        let color_t_2 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_2));
        if (!config.text && !config.outlined) {
          css.backgroundColorCss = { "background-image": `linear-gradient(${dir_str},${color_t_1},${color_t_2})` };
          let newBgcolor = {
            h: (liner_color_1.h + liner_color_2.h) / 2,
            s: (liner_color_1.s + liner_color_2.s) / 2,
            l: (liner_color_1.l + liner_color_2.l) / 2,
            a: (liner_color_1.a + liner_color_2.a) / 2
          };
          if (!config.dark) {
            if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
              txcolor.l = 20;
            }
          }
          css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(newBgcolor));
          css.gradientColor = [color_t_1, color_t_2];
        }
      }
      if (config.dark == true) {
        css.cardcolor = "rgba(26, 26,26, 1.0)";
        css.inputcolor = "rgba(31, 31,31, 1.0)";
        css.bodycolor = "rgba(5,5,5, 1.0)";
        css.disablecolor = "rgba(30, 30, 30, 1.0)";
        css.textDisableColor = "rgba(100, 100, 100, 1.0)";
      }
      css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
      if (config.dark) {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l + 10 })));
        }
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 12 })));
        }
      } else {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l - 10 })));
        }
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 90 })));
        }
      }
      if (config.borderDirection == "all") {
        css.borderCss[`border`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "x" || config.borderDirection == "leftright") {
        css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "y" || config.borderDirection == "topbottom") {
        css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "bottomleft") {
        css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "bottomright") {
        css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "topleft") {
        css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else if (config.borderDirection == "topright") {
        css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
        css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      } else {
        let str = "-" + config.borderDirection;
        css.borderCss[`border${str}`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      }
      return css;
    }
  };
  var theme = {
    isCssColor,
    themeColors,
    getColor
  };
  var custom_props = {
    _style: {
      type: [Array, String, Object],
      default: () => []
    },
    _class: {
      type: [Array, String],
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    followTheme: {
      type: [Boolean, String],
      default: false
    },
    dark: {
      type: [Boolean, String],
      default: false
    },
    followDark: {
      type: [Boolean, String],
      default: true
    },
    round: {
      type: [Number],
      default: 0
    },
    shadow: {
      type: [Number],
      default: 0
    },
    outlined: {
      type: [Boolean],
      default: false
    },
    border: {
      type: [Number],
      default: 0
    },
    borderStyle: {
      type: [String],
      default: borderStyle.solid,
      validator: (value) => {
        let mp = ["dashed", "dotted", "solid"];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:78", "\u8FB9\u7EBF\u7C7B\u578B\u53EA\u80FD\u4E3AborderStyle\u4E2D\u7684\u4E00\u79CD\u3002");
        }
        return mp.includes(value);
      }
    },
    borderDirection: {
      type: String,
      default: cssDirection.all,
      validator: (value) => {
        let mp = ["all", "bottom", "bottomleft", "bottomright", "left", "leftright", "right", "right", "top", "topbottom", "topleft", "topright", "x", "y"];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:92", "\u8FB9\u7EBF\u65B9\u5411\u683C\u5F0F\u53EA\u80FD\u4E3AcssDirection\u4E2D\u7684\u4E00\u79CD\u3002");
        }
        return mp.includes(value);
      }
    },
    text: {
      type: [Boolean, String],
      default: false
    },
    transprent: {
      type: [Boolean, String],
      default: true
    },
    linear: {
      type: [String],
      default: linearDirection.none,
      validator: (value) => {
        let mp = ["left", "right", "bottom", "top", ""];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:120", "\u6E10\u53D8\u65B9\u5411\u53EA\u80FD\u4E3A,left:\u53F3->\u5DE6\uFF0Cright:\u5DE6->\u53F3\u3002top:\u4E0B->\u4E0A\uFF0Cbottom:\u4E0A->\u4E0B,\u4E2D\u7684\u4E00\u79CD\u3002");
        }
        return mp.includes(value);
      }
    },
    linearDeep: {
      type: [String],
      default: linearDeep.light,
      validator: (value) => {
        let mp = ["accent", "dark", "light"];
        if (!mp.includes(value)) {
          formatAppLog("error", "at tmui/tool/lib/minxs.ts:132", "\u6E10\u53D8\u65B9\u5411\u53EA\u80FD\u4E3Alight,dark,accent\u4E2D\u7684\u4E00\u79CD\u3002");
        }
        return mp.includes(value);
      }
    },
    isDisabledRoundAndriod: {
      type: [Boolean, String],
      default: false
    },
    blur: {
      type: Boolean,
      default: false
    }
  };
  var computedDark = (props, tmcfg) => {
    const followDark = props.followDark;
    const dark2 = props.dark;
    const glboalDark = tmcfg.dark;
    if (followDark) {
      return glboalDark;
    }
    return dark2;
  };
  var computedClass = (props) => {
    const _class = props._class;
    if (typeof _class == "string") {
      return _class;
    }
    if (Array.isArray(_class)) {
      return _class.join(" ");
    }
    return "";
  };
  var computedStyle = (props) => {
    const _style = props._style;
    if (typeof _style == "string") {
      let p = _style.split(";");
      let k = p.map((el) => {
        el = el.replace(";", "");
        let node = {};
        let idx = el.split(":");
        node[idx[0]] = idx[1];
        return node;
      });
      let kl = {};
      k.forEach((el) => {
        kl = __spreadValues(__spreadValues({}, kl), el);
      });
      return kl;
    }
    if (typeof _style == "object" && !Array.isArray(_style)) {
      return _style;
    }
    if (typeof _style == "object" && Array.isArray(_style)) {
      let kl = {};
      _style.forEach((el) => {
        kl = __spreadValues(__spreadValues({}, kl), el);
      });
      return kl;
    }
    return {};
  };
  var computedTheme = (props, dark2, store) => {
    const color = props.color;
    const border = props.border;
    const shadow = props.shadow;
    const round = props.round;
    const outlined = props.outlined;
    const text = props.text;
    const borderStyle2 = props.borderStyle;
    const borderDirection = props.borderDirection;
    const linear = props.linear;
    const linearDeep2 = props.linearDeep;
    const blur = props.blur;
    if (theme.isCssColor(color)) {
      formatAppLog("error", "at tmui/tool/lib/minxs.ts:213", "\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u4E0A\u7684\u989C\u8272\u503C\uFF0C\u8BF7\u5728theme/theme.js\u4E2D\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684\u989C\u8272\u503C\u4E3A\u4E3B\u9898\u3002\u5F53\u524D\u5DF2\u5207\u6362\u4E3Aprimary\u4E3B\u9898\u3002");
    }
    let defaultColorName = color || "primary";
    if ((props == null ? void 0 : props.followTheme) == true && store.color) {
      defaultColorName = store.color;
    }
    var theme$12 = new theme.themeColors(store.colorList);
    let c = theme$12.getTheme({
      colorname: defaultColorName,
      dark: dark2,
      borderWidth: border,
      shadow: parseInt(String(shadow)),
      round: parseInt(String(round)),
      outlined: outlined ? true : false,
      text: text ? true : false,
      borderStyle: borderStyle2,
      borderDirection,
      linearDirection: linear,
      linearDeep: linearDeep2,
      blur
    });
    return c;
  };
  function setCookie(key, data) {
    try {
      uni.setStorageSync(key, data);
      return true;
    } catch (e) {
      return false;
    }
  }
  function getCookie(key) {
    try {
      const value = uni.getStorageSync(key);
      try {
        let val2 = JSON.parse(value);
        return val2;
      } catch (e) {
        return value;
      }
    } catch (e) {
      return void 0;
    }
  }
  function getUid(length = 12) {
    return Number(Number(Math.random().toString().substr(3, length) + Date.now()).toString(8));
  }
  getUid(1);
  var pdefault_cookies_color = getCookie("setTmVuetifyColor") || "";
  var pdefault_cookies_black = getCookie("setTmVuetifyBlack");
  var pdefault_cookies_local = getCookie("setTmVuetifyLocal") || "zh-Hans";
  var pdefault_cookies_colorArrayList = getCookie("colorArrayList");
  var dark = typeof pdefault_cookies_black === "boolean" ? pdefault_cookies_black : false;
  var themeObj = new theme.themeColors();
  if (pdefault_cookies_colorArrayList) {
    const result2 = pdefault_cookies_colorArrayList.filter((item) => themeObj.colors.every((subItem) => subItem.name !== item.name));
    themeObj = new theme.themeColors([...themeObj.colors, ...result2]);
  }
  var colorArray = themeObj.colors;
  var os = (_b = (_a = uni.getSystemInfoSync()) == null ? void 0 : _a.osName) != null ? _b : "";
  setCookie("colorArrayList", colorArray);
  var useTmpiniaStore = (0, import_pinia.defineStore)("tmpinia", {
    state: () => {
      return {
        tmStore: {
          color: pdefault_cookies_color,
          dark,
          tmVueTifly_pages: "",
          tmVueTifly_pagesIndex: "",
          os,
          wxshareConfig_miniMp: {
            title: "",
            desc: "",
            imageUrl: "",
            path: "",
            copyLink: "",
            query: {}
          },
          colorList: colorArray,
          local: pdefault_cookies_local
        }
      };
    },
    actions: {
      setPageNow(url) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          tmVueTifly_pages: url
        });
      },
      setPageNowIndex(index2) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          tmVueTifly_pagesIndex: index2
        });
      },
      setTmVuetifyDark(dark2) {
        dark2 = typeof dark2 !== "boolean" ? false : dark2;
        setCookie("setTmVuetifyBlack", dark2);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          dark: dark2
        });
      },
      setWxShare(cfg) {
        let pcf = cfg || {};
        if (typeof pcf !== "object" || Array.isArray(cfg))
          pcf = {};
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          wxshareConfig_miniMp: __spreadValues(__spreadValues({}, this.tmStore.wxshareConfig_miniMp), pcf)
        });
      },
      setTmVuetifyTheme(color) {
        let defaultColorName = color;
        if (!defaultColorName || defaultColorName == "" || theme.isCssColor(defaultColorName)) {
          defaultColorName = "";
        }
        setCookie("setTmVuetifyColor", defaultColorName);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), { color: defaultColorName });
      },
      setTmVuetifyAddTheme(colorName, color, isSet = true) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          colorList: themeObj.add(colorName, color)
        });
        setCookie("colorArrayList", this.tmStore.colorList);
        if (isSet) {
          this.setTmVuetifyTheme(colorName);
        }
      },
      setTmLocal(language2) {
        language2 = language2 || "zh-Hans";
        setCookie("setTmVuetifyLocal", language2);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          local: language2
        });
      }
    }
  });
  var _sfc_main$6 = /* @__PURE__ */ (0, import_vue.defineComponent)({
    __name: "tm-sheet",
    props: __spreadProps(__spreadValues({}, custom_props), {
      parenClass: {
        type: String,
        default: ""
      },
      contStyle: {
        type: String,
        default: ""
      },
      height: {
        type: [Number],
        default: 0
      },
      width: {
        type: [Number],
        default: 0
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Number, String],
        default: 0
      },
      margin: {
        type: Array,
        default: () => [32, 12]
      },
      padding: {
        type: Array,
        default: () => [24, 24]
      },
      unit: {
        type: String,
        default: "rpx"
      },
      hoverClass: {
        type: String,
        default: "none"
      },
      darkBgColor: {
        type: String,
        default: ""
      },
      noLevel: {
        type: Boolean,
        default: false
      },
      blur: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["click", "longpress", "touchend", "touchstart", "touchcancel", "mousedown", "mouseup", "mouseleave"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const store = useTmpiniaStore();
      (_b2 = (_a2 = (0, import_vue.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const parenClass_p = (0, import_vue.computed)(() => props.parenClass);
      const contStyle_p = (0, import_vue.computed)(() => props.contStyle);
      const _transprent = (0, import_vue.computed)(() => props.transprent);
      const tmcfg = (0, import_vue.computed)(() => store.tmStore);
      const _blur = (0, import_vue.computed)(() => {
        if (tmcfg.value.os == "android" && _isNvue.value) {
          return false;
        }
        return props.blur;
      });
      const customCSSStyle = (0, import_vue.computed)(() => computedStyle(props));
      const customClass = (0, import_vue.computed)(() => computedClass(props));
      const isDark = (0, import_vue.computed)(() => computedDark(props, tmcfg.value));
      const tmcomputed = (0, import_vue.computed)(() => {
        let text = props.text;
        if (_blur.value && tmcfg.value.os == "ios" && _isNvue.value) {
          text = true;
        }
        return computedTheme(__spreadProps(__spreadValues({}, props), { blur: _blur.value, text }), isDark.value, tmcfg.value);
      });
      const _isNvue = (0, import_vue.ref)(false);
      _isNvue.value = true;
      const _margin = (0, import_vue.computed)(() => props.margin);
      const _padding = (0, import_vue.computed)(() => props.padding);
      const _width = (0, import_vue.computed)(() => props.width);
      const _height = (0, import_vue.computed)(() => props.height);
      const _noLevel = (0, import_vue.computed)(() => props.noLevel);
      const _blue_sheet = (0, import_vue.ref)(true);
      const _blurEffect = (0, import_vue.computed)(() => {
        if (props.blur === true && isDark.value)
          return "dark";
        if (props.blur === true && !isDark.value)
          return "extralight";
        return "none";
      });
      (0, import_vue.watch)(() => isDark.value, () => {
        if (store.tmStore.os == "ios" && _blur.value === true) {
          _blue_sheet.value = false;
          (0, import_vue.nextTick)(() => _blue_sheet.value = true);
        }
      });
      const _bgcolor = (0, import_vue.computed)(() => {
        var _a3;
        if (_transprent.value === true)
          return `background-color:rgba(255,255,255,0);`;
        if (props.darkBgColor !== "" && isDark.value === true) {
          return `background-color:${props.darkBgColor};`;
        }
        if (((_a3 = tmcomputed.value.gradientColor) == null ? void 0 : _a3.length) === 2) {
          return tmcomputed.value.backgroundColorCss;
        }
        if (_noLevel.value && tmcomputed.value.isBlackAndWhite === true && isDark.value === true) {
          return `background-color: ${tmcomputed.value.inputcolor}`;
        }
        return `background-color: ${tmcomputed.value.backgroundColor}`;
      });
      const isLongPress = (0, import_vue.ref)(false);
      function longpress(e) {
        isLongPress.value = true;
        emits("longpress", e);
      }
      function touchstart(e) {
        isLongPress.value = true;
        emits("touchstart", e);
      }
      function touchend(e) {
        isLongPress.value = false;
        emits("touchend", e);
      }
      function touchcancel(e) {
        isLongPress.value = false;
        emits("touchcancel", e);
      }
      function mousedown(e) {
        isLongPress.value = true;
        emits("mousedown", e);
      }
      function mouseup(e) {
        isLongPress.value = false;
        emits("mouseup", e);
      }
      function mouseleave(e) {
        isLongPress.value = false;
        emits("mouseleave", e);
      }
      (0, import_vue.computed)(() => {
        let w = parseFloat(String(_width.value)) - parseFloat(String(props.padding[0]));
        w = w - parseFloat(String(props.border)) * 2;
        return w;
      });
      (0, import_vue.computed)(() => {
        let h2 = parseFloat(String(_height.value)) - parseFloat(String(props.padding[1]));
        h2 = h2 - parseFloat(String(props.border)) * 2;
        return h2;
      });
      let textColor = (0, import_vue.computed)(() => {
        return tmcomputed.value.textColor;
      });
      (0, import_vue.provide)("appTextColor", textColor);
      return (_ctx, _cache) => {
        return _blue_sheet.value ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
          key: 0,
          renderWhole: true,
          blurEffect: (0, import_vue.unref)(_blurEffect),
          onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
          onLongpress: longpress,
          onTouchend: touchend,
          onTouchstart: touchstart,
          onTouchcancel: touchcancel,
          onMousedown: mousedown,
          onMouseup: mouseup,
          onMouseleave: mouseleave,
          class: (0, import_vue.normalizeClass)([
            "flex flex-col noNvueBorder",
            (0, import_vue.unref)(parenClass_p),
            `mx-${(0, import_vue.unref)(_margin)[0]}`,
            `my-${(0, import_vue.unref)(_margin)[1]}`,
            `px-${(0, import_vue.unref)(_padding)[0]}`,
            `py-${(0, import_vue.unref)(_padding)[1]}`,
            isLongPress.value ? props.hoverClass : "",
            props.hoverClass != "" && props.hoverClass != "none" ? "webpc" : "",
            !_ctx.isDisabledRoundAndriod ? `round-${props.round}` : ""
          ]),
          style: (0, import_vue.normalizeStyle)([
            (0, import_vue.unref)(_height) ? { height: (0, import_vue.unref)(_height) + (0, import_vue.unref)(_padding)[1] * 2 + props.unit } : "",
            (0, import_vue.unref)(_width) ? { width: (0, import_vue.unref)(_width) + (0, import_vue.unref)(_padding)[0] * 2 + props.unit } : "",
            (0, import_vue.unref)(tmcomputed).borderCss,
            (0, import_vue.unref)(_blur) && (0, import_vue.unref)(store).tmStore.os == "ios" && _isNvue.value === true ? "" : (0, import_vue.unref)(_bgcolor),
            !(0, import_vue.unref)(_transprent) && props.shadow > 0 ? (0, import_vue.unref)(tmcomputed).shadowColor : "",
            !(0, import_vue.unref)(_transprent) && (0, import_vue.unref)(_blur) ? { backdropFilter: "blur(6px)" } : "",
            (0, import_vue.unref)(customCSSStyle)
          ])
        }, [
          (0, import_vue.createElementVNode)("view", {
            renderWhole: true,
            class: (0, import_vue.normalizeClass)(["flex noNvueBorder flex-col flex-1", (0, import_vue.unref)(customClass)]),
            style: (0, import_vue.normalizeStyle)((0, import_vue.unref)(contStyle_p))
          }, [
            (0, import_vue.renderSlot)(_ctx.$slots, "default")
          ], 6)
        ], 46, ["blurEffect"])) : (0, import_vue.createCommentVNode)("v-if", true);
      };
    }
  });
  var __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-sheet/tm-sheet.vue"]]);
  var _sfc_main$5 = /* @__PURE__ */ (0, import_vue.defineComponent)({
    __name: "tm-text",
    props: __spreadProps(__spreadValues({}, custom_props), {
      label: {
        type: [String, Number],
        default: ""
      },
      fontSize: {
        type: [Number],
        default: 28
      },
      color: {
        type: String,
        default: ""
      },
      selectable: {
        type: [Boolean],
        default: false
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const store = useTmpiniaStore();
      const tmcfg = (0, import_vue.computed)(() => store.tmStore);
      const customCSSStyle = (0, import_vue.computed)(() => computedStyle(props));
      const customClass = (0, import_vue.computed)(() => computedClass(props));
      const isDark = (0, import_vue.computed)(() => computedDark(props, tmcfg.value));
      const _label = (0, import_vue.computed)(() => props.label);
      const _fontSize = (0, import_vue.computed)(() => Number(props.fontSize));
      const appTextColor = (0, import_vue.inject)("appTextColor", (0, import_vue.computed)(() => void 0));
      const textColor = (0, import_vue.computed)(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = theme.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = theme.getColor(props.color);
          return nowcolor.csscolor;
        }
        if (!appTextColor) {
          if (isDark)
            return "rgba(252, 252, 252, 1.0)";
          return "rgba(34, 34, 34, 1.0)";
        }
        if (appTextColor.value) {
          return appTextColor.value;
        }
        return "rgba(34, 34, 34, 1.0)";
      });
      return (_ctx, _cache) => {
        return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
          renderWhole: true,
          class: "flex text-view nvue",
          style: { "line-height": "0" }
        }, [
          (0, import_vue.createElementVNode)("u-text", {
            renderWhole: true,
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            selectable: __props.selectable,
            userSelect: __props.selectable,
            class: (0, import_vue.normalizeClass)([(0, import_vue.unref)(_fontSize) ? "" : "text-size-m", (0, import_vue.unref)(customClass)]),
            style: (0, import_vue.normalizeStyle)([
              {
                lineHeight: ((0, import_vue.unref)(_fontSize) ? (0, import_vue.unref)(_fontSize) * 1.3 : 42) + props.unit,
                color: (0, import_vue.unref)(textColor)
              },
              (0, import_vue.unref)(_fontSize) ? { fontSize: (0, import_vue.unref)(_fontSize) + props.unit } : "",
              (0, import_vue.unref)(customCSSStyle)
            ])
          }, (0, import_vue.toDisplayString)((0, import_vue.unref)(_label)), 15, ["selectable", "userSelect"])
        ]);
      };
    }
  });
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-text/tm-text.vue"]]);
  var id = "2660213";
  var name = "tmui";
  var font_family = "tmicon";
  var css_prefix_text = "tmicon-";
  var description = "";
  var glyphs = [
    {
      icon_id: "400994",
      name: "paypal",
      font_class: "paypal",
      unicode: "e8c8",
      unicode_decimal: 59592
    },
    {
      icon_id: "4936951",
      name: "google",
      font_class: "google",
      unicode: "e8c9",
      unicode_decimal: 59593
    },
    {
      icon_id: "5634565",
      name: "apple-pay",
      font_class: "apple-pay",
      unicode: "f166",
      unicode_decimal: 61798
    },
    {
      icon_id: "6808509",
      name: "Apple",
      font_class: "Apple",
      unicode: "edd8",
      unicode_decimal: 60888
    },
    {
      icon_id: "27365105",
      name: "google-pay",
      font_class: "google-pay",
      unicode: "ec04",
      unicode_decimal: 60420
    },
    {
      icon_id: "1039",
      name: "\u94B1\u888B",
      font_class: "qiandai",
      unicode: "e600",
      unicode_decimal: 58880
    },
    {
      icon_id: "1431",
      name: "\u5238",
      font_class: "quan",
      unicode: "e601",
      unicode_decimal: 58881
    },
    {
      icon_id: "780044",
      name: "\u7EA2\u5305",
      font_class: "hongbao",
      unicode: "e6da",
      unicode_decimal: 59098
    },
    {
      icon_id: "577373",
      name: "\u901A\u77E5-fill",
      font_class: "tongzhifill",
      unicode: "e758",
      unicode_decimal: 59224
    },
    {
      icon_id: "844648",
      name: "\u4EBA\u6C11\u5E013",
      font_class: "renminbi3",
      unicode: "e73e",
      unicode_decimal: 59198
    },
    {
      icon_id: "1240755",
      name: "\u6295\u7968",
      font_class: "toupiao",
      unicode: "e60e",
      unicode_decimal: 58894
    },
    {
      icon_id: "5117623",
      name: "\u7968\u5238-\u8272\u5757icon",
      font_class: "icon",
      unicode: "e658",
      unicode_decimal: 58968
    },
    {
      icon_id: "5178379",
      name: "\u8DB3\u7403",
      font_class: "svggeshi-",
      unicode: "e65d",
      unicode_decimal: 58973
    },
    {
      icon_id: "5387627",
      name: "\u7F8E\u5143",
      font_class: "meiyuan",
      unicode: "eb1a",
      unicode_decimal: 60186
    },
    {
      icon_id: "7516900",
      name: "\u6C7D\u8F66",
      font_class: "qiche",
      unicode: "e611",
      unicode_decimal: 58897
    },
    {
      icon_id: "8023415",
      name: "\u901A\u77E5",
      font_class: "tongzhi",
      unicode: "e612",
      unicode_decimal: 58898
    },
    {
      icon_id: "8575345",
      name: "\u4F1A\u5458",
      font_class: "huiyuan",
      unicode: "e62f",
      unicode_decimal: 58927
    },
    {
      icon_id: "9456772",
      name: "md-phone-portrait",
      font_class: "md-phone-portrait",
      unicode: "e6c2",
      unicode_decimal: 59074
    },
    {
      icon_id: "9456777",
      name: "md-planet",
      font_class: "md-planet",
      unicode: "e6c3",
      unicode_decimal: 59075
    },
    {
      icon_id: "9456779",
      name: "md-phone-landscape",
      font_class: "md-phone-landscape",
      unicode: "e6c4",
      unicode_decimal: 59076
    },
    {
      icon_id: "9456788",
      name: "md-power",
      font_class: "md-power",
      unicode: "e6c5",
      unicode_decimal: 59077
    },
    {
      icon_id: "9456798",
      name: "md-redo",
      font_class: "md-redo",
      unicode: "e6c6",
      unicode_decimal: 59078
    },
    {
      icon_id: "9456808",
      name: "md-rocket",
      font_class: "md-rocket",
      unicode: "e6c7",
      unicode_decimal: 59079
    },
    {
      icon_id: "9456819",
      name: "md-ribbon",
      font_class: "md-ribbon",
      unicode: "e6c8",
      unicode_decimal: 59080
    },
    {
      icon_id: "9456835",
      name: "md-undo",
      font_class: "md-undo",
      unicode: "e6cb",
      unicode_decimal: 59083
    },
    {
      icon_id: "9456837",
      name: "md-trending-down",
      font_class: "md-trending-down",
      unicode: "e6cc",
      unicode_decimal: 59084
    },
    {
      icon_id: "9456851",
      name: "md-trending-up",
      font_class: "md-trending-up",
      unicode: "e6cd",
      unicode_decimal: 59085
    },
    {
      icon_id: "9457020",
      name: "md-git-merge",
      font_class: "md-git-merge",
      unicode: "e6de",
      unicode_decimal: 59102
    },
    {
      icon_id: "9457071",
      name: "md-female",
      font_class: "md-female",
      unicode: "e6e2",
      unicode_decimal: 59106
    },
    {
      icon_id: "9457091",
      name: "md-male",
      font_class: "md-male",
      unicode: "e6e3",
      unicode_decimal: 59107
    },
    {
      icon_id: "9457108",
      name: "md-heart-dislike",
      font_class: "md-heart-dislike",
      unicode: "e6e4",
      unicode_decimal: 59108
    },
    {
      icon_id: "9457111",
      name: "md-heart",
      font_class: "md-heart1",
      unicode: "e6e7",
      unicode_decimal: 59111
    },
    {
      icon_id: "9457220",
      name: "ios-text",
      font_class: "ios-text",
      unicode: "e6f1",
      unicode_decimal: 59121
    },
    {
      icon_id: "9457232",
      name: "ios-rose",
      font_class: "ios-rose",
      unicode: "e6f2",
      unicode_decimal: 59122
    },
    {
      icon_id: "9457346",
      name: "logo-game-controller-b",
      font_class: "logo-game-controller-b",
      unicode: "e6fd",
      unicode_decimal: 59133
    },
    {
      icon_id: "9457416",
      name: "ios-beer",
      font_class: "ios-beer",
      unicode: "e707",
      unicode_decimal: 59143
    },
    {
      icon_id: "9457424",
      name: "ios-cafe",
      font_class: "ios-cafe",
      unicode: "e709",
      unicode_decimal: 59145
    },
    {
      icon_id: "9457440",
      name: "ios-chatbubbles",
      font_class: "ios-chatbubbles",
      unicode: "e70a",
      unicode_decimal: 59146
    },
    {
      icon_id: "9457465",
      name: "ios-color-palette",
      font_class: "ios-color-palette",
      unicode: "e70e",
      unicode_decimal: 59150
    },
    {
      icon_id: "9457485",
      name: "ios-filing",
      font_class: "ios-filing",
      unicode: "e712",
      unicode_decimal: 59154
    },
    {
      icon_id: "9457494",
      name: "ios-finger-print",
      font_class: "ios-finger-print",
      unicode: "e713",
      unicode_decimal: 59155
    },
    {
      icon_id: "9457501",
      name: "ios-hand",
      font_class: "ios-hand",
      unicode: "e716",
      unicode_decimal: 59158
    },
    {
      icon_id: "9457504",
      name: "ios-flower",
      font_class: "ios-flower",
      unicode: "e714",
      unicode_decimal: 59156
    },
    {
      icon_id: "9457529",
      name: "ios-ice-cream",
      font_class: "ios-ice-cream",
      unicode: "e719",
      unicode_decimal: 59161
    },
    {
      icon_id: "9457539",
      name: "ios-grid",
      font_class: "ios-grid",
      unicode: "e71c",
      unicode_decimal: 59164
    },
    {
      icon_id: "9457540",
      name: "ios-mail-open",
      font_class: "ios-mail-open1",
      unicode: "e71d",
      unicode_decimal: 59165
    },
    {
      icon_id: "9457543",
      name: "ios-key",
      font_class: "ios-key",
      unicode: "e71e",
      unicode_decimal: 59166
    },
    {
      icon_id: "9457545",
      name: "ios-man",
      font_class: "ios-man",
      unicode: "e71f",
      unicode_decimal: 59167
    },
    {
      icon_id: "12387153",
      name: "\u7F8E\u5143",
      font_class: "meiyuan1",
      unicode: "e90d",
      unicode_decimal: 59661
    },
    {
      icon_id: "13030084",
      name: "\u81EA\u5B9A\u4E49",
      font_class: "zidingyi",
      unicode: "e60d",
      unicode_decimal: 58893
    },
    {
      icon_id: "20587178",
      name: "\u5237\u65B0",
      font_class: "shuaxin",
      unicode: "e6ce",
      unicode_decimal: 59086
    },
    {
      icon_id: "21242934",
      name: "\u4F1A\u5458",
      font_class: "huiyuan1",
      unicode: "e646",
      unicode_decimal: 58950
    },
    {
      icon_id: "1250665",
      name: "\u5706",
      font_class: "yuan",
      unicode: "e657",
      unicode_decimal: 58967
    },
    {
      icon_id: "7137863",
      name: "ios-airplane",
      font_class: "ios-airplane",
      unicode: "e852",
      unicode_decimal: 59474
    },
    {
      icon_id: "7137864",
      name: "ios-woman",
      font_class: "ios-woman",
      unicode: "e859",
      unicode_decimal: 59481
    },
    {
      icon_id: "7137869",
      name: "ios-aperture",
      font_class: "ios-aperture",
      unicode: "e866",
      unicode_decimal: 59494
    },
    {
      icon_id: "7137873",
      name: "ios-alarm",
      font_class: "ios-alarm",
      unicode: "e868",
      unicode_decimal: 59496
    },
    {
      icon_id: "7137875",
      name: "ios-arrow-dropdown",
      font_class: "ios-arrow-dropdown",
      unicode: "e869",
      unicode_decimal: 59497
    },
    {
      icon_id: "7137879",
      name: "ios-arrow-dropleft-c",
      font_class: "ios-arrow-dropleft-c",
      unicode: "e876",
      unicode_decimal: 59510
    },
    {
      icon_id: "7137880",
      name: "ios-arrow-dropleft",
      font_class: "ios-arrow-dropleft",
      unicode: "e87c",
      unicode_decimal: 59516
    },
    {
      icon_id: "7137881",
      name: "ios-arrow-dropup",
      font_class: "ios-arrow-dropup",
      unicode: "e87f",
      unicode_decimal: 59519
    },
    {
      icon_id: "7137882",
      name: "ios-arrow-dropright-",
      font_class: "ios-arrow-dropright-",
      unicode: "e880",
      unicode_decimal: 59520
    },
    {
      icon_id: "7137883",
      name: "ios-arrow-dropdown-c",
      font_class: "ios-arrow-dropdown-c",
      unicode: "e886",
      unicode_decimal: 59526
    },
    {
      icon_id: "7137886",
      name: "ios-arrow-dropup-cir",
      font_class: "ios-arrow-dropup-cir",
      unicode: "e88d",
      unicode_decimal: 59533
    },
    {
      icon_id: "7137887",
      name: "ios-arrow-dropright",
      font_class: "ios-arrow-dropright",
      unicode: "e890",
      unicode_decimal: 59536
    },
    {
      icon_id: "7137892",
      name: "ios-attach",
      font_class: "ios-attach",
      unicode: "e893",
      unicode_decimal: 59539
    },
    {
      icon_id: "7137893",
      name: "ios-at",
      font_class: "ios-at",
      unicode: "e894",
      unicode_decimal: 59540
    },
    {
      icon_id: "7137901",
      name: "ios-bed",
      font_class: "ios-bed",
      unicode: "e895",
      unicode_decimal: 59541
    },
    {
      icon_id: "7137903",
      name: "ios-battery-full",
      font_class: "ios-battery-full",
      unicode: "e896",
      unicode_decimal: 59542
    },
    {
      icon_id: "7137906",
      name: "ios-bookmarks",
      font_class: "ios-bookmarks",
      unicode: "e897",
      unicode_decimal: 59543
    },
    {
      icon_id: "7137926",
      name: "ios-bluetooth",
      font_class: "ios-bluetooth",
      unicode: "e898",
      unicode_decimal: 59544
    },
    {
      icon_id: "7137930",
      name: "ios-cellular",
      font_class: "ios-cellular",
      unicode: "e899",
      unicode_decimal: 59545
    },
    {
      icon_id: "7137971",
      name: "ios-cut",
      font_class: "ios-cut",
      unicode: "e89a",
      unicode_decimal: 59546
    },
    {
      icon_id: "7138027",
      name: "ios-leaf",
      font_class: "ios-leaf",
      unicode: "e89b",
      unicode_decimal: 59547
    },
    {
      icon_id: "7138043",
      name: "ios-mic",
      font_class: "ios-mic",
      unicode: "e89c",
      unicode_decimal: 59548
    },
    {
      icon_id: "7138045",
      name: "ios-mail-open",
      font_class: "ios-mail-open",
      unicode: "e89d",
      unicode_decimal: 59549
    },
    {
      icon_id: "7138078",
      name: "ios-partly-sunny",
      font_class: "ios-partly-sunny",
      unicode: "e8a0",
      unicode_decimal: 59552
    },
    {
      icon_id: "7138095",
      name: "ios-radio-button-on",
      font_class: "ios-radio-button-on",
      unicode: "e8a1",
      unicode_decimal: 59553
    },
    {
      icon_id: "7138098",
      name: "ios-radio-button-off",
      font_class: "ios-radio-button-off",
      unicode: "e8a2",
      unicode_decimal: 59554
    },
    {
      icon_id: "7138105",
      name: "ios-remove",
      font_class: "ios-remove",
      unicode: "e8a3",
      unicode_decimal: 59555
    },
    {
      icon_id: "7138112",
      name: "ios-remove-circle-ou",
      font_class: "ios-remove-circle-ou",
      unicode: "e8a4",
      unicode_decimal: 59556
    },
    {
      icon_id: "7138113",
      name: "ios-remove-circle",
      font_class: "ios-remove-circle",
      unicode: "e8a5",
      unicode_decimal: 59557
    },
    {
      icon_id: "7138118",
      name: "ios-rocket",
      font_class: "ios-rocket",
      unicode: "e8a6",
      unicode_decimal: 59558
    },
    {
      icon_id: "7138122",
      name: "ios-ribbon",
      font_class: "ios-ribbon",
      unicode: "e8a7",
      unicode_decimal: 59559
    },
    {
      icon_id: "7138128",
      name: "ios-star",
      font_class: "ios-star",
      unicode: "e8a8",
      unicode_decimal: 59560
    },
    {
      icon_id: "7138134",
      name: "ios-star-half",
      font_class: "ios-star-half",
      unicode: "e8a9",
      unicode_decimal: 59561
    },
    {
      icon_id: "7138135",
      name: "ios-star-outline",
      font_class: "ios-star-outline",
      unicode: "e8aa",
      unicode_decimal: 59562
    },
    {
      icon_id: "7138137",
      name: "ios-snow",
      font_class: "ios-snow",
      unicode: "e8ab",
      unicode_decimal: 59563
    },
    {
      icon_id: "7138138",
      name: "ios-stopwatch",
      font_class: "ios-stopwatch",
      unicode: "e8ac",
      unicode_decimal: 59564
    },
    {
      icon_id: "7138139",
      name: "ios-sunny",
      font_class: "ios-sunny",
      unicode: "e8ad",
      unicode_decimal: 59565
    },
    {
      icon_id: "7138160",
      name: "ios-unlock",
      font_class: "ios-unlock",
      unicode: "e8ae",
      unicode_decimal: 59566
    },
    {
      icon_id: "7138165",
      name: "ios-trophy",
      font_class: "ios-trophy",
      unicode: "e8af",
      unicode_decimal: 59567
    },
    {
      icon_id: "7138167",
      name: "ios-umbrella",
      font_class: "ios-umbrella",
      unicode: "e8b0",
      unicode_decimal: 59568
    },
    {
      icon_id: "7138168",
      name: "ios-videocam",
      font_class: "ios-videocam",
      unicode: "e8b1",
      unicode_decimal: 59569
    },
    {
      icon_id: "7138169",
      name: "ios-volume-high",
      font_class: "ios-volume-high",
      unicode: "e8b2",
      unicode_decimal: 59570
    },
    {
      icon_id: "7138170",
      name: "ios-water",
      font_class: "ios-water",
      unicode: "e8b3",
      unicode_decimal: 59571
    },
    {
      icon_id: "7138176",
      name: "ios-wifi",
      font_class: "ios-wifi",
      unicode: "e8b4",
      unicode_decimal: 59572
    },
    {
      icon_id: "7138213",
      name: "md-water",
      font_class: "md-water",
      unicode: "e8b5",
      unicode_decimal: 59573
    },
    {
      icon_id: "7138292",
      name: "md-checkbox",
      font_class: "md-checkbox",
      unicode: "e8b6",
      unicode_decimal: 59574
    },
    {
      icon_id: "7138295",
      name: "md-chatbubbles",
      font_class: "md-chatbubbles",
      unicode: "e8b7",
      unicode_decimal: 59575
    },
    {
      icon_id: "7138296",
      name: "md-chatboxes",
      font_class: "md-chatboxes",
      unicode: "e8b8",
      unicode_decimal: 59576
    },
    {
      icon_id: "7138301",
      name: "md-cloud-done",
      font_class: "md-cloud-done",
      unicode: "e8b9",
      unicode_decimal: 59577
    },
    {
      icon_id: "7138303",
      name: "md-cloud-upload",
      font_class: "md-cloud-upload",
      unicode: "e8ba",
      unicode_decimal: 59578
    },
    {
      icon_id: "7138310",
      name: "md-cloudy",
      font_class: "md-cloudy",
      unicode: "e8bb",
      unicode_decimal: 59579
    },
    {
      icon_id: "7138328",
      name: "md-contrast",
      font_class: "md-contrast",
      unicode: "e8bc",
      unicode_decimal: 59580
    },
    {
      icon_id: "7138332",
      name: "md-disc",
      font_class: "md-disc",
      unicode: "e8bd",
      unicode_decimal: 59581
    },
    {
      icon_id: "7138369",
      name: "md-heart-empty",
      font_class: "md-heart-empty",
      unicode: "e8be",
      unicode_decimal: 59582
    },
    {
      icon_id: "7138372",
      name: "md-heart",
      font_class: "md-heart",
      unicode: "e8bf",
      unicode_decimal: 59583
    },
    {
      icon_id: "7138374",
      name: "md-home",
      font_class: "md-home",
      unicode: "e8c0",
      unicode_decimal: 59584
    },
    {
      icon_id: "7138376",
      name: "md-mail-open",
      font_class: "md-mail-open",
      unicode: "e8c1",
      unicode_decimal: 59585
    },
    {
      icon_id: "7138391",
      name: "md-heart-half",
      font_class: "md-heart-half",
      unicode: "e8c2",
      unicode_decimal: 59586
    },
    {
      icon_id: "7138393",
      name: "md-person",
      font_class: "md-person",
      unicode: "e8c3",
      unicode_decimal: 59587
    },
    {
      icon_id: "7138405",
      name: "md-people",
      font_class: "md-people",
      unicode: "e8c4",
      unicode_decimal: 59588
    },
    {
      icon_id: "7138421",
      name: "md-more",
      font_class: "md-more",
      unicode: "e8c5",
      unicode_decimal: 59589
    },
    {
      icon_id: "7138431",
      name: "md-moon",
      font_class: "md-moon",
      unicode: "e8c6",
      unicode_decimal: 59590
    },
    {
      icon_id: "7138481",
      name: "md-pin",
      font_class: "md-pin",
      unicode: "e8c7",
      unicode_decimal: 59591
    },
    {
      icon_id: "577338",
      name: "\u66F4\u591A",
      font_class: "gengduo",
      unicode: "e73a",
      unicode_decimal: 59194
    },
    {
      icon_id: "1420800",
      name: "IOS",
      font_class: "ios",
      unicode: "e60c",
      unicode_decimal: 58892
    },
    {
      icon_id: "1445619",
      name: "wifi-off",
      font_class: "wifi-off",
      unicode: "e93a",
      unicode_decimal: 59706
    },
    {
      icon_id: "3629124",
      name: "\u5217\u8868\u7A7A\u7A7A",
      font_class: "shiliangzhinengduixiang-",
      unicode: "e6ad",
      unicode_decimal: 59053
    },
    {
      icon_id: "3977929",
      name: "\u5FAE\u4FE1\u652F\u4ED8",
      font_class: "weixinzhifu",
      unicode: "e605",
      unicode_decimal: 58885
    },
    {
      icon_id: "8338693",
      name: "\u94F6\u884C\u5361",
      font_class: "yinhangqia",
      unicode: "e6c9",
      unicode_decimal: 59081
    },
    {
      icon_id: "9306316",
      name: "\u4E91\u95EA\u4ED8",
      font_class: "yunshanfu",
      unicode: "e68b",
      unicode_decimal: 59019
    },
    {
      icon_id: "15989503",
      name: "\u5934\u6761\u6837\u5F0F",
      font_class: "toutiaoyangshi",
      unicode: "e622",
      unicode_decimal: 58914
    },
    {
      icon_id: "18166694",
      name: "\u6296\u97F3",
      font_class: "douyin",
      unicode: "e8db",
      unicode_decimal: 59611
    },
    {
      icon_id: "18166716",
      name: "\u652F\u4ED8,\u652F\u4ED8\u5B9D",
      font_class: "alipay",
      unicode: "e8de",
      unicode_decimal: 59614
    },
    {
      icon_id: "24164616",
      name: "\u534E\u4E3A",
      font_class: "huawei",
      unicode: "e610",
      unicode_decimal: 58896
    },
    {
      icon_id: "167190",
      name: "\u94FE\u63A5",
      font_class: "lianjie",
      unicode: "e665",
      unicode_decimal: 58981
    },
    {
      icon_id: "1185485",
      name: "\u5FAE\u4FE1",
      font_class: "weixin",
      unicode: "e63f",
      unicode_decimal: 58943
    },
    {
      icon_id: "6556747",
      name: "\u670B\u53CB\u5708",
      font_class: "pengyouquan",
      unicode: "e615",
      unicode_decimal: 58901
    },
    {
      icon_id: "6756291",
      name: "\u5FAE\u535A",
      font_class: "weibo",
      unicode: "e608",
      unicode_decimal: 58888
    },
    {
      icon_id: "16286932",
      name: "QQ",
      font_class: "QQ",
      unicode: "e60f",
      unicode_decimal: 58895
    },
    {
      icon_id: "16322953",
      name: "\u5C0F\u7A0B\u5E8F",
      font_class: "xiaochengxu",
      unicode: "e706",
      unicode_decimal: 59142
    },
    {
      icon_id: "6151036",
      name: "display-code",
      font_class: "display-code",
      unicode: "e792",
      unicode_decimal: 59282
    },
    {
      icon_id: "6151037",
      name: "display-arrow-right",
      font_class: "display-arrow-right",
      unicode: "e793",
      unicode_decimal: 59283
    },
    {
      icon_id: "6151038",
      name: "display-arrow-left",
      font_class: "display-arrow-left",
      unicode: "e794",
      unicode_decimal: 59284
    },
    {
      icon_id: "6151039",
      name: "laptop-error",
      font_class: "laptop-error",
      unicode: "e795",
      unicode_decimal: 59285
    },
    {
      icon_id: "6151040",
      name: "laptop-check",
      font_class: "laptop-check",
      unicode: "e796",
      unicode_decimal: 59286
    },
    {
      icon_id: "6151041",
      name: "laptop",
      font_class: "laptop",
      unicode: "e797",
      unicode_decimal: 59287
    },
    {
      icon_id: "6151050",
      name: "mobile-error",
      font_class: "mobile-error",
      unicode: "e798",
      unicode_decimal: 59288
    },
    {
      icon_id: "6151051",
      name: "mobile-check",
      font_class: "mobile-check",
      unicode: "e799",
      unicode_decimal: 59289
    },
    {
      icon_id: "6151052",
      name: "mobile-alt",
      font_class: "mobile-alt",
      unicode: "e79a",
      unicode_decimal: 59290
    },
    {
      icon_id: "6151059",
      name: "aliwangwang",
      font_class: "aliwangwang",
      unicode: "e79d",
      unicode_decimal: 59293
    },
    {
      icon_id: "6151060",
      name: "nail",
      font_class: "nail",
      unicode: "e79e",
      unicode_decimal: 59294
    },
    {
      icon_id: "6151061",
      name: "nail-fixed",
      font_class: "nail-fixed",
      unicode: "e79f",
      unicode_decimal: 59295
    },
    {
      icon_id: "6151070",
      name: "edit",
      font_class: "edit",
      unicode: "e7a0",
      unicode_decimal: 59296
    },
    {
      icon_id: "6151072",
      name: "dollar",
      font_class: "dollar",
      unicode: "e7a1",
      unicode_decimal: 59297
    },
    {
      icon_id: "6151080",
      name: "transanction",
      font_class: "transanction",
      unicode: "e7a2",
      unicode_decimal: 59298
    },
    {
      icon_id: "6151087",
      name: "filter-fill",
      font_class: "filter-fill",
      unicode: "e7a3",
      unicode_decimal: 59299
    },
    {
      icon_id: "6151089",
      name: "all-fill",
      font_class: "all-fill",
      unicode: "e7a4",
      unicode_decimal: 59300
    },
    {
      icon_id: "6151090",
      name: "database plus-fill",
      font_class: "databaseplus-fill",
      unicode: "e7a5",
      unicode_decimal: 59301
    },
    {
      icon_id: "6151091",
      name: "database-fill",
      font_class: "database-fill",
      unicode: "e7a6",
      unicode_decimal: 59302
    },
    {
      icon_id: "6151092",
      name: "comment lines-fill",
      font_class: "commentlines-fill",
      unicode: "e7a7",
      unicode_decimal: 59303
    },
    {
      icon_id: "6151093",
      name: "comment dots-fill",
      font_class: "commentdots-fill",
      unicode: "e7a8",
      unicode_decimal: 59304
    },
    {
      icon_id: "6151095",
      name: "paper plane-fill",
      font_class: "paperplane-fill",
      unicode: "e7a9",
      unicode_decimal: 59305
    },
    {
      icon_id: "6151096",
      name: "eye slash-fill",
      font_class: "eyeslash-fill",
      unicode: "e7aa",
      unicode_decimal: 59306
    },
    {
      icon_id: "6151097",
      name: "eye-fill",
      font_class: "eye-fill",
      unicode: "e7ab",
      unicode_decimal: 59307
    },
    {
      icon_id: "6151098",
      name: "lightbulb-fill",
      font_class: "lightbulb-fill",
      unicode: "e7ac",
      unicode_decimal: 59308
    },
    {
      icon_id: "6151099",
      name: "flag-fill",
      font_class: "flag-fill",
      unicode: "e7ad",
      unicode_decimal: 59309
    },
    {
      icon_id: "6151100",
      name: "tag-fill",
      font_class: "tag-fill",
      unicode: "e7ae",
      unicode_decimal: 59310
    },
    {
      icon_id: "6151101",
      name: "position-fill",
      font_class: "position-fill",
      unicode: "e7af",
      unicode_decimal: 59311
    },
    {
      icon_id: "6151102",
      name: "location-fill",
      font_class: "location-fill",
      unicode: "e7b0",
      unicode_decimal: 59312
    },
    {
      icon_id: "6151103",
      name: "map-fill",
      font_class: "map-fill",
      unicode: "e7b1",
      unicode_decimal: 59313
    },
    {
      icon_id: "6151105",
      name: "inbox in-fill",
      font_class: "inboxin-fill",
      unicode: "e7b2",
      unicode_decimal: 59314
    },
    {
      icon_id: "6151106",
      name: "box-fill",
      font_class: "box-fill",
      unicode: "e7b3",
      unicode_decimal: 59315
    },
    {
      icon_id: "6151108",
      name: "database set-fill",
      font_class: "databaseset-fill",
      unicode: "e7b4",
      unicode_decimal: 59316
    },
    {
      icon_id: "6151109",
      name: "layer group-fill",
      font_class: "layergroup-fill",
      unicode: "e7b5",
      unicode_decimal: 59317
    },
    {
      icon_id: "6151111",
      name: "cry-fill",
      font_class: "cry-fill",
      unicode: "e7b6",
      unicode_decimal: 59318
    },
    {
      icon_id: "6151113",
      name: "smile-fill",
      font_class: "smile-fill",
      unicode: "e7b7",
      unicode_decimal: 59319
    },
    {
      icon_id: "6151115",
      name: "unlock-fill",
      font_class: "unlock-fill",
      unicode: "e7b8",
      unicode_decimal: 59320
    },
    {
      icon_id: "6151117",
      name: "lock-fill",
      font_class: "lock-fill",
      unicode: "e7b9",
      unicode_decimal: 59321
    },
    {
      icon_id: "6151118",
      name: "align right-fill",
      font_class: "alignright-fill",
      unicode: "e7ba",
      unicode_decimal: 59322
    },
    {
      icon_id: "6151119",
      name: "align left-fill",
      font_class: "alignleft-fill",
      unicode: "e7bb",
      unicode_decimal: 59323
    },
    {
      icon_id: "6151120",
      name: "border bottom-fill",
      font_class: "borderbottom-fill",
      unicode: "e7bc",
      unicode_decimal: 59324
    },
    {
      icon_id: "6151121",
      name: "border top-fill",
      font_class: "bordertop-fill",
      unicode: "e7bd",
      unicode_decimal: 59325
    },
    {
      icon_id: "6151122",
      name: "align center-fill",
      font_class: "aligncenter-fill",
      unicode: "e7be",
      unicode_decimal: 59326
    },
    {
      icon_id: "6151123",
      name: "border verticle-fill",
      font_class: "borderverticle-fill",
      unicode: "e7bf",
      unicode_decimal: 59327
    },
    {
      icon_id: "6151126",
      name: "pic center-fill",
      font_class: "piccenter-fill",
      unicode: "e7c0",
      unicode_decimal: 59328
    },
    {
      icon_id: "6151127",
      name: "pic side-fill",
      font_class: "picside-fill",
      unicode: "e7c1",
      unicode_decimal: 59329
    },
    {
      icon_id: "6151128",
      name: "folder open-fill",
      font_class: "folderopen-fill",
      unicode: "e7c2",
      unicode_decimal: 59330
    },
    {
      icon_id: "6151129",
      name: "folder plus-fill",
      font_class: "folderplus-fill",
      unicode: "e7c3",
      unicode_decimal: 59331
    },
    {
      icon_id: "6151130",
      name: "folder-fill",
      font_class: "folder-fill",
      unicode: "e7c4",
      unicode_decimal: 59332
    },
    {
      icon_id: "6151132",
      name: "file-SQL",
      font_class: "file-SQL",
      unicode: "e7c5",
      unicode_decimal: 59333
    },
    {
      icon_id: "6151133",
      name: "file plus-fill",
      font_class: "fileplus-fill",
      unicode: "e7c6",
      unicode_decimal: 59334
    },
    {
      icon_id: "6151134",
      name: "file-fill",
      font_class: "file-fill",
      unicode: "e7c7",
      unicode_decimal: 59335
    },
    {
      icon_id: "6151135",
      name: "copy-fill",
      font_class: "copy-fill",
      unicode: "e7c8",
      unicode_decimal: 59336
    },
    {
      icon_id: "6151136",
      name: "headset-fill",
      font_class: "headset-fill",
      unicode: "e7c9",
      unicode_decimal: 59337
    },
    {
      icon_id: "6151138",
      name: "phone-fill",
      font_class: "phone-fill",
      unicode: "e7ca",
      unicode_decimal: 59338
    },
    {
      icon_id: "6151139",
      name: "pause circle-fill",
      font_class: "pausecircle-fill",
      unicode: "e7cb",
      unicode_decimal: 59339
    },
    {
      icon_id: "6151140",
      name: "stop circle-fill",
      font_class: "stopcircle-fill",
      unicode: "e7cc",
      unicode_decimal: 59340
    },
    {
      icon_id: "6151141",
      name: "play circle-fill",
      font_class: "playcircle-fill",
      unicode: "e7cd",
      unicode_decimal: 59341
    },
    {
      icon_id: "6151143",
      name: "delete-fill",
      font_class: "delete-fill",
      unicode: "e7ce",
      unicode_decimal: 59342
    },
    {
      icon_id: "6151144",
      name: "picture-fill",
      font_class: "picture-fill",
      unicode: "e7cf",
      unicode_decimal: 59343
    },
    {
      icon_id: "6151145",
      name: "mail-fill",
      font_class: "mail-fill",
      unicode: "e7d0",
      unicode_decimal: 59344
    },
    {
      icon_id: "6151146",
      name: "heart-fill",
      font_class: "heart-fill",
      unicode: "e7d1",
      unicode_decimal: 59345
    },
    {
      icon_id: "6151147",
      name: "collection-fill",
      font_class: "collection-fill",
      unicode: "e7d2",
      unicode_decimal: 59346
    },
    {
      icon_id: "6151149",
      name: "user-group-fill",
      font_class: "user-group-fill",
      unicode: "e7d3",
      unicode_decimal: 59347
    },
    {
      icon_id: "6151150",
      name: "user plus-fill",
      font_class: "userplus-fill",
      unicode: "e7d4",
      unicode_decimal: 59348
    },
    {
      icon_id: "6151151",
      name: "user-fill",
      font_class: "user-fill",
      unicode: "e7d5",
      unicode_decimal: 59349
    },
    {
      icon_id: "6151152",
      name: "cog-fill",
      font_class: "cog-fill",
      unicode: "e7d6",
      unicode_decimal: 59350
    },
    {
      icon_id: "6151154",
      name: "clock-fill",
      font_class: "clock-fill",
      unicode: "e7d7",
      unicode_decimal: 59351
    },
    {
      icon_id: "6151155",
      name: "calendar alt-fill",
      font_class: "calendaralt-fill",
      unicode: "e7d8",
      unicode_decimal: 59352
    },
    {
      icon_id: "6151157",
      name: "cloud download-fill",
      font_class: "clouddownload-fill",
      unicode: "e7d9",
      unicode_decimal: 59353
    },
    {
      icon_id: "6151158",
      name: "cloud upload-fill",
      font_class: "cloudupload-fill",
      unicode: "e7da",
      unicode_decimal: 59354
    },
    {
      icon_id: "6151159",
      name: "exchange-fill",
      font_class: "exchange-fill",
      unicode: "e7db",
      unicode_decimal: 59355
    },
    {
      icon_id: "6151161",
      name: "info-circle-fill",
      font_class: "info-circle-fill",
      unicode: "e7dc",
      unicode_decimal: 59356
    },
    {
      icon_id: "6151162",
      name: "question-circle-fill",
      font_class: "question-circle-fill",
      unicode: "e7dd",
      unicode_decimal: 59357
    },
    {
      icon_id: "6151171",
      name: "exclamation circle-f",
      font_class: "exclamationcircle-f",
      unicode: "e7de",
      unicode_decimal: 59358
    },
    {
      icon_id: "6151173",
      name: "minus-circle-fill",
      font_class: "minus-circle-fill",
      unicode: "e7df",
      unicode_decimal: 59359
    },
    {
      icon_id: "6151174",
      name: "plus-circle-fill",
      font_class: "plus-circle-fill",
      unicode: "e7e0",
      unicode_decimal: 59360
    },
    {
      icon_id: "6151176",
      name: "times-circle-fill",
      font_class: "times-circle-fill",
      unicode: "e7e1",
      unicode_decimal: 59361
    },
    {
      icon_id: "6151177",
      name: "check-circle-fill",
      font_class: "check-circle-fill",
      unicode: "e7e2",
      unicode_decimal: 59362
    },
    {
      icon_id: "6151178",
      name: "compress alt-fill",
      font_class: "compressalt-fill",
      unicode: "e7e3",
      unicode_decimal: 59363
    },
    {
      icon_id: "6151181",
      name: "expand alt-fill",
      font_class: "expandalt-fill",
      unicode: "e7e4",
      unicode_decimal: 59364
    },
    {
      icon_id: "6151187",
      name: "filter",
      font_class: "filter",
      unicode: "e7e5",
      unicode_decimal: 59365
    },
    {
      icon_id: "6151188",
      name: "all",
      font_class: "all",
      unicode: "e7e6",
      unicode_decimal: 59366
    },
    {
      icon_id: "6151192",
      name: "database-plus",
      font_class: "database-plus",
      unicode: "e7e7",
      unicode_decimal: 59367
    },
    {
      icon_id: "6151193",
      name: "database",
      font_class: "database",
      unicode: "e7e8",
      unicode_decimal: 59368
    },
    {
      icon_id: "6151195",
      name: "comment-lines",
      font_class: "comment-lines",
      unicode: "e7e9",
      unicode_decimal: 59369
    },
    {
      icon_id: "6151196",
      name: "comment-dots",
      font_class: "comment-dots",
      unicode: "e7ea",
      unicode_decimal: 59370
    },
    {
      icon_id: "6151198",
      name: "paper-plane",
      font_class: "paper-plane",
      unicode: "e7eb",
      unicode_decimal: 59371
    },
    {
      icon_id: "6151208",
      name: "eye-slash",
      font_class: "eye-slash",
      unicode: "e7ec",
      unicode_decimal: 59372
    },
    {
      icon_id: "6151209",
      name: "eye",
      font_class: "eye",
      unicode: "e7ed",
      unicode_decimal: 59373
    },
    {
      icon_id: "6151210",
      name: "lightbulb",
      font_class: "lightbulb",
      unicode: "e7ee",
      unicode_decimal: 59374
    },
    {
      icon_id: "6151211",
      name: "flag",
      font_class: "flag",
      unicode: "e7ef",
      unicode_decimal: 59375
    },
    {
      icon_id: "6151212",
      name: "tag",
      font_class: "tag",
      unicode: "e7f0",
      unicode_decimal: 59376
    },
    {
      icon_id: "6151214",
      name: "position",
      font_class: "position",
      unicode: "e7f1",
      unicode_decimal: 59377
    },
    {
      icon_id: "6151215",
      name: "location",
      font_class: "location",
      unicode: "e7f2",
      unicode_decimal: 59378
    },
    {
      icon_id: "6151216",
      name: "map",
      font_class: "map",
      unicode: "e7f3",
      unicode_decimal: 59379
    },
    {
      icon_id: "6151218",
      name: "inbox-in",
      font_class: "inbox-in",
      unicode: "e7f4",
      unicode_decimal: 59380
    },
    {
      icon_id: "6151219",
      name: "box",
      font_class: "box",
      unicode: "e7f5",
      unicode_decimal: 59381
    },
    {
      icon_id: "6151221",
      name: "database-set",
      font_class: "database-set",
      unicode: "e7f6",
      unicode_decimal: 59382
    },
    {
      icon_id: "6151223",
      name: "layer-group",
      font_class: "layer-group",
      unicode: "e7f7",
      unicode_decimal: 59383
    },
    {
      icon_id: "6151224",
      name: "wind-cry",
      font_class: "wind-cry",
      unicode: "e7f8",
      unicode_decimal: 59384
    },
    {
      icon_id: "6151225",
      name: "wind-smile",
      font_class: "wind-smile",
      unicode: "e7f9",
      unicode_decimal: 59385
    },
    {
      icon_id: "6151227",
      name: "unlock",
      font_class: "unlock",
      unicode: "e7fa",
      unicode_decimal: 59386
    },
    {
      icon_id: "6151228",
      name: "lock",
      font_class: "lock",
      unicode: "e7fb",
      unicode_decimal: 59387
    },
    {
      icon_id: "6151230",
      name: "align-right",
      font_class: "align-right",
      unicode: "e7fc",
      unicode_decimal: 59388
    },
    {
      icon_id: "6151231",
      name: "align-left",
      font_class: "align-left",
      unicode: "e7fd",
      unicode_decimal: 59389
    },
    {
      icon_id: "6151232",
      name: "border-bottom",
      font_class: "border-bottom",
      unicode: "e7fe",
      unicode_decimal: 59390
    },
    {
      icon_id: "6151233",
      name: "border-top",
      font_class: "border-top",
      unicode: "e7ff",
      unicode_decimal: 59391
    },
    {
      icon_id: "6151234",
      name: "align-center",
      font_class: "align-center",
      unicode: "e800",
      unicode_decimal: 59392
    },
    {
      icon_id: "6151236",
      name: "border-verticle",
      font_class: "border-verticle",
      unicode: "e801",
      unicode_decimal: 59393
    },
    {
      icon_id: "6151237",
      name: "pic-center",
      font_class: "pic-center",
      unicode: "e802",
      unicode_decimal: 59394
    },
    {
      icon_id: "6151238",
      name: "pic-side",
      font_class: "pic-side",
      unicode: "e803",
      unicode_decimal: 59395
    },
    {
      icon_id: "6151239",
      name: "folder-open",
      font_class: "folder-open",
      unicode: "e804",
      unicode_decimal: 59396
    },
    {
      icon_id: "6151241",
      name: "folder-plus",
      font_class: "folder-plus",
      unicode: "e805",
      unicode_decimal: 59397
    },
    {
      icon_id: "6151242",
      name: "folder",
      font_class: "folder",
      unicode: "e806",
      unicode_decimal: 59398
    },
    {
      icon_id: "6151251",
      name: "file-SQL",
      font_class: "file-SQL1",
      unicode: "e807",
      unicode_decimal: 59399
    },
    {
      icon_id: "6151252",
      name: "file-plus",
      font_class: "file-plus",
      unicode: "e808",
      unicode_decimal: 59400
    },
    {
      icon_id: "6151253",
      name: "file",
      font_class: "file",
      unicode: "e809",
      unicode_decimal: 59401
    },
    {
      icon_id: "6151256",
      name: "copy",
      font_class: "copy",
      unicode: "e80a",
      unicode_decimal: 59402
    },
    {
      icon_id: "6151257",
      name: "headset",
      font_class: "headset",
      unicode: "e80b",
      unicode_decimal: 59403
    },
    {
      icon_id: "6151258",
      name: "phone",
      font_class: "phone",
      unicode: "e80c",
      unicode_decimal: 59404
    },
    {
      icon_id: "6151260",
      name: "pause circle",
      font_class: "pausecircle",
      unicode: "e80d",
      unicode_decimal: 59405
    },
    {
      icon_id: "6151261",
      name: "stop circle",
      font_class: "stopcircle",
      unicode: "e80e",
      unicode_decimal: 59406
    },
    {
      icon_id: "6151262",
      name: "play circle",
      font_class: "playcircle",
      unicode: "e80f",
      unicode_decimal: 59407
    },
    {
      icon_id: "6151263",
      name: "delete",
      font_class: "delete",
      unicode: "e810",
      unicode_decimal: 59408
    },
    {
      icon_id: "6151264",
      name: "picture",
      font_class: "picture",
      unicode: "e811",
      unicode_decimal: 59409
    },
    {
      icon_id: "6151265",
      name: "mail",
      font_class: "mail",
      unicode: "e812",
      unicode_decimal: 59410
    },
    {
      icon_id: "6151266",
      name: "like",
      font_class: "like",
      unicode: "e813",
      unicode_decimal: 59411
    },
    {
      icon_id: "6151267",
      name: "collection",
      font_class: "collection",
      unicode: "e814",
      unicode_decimal: 59412
    },
    {
      icon_id: "6151268",
      name: "user-group",
      font_class: "user-group",
      unicode: "e815",
      unicode_decimal: 59413
    },
    {
      icon_id: "6151270",
      name: "account-plus",
      font_class: "account-plus",
      unicode: "e816",
      unicode_decimal: 59414
    },
    {
      icon_id: "6151272",
      name: "account",
      font_class: "account",
      unicode: "e817",
      unicode_decimal: 59415
    },
    {
      icon_id: "6151273",
      name: "cog",
      font_class: "cog",
      unicode: "e818",
      unicode_decimal: 59416
    },
    {
      icon_id: "6151275",
      name: "clock",
      font_class: "clock",
      unicode: "e819",
      unicode_decimal: 59417
    },
    {
      icon_id: "6151276",
      name: "calendar-alt",
      font_class: "calendar-alt",
      unicode: "e81a",
      unicode_decimal: 59418
    },
    {
      icon_id: "6151277",
      name: "cloud download",
      font_class: "clouddownload",
      unicode: "e81b",
      unicode_decimal: 59419
    },
    {
      icon_id: "6151278",
      name: "cloud upload",
      font_class: "cloudupload",
      unicode: "e81c",
      unicode_decimal: 59420
    },
    {
      icon_id: "6151279",
      name: "exchange",
      font_class: "exchange",
      unicode: "e81d",
      unicode_decimal: 59421
    },
    {
      icon_id: "6151280",
      name: "info-circle",
      font_class: "info-circle",
      unicode: "e81e",
      unicode_decimal: 59422
    },
    {
      icon_id: "6151281",
      name: "question-circle",
      font_class: "question-circle",
      unicode: "e81f",
      unicode_decimal: 59423
    },
    {
      icon_id: "6151282",
      name: "exclamation-circle",
      font_class: "exclamation-circle",
      unicode: "e820",
      unicode_decimal: 59424
    },
    {
      icon_id: "6151283",
      name: "minus-circle",
      font_class: "minus-circle",
      unicode: "e821",
      unicode_decimal: 59425
    },
    {
      icon_id: "6151285",
      name: "plus-circle",
      font_class: "plus-circle",
      unicode: "e822",
      unicode_decimal: 59426
    },
    {
      icon_id: "6151286",
      name: "times-circle",
      font_class: "times-circle",
      unicode: "e823",
      unicode_decimal: 59427
    },
    {
      icon_id: "6151287",
      name: "check-circle",
      font_class: "check-circle",
      unicode: "e824",
      unicode_decimal: 59428
    },
    {
      icon_id: "6151288",
      name: "compress-alt",
      font_class: "compress-alt",
      unicode: "e825",
      unicode_decimal: 59429
    },
    {
      icon_id: "6151289",
      name: "expand-alt",
      font_class: "expand-alt",
      unicode: "e826",
      unicode_decimal: 59430
    },
    {
      icon_id: "6151290",
      name: "ban",
      font_class: "ban",
      unicode: "e827",
      unicode_decimal: 59431
    },
    {
      icon_id: "6151292",
      name: "minus",
      font_class: "minus",
      unicode: "e828",
      unicode_decimal: 59432
    },
    {
      icon_id: "6151293",
      name: "plus",
      font_class: "plus",
      unicode: "e829",
      unicode_decimal: 59433
    },
    {
      icon_id: "6151294",
      name: "times",
      font_class: "times",
      unicode: "e82a",
      unicode_decimal: 59434
    },
    {
      icon_id: "6151295",
      name: "check",
      font_class: "check",
      unicode: "e82b",
      unicode_decimal: 59435
    },
    {
      icon_id: "6151299",
      name: "search-minus",
      font_class: "search-minus",
      unicode: "e82c",
      unicode_decimal: 59436
    },
    {
      icon_id: "6151300",
      name: "search-plus",
      font_class: "search-plus",
      unicode: "e82d",
      unicode_decimal: 59437
    },
    {
      icon_id: "6151301",
      name: "search",
      font_class: "search",
      unicode: "e82e",
      unicode_decimal: 59438
    },
    {
      icon_id: "6151304",
      name: "reply",
      font_class: "reply",
      unicode: "e82f",
      unicode_decimal: 59439
    },
    {
      icon_id: "6151306",
      name: "undo",
      font_class: "undo",
      unicode: "e830",
      unicode_decimal: 59440
    },
    {
      icon_id: "6151307",
      name: "redo",
      font_class: "redo",
      unicode: "e831",
      unicode_decimal: 59441
    },
    {
      icon_id: "6151308",
      name: "external-link",
      font_class: "external-link",
      unicode: "e832",
      unicode_decimal: 59442
    },
    {
      icon_id: "6151309",
      name: "arrows-alt",
      font_class: "arrows-alt",
      unicode: "e833",
      unicode_decimal: 59443
    },
    {
      icon_id: "6151310",
      name: "indent",
      font_class: "indent",
      unicode: "e834",
      unicode_decimal: 59444
    },
    {
      icon_id: "6151311",
      name: "outdent",
      font_class: "outdent",
      unicode: "e835",
      unicode_decimal: 59445
    },
    {
      icon_id: "6151312",
      name: "sort-line",
      font_class: "sort-line",
      unicode: "e836",
      unicode_decimal: 59446
    },
    {
      icon_id: "6151314",
      name: "switch",
      font_class: "switch",
      unicode: "e837",
      unicode_decimal: 59447
    },
    {
      icon_id: "6151316",
      name: "wind-descending",
      font_class: "wind-descending",
      unicode: "e838",
      unicode_decimal: 59448
    },
    {
      icon_id: "6151317",
      name: "wind-ascending",
      font_class: "wind-ascending",
      unicode: "e839",
      unicode_decimal: 59449
    },
    {
      icon_id: "6151351",
      name: "download",
      font_class: "download",
      unicode: "e83a",
      unicode_decimal: 59450
    },
    {
      icon_id: "6151353",
      name: "upload",
      font_class: "upload",
      unicode: "e83b",
      unicode_decimal: 59451
    },
    {
      icon_id: "6151360",
      name: "arrow-to-bottom",
      font_class: "arrow-to-bottom",
      unicode: "e83c",
      unicode_decimal: 59452
    },
    {
      icon_id: "6151361",
      name: "arrow-to-top",
      font_class: "arrow-to-top",
      unicode: "e83d",
      unicode_decimal: 59453
    },
    {
      icon_id: "6151363",
      name: "long-arrow-down",
      font_class: "long-arrow-down",
      unicode: "e83e",
      unicode_decimal: 59454
    },
    {
      icon_id: "6151364",
      name: "long-arrow-up",
      font_class: "long-arrow-up",
      unicode: "e83f",
      unicode_decimal: 59455
    },
    {
      icon_id: "6151368",
      name: "arrow-right",
      font_class: "arrow-right",
      unicode: "e840",
      unicode_decimal: 59456
    },
    {
      icon_id: "6151370",
      name: "arrow-left",
      font_class: "arrow-left",
      unicode: "e841",
      unicode_decimal: 59457
    },
    {
      icon_id: "6151371",
      name: "sort",
      font_class: "sort",
      unicode: "e842",
      unicode_decimal: 59458
    },
    {
      icon_id: "6151377",
      name: "sort-down",
      font_class: "sort-down",
      unicode: "e843",
      unicode_decimal: 59459
    },
    {
      icon_id: "6151384",
      name: "sort-up",
      font_class: "sort-up",
      unicode: "e844",
      unicode_decimal: 59460
    },
    {
      icon_id: "6151385",
      name: "caret-right",
      font_class: "caret-right",
      unicode: "e845",
      unicode_decimal: 59461
    },
    {
      icon_id: "6151386",
      name: "caret-left",
      font_class: "caret-left",
      unicode: "e846",
      unicode_decimal: 59462
    },
    {
      icon_id: "6151387",
      name: "arrows-v",
      font_class: "arrows-v",
      unicode: "e847",
      unicode_decimal: 59463
    },
    {
      icon_id: "6151390",
      name: "angle- double-down",
      font_class: "angle-double-down",
      unicode: "e848",
      unicode_decimal: 59464
    },
    {
      icon_id: "6151391",
      name: "angle-double-up",
      font_class: "angle-double-up",
      unicode: "e849",
      unicode_decimal: 59465
    },
    {
      icon_id: "6151392",
      name: "angle-double-right",
      font_class: "angle-double-right",
      unicode: "e84a",
      unicode_decimal: 59466
    },
    {
      icon_id: "6151393",
      name: "angle-double-left",
      font_class: "angle-double-left",
      unicode: "e84b",
      unicode_decimal: 59467
    },
    {
      icon_id: "6151394",
      name: "angle-down",
      font_class: "angle-down",
      unicode: "e84c",
      unicode_decimal: 59468
    },
    {
      icon_id: "6151395",
      name: "angle-up",
      font_class: "angle-up",
      unicode: "e84d",
      unicode_decimal: 59469
    },
    {
      icon_id: "6151396",
      name: "angle-right",
      font_class: "angle-right",
      unicode: "e84e",
      unicode_decimal: 59470
    },
    {
      icon_id: "6151456",
      name: "angle-left",
      font_class: "angle-left",
      unicode: "e84f",
      unicode_decimal: 59471
    },
    {
      icon_id: "6168585",
      name: "paperclip",
      font_class: "paperclip",
      unicode: "e850",
      unicode_decimal: 59472
    },
    {
      icon_id: "6172713",
      name: "connection",
      font_class: "connection",
      unicode: "e851",
      unicode_decimal: 59473
    },
    {
      icon_id: "6172717",
      name: "training",
      font_class: "training",
      unicode: "e853",
      unicode_decimal: 59475
    },
    {
      icon_id: "6172721",
      name: "process",
      font_class: "process",
      unicode: "e854",
      unicode_decimal: 59476
    },
    {
      icon_id: "6172722",
      name: "news",
      font_class: "news",
      unicode: "e855",
      unicode_decimal: 59477
    },
    {
      icon_id: "6172724",
      name: "save",
      font_class: "save",
      unicode: "e856",
      unicode_decimal: 59478
    },
    {
      icon_id: "6172748",
      name: "print",
      font_class: "print",
      unicode: "e857",
      unicode_decimal: 59479
    },
    {
      icon_id: "6172751",
      name: "new-releases",
      font_class: "new-releases",
      unicode: "e858",
      unicode_decimal: 59480
    },
    {
      icon_id: "6172758",
      name: "release",
      font_class: "release",
      unicode: "e85a",
      unicode_decimal: 59482
    },
    {
      icon_id: "6172762",
      name: "alert",
      font_class: "alert",
      unicode: "e85b",
      unicode_decimal: 59483
    },
    {
      icon_id: "6172770",
      name: "backspace",
      font_class: "backspace",
      unicode: "e85c",
      unicode_decimal: 59484
    },
    {
      icon_id: "6172775",
      name: "gem",
      font_class: "gem",
      unicode: "e85d",
      unicode_decimal: 59485
    },
    {
      icon_id: "6172776",
      name: "integral",
      font_class: "integral",
      unicode: "e85e",
      unicode_decimal: 59486
    },
    {
      icon_id: "6172777",
      name: "star-circle",
      font_class: "star-circle",
      unicode: "e85f",
      unicode_decimal: 59487
    },
    {
      icon_id: "6172778",
      name: "user-circle",
      font_class: "user-circle",
      unicode: "e860",
      unicode_decimal: 59488
    },
    {
      icon_id: "6172783",
      name: "cloud-machine-fill",
      font_class: "cloud-machine-fill",
      unicode: "e861",
      unicode_decimal: 59489
    },
    {
      icon_id: "6172784",
      name: "cloud-machine",
      font_class: "cloud-machine",
      unicode: "e862",
      unicode_decimal: 59490
    },
    {
      icon_id: "6172785",
      name: "terminal-fill",
      font_class: "terminal-fill",
      unicode: "e863",
      unicode_decimal: 59491
    },
    {
      icon_id: "6172786",
      name: "terminal",
      font_class: "terminal",
      unicode: "e864",
      unicode_decimal: 59492
    },
    {
      icon_id: "6173016",
      name: "shopping-cart-fill",
      font_class: "shopping-cart-fill",
      unicode: "e865",
      unicode_decimal: 59493
    },
    {
      icon_id: "6228652",
      name: "resource",
      font_class: "resource",
      unicode: "e867",
      unicode_decimal: 59495
    },
    {
      icon_id: "6303226",
      name: "rank",
      font_class: "rank",
      unicode: "e86a",
      unicode_decimal: 59498
    },
    {
      icon_id: "6343820",
      name: "sync-alt",
      font_class: "sync-alt",
      unicode: "e86b",
      unicode_decimal: 59499
    },
    {
      icon_id: "6343821",
      name: "compass",
      font_class: "compass",
      unicode: "e86c",
      unicode_decimal: 59500
    },
    {
      icon_id: "6343822",
      name: "arrow-alt- from-top",
      font_class: "arrow-alt-from-top",
      unicode: "e86d",
      unicode_decimal: 59501
    },
    {
      icon_id: "6343823",
      name: "arrow-alt-from-botto",
      font_class: "arrow-alt-from-botto",
      unicode: "e86e",
      unicode_decimal: 59502
    },
    {
      icon_id: "6343824",
      name: "menu",
      font_class: "menu",
      unicode: "e86f",
      unicode_decimal: 59503
    },
    {
      icon_id: "6353291",
      name: "icon-drag",
      font_class: "icon-drag",
      unicode: "e870",
      unicode_decimal: 59504
    },
    {
      icon_id: "6353292",
      name: "early-warning",
      font_class: "early-warning",
      unicode: "e871",
      unicode_decimal: 59505
    },
    {
      icon_id: "6353293",
      name: "share",
      font_class: "share",
      unicode: "e872",
      unicode_decimal: 59506
    },
    {
      icon_id: "6353306",
      name: "share",
      font_class: "share1",
      unicode: "e873",
      unicode_decimal: 59507
    },
    {
      icon_id: "6861314",
      name: "management",
      font_class: "management-",
      unicode: "e874",
      unicode_decimal: 59508
    },
    {
      icon_id: "6863066",
      name: "accesskeys",
      font_class: "accesskeys",
      unicode: "e875",
      unicode_decimal: 59509
    },
    {
      icon_id: "7357537",
      name: "arrow-sort down-small",
      font_class: "arrow-sortdown-smal",
      unicode: "e877",
      unicode_decimal: 59511
    },
    {
      icon_id: "7410218",
      name: "minus-square-fill",
      font_class: "minus-square-fill",
      unicode: "e878",
      unicode_decimal: 59512
    },
    {
      icon_id: "7410219",
      name: "plus-square-fill",
      font_class: "plus-square-fill",
      unicode: "e879",
      unicode_decimal: 59513
    },
    {
      icon_id: "7410220",
      name: "minus-square",
      font_class: "minus-square",
      unicode: "e87a",
      unicode_decimal: 59514
    },
    {
      icon_id: "7410222",
      name: "plus-square",
      font_class: "plus-square",
      unicode: "e87b",
      unicode_decimal: 59515
    },
    {
      icon_id: "7906283",
      name: "step mode",
      font_class: "stepmode",
      unicode: "e87d",
      unicode_decimal: 59517
    },
    {
      icon_id: "7906284",
      name: "scrolling mode",
      font_class: "scrollingmode",
      unicode: "e87e",
      unicode_decimal: 59518
    },
    {
      icon_id: "8268337",
      name: "shopping cart",
      font_class: "shoppingcart",
      unicode: "e881",
      unicode_decimal: 59521
    },
    {
      icon_id: "8305716",
      name: "waiting-fill",
      font_class: "waiting-fill",
      unicode: "e882",
      unicode_decimal: 59522
    },
    {
      icon_id: "8305718",
      name: "waiting",
      font_class: "waiting",
      unicode: "e883",
      unicode_decimal: 59523
    },
    {
      icon_id: "8307796",
      name: "right-arrow-rect",
      font_class: "right-arrow-rect",
      unicode: "e884",
      unicode_decimal: 59524
    },
    {
      icon_id: "8307800",
      name: "left-arrow-rect",
      font_class: "left-arrow-rect",
      unicode: "e885",
      unicode_decimal: 59525
    },
    {
      icon_id: "8623603",
      name: "bell",
      font_class: "bell",
      unicode: "e887",
      unicode_decimal: 59527
    },
    {
      icon_id: "8762555",
      name: "structured data",
      font_class: "structured-data",
      unicode: "e888",
      unicode_decimal: 59528
    },
    {
      icon_id: "6150957",
      name: "drag",
      font_class: "drag",
      unicode: "e769",
      unicode_decimal: 59241
    },
    {
      icon_id: "8762556",
      name: "vector",
      font_class: "vector",
      unicode: "e889",
      unicode_decimal: 59529
    },
    {
      icon_id: "6150958",
      name: "ellipsis-v",
      font_class: "ellipsis-vertical",
      unicode: "e76a",
      unicode_decimal: 59242
    },
    {
      icon_id: "9009443",
      name: "NEW",
      font_class: "NEW-copy",
      unicode: "e88a",
      unicode_decimal: 59530
    },
    {
      icon_id: "6150959",
      name: "gallery-view",
      font_class: "gallery-view",
      unicode: "e76b",
      unicode_decimal: 59243
    },
    {
      icon_id: "9009475",
      name: "HOT",
      font_class: "HOT-copy",
      unicode: "e88b",
      unicode_decimal: 59531
    },
    {
      icon_id: "6150960",
      name: "WIFI",
      font_class: "WIFI",
      unicode: "e76c",
      unicode_decimal: 59244
    },
    {
      icon_id: "9066652",
      name: "home",
      font_class: "home",
      unicode: "e88c",
      unicode_decimal: 59532
    },
    {
      icon_id: "6150961",
      name: "bug-report",
      font_class: "bug-report",
      unicode: "e76d",
      unicode_decimal: 59245
    },
    {
      icon_id: "9340469",
      name: "monitoring",
      font_class: "monitoring",
      unicode: "e88e",
      unicode_decimal: 59534
    },
    {
      icon_id: "6150962",
      name: "qrcode",
      font_class: "qrcode",
      unicode: "e76e",
      unicode_decimal: 59246
    },
    {
      icon_id: "9340470",
      name: "diagnose",
      font_class: "diagnose",
      unicode: "e88f",
      unicode_decimal: 59535
    },
    {
      icon_id: "6150963",
      name: "scan",
      font_class: "scan",
      unicode: "e76f",
      unicode_decimal: 59247
    },
    {
      icon_id: "10273624",
      name: "loading",
      font_class: "loading",
      unicode: "e891",
      unicode_decimal: 59537
    },
    {
      icon_id: "6150964",
      name: "cut",
      font_class: "cut",
      unicode: "e770",
      unicode_decimal: 59248
    },
    {
      icon_id: "11307823",
      name: "Directory tree",
      font_class: "Directory-tree",
      unicode: "e892",
      unicode_decimal: 59538
    },
    {
      icon_id: "6150965",
      name: "gift",
      font_class: "gift",
      unicode: "e771",
      unicode_decimal: 59249
    },
    {
      icon_id: "12253601",
      name: "application",
      font_class: "application",
      unicode: "e89e",
      unicode_decimal: 59550
    },
    {
      icon_id: "6150966",
      name: "link",
      font_class: "link",
      unicode: "e772",
      unicode_decimal: 59250
    },
    {
      icon_id: "12253602",
      name: "application  group",
      font_class: "applicationgroup",
      unicode: "e89f",
      unicode_decimal: 59551
    },
    {
      icon_id: "6150968",
      name: "poweroff",
      font_class: "poweroff",
      unicode: "e774",
      unicode_decimal: 59252
    },
    {
      icon_id: "6150969",
      name: "key",
      font_class: "key",
      unicode: "e775",
      unicode_decimal: 59253
    },
    {
      icon_id: "6150970",
      name: "safety-certificate",
      font_class: "safety-certificate",
      unicode: "e776",
      unicode_decimal: 59254
    },
    {
      icon_id: "6150971",
      name: "supervise",
      font_class: "supervise",
      unicode: "e777",
      unicode_decimal: 59255
    },
    {
      icon_id: "6151018",
      name: "tag-subscipt",
      font_class: "tag-subscipt",
      unicode: "e78a",
      unicode_decimal: 59274
    },
    {
      icon_id: "6151030",
      name: "chart-pie-alt",
      font_class: "chart-pie-alt",
      unicode: "e78c",
      unicode_decimal: 59276
    },
    {
      icon_id: "6151031",
      name: "chart-relation",
      font_class: "chart-relation",
      unicode: "e78d",
      unicode_decimal: 59277
    },
    {
      icon_id: "6151032",
      name: "chart-scatter-plot",
      font_class: "chart-scatter-plot",
      unicode: "e78e",
      unicode_decimal: 59278
    },
    {
      icon_id: "6151033",
      name: "chart-area",
      font_class: "chart-area",
      unicode: "e78f",
      unicode_decimal: 59279
    },
    {
      icon_id: "6151034",
      name: "chart-line",
      font_class: "chart-line",
      unicode: "e790",
      unicode_decimal: 59280
    },
    {
      icon_id: "6151035",
      name: "chart-bar",
      font_class: "chart-bar",
      unicode: "e791",
      unicode_decimal: 59281
    }
  ];
  var fontList = {
    id,
    name,
    font_family,
    css_prefix_text,
    description,
    glyphs
  };
  var tmiconFont = "AAEAAAALAIAAAwAwR1NVQiCLJXoAAAE4AAAAVE9TLzI8HlQ5AAABjAAAAGBjbWFwbLPjsAAACCQAABiUZ2x5ZutVhpEAACPYAAD69GhlYWQiLbVvAAAA4AAAADZoaGVhCLYGMwAAALwAAAAkaG10eDzf/zgAAAHsAAAGOGxvY2FfgRveAAAguAAAAx5tYXhwAr8CawAAARgAAAAgbmFtZZRMsowAAR7MAAACT3Bvc3TIodhFAAEhHAAAFQwAAQAAA4D/gABcBS//p//1BTAAAQAAAAAAAAAAAAAAAAAAAY4AAQAAAAEAAKb1/qJfDzz1AAsEAAAAAADfG7iaAAAAAN8buJr/p/93BTADxwAAAAgAAgAAAAAAAAABAAABjgJfACcAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAQEAwGQAAUAAAKJAswAAACPAokCzAAAAesAMgEIAAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAwOYA8WYDgP+AAAAD3ACJAAAAAQAAAAAAAAAAAAAAAAACBAAAAAQaAAAEAAAABQD//wQAAAAFAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAD//wQAAAAEAAAABAX//gQAAAAEAAAABAAAAAQA//sEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAP/+BAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQA//0EAAAABAAAAAQAAAAEAP//BAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAUi//0EAAAABS8AAAQA//gEAP//BAAAAAQA//oEAP/3BAD//AQA//8EAAAABBn/pwQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAD//wQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQZAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQA//8EAP//BAD//wQAAAAEAAAABAAAAAQA//8EAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAP//BAD//wQA//8EAP//BAD//wQA//8EAP//BAD//wQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQA//8EAP//BAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQA//8EAP//BAD//wQAAAAEAAAABAAAAAQA//8EAAAABAAAAAQAAAAEAAAABAAAAAQA//8EAAAABAAAAAQAAAAEAP//BAD//wQA//8EAP//BAD//wQA//8EAP//BAD//wQAAAAEAAAABAD//wQAAAAEAAAABAAAAAQAAAAEAP//BAD//wQA//8EAAAABAAAAAQA//MEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAP//BAD/9wQAAAAEAP//BAAAAAQAAAAEAAAA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AADmAQAA5gEAAAAHAADmBQAA5gUAAAB3AADmCAAA5ggAAACBAADmDAAA5gwAAAB0AADmDQAA5g0AAAAyAADmDgAA5g4AAAALAADmDwAA5g8AAACCAADmEAAA5hAAAAB9AADmEQAA5hEAAAAPAADmEgAA5hIAAAAQAADmFQAA5hUAAACAAADmIgAA5iIAAAB6AADmLwAA5i8AAAARAADmPwAA5j8AAAB/AADmRgAA5kYAAAA0AADmVwAA5lcAAAA1AADmWAAA5lgAAAAMAADmXQAA5l0AAAANAADmZQAA5mUAAAB+AADmiwAA5osAAAB5AADmrQAA5q0AAAB2AADmwgAA5sIAAAASAADmwwAA5sMAAAATAADmxAAA5sQAAAAUAADmxQAA5sUAAAAVAADmxgAA5sYAAAAWAADmxwAA5scAAAAXAADmyAAA5sgAAAAYAADmyQAA5skAAAB4AADmywAA5ssAAAAZAADmzAAA5swAAAAaAADmzQAA5s0AAAAbAADmzgAA5s4AAAAzAADm2gAA5toAAAAIAADm3gAA5t4AAAAcAADm4gAA5uIAAAAdAADm4wAA5uMAAAAeAADm5AAA5uQAAAAfAADm5wAA5ucAAAAgAADm8QAA5vEAAAAhAADm8gAA5vIAAAAiAADm/QAA5v0AAAAjAADnBgAA5wYAAACDAADnBwAA5wcAAAAkAADnCQAA5wkAAAAlAADnCgAA5woAAAAmAADnDgAA5w4AAAAnAADnEgAA5xIAAAAoAADnEwAA5xMAAAApAADnFAAA5xQAAAArAADnFgAA5xYAAAAqAADnGQAA5xkAAAAsAADnHAAA5xwAAAAtAADnHQAA5x0AAAAuAADnHgAA5x4AAAAvAADnHwAA5x8AAAAwAADnOgAA5zoAAABzAADnPgAA5z4AAAAKAADnWAAA51gAAAAJAADnaQAA52kAAAFvAADnagAA52oAAAFxAADnawAA52sAAAFzAADnbAAA52wAAAF1AADnbQAA520AAAF3AADnbgAA524AAAF5AADnbwAA528AAAF7AADncAAA53AAAAF9AADncQAA53EAAAF/AADncgAA53IAAAGBAADndAAA53QAAAGDAADndQAA53UAAAGEAADndgAA53YAAAGFAADndwAA53cAAAGGAADnigAA54oAAAGHAADnjAAA54wAAAGIAADnjQAA540AAAGJAADnjgAA544AAAGKAADnjwAA548AAAGLAADnkAAA55AAAAGMAADnkQAA55EAAAGNAADnkgAA55IAAACEAADnkwAA55MAAACFAADnlAAA55QAAACGAADnlQAA55UAAACHAADnlgAA55YAAACIAADnlwAA55cAAACJAADnmAAA55gAAACKAADnmQAA55kAAACLAADnmgAA55oAAACMAADnnQAA550AAACNAADnngAA554AAACOAADnnwAA558AAACPAADnoAAA56AAAACQAADnoQAA56EAAACRAADnogAA56IAAACSAADnowAA56MAAACTAADnpAAA56QAAACUAADnpQAA56UAAACVAADnpgAA56YAAACWAADnpwAA56cAAACXAADnqAAA56gAAACYAADnqQAA56kAAACZAADnqgAA56oAAACaAADnqwAA56sAAACbAADnrAAA56wAAACcAADnrQAA560AAACdAADnrgAA564AAACeAADnrwAA568AAACfAADnsAAA57AAAACgAADnsQAA57EAAAChAADnsgAA57IAAACiAADnswAA57MAAACjAADntAAA57QAAACkAADntQAA57UAAAClAADntgAA57YAAACmAADntwAA57cAAACnAADnuAAA57gAAACoAADnuQAA57kAAACpAADnugAA57oAAACqAADnuwAA57sAAACrAADnvAAA57wAAACsAADnvQAA570AAACtAADnvgAA574AAACuAADnvwAA578AAACvAADnwAAA58AAAACwAADnwQAA58EAAACxAADnwgAA58IAAACyAADnwwAA58MAAACzAADnxAAA58QAAAC0AADnxQAA58UAAAC1AADnxgAA58YAAAC2AADnxwAA58cAAAC3AADnyAAA58gAAAC4AADnyQAA58kAAAC5AADnygAA58oAAAC6AADnywAA58sAAAC7AADnzAAA58wAAAC8AADnzQAA580AAAC9AADnzgAA584AAAC+AADnzwAA588AAAC/AADn0AAA59AAAADAAADn0QAA59EAAADBAADn0gAA59IAAADCAADn0wAA59MAAADDAADn1AAA59QAAADEAADn1QAA59UAAADFAADn1gAA59YAAADGAADn1wAA59cAAADHAADn2AAA59gAAADIAADn2QAA59kAAADJAADn2gAA59oAAADKAADn2wAA59sAAADLAADn3AAA59wAAADMAADn3QAA590AAADNAADn3gAA594AAADOAADn3wAA598AAADPAADn4AAA5+AAAADQAADn4QAA5+EAAADRAADn4gAA5+IAAADSAADn4wAA5+MAAADTAADn5AAA5+QAAADUAADn5QAA5+UAAADVAADn5gAA5+YAAADWAADn5wAA5+cAAADXAADn6AAA5+gAAADYAADn6QAA5+kAAADZAADn6gAA5+oAAADaAADn6wAA5+sAAADbAADn7AAA5+wAAADcAADn7QAA5+0AAADdAADn7gAA5+4AAADeAADn7wAA5+8AAADfAADn8AAA5/AAAADgAADn8QAA5/EAAADhAADn8gAA5/IAAADiAADn8wAA5/MAAADjAADn9AAA5/QAAADkAADn9QAA5/UAAADlAADn9gAA5/YAAADmAADn9wAA5/cAAADnAADn+AAA5/gAAADoAADn+QAA5/kAAADpAADn+gAA5/oAAADqAADn+wAA5/sAAADrAADn/AAA5/wAAADsAADn/QAA5/0AAADtAADn/gAA5/4AAADuAADn/wAA5/8AAADvAADoAAAA6AAAAADwAADoAQAA6AEAAADxAADoAgAA6AIAAADyAADoAwAA6AMAAADzAADoBAAA6AQAAAD0AADoBQAA6AUAAAD1AADoBgAA6AYAAAD2AADoBwAA6AcAAAD3AADoCAAA6AgAAAD4AADoCQAA6AkAAAD5AADoCgAA6AoAAAD6AADoCwAA6AsAAAD7AADoDAAA6AwAAAD8AADoDQAA6A0AAAD9AADoDgAA6A4AAAD+AADoDwAA6A8AAAD/AADoEAAA6BAAAAEAAADoEQAA6BEAAAEBAADoEgAA6BIAAAECAADoEwAA6BMAAAEDAADoFAAA6BQAAAEEAADoFQAA6BUAAAEFAADoFgAA6BYAAAEGAADoFwAA6BcAAAEHAADoGAAA6BgAAAEIAADoGQAA6BkAAAEJAADoGgAA6BoAAAEKAADoGwAA6BsAAAELAADoHAAA6BwAAAEMAADoHQAA6B0AAAENAADoHgAA6B4AAAEOAADoHwAA6B8AAAEPAADoIAAA6CAAAAEQAADoIQAA6CEAAAERAADoIgAA6CIAAAESAADoIwAA6CMAAAETAADoJAAA6CQAAAEUAADoJQAA6CUAAAEVAADoJgAA6CYAAAEWAADoJwAA6CcAAAEXAADoKAAA6CgAAAEYAADoKQAA6CkAAAEZAADoKgAA6CoAAAEaAADoKwAA6CsAAAEbAADoLAAA6CwAAAEcAADoLQAA6C0AAAEdAADoLgAA6C4AAAEeAADoLwAA6C8AAAEfAADoMAAA6DAAAAEgAADoMQAA6DEAAAEhAADoMgAA6DIAAAEiAADoMwAA6DMAAAEjAADoNAAA6DQAAAEkAADoNQAA6DUAAAElAADoNgAA6DYAAAEmAADoNwAA6DcAAAEnAADoOAAA6DgAAAEoAADoOQAA6DkAAAEpAADoOgAA6DoAAAEqAADoOwAA6DsAAAErAADoPAAA6DwAAAEsAADoPQAA6D0AAAEtAADoPgAA6D4AAAEuAADoPwAA6D8AAAEvAADoQAAA6EAAAAEwAADoQQAA6EEAAAExAADoQgAA6EIAAAEyAADoQwAA6EMAAAEzAADoRAAA6EQAAAE0AADoRQAA6EUAAAE1AADoRgAA6EYAAAE2AADoRwAA6EcAAAE3AADoSAAA6EgAAAE4AADoSQAA6EkAAAE5AADoSgAA6EoAAAE6AADoSwAA6EsAAAE7AADoTAAA6EwAAAE8AADoTQAA6E0AAAE9AADoTgAA6E4AAAE+AADoTwAA6E8AAAE/AADoUAAA6FAAAAFAAADoUQAA6FEAAAFBAADoUgAA6FIAAAA2AADoUwAA6FMAAAFCAADoVAAA6FQAAAFDAADoVQAA6FUAAAFEAADoVgAA6FYAAAFFAADoVwAA6FcAAAFGAADoWAAA6FgAAAFHAADoWQAA6FkAAAA3AADoWgAA6FoAAAFIAADoWwAA6FsAAAFJAADoXAAA6FwAAAFKAADoXQAA6F0AAAFLAADoXgAA6F4AAAFMAADoXwAA6F8AAAFNAADoYAAA6GAAAAFOAADoYQAA6GEAAAFPAADoYgAA6GIAAAFQAADoYwAA6GMAAAFRAADoZAAA6GQAAAFSAADoZQAA6GUAAAFTAADoZgAA6GYAAAA4AADoZwAA6GcAAAFUAADoaAAA6GgAAAA5AADoaQAA6GkAAAA6AADoagAA6GoAAAFVAADoawAA6GsAAAFWAADobAAA6GwAAAFXAADobQAA6G0AAAFYAADobgAA6G4AAAFZAADobwAA6G8AAAFaAADocAAA6HAAAAFbAADocQAA6HEAAAFcAADocgAA6HIAAAFdAADocwAA6HMAAAFeAADodAAA6HQAAAFfAADodQAA6HUAAAFgAADodgAA6HYAAAA7AADodwAA6HcAAAFhAADoeAAA6HgAAAFiAADoeQAA6HkAAAFjAADoegAA6HoAAAFkAADoewAA6HsAAAFlAADofAAA6HwAAAA8AADofQAA6H0AAAFmAADofgAA6H4AAAFnAADofwAA6H8AAAA9AADogAAA6IAAAAA+AADogQAA6IEAAAFoAADoggAA6IIAAAFpAADogwAA6IMAAAFqAADohAAA6IQAAAFrAADohQAA6IUAAAFsAADohgAA6IYAAAA/AADohwAA6IcAAAFtAADoiAAA6IgAAAFuAADoiQAA6IkAAAFwAADoigAA6IoAAAFyAADoiwAA6IsAAAF0AADojAAA6IwAAAF2AADojQAA6I0AAABAAADojgAA6I4AAAF4AADojwAA6I8AAAF6AADokAAA6JAAAABBAADokQAA6JEAAAF8AADokgAA6JIAAAF+AADokwAA6JMAAABCAADolAAA6JQAAABDAADolQAA6JUAAABEAADolgAA6JYAAABFAADolwAA6JcAAABGAADomAAA6JgAAABHAADomQAA6JkAAABIAADomgAA6JoAAABJAADomwAA6JsAAABKAADonAAA6JwAAABLAADonQAA6J0AAAAuAADongAA6J4AAAGAAADonwAA6J8AAAGCAADooAAA6KAAAABMAADooQAA6KEAAABNAADoogAA6KIAAABOAADoowAA6KMAAABPAADopAAA6KQAAABQAADopQAA6KUAAABRAADopgAA6KYAAABSAADopwAA6KcAAABTAADoqAAA6KgAAABUAADoqQAA6KkAAABVAADoqgAA6KoAAABWAADoqwAA6KsAAABXAADorAAA6KwAAABYAADorQAA6K0AAABZAADorgAA6K4AAABaAADorwAA6K8AAABbAADosAAA6LAAAABcAADosQAA6LEAAABdAADosgAA6LIAAABeAADoswAA6LMAAABfAADotAAA6LQAAABgAADotQAA6LUAAABhAADotgAA6LYAAABiAADotwAA6LcAAABjAADouAAA6LgAAABkAADouQAA6LkAAABlAADougAA6LoAAABm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bgB0AHQAbQBpAGMAbwBuAFIAZQBnAHUAbABhAHIAdABtAGkAYwBvAG4AdABtAGkAYwBvAG4AVgBlAHIAcwBpAG8AbgAgADEALgAwAHQAbQBpAGMAbwBuAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGOAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgFDAUQBRQFGAUcBSAFJAUoBSwFMAU0BTgFPAVABUQFSAVMBVAFVAVYBVwFYAVkBWgFbAVwBXQFeAV8BYAFhAWIBYwFkAWUBZgFnAWgBaQFqAWsBbAFtAW4BbwFwAXEBcgFzAXQBdQF2AXcBeAF5AXoBewF8AX0BfgF/AYABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwG4AbkBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAdQB1QHWAdcB2AHZAdoB2wHcAd0B3gHfAeAB4QHiAeMB5AHlAeYB5wHoAekB6gHrAewB7QHuAe8B8AHxAfIB8wH0AfUB9gH3AfgB+QH6AfsB/AH9Af4B/wIAAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgInAigCKQIqAisCLAItAi4CLwIwAjECMgIzAjQCNQI2AjcCOAI5AjoCOwI8Aj0CPgI/AkACQQJCAkMCRAJFAkYCRwJIAkkCSgJLAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwAGcGF5cGFsBmdvb2dsZQlhcHBsZS1wYXkFQXBwbGUKZ29vZ2xlLXBheQdxaWFuZGFpBHF1YW4HaG9uZ2Jhbwt0b25nemhpZmlsbAlyZW5taW5iaTMHdG91cGlhbwRpY29uCXN2Z2dlc2hpLQdtZWl5dWFuBXFpY2hlB3Rvbmd6aGkHaHVpeXVhbhFtZC1waG9uZS1wb3J0cmFpdAltZC1wbGFuZXQSbWQtcGhvbmUtbGFuZHNjYXBlCG1kLXBvd2VyB21kLXJlZG8JbWQtcm9ja2V0CW1kLXJpYmJvbgdtZC11bmRvEG1kLXRyZW5kaW5nLWRvd24ObWQtdHJlbmRpbmctdXAMbWQtZ2l0LW1lcmdlCW1kLWZlbWFsZQdtZC1tYWxlEG1kLWhlYXJ0LWRpc2xpa2UJbWQtaGVhcnQxCGlvcy10ZXh0CGlvcy1yb3NlFmxvZ28tZ2FtZS1jb250cm9sbGVyLWIIaW9zLWJlZXIIaW9zLWNhZmUPaW9zLWNoYXRidWJibGVzEWlvcy1jb2xvci1wYWxldHRlCmlvcy1maWxpbmcQaW9zLWZpbmdlci1wcmludAhpb3MtaGFuZAppb3MtZmxvd2VyDWlvcy1pY2UtY3JlYW0IaW9zLWdyaWQOaW9zLW1haWwtb3BlbjEHaW9zLWtleQdpb3MtbWFuCG1laXl1YW4xCHppZGluZ3lpB3NodWF4aW4IaHVpeXVhbjEEeXVhbgxpb3MtYWlycGxhbmUJaW9zLXdvbWFuDGlvcy1hcGVydHVyZQlpb3MtYWxhcm0SaW9zLWFycm93LWRyb3Bkb3duFGlvcy1hcnJvdy1kcm9wbGVmdC1jEmlvcy1hcnJvdy1kcm9wbGVmdBBpb3MtYXJyb3ctZHJvcHVwFGlvcy1hcnJvdy1kcm9wcmlnaHQtFGlvcy1hcnJvdy1kcm9wZG93bi1jFGlvcy1hcnJvdy1kcm9wdXAtY2lyE2lvcy1hcnJvdy1kcm9wcmlnaHQKaW9zLWF0dGFjaAZpb3MtYXQHaW9zLWJlZBBpb3MtYmF0dGVyeS1mdWxsDWlvcy1ib29rbWFya3MNaW9zLWJsdWV0b290aAxpb3MtY2VsbHVsYXIHaW9zLWN1dAhpb3MtbGVhZgdpb3MtbWljEGlvcy1wYXJ0bHktc3VubnkTaW9zLXJhZGlvLWJ1dHRvbi1vbhRpb3MtcmFkaW8tYnV0dG9uLW9mZgppb3MtcmVtb3ZlFGlvcy1yZW1vdmUtY2lyY2xlLW91EWlvcy1yZW1vdmUtY2lyY2xlCmlvcy1yb2NrZXQKaW9zLXJpYmJvbghpb3Mtc3Rhcg1pb3Mtc3Rhci1oYWxmEGlvcy1zdGFyLW91dGxpbmUIaW9zLXNub3cNaW9zLXN0b3B3YXRjaAlpb3Mtc3VubnkKaW9zLXVubG9jawppb3MtdHJvcGh5DGlvcy11bWJyZWxsYQxpb3MtdmlkZW9jYW0PaW9zLXZvbHVtZS1oaWdoCWlvcy13YXRlcghpb3Mtd2lmaQhtZC13YXRlcgttZC1jaGVja2JveA5tZC1jaGF0YnViYmxlcwxtZC1jaGF0Ym94ZXMNbWQtY2xvdWQtZG9uZQ9tZC1jbG91ZC11cGxvYWQJbWQtY2xvdWR5C21kLWNvbnRyYXN0B21kLWRpc2MObWQtaGVhcnQtZW1wdHkHbWQtaG9tZQxtZC1tYWlsLW9wZW4NbWQtaGVhcnQtaGFsZgltZC1wZXJzb24JbWQtcGVvcGxlB21kLW1vcmUHbWQtbW9vbgZtZC1waW4HZ2VuZ2R1bwNpb3MId2lmaS1vZmYYc2hpbGlhbmd6aGluZW5nZHVpeGlhbmctC3dlaXhpbnpoaWZ1CnlpbmhhbmdxaWEJeXVuc2hhbmZ1DnRvdXRpYW95YW5nc2hpBmRvdXlpbgZhbGlwYXkGaHVhd2VpB2xpYW5qaWUGd2VpeGluC3Blbmd5b3VxdWFuBXdlaWJvAlFRC3hpYW9jaGVuZ3h1DGRpc3BsYXktY29kZRNkaXNwbGF5LWFycm93LXJpZ2h0EmRpc3BsYXktYXJyb3ctbGVmdAxsYXB0b3AtZXJyb3IMbGFwdG9wLWNoZWNrBmxhcHRvcAxtb2JpbGUtZXJyb3IMbW9iaWxlLWNoZWNrCm1vYmlsZS1hbHQLYWxpd2FuZ3dhbmcEbmFpbApuYWlsLWZpeGVkBGVkaXQGZG9sbGFyDHRyYW5zYW5jdGlvbgtmaWx0ZXItZmlsbAhhbGwtZmlsbBFkYXRhYmFzZXBsdXMtZmlsbA1kYXRhYmFzZS1maWxsEWNvbW1lbnRsaW5lcy1maWxsEGNvbW1lbnRkb3RzLWZpbGwPcGFwZXJwbGFuZS1maWxsDWV5ZXNsYXNoLWZpbGwIZXllLWZpbGwObGlnaHRidWxiLWZpbGwJZmxhZy1maWxsCHRhZy1maWxsDXBvc2l0aW9uLWZpbGwNbG9jYXRpb24tZmlsbAhtYXAtZmlsbAxpbmJveGluLWZpbGwIYm94LWZpbGwQZGF0YWJhc2VzZXQtZmlsbA9sYXllcmdyb3VwLWZpbGwIY3J5LWZpbGwKc21pbGUtZmlsbAt1bmxvY2stZmlsbAlsb2NrLWZpbGwPYWxpZ25yaWdodC1maWxsDmFsaWdubGVmdC1maWxsEWJvcmRlcmJvdHRvbS1maWxsDmJvcmRlcnRvcC1maWxsEGFsaWduY2VudGVyLWZpbGwTYm9yZGVydmVydGljbGUtZmlsbA5waWNjZW50ZXItZmlsbAxwaWNzaWRlLWZpbGwPZm9sZGVyb3Blbi1maWxsD2ZvbGRlcnBsdXMtZmlsbAtmb2xkZXItZmlsbAhmaWxlLVNRTA1maWxlcGx1cy1maWxsCWZpbGUtZmlsbAljb3B5LWZpbGwMaGVhZHNldC1maWxsCnBob25lLWZpbGwQcGF1c2VjaXJjbGUtZmlsbA9zdG9wY2lyY2xlLWZpbGwPcGxheWNpcmNsZS1maWxsC2RlbGV0ZS1maWxsDHBpY3R1cmUtZmlsbAltYWlsLWZpbGwKaGVhcnQtZmlsbA9jb2xsZWN0aW9uLWZpbGwPdXNlci1ncm91cC1maWxsDXVzZXJwbHVzLWZpbGwJdXNlci1maWxsCGNvZy1maWxsCmNsb2NrLWZpbGwQY2FsZW5kYXJhbHQtZmlsbBJjbG91ZGRvd25sb2FkLWZpbGwQY2xvdWR1cGxvYWQtZmlsbA1leGNoYW5nZS1maWxsEGluZm8tY2lyY2xlLWZpbGwUcXVlc3Rpb24tY2lyY2xlLWZpbGwTZXhjbGFtYXRpb25jaXJjbGUtZhFtaW51cy1jaXJjbGUtZmlsbBBwbHVzLWNpcmNsZS1maWxsEXRpbWVzLWNpcmNsZS1maWxsEWNoZWNrLWNpcmNsZS1maWxsEGNvbXByZXNzYWx0LWZpbGwOZXhwYW5kYWx0LWZpbGwGZmlsdGVyA2FsbA1kYXRhYmFzZS1wbHVzCGRhdGFiYXNlDWNvbW1lbnQtbGluZXMMY29tbWVudC1kb3RzC3BhcGVyLXBsYW5lCWV5ZS1zbGFzaANleWUJbGlnaHRidWxiBGZsYWcDdGFnCHBvc2l0aW9uCGxvY2F0aW9uA21hcAhpbmJveC1pbgNib3gMZGF0YWJhc2Utc2V0C2xheWVyLWdyb3VwCHdpbmQtY3J5CndpbmQtc21pbGUGdW5sb2NrBGxvY2sLYWxpZ24tcmlnaHQKYWxpZ24tbGVmdA1ib3JkZXItYm90dG9tCmJvcmRlci10b3AMYWxpZ24tY2VudGVyD2JvcmRlci12ZXJ0aWNsZQpwaWMtY2VudGVyCHBpYy1zaWRlC2ZvbGRlci1vcGVuC2ZvbGRlci1wbHVzBmZvbGRlcglmaWxlLVNRTDEJZmlsZS1wbHVzBGZpbGUEY29weQdoZWFkc2V0BXBob25lC3BhdXNlY2lyY2xlCnN0b3BjaXJjbGUKcGxheWNpcmNsZQZkZWxldGUHcGljdHVyZQRtYWlsBGxpa2UKY29sbGVjdGlvbgp1c2VyLWdyb3VwDGFjY291bnQtcGx1cwdhY2NvdW50A2NvZwVjbG9jawxjYWxlbmRhci1hbHQNY2xvdWRkb3dubG9hZAtjbG91ZHVwbG9hZAhleGNoYW5nZQtpbmZvLWNpcmNsZQ9xdWVzdGlvbi1jaXJjbGUSZXhjbGFtYXRpb24tY2lyY2xlDG1pbnVzLWNpcmNsZQtwbHVzLWNpcmNsZQx0aW1lcy1jaXJjbGUMY2hlY2stY2lyY2xlDGNvbXByZXNzLWFsdApleHBhbmQtYWx0A2JhbgVtaW51cwRwbHVzBXRpbWVzBWNoZWNrDHNlYXJjaC1taW51cwtzZWFyY2gtcGx1cwZzZWFyY2gFcmVwbHkEdW5kbwRyZWRvDWV4dGVybmFsLWxpbmsKYXJyb3dzLWFsdAZpbmRlbnQHb3V0ZGVudAlzb3J0LWxpbmUGc3dpdGNoD3dpbmQtZGVzY2VuZGluZw53aW5kLWFzY2VuZGluZwhkb3dubG9hZAZ1cGxvYWQPYXJyb3ctdG8tYm90dG9tDGFycm93LXRvLXRvcA9sb25nLWFycm93LWRvd24NbG9uZy1hcnJvdy11cAthcnJvdy1yaWdodAphcnJvdy1sZWZ0BHNvcnQJc29ydC1kb3duB3NvcnQtdXALY2FyZXQtcmlnaHQKY2FyZXQtbGVmdAhhcnJvd3MtdhFhbmdsZS1kb3VibGUtZG93bg9hbmdsZS1kb3VibGUtdXASYW5nbGUtZG91YmxlLXJpZ2h0EWFuZ2xlLWRvdWJsZS1sZWZ0CmFuZ2xlLWRvd24IYW5nbGUtdXALYW5nbGUtcmlnaHQKYW5nbGUtbGVmdAlwYXBlcmNsaXAKY29ubmVjdGlvbgh0cmFpbmluZwdwcm9jZXNzBG5ld3MEc2F2ZQVwcmludAxuZXctcmVsZWFzZXMHcmVsZWFzZQVhbGVydAliYWNrc3BhY2UDZ2VtCGludGVncmFsC3N0YXItY2lyY2xlC3VzZXItY2lyY2xlEmNsb3VkLW1hY2hpbmUtZmlsbA1jbG91ZC1tYWNoaW5lDXRlcm1pbmFsLWZpbGwIdGVybWluYWwSc2hvcHBpbmctY2FydC1maWxsCHJlc291cmNlBHJhbmsIc3luYy1hbHQHY29tcGFzcxJhcnJvdy1hbHQtZnJvbS10b3AUYXJyb3ctYWx0LWZyb20tYm90dG8EbWVudQlpY29uLWRyYWcNZWFybHktd2FybmluZwVzaGFyZQZzaGFyZTELbWFuYWdlbWVudC0KYWNjZXNza2V5cxNhcnJvdy1zb3J0ZG93bi1zbWFsEW1pbnVzLXNxdWFyZS1maWxsEHBsdXMtc3F1YXJlLWZpbGwMbWludXMtc3F1YXJlC3BsdXMtc3F1YXJlCHN0ZXBtb2RlDXNjcm9sbGluZ21vZGUMc2hvcHBpbmdjYXJ0DHdhaXRpbmctZmlsbAd3YWl0aW5nEHJpZ2h0LWFycm93LXJlY3QPbGVmdC1hcnJvdy1yZWN0BGJlbGwPc3RydWN0dXJlZC1kYXRhBGRyYWcGdmVjdG9yEWVsbGlwc2lzLXZlcnRpY2FsCE5FVy1jb3B5DGdhbGxlcnktdmlldwhIT1QtY29weQRXSUZJBGhvbWUKYnVnLXJlcG9ydAptb25pdG9yaW5nBnFyY29kZQhkaWFnbm9zZQRzY2FuB2xvYWRpbmcDY3V0DkRpcmVjdG9yeS10cmVlBGdpZnQLYXBwbGljYXRpb24EbGluaxBhcHBsaWNhdGlvbmdyb3VwCHBvd2Vyb2ZmA2tleRJzYWZldHktY2VydGlmaWNhdGUJc3VwZXJ2aXNlDHRhZy1zdWJzY2lwdA1jaGFydC1waWUtYWx0DmNoYXJ0LXJlbGF0aW9uEmNoYXJ0LXNjYXR0ZXItcGxvdApjaGFydC1hcmVhCmNoYXJ0LWxpbmUJY2hhcnQtYmFyAAA=";
  var _sfc_main$4 = /* @__PURE__ */ (0, import_vue.defineComponent)({
    __name: "tm-icon",
    props: __spreadProps(__spreadValues({}, custom_props), {
      fontSize: {
        type: [Number],
        default: 34
      },
      color: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        default: ""
      },
      spin: {
        type: [Boolean],
        defalut: true
      },
      unit: {
        type: String,
        default: "rpx"
      },
      lineHeight: {
        type: [Number],
        default: -1
      }
    }),
    emits: ["click", "longpress"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      var domModule = weex.requireModule("dom");
      const Binding = requireNativePlugin("bindingx");
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = (0, import_vue.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = (0, import_vue.computed)(() => store.tmStore);
      const customCSSStyle = (0, import_vue.computed)(() => computedStyle(props));
      const customClass = (0, import_vue.computed)(() => computedClass(props));
      const isDark = (0, import_vue.computed)(() => computedDark(props, tmcfg.value));
      (0, import_vue.computed)(() => computedTheme(props, isDark.value, tmcfg.value));
      function clickhandle(e) {
        emits("click", e);
      }
      const appTextColor = (0, import_vue.inject)("appTextColor", (0, import_vue.computed)(() => void 0));
      const textColor = (0, import_vue.computed)(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = theme.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = theme.getColor(props.color);
          return nowcolor.csscolor;
        }
        if (appTextColor.value)
          return appTextColor.value;
        return "rgba(34, 34, 34, 1.0)";
      });
      const fontSizeComputed = (0, import_vue.computed)(() => {
        return { fontSize: (props.fontSize || 30) + props.unit, lineHeight: props.lineHeight > -1 ? props.lineHeight + props.unit : (props.fontSize || 30) + props.unit };
      });
      (0, import_vue.computed)(() => {
        let prefix = props.name.split("-")[0];
        return prefix;
      });
      const iconComputed = (0, import_vue.computed)(() => {
        let name2 = props.name.substr(props.name.indexOf("-") + 1);
        let itemIcon = fontList.glyphs.find((item, index2) => {
          return item.font_class == name2;
        });
        if (itemIcon) {
          return JSON.parse('"\\u' + String(itemIcon.unicode) + '"');
        }
        return props.name;
      });
      const isImg = (0, import_vue.computed)(() => {
        if (props.name[0] == "." || props.name[0] == "/" || props.name.substring(0, 5) == "data:" || props.name.substring(0, 4) == "http" || props.name.substring(0, 5) == "https" || props.name.substring(0, 3) == "ftp") {
          return true;
        }
        return false;
      });
      const spinComputed = (0, import_vue.computed)(() => props.spin);
      const custom_space_size = (0, import_vue.inject)("custom_space_size", [0, 0]);
      (0, import_vue.computed)(() => Math.ceil(props.fontSize || 34) + custom_space_size[0]);
      (0, import_vue.computed)(() => Math.ceil(props.fontSize || 34) + custom_space_size[1]);
      const bindxToken = (0, import_vue.ref)(null);
      function getEl(el) {
        if (typeof el === "string" || typeof el === "number")
          return el;
        if (WXEnvironment) {
          return el.ref;
        } else {
          return el instanceof HTMLElement ? el : el.$el;
        }
      }
      function spinNvueAni() {
        if (!(proxy == null ? void 0 : proxy.$refs["icon"]))
          return;
        let icon = getEl(proxy.$refs.icon);
        Binding.bind({
          eventType: "timing",
          exitExpression: "t>1200",
          props: [
            {
              element: icon,
              property: "transform.rotate",
              expression: "linear(t,0,360,1200)"
            }
          ]
        }, function(res) {
          if (res.state === "exit") {
            spinNvueAni();
          }
          bindxToken.value = res.token;
        });
      }
      (0, import_vue.watch)(spinComputed, () => {
        Binding.unbindAll();
        if (val) {
          (0, import_vue.nextTick)(function() {
            spinNvueAni();
          });
        }
      });
      (0, import_vue.onBeforeMount)(() => {
        domModule.addRule("fontFace", {
          fontFamily: "tmicon",
          src: "url('data:font/ttf;charset=utf-8;base64," + tmiconFont + "')"
        });
      });
      (0, import_vue.onMounted)(() => {
        if (spinComputed.value) {
          spinNvueAni();
        }
      });
      (0, import_vue.onUnmounted)(() => {
        if (bindxToken.value) {
          Binding.unbind({
            token: bindxToken.value,
            eventType: "timing"
          });
        }
      });
      return (_ctx, _cache) => {
        return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
          renderWhole: true,
          class: "flex flex-row flex-row-center-center",
          style: (0, import_vue.normalizeStyle)([{
            marginRight: (0, import_vue.unref)(custom_space_size)[0] + "rpx",
            marginBottom: (0, import_vue.unref)(custom_space_size)[1] + "rpx"
          }])
        }, [
          !(0, import_vue.unref)(isImg) ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("u-text", {
            key: 0,
            renderWhole: true,
            ref: "icon",
            onClick: clickhandle,
            onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
            class: (0, import_vue.normalizeClass)([(0, import_vue.unref)(spinComputed) ? "spin" : "", "text-size-n d-inline-block ", "tmicon", (0, import_vue.unref)(customClass)]),
            style: (0, import_vue.normalizeStyle)([{ fontFamily: "tmicon", color: (0, import_vue.unref)(textColor) }, (0, import_vue.unref)(fontSizeComputed), (0, import_vue.unref)(customCSSStyle)])
          }, (0, import_vue.toDisplayString)((0, import_vue.unref)(iconComputed)), 39)) : (0, import_vue.createCommentVNode)("v-if", true),
          (0, import_vue.unref)(isImg) ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("u-image", {
            key: 1,
            renderWhole: true,
            onClick: clickhandle,
            onLongpress: _cache[1] || (_cache[1] = ($event) => emits("longpress", $event)),
            ref: "icon",
            src: (0, import_vue.unref)(iconComputed),
            class: (0, import_vue.normalizeClass)([(0, import_vue.unref)(spinComputed) ? "spin" : "", (0, import_vue.unref)(customClass)]),
            style: (0, import_vue.normalizeStyle)([{ width: (props.fontSize || 30) + props.unit, height: (props.fontSize || 30) + props.unit }, (0, import_vue.unref)(customCSSStyle)])
          }, null, 46, ["src"])) : (0, import_vue.createCommentVNode)("v-if", true)
        ], 4);
      };
    }
  });
  var tmIcon = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-icon/tm-icon.vue"]]);
  var _style_0$1 = { "fade": { "": { "opacity": 0 } }, "fade-reverse": { "": { "opacity": 1 } }, "up": { "": { "transform": "translate3d(0,0%0)" } }, "up-reverse": { "": { "transform": "translateY(-101%)" } }, "down": { "": { "transform": "translateY(0%)" } }, "down-reverse": { "": { "transform": "translateY(101%)" } }, "left": { "": { "transform": "translateX(0%)" } }, "left-reverse": { "": { "transform": "translateX(-101%)" } }, "right": { "": { "transform": "translateX(0%)" } }, "right-reverse": { "": { "transform": "translateX(101%)" } }, "zoom": { "": { "transform": "scale(0.7, 0.7)", "opacity": 0 } }, "zoom-reverse": { "": { "transform": "scale(1, 1)", "opacity": 1 } } };
  var _sfc_main$3 = /* @__PURE__ */ (0, import_vue.defineComponent)({
    __name: "tm-translate",
    props: __spreadProps(__spreadValues({}, custom_props), {
      duration: {
        type: Number,
        default: 300
      },
      delay: {
        type: Number,
        default: 0
      },
      name: {
        type: String,
        default: "fade"
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      height: {
        type: [Number, String],
        default: 0
      },
      width: {
        type: [Number, String],
        default: 0
      },
      reverse: {
        type: [Boolean, String],
        default: false
      },
      initByWechat: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["start", "end", "click"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const Binding = requireNativePlugin("bindingx");
      const dom = requireNativePlugin("dom");
      function hanlder(e) {
        emits("click", e);
      }
      const proxy = (_b2 = (_a2 = (0, import_vue.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = (0, import_vue.computed)(() => computedStyle(props));
      const customClass = (0, import_vue.computed)(() => computedClass(props));
      const computedHeight = (0, import_vue.computed)(() => {
        if (!props.height || !Number(props.height)) {
          return 0;
        }
        if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
          return String(props.height);
        }
        return String(props.height) + "rpx";
      });
      const computedWidth = (0, import_vue.computed)(() => {
        if (!props.width) {
          return 0;
        }
        if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
          return props.width;
        }
        return props.width + "rpx";
      });
      const animationName = (0, import_vue.computed)(() => props.name || "fade");
      const durationtos = (0, import_vue.computed)(() => props.duration);
      const computedReverse = (0, import_vue.computed)(() => props.reverse);
      const reverseAniPrefxname = (0, import_vue.computed)(() => computedReverse.value ? "-reverse" : "");
      const animationStatus = (0, import_vue.ref)(0);
      const tmid = (0, import_vue.ref)(Number(uni.$tm.u.getUid(3)));
      const isLoadEl = (0, import_vue.ref)(false);
      const animationData = (0, import_vue.ref)(null);
      (0, import_vue.watch)(() => props.initByWechat, () => {
        reset();
      });
      function init() {
        (0, import_vue.nextTick)(() => {
          isLoadEl.value = true;
          if (props.autoPlay == true && !props.disabled) {
            play();
          }
        });
      }
      function play() {
        if (props.disabled == true)
          return;
        animationStatus.value = 0;
        clearTimeout(tmid.value);
        (0, import_vue.nextTick)(function() {
          tmid.value = setTimeout(function() {
            nvueAmatons();
          }, 50);
        });
      }
      function stop() {
        if (props.disabled == true)
          return;
        clearTimeout(tmid.value);
        animationStatus.value = 0;
      }
      function reset() {
        stop();
        animationStatus.value = 0;
      }
      expose({
        init,
        play,
        stop,
        reset
      });
      function getEl(el) {
        if (typeof el === "string" || typeof el === "number")
          return el;
        if (WXEnvironment) {
          return el.ref;
        } else {
          return el instanceof HTMLElement ? el : el.$el;
        }
      }
      (0, import_vue.onMounted)(() => init());
      (0, import_vue.onUnmounted)(() => {
        clearTimeout(tmid.value);
        animationStatus.value = 0;
      });
      function nvueAmatons() {
        var el = proxy.$refs.nvueElAni;
        let propsAni = {};
        dom.getComponentRect(el, function(res) {
          const {
            width,
            height
          } = res.size;
          let elDom = getEl(el);
          if (animationName.value == "fade") {
            propsAni = {
              exitExpression: `t>${durationtos.value}`,
              props: [{
                element: elDom,
                property: "opacity",
                expression: `linear(t,0,1,${durationtos.value})`
              }]
            };
          } else if (animationName.value == "up") {
            propsAni = {
              exitExpression: `t>${durationtos.value}`,
              props: [{
                element: elDom,
                property: "transform.translateY",
                expression: computedReverse.value ? `easeOutSine(t,-${height},${height},${durationtos.value})` : `linear(t,${0},-${height},${durationtos.value})`
              }]
            };
          } else if (animationName.value == "down") {
            propsAni = {
              exitExpression: `t>${durationtos.value}`,
              props: [{
                element: elDom,
                property: "transform.translateY",
                expression: computedReverse.value ? `easeOutSine(t,${height},-${height},${durationtos.value})` : `linear(t,${0},${height},${durationtos.value})`
              }]
            };
          } else if (animationName.value == "right") {
            propsAni = {
              exitExpression: `t>${durationtos.value}`,
              props: [{
                element: elDom,
                property: "transform.translateX",
                expression: computedReverse.value ? `easeOutSine(t,${width},-${width},${durationtos.value})` : `linear(t,${0},${width},${durationtos.value})`
              }]
            };
          } else if (animationName.value == "left") {
            propsAni = {
              exitExpression: `t>${durationtos.value}`,
              props: [{
                element: elDom,
                property: "transform.translateX",
                expression: computedReverse.value ? `easeOutSine(t,-${width},${width},${durationtos.value})` : `linear(t,${0},-${width},${durationtos.value})`
              }]
            };
          } else if (animationName.value == "zoom") {
            propsAni = {
              exitExpression: `t>${durationtos.value}`,
              props: [
                {
                  element: elDom,
                  property: "transform.scale",
                  expression: computedReverse.value ? `linear(t,1,-0.7,${durationtos.value})` : `linear(t,0.7,0.3,${durationtos.value})`
                },
                {
                  element: elDom,
                  property: "opacity",
                  expression: computedReverse.value ? `linear(t,1,-1,${durationtos.value})` : `linear(t,0,1,${durationtos.value})`
                }
              ]
            };
          }
          emits("start");
          animationStatus.value = 1;
          Binding.bind(__spreadValues({
            eventType: "timing"
          }, propsAni), function(res2) {
            if (res2.state === "exit") {
              emits("end");
              animationStatus.value = 2;
              Binding.unbind({
                token: res2.token,
                eventType: "timing"
              });
            }
          });
        });
      }
      return (_ctx, _cache) => {
        return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
          ref: "bodywk",
          onClick: hanlder,
          class: (0, import_vue.normalizeClass)([(0, import_vue.unref)(customClass), "overflow"]),
          style: (0, import_vue.normalizeStyle)([
            (0, import_vue.unref)(computedHeight) ? { height: (0, import_vue.unref)(computedHeight) } : "",
            (0, import_vue.unref)(computedWidth) ? { width: (0, import_vue.unref)(computedWidth) } : "",
            (0, import_vue.unref)(customCSSStyle)
          ])
        }, [
          isLoadEl.value ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
            key: 0,
            ref: "nvueElAni",
            animation: animationData.value,
            class: (0, import_vue.normalizeClass)([
              "flex-col flex trani",
              (0, import_vue.unref)(animationName) + (0, import_vue.unref)(reverseAniPrefxname),
              (0, import_vue.unref)(customClass)
            ])
          }, [
            (0, import_vue.renderSlot)(_ctx.$slots, "default")
          ], 10, ["animation"])) : (0, import_vue.createCommentVNode)("v-if", true)
        ], 6);
      };
    }
  });
  var tmTranslate = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["styles", [_style_0$1]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-translate/tm-translate.vue"]]);
  var _sfc_main$2 = /* @__PURE__ */ (0, import_vue.defineComponent)({
    __name: "tm-image",
    props: __spreadProps(__spreadValues({}, custom_props), {
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: [Boolean, String],
        default: true
      },
      border: {
        type: Number,
        default: 0
      },
      width: {
        type: [Number],
        default: 200,
        required: true
      },
      height: {
        type: [Number],
        default: 200,
        required: true
      },
      src: {
        type: String,
        default: "",
        required: true
      },
      errorIcon: {
        type: String,
        default: ""
      },
      errorLabel: {
        type: String,
        default: "\u52A0\u8F7D\u9519\u8BEF"
      },
      loadIcon: {
        type: String,
        default: ""
      },
      showLoad: {
        type: Boolean,
        default: true
      },
      preview: {
        type: [Boolean],
        default: false
      },
      extra: {
        type: [Boolean],
        default: false
      },
      extraPosition: {
        type: String,
        default: "in"
      },
      delete: {
        type: [Boolean],
        default: false
      },
      allowDelete: {
        type: [Boolean],
        default: true
      },
      model: {
        type: String,
        default: "scaleToFill"
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["load", "error", "click", "delete", "close"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const aniplay = (0, import_vue.ref)(null);
      const proxy = (_b2 = (_a2 = (0, import_vue.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      if (!props.height && !props.width) {
        formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:156", "\u9519\u8BEF\uFF1A\u56FE\u7247\u5BBD\u5EA6\u548C\u9AD8\u5EA6\u5FC5\u987B\u8BBE\u7F6E\u4E00\u4E2A");
      }
      const img_width = (0, import_vue.computed)(() => {
        return props.width;
      });
      const img_height = (0, import_vue.computed)(() => {
        return props.height - props.padding[1];
      });
      const img_src = (0, import_vue.computed)(() => props.src);
      const loading = (0, import_vue.ref)(true);
      const error = (0, import_vue.ref)(false);
      const isRmove = (0, import_vue.ref)(false);
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
          break;
        } else {
          parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
        }
      }
      const ImagGrupList = (0, import_vue.inject)("ImagGrupList", (0, import_vue.computed)(() => []));
      if (parent == null ? void 0 : parent.pushKey) {
        parent.pushKey({
          width: img_width.value,
          height: img_width.value,
          src: props.src
        });
      }
      (0, import_vue.watch)(img_src, () => {
        loading.value = true;
        error.value = false;
        if (parent == null ? void 0 : parent.pushKey) {
          parent.pushKey({
            width: img_width.value,
            height: img_width.value,
            src: props.src
          });
        }
      });
      function imageLoad(event) {
        loading.value = false;
        emits("load", event);
      }
      function imageError(event) {
        formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:207", "\u56FE\u7247\u52A0\u8F7D\u9519:" + props.src, event);
        error.value = true;
        loading.value = false;
        emits("error", event);
      }
      function imageClick(event) {
        emits("click", event);
        if (props.preview) {
          let list = ImagGrupList.value.length > 0 ? ImagGrupList.value : [props.src];
          uni.previewImage({
            urls: list,
            current: props.src
          });
        }
      }
      function del() {
        return __async(this, null, function* () {
          var _a3, _b3;
          isRmove.value = false;
          if (!props.allowDelete) {
            emits("delete", props.src);
            return;
          }
          if ((_a3 = aniplay.value) == null ? void 0 : _a3.play) {
            (_b3 = aniplay.value) == null ? void 0 : _b3.play();
          } else {
            isRmove.value = true;
            emits("close", props.src);
          }
        });
      }
      function aniEnd() {
        isRmove.value = true;
        emits("close", props.src);
      }
      return (_ctx, _cache) => {
        return !isRmove.value ? ((0, import_vue.openBlock)(), (0, import_vue.createBlock)(tmTranslate, {
          key: 0,
          width: (0, import_vue.unref)(img_width) + props.padding[0] * 2 + props.unit,
          onEnd: aniEnd,
          ref_key: "aniplay",
          ref: aniplay,
          autoPlay: false,
          name: "zoom",
          reverse: ""
        }, {
          default: (0, import_vue.withCtx)(() => [
            (0, import_vue.createVNode)(__easycom_3, {
              color: props.color,
              transprent: props.transprent,
              margin: props.margin,
              round: props.round,
              border: props.border,
              padding: [props.padding[0], 0],
              class: (0, import_vue.normalizeClass)(["round-" + props.round]),
              width: (0, import_vue.unref)(img_width) - props.padding[0] * 2,
              unit: props.unit
            }, {
              default: (0, import_vue.withCtx)(() => [
                (0, import_vue.createElementVNode)("view", {
                  class: (0, import_vue.normalizeClass)([`pb-${props.padding[1]}`])
                }, [
                  loading.value ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("u-image", {
                    key: 0,
                    src: (0, import_vue.unref)(img_src),
                    style: { "width": "10px", "height": "10px", "opacity": "0", "transform": "translateX(1200px)" },
                    onLoad: imageLoad,
                    onError: imageError,
                    mode: "scaleToFill"
                  }, null, 40, ["src"])) : (0, import_vue.createCommentVNode)("v-if", true),
                  !loading.value && !error.value ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("u-image", {
                    key: 1,
                    onClick: imageClick,
                    class: (0, import_vue.normalizeClass)(["round-" + props.round]),
                    src: (0, import_vue.unref)(img_src),
                    style: (0, import_vue.normalizeStyle)([{ width: (0, import_vue.unref)(img_width) + props.unit, height: (0, import_vue.unref)(img_height) + props.unit }]),
                    mode: props.model
                  }, null, 14, ["src", "mode"])) : (0, import_vue.createCommentVNode)("v-if", true),
                  loading.value && !error.value ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
                    key: 2,
                    style: (0, import_vue.normalizeStyle)([{ width: (0, import_vue.unref)(img_width) + props.unit, height: (0, import_vue.unref)(img_height) + props.unit }]),
                    class: "flex flex-center opacity-3"
                  }, [
                    props.showLoad ? ((0, import_vue.openBlock)(), (0, import_vue.createBlock)(tmIcon, {
                      key: 0,
                      "font-size": 26,
                      spin: "",
                      name: "tmicon-loading"
                    })) : (0, import_vue.createCommentVNode)("v-if", true)
                  ], 4)) : (0, import_vue.createCommentVNode)("v-if", true),
                  !loading.value && error.value ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
                    key: 3,
                    style: (0, import_vue.normalizeStyle)([{ width: (0, import_vue.unref)(img_width) + props.unit, height: (0, import_vue.unref)(img_height) + props.unit }]),
                    class: "flex flex-col flex-center opacity-5"
                  }, [
                    (0, import_vue.createVNode)(tmIcon, { name: "tmicon-exclamation-circle" }),
                    (0, import_vue.createVNode)(__easycom_0, {
                      _class: "pt-10",
                      "font-size": 26,
                      label: props.errorLabel
                    }, null, 8, ["label"])
                  ], 4)) : (0, import_vue.createCommentVNode)("v-if", true),
                  (0, import_vue.createCommentVNode)(" extra "),
                  props.extra ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
                    key: 4,
                    onClick: (0, import_vue.withModifiers)(imageClick, ["stop"]),
                    class: (0, import_vue.normalizeClass)([
                      props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5" : "",
                      "flex flex-col flex-col-bottom-start"
                    ]),
                    style: (0, import_vue.normalizeStyle)([
                      props.extra && props.extraPosition == "in" ? { height: (0, import_vue.unref)(img_height) + props.unit, width: (0, import_vue.unref)(img_width) + props.unit } : "",
                      props.extra && props.extraPosition == "out" ? { width: (0, import_vue.unref)(img_width) + props.unit } : ""
                    ])
                  }, [
                    (0, import_vue.renderSlot)(_ctx.$slots, "extra")
                  ], 14, ["onClick"])) : (0, import_vue.createCommentVNode)("v-if", true),
                  (0, import_vue.createCommentVNode)(" delete \u5C55\u793A\u5220\u9664\u6309\u94AE\u3002 "),
                  props.delete ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
                    key: 5,
                    class: "absolute r-10 t-10 flex flex-col flex-col-center-end zIndex-10",
                    style: (0, import_vue.normalizeStyle)([props.delete ? { width: (0, import_vue.unref)(img_width) + props.unit } : ""])
                  }, [
                    (0, import_vue.createVNode)(tmIcon, {
                      onClick: del,
                      color: "red",
                      name: "tmicon-times-circle-fill"
                    })
                  ], 4)) : (0, import_vue.createCommentVNode)("v-if", true)
                ], 2)
              ]),
              _: 3
            }, 8, ["color", "transprent", "margin", "round", "border", "padding", "class", "width", "unit"])
          ]),
          _: 3
        }, 8, ["width"])) : (0, import_vue.createCommentVNode)("v-if", true);
      };
    }
  });
  var __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-image/tm-image.vue"]]);
  var useTmRouterBefore = (arg) => {
  };
  var useTmRouterAfter = (arg) => {
  };
  var _style_0 = { "menu": { "": { "zIndex": 999, "transform": "translateX(-101%)" } } };
  var _sfc_main$1 = /* @__PURE__ */ (0, import_vue.defineComponent)({
    __name: "tm-app",
    props: __spreadProps(__spreadValues({}, custom_props), {
      theme: {
        type: String,
        default: "grey-5"
      },
      bgImg: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "grey-4"
      },
      darkColor: {
        type: String,
        default: "#050505"
      },
      blur: {
        type: [Boolean, String],
        default: false
      },
      navbar: {
        type: Object,
        default: () => {
          return {
            background: "#ffffff",
            fontColor: "#000000"
          };
        }
      },
      showMenu: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["update:showMenu"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      const props = __props;
      const animation = requireNativePlugin("animation");
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = (0, import_vue.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let pages = getCurrentPages().pop();
      (0, import_vue.nextTick)(() => {
        var _a3;
        useTmRouterBefore({
          path: (_a3 = pages == null ? void 0 : pages.route) != null ? _a3 : "",
          context: proxy
        });
      });
      onLoad((opts) => {
        var _a3;
        useTmRouterAfter({
          path: (_a3 = pages == null ? void 0 : pages.route) != null ? _a3 : "",
          opts,
          context: proxy
        });
      });
      const tmcfg = (0, import_vue.computed)(() => store.tmStore);
      const isSetThemeOk = (0, import_vue.ref)(false);
      const isDark = (0, import_vue.computed)(() => computedDark(props, tmcfg.value));
      const tmcomputed = (0, import_vue.computed)(() => computedTheme(props, isDark.value, tmcfg.value));
      const _showMenu = (0, import_vue.ref)(props.showMenu);
      const sysinfo = uni.getSystemInfoSync();
      const view_width = (0, import_vue.ref)(sysinfo.windowWidth);
      let view_height = (0, import_vue.ref)(sysinfo.windowHeight);
      let nowPage = getCurrentPages().pop();
      let isCustomHeader = false;
      for (let i = 0; i < uni.$tm.pages.length; i++) {
        if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i].path && uni.$tm.pages[i].custom == "custom") {
          isCustomHeader = true;
          break;
        }
      }
      let isTabbarPage = false;
      let barLit = (_d = (_c = uni.$tm.tabBar) == null ? void 0 : _c.list) != null ? _d : [];
      for (let i = 0; i < barLit.length; i++) {
        if ((nowPage == null ? void 0 : nowPage.route) == barLit[i].pagePath) {
          isTabbarPage = true;
          break;
        }
      }
      if (!isCustomHeader) {
        if (sysinfo.osName == "android") {
          view_height.value = ((_f = (_e = sysinfo.safeArea) == null ? void 0 : _e.height) != null ? _f : sysinfo.windowHeight) - 44 - ((_h = (_g = sysinfo.safeAreaInsets) == null ? void 0 : _g.bottom) != null ? _h : 0);
        } else {
          view_height.value = ((_j = (_i = sysinfo.safeArea) == null ? void 0 : _i.height) != null ? _j : sysinfo.windowHeight) - 44;
        }
      } else {
        view_height.value = ((_l = (_k = sysinfo.safeArea) == null ? void 0 : _k.height) != null ? _l : sysinfo.windowHeight) + ((_m = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _m : 0) + ((_o = (_n = sysinfo.safeAreaInsets) == null ? void 0 : _n.bottom) != null ? _o : 0);
      }
      const _blurEffect = (0, import_vue.computed)(() => {
        if (props.blur === true && isDark.value)
          return "dark";
        if (props.blur === true && !isDark.value)
          return "extralight";
        return "none";
      });
      let appConfig = (0, import_vue.ref)({
        width: view_width,
        height: view_height,
        theme: tmcomputed.value.backgroundColor,
        bgImg: props.bgImg,
        dark: isDark.value
      });
      function setAppStyle() {
        var _a3, _b3;
        if (isDark.value) {
          appConfig.value.theme = props.darkColor;
        } else {
          appConfig.value.theme = tmcomputed.value.backgroundColor;
        }
        if ((_b3 = (_a3 = plus == null ? void 0 : plus.webview) == null ? void 0 : _a3.currentWebview()) == null ? void 0 : _b3.setStyle) {
          plus.webview.currentWebview().setStyle({
            background: appConfig.value.theme,
            backgroundColorTop: appConfig.value.theme,
            backgroundColorBottom: appConfig.value.theme,
            userSelect: true,
            webviewBGTransparent: true
          });
        }
        if (sysinfo.osName == "android") {
          var Color = plus.android.importClass("android.graphics.Color");
          plus.android.importClass("android.view.Window");
          var mainActivity = plus.android.runtimeMainActivity();
          var window_android = mainActivity == null ? void 0 : mainActivity.getWindow();
          if (appConfig.value.dark) {
            window_android.setNavigationBarColor(Color.BLACK);
          } else {
            window_android.setNavigationBarColor(Color.WHITE);
          }
        }
        if (isDark.value) {
          if (!isCustomHeader) {
            uni.setNavigationBarColor({
              backgroundColor: appConfig.value.theme,
              frontColor: "#ffffff"
            });
          }
          if (isTabbarPage) {
            uni.setTabBarStyle({
              backgroundColor: "#000000",
              borderStyle: "#1a1a1a",
              color: "#ffffff",
              selectedColor: uni.$tm.tabBar.selectedColor || tmcomputed.value.textColor
            });
          }
        } else {
          if (!isCustomHeader) {
            uni.setNavigationBarColor({
              backgroundColor: props.navbar.background,
              frontColor: props.navbar.fontColor
            });
          }
          if (isTabbarPage) {
            uni.setTabBarStyle({
              backgroundColor: uni.$tm.tabBar.backgroundColor || props.navbar.background,
              borderStyle: uni.$tm.tabBar.borderStyle || "#888888",
              color: uni.$tm.tabBar.color || props.navbar.fontColor,
              selectedColor: uni.$tm.tabBar.selectedColor || tmcomputed.value.textColor
            });
          }
        }
        isSetThemeOk.value = true;
      }
      (0, import_vue.provide)("appTextColor", (0, import_vue.computed)(() => tmcomputed.value.textColor));
      (0, import_vue.provide)("custom_space_size", [0, 0]);
      function setTheme(colorName) {
        store.setTmVuetifyTheme(colorName);
      }
      function setDark(dark2) {
        let maindark = !isDark.value;
        if (typeof dark2 !== "undefined" && typeof dark2 == "boolean") {
          maindark = dark2;
        }
        appConfig.value.dark = maindark;
        store.setTmVuetifyDark(maindark);
      }
      expose({
        setTheme,
        setDark
      });
      (0, import_vue.onBeforeMount)(() => setAppStyle());
      (0, import_vue.watch)(() => props.showMenu, () => {
        _showMenu.value = props.showMenu;
        spinNvueAni();
      });
      (0, import_vue.watch)([() => tmcfg.value.color, isDark], () => {
        isSetThemeOk.value = false;
        setAppStyle();
      });
      function toogleOpen(type) {
        _showMenu.value = type;
        emits("update:showMenu", _showMenu.value);
      }
      function spinNvueAni(reveser = false) {
        if (!(proxy == null ? void 0 : proxy.$refs.bodyEl))
          return;
        var testEl = proxy == null ? void 0 : proxy.$refs.bodyEl;
        animation.transition(testEl, {
          styles: {
            transform: _showMenu.value ? `translateX(70%)   scale(0.8)` : `translateX(0%)  scale(1)`,
            transformOrigin: "center center"
          },
          duration: 200,
          timingFunction: "ease",
          delay: 0
        }, () => {
        });
        setTimeout(function() {
          if (!(proxy == null ? void 0 : proxy.$refs.menuEl))
            return;
          var testElx = proxy == null ? void 0 : proxy.$refs.menuEl;
          animation.transition(testElx, {
            styles: {
              transform: _showMenu.value ? `translateX(0%)` : `translateX(-101%)`,
              transformOrigin: "center center"
            },
            duration: 200,
            timingFunction: "ease",
            delay: 0
          }, () => {
          });
        }, 50);
      }
      return (_ctx, _cache) => {
        return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
          class: "flex flex-col relative",
          style: (0, import_vue.normalizeStyle)([(0, import_vue.unref)(appConfig).theme ? { background: (0, import_vue.unref)(appConfig).theme } : "", { width: (0, import_vue.unref)(appConfig).width + "px", minHeight: (0, import_vue.unref)(appConfig).height + "px" }])
        }, [
          (0, import_vue.createElementVNode)("view", {
            class: (0, import_vue.normalizeClass)([[__props.blur ? "blur" : ""], "flex flex-col flex-1"]),
            ref: "bodyEl",
            style: (0, import_vue.normalizeStyle)([
              {
                zIndex: 1,
                width: (0, import_vue.unref)(appConfig).width + "px",
                minHeight: (0, import_vue.unref)(appConfig).height + "px"
              },
              __props.blur ? { backgroundColor: (0, import_vue.unref)(isDark) ? "rgba(0,0,0,0.3)" : "rgba(248, 248, 248, 0.7)" } : ""
            ])
          }, [
            (0, import_vue.renderSlot)(_ctx.$slots, "default", {}, () => [
              (0, import_vue.createElementVNode)("u-text", null, "\u5728\u8FD9\u91CC\u653E\u7F6E\u5185\u5BB9")
            ])
          ], 6),
          (0, import_vue.createElementVNode)("view", {
            blurEffect: (0, import_vue.unref)(_blurEffect),
            onClick: _cache[1] || (_cache[1] = (0, import_vue.withModifiers)(($event) => toogleOpen(false), ["stop"])),
            ref: "menuEl",
            class: (0, import_vue.normalizeClass)([[_showMenu.value ? "menuOn" : ""], "fixed l-0 t-0 menu"]),
            style: (0, import_vue.normalizeStyle)({ width: (0, import_vue.unref)(appConfig).width + "px", height: (0, import_vue.unref)(appConfig).height + "px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" })
          }, [
            (0, import_vue.createElementVNode)("view", {
              style: (0, import_vue.normalizeStyle)({ width: (0, import_vue.unref)(appConfig).width * 0.7 + "px", height: (0, import_vue.unref)(appConfig).height + "px", boxShadow: "3px 0 16px rgba(0,0,0,0.3)" })
            }, [
              (0, import_vue.createElementVNode)("scroll-view", {
                onClick: _cache[0] || (_cache[0] = (0, import_vue.withModifiers)(() => {
                }, ["stop"])),
                scrollY: true,
                style: (0, import_vue.normalizeStyle)({ width: (0, import_vue.unref)(appConfig).width * 0.7 + "px", height: (0, import_vue.unref)(appConfig).height + "px" })
              }, [
                (0, import_vue.renderSlot)(_ctx.$slots, "menu", {
                  sys: { width: (0, import_vue.unref)(appConfig).width * 0.7, height: (0, import_vue.unref)(appConfig).height, statusBarHeight: (0, import_vue.unref)(sysinfo).statusBarHeight }
                })
              ], 4)
            ], 4)
          ], 14, ["blurEffect"])
        ], 4);
      };
    }
  });
  var __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-app/tm-app.vue"]]);
  var _sfc_main = /* @__PURE__ */ (0, import_vue.defineComponent)({
    __name: "tm-divider",
    props: __spreadProps(__spreadValues({}, custom_props), {
      color: {
        type: String,
        default: "grey-3"
      },
      fontColor: {
        type: String,
        default: "grey-1"
      },
      fontSize: {
        type: Number,
        default: 26
      },
      vertical: {
        type: [Boolean],
        default: false
      },
      height: {
        type: [Number, String],
        default: 26
      },
      label: {
        type: String,
        default: ""
      },
      align: {
        type: String,
        default: "center"
      },
      margin: {
        type: Array,
        default: () => [16, 24]
      },
      border: {
        type: [Number],
        default: 1
      },
      realColor: {
        type: [Boolean],
        default: false
      }
    }),
    setup(__props) {
      var _a2, _b2;
      const props = __props;
      const store = useTmpiniaStore();
      const borderDir = (0, import_vue.computed)(() => props.vertical ? "left" : "bottom");
      (_b2 = (_a2 = (0, import_vue.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = (0, import_vue.computed)(() => store.tmStore);
      const isDark = (0, import_vue.computed)(() => computedDark(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), tmcfg.value));
      const tmcomputed = (0, import_vue.computed)(() => computedTheme(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), isDark.value, tmcfg.value));
      return (_ctx, _cache) => {
        return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", null, [
          !props.label || props.vertical ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
            key: 0,
            style: (0, import_vue.normalizeStyle)([{ backgroundColor: props.realColor ? (0, import_vue.unref)(tmcomputed).color : (0, import_vue.unref)(tmcomputed).border }, props.vertical ? { width: props.border + "rpx", height: props.height + "rpx" } : ""]),
            class: (0, import_vue.normalizeClass)([props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`])
          }, null, 6)) : (0, import_vue.createCommentVNode)("v-if", true),
          __props.label && !props.vertical ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
            key: 1,
            class: "flex flex-row flex-center"
          }, [
            (0, import_vue.createElementVNode)("view", {
              style: (0, import_vue.normalizeStyle)([(0, import_vue.unref)(tmcomputed) ? { backgroundColor: props.realColor ? (0, import_vue.unref)(tmcomputed).color : (0, import_vue.unref)(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: (0, import_vue.normalizeClass)([`my-${props.margin[1]}`, __props.align == "left" ? "flex-2" : "", __props.align == "right" ? "flex-10" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6),
            (0, import_vue.createElementVNode)("view", {
              class: (0, import_vue.normalizeClass)([(0, import_vue.unref)(isDark) ? "opacity-4" : ""])
            }, [
              (0, import_vue.createVNode)(__easycom_0, {
                fontSize: props.fontSize,
                dark: (0, import_vue.unref)(isDark),
                followTheme: props.followTheme,
                color: props.fontColor,
                label: props.label,
                _class: ["mx-32"]
              }, null, 8, ["fontSize", "dark", "followTheme", "color", "label"])
            ], 2),
            (0, import_vue.createElementVNode)("view", {
              style: (0, import_vue.normalizeStyle)([(0, import_vue.unref)(tmcomputed) ? { backgroundColor: props.realColor ? (0, import_vue.unref)(tmcomputed).color : (0, import_vue.unref)(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: (0, import_vue.normalizeClass)([`my-${props.margin[1]}`, __props.align == "left" ? "flex-10" : "", __props.align == "right" ? "flex-2" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6)
          ])) : (0, import_vue.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-divider/tm-divider.vue"]]);

  // dist/dev/.nvue/pages/index/index.js
  var import_vue4 = __toESM(require_vue());

  // dist/dev/.nvue/tm-cell.js
  var import_vue2 = __toESM(require_vue());
  var __defProp3 = Object.defineProperty;
  var __defProps2 = Object.defineProperties;
  var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
  var __hasOwnProp3 = Object.prototype.hasOwnProperty;
  var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues2 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp3.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    if (__getOwnPropSymbols2)
      for (var prop of __getOwnPropSymbols2(b)) {
        if (__propIsEnum2.call(b, prop))
          __defNormalProp2(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
  var language$2 = "English-US";
  var en = {
    language: language$2,
    "index.search.subtext": "Fully compatible with vue3 TypeScript pinia component library",
    "index.search.tips": "Chinese/English name",
    "index.search.btntext": "search",
    "index.com.navtitle": "TMUI All platforms",
    "index.com.title": "Category Navigation",
    "index.com.tongyong": "Universal",
    "index.com.row": "Layout",
    "index.com.show": "Display",
    "index.com.form": "Form",
    "index.com.fd": "Reminder",
    "index.com.nav": "Navigation",
    "index.com.yewu": "Business",
    "index.com.other": "Other",
    "index.com.tubiao": "Chart",
    "index.com.tongyongSub": "can't translate",
    "index.com.rowSub": "can't translate",
    "index.com.showSub": "can't translate",
    "index.com.formSub": "can't translate",
    "index.com.fdSub": "can't translate",
    "index.com.navSub": "can't translate",
    "index.com.yewuSub": "can't translate",
    "index.com.otherSub": "can't translate",
    "index.com.tubiaoSub": "Echarts 5.3.2",
    "index.com.bottom": "tmui 3.0.0 fully compatible",
    "index.com.setLocal": "language setting",
    "index.com.love": "Action support",
    "index.com.loveSub": "Watch an ad",
    "index.com.themetext": "Dynamically switch themes\uFF0Cmore of see docs",
    "index.com.themeGreen": "Yellow",
    "index.com.themeBlue": "Blue",
    "index.com.themeRed": "Red",
    "index.com.themeDefault": "Default",
    "index.com.themeCustText": "custom",
    "message.load.text": "Loading",
    "message.error.text": "Error",
    "message.info.text": "Tips",
    "message.warn.text": "Warning",
    "message.quest.text": "Question",
    "message.success.text": "Success",
    "message.disabled.text": "Disabled",
    "message.wait.text": "Waiting"
  };
  var language$1 = "\u7B80\u4F53-\u4E2D\u56FD";
  var zhHans = {
    language: language$1,
    "index.search.subtext": "\u5168\u7AEF\u517C\u5BB9vue3 TypeScript pinia\u7EC4\u4EF6\u5E93",
    "index.search.tips": "\u7EC4\u4EF6\u4E2D\u6587/\u82F1\u6587\u540D\u79F0",
    "index.search.btntext": "\u641C\u7D22\u7EC4\u4EF6",
    "index.com.navtitle": "TMUI \u5168\u5E73\u53F0\u7EC4\u4EF6\u5E93",
    "index.com.title": "\u5206\u7C7B\u5BFC\u822A",
    "index.com.tongyong": "\u901A\u7528\u7EC4\u4EF6",
    "index.com.tongyongSub": "\u9AD8\u9891\u5E38\u7528\u7EC4\u4EF6",
    "index.com.row": "\u5E03\u5C40\u7EC4\u4EF6",
    "index.com.rowSub": "\u5E03\u5C40\u6392\u7248",
    "index.com.show": "\u5C55\u793A\u7EC4\u4EF6",
    "index.com.showSub": "\u5E38\u89C1\u6570\u636E\u5C55\u793A",
    "index.com.form": "\u8868\u5355\u5F55\u5165",
    "index.com.formSub": "\u6570\u636E\u63D0\u4EA4\u7C7B",
    "index.com.fd": "\u53CD\u9988\u7C7B\u578B",
    "index.com.fdSub": "\u63D0\u793A\u5F39\u5C42\u7C7B\u7EC4\u4EF6",
    "index.com.nav": "\u5BFC\u822A\u7C7B\u578B",
    "index.com.navSub": "\u5206\u9875\u5BFC\u822A\u7C7B",
    "index.com.yewu": "\u4E1A\u52A1\u578B\u7EC4\u4EF6",
    "index.com.yewuSub": "\u4F18\u60E0\u5238\u5BFC\u8D2D\u7C7B",
    "index.com.other": "\u5176\u5B83",
    "index.com.otherSub": "\u529F\u80FD\u578B\u7EC4\u4EF6",
    "index.com.tubiao": "\u56FE\u8868\u7EC4\u4EF6",
    "index.com.tubiaoSub": "Echarts 5.3.2",
    "index.com.bottom": "tmui 3.0.0 \u539F\u751F\u6E32\u67D3\uFF0C\u5168\u7AEF\u517C\u5BB9",
    "index.com.setLocal": "\u8BBE\u7F6E\u8BED\u8A00",
    "index.com.love": "TMUI\u7528\u6237\u4E2D\u5FC3",
    "index.com.loveSub": "\u770B\u5E7F\u544A\u8D5A\u79EF\u5206",
    "index.com.themetext": "\u52A8\u6001\u5207\u6362\u4E3B\u9898,\u9ED8\u8BA4\u4E3B\u9898\u89C1\u6587\u6863",
    "index.com.themeGreen": "\u5C0F\u9EC4",
    "index.com.themeBlue": "\u84DD\u8272",
    "index.com.themeRed": "\u7EA2\u8272",
    "index.com.themeDefault": "\u9ED8\u8BA4",
    "index.com.themeCustText": "\u81EA\u5B9A",
    "message.load.text": "\u52A0\u8F7D\u4E2D",
    "message.error.text": "\u64CD\u4F5C\u9519\u8BEF",
    "message.info.text": "\u63D0\u793A\u4FE1\u606F",
    "message.warn.text": "\u8B66\u544A\u4FE1\u606F",
    "message.quest.text": "\u4F3C\u4E4E\u6709\u95EE\u9898",
    "message.success.text": "\u64CD\u4F5C\u6210\u529F",
    "message.disabled.text": "\u7981\u6B62\u64CD\u4F5C",
    "message.wait.text": "\u8BF7\u7A0D\u5019.."
  };
  var inBrowser = typeof window !== "undefined";
  var mark;
  var measure;
  {
    const perf = inBrowser && window.performance;
    if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
      mark = (tag) => perf.mark(tag);
      measure = (name2, startTag, endTag) => {
        perf.measure(name2, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
      };
    }
  }
  var RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format(message, ...args) {
    if (args.length === 1 && isObject$2(args[0])) {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
      return args.hasOwnProperty(identifier) ? args[identifier] : "";
    });
  }
  var hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  var makeSymbol = (name2) => hasSymbol ? Symbol(name2) : name2;
  var generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  var friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  var isNumber = (val2) => typeof val2 === "number" && isFinite(val2);
  var isDate = (val2) => toTypeString2(val2) === "[object Date]";
  var isRegExp = (val2) => toTypeString2(val2) === "[object RegExp]";
  var isEmptyObject = (val2) => isPlainObject(val2) && Object.keys(val2).length === 0;
  function warn(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  var assign = Object.assign;
  var _globalThis;
  var getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  function hasOwn$2(obj, key) {
    return hasOwnProperty$2.call(obj, key);
  }
  var isArray = Array.isArray;
  var isFunction = (val2) => typeof val2 === "function";
  var isString2 = (val2) => typeof val2 === "string";
  var isBoolean = (val2) => typeof val2 === "boolean";
  var isObject$2 = (val2) => val2 !== null && typeof val2 === "object";
  var objectToString2 = Object.prototype.toString;
  var toTypeString2 = (value) => objectToString2.call(value);
  var isPlainObject = (val2) => toTypeString2(val2) === "[object Object]";
  var toDisplayString2 = (val2) => {
    return val2 == null ? "" : isArray(val2) || isPlainObject(val2) && val2.toString === objectToString2 ? JSON.stringify(val2, null, 2) : String(val2);
  };
  var RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function createEmitter() {
    const events = /* @__PURE__ */ new Map();
    const emitter = {
      events,
      on(event, handler) {
        const handlers = events.get(event);
        const added = handlers && handlers.push(handler);
        if (!added) {
          events.set(event, [handler]);
        }
      },
      off(event, handler) {
        const handlers = events.get(event);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },
      emit(event, payload) {
        (events.get(event) || []).slice().map((handler) => handler(payload));
        (events.get("*") || []).slice().map((handler) => handler(event, payload));
      }
    };
    return emitter;
  }
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn$1(obj, key) {
    return hasOwnProperty$1.call(obj, key);
  }
  var isObject$1 = (val2) => val2 !== null && typeof val2 === "object";
  var pathStateMachine = [];
  pathStateMachine[0] = {
    ["w"]: [0],
    ["i"]: [3, 0],
    ["["]: [4],
    ["o"]: [7]
  };
  pathStateMachine[1] = {
    ["w"]: [1],
    ["."]: [2],
    ["["]: [4],
    ["o"]: [7]
  };
  pathStateMachine[2] = {
    ["w"]: [2],
    ["i"]: [3, 0],
    ["0"]: [3, 0]
  };
  pathStateMachine[3] = {
    ["i"]: [3, 0],
    ["0"]: [3, 0],
    ["w"]: [1, 1],
    ["."]: [2, 1],
    ["["]: [4, 1],
    ["o"]: [7, 1]
  };
  pathStateMachine[4] = {
    ["'"]: [5, 0],
    ['"']: [6, 0],
    ["["]: [
      4,
      2
    ],
    ["]"]: [1, 3],
    ["o"]: 8,
    ["l"]: [4, 0]
  };
  pathStateMachine[5] = {
    ["'"]: [4, 0],
    ["o"]: 8,
    ["l"]: [5, 0]
  };
  pathStateMachine[6] = {
    ['"']: [4, 0],
    ["o"]: 8,
    ["l"]: [6, 0]
  };
  var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
    if (ch === void 0 || ch === null) {
      return "o";
    }
    const code = ch.charCodeAt(0);
    switch (code) {
      case 91:
      case 93:
      case 46:
      case 34:
      case 39:
        return ch;
      case 95:
      case 36:
      case 45:
        return "i";
      case 9:
      case 10:
      case 13:
      case 160:
      case 65279:
      case 8232:
      case 8233:
        return "w";
    }
    return "i";
  }
  function formatSubPath(path) {
    const trimmed = path.trim();
    if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
      return false;
    }
    return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
  }
  function parse$1(path) {
    const keys = [];
    let index2 = -1;
    let mode = 0;
    let subPathDepth = 0;
    let c;
    let key;
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[0] = () => {
      if (key === void 0) {
        key = newChar;
      } else {
        key += newChar;
      }
    };
    actions[1] = () => {
      if (key !== void 0) {
        keys.push(key);
        key = void 0;
      }
    };
    actions[2] = () => {
      actions[0]();
      subPathDepth++;
    };
    actions[3] = () => {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = 4;
        actions[0]();
      } else {
        subPathDepth = 0;
        if (key === void 0) {
          return false;
        }
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[1]();
        }
      }
    };
    function maybeUnescapeQuote() {
      const nextChar = path[index2 + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
        index2++;
        newChar = "\\" + nextChar;
        actions[0]();
        return true;
      }
    }
    while (mode !== null) {
      index2++;
      c = path[index2];
      if (c === "\\" && maybeUnescapeQuote()) {
        continue;
      }
      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap["l"] || 8;
      if (transition === 8) {
        return;
      }
      mode = transition[0];
      if (transition[1] !== void 0) {
        action = actions[transition[1]];
        if (action) {
          newChar = c;
          if (action() === false) {
            return;
          }
        }
      }
      if (mode === 7) {
        return keys;
      }
    }
  }
  var cache = /* @__PURE__ */ new Map();
  function resolveValue(obj, path) {
    if (!isObject$1(obj)) {
      return null;
    }
    let hit = cache.get(path);
    if (!hit) {
      hit = parse$1(path);
      if (hit) {
        cache.set(path, hit);
      }
    }
    if (!hit) {
      return null;
    }
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
      const val2 = last[hit[i]];
      if (val2 === void 0) {
        return null;
      }
      last = val2;
      i++;
    }
    return last;
  }
  function handleFlatJson(obj) {
    if (!isObject$1(obj)) {
      return obj;
    }
    for (const key in obj) {
      if (!hasOwn$1(obj, key)) {
        continue;
      }
      if (!key.includes(".")) {
        if (isObject$1(obj[key])) {
          handleFlatJson(obj[key]);
        }
      } else {
        const subKeys = key.split(".");
        const lastIndex = subKeys.length - 1;
        let currentObj = obj;
        for (let i = 0; i < lastIndex; i++) {
          if (!(subKeys[i] in currentObj)) {
            currentObj[subKeys[i]] = {};
          }
          currentObj = currentObj[subKeys[i]];
        }
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
        if (isObject$1(currentObj[subKeys[lastIndex]])) {
          handleFlatJson(currentObj[subKeys[lastIndex]]);
        }
      }
    }
    return obj;
  }
  var DEFAULT_MODIFIER = (str) => str;
  var DEFAULT_MESSAGE = (ctx) => "";
  var DEFAULT_MESSAGE_DATA_TYPE = "text";
  var DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
  var DEFAULT_INTERPOLATE = toDisplayString2;
  function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
      return choice ? choice > 1 ? 1 : 0 : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
    const index2 = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index2 : index2;
  }
  function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
      props.count = pluralIndex;
    }
    if (!props.n) {
      props.n = pluralIndex;
    }
  }
  function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = isObject$2(options.pluralRules) && isString2(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
    const orgPluralRule = isObject$2(options.pluralRules) && isString2(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
    const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index2) => _list[index2];
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message(key) {
      const msg = isFunction(options.messages) ? options.messages(key) : isObject$2(options.messages) ? options.messages[key] : false;
      return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name2) => options.modifiers ? options.modifiers[name2] : DEFAULT_MODIFIER;
    const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type = isPlainObject(options.processor) && isString2(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
      ["list"]: list,
      ["named"]: named,
      ["plural"]: plural,
      ["linked"]: (key, modifier) => {
        const msg = message(key)(ctx);
        return isString2(modifier) ? _modifier(modifier)(msg) : msg;
      },
      ["message"]: message,
      ["type"]: type,
      ["interpolate"]: interpolate,
      ["normalize"]: normalize
    };
    return ctx;
  }
  var errorMessages$2 = {
    [0]: `Expected token: '{0}'`,
    [1]: `Invalid token in placeholder: '{0}'`,
    [2]: `Unterminated single quote in placeholder`,
    [3]: `Unknown escape sequence: \\{0}`,
    [4]: `Invalid unicode escape sequence: {0}`,
    [5]: `Unbalanced closing brace`,
    [6]: `Unterminated closing brace`,
    [7]: `Empty placeholder`,
    [8]: `Not allowed nest placeholder`,
    [9]: `Invalid linked format`,
    [10]: `Plural must have messages`,
    [11]: `Unexpected empty linked modifier`,
    [12]: `Unexpected empty linked key`,
    [13]: `Unexpected lexical analysis in token: '{0}'`
  };
  function createCompileError(code, loc, options = {}) {
    const { domain, messages, args } = options;
    const msg = format((messages || errorMessages$2)[code] || "", ...args || []);
    const error = new SyntaxError(String(msg));
    error.code = code;
    if (loc) {
      error.location = loc;
    }
    error.domain = domain;
    return error;
  }
  var IntlifyDevToolsHooks = {
    I18nInit: "i18n:init",
    FunctionTranslate: "function:translate"
  };
  var devtools = null;
  function setDevToolsHook(hook) {
    devtools = hook;
  }
  function initI18nDevTools(i18n, version, meta) {
    devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
      timestamp: Date.now(),
      i18n,
      version,
      meta
    });
  }
  var translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
  function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
  }
  var warnMessages$1 = {
    [0]: `Not found '{key}' key in '{locale}' locale messages.`,
    [1]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [2]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [3]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [4]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [5]: `Fall back to datetime format '{key}' key with '{target}' locale.`
  };
  function getWarnMessage$1(code, ...args) {
    return format(warnMessages$1[code], ...args);
  }
  var VERSION$1 = "9.1.9";
  var NOT_REOSLVED = -1;
  var MISSING_RESOLVE_VALUE = "";
  function getDefaultLinkedModifiers() {
    return {
      upper: (val2) => isString2(val2) ? val2.toUpperCase() : val2,
      lower: (val2) => isString2(val2) ? val2.toLowerCase() : val2,
      capitalize: (val2) => isString2(val2) ? `${val2.charAt(0).toLocaleUpperCase()}${val2.substr(1)}` : val2
    };
  }
  var _compiler;
  var _additionalMeta = null;
  var setAdditionalMeta = (meta) => {
    _additionalMeta = meta;
  };
  var getAdditionalMeta = () => _additionalMeta;
  var _cid = 0;
  function createCoreContext(options = {}) {
    const version = isString2(options.version) ? options.version : VERSION$1;
    const locale = isString2(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString2(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const messages = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
    const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
    const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
    const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = isFunction(options.missing) ? options.missing : null;
    const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    const processor = isPlainObject(options.processor) ? options.processor : null;
    const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
    const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
    const internalOptions = options;
    const __datetimeFormatters = isObject$2(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
    const __numberFormatters = isObject$2(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
    const __meta = isObject$2(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
      version,
      cid: _cid,
      locale,
      fallbackLocale,
      messages,
      datetimeFormats,
      numberFormats,
      modifiers,
      pluralRules,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackFormat,
      unresolving,
      postTranslation,
      processor,
      warnHtmlMessage,
      escapeParameter,
      messageCompiler,
      onWarn,
      __datetimeFormatters,
      __numberFormatters,
      __meta
    };
    {
      context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
    }
    {
      initI18nDevTools(context, version, __meta);
    }
    return context;
  }
  function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
  }
  function handleMissing(context, key, locale, missingWarn, type) {
    const { missing, onWarn } = context;
    {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("missing", {
          locale,
          key,
          type,
          groupId: `${type}:${key}`
        });
      }
    }
    if (missing !== null) {
      const ret = missing(context, locale, key, type);
      return isString2(ret) ? ret : key;
    } else {
      if (isTranslateMissingWarn(missingWarn, key)) {
        onWarn(getWarnMessage$1(0, { key, locale }));
      }
      return key;
    }
  }
  function getLocaleChain(ctx, fallback, start) {
    const context = ctx;
    if (!context.__localeChainCache) {
      context.__localeChainCache = /* @__PURE__ */ new Map();
    }
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
      chain = [];
      let block = [start];
      while (isArray(block)) {
        block = appendBlockToChain(chain, block, fallback);
      }
      const defaults = isArray(fallback) ? fallback : isPlainObject(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
      block = isString2(defaults) ? [defaults] : defaults;
      if (isArray(block)) {
        appendBlockToChain(chain, block, false);
      }
      context.__localeChainCache.set(start, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean(follow); i++) {
      const locale = block[i];
      if (isString2(locale)) {
        follow = appendLocaleToChain(chain, block[i], blocks);
      }
    }
    return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split("-");
    do {
      const target = tokens.join("-");
      follow = appendItemToChain(chain, target, blocks);
      tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
  }
  function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
      follow = true;
      if (target) {
        follow = target[target.length - 1] !== "!";
        const locale = target.replace(/!/g, "");
        chain.push(locale);
        if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
          follow = blocks[locale];
        }
      }
    }
    return follow;
  }
  function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = /* @__PURE__ */ new Map();
    getLocaleChain(ctx, fallback, locale);
  }
  function createCoreError(code) {
    return createCompileError(code, null, { messages: errorMessages$1 });
  }
  var errorMessages$1 = {
    [14]: "Invalid arguments",
    [15]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
    [16]: "The argument provided is not a valid ISO date string"
  };
  var NOOP_MESSAGE_FUNCTION = () => "";
  var isMessageFunction = (val2) => isFunction(val2);
  function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    const defaultMsgOrKey = isString2(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
    const locale = isString2(options.locale) ? options.locale : context.locale;
    escapeParameter && escapeParams(options);
    let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
      key,
      locale,
      messages[locale] || {}
    ];
    let cacheBaseKey = key;
    if (!resolvedMessage && !(isString2(format2) || isMessageFunction(format2))) {
      if (enableDefaultMsg) {
        format2 = defaultMsgOrKey;
        cacheBaseKey = format2;
      }
    }
    if (!resolvedMessage && (!(isString2(format2) || isMessageFunction(format2)) || !isString2(targetLocale))) {
      return unresolving ? NOT_REOSLVED : key;
    }
    if (isString2(format2) && context.messageCompiler == null) {
      warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
      return key;
    }
    let occurred = false;
    const errorDetector = () => {
      occurred = true;
    };
    const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
    if (occurred) {
      return format2;
    }
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    const ret = postTranslation ? postTranslation(messaged) : messaged;
    {
      const payloads = {
        timestamp: Date.now(),
        key: isString2(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString2(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
      translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    if (isArray(options.list)) {
      options.list = options.list.map((item) => isString2(item) ? escapeHtml(item) : item);
    } else if (isObject$2(options.named)) {
      Object.keys(options.named).forEach((key) => {
        if (isString2(options.named[key])) {
          options.named[key] = escapeHtml(options.named[key]);
        }
      });
    }
  }
  function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages, onWarn } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    let message = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "translate";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(1, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      message = messages[targetLocale] || {};
      let start = null;
      let startTag;
      let endTag;
      if (inBrowser) {
        start = window.performance.now();
        startTag = "intlify-message-resolve-start";
        endTag = "intlify-message-resolve-end";
        mark && mark(startTag);
      }
      if ((format2 = resolveValue(message, key)) === null) {
        format2 = message[key];
      }
      if (inBrowser) {
        const end = window.performance.now();
        const emitter = context.__v_emitter;
        if (emitter && start && format2) {
          emitter.emit("message-resolve", {
            type: "message-resolve",
            key,
            message: format2,
            time: end - start,
            groupId: `${type}:${key}`
          });
        }
        if (startTag && endTag && mark && measure) {
          mark(endTag);
          measure("intlify message resolve", startTag, endTag);
        }
      }
      if (isString2(format2) || isFunction(format2))
        break;
      const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
      if (missingRet !== key) {
        format2 = missingRet;
      }
      from = to;
    }
    return [format2, targetLocale, message];
  }
  function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format2)) {
      const msg2 = format2;
      msg2.locale = msg2.locale || targetLocale;
      msg2.key = msg2.key || key;
      return msg2;
    }
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-compilation-start";
      endTag = "intlify-message-compilation-end";
      mark && mark(startTag);
    }
    const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-compilation", {
          type: "message-compilation",
          message: format2,
          time: end - start,
          groupId: `${"translate"}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message compilation", startTag, endTag);
      }
    }
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format2;
    return msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-evaluation-start";
      endTag = "intlify-message-evaluation-end";
      mark && mark(startTag);
    }
    const messaged = msg(msgCtx);
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-evaluation", {
          type: "message-evaluation",
          value: messaged,
          time: end - start,
          groupId: `${"translate"}:${msg.key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message evaluation", startTag, endTag);
      }
    }
    return messaged;
  }
  function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!isString2(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
      throw createCoreError(14);
    }
    const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (isNumber(arg2)) {
      options.plural = arg2;
    } else if (isString2(arg2)) {
      options.default = arg2;
    } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
      options.named = arg2;
    } else if (isArray(arg2)) {
      options.list = arg2;
    }
    if (isNumber(arg3)) {
      options.plural = arg3;
    } else if (isString2(arg3)) {
      options.default = arg3;
    } else if (isPlainObject(arg3)) {
      assign(options, arg3);
    }
    return [key, options];
  }
  function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
    return {
      warnHtmlMessage,
      onError: (err) => {
        errorDetector && errorDetector(err);
        {
          const message = `Message compilation error: ${err.message}`;
          const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
          const emitter = context.__v_emitter;
          if (emitter) {
            emitter.emit("compile-error", {
              message: source,
              error: err.message,
              start: err.location && err.location.start.offset,
              end: err.location && err.location.end.offset,
              groupId: `${"translate"}:${key}`
            });
          }
          console.error(codeFrame ? `${message}
${codeFrame}` : message);
        }
      },
      onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
    };
  }
  function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules } = context;
    const resolveMessage = (key) => {
      const val2 = resolveValue(message, key);
      if (isString2(val2)) {
        let occurred = false;
        const errorDetector = () => {
          occurred = true;
        };
        const msg = compileMessageFormat(context, key, locale, val2, key, errorDetector);
        return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
      } else if (isMessageFunction(val2)) {
        return val2;
      } else {
        return NOOP_MESSAGE_FUNCTION;
      }
    };
    const ctxOptions = {
      locale,
      modifiers,
      pluralRules,
      messages: resolveMessage
    };
    if (context.processor) {
      ctxOptions.processor = context.processor;
    }
    if (options.list) {
      ctxOptions.list = options.list;
    }
    if (options.named) {
      ctxOptions.named = options.named;
    }
    if (isNumber(options.plural)) {
      ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
  }
  var intlDefined = typeof Intl !== "undefined";
  var Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
    numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
  };
  function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __datetimeFormatters } = context;
    if (!Availabilities.dateTimeFormat) {
      onWarn(getWarnMessage$1(4));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString2(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString2(key) || key === "") {
      return new Intl.DateTimeFormat(locale).format(value);
    }
    let datetimeFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "datetime format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(5, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      datetimeFormat = datetimeFormats[targetLocale] || {};
      format2 = datetimeFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject(format2) || !isString2(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id2 = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id2 = `${id2}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id2);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
      __datetimeFormatters.set(id2, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    let value;
    if (isString2(arg1)) {
      if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
        throw createCoreError(16);
      }
      value = new Date(arg1);
      try {
        value.toISOString();
      } catch (e) {
        throw createCoreError(16);
      }
    } else if (isDate(arg1)) {
      if (isNaN(arg1.getTime())) {
        throw createCoreError(15);
      }
      value = arg1;
    } else if (isNumber(arg1)) {
      value = arg1;
    } else {
      throw createCoreError(14);
    }
    if (isString2(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString2(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearDateTimeFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id2 = `${locale}__${key}`;
      if (!context.__datetimeFormatters.has(id2)) {
        continue;
      }
      context.__datetimeFormatters.delete(id2);
    }
  }
  function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __numberFormatters } = context;
    if (!Availabilities.numberFormat) {
      onWarn(getWarnMessage$1(2));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString2(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString2(key) || key === "") {
      return new Intl.NumberFormat(locale).format(value);
    }
    let numberFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "number format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(3, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      numberFormat = numberFormats[targetLocale] || {};
      format2 = numberFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject(format2) || !isString2(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id2 = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id2 = `${id2}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id2);
    if (!formatter) {
      formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
      __numberFormatters.set(id2, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    if (!isNumber(arg1)) {
      throw createCoreError(14);
    }
    const value = arg1;
    if (isString2(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString2(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearNumberFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id2 = `${locale}__${key}`;
      if (!context.__numberFormatters.has(id2)) {
        continue;
      }
      context.__numberFormatters.delete(id2);
    }
  }
  var VERSION = "9.1.9";
  function initFeatureFlags() {
    let needWarn = false;
    {
      needWarn = true;
    }
    if (needWarn) {
      console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
    }
  }
  var warnMessages = {
    [6]: `Fall back to {type} '{key}' with root locale.`,
    [7]: `Not supported 'preserve'.`,
    [8]: `Not supported 'formatter'.`,
    [9]: `Not supported 'preserveDirectiveContent'.`,
    [10]: `Not supported 'getChoiceIndex'.`,
    [11]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [12]: `Not found parent scope. use the global scope.`
  };
  function getWarnMessage(code, ...args) {
    return format(warnMessages[code], ...args);
  }
  function createI18nError(code, ...args) {
    return createCompileError(code, null, { messages: errorMessages, args });
  }
  var errorMessages = {
    [14]: "Unexpected return type in composer",
    [15]: "Invalid argument",
    [16]: "Must be called at the top of a `setup` function",
    [17]: "Need to install with `app.use` function",
    [22]: "Unexpected error",
    [18]: "Not available in legacy mode",
    [19]: `Required in value: {0}`,
    [20]: `Invalid value`,
    [21]: `Cannot setup vue-devtools plugin`
  };
  var DEVTOOLS_META = "__INTLIFY_META__";
  var TransrateVNodeSymbol = makeSymbol("__transrateVNode");
  var DatetimePartsSymbol = makeSymbol("__datetimeParts");
  var NumberPartsSymbol = makeSymbol("__numberParts");
  var EnableEmitter = makeSymbol("__enableEmitter");
  var DisableEmitter = makeSymbol("__disableEmitter");
  var SetPluralRulesSymbol = makeSymbol("__setPluralRules");
  makeSymbol("__intlifyMeta");
  var InejctWithOption = makeSymbol("__injectWithOption");
  var composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type) => {
      return missing(locale, key, (0, import_vue2.getCurrentInstance)() || void 0, type);
    };
  }
  function getLocaleMessages(locale, options) {
    const { messages, __i18n } = options;
    const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
    if (isArray(__i18n)) {
      __i18n.forEach(({ locale: locale2, resource }) => {
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      });
    }
    if (options.flatJson) {
      for (const key in ret) {
        if (hasOwn$2(ret, key)) {
          handleFlatJson(ret[key]);
        }
      }
    }
    return ret;
  }
  var isNotObjectOrIsArray = (val2) => !isObject$2(val2) || isArray(val2);
  function deepCopy(src, des) {
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
      throw createI18nError(20);
    }
    for (const key in src) {
      if (hasOwn$2(src, key)) {
        if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
          des[key] = src[key];
        } else {
          deepCopy(src[key], des[key]);
        }
      }
    }
  }
  var getMetaInfo = () => {
    const instance = (0, import_vue2.getCurrentInstance)();
    return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
  };
  function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === void 0;
    let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = (0, import_vue2.ref)(__root && _inheritLocale ? __root.locale.value : isString2(options.locale) ? options.locale : "en-US");
    const _fallbackLocale = (0, import_vue2.ref)(__root && _inheritLocale ? __root.fallbackLocale.value : isString2(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value);
    const _messages = (0, import_vue2.ref)(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = (0, import_vue2.ref)(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
    const _numberFormats = (0, import_vue2.ref)(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
    let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    let _fallbackFormat = !!options.fallbackFormat;
    let _missing = isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
    let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    let _escapeParameter = !!options.escapeParameter;
    const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
    let _pluralRules = options.pluralRules || __root && __root.pluralRules;
    let _context;
    function getCoreContext() {
      return createCoreContext({
        version: VERSION,
        locale: _locale.value,
        fallbackLocale: _fallbackLocale.value,
        messages: _messages.value,
        messageCompiler: function compileToFunction(source) {
          return (ctx) => {
            return ctx.normalize([source]);
          };
        },
        datetimeFormats: _datetimeFormats.value,
        numberFormats: _numberFormats.value,
        modifiers: _modifiers,
        pluralRules: _pluralRules,
        missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
        missingWarn: _missingWarn,
        fallbackWarn: _fallbackWarn,
        fallbackFormat: _fallbackFormat,
        unresolving: true,
        postTranslation: _postTranslation === null ? void 0 : _postTranslation,
        warnHtmlMessage: _warnHtmlMessage,
        escapeParameter: _escapeParameter,
        __datetimeFormatters: isPlainObject(_context) ? _context.__datetimeFormatters : void 0,
        __numberFormatters: isPlainObject(_context) ? _context.__numberFormatters : void 0,
        __v_emitter: isPlainObject(_context) ? _context.__v_emitter : void 0,
        __meta: { framework: "vue" }
      });
    }
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    function trackReactivityValues() {
      return [
        _locale.value,
        _fallbackLocale.value,
        _messages.value,
        _datetimeFormats.value,
        _numberFormats.value
      ];
    }
    const locale = (0, import_vue2.computed)({
      get: () => _locale.value,
      set: (val2) => {
        _locale.value = val2;
        _context.locale = _locale.value;
      }
    });
    const fallbackLocale = (0, import_vue2.computed)({
      get: () => _fallbackLocale.value,
      set: (val2) => {
        _fallbackLocale.value = val2;
        _context.fallbackLocale = _fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, val2);
      }
    });
    const messages = (0, import_vue2.computed)(() => _messages.value);
    const datetimeFormats = (0, import_vue2.computed)(() => _datetimeFormats.value);
    const numberFormats = (0, import_vue2.computed)(() => _numberFormats.value);
    function getPostTranslationHandler() {
      return isFunction(_postTranslation) ? _postTranslation : null;
    }
    function setPostTranslationHandler(handler) {
      _postTranslation = handler;
      _context.postTranslation = handler;
    }
    function getMissingHandler() {
      return _missing;
    }
    function setMissingHandler(handler) {
      if (handler !== null) {
        _runtimeMissing = defineCoreMissingHandler(handler);
      }
      _missing = handler;
      _context.missing = _runtimeMissing;
    }
    function isResolvedTranslateMessage(type, arg) {
      return type !== "translate" || !!arg.resolvedMessage === false;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
      trackReactivityValues();
      let ret;
      {
        try {
          setAdditionalMeta(getMetaInfo());
          ret = fn(_context);
        } finally {
          setAdditionalMeta(null);
        }
      }
      if (isNumber(ret) && ret === NOT_REOSLVED) {
        const [key, arg2] = argumentParser();
        if (__root && isString2(key) && isResolvedTranslateMessage(warnType, arg2)) {
          if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
            warn(getWarnMessage(6, {
              key,
              type: warnType
            }));
          }
          {
            const { __v_emitter: emitter } = _context;
            if (emitter && _fallbackRoot) {
              emitter.emit("fallback", {
                type: warnType,
                key,
                to: "global",
                groupId: `${warnType}:${key}`
              });
            }
          }
        }
        return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
      } else if (successCondition(ret)) {
        return ret;
      } else {
        throw createI18nError(14);
      }
    }
    function t(...args) {
      return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val2) => isString2(val2));
    }
    function rt(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject$2(arg3)) {
        throw createI18nError(15);
      }
      return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
    }
    function d(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val2) => isString2(val2));
    }
    function n(...args) {
      return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val2) => isString2(val2));
    }
    function normalize(values) {
      return values.map((val2) => isString2(val2) ? (0, import_vue2.createVNode)(import_vue2.Text, null, val2, 0) : val2);
    }
    const interpolate = (val2) => val2;
    const processor = {
      normalize,
      interpolate,
      type: "vnode"
    };
    function transrateVNode(...args) {
      return wrapWithDeps((context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = translate(_context2, ...args);
        } finally {
          _context2.processor = null;
        }
        return ret;
      }, () => parseTranslateArgs(...args), "translate", (root) => root[TransrateVNodeSymbol](...args), (key) => [(0, import_vue2.createVNode)(import_vue2.Text, null, key, 0)], (val2) => isArray(val2));
    }
    function numberParts(...args) {
      return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), () => [], (val2) => isString2(val2) || isArray(val2));
    }
    function datetimeParts(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), () => [], (val2) => isString2(val2) || isArray(val2));
    }
    function setPluralRules(rules) {
      _pluralRules = rules;
      _context.pluralRules = _pluralRules;
    }
    function te(key, locale2) {
      const targetLocale = isString2(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      return resolveValue(message, key) !== null;
    }
    function resolveMessages(key) {
      let messages2 = null;
      const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i = 0; i < locales.length; i++) {
        const targetLocaleMessages = _messages.value[locales[i]] || {};
        const messageValue = resolveValue(targetLocaleMessages, key);
        if (messageValue != null) {
          messages2 = messageValue;
          break;
        }
      }
      return messages2;
    }
    function tm(key) {
      const messages2 = resolveMessages(key);
      return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
    }
    function getLocaleMessage(locale2) {
      return _messages.value[locale2] || {};
    }
    function setLocaleMessage(locale2, message) {
      _messages.value[locale2] = message;
      _context.messages = _messages.value;
    }
    function mergeLocaleMessage(locale2, message) {
      _messages.value[locale2] = _messages.value[locale2] || {};
      deepCopy(message, _messages.value[locale2]);
      _context.messages = _messages.value;
    }
    function getDateTimeFormat(locale2) {
      return _datetimeFormats.value[locale2] || {};
    }
    function setDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = format2;
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function mergeDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function getNumberFormat(locale2) {
      return _numberFormats.value[locale2] || {};
    }
    function setNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = format2;
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    function mergeNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    composerID++;
    if (__root) {
      (0, import_vue2.watch)(__root.locale, (val2) => {
        if (_inheritLocale) {
          _locale.value = val2;
          _context.locale = val2;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
      (0, import_vue2.watch)(__root.fallbackLocale, (val2) => {
        if (_inheritLocale) {
          _fallbackLocale.value = val2;
          _context.fallbackLocale = val2;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
    }
    const composer = {
      id: composerID,
      locale,
      fallbackLocale,
      get inheritLocale() {
        return _inheritLocale;
      },
      set inheritLocale(val2) {
        _inheritLocale = val2;
        if (val2 && __root) {
          _locale.value = __root.locale.value;
          _fallbackLocale.value = __root.fallbackLocale.value;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      },
      get availableLocales() {
        return Object.keys(_messages.value).sort();
      },
      messages,
      datetimeFormats,
      numberFormats,
      get modifiers() {
        return _modifiers;
      },
      get pluralRules() {
        return _pluralRules || {};
      },
      get isGlobal() {
        return _isGlobal;
      },
      get missingWarn() {
        return _missingWarn;
      },
      set missingWarn(val2) {
        _missingWarn = val2;
        _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val2) {
        _fallbackWarn = val2;
        _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val2) {
        _fallbackRoot = val2;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val2) {
        _fallbackFormat = val2;
        _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val2) {
        _warnHtmlMessage = val2;
        _context.warnHtmlMessage = val2;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val2) {
        _escapeParameter = val2;
        _context.escapeParameter = val2;
      },
      t,
      rt,
      d,
      n,
      te,
      tm,
      getLocaleMessage,
      setLocaleMessage,
      mergeLocaleMessage,
      getDateTimeFormat,
      setDateTimeFormat,
      mergeDateTimeFormat,
      getNumberFormat,
      setNumberFormat,
      mergeNumberFormat,
      getPostTranslationHandler,
      setPostTranslationHandler,
      getMissingHandler,
      setMissingHandler,
      [TransrateVNodeSymbol]: transrateVNode,
      [NumberPartsSymbol]: numberParts,
      [DatetimePartsSymbol]: datetimeParts,
      [SetPluralRulesSymbol]: setPluralRules,
      [InejctWithOption]: options.__injectWithOption
    };
    {
      composer[EnableEmitter] = (emitter) => {
        _context.__v_emitter = emitter;
      };
      composer[DisableEmitter] = () => {
        _context.__v_emitter = void 0;
      };
    }
    return composer;
  }
  var baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: (val2) => val2 === "parent" || val2 === "global",
      default: "parent"
    },
    i18n: {
      type: Object
    }
  };
  ({
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        validator: (val2) => isNumber(val2) || !isNaN(val2)
      }
    }, baseFormatProps),
    setup(props, context) {
      const { slots, attrs } = context;
      const i18n = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      const keys = Object.keys(slots).filter((key) => key !== "_");
      return () => {
        const options = {};
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString2(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign({}, attrs);
        return isString2(props.tag) ? (0, import_vue2.h)(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? (0, import_vue2.h)(props.tag, assignedAttrs, children) : (0, import_vue2.h)(import_vue2.Fragment, assignedAttrs, children);
      };
    }
  });
  function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === "default") {
      return slots.default ? slots.default() : [];
    } else {
      return keys.reduce((arg, key) => {
        const slot = slots[key];
        if (slot) {
          arg[key] = slot();
        }
        return arg;
      }, {});
    }
  }
  function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
      const options = { part: true };
      let overrides = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (isString2(props.format)) {
        options.key = props.format;
      } else if (isObject$2(props.format)) {
        if (isString2(props.format.key)) {
          options.key = props.format.key;
        }
        overrides = Object.keys(props.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
        }, {});
      }
      const parts = partFormatter(...[props.value, options, overrides]);
      let children = [options.key];
      if (isArray(parts)) {
        children = parts.map((part, index2) => {
          const slot = slots[part.type];
          return slot ? slot({ [part.type]: part.value, index: index2, parts }) : [part.value];
        });
      } else if (isString2(parts)) {
        children = [parts];
      }
      const assignedAttrs = assign({}, attrs);
      return isString2(props.tag) ? (0, import_vue2.h)(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? (0, import_vue2.h)(props.tag, assignedAttrs, children) : (0, import_vue2.h)(import_vue2.Fragment, assignedAttrs, children);
    };
  }
  var NUMBER_FORMAT_KEYS = [
    "localeMatcher",
    "style",
    "unit",
    "unitDisplay",
    "currency",
    "currencyDisplay",
    "useGrouping",
    "numberingSystem",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
    "notation",
    "formatMatcher"
  ];
  ({
    name: "i18n-n",
    props: assign({
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    setup(props, context) {
      const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => i18n[NumberPartsSymbol](...args));
    }
  });
  var DATETIME_FORMAT_KEYS = [
    "dateStyle",
    "timeStyle",
    "fractionalSecondDigits",
    "calendar",
    "dayPeriod",
    "numberingSystem",
    "localeMatcher",
    "timeZone",
    "hour12",
    "hourCycle",
    "formatMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName"
  ];
  ({
    name: "i18n-d",
    props: assign({
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    setup(props, context) {
      const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => i18n[DatetimePartsSymbol](...args));
    }
  });
  function addTimelineEvent(event, payload) {
  }
  function useI18n(options = {}) {
    const instance = (0, import_vue2.getCurrentInstance)();
    if (instance == null) {
      throw createI18nError(16);
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
      throw createI18nError(17);
    }
    const i18n = (0, import_vue2.inject)(instance.appContext.app.__VUE_I18N_SYMBOL__);
    if (!i18n) {
      throw createI18nError(22);
    }
    const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
    if (scope === "global") {
      let messages = isObject$2(options.messages) ? options.messages : {};
      if ("__i18nGlobal" in instance.type) {
        messages = getLocaleMessages(global2.locale.value, {
          messages,
          __i18n: instance.type.__i18nGlobal
        });
      }
      const locales = Object.keys(messages);
      if (locales.length) {
        locales.forEach((locale) => {
          global2.mergeLocaleMessage(locale, messages[locale]);
        });
      }
      if (isObject$2(options.datetimeFormats)) {
        const locales2 = Object.keys(options.datetimeFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
          });
        }
      }
      if (isObject$2(options.numberFormats)) {
        const locales2 = Object.keys(options.numberFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeNumberFormat(locale, options.numberFormats[locale]);
          });
        }
      }
      return global2;
    }
    if (scope === "parent") {
      let composer2 = getComposer(i18n, instance, options.__useComponent);
      if (composer2 == null) {
        {
          warn(getWarnMessage(12));
        }
        composer2 = global2;
      }
      return composer2;
    }
    if (i18n.mode === "legacy") {
      throw createI18nError(18);
    }
    const i18nInternal = i18n;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
      const type = instance.type;
      const composerOptions = assign({}, options);
      if (type.__i18n) {
        composerOptions.__i18n = type.__i18n;
      }
      if (global2) {
        composerOptions.__root = global2;
      }
      composer = createComposer(composerOptions);
      setupLifeCycle(i18nInternal, instance, composer);
      i18nInternal.__setInstance(instance, composer);
    }
    return composer;
  }
  function getComposer(i18n, target, useComponent = false) {
    let composer = null;
    const root = target.root;
    let current = target.parent;
    while (current != null) {
      const i18nInternal = i18n;
      if (i18n.mode === "composition") {
        composer = i18nInternal.__getInstance(current);
      } else {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
        }
        if (useComponent && composer && !composer[InejctWithOption]) {
          composer = null;
        }
      }
      if (composer != null) {
        break;
      }
      if (root === current) {
        break;
      }
      current = current.parent;
    }
    return composer;
  }
  function setupLifeCycle(i18n, target, composer) {
    let emitter = null;
    (0, import_vue2.onMounted)(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    (0, import_vue2.onUnmounted)(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n.__deleteInstance(target);
    }, target);
  }
  {
    initFeatureFlags();
  }
  {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  var isObject = (val2) => val2 !== null && typeof val2 === "object";
  var defaultDelimiters = ["{", "}"];
  var BaseFormatter = class {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  };
  var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format2, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format2.length) {
      let char = format2[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format2[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format2[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index2 = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index2 < tokens.length) {
      const token = tokens[index2];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index2++;
    }
    return compiled;
  }
  var LOCALE_ZH_HANS = "zh-Hans";
  var LOCALE_ZH_HANT = "zh-Hant";
  var LOCALE_EN = "en";
  var LOCALE_FR = "fr";
  var LOCALE_ES = "es";
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val2, key) => hasOwnProperty.call(val2, key);
  var defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages && messages[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
      return lang;
    }
  }
  var I18n = class {
    constructor({ locale, fallbackLocale, messages, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index2 = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index2, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  };
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages] = [
        messages,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages,
      watcher
    });
    let t = (key, values) => {
      if (typeof getApp !== "function") {
        t = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  var language = function(key) {
    const messages = {
      en,
      "zh-Hans": zhHans
    };
    ({
      locale: uni.getLocale(),
      messages
    });
    const { t } = initVueI18n(messages);
    return t(key);
  };
  var _style_0$2 = { "button": { "": { "backgroundColor": "rgba(0,0,0,0)", "borderWidth": 0, "borderStyle": "solid", "borderColor": "rgba(0,0,0,0)", "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "borderRadius": 0 } }, "buttonHover": { "": { "backgroundColor": "rgba(0,0,0,0)" } }, "bhover": { "": { "opacity": 0.7 } } };
  var _sfc_main$42 = /* @__PURE__ */ (0, import_vue2.defineComponent)({
    __name: "tm-button",
    props: __spreadProps2(__spreadValues2({}, custom_props), {
      transprent: {
        type: Boolean,
        default: false
      },
      followTheme: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: "normal"
      },
      fontSize: {
        type: Number,
        default: 0
      },
      fontColor: {
        type: String,
        default: ""
      },
      margin: {
        type: Array,
        default: () => [0, 16]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      shadow: {
        type: Number,
        default: 2
      },
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      block: {
        type: Boolean,
        default: false
      },
      round: {
        type: Number,
        default: 0
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: ""
      },
      icon: {
        type: String,
        default: ""
      },
      formType: {
        type: String,
        default: ""
      },
      openType: {
        type: String,
        default: ""
      },
      appParameter: {
        type: String,
        default: ""
      },
      sessionFrom: {
        type: String,
        default: ""
      },
      sendMessageTitle: {
        type: String,
        default: ""
      },
      sendMessagePath: {
        type: String,
        default: ""
      },
      sendMessageImg: {
        type: String,
        default: ""
      },
      sendMessageCard: {
        type: String,
        default: ""
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "tap", "longpress", "getphonenumber", "getUserInfo", "getUserProfile", "error", "opensetting", "launchapp", "contact"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const proxy = (_b2 = (_a2 = (0, import_vue2.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const formtype = (0, import_vue2.computed)(() => props.formType);
      let FormParent = null;
      if (formtype.value == "reset" || formtype.value == "submit") {
        FormParent = proxy == null ? void 0 : proxy.$parent;
        while (FormParent) {
          if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
            break;
          } else {
            FormParent = (_c = FormParent == null ? void 0 : FormParent.$parent) != null ? _c : void 0;
          }
        }
      }
      const customCSSStyle = (0, import_vue2.computed)(() => {
        return __spreadProps2(__spreadValues2({
          height: btnSizeObj.value.h + props.unit
        }, computedStyle(props)), {
          border: "0px solid rgba(0, 0, 0, 0)",
          background: "rgba(0, 0, 0, 0)",
          borderRadius: "0px"
        });
      });
      const customClass = (0, import_vue2.computed)(() => computedClass(props));
      const isclickOn = (0, import_vue2.ref)(false);
      const _load = (0, import_vue2.computed)(() => props.loading);
      const _disabled = (0, import_vue2.computed)(() => props.disabled);
      const _label = (0, import_vue2.computed)(() => props.label);
      const _icon = (0, import_vue2.computed)(() => props.icon);
      const sizeObj = (0, import_vue2.computed)(() => {
        if (props.unit == "px") {
          return {
            block: { w: 0, h: 80, fontSize: 28, round: 3 },
            mini: { w: 44, h: 18, fontSize: 10, round: 2 },
            small: { w: 60, h: 28, fontSize: 11, round: 3 },
            normal: { w: 110, h: 40, fontSize: 14, round: 3 },
            middle: { w: 180, h: 40, fontSize: 15, round: 3 },
            large: { w: 268, h: 44, fontSize: 16, round: 4 }
          };
        }
        return {
          block: { w: 0, h: 80, fontSize: 28, round: 3 },
          mini: { w: 88, h: 36, fontSize: 20, round: 2 },
          small: { w: 120, h: 56, fontSize: 22, round: 3 },
          normal: { w: 220, h: 80, fontSize: 28, round: 3 },
          middle: { w: 360, h: 80, fontSize: 30, round: 3 },
          large: { w: 535, h: 88, fontSize: 32, round: 4 }
        };
      });
      const btnSizeObj = (0, import_vue2.computed)(() => {
        let fontSize = props.fontSize || 0;
        if (props.block) {
          return { w: 0, h: props.height || sizeObj.value.block.h, fontSize: fontSize || sizeObj.value.block.fontSize, round: props.round == -1 ? 0 : props.round || sizeObj.value.normal.round };
        }
        return {
          w: props.width || sizeObj.value[props.size].w,
          h: props.height || sizeObj.value[props.size].h,
          fontSize: fontSize || sizeObj.value[props.size].fontSize,
          round: props.round == -1 ? 0 : props.round || sizeObj.value[props.size].round
        };
      });
      const _fontColor = (0, import_vue2.computed)(() => props.fontColor);
      function touchstart(e) {
        isclickOn.value = true;
        emits("touchstart", e);
      }
      function touchend(e) {
        isclickOn.value = false;
        emits("touchend", e);
      }
      function onclick(e) {
        if (FormParent != null && typeof FormParent != "undefined" && formtype.value && !props.loading) {
          FormParent[formtype.value]();
        }
        emits("click", e);
        if (props.url !== "" && typeof props.url === "string") {
          let url = props.url;
          if (url[0] !== "/")
            url = "/" + url;
          uni.navigateTo({
            url
          });
          return;
        }
        if (props.openType == "getUserInfo" || props.openType == "getUserProfile")
          ;
      }
      return (_ctx, _cache) => {
        const _component_button = (0, import_vue2.resolveComponent)("button");
        return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(__easycom_3, {
          "no-level": "",
          _style: { opacity: isclickOn.value || (0, import_vue2.unref)(_disabled) ? 0.7 : 1 },
          "hover-class": "none",
          round: (0, import_vue2.unref)(btnSizeObj).round,
          width: (0, import_vue2.unref)(btnSizeObj).w,
          height: (0, import_vue2.unref)(btnSizeObj).h,
          padding: props.padding,
          margin: props.margin,
          color: props.color,
          shadow: props.shadow,
          transprent: props.transprent,
          linear: props.linear,
          "linear-deep": props.linearDeep,
          text: props.text,
          outlined: props.outlined,
          dark: props.dark,
          "follow-dark": props.followDark,
          "follow-theme": props.followTheme,
          "border-direction": props.borderDirection,
          "border-style": props.borderStyle,
          border: props.border,
          blur: props.blur,
          _class: "flex flex-row flex-center "
        }, {
          default: (0, import_vue2.withCtx)(() => [
            (0, import_vue2.createVNode)(_component_button, {
              onClick: onclick,
              onTouchstart: touchstart,
              onTouchend: touchend,
              onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
              onTouchcancel: _cache[1] || (_cache[1] = ($event) => {
                isclickOn.value = false;
                emits("touchcancel", $event);
              }),
              onTouchmove: _cache[2] || (_cache[2] = ($event) => emits("touchmove", $event)),
              onGetphonenumber: _cache[3] || (_cache[3] = ($event) => emits("getphonenumber", $event)),
              onError: _cache[4] || (_cache[4] = ($event) => emits("error", $event)),
              onOpensetting: _cache[5] || (_cache[5] = ($event) => emits("opensetting", $event)),
              onLaunchapp: _cache[6] || (_cache[6] = ($event) => emits("launchapp", $event)),
              onContact: _cache[7] || (_cache[7] = ($event) => emits("contact", $event)),
              "form-type": props.formType,
              openType: props.openType,
              appParameter: props.appParameter,
              sessionFrom: props.sessionFrom,
              sendMessageTitle: props.sendMessageTitle,
              sendMessagePath: props.sendMessagePath,
              sendMessageImg: props.sendMessageImg,
              sendMessageCard: props.sendMessageCard,
              loading: (0, import_vue2.unref)(_load),
              disabled: (0, import_vue2.unref)(_disabled),
              "hover-start-time": 1e7,
              "hover-stop-propagation": "",
              "hover-class": "bhover",
              class: (0, import_vue2.normalizeClass)(["button flex-1 flex-center", [(0, import_vue2.unref)(customClass)]]),
              style: (0, import_vue2.normalizeStyle)((0, import_vue2.unref)(customCSSStyle))
            }, {
              default: (0, import_vue2.withCtx)(() => [
                (0, import_vue2.renderSlot)(_ctx.$slots, "default", {}, () => [
                  (0, import_vue2.unref)(_icon) ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(tmIcon, {
                    key: 0,
                    userInteractionEnabled: false,
                    color: (0, import_vue2.unref)(_fontColor),
                    _class: (0, import_vue2.unref)(_label) ? "pr-10" : "",
                    unit: props.unit,
                    fontSize: (0, import_vue2.unref)(btnSizeObj).fontSize * 0.9,
                    name: (0, import_vue2.unref)(_icon)
                  }, null, 8, ["color", "_class", "unit", "fontSize", "name"])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.createVNode)(__easycom_0, {
                    userInteractionEnabled: false,
                    color: (0, import_vue2.unref)(_fontColor),
                    fontSize: (0, import_vue2.unref)(btnSizeObj).fontSize,
                    unit: props.unit,
                    label: (0, import_vue2.unref)(_label)
                  }, null, 8, ["color", "fontSize", "unit", "label"])
                ])
              ]),
              _: 3
            }, 8, ["form-type", "openType", "appParameter", "sessionFrom", "sendMessageTitle", "sendMessagePath", "sendMessageImg", "sendMessageCard", "loading", "disabled", "class", "style"])
          ]),
          _: 3
        }, 8, ["_style", "round", "width", "height", "padding", "margin", "color", "shadow", "transprent", "linear", "linear-deep", "text", "outlined", "dark", "follow-dark", "follow-theme", "border-direction", "border-style", "border", "blur"]);
      };
    }
  });
  var tmButton = /* @__PURE__ */ _export_sfc(_sfc_main$42, [["styles", [_style_0$2]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-button/tm-button.vue"]]);
  var _style_0$12 = { "blurbg": { "": { "opacity": 0 } } };
  var _sfc_main$32 = /* @__PURE__ */ (0, import_vue2.defineComponent)({
    __name: "tm-overlay",
    props: __spreadProps2(__spreadValues2({}, custom_props), {
      align: {
        type: String,
        default: "flex-center"
      },
      bgColor: {
        type: String,
        default: "rgba(0,0,0,0.35)"
      },
      zIndex: {
        type: [Number, String],
        default: 999
      },
      show: {
        type: Boolean,
        default: false
      },
      overlayClick: {
        type: Boolean,
        default: true
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      duration: {
        type: Number,
        default: 200
      }
    }),
    emits: ["click", "open", "close", "update:show"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      const props = __props;
      const animation = requireNativePlugin("animation");
      const proxy = (_b2 = (_a2 = (0, import_vue2.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = computedStyle(props);
      const customClass = computedClass(props);
      const width = (0, import_vue2.ref)(0);
      const height = (0, import_vue2.ref)(0);
      const top = (0, import_vue2.ref)(0);
      (0, import_vue2.ref)(false);
      let timids = uni.$tm.u.getUid(1);
      const sysinfo = uni.getSystemInfoSync();
      width.value = sysinfo.windowWidth;
      height.value = sysinfo.windowHeight;
      uni.hideKeyboard();
      let nowPage = getCurrentPages().pop();
      let isCustomHeader = false;
      for (let i = 0; i < uni.$tm.pages.length; i++) {
        if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i].path && uni.$tm.pages[i].custom == "custom") {
          isCustomHeader = true;
          break;
        }
      }
      sysinfo.windowHeight + sysinfo.windowTop;
      if (!isCustomHeader) {
        if (sysinfo.osName == "android") {
          height.value = ((_d = (_c = sysinfo.safeArea) == null ? void 0 : _c.height) != null ? _d : sysinfo.windowHeight) - 44 - ((_f = (_e = sysinfo.safeAreaInsets) == null ? void 0 : _e.bottom) != null ? _f : 0);
        } else {
          height.value = ((_h = (_g = sysinfo.safeArea) == null ? void 0 : _g.height) != null ? _h : sysinfo.windowHeight) - 44;
        }
      } else {
        height.value = ((_j = (_i = sysinfo.safeArea) == null ? void 0 : _i.height) != null ? _j : sysinfo.windowHeight) + ((_k = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _k : 0) + ((_m = (_l = sysinfo.safeAreaInsets) == null ? void 0 : _l.bottom) != null ? _m : 0);
      }
      let timerId = NaN;
      const animationData = (0, import_vue2.ref)(null);
      const showMask = (0, import_vue2.ref)(false);
      (0, import_vue2.onUnmounted)(() => clearTimeout(timerId));
      const align_rpx = (0, import_vue2.computed)(() => props.align);
      const bgColor_rp = (0, import_vue2.computed)(() => {
        if (!props.bgColor || props.transprent)
          return "rgba(0,0,0,0)";
        return props.bgColor || "rgba(0,0,0,0.2)";
      });
      (0, import_vue2.onMounted)(() => {
        if (!props.show)
          return;
        open(props.show);
      });
      function debounce(func, wait = 500, immediate = false) {
        if (!isNaN(timerId))
          clearTimeout(timerId);
        if (immediate) {
          var callNow = !timerId;
          timerId = setTimeout(() => {
            timerId = NaN;
          }, wait);
          if (callNow)
            typeof func === "function" && func();
        } else {
          timerId = setTimeout(() => {
            typeof func === "function" && func();
          }, wait);
        }
      }
      function close(e) {
        try {
          e.stopPropagation();
          e.stopImmediatePropagation();
        } catch (e2) {
        }
        emits("click", e);
        if (timerId) {
          clearTimeout(timerId);
          timerId = NaN;
        }
        debounce(() => {
          if (!props.overlayClick)
            return;
          open(false);
        }, 250, true);
      }
      function open(off) {
        if (off == true) {
          uni.hideKeyboard();
        }
        fadeInNvue(off);
      }
      function fadeInNvue(off = false) {
        if (off == false) {
          if (showMask.value == off)
            return;
          clearTimeout(timids);
          timids = setTimeout(function() {
            var testEl = proxy.$refs.overlay;
            animation.transition(testEl, {
              styles: {
                backgroundColor: bgColor_rp.value,
                opacity: 0
              },
              duration: props.duration || 1,
              timingFunction: "ease",
              delay: 0
            }, () => {
              showMask.value = off;
              emits("close");
              emits("update:show", false);
            });
          }, props.duration || 1);
        } else {
          showMask.value = off;
          emits("open");
          clearTimeout(timids);
          timids = setTimeout(function() {
            var testEl = proxy == null ? void 0 : proxy.$refs.overlay;
            animation.transition(testEl, {
              styles: {
                backgroundColor: bgColor_rp.value,
                opacity: 1
              },
              duration: props.duration || 1,
              timingFunction: "ease",
              delay: 0
            }, () => {
            });
          }, 50);
        }
      }
      (0, import_vue2.watch)(() => props.show, (newval) => {
        open(newval);
      });
      expose({ close, open });
      return (_ctx, _cache) => {
        return showMask.value ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
          key: 0,
          ref: "overlay",
          onClick: (0, import_vue2.withModifiers)(close, ["stop"]),
          class: (0, import_vue2.normalizeClass)([(0, import_vue2.unref)(bgColor_rp) && !props.transprent ? "blurbg" : "", (0, import_vue2.unref)(align_rpx), " navbarheight flex flex-col  l-0  ", (0, import_vue2.unref)(customClass)]),
          style: (0, import_vue2.normalizeStyle)([
            (0, import_vue2.unref)(bgColor_rp) && !props.transprent ? { backgroundColor: showMask.value ? (0, import_vue2.unref)(bgColor_rp) : "" } : "",
            { position: "fixed" },
            __props.zIndex ? { zIndex: __props.zIndex } : "",
            { width: width.value + "px", height: height.value + "px", top: top.value + "px" },
            (0, import_vue2.unref)(customCSSStyle)
          ]),
          animation: animationData.value
        }, [
          (0, import_vue2.renderSlot)(_ctx.$slots, "default")
        ], 14, ["onClick", "animation"])) : (0, import_vue2.createCommentVNode)("v-if", true);
      };
    }
  });
  var tmOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$32, [["styles", [_style_0$12]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-overlay/tm-overlay.vue"]]);
  var modelType = /* @__PURE__ */ ((modelType2) => {
    modelType2["load"] = "load";
    modelType2["error"] = "error";
    modelType2["info"] = "info";
    modelType2["warn"] = "warn";
    modelType2["quest"] = "quest";
    modelType2["success"] = "success";
    modelType2["disabled"] = "disabled";
    modelType2["wait"] = "wait";
    return modelType2;
  })(modelType || {});
  var _sfc_main$22 = /* @__PURE__ */ (0, import_vue2.defineComponent)({
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
      var _a2, _b2;
      const props = __props;
      const store = useTmpiniaStore();
      const tranAni = (0, import_vue2.ref)(null);
      (_b2 = (_a2 = (0, import_vue2.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const uid = (0, import_vue2.ref)(uni.$tm.u.getUid(5));
      const bgColor = (0, import_vue2.ref)("white");
      const model_ref = (0, import_vue2.ref)(modelType.info);
      const showValue = (0, import_vue2.ref)(false);
      const icon_ref = (0, import_vue2.ref)("");
      const text_ref = (0, import_vue2.ref)("");
      const color_ref = (0, import_vue2.ref)("");
      const reverse = (0, import_vue2.ref)(false);
      const dur = (0, import_vue2.ref)(0);
      const initByWechat = (0, import_vue2.ref)(true);
      const showMask = (0, import_vue2.ref)(props.mask);
      const dark_ref = (0, import_vue2.ref)(false);
      (0, import_vue2.onUnmounted)(() => clearTimeout(uid.value));
      (0, import_vue2.watch)(() => props.mask, (val2) => showMask.value = val2);
      let zindex = {};
      const modelIcon = (0, import_vue2.computed)(() => {
        return {
          load: {
            icon: "tmicon-loading",
            color: "primary",
            text: language("message.load.text")
          },
          error: {
            icon: "tmicon-times-circle",
            color: "red",
            text: language("message.error.text")
          },
          info: {
            icon: "tmicon-info-circle",
            text: language("message.info.text"),
            color: "black"
          },
          warn: {
            icon: "tmicon-exclamation-circle",
            text: language("message.warn.text"),
            color: "orange"
          },
          quest: {
            icon: "tmicon-question-circle",
            text: language("message.quest.text"),
            color: "pink"
          },
          success: {
            icon: "tmicon-check-circle",
            text: language("message.success.text"),
            color: "green"
          },
          disabled: {
            icon: "tmicon-ban",
            text: language("message.disabled.text"),
            color: "red"
          },
          wait: {
            icon: "tmicon-ios-alarm",
            text: language("message.wait.text"),
            color: "black"
          }
        };
      });
      function msgOver() {
        var _a22, _b22;
        (_a22 = tranAni.value) == null ? void 0 : _a22.stop();
        (_b22 = tranAni.value) == null ? void 0 : _b22.reset();
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
        let { duration, icon, text, color, dark: dark2, model, mask } = arg;
        model_ref.value = typeof model == "undefined" ? model_ref.value : model;
        icon_ref.value = icon = icon != null ? icon : modelIcon.value[model_ref.value].icon;
        text_ref.value = text = text != null ? text : modelIcon.value[model_ref.value].text;
        color_ref.value = color = color != null ? color : modelIcon.value[model_ref.value].color;
        showMask.value = typeof mask === "boolean" ? mask : showMask.value;
        if (dark2 === true) {
          bgColor.value = "black";
        }
        if (typeof dark2 !== "boolean") {
          dark2 = store.tmStore.dark;
        }
        if (color_ref.value == "white" || color_ref.value == "black") {
          color_ref.value = "";
        }
        dark_ref.value = dark2;
        if (typeof duration === "undefined") {
          duration = props.duration;
        }
        dur.value = isNaN(parseInt(String(duration))) ? 1500 : parseInt(String(duration));
        reverse.value = false;
        showValue.value = true;
        setTimeout(() => {
          var _a22;
          (_a22 = tranAni.value) == null ? void 0 : _a22.play();
        }, 80);
      }
      function hide() {
        showValue.value = false;
      }
      expose({ show, hide });
      return (_ctx, _cache) => {
        return showValue.value ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(tmOverlay, {
          key: 0,
          blur: "",
          duration: 0,
          transprent: !showMask.value,
          _style: (0, import_vue2.unref)(zindex),
          overlayClick: false,
          show: showValue.value,
          "onUpdate:show": _cache[0] || (_cache[0] = ($event) => showValue.value = $event)
        }, {
          default: (0, import_vue2.withCtx)(() => [
            (0, import_vue2.createVNode)(tmTranslate, {
              initByWechat: initByWechat.value,
              onEnd: msgOver,
              reverse: reverse.value,
              ref_key: "tranAni",
              ref: tranAni,
              name: "zoom",
              duration: 160,
              "auto-play": false
            }, {
              default: (0, import_vue2.withCtx)(() => [
                (0, import_vue2.createVNode)(__easycom_3, {
                  blur: "",
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
                }, {
                  default: (0, import_vue2.withCtx)(() => [
                    (0, import_vue2.createElementVNode)("view", {
                      class: "flex flex-center flex-col ma-30",
                      style: { "line-height": "normal" }
                    }, [
                      (0, import_vue2.createVNode)(tmIcon, {
                        _style: "line-height: normal",
                        style: { "line-height": "normal" },
                        _class: "pa-10",
                        spin: model_ref.value == "load",
                        color: color_ref.value,
                        fontSize: 72,
                        name: icon_ref.value
                      }, null, 8, ["spin", "color", "name"]),
                      (0, import_vue2.createVNode)(__easycom_0, {
                        "font-size": 30,
                        _class: "pt-8 text-overflow-1",
                        label: text_ref.value
                      }, null, 8, ["label"])
                    ])
                  ]),
                  _: 1
                }, 8, ["_style", "_class", "color"])
              ]),
              _: 1
            }, 8, ["initByWechat", "reverse"])
          ]),
          _: 1
        }, 8, ["transprent", "_style", "show"])) : (0, import_vue2.createCommentVNode)("v-if", true);
      };
    }
  });
  var tmMessage = /* @__PURE__ */ _export_sfc(_sfc_main$22, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-message/tm-message.vue"]]);
  var _sfc_main$12 = /* @__PURE__ */ (0, import_vue2.defineComponent)({
    __name: "tm-input",
    props: __spreadProps2(__spreadValues2({}, custom_props), {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      color: {
        type: String,
        default: "grey-4"
      },
      focusColor: {
        type: String,
        default: "primary"
      },
      fontColor: {
        type: String,
        default: ""
      },
      text: {
        type: Boolean,
        default: true
      },
      outlined: {
        type: Boolean,
        default: false
      },
      border: {
        type: Number,
        default: 0
      },
      transprent: {
        type: Boolean,
        default: false
      },
      round: {
        type: Number,
        default: 3
      },
      shadow: {
        type: Number,
        default: 0
      },
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      height: {
        type: Number,
        default: 64
      },
      prefix: {
        type: String,
        default: ""
      },
      prefixLabel: {
        type: String,
        default: ""
      },
      suffix: {
        type: String,
        default: ""
      },
      suffixLabel: {
        type: String,
        default: ""
      },
      fontSize: {
        type: Number,
        default: 30
      },
      search: {
        type: String,
        default: ""
      },
      searchLabel: {
        type: String,
        default: ""
      },
      showClear: {
        type: Boolean,
        default: false
      },
      password: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
      },
      errorLabel: {
        type: String,
        default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
      },
      align: {
        type: String,
        default: "left"
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      inputPadding: {
        type: Array,
        default: () => [24, 0]
      },
      showCharNumber: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: -1
      },
      type: {
        type: String,
        default: "text"
      },
      cursorSpacing: {
        type: Number,
        default: 24
      },
      confirmType: {
        type: String,
        default: "done"
      },
      confirmHold: {
        type: Boolean,
        default: false
      },
      autoBlur: {
        type: Boolean,
        default: true
      },
      holdKeyboard: {
        type: Boolean,
        default: false
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      focus: {
        type: Boolean,
        default: false
      },
      cursor: {
        type: Number,
        default: 0
      },
      showConfirmBar: {
        type: Boolean,
        default: true
      },
      selectionStart: {
        type: Number,
        default: -1
      },
      selectionEnd: {
        type: Number,
        default: -1
      },
      disableDefaultPadding: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", "click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = (0, import_vue2.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      const isAndroid = (0, import_vue2.ref)(false);
      isAndroid.value = uni.getSystemInfoSync().platform == "android" ? true : false;
      const _height = (0, import_vue2.computed)(() => props.height);
      const _inputPadding = (0, import_vue2.computed)(() => {
        if (props.search !== "" || props.searchLabel !== "") {
          return [4, 0];
        }
        return props.inputPadding;
      });
      let timerId = NaN;
      function debounce(func, wait = 500, immediate = false) {
        if (!isNaN(timerId))
          clearTimeout(timerId);
        if (immediate) {
          var callNow = !timerId;
          timerId = setTimeout(() => {
            timerId = NaN;
          }, wait);
          if (callNow)
            typeof func === "function" && func();
        } else {
          timerId = setTimeout(() => {
            typeof func === "function" && func();
          }, wait);
        }
      }
      const propsDetail = (0, import_vue2.computed)(() => {
        return {
          focus: props.focus,
          prefix: props.prefix,
          prefixLabel: props.prefixLabel,
          fontSize: props.fontSize,
          fontSize_px: uni.upx2px(props.fontSize),
          suffix: props.suffix,
          suffixLabel: props.suffixLabel,
          fontColor: props.fontColor,
          search: props.search,
          searchLabel: props.searchLabel,
          showClear: props.showClear,
          password: props.password,
          disabled: props.disabled,
          placeholder: props.placeholder,
          showCharNumber: props.showCharNumber,
          maxlength: props.maxlength,
          cursorSpacing: props.cursorSpacing,
          confirmType: props.confirmType,
          confirmHold: props.confirmHold,
          autoBlur: props.autoBlur,
          holdKeyboard: props.holdKeyboard,
          adjustPosition: props.adjustPosition,
          type: props.type,
          cursor: props.cursor,
          showConfirmBar: props.showConfirmBar,
          selectionStart: props.selectionStart,
          selectionEnd: props.selectionEnd,
          disableDefaultPadding: props.disableDefaultPadding,
          fixed: props.fixed
        };
      });
      const tmcfg = (0, import_vue2.computed)(() => store.tmStore);
      (0, import_vue2.computed)(() => computedStyle(props));
      (0, import_vue2.computed)(() => computedClass(props));
      const isDark = (0, import_vue2.computed)(() => computedDark(props, tmcfg.value));
      const _requiredError = (0, import_vue2.ref)(false);
      const _foucsActive = (0, import_vue2.ref)(props.focus || false);
      (0, import_vue2.watch)(() => props.focus, () => {
        _foucsActive.value = props.focus;
      });
      const _color = (0, import_vue2.computed)(() => {
        let color = props.color;
        if (_foucsActive.value) {
          if (props.followTheme && store.tmStore.color) {
            color = store.tmStore.color;
          } else {
            color = props.focusColor;
          }
        }
        if (_requiredError.value)
          color = "red";
        return color;
      });
      const tmcomputed = (0, import_vue2.computed)(() => {
        const _props = __spreadProps2(__spreadValues2({}, props), { color: _color.value });
        return computedTheme(_props, isDark.value, tmcfg.value);
      });
      const showPasswordText = (0, import_vue2.ref)(propsDetail.value.password);
      const showPasswordIcon = (0, import_vue2.computed)(() => props.password);
      (0, import_vue2.ref)(props.errorLabel);
      const _value = (0, import_vue2.ref)(props.modelValue);
      const _valueLenChar = (0, import_vue2.computed)(() => {
        let str = String(_value.value).split("");
        return str.length;
      });
      (0, import_vue2.watch)(() => props.modelValue, () => _value.value = props.modelValue);
      const rulesObj = (0, import_vue2.inject)("tmFormItemRules", (0, import_vue2.computed)(() => {
        var _a22;
        return [{
          message: (_a22 = props == null ? void 0 : props.errorLabel) != null ? _a22 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
          required: false,
          validator: false
        }];
      }));
      function searchClick() {
        emits("search", _value.value);
      }
      function clearBtn() {
        _value.value = "";
        emits("update:modelValue", "");
        emits("clear");
      }
      function changeSeePassword() {
        showPasswordText.value = !showPasswordText.value;
      }
      function focus() {
        _foucsActive.value = true;
        emits("focus");
      }
      function blur() {
        _foucsActive.value = false;
        pushFormItem();
        emits("blur");
      }
      function confirm() {
        emits("confirm", _value.value);
      }
      function inputHandler(e) {
        _value.value = e.detail.value;
        emits("input", e.detail.value);
        emits("update:modelValue", e.detail.value);
        return e.detail.value;
      }
      function inputClick(e, type) {
        e.stopPropagation();
        debounce(() => emits("click", e), 150, true);
      }
      (0, import_vue2.watch)(_value, () => debounce(pushFormItem, 150));
      const tmFormFun = (0, import_vue2.inject)("tmFormFun", (0, import_vue2.computed)(() => ""));
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps2(__spreadValues2({}, el), {
              validator: (val2) => {
                return String(val2).length == 0 || typeof val2 === null ? false : true;
              }
            });
          } else {
            return __spreadProps2(__spreadValues2({}, el), {
              validator: (val2) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise((res, rej) => __async(this, null, function* () {
            if (typeof el.validator === "function") {
              let vr = yield el.validator(_value.value);
              if (vr) {
                res({
                  message: String(el.message),
                  validator: true
                });
              } else {
                rej({
                  message: el.message,
                  validator: false
                });
              }
            } else {
              res({
                message: el.message,
                validator: true
              });
            }
          }));
        });
        return Promise.all(rules_fun);
      };
      function pushFormItem(isCheckVail = true) {
        return __async(this, null, function* () {
          if (parentFormItem) {
            if (isCheckVail) {
              validate((0, import_vue2.toRaw)(rulesObj.value)).then((ev) => {
                parentFormItem.pushCom({
                  value: _value.value,
                  isRequiredError: false,
                  componentsName: "tm-input",
                  message: ev.length == 0 ? "" : ev[0].message
                });
              }).catch((er) => {
                parentFormItem.pushCom({
                  value: _value.value,
                  isRequiredError: true,
                  componentsName: "tm-input",
                  message: er.message
                });
              });
            }
          }
        });
      }
      (0, import_vue2.watch)(tmFormFun, () => {
        if (tmFormFun.value == "validate") {
          pushFormItem();
        }
        if (tmFormFun.value == "reset") {
          _value.value = "";
          _requiredError.value = false;
          emits("update:modelValue", _value.value);
          pushFormItem(false);
        }
        if (tmFormFun.value == "clearValidate") {
          _requiredError.value = false;
          pushFormItem(false);
        }
      });
      pushFormItem(false);
      return (_ctx, _cache) => {
        return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(__easycom_3, {
          transprent: true,
          margin: props.margin,
          padding: props.padding
        }, {
          default: (0, import_vue2.withCtx)(() => [
            (0, import_vue2.createVNode)(__easycom_3, {
              transprent: props.transprent,
              round: props.round,
              "no-level": "",
              margin: [0, 0],
              padding: (0, import_vue2.unref)(_inputPadding),
              border: props.border,
              text: props.text,
              color: (0, import_vue2.unref)(_color),
              outlined: props.outlined,
              shadow: props.shadow,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, {
              default: (0, import_vue2.withCtx)(() => [
                (0, import_vue2.createElementVNode)("view", {
                  class: (0, import_vue2.normalizeClass)(["flex flex-row", [(0, import_vue2.unref)(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"]]),
                  onClick: _cache[6] || (_cache[6] = ($event) => inputClick($event)),
                  style: (0, import_vue2.normalizeStyle)([{ height: `${(0, import_vue2.unref)(_height)}rpx` }])
                }, [
                  (0, import_vue2.unref)(propsDetail).search || (0, import_vue2.unref)(propsDetail).searchLabel ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 0,
                    class: "px-9"
                  })) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.renderSlot)(_ctx.$slots, "left"),
                  (0, import_vue2.unref)(propsDetail).prefix ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 1,
                    class: "pr-16"
                  }, [
                    (0, import_vue2.createVNode)(tmIcon, {
                      "font-size": (0, import_vue2.unref)(propsDetail).fontSize,
                      name: (0, import_vue2.unref)(propsDetail).prefix
                    }, null, 8, ["font-size", "name"])
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.unref)(propsDetail).prefixLabel ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 2,
                    class: "pr-24"
                  }, [
                    (0, import_vue2.createVNode)(__easycom_0, {
                      "font-size": (0, import_vue2.unref)(propsDetail).fontSize,
                      label: (0, import_vue2.unref)(propsDetail).prefixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  !isAndroid.value ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 3,
                    onClick: (0, import_vue2.withModifiers)(inputClick, ["stop"]),
                    class: "flex-1 relative flex-row flex",
                    style: (0, import_vue2.normalizeStyle)([{ width: "0px" }])
                  }, [
                    (0, import_vue2.createCommentVNode)(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    (0, import_vue2.unref)(propsDetail).type != "textarea" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("u-input", {
                      key: 0,
                      class: "flex-1",
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue2.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[0] || (_cache[0] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      maxlength: (0, import_vue2.unref)(propsDetail).maxlength,
                      disabled: (0, import_vue2.unref)(propsDetail).disabled,
                      cursorSpacing: (0, import_vue2.unref)(propsDetail).cursorSpacing,
                      confirmType: (0, import_vue2.unref)(propsDetail).confirmType,
                      confirmHold: (0, import_vue2.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue2.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue2.unref)(propsDetail).holdKeyboard,
                      adjustPosition: (0, import_vue2.unref)(propsDetail).adjustPosition,
                      type: (0, import_vue2.unref)(propsDetail).type,
                      placeholder: (0, import_vue2.unref)(propsDetail).placeholder,
                      style: (0, import_vue2.normalizeStyle)([
                        {
                          height: `${(0, import_vue2.unref)(_height)}rpx`,
                          color: (0, import_vue2.unref)(propsDetail).fontColor ? (0, import_vue2.unref)(propsDetail).fontColor : (0, import_vue2.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue2.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      placeholderStyle: `fontSize:${(0, import_vue2.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "maxlength", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "type", "placeholder", "placeholderStyle"])) : (0, import_vue2.createCommentVNode)("v-if", true),
                    (0, import_vue2.unref)(propsDetail).type == "textarea" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("u-textarea", {
                      key: 1,
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue2.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[1] || (_cache[1] = ($event) => emits("keyboardheightchange")),
                      maxlength: (0, import_vue2.unref)(propsDetail).maxlength,
                      disabled: (0, import_vue2.unref)(propsDetail).disabled,
                      placeholder: (0, import_vue2.unref)(propsDetail).placeholder,
                      cursorSpacing: (0, import_vue2.unref)(propsDetail).cursorSpacing,
                      confirmHold: (0, import_vue2.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue2.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue2.unref)(propsDetail).holdKeyboard,
                      cursor: (0, import_vue2.unref)(propsDetail).cursor,
                      showConfirmBar: (0, import_vue2.unref)(propsDetail).showConfirmBar,
                      selectionStart: (0, import_vue2.unref)(propsDetail).selectionStart,
                      selectionEnd: (0, import_vue2.unref)(propsDetail).selectionEnd,
                      disableDefaultPadding: (0, import_vue2.unref)(propsDetail).disableDefaultPadding,
                      fixed: (0, import_vue2.unref)(propsDetail).fixed,
                      adjustPosition: (0, import_vue2.unref)(propsDetail).adjustPosition,
                      type: (0, import_vue2.unref)(propsDetail).type,
                      style: (0, import_vue2.normalizeStyle)([
                        {
                          height: `${(0, import_vue2.unref)(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: (0, import_vue2.unref)(propsDetail).fontColor ? (0, import_vue2.unref)(propsDetail).fontColor : (0, import_vue2.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue2.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-12",
                      placeholderStyle: `fontSize:${(0, import_vue2.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "maxlength", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "adjustPosition", "type", "placeholderStyle"])) : (0, import_vue2.createCommentVNode)("v-if", true)
                  ], 8, ["onClick"])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  isAndroid.value ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 4,
                    class: "flex-1 relative flex-row flex",
                    style: (0, import_vue2.normalizeStyle)([{ width: "0px" }])
                  }, [
                    (0, import_vue2.createCommentVNode)(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    (0, import_vue2.unref)(propsDetail).type != "textarea" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("u-input", {
                      key: 0,
                      class: "flex-1",
                      onClick: _cache[2] || (_cache[2] = ($event) => emits("click", $event)),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue2.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[3] || (_cache[3] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      disabled: (0, import_vue2.unref)(propsDetail).disabled,
                      cursorSpacing: (0, import_vue2.unref)(propsDetail).cursorSpacing,
                      confirmType: (0, import_vue2.unref)(propsDetail).confirmType,
                      confirmHold: (0, import_vue2.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue2.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue2.unref)(propsDetail).holdKeyboard,
                      adjustPosition: (0, import_vue2.unref)(propsDetail).adjustPosition,
                      maxlength: (0, import_vue2.unref)(propsDetail).maxlength,
                      type: (0, import_vue2.unref)(propsDetail).type,
                      placeholder: (0, import_vue2.unref)(propsDetail).placeholder,
                      style: (0, import_vue2.normalizeStyle)([
                        {
                          height: `${(0, import_vue2.unref)(_height)}rpx`,
                          color: (0, import_vue2.unref)(propsDetail).fontColor ? (0, import_vue2.unref)(propsDetail).fontColor : (0, import_vue2.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue2.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      placeholderStyle: `fontSize:${(0, import_vue2.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "type", "placeholder", "placeholderStyle"])) : (0, import_vue2.createCommentVNode)("v-if", true),
                    (0, import_vue2.unref)(propsDetail).type == "textarea" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("u-textarea", {
                      key: 1,
                      onClick: _cache[4] || (_cache[4] = ($event) => emits("click", $event)),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: (0, import_vue2.unref)(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[5] || (_cache[5] = ($event) => emits("keyboardheightchange")),
                      disabled: (0, import_vue2.unref)(propsDetail).disabled,
                      placeholder: (0, import_vue2.unref)(propsDetail).placeholder,
                      cursorSpacing: (0, import_vue2.unref)(propsDetail).cursorSpacing,
                      confirmHold: (0, import_vue2.unref)(propsDetail).confirmHold,
                      autoBlur: (0, import_vue2.unref)(propsDetail).autoBlur,
                      holdKeyboard: (0, import_vue2.unref)(propsDetail).holdKeyboard,
                      adjustPosition: (0, import_vue2.unref)(propsDetail).adjustPosition,
                      maxlength: (0, import_vue2.unref)(propsDetail).maxlength,
                      autoHeight: (0, import_vue2.unref)(propsDetail).autoHeight,
                      cursor: (0, import_vue2.unref)(propsDetail).cursor,
                      showConfirmBar: (0, import_vue2.unref)(propsDetail).showConfirmBar,
                      selectionStart: (0, import_vue2.unref)(propsDetail).selectionStart,
                      selectionEnd: (0, import_vue2.unref)(propsDetail).selectionEnd,
                      disableDefaultPadding: (0, import_vue2.unref)(propsDetail).disableDefaultPadding,
                      fixed: (0, import_vue2.unref)(propsDetail).fixed,
                      type: (0, import_vue2.unref)(propsDetail).type,
                      style: (0, import_vue2.normalizeStyle)([
                        {
                          height: `${(0, import_vue2.unref)(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: (0, import_vue2.unref)(propsDetail).fontColor ? (0, import_vue2.unref)(propsDetail).fontColor : (0, import_vue2.unref)(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${(0, import_vue2.unref)(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-10",
                      placeholderStyle: `fontSize:${(0, import_vue2.unref)(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "autoHeight", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "disableDefaultPadding", "fixed", "type", "placeholderStyle"])) : (0, import_vue2.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.unref)(propsDetail).showClear && (0, import_vue2.unref)(_valueLenChar) > 0 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 5,
                    class: "pl-16"
                  }, [
                    (0, import_vue2.createVNode)(tmIcon, {
                      onClick: clearBtn,
                      "font-size": (0, import_vue2.unref)(propsDetail).fontSize * 0.9,
                      name: "tmicon-times-circle-fill"
                    }, null, 8, ["font-size"])
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  _requiredError.value ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 6,
                    class: "pl-16"
                  }, [
                    (0, import_vue2.createVNode)(tmIcon, {
                      "font-size": (0, import_vue2.unref)(propsDetail).fontSize,
                      name: "tmicon-exclamation-circle"
                    }, null, 8, ["font-size"])
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.unref)(propsDetail).suffix ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 7,
                    class: "pl-16"
                  }, [
                    (0, import_vue2.createVNode)(tmIcon, {
                      "font-size": (0, import_vue2.unref)(propsDetail).fontSize * 0.85,
                      name: (0, import_vue2.unref)(propsDetail).suffix
                    }, null, 8, ["font-size", "name"])
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.unref)(propsDetail).suffixLabel ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 8,
                    class: "pl-16"
                  }, [
                    (0, import_vue2.createVNode)(__easycom_0, {
                      "font-size": (0, import_vue2.unref)(propsDetail).fontSize,
                      label: (0, import_vue2.unref)(propsDetail).suffixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.unref)(showPasswordIcon) ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 9,
                    class: "pl-16"
                  }, [
                    (0, import_vue2.createCommentVNode)(" tmicon-eyeslash-fill "),
                    (0, import_vue2.createVNode)(tmIcon, {
                      onClick: changeSeePassword,
                      "font-size": (0, import_vue2.unref)(propsDetail).fontSize,
                      name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
                    }, null, 8, ["font-size", "name"])
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.unref)(propsDetail).showCharNumber && (0, import_vue2.unref)(_valueLenChar) > 0 && (0, import_vue2.unref)(propsDetail).type != "textarea" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 10,
                    class: "pl-16 flex-row flex"
                  }, [
                    (0, import_vue2.createVNode)(__easycom_0, { label: (0, import_vue2.unref)(_valueLenChar) }, null, 8, ["label"]),
                    (0, import_vue2.unref)(propsDetail).maxlength > 0 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(__easycom_0, {
                      key: 0,
                      label: "/" + (0, import_vue2.unref)(propsDetail).maxlength
                    }, null, 8, ["label"])) : (0, import_vue2.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.createCommentVNode)(" \u539F\u56E0\u662F\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u81EA\u5E26\u4E86\u8BA1\u6570\u5668\u3002\u4F1A\u5BFC\u81F4\u91CD\u53E0\u3002 "),
                  (0, import_vue2.unref)(propsDetail).showCharNumber && (0, import_vue2.unref)(_valueLenChar) > 0 && (0, import_vue2.unref)(propsDetail).type == "textarea" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                    key: 11,
                    class: "pl-16 flex-row flex absolute r-0 b-12"
                  }, [
                    (0, import_vue2.createVNode)(__easycom_0, { label: (0, import_vue2.unref)(_valueLenChar) }, null, 8, ["label"]),
                    (0, import_vue2.unref)(propsDetail).maxlength > 0 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(__easycom_0, {
                      key: 0,
                      label: "/" + (0, import_vue2.unref)(propsDetail).maxlength
                    }, null, 8, ["label"])) : (0, import_vue2.createCommentVNode)("v-if", true)
                  ])) : (0, import_vue2.createCommentVNode)("v-if", true),
                  (0, import_vue2.renderSlot)(_ctx.$slots, "right", {}, () => [
                    (0, import_vue2.unref)(propsDetail).search || (0, import_vue2.unref)(propsDetail).searchLabel ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                      key: 0,
                      class: "pl-16"
                    }, [
                      (0, import_vue2.createVNode)(tmButton, {
                        followTheme: props.followTheme,
                        onClick: searchClick,
                        color: props.focusColor,
                        "font-size": 24,
                        height: (0, import_vue2.unref)(_height) - 11,
                        padding: [16, 0],
                        block: "",
                        margin: [0, 0],
                        icon: (0, import_vue2.unref)(propsDetail).search,
                        label: (0, import_vue2.unref)(propsDetail).searchLabel
                      }, null, 8, ["followTheme", "color", "height", "icon", "label"])
                    ])) : (0, import_vue2.createCommentVNode)("v-if", true)
                  ])
                ], 6)
              ]),
              _: 3
            }, 8, ["transprent", "round", "padding", "border", "text", "color", "outlined", "shadow", "linear", "linearDeep"]),
            (0, import_vue2.createCommentVNode)(' <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">\r\n            <tm-divider :margin="[0,0]"></tm-divider>\r\n        </view> '),
            (0, import_vue2.createCommentVNode)(" _requiredError "),
            (0, import_vue2.createCommentVNode)(' <view v-if="false" class="pt-12">\r\n            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>\r\n        </view> ')
          ]),
          _: 3
        }, 8, ["margin", "padding"]);
      };
    }
  });
  var tmInput = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-input/tm-input.vue"]]);
  var _style_02 = {};
  var _sfc_main2 = /* @__PURE__ */ (0, import_vue2.defineComponent)({
    __name: "tm-cell",
    props: __spreadProps2(__spreadValues2({}, custom_props), {
      shadow: {
        type: [Number],
        default: 0
      },
      round: {
        type: [Number],
        default: 0
      },
      margin: {
        type: Array,
        default: () => [32, 0]
      },
      padding: {
        type: Array,
        default: () => [24, 24]
      },
      height: {
        type: [Number],
        default: 0
      },
      width: {
        type: [Number],
        default: 0
      },
      transprent: {
        type: [Boolean],
        default: false
      },
      color: {
        type: String,
        default: "white"
      },
      title: {
        type: String,
        default: ""
      },
      titleFontSize: {
        type: [Number],
        default: 28
      },
      label: {
        type: String,
        default: ""
      },
      labelColor: {
        type: String,
        default: "grey"
      },
      rightText: {
        type: String,
        default: ""
      },
      rightIcon: {
        type: String,
        default: "tmicon-angle-right"
      },
      rightColor: {
        type: String,
        default: "grey"
      },
      rightTextSize: {
        type: Number,
        default: 24
      },
      showAvatar: {
        type: Boolean,
        default: false
      },
      avatar: {
        type: String,
        default: ""
      },
      avatarSize: {
        type: Number,
        default: 60
      },
      avatarRound: {
        type: Number,
        default: 10
      },
      border: {
        type: [Number],
        default: 0
      },
      borderDirection: {
        type: [String],
        default: cssDirection.bottom
      },
      bottomBorder: {
        type: [Boolean],
        default: false
      },
      url: {
        type: String,
        default: ""
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      const props = __props;
      function cellClick(e) {
        emits("click", e);
        if (props.url !== "") {
          try {
            uni.navigateTo({
              url: props.url,
              fail(error) {
                formatAppLog("error", "at tmui/components/tm-cell/tm-cell.vue:208", "\u6253\u5F00\u8FDE\u63A5\u9519\u8BEF\uFF1A", error);
              }
            });
          } catch (e2) {
          }
        }
      }
      const _computedValue = (0, import_vue2.computed)(() => props);
      return (_ctx, _cache) => {
        return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", { class: "relative overflow" }, [
          (0, import_vue2.createVNode)(__easycom_3, {
            onClick: cellClick,
            color: props.color,
            followTheme: props.followTheme,
            dark: props.dark,
            followDark: props.followDark,
            round: props.round,
            shadow: props.shadow,
            outlined: props.outlined,
            border: props.border,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            text: props.text,
            transprent: props.transprent,
            linear: props.linear,
            linearDeep: props.linearDeep,
            width: props.width,
            height: props.height,
            margin: props.margin,
            padding: props.padding,
            _class: props._class,
            _style: props._style,
            "hover-class": "opacity-6"
          }, {
            default: (0, import_vue2.withCtx)(() => [
              (0, import_vue2.createElementVNode)("view", {
                userInteractionEnabled: true,
                class: (0, import_vue2.normalizeClass)(["flex flex-row flex-row-center-center", [(0, import_vue2.unref)(_computedValue).url ? "url" : ""]])
              }, [
                (0, import_vue2.unref)(_computedValue).showAvatar ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                  key: 0,
                  style: (0, import_vue2.normalizeStyle)({
                    width: `${(0, import_vue2.unref)(_computedValue).avatarSize}rpx`,
                    height: `${(0, import_vue2.unref)(_computedValue).avatarSize}rpx`
                  }),
                  class: "flex flex-row flex-row-center-center"
                }, [
                  (0, import_vue2.renderSlot)(_ctx.$slots, "avatar", {}, () => [
                    (0, import_vue2.createVNode)(__easycom_4, {
                      round: (0, import_vue2.unref)(_computedValue).avatarRound,
                      width: (0, import_vue2.unref)(_computedValue).avatarSize,
                      height: (0, import_vue2.unref)(_computedValue).avatarSize,
                      src: (0, import_vue2.unref)(_computedValue).avatar
                    }, null, 8, ["round", "width", "height", "src"])
                  ])
                ], 4)) : (0, import_vue2.createCommentVNode)("v-if", true),
                (0, import_vue2.createElementVNode)("view", {
                  class: "flex-1 flex flex-row flex-row-center-between",
                  style: { "width": "0px" }
                }, [
                  (0, import_vue2.createElementVNode)("view", null, [
                    (0, import_vue2.createElementVNode)("view", {
                      class: (0, import_vue2.normalizeClass)(["flex flex-5 flex-col", [(0, import_vue2.unref)(_computedValue).showAvatar ? "pl-24" : ""]])
                    }, [
                      (0, import_vue2.renderSlot)(_ctx.$slots, "title", {}, () => [
                        (0, import_vue2.createVNode)(__easycom_0, {
                          fontSize: (0, import_vue2.unref)(_computedValue).titleFontSize,
                          label: (0, import_vue2.unref)(_computedValue).title
                        }, null, 8, ["fontSize", "label"])
                      ]),
                      (0, import_vue2.renderSlot)(_ctx.$slots, "label", {}, () => [
                        (0, import_vue2.unref)(_computedValue).label ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("view", {
                          key: 0,
                          class: "mt-6"
                        }, [
                          (0, import_vue2.createVNode)(__easycom_0, {
                            color: (0, import_vue2.unref)(_computedValue).labelColor,
                            fontSize: 22,
                            label: (0, import_vue2.unref)(_computedValue).label
                          }, null, 8, ["color", "label"])
                        ])) : (0, import_vue2.createCommentVNode)("v-if", true)
                      ])
                    ], 2)
                  ]),
                  (0, import_vue2.createElementVNode)("view", {
                    class: "flex-1 flex-row flex-row-center-end",
                    style: { "width": "0px" }
                  }, [
                    (0, import_vue2.renderSlot)(_ctx.$slots, "rightText", {}, () => [
                      (0, import_vue2.unref)(_computedValue).rightText ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(__easycom_0, {
                        key: 0,
                        _class: "nowrap pr-12",
                        color: (0, import_vue2.unref)(_computedValue).rightColor,
                        fontSize: (0, import_vue2.unref)(_computedValue).rightTextSize,
                        label: (0, import_vue2.unref)(_computedValue).rightText
                      }, null, 8, ["color", "fontSize", "label"])) : (0, import_vue2.createCommentVNode)("v-if", true)
                    ]),
                    (0, import_vue2.renderSlot)(_ctx.$slots, "right", {}, () => [
                      (0, import_vue2.unref)(_computedValue).rightIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(tmIcon, {
                        key: 0,
                        _class: "opacity-3",
                        name: (0, import_vue2.unref)(_computedValue).rightIcon,
                        fontSize: 22
                      }, null, 8, ["name"])) : (0, import_vue2.createCommentVNode)("v-if", true)
                    ])
                  ])
                ])
              ], 2)
            ]),
            _: 3
          }, 8, ["color", "followTheme", "dark", "followDark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding", "_class", "_style"]),
          (0, import_vue2.unref)(_computedValue).bottomBorder ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(__easycom_1, {
            key: 0,
            margin: [0, 0],
            style: (0, import_vue2.normalizeStyle)({
              left: `${(0, import_vue2.unref)(_computedValue).avatar !== "" ? (0, import_vue2.unref)(_computedValue).avatarSize + (0, import_vue2.unref)(_computedValue).margin[0] : 0}rpx`
            })
          }, null, 8, ["style"])) : (0, import_vue2.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var tmCell = /* @__PURE__ */ _export_sfc(_sfc_main2, [["styles", [_style_02]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-cell/tm-cell.vue"]]);

  // dist/dev/.nvue/request.js
  var import_vue3 = __toESM(require_vue());
  var __defProp4 = Object.defineProperty;
  var __defProps3 = Object.defineProperties;
  var __getOwnPropDescs3 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
  var __hasOwnProp4 = Object.prototype.hasOwnProperty;
  var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues3 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp4.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    if (__getOwnPropSymbols3)
      for (var prop of __getOwnPropSymbols3(b)) {
        if (__propIsEnum3.call(b, prop))
          __defNormalProp3(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps3 = (a, b) => __defProps3(a, __getOwnPropDescs3(b));
  var _sfc_main$52 = /* @__PURE__ */ (0, import_vue3.defineComponent)({
    __name: "tm-badge",
    props: __spreadProps3(__spreadValues3({}, custom_props), {
      round: {
        type: [Number],
        default: 6
      },
      border: {
        type: [Number],
        default: 0
      },
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      transprent: {
        type: [Boolean],
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      fontSize: {
        type: Number,
        default: 22
      },
      status: {
        type: [Boolean],
        default: false
      },
      dot: {
        type: [Boolean],
        default: false
      },
      icon: {
        type: [String],
        default: ""
      },
      count: {
        type: [Number, String],
        default: 0
      },
      maxCount: {
        type: [Number],
        default: 999
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const customCSSStyle = (0, import_vue3.computed)(() => computedStyle(props));
      const customClass = (0, import_vue3.computed)(() => computedClass(props));
      const istext = (0, import_vue3.computed)(() => {
        return isNaN(parseInt(String(props.count)));
      });
      const show = (0, import_vue3.computed)(() => {
        if (!props.dot && !props.icon && !props.count)
          return false;
        return true;
      });
      const size = (0, import_vue3.computed)(() => {
        if (props.status || props.dot) {
          return {
            w: 12,
            h: 12,
            pr: 6,
            t: 3
          };
        }
        if (props.icon) {
          let p = props.fontSize * 1.6;
          return {
            w: p,
            h: p,
            pr: 12,
            t: 10
          };
        }
        if (isNaN(parseInt(String(props.count)))) {
          return {
            w: 0,
            h: 0,
            pr: 10,
            t: 10
          };
        }
        if (props.count < 10) {
          return {
            w: 30,
            h: 30,
            pr: 12,
            t: 10
          };
        }
        if (props.count >= 10) {
          return {
            w: 0,
            h: 0,
            pr: 10,
            t: 10
          };
        }
        return {
          w: 0,
          h: 0,
          pr: 0,
          t: 0
        };
      });
      const _icon = (0, import_vue3.computed)(() => props.icon);
      const _dot = (0, import_vue3.computed)(() => props.dot);
      const _count = (0, import_vue3.computed)(() => props.count);
      return (_ctx, _cache) => {
        return (0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", {
          class: (0, import_vue3.normalizeClass)(["flex relative", [props.status ? "flex-row flex-row-center-center mx-8" : ""]])
        }, [
          !props.status ? ((0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", { key: 0 }, [
            (0, import_vue3.renderSlot)(_ctx.$slots, "default")
          ])) : (0, import_vue3.createCommentVNode)("v-if", true),
          (0, import_vue3.unref)(show) ? ((0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", {
            key: 1,
            class: (0, import_vue3.normalizeClass)([
              ((0, import_vue3.unref)(_dot) || (0, import_vue3.unref)(_count) || (0, import_vue3.unref)(_icon)) && !props.status ? "absolute flex-top-start-end r-0" : ""
            ]),
            style: { zIndex: 10 }
          }, [
            (0, import_vue3.createVNode)(__easycom_3, {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              color: props.color,
              _class: [(0, import_vue3.unref)(customClass), "flex-center flex-col"],
              _style: [(0, import_vue3.unref)(customCSSStyle), { flexShrink: 1 }],
              followTheme: props.followTheme,
              dark: props.dark,
              round: props.round,
              shadow: props.shadow,
              outlined: props.outlined,
              border: props.border,
              borderStyle: props.borderStyle,
              borderDirection: props.borderDirection,
              text: props.text,
              transprent: props.transprent,
              linear: props.linear,
              linearDeep: props.linearDeep,
              width: (0, import_vue3.unref)(size).w,
              height: (0, import_vue3.unref)(size).h,
              margin: props.margin,
              padding: props.padding
            }, {
              default: (0, import_vue3.withCtx)(() => [
                (0, import_vue3.unref)(_count) > 0 && !(0, import_vue3.unref)(istext) ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(__easycom_0, {
                  key: 0,
                  color: "white",
                  "font-size": props.fontSize,
                  _class: (0, import_vue3.unref)(size).h == 0 ? "py-3 px-8" : "",
                  label: (0, import_vue3.unref)(_count) > props.maxCount ? props.maxCount + "+" : (0, import_vue3.unref)(_count)
                }, null, 8, ["font-size", "_class", "label"])) : (0, import_vue3.createCommentVNode)("v-if", true),
                (0, import_vue3.unref)(_count) && (0, import_vue3.unref)(istext) ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(__easycom_0, {
                  key: 1,
                  color: "white",
                  "font-size": props.fontSize,
                  _class: (0, import_vue3.unref)(size).h == 0 ? "py-3 px-8" : "",
                  label: (0, import_vue3.unref)(_count)
                }, null, 8, ["font-size", "_class", "label"])) : (0, import_vue3.createCommentVNode)("v-if", true),
                (0, import_vue3.unref)(_icon) ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(tmIcon, {
                  key: 2,
                  color: "white",
                  "font-size": props.fontSize,
                  name: (0, import_vue3.unref)(_icon)
                }, null, 8, ["font-size", "name"])) : (0, import_vue3.createCommentVNode)("v-if", true)
              ]),
              _: 1
            }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"])
          ], 2)) : (0, import_vue3.createCommentVNode)("v-if", true),
          props.status ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(__easycom_0, {
            key: 2,
            "font-size": props.fontSize,
            _class: "ml-10",
            label: props.label
          }, null, 8, ["font-size", "label"])) : (0, import_vue3.createCommentVNode)("v-if", true)
        ], 2);
      };
    }
  });
  var tmBadge = /* @__PURE__ */ _export_sfc(_sfc_main$52, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-badge/tm-badge.vue"]]);
  var _sfc_main$43 = /* @__PURE__ */ (0, import_vue3.defineComponent)({
    __name: "tm-tabbar-item",
    props: __spreadProps3(__spreadValues3({}, custom_props), {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      transprent: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: "white"
      },
      fontColor: {
        type: String,
        default: "grey-darken-1"
      },
      linear: {
        type: String,
        default: ""
      },
      activeColor: {
        type: String,
        default: "primary"
      },
      active: {
        type: Boolean,
        default: false
      },
      btnTop: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ""
      },
      icon: {
        type: String,
        default: ""
      },
      unicon: {
        type: String,
        default: ""
      },
      textSize: {
        type: Number,
        default: 20
      },
      iconSize: {
        type: Number,
        default: 38
      },
      dot: {
        type: [Boolean],
        default: false
      },
      dotColor: {
        type: [String],
        default: "red"
      },
      dotIcon: {
        type: [String],
        default: ""
      },
      count: {
        type: [Number, String],
        default: 0
      },
      maxCount: {
        type: [Number],
        default: 99
      },
      url: {
        type: [String],
        default: ""
      },
      openType: {
        type: String,
        default: "navigate"
      },
      beforeClick: {
        type: [Function, Boolean],
        default: () => false
      },
      load: {
        type: [Boolean, String],
        default: false
      },
      data: {
        type: [Object, String, Number],
        default: () => void 0
      }
    }),
    emits: ["click", "beforeClick"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = (0, import_vue3.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _btnTop = (0, import_vue3.computed)(() => props.btnTop);
      const _transprent = (0, import_vue3.computed)(() => {
        if (_btnTop.value === true)
          return false;
        return true;
      });
      const _styletop = (0, import_vue3.computed)(() => {
        if (_btnTop.value !== true)
          return "top:15px";
        return "top:0px";
      });
      const _padding = (0, import_vue3.computed)(() => {
        return [0, 0];
      });
      const _load = (0, import_vue3.ref)(props.load);
      const _active = (0, import_vue3.ref)(false);
      const c_font_style = (0, import_vue3.computed)(() => {
        return { dotColor: props.dotColor, text: props.text, icon: props.icon, textSize: props.textSize, iconSize: props.iconSize, unicon: props.unicon };
      });
      const uid = uni.$tm.u.getUid(1);
      const tmTabbarWidth = (0, import_vue3.inject)("tmTabbarWidth", (0, import_vue3.computed)(() => 50));
      const _width = (0, import_vue3.computed)(() => {
        if (_btnTop.value === true)
          return 60;
        return tmTabbarWidth.value;
      });
      (0, import_vue3.inject)("tmTabbarUrl", (0, import_vue3.computed)(() => ""));
      const tmTabbarItemList = (0, import_vue3.inject)("tmTabbarItemList", (0, import_vue3.computed)(() => []));
      const nowUid = (0, import_vue3.inject)("tmTabbarUid", (0, import_vue3.computed)(() => ""));
      (0, import_vue3.inject)("tmTabbarItemSafe", false);
      const tmTabbarItemActive = (0, import_vue3.inject)("tmTabbarItemActive", (0, import_vue3.computed)(() => -1));
      const tmTabbarItemAutoSelect = (0, import_vue3.inject)("tmTabbarItemAutoSelect", (0, import_vue3.computed)(() => false));
      const _color = (0, import_vue3.computed)(() => {
        if (_active.value === true && !_btnTop.value) {
          if (store.tmStore.color && props.followTheme) {
            return store.tmStore.color;
          }
          return props.activeColor;
        }
        return props.fontColor;
      });
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.tmTabbarId) == "tmTabbarId" || !parent) {
          break;
        } else {
          parent = (_c = parent == null ? void 0 : parent.$parent) != null ? _c : void 0;
        }
      }
      if (parent) {
        parent.pushKey(uid);
      }
      (0, import_vue3.onUnmounted)(() => {
        if (parent) {
          parent.delKey(uid);
        }
      });
      if (tmTabbarItemAutoSelect.value) {
        _active.value = props.active || false;
      } else {
        if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
          _active.value = true;
        } else {
          _active.value = false;
        }
      }
      function setActive() {
        if (nowUid.value == uid) {
          _active.value = true;
        } else {
          _active.value = false;
        }
      }
      (0, import_vue3.watch)([nowUid, () => props.active], () => {
        if (tmTabbarItemAutoSelect.value) {
          setActive();
        }
      });
      (0, import_vue3.watch)(tmTabbarItemActive, () => {
        if (!tmTabbarItemAutoSelect.value) {
          if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
            (0, import_vue3.nextTick)(() => {
              _active.value = true;
            });
          } else {
            (0, import_vue3.nextTick)(() => {
              _active.value = false;
            });
          }
        }
      });
      (0, import_vue3.watch)([() => props.load], () => {
        _load.value = props.load;
      });
      function itemClick() {
        return __async(this, null, function* () {
          if (_load.value)
            return;
          if (typeof props.beforeClick === "function") {
            _load.value = true;
            let p = yield props.beforeClick(props.data);
            if (typeof p === "function") {
              p = yield p(props.data);
            }
            _load.value = false;
            if (!p)
              return;
          }
          emits("click");
          (0, import_vue3.nextTick)(() => {
            if (tmTabbarItemAutoSelect.value) {
              if (parent) {
                parent.setNowurl(props.url, uid);
              }
              setActive();
            }
            if (props.url == "")
              return;
            uni.$tm.u.routerTo(props.url, props.openType);
          });
        });
      }
      return (_ctx, _cache) => {
        return (0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", {
          class: "flex flex-col flex-col-top-center",
          style: { "height": "75px" }
        }, [
          (0, import_vue3.createVNode)(__easycom_3, {
            height: 60,
            width: (0, import_vue3.unref)(_width),
            round: 24,
            unit: "px",
            _class: "flex-center flex ",
            parenClass: "relative",
            class: "relative",
            _style: (0, import_vue3.unref)(_styletop),
            followTheme: (0, import_vue3.unref)(_btnTop) && props.followTheme,
            transprent: (0, import_vue3.unref)(_transprent),
            color: props.color,
            margin: [0, 0],
            padding: (0, import_vue3.unref)(_padding),
            shadow: props.shadow,
            outlined: props.outlined,
            border: props.border,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            linear: props.linear,
            linearDeep: props.linearDeep,
            onClick: itemClick
          }, {
            default: (0, import_vue3.withCtx)(() => [
              (0, import_vue3.createVNode)(tmBadge, {
                fontSize: 20,
                color: (0, import_vue3.unref)(c_font_style).dotColor,
                eventPenetrationEnabled: true,
                dot: props.dot,
                count: props.count,
                icon: props.dotIcon,
                maxCount: props.maxCount
              }, {
                default: (0, import_vue3.withCtx)(() => [
                  (0, import_vue3.createElementVNode)("view", {
                    class: (0, import_vue3.normalizeClass)([[_active.value ? "anifun" : ""], "flex flex-col flex-col-center-center"]),
                    style: { width: 65 + "px", height: "30px" }
                  }, [
                    (0, import_vue3.renderSlot)(_ctx.$slots, "default", {}, () => [
                      !_load.value ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(tmIcon, {
                        key: 0,
                        _style: "line-height: 0px;",
                        color: (0, import_vue3.unref)(_color),
                        "font-size": (0, import_vue3.unref)(c_font_style).iconSize,
                        name: _active.value ? (0, import_vue3.unref)(c_font_style).icon : (0, import_vue3.unref)(c_font_style).unicon || (0, import_vue3.unref)(c_font_style).icon
                      }, null, 8, ["color", "font-size", "name"])) : (0, import_vue3.createCommentVNode)("v-if", true)
                    ]),
                    _load.value ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(tmIcon, {
                      key: 0,
                      spin: "",
                      _style: "line-height: 0px;",
                      color: (0, import_vue3.unref)(_color),
                      "font-size": (0, import_vue3.unref)(c_font_style).iconSize,
                      name: "tmicon-loading"
                    }, null, 8, ["color", "font-size"])) : (0, import_vue3.createCommentVNode)("v-if", true)
                  ], 2)
                ]),
                _: 3
              }, 8, ["color", "dot", "count", "icon", "maxCount"]),
              (0, import_vue3.unref)(c_font_style).text !== "" ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(__easycom_0, {
                key: 0,
                color: (0, import_vue3.unref)(_color),
                _class: "pb-0",
                "font-size": (0, import_vue3.unref)(c_font_style).textSize,
                label: (0, import_vue3.unref)(c_font_style).text
              }, null, 8, ["color", "font-size", "label"])) : (0, import_vue3.createCommentVNode)("v-if", true)
            ]),
            _: 3
          }, 8, ["width", "_style", "followTheme", "transprent", "color", "padding", "shadow", "outlined", "border", "borderStyle", "borderDirection", "linear", "linearDeep"])
        ]);
      };
    }
  });
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$43, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabbar-item/tm-tabbar-item.vue"]]);
  var _style_0$22 = { "barcont": { "": { "display": "flex", "flexDirection": "row", "justifyContent": "space-around", "alignItems": "center" } } };
  var _sfc_main$33 = /* @__PURE__ */ (0, import_vue3.defineComponent)({
    __name: "tm-tabbar",
    props: __spreadProps3(__spreadValues3({}, custom_props), {
      transprent: {
        type: [Boolean],
        default: false
      },
      color: {
        type: [String],
        default: "white"
      },
      text: {
        type: [Boolean],
        default: false
      },
      round: {
        type: [Number],
        default: 0
      },
      shadow: {
        type: [Number],
        default: 0
      },
      width: {
        type: [Number],
        default: 0
      },
      bottom: {
        type: [Number],
        default: 0
      },
      showSafe: {
        type: [Boolean],
        default: false
      },
      active: {
        type: Number,
        default: -1
      },
      autoSelect: {
        type: Boolean,
        default: true
      }
    }),
    emits: ["change", "update:active"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      useTmpiniaStore();
      let sys = uni.getSystemInfoSync();
      const _width = uni.upx2px(props.width) || ((_a2 = sys == null ? void 0 : sys.windowWidth) != null ? _a2 : 0);
      const _blur = (0, import_vue3.computed)(() => props.blur);
      const _activeUrl = (0, import_vue3.ref)("");
      const _activeUid = (0, import_vue3.ref)("");
      const tmTabbarId = "tmTabbarId";
      const _cachlist = (0, import_vue3.ref)([]);
      const _showSafe = (0, import_vue3.ref)(props.showSafe);
      const _activeIndex = (0, import_vue3.ref)(props.active);
      const win_bottom = (_c = (_b2 = sys == null ? void 0 : sys.safeAreaInsets) == null ? void 0 : _b2.bottom) != null ? _c : 0;
      if (win_bottom > 0) {
        _showSafe.value = true;
      }
      const _totalBarHeight = (0, import_vue3.computed)(() => {
        if (_showSafe.value)
          return 90;
        return 75;
      });
      const _BarHeight = (0, import_vue3.computed)(() => {
        if (_showSafe.value)
          return 75;
        return 60;
      });
      function setNowurl(url, nowuid) {
        _activeUrl.value = url;
        _activeUid.value = String(nowuid);
      }
      function pushKey(uid) {
        _cachlist.value = [.../* @__PURE__ */ new Set([..._cachlist.value, uid])];
      }
      function delKey(uid) {
        _cachlist.value = _cachlist.value.filter((el) => el != uid);
      }
      expose({ tmTabbarId, setNowurl, pushKey, delKey });
      (0, import_vue3.provide)("tmTabbarUrl", (0, import_vue3.computed)(() => _activeUrl.value));
      (0, import_vue3.provide)("tmTabbarUid", (0, import_vue3.computed)(() => _activeUid.value));
      (0, import_vue3.provide)("tmTabbarWidth", (0, import_vue3.computed)(() => Math.ceil(_width / _cachlist.value.length)));
      (0, import_vue3.provide)("tmTabbarItemList", (0, import_vue3.computed)(() => _cachlist.value));
      (0, import_vue3.provide)("tmTabbarItemActive", (0, import_vue3.computed)(() => _activeIndex.value));
      (0, import_vue3.provide)("tmTabbarItemSafe", _showSafe.value);
      (0, import_vue3.provide)("tmTabbarItemAutoSelect", (0, import_vue3.computed)(() => props.autoSelect));
      (0, import_vue3.watch)(() => props.active, () => {
        if (props.active == _activeIndex.value)
          return;
        _activeIndex.value = props.active;
      });
      (0, import_vue3.watch)(_activeIndex, () => {
        emits("change", _activeIndex.value);
        emits("update:active", _activeIndex.value);
      });
      return (_ctx, _cache) => {
        return (0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", {
          class: "fixed l-0 b-0 flex",
          style: (0, import_vue3.normalizeStyle)({ width: (0, import_vue3.unref)(_width) + "px", height: (0, import_vue3.unref)(_totalBarHeight) + "px", transform: `translateY(${props.bottom}rpx)` })
        }, [
          (0, import_vue3.createCommentVNode)(` 			@click="emits('click', $event)"    `),
          (0, import_vue3.createElementVNode)("view", {
            class: "relative",
            style: { "top": "15px" }
          }, [
            (0, import_vue3.createVNode)(__easycom_3, {
              blur: (0, import_vue3.unref)(_blur),
              color: props.color,
              parenClass: "relative",
              class: "relative",
              followTheme: props.followTheme,
              dark: props.dark,
              round: props.round,
              shadow: props.shadow,
              outlined: props.outlined,
              border: 0,
              borderDirection: "top",
              text: props.text,
              transprent: false,
              linear: props.linear,
              linearDeep: props.linearDeep,
              margin: [0, 0],
              padding: [0, 0],
              height: (0, import_vue3.unref)(_BarHeight),
              width: (0, import_vue3.unref)(_width),
              unit: "px"
            }, null, 8, ["blur", "color", "followTheme", "dark", "round", "shadow", "outlined", "text", "linear", "linearDeep", "height", "width"])
          ]),
          (0, import_vue3.createElementVNode)("view", {
            class: "absolute flex flex-col l-0",
            style: (0, import_vue3.normalizeStyle)({ width: (0, import_vue3.unref)(_width) + "px", height: (0, import_vue3.unref)(_totalBarHeight) + "px" })
          }, [
            (0, import_vue3.createElementVNode)("view", {
              class: "relative barcont flex flex-row flex-row-top-center flex-around flex-1",
              style: (0, import_vue3.normalizeStyle)({ width: (0, import_vue3.unref)(_width) + "px" })
            }, [
              (0, import_vue3.renderSlot)(_ctx.$slots, "default")
            ], 4)
          ], 4)
        ], 4);
      };
    }
  });
  var __easycom_12 = /* @__PURE__ */ _export_sfc(_sfc_main$33, [["styles", [_style_0$22]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabbar/tm-tabbar.vue"]]);
  var _sfc_main$23 = {
    name: "tab-bar",
    props: {
      active: {
        type: Number,
        default() {
          return [];
        }
      }
    },
    methods: {
      beforeClick(index2) {
        formatAppLog("log", "at components/TheTabBar.vue:22", index2);
        return this.active !== index2;
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tm_tabbar_item = resolveEasycom((0, import_vue3.resolveDynamicComponent)("tm-tabbar-item"), __easycom_0$1);
    const _component_tm_tabbar = resolveEasycom((0, import_vue3.resolveDynamicComponent)("tm-tabbar"), __easycom_12);
    return (0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(_component_tm_tabbar, {
      transprent: "",
      blur: "",
      bottom: 0,
      round: 16,
      "auto-select": false,
      active: $props.active,
      shadow: 8
    }, {
      default: (0, import_vue3.withCtx)(() => [
        (0, import_vue3.createVNode)(_component_tm_tabbar_item, {
          activeColor: "primary",
          beforeClick: $options.beforeClick,
          data: 0,
          blur: "",
          active: $props.active === 0,
          transprent: "",
          "open-type": "switchTab",
          url: "/pages/index/index",
          text: "\u4E3B\u9875",
          icon: "tmicon-wind-smile"
        }, null, 8, ["beforeClick", "active"]),
        (0, import_vue3.createVNode)(_component_tm_tabbar_item, {
          url: "/pages/news/news",
          text: "\u5DE5\u9662",
          blur: "",
          beforeClick: $options.beforeClick,
          data: 1,
          transprent: "",
          "open-type": "switchTab",
          unicon: "tmicon-news",
          icon: "tmicon-news"
        }, null, 8, ["beforeClick"]),
        (0, import_vue3.createVNode)(_component_tm_tabbar_item, {
          url: "/pages/erke/erke",
          beforeClick: $options.beforeClick,
          count: "",
          dotColor: "blue",
          data: 2,
          blur: "",
          transprent: "",
          text: "\u4E8C\u8BFE",
          "open-type": "switchTab",
          unicon: "tmicon-layergroup-fill",
          icon: "tmicon-layergroup-fill"
        }, null, 8, ["beforeClick"]),
        (0, import_vue3.createVNode)(_component_tm_tabbar_item, {
          url: "/pages/kebiao/index",
          beforeClick: $options.beforeClick,
          count: "",
          dotColor: "blue",
          data: 3,
          blur: "",
          transprent: "",
          text: "\u8BFE\u8868",
          "open-type": "switchTab",
          unicon: "tmicon-calendar-alt",
          icon: "tmicon-calendar-alt"
        }, null, 8, ["beforeClick"]),
        (0, import_vue3.createVNode)(_component_tm_tabbar_item, {
          url: "/pages/me/me2/me2",
          beforeClick: $options.beforeClick,
          count: "",
          dotColor: "blue",
          data: 4,
          blur: "",
          transprent: "",
          text: "\u6211\u7684",
          "open-type": "switchTab",
          unicon: "tmicon-account",
          icon: "tmicon-account"
        }, null, 8, ["beforeClick"])
      ]),
      _: 1
    }, 8, ["active"]);
  }
  var TabBar = /* @__PURE__ */ _export_sfc(_sfc_main$23, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/TheTabBar.vue"]]);
  var _style_0$13 = { "tm-sticky": { "": { "position": "sticky" } } };
  var _sfc_main$13 = /* @__PURE__ */ (0, import_vue3.defineComponent)({
    __name: "tm-sticky",
    props: {
      model: {
        type: String,
        default: "top"
      },
      offset: {
        type: [String, Number],
        default: "0px"
      },
      zIndex: {
        type: Number,
        default: 50
      }
    },
    setup(__props) {
      const props = __props;
      const _offset = (0, import_vue3.computed)(() => {
        if (typeof props.offset === "number")
          return props.offset + "rpx";
        return props.offset;
      });
      return (_ctx, _cache) => {
        return (0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", null, [
          (0, import_vue3.createElementVNode)("view", {
            class: "tm-sticky flex flex-col",
            style: (0, import_vue3.normalizeStyle)([
              props.model == "top" ? { top: `${(0, import_vue3.unref)(_offset)}` } : "",
              props.model == "left" ? { left: `${(0, import_vue3.unref)(_offset)}` } : "",
              { "z-index": props.zIndex }
            ])
          }, [
            (0, import_vue3.createElementVNode)("view", { class: "flex flex-col" }, [
              (0, import_vue3.renderSlot)(_ctx.$slots, "sticky")
            ])
          ], 4),
          (0, import_vue3.createElementVNode)("view", null, [
            (0, import_vue3.renderSlot)(_ctx.$slots, "default")
          ])
        ]);
      };
    }
  });
  var __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["styles", [_style_0$13]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-sticky/tm-sticky.vue"]]);
  var _style_03 = { "statusHeightTop": { "": { "zIndex": 400 } } };
  var _sfc_main3 = /* @__PURE__ */ (0, import_vue3.defineComponent)({
    __name: "tm-navbar",
    props: __spreadProps3(__spreadValues3({}, custom_props), {
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: [String],
        default: "white"
      },
      text: {
        type: [Boolean],
        default: false
      },
      border: {
        type: [Number],
        default: 0
      },
      shadow: {
        type: [Number],
        default: 1
      },
      borderDirection: {
        type: String,
        default: "bottom"
      },
      round: {
        type: [Number],
        default: 0
      },
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      height: {
        type: [Number],
        default: 44
      },
      leftWidth: {
        type: [Number],
        default: 220
      },
      rightWidth: {
        type: [Number],
        default: 220
      },
      fontSize: {
        type: [Number],
        default: 30
      },
      iconFontSize: {
        type: [Number],
        default: 37
      },
      title: {
        type: [String],
        default: "\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898\u6807\u9898"
      },
      fontColor: {
        type: [String],
        default: ""
      },
      homeColor: {
        type: [String],
        default: ""
      },
      hideHome: {
        type: Boolean,
        default: false
      },
      hideBack: {
        type: Boolean,
        default: true
      },
      homePath: {
        type: [String],
        default: "/pages/index/index"
      },
      beforeBack: {
        type: [Boolean, Function],
        default: () => true
      },
      blur: {
        type: Boolean,
        default: false
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["click", "close"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      useTmpiniaStore();
      (_b2 = (_a2 = (0, import_vue3.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _height = (0, import_vue3.computed)(() => props.height);
      const _width = uni.getSystemInfoSync().windowWidth;
      const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
      const _barHeight = (0, import_vue3.computed)(() => statusBarHeight + _height.value);
      const _leftWidth = (0, import_vue3.computed)(() => props.leftWidth);
      const _rightWidth = (0, import_vue3.computed)(() => props.rightWidth);
      const contentwidth = (0, import_vue3.computed)(() => {
        return _width - uni.upx2px(_leftWidth.value) - uni.upx2px(_rightWidth.value);
      });
      const _title = (0, import_vue3.computed)(() => props.title);
      const _fontColor = (0, import_vue3.computed)(() => props.fontColor);
      const _homeColor = (0, import_vue3.computed)(() => props.homeColor);
      const _blur = (0, import_vue3.computed)(() => props.blur);
      const _pages = (0, import_vue3.ref)(0);
      (0, import_vue3.onMounted)(() => {
        _pages.value = getCurrentPages().length;
      });
      const backhome = () => {
        uni.reLaunch({
          url: props.homePath
        });
      };
      let timerId = NaN;
      function debounce(func, wait = 500, immediate = false) {
        if (!isNaN(timerId))
          clearTimeout(timerId);
        if (immediate) {
          var callNow = !timerId;
          timerId = setTimeout(() => {
            timerId = NaN;
          }, wait);
          if (callNow)
            typeof func === "function" && func();
        } else {
          timerId = setTimeout(() => {
            typeof func === "function" && func();
          }, wait);
        }
      }
      const goback = () => {
        debounce(() => __async(this, null, function* () {
          if (typeof props.beforeBack === "function") {
            let p = yield props.beforeBack();
            if (typeof p === "function") {
              p = yield p();
            }
            if (!p)
              return;
          }
          uni.navigateBack({});
        }), 250, true);
      };
      return (_ctx, _cache) => {
        return (0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("view", null, [
          (0, import_vue3.createElementVNode)("view", {
            class: "statusHeight",
            style: (0, import_vue3.normalizeStyle)({ height: (0, import_vue3.unref)(_barHeight) + "px" })
          }, null, 4),
          (0, import_vue3.createElementVNode)("view", {
            class: "fixed l-0 t-0 statusHeightTop flex",
            style: (0, import_vue3.normalizeStyle)({ width: (0, import_vue3.unref)(_width) + "px", height: (0, import_vue3.unref)(_barHeight) + "px" })
          }, [
            (0, import_vue3.createVNode)(__easycom_3, {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              blur: (0, import_vue3.unref)(_blur),
              color: props.color,
              _class: _ctx._class,
              _style: _ctx._style,
              followTheme: props.followTheme,
              "follow-dark": props.followDark,
              dark: props.dark,
              round: props.round,
              shadow: props.shadow,
              outlined: props.outlined,
              border: props.border,
              borderStyle: props.borderStyle,
              borderDirection: props.borderDirection,
              text: props.text,
              transprent: props.transprent,
              linear: props.linear,
              linearDeep: props.linearDeep,
              margin: props.margin,
              padding: props.padding,
              height: (0, import_vue3.unref)(_barHeight),
              width: (0, import_vue3.unref)(_width),
              unit: "px"
            }, {
              default: (0, import_vue3.withCtx)(() => [
                (0, import_vue3.createElementVNode)("view", {
                  class: "statusHeight",
                  style: (0, import_vue3.normalizeStyle)({ height: (0, import_vue3.unref)(statusBarHeight) + "px" })
                }, null, 4),
                (0, import_vue3.createElementVNode)("view", { class: "flex flex-row flex-1 flex-row flex-row-center-betweent" }, [
                  (0, import_vue3.createElementVNode)("view", {
                    class: "flex-row flex flex-row-center-start",
                    style: (0, import_vue3.normalizeStyle)({ width: (0, import_vue3.unref)(_leftWidth) + "rpx" })
                  }, [
                    _pages.value > 1 && props.hideBack ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(tmIcon, {
                      key: 0,
                      unit: props.unit,
                      "font-size": props.iconFontSize,
                      _class: "pointer pb-12 pt-12 px-24",
                      color: (0, import_vue3.unref)(_homeColor),
                      onClick: goback,
                      name: "tmicon-angle-left"
                    }, null, 8, ["unit", "font-size", "color"])) : (0, import_vue3.createCommentVNode)("v-if", true),
                    _pages.value == 1 && !__props.hideHome ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(tmIcon, {
                      key: 1,
                      unit: props.unit,
                      _class: "pointer  pb-12 pt-12 px-24",
                      onClick: backhome,
                      color: (0, import_vue3.unref)(_homeColor),
                      "font-size": props.iconFontSize,
                      name: "tmicon-md-home"
                    }, null, 8, ["unit", "color", "font-size"])) : (0, import_vue3.createCommentVNode)("v-if", true),
                    (0, import_vue3.renderSlot)(_ctx.$slots, "left")
                  ], 4),
                  (0, import_vue3.createElementVNode)("view", {
                    class: "flex flex-row-center-center",
                    style: (0, import_vue3.normalizeStyle)({ width: (0, import_vue3.unref)(contentwidth) + "px" })
                  }, [
                    (0, import_vue3.renderSlot)(_ctx.$slots, "default", {}, () => [
                      (0, import_vue3.createVNode)(__easycom_0, {
                        unit: props.unit,
                        _class: "text-weight-b text-overflow-1",
                        color: (0, import_vue3.unref)(_fontColor),
                        "font-size": props.fontSize,
                        label: (0, import_vue3.unref)(_title)
                      }, null, 8, ["unit", "color", "font-size", "label"])
                    ])
                  ], 4),
                  (0, import_vue3.createElementVNode)("view", {
                    class: "flex-row flex flex-row-center-end",
                    style: (0, import_vue3.normalizeStyle)({ width: (0, import_vue3.unref)(_rightWidth) + "rpx" })
                  }, [
                    (0, import_vue3.renderSlot)(_ctx.$slots, "right")
                  ], 4)
                ])
              ]),
              _: 3
            }, 8, ["blur", "color", "_class", "_style", "followTheme", "follow-dark", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "margin", "padding", "height", "width"])
          ], 4)
        ]);
      };
    }
  });
  var __easycom_02 = /* @__PURE__ */ _export_sfc(_sfc_main3, [["styles", [_style_03]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-navbar/tm-navbar.vue"]]);
  var baseUrl = "https://wx.jaycao.com/";
  var request = (opts, data) => {
    uni.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        uni.showToast({
          title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
          icon: "none"
        });
      }
      return false;
    });
    let httpDefaultOpts = {
      url: opts.url,
      data,
      method: opts.method,
      header: opts.method == "get" ? {
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      } : {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json; charset=UTF-8"
      },
      dataType: "json"
    };
    let promise = new Promise(function(resolve, reject) {
      uni.request(httpDefaultOpts).then((res) => {
        resolve(res);
      }).catch((response) => {
        reject(response);
      });
    });
    return promise;
  };
  var httpRequest = (opts, data) => {
    uni.showLoading({
      title: "\u52A0\u8F7D\u4E2D"
    });
    uni.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        uni.showToast({
          title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
          icon: "none"
        });
      }
      return false;
    });
    let httpDefaultOpts = {
      url: baseUrl + opts.url,
      data,
      method: opts.method,
      header: opts.method == "get" ? {
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      } : {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json; charset=UTF-8"
      },
      dataType: "json"
    };
    let promise = new Promise(function(resolve, reject) {
      uni.request(httpDefaultOpts).then((res) => {
        uni.hideLoading();
        resolve(res);
      }).catch((response) => {
        uni.hideLoading();
        reject(response);
      });
    });
    return promise;
  };
  var httpTokenRequest = (opts, data) => {
    uni.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        uni.showToast({
          title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
          icon: "none"
        });
      }
      return false;
    });
    let token = uni.getStorageSync("token");
    if (token == "" || token == void 0 || token == null) {
      uni.showToast({
        title: "\u8D26\u53F7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
        icon: "none",
        complete: function() {
          uni.setStorage({
            key: "login_id",
            data: false,
            success: () => {
              uni.reLaunch({
                url: "/pages/login/login"
              });
            }
          });
        }
      });
    } else {
      uni.showLoading({});
      let httpDefaultOpts = {
        url: baseUrl + opts.url,
        data,
        method: opts.method,
        header: opts.method == "get" ? {
          "Authorization": "wx " + token,
          "X-Requested-With": "XMLHttpRequest",
          "Accept": "application/json",
          "Content-Type": "application/json; charset=UTF-8"
        } : {
          "Authorization": "wx " + token,
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json; charset=UTF-8"
        },
        dataType: "json"
      };
      let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then((res) => {
          if (res.data.code == 200) {
            uni.hideLoading();
            resolve(res);
          } else {
            uni.hideLoading();
            if (res.data.code == 401) {
              uni.showToast({
                title: "Token\u5DF2\u8FC7\u671F",
                icon: "none"
              });
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/login/login"
                });
                uni.setStorageSync("login_id", false);
              }, 1e3);
            } else {
              uni.hideLoading();
              resolve(res);
            }
          }
        }).catch((response) => {
          uni.hideLoading();
          reject(response);
        });
      });
      return promise;
    }
  };
  var httpupload = (opts, data) => {
    uni.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        uni.showToast({
          title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
          icon: "none"
        });
      }
      return false;
    });
    let token = uni.getStorageSync("token");
    if (token == "" || token == void 0 || token == null) {
      uni.showToast({
        title: "\u8D26\u53F7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
        icon: "none",
        complete: function() {
          uni.setStorage({
            key: "login_id",
            data: false,
            success: () => {
              uni.reLaunch({
                url: "/pages/login/login"
              });
            }
          });
        }
      });
    } else {
      let httpDefaultOpts = {
        url: baseUrl + opts.url,
        filePath: opts.filePath,
        name: "image",
        formData: {},
        header: {
          "Authorization": "wx " + token,
          "X-Requested-With": "XMLHttpRequest"
        }
      };
      let promise = new Promise(function(resolve, reject) {
        uni.uploadFile(httpDefaultOpts).then((res) => {
          if (res[1].data.code == 200) {
            resolve(res[1]);
          } else {
            if (res[1].data.code == 401) {
              uni.showToast({
                title: "Token\u5DF2\u8FC7\u671F",
                icon: "none"
              });
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/login/login"
                });
                uni.setStorageSync("login_id", false);
              }, 1e3);
            } else {
              resolve(res[1]);
            }
          }
        }).catch((response) => {
          reject(response);
        });
      });
      return promise;
    }
  };
  var hadToken = () => {
    let token = uni.getStorageSync("token");
    if (token == "" || token == void 0 || token == null) {
      uni.showToast({
        title: "\u8D26\u53F7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
        icon: "none",
        complete: function() {
          uni.reLaunch({
            url: "/pages/login/login"
          });
        }
      });
      return false;
    }
    return true;
  };
  var request$1 = {
    baseUrl,
    httpRequest,
    httpTokenRequest,
    hadToken,
    request,
    httpupload
  };

  // dist/dev/.nvue/pages/index/index.js
  var import_pinia2 = __toESM(require_pinia());
  var __defProp5 = Object.defineProperty;
  var __defProps4 = Object.defineProperties;
  var __getOwnPropDescs4 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols4 = Object.getOwnPropertySymbols;
  var __hasOwnProp5 = Object.prototype.hasOwnProperty;
  var __propIsEnum4 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp4 = (obj, key, value) => key in obj ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues4 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp5.call(b, prop))
        __defNormalProp4(a, prop, b[prop]);
    if (__getOwnPropSymbols4)
      for (var prop of __getOwnPropSymbols4(b)) {
        if (__propIsEnum4.call(b, prop))
          __defNormalProp4(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps4 = (a, b) => __defProps4(a, __getOwnPropDescs4(b));
  var _sfc_main$53 = /* @__PURE__ */ (0, import_vue4.defineComponent)({
    __name: "tm-waterfall-item",
    props: {
      img: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "white"
      },
      round: {
        type: Number,
        default: 4
      }
    },
    emits: ["img-click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const dom = requireNativePlugin("dom");
      const proxy = (_b2 = (_a2 = (0, import_vue4.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _width = (0, import_vue4.inject)("tmWaterFallItemRealWidth", (0, import_vue4.computed)(() => uni.upx2px(_width.value)));
      let _nodeInfo = (0, import_vue4.ref)({
        id: uni.$tm.u.getUid(2),
        width: _width.value,
        height: _width.value,
        imgWidth: _width.value,
        imgHeight: _width.value,
        bottom: 0,
        index: NaN,
        top: 0,
        left: 0
      });
      const isimgLoad = (0, import_vue4.ref)(props.img ? false : true);
      const _parentComs = getParent();
      const isPush = (0, import_vue4.ref)(false);
      if (!_parentComs) {
        formatAppLog("error", "at tmui/components/tm-waterfall-item/tm-waterfall-item.vue:64", "\u8BF7\u4E0D\u8981\u5355\u72EC\u4F7F\u7528\u6B64\u7EC4\u4EF6\uFF0C\u8BF7\u653E\u7F6E\u5728:tm-waterfall\u5185\uFF1B");
      }
      _parentComs.sumTotal(_nodeInfo.value.id);
      (0, import_vue4.onMounted)(() => {
        (0, import_vue4.nextTick)(() => {
          if (isimgLoad.value === true) {
            nvuegetClientRect();
          }
        });
      });
      function imgLoadSuccess(e) {
        const { width, height } = e.detail;
        let _w = _width.value;
        let _height = _w / (width / height);
        _nodeInfo.value = __spreadProps4(__spreadValues4({}, _nodeInfo.value), { imgWidth: _w, imgHeight: _height });
        setTimeout(() => {
          (0, import_vue4.nextTick)(() => nvuegetClientRect());
        }, 50);
      }
      function getParent() {
        var _a22;
        let parent = proxy.$parent;
        while (parent) {
          if ((parent == null ? void 0 : parent.parentNameId) == "tmWaterfallId" || !parent) {
            break;
          } else {
            parent = (_a22 = parent == null ? void 0 : parent.$parent) != null ? _a22 : void 0;
          }
        }
        return parent;
      }
      function nvuegetClientRect() {
        (0, import_vue4.nextTick)(function() {
          dom.getComponentRect(proxy.$refs.itemWall, function(res) {
            if (res == null ? void 0 : res.size) {
              if (res.size.height == 0 && res.size.width == 0) {
                nvuegetClientRect();
              } else {
                isimgLoad.value = true;
                const { width, height } = res.size;
                _nodeInfo.value = __spreadProps4(__spreadValues4({}, _nodeInfo.value), {
                  height
                });
                if (isPush.value === false && isimgLoad.value) {
                  pushKey();
                  isPush.value = true;
                }
              }
            }
          });
        });
      }
      function pushKey() {
        return __async(this, null, function* () {
          if (_parentComs) {
            let pos = yield _parentComs.pushKey((0, import_vue4.toRaw)(_nodeInfo.value));
            _nodeInfo.value = pos;
          }
        });
      }
      function onImgClick(e) {
        emits("img-click", e);
      }
      return (_ctx, _cache) => {
        return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
          ref: "itemWall",
          class: "absolute itemWall",
          style: (0, import_vue4.normalizeStyle)([
            !isPush.value ? { transform: "translateX(-1000px)" } : "",
            isPush.value ? { transform: `translateX(${(0, import_vue4.unref)(_nodeInfo).left}px) translateY(${(0, import_vue4.unref)(_nodeInfo).top}px)` } : ""
          ])
        }, [
          (0, import_vue4.createVNode)(__easycom_3, {
            margin: [0, 0],
            padding: [0, 0],
            round: props.round,
            width: (0, import_vue4.unref)(_width),
            unit: "px",
            color: props.color,
            _class: "flex flex-col flex-col-top-start"
          }, {
            default: (0, import_vue4.withCtx)(() => [
              props.img ? ((0, import_vue4.openBlock)(), (0, import_vue4.createBlock)(__easycom_4, {
                key: 0,
                onClick: onImgClick,
                round: props.round,
                onLoad: imgLoadSuccess,
                src: props.img,
                unit: "px",
                height: (0, import_vue4.unref)(_nodeInfo).imgHeight,
                width: (0, import_vue4.unref)(_nodeInfo).imgWidth
              }, null, 8, ["round", "src", "height", "width"])) : (0, import_vue4.createCommentVNode)("v-if", true),
              (0, import_vue4.createElementVNode)("view", { class: "flex flex-col flex-1 flex-col-top-start" }, [
                (0, import_vue4.renderSlot)(_ctx.$slots, "default")
              ])
            ]),
            _: 3
          }, 8, ["round", "width", "color"])
        ], 4);
      };
    }
  });
  var __easycom_03 = /* @__PURE__ */ _export_sfc(_sfc_main$53, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-waterfall-item/tm-waterfall-item.vue"]]);
  var _sfc_main$44 = /* @__PURE__ */ (0, import_vue4.defineComponent)({
    __name: "tm-waterfall",
    props: {
      width: {
        type: Number,
        default: 750
      },
      gutter: {
        type: Number,
        default: 12
      }
    },
    setup(__props, { expose }) {
      const props = __props;
      const _containerWidth = (0, import_vue4.computed)(() => props.width);
      const _itemRealWidth = (0, import_vue4.computed)(() => {
        return (_containerWidth.value - props.gutter) / 2;
      });
      const parentNameId = "tmWaterfallId";
      const _cacheList = (0, import_vue4.ref)([]);
      const _totalSort = (0, import_vue4.ref)([[], []]);
      const _list = (0, import_vue4.ref)([]);
      const _totalNum = (0, import_vue4.ref)([]);
      const _containerHeight = (0, import_vue4.computed)(() => {
        let lh = _totalSort.value[0].map((el) => el.height);
        let l_height = lh.length == 0 ? 0 : lh.reduce((a, b) => a + b);
        let rh = _totalSort.value[1].map((el) => el.height);
        let r_height = rh.length == 0 ? 0 : rh.reduce((a, b) => a + b);
        return { left: l_height, right: r_height, maxHeight: Math.max(r_height, l_height), minHeight: Math.min(r_height, l_height) };
      });
      (0, import_vue4.provide)("tmWaterFallItemRealWidth", (0, import_vue4.computed)(() => uni.upx2px(_itemRealWidth.value)));
      function sumTotal(id2) {
        _totalNum.value.push(id2);
      }
      function pushKey(n) {
        return __async(this, null, function* () {
          let index2 = _cacheList.value.findIndex((el) => el.id == n.id);
          let item = n;
          if (index2 > -1) {
            _cacheList.value[index2] = item;
            return item;
          } else {
            _cacheList.value.push(item);
            return countPushSort(item);
          }
        });
      }
      function countPushSort(item) {
        var _a2, _b2;
        let dir = _containerHeight.value.left > _containerHeight.value.right ? 1 : 0;
        let bottom = (_b2 = (_a2 = _totalSort.value[dir][_totalSort.value[dir].length - 1]) == null ? void 0 : _a2.bottom) != null ? _b2 : 0;
        item.top = bottom + uni.upx2px(props.gutter);
        item.bottom = item.top + item.height;
        item.left = dir == 0 ? 0 : uni.upx2px(_itemRealWidth.value) + uni.upx2px(props.gutter);
        let index2 = _list.value.findIndex((el) => el.id == item.id);
        _totalSort.value[dir].push(item);
        if (index2 > -1) {
          _list.value[index2] = item;
        } else {
          _list.value.push(item);
        }
        return item;
      }
      expose({ parentNameId, pushKey, sumTotal });
      return (_ctx, _cache) => {
        return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", null, [
          (0, import_vue4.createElementVNode)("view", {
            class: "flex flex-col flex-col-top-start flex-between relative overflow",
            style: (0, import_vue4.normalizeStyle)([{ width: (0, import_vue4.unref)(_containerWidth) + "rpx", height: (0, import_vue4.unref)(_containerHeight).maxHeight + 50 + "px" }])
          }, [
            (0, import_vue4.renderSlot)(_ctx.$slots, "default")
          ], 4),
          (0, import_vue4.createCommentVNode)(" \u865A\u62DF\u52A0\u8F7D\u5360\u4F4D\u7B26\u3002 "),
          _totalNum.value.length != _list.value.length ? ((0, import_vue4.openBlock)(), (0, import_vue4.createBlock)(__easycom_3, {
            key: 0,
            _class: "flex flex-center",
            margin: [0, 0],
            padding: [0, 0]
          }, {
            default: (0, import_vue4.withCtx)(() => [
              (0, import_vue4.createVNode)(tmIcon, {
                name: "tmicon-loading",
                spin: ""
              })
            ]),
            _: 1
          })) : (0, import_vue4.createCommentVNode)("v-if", true)
        ]);
      };
    }
  });
  var __easycom_13 = /* @__PURE__ */ _export_sfc(_sfc_main$44, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-waterfall/tm-waterfall.vue"]]);
  var _sfc_main$34 = /* @__PURE__ */ (0, import_vue4.defineComponent)({
    __name: "tm-grid-item",
    props: __spreadProps4(__spreadValues4({}, custom_props), {
      height: {
        type: Number,
        default: 100
      },
      transprent: {
        type: Boolean,
        default: true
      },
      dot: {
        type: [Boolean, String],
        default: false
      },
      icon: {
        type: [String],
        default: ""
      },
      count: {
        type: [Number, String],
        default: 0
      },
      maxCount: {
        type: [Number, String],
        default: 999
      },
      bgColor: {
        type: String,
        default: "white"
      },
      color: {
        type: String,
        default: "red"
      },
      url: {
        type: String,
        default: ""
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = (0, import_vue4.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = (0, import_vue4.computed)(() => store.tmStore);
      const isDark = (0, import_vue4.computed)(() => computedDark(props, tmcfg.value));
      const tmcomputed = (0, import_vue4.computed)(() => {
        return computedTheme(__spreadProps4(__spreadValues4({}, props), { color: props.bgColor }), isDark.value, tmcfg.value);
      });
      const _colWidth = (0, import_vue4.inject)("tmGridItemWidth", 0);
      const _tmGridshowBorder = (0, import_vue4.inject)("tmGridshowBorder", (0, import_vue4.computed)(() => false));
      const tmGridshowCachList = (0, import_vue4.inject)("tmGridshowCachList", (0, import_vue4.computed)(() => []));
      const uid = (0, import_vue4.ref)({
        id: uni.$tm.u.getUid(1),
        type: ""
      });
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.keyName) == "tmGrid" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
        }
      }
      (0, import_vue4.onMounted)(() => {
        if (parentFormItem == null ? void 0 : parentFormItem.pushKey) {
          parentFormItem.pushKey(uid.value);
        }
      }), (0, import_vue4.onBeforeUnmount)(() => {
        parentFormItem.delKey(uid.value);
      });
      let wkStyle = (0, import_vue4.ref)(`width:${_colWidth}'rpx'`);
      (0, import_vue4.watch)([tmGridshowCachList, _tmGridshowBorder], () => {
        (0, import_vue4.nextTick)(() => setStyleFun());
      }, { deep: true });
      function setStyleFun() {
        let ar = tmGridshowCachList.value.filter((el) => el.id == uid.value.id);
        if (ar.length == 1) {
          uid.value = ar[0];
        }
        if (!_tmGridshowBorder.value) {
          wkStyle.value = `border:0rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
          return;
        }
        if (uid.value.type == 1) {
          wkStyle.value = `border:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
        }
        if (uid.value.type == 2) {
          wkStyle.value = `border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid rgba(0,0,0,0);border-top:1rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
        }
        if (uid.value.type == 3) {
          wkStyle.value = `border-top:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
        }
        if (uid.value.type == 4) {
          wkStyle.value = `border-left:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-top:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};width:${_colWidth}rpx`;
        }
      }
      function onClick(e) {
        emits("click", e);
        if (props.url !== "") {
          try {
            uni.navigateTo({
              url: props.url
            });
          } catch (e2) {
          }
        }
      }
      return (_ctx, _cache) => {
        return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
          style: (0, import_vue4.normalizeStyle)((0, import_vue4.unref)(wkStyle))
        }, [
          (0, import_vue4.createVNode)(__easycom_3, {
            color: props.bgColor,
            text: props.text,
            border: 0,
            "hover-class": "opacity-6",
            transprent: props.transprent,
            height: props.height,
            width: (0, import_vue4.unref)(_colWidth) - 0.5,
            margin: [0, 0],
            padding: [0, 0],
            _class: "flex-col flex",
            onClick
          }, {
            default: (0, import_vue4.withCtx)(() => [
              (0, import_vue4.createElementVNode)("view", { class: "flex-1 flex flex-col-center-center" }, [
                (0, import_vue4.createVNode)(tmBadge, {
                  userInteractionEnabled: true,
                  fontSize: 20,
                  dot: props.dot,
                  count: props.count,
                  "max-count": props.maxCount,
                  icon: props.icon,
                  color: props.color
                }, {
                  default: (0, import_vue4.withCtx)(() => [
                    (0, import_vue4.createElementVNode)("view", { class: "flex-col flex-col-center-center flex px-10" }, [
                      (0, import_vue4.renderSlot)(_ctx.$slots, "default")
                    ])
                  ]),
                  _: 3
                }, 8, ["dot", "count", "max-count", "icon", "color"])
              ])
            ]),
            _: 3
          }, 8, ["color", "text", "transprent", "height", "width"])
        ], 4);
      };
    }
  });
  var tmGridItem = /* @__PURE__ */ _export_sfc(_sfc_main$34, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-grid-item/tm-grid-item.vue"]]);
  var _sfc_main$24 = /* @__PURE__ */ (0, import_vue4.defineComponent)({
    __name: "tm-grid",
    props: __spreadProps4(__spreadValues4({}, custom_props), {
      round: {
        type: Number,
        default: 2
      },
      width: {
        type: Number,
        default: 750
      },
      col: {
        type: Number,
        default: 5
      },
      showBorder: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: Boolean,
        default: false
      }
    }),
    setup(__props, { expose }) {
      const props = __props;
      let _cachList = (0, import_vue4.ref)([]);
      const _colWidth = (0, import_vue4.computed)(() => Math.ceil(props.width / props.col - 1));
      (0, import_vue4.provide)("tmGridItemWidth", _colWidth.value + (props.showBorder ? 1 : 0));
      (0, import_vue4.provide)("tmGridshowBorder", (0, import_vue4.computed)(() => props.showBorder));
      (0, import_vue4.provide)("tmGridshowCachList", (0, import_vue4.computed)(() => _cachList.value));
      function pushKey(e) {
        let index2 = _cachList.value.findIndex((el) => el.id == e.id);
        if (index2 == -1) {
          _cachList.value.push(e);
        } else {
          _cachList.value.splice(index2, 1, e);
        }
        setIndexType();
      }
      function delKey(e) {
        _cachList.value.findIndex((el) => el.id == e.id);
        setIndexType();
      }
      function setIndexType() {
        let totallen = _cachList.value.length;
        _cachList.value = _cachList.value.map((el, index2) => {
          let aIndex = index2 + 1;
          if (aIndex <= props.col) {
            el.type = 4;
            if (aIndex == totallen && totallen == 1 || aIndex == 1) {
              el.type = 1;
            }
          } else {
            if (aIndex % props.col == 1) {
              el.type = 3;
            } else {
              el.type = 2;
            }
          }
          return el;
        });
      }
      expose({
        pushKey,
        delKey,
        keyName: "tmGrid"
      });
      return (_ctx, _cache) => {
        return (0, import_vue4.openBlock)(), (0, import_vue4.createBlock)(__easycom_3, {
          round: props.round,
          width: props.width,
          transprent: props.transprent,
          color: props.color,
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex flex-row flex-row-top-start",
          contStyle: "flex-wrap:wrap;"
        }, {
          default: (0, import_vue4.withCtx)(() => [
            (0, import_vue4.renderSlot)(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["round", "width", "transprent", "color"]);
      };
    }
  });
  var tmGrid = /* @__PURE__ */ _export_sfc(_sfc_main$24, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-grid/tm-grid.vue"]]);
  var _style_04 = { "flex-left-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-right-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-end" } }, "flex-top-custom": { "": { "display": "flex", "justifyContent": "flex-start", "alignItems": "flex-start" } }, "flex-end-custom": { "": { "display": "flex", "justifyContent": "flex-end", "alignItems": "flex-end" } }, "flex-center-custom": { "": { "display": "flex", "justifyContent": "center", "alignItems": "center", "flexDirection": "row" } } };
  var _sfc_main$14 = /* @__PURE__ */ (0, import_vue4.defineComponent)({
    __name: "tm-drawer",
    props: __spreadProps4(__spreadValues4({}, custom_props), {
      mask: {
        type: [Boolean, String],
        default: true
      },
      placement: {
        type: String,
        default: "bottom"
      },
      show: {
        type: [Boolean],
        default: false
      },
      width: {
        type: Number,
        default: 500
      },
      height: {
        type: Number,
        default: 600
      },
      round: {
        type: Number,
        default: 12
      },
      duration: {
        type: Number,
        default: 250
      },
      overlayClick: {
        type: Boolean,
        default: true
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      closeable: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: "white"
      },
      title: [String],
      okText: {
        type: [String],
        default: "\u5B8C\u6210"
      },
      okColor: {
        type: [String],
        default: "primary"
      },
      okLoading: {
        type: [Boolean, String],
        default: false
      },
      cancelText: {
        type: [String],
        default: "\u53D6\u6D88"
      },
      hideCancel: {
        type: [Boolean, String],
        default: false
      },
      hideHeader: {
        type: [Boolean, String],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      zIndex: {
        type: [Number, String],
        default: 401
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["click", "open", "close", "update:show", "ok", "cancel"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      const props = __props;
      const drawerANI = (0, import_vue4.ref)(null);
      const store = useTmpiniaStore();
      (_b2 = (_a2 = (0, import_vue4.getCurrentInstance)()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = (0, import_vue4.computed)(() => store.tmStore);
      const customCSSStyle = (0, import_vue4.computed)(() => computedStyle(props));
      const customClass = (0, import_vue4.computed)(() => computedClass(props));
      const isDark = (0, import_vue4.computed)(() => computedDark(props, tmcfg.value));
      const tmcomputed = (0, import_vue4.computed)(() => computedTheme(props, isDark.value, tmcfg.value));
      const syswidth = (0, import_vue4.ref)(0);
      const sysheight = (0, import_vue4.ref)(0);
      const reverse = (0, import_vue4.ref)(true);
      const aniEnd = (0, import_vue4.ref)(false);
      const flag = (0, import_vue4.ref)(false);
      const timeid = (0, import_vue4.ref)(0);
      let timerId = NaN;
      (0, import_vue4.ref)("close");
      const drawerStauts = (0, import_vue4.ref)("close");
      let _show = (0, import_vue4.ref)(props.show);
      function debounce(func, wait = 500, immediate = false) {
        if (!isNaN(timerId))
          clearTimeout(timerId);
        if (immediate) {
          var callNow = !timerId;
          timerId = setTimeout(() => {
            timerId = NaN;
          }, wait);
          if (callNow)
            typeof func === "function" && func();
        } else {
          timerId = setTimeout(() => {
            typeof func === "function" && func();
          }, wait);
        }
      }
      let sysinfo = uni.getSystemInfoSync();
      syswidth.value = sysinfo.windowWidth;
      sysheight.value = sysinfo.windowHeight;
      uni.hideKeyboard();
      let nowPage = getCurrentPages().pop();
      let isCustomHeader = false;
      for (let i = 0; i < uni.$tm.pages.length; i++) {
        if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i].path && uni.$tm.pages[i].custom == "custom") {
          isCustomHeader = true;
          break;
        }
      }
      if (!isCustomHeader) {
        if (sysinfo.osName == "android") {
          sysheight.value = ((_d = (_c = sysinfo.safeArea) == null ? void 0 : _c.height) != null ? _d : sysinfo.windowHeight) - 44 - ((_f = (_e = sysinfo.safeAreaInsets) == null ? void 0 : _e.bottom) != null ? _f : 0);
        } else {
          sysheight.value = ((_h = (_g = sysinfo.safeArea) == null ? void 0 : _g.height) != null ? _h : sysinfo.windowHeight) - 44;
        }
      } else {
        sysheight.value = ((_j = (_i = sysinfo.safeArea) == null ? void 0 : _i.height) != null ? _j : sysinfo.windowHeight) + ((_k = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _k : 0) + ((_m = (_l = sysinfo.safeAreaInsets) == null ? void 0 : _l.bottom) != null ? _m : 0);
      }
      timeid.value = uni.$tm.u.getUid(4);
      if (_show.value) {
        reverse.value = false;
      }
      (0, import_vue4.watch)(() => props.show, (val2) => {
        _show.value = props.show;
        if (val2) {
          opens();
        } else {
          closeFun();
        }
      });
      (0, import_vue4.onMounted)(() => opens());
      const ok_loading = (0, import_vue4.computed)(() => props.okLoading);
      const round_rp = (0, import_vue4.computed)(() => {
        if (aniname.value == "left")
          return "round-r-" + props.round;
        if (aniname.value == "right")
          return "round-l-" + props.round;
        if (aniname.value == "up")
          return "round-b-" + props.round;
        if (aniname.value == "down")
          return "round-t-" + props.round;
        if (aniname.value == "zoom")
          return "round-" + props.round;
      });
      const reverse_rp = (0, import_vue4.computed)(() => {
        if (aniname.value != "zoom")
          return reverse.value;
        return !reverse.value;
      });
      const aniname = (0, import_vue4.computed)(() => {
        if (props.placement == "center")
          return "zoom";
        if (props.placement == "top")
          return "up";
        if (props.placement == "bottom")
          return "down";
        return props.placement;
      });
      const anwidth = (0, import_vue4.computed)(() => {
        if (aniname.value == "zoom") {
          return props.width + props.unit;
        }
        if (props.placement == "left" || props.placement == "right") {
          return props.width + props.unit;
        }
        return syswidth.value + "px";
      });
      const anheight = (0, import_vue4.computed)(() => {
        let wucha = 0;
        if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
          return props.height + wucha + props.unit;
        }
        return sysheight.value + "px";
      });
      const contentHeight = (0, import_vue4.computed)(() => {
        let base_height = props.hideHeader ? 0 : 44;
        if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
          let h2 = props.height;
          if (props.unit == "rpx") {
            h2 = uni.upx2px(props.height);
          }
          return h2 - base_height + "px";
        }
        return sysheight.value - base_height + "px";
      });
      const align_rp = (0, import_vue4.computed)(() => {
        if (aniname.value == "down") {
          return "flex-col-bottom-center";
        }
        if (aniname.value == "up") {
          return "flex-top-custom";
        }
        if (aniname.value == "left") {
          return "flex-row-top-start";
        }
        if (aniname.value == "right") {
          return "flex-row-bottom-start";
        }
        if (aniname.value == "zoom") {
          return "flex-center";
        }
      });
      function ok() {
        if (props.disabled)
          return;
        debounce(() => {
          drawerStauts.value = "close";
          flag.value = true;
          emits("ok");
          closeFun();
        }, props.duration, true);
      }
      function cancel() {
        if (props.disabled)
          return;
        debounce(() => {
          drawerStauts.value = "close";
          flag.value = true;
          emits("cancel");
          closeFun();
        }, props.duration, true);
      }
      function OverLayOpen() {
        (0, import_vue4.nextTick)(() => {
          var _a22;
          if (!drawerANI.value)
            return;
          (_a22 = drawerANI.value) == null ? void 0 : _a22.play();
          flag.value = false;
        });
      }
      function opens() {
        if (props.disabled)
          return;
        if (flag.value)
          return;
        debounce(() => {
          flag.value = true;
          aniEnd.value = false;
          reverse.value = true;
          drawerStauts.value = "open";
        }, props.duration, true);
      }
      function open() {
        _show.value = true;
        if (props.disabled)
          return;
        if (flag.value)
          return;
        aniEnd.value = false;
        reverse.value = reverse.value === false ? true : false;
      }
      function animationClose() {
        aniEnd.value = true;
        if (drawerStauts.value == "open") {
          emits("open");
          flag.value = false;
        } else if (drawerStauts.value == "close") {
          emits("close");
          emits("update:show", false);
          _show.value = false;
          flag.value = false;
        }
        drawerStauts.value = "";
      }
      uni.$tm.u.getUid(1);
      function close() {
        if (props.disabled)
          return;
        if (flag.value)
          return;
        drawerStauts.value = "close";
        flag.value = true;
        debounce(() => {
          emits("cancel");
          closeFun();
        }, props.duration, true);
      }
      function clickClose(e) {
        if (props.disabled || drawerStauts.value == "open")
          return;
        emits("click", e);
        if (!props.overlayClick)
          return;
        debounce(() => {
          drawerStauts.value = "close";
          flag.value = true;
          emits("cancel");
          closeFun();
        }, props.duration, true);
      }
      function closeFun() {
        if (props.disabled)
          return;
        reverse.value = false;
        if (!drawerANI.value)
          return;
        (0, import_vue4.nextTick)(function() {
          var _a22;
          (_a22 = drawerANI.value) == null ? void 0 : _a22.play();
        });
      }
      expose({ close, open });
      return (_ctx, _cache) => {
        return (0, import_vue4.unref)(_show) ? ((0, import_vue4.openBlock)(), (0, import_vue4.createBlock)(tmOverlay, {
          key: 0,
          duration: 25,
          onOpen: OverLayOpen,
          zIndex: props.zIndex,
          transprent: !props.mask,
          onClick: clickClose,
          align: (0, import_vue4.unref)(align_rp),
          overlayClick: false,
          show: (0, import_vue4.unref)(_show),
          "onUpdate:show": _cache[1] || (_cache[1] = ($event) => (0, import_vue4.isRef)(_show) ? _show.value = $event : _show = $event)
        }, {
          default: (0, import_vue4.withCtx)(() => [
            (0, import_vue4.createVNode)(tmTranslate, {
              onEnd: animationClose,
              reverse: (0, import_vue4.unref)(reverse_rp),
              width: (0, import_vue4.unref)(anwidth),
              height: (0, import_vue4.unref)(anheight),
              ref_key: "drawerANI",
              ref: drawerANI,
              "auto-play": false,
              name: (0, import_vue4.unref)(aniname),
              duration: props.duration
            }, {
              default: (0, import_vue4.withCtx)(() => [
                (0, import_vue4.createElementVNode)("view", {
                  onClick: _cache[0] || (_cache[0] = (0, import_vue4.withModifiers)(($event) => $event.stopPropagation(), ["stop"])),
                  style: (0, import_vue4.normalizeStyle)([
                    { width: (0, import_vue4.unref)(anwidth), height: (0, import_vue4.unref)(anheight) },
                    !props.transprent ? (0, import_vue4.unref)(tmcomputed).borderCss : "",
                    !props.transprent ? (0, import_vue4.unref)(tmcomputed).backgroundColorCss : "",
                    !props.transprent ? (0, import_vue4.unref)(tmcomputed).shadowColor : "",
                    (0, import_vue4.unref)(customCSSStyle)
                  ]),
                  class: (0, import_vue4.normalizeClass)([(0, import_vue4.unref)(round_rp), "flex flex-col overflow ", (0, import_vue4.unref)(customClass)])
                }, [
                  !props.closeable && !props.hideHeader ? ((0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
                    key: 0,
                    class: "flex flex-row flex-row-center-center flex-between px-24",
                    style: { "height": "44px" }
                  }, [
                    (0, import_vue4.createElementVNode)("view", { class: "flex-4 flex-shrink" }, [
                      !props.hideCancel ? ((0, import_vue4.openBlock)(), (0, import_vue4.createBlock)(__easycom_0, {
                        key: 0,
                        onClick: cancel,
                        label: props.cancelText
                      }, null, 8, ["label"])) : (0, import_vue4.createCommentVNode)("v-if", true)
                    ]),
                    (0, import_vue4.createElementVNode)("view", { class: "flex-8 px-32 flex-center" }, [
                      (0, import_vue4.renderSlot)(_ctx.$slots, "title", {}, () => [
                        (0, import_vue4.createVNode)(__easycom_0, {
                          _class: "text-overflow-1 opacity-7",
                          label: props.title
                        }, null, 8, ["label"])
                      ])
                    ]),
                    (0, import_vue4.createElementVNode)("view", { class: "flex-4 flex-shrink flex-row flex-row-center-end" }, [
                      !(0, import_vue4.unref)(ok_loading) ? ((0, import_vue4.openBlock)(), (0, import_vue4.createBlock)(__easycom_0, {
                        key: 0,
                        color: __props.okColor,
                        onClick: ok,
                        dark: props.dark,
                        label: props.okText
                      }, null, 8, ["color", "dark", "label"])) : (0, import_vue4.createCommentVNode)("v-if", true),
                      (0, import_vue4.unref)(ok_loading) ? ((0, import_vue4.openBlock)(), (0, import_vue4.createBlock)(tmIcon, {
                        key: 1,
                        color: __props.okColor,
                        spin: (0, import_vue4.unref)(ok_loading),
                        dark: (0, import_vue4.unref)(isDark),
                        _class: (0, import_vue4.unref)(isDark) !== true ? "opacity-4" : "",
                        fontSize: 34,
                        name: (0, import_vue4.unref)(ok_loading) ? "tmicon-jiazai_dan" : "tmicon-times-circle-fill"
                      }, null, 8, ["color", "spin", "dark", "_class", "name"])) : (0, import_vue4.createCommentVNode)("v-if", true)
                    ])
                  ])) : (0, import_vue4.createCommentVNode)("v-if", true),
                  props.closeable && !props.hideHeader ? ((0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
                    key: 1,
                    class: "flex flex-row flex-row-center-center flex-between px-24",
                    style: { "height": "44px" }
                  }, [
                    (0, import_vue4.createElementVNode)("view", { class: "flex-9 pr-32" }, [
                      (0, import_vue4.renderSlot)(_ctx.$slots, "title", {}, () => [
                        (0, import_vue4.createVNode)(__easycom_0, {
                          _class: "text-overflow-1 opacity-7",
                          dark: props.dark,
                          label: props.title
                        }, null, 8, ["dark", "label"])
                      ])
                    ]),
                    (0, import_vue4.createElementVNode)("view", { class: "flex-3 flex-shrink flex-row flex-row-center-end" }, [
                      (0, import_vue4.createVNode)(tmIcon, {
                        onClick: cancel,
                        dark: props.dark,
                        _class: (0, import_vue4.unref)(isDark) !== true ? "opacity-3" : "",
                        fontSize: 36,
                        name: "tmicon-times-circle-fill"
                      }, null, 8, ["dark", "_class"])
                    ])
                  ])) : (0, import_vue4.createCommentVNode)("v-if", true),
                  (0, import_vue4.createElementVNode)("scroll-view", {
                    scrollY: "",
                    style: (0, import_vue4.normalizeStyle)([{ height: (0, import_vue4.unref)(contentHeight) }]),
                    class: "overflow"
                  }, [
                    (0, import_vue4.renderSlot)(_ctx.$slots, "default")
                  ], 4)
                ], 6)
              ]),
              _: 3
            }, 8, ["reverse", "width", "height", "name", "duration"])
          ]),
          _: 3
        }, 8, ["zIndex", "transprent", "align", "show"])) : (0, import_vue4.createCommentVNode)("v-if", true);
      };
    }
  });
  var tmDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["styles", [_style_04]], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-drawer/tm-drawer.vue"]]);
  var _sfc_main4 = /* @__PURE__ */ (0, import_vue4.defineComponent)({
    __name: "index",
    setup(__props) {
      const store = useTmpiniaStore();
      const { proxy } = (0, import_vue4.getCurrentInstance)();
      const str = (0, import_vue4.ref)("");
      const showCustomColor = (0, import_vue4.ref)("#60ab41");
      const showCustomName = (0, import_vue4.ref)("darkGreen");
      const showCustom = (0, import_vue4.ref)(false);
      const listimg = (0, import_vue4.ref)([]);
      const list2 = (0, import_vue4.ref)([]);
      const list = (0, import_vue4.ref)([]);
      const list_yule = (0, import_vue4.ref)([]);
      const list3 = (0, import_vue4.ref)([]);
      const navList = (0, import_vue4.ref)([]);
      const newslist = (0, import_vue4.ref)([]);
      (0, import_vue4.ref)(0);
      function get_gongneng() {
        request$1.httpTokenRequest({
          url: "wx/getTools",
          method: "get"
        }, {}).then((res) => {
          list.value = res.data.data[1].iconsList;
          list_yule.value = res.data.data[2].iconsList;
        });
      }
      function getbannaer() {
        request$1.httpRequest({
          url: "notice/noticeBanner/getAppInfo"
        }).then((res) => {
          if (res.data.code == 200) {
            navList.value = res.data.data;
            listimg.value = res.data.data.slice(0, 3);
            list3.value = res.data.data.slice(3, 7);
            list2.value = res.data.data.slice(7);
          }
        });
      }
      function openurl2(index2) {
        formatAppLog("log", "at pages/index/index.nvue:379", list3.value[index2].navurl);
        uni.navigateTo({
          url: list3.value[index2].navurl
        });
      }
      function navNews(id2) {
        formatAppLog("log", "at pages/index/index.nvue:404", id2);
        uni.navigateTo({
          url: "/pages/news/detail/detail?detailData=" + id2
        });
      }
      function navNewsBar() {
        uni.switchTab({
          url: "/pages/news/news"
        });
      }
      function get_news() {
        request$1.httpTokenRequest({
          url: "news/item/1?pageNum=1",
          method: "get"
        }, {}).then((res) => {
          newslist.value = res.data.rows;
        });
      }
      function onChangeDark() {
        proxy.$refs.app.setDark();
        const anhei = uni.getStorageSync("anhei");
        uni.setStorageSync("anhei", !anhei);
      }
      function search() {
        if (str.value.trim() === "") {
          proxy.$refs.msg.show({
            model: "error",
            text: "\u4E0D\u80FD\u4E3A\u7A7A",
            mask: true
          });
          return;
        }
        uni.navigateTo({
          url: "search?key=" + str.value
        });
      }
      function changeCustomColor() {
        formatAppLog("log", "at pages/index/index.nvue:474", 1);
        if (!showCustomColor.value || !showCustomName.value) {
          proxy.$refs.msg.show({
            model: "error",
            text: "\u5FC5\u586B\u5185\u5BB9",
            mask: true
          });
          return;
        }
        showCustom.value = false;
        store.setTmVuetifyAddTheme(showCustomName.value, showCustomColor.value);
      }
      onLoad(() => {
        getbannaer();
        uni.setStorageSync("anhei", store.tmStore.dark);
        get_gongneng();
        get_news();
      });
      return (_ctx, _cache) => {
        const _component_tm_waterfall_item = resolveEasycom((0, import_vue4.resolveDynamicComponent)("tm-waterfall-item"), __easycom_03);
        const _component_tm_waterfall = resolveEasycom((0, import_vue4.resolveDynamicComponent)("tm-waterfall"), __easycom_13);
        return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("scroll-view", {
          scrollY: true,
          showScrollbar: true,
          enableBackToTop: true,
          bubble: "true",
          style: { flexDirection: "column" }
        }, [
          (0, import_vue4.createVNode)(__easycom_8, { ref: "app" }, {
            default: (0, import_vue4.withCtx)(() => [
              (0, import_vue4.createCommentVNode)(' <view class="top-bc">\r\n		</view> '),
              (0, import_vue4.createVNode)(__easycom_7, { offset: "0" }, {
                default: (0, import_vue4.withCtx)(() => [
                  (0, import_vue4.createCommentVNode)(` <template v-slot:sticky>\r
				\r
				<tm-sheet :margin="[0, 0]">\r
					<view class="flex-row flex-row-center-start pb-10">\r
						<tm-image :width="280" :height="75" :src="cdtulogo"></tm-image>\r
						<view class="pl-50 flex-1" style="width:0px">\r
							<tm-text _class="text-weight-b" :font-size="36" label="\u638C\u4E0A\u6210\u5DE5"></tm-text>\r
							<tm-text _class="opacity-6" label="\u6559\u52A1 \u4E8C\u8BFE \u8D44\u8BAF \u5168\u90E8\u62FF\u4E0B"></tm-text>\r
\r
\r
						</view>\r
						<tm-icon @click="onChangeDark" :color="store.tmStore.dark?'yellow':''" _class="pl-32"\r
							:font-size="42" name="tmicon-ios-sunny"></tm-icon>\r
\r
					</view>\r
				</tm-sheet>\r
\r
			</template> `),
                  (0, import_vue4.createVNode)(__easycom_02, {
                    title: "CDTU \u638C\u4E0A\u6210\u5DE5",
                    shadow: 0,
                    "hide-home": ""
                  }, {
                    left: (0, import_vue4.withCtx)(() => [
                      (0, import_vue4.createElementVNode)("view", { class: "flex flex-center flex-row" }, [
                        (0, import_vue4.createVNode)(tmIcon, {
                          onClick: onChangeDark,
                          color: (0, import_vue4.unref)(store).tmStore.dark ? "yellow" : "",
                          _class: "pl-32",
                          "font-size": 42,
                          name: "tmicon-ios-sunny"
                        }, null, 8, ["color"])
                      ])
                    ]),
                    _: 1
                  }),
                  (0, import_vue4.createCommentVNode)(' <view style="width: 95%;margin: auto;margin-top: 15upx;" >\r\n				<tm-image :width="280" :height="75" :src="cdtulogo"></tm-image>\r\n			</view> '),
                  (0, import_vue4.createCommentVNode)(` <tm-sheet :margin="[0, 0]">\r
				<tm-input :transprent="true" :placeholder="language('index.search.tips')" :border="1" showClear prefix="tmicon-search"\r
					v-model="str" @search='search' :searchLabel="language('index.search.btntext')"></tm-input>\r
			</tm-sheet> `),
                  (0, import_vue4.createVNode)(__easycom_3, { margin: [0, 0] }, {
                    default: (0, import_vue4.withCtx)(() => [
                      (0, import_vue4.createVNode)(tmInput, {
                        placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
                        border: 1,
                        showClear: "",
                        prefix: "tmicon-search",
                        modelValue: str.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => str.value = $event),
                        onSearch: search,
                        searchLabel: "\u641C\u7D22\u529F\u80FD"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  (0, import_vue4.createElementVNode)("view", { style: { "margin-top": "15upx", "margin-bottom": "15upx" } }, [
                    (0, import_vue4.createCommentVNode)(' <u-swiper\r\n          @click="openurl1"\r\n          :height="200"\r\n          :width="600"\r\n          :list="listimg"\r\n          name="img"\r\n          :border-radius="20"\r\n          mode="none"\r\n          :effect3d="true"\r\n          bg-color=""\r\n        ></u-swiper> '),
                    (0, import_vue4.createCommentVNode)(' <tm-carousel autoplay :margin="[0,16]" :round="3" :width="686" :height="200" :list="listimg" :indicatorDots="false" @change="c1"  @click="nav"></tm-carousel> ')
                  ]),
                  (0, import_vue4.createVNode)(__easycom_3, {
                    style: {},
                    round: 3,
                    margin: [0, 0]
                  }, {
                    default: (0, import_vue4.withCtx)(() => [
                      (0, import_vue4.createVNode)(__easycom_0, {
                        "font-size": 36,
                        _class: "",
                        label: "\u6210\u5DE5",
                        style: { "float": "left", "font-size": "36rpx", "font-weight": "bold", "margin-left": "20upx" }
                      }),
                      (0, import_vue4.createCommentVNode)(" </tm-sheet> "),
                      (0, import_vue4.createCommentVNode)(" <tm-divider></tm-divider> "),
                      (0, import_vue4.createElementVNode)("view", { class: "flex flex-row flex-wrap flex-row-center-between" }, [
                        ((0, import_vue4.openBlock)(true), (0, import_vue4.createElementBlock)(import_vue4.Fragment, null, (0, import_vue4.renderList)(list3.value, (item, index2) => {
                          return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", { key: index2 }, [
                            (0, import_vue4.createVNode)(__easycom_4, {
                              width: 340,
                              height: 180,
                              round: 8,
                              margin: [0, 10],
                              src: item.img,
                              onClick: ($event) => openurl2(index2)
                            }, null, 8, ["src", "onClick"]),
                            (0, import_vue4.createCommentVNode)('   <tm-image  :width="340" :height="180" :round="8" :margin="[0, 10]" src="https://s1.ax1x.com/2022/08/04/vm11Bj.png"></tm-image>\r\n										  <tm-image :width="340" :height="180" :round="8" :margin="[0, 10]" src="https://s1.ax1x.com/2022/08/04/vm11Bj.png"></tm-image>\r\n										    <tm-image  :width="340" :height="180" :round="8" :margin="[0, 10]" src="https://s1.ax1x.com/2022/08/04/vm11Bj.png"></tm-image> ')
                          ]);
                        }), 128))
                      ])
                    ]),
                    _: 1
                  }),
                  (0, import_vue4.createVNode)(__easycom_3, {
                    style: {},
                    round: 3,
                    margin: [0, 0]
                  }, {
                    default: (0, import_vue4.withCtx)(() => [
                      (0, import_vue4.createVNode)(__easycom_0, {
                        "font-size": 36,
                        _class: "",
                        label: "\u5B66\u4E60",
                        style: { "float": "left", "font-size": "32rpx", "font-weight": "bold", "margin-left": "20upx" }
                      })
                    ]),
                    _: 1
                  }),
                  (0, import_vue4.createCommentVNode)(" <tm-divider></tm-divider> "),
                  (0, import_vue4.createVNode)(tmGrid, {
                    col: 4,
                    width: 750,
                    margin: [0, 0]
                  }, {
                    default: (0, import_vue4.withCtx)(() => [
                      ((0, import_vue4.openBlock)(true), (0, import_vue4.createElementBlock)(import_vue4.Fragment, null, (0, import_vue4.renderList)(list.value, (item, index2) => {
                        return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
                          key: index2,
                          style: { "margin": "left 0upx" }
                        }, [
                          (0, import_vue4.createVNode)(tmGridItem, {
                            url: item.url,
                            height: 150,
                            count: item.color,
                            color: item.ys,
                            dot: item.status
                          }, {
                            default: (0, import_vue4.withCtx)(() => [
                              (0, import_vue4.createVNode)(__easycom_4, {
                                width: 100,
                                height: 100,
                                round: 3,
                                src: item.cuicon
                              }, null, 8, ["src"]),
                              (0, import_vue4.createVNode)(__easycom_0, {
                                "font-size": 28,
                                "text-weight-b": "",
                                label: item.name,
                                class: "mt-10"
                              }, null, 8, ["label"])
                            ]),
                            _: 2
                          }, 1032, ["url", "count", "color", "dot"])
                        ]);
                      }), 128))
                    ]),
                    _: 1
                  }),
                  (0, import_vue4.createCommentVNode)(' <u-swiper\r\n        @click="openurl3"\r\n        :height="220"\r\n        :list="list2"\r\n        name="img"\r\n        mode="none"\r\n        bg-color=""\r\n      ></u-swiper> '),
                  (0, import_vue4.createCommentVNode)(' <tm-carousel autoplay :margin="[0,0]" :round="6" :width="650" :height="200" :list="list2" :indicatorDots="false"></tm-carousel> '),
                  (0, import_vue4.createCommentVNode)(' <tm-sheet style="margin: auto" :round="3" :margin="[5, 5]"> '),
                  (0, import_vue4.createVNode)(__easycom_3, {
                    style: {},
                    round: 3,
                    margin: [0, 0]
                  }, {
                    default: (0, import_vue4.withCtx)(() => [
                      (0, import_vue4.createVNode)(__easycom_0, {
                        "font-size": 36,
                        _class: "",
                        label: "\u5A31\u4E50",
                        style: { "float": "left", "font-size": "36rpx", "font-weight": "bold", "margin-left": "20upx" }
                      })
                    ]),
                    _: 1
                  }),
                  (0, import_vue4.createCommentVNode)(" <tm-divider></tm-divider> "),
                  (0, import_vue4.createVNode)(tmGrid, {
                    col: 4,
                    width: 750
                  }, {
                    default: (0, import_vue4.withCtx)(() => [
                      ((0, import_vue4.openBlock)(true), (0, import_vue4.createElementBlock)(import_vue4.Fragment, null, (0, import_vue4.renderList)(list_yule.value, (item, index2) => {
                        return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", { key: index2 }, [
                          (0, import_vue4.createVNode)(tmGridItem, {
                            url: item.url,
                            height: 160,
                            count: item.color,
                            color: item.ys,
                            dot: item.status
                          }, {
                            default: (0, import_vue4.withCtx)(() => [
                              (0, import_vue4.createVNode)(__easycom_4, {
                                width: 100,
                                height: 100,
                                round: 3,
                                src: item.cuicon
                              }, null, 8, ["src"]),
                              (0, import_vue4.createVNode)(__easycom_0, {
                                "font-size": 28,
                                "text-weight-b": "",
                                label: item.name,
                                class: "mt-10"
                              }, null, 8, ["label"])
                            ]),
                            _: 2
                          }, 1032, ["url", "count", "color", "dot"])
                        ]);
                      }), 128))
                    ]),
                    _: 1
                  }),
                  (0, import_vue4.createCommentVNode)(" </tm-sheet> "),
                  (0, import_vue4.createVNode)(__easycom_3, { margin: [0, 10] }, {
                    default: (0, import_vue4.withCtx)(() => [
                      (0, import_vue4.createVNode)(tmCell, {
                        margin: [0, 5],
                        padding: [0, 8],
                        rightText: "\u67E5\u770B\u66F4\u591A",
                        titleFontSize: 36,
                        title: "\u8981\u95FB\u{1F525}",
                        style: { "float": "left", "font-size": "36rpx", "font-weight": "bold", "margin-left": "10upx" },
                        onClick: navNewsBar
                      }),
                      (0, import_vue4.createCommentVNode)(" <tm-divider></tm-divider> "),
                      (0, import_vue4.createElementVNode)("view", { class: "flex flex-col flex-col-top-center" }, [
                        (0, import_vue4.createVNode)(_component_tm_waterfall, { width: 720 }, {
                          default: (0, import_vue4.withCtx)(() => [
                            ((0, import_vue4.openBlock)(true), (0, import_vue4.createElementBlock)(import_vue4.Fragment, null, (0, import_vue4.renderList)(newslist.value, (item, index2) => {
                              return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("view", {
                                onClick: ($event) => navNews(item.id)
                              }, [
                                (0, import_vue4.createVNode)(_component_tm_waterfall_item, {
                                  img: item.img || "https://cdn2.jaycao.com/cdtu/cdtunews.jpg"
                                }, {
                                  default: (0, import_vue4.withCtx)(() => [
                                    (0, import_vue4.createElementVNode)("view", { class: "py-24" }, [
                                      (0, import_vue4.createVNode)(__easycom_0, {
                                        _class: "text-overflow-2",
                                        label: item.title
                                      }, null, 8, ["label"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["img"])
                              ], 8, ["onClick"]);
                            }), 256))
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  (0, import_vue4.createCommentVNode)(' <tm-sheet :margin="[5,5]" >\r\n					\r\n					</tm-sheet> '),
                  (0, import_vue4.createElementVNode)("view", { class: "py-32 mx-32" }, [
                    (0, import_vue4.createVNode)(__easycom_1, {
                      color: "grey-2",
                      label: "\u638C\u4E0A\u6210\u5DE5 3.0.0 \u5168\u7AEF\u517C\u5BB9,\u539F\u751F\u6E32\u67D3"
                    })
                  ]),
                  (0, import_vue4.createCommentVNode)(` <tm-float-button\r
        @click="onChangeDark"\r
        :btn="{ icon: 'tmicon-ios-sunny', color: 'pink', linear: 'right' }"\r
      >\r
      </tm-float-button> `),
                  (0, import_vue4.createVNode)(tmMessage, { ref: "msg" }, null, 512),
                  (0, import_vue4.createVNode)(tmDrawer, {
                    show: showCustom.value,
                    "onUpdate:show": _cache[3] || (_cache[3] = ($event) => showCustom.value = $event),
                    placement: "center",
                    hideHeader: "",
                    height: 450,
                    width: 600
                  }, {
                    default: (0, import_vue4.withCtx)(() => [
                      (0, import_vue4.createElementVNode)("view", { class: "pa-32 flex flex-col" }, [
                        (0, import_vue4.createElementVNode)("view", { class: "text-align-center py-24" }, [
                          (0, import_vue4.createVNode)(__easycom_0, {
                            _class: "text-weight-b",
                            "font-size": 32,
                            label: "\u81EA\u5B9A\u4E49\u4E3B\u9898"
                          })
                        ]),
                        (0, import_vue4.createVNode)(tmInput, {
                          prefixLabel: "\u989C\u8272\u503C",
                          placeholder: "\u8BF7\u8F93\u5165\u989C\u8272\u503C,\u6BD4\u5982:#FF00FF",
                          border: 1,
                          showClear: "",
                          modelValue: showCustomColor.value,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => showCustomColor.value = $event)
                        }, null, 8, ["modelValue"]),
                        (0, import_vue4.createVNode)(tmInput, {
                          prefixLabel: "\u989C\u8272\u540D\u79F0",
                          margin: [0, 24],
                          placeholder: "\u5B57\u6BCD,\u5982:darkGreen",
                          border: 1,
                          showClear: "",
                          modelValue: showCustomName.value,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => showCustomName.value = $event)
                        }, null, 8, ["modelValue"]),
                        (0, import_vue4.createVNode)(tmButton, {
                          onClick: changeCustomColor,
                          block: "",
                          label: "\u786E\u8BA4\u5207\u6362"
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["show"])
                ]),
                _: 1
              }),
              (0, import_vue4.createVNode)(TabBar, { active: 0 })
            ]),
            _: 1
          }, 512)
        ]);
      };
    }
  });
  var index = /* @__PURE__ */ _export_sfc(_sfc_main4, [["__file", "D:/Code/app/tmui-cli-zscg/src/pages/index/index.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/index/index";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    index.mpType = "page";
    const app = Vue.createPageApp(index, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...index.styles || []]));
    app.mount("#root");
  }
})();
/*!
  * @intlify/core-base v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
/*!
  * @intlify/devtools-if v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
/*!
  * @intlify/message-compiler v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
/*!
  * @intlify/message-resolver v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
/*!
  * @intlify/runtime v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
/*!
  * @intlify/shared v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
/*!
  * vue-i18n v9.1.9
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
