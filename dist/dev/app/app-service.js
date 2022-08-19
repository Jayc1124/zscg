var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
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
if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(shared, vue) {
  var _a, _b, _c;
  "use strict";
  const ON_LOAD = "onLoad";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k2, p2) {
    switch (shared.toRawType(p2)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p2;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v2) {
      const type2 = shared.toTypeString(v2).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v2 = "---BEGIN:JSON---" + JSON.stringify(v2, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v2 = type2;
        }
      } else {
        if (v2 === null) {
          v2 = "---NULL---";
        } else if (v2 === void 0) {
          v2 = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v2).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v2 = "---BEGIN:" + vType + "---" + v2 + "---END:" + vType + "---";
          } else {
            v2 = String(v2);
          }
        }
      }
      return v2;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  var colortool = {
    rgbaToHsla(scolor) {
      let { r: r2, g: g2, b: b2, a: a2 } = scolor;
      r2 = r2 / 255;
      g2 = g2 / 255;
      b2 = b2 / 255;
      var min = Math.min(r2, g2, b2);
      var max = Math.max(r2, g2, b2);
      var l2 = (min + max) / 2;
      var difference = max - min;
      var h2 = 0, s2 = 0;
      if (max == min) {
        h2 = 0;
        s2 = 0;
      } else {
        s2 = l2 > 0.5 ? difference / (2 - max - min) : difference / (max + min);
        switch (max) {
          case r2:
            h2 = (g2 - b2) / difference + (g2 < b2 ? 6 : 0);
            break;
          case g2:
            h2 = 2 + (b2 - r2) / difference;
            break;
          case b2:
            h2 = 4 + (r2 - g2) / difference;
            break;
        }
        h2 = Math.round(h2 * 60);
      }
      s2 = Math.round(s2 * 100);
      l2 = Math.round(l2 * 100);
      return { h: h2, s: s2, l: l2, a: a2 };
    },
    hslaToRgba(scolor) {
      let { h: h2, s: s2, l: l2, a: a2 } = scolor;
      h2 = h2 / 360;
      s2 = s2 / 100;
      l2 = l2 / 100;
      var rgb = [];
      if (s2 == 0) {
        rgb = [Math.round(l2 * 255), Math.round(l2 * 255), Math.round(l2 * 255)];
      } else {
        var q2 = l2 >= 0.5 ? l2 + s2 - l2 * s2 : l2 * (1 + s2);
        var p2 = 2 * l2 - q2;
        rgb[0] = h2 + 1 / 3;
        rgb[1] = h2;
        rgb[2] = h2 - 1 / 3;
        for (var i2 = 0; i2 < rgb.length; i2++) {
          var tc = rgb[i2];
          if (tc < 0) {
            tc = tc + 1;
          } else if (tc > 1) {
            tc = tc - 1;
          }
          switch (true) {
            case tc < 1 / 6:
              tc = p2 + (q2 - p2) * 6 * tc;
              break;
            case (1 / 6 <= tc && tc < 0.5):
              tc = q2;
              break;
            case (0.5 <= tc && tc < 2 / 3):
              tc = p2 + (q2 - p2) * (4 - 6 * tc);
              break;
            default:
              tc = p2;
              break;
          }
          rgb[i2] = Math.round(tc * 255);
        }
      }
      return { r: rgb[0], g: rgb[1], b: rgb[2], a: a2 };
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
          for (let i2 = 1; i2 < 4; i2 += 1) {
            sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
          }
          sColor = sColorNew;
        }
        let sColorChange = [];
        for (let i2 = 1; i2 < 7; i2 += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i2, i2 + 2)));
        }
        return {
          r: sColorChange[0],
          g: sColorChange[1],
          b: sColorChange[2],
          a: 1
        };
      } else if (/^(rgb|RGB|rgba|RGBA)/.test(sColor)) {
        let arr = sColor.replace(/(?:\(|\)|rgb|RGB|RGBA|rgba)*/g, "").split(",");
        let p2 = arr.map((val) => Number(val));
        if (p2.length < 3) {
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          };
        }
        if (p2.length == 3) {
          p2.push(1);
        }
        return {
          r: p2[0],
          g: p2[1],
          b: p2[2],
          a: p2[3]
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
      const r2 = rgba2.r / 255;
      const g2 = rgba2.g / 255;
      const b2 = rgba2.b / 255;
      const max = Math.max(r2, g2, b2);
      const min = Math.min(r2, g2, b2);
      let h2 = 0;
      if (max !== min) {
        if (max === r2) {
          h2 = 60 * (0 + (g2 - b2) / (max - min));
        } else if (max === g2) {
          h2 = 60 * (2 + (b2 - r2) / (max - min));
        } else if (max === b2) {
          h2 = 60 * (4 + (r2 - g2) / (max - min));
        }
      }
      if (h2 < 0)
        h2 = h2 + 360;
      const s2 = max === 0 ? 0 : (max - min) / max;
      const hsv = [h2, s2, max];
      return {
        h: hsv[0],
        s: hsv[1],
        v: hsv[2],
        a: rgba2.a
      };
    },
    hsvaToRgba: function(sColor) {
      var { h: h2, s: s2, v: v2, a: a2 } = sColor;
      var r2 = 0;
      var g2 = 0;
      var b2 = 0;
      var i2;
      var f2;
      var p2;
      var q2;
      var t;
      i2 = Math.floor(h2 * 6);
      f2 = h2 * 6 - i2;
      p2 = v2 * (1 - s2);
      q2 = v2 * (1 - f2 * s2);
      t = v2 * (1 - (1 - f2) * s2);
      switch (i2 % 6) {
        case 0:
          r2 = v2;
          g2 = t;
          b2 = p2;
          break;
        case 1:
          r2 = q2;
          g2 = v2;
          b2 = p2;
          break;
        case 2:
          r2 = p2;
          g2 = v2;
          b2 = t;
          break;
        case 3:
          r2 = p2;
          g2 = q2;
          b2 = v2;
          break;
        case 4:
          r2 = t;
          g2 = p2;
          b2 = v2;
          break;
        case 5:
          r2 = v2;
          g2 = p2;
          b2 = q2;
          break;
      }
      return { r: r2, g: g2, b: b2, a: a2 };
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
  const theme = {};
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
  }, theme);
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
    let isHand = colors.findIndex(function(el, index) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      colorName = "primary";
      isHand = colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      formatAppLog("error", "at tmui/tool/theme/theme.ts:80", "\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
    }
    return colors[isHand];
  }
  class themeColors {
    constructor(c2 = colors) {
      __publicField(this, "colors", []);
      this.colors = c2;
    }
    add(colorName = "", value = "") {
      let isHand = this.colors.filter(function(el, index) {
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
      let isHand = this.colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      if (isHand == -1) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:123", "\u5220\u9664\u5931\u8D25\uFF0C\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
        return;
      }
      this.colors.splice(isHand, 1);
    }
    getColor(colorName) {
      let isHand = this.colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      if (isHand == -1) {
        colorName = "primary";
        isHand = this.colors.findIndex(function(el, index) {
          return el.name == colorName;
        });
        formatAppLog("error", "at tmui/tool/theme/theme.ts:137", "\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
      }
      return this.colors[isHand];
    }
    getTheme(config2 = { colorname: "primary", dark: false }) {
      var _a2;
      if (!config2["colorname"]) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:145", "\u989C\u8272\u540D\u79F0\u5FC5\u586B");
        config2.colorname = "primary";
      }
      let index = this.colors.findIndex((el) => el.name == config2.colorname);
      if (index == -1) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:150", "\u4E3B\u9898\u4E0D\u5B58\u5728\uFF0C\u9ED8\u8BA4\u4E3Aprimary");
        config2.colorname = "primary";
      }
      let isBlack = false;
      let isWhite = false;
      let isBlackAndWhite = false;
      let isGrey = false;
      let nowColor = __spreadValues({}, this.colors[index]);
      config2.borderWidth = isNaN(parseInt(String(config2["borderWidth"]))) ? 0 : config2["borderWidth"];
      config2.borderStyle = config2["borderStyle"] ? config2["borderStyle"] : "solid";
      config2.borderDirection = config2["borderDirection"] || cssDirection.all;
      config2.linearDirection = config2["linearDirection"] || linearDirection.none;
      config2.linearDeep = config2["linearDeep"] || linearDeep.light;
      config2.shadow = isNaN(parseInt(String(config2["shadow"]))) ? 6 : config2["shadow"];
      config2.round = isNaN(parseInt(String(config2["round"]))) ? 4 : config2["round"];
      config2.opaticy = isNaN(parseInt(String(config2["opaticy"]))) ? 1 : config2["opaticy"];
      config2.outlined = typeof config2["outlined"] == "boolean" ? config2["outlined"] : false;
      config2.text = typeof config2["text"] == "boolean" ? config2["text"] : false;
      config2.blur = typeof config2["blur"] == "boolean" ? config2["blur"] : false;
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
      css.config = __spreadValues({}, config2);
      css.isBlackAndWhite = isBlackAndWhite;
      css.gradientColor = [];
      css.colorname = config2.colorname;
      let borderhsl = __spreadValues({}, nowColor.hsla);
      css.borderCss = {};
      let bghsl = __spreadValues({}, nowColor.hsla);
      if (config2.dark) {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          bghsl.l = 40;
        }
      }
      if (config2.blur) {
        bghsl.a = 0.85;
      }
      css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadValues({}, bghsl)));
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config2.dark) {
        css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, bghsl), { l: 8 })));
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config2.dark && nowColor.hsla.l == 100) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 90 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config2.dark && nowColor.hsla.l == 0) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
      }
      css.backgroundColorCss = { "background-color": css.backgroundColor };
      let txcolor = __spreadValues({}, nowColor.hsla);
      if (config2.dark) {
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
      if (config2.outlined) {
        txcolor.l = 50;
        if (config2.dark) {
          txcolor.l = 55;
        } else {
          if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        if ((isBlack || isWhite) && config2.dark) {
          txcolor.l = 100;
        }
        config2.borderWidth = config2["borderWidth"] || 2;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 0, a: 0 };
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_bgcss;
        css.backgroundColorCss = { "background-color": o_bgcss };
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
        css.border = css.textColor;
      }
      if (config2.text) {
        txcolor.l = 90;
        if (isGrey) {
          txcolor.l = 15;
        } else {
          txcolor.l = 55;
          if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            txcolor.l = 20;
          }
        }
        if (config2.dark) {
          txcolor.l = 55;
        }
        if (isBlack) {
          txcolor.l = 90;
        }
        if (isWhite) {
          txcolor.l = 15;
        }
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config2.dark) {
          txcolor.l = 90;
        }
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
        css.border = css.textColor;
        let o_now_bgColor = nowColor.csscolor;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 96, a: nowColor.hsla.a };
        if (config2.dark) {
          if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            n_hsl.l = 12;
            n_hsl.s = 35;
          } else {
            n_hsl.l = 12;
            n_hsl.s = 0;
          }
        }
        if (config2.blur) {
          n_hsl.a = 0.85;
        }
        o_now_bgColor = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_now_bgColor;
        css.backgroundColorCss = { "background-color": o_now_bgColor };
      }
      if (config2.shadow) {
        let n_hsl = { h: nowColor.hsla.h, s: 100, l: 50, a: 0.2 };
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          n_hsl = { h: 0, s: 0, l: 20, a: 0.07 };
        }
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.shadowColor = {
          boxShadow: `0rpx ${config2.shadow * 2.5}rpx ${config2.shadow * 6}rpx ${o_bgcss}`
        };
      }
      if (config2.linearDirection) {
        let liner_color_1 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let liner_color_2 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let dir_str = linearDirection[config2.linearDirection];
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
          if (config2.linearDeep == "light") {
            liner_color_1.l = 80;
            liner_color_2.l = 20;
          } else {
            liner_color_1.l = 50;
            liner_color_2.l = 40;
          }
        } else if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
          if (config2.linearDeep == "light") {
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
          if (config2.linearDeep == "light") {
            liner_color_1.l = 70;
            liner_color_1.s = 95;
            liner_color_1.h -= 5;
            liner_color_2.l = 45;
            liner_color_2.s = 95;
            liner_color_2.h += 5;
          } else if (config2.linearDeep == "dark") {
            liner_color_1.l = 70;
            liner_color_1.s = 50;
            liner_color_2.l = 45;
            liner_color_2.s = 100;
          } else if (config2.linearDeep == "accent") {
            liner_color_1.h -= 0;
            liner_color_1.s = 80;
            liner_color_1.l = 55;
            liner_color_2.l = 65;
            liner_color_2.h -= 35;
            liner_color_2.s = 80;
          }
        }
        if (config2.dark) {
          liner_color_1.l = 40;
          liner_color_2.l = 40;
          txcolor.l = 90;
        }
        let color_t_1 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_1));
        let color_t_2 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_2));
        if (!config2.text && !config2.outlined) {
          css.backgroundColorCss = { "background-image": `linear-gradient(${dir_str},${color_t_1},${color_t_2})` };
          let newBgcolor = {
            h: (liner_color_1.h + liner_color_2.h) / 2,
            s: (liner_color_1.s + liner_color_2.s) / 2,
            l: (liner_color_1.l + liner_color_2.l) / 2,
            a: (liner_color_1.a + liner_color_2.a) / 2
          };
          if (!config2.dark) {
            if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
              txcolor.l = 20;
            }
          }
          css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(newBgcolor));
          css.gradientColor = [color_t_1, color_t_2];
        }
      }
      if (config2.dark == true) {
        css.cardcolor = "rgba(26, 26,26, 1.0)";
        css.inputcolor = "rgba(31, 31,31, 1.0)";
        css.bodycolor = "rgba(5,5,5, 1.0)";
        css.disablecolor = "rgba(30, 30, 30, 1.0)";
        css.textDisableColor = "rgba(100, 100, 100, 1.0)";
      }
      css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
      if (config2.dark) {
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
      if (config2.borderDirection == "all") {
        css.borderCss[`border`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "x" || config2.borderDirection == "leftright") {
        css.borderCss[`border-left`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-right`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "y" || config2.borderDirection == "topbottom") {
        css.borderCss[`border-top`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "bottomleft") {
        css.borderCss[`border-left`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "bottomright") {
        css.borderCss[`border-right`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-bottom`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "topleft") {
        css.borderCss[`border-left`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-top`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else if (config2.borderDirection == "topright") {
        css.borderCss[`border-right`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
        css.borderCss[`border-top`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      } else {
        let str = "-" + config2.borderDirection;
        css.borderCss[`border${str}`] = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      }
      return css;
    }
  }
  var themeTool = {
    isCssColor,
    themeColors,
    getColor
  };
  const custom_props = {
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
  const computedDark = (props, tmcfg) => {
    const followDark = props.followDark;
    const dark2 = props.dark;
    const glboalDark = tmcfg.dark;
    if (followDark) {
      return glboalDark;
    }
    return dark2;
  };
  const computedClass = (props) => {
    const _class = props._class;
    if (typeof _class == "string") {
      return _class;
    }
    if (Array.isArray(_class)) {
      return _class.join(" ");
    }
    return "";
  };
  const computedStyle = (props) => {
    const _style = props._style;
    if (typeof _style == "string") {
      let p2 = _style.split(";");
      let k2 = p2.map((el) => {
        el = el.replace(";", "");
        let node = {};
        let idx = el.split(":");
        node[idx[0]] = idx[1];
        return node;
      });
      let kl = {};
      k2.forEach((el) => {
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
  const computedTheme = (props, dark2, store) => {
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
    if (themeTool.isCssColor(color)) {
      formatAppLog("error", "at tmui/tool/lib/minxs.ts:213", "\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u4E0A\u7684\u989C\u8272\u503C\uFF0C\u8BF7\u5728theme/theme.js\u4E2D\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684\u989C\u8272\u503C\u4E3A\u4E3B\u9898\u3002\u5F53\u524D\u5DF2\u5207\u6362\u4E3Aprimary\u4E3B\u9898\u3002");
    }
    let defaultColorName = color || "primary";
    if ((props == null ? void 0 : props.followTheme) == true && store.color) {
      defaultColorName = store.color;
    }
    var theme2 = new themeTool.themeColors(store.colorList);
    let c2 = theme2.getTheme({
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
    return c2;
  };
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a2;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a2 = global.perf_hooks) === null || _a2 === void 0 ? void 0 : _a2.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.14
    * (c) 2022 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject$1(o2) {
    return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : "msSaveOrOpenBlob" in _navigator ? msSaveAs : fileSaverSaveAs;
  function downloadSaveAs(blob, name = "download", opts) {
    const a2 = document.createElement("a");
    a2.download = name;
    a2.rel = "noopener";
    if (typeof blob === "string") {
      a2.href = blob;
      if (a2.origin !== location.origin) {
        if (corsEnabled(a2.href)) {
          download(blob, name, opts);
        } else {
          a2.target = "_blank";
          click(a2);
        }
      } else {
        click(a2);
      }
    } else {
      a2.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a2.href);
      }, 4e4);
      setTimeout(function() {
        click(a2);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a2 = document.createElement("a");
        a2.href = blob;
        a2.target = "_blank";
        setTimeout(function() {
          click(a2);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "\u{1F34D} " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o2) {
    return "_a" in o2 && "install" in o2;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "\u{1F34D} Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const getStoreType = (id) => "\u{1F34D} " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia \u{1F34D}",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia \u{1F34D}`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia \u{1F34D}",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: store.$state,
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : store.$state
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("\u{1F34D}")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia \u{1F34D}",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "\u{1F6EB} " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "\u{1F6EC} " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "\u{1F4A5} " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: __spreadValues({
            store: formatDisplay(store.$id)
          }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "\u2935\uFE0F";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "\u{1F9E9}";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "\u{1F525} " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store \u{1F5D1}`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed \u{1F195}`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(store, Object.keys(options.actions));
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(app, store);
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (IS_CLIENT) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (IS_CLIENT && true) {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentInstance()) {
      vue.onUnmounted(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign: assign$1 } = Object;
  function isComputed(o2) {
    return !!(vue.isRef(o2) && o2.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? vue.toRefs(vue.ref(state ? state() : {}).value) : vue.toRefs(pinia.state.value[id]);
      return assign$1(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    store.$reset = function $reset() {
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign$1($state, newState);
      });
    };
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign$1({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("\u{1F34D} debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = () => {
      throw new Error(`\u{1F34D}: Store "${$id}" is build using the setup syntax and does not implement $reset().`);
    };
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign$1({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign$1(IS_CLIENT ? {
      _customProperties: vue.markRaw(/* @__PURE__ */ new Set()),
      _hmrPayload
    } : {}, partialStore));
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? options.getters[key] : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign$1(store, setupStore);
      assign$1(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign$1($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject$1(newStateTarget) && isPlainObject$1(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? vue.computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          }) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
      const nonEnumerable = {
        writable: true,
        configurable: true,
        enumerable: false
      };
      if (IS_CLIENT) {
        ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
          Object.defineProperty(store, p2, __spreadValues({
            value: store[p2]
          }, nonEnumerable));
        });
      }
    }
    pinia._p.forEach((extender) => {
      if (IS_CLIENT) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign$1(store, extensions);
      } else {
        assign$1(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[\u{1F34D}]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = pinia || currentInstance && vue.inject(piniaSymbol);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[\u{1F34D}]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign$1({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && !hot) {
        const vm = currentInstance.proxy;
        const cache2 = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache2[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  function preview(url = "", list = [], rangKey = "url") {
    if (!url) {
      uni.$tm.u.toast("\u53C2\u6570\u6709\u8BEF");
      return;
    }
    if (arguments.length == 1) {
      uni.previewImage({
        current: url,
        urls: list ? list : [url]
      });
    } else if (arguments.length === 3) {
      if (typeof list[0] === "object" && typeof list[0] !== "undefined") {
        let urls = [];
        list.forEach((item) => {
          urls.push(item[rangKey]);
        });
        uni.previewImage({
          current: url,
          urls,
          fail: (er) => {
            formatAppLog("warn", "at tmui/tool/function/preview.ts:35", er);
          }
        });
      } else if (typeof list[0] === "string") {
        uni.previewImage({
          current: url,
          urls: list
        });
      }
    } else {
      uni.$tm.u.toast("\u53C2\u6570\u6709\u8BEF");
    }
  }
  function splitData(oArr = [], length = 1) {
    let arr = [];
    let minArr = [];
    oArr.forEach((c2) => {
      if (minArr.length === length) {
        minArr = [];
      }
      if (minArr.length === 0) {
        arr.push(minArr);
      }
      minArr.push(c2);
    });
    return arr;
  }
  function timeMuch(t) {
    let format2 = {
      d: "00",
      h: "00",
      m: "00",
      s: "00"
    };
    if (t > 0) {
      let d2 = Math.floor(t / 86400);
      let h2 = Math.floor(t / 3600 % 24);
      let m2 = Math.floor(t / 60 % 60);
      let s2 = Math.floor(t % 60);
      format2.d = d2 < 10 ? "0" + d2 : d2;
      format2.h = h2 < 10 ? "0" + h2 : h2;
      format2.m = m2 < 10 ? "0" + m2 : m2;
      format2.s = s2 < 10 ? "0" + s2 : s2;
    }
    return format2;
  }
  function getDateToNewData(timestamp = new Date().getTime()) {
    if (typeof timestamp == "string") {
      timestamp = new Date(timestamp).getTime();
    }
    var arrTimestamp = (timestamp + "").split("");
    for (var start = 0; start < 13; start++) {
      if (!arrTimestamp[start]) {
        arrTimestamp[start] = "0";
      }
    }
    timestamp = Number(arrTimestamp.join("")) * 1;
    var minute = 1e3 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now2 = new Date().getTime();
    var diffValue = now2 - timestamp;
    if (diffValue < 0) {
      return "\u4E0D\u4E45\u524D";
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var zero = function(value) {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    };
    if (monthC > 12) {
      return function() {
        var date = new Date(timestamp);
        return date.getFullYear() + "\u5E74" + zero(date.getMonth() + 1) + "\u6708" + zero(date.getDate()) + "\u65E5";
      }();
    } else if (monthC >= 1) {
      return parseInt(monthC + "") + "\u6708\u524D";
    } else if (weekC >= 1) {
      return parseInt(weekC + "") + "\u5468\u524D";
    } else if (dayC >= 1) {
      return parseInt(dayC + "") + "\u5929\u524D";
    } else if (hourC >= 1) {
      return parseInt(hourC + "") + "\u5C0F\u65F6\u524D";
    } else if (minC >= 1) {
      return parseInt(minC + "") + "\u5206\u949F\u524D";
    }
    return "\u521A\u521A";
  }
  function callPhone(phoneNumber = "") {
    let num = phoneNumber.toString();
    return new Promise((rs, rj) => {
      uni.makePhoneCall({
        phoneNumber: num,
        success: () => rs(true),
        fail: (err) => rj(err)
      });
    });
  }
  function scanCode(onlyFromCamera = true, scanType = ["barCode", "qrCode", "datamatrix", "datamatrix"]) {
    return new Promise((rs, rj) => {
      uni.scanCode({
        onlyFromCamera,
        scanType,
        success: (res) => rs(res),
        fail: (error) => rj(error)
      });
    });
  }
  function setClipboardData(data) {
    return new Promise((rs, rj) => {
      uni.setClipboardData({
        data,
        success: () => rs(true),
        fail: (error) => rj(error)
      });
    });
  }
  function getClipboardData() {
    return new Promise((rs, rj) => {
      uni.getClipboardData({
        success: (res) => rs(res.data),
        fail: (error) => rj(error)
      });
    });
  }
  function setCookie(key, data) {
    try {
      uni.setStorageSync(key, data);
      return true;
    } catch (e) {
      return false;
    }
  }
  function delCookie(key) {
    try {
      uni.removeStorageSync(key);
      return true;
    } catch (e) {
      return false;
    }
  }
  function getCookie(key) {
    try {
      const value = uni.getStorageSync(key);
      try {
        let val = JSON.parse(value);
        return val;
      } catch (e) {
        return value;
      }
    } catch (e) {
      return void 0;
    }
  }
  function httpUrlAddKey(uri, key, value) {
    if (!value) {
      return uri;
    }
    var re2 = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re2)) {
      return uri.replace(re2, "$1" + key + "=" + value + "$2");
    } else {
      return uri + separator + key + "=" + value;
    }
  }
  function getQueryString(url, key) {
    var query_string = url.substring(url.indexOf("?"));
    if (!query_string)
      return "";
    var re2 = /[?&]?([^=]+)=([^&]*)/g;
    var tokens;
    while (tokens = re2.exec(query_string)) {
      if (decodeURIComponent(tokens[1]) === key) {
        return decodeURIComponent(tokens[2]);
      }
    }
    return "";
  }
  function getUid(length = 12) {
    return Number(Number(Math.random().toString().substr(3, length) + Date.now()).toString(8));
  }
  var timeout = getUid(1);
  function debounce(func, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func === "function" && func();
    } else {
      timeout = getUid(1);
      timeout = setTimeout(() => {
        typeof func === "function" && func();
      }, wait);
    }
  }
  function throttle(func, wait = 500, immediate = true, timer = 85688, flag = false) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func === "function" && func();
        timer = setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else {
      if (!flag) {
        flag = true;
        timer = setTimeout(() => {
          flag = false;
          typeof func === "function" && func();
        }, wait);
      }
    }
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o2 = Array.isArray(obj) ? [] : {};
    for (let i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        o2[i2] = typeof obj[i2] === "object" ? deepClone(obj[i2]) : obj[i2];
      }
    }
    return o2;
  }
  function quereyDom(t, node) {
    return new Promise((res, rej) => {
      const query = uni.createSelectorQuery().in(t);
      query.select(node).boundingClientRect((el) => {
        res(el);
      }).exec();
    });
  }
  function isPhone(phone) {
    let val = String(phone);
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    return !!val.match(reg);
  }
  function isChina(s2) {
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    return !!patrn.exec(s2);
  }
  function isEmpty(s2) {
    if (typeof s2 === "string") {
      s2 = s2.trim();
    }
    if (s2 == "")
      return true;
    if (s2 == null)
      return true;
    if (typeof s2 === "undefined")
      return true;
    if (Array.isArray(s2)) {
      if (s2.length == 0)
        return true;
    }
    if (typeof s2 === "object") {
      if (Object.keys(s2).length == 0)
        return true;
    }
    return false;
  }
  function isEmail(s2) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !!s2.match(reg);
  }
  function isIdCard(val) {
    val = String(val);
    var p2 = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    var code = val.substring(17);
    if (p2.test(val)) {
      var sum = 0;
      for (var i2 = 0; i2 < 17; i2++) {
        let id = val[i2];
        sum += id * factor[i2];
      }
      if (parity[sum % 11] == code.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
  function isIdCar(s2) {
    let reg = /^[京|沪|津|渝|鲁|冀|晋|蒙|辽|吉|黑|苏|浙|皖|闽|赣|豫|湘|鄂|粤|桂|琼|川|贵|云|藏|陕|甘|青|宁|新|港|澳|台|新|使]{1}[A-Z]{1}[A-Z_0-9]{5,6}$/;
    return !!s2.match(reg);
  }
  function isPasswordOfNumber(s2, len = 6, maxLen = 20) {
    s2 = String(s2);
    let reg = new RegExp(`^[0-9]{${len},${maxLen}}$`);
    return !!s2.match(reg);
  }
  function isPasswordOfOther(s2, len = 6, maxLen = 20, model = 0) {
    s2 = String(s2);
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (model === 1) {
      reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
    }
    if (model === 2) {
      reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/;
    }
    return !!s2.match(reg);
  }
  function isDate$1(s2) {
    if (s2 == null || typeof s2 === "undefined" || !s2)
      return false;
    if (typeof s2 === "string") {
      s2 = s2.replace("-", "/");
    }
    let d2 = new Date(s2);
    if (d2.toString() == "Invalid Date")
      return false;
    return true;
  }
  function toast(word, mask = true, icon = "none") {
    uni.showToast({
      mask,
      title: word,
      icon
    });
  }
  function getWindow() {
    var _a2, _b2, _c2, _d, _e2, _f, _g;
    const sysinfo = uni.getSystemInfoSync();
    let top = 0;
    let height = sysinfo.windowHeight;
    let nowPage = getCurrentPages().pop();
    let isCustomHeader = false;
    for (let i2 = 0; i2 < uni.$tm.pages.length; i2++) {
      if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i2].path && uni.$tm.pages[i2].custom == "custom") {
        isCustomHeader = true;
        break;
      }
    }
    if (!isCustomHeader) {
      height = ((_b2 = (_a2 = sysinfo.safeArea) == null ? void 0 : _a2.height) != null ? _b2 : sysinfo.windowHeight) - 44;
    } else {
      height = ((_d = (_c2 = sysinfo.safeArea) == null ? void 0 : _c2.height) != null ? _d : sysinfo.windowHeight) + ((_e2 = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _e2 : 0) + ((_g = (_f = sysinfo.safeAreaInsets) == null ? void 0 : _f.bottom) != null ? _g : 0);
    }
    let reulst = { height, width: sysinfo.windowWidth, top, isCustomHeader, sysinfo };
    return reulst;
  }
  function routerTo(url, type = "navigate") {
    let funType = {
      navigate: "navigateTo",
      redirect: "redirectTo",
      switchTab: "switchTab",
      reLaunch: "reLaunch",
      navigateBack: "navigateBack"
    };
    let fun = funType[type];
    uni[fun]({
      url,
      fail(result) {
        formatAppLog("error", "at tmui/tool/function/util.ts:642", result);
      }
    });
  }
  var util = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    "default": preview,
    splitData,
    timeMuch,
    getDateToNewData,
    callPhone,
    scanCode,
    setClipboardData,
    getClipboardData,
    setCookie,
    delCookie,
    getCookie,
    httpUrlAddKey,
    getQueryString,
    getUid,
    debounce,
    throttle,
    deepClone,
    quereyDom,
    isPhone,
    isChina,
    isEmpty,
    isEmail,
    isIdCard,
    isIdCar,
    isPasswordOfNumber,
    isPasswordOfOther,
    isDate: isDate$1,
    toast,
    getWindow,
    routerTo
  }, Symbol.toStringTag, { value: "Module" }));
  let pdefault_cookies_color = getCookie("setTmVuetifyColor") || "";
  let pdefault_cookies_black = getCookie("setTmVuetifyBlack");
  let pdefault_cookies_local = getCookie("setTmVuetifyLocal") || "zh-Hans";
  let pdefault_cookies_colorArrayList = getCookie("colorArrayList");
  let dark = typeof pdefault_cookies_black === "boolean" ? pdefault_cookies_black : false;
  let themeObj = new themeTool.themeColors();
  if (pdefault_cookies_colorArrayList) {
    const result2 = pdefault_cookies_colorArrayList.filter((item) => themeObj.colors.every((subItem) => subItem.name !== item.name));
    themeObj = new themeTool.themeColors([...themeObj.colors, ...result2]);
  }
  const colorArray = themeObj.colors;
  const os = (_b = (_a = uni.getSystemInfoSync()) == null ? void 0 : _a.osName) != null ? _b : "";
  setCookie("colorArrayList", colorArray);
  const useTmpiniaStore = defineStore("tmpinia", {
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
      setPageNowIndex(index) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          tmVueTifly_pagesIndex: index
        });
      },
      setTmVuetifyDark(dark2) {
        dark2 = typeof dark2 !== "boolean" ? false : dark2;
        setCookie("setTmVuetifyBlack", dark2);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          dark: dark2
        });
      },
      setWxShare(cfg2) {
        let pcf = cfg2 || {};
        if (typeof pcf !== "object" || Array.isArray(cfg2))
          pcf = {};
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          wxshareConfig_miniMp: __spreadValues(__spreadValues({}, this.tmStore.wxshareConfig_miniMp), pcf)
        });
      },
      setTmVuetifyTheme(color) {
        let defaultColorName = color;
        if (!defaultColorName || defaultColorName == "" || themeTool.isCssColor(defaultColorName)) {
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
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$X = /* @__PURE__ */ vue.defineComponent({
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
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const parenClass_p = vue.computed(() => props.parenClass);
      const contStyle_p = vue.computed(() => props.contStyle);
      const _transprent = vue.computed(() => props.transprent);
      const tmcfg = vue.computed(() => store.tmStore);
      const _blur = vue.computed(() => {
        if (tmcfg.value.os == "android" && _isNvue.value) {
          return false;
        }
        return props.blur;
      });
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => {
        let text = props.text;
        if (_blur.value && tmcfg.value.os == "ios" && _isNvue.value) {
          text = true;
        }
        return computedTheme(__spreadProps(__spreadValues({}, props), { blur: _blur.value, text }), isDark.value, tmcfg.value);
      });
      const _isNvue = vue.ref(false);
      const _margin = vue.computed(() => props.margin);
      const _padding = vue.computed(() => props.padding);
      const _width = vue.computed(() => props.width);
      const _height = vue.computed(() => props.height);
      const _noLevel = vue.computed(() => props.noLevel);
      const _blue_sheet = vue.ref(true);
      const _blurEffect = vue.computed(() => {
        if (props.blur === true && isDark.value)
          return "dark";
        if (props.blur === true && !isDark.value)
          return "extralight";
        return "none";
      });
      vue.watch(() => isDark.value, () => {
      });
      const _bgcolor = vue.computed(() => {
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
      const isLongPress = vue.ref(false);
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
      vue.computed(() => {
        let w2 = parseFloat(String(_width.value)) - parseFloat(String(props.padding[0]));
        w2 = w2 - parseFloat(String(props.border)) * 2;
        return w2;
      });
      vue.computed(() => {
        let h2 = parseFloat(String(_height.value)) - parseFloat(String(props.padding[1]));
        h2 = h2 - parseFloat(String(props.border)) * 2;
        return h2;
      });
      let textColor = vue.computed(() => {
        return tmcomputed.value.textColor;
      });
      vue.provide("appTextColor", textColor);
      return (_ctx, _cache) => {
        return _blue_sheet.value ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          "render-whole": true,
          blurEffect: vue.unref(_blurEffect),
          onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
          onLongpress: longpress,
          onTouchend: touchend,
          onTouchstart: touchstart,
          onTouchcancel: touchcancel,
          onMousedown: mousedown,
          onMouseup: mouseup,
          onMouseleave: mouseleave,
          class: vue.normalizeClass([
            "flex flex-col noNvueBorder",
            vue.unref(parenClass_p),
            `mx-${vue.unref(_margin)[0]}`,
            `my-${vue.unref(_margin)[1]}`,
            `px-${vue.unref(_padding)[0]}`,
            `py-${vue.unref(_padding)[1]}`,
            isLongPress.value ? props.hoverClass : "",
            props.hoverClass != "" && props.hoverClass != "none" ? "webpc" : "",
            !_ctx.isDisabledRoundAndriod ? `round-${props.round}` : ""
          ]),
          style: vue.normalizeStyle([
            vue.unref(_height) ? { height: vue.unref(_height) + vue.unref(_padding)[1] * 2 + props.unit } : "",
            vue.unref(_width) ? { width: vue.unref(_width) + vue.unref(_padding)[0] * 2 + props.unit } : "",
            vue.unref(tmcomputed).borderCss,
            vue.unref(_blur) && vue.unref(store).tmStore.os == "ios" && _isNvue.value === true ? "" : vue.unref(_bgcolor),
            !vue.unref(_transprent) && props.shadow > 0 ? vue.unref(tmcomputed).shadowColor : "",
            !vue.unref(_transprent) && vue.unref(_blur) ? { backdropFilter: "blur(6px)" } : "",
            vue.unref(customCSSStyle)
          ])
        }, [
          vue.createElementVNode("view", {
            "render-whole": true,
            class: vue.normalizeClass(["flex noNvueBorder flex-col flex-1", vue.unref(customClass)]),
            style: vue.normalizeStyle(vue.unref(contStyle_p))
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 6)
        ], 46, ["blurEffect"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var tmSheet = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-f76eb362"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-sheet/tm-sheet.vue"]]);
  const _sfc_main$W = /* @__PURE__ */ vue.defineComponent({
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
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const _label = vue.computed(() => props.label);
      const _fontSize = vue.computed(() => Number(props.fontSize));
      const appTextColor = vue.inject("appTextColor", vue.computed(() => void 0));
      const textColor = vue.computed(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = themeTool.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = themeTool.getColor(props.color);
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
        return vue.openBlock(), vue.createElementBlock("view", {
          "render-whole": true,
          class: "flex text-view nvue",
          style: { "line-height": "0" }
        }, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("text", {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              selectable: __props.selectable,
              "user-select": __props.selectable,
              class: vue.normalizeClass([__props.fontSize ? "" : "text-size-m", vue.unref(customClass)]),
              style: vue.normalizeStyle([
                {
                  lineHeight: (vue.unref(_fontSize) ? vue.unref(_fontSize) * 1.3 : 42) + props.unit,
                  color: vue.unref(textColor)
                },
                vue.unref(_fontSize) ? { fontSize: vue.unref(_fontSize) + props.unit } : "",
                vue.unref(customCSSStyle)
              ])
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createTextVNode(vue.toDisplayString(vue.unref(_label)), 1)
              ], true)
            ], 14, ["selectable", "user-select"])
          ])
        ]);
      };
    }
  });
  var tmText = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-9735369a"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-text/tm-text.vue"]]);
  const _sfc_main$V = /* @__PURE__ */ vue.defineComponent({
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
      const store = useTmpiniaStore();
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      vue.computed(() => computedTheme(props, isDark.value, tmcfg.value));
      function clickhandle(e) {
        emits("click", e);
      }
      const appTextColor = vue.inject("appTextColor", vue.computed(() => void 0));
      const textColor = vue.computed(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = themeTool.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = themeTool.getColor(props.color);
          return nowcolor.csscolor;
        }
        if (appTextColor.value)
          return appTextColor.value;
        return "rgba(34, 34, 34, 1.0)";
      });
      const fontSizeComputed = vue.computed(() => {
        return { fontSize: (props.fontSize || 30) + props.unit, lineHeight: props.lineHeight > -1 ? props.lineHeight + props.unit : (props.fontSize || 30) + props.unit };
      });
      const prefx = vue.computed(() => {
        let prefix = props.name.split("-")[0];
        return prefix;
      });
      const iconComputed = vue.computed(() => {
        return props.name;
      });
      const isImg = vue.computed(() => {
        if (props.name[0] == "." || props.name[0] == "/" || props.name.substring(0, 5) == "data:" || props.name.substring(0, 4) == "http" || props.name.substring(0, 5) == "https" || props.name.substring(0, 3) == "ftp") {
          return true;
        }
        return false;
      });
      const spinComputed = vue.computed(() => props.spin);
      const custom_space_size = vue.inject("custom_space_size", [0, 0]);
      vue.computed(() => Math.ceil(props.fontSize || 34) + custom_space_size[0]);
      vue.computed(() => Math.ceil(props.fontSize || 34) + custom_space_size[1]);
      vue.ref(null);
      vue.watch(spinComputed, () => {
      });
      vue.onBeforeMount(() => {
      });
      vue.onMounted(() => {
      });
      vue.onUnmounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          "render-whole": true,
          class: "flex flex-row flex-row-center-center",
          style: vue.normalizeStyle([{
            marginRight: vue.unref(custom_space_size)[0] + "rpx",
            marginBottom: vue.unref(custom_space_size)[1] + "rpx"
          }])
        }, [
          !vue.unref(isImg) ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            onClick: clickhandle,
            onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
            class: vue.normalizeClass([vue.unref(spinComputed) ? "spin" : "", "text-size-n d-inline-block", "tmicon ", vue.unref(prefx), vue.unref(iconComputed), vue.unref(customClass)]),
            style: vue.normalizeStyle([vue.unref(fontSizeComputed), { color: vue.unref(textColor) }, vue.unref(customCSSStyle)])
          }, null, 38)) : vue.createCommentVNode("v-if", true),
          vue.unref(isImg) ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            "render-whole": true,
            onClick: clickhandle,
            onLongpress: _cache[1] || (_cache[1] = ($event) => emits("longpress", $event)),
            ref: "icon",
            src: vue.unref(iconComputed),
            class: vue.normalizeClass([vue.unref(spinComputed) ? "spin" : "", vue.unref(customClass)]),
            style: vue.normalizeStyle([{ width: (props.fontSize || 30) + props.unit, height: (props.fontSize || 30) + props.unit }, vue.unref(customCSSStyle)])
          }, null, 46, ["src"])) : vue.createCommentVNode("v-if", true)
        ], 4);
      };
    }
  });
  var tmIcon = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-513b896a"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-icon/tm-icon.vue"]]);
  const _sfc_main$U = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-navbar",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _height = vue.computed(() => props.height);
      const _width = uni.getSystemInfoSync().windowWidth;
      const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
      const _barHeight = vue.computed(() => statusBarHeight + _height.value);
      const _leftWidth = vue.computed(() => props.leftWidth);
      const _rightWidth = vue.computed(() => props.rightWidth);
      const contentwidth = vue.computed(() => {
        return _width - uni.upx2px(_leftWidth.value) - uni.upx2px(_rightWidth.value);
      });
      const _title = vue.computed(() => props.title);
      const _fontColor = vue.computed(() => props.fontColor);
      const _homeColor = vue.computed(() => props.homeColor);
      const _blur = vue.computed(() => props.blur);
      const _pages = vue.ref(0);
      vue.onMounted(() => {
        _pages.value = getCurrentPages().length;
      });
      const backhome = () => {
        uni.reLaunch({
          url: props.homePath
        });
      };
      let timerId = NaN;
      function debounce2(func, wait = 500, immediate = false) {
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
        debounce2(async () => {
          if (typeof props.beforeBack === "function") {
            let p2 = await props.beforeBack();
            if (typeof p2 === "function") {
              p2 = await p2();
            }
            if (!p2)
              return;
          }
          uni.navigateBack({});
        }, 250, true);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", {
            class: "statusHeight",
            style: vue.normalizeStyle({ height: vue.unref(_barHeight) + "px" })
          }, null, 4),
          vue.createElementVNode("view", {
            class: "fixed l-0 t-0 statusHeightTop flex",
            style: vue.normalizeStyle({ width: vue.unref(_width) + "px", height: vue.unref(_barHeight) + "px" })
          }, [
            vue.createVNode(tmSheet, {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              blur: vue.unref(_blur),
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
              height: vue.unref(_barHeight),
              width: vue.unref(_width),
              unit: "px"
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "statusHeight",
                  style: vue.normalizeStyle({ height: vue.unref(statusBarHeight) + "px" })
                }, null, 4),
                vue.createElementVNode("view", { class: "flex flex-row flex-1 flex-row flex-row-center-betweent" }, [
                  vue.createElementVNode("view", {
                    class: "flex-row flex flex-row-center-start",
                    style: vue.normalizeStyle({ width: vue.unref(_leftWidth) + "rpx" })
                  }, [
                    _pages.value > 1 && props.hideBack ? (vue.openBlock(), vue.createBlock(tmIcon, {
                      key: 0,
                      unit: props.unit,
                      "font-size": props.iconFontSize,
                      _class: "pointer pb-12 pt-12 px-24",
                      color: vue.unref(_homeColor),
                      onClick: goback,
                      name: "tmicon-angle-left"
                    }, null, 8, ["unit", "font-size", "color"])) : vue.createCommentVNode("v-if", true),
                    _pages.value == 1 && !__props.hideHome ? (vue.openBlock(), vue.createBlock(tmIcon, {
                      key: 1,
                      unit: props.unit,
                      _class: "pointer  pb-12 pt-12 px-24",
                      onClick: backhome,
                      color: vue.unref(_homeColor),
                      "font-size": props.iconFontSize,
                      name: "tmicon-md-home"
                    }, null, 8, ["unit", "color", "font-size"])) : vue.createCommentVNode("v-if", true),
                    vue.renderSlot(_ctx.$slots, "left", {}, void 0, true)
                  ], 4),
                  vue.createElementVNode("view", {
                    class: "flex flex-row-center-center",
                    style: vue.normalizeStyle({ width: vue.unref(contentwidth) + "px" })
                  }, [
                    vue.renderSlot(_ctx.$slots, "default", {}, () => [
                      vue.createVNode(tmText, {
                        unit: props.unit,
                        _class: "text-weight-b text-overflow-1",
                        color: vue.unref(_fontColor),
                        "font-size": props.fontSize,
                        label: vue.unref(_title)
                      }, null, 8, ["unit", "color", "font-size", "label"])
                    ], true)
                  ], 4),
                  vue.createElementVNode("view", {
                    class: "flex-row flex flex-row-center-end",
                    style: vue.normalizeStyle({ width: vue.unref(_rightWidth) + "rpx" })
                  }, [
                    vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
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
  var __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-18fa0d39"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-navbar/tm-navbar.vue"]]);
  function resolveEasycom(component, easycom2) {
    return shared.isString(component) ? easycom2 : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const _sfc_main$T = {
    name: "FatFatMeng-Swiper-mfw",
    props: {
      list: {
        type: Array,
        default: []
      },
      current: {
        type: Number,
        default: 1
      },
      autoplay: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        disable_touch: false
      };
    },
    watch: {},
    methods: {
      change(e) {
        let index = e.detail.current;
        let event = {
          current: index
        };
        this.$emit("change", event);
      },
      SwiperIndTap(e) {
        formatAppLog("log", "at uni_modules/FatFatMeng-Swiper-mfw/components/FatFatMeng-Swiper-mfw/FatFatMeng-Swiper-mfw.vue:179", e);
      }
    },
    beforeCreate() {
      const domModule = weex.requireModule("dom");
      domModule.addRule("fontFace", {
        fontFamily: "appiconfont",
        src: "url('http://at.alicdn.com/t/font_2582495_l8bsl3n1qme.ttf')"
      });
      domModule.addRule("fontFace", {
        fontFamily: "appttf",
        src: "url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6f9528be-c345-44ba-b6fd-591d2d036aec/9768b86a-b79c-41bc-9305-c42785200f0d.ttf')"
      });
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u8F6E\u64AD\u56FE "),
      vue.createElementVNode("view", { class: "Swiper-mfw-index-box" }, [
        vue.createElementVNode("view", { class: "Swiper-mfw-index Swiper-box" }, [
          vue.createElementVNode("swiper", {
            class: "Swiper-mfw",
            circular: true,
            "indicator-dots": false,
            autoplay: $props.autoplay,
            interval: 3e3,
            duration: 1e3,
            current: $props.current,
            "disable-touch": $data.disable_touch,
            onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args))
          }, [
            vue.createCommentVNode(" \u53EA\u9700\u8981\u524D5\u6761\u6570\u636E "),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.list, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", {
                class: "swiper-mfw-item",
                key: index
              }, [
                vue.createCommentVNode(' /*\r\n					 1. \u8FD9\u91CC\u4E0D\u9700\u8981\u7528api\u63A7\u5236\u6682\u505C\u89C6\u9891\r\n					 2. \u56E0\u4E3Avideo\u6807\u7B7E\u4E0A\u52A0\u4E86v-if="current==index"\r\n					 3. \u5F53current == index\u65F6\u624D\u4F1A\u521B\u5EFA\u89C6\u9891\u7EC4\u4EF6\r\n					 4. \u5426current != index\u5219\u5C31\u9500\u6BC1\u89C6\u9891\r\n					 */ '),
                vue.createCommentVNode(" \u5982\u679C\u6709\u89C6\u9891\uFF0C\u5219\u663E\u793A\u89C6\u9891"),
                vue.createCommentVNode(` 		<template v-if="item.mp4 && current==index">\r
						<video class="ImageVideo" :id="'ImageVideo'+index" :ref="'ImageVideo'+index" :src="item.mp4"\r
							:loop="true" :muted="false" :autoplay="current==index ? true : false" :controls="false"\r
							:show-fullscreen-btn="false" :show-play-btn="false" :enable-progress-gesture="false"\r
							:play-strategy="0" :poster="item.Image"></video>\r
					</template> `),
                vue.createCommentVNode(" \u5426\u5219\u663E\u793A\u56FE\u7247 "),
                vue.createElementVNode("image", {
                  src: item.Image,
                  class: "Image",
                  mode: "aspectFill"
                }, null, 8, ["src"])
              ]);
            }), 128))
          ], 40, ["autoplay", "current", "disable-touch"]),
          vue.createCommentVNode(" \u6307\u793A\u5668 [Top] "),
          (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "Swiper-indicator-box indicator-Top-box"
          }, [
            vue.createCommentVNode(" Top\u9876\u90E8 [\u4ECA\u65E5\u9996\u63A8-\u76D2\u5B50] "),
            vue.createElementVNode("view", { class: "Top-date-hot" }, [
              vue.createCommentVNode(" \u5DE6\u8FB9\u76D2\u5B50 - \u65E5 "),
              vue.createElementVNode("view", { class: "left-date-ri" }, [
                vue.createElementVNode("text", { class: "date-ri-text text app-ttf" }, "07")
              ]),
              vue.createCommentVNode(" \u4E2D\u95F4\u76D2\u5B50 - \u5E74\uFF0C\u6708 "),
              vue.createElementVNode("view", { class: "conter-date-nianyue" }, [
                vue.createCommentVNode(" \u5DE6\u8FB9 \u9EC4\u8272\u5360\u4F4D\u5BBD\u5EA6\u76D2\u5B50 "),
                vue.createElementVNode("view", { class: "left-width-bgcolor" }),
                vue.createCommentVNode(" \u53F3\u8FB9 \u5E74\u6708\u76D2\u5B50 "),
                vue.createElementVNode("view", { class: "right-date-nianyue" }, [
                  vue.createCommentVNode(" \u9876\u90E8 \u6708\u4EFD [\u82F1\u6587\u663E\u793A] "),
                  vue.createElementVNode("text", { class: "Top-yue-usa text" }, "AUG"),
                  vue.createElementVNode("text", { class: "Bottom-nian text" }, "2022")
                ])
              ]),
              vue.createCommentVNode(" \u53F3\u8FB9\u76D2\u5B50 - \u4ECA\u65E5\u9996\u63A8 "),
              vue.createElementVNode("view", { class: "right-hot-ttf" }, [
                vue.createElementVNode("text", { class: "text hot-text app-ttf" }, "\u70ED\u95E8")
              ])
            ])
          ])),
          vue.createCommentVNode(" \u6307\u793A\u5668 [Bottom] "),
          (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "Swiper-indicator-box indicator-Btoom-box"
          }, [
            vue.createCommentVNode(" bottom\u5E95\u90E8 [\u8BE6\u60C5-\u76D2\u5B50] "),
            vue.createElementVNode("view", { class: "Bottom-datall" }, [
              vue.createCommentVNode(" \u6307\u793A\u5668 [\u8F6E\u64AD\u4FE1\u606F -> \u6807\u9898,\u7528\u6237,\u5934\u50CF,\u6240\u5728\u5730] "),
              vue.createElementVNode("view", { class: "Swiper-indicator-Top" }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.list, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "Top-item",
                    key: index
                  }, [
                    $props.current == index ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: vue.normalizeClass($props.current == index ? "current" : "no")
                    }, [
                      vue.createCommentVNode(" \u5982\u679C\u5B58\u5728\u89C6\u9891\uFF0C\u5219\u663E\u793A\u201C\u89C6\u9891\u9884\u89C8\u201D\u63D0\u793A "),
                      item.mp4 ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "Top-ImageVideo"
                      }, [
                        vue.createCommentVNode(" icon\u56FE\u6807 "),
                        vue.createElementVNode("view", { class: "Icons" }, [
                          vue.createElementVNode("text", { class: "app-iconfont custom-icon-play-c-copy" })
                        ]),
                        vue.createElementVNode("text", { class: "text ImageVideo-text app-ttf" }, "\u89C6\u9891\u9884\u89C8")
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" \u6807\u9898 "),
                      vue.createElementVNode("view", { class: "Top-Title" }, [
                        vue.createElementVNode("text", { class: "text title-text" }, vue.toDisplayString(item.title), 1)
                      ]),
                      vue.createCommentVNode(" \u7528\u6237\u4FE1\u606F "),
                      vue.createElementVNode("view", { class: "Bottom-UserInfo" }, [
                        vue.createCommentVNode(" \u5934\u50CF "),
                        vue.createElementVNode("view", { class: "UserImage-box" }, [
                          vue.createElementVNode("image", {
                            src: item.UserImage,
                            class: "Image",
                            mode: "aspectFill"
                          }, null, 8, ["src"])
                        ]),
                        vue.createCommentVNode(" \u7528\u6237\u540D "),
                        vue.createElementVNode("view", { class: "textbox UserName-box" }, [
                          vue.createElementVNode("text", { class: "text wo-text" }, "\u6211\u662F"),
                          vue.createElementVNode("text", { class: "text UserInfo" }, vue.toDisplayString(item.UserName), 1)
                        ]),
                        vue.createCommentVNode("  \u5DE6\u53F3\u5206\u5272\uFF0C\u4E2D\u95F4\u662F[.] "),
                        vue.createElementVNode("view", { class: "jiange-box" }, [
                          vue.createElementVNode("text", { class: "text jiange-text" }, "\xB7")
                        ]),
                        vue.createCommentVNode(" \u6240\u5728\u5730 "),
                        vue.createElementVNode("view", { class: "textbox UserGPS-box" }, [
                          vue.createElementVNode("text", { class: "text wo-text" }, "\u6211\u5728"),
                          vue.createElementVNode("text", { class: "text UserInfo" }, vue.toDisplayString(item.UserGPS), 1)
                        ])
                      ])
                    ], 2)) : vue.createCommentVNode("v-if", true)
                  ]);
                }), 128))
              ]),
              vue.createCommentVNode(" \u6307\u793A\u5668 [\u5DE6\u8FB9\u56FE\u7247\u5217\u8868+\u53F3\u8FB9\u6309\u94AE] "),
              vue.createElementVNode("view", { class: "Swiper-indicator-Bottom" }, [
                vue.createCommentVNode(" \u5DE6\u8FB9 "),
                vue.createElementVNode("view", { class: "Bottom-left-Imagelist" }, [
                  vue.createCommentVNode(" \u53EA\u9700\u8981\u524D5\u6761\u6570\u636E "),
                  vue.createCommentVNode(" \u6307\u793A\u56FE(\u5C0F\u56FE\u6A21\u5F0F) "),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.list, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "Bottom-item",
                      key: index,
                      onClick: ($event) => $options.SwiperIndTap(index)
                    }, [
                      Number(index) <= 4 ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        class: vue.normalizeClass([$props.current == index ? "current" : "no", "Image"]),
                        src: item.Image,
                        mode: "aspectFill"
                      }, null, 10, ["src"])) : vue.createCommentVNode("v-if", true)
                    ], 8, ["onClick"]);
                  }), 128))
                ]),
                vue.createCommentVNode(" \u53F3\u8FB9 "),
                vue.createElementVNode("view", { class: "Bottom-right-lili-btn" }, [
                  vue.createCommentVNode(" \u5386\u5386\u5728\u76EE "),
                  vue.createElementVNode("view", { class: "Bottom-item" }, [
                    vue.createElementVNode("text", { class: "left text indicator-text" }, "\u5386\u5386\u5728\u76EE"),
                    vue.createCommentVNode(" icon\u56FE\u6807 "),
                    vue.createElementVNode("view", { class: "right Icons" }, [
                      vue.createElementVNode("text", { class: "app-iconfont custom-icon-play-c-copy" })
                    ])
                  ])
                ])
              ])
            ])
          ]))
        ])
      ])
    ], 2112);
  }
  var __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$w], ["__scopeId", "data-v-4db70048"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/FatFatMeng-Swiper-mfw/components/FatFatMeng-Swiper-mfw/FatFatMeng-Swiper-mfw.vue"]]);
  const _sfc_main$S = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-button",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2;
      const props = __props;
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const formtype = vue.computed(() => props.formType);
      let FormParent = null;
      if (formtype.value == "reset" || formtype.value == "submit") {
        FormParent = proxy == null ? void 0 : proxy.$parent;
        while (FormParent) {
          if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
            break;
          } else {
            FormParent = (_c2 = FormParent == null ? void 0 : FormParent.$parent) != null ? _c2 : void 0;
          }
        }
      }
      const customCSSStyle = vue.computed(() => {
        return __spreadProps(__spreadValues({
          height: btnSizeObj.value.h + props.unit
        }, computedStyle(props)), {
          border: "0px solid rgba(0, 0, 0, 0)",
          background: "rgba(0, 0, 0, 0)",
          borderRadius: "0px"
        });
      });
      const customClass = vue.computed(() => computedClass(props));
      const isclickOn = vue.ref(false);
      const _load = vue.computed(() => props.loading);
      const _disabled = vue.computed(() => props.disabled);
      const _label = vue.computed(() => props.label);
      const _icon = vue.computed(() => props.icon);
      const sizeObj = vue.computed(() => {
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
      const btnSizeObj = vue.computed(() => {
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
      const _fontColor = vue.computed(() => props.fontColor);
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
        return vue.openBlock(), vue.createBlock(tmSheet, {
          "no-level": "",
          _style: { opacity: isclickOn.value || vue.unref(_disabled) ? 0.7 : 1 },
          "hover-class": "none",
          round: vue.unref(btnSizeObj).round,
          width: vue.unref(btnSizeObj).w,
          height: vue.unref(btnSizeObj).h,
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
          default: vue.withCtx(() => [
            vue.createElementVNode("button", {
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
              loading: vue.unref(_load),
              disabled: vue.unref(_disabled),
              "hover-start-time": 1e7,
              "hover-stop-propagation": "",
              "hover-class": "bhover",
              class: vue.normalizeClass(["button flex-1 flex-center", [vue.unref(customClass)]]),
              style: vue.normalizeStyle(vue.unref(customCSSStyle))
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.unref(_icon) ? (vue.openBlock(), vue.createBlock(tmIcon, {
                  key: 0,
                  userInteractionEnabled: false,
                  color: vue.unref(_fontColor),
                  _class: vue.unref(_label) ? "pr-10" : "",
                  unit: props.unit,
                  fontSize: vue.unref(btnSizeObj).fontSize * 0.9,
                  name: vue.unref(_icon)
                }, null, 8, ["color", "_class", "unit", "fontSize", "name"])) : vue.createCommentVNode("v-if", true),
                vue.createVNode(tmText, {
                  userInteractionEnabled: false,
                  color: vue.unref(_fontColor),
                  fontSize: vue.unref(btnSizeObj).fontSize,
                  unit: props.unit,
                  label: vue.unref(_label)
                }, null, 8, ["color", "fontSize", "unit", "label"])
              ], true)
            ], 46, ["form-type", "openType", "appParameter", "sessionFrom", "sendMessageTitle", "sendMessagePath", "sendMessageImg", "sendMessageCard", "loading", "disabled"])
          ]),
          _: 3
        }, 8, ["_style", "round", "width", "height", "padding", "margin", "color", "shadow", "transprent", "linear", "linear-deep", "text", "outlined", "dark", "follow-dark", "follow-theme", "border-direction", "border-style", "border", "blur"]);
      };
    }
  });
  var tmButton = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-fbe2c206"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-button/tm-button.vue"]]);
  const _sfc_main$R = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-input",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c2 = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c2 : void 0;
        }
      }
      const isAndroid = vue.ref(false);
      isAndroid.value = uni.getSystemInfoSync().platform == "android" ? true : false;
      const _height = vue.computed(() => props.height);
      const _inputPadding = vue.computed(() => {
        if (props.search !== "" || props.searchLabel !== "") {
          return [4, 0];
        }
        return props.inputPadding;
      });
      let timerId = NaN;
      function debounce2(func, wait = 500, immediate = false) {
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
      const propsDetail = vue.computed(() => {
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
      const tmcfg = vue.computed(() => store.tmStore);
      vue.computed(() => computedStyle(props));
      vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const _requiredError = vue.ref(false);
      const _foucsActive = vue.ref(props.focus || false);
      vue.watch(() => props.focus, () => {
        _foucsActive.value = props.focus;
      });
      const _color = vue.computed(() => {
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
      const tmcomputed = vue.computed(() => {
        const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
        return computedTheme(_props, isDark.value, tmcfg.value);
      });
      const showPasswordText = vue.ref(propsDetail.value.password);
      const showPasswordIcon = vue.computed(() => props.password);
      vue.ref(props.errorLabel);
      const _value = vue.ref(props.modelValue);
      const _valueLenChar = vue.computed(() => {
        let str = String(_value.value).split("");
        return str.length;
      });
      vue.watch(() => props.modelValue, () => _value.value = props.modelValue);
      const rulesObj = vue.inject("tmFormItemRules", vue.computed(() => {
        var _a3;
        return [{
          message: (_a3 = props == null ? void 0 : props.errorLabel) != null ? _a3 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
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
        debounce2(() => emits("click", e), 150, true);
      }
      vue.watch(_value, () => debounce2(pushFormItem, 150));
      const tmFormFun = vue.inject("tmFormFun", vue.computed(() => ""));
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps(__spreadValues({}, el), {
              validator: (val) => {
                return String(val).length == 0 || typeof val === null ? false : true;
              }
            });
          } else {
            return __spreadProps(__spreadValues({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise(async (res, rej) => {
            if (typeof el.validator === "function") {
              let vr = await el.validator(_value.value);
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
          });
        });
        return Promise.all(rules_fun);
      };
      async function pushFormItem(isCheckVail = true) {
        if (parentFormItem) {
          if (isCheckVail) {
            validate(vue.toRaw(rulesObj.value)).then((ev) => {
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
      }
      vue.watch(tmFormFun, () => {
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
        return vue.openBlock(), vue.createBlock(tmSheet, {
          transprent: true,
          margin: props.margin,
          padding: props.padding
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(tmSheet, {
              transprent: props.transprent,
              round: props.round,
              "no-level": "",
              margin: [0, 0],
              padding: vue.unref(_inputPadding),
              border: props.border,
              text: props.text,
              color: vue.unref(_color),
              outlined: props.outlined,
              shadow: props.shadow,
              linear: props.linear,
              linearDeep: props.linearDeep
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(["flex flex-row", [vue.unref(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"]]),
                  onClick: _cache[6] || (_cache[6] = ($event) => inputClick($event)),
                  style: vue.normalizeStyle([{ height: `${vue.unref(_height)}rpx` }])
                }, [
                  vue.unref(propsDetail).search || vue.unref(propsDetail).searchLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "px-9"
                  })) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
                  vue.unref(propsDetail).prefix ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "pr-16"
                  }, [
                    vue.createVNode(tmIcon, {
                      "font-size": vue.unref(propsDetail).fontSize,
                      name: vue.unref(propsDetail).prefix
                    }, null, 8, ["font-size", "name"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).prefixLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "pr-24"
                  }, [
                    vue.createVNode(tmText, {
                      "font-size": vue.unref(propsDetail).fontSize,
                      label: vue.unref(propsDetail).prefixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : vue.createCommentVNode("v-if", true),
                  !isAndroid.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    onClick: vue.withModifiers(inputClick, ["stop"]),
                    class: "flex-1 relative flex-row flex",
                    style: vue.normalizeStyle([{ width: "0px" }])
                  }, [
                    vue.createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    vue.unref(propsDetail).type != "textarea" ? (vue.openBlock(), vue.createElementBlock("input", {
                      key: 0,
                      class: "flex-1",
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: vue.unref(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[0] || (_cache[0] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      maxlength: vue.unref(propsDetail).maxlength,
                      disabled: vue.unref(propsDetail).disabled,
                      cursorSpacing: vue.unref(propsDetail).cursorSpacing,
                      confirmType: vue.unref(propsDetail).confirmType,
                      confirmHold: vue.unref(propsDetail).confirmHold,
                      autoBlur: vue.unref(propsDetail).autoBlur,
                      holdKeyboard: vue.unref(propsDetail).holdKeyboard,
                      adjustPosition: vue.unref(propsDetail).adjustPosition,
                      type: vue.unref(propsDetail).type,
                      placeholder: vue.unref(propsDetail).placeholder,
                      style: vue.normalizeStyle([
                        {
                          height: `${vue.unref(_height)}rpx`,
                          color: vue.unref(propsDetail).fontColor ? vue.unref(propsDetail).fontColor : vue.unref(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${vue.unref(propsDetail).fontSize_px}px`
                        }
                      ]),
                      "placeholder-style": `fontSize:${vue.unref(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "maxlength", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "type", "placeholder", "placeholder-style"])) : vue.createCommentVNode("v-if", true),
                    vue.unref(propsDetail).type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
                      key: 1,
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: vue.unref(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[1] || (_cache[1] = ($event) => emits("keyboardheightchange")),
                      maxlength: vue.unref(propsDetail).maxlength,
                      disabled: vue.unref(propsDetail).disabled,
                      placeholder: vue.unref(propsDetail).placeholder,
                      cursorSpacing: vue.unref(propsDetail).cursorSpacing,
                      confirmHold: vue.unref(propsDetail).confirmHold,
                      autoBlur: vue.unref(propsDetail).autoBlur,
                      holdKeyboard: vue.unref(propsDetail).holdKeyboard,
                      cursor: vue.unref(propsDetail).cursor,
                      "show-confirm-bar": vue.unref(propsDetail).showConfirmBar,
                      selectionStart: vue.unref(propsDetail).selectionStart,
                      selectionEnd: vue.unref(propsDetail).selectionEnd,
                      "disable-default-padding": vue.unref(propsDetail).disableDefaultPadding,
                      fixed: vue.unref(propsDetail).fixed,
                      adjustPosition: vue.unref(propsDetail).adjustPosition,
                      type: vue.unref(propsDetail).type,
                      style: vue.normalizeStyle([
                        {
                          height: `${vue.unref(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: vue.unref(propsDetail).fontColor ? vue.unref(propsDetail).fontColor : vue.unref(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${vue.unref(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-12",
                      "placeholder-style": `fontSize:${vue.unref(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "maxlength", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "cursor", "show-confirm-bar", "selectionStart", "selectionEnd", "disable-default-padding", "fixed", "adjustPosition", "type", "placeholder-style"])) : vue.createCommentVNode("v-if", true)
                  ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                  isAndroid.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 4,
                    class: "flex-1 relative flex-row flex",
                    style: vue.normalizeStyle([{ width: "0px" }])
                  }, [
                    vue.createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                    vue.unref(propsDetail).type != "textarea" ? (vue.openBlock(), vue.createElementBlock("input", {
                      key: 0,
                      class: "flex-1",
                      onClick: _cache[2] || (_cache[2] = ($event) => emits("click", $event)),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: vue.unref(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[3] || (_cache[3] = ($event) => emits("keyboardheightchange")),
                      password: showPasswordText.value,
                      disabled: vue.unref(propsDetail).disabled,
                      cursorSpacing: vue.unref(propsDetail).cursorSpacing,
                      confirmType: vue.unref(propsDetail).confirmType,
                      confirmHold: vue.unref(propsDetail).confirmHold,
                      autoBlur: vue.unref(propsDetail).autoBlur,
                      holdKeyboard: vue.unref(propsDetail).holdKeyboard,
                      adjustPosition: vue.unref(propsDetail).adjustPosition,
                      maxlength: vue.unref(propsDetail).maxlength,
                      type: vue.unref(propsDetail).type,
                      placeholder: vue.unref(propsDetail).placeholder,
                      style: vue.normalizeStyle([
                        {
                          height: `${vue.unref(_height)}rpx`,
                          color: vue.unref(propsDetail).fontColor ? vue.unref(propsDetail).fontColor : vue.unref(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${vue.unref(propsDetail).fontSize_px}px`
                        }
                      ]),
                      "placeholder-style": `fontSize:${vue.unref(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "password", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "type", "placeholder", "placeholder-style"])) : vue.createCommentVNode("v-if", true),
                    vue.unref(propsDetail).type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
                      key: 1,
                      onClick: _cache[4] || (_cache[4] = ($event) => emits("click", $event)),
                      userInteractionEnabled: false,
                      value: _value.value,
                      focus: vue.unref(propsDetail).focus,
                      onFocus: focus,
                      onBlur: blur,
                      onConfirm: confirm,
                      onInput: inputHandler,
                      onKeyboardheightchange: _cache[5] || (_cache[5] = ($event) => emits("keyboardheightchange")),
                      disabled: vue.unref(propsDetail).disabled,
                      placeholder: vue.unref(propsDetail).placeholder,
                      cursorSpacing: vue.unref(propsDetail).cursorSpacing,
                      confirmHold: vue.unref(propsDetail).confirmHold,
                      autoBlur: vue.unref(propsDetail).autoBlur,
                      holdKeyboard: vue.unref(propsDetail).holdKeyboard,
                      adjustPosition: vue.unref(propsDetail).adjustPosition,
                      maxlength: vue.unref(propsDetail).maxlength,
                      autoHeight: vue.unref(propsDetail).autoHeight,
                      cursor: vue.unref(propsDetail).cursor,
                      "show-confirm-bar": vue.unref(propsDetail).showConfirmBar,
                      selectionStart: vue.unref(propsDetail).selectionStart,
                      selectionEnd: vue.unref(propsDetail).selectionEnd,
                      "disable-default-padding": vue.unref(propsDetail).disableDefaultPadding,
                      fixed: vue.unref(propsDetail).fixed,
                      type: vue.unref(propsDetail).type,
                      style: vue.normalizeStyle([
                        {
                          height: `${vue.unref(_height)}rpx`,
                          width: "auto",
                          "word-break": "break-word",
                          color: vue.unref(propsDetail).fontColor ? vue.unref(propsDetail).fontColor : vue.unref(tmcomputed).textColor,
                          "text-align": props.align,
                          "fontSize": `${vue.unref(propsDetail).fontSize_px}px`
                        }
                      ]),
                      class: "wrap flex-1 py-10",
                      "placeholder-style": `fontSize:${vue.unref(propsDetail).fontSize_px}px`
                    }, null, 44, ["value", "focus", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "autoHeight", "cursor", "show-confirm-bar", "selectionStart", "selectionEnd", "disable-default-padding", "fixed", "type", "placeholder-style"])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).showClear && vue.unref(_valueLenChar) > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 5,
                    class: "pl-16"
                  }, [
                    vue.createVNode(tmIcon, {
                      onClick: clearBtn,
                      "font-size": vue.unref(propsDetail).fontSize * 0.9,
                      name: "tmicon-times-circle-fill"
                    }, null, 8, ["font-size"])
                  ])) : vue.createCommentVNode("v-if", true),
                  _requiredError.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 6,
                    class: "pl-16"
                  }, [
                    vue.createVNode(tmIcon, {
                      "font-size": vue.unref(propsDetail).fontSize,
                      name: "tmicon-exclamation-circle"
                    }, null, 8, ["font-size"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).suffix ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 7,
                    class: "pl-16"
                  }, [
                    vue.createVNode(tmIcon, {
                      "font-size": vue.unref(propsDetail).fontSize * 0.85,
                      name: vue.unref(propsDetail).suffix
                    }, null, 8, ["font-size", "name"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).suffixLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 8,
                    class: "pl-16"
                  }, [
                    vue.createVNode(tmText, {
                      "font-size": vue.unref(propsDetail).fontSize,
                      label: vue.unref(propsDetail).suffixLabel
                    }, null, 8, ["font-size", "label"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(showPasswordIcon) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 9,
                    class: "pl-16"
                  }, [
                    vue.createCommentVNode(" tmicon-eyeslash-fill "),
                    vue.createVNode(tmIcon, {
                      onClick: changeSeePassword,
                      "font-size": vue.unref(propsDetail).fontSize,
                      name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
                    }, null, 8, ["font-size", "name"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.unref(propsDetail).showCharNumber && vue.unref(_valueLenChar) > 0 && vue.unref(propsDetail).type != "textarea" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 10,
                    class: "pl-16 flex-row flex"
                  }, [
                    vue.createVNode(tmText, { label: vue.unref(_valueLenChar) }, null, 8, ["label"]),
                    vue.unref(propsDetail).maxlength > 0 ? (vue.openBlock(), vue.createBlock(tmText, {
                      key: 0,
                      label: "/" + vue.unref(propsDetail).maxlength
                    }, null, 8, ["label"])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" \u539F\u56E0\u662F\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u81EA\u5E26\u4E86\u8BA1\u6570\u5668\u3002\u4F1A\u5BFC\u81F4\u91CD\u53E0\u3002 "),
                  vue.unref(propsDetail).showCharNumber && vue.unref(_valueLenChar) > 0 && vue.unref(propsDetail).type == "textarea" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 11,
                    class: "pl-16 flex-row flex absolute r-0 b-12"
                  }, [
                    vue.createVNode(tmText, { label: vue.unref(_valueLenChar) }, null, 8, ["label"]),
                    vue.unref(propsDetail).maxlength > 0 ? (vue.openBlock(), vue.createBlock(tmText, {
                      key: 0,
                      label: "/" + vue.unref(propsDetail).maxlength
                    }, null, 8, ["label"])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "right", {}, () => [
                    vue.unref(propsDetail).search || vue.unref(propsDetail).searchLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "pl-16"
                    }, [
                      vue.createVNode(tmButton, {
                        followTheme: props.followTheme,
                        onClick: searchClick,
                        color: props.focusColor,
                        "font-size": 24,
                        height: vue.unref(_height) - 11,
                        padding: [16, 0],
                        block: "",
                        margin: [0, 0],
                        icon: vue.unref(propsDetail).search,
                        label: vue.unref(propsDetail).searchLabel
                      }, null, 8, ["followTheme", "color", "height", "icon", "label"])
                    ])) : vue.createCommentVNode("v-if", true)
                  ], true)
                ], 6)
              ]),
              _: 3
            }, 8, ["transprent", "round", "padding", "border", "text", "color", "outlined", "shadow", "linear", "linearDeep"]),
            vue.createCommentVNode(' <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">\r\n            <tm-divider :margin="[0,0]"></tm-divider>\r\n        </view> '),
            vue.createCommentVNode(" _requiredError "),
            vue.createCommentVNode(' <view v-if="false" class="pt-12">\r\n            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>\r\n        </view> ')
          ]),
          _: 3
        }, 8, ["margin", "padding"]);
      };
    }
  });
  var __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-0f58feaf"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-input/tm-input.vue"]]);
  const _sfc_main$Q = /* @__PURE__ */ vue.defineComponent({
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
      const borderDir = vue.computed(() => props.vertical ? "left" : "bottom");
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const isDark = vue.computed(() => computedDark(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), tmcfg.value));
      const tmcomputed = vue.computed(() => computedTheme(__spreadProps(__spreadValues({}, props), { borderDirection: borderDir.value }), isDark.value, tmcfg.value));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          !props.label || props.vertical ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            style: vue.normalizeStyle([{ backgroundColor: props.realColor ? vue.unref(tmcomputed).color : vue.unref(tmcomputed).border }, props.vertical ? { width: props.border + "rpx", height: props.height + "rpx" } : ""]),
            class: vue.normalizeClass([props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`])
          }, null, 6)) : vue.createCommentVNode("v-if", true),
          __props.label && !props.vertical ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "flex flex-row flex-center"
          }, [
            vue.createElementVNode("view", {
              style: vue.normalizeStyle([vue.unref(tmcomputed) ? { backgroundColor: props.realColor ? vue.unref(tmcomputed).color : vue.unref(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: vue.normalizeClass([`my-${props.margin[1]}`, __props.align == "left" ? "flex-2" : "", __props.align == "right" ? "flex-10" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6),
            vue.createElementVNode("view", {
              class: vue.normalizeClass([vue.unref(isDark) ? "opacity-4" : ""])
            }, [
              vue.createVNode(tmText, {
                fontSize: props.fontSize,
                dark: vue.unref(isDark),
                followTheme: props.followTheme,
                color: props.fontColor,
                label: props.label,
                _class: ["mx-32"]
              }, null, 8, ["fontSize", "dark", "followTheme", "color", "label"])
            ], 2),
            vue.createElementVNode("view", {
              style: vue.normalizeStyle([vue.unref(tmcomputed) ? { backgroundColor: props.realColor ? vue.unref(tmcomputed).color : vue.unref(tmcomputed).border, height: props.border + "rpx" } : ""]),
              class: vue.normalizeClass([`my-${props.margin[1]}`, __props.align == "left" ? "flex-10" : "", __props.align == "right" ? "flex-2" : "", __props.align == "center" ? "flex-1" : ""])
            }, null, 6)
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  var tmDivider = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-divider/tm-divider.vue"]]);
  const _sfc_main$P = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-badge",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const istext = vue.computed(() => {
        return isNaN(parseInt(String(props.count)));
      });
      const show = vue.computed(() => {
        if (!props.dot && !props.icon && !props.count)
          return false;
        return true;
      });
      const size = vue.computed(() => {
        if (props.status || props.dot) {
          return {
            w: 12,
            h: 12,
            pr: 6,
            t: 3
          };
        }
        if (props.icon) {
          let p2 = props.fontSize * 1.6;
          return {
            w: p2,
            h: p2,
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
      const _icon = vue.computed(() => props.icon);
      const _dot = vue.computed(() => props.dot);
      const _count = vue.computed(() => props.count);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: vue.normalizeClass(["flex relative", [props.status ? "flex-row flex-row-center-center mx-8" : ""]])
        }, [
          !props.status ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.renderSlot(_ctx.$slots, "default")
          ])) : vue.createCommentVNode("v-if", true),
          vue.unref(show) ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: vue.normalizeClass([
              (vue.unref(_dot) || vue.unref(_count) || vue.unref(_icon)) && !props.status ? "absolute flex-top-start-end r-0" : ""
            ]),
            style: { zIndex: 10 }
          }, [
            vue.createVNode(tmSheet, {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              color: props.color,
              _class: [vue.unref(customClass), "flex-center flex-col"],
              _style: [vue.unref(customCSSStyle), { flexShrink: 1 }],
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
              width: vue.unref(size).w,
              height: vue.unref(size).h,
              margin: props.margin,
              padding: props.padding
            }, {
              default: vue.withCtx(() => [
                vue.unref(_count) > 0 && !vue.unref(istext) ? (vue.openBlock(), vue.createBlock(tmText, {
                  key: 0,
                  color: "white",
                  "font-size": props.fontSize,
                  _class: vue.unref(size).h == 0 ? "py-3 px-8" : "",
                  label: vue.unref(_count) > props.maxCount ? props.maxCount + "+" : vue.unref(_count)
                }, null, 8, ["font-size", "_class", "label"])) : vue.createCommentVNode("v-if", true),
                vue.unref(_count) && vue.unref(istext) ? (vue.openBlock(), vue.createBlock(tmText, {
                  key: 1,
                  color: "white",
                  "font-size": props.fontSize,
                  _class: vue.unref(size).h == 0 ? "py-3 px-8" : "",
                  label: vue.unref(_count)
                }, null, 8, ["font-size", "_class", "label"])) : vue.createCommentVNode("v-if", true),
                vue.unref(_icon) ? (vue.openBlock(), vue.createBlock(tmIcon, {
                  key: 2,
                  color: "white",
                  "font-size": props.fontSize,
                  name: vue.unref(_icon)
                }, null, 8, ["font-size", "name"])) : vue.createCommentVNode("v-if", true)
              ]),
              _: 1
            }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding"])
          ], 2)) : vue.createCommentVNode("v-if", true),
          props.status ? (vue.openBlock(), vue.createBlock(tmText, {
            key: 2,
            "font-size": props.fontSize,
            _class: "ml-10",
            label: props.label
          }, null, 8, ["font-size", "label"])) : vue.createCommentVNode("v-if", true)
        ], 2);
      };
    }
  });
  var tmBadge = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-badge/tm-badge.vue"]]);
  const _sfc_main$O = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-tabs",
    props: __spreadProps(__spreadValues({}, custom_props), {
      list: {
        type: Array,
        default: () => []
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      width: {
        type: Number,
        default: 500
      },
      itemHeight: {
        type: Number,
        default: 80
      },
      height: {
        type: Number,
        default: 1e3
      },
      gutter: {
        type: Number,
        default: 0
      },
      defaultName: {
        type: [String, Number],
        default: ""
      },
      activeName: {
        type: [String, Number],
        default: ""
      },
      tabPos: {
        type: String,
        default: "top"
      },
      itemWidth: {
        type: Number,
        default: 0
      },
      activeColor: {
        type: String,
        default: "primary"
      },
      activeFontColor: {
        type: String,
        default: "primary"
      },
      activeFontSize: {
        type: Number,
        default: 28
      },
      itemModel: {
        type: String,
        default: "text"
      },
      unSelectedColor: {
        type: String,
        default: ""
      },
      itemFontSize: {
        type: Number,
        default: 28
      },
      itemLinear: {
        type: String,
        default: ""
      },
      itemLinearDeep: {
        type: String,
        default: "light"
      },
      itemRound: {
        type: Number,
        default: 0
      },
      align: {
        type: String,
        default: "left"
      },
      swiper: {
        type: Boolean,
        default: false
      },
      showTabsLineAni: {
        type: Boolean,
        default: false
      },
      tabsLineAniColor: {
        type: String,
        default: "primary"
      }
    }),
    emits: ["update:activeName", "change", "click"],
    setup(__props, { expose, emit: emits }) {
      var _a2, _b2;
      const props = __props;
      const store = useTmpiniaStore();
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      vue.ref(null);
      const _align = vue.computed(() => {
        let align_list = {
          right: "flex-row-center-end",
          left: "flex-row-center-start",
          center: "flex-row-center-center",
          around: "flex-around"
        };
        let key = "center";
        if (align_list.hasOwnProperty(props.align)) {
          key = props.align;
        }
        return align_list[key];
      });
      const _active = vue.ref(props.defaultName);
      emits("update:activeName", _active.value);
      const cstomClass = vue.computed(() => computedClass(props));
      const _scrollToId = vue.ref("");
      const modelStyle = vue.computed(() => {
        if (props.itemModel == "text") {
          return {
            transprent: true,
            border: 0,
            text: false
          };
        } else if (props.itemModel == "line") {
          return {
            transprent: true,
            border: 4,
            text: false
          };
        } else if (props.itemModel == "textLight") {
          return {
            transprent: false,
            border: 4,
            text: true
          };
        } else if (props.itemModel == "card") {
          return {
            transprent: false,
            border: 0,
            text: false
          };
        }
        return {
          transprent: true,
          border: 0,
          text: false
        };
      });
      const tmTabsId = "tmTabsId";
      const _tabPos = vue.computed(() => props.tabPos);
      const cacheTabs = vue.ref([]);
      const isDulitabs = vue.computed(() => props.list.length > 0);
      const tabsid = "tabs_id_" + uni.$tm.u.getUid(1) + "_";
      const isNvue = vue.ref(false);
      Math.ceil(uni.upx2px(props.itemHeight));
      const totalWidth = vue.computed(() => uni.upx2px(cacheTabs.value.length * props.width));
      const _itemwidth = Math.ceil(uni.upx2px(props.itemWidth + 40));
      const _sliderBarwidth = Math.ceil(uni.upx2px(40));
      const _width = Math.ceil(uni.upx2px(props.width));
      const contentWidth = vue.computed(() => {
        let width = (props.itemWidth + 40) * cacheTabs.value.length;
        if (width <= props.width) {
          width = props.width;
        }
        return width;
      });
      vue.computed(() => {
        let width = _itemwidth * cacheTabs.value.length;
        if (width <= props.width) {
          width = uni.upx2px(props.width);
        }
        return Math.ceil(width);
      });
      const anitLineLeft = vue.ref(0);
      let timerId = NaN;
      let timerId2 = NaN;
      function debounce2(func, wait = 500, immediate = false) {
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
      function debounce22(func, wait = 500, immediate = false) {
        if (!isNaN(timerId2))
          clearTimeout(timerId2);
        if (immediate) {
          var callNow = !timerId2;
          timerId2 = setTimeout(() => {
            timerId2 = NaN;
          }, wait);
          if (callNow)
            typeof func === "function" && func();
        } else {
          timerId2 = setTimeout(() => {
            typeof func === "function" && func();
          }, wait);
        }
      }
      const _startx = vue.ref(0);
      const _starty = vue.ref(0);
      vue.ref(0);
      vue.ref(0);
      const _x = vue.ref(0);
      const _y = vue.ref(0);
      const directoStyle = vue.ref("");
      const isEndMove = vue.ref(true);
      const maxLen = 40;
      const activeIndex = vue.computed(() => cacheTabs.value.findIndex((el) => el.key == _active.value));
      let ctxLeft = 0;
      let ctxTop = 0;
      let timeDetail = 1;
      let isMoveEnb = false;
      let dirType = vue.ref("none");
      let isDrag = vue.ref(false);
      let sliderBarWidth = uni.upx2px(40);
      let widthDrag = vue.ref(sliderBarWidth);
      vue.watchEffect(() => {
        cacheTabs.value = [];
        props.list.forEach((el, index) => {
          var _a3, _b3, _c2, _d, _e2, _f;
          cacheTabs.value.push({
            key: (_a3 = el == null ? void 0 : el.key) != null ? _a3 : String(index),
            title: (_b3 = el == null ? void 0 : el.title) != null ? _b3 : String(index),
            icon: (_c2 = el == null ? void 0 : el.icon) != null ? _c2 : "",
            dot: (_d = el == null ? void 0 : el.dot) != null ? _d : false,
            count: (_e2 = el == null ? void 0 : el.count) != null ? _e2 : "",
            dotColor: (_f = el == null ? void 0 : el.dotColor) != null ? _f : "red"
          });
        });
      });
      function setTabsBarLineLeft(key = "") {
        if (!props.showTabsLineAni)
          return;
        let keybl = key || _active.value;
        let index = cacheTabs.value.findIndex((el) => el.key == keybl);
        if (index > -1) {
          let leftPx = _itemwidth * index + (_itemwidth - _sliderBarwidth) / 2;
          if (props.align == "center") {
            leftPx = leftPx + (_width - _itemwidth * cacheTabs.value.length) / 2 - 1;
          }
          anitLineLeft.value = Math.ceil(leftPx);
        }
      }
      function unbindKey(key) {
        let index = cacheTabs.value.findIndex((el) => el.key == key);
        if (index > -1) {
          cacheTabs.value.splice(index, 1);
        }
        let index2 = cacheTabs.value.findIndex((el) => el.key == _active.value);
        if (index2 == -1 && cacheTabs.value.length > 0) {
          changeKey(cacheTabs.value[0].key, false);
        } else if (cacheTabs.value.length == 0) {
          changeKey("", false);
        }
      }
      vue.watch(() => props.activeName, () => {
        if (props.activeName == _active.value)
          return;
        changeKey(props.activeName, false);
      });
      vue.onMounted(() => {
        setTimeout(() => {
          _scrollToId.value = tabsid + _active.value;
          vue.nextTick(() => {
            setTabsBarLineLeft(props.defaultName);
          });
        }, 300);
      });
      vue.watchEffect(() => {
        directoStyle.value = String(Math.ceil(uni.upx2px(-activeIndex.value * props.width)));
        spinNvueAniEnd(0, -uni.upx2px(activeIndex.value * props.width), timeDetail);
      });
      vue.watch(() => _active.value, () => {
        vue.nextTick(() => {
          var _a3, _b3;
          let index = cacheTabs.value.findIndex((el) => el.key == _active.value);
          if (index > -1) {
            if (typeof cacheTabs.value[index - 2] !== "undefined") {
              _scrollToId.value = tabsid + ((_a3 = cacheTabs.value[index - 2]) == null ? void 0 : _a3.key);
            } else {
              _scrollToId.value = tabsid + ((_b3 = cacheTabs.value[0]) == null ? void 0 : _b3.key);
            }
          } else {
            _scrollToId.value = tabsid + _active.value;
          }
          setTabsBarLineLeft();
        });
      });
      function onStart(event) {
        if (!props.swiper)
          return;
        isEndMove.value = true;
        isMoveEnb = true;
        isDrag.value = true;
        if (event == null ? void 0 : event.preventDefault)
          event == null ? void 0 : event.preventDefault();
        if (event == null ? void 0 : event.stopPropagation)
          event == null ? void 0 : event.stopPropagation();
        if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
          var touch = event.changedTouches[0];
          if (typeof (touch == null ? void 0 : touch.pageX) !== "undefined") {
            _startx.value = touch.pageX - ctxLeft;
            _starty.value = touch.pageY - ctxTop;
          } else {
            _startx.value = touch.x;
            _starty.value = touch.y;
          }
        } else {
          _startx.value = event.pageX - event.currentTarget.offsetLeft - ctxLeft;
          _starty.value = event.pageY - event.currentTarget.offsetTop - ctxTop;
        }
      }
      function onMove(event) {
        if (!props.swiper || isMoveEnb == false)
          return;
        if (event == null ? void 0 : event.preventDefault)
          event == null ? void 0 : event.preventDefault();
        if (event == null ? void 0 : event.stopPropagation)
          event == null ? void 0 : event.stopPropagation();
        let nowx = 0;
        let nowy = 0;
        if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
          var touch = event.changedTouches[0];
          if (typeof (touch == null ? void 0 : touch.pageX) !== "undefined") {
            nowx = touch.pageX - ctxLeft;
            nowy = touch.pageY - ctxTop;
          } else {
            nowx = touch.x;
            nowy = touch.y;
          }
        } else {
          nowx = event.pageX - event.currentTarget.offsetLeft - ctxLeft;
          nowy = event.pageY - event.currentTarget.offsetTop - ctxTop;
        }
        _x.value = nowx - _startx.value;
        _y.value = nowy - _starty.value;
        setDirXy(_x.value, _y.value);
      }
      function onEnd(event) {
        if (!props.swiper || !isMoveEnb)
          return;
        isEndMove.value = false;
        debounce22(() => {
          setDirXy(_x.value, _y.value, true);
          isDrag.value = false;
        }, 250, true);
        isMoveEnb = false;
      }
      function setDirXy(x2, y, isEnd = false) {
        activeIndex.value;
        let nowLeft = uni.upx2px(activeIndex.value * props.width);
        debounce2(() => {
          if (x2 > 0 && Math.abs(x2) > Math.abs(y)) {
            dirType.value = "right";
          } else if (x2 < 0 && Math.abs(x2) > Math.abs(y)) {
            dirType.value = "left";
          } else if (y > 0 && Math.abs(y) > Math.abs(x2)) {
            dirType.value = "down";
          } else if (y < 0 && Math.abs(y) > Math.abs(x2)) {
            dirType.value = "up";
          } else {
            dirType.value = "none";
          }
        }, 300, true);
        if (dirType.value == "right") {
          if (activeIndex.value == 0)
            return;
          directoStyle.value = x2 - nowLeft;
          let sx = Math.abs(_x.value) * 1.0002;
          sx = sx <= sliderBarWidth ? sliderBarWidth : sx;
          sx = sx >= sliderBarWidth * 2 ? sliderBarWidth * 2 : sx;
          widthDrag.value = sx;
          if (isEnd) {
            setRightDirRight();
            widthDrag.value = sliderBarWidth;
          }
        } else if (dirType.value == "left") {
          if (activeIndex.value == cacheTabs.value.length - 1)
            return;
          directoStyle.value = x2 - nowLeft;
          let sx = Math.abs(_x.value) * 1.0002;
          sx = sx <= sliderBarWidth ? sliderBarWidth : sx;
          sx = sx >= sliderBarWidth * 2 ? sliderBarWidth * 2 : sx;
          widthDrag.value = sx;
          if (isEnd) {
            setLeftDirLeft();
            widthDrag.value = sliderBarWidth;
          }
        } else if (dirType.value == "down")
          ;
        function setRightDirRight() {
          if (x2 < maxLen || activeIndex.value <= 0) {
            directoStyle.value = -nowLeft;
          } else {
            _active.value = cacheTabs.value[activeIndex.value - 1].key;
          }
        }
        function setLeftDirLeft() {
          if (Math.abs(x2) < maxLen || activeIndex.value >= cacheTabs.value.length - 1) {
            directoStyle.value = -nowLeft;
          } else {
            _active.value = cacheTabs.value[activeIndex.value + 1].key;
          }
        }
      }
      vue.onUnmounted(() => {
      });
      function spinNvueAniEnd(start, end, time2 = timeDetail) {
        if (!props.swiper)
          return;
      }
      function pushKey(o2) {
        let index = cacheTabs.value.findIndex((el) => el.key === o2.key);
        if (index > -1) {
          cacheTabs.value.splice(index, 1, __spreadValues(__spreadValues({}, cacheTabs.value[0]), o2));
        } else {
          cacheTabs.value.push(o2);
        }
        if (_active.value == "") {
          changeKey(cacheTabs.value[0].key, false);
        }
      }
      function changeKey(key, isclick = true) {
        isEndMove.value = true;
        _active.value = key;
        timeDetail = 1;
        emits("update:activeName", vue.toRaw(_active.value));
        emits("change", key);
        if (isclick) {
          emits("click", key);
        }
      }
      function setTitle(o2) {
        let index = cacheTabs.value.findIndex((el) => el.key == o2.key);
        if (index > -1) {
          cacheTabs.value.splice(index, 1, o2);
        }
      }
      vue.provide("tabsActiveName", vue.computed(() => _active.value));
      vue.provide("tabsActiveCacheTabse", vue.computed(() => cacheTabs.value));
      vue.provide("tabsWidth", vue.computed(() => props.width));
      vue.provide("tabsheight", vue.computed(() => {
        if (!props.height)
          return 0;
        return props.height - props.itemHeight - props.gutter;
      }));
      vue.provide("tabsSwiper", vue.computed(() => props.swiper));
      expose({
        pushKey,
        changeKey,
        unbindKey,
        setTitle,
        tmTabsId
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "flex flex-col overflow",
          style: vue.normalizeStyle([
            props.height && vue.unref(isDulitabs) == false ? { height: __props.height + "rpx" } : "",
            { width: props.width + "rpx" }
          ])
        }, [
          vue.createCommentVNode(" \u6B64\u6E90\u7801\u6709uniapp bug.\u5982\u679C\u5728nvue\u9875\u9762\u7F16\u8BD1\u81F3h5\u5E73\u53F0\u65F6\uFF0C\u5F00\u542Fenable-flexr\u540E\u9700\u8981\u91CC\u9762\u518D\u5957\u5C42view\u518D\u5199flex\u624D\u80FD\u771F\u6B63\u7684\u5F00flex "),
          vue.createCommentVNode(" \u56E0\u6B64\u4E0B\u9762\u7684\u5185\u5BB9\u4F5C\u4E86\u6761\u4EF6\u7F16\u8BD1\u5206\u4E3Anvue\u548C\u975Envue "),
          vue.createCommentVNode(" https://ask.dcloud.net.cn/question/143230 "),
          vue.unref(_tabPos) == "bottom" && vue.unref(isDulitabs) == false ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            onTouchmove: onMove,
            onTouchend: onEnd,
            onTouchstart: onStart,
            onMousemove: onMove,
            onMouseup: onEnd,
            onMouseleave: onEnd,
            onMousedown: onStart,
            ref: "tabsDom",
            style: vue.normalizeStyle({ width: props.swiper ? `${vue.unref(totalWidth)}px` : `${props.width}rpx`, transform: props.swiper ? `translateX(${directoStyle.value}px)` : `translateX(0px)` }),
            class: vue.normalizeClass([[!isEndMove.value || isNvue.value ? "tmTabsPane" : ""], "flex flex-row flex-nowrap overflow"])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 38)) : vue.createCommentVNode("v-if", true),
          vue.createVNode(tmSheet, {
            transprent: props.transprent,
            color: props.color,
            followTheme: props.followTheme,
            dark: props.dark,
            round: props.round,
            shadow: props.shadow,
            outlined: props.outlined,
            border: props.border,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            text: props.text,
            linear: props.linear,
            linearDeep: props.linearDeep,
            margin: [0, 0],
            padding: [0, 0],
            height: props.itemHeight + vue.unref(modelStyle).border + props.gutter + 4,
            _class: ["flex-center flex-row nonvue", vue.unref(cstomClass)],
            _style: props._style,
            width: props.width
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("scroll-view", {
                style: vue.normalizeStyle([{ width: `${props.width}rpx`, height: `${props.itemHeight + 4}rpx` }]),
                "scroll-with-animation": true,
                "scroll-into-view": _scrollToId.value,
                "scroll-x": true,
                "show-scrollbar": false,
                "enable-flex": "",
                class: "tableHeader flex-row relative"
              }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(["flex flex-row nowrap nonvue fulled", [vue.unref(_align)]]),
                  style: vue.normalizeStyle([{ height: `${props.itemHeight + 4}rpx` }])
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(cacheTabs.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      id: tabsid + item.key,
                      key: index
                    }, [
                      vue.createVNode(tmSheet, {
                        onClick: ($event) => changeKey(item.key),
                        round: props.itemRound,
                        linear: props.itemLinear,
                        linearDeep: props.itemLinearDeep,
                        borderDirection: "bottom",
                        text: item.key == _active.value ? vue.unref(modelStyle).text : false,
                        border: item.key == _active.value ? vue.unref(modelStyle).border : 0,
                        transprent: item.key == _active.value ? vue.unref(modelStyle).transprent : true,
                        color: props.activeColor && item.key == _active.value ? props.activeColor : props.color,
                        width: props.itemWidth,
                        _class: "flex-col flex-col-center-center",
                        margin: [0, 0],
                        padding: [20, 0],
                        height: props.itemHeight
                      }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", {
                            style: vue.normalizeStyle([props.itemWidth > 0 ? { width: props.itemWidth + "rpx" } : {}]),
                            class: "flex flex-row flex-row-center-center"
                          }, [
                            vue.createElementVNode("view", { class: "flex flex-row flex-center" }, [
                              item.icon ? (vue.openBlock(), vue.createBlock(tmIcon, {
                                key: 0,
                                userInteractionEnabled: false,
                                _class: "pr-5",
                                color: item.key == _active.value ? props.activeFontColor : props.unSelectedColor,
                                "font-size": item.key == _active.value ? props.activeFontSize : props.itemFontSize,
                                name: item.icon
                              }, null, 8, ["color", "font-size", "name"])) : vue.createCommentVNode("v-if", true),
                              vue.createVNode(tmText, {
                                userInteractionEnabled: false,
                                "font-size": item.key == _active.value ? props.activeFontSize : props.itemFontSize,
                                _class: item.key == _active.value ? "text-weight-b" : "",
                                color: item.key == _active.value ? props.activeFontColor : props.unSelectedColor,
                                label: item.title
                              }, null, 8, ["font-size", "_class", "color", "label"])
                            ]),
                            item.dot && !item.count ? (vue.openBlock(), vue.createBlock(tmBadge, {
                              key: 0,
                              dot: "",
                              color: item.dotColor
                            }, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", {
                                  style: vue.normalizeStyle({ height: `${props.itemHeight / 2}rpx` })
                                }, null, 4)
                              ]),
                              _: 2
                            }, 1032, ["color"])) : vue.createCommentVNode("v-if", true),
                            item.count && !item.dot ? (vue.openBlock(), vue.createBlock(tmBadge, {
                              key: 1,
                              count: item.count,
                              color: item.dotColor
                            }, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", {
                                  style: vue.normalizeStyle({ height: `${props.itemHeight - 20}rpx` })
                                }, null, 4)
                              ]),
                              _: 2
                            }, 1032, ["count", "color"])) : vue.createCommentVNode("v-if", true)
                          ], 4)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "round", "linear", "linearDeep", "text", "border", "transprent", "color", "width", "height"])
                    ], 8, ["id"]);
                  }), 128))
                ], 6),
                props.showTabsLineAni && props.itemWidth > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "anilineBar absolute l-0",
                  style: vue.normalizeStyle({
                    width: `${vue.unref(contentWidth)}rpx`,
                    height: "1px",
                    top: `${props.itemHeight}rpx`,
                    backgroundColor: props.showTabsLineAni ? vue.unref(store).tmStore.dark ? "#616161" : "#ebebeb" : ""
                  })
                }, null, 4)) : vue.createCommentVNode("v-if", true),
                props.showTabsLineAni && props.itemWidth > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "anilineBar absolute l-0",
                  style: vue.normalizeStyle({ transform: `translateX(${anitLineLeft.value}px)`, top: `${props.itemHeight - 2}rpx` })
                }, [
                  vue.createVNode(tmSheet, {
                    "follow-dark": false,
                    color: props.tabsLineAniColor,
                    width: 40,
                    height: 8,
                    margin: [0, 0],
                    padding: [0, 0]
                  }, null, 8, ["color"])
                ], 4)) : vue.createCommentVNode("v-if", true)
              ], 12, ["scroll-into-view"])
            ]),
            _: 1
          }, 8, ["transprent", "color", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "linear", "linearDeep", "height", "_class", "_style", "width"]),
          vue.unref(_tabPos) == "top" && vue.unref(isDulitabs) == false ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            onTouchmove: onMove,
            onTouchend: onEnd,
            onTouchstart: onStart,
            onTouchcancel: onEnd,
            onMousemove: onMove,
            onMouseup: onEnd,
            onMouseleave: onEnd,
            onMousedown: onStart,
            ref: "tabsDom",
            style: vue.normalizeStyle({ width: props.swiper ? `${vue.unref(totalWidth)}px` : `${props.width}rpx`, transform: props.swiper ? `translateX(${directoStyle.value}px)` : `translateX(0px)` }),
            class: vue.normalizeClass([[!isEndMove.value || isNvue.value ? "tmTabsPane" : ""], "flex flex-row flex-nowrap overflow"])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 38)) : vue.createCommentVNode("v-if", true)
        ], 4);
      };
    }
  });
  var __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-07988156"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabs/tm-tabs.vue"]]);
  const _sfc_main$N = /* @__PURE__ */ vue.defineComponent({
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
      var _a2, _b2;
      const props = __props;
      const store = useTmpiniaStore();
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      vue.onMounted(() => {
      });
      vue.onUnmounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: vue.normalizeClass(["tmSkeletonLine flex-12 my-10", [`round-${props.round}`]]),
          style: vue.normalizeStyle([
            { backgroundColor: vue.unref(isDark) ? "#1e1e1e" : "#ebebeb" },
            { paddingTop: props.height / 2 + "rpx", paddingBottom: props.height / 2 + "rpx" }
          ])
        }, null, 6);
      };
    }
  });
  var tmSkeletonLine = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-1c826222"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-skeleton-line/tm-skeleton-line.vue"]]);
  const _sfc_main$M = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-skeleton",
    props: {
      height: {
        type: Number,
        default: 60
      },
      rows: {
        type: Number,
        default: 3
      },
      model: {
        type: String,
        default: "line"
      }
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "flex flex-col" }, [
          props.model == "line" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "ma-32"
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.rows, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: item,
                class: "flex flex-col"
              }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height
                }, null, 8, ["height"])
              ]);
            }), 128)),
            vue.createElementVNode("view", { class: "flex flex-row" }, [
              vue.createElementVNode("view", { class: "flex-2" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ]),
              vue.createElementVNode("view", { class: "flex-2 mx-24" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ]),
              vue.createElementVNode("view", { class: "flex-2 mr-24" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ]),
              vue.createElementVNode("view", { class: "flex-4" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height * 2
                }, null, 8, ["height"])
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          props.model == "rect" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "ma-32"
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.rows, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: item,
                class: "flex flex-row"
              }, [
                vue.createElementVNode("view", { class: "flex-2" }, [
                  vue.createVNode(tmSkeletonLine, {
                    height: props.height * 2
                  }, null, 8, ["height"])
                ]),
                vue.createElementVNode("view", { class: "flex-4 mx-24" }, [
                  vue.createVNode(tmSkeletonLine, {
                    height: props.height * 2
                  }, null, 8, ["height"])
                ]),
                vue.createElementVNode("view", { class: "flex-2 mr-24" }, [
                  vue.createVNode(tmSkeletonLine, {
                    height: props.height * 2
                  }, null, 8, ["height"])
                ]),
                vue.createElementVNode("view", { class: "flex-2" }, [
                  vue.createVNode(tmSkeletonLine, {
                    height: props.height * 2
                  }, null, 8, ["height"])
                ])
              ]);
            }), 128))
          ])) : vue.createCommentVNode("v-if", true),
          props.model == "card" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "ma-32"
          }, [
            vue.createElementVNode("view", { class: "flex flex-row" }, [
              vue.createElementVNode("view", { class: "flex-1" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height
                }, null, 8, ["height"])
              ]),
              vue.createElementVNode("view", { class: "flex-10 mx-24" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height
                }, null, 8, ["height"])
              ]),
              vue.createElementVNode("view", { class: "flex-1" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height
                }, null, 8, ["height"])
              ])
            ]),
            vue.createElementVNode("view", { class: "" }, [
              vue.createVNode(tmSkeletonLine, {
                height: props.height * 4
              }, null, 8, ["height"])
            ]),
            vue.createElementVNode("view", { class: "flex flex-row" }, [
              vue.createElementVNode("view", { class: "flex-2" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height
                }, null, 8, ["height"])
              ]),
              vue.createElementVNode("view", { class: "flex-4 mx-24" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height
                }, null, 8, ["height"])
              ]),
              vue.createElementVNode("view", { class: "flex-2 mr-24" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height
                }, null, 8, ["height"])
              ]),
              vue.createElementVNode("view", { class: "flex-2" }, [
                vue.createVNode(tmSkeletonLine, {
                  height: props.height
                }, null, 8, ["height"])
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          props.model == "chat" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 3,
            class: "flex flex-row ma-32"
          }, [
            vue.createElementVNode("view", {
              class: "flex-2",
              style: vue.normalizeStyle([{ height: props.height * 2 + "rpx" }])
            }, [
              vue.createVNode(tmSkeletonLine, {
                height: props.height * 2
              }, null, 8, ["height"])
            ], 4),
            vue.createElementVNode("view", { class: "flex-8 mx-24" }, [
              vue.createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"]),
              vue.createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"]),
              vue.createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"]),
              vue.createVNode(tmSkeletonLine, {
                height: props.height
              }, null, 8, ["height"])
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  var __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-skeleton/tm-skeleton.vue"]]);
  const _sfc_main$L = /* @__PURE__ */ vue.defineComponent({
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
      function hanlder(e) {
        emits("click", e);
      }
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const computedHeight = vue.computed(() => {
        if (!props.height || !Number(props.height)) {
          return 0;
        }
        if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
          return String(props.height);
        }
        return String(props.height) + "rpx";
      });
      const computedWidth = vue.computed(() => {
        if (!props.width) {
          return 0;
        }
        if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
          return props.width;
        }
        return props.width + "rpx";
      });
      const animationName = vue.computed(() => props.name || "fade");
      const durationtos = vue.computed(() => props.duration);
      const computedReverse = vue.computed(() => props.reverse);
      const reverseAniPrefxname = vue.computed(() => computedReverse.value ? "-reverse" : "");
      const animationStatus = vue.ref(0);
      const tmid = vue.ref(Number(uni.$tm.u.getUid(3)));
      const isLoadEl = vue.ref(false);
      const animationData = vue.ref(null);
      vue.watch(() => props.initByWechat, () => {
        reset();
      });
      function init() {
        vue.nextTick(() => {
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
        noNvueAmations();
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
      vue.onMounted(() => init());
      vue.onUnmounted(() => {
        clearTimeout(tmid.value);
        animationStatus.value = 0;
      });
      function noNvueAmations() {
        animationData.value = null;
        vue.nextTick(function() {
          var animation = uni.createAnimation({
            duration: durationtos.value,
            timingFunction: "ease",
            delay: 30
          });
          clearTimeout(tmid.value);
          if (animationName.value == "fade") {
            let opacity = computedReverse.value ? 1 : 0;
            animation.opacity(opacity).step({
              duration: 0
            });
          } else if (animationName.value == "up") {
            let opacity = computedReverse.value ? "-101%" : "0%";
            animation.translateY(opacity).step({
              duration: 0
            });
          } else if (animationName.value == "down") {
            let opacity = computedReverse.value ? "101%" : "0%";
            animation.translateY(opacity).step({
              duration: 0
            });
          } else if (animationName.value == "left") {
            let opacity = computedReverse.value ? "-101%" : "0%";
            animation.translateX(opacity).step({
              duration: 0
            });
          } else if (animationName.value == "right") {
            let opacity = computedReverse.value ? "101%" : "0";
            animation.translateX(opacity).step({
              duration: 0
            });
          } else if (animationName.value == "zoom") {
            let scale = computedReverse.value ? [1, 1] : [0.7, 0.7];
            let opacity = computedReverse.value ? 1 : 0;
            animation.scale(...scale).opacity(opacity).step({
              duration: 0
            });
          }
          animationData.value = animation.export();
          let detalTime = 40;
          tmid.value = setTimeout(function() {
            if (animationName.value == "fade") {
              let opacity = computedReverse.value ? 0 : 1;
              animation.opacity(opacity).step();
            } else if (animationName.value == "up") {
              let opacity = computedReverse.value ? "0%" : "-101%";
              animation.translateY(opacity).step();
            } else if (animationName.value == "down") {
              let opacity = computedReverse.value ? "0%" : "101%";
              animation.translateY(opacity).step();
            } else if (animationName.value == "left") {
              let opacity = computedReverse.value ? "0%" : "-101%";
              animation.translateX(opacity).step();
            } else if (animationName.value == "right") {
              let opacity = computedReverse.value ? "0" : "101%";
              animation.translateX(opacity).step();
            } else if (animationName.value == "zoom") {
              let scale = computedReverse.value ? [0.7, 0.7] : [1, 1];
              let opacity = computedReverse.value ? 0 : 1;
              animation.scale(...scale).opacity(opacity).step();
            }
            emits("start");
            animationData.value = animation.export();
            animationStatus.value = 1;
            clearTimeout(tmid.value);
            tmid.value = setTimeout(function() {
              emits("end");
              animationStatus.value = 2;
            }, durationtos.value);
          }, detalTime);
        });
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          ref: "bodywk",
          onClick: hanlder,
          class: vue.normalizeClass([vue.unref(customClass), "overflow"]),
          style: vue.normalizeStyle([
            vue.unref(computedHeight) ? { height: vue.unref(computedHeight) } : "",
            vue.unref(computedWidth) ? { width: vue.unref(computedWidth) } : "",
            vue.unref(customCSSStyle)
          ])
        }, [
          isLoadEl.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            ref: "nvueElAni",
            animation: animationData.value,
            class: vue.normalizeClass([
              "flex-col flex trani",
              vue.unref(animationName) + vue.unref(reverseAniPrefxname),
              vue.unref(customClass)
            ])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 10, ["animation"])) : vue.createCommentVNode("v-if", true)
        ], 6);
      };
    }
  });
  var tmTranslate = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-155cc8af"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-translate/tm-translate.vue"]]);
  const _sfc_main$K = /* @__PURE__ */ vue.defineComponent({
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
      var _a2, _b2, _c2;
      const props = __props;
      const aniplay = vue.ref(null);
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      if (!props.height && !props.width) {
        formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:156", "\u9519\u8BEF\uFF1A\u56FE\u7247\u5BBD\u5EA6\u548C\u9AD8\u5EA6\u5FC5\u987B\u8BBE\u7F6E\u4E00\u4E2A");
      }
      const img_width = vue.computed(() => {
        return props.width;
      });
      const img_height = vue.computed(() => {
        return props.height - props.padding[1];
      });
      const img_src = vue.computed(() => props.src);
      const loading = vue.ref(true);
      const error = vue.ref(false);
      const isRmove = vue.ref(false);
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
          break;
        } else {
          parent = (_c2 = parent == null ? void 0 : parent.$parent) != null ? _c2 : void 0;
        }
      }
      const ImagGrupList = vue.inject("ImagGrupList", vue.computed(() => []));
      if (parent == null ? void 0 : parent.pushKey) {
        parent.pushKey({
          width: img_width.value,
          height: img_width.value,
          src: props.src
        });
      }
      vue.watch(img_src, () => {
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
      async function del2() {
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
      }
      function aniEnd() {
        isRmove.value = true;
        emits("close", props.src);
      }
      return (_ctx, _cache) => {
        return !isRmove.value ? (vue.openBlock(), vue.createBlock(tmTranslate, {
          key: 0,
          width: vue.unref(img_width) + props.padding[0] * 2 + props.unit,
          onEnd: aniEnd,
          ref_key: "aniplay",
          ref: aniplay,
          autoPlay: false,
          name: "zoom",
          reverse: ""
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(tmSheet, {
              color: props.color,
              transprent: props.transprent,
              margin: props.margin,
              round: props.round,
              border: props.border,
              padding: [props.padding[0], 0],
              class: vue.normalizeClass(["round-" + props.round]),
              width: vue.unref(img_width) - props.padding[0] * 2,
              unit: props.unit
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass([`pb-${props.padding[1]}`])
                }, [
                  loading.value ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: vue.unref(img_src),
                    style: { "width": "10px", "height": "10px", "opacity": "0", "transform": "translateX(1200px)" },
                    onLoad: imageLoad,
                    onError: imageError,
                    mode: "scaleToFill"
                  }, null, 40, ["src"])) : vue.createCommentVNode("v-if", true),
                  !loading.value && !error.value ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 1,
                    onClick: imageClick,
                    class: vue.normalizeClass(["round-" + props.round]),
                    src: vue.unref(img_src),
                    style: vue.normalizeStyle([{ width: vue.unref(img_width) + props.unit, height: vue.unref(img_height) + props.unit }]),
                    mode: props.model
                  }, null, 14, ["src", "mode"])) : vue.createCommentVNode("v-if", true),
                  loading.value && !error.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    style: vue.normalizeStyle([{ width: vue.unref(img_width) + props.unit, height: vue.unref(img_height) + props.unit }]),
                    class: "flex flex-center opacity-3"
                  }, [
                    props.showLoad ? (vue.openBlock(), vue.createBlock(tmIcon, {
                      key: 0,
                      "font-size": 26,
                      spin: "",
                      name: "tmicon-loading"
                    })) : vue.createCommentVNode("v-if", true)
                  ], 4)) : vue.createCommentVNode("v-if", true),
                  !loading.value && error.value ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    style: vue.normalizeStyle([{ width: vue.unref(img_width) + props.unit, height: vue.unref(img_height) + props.unit }]),
                    class: "flex flex-col flex-center opacity-5"
                  }, [
                    vue.createVNode(tmIcon, { name: "tmicon-exclamation-circle" }),
                    vue.createVNode(tmText, {
                      _class: "pt-10",
                      "font-size": 26,
                      label: props.errorLabel
                    }, null, 8, ["label"])
                  ], 4)) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" extra "),
                  props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 4,
                    onClick: vue.withModifiers(imageClick, ["stop"]),
                    class: vue.normalizeClass([
                      props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5" : "",
                      "flex flex-col flex-col-bottom-start"
                    ]),
                    style: vue.normalizeStyle([
                      props.extra && props.extraPosition == "in" ? { height: vue.unref(img_height) + props.unit, width: vue.unref(img_width) + props.unit } : "",
                      props.extra && props.extraPosition == "out" ? { width: vue.unref(img_width) + props.unit } : ""
                    ])
                  }, [
                    vue.renderSlot(_ctx.$slots, "extra")
                  ], 14, ["onClick"])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" delete \u5C55\u793A\u5220\u9664\u6309\u94AE\u3002 "),
                  props.delete ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 5,
                    class: "absolute r-10 t-10 flex flex-col flex-col-center-end zIndex-10",
                    style: vue.normalizeStyle([props.delete ? { width: vue.unref(img_width) + props.unit } : ""])
                  }, [
                    vue.createVNode(tmIcon, {
                      onClick: del2,
                      color: "red",
                      name: "tmicon-times-circle-fill"
                    })
                  ], 4)) : vue.createCommentVNode("v-if", true)
                ], 2)
              ]),
              _: 3
            }, 8, ["color", "transprent", "margin", "round", "border", "padding", "class", "width", "unit"])
          ]),
          _: 3
        }, 8, ["width"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-image/tm-image.vue"]]);
  const _sfc_main$J = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-tag",
    props: __spreadProps(__spreadValues({}, custom_props), {
      followTheme: {
        type: [Boolean],
        default: true
      },
      transprent: {
        type: [Boolean],
        default: false
      },
      border: {
        type: [Number],
        default: 0
      },
      round: {
        type: [Number],
        default: 2
      },
      shadow: {
        type: [Number],
        default: 1
      },
      margin: {
        type: Array,
        default: () => [10, 10]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      checkable: {
        type: [Boolean, String],
        default: false
      },
      checked: {
        type: [Boolean, String],
        default: false
      },
      load: {
        type: [Boolean, String],
        default: false
      },
      size: {
        type: [String],
        default: "m"
      },
      fontSize: {
        type: [Number],
        default: 0
      },
      closable: {
        type: [Boolean],
        default: false
      },
      icon: {
        type: [String],
        default: ""
      },
      label: {
        type: [String],
        default: ""
      },
      fontColor: {
        type: String,
        default: ""
      }
    }),
    emits: ["click", "close", "change", "update:checked"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const anitag = vue.ref(null);
      const customCSSStyle = vue.computed(() => computedStyle(props));
      vue.computed(() => computedClass(props));
      const show = vue.ref(true);
      const _checked_ = vue.ref(false);
      const _fontColor = vue.computed(() => props.fontColor);
      const loading = vue.computed(() => props.load);
      const checked_com = vue.computed({
        get: function() {
          return _checked_.value;
        },
        set: function(val) {
          _checked_.value = val;
          emits("update:checked", _checked_.value);
        }
      });
      checked_com.value = props.checked;
      vue.watch(() => props.checked, (newval) => {
        checked_com.value = newval;
        emits("change", checked_com.value);
      });
      const wh = vue.computed(() => {
        if (props.size == "xs") {
          return {
            px: props.padding[0] || 10,
            py: props.padding[1] || 4,
            fontSize: props.fontSize || 22
          };
        } else if (props.size == "s") {
          return {
            px: props.padding[0] || 14,
            py: props.padding[1] || 4,
            fontSize: props.fontSize || 24
          };
        } else if (props.size == "m") {
          return {
            px: props.padding[0] || 16,
            py: props.padding[1] || 8,
            fontSize: props.fontSize || 26
          };
        } else if (props.size == "n") {
          return {
            px: props.padding[0] || 18,
            py: props.padding[1] || 10,
            fontSize: props.fontSize || 28
          };
        } else if (props.size == "g") {
          return {
            px: props.padding[0] || 20,
            py: props.padding[1] || 12,
            fontSize: props.fontSize || 32
          };
        } else if (props.size == "lg") {
          return {
            px: props.padding[0] || 24,
            py: props.padding[1] || 16,
            fontSize: props.fontSize || 36
          };
        }
        return {
          px: props.padding[0],
          py: props.padding[1],
          fontSize: props.fontSize
        };
      });
      function onclick(e) {
        e.stopPropagation();
        e.preventDefault();
        emits("click", e);
        if (loading.value)
          return;
        checked_com.value = !checked_com.value;
      }
      function aniEnd() {
        show.value = false;
      }
      function closeTag(e) {
        if (loading.value)
          return;
        e.stopPropagation();
        emits("close");
        if (anitag.value) {
          anitag.value.play();
        } else {
          show.value = false;
        }
      }
      return (_ctx, _cache) => {
        return show.value ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: vue.normalizeClass(["flex flex-row", [vue.unref(loading) ? "opacity-5" : ""]])
        }, [
          vue.createVNode(tmTranslate, {
            onEnd: aniEnd,
            ref_key: "anitag",
            ref: anitag,
            name: "zoom",
            reverse: "",
            autoPlay: false
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(tmSheet, {
                "hover-class": "opacity-6",
                onClick: onclick,
                transprent: props.transprent,
                color: props.color,
                _class: "flex-row flex flex-row-center-center",
                _style: vue.unref(customCSSStyle),
                followTheme: props.followTheme,
                followDark: props.followDark,
                dark: props.dark,
                round: props.round,
                shadow: props.checkable && vue.unref(checked_com) || !props.checkable ? props.shadow : 0,
                outlined: props.checkable && !vue.unref(checked_com) ? true : props.outlined,
                border: props.border,
                borderStyle: props.borderStyle,
                borderDirection: props.borderDirection,
                text: props.checkable && !vue.unref(checked_com) ? true : props.text,
                linear: props.linear,
                linearDeep: props.linearDeep,
                margin: props.margin,
                padding: [vue.unref(wh).px, vue.unref(wh).py]
              }, {
                default: vue.withCtx(() => [
                  props.icon ? (vue.openBlock(), vue.createBlock(tmIcon, {
                    key: 0,
                    color: vue.unref(_fontColor),
                    name: props.icon,
                    followDark: props.followDark,
                    fontSize: vue.unref(wh).fontSize,
                    dark: props.dark,
                    userInteractionEnabled: false
                  }, null, 8, ["color", "name", "followDark", "fontSize", "dark"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", { class: "flex-1 flex flex-center" }, [
                    vue.renderSlot(_ctx.$slots, "default", {}, () => [
                      vue.createVNode(tmText, {
                        color: vue.unref(_fontColor),
                        _class: props.icon ? "pl-10" : "",
                        fontSize: vue.unref(wh).fontSize,
                        followDark: props.followDark,
                        userInteractionEnabled: false,
                        dark: props.dark,
                        label: props.label
                      }, null, 8, ["color", "_class", "fontSize", "followDark", "dark", "label"])
                    ])
                  ]),
                  vue.createElementVNode("view", {
                    onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    props.closable && !vue.unref(loading) ? (vue.openBlock(), vue.createBlock(tmIcon, {
                      key: 0,
                      color: vue.unref(_fontColor),
                      onClick: closeTag,
                      followDark: props.followDark,
                      _class: "pl-10",
                      fontSize: vue.unref(wh).fontSize * 0.8,
                      name: "tmicon-times",
                      dark: props.dark
                    }, null, 8, ["color", "followDark", "fontSize", "dark"])) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.unref(loading) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    userInteractionEnabled: false,
                    class: "pl-10 flex flex-center flex-row",
                    style: { "line-height": "0" }
                  }, [
                    vue.createVNode(tmIcon, {
                      color: vue.unref(_fontColor),
                      followDark: props.followDark,
                      fontSize: vue.unref(wh).fontSize * 0.8,
                      name: "tmicon-loading",
                      spin: "",
                      dark: _ctx.dark
                    }, null, 8, ["color", "followDark", "fontSize", "dark"])
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                _: 3
              }, 8, ["transprent", "color", "_style", "followTheme", "followDark", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "linear", "linearDeep", "margin", "padding"])
            ]),
            _: 3
          }, 512)
        ], 2)) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tag/tm-tag.vue"]]);
  const _sfc_main$I = {
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {};
    },
    computed: {},
    methods: {
      nav(id) {
        formatAppLog("log", "at components/good-list/good-list.vue:65", id);
        uni.navigateTo({
          url: "/pages/news/detail/detail?detailData=" + id
        });
      },
      conv(str) {
        return str.substring(0, 10);
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tm_image = resolveEasycom(vue.resolveDynamicComponent("tm-image"), __easycom_2);
    const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), tmText);
    const _component_tm_tag = resolveEasycom(vue.resolveDynamicComponent("tm-tag"), __easycom_4);
    const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), tmSheet);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "erke-list",
      style: { "width": "95%", "margin": "auto" }
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.list, (good) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          id: "good" + good.id,
          class: "good-li",
          key: good.id
        }, [
          vue.createElementVNode("view", {
            onClick: ($event) => $options.nav(good.id)
          }, [
            vue.createVNode(_component_tm_sheet, { margin: [5, 5] }, {
              default: vue.withCtx(() => [
                vue.createCommentVNode(" <tm-divider></tm-divider> "),
                vue.createElementVNode("view", { style: { "display": "flex", "flex-flow": "row", "justify-content": "space-between" } }, [
                  vue.createElementVNode("view", { style: { "width": "49%" } }, [
                    vue.createVNode(_component_tm_image, {
                      round: 2,
                      width: 310,
                      height: 200,
                      src: good.img || "https://cdn2.jaycao.com/cdtu/cdtunews.jpg"
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", {
                    style: { "width": "49%", "display": "flex", "flex-flow": "column", "justify-content": "space-between" },
                    class: ""
                  }, [
                    vue.createElementVNode("view", null, [
                      vue.createVNode(_component_tm_text, {
                        "font-size": 30,
                        _class: "font-weight-b text-overflow-2 text-weight-b",
                        label: ""
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(good.title), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    vue.createElementVNode("view", null, [
                      vue.createVNode(_component_tm_tag, {
                        text: "",
                        shadow: 0,
                        icon: "tmicon-clock-fill",
                        color: "grey",
                        size: "m",
                        label: $options.conv(good.date),
                        style: {}
                      }, null, 8, ["label"])
                    ])
                  ])
                ])
              ]),
              _: 2
            }, 1024)
          ], 8, ["onClick"]),
          vue.createCommentVNode(' <tm-result :showBtn="false" v-if="list.length==0"></tm-result> ')
        ], 8, ["id"]);
      }), 128))
    ]);
  }
  var __easycom_7$1 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$v], ["__scopeId", "data-v-7aad1ba6"], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/good-list/good-list.vue"]]);
  const _sfc_main$H = /* @__PURE__ */ vue.defineComponent({
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
      const _offset = vue.computed(() => {
        if (typeof props.offset === "number")
          return props.offset + "rpx";
        return props.offset;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", {
            class: "tm-sticky flex flex-col",
            style: vue.normalizeStyle([
              props.model == "top" ? { top: `${vue.unref(_offset)}` } : "",
              props.model == "left" ? { left: `${vue.unref(_offset)}` } : "",
              { "z-index": props.zIndex }
            ])
          }, [
            vue.createElementVNode("view", { class: "flex flex-col" }, [
              vue.renderSlot(_ctx.$slots, "sticky", {}, void 0, true)
            ])
          ], 4),
          vue.createElementVNode("view", null, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ]);
      };
    }
  });
  var __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-4329f4ab"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-sticky/tm-sticky.vue"]]);
  const GlobalOption = {
    down: {
      offset: 80,
      native: false
    },
    up: {
      offset: 150,
      toTop: {
        src: "https://www.mescroll.com/img/mescroll-totop.png",
        offset: 1e3,
        right: 20,
        bottom: 120,
        width: 72
      },
      empty: {
        use: true,
        icon: "https://www.mescroll.com/img/mescroll-empty.png"
      }
    },
    i18n: {
      zh: {
        down: {
          textInOffset: "\u4E0B\u62C9\u5237\u65B0",
          textOutOffset: "\u91CA\u653E\u66F4\u65B0",
          textLoading: "\u52A0\u8F7D\u4E2D ...",
          textSuccess: "\u52A0\u8F7D\u6210\u529F",
          textErr: "\u52A0\u8F7D\u5931\u8D25"
        },
        up: {
          textLoading: "\u52A0\u8F7D\u4E2D ...",
          textNoMore: "-- END --",
          empty: {
            tip: "~ \u7A7A\u7A7A\u5982\u4E5F ~"
          }
        }
      },
      en: {
        down: {
          textInOffset: "drop down refresh",
          textOutOffset: "release updates",
          textLoading: "loading ...",
          textSuccess: "loaded successfully",
          textErr: "loading failed"
        },
        up: {
          textLoading: "loading ...",
          textNoMore: "-- END --",
          empty: {
            tip: "~ absolutely empty ~"
          }
        }
      }
    }
  };
  const mescrollI18n = {
    def: "zh",
    getType() {
      return uni.getStorageSync("mescroll-i18n") || this.def;
    },
    setType(type) {
      uni.setStorageSync("mescroll-i18n", type);
    }
  };
  const _sfc_main$G = {
    props: {
      option: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      icon() {
        if (this.option.icon != null) {
          return this.option.icon;
        } else {
          let i18nType = mescrollI18n.getType();
          if (this.option.i18n) {
            return this.option.i18n[i18nType].icon;
          } else {
            return GlobalOption.i18n[i18nType].up.empty.icon || GlobalOption.up.empty.icon;
          }
        }
      },
      tip() {
        if (this.option.tip != null) {
          return this.option.tip;
        } else {
          let i18nType = mescrollI18n.getType();
          if (this.option.i18n) {
            return this.option.i18n[i18nType].tip;
          } else {
            return GlobalOption.i18n[i18nType].up.empty.tip || GlobalOption.up.empty.tip;
          }
        }
      },
      btnText() {
        if (this.option.i18n) {
          let i18nType = mescrollI18n.getType();
          return this.option.i18n[i18nType].btnText;
        } else {
          return this.option.btnText;
        }
      }
    },
    methods: {
      emptyClick() {
        this.$emit("emptyclick");
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["mescroll-empty", { "empty-fixed": $props.option.fixed }]),
      style: vue.normalizeStyle({ "z-index": $props.option.zIndex, top: $props.option.top })
    }, [
      vue.createElementVNode("view", null, [
        $options.icon ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "empty-icon",
          src: $options.icon,
          mode: "widthFix"
        }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
      ]),
      $options.tip ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "empty-tip"
      }, vue.toDisplayString($options.tip), 1)) : vue.createCommentVNode("v-if", true),
      $options.btnText ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "empty-btn",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.emptyClick && $options.emptyClick(...args))
      }, vue.toDisplayString($options.btnText), 1)) : vue.createCommentVNode("v-if", true)
    ], 6);
  }
  var __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$u], ["__scopeId", "data-v-2492839d"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/mescroll-uni/components/mescroll-empty/mescroll-empty.vue"]]);
  function MeScroll(options, isScrollBody) {
    let me2 = this;
    me2.version = "1.3.7";
    me2.options = options || {};
    me2.isScrollBody = isScrollBody || false;
    me2.isDownScrolling = false;
    me2.isUpScrolling = false;
    let hasDownCallback = me2.options.down && me2.options.down.callback;
    me2.initDownScroll();
    me2.initUpScroll();
    setTimeout(function() {
      if ((me2.optDown.use || me2.optDown.native) && me2.optDown.auto && hasDownCallback) {
        if (me2.optDown.autoShowLoading) {
          me2.triggerDownScroll();
        } else {
          me2.optDown.callback && me2.optDown.callback(me2);
        }
      }
      if (!me2.isUpAutoLoad) {
        setTimeout(function() {
          me2.optUp.use && me2.optUp.auto && !me2.isUpAutoLoad && me2.triggerUpScroll();
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
    let c2 = color.toLowerCase();
    return c2 != "#fff" && c2 != "#ffffff" && c2 != "transparent" && c2 != "white";
  };
  MeScroll.prototype.initDownScroll = function() {
    let me2 = this;
    me2.optDown = me2.options.down || {};
    if (!me2.optDown.textColor && me2.hasColor(me2.optDown.bgColor))
      me2.optDown.textColor = "#fff";
    me2.extendDownScroll(me2.optDown);
    if (me2.isScrollBody && me2.optDown.native) {
      me2.optDown.use = false;
    } else {
      me2.optDown.native = false;
    }
    me2.downHight = 0;
    if (me2.optDown.use && me2.optDown.inited) {
      setTimeout(function() {
        me2.optDown.inited(me2);
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
    let me2 = this;
    let scrollTop = me2.getScrollTop();
    let curPoint = me2.getPoint(e);
    let moveY = curPoint.y - me2.startPoint.y;
    if (moveY > 0 && (me2.isScrollBody && scrollTop <= 0 || !me2.isScrollBody && (scrollTop <= 0 || scrollTop <= me2.optDown.startTop && scrollTop === me2.startTop))) {
      if (!me2.inTouchend && !me2.isDownScrolling && !me2.optDown.isLock && (!me2.isUpScrolling || me2.isUpScrolling && me2.optUp.isBoth)) {
        if (!me2.startAngle)
          me2.startAngle = me2.getAngle(me2.lastPoint, curPoint);
        if (me2.startAngle < me2.optDown.minAngle)
          return;
        if (me2.maxTouchmoveY > 0 && curPoint.y >= me2.maxTouchmoveY) {
          me2.inTouchend = true;
          me2.touchendEvent();
          return;
        }
        me2.preventDefault(e);
        let diff = curPoint.y - me2.lastPoint.y;
        if (me2.downHight < me2.optDown.offset) {
          if (me2.movetype !== 1) {
            me2.movetype = 1;
            me2.isDownEndSuccess = null;
            me2.optDown.inOffset && me2.optDown.inOffset(me2);
            me2.isMoveDown = true;
          }
          me2.downHight += diff * me2.optDown.inOffsetRate;
        } else {
          if (me2.movetype !== 2) {
            me2.movetype = 2;
            me2.optDown.outOffset && me2.optDown.outOffset(me2);
            me2.isMoveDown = true;
          }
          if (diff > 0) {
            me2.downHight += diff * me2.optDown.outOffsetRate;
          } else {
            me2.downHight += diff;
          }
        }
        me2.downHight = Math.round(me2.downHight);
        let rate = me2.downHight / me2.optDown.offset;
        me2.optDown.onMoving && me2.optDown.onMoving(me2, rate, me2.downHight);
      }
    }
    me2.lastPoint = curPoint;
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
    let x2 = Math.abs(p1.x - p2.x);
    let y = Math.abs(p1.y - p2.y);
    let z2 = Math.sqrt(x2 * x2 + y * y);
    let angle = 0;
    if (z2 !== 0) {
      angle = Math.asin(y / z2) / Math.PI * 180;
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
      uni.startPullDownRefresh();
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
      uni.stopPullDownRefresh();
      return;
    }
    let me2 = this;
    let endScroll = function() {
      me2.downHight = 0;
      me2.isDownScrolling = false;
      me2.endDownScrollCall(me2);
      if (!me2.isScrollBody) {
        me2.setScrollHeight(0);
        me2.scrollTo(0, 0);
      }
    };
    let delay = 0;
    if (me2.optDown.beforeEndDownScroll) {
      delay = me2.optDown.beforeEndDownScroll(me2);
      if (me2.isDownEndSuccess == null)
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
    let me2 = this;
    me2.optUp = me2.options.up || { use: false };
    if (!me2.optUp.textColor && me2.hasColor(me2.optUp.bgColor))
      me2.optUp.textColor = "#fff";
    me2.extendUpScroll(me2.optUp);
    if (me2.optUp.use === false)
      return;
    me2.optUp.hasNext = true;
    me2.startNum = me2.optUp.page.num + 1;
    if (me2.optUp.inited) {
      setTimeout(function() {
        me2.optUp.inited(me2);
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
    let me2 = this;
    if (me2.isDownScrolling) {
      me2.isDownEndSuccess = true;
      me2.endDownScroll();
    }
    if (me2.optUp.use) {
      let isShowNoMore;
      if (dataSize != null) {
        let pageNum = me2.optUp.page.num;
        let pageSize = me2.optUp.page.size;
        if (pageNum === 1) {
          if (systime)
            me2.optUp.page.time = systime;
        }
        if (dataSize < pageSize || hasNext === false) {
          me2.optUp.hasNext = false;
          if (dataSize === 0 && pageNum === 1) {
            isShowNoMore = false;
            me2.showEmpty();
          } else {
            let allDataSize = (pageNum - 1) * pageSize + dataSize;
            if (allDataSize < me2.optUp.noMoreSize) {
              isShowNoMore = false;
            } else {
              isShowNoMore = true;
            }
            me2.removeEmpty();
          }
        } else {
          isShowNoMore = false;
          me2.optUp.hasNext = true;
          me2.removeEmpty();
        }
      }
      me2.endUpScroll(isShowNoMore);
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
    let i2 = 0;
    let timer = setInterval(function() {
      if (i2 < count - 1) {
        star += step;
        callback && callback(star, timer);
        i2++;
      } else {
        callback && callback(end, timer);
        clearInterval(timer);
      }
    }, rate);
  };
  MeScroll.prototype.getClientHeight = function(isReal) {
    let h2 = this.clientHeight || 0;
    if (h2 === 0 && isReal !== true) {
      h2 = this.getBodyHeight();
    }
    return h2;
  };
  MeScroll.prototype.setClientHeight = function(h2) {
    this.clientHeight = h2;
  };
  MeScroll.prototype.getScrollHeight = function() {
    return this.scrollHeight || 0;
  };
  MeScroll.prototype.setScrollHeight = function(h2) {
    this.scrollHeight = h2;
  };
  MeScroll.prototype.getBodyHeight = function() {
    return this.bodyHeight || 0;
  };
  MeScroll.prototype.setBodyHeight = function(h2) {
    this.bodyHeight = h2;
  };
  MeScroll.prototype.preventDefault = function(e) {
    if (e && e.cancelable && !e.defaultPrevented)
      e.preventDefault();
  };
  const _sfc_main$F = {
    props: {
      option: Object,
      value: false
    },
    computed: {
      mOption() {
        return this.option || {};
      },
      left() {
        return this.mOption.left ? this.addUnit(this.mOption.left) : "auto";
      },
      right() {
        return this.mOption.left ? "auto" : this.addUnit(this.mOption.right);
      }
    },
    methods: {
      addUnit(num) {
        if (!num)
          return 0;
        if (typeof num === "number")
          return num + "rpx";
        return num;
      },
      toTopClick() {
        this.$emit("input", false);
        this.$emit("click");
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    return $options.mOption.src ? (vue.openBlock(), vue.createElementBlock("image", {
      key: 0,
      class: vue.normalizeClass(["mescroll-totop", [$props.value ? "mescroll-totop-in" : "mescroll-totop-out", { "mescroll-totop-safearea": $options.mOption.safearea }]]),
      style: vue.normalizeStyle({ "z-index": $options.mOption.zIndex, "left": $options.left, "right": $options.right, "bottom": $options.addUnit($options.mOption.bottom), "width": $options.addUnit($options.mOption.width), "border-radius": $options.addUnit($options.mOption.radius) }),
      src: $options.mOption.src,
      mode: "widthFix",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.toTopClick && $options.toTopClick(...args))
    }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true);
  }
  var MescrollTop = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$t], ["__scopeId", "data-v-244d3c3e"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/mescroll-uni/components/mescroll-uni/components/mescroll-top.vue"]]);
  const WxsMixin = {
    data() {
      return {
        wxsProp: {
          optDown: {},
          scrollTop: 0,
          bodyHeight: 0,
          isDownScrolling: false,
          isUpScrolling: false,
          isScrollBody: true,
          isUpBoth: true,
          t: 0
        },
        callProp: {
          callType: "",
          t: 0
        }
      };
    },
    methods: {
      wxsCall(msg) {
        if (msg.type === "setWxsProp") {
          this.wxsProp = {
            optDown: this.mescroll.optDown,
            scrollTop: this.mescroll.getScrollTop(),
            bodyHeight: this.mescroll.getBodyHeight(),
            isDownScrolling: this.mescroll.isDownScrolling,
            isUpScrolling: this.mescroll.isUpScrolling,
            isUpBoth: this.mescroll.optUp.isBoth,
            isScrollBody: this.mescroll.isScrollBody,
            t: Date.now()
          };
        } else if (msg.type === "setLoadType") {
          this.downLoadType = msg.downLoadType;
          this.$set(this.mescroll, "downLoadType", this.downLoadType);
          this.$set(this.mescroll, "isDownEndSuccess", null);
        } else if (msg.type === "triggerDownScroll") {
          this.mescroll.triggerDownScroll();
        } else if (msg.type === "endDownScroll") {
          this.mescroll.endDownScroll();
        } else if (msg.type === "triggerUpScroll") {
          this.mescroll.triggerUpScroll(true);
        }
      }
    },
    mounted() {
      this.mescroll.optDown.afterLoading = () => {
        this.callProp = { callType: "showLoading", t: Date.now() };
      };
      this.mescroll.optDown.afterEndDownScroll = () => {
        this.callProp = { callType: "endDownScroll", t: Date.now() };
        let delay = 300 + (this.mescroll.optDown.beforeEndDelay || 0);
        setTimeout(() => {
          if (this.downLoadType === 4 || this.downLoadType === 0) {
            this.callProp = { callType: "clearTransform", t: Date.now() };
          }
          this.$set(this.mescroll, "downLoadType", this.downLoadType);
        }, delay);
      };
      this.wxsCall({ type: "setWxsProp" });
    }
  };
  var block0 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("wxsBiz");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["wxsBiz"] = "3169f6de";
  };
  var block1 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("renderBiz");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["renderBiz"] = "5a9dc23f";
  };
  const _sfc_main$E = {
    name: "mescroll-uni",
    mixins: [WxsMixin],
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
        return num ? uni.upx2px(Number(num)) : 0;
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
        let query = uni.createSelectorQuery();
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
      let i18nType = mescrollI18n.getType();
      let i18nOption = { type: i18nType };
      MeScroll.extend(i18nOption, vm.i18n);
      MeScroll.extend(i18nOption, GlobalOption.i18n);
      MeScroll.extend(diyOption, i18nOption[i18nType]);
      MeScroll.extend(diyOption, { down: GlobalOption.down, up: GlobalOption.up });
      let myOption = JSON.parse(JSON.stringify({ "down": vm.down, "up": vm.up }));
      MeScroll.extend(myOption, diyOption);
      vm.mescroll = new MeScroll(myOption);
      vm.mescroll.viewId = vm.viewId;
      vm.mescroll.i18n = i18nOption;
      vm.$emit("init", vm.mescroll);
      const sys = uni.getSystemInfoSync();
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
              if (y.indexOf(">>>") != -1) {
                selector = y.split(">>>")[1].trim();
              }
            }
            uni.createSelectorQuery().select(selector).boundingClientRect(function(rect2) {
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
                formatAppLog("error", "at uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue:419", selector + " does not exist");
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
      uni.$on("setMescrollGlobalOption", (options) => {
        if (!options)
          return;
        let i18nType2 = options.i18n ? options.i18n.type : null;
        if (i18nType2 && vm.mescroll.i18n.type != i18nType2) {
          vm.mescroll.i18n.type = i18nType2;
          mescrollI18n.setType(i18nType2);
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
      uni.$off("setMescrollGlobalOption");
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_mescroll_empty = resolveEasycom(vue.resolveDynamicComponent("mescroll-empty"), __easycom_0$3);
    const _component_mescroll_top = vue.resolveComponent("mescroll-top");
    return vue.openBlock(), vue.createElementBlock("view", { class: "mescroll-uni-warp" }, [
      vue.createElementVNode("scroll-view", {
        id: $data.viewId,
        class: vue.normalizeClass(["mescroll-uni", { "mescroll-uni-fixed": $options.isFixed }]),
        style: vue.normalizeStyle({ "height": $options.scrollHeight, "padding-top": $options.padTop, "padding-bottom": $options.padBottom, "top": $options.fixedTop, "bottom": $options.fixedBottom }),
        "scroll-top": $data.scrollTop,
        "scroll-with-animation": $data.scrollAnim,
        onScroll: _cache[4] || (_cache[4] = (...args) => $options.scroll && $options.scroll(...args)),
        "scroll-y": $options.scrollable,
        "enable-back-to-top": true,
        throttle: false
      }, [
        vue.createElementVNode("view", {
          class: "mescroll-uni-content mescroll-render-touch",
          onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.wxsBiz.touchstartEvent && _ctx.wxsBiz.touchstartEvent(...args)),
          onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.wxsBiz.touchmoveEvent && _ctx.wxsBiz.touchmoveEvent(...args)),
          onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.wxsBiz.touchendEvent && _ctx.wxsBiz.touchendEvent(...args)),
          onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx.wxsBiz.touchendEvent && _ctx.wxsBiz.touchendEvent(...args)),
          "change:prop": _ctx.wxsBiz.propObserver,
          prop: _ctx.wxsProp
        }, [
          vue.createCommentVNode(" \u72B6\u6001\u680F "),
          $props.topbar && $data.statusBarHeight ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "mescroll-topbar",
            style: vue.normalizeStyle({ height: "44rpx", background: $props.topbar })
          }, null, 4)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "mescroll-wxs-content",
            style: vue.normalizeStyle({ "transform": $options.translateY, "transition": $options.transition }),
            "change:prop": _ctx.wxsBiz.callObserver,
            prop: _ctx.callProp
          }, [
            vue.createCommentVNode(" \u4E0B\u62C9\u52A0\u8F7D\u533A\u57DF (\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u5B50\u7EC4\u4EF6\u4F20\u53C2\u7ED9\u5B50\u5B50\u7EC4\u4EF6\u4ECD\u62A5\u5355\u9879\u6570\u636E\u6D41\u7684\u5F02\u5E38,\u6682\u65F6\u4E0D\u901A\u8FC7mescroll-down\u7EC4\u4EF6\u5B9E\u73B0)"),
            vue.createCommentVNode(' <mescroll-down :option="mescroll.optDown" :type="downLoadType" :rate="downRate"></mescroll-down> '),
            $data.mescroll.optDown.use ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "mescroll-downwarp",
              style: vue.normalizeStyle({ "background": $data.mescroll.optDown.bgColor, "color": $data.mescroll.optDown.textColor })
            }, [
              vue.createElementVNode("view", { class: "downwarp-content" }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(["downwarp-progress mescroll-wxs-progress", { "mescroll-rotate": $options.isDownLoading }]),
                  style: vue.normalizeStyle({ "border-color": $data.mescroll.optDown.textColor, "transform": $options.downRotate })
                }, null, 6),
                vue.createElementVNode("view", { class: "downwarp-tip" }, vue.toDisplayString($options.downText), 1)
              ])
            ], 4)) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
            vue.createCommentVNode(" \u7A7A\u5E03\u5C40 "),
            $data.isShowEmpty ? (vue.openBlock(), vue.createBlock(_component_mescroll_empty, {
              key: 1,
              option: $data.mescroll.optUp.empty,
              onEmptyclick: $options.emptyClick
            }, null, 8, ["option", "onEmptyclick"])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" \u4E0A\u62C9\u52A0\u8F7D\u533A\u57DF (\u4E0B\u62C9\u5237\u65B0\u65F6\u4E0D\u663E\u793A, \u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u5B50\u7EC4\u4EF6\u4F20\u53C2\u7ED9\u5B50\u5B50\u7EC4\u4EF6\u4ECD\u62A5\u5355\u9879\u6570\u636E\u6D41\u7684\u5F02\u5E38,\u6682\u65F6\u4E0D\u901A\u8FC7mescroll-up\u7EC4\u4EF6\u5B9E\u73B0)"),
            vue.createCommentVNode(' <mescroll-up v-if="mescroll.optUp.use && !isDownLoading && upLoadType!==3" :option="mescroll.optUp" :type="upLoadType"></mescroll-up> '),
            $data.mescroll.optUp.use && !$options.isDownLoading && $data.upLoadType !== 3 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "mescroll-upwarp",
              style: vue.normalizeStyle({ "background": $data.mescroll.optUp.bgColor, "color": $data.mescroll.optUp.textColor })
            }, [
              vue.createCommentVNode(" \u52A0\u8F7D\u4E2D (\u6B64\u5904\u4E0D\u80FD\u7528v-if,\u5426\u5219android\u5C0F\u7A0B\u5E8F\u5FEB\u901F\u4E0A\u62C9\u53EF\u80FD\u4F1A\u4E0D\u65AD\u89E6\u53D1\u4E0A\u62C9\u56DE\u8C03) "),
              vue.withDirectives(vue.createElementVNode("view", null, [
                vue.createElementVNode("view", {
                  class: "upwarp-progress mescroll-rotate",
                  style: vue.normalizeStyle({ "border-color": $data.mescroll.optUp.textColor })
                }, null, 4),
                vue.createElementVNode("view", { class: "upwarp-tip" }, vue.toDisplayString($data.mescroll.optUp.textLoading), 1)
              ], 512), [
                [vue.vShow, $data.upLoadType === 1]
              ]),
              vue.createCommentVNode(" \u65E0\u6570\u636E "),
              $data.upLoadType === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "upwarp-nodata"
              }, vue.toDisplayString($data.mescroll.optUp.textNoMore), 1)) : vue.createCommentVNode("v-if", true)
            ], 4)) : vue.createCommentVNode("v-if", true)
          ], 12, ["change:prop", "prop"]),
          vue.createCommentVNode(" \u5E95\u90E8\u662F\u5426\u504F\u79FBTabBar\u7684\u9AD8\u5EA6(\u9ED8\u8BA4\u4EC5\u5728H5\u7AEF\u7684tab\u9875\u751F\u6548) "),
          vue.createCommentVNode(" \u9002\u914DiPhoneX "),
          $props.safearea ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "mescroll-safearea"
          })) : vue.createCommentVNode("v-if", true)
        ], 40, ["change:prop", "prop"])
      ], 46, ["id", "scroll-top", "scroll-with-animation", "scroll-y"]),
      vue.createCommentVNode(" \u56DE\u5230\u9876\u90E8\u6309\u94AE (fixed\u5143\u7D20,\u9700\u5199\u5728scroll-view\u5916\u9762,\u9632\u6B62\u6EDA\u52A8\u7684\u65F6\u5019\u6296\u52A8)"),
      vue.createVNode(_component_mescroll_top, {
        modelValue: $data.isShowToTop,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.isShowToTop = $event),
        option: $data.mescroll.optUp.toTop,
        onClick: $options.toTopClick
      }, null, 8, ["modelValue", "option", "onClick"]),
      vue.createCommentVNode(" renderjs\u7684\u6570\u636E\u8F7D\u4F53,\u4E0D\u53EF\u5199\u5728mescroll-downwarp\u5185\u90E8,\u907F\u514Duse\u4E3Afalse\u65F6,\u8F7D\u4F53\u4E22\u5931,\u65E0\u6CD5\u66F4\u65B0\u6570\u636E "),
      vue.createElementVNode("view", {
        "change:prop": _ctx.renderBiz.propObserver,
        prop: _ctx.wxsProp
      }, null, 8, ["change:prop", "prop"])
    ]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$E);
  if (typeof block1 === "function")
    block1(_sfc_main$E);
  var __easycom_9 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$s], ["__scopeId", "data-v-fdf59c06"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue"]]);
  const useTmRouterBefore = (arg) => {
  };
  const useTmRouterAfter = (arg) => {
  };
  const _sfc_main$D = /* @__PURE__ */ vue.defineComponent({
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
      var _a2, _b2, _c2, _d, _e2, _f, _g, _h, _i, _j, _k;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      let pages2 = getCurrentPages().pop();
      vue.nextTick(() => {
        var _a3;
        useTmRouterBefore({
          path: (_a3 = pages2 == null ? void 0 : pages2.route) != null ? _a3 : "",
          context: proxy
        });
      });
      onLoad((opts) => {
        var _a3;
        useTmRouterAfter({
          path: (_a3 = pages2 == null ? void 0 : pages2.route) != null ? _a3 : "",
          opts,
          context: proxy
        });
      });
      const tmcfg = vue.computed(() => store.tmStore);
      const isSetThemeOk = vue.ref(false);
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => computedTheme(props, isDark.value, tmcfg.value));
      const _showMenu = vue.ref(props.showMenu);
      const sysinfo = uni.getSystemInfoSync();
      const view_width = vue.ref(sysinfo.windowWidth);
      let view_height = vue.ref(sysinfo.windowHeight);
      let nowPage = getCurrentPages().pop();
      let isCustomHeader = false;
      for (let i2 = 0; i2 < uni.$tm.pages.length; i2++) {
        if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i2].path && uni.$tm.pages[i2].custom == "custom") {
          isCustomHeader = true;
          break;
        }
      }
      let isTabbarPage = false;
      let barLit = (_d = (_c2 = uni.$tm.tabBar) == null ? void 0 : _c2.list) != null ? _d : [];
      for (let i2 = 0; i2 < barLit.length; i2++) {
        if ((nowPage == null ? void 0 : nowPage.route) == barLit[i2].pagePath) {
          isTabbarPage = true;
          break;
        }
      }
      if (!isCustomHeader) {
        view_height.value = ((_f = (_e2 = sysinfo.safeArea) == null ? void 0 : _e2.height) != null ? _f : sysinfo.windowHeight) - 44;
      } else {
        view_height.value = ((_h = (_g = sysinfo.safeArea) == null ? void 0 : _g.height) != null ? _h : sysinfo.windowHeight) + ((_i = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _i : 0) + ((_k = (_j = sysinfo.safeAreaInsets) == null ? void 0 : _j.bottom) != null ? _k : 0);
      }
      const _blurEffect = vue.computed(() => {
        if (props.blur === true && isDark.value)
          return "dark";
        if (props.blur === true && !isDark.value)
          return "extralight";
        return "none";
      });
      let appConfig = vue.ref({
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
      vue.provide("appTextColor", vue.computed(() => tmcomputed.value.textColor));
      vue.provide("custom_space_size", [0, 0]);
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
      vue.onBeforeMount(() => setAppStyle());
      vue.watch(() => props.showMenu, () => {
        _showMenu.value = props.showMenu;
      });
      vue.watch([() => tmcfg.value.color, isDark], () => {
        isSetThemeOk.value = false;
        setAppStyle();
      });
      function toogleOpen(type) {
        _showMenu.value = type;
        emits("update:showMenu", _showMenu.value);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "flex flex-col relative",
          style: vue.normalizeStyle([vue.unref(appConfig).theme ? { background: vue.unref(appConfig).theme } : "", { width: vue.unref(appConfig).width + "px", minHeight: vue.unref(appConfig).height + "px" }])
        }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass([[__props.blur ? "blur" : ""], "flex flex-col flex-1"]),
            ref: "bodyEl",
            style: vue.normalizeStyle([
              {
                zIndex: 1,
                width: vue.unref(appConfig).width + "px",
                minHeight: vue.unref(appConfig).height + "px"
              },
              __props.blur ? { backgroundColor: vue.unref(isDark) ? "rgba(0,0,0,0.3)" : "rgba(248, 248, 248, 0.7)" } : ""
            ])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createElementVNode("text", null, "\u5728\u8FD9\u91CC\u653E\u7F6E\u5185\u5BB9")
            ], true)
          ], 6),
          vue.createElementVNode("view", {
            blurEffect: vue.unref(_blurEffect),
            onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => toogleOpen(false), ["stop"])),
            ref: "menuEl",
            class: vue.normalizeClass([[_showMenu.value ? "menuOn" : ""], "fixed l-0 t-0 menu"]),
            style: vue.normalizeStyle({ width: vue.unref(appConfig).width + "px", height: vue.unref(appConfig).height + "px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" })
          }, [
            vue.createElementVNode("view", {
              style: vue.normalizeStyle({ width: vue.unref(appConfig).width * 0.7 + "px", height: vue.unref(appConfig).height + "px", boxShadow: "3px 0 16px rgba(0,0,0,0.3)" })
            }, [
              vue.createElementVNode("scroll-view", {
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                }, ["stop"])),
                "scroll-y": true,
                style: vue.normalizeStyle({ width: vue.unref(appConfig).width * 0.7 + "px", height: vue.unref(appConfig).height + "px" })
              }, [
                vue.renderSlot(_ctx.$slots, "menu", {
                  sys: { width: vue.unref(appConfig).width * 0.7, height: vue.unref(appConfig).height, statusBarHeight: vue.unref(sysinfo).statusBarHeight }
                }, void 0, true)
              ], 4)
            ], 4)
          ], 14, ["blurEffect"])
        ], 4);
      };
    }
  });
  var tmApp = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-a00065e2"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-app/tm-app.vue"]]);
  const _sfc_main$C = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-tabbar-item",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _btnTop = vue.computed(() => props.btnTop);
      const _transprent = vue.computed(() => {
        if (_btnTop.value === true)
          return false;
        return true;
      });
      const _styletop = vue.computed(() => {
        if (_btnTop.value !== true)
          return "top:15px";
        return "top:0px";
      });
      const _padding = vue.computed(() => {
        return [0, 0];
      });
      const _load = vue.ref(props.load);
      const _active = vue.ref(false);
      const c_font_style = vue.computed(() => {
        return { dotColor: props.dotColor, text: props.text, icon: props.icon, textSize: props.textSize, iconSize: props.iconSize, unicon: props.unicon };
      });
      const uid = uni.$tm.u.getUid(1);
      const tmTabbarWidth = vue.inject("tmTabbarWidth", vue.computed(() => 50));
      const _width = vue.computed(() => {
        if (_btnTop.value === true)
          return 60;
        return tmTabbarWidth.value;
      });
      vue.inject("tmTabbarUrl", vue.computed(() => ""));
      const tmTabbarItemList = vue.inject("tmTabbarItemList", vue.computed(() => []));
      const nowUid = vue.inject("tmTabbarUid", vue.computed(() => ""));
      vue.inject("tmTabbarItemSafe", false);
      const tmTabbarItemActive = vue.inject("tmTabbarItemActive", vue.computed(() => -1));
      const tmTabbarItemAutoSelect = vue.inject("tmTabbarItemAutoSelect", vue.computed(() => false));
      const _color = vue.computed(() => {
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
          parent = (_c2 = parent == null ? void 0 : parent.$parent) != null ? _c2 : void 0;
        }
      }
      if (parent) {
        parent.pushKey(uid);
      }
      vue.onUnmounted(() => {
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
      vue.watch([nowUid, () => props.active], () => {
        if (tmTabbarItemAutoSelect.value) {
          setActive();
        }
      });
      vue.watch(tmTabbarItemActive, () => {
        if (!tmTabbarItemAutoSelect.value) {
          if (tmTabbarItemList.value[tmTabbarItemActive.value] == uid) {
            vue.nextTick(() => {
              _active.value = true;
            });
          } else {
            vue.nextTick(() => {
              _active.value = false;
            });
          }
        }
      });
      vue.watch([() => props.load], () => {
        _load.value = props.load;
      });
      async function itemClick() {
        if (_load.value)
          return;
        if (typeof props.beforeClick === "function") {
          _load.value = true;
          let p2 = await props.beforeClick(props.data);
          if (typeof p2 === "function") {
            p2 = await p2(props.data);
          }
          _load.value = false;
          if (!p2)
            return;
        }
        emits("click");
        vue.nextTick(() => {
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
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "flex flex-col flex-col-top-center",
          style: { "height": "75px" }
        }, [
          vue.createVNode(tmSheet, {
            height: 60,
            width: vue.unref(_width),
            round: 24,
            unit: "px",
            _class: "flex-center flex ",
            parenClass: "relative",
            class: "relative",
            _style: vue.unref(_styletop),
            followTheme: vue.unref(_btnTop) && props.followTheme,
            transprent: vue.unref(_transprent),
            color: props.color,
            margin: [0, 0],
            padding: vue.unref(_padding),
            shadow: props.shadow,
            outlined: props.outlined,
            border: props.border,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            linear: props.linear,
            linearDeep: props.linearDeep,
            onClick: itemClick
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(tmBadge, {
                fontSize: 20,
                color: vue.unref(c_font_style).dotColor,
                eventPenetrationEnabled: true,
                dot: props.dot,
                count: props.count,
                icon: props.dotIcon,
                maxCount: props.maxCount
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass([[_active.value ? "anifun" : ""], "flex flex-col flex-col-center-center"]),
                    style: { width: 65 + "px", height: "30px" }
                  }, [
                    vue.renderSlot(_ctx.$slots, "default", {}, () => [
                      !_load.value ? (vue.openBlock(), vue.createBlock(tmIcon, {
                        key: 0,
                        _style: "line-height: 0px;",
                        color: vue.unref(_color),
                        "font-size": vue.unref(c_font_style).iconSize,
                        name: _active.value ? vue.unref(c_font_style).icon : vue.unref(c_font_style).unicon || vue.unref(c_font_style).icon
                      }, null, 8, ["color", "font-size", "name"])) : vue.createCommentVNode("v-if", true)
                    ], true),
                    _load.value ? (vue.openBlock(), vue.createBlock(tmIcon, {
                      key: 0,
                      spin: "",
                      _style: "line-height: 0px;",
                      color: vue.unref(_color),
                      "font-size": vue.unref(c_font_style).iconSize,
                      name: "tmicon-loading"
                    }, null, 8, ["color", "font-size"])) : vue.createCommentVNode("v-if", true)
                  ], 2)
                ]),
                _: 3
              }, 8, ["color", "dot", "count", "icon", "maxCount"]),
              vue.unref(c_font_style).text !== "" ? (vue.openBlock(), vue.createBlock(tmText, {
                key: 0,
                color: vue.unref(_color),
                _class: "pb-0",
                "font-size": vue.unref(c_font_style).textSize,
                label: vue.unref(c_font_style).text
              }, null, 8, ["color", "font-size", "label"])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["width", "_style", "followTheme", "transprent", "color", "padding", "shadow", "outlined", "border", "borderStyle", "borderDirection", "linear", "linearDeep"])
        ]);
      };
    }
  });
  var __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-3a8aa8ef"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabbar-item/tm-tabbar-item.vue"]]);
  const _sfc_main$B = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-tabbar",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2;
      const props = __props;
      useTmpiniaStore();
      let sys = uni.getSystemInfoSync();
      const _width = uni.upx2px(props.width) || ((_a2 = sys == null ? void 0 : sys.windowWidth) != null ? _a2 : 0);
      const _blur = vue.computed(() => props.blur);
      const _activeUrl = vue.ref("");
      const _activeUid = vue.ref("");
      const tmTabbarId = "tmTabbarId";
      const _cachlist = vue.ref([]);
      const _showSafe = vue.ref(props.showSafe);
      const _activeIndex = vue.ref(props.active);
      const win_bottom = (_c2 = (_b2 = sys == null ? void 0 : sys.safeAreaInsets) == null ? void 0 : _b2.bottom) != null ? _c2 : 0;
      if (win_bottom > 0) {
        _showSafe.value = true;
      }
      const _totalBarHeight = vue.computed(() => {
        if (_showSafe.value)
          return 90;
        return 75;
      });
      const _BarHeight = vue.computed(() => {
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
      vue.provide("tmTabbarUrl", vue.computed(() => _activeUrl.value));
      vue.provide("tmTabbarUid", vue.computed(() => _activeUid.value));
      vue.provide("tmTabbarWidth", vue.computed(() => Math.ceil(_width / _cachlist.value.length)));
      vue.provide("tmTabbarItemList", vue.computed(() => _cachlist.value));
      vue.provide("tmTabbarItemActive", vue.computed(() => _activeIndex.value));
      vue.provide("tmTabbarItemSafe", _showSafe.value);
      vue.provide("tmTabbarItemAutoSelect", vue.computed(() => props.autoSelect));
      vue.watch(() => props.active, () => {
        if (props.active == _activeIndex.value)
          return;
        _activeIndex.value = props.active;
      });
      vue.watch(_activeIndex, () => {
        emits("change", _activeIndex.value);
        emits("update:active", _activeIndex.value);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "fixed l-0 b-0 flex",
          style: vue.normalizeStyle({ width: vue.unref(_width) + "px", height: vue.unref(_totalBarHeight) + "px", transform: `translateY(${props.bottom}rpx)` })
        }, [
          vue.createCommentVNode(` 			@click="emits('click', $event)"    `),
          vue.createElementVNode("view", {
            class: "relative",
            style: { "top": "15px" }
          }, [
            vue.createVNode(tmSheet, {
              blur: vue.unref(_blur),
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
              height: vue.unref(_BarHeight),
              width: vue.unref(_width),
              unit: "px"
            }, null, 8, ["blur", "color", "followTheme", "dark", "round", "shadow", "outlined", "text", "linear", "linearDeep", "height", "width"])
          ]),
          vue.createElementVNode("view", {
            class: "absolute flex flex-col l-0",
            style: vue.normalizeStyle({ width: vue.unref(_width) + "px", height: vue.unref(_totalBarHeight) + "px" })
          }, [
            vue.createElementVNode("view", {
              class: "relative barcont flex flex-row flex-row-top-center flex-around flex-1",
              style: vue.normalizeStyle({ width: vue.unref(_width) + "px" })
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 4)
          ], 4)
        ], 4);
      };
    }
  });
  var __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-70fee356"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-tabbar/tm-tabbar.vue"]]);
  const _sfc_main$A = {
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
      beforeClick(index) {
        formatAppLog("log", "at components/TheTabBar.vue:22", index);
        return this.active !== index;
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tm_tabbar_item = resolveEasycom(vue.resolveDynamicComponent("tm-tabbar-item"), __easycom_0$2);
    const _component_tm_tabbar = resolveEasycom(vue.resolveDynamicComponent("tm-tabbar"), __easycom_1$2);
    return vue.openBlock(), vue.createBlock(_component_tm_tabbar, {
      transprent: "",
      blur: "",
      bottom: 0,
      round: 16,
      "auto-select": false,
      active: $props.active,
      shadow: 8
    }, {
      default: vue.withCtx(() => [
        vue.createVNode(_component_tm_tabbar_item, {
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
        vue.createVNode(_component_tm_tabbar_item, {
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
        vue.createVNode(_component_tm_tabbar_item, {
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
        vue.createVNode(_component_tm_tabbar_item, {
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
        vue.createVNode(_component_tm_tabbar_item, {
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
  var TabBar = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$r], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/TheTabBar.vue"]]);
  const baseUrl = "https://wx.jaycao.com/";
  const request$1 = (opts, data) => {
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
  const httpRequest = (opts, data) => {
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
  const httpTokenRequest = (opts, data) => {
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
  const httpupload = (opts, data) => {
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
  const hadToken = () => {
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
  var request$2 = {
    baseUrl,
    httpRequest,
    httpTokenRequest,
    hadToken,
    request: request$1,
    httpupload
  };
  const MescrollMixin = {
    data() {
      return {
        mescroll: null
      };
    },
    onPullDownRefresh() {
      this.mescroll && this.mescroll.onPullDownRefresh();
    },
    onPageScroll(e) {
      this.mescroll && this.mescroll.onPageScroll(e);
    },
    onReachBottom() {
      this.mescroll && this.mescroll.onReachBottom();
    },
    methods: {
      mescrollInit(mescroll) {
        this.mescroll = mescroll;
        this.mescrollInitByRef();
      },
      mescrollInitByRef() {
        if (!this.mescroll || !this.mescroll.resetUpScroll) {
          let mescrollRef = this.$refs.mescrollRef;
          if (mescrollRef)
            this.mescroll = mescrollRef.mescroll;
        }
      },
      downCallback() {
        if (this.mescroll.optUp.use) {
          this.mescroll.resetUpScroll();
        } else {
          setTimeout(() => {
            this.mescroll.endSuccess();
          }, 500);
        }
      },
      upCallback() {
        setTimeout(() => {
          this.mescroll.endErr();
        }, 500);
      }
    },
    mounted() {
      this.mescrollInitByRef();
    }
  };
  const _sfc_main$z = {
    components: {
      TabBar
    },
    mixins: [MescrollMixin],
    data() {
      return {
        offset: 50,
        load: true,
        current: 0,
        goods: [],
        SwiperMfwlist: [
          {
            id: 1,
            Image: "https://b1-q.mafengwo.net/s17/M00/78/09/CoUBXmERFxyAMagZAAd7ujMYDZU158.png",
            mp4: "",
            title: "\u3010\u5C9B\u5C7F\u6765\u4FE1\u3011\u5728\u51B0\u5C9B\u5199\u4E86\u5C01\u4FE1\uFF0C\u5BC4\u7ED915\u5C81\u7684\u81EA\u5DF1",
            UserImage: "https://n1-q.mafengwo.net/s12/M00/D1/C3/wKgED1v3uaOADWepACAWS9q5Rhg19.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
            UserName: "\u8BD7\u7684PHOTO",
            UserGPS: "\u676D\u5DDE"
          },
          {
            id: 3,
            Image: "https://n1-q.mafengwo.net/s16/M00/EB/2D/CoUBUmDlheiAdABtAAgo3xeAaaQ458.jpg?imageMogr2/thumbnail/!440x300r/strip/gravity/Center/crop/!440x300/quality/90",
            mp4: "",
            title: "\u4E00\u534A\u98CE\u5149\u4E00\u534A\u4EBA\u6587\uFF0C\u4E0E\u4F60\u5954\u8D74\u85CF\u5730\u627E\u5BFB\u4E16\u754C\u5982\u521D\u7684\u6A21\u6837",
            UserImage: "https://p1-q.mafengwo.net/s10/M00/5C/55/wKgBZ1mRHV2APLX9AABt9unXidc25.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
            UserName: "\u90ED\u5C0Fyan",
            UserGPS: "\u5E7F\u5DDE"
          },
          {
            id: 4,
            Image: "https://b1-q.mafengwo.net/s18/M00/21/34/CoUBYWEHpHOAU3amAAQzcB1XxYQ493.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90",
            mp4: "",
            title: "\u6D77\u5DDE\u65E5\u8BB0\uFF1A\u5C71\u6D77\u8FBD\u9614\u6D6A\u6F2B \u6D77\u9C9C\u8BF1\u60D1\u96BE\u6321\uFF0C\u5168\u662F\u4EBA\u95F4\u503C\u5F97\uFF01",
            UserImage: "https://b1-q.mafengwo.net/s9/M00/B3/D4/wKgBs1hgfP-Ae9emABNBFw8wn4U38.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
            UserName: "\u98CE\u4E4B\u4E03\u5F69",
            UserGPS: "\u65E0\u9521"
          },
          {
            id: 5,
            Image: "https://n1-q.mafengwo.net/s16/M00/40/C8/CoUBUmD1sDWAAeQFAAnK3yTNs_I942.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90",
            mp4: "",
            title: "\u897F\u5317\u5927\u73AF\u7EBF\u81EA\u9A7E\u4E28\u521D\u590F\uFF0C\u4E00\u573A7\u65E5\u9003\u79BB\u300C\u5730\u7403\u300D\u7684\u65C5\u884C",
            UserImage: "https://n1-q.mafengwo.net/s1/M00/9A/AA/wKgIC1uEE6SAF_DOAACyC15Thk811.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
            UserName: "\u5E06\u59AE\u513F",
            UserGPS: "\u5317\u4EAC"
          },
          {
            id: 6,
            Image: "https://n1-q.mafengwo.net/s16/M00/81/40/CoUBUmD5W1iAanT9ABE22ZlvQlg407.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90",
            mp4: "",
            title: "\u5728\u7F19\u4E91\uFF0C\u6211\u53D1\u73B0\u4E86\u53BB\u4ED9\u4FA0\u5B87\u5B99\u7684\u4F20\u9001\u95E8",
            UserImage: "https://b1-q.mafengwo.net/s15/M00/8E/41/CoUBGV3h1xqAdMEiACG5XnWSoMA99.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
            UserName: "\u838E\u838E\u7231\u65C5\u884C",
            UserGPS: "\u4E0A\u6D77"
          },
          {
            id: 7,
            Image: "https://n1-q.mafengwo.net/s16/M00/42/A2/CoUBUmDw8T6AdDCjABhWy-clT_M281.jpg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90",
            mp4: "",
            title: "\u3010\u9B54\u90FD\u6F2B\u6B65\u3011\u53BB\u4E0A\u6D77\uFF0C\u7A7F\u8D8A\u65F6\u7A7A\u7684\u76DB\u590F",
            UserImage: "https://b1-q.mafengwo.net/s15/M00/92/A8/CoUBGWECgimABvHVAAlxqNsMSGw93.jpeg?imageMogr2%2Fthumbnail%2F%21200x200r%2Fgravity%2FCenter%2Fcrop%2F%21200x200%2Fquality%2F90",
            UserName: "goericgo",
            UserGPS: "\u9752\u5C9B"
          }
        ],
        tabs: [
          {
            key: "1",
            title: "\u6210\u5DE5\u8981\u95FB"
          },
          {
            key: "2",
            title: "\u65B0\u65F6\u4EE3\u9AD8\u6559"
          },
          {
            key: "3",
            title: "\u901A\u77E5\u4E0E\u516C\u544A"
          },
          {
            key: "4",
            title: "\u5F18\u6BC5\u8BB2\u575B"
          },
          {
            key: "5",
            title: "\u5A92\u4F53\u770B\u5B66\u6821"
          }
        ],
        tabIndex: 1,
        listimg: [
          "https://picsum.photos/200/300?id=43335",
          "https://picsum.photos/200/300?id=433",
          "https://picsum.photos/200/300?id=439",
          "https://picsum.photos/200/300?id=459"
        ]
      };
    },
    onLoad() {
    },
    methods: {
      cu() {
        formatAppLog("log", "at pages/news/news.vue:176", "\u5F53\u524D" + this.current);
      },
      change(e) {
        this.current = e.current;
      },
      tabschange(key) {
        this.tabIndex = key;
        this.goods = [];
        this.mescroll.resetUpScroll();
      },
      upCallback(page) {
        request$2.httpTokenRequest({
          url: "news/item/" + this.tabIndex + "?pageNum=" + page.num,
          method: "get"
        }, {}).then((res) => {
          if (page.num == 1)
            this.goods = [];
          this.goods = this.goods.concat(res.data.rows);
          this.mescroll.endSuccess(res.data.length);
          this.load = false;
        });
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tm_navbar = resolveEasycom(vue.resolveDynamicComponent("tm-navbar"), __easycom_0$5);
    const _component_FatFatMeng_Swiper_mfw = resolveEasycom(vue.resolveDynamicComponent("FatFatMeng-Swiper-mfw"), __easycom_1$3);
    const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_0$4);
    const _component_tm_divider = resolveEasycom(vue.resolveDynamicComponent("tm-divider"), tmDivider);
    const _component_tm_tabs = resolveEasycom(vue.resolveDynamicComponent("tm-tabs"), __easycom_4$1);
    const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), tmSheet);
    const _component_tm_skeleton = resolveEasycom(vue.resolveDynamicComponent("tm-skeleton"), __easycom_6);
    const _component_good_list = resolveEasycom(vue.resolveDynamicComponent("good-list"), __easycom_7$1);
    const _component_tm_sticky = resolveEasycom(vue.resolveDynamicComponent("tm-sticky"), __easycom_8);
    const _component_mescroll_uni = resolveEasycom(vue.resolveDynamicComponent("mescroll-uni"), __easycom_9);
    const _component_tab_bar = vue.resolveComponent("tab-bar");
    const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), tmApp);
    return vue.openBlock(), vue.createBlock(_component_tm_app, { ref: "app" }, {
      default: vue.withCtx(() => [
        vue.createVNode(_component_tm_navbar, {
          title: "CDTU \u6210\u5DE5\u8981\u95FB",
          shadow: 0
        }),
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_mescroll_uni, {
            ref: "mescrollRef",
            onInit: _ctx.mescrollInit,
            onUp: $options.upCallback,
            height: "100%"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", null, [
                vue.createCommentVNode(' <tm-carousel autoplay :margin="[0,16]" align="right" :round="8" :width="686" :height="300" :list="listimg"></tm-carousel> '),
                vue.createCommentVNode(' <image style="width: 100%;height: 340rpx;" src="https://www.mescroll.com/img/swiper1.jpg"/> '),
                vue.createElementVNode("view", {
                  slot: "header",
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.cu && $options.cu(...args))
                }, [
                  vue.createCommentVNode(" Swiper-mfw\u8F6E\u64AD\u56FE\u5E26\u89C6\u9891 [\u4EFF\u9A6C\u8702\u7A9DAPP\u9996\u9875\u8F6E\u64AD\u56FE] "),
                  vue.createVNode(_component_FatFatMeng_Swiper_mfw, {
                    list: $data.SwiperMfwlist,
                    current: $data.current,
                    autoplay: true,
                    onChange: $options.change
                  }, null, 8, ["list", "current", "onChange"])
                ]),
                vue.createCommentVNode(' <image style="width: 100%;height: 245rpx; solid #f2f2f2"\r\n						src="https://www.mescroll.com/img/beibei/beibei2.jpg" /> ')
              ]),
              vue.createVNode(_component_tm_sticky, { offset: "0" }, {
                sticky: vue.withCtx(() => [
                  vue.createVNode(_component_tm_sheet, { margin: [0, 0] }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_tm_input, {
                        placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57",
                        border: 1,
                        showClear: "",
                        prefix: "tmicon-search",
                        onSearch: _cache[1] || (_cache[1] = () => {
                        }),
                        searchLabel: "\u641C\u7D22"
                      }),
                      vue.createVNode(_component_tm_divider),
                      vue.createVNode(_component_tm_tabs, {
                        list: $data.tabs,
                        width: 750,
                        height: 80,
                        itemHeight: 45,
                        itemWidth: 140,
                        "default-name": "1",
                        onChange: $options.tabschange
                      }, null, 8, ["list", "onChange"])
                    ]),
                    _: 1
                  })
                ]),
                default: vue.withCtx(() => [
                  $data.load ? (vue.openBlock(), vue.createBlock(_component_tm_sheet, { key: 0 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_tm_skeleton, { model: "chat" }),
                      vue.createVNode(_component_tm_skeleton, { model: "chat" }),
                      vue.createVNode(_component_tm_skeleton, { model: "chat" }),
                      vue.createVNode(_component_tm_skeleton, { model: "chat" })
                    ]),
                    _: 1
                  })) : vue.createCommentVNode("v-if", true),
                  vue.createVNode(_component_good_list, { list: $data.goods }, null, 8, ["list"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["onInit", "onUp"])
        ]),
        vue.createVNode(_component_tab_bar, { active: 1 })
      ]),
      _: 1
    }, 512);
  }
  var PagesNewsNews = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$q], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/news/news.vue"]]);
  const language$2 = "English-US";
  var en$1 = {
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
  const language$1 = "\u7B80\u4F53-\u4E2D\u56FD";
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
  /*!
    * @intlify/shared v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const inBrowser = typeof window !== "undefined";
  let mark;
  let measure;
  {
    const perf2 = inBrowser && window.performance;
    if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && perf2.clearMeasures) {
      mark = (tag) => perf2.mark(tag);
      measure = (name, startTag, endTag) => {
        perf2.measure(name, startTag, endTag);
        perf2.clearMarks(startTag);
        perf2.clearMarks(endTag);
      };
    }
  }
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
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
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber = (val) => typeof val === "number" && isFinite(val);
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const assign = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  function hasOwn$2(obj, key) {
    return hasOwnProperty$2.call(obj, key);
  }
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isBoolean = (val) => typeof val === "boolean";
  const isObject$2 = (val) => val !== null && typeof val === "object";
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString = (val) => {
    return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i2 = 0; i2 < lines.length; i2++) {
      count += lines[i2].length + 1;
      if (count >= start) {
        for (let j2 = i2 - RANGE; j2 <= i2 + RANGE || end > count; j2++) {
          if (j2 < 0 || j2 >= lines.length)
            continue;
          const line = j2 + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j2]}`);
          const lineLength = lines[j2].length;
          if (j2 === i2) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j2 > i2) {
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
  /*!
    * @intlify/message-resolver v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn$1(obj, key) {
    return hasOwnProperty$1.call(obj, key);
  }
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const pathStateMachine = [];
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
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a2 = str.charCodeAt(0);
    const b2 = str.charCodeAt(str.length - 1);
    return a2 === b2 && (a2 === 34 || a2 === 39) ? str.slice(1, -1) : str;
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
    let index = -1;
    let mode = 0;
    let subPathDepth = 0;
    let c2;
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
      const nextChar = path[index + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
        index++;
        newChar = "\\" + nextChar;
        actions[0]();
        return true;
      }
    }
    while (mode !== null) {
      index++;
      c2 = path[index];
      if (c2 === "\\" && maybeUnescapeQuote()) {
        continue;
      }
      type = getPathCharType(c2);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap["l"] || 8;
      if (transition === 8) {
        return;
      }
      mode = transition[0];
      if (transition[1] !== void 0) {
        action = actions[transition[1]];
        if (action) {
          newChar = c2;
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
  const cache$1 = /* @__PURE__ */ new Map();
  function resolveValue(obj, path) {
    if (!isObject$1(obj)) {
      return null;
    }
    let hit = cache$1.get(path);
    if (!hit) {
      hit = parse$1(path);
      if (hit) {
        cache$1.set(path, hit);
      }
    }
    if (!hit) {
      return null;
    }
    const len = hit.length;
    let last = obj;
    let i2 = 0;
    while (i2 < len) {
      const val = last[hit[i2]];
      if (val === void 0) {
        return null;
      }
      last = val;
      i2++;
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
        for (let i2 = 0; i2 < lastIndex; i2++) {
          if (!(subKeys[i2] in currentObj)) {
            currentObj[subKeys[i2]] = {};
          }
          currentObj = currentObj[subKeys[i2]];
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
  /*!
    * @intlify/runtime v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => "";
  const DEFAULT_MESSAGE_DATA_TYPE = "text";
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
      return choice ? choice > 1 ? 1 : 0 : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
    const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
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
    const pluralRule = isObject$2(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
    const orgPluralRule = isObject$2(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
    const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index) => _list[index];
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message(key) {
      const msg = isFunction(options.messages) ? options.messages(key) : isObject$2(options.messages) ? options.messages[key] : false;
      return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
    const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
      ["list"]: list,
      ["named"]: named,
      ["plural"]: plural,
      ["linked"]: (key, modifier) => {
        const msg = message(key)(ctx);
        return isString(modifier) ? _modifier(modifier)(msg) : msg;
      },
      ["message"]: message,
      ["type"]: type,
      ["interpolate"]: interpolate,
      ["normalize"]: normalize
    };
    return ctx;
  }
  /*!
    * @intlify/message-compiler v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const errorMessages$2 = {
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
  /*!
    * @intlify/devtools-if v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const IntlifyDevToolsHooks = {
    I18nInit: "i18n:init",
    FunctionTranslate: "function:translate"
  };
  /*!
    * @intlify/core-base v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  let devtools = null;
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
  const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
  function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
  }
  const warnMessages$1 = {
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
  const VERSION$1 = "9.1.9";
  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = "";
  function getDefaultLinkedModifiers() {
    return {
      upper: (val) => isString(val) ? val.toUpperCase() : val,
      lower: (val) => isString(val) ? val.toLowerCase() : val,
      capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
    };
  }
  let _compiler;
  let _additionalMeta = null;
  const setAdditionalMeta = (meta) => {
    _additionalMeta = meta;
  };
  const getAdditionalMeta = () => _additionalMeta;
  let _cid = 0;
  function createCoreContext(options = {}) {
    const version = isString(options.version) ? options.version : VERSION$1;
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
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
      return isString(ret) ? ret : key;
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
      block = isString(defaults) ? [defaults] : defaults;
      if (isArray(block)) {
        appendBlockToChain(chain, block, false);
      }
      context.__localeChainCache.set(start, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i2 = 0; i2 < block.length && isBoolean(follow); i2++) {
      const locale = block[i2];
      if (isString(locale)) {
        follow = appendLocaleToChain(chain, block[i2], blocks);
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
  const errorMessages$1 = {
    [14]: "Invalid arguments",
    [15]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
    [16]: "The argument provided is not a valid ISO date string"
  };
  const NOOP_MESSAGE_FUNCTION = () => "";
  const isMessageFunction = (val) => isFunction(val);
  function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
    const locale = isString(options.locale) ? options.locale : context.locale;
    escapeParameter && escapeParams(options);
    let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
      key,
      locale,
      messages[locale] || {}
    ];
    let cacheBaseKey = key;
    if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
      if (enableDefaultMsg) {
        format2 = defaultMsgOrKey;
        cacheBaseKey = format2;
      }
    }
    if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
      return unresolving ? NOT_REOSLVED : key;
    }
    if (isString(format2) && context.messageCompiler == null) {
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
        key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
      translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    if (isArray(options.list)) {
      options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
    } else if (isObject$2(options.named)) {
      Object.keys(options.named).forEach((key) => {
        if (isString(options.named[key])) {
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
    for (let i2 = 0; i2 < locales.length; i2++) {
      targetLocale = to = locales[i2];
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
      if (isString(format2) || isFunction(format2))
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
    if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
      throw createCoreError(14);
    }
    const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (isNumber(arg2)) {
      options.plural = arg2;
    } else if (isString(arg2)) {
      options.default = arg2;
    } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
      options.named = arg2;
    } else if (isArray(arg2)) {
      options.list = arg2;
    }
    if (isNumber(arg3)) {
      options.plural = arg3;
    } else if (isString(arg3)) {
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
      const val = resolveValue(message, key);
      if (isString(val)) {
        let occurred = false;
        const errorDetector = () => {
          occurred = true;
        };
        const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
        return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
      } else if (isMessageFunction(val)) {
        return val;
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
  const intlDefined = typeof Intl !== "undefined";
  const Availabilities = {
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
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.DateTimeFormat(locale).format(value);
    }
    let datetimeFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "datetime format";
    for (let i2 = 0; i2 < locales.length; i2++) {
      targetLocale = to = locales[i2];
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
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
      __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    let value;
    if (isString(arg1)) {
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
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
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
      const id = `${locale}__${key}`;
      if (!context.__datetimeFormatters.has(id)) {
        continue;
      }
      context.__datetimeFormatters.delete(id);
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
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.NumberFormat(locale).format(value);
    }
    let numberFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "number format";
    for (let i2 = 0; i2 < locales.length; i2++) {
      targetLocale = to = locales[i2];
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
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
      __numberFormatters.set(id, formatter);
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
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
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
      const id = `${locale}__${key}`;
      if (!context.__numberFormatters.has(id)) {
        continue;
      }
      context.__numberFormatters.delete(id);
    }
  }
  /*!
    * @intlify/vue-devtools v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VueDevToolsLabels = {
    ["vue-devtools-plugin-vue-i18n"]: "Vue I18n devtools",
    ["vue-i18n-resource-inspector"]: "I18n Resources",
    ["vue-i18n-timeline"]: "Vue I18n"
  };
  const VueDevToolsPlaceholders = {
    ["vue-i18n-resource-inspector"]: "Search for scopes ..."
  };
  const VueDevToolsTimelineColors = {
    ["vue-i18n-timeline"]: 16764185
  };
  /*!
    * vue-i18n v9.1.9
    * (c) 2022 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VERSION = "9.1.9";
  function initFeatureFlags() {
    let needWarn = false;
    {
      needWarn = true;
    }
    if (needWarn) {
      console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
    }
  }
  const warnMessages = {
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
  const errorMessages = {
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
  const DEVTOOLS_META = "__INTLIFY_META__";
  const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
  const DatetimePartsSymbol = makeSymbol("__datetimeParts");
  const NumberPartsSymbol = makeSymbol("__numberParts");
  const EnableEmitter = makeSymbol("__enableEmitter");
  const DisableEmitter = makeSymbol("__disableEmitter");
  const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
  makeSymbol("__intlifyMeta");
  const InejctWithOption = makeSymbol("__injectWithOption");
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type) => {
      return missing(locale, key, vue.getCurrentInstance() || void 0, type);
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
  const isNotObjectOrIsArray = (val) => !isObject$2(val) || isArray(val);
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
  const getMetaInfo = () => {
    const instance = vue.getCurrentInstance();
    return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
  };
  function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === void 0;
    let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = vue.ref(__root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US");
    const _fallbackLocale = vue.ref(__root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value);
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
    const _numberFormats = vue.ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
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
    const locale = vue.computed({
      get: () => _locale.value,
      set: (val) => {
        _locale.value = val;
        _context.locale = _locale.value;
      }
    });
    const fallbackLocale = vue.computed({
      get: () => _fallbackLocale.value,
      set: (val) => {
        _fallbackLocale.value = val;
        _context.fallbackLocale = _fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, val);
      }
    });
    const messages = vue.computed(() => _messages.value);
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    const numberFormats = vue.computed(() => _numberFormats.value);
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
        if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
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
      return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val) => isString(val));
    }
    function rt2(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject$2(arg3)) {
        throw createI18nError(15);
      }
      return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
    }
    function d2(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function n2(...args) {
      return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function normalize(values) {
      return values.map((val) => isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
    }
    const interpolate = (val) => val;
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
      }, () => parseTranslateArgs(...args), "translate", (root) => root[TransrateVNodeSymbol](...args), (key) => [vue.createVNode(vue.Text, null, key, 0)], (val) => isArray(val));
    }
    function numberParts(...args) {
      return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), () => [], (val) => isString(val) || isArray(val));
    }
    function datetimeParts(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), () => [], (val) => isString(val) || isArray(val));
    }
    function setPluralRules(rules) {
      _pluralRules = rules;
      _context.pluralRules = _pluralRules;
    }
    function te2(key, locale2) {
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      return resolveValue(message, key) !== null;
    }
    function resolveMessages(key) {
      let messages2 = null;
      const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i2 = 0; i2 < locales.length; i2++) {
        const targetLocaleMessages = _messages.value[locales[i2]] || {};
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
      vue.watch(__root.locale, (val) => {
        if (_inheritLocale) {
          _locale.value = val;
          _context.locale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
      vue.watch(__root.fallbackLocale, (val) => {
        if (_inheritLocale) {
          _fallbackLocale.value = val;
          _context.fallbackLocale = val;
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
      set inheritLocale(val) {
        _inheritLocale = val;
        if (val && __root) {
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
      set missingWarn(val) {
        _missingWarn = val;
        _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val) {
        _fallbackWarn = val;
        _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val) {
        _fallbackRoot = val;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val) {
        _fallbackFormat = val;
        _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val) {
        _warnHtmlMessage = val;
        _context.warnHtmlMessage = val;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val) {
        _escapeParameter = val;
        _context.escapeParameter = val;
      },
      t,
      rt: rt2,
      d: d2,
      n: n2,
      te: te2,
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
  function convertComposerOptions(options) {
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const missing = isFunction(options.missing) ? options.missing : void 0;
    const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
    const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
    const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
    const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = isBoolean(options.sync) ? options.sync : true;
    if (options.formatter) {
      warn(getWarnMessage(8));
    }
    if (options.preserveDirectiveContent) {
      warn(getWarnMessage(9));
    }
    let messages = options.messages;
    if (isPlainObject(options.sharedMessages)) {
      const sharedMessages = options.sharedMessages;
      const locales = Object.keys(sharedMessages);
      messages = locales.reduce((messages2, locale2) => {
        const message = messages2[locale2] || (messages2[locale2] = {});
        assign(message, sharedMessages[locale2]);
        return messages2;
      }, messages || {});
    }
    const { __i18n, __root, __injectWithOption } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    return {
      locale,
      fallbackLocale,
      messages,
      flatJson,
      datetimeFormats,
      numberFormats,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackRoot,
      fallbackFormat,
      modifiers,
      pluralRules: pluralizationRules,
      postTranslation,
      warnHtmlMessage,
      escapeParameter,
      inheritLocale,
      __i18n,
      __root,
      __injectWithOption
    };
  }
  function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    const vueI18n = {
      id: composer.id,
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      get messages() {
        return composer.messages.value;
      },
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      get numberFormats() {
        return composer.numberFormats.value;
      },
      get availableLocales() {
        return composer.availableLocales;
      },
      get formatter() {
        warn(getWarnMessage(8));
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(val) {
        warn(getWarnMessage(8));
      },
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      get silentTranslationWarn() {
        return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean(val) ? !val : val;
      },
      get silentFallbackWarn() {
        return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean(val) ? !val : val;
      },
      get modifiers() {
        return composer.modifiers;
      },
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      get preserveDirectiveContent() {
        warn(getWarnMessage(9));
        return true;
      },
      set preserveDirectiveContent(val) {
        warn(getWarnMessage(9));
      },
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      __composer: composer,
      t(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = {};
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(15);
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      rt(...args) {
        return composer.rt(...args);
      },
      tc(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = { plural: 1 };
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(15);
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isNumber(arg2)) {
          options2.plural = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isString(arg3)) {
          options2.locale = arg3;
        } else if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      te(key, locale) {
        return composer.te(key, locale);
      },
      tm(key) {
        return composer.tm(key);
      },
      getLocaleMessage(locale) {
        return composer.getLocaleMessage(locale);
      },
      setLocaleMessage(locale, message) {
        composer.setLocaleMessage(locale, message);
      },
      mergeLocaleMessage(locale, message) {
        composer.mergeLocaleMessage(locale, message);
      },
      d(...args) {
        return composer.d(...args);
      },
      getDateTimeFormat(locale) {
        return composer.getDateTimeFormat(locale);
      },
      setDateTimeFormat(locale, format2) {
        composer.setDateTimeFormat(locale, format2);
      },
      mergeDateTimeFormat(locale, format2) {
        composer.mergeDateTimeFormat(locale, format2);
      },
      n(...args) {
        return composer.n(...args);
      },
      getNumberFormat(locale) {
        return composer.getNumberFormat(locale);
      },
      setNumberFormat(locale, format2) {
        composer.setNumberFormat(locale, format2);
      },
      mergeNumberFormat(locale, format2) {
        composer.mergeNumberFormat(locale, format2);
      },
      getChoiceIndex(choice, choicesLength) {
        warn(getWarnMessage(10));
        return -1;
      },
      __onComponentInstanceCreated(target) {
        const { componentInstanceCreatedListener } = options;
        if (componentInstanceCreatedListener) {
          componentInstanceCreatedListener(target, vueI18n);
        }
      }
    };
    {
      vueI18n.__enableEmitter = (emitter) => {
        const __composer = composer;
        __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
      };
      vueI18n.__disableEmitter = () => {
        const __composer = composer;
        __composer[DisableEmitter] && __composer[DisableEmitter]();
      };
    }
    return vueI18n;
  }
  const baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: (val) => val === "parent" || val === "global",
      default: "parent"
    },
    i18n: {
      type: Object
    }
  };
  const Translation = {
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        validator: (val) => isNumber(val) || !isNaN(val)
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
          options.plural = isString(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign({}, attrs);
        return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
      };
    }
  };
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
      if (isString(props.format)) {
        options.key = props.format;
      } else if (isObject$2(props.format)) {
        if (isString(props.format.key)) {
          options.key = props.format.key;
        }
        overrides = Object.keys(props.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
        }, {});
      }
      const parts = partFormatter(...[props.value, options, overrides]);
      let children = [options.key];
      if (isArray(parts)) {
        children = parts.map((part, index) => {
          const slot = slots[part.type];
          return slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        });
      } else if (isString(parts)) {
        children = [parts];
      }
      const assignedAttrs = assign({}, attrs);
      return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$2(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
    };
  }
  const NUMBER_FORMAT_KEYS = [
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
  const NumberFormat = {
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
  };
  const DATETIME_FORMAT_KEYS = [
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
  const DatetimeFormat = {
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
  };
  function getComposer$2(i18n, instance) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      return i18nInternal.__getInstance(instance) || i18n.global;
    } else {
      const vueI18n = i18nInternal.__getInstance(instance);
      return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
    }
  }
  function vTDirective(i18n) {
    const bind = (el, { instance, value, modifiers }) => {
      if (!instance || !instance.$) {
        throw createI18nError(22);
      }
      const composer = getComposer$2(i18n, instance.$);
      if (modifiers.preserve) {
        warn(getWarnMessage(7));
      }
      const parsedValue = parseValue(value);
      el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
      beforeMount: bind,
      beforeUpdate: bind
    };
  }
  function parseValue(value) {
    if (isString(value)) {
      return { path: value };
    } else if (isPlainObject(value)) {
      if (!("path" in value)) {
        throw createI18nError(19, "path");
      }
      return value;
    } else {
      throw createI18nError(20);
    }
  }
  function makeParams(value) {
    const { path, locale, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (isString(locale)) {
      options.locale = locale;
    }
    if (isNumber(choice)) {
      options.plural = choice;
    }
    if (isNumber(plural)) {
      options.plural = plural;
    }
    return [path, named, options];
  }
  function apply(app, i18n, ...options) {
    const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
    if (globalInstall && useI18nComponentName) {
      warn(getWarnMessage(11, {
        name: Translation.name
      }));
    }
    if (globalInstall) {
      app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
      app.component(NumberFormat.name, NumberFormat);
      app.component(DatetimeFormat.name, DatetimeFormat);
    }
    app.directive("t", vTDirective(i18n));
  }
  const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
  let devtoolsApi;
  async function enableDevTools(app, i18n) {
    return new Promise((resolve, reject) => {
      try {
        setupDevtoolsPlugin({
          id: "vue-devtools-plugin-vue-i18n",
          label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n"],
          packageName: "vue-i18n",
          homepage: "https://vue-i18n.intlify.dev",
          logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
          componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
          app
        }, (api) => {
          devtoolsApi = api;
          api.on.visitComponentTree(({ componentInstance, treeNode }) => {
            updateComponentTreeTags(componentInstance, treeNode, i18n);
          });
          api.on.inspectComponent(({ componentInstance, instanceData }) => {
            if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
              if (i18n.mode === "legacy") {
                if (componentInstance.vnode.el.__VUE_I18N__ !== i18n.global.__composer) {
                  inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                }
              } else {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            }
          });
          api.addInspector({
            id: "vue-i18n-resource-inspector",
            label: VueDevToolsLabels["vue-i18n-resource-inspector"],
            icon: "language",
            treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector"]
          });
          api.on.getInspectorTree((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              registerScope(payload, i18n);
            }
          });
          api.on.getInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              inspectScope(payload, i18n);
            }
          });
          api.on.editInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              editScope(payload, i18n);
            }
          });
          api.addTimelineLayer({
            id: "vue-i18n-timeline",
            label: VueDevToolsLabels["vue-i18n-timeline"],
            color: VueDevToolsTimelineColors["vue-i18n-timeline"]
          });
          resolve(true);
        });
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
  }
  function updateComponentTreeTags(instance, treeNode, i18n) {
    const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    if (instance && instance.vnode.el.__VUE_I18N__) {
      if (instance.vnode.el.__VUE_I18N__ !== global2) {
        const label = instance.type.name || instance.type.displayName || instance.type.__file;
        const tag = {
          label: `i18n (${label} Scope)`,
          textColor: 0,
          backgroundColor: 16764185
        };
        treeNode.tags.push(tag);
      }
    }
  }
  function inspectComposer(instanceData, composer) {
    const type = VUE_I18N_COMPONENT_TYPES;
    instanceData.state.push({
      type,
      key: "locale",
      editable: true,
      value: composer.locale.value
    });
    instanceData.state.push({
      type,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    });
    instanceData.state.push({
      type,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    });
    instanceData.state.push({
      type,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    });
    instanceData.state.push({
      type,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    });
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
  function getLocaleMessageValue(messages) {
    const value = {};
    Object.keys(messages).forEach((key) => {
      const v2 = messages[key];
      if (isFunction(v2) && "source" in v2) {
        value[key] = getMessageFunctionDetails(v2);
      } else if (isObject$2(v2)) {
        value[key] = getLocaleMessageValue(v2);
      } else {
        value[key] = v2;
      }
    });
    return value;
  }
  const ESC = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "&": "&amp;"
  };
  function escape$1(s2) {
    return s2.replace(/[<>"&]/g, escapeChar);
  }
  function escapeChar(a2) {
    return ESC[a2] || a2;
  }
  function getMessageFunctionDetails(func) {
    const argString = func.source ? `("${escape$1(func.source)}")` : `(?)`;
    return {
      _custom: {
        type: "function",
        display: `<span>\u0192</span> ${argString}`
      }
    };
  }
  function registerScope(payload, i18n) {
    payload.rootNodes.push({
      id: "global",
      label: "Global Scope"
    });
    const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    for (const [keyInstance, instance] of i18n.__instances) {
      const composer = i18n.mode === "composition" ? instance : instance.__composer;
      if (global2 === composer) {
        continue;
      }
      const label = keyInstance.type.name || keyInstance.type.displayName || keyInstance.type.__file;
      payload.rootNodes.push({
        id: composer.id.toString(),
        label: `${label} Scope`
      });
    }
  }
  function getComposer$1(nodeId, i18n) {
    if (nodeId === "global") {
      return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    } else {
      const instance = Array.from(i18n.__instances.values()).find((item) => item.id.toString() === nodeId);
      if (instance) {
        return i18n.mode === "composition" ? instance : instance.__composer;
      } else {
        return null;
      }
    }
  }
  function inspectScope(payload, i18n) {
    const composer = getComposer$1(payload.nodeId, i18n);
    if (composer) {
      payload.state = makeScopeInspectState(composer);
    }
  }
  function makeScopeInspectState(composer) {
    const state = {};
    const localeType = "Locale related info";
    const localeStates = [
      {
        type: localeType,
        key: "locale",
        editable: true,
        value: composer.locale.value
      },
      {
        type: localeType,
        key: "fallbackLocale",
        editable: true,
        value: composer.fallbackLocale.value
      },
      {
        type: localeType,
        key: "availableLocales",
        editable: false,
        value: composer.availableLocales
      },
      {
        type: localeType,
        key: "inheritLocale",
        editable: true,
        value: composer.inheritLocale
      }
    ];
    state[localeType] = localeStates;
    const localeMessagesType = "Locale messages info";
    const localeMessagesStates = [
      {
        type: localeMessagesType,
        key: "messages",
        editable: false,
        value: getLocaleMessageValue(composer.messages.value)
      }
    ];
    state[localeMessagesType] = localeMessagesStates;
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
    return state;
  }
  function addTimelineEvent(event, payload) {
    if (devtoolsApi) {
      let groupId;
      if (payload && "groupId" in payload) {
        groupId = payload.groupId;
        delete payload.groupId;
      }
      devtoolsApi.addTimelineEvent({
        layerId: "vue-i18n-timeline",
        event: {
          title: event,
          groupId,
          time: Date.now(),
          meta: {},
          data: payload || {},
          logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
        }
      });
    }
  }
  function editScope(payload, i18n) {
    const composer = getComposer$1(payload.nodeId, i18n);
    if (composer) {
      const [field] = payload.path;
      if (field === "locale" && isString(payload.state.value)) {
        composer.locale.value = payload.state.value;
      } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject$2(payload.state.value))) {
        composer.fallbackLocale.value = payload.state.value;
      } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
        composer.inheritLocale = payload.state.value;
      }
    }
  }
  function defineMixin(vuei18n, composer, i18n) {
    return {
      beforeCreate() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(22);
        }
        const options = this.$options;
        if (options.i18n) {
          const optionsI18n = options.i18n;
          if (options.__i18n) {
            optionsI18n.__i18n = options.__i18n;
          }
          optionsI18n.__root = composer;
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, optionsI18n);
          } else {
            optionsI18n.__injectWithOption = true;
            this.$i18n = createVueI18n(optionsI18n);
          }
        } else if (options.__i18n) {
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, options);
          } else {
            this.$i18n = createVueI18n({
              __i18n: options.__i18n,
              __injectWithOption: true,
              __root: composer
            });
          }
        } else {
          this.$i18n = vuei18n;
        }
        vuei18n.__onComponentInstanceCreated(this.$i18n);
        i18n.__setInstance(instance, this.$i18n);
        this.$t = (...args) => this.$i18n.t(...args);
        this.$rt = (...args) => this.$i18n.rt(...args);
        this.$tc = (...args) => this.$i18n.tc(...args);
        this.$te = (key, locale) => this.$i18n.te(key, locale);
        this.$d = (...args) => this.$i18n.d(...args);
        this.$n = (...args) => this.$i18n.n(...args);
        this.$tm = (key) => this.$i18n.tm(key);
      },
      mounted() {
        {
          this.$el.__VUE_I18N__ = this.$i18n.__composer;
          const emitter = this.__v_emitter = createEmitter();
          const _vueI18n = this.$i18n;
          _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          emitter.on("*", addTimelineEvent);
        }
      },
      beforeUnmount() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(22);
        }
        {
          if (this.__v_emitter) {
            this.__v_emitter.off("*", addTimelineEvent);
            delete this.__v_emitter;
          }
          const _vueI18n = this.$i18n;
          _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
          delete this.$el.__VUE_I18N__;
        }
        delete this.$t;
        delete this.$rt;
        delete this.$tc;
        delete this.$te;
        delete this.$d;
        delete this.$n;
        delete this.$tm;
        i18n.__deleteInstance(instance);
        delete this.$i18n;
      }
    };
  }
  function mergeToRoot(root, options) {
    root.locale = options.locale || root.locale;
    root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
    root.missing = options.missing || root.missing;
    root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = options.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = options.sync || root.sync;
    root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
    const messages = getLocaleMessages(root.locale, {
      messages: options.messages,
      __i18n: options.__i18n
    });
    Object.keys(messages).forEach((locale) => root.mergeLocaleMessage(locale, messages[locale]));
    if (options.datetimeFormats) {
      Object.keys(options.datetimeFormats).forEach((locale) => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
    }
    if (options.numberFormats) {
      Object.keys(options.numberFormats).forEach((locale) => root.mergeNumberFormat(locale, options.numberFormats[locale]));
    }
    return root;
  }
  function createI18n(options = {}) {
    const __legacyMode = isBoolean(options.legacy) ? options.legacy : true;
    const __globalInjection = !!options.globalInjection;
    const __instances = /* @__PURE__ */ new Map();
    const __global = __legacyMode ? createVueI18n(options) : createComposer(options);
    const symbol = makeSymbol("vue-i18n");
    const i18n = {
      get mode() {
        return __legacyMode ? "legacy" : "composition";
      },
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n);
        if (!__legacyMode && __globalInjection) {
          injectGlobalFields(app, i18n.global);
        }
        {
          apply(app, i18n, ...options2);
        }
        if (__legacyMode) {
          app.mixin(defineMixin(__global, __global.__composer, i18n));
        }
        {
          const ret = await enableDevTools(app, i18n);
          if (!ret) {
            throw createI18nError(21);
          }
          const emitter = createEmitter();
          if (__legacyMode) {
            const _vueI18n = __global;
            _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          } else {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      get global() {
        return __global;
      },
      __instances,
      __getInstance(component) {
        return __instances.get(component) || null;
      },
      __setInstance(component, instance) {
        __instances.set(component, instance);
      },
      __deleteInstance(component) {
        __instances.delete(component);
      }
    };
    return i18n;
  }
  function useI18n(options = {}) {
    const instance = vue.getCurrentInstance();
    if (instance == null) {
      throw createI18nError(16);
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
      throw createI18nError(17);
    }
    const i18n = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
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
    vue.onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    vue.onUnmounted(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n.__deleteInstance(target);
    }, target);
  }
  const globalExportProps = [
    "locale",
    "fallbackLocale",
    "availableLocales"
  ];
  const globalExportMethods = ["t", "rt", "d", "n", "tm"];
  function injectGlobalFields(app, composer) {
    const i18n = /* @__PURE__ */ Object.create(null);
    globalExportProps.forEach((prop) => {
      const desc = Object.getOwnPropertyDescriptor(composer, prop);
      if (!desc) {
        throw createI18nError(22);
      }
      const wrap = vue.isRef(desc.value) ? {
        get() {
          return desc.value.value;
        },
        set(val) {
          desc.value.value = val;
        }
      } : {
        get() {
          return desc.get && desc.get();
        }
      };
      Object.defineProperty(i18n, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n;
    globalExportMethods.forEach((method) => {
      const desc = Object.getOwnPropertyDescriptor(composer, method);
      if (!desc || !desc.value) {
        throw createI18nError(22);
      }
      Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
  }
  {
    initFeatureFlags();
  }
  {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  const language = function(key) {
    const messages = {
      en: en$1,
      "zh-Hans": zhHans
    };
    let i18nConfig = {
      locale: uni.getLocale(),
      messages
    };
    const i18n = createI18n(i18nConfig);
    return i18n.global.t(key);
  };
  const languageByGlobal = function() {
    const messages = {
      en: en$1,
      "zh-Hans": zhHans
    };
    let i18nConfig = {
      locale: uni.getLocale(),
      messages
    };
    const i18n = createI18n(i18nConfig);
    return i18n;
  };
  const _sfc_main$y = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-overlay",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2, _d, _e2, _f, _g, _h, _i;
      const props = __props;
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = computedStyle(props);
      const customClass = computedClass(props);
      const width = vue.ref(0);
      const height = vue.ref(0);
      const top = vue.ref(0);
      vue.ref(false);
      uni.$tm.u.getUid(1);
      const sysinfo = uni.getSystemInfoSync();
      width.value = sysinfo.windowWidth;
      height.value = sysinfo.windowHeight;
      uni.hideKeyboard();
      let nowPage = getCurrentPages().pop();
      let isCustomHeader = false;
      for (let i2 = 0; i2 < uni.$tm.pages.length; i2++) {
        if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i2].path && uni.$tm.pages[i2].custom == "custom") {
          isCustomHeader = true;
          break;
        }
      }
      sysinfo.windowHeight + sysinfo.windowTop;
      if (!isCustomHeader) {
        height.value = ((_d = (_c2 = sysinfo.safeArea) == null ? void 0 : _c2.height) != null ? _d : sysinfo.windowHeight) - 44;
      } else {
        height.value = ((_f = (_e2 = sysinfo.safeArea) == null ? void 0 : _e2.height) != null ? _f : sysinfo.windowHeight) + ((_g = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _g : 0) + ((_i = (_h = sysinfo.safeAreaInsets) == null ? void 0 : _h.bottom) != null ? _i : 0);
      }
      let timerId = NaN;
      const animationData = vue.ref(null);
      const showMask = vue.ref(false);
      vue.onUnmounted(() => clearTimeout(timerId));
      const align_rpx = vue.computed(() => props.align);
      const bgColor_rp = vue.computed(() => {
        if (!props.bgColor || props.transprent)
          return "rgba(0,0,0,0)";
        return props.bgColor || "rgba(0,0,0,0.2)";
      });
      vue.onMounted(() => {
        if (!props.show)
          return;
        open2(props.show);
      });
      function debounce2(func, wait = 500, immediate = false) {
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
        debounce2(() => {
          if (!props.overlayClick)
            return;
          open2(false);
        }, 250, true);
      }
      function open2(off) {
        if (off == true) {
          uni.hideKeyboard();
        }
        fadeInVue(off);
      }
      function fadeInVue(off = false) {
        debounce2(function() {
          let animation2 = uni.createAnimation({
            duration: props.duration || 1,
            timingFunction: "ease",
            delay: 0
          });
          animation2.opacity(off ? 1 : 0).step();
          animationData.value = animation2.export();
          if (off == false) {
            if (showMask.value == off)
              return;
            showMask.value = off;
            emits("close");
            emits("update:show", false);
          } else {
            showMask.value = off;
            emits("open");
          }
        }, props.duration || 1, false);
      }
      vue.watch(() => props.show, (newval) => {
        open2(newval);
      });
      expose({ close, open: open2 });
      return (_ctx, _cache) => {
        return showMask.value ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          ref: "overlay",
          onClick: vue.withModifiers(close, ["stop"]),
          class: vue.normalizeClass([vue.unref(bgColor_rp) && !props.transprent ? "blurbg" : "", vue.unref(align_rpx), " navbarheight flex flex-col  l-0  ", vue.unref(customClass)]),
          style: vue.normalizeStyle([
            vue.unref(bgColor_rp) && !props.transprent ? { backgroundColor: showMask.value ? vue.unref(bgColor_rp) : "" } : "",
            { position: "fixed" },
            __props.zIndex ? { zIndex: __props.zIndex } : "",
            { width: width.value + "px", height: height.value + "px", top: top.value + "px" },
            vue.unref(customCSSStyle)
          ]),
          animation: animationData.value
        }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 14, ["onClick", "animation"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var tmOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-cf63bea2"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-overlay/tm-overlay.vue"]]);
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
  const _sfc_main$x = /* @__PURE__ */ vue.defineComponent({
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
      const tranAni = vue.ref(null);
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const uid = vue.ref(uni.$tm.u.getUid(5));
      const bgColor = vue.ref("white");
      const model_ref = vue.ref(modelType.info);
      const showValue = vue.ref(false);
      const icon_ref = vue.ref("");
      const text_ref = vue.ref("");
      const color_ref = vue.ref("");
      const reverse = vue.ref(false);
      const dur = vue.ref(0);
      const initByWechat = vue.ref(true);
      const showMask = vue.ref(props.mask);
      const dark_ref = vue.ref(false);
      vue.onUnmounted(() => clearTimeout(uid.value));
      vue.watch(() => props.mask, (val) => showMask.value = val);
      let zindex = {};
      zindex = { zIndex: "1000 !important" };
      const modelIcon = vue.computed(() => {
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
        var _a3, _b3;
        (_a3 = tranAni.value) == null ? void 0 : _a3.stop();
        (_b3 = tranAni.value) == null ? void 0 : _b3.reset();
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
          var _a3;
          (_a3 = tranAni.value) == null ? void 0 : _a3.play();
        }, 80);
      }
      function hide() {
        showValue.value = false;
      }
      expose({ show, hide });
      return (_ctx, _cache) => {
        return showValue.value ? (vue.openBlock(), vue.createBlock(tmOverlay, {
          key: 0,
          blur: "",
          duration: 0,
          transprent: !showMask.value,
          _style: vue.unref(zindex),
          overlayClick: false,
          show: showValue.value,
          "onUpdate:show": _cache[0] || (_cache[0] = ($event) => showValue.value = $event)
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(tmTranslate, {
              initByWechat: initByWechat.value,
              onEnd: msgOver,
              reverse: reverse.value,
              ref_key: "tranAni",
              ref: tranAni,
              name: "zoom",
              duration: 160,
              "auto-play": false
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(tmSheet, {
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
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", {
                      class: "flex flex-center flex-col ma-30",
                      style: { "line-height": "normal" }
                    }, [
                      vue.createVNode(tmIcon, {
                        _style: "line-height: normal",
                        style: { "line-height": "normal" },
                        _class: "pa-10",
                        spin: model_ref.value == "load",
                        color: color_ref.value,
                        fontSize: 72,
                        name: icon_ref.value
                      }, null, 8, ["spin", "color", "name"]),
                      vue.createVNode(tmText, {
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
        }, 8, ["transprent", "_style", "show"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var tmMessage = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-message/tm-message.vue"]]);
  const _sfc_main$w = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props) {
      const store = useTmpiniaStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const str = vue.ref("");
      vue.ref(false);
      vue.ref("#60ab41");
      vue.ref("darkGreen");
      vue.ref(false);
      const xh2 = vue.ref(Object);
      const sjh = vue.ref("");
      const next = vue.ref(false);
      const ts = vue.ref("\u8BF7\u8865\u5168\u4F60\u7684\u624B\u673A\u53F7");
      function getNum() {
        request$2.httpRequest({
          url: "getInfo/s/" + xh2.value
        }, {}).then((res) => {
          formatAppLog("log", "at pages/login/login.vue:87", res);
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
        request$2.httpRequest({
          url: "wx/user/applogin/v2",
          method: "POST"
        }, {
          username: xh2.value,
          code: null,
          password: sjh.value,
          uuid: null
        }).then((res) => {
          if (res.data.code === 200) {
            uni.setStorage({
              key: "login_id",
              data: true
            });
            uni.setStorage({
              key: "xh",
              data: res.data.data.xh
            });
            uni.setStorage({
              key: "userinfo",
              data: res.data.data.userinfo
            });
            uni.setStorage({
              key: "token",
              data: res.data.data.token,
              success: () => {
                uni.switchTab({
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
        const _component_tm_icon = resolveEasycom(vue.resolveDynamicComponent("tm-icon"), tmIcon);
        const _component_tm_navbar = resolveEasycom(vue.resolveDynamicComponent("tm-navbar"), __easycom_0$5);
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), tmButton);
        const _component_tm_image = resolveEasycom(vue.resolveDynamicComponent("tm-image"), __easycom_2);
        const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), tmText);
        const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), tmSheet);
        const _component_tm_divider = resolveEasycom(vue.resolveDynamicComponent("tm-divider"), tmDivider);
        const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_0$4);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), tmApp);
        return vue.openBlock(), vue.createBlock(_component_tm_app, { ref: "app" }, {
          default: vue.withCtx(() => [
            vue.createVNode(tmMessage, { ref: "msg" }, null, 512),
            vue.createVNode(_component_tm_navbar, {
              title: "CDTU \u638C\u4E0A\u6210\u5DE5",
              shadow: 0,
              "hide-home": ""
            }, {
              left: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "flex flex-center flex-row" }, [
                  vue.createElementVNode("navigator", {
                    url: "settheme",
                    class: "pl-10 pr-12"
                  }, [
                    vue.createVNode(_component_tm_icon, {
                      "font-size": 32,
                      name: "tmicon-cog-fill"
                    })
                  ]),
                  vue.createVNode(_component_tm_icon, {
                    onClick: _ctx.onChangeDark,
                    color: vue.unref(store).tmStore.dark ? "yellow" : "",
                    _class: "pl-32",
                    "font-size": 42,
                    name: "tmicon-ios-sunny"
                  }, null, 8, ["onClick", "color"])
                ])
              ]),
              _: 1
            }),
            vue.createVNode(_component_tm_button, {
              margin: [12, 12],
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(proxy).$refs.msg.show()),
              color: "white",
              width: 120,
              height: 56,
              fontSize: 26,
              label: "\u9ED8\u8BA4"
            }),
            vue.createVNode(_component_tm_sheet, {
              margin: [0, 0],
              followTheme: true
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "flex-row flex-row-center-start pb-10" }, [
                  vue.createVNode(_component_tm_image, {
                    width: 108,
                    height: 67.5,
                    src: _ctx.logoimg
                  }, null, 8, ["height", "src"]),
                  vue.createElementVNode("view", {
                    class: "pl-16 flex-1",
                    style: { "width": "0px" }
                  }, [
                    vue.createVNode(_component_tm_text, {
                      _class: "text-weight-b",
                      "font-size": 36,
                      label: "\u638C\u4E0A\u6210\u5DE5 3.0.74"
                    }),
                    vue.createVNode(_component_tm_text, {
                      _class: "opacity-6",
                      label: "\u5168\u7AEF\u517C\u5BB9\u6559\u52A1 \u4E8C\u8BFE \u8981\u95FB\u516C\u544A"
                    })
                  ])
                ])
              ]),
              _: 1
            }),
            !next.value ? (vue.openBlock(), vue.createBlock(_component_tm_sheet, { key: 0 }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_tm_text, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
                }),
                vue.createVNode(_component_tm_divider),
                vue.createVNode(_component_tm_input, {
                  modelValue: xh2.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => xh2.value = $event)
                }, null, 8, ["modelValue"]),
                vue.createVNode(_component_tm_button, { onClick: getNum }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("\u4E0B\u4E00\u6B65")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })) : vue.createCommentVNode("v-if", true),
            next.value ? (vue.openBlock(), vue.createBlock(_component_tm_sheet, { key: 1 }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_tm_text, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: ts.value
                }, null, 8, ["label"]),
                vue.createVNode(_component_tm_divider),
                vue.createCommentVNode(' <tm-codeinput @click="show=true" :value="str"></tm-codeinput> '),
                vue.createVNode(_component_tm_input, {
                  prefixLabel: "\u8865\u5168\u5BC6\u7801",
                  margin: [0, 24],
                  modelValue: str.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => str.value = $event),
                  showCharNumber: "",
                  maxlength: 4
                }, null, 8, ["modelValue"]),
                vue.createVNode(_component_tm_button, {
                  onClick: _cache[3] || (_cache[3] = ($event) => login(str.value))
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("\u767B\u5F55")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(' <tm-keyborad  v-model:show="show" v-model="str"	></tm-keyborad> ')
          ]),
          _: 1
        }, 512);
      };
    }
  });
  var PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__file", "D:/Code/app/tmui-cli-zscg/src/pages/login/login.vue"]]);
  const _sfc_main$v = {
    data() {
      return {
        encryptedData: "",
        phoneIv: "",
        appid: "wx421dd1550095f40c"
      };
    },
    onLoad() {
    },
    methods: {
      login() {
        uni.getUserProfile({
          desc: "\u83B7\u53D6\u60A8\u7684\u5FAE\u4FE1\u4FE1\u606F\u4EE5\u6388\u6743\u5C0F\u7A0B\u5E8F",
          lang: "zh_CN",
          success: (res) => {
            formatAppLog("log", "at pages/login/wxLogin.vue:50", res);
            uni.login({
              provider: "weixin",
              success: function(res2) {
                formatAppLog("log", "at pages/login/wxLogin.vue:54", "----1:", res2.code);
                let opts = {
                  url: `wx/user/wx5a488e3a5f3cd592/login`,
                  method: "get"
                };
                let params = {
                  code: res2.code
                };
                formatAppLog("log", "at pages/login/wxLogin.vue:62", res2.code);
                request$2.httpRequest(opts, params).then((res3) => {
                  uni.setStorageSync("token", res3.data.data.token);
                  uni.setStorageSync("user", res3.data.data.user);
                  formatAppLog("log", "at pages/login/wxLogin.vue:68", "xh" + res3.data.data.user.xh);
                });
                if (xh == null) {
                  uni.showToast({
                    title: "\u9996\u6B21\u767B\u5F55,\u8BF7\u5148\u7ED1\u5B9A\u5B66\u53F7",
                    icon: "none",
                    complete: function() {
                      uni.reLaunch({
                        url: "/pages/me/setNumber/setNumber"
                      });
                    }
                  });
                }
              }
            });
          },
          fail: (err) => {
            formatAppLog("log", "at pages/login/wxLogin.vue:86", err);
          }
        });
      },
      goBack() {
        uni.navigateBack({
          delta: 1
        });
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "mainBox bg-white" }, [
      vue.createElementVNode("view", {
        class: "text-xxl",
        style: { "height": "486rpx", "position": "relative" }
      }, [
        vue.createElementVNode("image", {
          src: "https://cdn.zhoukaiwen.com/login_top2.jpg",
          mode: "widthFix",
          class: "png",
          style: { "width": "100%", "height": "486rpx" }
        }),
        vue.createElementVNode("text", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goBack && $options.goBack(...args)),
          class: "cuIcon-back",
          style: { "position": "absolute", "left": "40rpx", "top": "100rpx", "color": "#000000" }
        }),
        vue.createElementVNode("image", {
          class: "logoImg",
          src: "/static/logo.png"
        }),
        vue.createElementVNode("view", { class: "logoName text-white text-bold text-xl" }, "\u524D\u7AEF\u94FA\u5B50")
      ]),
      vue.createElementVNode("view", { class: "padding text-center margin-top-xl" }, [
        vue.createElementVNode("view", { class: "padding-xl radius shadow-warp bg-white margin-top" }, [
          vue.createElementVNode("view", { class: "text-bold text-black text-xl" }, "\u524D\u7AEF\u94FA\u5B50"),
          vue.createElementVNode("view", { class: "describe margin-top-sm" }, "\u8FD9\u662F\u4E00\u6BB5\u63CF\u8FF0\uFF0C\u300C\u524D\u7AEF\u94FA\u5B50\u300D\u6388\u6743\u767B\u5F55\u9875\u9762\uFF0CUI\u6A21\u4EFF\u56FE\u9E1FUI\uFF0C\u611F\u8C22\u4F5C\u8005\u5F00\u6E90\u3002"),
          vue.createElementVNode("button", {
            class: "margin-top-lg bg-gradual-blue",
            type: "primary",
            lang: "zh_CN",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.login())
          }, "\u6388\u6743\u767B\u5F55"),
          vue.createElementVNode("button", {
            class: "margin-top bg-gradual-red",
            type: "warn",
            lang: "zh_CN",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.goBack())
          }, "\u6211\u518D\u770B\u770B"),
          vue.createElementVNode("view", { class: "describe margin-top text-gray" }, "\u6388\u6743\u4FE1\u606F\u4EC5\u7528\u4E8E\u6D4B\u8BD5\u5C0F\u7A0B\u5E8F\u767B\u5F55"),
          vue.createElementVNode("view", { class: "describe margin-top-xs text-gray" }, "\u5934\u50CF\u548C\u6635\u79F0\u4EC5\u7528\u4E8E\u6D4B\u8BD5\u6570\u529F\u80FD\u5C55\u793A")
        ])
      ]),
      vue.createElementVNode("view", { class: "bottom_bg" }, [
        vue.createElementVNode("image", {
          src: "https://cdn.zhoukaiwen.com/login_bottom_bg.jpg",
          mode: "widthFix"
        })
      ])
    ]);
  }
  var PagesLoginWxLogin = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$p], ["__scopeId", "data-v-912988e4"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/login/wxLogin.vue"]]);
  const _sfc_main$u = {
    data() {
      return {
        webviewStyles: {
          progress: {
            color: ""
          }
        }
      };
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("web-view", {
        "webview-styles": $data.webviewStyles,
        src: "http://192.168.31.164:9999/h5/"
      }, null, 8, ["webview-styles"])
    ]);
  }
  var PagesBizhiBizhi = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$o], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/bizhi/bizhi.vue"]]);
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
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
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
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
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
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
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
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
  class I18n {
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
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
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
  }
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
  const easycom = {
    autoscan: true,
    custom: {
      "^tm-(.*)": "@/tmui/components/tm-$1/tm-$1.vue"
    }
  };
  const pages$1 = [
    {
      path: "pages/index/index",
      style: {
        navigationBarTitleText: "\u638C\u4E0A\u6210\u5DE5",
        navigationStyle: "custom",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/index/search",
      style: {
        navigationBarTitleText: "\u638C\u4E0A\u6210\u5DE5",
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/news/news",
      style: {
        navigationBarTitleText: "\u6210\u5DE5\u8981\u95FB",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/login/login",
      style: {
        navigationBarTitleText: "\u638C\u4E0A\u6210\u5DE5",
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/erke/erke",
      style: {
        navigationBarTitleText: "\u4E8C\u8BFE",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/kebiao/index",
      style: {
        navigationBarTitleText: "\u8BFE\u8868",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/login/wxLogin",
      style: {
        navigationBarTitleText: "\u5FAE\u4FE1\u767B\u9646",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/bizhi/bizhi",
      style: {
        navigationBarTitleText: "\u58C1\u7EB8"
      }
    },
    {
      path: "pages/bizhi/infotp",
      style: {
        navigationBarTitleText: "\u4E8C\u8BFE",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/news/detail/detail",
      style: {
        navigationBarTitleText: "\u65B0\u95FB\u8BE6\u60C5\u9875",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/luntan/luntan",
      style: {
        navigationBarTitleText: "\u793E\u533A",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/webview/webview",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/webview/webview_f",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/webview/webview_w",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/webview/webview_jw/index",
      style: {
        navigationBarTitleText: "\u6B63\u5728\u52A0\u8F7D\u4E2D..."
      }
    },
    {
      path: "pages/me/me2/me2",
      style: {
        navigationBarTitleText: "",
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/me/abme/abme",
      style: {
        navigationBarTitleText: "\u5173\u4E8E\u4F5C\u8005"
      }
    },
    {
      path: "pages/me/editme",
      style: {
        navigationBarTitleText: "\u4FE1\u606F\u4FEE\u6539",
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/tool/barrage/start",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/tool/barrage/barrage",
      style: {
        navigationBarTitleText: "\u624B\u6301\u5F39\u5E55",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/tool/jp/jp",
      style: {
        navigationBarTitleText: "\u6559\u52A1\u8BC4\u4EF7",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/tool/phoneSign/phoneSign",
      style: {
        navigationBarTitleText: "\u7B7E\u540D",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/tool/getTeacherNumber",
      style: {
        navigationBarTitleText: "\u6559\u5E08\u67E5\u8BE2",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/tool/historyDeatil",
      style: {
        navigationBarTitleText: "\u5386\u53F2\u4E0A\u7684\u4ECA\u5929",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/tool/eventHistory",
      style: {
        navigationBarTitleText: "\u5386\u53F2\u4E0A\u7684\u4ECA\u5929",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/news/search/index",
      style: {
        navigationBarTitleText: "search"
      }
    },
    {
      path: "pages/webview/webwiew_erke/index",
      style: {
        navigationBarTitleText: "\u9752\u6625\u6210\u5DE5"
      }
    },
    {
      path: "pages/webview/wb_ek1",
      style: {
        navigationBarTitleText: "\u4E8C\u8BFE\u62A5\u540D"
      }
    }
  ];
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#FFFFFF",
    backgroundColor: "#FFFFFF"
  };
  const tabBar$1 = {
    custom: true,
    list: [
      {
        pagePath: "pages/index/index"
      },
      {
        pagePath: "pages/news/news"
      },
      {
        pagePath: "pages/erke/erke"
      },
      {
        pagePath: "pages/kebiao/index"
      },
      {
        pagePath: "pages/me/me2/me2"
      }
    ]
  };
  var PageJsonInit = {
    easycom,
    pages: pages$1,
    globalStyle,
    tabBar: tabBar$1
  };
  function n(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  function s(e, t, n2) {
    return e(n2 = { path: t, exports: {}, require: function(e2, t2) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(t2 == null && n2.path);
    } }, n2.exports), n2.exports;
  }
  var o = s(function(e, t) {
    var n2;
    e.exports = (n2 = n2 || function(e2, t2) {
      var n3 = Object.create || function() {
        function e3() {
        }
        return function(t3) {
          var n4;
          return e3.prototype = t3, n4 = new e3(), e3.prototype = null, n4;
        };
      }(), s2 = {}, o2 = s2.lib = {}, r2 = o2.Base = { extend: function(e3) {
        var t3 = n3(this);
        return e3 && t3.mixIn(e3), t3.hasOwnProperty("init") && this.init !== t3.init || (t3.init = function() {
          t3.$super.init.apply(this, arguments);
        }), t3.init.prototype = t3, t3.$super = this, t3;
      }, create: function() {
        var e3 = this.extend();
        return e3.init.apply(e3, arguments), e3;
      }, init: function() {
      }, mixIn: function(e3) {
        for (var t3 in e3)
          e3.hasOwnProperty(t3) && (this[t3] = e3[t3]);
        e3.hasOwnProperty("toString") && (this.toString = e3.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, i2 = o2.WordArray = r2.extend({ init: function(e3, n4) {
        e3 = this.words = e3 || [], this.sigBytes = n4 != t2 ? n4 : 4 * e3.length;
      }, toString: function(e3) {
        return (e3 || c2).stringify(this);
      }, concat: function(e3) {
        var t3 = this.words, n4 = e3.words, s3 = this.sigBytes, o3 = e3.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var r3 = 0; r3 < o3; r3++) {
            var i3 = n4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
            t3[s3 + r3 >>> 2] |= i3 << 24 - (s3 + r3) % 4 * 8;
          }
        else
          for (r3 = 0; r3 < o3; r3 += 4)
            t3[s3 + r3 >>> 2] = n4[r3 >>> 2];
        return this.sigBytes += o3, this;
      }, clamp: function() {
        var t3 = this.words, n4 = this.sigBytes;
        t3[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t3.length = e2.ceil(n4 / 4);
      }, clone: function() {
        var e3 = r2.clone.call(this);
        return e3.words = this.words.slice(0), e3;
      }, random: function(t3) {
        for (var n4, s3 = [], o3 = function(t4) {
          t4 = t4;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var o4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t4 = 18e3 * (65535 & t4) + (t4 >> 16) & s4) & s4;
            return o4 /= 4294967296, (o4 += 0.5) * (e2.random() > 0.5 ? 1 : -1);
          };
        }, r3 = 0; r3 < t3; r3 += 4) {
          var a3 = o3(4294967296 * (n4 || e2.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new i2.init(s3, t3);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e3) {
        for (var t3 = e3.words, n4 = e3.sigBytes, s3 = [], o3 = 0; o3 < n4; o3++) {
          var r3 = t3[o3 >>> 2] >>> 24 - o3 % 4 * 8 & 255;
          s3.push((r3 >>> 4).toString(16)), s3.push((15 & r3).toString(16));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t3 = e3.length, n4 = [], s3 = 0; s3 < t3; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e3.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new i2.init(n4, t3 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e3) {
        for (var t3 = e3.words, n4 = e3.sigBytes, s3 = [], o3 = 0; o3 < n4; o3++) {
          var r3 = t3[o3 >>> 2] >>> 24 - o3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(r3));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t3 = e3.length, n4 = [], s3 = 0; s3 < t3; s3++)
          n4[s3 >>> 2] |= (255 & e3.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new i2.init(n4, t3);
      } }, l2 = a2.Utf8 = { stringify: function(e3) {
        try {
          return decodeURIComponent(escape(u2.stringify(e3)));
        } catch (e4) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e3) {
        return u2.parse(unescape(encodeURIComponent(e3)));
      } }, h2 = o2.BufferedBlockAlgorithm = r2.extend({ reset: function() {
        this._data = new i2.init(), this._nDataBytes = 0;
      }, _append: function(e3) {
        typeof e3 == "string" && (e3 = l2.parse(e3)), this._data.concat(e3), this._nDataBytes += e3.sigBytes;
      }, _process: function(t3) {
        var n4 = this._data, s3 = n4.words, o3 = n4.sigBytes, r3 = this.blockSize, a3 = o3 / (4 * r3), c3 = (a3 = t3 ? e2.ceil(a3) : e2.max((0 | a3) - this._minBufferSize, 0)) * r3, u3 = e2.min(4 * c3, o3);
        if (c3) {
          for (var l3 = 0; l3 < c3; l3 += r3)
            this._doProcessBlock(s3, l3);
          var h3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new i2.init(h3, u3);
      }, clone: function() {
        var e3 = r2.clone.call(this);
        return e3._data = this._data.clone(), e3;
      }, _minBufferSize: 0 });
      o2.Hasher = h2.extend({ cfg: r2.extend(), init: function(e3) {
        this.cfg = this.cfg.extend(e3), this.reset();
      }, reset: function() {
        h2.reset.call(this), this._doReset();
      }, update: function(e3) {
        return this._append(e3), this._process(), this;
      }, finalize: function(e3) {
        return e3 && this._append(e3), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e3) {
        return function(t3, n4) {
          return new e3.init(n4).finalize(t3);
        };
      }, _createHmacHelper: function(e3) {
        return function(t3, n4) {
          return new d2.HMAC.init(e3, n4).finalize(t3);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), r = (s(function(e, t) {
    var n2;
    e.exports = (n2 = o, function(e2) {
      var t2 = n2, s2 = t2.lib, o2 = s2.WordArray, r2 = s2.Hasher, i2 = t2.algo, a2 = [];
      !function() {
        for (var t3 = 0; t3 < 64; t3++)
          a2[t3] = 4294967296 * e2.abs(e2.sin(t3 + 1)) | 0;
      }();
      var c2 = i2.MD5 = r2.extend({ _doReset: function() {
        this._hash = new o2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e3, t3) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t3 + n3, o3 = e3[s3];
          e3[s3] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8);
        }
        var r3 = this._hash.words, i3 = e3[t3 + 0], c3 = e3[t3 + 1], f2 = e3[t3 + 2], g2 = e3[t3 + 3], p2 = e3[t3 + 4], m2 = e3[t3 + 5], y = e3[t3 + 6], _2 = e3[t3 + 7], w2 = e3[t3 + 8], k2 = e3[t3 + 9], T2 = e3[t3 + 10], S2 = e3[t3 + 11], v2 = e3[t3 + 12], A2 = e3[t3 + 13], P2 = e3[t3 + 14], I2 = e3[t3 + 15], b2 = r3[0], O2 = r3[1], C2 = r3[2], E2 = r3[3];
        b2 = u2(b2, O2, C2, E2, i3, 7, a2[0]), E2 = u2(E2, b2, O2, C2, c3, 12, a2[1]), C2 = u2(C2, E2, b2, O2, f2, 17, a2[2]), O2 = u2(O2, C2, E2, b2, g2, 22, a2[3]), b2 = u2(b2, O2, C2, E2, p2, 7, a2[4]), E2 = u2(E2, b2, O2, C2, m2, 12, a2[5]), C2 = u2(C2, E2, b2, O2, y, 17, a2[6]), O2 = u2(O2, C2, E2, b2, _2, 22, a2[7]), b2 = u2(b2, O2, C2, E2, w2, 7, a2[8]), E2 = u2(E2, b2, O2, C2, k2, 12, a2[9]), C2 = u2(C2, E2, b2, O2, T2, 17, a2[10]), O2 = u2(O2, C2, E2, b2, S2, 22, a2[11]), b2 = u2(b2, O2, C2, E2, v2, 7, a2[12]), E2 = u2(E2, b2, O2, C2, A2, 12, a2[13]), C2 = u2(C2, E2, b2, O2, P2, 17, a2[14]), b2 = l2(b2, O2 = u2(O2, C2, E2, b2, I2, 22, a2[15]), C2, E2, c3, 5, a2[16]), E2 = l2(E2, b2, O2, C2, y, 9, a2[17]), C2 = l2(C2, E2, b2, O2, S2, 14, a2[18]), O2 = l2(O2, C2, E2, b2, i3, 20, a2[19]), b2 = l2(b2, O2, C2, E2, m2, 5, a2[20]), E2 = l2(E2, b2, O2, C2, T2, 9, a2[21]), C2 = l2(C2, E2, b2, O2, I2, 14, a2[22]), O2 = l2(O2, C2, E2, b2, p2, 20, a2[23]), b2 = l2(b2, O2, C2, E2, k2, 5, a2[24]), E2 = l2(E2, b2, O2, C2, P2, 9, a2[25]), C2 = l2(C2, E2, b2, O2, g2, 14, a2[26]), O2 = l2(O2, C2, E2, b2, w2, 20, a2[27]), b2 = l2(b2, O2, C2, E2, A2, 5, a2[28]), E2 = l2(E2, b2, O2, C2, f2, 9, a2[29]), C2 = l2(C2, E2, b2, O2, _2, 14, a2[30]), b2 = h2(b2, O2 = l2(O2, C2, E2, b2, v2, 20, a2[31]), C2, E2, m2, 4, a2[32]), E2 = h2(E2, b2, O2, C2, w2, 11, a2[33]), C2 = h2(C2, E2, b2, O2, S2, 16, a2[34]), O2 = h2(O2, C2, E2, b2, P2, 23, a2[35]), b2 = h2(b2, O2, C2, E2, c3, 4, a2[36]), E2 = h2(E2, b2, O2, C2, p2, 11, a2[37]), C2 = h2(C2, E2, b2, O2, _2, 16, a2[38]), O2 = h2(O2, C2, E2, b2, T2, 23, a2[39]), b2 = h2(b2, O2, C2, E2, A2, 4, a2[40]), E2 = h2(E2, b2, O2, C2, i3, 11, a2[41]), C2 = h2(C2, E2, b2, O2, g2, 16, a2[42]), O2 = h2(O2, C2, E2, b2, y, 23, a2[43]), b2 = h2(b2, O2, C2, E2, k2, 4, a2[44]), E2 = h2(E2, b2, O2, C2, v2, 11, a2[45]), C2 = h2(C2, E2, b2, O2, I2, 16, a2[46]), b2 = d2(b2, O2 = h2(O2, C2, E2, b2, f2, 23, a2[47]), C2, E2, i3, 6, a2[48]), E2 = d2(E2, b2, O2, C2, _2, 10, a2[49]), C2 = d2(C2, E2, b2, O2, P2, 15, a2[50]), O2 = d2(O2, C2, E2, b2, m2, 21, a2[51]), b2 = d2(b2, O2, C2, E2, v2, 6, a2[52]), E2 = d2(E2, b2, O2, C2, g2, 10, a2[53]), C2 = d2(C2, E2, b2, O2, T2, 15, a2[54]), O2 = d2(O2, C2, E2, b2, c3, 21, a2[55]), b2 = d2(b2, O2, C2, E2, w2, 6, a2[56]), E2 = d2(E2, b2, O2, C2, I2, 10, a2[57]), C2 = d2(C2, E2, b2, O2, y, 15, a2[58]), O2 = d2(O2, C2, E2, b2, A2, 21, a2[59]), b2 = d2(b2, O2, C2, E2, p2, 6, a2[60]), E2 = d2(E2, b2, O2, C2, S2, 10, a2[61]), C2 = d2(C2, E2, b2, O2, f2, 15, a2[62]), O2 = d2(O2, C2, E2, b2, k2, 21, a2[63]), r3[0] = r3[0] + b2 | 0, r3[1] = r3[1] + O2 | 0, r3[2] = r3[2] + C2 | 0, r3[3] = r3[3] + E2 | 0;
      }, _doFinalize: function() {
        var t3 = this._data, n3 = t3.words, s3 = 8 * this._nDataBytes, o3 = 8 * t3.sigBytes;
        n3[o3 >>> 5] |= 128 << 24 - o3 % 32;
        var r3 = e2.floor(s3 / 4294967296), i3 = s3;
        n3[15 + (o3 + 64 >>> 9 << 4)] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8), n3[14 + (o3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), t3.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var l3 = c3[u3];
          c3[u3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e3 = r2.clone.call(this);
        return e3._hash = this._hash.clone(), e3;
      } });
      function u2(e3, t3, n3, s3, o3, r3, i3) {
        var a3 = e3 + (t3 & n3 | ~t3 & s3) + o3 + i3;
        return (a3 << r3 | a3 >>> 32 - r3) + t3;
      }
      function l2(e3, t3, n3, s3, o3, r3, i3) {
        var a3 = e3 + (t3 & s3 | n3 & ~s3) + o3 + i3;
        return (a3 << r3 | a3 >>> 32 - r3) + t3;
      }
      function h2(e3, t3, n3, s3, o3, r3, i3) {
        var a3 = e3 + (t3 ^ n3 ^ s3) + o3 + i3;
        return (a3 << r3 | a3 >>> 32 - r3) + t3;
      }
      function d2(e3, t3, n3, s3, o3, r3, i3) {
        var a3 = e3 + (n3 ^ (t3 | ~s3)) + o3 + i3;
        return (a3 << r3 | a3 >>> 32 - r3) + t3;
      }
      t2.MD5 = r2._createHelper(c2), t2.HmacMD5 = r2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), s(function(e, t) {
    var n2, s2, r2;
    e.exports = (s2 = (n2 = o).lib.Base, r2 = n2.enc.Utf8, void (n2.algo.HMAC = s2.extend({ init: function(e2, t2) {
      e2 = this._hasher = new e2.init(), typeof t2 == "string" && (t2 = r2.parse(t2));
      var n3 = e2.blockSize, s3 = 4 * n3;
      t2.sigBytes > s3 && (t2 = e2.finalize(t2)), t2.clamp();
      for (var o2 = this._oKey = t2.clone(), i2 = this._iKey = t2.clone(), a2 = o2.words, c2 = i2.words, u2 = 0; u2 < n3; u2++)
        a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
      o2.sigBytes = i2.sigBytes = s3, this.reset();
    }, reset: function() {
      var e2 = this._hasher;
      e2.reset(), e2.update(this._iKey);
    }, update: function(e2) {
      return this._hasher.update(e2), this;
    }, finalize: function(e2) {
      var t2 = this._hasher, n3 = t2.finalize(e2);
      return t2.reset(), t2.finalize(this._oKey.clone().concat(n3));
    } })));
  }), s(function(e, t) {
    e.exports = o.HmacMD5;
  }));
  const i = "FUNCTION", a = "OBJECT", c = "CLIENT_DB";
  function u(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
  }
  function l(e) {
    return u(e) === "object";
  }
  function h$1(e) {
    return e && typeof e == "string" ? JSON.parse(e) : e;
  }
  const d = true, f = "app";
  let g;
  switch (f) {
    case "h5":
      g = "web";
      break;
    case "app-plus":
      g = "app";
      break;
    default:
      g = f;
  }
  const p = h$1({}.UNICLOUD_DEBUG), m = h$1("[]");
  let _ = "";
  try {
    _ = "__UNI__96A1843";
  } catch (e) {
  }
  let w$1 = {};
  function k(e, t = {}) {
    var n2, s2;
    return n2 = w$1, s2 = e, Object.prototype.hasOwnProperty.call(n2, s2) || (w$1[e] = t), w$1[e];
  }
  g === "app" && (w$1 = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});
  const T = ["invoke", "success", "fail", "complete"], S = k("_globalUniCloudInterceptor");
  function v(e, t) {
    S[e] || (S[e] = {}), l(t) && Object.keys(t).forEach((n2) => {
      T.indexOf(n2) > -1 && function(e2, t2, n3) {
        let s2 = S[e2][t2];
        s2 || (s2 = S[e2][t2] = []), s2.indexOf(n3) === -1 && typeof n3 == "function" && s2.push(n3);
      }(e, n2, t[n2]);
    });
  }
  function A(e, t) {
    S[e] || (S[e] = {}), l(t) ? Object.keys(t).forEach((n2) => {
      T.indexOf(n2) > -1 && function(e2, t2, n3) {
        const s2 = S[e2][t2];
        if (!s2)
          return;
        const o2 = s2.indexOf(n3);
        o2 > -1 && s2.splice(o2, 1);
      }(e, n2, t[n2]);
    }) : delete S[e];
  }
  function P(e, t) {
    return e && e.length !== 0 ? e.reduce((e2, n2) => e2.then(() => n2(t)), Promise.resolve()) : Promise.resolve();
  }
  function I(e, t) {
    return S[e] && S[e][t] || [];
  }
  const b = k("_globalUniCloudListener"), O = "response", C = "needLogin", E = "refreshToken", R = "clientdb", U = "cloudfunction", x = "cloudobject";
  function L(e) {
    return b[e] || (b[e] = []), b[e];
  }
  function D(e, t) {
    const n2 = L(e);
    n2.includes(t) || n2.push(t);
  }
  function N(e, t) {
    const n2 = L(e), s2 = n2.indexOf(t);
    s2 !== -1 && n2.splice(s2, 1);
  }
  function q(e, t) {
    const n2 = L(e);
    for (let e2 = 0; e2 < n2.length; e2++) {
      (0, n2[e2])(t);
    }
  }
  function F(e, t) {
    return t ? function(n2) {
      let s2 = false;
      if (t === "callFunction") {
        const e2 = n2 && n2.type || i;
        s2 = e2 !== i;
      }
      const o2 = t === "callFunction" && !s2;
      let r2;
      r2 = this.isReady ? Promise.resolve() : this.initUniCloud, n2 = n2 || {};
      const a2 = r2.then(() => s2 ? Promise.resolve() : P(I(t, "invoke"), n2)).then(() => e.call(this, n2)).then((e2) => s2 ? Promise.resolve(e2) : P(I(t, "success"), e2).then(() => P(I(t, "complete"), e2)).then(() => (o2 && q(O, { type: U, content: e2 }), Promise.resolve(e2))), (e2) => s2 ? Promise.reject(e2) : P(I(t, "fail"), e2).then(() => P(I(t, "complete"), e2)).then(() => (q(O, { type: U, content: e2 }), Promise.reject(e2))));
      if (!(n2.success || n2.fail || n2.complete))
        return a2;
      a2.then((e2) => {
        n2.success && n2.success(e2), n2.complete && n2.complete(e2), o2 && q(O, { type: U, content: e2 });
      }, (e2) => {
        n2.fail && n2.fail(e2), n2.complete && n2.complete(e2), o2 && q(O, { type: U, content: e2 });
      });
    } : function(t2) {
      if (!((t2 = t2 || {}).success || t2.fail || t2.complete))
        return e.call(this, t2);
      e.call(this, t2).then((e2) => {
        t2.success && t2.success(e2), t2.complete && t2.complete(e2);
      }, (e2) => {
        t2.fail && t2.fail(e2), t2.complete && t2.complete(e2);
      });
    };
  }
  class M extends Error {
    constructor(e) {
      super(e.message), this.errMsg = e.message || "", this.errCode = this.code = e.code || "SYSTEM_ERROR", this.requestId = e.requestId;
    }
  }
  function $() {
    let e, t;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e = s2, t = n2;
      }
    } catch (e2) {
    }
    return { channel: e, scene: t };
  }
  let j;
  function K() {
    const e = uni.getLocale && uni.getLocale() || "en";
    if (j)
      return __spreadProps(__spreadValues({}, j), { locale: e, LOCALE: e });
    const t = uni.getSystemInfoSync(), { deviceId: n2, osName: s2, uniPlatform: o2, appId: r2 } = t, i2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
    for (let e2 = 0; e2 < i2.length; e2++) {
      delete t[i2[e2]];
    }
    return j = __spreadValues(__spreadValues({ PLATFORM: o2, OS: s2, APPID: r2, DEVICEID: n2 }, $()), t), __spreadProps(__spreadValues({}, j), { locale: e, LOCALE: e });
  }
  var B = { sign: function(e, t) {
    let n2 = "";
    return Object.keys(e).sort().forEach(function(t2) {
      e[t2] && (n2 = n2 + "&" + t2 + "=" + e[t2]);
    }), n2 = n2.slice(1), r(n2, t).toString();
  }, wrappedRequest: function(e, t) {
    return new Promise((n2, s2) => {
      t(Object.assign(e, { complete(e2) {
        e2 || (e2 = {}), g === "web" && e2.errMsg && e2.errMsg.indexOf("request:fail") === 0 && console.warn("\u53D1\u5E03H5\uFF0C\u9700\u8981\u5728uniCloud\u540E\u53F0\u64CD\u4F5C\uFF0C\u7ED1\u5B9A\u5B89\u5168\u57DF\u540D\uFF0C\u5426\u5219\u4F1A\u56E0\u4E3A\u8DE8\u57DF\u95EE\u9898\u800C\u65E0\u6CD5\u8BBF\u95EE\u3002\u6559\u7A0B\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");
        const t2 = e2.data && e2.data.header && e2.data.header["x-serverless-request-id"] || e2.header && e2.header["request-id"];
        if (!e2.statusCode || e2.statusCode >= 400)
          return s2(new M({ code: "SYS_ERR", message: e2.errMsg || "request:fail", requestId: t2 }));
        const o2 = e2.data;
        if (o2.error)
          return s2(new M({ code: o2.error.code, message: o2.error.message, requestId: t2 }));
        o2.result = o2.data, o2.requestId = t2, delete o2.data, n2(o2);
      } }));
    });
  } };
  var H = { request: (e) => uni.request(e), uploadFile: (e) => uni.uploadFile(e), setStorageSync: (e, t) => uni.setStorageSync(e, t), getStorageSync: (e) => uni.getStorageSync(e), removeStorageSync: (e) => uni.removeStorageSync(e), clearStorageSync: () => uni.clearStorageSync() }, W = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
  const { t: z } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, "zh-Hant": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, en: W, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: W }, "zh-Hans");
  var V = class {
    constructor(e) {
      ["spaceId", "clientSecret"].forEach((t) => {
        if (!Object.prototype.hasOwnProperty.call(e, t))
          throw new Error(z("uniCloud.init.paramRequired", { param: t }));
      }), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = H, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e) {
      this.accessToken = e;
    }
    requestWrapped(e) {
      return B.wrappedRequest(e, this.adapter.request);
    }
    requestAuth(e) {
      return this.requestWrapped(e);
    }
    request(e, t) {
      return Promise.resolve().then(() => this.hasAccessToken ? t ? this.requestWrapped(e) : this.requestWrapped(e).catch((t2) => new Promise((e2, n2) => {
        !t2 || t2.code !== "GATEWAY_INVALID_TOKEN" && t2.code !== "InvalidParameter.InvalidToken" ? n2(t2) : e2();
      }).then(() => this.getAccessToken()).then(() => {
        const t3 = this.rebuildRequest(e);
        return this.request(t3, true);
      })) : this.getAccessToken().then(() => {
        const t2 = this.rebuildRequest(e);
        return this.request(t2, true);
      }));
    }
    rebuildRequest(e) {
      const t = Object.assign({}, e);
      return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = B.sign(t.data, this.config.clientSecret), t;
    }
    setupRequest(e, t) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return t !== "auth" && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = B.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      if (this._getAccessTokenPromiseStatus === "pending")
        return this._getAccessTokenPromise;
      this._getAccessTokenPromiseStatus = "pending";
      return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e) => new Promise((t, n2) => {
        e.result && e.result.accessToken ? (this.setAccessToken(e.result.accessToken), this._getAccessTokenPromiseStatus = "fulfilled", t(this.accessToken)) : (this._getAccessTokenPromiseStatus = "rejected", n2(new M({ code: "AUTH_FAILED", message: "\u83B7\u53D6accessToken\u5931\u8D25" })));
      }), (e) => (this._getAccessTokenPromiseStatus = "rejected", Promise.reject(e))), this._getAccessTokenPromise;
    }
    authorize() {
      this.getAccessToken();
    }
    callFunction(e) {
      const t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };
      return this.request(this.setupRequest(t));
    }
    getOSSUploadOptionsFromPath(e) {
      const t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t));
    }
    uploadFileToOSS({ url: e, formData: t, name: n2, filePath: s2, fileType: o2, onUploadProgress: r2 }) {
      return new Promise((i2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t, name: n2, filePath: s2, fileType: o2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e2) {
          e2 && e2.statusCode < 400 ? i2(e2) : a2(new M({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        }, fail(e2) {
          a2(new M({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        } });
        typeof r2 == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((e2) => {
          r2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e) {
      const t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t));
    }
    uploadFile({ filePath: e, cloudPath: t, fileType: n2 = "image", onUploadProgress: s2, config: o2 }) {
      if (u(t) !== "string")
        throw new M({ code: "INVALID_PARAM", message: "cloudPath\u5FC5\u987B\u4E3A\u5B57\u7B26\u4E32\u7C7B\u578B" });
      if (!(t = t.trim()))
        throw new M({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
      if (/:\/\//.test(t))
        throw new M({ code: "INVALID_PARAM", message: "cloudPath\u4E0D\u5408\u6CD5" });
      const r2 = o2 && o2.envType || this.config.envType;
      let i2, a2;
      return this.getOSSUploadOptionsFromPath({ env: r2, filename: t }).then((t2) => {
        const o3 = t2.result;
        i2 = o3.id, a2 = "https://" + o3.cdnDomain + "/" + o3.ossPath;
        const r3 = { url: "https://" + o3.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: o3.accessKeyId, Signature: o3.signature, host: o3.host, id: i2, key: o3.ossPath, policy: o3.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, r3, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ id: i2 })).then((t2) => new Promise((n3, s3) => {
        t2.success ? n3({ success: true, filePath: e, fileID: a2 }) : s3(new M({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }));
    }
    deleteFile({ fileList: e }) {
      const t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };
      return this.request(this.setupRequest(t));
    }
    getTempFileURL({ fileList: e } = {}) {
      return new Promise((t, n2) => {
        Array.isArray(e) && e.length !== 0 || n2(new M({ code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" })), t({ fileList: e.map((e2) => ({ fileID: e2, tempFileURL: e2 })) });
      });
    }
  };
  var J = { init(e) {
    const t = new V(e), n2 = { signInAnonymously: function() {
      return t.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t.auth = function() {
      return n2;
    }, t.customAuth = t.auth, t;
  } };
  const Y = typeof location != "undefined" && location.protocol === "http:" ? "http:" : "https:";
  var X;
  !function(e) {
    e.local = "local", e.none = "none", e.session = "session";
  }(X || (X = {}));
  var G = function() {
  };
  const Q = () => {
    let e;
    if (!Promise) {
      e = () => {
      }, e.promise = {};
      const t2 = () => {
        throw new M({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e.promise, "then", { get: t2 }), Object.defineProperty(e.promise, "catch", { get: t2 }), e;
    }
    const t = new Promise((t2, n2) => {
      e = (e2, s2) => e2 ? n2(e2) : t2(s2);
    });
    return e.promise = t, e;
  };
  function Z(e) {
    return e === void 0;
  }
  function ee(e) {
    return Object.prototype.toString.call(e) === "[object Null]";
  }
  var te;
  function ne(e) {
    const t = (n2 = e, Object.prototype.toString.call(n2) === "[object Array]" ? e : [e]);
    var n2;
    for (const e2 of t) {
      const { isMatch: t2, genAdapter: n3, runtime: s2 } = e2;
      if (t2())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e) {
    e.WEB = "web", e.WX_MP = "wx_mp";
  }(te || (te = {}));
  const se = { adapter: null, runtime: void 0 }, oe = ["anonymousUuidKey"];
  class re extends G {
    constructor() {
      super(), se.adapter.root.tcbObject || (se.adapter.root.tcbObject = {});
    }
    setItem(e, t) {
      se.adapter.root.tcbObject[e] = t;
    }
    getItem(e) {
      return se.adapter.root.tcbObject[e];
    }
    removeItem(e) {
      delete se.adapter.root.tcbObject[e];
    }
    clear() {
      delete se.adapter.root.tcbObject;
    }
  }
  function ie(e, t) {
    switch (e) {
      case "local":
        return t.localStorage || new re();
      case "none":
        return new re();
      default:
        return t.sessionStorage || new re();
    }
  }
  class ae {
    constructor(e) {
      if (!this._storage) {
        this._persistence = se.adapter.primaryStorage || e.persistence, this._storage = ie(this._persistence, se.adapter);
        const t = `access_token_${e.env}`, n2 = `access_token_expire_${e.env}`, s2 = `refresh_token_${e.env}`, o2 = `anonymous_uuid_${e.env}`, r2 = `login_type_${e.env}`, i2 = `user_info_${e.env}`;
        this.keys = { accessTokenKey: t, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: o2, loginTypeKey: r2, userInfoKey: i2 };
      }
    }
    updatePersistence(e) {
      if (e === this._persistence)
        return;
      const t = this._persistence === "local";
      this._persistence = e;
      const n2 = ie(e, se.adapter);
      for (const e2 in this.keys) {
        const s2 = this.keys[e2];
        if (t && oe.includes(e2))
          continue;
        const o2 = this._storage.getItem(s2);
        Z(o2) || ee(o2) || (n2.setItem(s2, o2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e, t, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t }, o2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e, o2);
      } catch (e2) {
        throw e2;
      }
    }
    getStore(e, t) {
      try {
        if (!this._storage)
          return;
      } catch (e2) {
        return "";
      }
      t = t || "localCachev1";
      const n2 = this._storage.getItem(e);
      if (!n2)
        return "";
      if (n2.indexOf(t) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e) {
      this._storage.removeItem(e);
    }
  }
  const ce = {}, ue = {};
  function le(e) {
    return ce[e];
  }
  class he {
    constructor(e, t) {
      this.data = t || null, this.name = e;
    }
  }
  class de extends he {
    constructor(e, t) {
      super("error", { error: e, data: t }), this.error = e;
    }
  }
  const fe = new class {
    constructor() {
      this._listeners = {};
    }
    on(e, t) {
      return function(e2, t2, n2) {
        n2[e2] = n2[e2] || [], n2[e2].push(t2);
      }(e, t, this._listeners), this;
    }
    off(e, t) {
      return function(e2, t2, n2) {
        if (n2 && n2[e2]) {
          const s2 = n2[e2].indexOf(t2);
          s2 !== -1 && n2[e2].splice(s2, 1);
        }
      }(e, t, this._listeners), this;
    }
    fire(e, t) {
      if (e instanceof de)
        return console.error(e.error), this;
      const n2 = typeof e == "string" ? new he(e, t || {}) : e;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e2 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t2 of e2)
          t2.call(this, n2);
      }
      return this;
    }
    _listens(e) {
      return this._listeners[e] && this._listeners[e].length > 0;
    }
  }();
  function ge(e, t) {
    fe.on(e, t);
  }
  function pe(e, t = {}) {
    fe.fire(e, t);
  }
  function me(e, t) {
    fe.off(e, t);
  }
  const ye = "loginStateChanged", _e = "loginStateExpire", we = "loginTypeChanged", ke = "anonymousConverted", Te = "refreshAccessToken";
  var Se;
  !function(e) {
    e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";
  }(Se || (Se = {}));
  const ve = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Ae = { "X-SDK-Version": "1.3.5" };
  function Pe(e, t, n2) {
    const s2 = e[t];
    e[t] = function(t2) {
      const o2 = {}, r2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: i3 } = n3.call(e, t2);
        Object.assign(o2, s3), Object.assign(r2, i3);
      });
      const i2 = t2.data;
      return i2 && (() => {
        var e2;
        if (e2 = i2, Object.prototype.toString.call(e2) !== "[object FormData]")
          t2.data = __spreadValues(__spreadValues({}, i2), o2);
        else
          for (const e3 in o2)
            i2.append(e3, o2[e3]);
      })(), t2.headers = __spreadValues(__spreadValues({}, t2.headers || {}), r2), s2.call(e, t2);
    };
  }
  function Ie() {
    const e = Math.random().toString(16).slice(2);
    return { data: { seqId: e }, headers: __spreadProps(__spreadValues({}, Ae), { "x-seqid": e }) };
  }
  class be {
    constructor(e = {}) {
      var t;
      this.config = e, this._reqClass = new se.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `\u8BF7\u6C42\u5728${this.config.timeout / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD`, restrictedMethods: ["post"] }), this._cache = le(this.config.env), this._localCache = (t = this.config.env, ue[t]), Pe(this._reqClass, "post", [Ie]), Pe(this._reqClass, "upload", [Ie]), Pe(this._reqClass, "download", [Ie]);
    }
    async post(e) {
      return await this._reqClass.post(e);
    }
    async upload(e) {
      return await this._reqClass.upload(e);
    }
    async download(e) {
      return await this._reqClass.download(e);
    }
    async refreshAccessToken() {
      let e, t;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e = await this._refreshAccessTokenPromise;
      } catch (e2) {
        t = e2;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)
        throw t;
      return e;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: o2 } = this._cache.keys;
      this._cache.removeStore(e), this._cache.removeStore(t);
      let r2 = this._cache.getStore(n2);
      if (!r2)
        throw new M({ message: "\u672A\u767B\u5F55CloudBase" });
      const i2 = { refresh_token: r2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", i2);
      if (a2.data.code) {
        const { code: e2 } = a2.data;
        if (e2 === "SIGN_PARAM_INVALID" || e2 === "REFRESH_TOKEN_EXPIRED" || e2 === "INVALID_REFRESH_TOKEN") {
          if (this._cache.getStore(s2) === Se.ANONYMOUS && e2 === "INVALID_REFRESH_TOKEN") {
            const e3 = this._cache.getStore(o2), t2 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e3, refresh_token: t2 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          pe(_e), this._cache.removeStore(n2);
        }
        throw new M({ code: a2.data.code, message: `\u5237\u65B0access token\u5931\u8D25\uFF1A${a2.data.code}` });
      }
      if (a2.data.access_token)
        return pe(Te), this._cache.setStore(e, a2.data.access_token), this._cache.setStore(t, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new M({ message: "refresh token\u4E0D\u5B58\u5728\uFF0C\u767B\u5F55\u72B6\u6001\u5F02\u5E38" });
      let s2 = this._cache.getStore(e), o2 = this._cache.getStore(t), r2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, o2) && (r2 = false), (!s2 || !o2 || o2 < Date.now()) && r2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: o2 };
    }
    async request(e, t, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let o2 = "application/x-www-form-urlencoded";
      const r2 = __spreadValues({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);
      if (ve.indexOf(e) === -1) {
        const { refreshTokenKey: e2 } = this._cache.keys;
        this._cache.getStore(e2) && (r2.access_token = (await this.getAccessToken()).accessToken);
      }
      let i2;
      if (e === "storage.uploadFile") {
        i2 = new FormData();
        for (let e2 in i2)
          i2.hasOwnProperty(e2) && i2[e2] !== void 0 && i2.append(e2, r2[e2]);
        o2 = "multipart/form-data";
      } else {
        o2 = "application/json", i2 = {};
        for (let e2 in r2)
          r2[e2] !== void 0 && (i2[e2] = r2[e2]);
      }
      let a2 = { headers: { "content-type": o2 } };
      n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: l2, search: h2 } = t;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), l2 && (d2 = __spreadValues(__spreadValues({}, l2), d2));
      let f2 = function(e2, t2, n3 = {}) {
        const s3 = /\?/.test(t2);
        let o3 = "";
        for (let e3 in n3)
          o3 === "" ? !s3 && (t2 += "?") : o3 += "&", o3 += `${e3}=${encodeURIComponent(n3[e3])}`;
        return /^http(s)?\:\/\//.test(t2 += o3) ? t2 : `${e2}${t2}`;
      }(Y, "//tcb-api.tencentcloudapi.com/web", d2);
      h2 && (f2 += h2);
      const g2 = await this.post(__spreadValues({ url: f2, data: i2 }, a2)), p2 = g2.header && g2.header["x-tcb-trace"];
      if (p2 && this._localCache.setStore(s2, p2), Number(g2.status) !== 200 && Number(g2.statusCode) !== 200 || !g2.data)
        throw new M({ code: "NETWORK_ERROR", message: "network request error" });
      return g2;
    }
    async send(e, t = {}) {
      const n2 = await this.request(e, t, { onUploadProgress: t.onUploadProgress });
      if (n2.data.code === "ACCESS_TOKEN_EXPIRED" && ve.indexOf(e) === -1) {
        await this.refreshAccessToken();
        const n3 = await this.request(e, t, { onUploadProgress: t.onUploadProgress });
        if (n3.data.code)
          throw new M({ code: n3.data.code, message: n3.data.message });
        return n3.data;
      }
      if (n2.data.code)
        throw new M({ code: n2.data.code, message: n2.data.message });
      return n2.data;
    }
    setRefreshToken(e) {
      const { accessTokenKey: t, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
  }
  const Oe = {};
  function Ce(e) {
    return Oe[e];
  }
  class Ee {
    constructor(e) {
      this.config = e, this._cache = le(e.env), this._request = Ce(e.env);
    }
    setRefreshToken(e) {
      const { accessTokenKey: t, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
    setAccessToken(e, t) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e), this._cache.setStore(s2, t);
    }
    async refreshUserInfo() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t } = this._cache.keys;
      this._cache.setStore(t, e);
    }
  }
  class Re {
    constructor(e) {
      if (!e)
        throw new M({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e, this._cache = le(this._envId), this._request = Ce(this._envId), this.setUserInfo();
    }
    linkWithTicket(e) {
      if (typeof e != "string")
        throw new M({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e });
    }
    linkWithRedirect(e) {
      e.signInWithRedirect();
    }
    updatePassword(e, t) {
      return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });
    }
    updateEmail(e) {
      return this._request.send("auth.updateEmail", { newEmail: e });
    }
    updateUsername(e) {
      if (typeof e != "string")
        throw new M({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e });
    }
    async getLinkedUidList() {
      const { data: e } = await this._request.send("auth.getLinkedUidList", {});
      let t = false;
      const { users: n2 } = e;
      return n2.forEach((e2) => {
        e2.wxOpenId && e2.wxPublicId && (t = true);
      }), { users: n2, hasPrimaryUid: t };
    }
    setPrimaryUid(e) {
      return this._request.send("auth.setPrimaryUid", { uid: e });
    }
    unlink(e) {
      return this._request.send("auth.unlink", { platform: e });
    }
    async update(e) {
      const { nickName: t, gender: n2, avatarUrl: s2, province: o2, country: r2, city: i2 } = e, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t, gender: n2, avatarUrl: s2, province: o2, country: r2, city: i2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setUserInfo() {
      const { userInfoKey: e } = this._cache.keys, t = this._cache.getStore(e);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e2) => {
        this[e2] = t[e2];
      }), this.location = { country: t.country, province: t.province, city: t.city };
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t } = this._cache.keys;
      this._cache.setStore(t, e), this.setUserInfo();
    }
  }
  class Ue {
    constructor(e) {
      if (!e)
        throw new M({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = le(e);
      const { refreshTokenKey: t, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, o2 = this._cache.getStore(t), r2 = this._cache.getStore(n2), i2 = this._cache.getStore(s2);
      this.credential = { refreshToken: o2, accessToken: r2, accessTokenExpire: i2 }, this.user = new Re(e);
    }
    get isAnonymousAuth() {
      return this.loginType === Se.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === Se.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === Se.WECHAT || this.loginType === Se.WECHAT_OPEN || this.loginType === Se.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class xe extends Ee {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e, refreshTokenKey: t } = this._cache.keys, n2 = this._cache.getStore(e) || void 0, s2 = this._cache.getStore(t) || void 0, o2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (o2.uuid && o2.refresh_token) {
        this._setAnonymousUUID(o2.uuid), this.setRefreshToken(o2.refresh_token), await this._request.refreshAccessToken(), pe(ye), pe(we, { env: this.config.env, loginType: Se.ANONYMOUS, persistence: "local" });
        const e2 = new Ue(this.config.env);
        return await e2.user.refresh(), e2;
      }
      throw new M({ message: "\u533F\u540D\u767B\u5F55\u5931\u8D25" });
    }
    async linkAndRetrieveDataWithTicket(e) {
      const { anonymousUuidKey: t, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t), o2 = this._cache.getStore(n2), r2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: o2, ticket: e });
      if (r2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), pe(ke, { env: this.config.env }), pe(we, { loginType: Se.CUSTOM, persistence: "local" }), { credential: { refreshToken: r2.refresh_token } };
      throw new M({ message: "\u533F\u540D\u8F6C\u5316\u5931\u8D25" });
    }
    _setAnonymousUUID(e) {
      const { anonymousUuidKey: t, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n2, Se.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class Le extends Ee {
    async signIn(e) {
      if (typeof e != "string")
        throw new M({ param: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), pe(ye), pe(we, { env: this.config.env, loginType: Se.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new Ue(this.config.env);
      throw new M({ message: "\u81EA\u5B9A\u4E49\u767B\u5F55\u5931\u8D25" });
    }
  }
  class De extends Ee {
    async signIn(e, t) {
      if (typeof e != "string")
        throw new M({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: o2, access_token: r2, access_token_expire: i2 } = s2;
      if (o2)
        return this.setRefreshToken(o2), r2 && i2 ? this.setAccessToken(r2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), pe(ye), pe(we, { env: this.config.env, loginType: Se.EMAIL, persistence: this.config.persistence }), new Ue(this.config.env);
      throw s2.code ? new M({ code: s2.code, message: `\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: ${s2.message}` }) : new M({ message: "\u90AE\u7BB1\u767B\u5F55\u5931\u8D25" });
    }
    async activate(e) {
      return this._request.send("auth.activateEndUserMail", { token: e });
    }
    async resetPasswordWithToken(e, t) {
      return this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t });
    }
  }
  class Ne extends Ee {
    async signIn(e, t) {
      if (typeof e != "string")
        throw new M({ code: "PARAM_ERROR", message: "username must be a string" });
      typeof t != "string" && (t = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: Se.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: o2, access_token_expire: r2, access_token: i2 } = s2;
      if (o2)
        return this.setRefreshToken(o2), i2 && r2 ? this.setAccessToken(i2, r2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), pe(ye), pe(we, { env: this.config.env, loginType: Se.USERNAME, persistence: this.config.persistence }), new Ue(this.config.env);
      throw s2.code ? new M({ code: s2.code, message: `\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: ${s2.message}` }) : new M({ message: "\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25" });
    }
  }
  class qe {
    constructor(e) {
      this.config = e, this._cache = le(e.env), this._request = Ce(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), ge(we, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e = this.hasLoginState();
      return e && e.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new xe(this.config);
    }
    customAuthProvider() {
      return new Le(this.config);
    }
    emailAuthProvider() {
      return new De(this.config);
    }
    usernameAuthProvider() {
      return new Ne(this.config);
    }
    async signInAnonymously() {
      return new xe(this.config).signIn();
    }
    async signInWithEmailAndPassword(e, t) {
      return new De(this.config).signIn(e, t);
    }
    signInWithUsernameAndPassword(e, t) {
      return new Ne(this.config).signIn(e, t);
    }
    async linkAndRetrieveDataWithTicket(e) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new xe(this.config)), ge(ke, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);
    }
    async signOut() {
      if (this.loginType === Se.ANONYMOUS)
        throw new M({ message: "\u533F\u540D\u7528\u6237\u4E0D\u652F\u6301\u767B\u51FA\u64CD\u4F5C" });
      const { refreshTokenKey: e, accessTokenKey: t, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e);
      if (!s2)
        return;
      const o2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n2), pe(ye), pe(we, { env: this.config.env, loginType: Se.NULL, persistence: this.config.persistence }), o2;
    }
    async signUpWithEmailAndPassword(e, t) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t });
    }
    async sendPasswordResetEmail(e) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e });
    }
    onLoginStateChanged(e) {
      ge(ye, () => {
        const t2 = this.hasLoginState();
        e.call(this, t2);
      });
      const t = this.hasLoginState();
      e.call(this, t);
    }
    onLoginStateExpired(e) {
      ge(_e, e.bind(this));
    }
    onAccessTokenRefreshed(e) {
      ge(Te, e.bind(this));
    }
    onAnonymousConverted(e) {
      ge(ke, e.bind(this));
    }
    onLoginTypeChanged(e) {
      ge(we, () => {
        const t = this.hasLoginState();
        e.call(this, t);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e } = this._cache.keys;
      return this._cache.getStore(e) ? new Ue(this.config.env) : null;
    }
    async isUsernameRegistered(e) {
      if (typeof e != "string")
        throw new M({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t } = await this._request.send("auth.isUsernameRegistered", { username: e });
      return t && t.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e) {
      return new Le(this.config).signIn(e);
    }
    shouldRefreshAccessToken(e) {
      this._request._shouldRefreshAccessTokenHook = e.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e) => e.code ? e : __spreadProps(__spreadValues({}, e.data), { requestId: e.seqId }));
    }
    getAuthHeader() {
      const { refreshTokenKey: e, accessTokenKey: t } = this._cache.keys, n2 = this._cache.getStore(e);
      return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e) {
      const { env: t } = e.data;
      t === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e) {
      const { loginType: t, persistence: n2, env: s2 } = e.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t));
    }
  }
  const Fe = function(e, t) {
    t = t || Q();
    const n2 = Ce(this.config.env), { cloudPath: s2, filePath: o2, onUploadProgress: r2, fileType: i2 = "image" } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: l2, cosFileId: h2 }, requestId: d2 } = e2, f2 = { key: s2, signature: c2, "x-cos-meta-fileid": h2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: f2, file: o2, name: s2, fileType: i2, onUploadProgress: r2 }).then((e3) => {
        e3.statusCode === 201 ? t(null, { fileID: l2, requestId: d2 }) : t(new M({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e3.data}` }));
      }).catch((e3) => {
        t(e3);
      });
    }).catch((e2) => {
      t(e2);
    }), t.promise;
  }, Me = function(e, t) {
    t = t || Q();
    const n2 = Ce(this.config.env), { cloudPath: s2 } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      t(null, e2);
    }).catch((e2) => {
      t(e2);
    }), t.promise;
  }, $e = function({ fileList: e }, t) {
    if (t = t || Q(), !e || !Array.isArray(e))
      return { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" };
    for (let t2 of e)
      if (!t2 || typeof t2 != "string")
        return { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" };
    const n2 = { fileid_list: e };
    return Ce(this.config.env).send("storage.batchDeleteFile", n2).then((e2) => {
      e2.code ? t(null, e2) : t(null, { fileList: e2.data.delete_list, requestId: e2.requestId });
    }).catch((e2) => {
      t(e2);
    }), t.promise;
  }, je = function({ fileList: e }, t) {
    t = t || Q(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" });
    let n2 = [];
    for (let s3 of e)
      typeof s3 == "object" ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5305\u542BfileID\u548CmaxAge\u7684\u5BF9\u8C61" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : typeof s3 == "string" ? n2.push({ fileid: s3 }) : t(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5B57\u7B26\u4E32" });
    const s2 = { file_list: n2 };
    return Ce(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e2) => {
      e2.code ? t(null, e2) : t(null, { fileList: e2.data.download_list, requestId: e2.requestId });
    }).catch((e2) => {
      t(e2);
    }), t.promise;
  }, Ke = async function({ fileID: e }, t) {
    const n2 = (await je.call(this, { fileList: [{ fileID: e, maxAge: 600 }] })).fileList[0];
    if (n2.code !== "SUCCESS")
      return t ? t(n2) : new Promise((e2) => {
        e2(n2);
      });
    const s2 = Ce(this.config.env);
    let o2 = n2.download_url;
    if (o2 = encodeURI(o2), !t)
      return s2.download({ url: o2 });
    t(await s2.download({ url: o2 }));
  }, Be = function({ name: e, data: t, query: n2, parse: s2, search: o2 }, r2) {
    const i2 = r2 || Q();
    let a2;
    try {
      a2 = t ? JSON.stringify(t) : "";
    } catch (e2) {
      return Promise.reject(e2);
    }
    if (!e)
      return Promise.reject(new M({ code: "PARAM_ERROR", message: "\u51FD\u6570\u540D\u4E0D\u80FD\u4E3A\u7A7A" }));
    const c2 = { inQuery: n2, parse: s2, search: o2, function_name: e, request_data: a2 };
    return Ce(this.config.env).send("functions.invokeFunction", c2).then((e2) => {
      if (e2.code)
        i2(null, e2);
      else {
        let t2 = e2.data.response_data;
        if (s2)
          i2(null, { result: t2, requestId: e2.requestId });
        else
          try {
            t2 = JSON.parse(e2.data.response_data), i2(null, { result: t2, requestId: e2.requestId });
          } catch (e3) {
            i2(new M({ message: "response data must be json" }));
          }
      }
      return i2.promise;
    }).catch((e2) => {
      i2(e2);
    }), i2.promise;
  }, He = { timeout: 15e3, persistence: "session" }, We = {};
  class ze {
    constructor(e) {
      this.config = e || this.config, this.authObj = void 0;
    }
    init(e) {
      switch (se.adapter || (this.requestClient = new se.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: `\u8BF7\u6C42\u5728${(e.timeout || 5e3) / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD` })), this.config = __spreadValues(__spreadValues({}, He), e), true) {
        case this.config.timeout > 6e5:
          console.warn("timeout\u5927\u4E8E\u53EF\u914D\u7F6E\u4E0A\u9650[10\u5206\u949F]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0A\u9650\u6570\u503C"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout\u5C0F\u4E8E\u53EF\u914D\u7F6E\u4E0B\u9650[100ms]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0B\u9650\u6570\u503C"), this.config.timeout = 100;
      }
      return new ze(this.config);
    }
    auth({ persistence: e } = {}) {
      if (this.authObj)
        return this.authObj;
      const t = e || se.adapter.primaryStorage || He.persistence;
      var n2;
      return t !== this.config.persistence && (this.config.persistence = t), function(e2) {
        const { env: t2 } = e2;
        ce[t2] = new ae(e2), ue[t2] = new ae(__spreadProps(__spreadValues({}, e2), { persistence: "local" }));
      }(this.config), n2 = this.config, Oe[n2.env] = new be(n2), this.authObj = new qe(this.config), this.authObj;
    }
    on(e, t) {
      return ge.apply(this, [e, t]);
    }
    off(e, t) {
      return me.apply(this, [e, t]);
    }
    callFunction(e, t) {
      return Be.apply(this, [e, t]);
    }
    deleteFile(e, t) {
      return $e.apply(this, [e, t]);
    }
    getTempFileURL(e, t) {
      return je.apply(this, [e, t]);
    }
    downloadFile(e, t) {
      return Ke.apply(this, [e, t]);
    }
    uploadFile(e, t) {
      return Fe.apply(this, [e, t]);
    }
    getUploadMetadata(e, t) {
      return Me.apply(this, [e, t]);
    }
    registerExtension(e) {
      We[e.name] = e;
    }
    async invokeExtension(e, t) {
      const n2 = We[e];
      if (!n2)
        throw new M({ message: `\u6269\u5C55${e} \u5FC5\u987B\u5148\u6CE8\u518C` });
      return await n2.invoke(t, this);
    }
    useAdapters(e) {
      const { adapter: t, runtime: n2 } = ne(e) || {};
      t && (se.adapter = t), n2 && (se.runtime = n2);
    }
  }
  var Ve = new ze();
  function Je(e, t, n2) {
    n2 === void 0 && (n2 = {});
    var s2 = /\?/.test(t), o2 = "";
    for (var r2 in n2)
      o2 === "" ? !s2 && (t += "?") : o2 += "&", o2 += r2 + "=" + encodeURIComponent(n2[r2]);
    return /^http(s)?:\/\//.test(t += o2) ? t : "" + e + t;
  }
  class Ye {
    post(e) {
      const { url: t, data: n2, headers: s2 } = e;
      return new Promise((e2, o2) => {
        H.request({ url: Je("https:", t), data: n2, method: "POST", header: s2, success(t2) {
          e2(t2);
        }, fail(e3) {
          o2(e3);
        } });
      });
    }
    upload(e) {
      return new Promise((t, n2) => {
        const { url: s2, file: o2, data: r2, headers: i2, fileType: a2 } = e, c2 = H.uploadFile({ url: Je("https:", s2), name: "file", formData: Object.assign({}, r2), filePath: o2, fileType: a2, header: i2, success(e2) {
          const n3 = { statusCode: e2.statusCode, data: e2.data || {} };
          e2.statusCode === 200 && r2.success_action_status && (n3.statusCode = parseInt(r2.success_action_status, 10)), t(n3);
        }, fail(e2) {
          n2(new Error(e2.errMsg || "uploadFile:fail"));
        } });
        typeof e.onUploadProgress == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((t2) => {
          e.onUploadProgress({ loaded: t2.totalBytesSent, total: t2.totalBytesExpectedToSend });
        });
      });
    }
  }
  const Xe = { setItem(e, t) {
    H.setStorageSync(e, t);
  }, getItem: (e) => H.getStorageSync(e), removeItem(e) {
    H.removeStorageSync(e);
  }, clear() {
    H.clearStorageSync();
  } };
  var Ge = { genAdapter: function() {
    return { root: {}, reqClass: Ye, localStorage: Xe, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  Ve.useAdapters(Ge);
  const Qe = Ve, Ze = Qe.init;
  Qe.init = function(e) {
    e.env = e.spaceId;
    const t = Ze.call(this, e);
    t.config.provider = "tencent", t.config.spaceId = e.spaceId;
    const n2 = t.auth;
    return t.auth = function(e2) {
      const t2 = n2.call(this, e2);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e3) => {
        t2[e3] = F(t2[e3]).bind(t2);
      }), t2;
    }, t.customAuth = t.auth, t;
  };
  var et = Qe;
  function tt(e) {
    return e && tt(e.__v_raw) || e;
  }
  function nt() {
    return { token: H.getStorageSync("uni_id_token") || H.getStorageSync("uniIdToken"), tokenExpired: H.getStorageSync("uni_id_token_expired") };
  }
  function st({ token: e, tokenExpired: t } = {}) {
    e && H.setStorageSync("uni_id_token", e), t && H.setStorageSync("uni_id_token_expired", t);
  }
  function ot() {
    if (g !== "web")
      return;
    uni.getStorageSync("__LAST_DCLOUD_APPID") !== _ && (uni.setStorageSync("__LAST_DCLOUD_APPID", _), console.warn("\u68C0\u6D4B\u5230\u5F53\u524D\u9879\u76EE\u4E0E\u4E0A\u6B21\u8FD0\u884C\u5230\u6B64\u7AEF\u53E3\u7684\u9879\u76EE\u4E0D\u4E00\u81F4\uFF0C\u81EA\u52A8\u6E05\u7406uni-id\u4FDD\u5B58\u7684token\u4FE1\u606F\uFF08\u4EC5\u5F00\u53D1\u8C03\u8BD5\u65F6\u751F\u6548\uFF09"), H.removeStorageSync("uni_id_token"), H.removeStorageSync("uniIdToken"), H.removeStorageSync("uni_id_token_expired"));
  }
  var rt = class extends V {
    getAccessToken() {
      return new Promise((e, t) => {
        const n2 = "Anonymous_Access_token";
        this.setAccessToken(n2), e(n2);
      });
    }
    setupRequest(e, t) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      t !== "auth" && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = B.sign(n2, this.config.clientSecret);
      const o2 = K();
      s2["x-client-info"] = encodeURIComponent(JSON.stringify(o2));
      const { token: r2 } = nt();
      return s2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
    }
    uploadFileToOSS({ url: e, formData: t, name: n2, filePath: s2, fileType: o2, onUploadProgress: r2 }) {
      return new Promise((i2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t, name: n2, filePath: s2, fileType: o2, success(e2) {
          e2 && e2.statusCode < 400 ? i2(e2) : a2(new M({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        }, fail(e2) {
          a2(new M({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
        } });
        typeof r2 == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((e2) => {
          r2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    uploadFile({ filePath: e, cloudPath: t, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t)
        throw new M({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
      let o2;
      return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then((t2) => {
        const { url: r2, formData: i2, name: a2 } = t2.result;
        o2 = t2.result.fileUrl;
        const c2 = { url: r2, formData: i2, name: a2, filePath: e, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ cloudPath: t })).then((t2) => new Promise((n3, s3) => {
        t2.success ? n3({ success: true, filePath: e, fileID: o2 }) : s3(new M({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }));
    }
    deleteFile({ fileList: e }) {
      const t = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t));
    }
    getTempFileURL({ fileList: e } = {}) {
      const t = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t));
    }
  };
  var it = { init(e) {
    const t = new rt(e), n2 = { signInAnonymously: function() {
      return t.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t.auth = function() {
      return n2;
    }, t.customAuth = t.auth, t;
  } };
  function at({ data: e }) {
    let t;
    t = K();
    const n2 = JSON.parse(JSON.stringify(e || {}));
    if (Object.assign(n2, { clientInfo: t }), !n2.uniIdToken) {
      const { token: e2 } = nt();
      e2 && (n2.uniIdToken = e2);
    }
    return n2;
  }
  function ct({ name: e, data: t }) {
    const { localAddress: n2, localPort: s2 } = this, o2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e}`;
    return new Promise((t2, n3) => {
      H.request({ method: "POST", url: i2, data: { name: e, platform: g, provider: o2, spaceId: r2 }, timeout: 3e3, success(e2) {
        t2(e2);
      }, fail() {
        t2({ data: { code: "NETWORK_ERROR", message: "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570\u3002" } });
      } });
    }).then(({ data: e2 } = {}) => {
      const { code: t2, message: n3 } = e2 || {};
      return { code: t2 === 0 ? 0 : t2 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: n3, message: s3 }) => {
      if (n3 !== 0) {
        switch (n3) {
          case "MODULE_ENCRYPTED":
            console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e}\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e}\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(s3 || "\u9700\u8981\u8BBF\u95EE\u52A0\u5BC6\u7684uni-clientDB-action\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u73AF\u5883");
            break;
          case "NETWORK_ERROR": {
            const e2 = "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B";
            throw console.error(e2), new Error(e2);
          }
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e2 = `\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A${s3}\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5`;
            throw console.error(e2), new Error(e2);
          }
        }
        return this._originCallFunction({ name: e, data: t });
      }
      return new Promise((e2, n4) => {
        const s4 = at.call(this, { data: t });
        H.request({ method: "POST", url: a2, data: { provider: o2, platform: g, param: s4 }, success: ({ statusCode: t2, data: s5 } = {}) => !t2 || t2 >= 400 ? n4(new M({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e2({ result: s5 }), fail(e3) {
          n4(new M({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const ut = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "\uFF0C\u4E91\u51FD\u6570[{functionName}]\u5728\u4E91\u7AEF\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u6B64\u4E91\u51FD\u6570\u540D\u79F0\u662F\u5426\u6B63\u786E\u4EE5\u53CA\u8BE5\u4E91\u51FD\u6570\u662F\u5426\u5DF2\u4E0A\u4F20\u5230\u670D\u52A1\u7A7A\u95F4", mode: "append" }];
  var lt = /[\\^$.*+?()[\]{}|]/g, ht = RegExp(lt.source);
  function dt(e, t, n2) {
    return e.replace(new RegExp((s2 = t) && ht.test(s2) ? s2.replace(lt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  function ft({ functionName: e, result: t, logPvd: n2 }) {
    if (this.config.debugLog && t && t.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function gt(e) {
    const t = e.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = at.call(e, { data: n3.data });
      const o2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider];
      return t.call(this, n3).then((e2) => (e2.errCode = 0, ft.call(this, { functionName: s2, result: e2, logPvd: o2 }), Promise.resolve(e2)), (e2) => (ft.call(this, { functionName: s2, result: e2, logPvd: o2 }), e2 && e2.message && (e2.message = function({ message: e3 = "", extraInfo: t2 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: o3, content: r2, mode: i2 } = n4[s3], a2 = e3.match(o3);
          if (!a2)
            continue;
          let c2 = r2;
          for (let e4 = 1; e4 < a2.length; e4++)
            c2 = dt(c2, `{$${e4}}`, a2[e4]);
          for (const e4 in t2)
            c2 = dt(c2, `{${e4}}`, t2[e4]);
          return i2 === "replace" ? c2 : e3 + c2;
        }
        return e3;
      }({ message: `[${n3.name}]: ${e2.message}`, formatter: ut, extraInfo: { functionName: s2 } })), Promise.reject(e2)));
    };
    e.callFunction = function(t2) {
      let s2;
      return e.debugInfo && !e.debugInfo.forceRemote && m ? (e._originCallFunction || (e._originCallFunction = n2), s2 = ct.call(this, t2)) : s2 = n2.call(this, t2), Object.defineProperty(s2, "result", { get: () => (console.warn("\u5F53\u524D\u8FD4\u56DE\u7ED3\u679C\u4E3APromise\u7C7B\u578B\uFF0C\u4E0D\u53EF\u76F4\u63A5\u8BBF\u95EE\u5176result\u5C5E\u6027\uFF0C\u8BE6\u60C5\u8BF7\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), s2;
    };
  }
  const pt = Symbol("CLIENT_DB_INTERNAL");
  function mt(e, t) {
    return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = pt, e.__v_raw = void 0, new Proxy(e, { get(e2, n2, s2) {
      if (n2 === "_uniClient")
        return null;
      if (n2 in e2 || typeof n2 != "string") {
        const t2 = e2[n2];
        return typeof t2 == "function" ? t2.bind(e2) : t2;
      }
      return t.get(e2, n2, s2);
    } });
  }
  function yt(e) {
    return { on: (t, n2) => {
      e[t] = e[t] || [], e[t].indexOf(n2) > -1 || e[t].push(n2);
    }, off: (t, n2) => {
      e[t] = e[t] || [];
      const s2 = e[t].indexOf(n2);
      s2 !== -1 && e[t].splice(s2, 1);
    } };
  }
  const _t = ["db.Geo", "db.command", "command.aggregate"];
  function wt(e, t) {
    return _t.indexOf(`${e}.${t}`) > -1;
  }
  function kt(e) {
    switch (u(e = tt(e))) {
      case "array":
        return e.map((e2) => kt(e2));
      case "object":
        return e._internalType === pt || Object.keys(e).forEach((t) => {
          e[t] = kt(e[t]);
        }), e;
      case "regexp":
        return { $regexp: { source: e.source, flags: e.flags } };
      case "date":
        return { $date: e.toISOString() };
      default:
        return e;
    }
  }
  function Tt(e) {
    return e && e.content && e.content.$method;
  }
  class St {
    constructor(e, t, n2) {
      this.content = e, this.prevStage = t || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e = this;
      const t = [e.content];
      for (; e.prevStage; )
        e = e.prevStage, t.push(e.content);
      return { $db: t.reverse().map((e2) => ({ $method: e2.$method, $param: kt(e2.$param) })) };
    }
    getAction() {
      const e = this.toJSON().$db.find((e2) => e2.$method === "action");
      return e && e.$param && e.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e) => e.$method !== "action") };
    }
    get isAggregate() {
      let e = this;
      for (; e; ) {
        const t = Tt(e), n2 = Tt(e.prevStage);
        if (t === "aggregate" && n2 === "collection" || t === "pipeline")
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e = this;
      for (; e; ) {
        if (Tt(e) === "command")
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e = this;
      for (; e; ) {
        const t = Tt(e), n2 = Tt(e.prevStage);
        if (t === "aggregate" && n2 === "command")
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get count() {
      if (!this.isAggregate)
        return function() {
          return this._send("count", Array.from(arguments));
        };
      const e = this;
      return function() {
        return vt({ $method: "count", $param: kt(Array.from(arguments)) }, e, this._database);
      };
    }
    get remove() {
      if (!this.isCommand)
        return function() {
          return this._send("remove", Array.from(arguments));
        };
      const e = this;
      return function() {
        return vt({ $method: "remove", $param: kt(Array.from(arguments)) }, e, this._database);
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    add() {
      return this._send("add", Array.from(arguments));
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      if (!this.isCommand)
        return function() {
          throw new Error("JQL\u7981\u6B62\u4F7F\u7528set\u65B9\u6CD5");
        };
      const e = this;
      return function() {
        return vt({ $method: "set", $param: kt(Array.from(arguments)) }, e, this._database);
      };
    }
    _send(e, t) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e, $param: kt(t) }), d) {
        const e2 = s2.$db.find((e3) => e3.$method === "collection"), t2 = e2 && e2.$param;
        t2 && t2.length === 1 && typeof e2.$param[0] == "string" && e2.$param[0].indexOf(",") > -1 && console.warn("\u68C0\u6D4B\u5230\u4F7F\u7528JQL\u8BED\u6CD5\u8054\u8868\u67E5\u8BE2\u65F6\uFF0C\u672A\u4F7F\u7528getTemp\u5148\u8FC7\u6EE4\u4E3B\u8868\u6570\u636E\uFF0C\u5728\u4E3B\u8868\u6570\u636E\u91CF\u5927\u7684\u60C5\u51B5\u4E0B\u53EF\u80FD\u4F1A\u67E5\u8BE2\u7F13\u6162\u3002\n- \u5982\u4F55\u4F18\u5316\u8BF7\u53C2\u8003\u6B64\u6587\u6863\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- \u5982\u679C\u4E3B\u8868\u6570\u636E\u91CF\u5F88\u5C0F\u8BF7\u5FFD\u7565\u6B64\u4FE1\u606F\uFF0C\u9879\u76EE\u53D1\u884C\u65F6\u4E0D\u4F1A\u51FA\u73B0\u6B64\u63D0\u793A\u3002");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function vt(e, t, n2) {
    return mt(new St(e, t, n2), { get(e2, t2) {
      let s2 = "db";
      return e2 && e2.content && (s2 = e2.content.$method), wt(s2, t2) ? vt({ $method: t2 }, e2, n2) : function() {
        return vt({ $method: t2, $param: kt(Array.from(arguments)) }, e2, n2);
      };
    } });
  }
  function At({ path: e, method: t }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e.map((e2) => ({ $method: e2 })), { $method: t, $param: this.param }] };
      }
    };
  }
  class Pt extends class {
    constructor({ uniClient: e = {} } = {}) {
      this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = k("_globalUniCloudDatabaseCallback")), this.auth = yt(this._authCallBacks), Object.assign(this, yt(this._dbCallBacks)), this.env = mt({}, { get: (e2, t) => ({ $env: t }) }), this.Geo = mt({}, { get: (e2, t) => At({ path: ["Geo"], method: t }) }), this.serverDate = At({ path: [], method: "serverDate" }), this.RegExp = At({ path: [], method: "RegExp" });
    }
    getCloudEnv(e) {
      if (typeof e != "string" || !e.trim())
        throw new Error("getCloudEnv\u53C2\u6570\u9519\u8BEF");
      return { $env: e.replace("$cloudEnv_", "") };
    }
    _callback(e, t) {
      const n2 = this._dbCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t);
      });
    }
    _callbackAuth(e, t) {
      const n2 = this._authCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t);
      });
    }
    multiSend() {
      const e = Array.from(arguments), t = e.map((e2) => {
        const t2 = e2.getAction(), n2 = e2.getCommand();
        if (n2.$db[n2.$db.length - 1].$method !== "getTemp")
          throw new Error("multiSend\u53EA\u652F\u6301\u5B50\u547D\u4EE4\u5185\u4F7F\u7528getTemp");
        return { action: t2, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t, queryList: e });
    }
  } {
    _callCloudFunction({ action: e, command: t, multiCommand: n2, queryList: s2 }) {
      function o2(e2, t2) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const o3 = s2[n3];
            o3.udb && typeof o3.udb.setResult == "function" && (t2 ? o3.udb.setResult(t2) : o3.udb.setResult(e2.result.dataList[n3]));
          }
      }
      const r2 = this;
      function i2(e2) {
        return r2._callback("error", [e2]), P(I("database", "fail"), e2).then(() => P(I("database", "complete"), e2)).then(() => (o2(null, e2), q(O, { type: R, content: e2 }), Promise.reject(e2)));
      }
      const a2 = P(I("database", "invoke")), u2 = this._uniClient;
      return a2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: c, data: { action: e, command: t, multiCommand: n2 } })).then((e2) => {
        const { code: t2, message: n3, token: s3, tokenExpired: r3, systemInfo: a3 = [] } = e2.result;
        if (a3)
          for (let e3 = 0; e3 < a3.length; e3++) {
            const { level: t3, message: n4, detail: s4 } = a3[e3], o3 = console[g === "app" && t3 === "warn" ? "error" : t3] || console.log;
            let r4 = "[System Info]" + n4;
            s4 && (r4 = `${r4}
\u8BE6\u7EC6\u4FE1\u606F\uFF1A${s4}`), o3(r4);
          }
        if (t2) {
          return i2(new M({ code: t2, message: n3, requestId: e2.requestId }));
        }
        e2.result.errCode = e2.result.code, e2.result.errMsg = e2.result.message, s3 && r3 && (st({ token: s3, tokenExpired: r3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: r3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: r3 }]), q(E, { token: s3, tokenExpired: r3 }));
        const c2 = [{ prop: "affectedDocs", tips: "affectedDocs\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528inserted/deleted/updated/data.length\u66FF\u4EE3" }, { prop: "code", tips: "code\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528errCode\u66FF\u4EE3" }, { prop: "message", tips: "message\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528errMsg\u66FF\u4EE3" }];
        for (let t3 = 0; t3 < c2.length; t3++) {
          const { prop: n4, tips: s4 } = c2[t3];
          if (n4 in e2.result) {
            const t4 = e2.result[n4];
            Object.defineProperty(e2.result, n4, { get: () => (console.warn(s4), t4) });
          }
        }
        return function(e3) {
          return P(I("database", "success"), e3).then(() => P(I("database", "complete"), e3)).then(() => (o2(e3, null), q(O, { type: R, content: e3 }), Promise.resolve(e3)));
        }(e2);
      }, (e2) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e2.message) && console.warn("clientDB\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u5728web\u63A7\u5236\u53F0\u4FDD\u5B58\u4E00\u6B21schema\u4EE5\u5F00\u542FclientDB");
        return i2(new M({ code: e2.code || "SYSTEM_ERROR", message: e2.message, requestId: e2.requestId }));
      });
    }
  }
  function It(e) {
    e.database = function(t) {
      if (t && Object.keys(t).length > 0)
        return e.init(t).database();
      if (this._database)
        return this._database;
      const n2 = function(e2, t2 = {}) {
        return mt(new e2(t2), { get: (e3, t3) => wt("db", t3) ? vt({ $method: t3 }, null, e3) : function() {
          return vt({ $method: t3, $param: kt(Array.from(arguments)) }, null, e3);
        } });
      }(Pt, { uniClient: e });
      return this._database = n2, n2;
    };
  }
  const bt = "token\u65E0\u6548\uFF0C\u8DF3\u8F6C\u767B\u5F55\u9875\u9762", Ot = "token\u8FC7\u671F\uFF0C\u8DF3\u8F6C\u767B\u5F55\u9875\u9762", Ct = { TOKEN_INVALID_TOKEN_EXPIRED: Ot, TOKEN_INVALID_INVALID_CLIENTID: bt, TOKEN_INVALID: bt, TOKEN_INVALID_WRONG_TOKEN: bt, TOKEN_INVALID_ANONYMOUS_USER: bt }, Et = { "uni-id-token-expired": Ot, "uni-id-check-token-failed": bt, "uni-id-token-not-exist": bt, "uni-id-check-device-feature-failed": bt };
  function Rt(e, t) {
    let n2 = "";
    return n2 = e ? `${e}/${t}` : t, n2.replace(/^\//, "");
  }
  function Ut(e = [], t = "") {
    const n2 = [], s2 = [];
    return e.forEach((e2) => {
      e2.needLogin === true ? n2.push(Rt(t, e2.path)) : e2.needLogin === false && s2.push(Rt(t, e2.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function xt(e = "", t = {}) {
    if (!e)
      return false;
    if (!(t && t.list && t.list.length))
      return false;
    const n2 = t.list, s2 = e.split("?")[0].replace(/^\//, "");
    return n2.some((e2) => e2.pagePath === s2);
  }
  const Lt = !!PageJsonInit.uniIdRouter;
  const { loginPage: Dt, routerNeedLogin: Nt, resToLogin: qt, needLoginPage: Ft, notNeedLoginPage: Mt, loginPageInTabBar: $t } = function({ pages: e = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: o2 = {} } = PageJsonInit) {
    const { loginPage: r2, needLogin: i2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = Ut(e), { needLoginPage: l2, notNeedLoginPage: h2 } = function(e2 = []) {
      const t = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: o3 = [] } = e3, { needLoginPage: r3, notNeedLoginPage: i3 } = Ut(o3, s3);
        t.push(...r3), n3.push(...i3);
      }), { needLoginPage: t, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: r2, routerNeedLogin: i2, resToLogin: a2, needLoginPage: [...c2, ...l2], notNeedLoginPage: [...u2, ...h2], loginPageInTabBar: xt(r2, o2) };
  }();
  function jt(e) {
    const t = function(e2) {
      const t2 = getCurrentPages(), n2 = t2[t2.length - 1].route, s2 = e2.charAt(0), o2 = e2.split("?")[0];
      if (s2 === "/")
        return o2;
      const r2 = o2.replace(/^\//, "").split("/"), i2 = n2.split("/");
      i2.pop();
      for (let e3 = 0; e3 < r2.length; e3++) {
        const t3 = r2[e3];
        t3 === ".." ? i2.pop() : t3 !== "." && i2.push(t3);
      }
      return i2[0] === "" && i2.shift(), i2.join("/");
    }(e).replace(/^\//, "");
    return !(Mt.indexOf(t) > -1) && (Ft.indexOf(t) > -1 || Nt.some((t2) => function(e2, t3) {
      return new RegExp(t3).test(e2);
    }(e, t2)));
  }
  function Kt(e, t) {
    return e.charAt(0) !== "/" && (e = "/" + e), t ? e.indexOf("?") > -1 ? e + `&uniIdRedirectUrl=${encodeURIComponent(t)}` : e + `?uniIdRedirectUrl=${encodeURIComponent(t)}` : e;
  }
  function Bt() {
    const e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t = 0; t < e.length; t++) {
      const n2 = e[t];
      uni.addInterceptor(n2, { invoke(e2) {
        const { token: t2, tokenExpired: s2 } = nt();
        let o2;
        if (t2) {
          if (s2 < Date.now()) {
            const e3 = "uni-id-token-expired";
            o2 = { errCode: e3, errMsg: Et[e3] };
          }
        } else {
          const e3 = "uni-id-check-token-failed";
          o2 = { errCode: e3, errMsg: Et[e3] };
        }
        if (jt(e2.url) && o2) {
          o2.uniIdRedirectUrl = e2.url;
          if (L(C).length > 0)
            return setTimeout(() => {
              q(C, o2);
            }, 0), e2.url = "", false;
          if (!Dt)
            return e2;
          const t3 = Kt(Dt, o2.uniIdRedirectUrl);
          if ($t) {
            if (n2 === "navigateTo" || n2 === "redirectTo")
              return setTimeout(() => {
                uni.switchTab({ url: t3 });
              }), false;
          } else if (n2 === "switchTab")
            return setTimeout(() => {
              uni.navigateTo({ url: t3 });
            }), false;
          e2.url = t3;
        }
        return e2;
      } });
    }
  }
  function Ht() {
    this.onResponse((e) => {
      const { type: t, content: n2 } = e;
      let s2 = false;
      switch (t) {
        case "cloudobject":
          s2 = function(e2) {
            const { errCode: t2 } = e2;
            return t2 in Et;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e2) {
            const { errCode: t2 } = e2;
            return t2 in Ct;
          }(n2);
      }
      s2 && function(e2 = {}) {
        const t2 = L(C), n3 = getCurrentPages(), s3 = n3[n3.length - 1], o2 = s3 && s3.$page && s3.$page.fullPath;
        if (t2.length > 0)
          return q(C, Object.assign({ uniIdRedirectUrl: o2 }, e2));
        Dt && uni.navigateTo({ url: Kt(Dt, o2) });
      }(n2);
    });
  }
  function Wt(e) {
    e.onNeedLogin = function(e2) {
      D(C, e2);
    }, e.offNeedLogin = function(e2) {
      N(C, e2);
    }, Lt && (k("uni-cloud-status").needLoginInit || (k("uni-cloud-status").needLoginInit = true, function t() {
      let n2 = false;
      if (typeof getCurrentPages == "function") {
        const t2 = getCurrentPages();
        t2 && t2[0] && (Bt.call(e), n2 = true);
      }
      n2 || setTimeout(() => {
        t();
      }, 30);
    }(), qt && Ht.call(e)));
  }
  function zt(e) {
    !function(e2) {
      e2.onResponse = function(e3) {
        D(O, e3);
      }, e2.offResponse = function(e3) {
        N(O, e3);
      };
    }(e), Wt(e), function(e2) {
      e2.onRefreshToken = function(e3) {
        D(E, e3);
      }, e2.offRefreshToken = function(e3) {
        N(E, e3);
      };
    }(e);
  }
  let Vt;
  const Jt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Yt = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function Xt() {
    const e = nt().token || "", t = e.split(".");
    if (!e || t.length !== 3)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t[1], decodeURIComponent(Vt(s2).split("").map(function(e2) {
        return "%" + ("00" + e2.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e2) {
      throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + e2.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  Vt = typeof atob != "function" ? function(e) {
    if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !Yt.test(e))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t;
    e += "==".slice(2 - (3 & e.length));
    for (var n2, s2, o2 = "", r2 = 0; r2 < e.length; )
      t = Jt.indexOf(e.charAt(r2++)) << 18 | Jt.indexOf(e.charAt(r2++)) << 12 | (n2 = Jt.indexOf(e.charAt(r2++))) << 6 | (s2 = Jt.indexOf(e.charAt(r2++))), o2 += n2 === 64 ? String.fromCharCode(t >> 16 & 255) : s2 === 64 ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
    return o2;
  } : atob;
  var Gt = s(function(e, t) {
    Object.defineProperty(t, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function o2(e2, t2) {
      return e2.tempFiles.forEach((e3, n3) => {
        e3.name || (e3.name = e3.path.substring(e3.path.lastIndexOf("/") + 1)), t2 && (e3.fileType = t2), e3.cloudPath = Date.now() + "_" + n3 + e3.name.substring(e3.name.lastIndexOf("."));
      }), e2.tempFilePaths || (e2.tempFilePaths = e2.tempFiles.map((e3) => e3.path)), e2;
    }
    function r2(e2, t2, { onChooseFile: s3, onUploadProgress: o3 }) {
      return t2.then((e3) => {
        if (s3) {
          const t3 = s3(e3);
          if (t3 !== void 0)
            return Promise.resolve(t3).then((t4) => t4 === void 0 ? e3 : t4);
        }
        return e3;
      }).then((t3) => t3 === false ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e3, t4, s4 = 5, o4) {
        (t4 = Object.assign({}, t4)).errMsg = n2;
        const r3 = t4.tempFiles, i2 = r3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= i2)
              return void (!r3.find((e4) => !e4.url && !e4.errMsg) && n3(t4));
            const u2 = r3[s5];
            e3.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e4) {
              e4.index = s5, e4.tempFile = u2, e4.tempFilePath = u2.path, o4 && o4(e4);
            } }).then((e4) => {
              u2.url = e4.fileID, s5 < i2 && c2();
            }).catch((e4) => {
              u2.errMsg = e4.errMsg || e4.message, s5 < i2 && c2();
            });
          }
        });
      }(e2, t3, 5, o3));
    }
    t.initChooseAndUploadFile = function(e2) {
      return function(t2 = { type: "all" }) {
        return t2.type === "image" ? r2(e2, function(e3) {
          const { count: t3, sizeType: n3, sourceType: r3 = ["album", "camera"], extension: i2 } = e3;
          return new Promise((e4, a2) => {
            uni.chooseImage({ count: t3, sizeType: n3, sourceType: r3, extension: i2, success(t4) {
              e4(o2(t4, "image"));
            }, fail(e5) {
              a2({ errMsg: e5.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t2), t2) : t2.type === "video" ? r2(e2, function(e3) {
          const { camera: t3, compressed: n3, maxDuration: r3, sourceType: i2 = ["album", "camera"], extension: a2 } = e3;
          return new Promise((e4, c2) => {
            uni.chooseVideo({ camera: t3, compressed: n3, maxDuration: r3, sourceType: i2, extension: a2, success(t4) {
              const { tempFilePath: n4, duration: s3, size: r4, height: i3, width: a3 } = t4;
              e4(o2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t4.tempFile && t4.tempFile.name || "", path: n4, size: r4, type: t4.tempFile && t4.tempFile.type || "", width: a3, height: i3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e5) {
              c2({ errMsg: e5.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t2), t2) : r2(e2, function(e3) {
          const { count: t3, extension: n3 } = e3;
          return new Promise((e4, r3) => {
            let i2 = uni.chooseFile;
            if (typeof wx != "undefined" && typeof wx.chooseMessageFile == "function" && (i2 = wx.chooseMessageFile), typeof i2 != "function")
              return r3({ errMsg: s2 + " \u8BF7\u6307\u5B9A type \u7C7B\u578B\uFF0C\u8BE5\u5E73\u53F0\u4EC5\u652F\u6301\u9009\u62E9 image \u6216 video\u3002" });
            i2({ type: "all", count: t3, extension: n3, success(t4) {
              e4(o2(t4));
            }, fail(e5) {
              r3({ errMsg: e5.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t2), t2);
      };
    };
  }), Qt = n(Gt);
  const Zt = "manual";
  function en(e) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e2 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t) => {
          e2.push(this[t]);
        }), e2;
      }, (e2, t) => {
        if (this.loadtime === Zt)
          return;
        let n2 = false;
        const s2 = [];
        for (let o2 = 2; o2 < e2.length; o2++)
          e2[o2] !== t[o2] && (s2.push(e2[o2]), n2 = true);
        e2[0] !== t[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e2, t) {
    }, mixinDatacomEasyGet({ getone: e2 = false, success: t, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: o2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = o2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const r2 = e2 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = r2, t && t(r2);
      }).catch((e3) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e3, n2 && n2(e3);
      }));
    }, mixinDatacomGet(t = {}) {
      let n2 = e.database(this.spaceInfo);
      const s2 = t.action || this.action;
      s2 && (n2 = n2.action(s2));
      const o2 = t.collection || this.collection;
      n2 = Array.isArray(o2) ? n2.collection(...o2) : n2.collection(o2);
      const r2 = t.where || this.where;
      r2 && Object.keys(r2).length && (n2 = n2.where(r2));
      const i2 = t.field || this.field;
      i2 && (n2 = n2.field(i2));
      const a2 = t.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      (t.distinct !== void 0 ? t.distinct : this.distinct) === true && (n2 = n2.distinct());
      const l2 = t.orderby || this.orderby;
      l2 && (n2 = n2.orderBy(l2));
      const h2 = t.pageCurrent !== void 0 ? t.pageCurrent : this.mixinDatacomPage.current, d2 = t.pageSize !== void 0 ? t.pageSize : this.mixinDatacomPage.size, f2 = t.getcount !== void 0 ? t.getcount : this.getcount, g2 = t.gettree !== void 0 ? t.gettree : this.gettree, p2 = t.gettreepath !== void 0 ? t.gettreepath : this.gettreepath, m2 = { getCount: f2 }, y = { limitLevel: t.limitlevel !== void 0 ? t.limitlevel : this.limitlevel, startWith: t.startwith !== void 0 ? t.startwith : this.startwith };
      return g2 && (m2.getTree = y), p2 && (m2.getTreePath = y), n2 = n2.skip(d2 * (h2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function tn(e) {
    return function(t, n2 = {}) {
      n2 = function(e2, t2 = {}) {
        return e2.customUI = t2.customUI || e2.customUI, Object.assign(e2.loadingOptions, t2.loadingOptions), Object.assign(e2.errorOptions, t2.errorOptions), e2;
      }({ customUI: false, loadingOptions: { title: "\u52A0\u8F7D\u4E2D...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: o2, errorOptions: r2 } = n2, i2 = !s2;
      return new Proxy({}, { get: (n3, s3) => async function n4(...c2) {
        let u2;
        i2 && uni.showLoading({ title: o2.title, mask: o2.mask });
        try {
          u2 = await e.callFunction({ name: t, type: a, data: { method: s3, params: c2 } });
        } catch (e2) {
          u2 = { result: e2 };
        }
        const { errCode: l2, errMsg: h2, newToken: d2 } = u2.result || {};
        if (i2 && uni.hideLoading(), d2 && d2.token && d2.tokenExpired && (st(d2), q(E, __spreadValues({}, d2))), l2) {
          if (i2)
            if (r2.type === "toast")
              uni.showToast({ title: h2, icon: "none" });
            else {
              if (r2.type !== "modal")
                throw new Error(`Invalid errorOptions.type: ${r2.type}`);
              {
                const { confirm: e3 } = await async function({ title: e4, content: t2, showCancel: n5, cancelText: s4, confirmText: o3 } = {}) {
                  return new Promise((r3, i3) => {
                    uni.showModal({ title: e4, content: t2, showCancel: n5, cancelText: s4, confirmText: o3, success(e5) {
                      r3(e5);
                    }, fail() {
                      r3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "\u63D0\u793A", content: h2, showCancel: r2.retry, cancelText: "\u53D6\u6D88", confirmText: r2.retry ? "\u91CD\u8BD5" : "\u786E\u5B9A" });
                if (r2.retry && e3)
                  return n4(...c2);
              }
            }
          const e2 = new M({ code: l2, message: h2, requestId: u2.requestId });
          throw e2.detail = u2.result, q(O, { type: x, content: e2 }), e2;
        }
        return q(O, { type: x, content: u2.result }), u2.result;
      } });
    };
  }
  async function nn(e, t) {
    const n2 = `http://${e}:${t}/system/ping`;
    try {
      const e2 = await (s2 = { url: n2, timeout: 500 }, new Promise((e3, t2) => {
        H.request(__spreadProps(__spreadValues({}, s2), { success(t3) {
          e3(t3);
        }, fail(e4) {
          t2(e4);
        } }));
      }));
      return !(!e2.data || e2.data.code !== 0);
    } catch (e2) {
      return false;
    }
    var s2;
  }
  function sn(e) {
    if (e.initUniCloudStatus && e.initUniCloudStatus !== "rejected")
      return;
    let t = Promise.resolve();
    var n2;
    n2 = 1, t = new Promise((e2, t2) => {
      setTimeout(() => {
        e2();
      }, n2);
    }), e.isReady = false, e.isDefault = false;
    const s2 = e.auth();
    e.initUniCloudStatus = "pending", e.initUniCloud = t.then(() => s2.getLoginState()).then((e2) => e2 ? Promise.resolve() : s2.signInAnonymously()).then(() => {
      if (g === "app" && uni.getSystemInfoSync().osName === "ios") {
        const { osName: e2, osVersion: t2 } = uni.getSystemInfoSync();
        e2 === "ios" && function(e3) {
          if (!e3 || typeof e3 != "string")
            return 0;
          const t3 = e3.match(/^(\d+)./);
          return t3 && t3[1] ? parseInt(t3[1]) : 0;
        }(t2) >= 14 && console.warn("iOS 14\u53CA\u4EE5\u4E0A\u7248\u672C\u8FDE\u63A5uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u9700\u8981\u5141\u8BB8\u5BA2\u6237\u7AEF\u67E5\u627E\u5E76\u8FDE\u63A5\u5230\u672C\u5730\u7F51\u7EDC\u4E0A\u7684\u8BBE\u5907\uFF08\u4EC5\u5F00\u53D1\u6A21\u5F0F\u751F\u6548\uFF0C\u53D1\u884C\u6A21\u5F0F\u4F1A\u8FDE\u63A5uniCloud\u4E91\u7AEF\u670D\u52A1\uFF09");
      }
      if (e.debugInfo) {
        const { address: t2, servePort: n3 } = e.debugInfo;
        return async function(e2, t3) {
          let n4;
          for (let s3 = 0; s3 < e2.length; s3++) {
            const o2 = e2[s3];
            if (await nn(o2, t3)) {
              n4 = o2;
              break;
            }
          }
          return { address: n4, port: t3 };
        }(t2, n3);
      }
    }).then(({ address: t2, port: n3 } = {}) => {
      const s3 = console[g === "app" ? "error" : "warn"];
      if (t2)
        e.localAddress = t2, e.localPort = n3;
      else if (e.debugInfo) {
        let t3 = "";
        e.debugInfo.initialLaunchType === "remote" ? (e.debugInfo.forceRemote = true, t3 = "\u5F53\u524D\u5BA2\u6237\u7AEF\u548CHBuilderX\u4E0D\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF08\u6216\u5176\u4ED6\u7F51\u7EDC\u539F\u56E0\u65E0\u6CD5\u8FDE\u63A5HBuilderX\uFF09\uFF0CuniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u4E0D\u5BF9\u5F53\u524D\u5BA2\u6237\u7AEF\u751F\u6548\u3002\n- \u5982\u679C\u4E0D\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u76F4\u63A5\u5FFD\u7565\u6B64\u4FE1\u606F\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs") : t3 = "\u65E0\u6CD5\u8FDE\u63A5uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u5F53\u524D\u5BA2\u6237\u7AEF\u662F\u5426\u4E0E\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs", g === "web" && (t3 += "\n- \u90E8\u5206\u6D4F\u89C8\u5668\u5F00\u542F\u8282\u6D41\u6A21\u5F0F\u4E4B\u540E\u8BBF\u95EE\u672C\u5730\u5730\u5740\u53D7\u9650\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u542F\u7528\u4E86\u8282\u6D41\u6A21\u5F0F"), g.indexOf("mp-") === 0 && (t3 += "\n- \u5C0F\u7A0B\u5E8F\u4E2D\u5982\u4F55\u4F7F\u7528uniCloud\uFF0C\u8BF7\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), s3(t3);
      }
    }).then(() => {
      ot(), e.isReady = true, e.initUniCloudStatus = "fulfilled";
    }).catch((t2) => {
      console.error(t2), e.initUniCloudStatus = "rejected";
    });
  }
  let on = new class {
    init(e) {
      let t = {};
      const n2 = g === "web" && navigator.userAgent.indexOf("HBuilderX") > 0 || g === "app";
      switch (e.provider) {
        case "tcb":
        case "tencent":
          t = et.init(Object.assign(e, { debugLog: n2 }));
          break;
        case "aliyun":
          t = J.init(Object.assign(e, { debugLog: n2 }));
          break;
        case "private":
          t = it.init(Object.assign(e, { debugLog: n2 }));
          break;
        default:
          throw new Error("\u672A\u63D0\u4F9B\u6B63\u786E\u7684provider\u53C2\u6570");
      }
      const s2 = p;
      s2 && !s2.code && (t.debugInfo = s2), sn(t), t.reInit = function() {
        sn(this);
      }, gt(t), function(e2) {
        const t2 = e2.uploadFile;
        e2.uploadFile = function(e3) {
          return t2.call(this, e3);
        };
      }(t), It(t), function(e2) {
        e2.getCurrentUserInfo = Xt, e2.chooseAndUploadFile = Qt.initChooseAndUploadFile(e2), Object.assign(e2, { get mixinDatacom() {
          return en(e2);
        } }), e2.importObject = tn(e2);
      }(t);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e2) => {
        if (!t[e2])
          return;
        const n3 = t[e2];
        t[e2] = function() {
          return t.reInit(), n3.apply(t, Array.from(arguments));
        }, t[e2] = F(t[e2], e2).bind(t);
      }), t.init = this.init, t;
    }
  }();
  (() => {
    {
      const e = m;
      let t = {};
      if (e.length === 1)
        t = e[0], on = on.init(t), on.isDefault = true;
      else {
        const t2 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
        let n2;
        n2 = e && e.length > 0 ? "\u5E94\u7528\u6709\u591A\u4E2A\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u901A\u8FC7uniCloud.init\u65B9\u6CD5\u6307\u5B9A\u8981\u4F7F\u7528\u7684\u670D\u52A1\u7A7A\u95F4" : "uni-app cli\u9879\u76EE\u5185\u4F7F\u7528uniCloud\u9700\u8981\u4F7F\u7528HBuilderX\u7684\u8FD0\u884C\u83DC\u5355\u8FD0\u884C\u9879\u76EE\uFF0C\u4E14\u9700\u8981\u5728uniCloud\u76EE\u5F55\u5173\u8054\u670D\u52A1\u7A7A\u95F4", t2.forEach((e2) => {
          on[e2] = function() {
            return console.error(n2), Promise.reject(new M({ code: "SYS_ERR", message: n2 }));
          };
        });
      }
      Object.assign(on, { get mixinDatacom() {
        return en(on);
      } }), zt(on), on.addInterceptor = v, on.removeInterceptor = A, g === "web" && (window.uniCloud = on);
    }
  })();
  var rn = on;
  const ADType = {
    RewardedVideo: "RewardedVideo",
    FullScreenVideo: "FullScreenVideo",
    Interstitial: "Interstitial"
  };
  const EventType = {
    Load: "load",
    Close: "close",
    Error: "error"
  };
  const EXPIRED_TIME = 1e3 * 60 * 30;
  const ProviderType = {
    CSJ: "csj",
    GDT: "gdt"
  };
  const RETRY_COUNT = 1;
  class AdBase {
    constructor(adInstance, options = {}) {
      this._isLoad = false;
      this._isLoading = false;
      this._isPlaying = false;
      this._lastLoadTime = 0;
      this._lastError = null;
      this._retryCount = 0;
      if (options.retry !== void 0) {
        this._retry = options.retry;
      } else {
        this._retry = true;
      }
      this._loadCallback = null;
      this._closeCallback = null;
      this._errorCallback = null;
      const ad = this._ad = adInstance;
      ad.onLoad((e) => {
        this._isLoading = false;
        this._isLoad = true;
        this._lastLoadTime = Date.now();
        this.onLoad();
      });
      ad.onClose((e) => {
        this._isLoad = false;
        this._isPlaying = false;
        this.onClose(e);
      });
      ad.onVerify && ad.onVerify((e) => {
      });
      ad.onError(({
        code,
        message
      }) => {
        this._isLoading = false;
        const data = {
          code,
          errMsg: message
        };
        if (this._retry && code === -5008) {
          this._loadAd();
          return;
        }
        if (this._retry && this._retryCount < RETRY_COUNT) {
          this._retryCount += 1;
          this._loadAd();
          return;
        }
        this._lastError = data;
        this.onError(data);
      });
    }
    get isExpired() {
      return this._lastLoadTime !== 0 && Math.abs(Date.now() - this._lastLoadTime) > EXPIRED_TIME;
    }
    get isLoad() {
      return this._isLoad;
    }
    get isLoading() {
      return this._isLoading;
    }
    getProvider() {
      return this._ad.getProvider();
    }
    load(onload, onerror) {
      this._loadCallback = onload;
      this._errorCallback = onerror;
      if (this._isPlaying) {
        onerror && onerror();
        return;
      }
      if (this._isLoading) {
        return;
      }
      if (this._isLoad) {
        this.onLoad();
        return;
      }
      this._retryCount = 0;
      this._loadAd();
    }
    show(onclose, onshow) {
      this._closeCallback = onclose;
      if (this._isLoading || this._isPlaying || !this._isLoad) {
        return;
      }
      if (this._lastError !== null) {
        this.onError(this._lastError);
        return;
      }
      const provider = this.getProvider();
      if (provider === ProviderType.CSJ && this.isExpired) {
        if (this._retry) {
          this._loadAd();
        } else {
          this.onError(this._lastError);
        }
        return;
      }
      this._isPlaying = true;
      this._ad.show();
      onshow && onshow();
    }
    onLoad(e) {
      if (this._loadCallback != null) {
        this._loadCallback();
      }
    }
    onClose(e) {
      if (this._closeCallback != null) {
        this._closeCallback({
          isEnded: e.isEnded
        });
      }
    }
    onError(e) {
      if (this._errorCallback != null) {
        this._errorCallback(e);
      }
    }
    destroy() {
      this._ad.destroy();
    }
    _loadAd() {
      this._isLoad = false;
      this._isLoading = true;
      this._lastError = null;
      this._ad.load();
    }
  }
  class RewardedVideo extends AdBase {
    constructor(options = {}) {
      super(plus.ad.createRewardedVideoAd(options), options);
    }
  }
  class FullScreenVideo extends AdBase {
    constructor(options = {}) {
      super(plus.ad.createFullScreenVideoAd(options), options);
    }
  }
  class Interstitial extends AdBase {
    constructor(options = {}) {
      super(plus.ad.createInterstitialAd(options), options);
    }
  }
  class AdHelper {
    constructor(adType) {
      this._ads = {};
      this._adType = adType;
      this._lastWaterfallIndex = -1;
    }
    load(options, onload, onerror) {
      if (!options.adpid || this.isBusy(options.adpid)) {
        return;
      }
      this.get(options).load(onload, onerror);
    }
    show(options, onload, onerror, onclose, onshow) {
      const ad = this.get(options);
      if (ad.isLoad) {
        this._lastWaterfallIndex = -1;
        ad.show((e) => {
          onclose && onclose(e);
        }, () => {
          onshow && onshow();
        });
      } else {
        ad.load(() => {
          this._lastWaterfallIndex = -1;
          onload && onload();
          ad.show((e) => {
            onclose && onclose(e);
          }, () => {
            onshow && onshow();
          });
        }, (err) => {
          onerror && onerror(err);
        });
      }
    }
    loadWaterfall(options, onload, onfail, index = 0) {
      const {
        adpid,
        urlCallback
      } = options;
      if (!Array.isArray(adpid)) {
        return;
      }
      const options2 = {
        adpid: adpid[index],
        urlCallback,
        retry: false
      };
      console.log("ad.loadWaterfall::index=" + index);
      this.load(options2, (res) => {
        this._lastWaterfallIndex = index;
        onload(options2);
      }, (err) => {
        index++;
        if (index >= adpid.length) {
          onfail(err);
        } else {
          this.loadWaterfall(options, onload, onfail, index);
        }
      });
    }
    showWaterfall(options, onload, onfail, onclose, onshow, index = 0) {
      const {
        adpid,
        urlCallback
      } = options;
      if (!Array.isArray(adpid)) {
        return;
      }
      if (this._lastWaterfallIndex > -1) {
        index = this._lastWaterfallIndex;
      }
      const options2 = {
        adpid: adpid[index],
        urlCallback,
        retry: false
      };
      console.log("ad.showWaterfall::index=" + index);
      this.show(options2, () => {
        onload();
      }, (err) => {
        index++;
        if (index >= adpid.length) {
          onfail(err);
        } else {
          this.showWaterfall(options, onload, onfail, onclose, onshow, index);
        }
      }, (res) => {
        onclose(res);
      }, () => {
        onshow();
      });
    }
    preloadWaterfall(options, index = 0, step = 1) {
      if (step === 1) {
        this.loadWaterfall(options, (res) => {
          console.log("preloadWaterfall.success::", res);
        }, (err) => {
          console.log("loadWaterfall.fail", err);
        });
        return;
      }
      const {
        adpid,
        urlCallback
      } = options;
      for (let i2 = 0; i2 < step; i2++) {
        if (index < adpid.length) {
          const options2 = {
            adpid: adpid[index],
            urlCallback
          };
          this.loadWaterfall(options2, (res) => {
            console.log("preloadWaterfall.success::", res);
          }, (err) => {
            console.log("loadWaterfall.fail", err);
            this.preloadWaterfall(options, index, step);
          });
          index++;
        } else {
          break;
        }
      }
    }
    isBusy(adpid) {
      return this._ads[adpid] && this._ads[adpid].isLoading;
    }
    get(options) {
      const {
        adpid
      } = options;
      if (!this._ads[adpid]) {
        this._ads[adpid] = this._createInstance(options);
      }
      return this._ads[adpid];
    }
    getProvider(adpid) {
      if (this._ads[adpid]) {
        return this._ads[adpid].getProvider();
      }
      return null;
    }
    remove(adpid) {
      if (this._ads[adpid]) {
        this._ads[adpid].destroy();
        delete this._ads[adpid];
      }
    }
    _createInstance(options) {
      const adType = options.adType || this._adType;
      delete options.adType;
      let ad = null;
      if (adType === ADType.RewardedVideo) {
        ad = new RewardedVideo(options);
      } else if (adType === ADType.FullScreenVideo) {
        ad = new FullScreenVideo(options);
      } else if (adType === ADType.Interstitial) {
        ad = new Interstitial(options, true);
      }
      return ad;
    }
  }
  var adMixin = {
    props: {
      options: {
        type: [Object, Array],
        default() {
          return {};
        }
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      adpid: {
        type: [Number, String, Array],
        default: ""
      },
      preload: {
        type: [Boolean, String],
        default: true
      },
      loadnext: {
        type: [Boolean, String],
        default: false
      },
      urlCallback: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        loading: false,
        errorMessage: null
      };
    },
    created() {
      this.$watch("adpid", (newValue, oldValue) => {
        this._removeInstance(oldValue);
        if (this.preload) {
          this._loadAd();
        }
      });
      this.$watch("urlCallback", () => {
        this._removeInstance();
      });
      this._adHelper = new AdHelper(this.adType);
      setTimeout(() => {
        if (this.preload) {
          this._loadAd();
        }
      }, 100);
    },
    methods: {
      load() {
        if (this.isLoading) {
          return;
        }
        this._startLoading();
        const invoke = this._isWaterfall() ? "loadWaterfall" : "load";
        this._adHelper[invoke](this._getAdOptions(), () => {
          this._onLoad();
        }, (err) => {
          this._onLoadFail(err);
        });
      },
      show() {
        if (this.isLoading) {
          return;
        }
        this._startLoading();
        const invoke = this._isWaterfall() ? "showWaterfall" : "show";
        this._adHelper[invoke](this._getAdOptions(), () => {
          this._onLoad();
        }, (err) => {
          this._onLoadFail(err);
        }, (res) => {
          this._dispatchEvent(EventType.Close, res);
          if (this.loadnext) {
            this.load();
          }
        }, () => {
          this.loading = false;
        });
      },
      getProvider() {
        if (Array.isArray(this.adpid)) {
          return null;
        }
        return this._adHelper.getProvider(this.adpid);
      },
      _loadAd() {
        if (this._canCreateAd()) {
          this.load();
        }
      },
      _onclick() {
        if (!this.disabled) {
          this.show();
        }
      },
      _getAdOptions() {
        return {
          adpid: this.adpid,
          urlCallback: this.urlCallback
        };
      },
      _isWaterfall() {
        return Array.isArray(this.adpid) && this.adpid.length > 0;
      },
      _canCreateAd() {
        let result = false;
        if (Array.isArray(this.adpid) && this.adpid.length > 0) {
          result = true;
        } else if (typeof this.adpid === "string" && this.adpid.length > 0) {
          result = true;
        } else if (typeof this.adpid === "number") {
          result = true;
        }
        return result;
      },
      _removeInstance(adpid) {
        const id = adpid || this.adpid;
        if (Array.isArray(id)) {
          id.forEach((item) => {
            this._adHelper.remove(item);
          });
        } else if (id) {
          this._adHelper.remove(id);
        }
      },
      _startLoading() {
        this.loading = true;
        this.errorMessage = null;
      },
      _onLoad() {
        this.loading = false;
        this._dispatchEvent(EventType.Load, {});
      },
      _onLoadFail(err) {
        this.loading = false;
        this.errorMessage = JSON.stringify(err);
        this._dispatchEvent(EventType.Error, err);
      },
      _dispatchEvent(type, data) {
        this.$emit(type, {
          detail: data
        });
      }
    }
  };
  const _sfc_main$t = {
    name: "AdRewardedVideo",
    mixins: [adMixin],
    props: {
      adType: {
        type: String,
        default: "RewardedVideo"
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx._onclick && _ctx._onclick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {
        options: _ctx.options,
        loading: _ctx.loading,
        error: _ctx.errorMessage
      })
    ]);
  }
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$n], ["__file", "D:/Code/app/tmui-cli-zscg/node_modules/@dcloudio/uni-components/lib/ad-rewarded-video/ad-rewarded-video.vue"]]);
  const _sfc_main$s = {
    props: {
      direction: {
        type: String,
        default: "below"
      },
      width: {
        type: Number,
        default: 100
      },
      height: {
        type: String,
        default: "fit-content"
      },
      is_close: {
        type: Boolean,
        default: true
      },
      is_mask: {
        type: Boolean,
        default: true
      },
      maskFun: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        open: false
      };
    },
    methods: {
      show() {
        this.open = true;
        this.$emit("watchOpen");
      },
      close(e) {
        if (e == 1 && !this.maskFun)
          return;
        this.open = false;
        this.$emit("watchClose");
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" v-if\u89E3\u51B3center\u5F39\u7A97\u4F4D\u7F6E\u95EE\u9898 "),
      ($props.direction === "center" ? $data.open : true) ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: vue.normalizeClass($props.direction === "center" ? "centers" : "")
      }, [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["product-window", ($data.open ? "on" : "") + " " + $props.direction]),
          style: vue.normalizeStyle({ width: $props.width + "%", height: $props.height == "fit-content" ? $props.height : $data.open ? $props.height : "fit-content" }),
          onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop", "prevent"]))
        }, [
          vue.createCommentVNode(" \u517C\u5BB9h5\u9876\u90E8\u5BFC\u822A\u7A7A\u4F4D "),
          $props.direction !== "below" && $props.direction !== "center" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            style: { "height": "100rpx" }
          })) : vue.createCommentVNode("v-if", true),
          $props.is_close ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            src: "/static/ming-pop/close.png",
            mode: "",
            class: vue.normalizeClass([$props.direction !== "below" && $props.direction !== "center" ? "iconfont-h5" : "", "iconfont"]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.close && $options.close(...args))
          }, null, 2)) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 38),
        $props.is_mask ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "mask",
          onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers(() => {
          }, ["prevent"])),
          hidden: !$data.open,
          onClick: _cache[3] || (_cache[3] = ($event) => $options.close(1))
        }, null, 40, ["hidden"])) : vue.createCommentVNode("v-if", true)
      ], 2)) : vue.createCommentVNode("v-if", true)
    ], 2112);
  }
  var pop = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$m], ["__scopeId", "data-v-6ef4c5ef"], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/ming-pop/ming-pop.vue"]]);
  var w = uni.getSystemInfoSync().windowWidth;
  var h = uni.getSystemInfoSync().windowHeight;
  const _sfc_main$r = {
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
        uni.setStorage({
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
      if (uni.getStorageSync("userinfo").id) {
        this.uid = uni.getStorageSync("userinfo").id;
      }
      this.ongrzlTap();
    },
    onShow() {
      plus.navigator.setFullscreen(true);
    },
    onHide() {
      plus.navigator.setFullscreen(false);
    },
    onUnload() {
      plus.navigator.setFullscreen(false);
    },
    onShareAppMessage(res) {
      var this_ = this;
      if (res.from === "menu") {
        formatAppLog("log", "at pages/bizhi/infotp.vue:163", res.target);
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
        data.token = uni.getStorageSync("userinfo").token;
        data.uid = uni.getStorageSync("userinfo").id;
        uni.request({
          url: "https://lhsk.demo.hongcd.com/api/index/index",
          data,
          success: (res) => {
            this.adpid = res.data.data.config.site.appapi.adpid;
            var mrcs = res.data.data.config.mrcs;
            var mrcsjr = res.data.data.config.mrcsjr;
            this.mrcs = mrcs;
            if (this.videoids || this.adpid) {
              this.mrcsjr = mrcsjr;
            }
            this.mrcsjrk = mrcs - mrcsjr;
            this.$refs.adRewardedVideo.load();
          },
          fail: (data2, code) => {
          }
        });
      },
      getinfo(id) {
        uni.showLoading({
          title: "\u52A0\u8F7D\u4E2D"
        });
        let data = {};
        data.id = id;
        data.mid = this.mid;
        if (uni.getStorageSync("userinfo").token) {
          data.token = uni.getStorageSync("userinfo").token;
          this.isLogin = true;
        }
        uni.request({
          url: "https://lhsk.demo.hongcd.com/api/video/infotp",
          data,
          success: (data2) => {
            uni.hideLoading();
            if (uni.getStorageSync("userinfo").token) {
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
            uni.hideLoading();
          }
        });
      },
      opdownloadFile() {
        var that = this;
        uni.showLoading({
          title: "\u6B63\u5728\u4FDD\u5B58\u56FE\u7247"
        });
        var url = that.detail.images[that.indexCurrent - 1];
        url.substring(url.lastIndexOf(".") + 1);
        new Date().valueOf();
        formatAppLog("log", "at pages/bizhi/infotp.vue:261", url);
        uni.downloadFile({
          url,
          success: (res) => {
            var benUrl = res.tempFilePath;
            formatAppLog("log", "at pages/bizhi/infotp.vue:267", res);
            uni.saveImageToPhotosAlbum({
              filePath: benUrl,
              success: function(data) {
                uni.hideLoading();
                uni.showModal({
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
                  formatAppLog("log", "at pages/bizhi/infotp.vue:288", err.errMsg);
                  uni.showModal({
                    title: "\u63D0\u793A",
                    content: "\u65E0\u6743\u9650\uFF0C\u8BF7\u6253\u5F00\u4E0B\u8F7D\u6743\u9650\u540E\u518D\u8BD5\uFF01",
                    showCancel: false,
                    success(res2) {
                      if (res2.confirm) {
                        uni.openSetting({
                          success(settingdata) {
                            if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                              uni.saveImageToPhotosAlbum({
                                filePath: benUrl,
                                success: function(data) {
                                  uni.hideLoading();
                                  that.adShow = true;
                                }
                              });
                            } else {
                              uni.showModal({
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
                uni.hideLoading();
              }
            });
          },
          fail: (error) => {
            formatAppLog("log", "at pages/bizhi/infotp.vue:328", error);
          }
        });
      },
      winClick() {
        if (uni.getStorageSync("userinfo").id)
          ;
        else {
          uni.showModal({
            title: "\u6E29\u99A8\u63D0\u793A",
            content: "\u8BF7\u5148\u767B\u540E\u4E0B\u8F7D",
            showCancel: true,
            confirmText: "\u786E\u5B9A",
            success: function(res) {
              if (res.confirm) {
                uni.navigateTo({
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
        formatAppLog("log", "at pages/bizhi/infotp.vue:362", this.isfx);
        if (this.isfx == 1) {
          uni.switchTab({
            url: "/pages/client/indexpic"
          });
        } else {
          uni.navigateBack();
        }
      },
      collectClick() {
        this.isColl = true;
        uni.showToast({
          icon: "none",
          title: "\u6536\u85CF\u6210\u529F",
          mask: true,
          duration: 1e3
        });
      },
      zanClick() {
        this.isZan = true;
        uni.showToast({
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
      adClick() {
        var mrcs = this.mrcs;
        if (this.mrcsjrk <= 0) {
          uni.showModal({
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
        if (!that.adpid) {
          uni.showToast({ title: "adpid\u83B7\u53D6\u5931\u8D25", icon: "none" });
          return;
        }
        if (that.adpid) {
          that.$refs.adRewardedVideo.show();
        }
      },
      onadload(e) {
        formatAppLog("log", "at pages/bizhi/infotp.vue:486", "\u5E7F\u544A\u6570\u636E\u52A0\u8F7D\u6210\u529F");
      },
      onadclose(e) {
        const detail = e.detail;
        if (detail && detail.isEnded) {
          this.admoney();
          formatAppLog("log", "at pages/bizhi/infotp.vue:494", "onClose " + detail.isEnded);
        } else {
          formatAppLog("log", "at pages/bizhi/infotp.vue:497", "onClose " + detail.isEnded);
        }
      },
      onaderror(e) {
        formatAppLog("log", "at pages/bizhi/infotp.vue:504", e.detail);
      },
      async userIntegral() {
        var that = this;
        uni.showLoading({
          mask: true,
          title: "\u52A0\u8F7D\u4E2D..."
        });
        let data = await rn.callFunction({
          name: "user_integral",
          data: {
            userId: that.vuex_user._id
          }
        });
        uni.hideLoading();
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
        if (uni.getStorageSync("userinfo").token) {
          data.token = uni.getStorageSync("userinfo").token;
        }
        let [err, res] = await this.$httpas.get("/api/user/admoney", data);
        if (!this.$httpas.errorCheck(err, res))
          return;
        if (res.data.code === 1) {
          uni.setStorage({
            key: "config",
            data: res.data.data
          });
          uni.showModal({
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
          uni.showToast({ title: "\u83B7\u53D6\u5931\u8D25", icon: "none" });
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
          data.token = uni.getStorageSync("userinfo").token;
          data.uid = uni.getStorageSync("userinfo").id;
          formatAppLog("log", "at pages/bizhi/infotp.vue:574", data);
          uni.request({
            url: this.configs.webUrl + "/api/pay/videopay",
            data,
            success: (resa) => {
              if (data.buytype == "\u5FAE\u4FE1") {
                if (this.wxlx == "wxxcx" && resa.data.code == 1) {
                  this.wxxcx(resa.data.data);
                } else {
                  uni.navigateTo({
                    url: "/pages/client/webva?url=" + resa.data.data
                  });
                }
              } else if (data.buytype == "\u4F59\u989D") {
                if (resa.data.code == 1) {
                  uni.showModal({
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
                    uni.showModal({
                      title: "\u63D0\u793A",
                      content: "\u79EF\u5206\u4E0D\u8DB3\uFF0C\u770B\u5E7F\u544A\u53EF\u4EE5\u83B7\u53D6",
                      showCancel: true,
                      confirmText: "\u770B\u5E7F\u544A",
                      success: (res) => {
                        this_.adClick();
                      }
                    });
                  } else {
                    uni.showModal({
                      title: "\u63D0\u793A",
                      content: resa.data.msg,
                      showCancel: false,
                      success: (res) => {
                        uni.navigateBack();
                      }
                    });
                  }
                }
              }
            },
            fail: (data2, code) => {
              formatAppLog("log", "at pages/bizhi/infotp.vue:637", "fail" + JSON.stringify(data2));
            }
          });
        }
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_pop = vue.resolveComponent("pop");
    const _component_ad_rewarded_video = resolveEasycom(vue.resolveDynamicComponent("ad-rewarded-video"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
      vue.withDirectives(vue.createElementVNode("view", {
        class: "",
        onTouchmove: _cache[6] || (_cache[6] = vue.withModifiers(($event) => _ctx.a = false, ["stop", "prevent"])),
        onCatchtouchmove: _cache[7] || (_cache[7] = ($event) => _ctx.a = false)
      }, [
        vue.createElementVNode("view", {
          class: "",
          style: {}
        }, [
          vue.createElementVNode("swiper", {
            style: { "height": "100vh", "width": "100vw" },
            circular: true,
            onChange: _cache[1] || (_cache[1] = (...args) => $options.swiperChange && $options.swiperChange(...args)),
            current: $data.activeCurrent
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.detail.images, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                vue.createElementVNode("image", {
                  src: item,
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.cssClick && $options.cssClick(...args)),
                  style: { "height": "100vh", "width": "100vw", "display": "flex" },
                  mode: "aspectFill"
                }, null, 8, ["src"])
              ]);
            }), 128))
          ], 40, ["current"])
        ]),
        !$data.loadFlag ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: vue.normalizeClass(["bottom", $data.cssTran ? "closeCss" : "openCss"])
        }, [
          vue.createElementVNode("view", { class: "num" }, vue.toDisplayString($data.indexCurrent) + " / " + vue.toDisplayString($data.detail.imageslength), 1),
          vue.createElementVNode("view", { class: "nav-box" }, [
            vue.createElementVNode("view", {
              class: "nav-tab",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.backClick())
            }, [
              vue.createElementVNode("image", {
                style: { "width": "50upx", "height": "50upx" },
                src: $data.staticUrl + "back.png"
              }, null, 8, ["src"]),
              vue.createElementVNode("text", { style: { "font-size": "24upx" } }, "\u8FD4\u56DE")
            ]),
            vue.createElementVNode("view", {
              class: "nav-tab",
              onClick: _cache[3] || (_cache[3] = ($event) => $options.collectClick())
            }, [
              vue.createElementVNode("image", {
                style: { "width": "50upx", "height": "50upx" },
                src: $data.isColl ? $data.staticUrl + "coll_art.png" : $data.staticUrl + "coll.png"
              }, null, 8, ["src"]),
              vue.createElementVNode("text", { style: { "font-size": "24upx" } }, vue.toDisplayString($data.isColl ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF"), 1)
            ]),
            vue.createElementVNode("view", {
              class: "nav-tab",
              onClick: _cache[4] || (_cache[4] = ($event) => $options.winClick($data.detail._id))
            }, [
              vue.createElementVNode("image", {
                style: { "width": "50upx", "height": "50upx" },
                src: $data.staticUrl + "duihuan.png"
              }, null, 8, ["src"]),
              vue.createElementVNode("text", { style: { "font-size": "24upx" } }, "\u4E0B\u8F7D")
            ]),
            vue.createElementVNode("view", {
              class: "nav-tab",
              onClick: _cache[5] || (_cache[5] = ($event) => $options.zanClick())
            }, [
              vue.createElementVNode("image", {
                style: { "width": "50upx", "height": "50upx" },
                src: $data.isZan ? $data.staticUrl + "zan_art.png" : $data.staticUrl + "zan.png"
              }, null, 8, ["src"]),
              vue.createElementVNode("text", { style: { "font-size": "24upx" } }, vue.toDisplayString($data.isZan ? "\u5DF2\u70B9\u8D5E" : "\u70B9\u8D5E"), 1)
            ]),
            vue.createElementVNode("view", {
              "open-type": "share",
              class: "nav-tab"
            }, [
              vue.createElementVNode("image", {
                style: { "width": "50upx", "height": "50upx" },
                src: $data.staticUrl + "shares.png"
              }, null, 8, ["src"]),
              vue.createElementVNode("text", { style: { "font-size": "24upx" } }, "\u5206\u4EAB"),
              vue.createElementVNode("button", {
                "open-type": "share",
                style: { "position": "absolute", "top": "0", "left": "0", "width": "100%", "height": "100%", "opacity": "0" }
              })
            ])
          ])
        ], 2)) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(' <view v-if="tipsShow" style="position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;z-index: 11;" @click="tipsClick">\r\n				<image src="../../static/tips.png" style="width: 100%;height: 100%;display: flex;" mode="aspectFill"></image>\r\n			</view> ')
      ], 544), [
        [vue.vShow, !$data.loadFlag]
      ]),
      vue.withDirectives(vue.createElementVNode("view", { class: "loading_page" }, null, 512), [
        [vue.vShow, $data.loadFlag]
      ]),
      vue.createVNode(_component_pop, {
        ref: "pop",
        direction: "center",
        is_close: true,
        is_mask: true,
        width: 90,
        height: "fit-content",
        maskFun: true,
        onWatchOpen: $options.watchOpen,
        onWatchClose: $options.watchClose
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", null, [
            $data.detail.isplay == 0 ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "ffdfgg",
              onClick: _cache[8] || (_cache[8] = ($event) => $options.opdownloadFile())
            }, "\u4E0B\u8F7D")) : (vue.openBlock(), vue.createElementBlock("text", {
              key: 1,
              class: "ffdfgg",
              onClick: _cache[9] || (_cache[9] = ($event) => $options.duihss())
            }, "\uFFE5" + vue.toDisplayString($data.price) + " \u5151\u6362\u4E0B\u8F7D", 1)),
            vue.createElementVNode("text", {
              class: "ffdfgg",
              onClick: _cache[10] || (_cache[10] = ($event) => $options.adClick())
            }, "\u770B\u5E7F\u544A\u83B7\u53D6\u79EF\u5206")
          ])
        ]),
        _: 1
      }, 8, ["onWatchOpen", "onWatchClose"]),
      vue.createVNode(_component_ad_rewarded_video, {
        ref: "adRewardedVideo",
        adpid: $data.adpid,
        preload: false,
        loadnext: false,
        disabled: true,
        onLoad: $options.onadload,
        onClose: $options.onadclose,
        onError: $options.onaderror
      }, {
        default: vue.withCtx(({ loading, error }) => [
          error ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "ad-error"
          }, vue.toDisplayString(error), 1)) : vue.createCommentVNode("v-if", true)
        ]),
        _: 1
      }, 8, ["adpid", "onLoad", "onClose", "onError"])
    ]);
  }
  var PagesBizhiInfotp = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$l], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/bizhi/infotp.vue"]]);
  var cfg = {
    errorImg: null,
    filter: null,
    highlight: null,
    onText: null,
    entities: {
      quot: '"',
      apos: "'",
      semi: ";",
      nbsp: "\xA0",
      ensp: "\u2002",
      emsp: "\u2003",
      ndash: "\u2013",
      mdash: "\u2014",
      middot: "\xB7",
      lsquo: "\u2018",
      rsquo: "\u2019",
      ldquo: "\u201C",
      rdquo: "\u201D",
      bull: "\u2022",
      hellip: "\u2026"
    },
    blankChar: makeMap(" ,\xA0,	,\r,\n,\f"),
    boolAttrs: makeMap("allowfullscreen,autoplay,autostart,controls,ignore,loop,muted"),
    blockTags: makeMap("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),
    ignoreTags: makeMap("area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr"),
    richOnlyTags: makeMap("a,colgroup,fieldset,legend"),
    selfClosingTags: makeMap("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),
    trustTags: makeMap("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),
    userAgentStyles: {
      address: "font-style:italic",
      big: "display:inline;font-size:1.2em",
      blockquote: "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",
      caption: "display:table-caption;text-align:center",
      center: "text-align:center",
      cite: "font-style:italic",
      dd: "margin-left:40px",
      mark: "background-color:yellow",
      pre: "font-family:monospace;white-space:pre;overflow:scroll",
      s: "text-decoration:line-through",
      small: "display:inline;font-size:0.8em",
      u: "text-decoration:underline"
    }
  };
  function makeMap(str) {
    var map = /* @__PURE__ */ Object.create(null), list = str.split(",");
    for (var i2 = list.length; i2--; )
      map[list[i2]] = true;
    return map;
  }
  cfg.ignoreTags.iframe = void 0;
  Object.assign(cfg.trustTags, makeMap("embed,iframe"));
  var inline = {
    abbr: 1,
    b: 1,
    big: 1,
    code: 1,
    del: 1,
    em: 1,
    i: 1,
    ins: 1,
    label: 1,
    q: 1,
    small: 1,
    span: 1,
    strong: 1,
    sub: 1,
    sup: 1
  };
  let global$1 = {};
  global$1.Parser = {};
  const errorImg = cfg.errorImg;
  const _sfc_main$q = {
    components: {
      trees
    },
    name: "trees",
    data() {
      return {
        ctrl: [],
        placeholder: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="225"/>',
        errorImg,
        loadVideo: typeof plus == "undefined",
        c: "",
        s: ""
      };
    },
    props: {
      nodes: Array,
      lazyLoad: Boolean,
      loading: String
    },
    mounted() {
      for (this.top = this.$parent; this.top.$options.name != "parser"; this.top = this.top.$parent)
        ;
      this.init();
    },
    beforeUnmount() {
      this.observer && this.observer.disconnect();
    },
    methods: {
      init() {
        for (var i2 = this.nodes.length, n2; n2 = this.nodes[--i2]; ) {
          if (n2.name == "img") {
            this.top.imgList.setItem(n2.attrs.i, n2.attrs["original-src"] || n2.attrs.src);
            if (this.lazyLoad && !this.observer) {
              this.observer = uni.createIntersectionObserver(this).relativeToViewport({
                top: 500,
                bottom: 500
              });
              setTimeout(() => {
                this.observer.observe("._img", (res) => {
                  if (res.intersectionRatio) {
                    for (var j2 = this.nodes.length; j2--; )
                      if (this.nodes[j2].name == "img")
                        this.$set(this.ctrl, j2, 1);
                    this.observer.disconnect();
                  }
                });
              }, 0);
            }
          } else if (n2.name == "video" || n2.name == "audio") {
            var ctx;
            if (n2.name == "video") {
              ctx = uni.createVideoContext(n2.attrs.id, this);
            } else if (this.$refs[n2.attrs.id])
              ctx = this.$refs[n2.attrs.id][0];
            if (ctx) {
              ctx.id = n2.attrs.id;
              this.top.videoContexts.push(ctx);
            }
          }
        }
        setTimeout(() => {
          this.loadVideo = true;
        }, 1e3);
      },
      play(e) {
        var contexts = this.top.videoContexts;
        if (contexts.length > 1 && this.top.autopause) {
          for (var i2 = contexts.length; i2--; )
            if (contexts[i2].id != e.currentTarget.dataset.id)
              contexts[i2].pause();
        }
      },
      imgtap(e) {
        var attrs = e.currentTarget.dataset.attrs;
        if (!attrs.ignore) {
          var preview2 = true, data = {
            id: e.target.id,
            src: attrs.src,
            ignore: () => preview2 = false
          };
          global$1.Parser.onImgtap && global$1.Parser.onImgtap(data);
          this.top.$emit("imgtap", data);
          if (preview2) {
            var urls = this.top.imgList, current = urls[attrs.i] ? parseInt(attrs.i) : (urls = [attrs.src], 0);
            uni.previewImage({
              current,
              urls
            });
          }
        }
      },
      loadImg(e) {
        var i2 = e.currentTarget.dataset.i;
        if (this.lazyLoad && !this.ctrl[i2])
          ;
        else if (this.loading && this.ctrl[i2] != 2) {
          this.$set(this.ctrl, i2, 2);
        }
      },
      linkpress(e) {
        var jump = true, attrs = e.currentTarget.dataset.attrs;
        attrs.ignore = () => jump = false;
        global$1.Parser.onLinkpress && global$1.Parser.onLinkpress(attrs);
        this.top.$emit("linkpress", attrs);
        if (jump) {
          if (attrs.href) {
            if (attrs.href[0] == "#") {
              if (this.top.useAnchor)
                this.top.navigateTo({
                  id: attrs.href.substring(1)
                });
            } else if (attrs.href.indexOf("http") == 0 || attrs.href.indexOf("//") == 0) {
              plus.runtime.openWeb(attrs.href);
            } else
              uni.navigateTo({
                url: attrs.href,
                fail() {
                  uni.switchTab({
                    url: attrs.href
                  });
                }
              });
          }
        }
      },
      error(e) {
        var target = e.currentTarget, source = target.dataset.source, i2 = target.dataset.i;
        if (source == "video" || source == "audio") {
          var index = this.ctrl[i2] ? this.ctrl[i2].i + 1 : 1;
          if (index < this.nodes[i2].attrs.source.length)
            this.$set(this.ctrl, i2, index);
          if (e.detail.__args__)
            e.detail = e.detail.__args__[0];
        }
        this.top && this.top.$emit("error", {
          source,
          target,
          errMsg: e.detail.errMsg
        });
      },
      _loadVideo(e) {
        this.$set(this.ctrl, e.target.dataset.i, 0);
      },
      use(item) {
        return !item.c && !inline[item.name] && (item.attrs.style || "").indexOf("display:inline") == -1;
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_trees = vue.resolveComponent("trees", true);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass("interlayer " + ($data.c || "")),
      style: vue.normalizeStyle($data.s)
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.nodes, (n2, i2) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: i2 }, [
          vue.createCommentVNode("\u56FE\u7247"),
          n2.name == "img" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: vue.normalizeClass("_img " + n2.attrs.class),
            style: vue.normalizeStyle(n2.attrs.style),
            "data-attrs": n2.attrs,
            onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.imgtap && $options.imgtap(...args), ["stop"]))
          }, [
            $data.ctrl[i2] != 0 ? (vue.openBlock(), vue.createElementBlock("rich-text", {
              key: 0,
              nodes: [{ attrs: { src: $props.loading && ($data.ctrl[i2] || 0) < 2 ? $props.loading : $props.lazyLoad && !$data.ctrl[i2] ? $data.placeholder : $data.ctrl[i2] == 3 ? $data.errorImg : n2.attrs.src || "", alt: n2.attrs.alt || "", width: n2.attrs.width || "", style: "-webkit-touch-callout:none;max-width:100%;display:block" + (n2.attrs.height ? ";height:" + n2.attrs.height : "") }, name: "img" }]
            }, null, 8, ["nodes"])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("image", {
              class: "_image",
              src: $props.lazyLoad && !$data.ctrl[i2] ? $data.placeholder : n2.attrs.src,
              "lazy-load": $props.lazyLoad,
              "show-menu-by-longpress": !n2.attrs.ignore,
              "data-i": i2,
              "data-index": n2.attrs.i,
              "data-source": "img",
              onLoad: _cache[0] || (_cache[0] = (...args) => $options.loadImg && $options.loadImg(...args)),
              onError: _cache[1] || (_cache[1] = (...args) => $options.error && $options.error(...args))
            }, null, 40, ["src", "lazy-load", "show-menu-by-longpress", "data-i", "data-index"])
          ], 14, ["data-attrs"])) : n2.type == "text" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode("\u6587\u672C"),
            vue.createElementVNode("text", { decode: "" }, vue.toDisplayString(n2.text), 1)
          ], 2112)) : n2.name == "br" ? (vue.openBlock(), vue.createElementBlock("text", { key: 2 }, "\\n")) : (n2.lazyLoad && !n2.attrs.autoplay || n2.name == "video" && !$data.loadVideo) && $data.ctrl[i2] == void 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
            vue.createCommentVNode("\u89C6\u9891"),
            vue.createElementVNode("view", {
              id: n2.attrs.id,
              class: vue.normalizeClass("_video " + (n2.attrs.class || "")),
              style: vue.normalizeStyle(n2.attrs.style),
              "data-i": i2,
              onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options._loadVideo && $options._loadVideo(...args), ["stop"]))
            }, null, 14, ["id", "data-i"])
          ], 2112)) : n2.name == "video" ? (vue.openBlock(), vue.createElementBlock("video", {
            key: 4,
            id: n2.attrs.id,
            class: vue.normalizeClass(n2.attrs.class),
            style: vue.normalizeStyle(n2.attrs.style),
            autoplay: n2.attrs.autoplay || $data.ctrl[i2] == 0,
            controls: n2.attrs.controls,
            loop: n2.attrs.loop,
            muted: n2.attrs.muted,
            poster: n2.attrs.poster,
            src: n2.attrs.source[$data.ctrl[i2] || 0],
            "unit-id": n2.attrs["unit-id"],
            "data-id": n2.attrs.id,
            "data-i": i2,
            "data-source": "video",
            onError: _cache[4] || (_cache[4] = (...args) => $options.error && $options.error(...args)),
            onPlay: _cache[5] || (_cache[5] = (...args) => $options.play && $options.play(...args))
          }, null, 46, ["id", "autoplay", "controls", "loop", "muted", "poster", "src", "unit-id", "data-id", "data-i"])) : n2.name == "audio" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 5 }, [
            vue.createCommentVNode("\u97F3\u9891"),
            vue.createElementVNode("audio", {
              ref_for: true,
              ref: n2.attrs.id,
              class: vue.normalizeClass(n2.attrs.class),
              style: vue.normalizeStyle(n2.attrs.style),
              author: n2.attrs.author,
              autoplay: n2.attrs.autoplay,
              controls: n2.attrs.controls,
              loop: n2.attrs.loop,
              name: n2.attrs.name,
              poster: n2.attrs.poster,
              src: n2.attrs.source[$data.ctrl[i2] || 0],
              "data-i": i2,
              "data-id": n2.attrs.id,
              "data-source": "audio",
              onError: _cache[6] || (_cache[6] = (...args) => $options.error && $options.error(...args)),
              onPlay: _cache[7] || (_cache[7] = (...args) => $options.play && $options.play(...args))
            }, null, 46, ["author", "autoplay", "controls", "loop", "name", "poster", "src", "data-i", "data-id"])
          ], 2112)) : n2.name == "a" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 6 }, [
            vue.createCommentVNode("\u94FE\u63A5"),
            vue.createElementVNode("view", {
              id: n2.attrs.id,
              class: vue.normalizeClass("_a " + (n2.attrs.class || "")),
              "hover-class": "_hover",
              style: vue.normalizeStyle(n2.attrs.style),
              "data-attrs": n2.attrs,
              onClick: _cache[8] || (_cache[8] = vue.withModifiers((...args) => $options.linkpress && $options.linkpress(...args), ["stop"]))
            }, [
              vue.createVNode(_component_trees, {
                class: "_span",
                c: "_span",
                nodes: n2.children
              }, null, 8, ["nodes"])
            ], 14, ["id", "data-attrs"])
          ], 2112)) : n2.name == "li" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 7 }, [
            vue.createCommentVNode("\u5E7F\u544A"),
            vue.createCommentVNode(`<ad v-else-if="n.name=='ad'" :class="n.attrs.class" :style="n.attrs.style" :unit-id="n.attrs['unit-id']" :appid="n.attrs.appid" :apid="n.attrs.apid" :type="n.attrs.type" :adpid="n.attrs.adpid" data-source="ad" @error="error" />`),
            vue.createCommentVNode("\u5217\u8868"),
            vue.createElementVNode("view", {
              id: n2.attrs.id,
              class: vue.normalizeClass(n2.attrs.class),
              style: vue.normalizeStyle((n2.attrs.style || "") + ";display:flex;flex-direction:row")
            }, [
              n2.type == "ol" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "_ol-bef"
              }, vue.toDisplayString(n2.num), 1)) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "_ul-bef"
              }, [
                n2.floor % 3 == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "_ul-p1"
                }, "\u2588")) : n2.floor % 3 == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "_ul-p2"
                })) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  class: "_ul-p1",
                  style: { "border-radius": "50%" }
                }, "\u2588"))
              ])),
              vue.createVNode(_component_trees, {
                class: "_li",
                c: "_li",
                nodes: n2.children,
                lazyLoad: $props.lazyLoad,
                loading: $props.loading
              }, null, 8, ["nodes", "lazyLoad", "loading"])
            ], 14, ["id"])
          ], 2112)) : n2.name == "table" && n2.c && n2.flag ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 8 }, [
            vue.createCommentVNode("\u8868\u683C"),
            vue.createElementVNode("view", {
              id: n2.attrs.id,
              class: vue.normalizeClass(n2.attrs.class),
              style: vue.normalizeStyle((n2.attrs.style || "") + ";display:grid")
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(n2.children, (cell, n3) => {
                return vue.openBlock(), vue.createBlock(_component_trees, {
                  key: n3,
                  class: vue.normalizeClass(cell.attrs.class),
                  c: cell.attrs.class,
                  style: vue.normalizeStyle(cell.attrs.style),
                  s: cell.attrs.style,
                  nodes: cell.children
                }, null, 8, ["class", "c", "style", "s", "nodes"]);
              }), 128))
            ], 14, ["id"])
          ], 2112)) : n2.name == "table" && n2.c ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 9,
            id: n2.attrs.id,
            class: vue.normalizeClass(n2.attrs.class),
            style: vue.normalizeStyle((n2.attrs.style || "") + ";display:table")
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(n2.children, (tbody, o2) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: o2,
                class: vue.normalizeClass(tbody.attrs.class),
                style: vue.normalizeStyle((tbody.attrs.style || "") + (tbody.name[0] == "t" ? ";display:table-" + (tbody.name == "tr" ? "row" : "row-group") : ""))
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tbody.children, (tr, p2) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: p2,
                    class: vue.normalizeClass(tr.attrs.class),
                    style: vue.normalizeStyle((tr.attrs.style || "") + (tr.name[0] == "t" ? ";display:table-" + (tr.name == "tr" ? "row" : "cell") : ""))
                  }, [
                    tr.name == "td" ? (vue.openBlock(), vue.createBlock(_component_trees, {
                      key: 0,
                      nodes: tr.children
                    }, null, 8, ["nodes"])) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(tr.children, (td, q2) => {
                      return vue.openBlock(), vue.createBlock(_component_trees, {
                        key: q2,
                        class: vue.normalizeClass(td.attrs.class),
                        c: td.attrs.class,
                        style: vue.normalizeStyle((td.attrs.style || "") + (td.name[0] == "t" ? ";display:table-" + (td.name == "tr" ? "row" : "cell") : "")),
                        s: (td.attrs.style || "") + (td.name[0] == "t" ? ";display:table-" + (td.name == "tr" ? "row" : "cell") : ""),
                        nodes: td.children
                      }, null, 8, ["class", "c", "style", "s", "nodes"]);
                    }), 128))
                  ], 6);
                }), 128))
              ], 6);
            }), 128))
          ], 14, ["id"])) : n2.name == "iframe" ? (vue.openBlock(), vue.createElementBlock("iframe", {
            key: 10,
            style: vue.normalizeStyle(n2.attrs.style),
            allowfullscreen: n2.attrs.allowfullscreen,
            frameborder: n2.attrs.frameborder,
            width: n2.attrs.width,
            height: n2.attrs.height,
            src: n2.attrs.src
          }, null, 12, ["allowfullscreen", "frameborder", "width", "height", "src"])) : n2.name == "embed" ? (vue.openBlock(), vue.createElementBlock("embed", {
            key: 11,
            style: vue.normalizeStyle(n2.attrs.style),
            width: n2.attrs.width,
            height: n2.attrs.height,
            src: n2.attrs.src
          }, null, 12, ["width", "height", "src"])) : $options.use(n2) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 12 }, [
            vue.createCommentVNode("\u5BCC\u6587\u672C"),
            vue.createElementVNode("rich-text", {
              id: n2.attrs.id,
              class: vue.normalizeClass("_p __" + n2.name),
              nodes: [n2]
            }, null, 10, ["id", "nodes"])
          ], 2112)) : (vue.openBlock(), vue.createBlock(_component_trees, {
            key: 13,
            class: vue.normalizeClass((n2.attrs.id || "") + " _" + n2.name + " " + (n2.attrs.class || "")),
            c: (n2.attrs.id || "") + " _" + n2.name + " " + (n2.attrs.class || ""),
            style: vue.normalizeStyle(n2.attrs.style),
            s: n2.attrs.style,
            nodes: n2.children,
            lazyLoad: $props.lazyLoad,
            loading: $props.loading
          }, null, 8, ["class", "c", "style", "s", "nodes", "lazyLoad", "loading"]))
        ], 64);
      }), 128))
    ], 6);
  }
  var trees = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$k], ["__scopeId", "data-v-a5cbf050"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/u-parse/libs/trees.vue"]]);
  var isLetter = (c2) => c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z";
  function CssHandler(tagStyle) {
    var styles = Object.assign(/* @__PURE__ */ Object.create(null), cfg.userAgentStyles);
    for (var item in tagStyle)
      styles[item] = (styles[item] ? styles[item] + ";" : "") + tagStyle[item];
    this.styles = styles;
  }
  CssHandler.prototype.getStyle = function(data) {
    this.styles = new parser(data, this.styles).parse();
  };
  CssHandler.prototype.match = function(name, attrs) {
    var tmp, matched = (tmp = this.styles[name]) ? tmp + ";" : "";
    if (attrs.class) {
      var items = attrs.class.split(" ");
      for (var i2 = 0, item; item = items[i2]; i2++)
        if (tmp = this.styles["." + item])
          matched += tmp + ";";
    }
    if (tmp = this.styles["#" + attrs.id])
      matched += tmp + ";";
    return matched;
  };
  function parser(data, init) {
    this.data = data;
    this.floor = 0;
    this.i = 0;
    this.list = [];
    this.res = init;
    this.state = this.Space;
  }
  parser.prototype.parse = function() {
    for (var c2; c2 = this.data[this.i]; this.i++)
      this.state(c2);
    return this.res;
  };
  parser.prototype.section = function() {
    return this.data.substring(this.start, this.i);
  };
  parser.prototype.Space = function(c2) {
    if (c2 == "." || c2 == "#" || isLetter(c2)) {
      this.start = this.i;
      this.state = this.Name;
    } else if (c2 == "/" && this.data[this.i + 1] == "*")
      this.Comment();
    else if (!cfg.blankChar[c2] && c2 != ";")
      this.state = this.Ignore;
  };
  parser.prototype.Comment = function() {
    this.i = this.data.indexOf("*/", this.i) + 1;
    if (!this.i)
      this.i = this.data.length;
    this.state = this.Space;
  };
  parser.prototype.Ignore = function(c2) {
    if (c2 == "{")
      this.floor++;
    else if (c2 == "}" && !--this.floor) {
      this.list = [];
      this.state = this.Space;
    }
  };
  parser.prototype.Name = function(c2) {
    if (cfg.blankChar[c2]) {
      this.list.push(this.section());
      this.state = this.NameSpace;
    } else if (c2 == "{") {
      this.list.push(this.section());
      this.Content();
    } else if (c2 == ",") {
      this.list.push(this.section());
      this.Comma();
    } else if (!isLetter(c2) && (c2 < "0" || c2 > "9") && c2 != "-" && c2 != "_")
      this.state = this.Ignore;
  };
  parser.prototype.NameSpace = function(c2) {
    if (c2 == "{")
      this.Content();
    else if (c2 == ",")
      this.Comma();
    else if (!cfg.blankChar[c2])
      this.state = this.Ignore;
  };
  parser.prototype.Comma = function() {
    while (cfg.blankChar[this.data[++this.i]])
      ;
    if (this.data[this.i] == "{")
      this.Content();
    else {
      this.start = this.i--;
      this.state = this.Name;
    }
  };
  parser.prototype.Content = function() {
    this.start = ++this.i;
    if ((this.i = this.data.indexOf("}", this.i)) == -1)
      this.i = this.data.length;
    var content = this.section();
    for (var i2 = 0, item; item = this.list[i2++]; )
      if (this.res[item])
        this.res[item] += ";" + content;
      else
        this.res[item] = content;
    this.list = [];
    this.state = this.Space;
  };
  var blankChar = cfg.blankChar;
  var windowWidth = uni.getSystemInfoSync().windowWidth;
  function MpHtmlParser(data, options = {}) {
    this.attrs = {};
    this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
    this.data = data;
    this.domain = options.domain;
    this.DOM = [];
    this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
    options.prot = (this.domain || "").includes("://") ? this.domain.split("://")[0] : "http";
    this.options = options;
    this.state = this.Text;
    this.STACK = [];
    this.bubble = () => {
      for (var i2 = this.STACK.length, item; item = this.STACK[--i2]; ) {
        if (cfg.richOnlyTags[item.name])
          return false;
        item.c = 1;
      }
      return true;
    };
    this.decode = (val, amp) => {
      var i2 = -1, j2, en2;
      while (1) {
        if ((i2 = val.indexOf("&", i2 + 1)) == -1)
          break;
        if ((j2 = val.indexOf(";", i2 + 2)) == -1)
          break;
        if (val[i2 + 1] == "#") {
          en2 = parseInt((val[i2 + 2] == "x" ? "0" : "") + val.substring(i2 + 2, j2));
          if (!isNaN(en2))
            val = val.substr(0, i2) + String.fromCharCode(en2) + val.substr(j2 + 1);
        } else {
          en2 = val.substring(i2 + 1, j2);
          if (cfg.entities[en2] || en2 == amp)
            val = val.substr(0, i2) + (cfg.entities[en2] || "&") + val.substr(j2 + 1);
        }
      }
      return val;
    };
    this.getUrl = (url) => {
      if (url[0] == "/") {
        if (url[1] == "/")
          url = this.options.prot + ":" + url;
        else if (this.domain)
          url = this.domain + url;
      } else if (this.domain && url.indexOf("data:") != 0 && !url.includes("://"))
        url = this.domain + "/" + url;
      return url;
    };
    this.isClose = () => this.data[this.i] == ">" || this.data[this.i] == "/" && this.data[this.i + 1] == ">";
    this.section = () => this.data.substring(this.start, this.i);
    this.parent = () => this.STACK[this.STACK.length - 1];
    this.siblings = () => this.STACK.length ? this.parent().children : this.DOM;
  }
  MpHtmlParser.prototype.parse = function() {
    for (var c2; c2 = this.data[this.i]; this.i++)
      this.state(c2);
    if (this.state == this.Text)
      this.setText();
    while (this.STACK.length)
      this.popNode(this.STACK.pop());
    return this.DOM;
  };
  MpHtmlParser.prototype.setAttr = function() {
    var name = this.attrName.toLowerCase(), val = this.attrVal;
    if (cfg.boolAttrs[name])
      this.attrs[name] = "T";
    else if (val) {
      if (name == "src" || name == "data-src" && !this.attrs.src)
        this.attrs.src = this.getUrl(this.decode(val, "amp"));
      else if (name == "href" || name == "style")
        this.attrs[name] = this.decode(val, "amp");
      else if (name.substr(0, 5) != "data-")
        this.attrs[name] = val;
    }
    this.attrVal = "";
    while (blankChar[this.data[this.i]])
      this.i++;
    if (this.isClose())
      this.setNode();
    else {
      this.start = this.i;
      this.state = this.AttrName;
    }
  };
  MpHtmlParser.prototype.setText = function() {
    var text = this.section();
    if (!text)
      return;
    text = text;
    if (!this.pre) {
      var flag, tmp = [];
      for (let i2 = text.length, c2; c2 = text[--i2]; )
        if (!blankChar[c2]) {
          tmp.unshift(c2);
          if (!flag)
            flag = 1;
        } else {
          if (tmp[0] != " ")
            tmp.unshift(" ");
          if (c2 == "\n" && flag == void 0)
            flag = 0;
        }
      if (flag == 0)
        return;
      text = tmp.join("");
    }
    this.siblings().push({
      type: "text",
      text: this.decode(text)
    });
  };
  MpHtmlParser.prototype.setNode = function() {
    var node = {
      name: this.tagName.toLowerCase(),
      attrs: this.attrs
    }, close = cfg.selfClosingTags[node.name];
    if (this.options.nodes.length)
      node.type = "node";
    this.attrs = {};
    if (!cfg.ignoreTags[node.name]) {
      var attrs = node.attrs, style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ""), styleObj = {};
      if (attrs.id) {
        if (this.options.compress & 1)
          attrs.id = void 0;
        else if (this.options.useAnchor)
          this.bubble();
      }
      if (this.options.compress & 2 && attrs.class)
        attrs.class = void 0;
      switch (node.name) {
        case "a":
        case "ad":
        case "iframe":
          this.bubble();
          break;
        case "font":
          if (attrs.color) {
            styleObj["color"] = attrs.color;
            attrs.color = void 0;
          }
          if (attrs.face) {
            styleObj["font-family"] = attrs.face;
            attrs.face = void 0;
          }
          if (attrs.size) {
            var size = parseInt(attrs.size);
            if (size < 1)
              size = 1;
            else if (size > 7)
              size = 7;
            var map = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
            styleObj["font-size"] = map[size - 1];
            attrs.size = void 0;
          }
          break;
        case "embed":
          this.bubble();
          break;
        case "video":
        case "audio":
          if (!attrs.id)
            attrs.id = node.name + ++this[`${node.name}Num`];
          else
            this[`${node.name}Num`]++;
          if (node.name == "video") {
            if (this.videoNum > 3)
              node.lazyLoad = 1;
            if (attrs.width) {
              styleObj.width = parseFloat(attrs.width) + (attrs.width.includes("%") ? "%" : "px");
              attrs.width = void 0;
            }
            if (attrs.height) {
              styleObj.height = parseFloat(attrs.height) + (attrs.height.includes("%") ? "%" : "px");
              attrs.height = void 0;
            }
          }
          if (!attrs.controls && !attrs.autoplay)
            attrs.controls = "T";
          attrs.source = [];
          if (attrs.src) {
            attrs.source.push(attrs.src);
            attrs.src = void 0;
          }
          this.bubble();
          break;
        case "td":
        case "th":
          if (attrs.colspan || attrs.rowspan) {
            for (var k2 = this.STACK.length, item; item = this.STACK[--k2]; )
              if (item.name == "table") {
                item.flag = 1;
                break;
              }
          }
      }
      if (attrs.align) {
        if (node.name == "table") {
          if (attrs.align == "center")
            styleObj["margin-inline-start"] = styleObj["margin-inline-end"] = "auto";
          else
            styleObj["float"] = attrs.align;
        } else
          styleObj["text-align"] = attrs.align;
        attrs.align = void 0;
      }
      var styles = style.split(";");
      style = "";
      for (var i2 = 0, len = styles.length; i2 < len; i2++) {
        var info = styles[i2].split(":");
        if (info.length < 2)
          continue;
        let key2 = info[0].trim().toLowerCase(), value2 = info.slice(1).join(":").trim();
        if (value2[0] == "-" || value2.includes("safe"))
          style += `;${key2}:${value2}`;
        else if (!styleObj[key2] || value2.includes("import") || !styleObj[key2].includes("import"))
          styleObj[key2] = value2;
      }
      if (node.name == "img") {
        if (attrs.src && !attrs.ignore) {
          if (this.bubble())
            attrs.i = (this.imgNum++).toString();
          else
            attrs.ignore = "T";
        }
        if (attrs.ignore) {
          style += ";-webkit-touch-callout:none";
          styleObj["max-width"] = "100%";
        }
        var width;
        if (styleObj.width)
          width = styleObj.width;
        else if (attrs.width)
          width = attrs.width.includes("%") ? attrs.width : parseFloat(attrs.width) + "px";
        if (width) {
          styleObj.width = width;
          attrs.width = "100%";
          if (parseInt(width) > windowWidth) {
            styleObj.height = "";
            if (attrs.height)
              attrs.height = void 0;
          }
        }
        if (styleObj.height) {
          attrs.height = styleObj.height;
          styleObj.height = "";
        } else if (attrs.height && !attrs.height.includes("%"))
          attrs.height = parseFloat(attrs.height) + "px";
      }
      for (var key in styleObj) {
        var value = styleObj[key];
        if (!value)
          continue;
        if (key.includes("flex") || key == "order" || key == "self-align")
          node.c = 1;
        if (value.includes("url")) {
          var j2 = value.indexOf("(");
          if (j2++ != -1) {
            while (value[j2] == '"' || value[j2] == "'" || blankChar[value[j2]])
              j2++;
            value = value.substr(0, j2) + this.getUrl(value.substr(j2));
          }
        } else if (value.includes("rpx"))
          value = value.replace(/[0-9.]+\s*rpx/g, ($2) => parseFloat($2) * windowWidth / 750 + "px");
        else if (key == "white-space" && value.includes("pre") && !close)
          this.pre = node.pre = true;
        style += `;${key}:${value}`;
      }
      style = style.substr(1);
      if (style)
        attrs.style = style;
      if (!close) {
        node.children = [];
        if (node.name == "pre" && cfg.highlight) {
          this.remove(node);
          this.pre = node.pre = true;
        }
        this.siblings().push(node);
        this.STACK.push(node);
      } else
        this.siblings().push(node);
    } else {
      if (!close)
        this.remove(node);
      else if (node.name == "source") {
        var parent = this.parent();
        if (parent && (parent.name == "video" || parent.name == "audio") && node.attrs.src)
          parent.attrs.source.push(node.attrs.src);
      } else if (node.name == "base" && !this.domain)
        this.domain = node.attrs.href;
    }
    if (this.data[this.i] == "/")
      this.i++;
    this.start = this.i + 1;
    this.state = this.Text;
  };
  MpHtmlParser.prototype.remove = function(node) {
    var name = node.name, j2 = this.i;
    var handleSvg = () => {
      var src = this.data.substring(j2, this.i + 1);
      node.attrs.xmlns = "http://www.w3.org/2000/svg";
      for (var key in node.attrs) {
        if (key == "viewbox")
          src = ` viewBox="${node.attrs.viewbox}"` + src;
        else if (key != "style")
          src = ` ${key}="${node.attrs[key]}"` + src;
      }
      src = "<svg" + src;
      var parent = this.parent();
      if (node.attrs.width == "100%" && parent && (parent.attrs.style || "").includes("inline"))
        parent.attrs.style = "width:300px;max-width:100%;" + parent.attrs.style;
      this.siblings().push({
        name: "img",
        attrs: {
          src: "data:image/svg+xml;utf8," + src.replace(/#/g, "%23"),
          style: node.attrs.style,
          ignore: "T"
        }
      });
    };
    if (node.name == "svg" && this.data[j2] == "/")
      return handleSvg(this.i++);
    while (1) {
      if ((this.i = this.data.indexOf("</", this.i + 1)) == -1) {
        if (name == "pre" || name == "svg")
          this.i = j2;
        else
          this.i = this.data.length;
        return;
      }
      this.start = this.i += 2;
      while (!blankChar[this.data[this.i]] && !this.isClose())
        this.i++;
      if (this.section().toLowerCase() == name) {
        if (name == "pre") {
          this.data = this.data.substr(0, j2 + 1) + cfg.highlight(this.data.substring(j2 + 1, this.i - 5), node.attrs) + this.data.substr(this.i - 5);
          return this.i = j2;
        } else if (name == "style")
          this.CssHandler.getStyle(this.data.substring(j2 + 1, this.i - 7));
        else if (name == "title")
          this.DOM.title = this.data.substring(j2 + 1, this.i - 7);
        if ((this.i = this.data.indexOf(">", this.i)) == -1)
          this.i = this.data.length;
        if (name == "svg")
          handleSvg();
        return;
      }
    }
  };
  MpHtmlParser.prototype.popNode = function(node) {
    if (node.pre) {
      node.pre = this.pre = void 0;
      for (let i2 = this.STACK.length; i2--; )
        if (this.STACK[i2].pre)
          this.pre = true;
    }
    var siblings = this.siblings(), len = siblings.length, childs = node.children;
    if (node.name == "head" || cfg.filter)
      return siblings.pop();
    var attrs = node.attrs;
    if (cfg.blockTags[node.name])
      node.name = "div";
    else if (!cfg.trustTags[node.name])
      node.name = "span";
    if (node.c && (node.name == "ul" || node.name == "ol")) {
      if ((node.attrs.style || "").includes("list-style:none")) {
        for (let i2 = 0, child; child = childs[i2++]; )
          if (child.name == "li")
            child.name = "div";
      } else if (node.name == "ul") {
        var floor = 1;
        for (let i2 = this.STACK.length; i2--; )
          if (this.STACK[i2].name == "ul")
            floor++;
        if (floor != 1)
          for (let i2 = childs.length; i2--; )
            childs[i2].floor = floor;
      } else {
        for (let i2 = 0, num = 1, child; child = childs[i2++]; )
          if (child.name == "li") {
            child.type = "ol";
            child.num = ((num2, type) => {
              if (type == "a")
                return String.fromCharCode(97 + (num2 - 1) % 26);
              if (type == "A")
                return String.fromCharCode(65 + (num2 - 1) % 26);
              if (type == "i" || type == "I") {
                num2 = (num2 - 1) % 99 + 1;
                var one = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], ten = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], res = (ten[Math.floor(num2 / 10) - 1] || "") + (one[num2 % 10 - 1] || "");
                if (type == "i")
                  return res.toLowerCase();
                return res;
              }
              return num2;
            })(num++, attrs.type) + ".";
          }
      }
    }
    if (node.name == "table") {
      var padding = parseFloat(attrs.cellpadding), spacing = parseFloat(attrs.cellspacing), border = parseFloat(attrs.border);
      if (node.c) {
        if (isNaN(padding))
          padding = 2;
        if (isNaN(spacing))
          spacing = 2;
      }
      if (border)
        attrs.style = `border:${border}px solid gray;${attrs.style || ""}`;
      if (node.flag && node.c) {
        attrs.style = `${attrs.style || ""};${spacing ? `;grid-gap:${spacing}px` : ";border-left:0;border-top:0"}`;
        var row = 1, col = 1, colNum, trs = [], children = [], map = {};
        (function f2(ns) {
          for (var i2 = 0; i2 < ns.length; i2++) {
            if (ns[i2].name == "tr")
              trs.push(ns[i2]);
            else
              f2(ns[i2].children || []);
          }
        })(node.children);
        for (let i2 = 0; i2 < trs.length; i2++) {
          for (let j2 = 0, td; td = trs[i2].children[j2]; j2++) {
            if (td.name == "td" || td.name == "th") {
              while (map[row + "." + col])
                col++;
              var cell = {
                name: "div",
                c: 1,
                attrs: {
                  style: (td.attrs.style || "") + (border ? `;border:${border}px solid gray` + (spacing ? "" : ";border-right:0;border-bottom:0") : "") + (padding ? `;padding:${padding}px` : "")
                },
                children: td.children
              };
              if (td.attrs.colspan) {
                cell.attrs.style += ";grid-column-start:" + col + ";grid-column-end:" + (col + parseInt(td.attrs.colspan));
                if (!td.attrs.rowspan)
                  cell.attrs.style += ";grid-row-start:" + row + ";grid-row-end:" + (row + 1);
                col += parseInt(td.attrs.colspan) - 1;
              }
              if (td.attrs.rowspan) {
                cell.attrs.style += ";grid-row-start:" + row + ";grid-row-end:" + (row + parseInt(td.attrs.rowspan));
                if (!td.attrs.colspan)
                  cell.attrs.style += ";grid-column-start:" + col + ";grid-column-end:" + (col + 1);
                for (var k2 = 1; k2 < td.attrs.rowspan; k2++)
                  map[row + k2 + "." + col] = 1;
              }
              children.push(cell);
              col++;
            }
          }
          if (!colNum) {
            colNum = col - 1;
            attrs.style += `;grid-template-columns:repeat(${colNum},auto)`;
          }
          col = 1;
          row++;
        }
        node.children = children;
      } else {
        attrs.style = `border-spacing:${spacing}px;${attrs.style || ""}`;
        if (border || padding)
          (function f2(ns) {
            for (var i2 = 0, n2; n2 = ns[i2]; i2++) {
              if (n2.name == "th" || n2.name == "td") {
                if (border)
                  n2.attrs.style = `border:${border}px solid gray;${n2.attrs.style || ""}`;
                if (padding)
                  n2.attrs.style = `padding:${padding}px;${n2.attrs.style || ""}`;
              } else
                f2(n2.children || []);
            }
          })(childs);
      }
      if (this.options.autoscroll) {
        var table = Object.assign({}, node);
        node.name = "div";
        node.attrs = {
          style: "overflow:scroll"
        };
        node.children = [table];
      }
    }
    this.CssHandler.pop && this.CssHandler.pop(node);
    if (node.name == "div" && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == "div")
      siblings[len - 1] = childs[0];
  };
  MpHtmlParser.prototype.Text = function(c2) {
    if (c2 == "<") {
      var next = this.data[this.i + 1], isLetter2 = (c3) => c3 >= "a" && c3 <= "z" || c3 >= "A" && c3 <= "Z";
      if (isLetter2(next)) {
        this.setText();
        this.start = this.i + 1;
        this.state = this.TagName;
      } else if (next == "/") {
        this.setText();
        if (isLetter2(this.data[++this.i + 1])) {
          this.start = this.i + 1;
          this.state = this.EndTag;
        } else
          this.Comment();
      } else if (next == "!" || next == "?") {
        this.setText();
        this.Comment();
      }
    }
  };
  MpHtmlParser.prototype.Comment = function() {
    var key;
    if (this.data.substring(this.i + 2, this.i + 4) == "--")
      key = "-->";
    else if (this.data.substring(this.i + 2, this.i + 9) == "[CDATA[")
      key = "]]>";
    else
      key = ">";
    if ((this.i = this.data.indexOf(key, this.i + 2)) == -1)
      this.i = this.data.length;
    else
      this.i += key.length - 1;
    this.start = this.i + 1;
    this.state = this.Text;
  };
  MpHtmlParser.prototype.TagName = function(c2) {
    if (blankChar[c2]) {
      this.tagName = this.section();
      while (blankChar[this.data[this.i]])
        this.i++;
      if (this.isClose())
        this.setNode();
      else {
        this.start = this.i;
        this.state = this.AttrName;
      }
    } else if (this.isClose()) {
      this.tagName = this.section();
      this.setNode();
    }
  };
  MpHtmlParser.prototype.AttrName = function(c2) {
    if (c2 == "=" || blankChar[c2] || this.isClose()) {
      this.attrName = this.section();
      if (blankChar[c2])
        while (blankChar[this.data[++this.i]])
          ;
      if (this.data[this.i] == "=") {
        while (blankChar[this.data[++this.i]])
          ;
        this.start = this.i--;
        this.state = this.AttrValue;
      } else
        this.setAttr();
    }
  };
  MpHtmlParser.prototype.AttrValue = function(c2) {
    if (c2 == '"' || c2 == "'") {
      this.start++;
      if ((this.i = this.data.indexOf(c2, this.i + 1)) == -1)
        return this.i = this.data.length;
      this.attrVal = this.section();
      this.i++;
    } else {
      for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++)
        ;
      this.attrVal = this.section();
    }
    this.setAttr();
  };
  MpHtmlParser.prototype.EndTag = function(c2) {
    if (blankChar[c2] || c2 == ">" || c2 == "/") {
      var name = this.section().toLowerCase();
      for (var i2 = this.STACK.length; i2--; )
        if (this.STACK[i2].name == name)
          break;
      if (i2 != -1) {
        var node;
        while ((node = this.STACK.pop()).name != name)
          this.popNode(node);
        this.popNode(node);
      } else if (name == "p" || name == "br")
        this.siblings().push({
          name,
          attrs: {}
        });
      this.i = this.data.indexOf(">", this.i);
      this.start = this.i + 1;
      if (this.i == -1)
        this.i = this.data.length;
      else
        this.state = this.Text;
    }
  };
  var cache = {};
  function hash(str) {
    for (var i2 = str.length, val = 5381; i2--; )
      val += (val << 5) + str.charCodeAt(i2);
    return val;
  }
  const _sfc_main$p = {
    name: "parser",
    emits: ["parse", "load", "ready", "error", "imgtap", "linkpress"],
    data() {
      return {
        showAm: "",
        nodes: []
      };
    },
    components: {
      trees
    },
    props: {
      html: String,
      autopause: {
        type: Boolean,
        default: true
      },
      preview: {
        type: Boolean,
        default: true
      },
      autoscroll: Boolean,
      autosetTitle: {
        type: Boolean,
        default: true
      },
      compress: Number,
      loadingImg: String,
      useCache: Boolean,
      domain: String,
      lazyLoad: Boolean,
      selectable: Boolean,
      tagStyle: Object,
      showWithAnimation: Boolean,
      useAnchor: Boolean
    },
    watch: {
      html(html) {
        this.setContent(html);
      }
    },
    created() {
      this.imgList = [];
      this.imgList.each = function(f2) {
        for (var i2 = 0, len = this.length; i2 < len; i2++)
          this.setItem(i2, f2(this[i2], i2, this));
      };
      this.imgList.setItem = function(i2, src) {
        if (i2 == void 0 || !src)
          return;
        this[i2] = src;
        if (src.includes("data:image")) {
          var filePath, info = src.match(/data:image\/(\S+?);(\S+?),(.+)/);
          if (!info)
            return;
          filePath = `_doc/parser_tmp/${Date.now()}.${info[1]}`;
          var bitmap = new plus.nativeObj.Bitmap();
          bitmap.loadBase64Data(src, () => {
            bitmap.save(filePath, {}, () => {
              bitmap.clear();
              this[i2] = filePath;
            });
          });
        }
      };
    },
    mounted() {
      if (this.html)
        this.setContent(this.html);
    },
    beforeUnmount() {
      this.imgList.each((src) => {
        if (src && src.includes("_doc")) {
          plus.io.resolveLocalFileSystemURL(src, (entry) => {
            entry.remove();
          });
        }
      });
      clearInterval(this._timer);
    },
    methods: {
      setContent(html, append) {
        var nodes;
        if (!html)
          return this.nodes = [];
        var parser2 = new MpHtmlParser(html, this);
        if (this.useCache) {
          var hashVal = hash(html);
          if (cache[hashVal])
            nodes = cache[hashVal];
          else {
            nodes = parser2.parse();
            cache[hashVal] = nodes;
          }
        } else
          nodes = parser2.parse();
        this.$emit("parse", nodes);
        if (append)
          this.nodes = this.nodes.concat(nodes);
        else
          this.nodes = nodes;
        if (nodes.length && nodes.title && this.autosetTitle)
          uni.setNavigationBarTitle({
            title: nodes.title
          });
        if (this.imgList)
          this.imgList.length = 0;
        this.videoContexts = [];
        this.$nextTick(() => {
          (function f2(cs) {
            for (var i2 = cs.length; i2--; ) {
              if (cs[i2].top) {
                cs[i2].controls = [];
                cs[i2].init();
                f2(cs[i2].$children);
              }
            }
          })(this.$children);
          this.$emit("load");
        });
        var height;
        clearInterval(this._timer);
        this._timer = setInterval(() => {
          uni.createSelectorQuery().in(this).select("#_top").boundingClientRect().exec((res) => {
            if (!res)
              return;
            this.rect = res[0];
            if (this.rect.height == height) {
              this.$emit("ready", this.rect);
              clearInterval(this._timer);
            }
            height = this.rect.height;
          });
        }, 350);
        if (this.showWithAnimation && !append)
          this.showAm = "animation:_show .5s";
      },
      getText(ns = this.nodes) {
        var txt = "";
        for (var i2 = 0, n2; n2 = ns[i2++]; ) {
          if (n2.type == "text")
            txt += n2.text.replace(/&nbsp;/g, "\xA0").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
          else if (n2.type == "br")
            txt += "\n";
          else {
            var block = n2.name == "p" || n2.name == "div" || n2.name == "tr" || n2.name == "li" || n2.name[0] == "h" && n2.name[1] > "0" && n2.name[1] < "7";
            if (block && txt && txt[txt.length - 1] != "\n")
              txt += "\n";
            if (n2.children)
              txt += this.getText(n2.children);
            if (block && txt[txt.length - 1] != "\n")
              txt += "\n";
            else if (n2.name == "td" || n2.name == "th")
              txt += "	";
          }
        }
        return txt;
      },
      in(obj) {
        if (obj.page && obj.selector && obj.scrollTop)
          this._in = obj;
      },
      navigateTo(obj) {
        if (!this.useAnchor)
          return obj.fail && obj.fail("Anchor is disabled");
        var d2 = " ";
        var selector = uni.createSelectorQuery().in(this._in ? this._in.page : this).select((this._in ? this._in.selector : "#_top") + (obj.id ? `${d2}#${obj.id},${this._in ? this._in.selector : "#_top"}${d2}.${obj.id}` : "")).boundingClientRect();
        if (this._in)
          selector.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect();
        else
          selector.selectViewport().scrollOffset();
        selector.exec((res) => {
          if (!res[0])
            return obj.fail && obj.fail("Label not found");
          var scrollTop = res[1].scrollTop + res[0].top - (res[2] ? res[2].top : 0) + (obj.offset || 0);
          if (this._in)
            this._in.page[this._in.scrollTop] = scrollTop;
          else
            uni.pageScrollTo({
              scrollTop,
              duration: 300
            });
          obj.success && obj.success();
        });
      },
      getVideoContext(id) {
        if (!id)
          return this.videoContexts;
        else
          for (var i2 = this.videoContexts.length; i2--; )
            if (this.videoContexts[i2].id == id)
              return this.videoContexts[i2];
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_trees = vue.resolveComponent("trees");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      !$data.nodes.length ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", {
        id: "_top",
        style: vue.normalizeStyle($data.showAm + ($props.selectable ? ";user-select:text;-webkit-user-select:text" : ""))
      }, [
        vue.createVNode(_component_trees, {
          nodes: $data.nodes,
          lazyLoad: $props.lazyLoad,
          loading: $props.loadingImg
        }, null, 8, ["nodes", "lazyLoad", "loading"])
      ], 4)
    ]);
  }
  var uParse = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$j], ["__scopeId", "data-v-ac0fcaf2"], ["__file", "D:/Code/app/tmui-cli-zscg/src/uni_modules/u-parse/u-parse.vue"]]);
  const _sfc_main$o = {
    components: {
      uParse
    },
    data() {
      return {
        tip: "\u53EF\u4EE5\u5206\u4EAB\u94FE\u63A5\u5230\u670B\u53CB\u5708\u4E86\u54E6",
        share: {
          title: "",
          imageUrl: "https://www.cdtu.edu.cn/images/2021xiaofeng4xiaoxun.png"
        },
        id: 39371,
        item: Object,
        pd: "",
        style: {
          p: "font-size:32rpx;margin-bottom:30rpx;text-indent: 2em;",
          img: "margin-left:-2em",
          span: "font-size: 30rpx"
        }
      };
    },
    methods: {
      getOrderList(index) {
        formatAppLog("log", "at pages/news/detail/detail.vue:58", "\u8FD9\u91CC\u51FA\u9519\u4E86\u561B");
        request$2.httpRequest({
          url: "news/getinfo/" + this.id,
          method: "get"
        }).then((res) => {
          formatAppLog("log", "at pages/news/detail/detail.vue:64", "\u8FD9\u91CC\u51FA\u9519\u4E86\u561B");
          this.item = res.data.data;
          uni.setNavigationBarTitle({
            title: this.item.title
          });
        }, {});
      }
    },
    onLoad(e) {
      formatAppLog("log", "at pages/news/detail/detail.vue:84", this.pd);
      if (e.detailData != null) {
        formatAppLog("log", "at pages/news/detail/detail.vue:87", "\u6B63\u5E38\u8DF3\u8F6C\u9875\u9762");
        this.id = e.detailData;
        this.getOrderList();
      } else {
        formatAppLog("log", "at pages/news/detail/detail.vue:91", "\u5206\u4EAB\u8DEF\u53E3\u9875\u9762");
        this.id = e.id;
        this.getOrderList();
        formatAppLog("log", "at pages/news/detail/detail.vue:94", "onload\u4E2D\u7684" + this.id);
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), tmText);
    const _component_u_parse = vue.resolveComponent("u-parse");
    const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), tmSheet);
    const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), tmApp);
    return vue.openBlock(), vue.createBlock(_component_tm_app, { ref: "app" }, {
      default: vue.withCtx(() => [
        vue.createCommentVNode(' <tm-navbar :title="item.title" :shadow="0" iconFontSize="2"> '),
        vue.createCommentVNode(" </tm-navbar> "),
        vue.createVNode(_component_tm_sheet, {
          round: 3,
          margin: [5, 5]
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_tm_text, {
              "font-size": 32,
              _class: "font-weight-b",
              label: $data.item.title,
              class: "title",
              style: { "text-align": "center" }
            }, null, 8, ["label"]),
            !$data.pd ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              style: { "color": "#000000" }
            }, [
              vue.createVNode(_component_u_parse, {
                html: $data.item.content,
                "lazy-load": true,
                "show-with-animation": true,
                "tag-style": $data.style,
                selectable: true
              }, null, 8, ["html", "tag-style"])
            ])) : vue.createCommentVNode("v-if", true),
            $data.pd ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              style: { "color": "#ffffff" }
            }, [
              vue.createVNode(_component_u_parse, {
                html: $data.item.content,
                "lazy-load": true,
                "show-with-animation": true,
                "tag-style": $data.style,
                selectable: true
              }, null, 8, ["html", "tag-style"])
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 512);
  }
  var PagesNewsDetailDetail = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$i], ["__scopeId", "data-v-8a50fcd2"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/news/detail/detail.vue"]]);
  const _sfc_main$n = {
    data() {
      return {};
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  var PagesLuntanLuntan = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$h], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/luntan/luntan.vue"]]);
  const _sfc_main$m = {
    onLoad(e) {
      formatAppLog("log", "at pages/webview/webview.vue:18", e);
      this.url = e.detailData;
    },
    data() {
      return {
        data: "",
        url: "",
        webviewStyles: {
          progress: {
            color: false
          }
        }
      };
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("web-view", {
        "webview-styles": $data.webviewStyles,
        src: $data.url
      }, null, 8, ["webview-styles", "src"]),
      vue.createCommentVNode(' <web-view :webview-styles="webviewStyles" src="http://www.baidu.com"></web-view> ')
    ]);
  }
  var PagesWebviewWebview = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$g], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/webview/webview.vue"]]);
  const _sfc_main$l = {
    onLoad(e) {
      request$2.httpTokenRequest({
        url: "getInfo/getToken",
        method: "post"
      }).then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.msg;
          this.url = e.detailData + `?` + res.data.msg;
          this.dk = true;
        }
      });
    },
    methods: {
      gettoken() {
      }
    },
    data() {
      return {
        data: "",
        dk: false,
        url: "",
        webviewStyles: {
          progress: {
            color: false
          }
        }
      };
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.dk ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
      vue.createElementVNode("web-view", {
        "webview-styles": $data.webviewStyles,
        src: $data.url
      }, null, 8, ["webview-styles", "src"]),
      vue.createCommentVNode(' <web-view :webview-styles="webviewStyles" src="http://www.baidu.com"></web-view> ')
    ])) : vue.createCommentVNode("v-if", true);
  }
  var PagesWebviewWebview_f = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$f], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/webview/webview_f.vue"]]);
  const _sfc_main$k = {
    onLoad(e) {
      this.url = e.detailData;
      setTimeout(() => {
        this.nav();
      }, 500);
    },
    methods: {
      nav() {
        plus.runtime.openURL(this.url);
      }
    },
    data() {
      return {
        data: "",
        dk: false,
        url: "",
        webviewStyles: {
          progress: {
            color: false
          }
        }
      };
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.createCommentVNode(' <web-view :webview-styles="webviewStyles" :src="url"></web-view> ');
  }
  var PagesWebviewWebview_w = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$e], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/webview/webview_w.vue"]]);
  const _sfc_main$j = {
    onLoad(e) {
      request$2.httpTokenRequest({
        url: "getInfo/getJwToken",
        method: "post"
      }).then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.msg;
          this.url = e.detailData + `?` + res.data.msg;
          formatAppLog("log", "at pages/webview/webview_jw/index.vue:24", this.url);
          this.dk = true;
        }
      });
    },
    methods: {
      gettoken() {
      }
    },
    data() {
      return {
        data: "",
        dk: false,
        url: "",
        webviewStyles: {
          progress: {
            color: false
          }
        }
      };
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.dk ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
      vue.createElementVNode("web-view", {
        "webview-styles": $data.webviewStyles,
        src: $data.url
      }, null, 8, ["webview-styles", "src"]),
      vue.createCommentVNode(' <web-view :webview-styles="webviewStyles" src="http://www.baidu.com"></web-view> ')
    ])) : vue.createCommentVNode("v-if", true);
  }
  var PagesWebviewWebview_jwIndex = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$d], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/webview/webview_jw/index.vue"]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-avatar",
    props: __spreadProps(__spreadValues({}, custom_props), {
      size: {
        type: [Number],
        default: 90
      },
      trigger: {
        type: [Boolean, String],
        default: false
      },
      triggerColor: {
        type: [String],
        default: ""
      },
      triggerIcon: {
        type: [String],
        default: ""
      },
      triggerStyle: {
        type: [String],
        default: ""
      },
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
        type: [Boolean, String],
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      icon: {
        type: String,
        default: ""
      },
      img: {
        type: String,
        default: ""
      },
      fontSize: {
        type: [Number],
        default: 0
      },
      unit: {
        type: String,
        default: "rpx"
      }
    }),
    emits: ["click"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const width = vue.computed(() => {
        var _a2;
        return (_a2 = props.size) != null ? _a2 : 90;
      });
      const height = vue.computed(() => {
        var _a2;
        return (_a2 = props.size) != null ? _a2 : 90;
      });
      const fontSize = vue.computed(() => {
        var _a2;
        if (props.fontSize)
          return props.fontSize;
        if (props.label)
          return parseInt(String(width.value)) * 0.4;
        if (props.icon)
          return parseInt(String(width.value)) * 0.7;
        return (_a2 = props.size) != null ? _a2 : 90;
      });
      const imgsize = vue.computed(() => {
        return uni.upx2px(fontSize.value - 4) + "px";
      });
      const triggSize = vue.computed(() => {
        let wh = width.value / 3 + 6;
        wh = wh >= 64 ? 64 : wh;
        return {
          size: wh,
          fontSize: wh * 0.5
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          ref: "avatar",
          class: vue.normalizeClass(["flex-col flex", [__props.trigger ? "trigger" : "", `mx-${props.margin[0]} my-${props.margin[1]}`]]),
          style: vue.normalizeStyle({ width: vue.unref(width) + props.unit, height: vue.unref(height) + props.unit })
        }, [
          vue.createVNode(tmSheet, {
            onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
            color: props.color,
            _class: [vue.unref(customClass), "flex-center flex-col"],
            _style: [vue.unref(customCSSStyle), { flexShrink: 1 }],
            followTheme: props.followTheme,
            dark: props.dark,
            round: props.round,
            shadow: props.shadow,
            outlined: props.outlined,
            border: props.border,
            borderStyle: props.borderStyle,
            borderDirection: props.borderDirection,
            text: props.text,
            transprent: props.img ? true : props.transprent,
            linear: props.linear,
            linearDeep: props.linearDeep,
            width: vue.unref(width),
            height: vue.unref(height),
            margin: [0, 0],
            padding: props.padding,
            unit: props.unit
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                props.label && !props.icon && !props.img ? (vue.openBlock(), vue.createBlock(tmText, {
                  key: 0,
                  userInteractionEnabled: false,
                  label: props.label,
                  "font-size": vue.unref(fontSize),
                  unit: props.unit
                }, null, 8, ["label", "font-size", "unit"])) : vue.createCommentVNode("v-if", true),
                !props.label && props.icon && !props.img ? (vue.openBlock(), vue.createBlock(tmIcon, {
                  key: 1,
                  userInteractionEnabled: false,
                  name: props.icon,
                  "font-size": vue.unref(fontSize),
                  unit: props.unit
                }, null, 8, ["name", "font-size", "unit"])) : vue.createCommentVNode("v-if", true),
                !props.label && !props.icon && props.img ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 2,
                  userInteractionEnabled: false,
                  src: props.img,
                  mode: "scaleToFill",
                  style: vue.normalizeStyle({ width: vue.unref(imgsize), height: vue.unref(imgsize) }),
                  class: vue.normalizeClass(["round-" + props.round])
                }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true)
              ], true)
            ]),
            _: 3
          }, 8, ["color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "padding", "unit"]),
          props.triggerIcon ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => emits("click", $event), ["stop"])),
            class: "absolute flex flex-col-bottom-end b-0 r-0",
            style: vue.normalizeStyle({ width: `${vue.unref(width)}${props.unit}` })
          }, [
            vue.createVNode(tmSheet, {
              userInteractionEnabled: false,
              width: vue.unref(triggSize).size,
              height: vue.unref(triggSize).size,
              _style: props.triggerStyle,
              text: props.img ? false : !props.text,
              color: props.triggerColor || props.color,
              transprent: false,
              dark: props.dark,
              _class: "flex-center ",
              margin: [0, 0],
              padding: [0, 0],
              round: 24,
              unit: props.unit
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(tmIcon, {
                  name: props.triggerIcon,
                  "font-size": vue.unref(triggSize).fontSize,
                  unit: props.unit
                }, null, 8, ["name", "font-size", "unit"])
              ]),
              _: 1
            }, 8, ["width", "height", "_style", "text", "color", "dark", "unit"])
          ], 4)) : vue.createCommentVNode("v-if", true)
        ], 6);
      };
    }
  });
  var __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-955fd0ea"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-avatar/tm-avatar.vue"]]);
  const _sfc_main$h = {
    components: {
      TabBar
    },
    data() {
      return {
        title: "Hello",
        userinfo: "",
        pic: "",
        storageSize: "",
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
        list2: []
      };
    },
    onLoad() {
      this.getbannaer();
      this.userinfo = uni.getStorageSync("userinfo");
      var str = this.userinfo.userName;
      formatAppLog("log", "at pages/me/me2/me2.vue:157", str);
      this.pic = str.charAt(str.length - 1);
    },
    methods: {
      getStorageSize: function() {
        let that = this;
        uni.getStorageInfo({
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
        uni.showModal({
          title: "\u63D0\u793A",
          content: "\u786E\u5B9A\u6E05\u9664\u7F13\u5B58\u5417?",
          confirmText: "\u7ACB\u5373\u6E05\u9664",
          success(res) {
            if (res.confirm) {
              uni.clearStorageSync();
              that.getStorageSize();
              uni.showToast({
                title: "\u6E05\u9664\u6210\u529F"
              });
              uni.reLaunch({
                url: "../../login/login"
              });
            }
          }
        });
      },
      getbannaer() {
        request$2.httpRequest({
          url: "notice/noticeBanner/getAppInfo"
        }).then((res) => {
          if (res.data.code == 200) {
            this.list2 = res.data.data.slice(7);
          }
        });
      },
      openurl3(index) {
        formatAppLog("log", "at pages/me/me2/me2.vue:210", this.list2[index].navurl);
        uni.navigateTo({
          url: this.list2[index].navurl
        });
        plus.runtime.openURL(this.list2[index].navurl);
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), tmText);
    const _component_tm_avatar = resolveEasycom(vue.resolveDynamicComponent("tm-avatar"), __easycom_1$1);
    const _component_tm_divider = resolveEasycom(vue.resolveDynamicComponent("tm-divider"), tmDivider);
    const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), tmButton);
    const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), tmSheet);
    const _component_tab_bar = vue.resolveComponent("tab-bar");
    const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), tmApp);
    return vue.openBlock(), vue.createBlock(_component_tm_app, { ref: "app" }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("view", { class: "uesr" }, [
            vue.createElementVNode("view", { class: "top-xh" }, [
              vue.createElementVNode("view", { class: "h2" }, [
                vue.createVNode(_component_tm_text, {
                  "font-size": 40,
                  _class: "font-weight-b",
                  label: "\u4E2A\u4EBA\u4E2D\u5FC3"
                })
              ]),
              vue.createElementVNode("view", { class: "pic" }, [
                vue.createCommentVNode(' <image src="../../../static/cy-my/xiaoxi.png" style="width: 40rpx;" mode="widthFix"></image> ')
              ])
            ]),
            vue.createElementVNode("view", { class: "fot-xh" }, [
              vue.createElementVNode("navigator", {
                url: "/pages/me/editme",
                "hover-class": "none"
              }, [
                vue.createElementVNode("view", { class: "pic" }, [
                  vue.createCommentVNode(' <image :src="userinfo.avatar" style="width: 130rpx;" mode="widthFix" round>\r\n						</image> '),
                  vue.createVNode(_component_tm_avatar, {
                    round: 12,
                    text: "",
                    margin: [10, 0],
                    size: 110,
                    label: $data.pic,
                    trigger: "",
                    triggerIcon: "tmicon-check"
                  }, null, 8, ["label"])
                ]),
                vue.createElementVNode("view", { class: "txt" }, [
                  vue.createElementVNode("view", { class: "name" }, [
                    vue.createElementVNode("view", { class: "h3" }, [
                      vue.createVNode(_component_tm_text, {
                        "font-size": 30,
                        _class: "font-weight-b",
                        label: $data.userinfo.userName
                      }, null, 8, ["label"])
                    ]),
                    vue.createElementVNode("view", { style: { "margin-top": "15upx" } }, [
                      vue.createVNode(_component_tm_text, {
                        "font-size": 30,
                        _class: "font-weight-n ",
                        label: $data.userinfo.xh
                      }, null, 8, ["label"])
                    ])
                  ])
                ])
              ])
            ])
          ]),
          vue.createCommentVNode(' <view class="about">\r\n			<view class="m-a1">\r\n				<navigator url="" hover-class="none">\r\n					<view class="pic">\r\n						<image src="../../../static/cy-my/tianjia.png" style="width: 76rpx;" mode="widthFix"></image>\r\n					</view>\r\n					<view class="txt">\r\n						<text class="s1">\u70B9\u51FB\u6B64\u5904\u6DFB\u52A0\u5B9D\u5B9D</text>\r\n						<text>\u8BB0\u5F55\u5B9D\u5B9D\u6210\u957F</text>\r\n					</view>\r\n				</navigator>\r\n			</view>\r\n		</view> '),
          vue.createCommentVNode(' <view class="banner px-20 mb-30" >\r\n				<u-swiper :list="list2" height="250" name="img" mode="" bg-color="" @click="openurl3"></u-swiper>\r\n			</view> '),
          vue.createVNode(_component_tm_sheet, {
            margin: [10, 0],
            round: 10
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "ul-list1-xh" }, [
                vue.createCommentVNode(' <view class="li">\r\n				<navigator url="" hover-class="none">\r\n					<view class="pic">\r\n						<image src="../../../static/cy-my/qianbao.png" style="width: 40rpx;" mode="widthFix"></image>\r\n					</view>\r\n					<view class="txt">\r\n					  <tm-text :font-size="24" _class="font-weight-b" label="\u610F\u89C1\u53CD\u9988"></tm-text>\r\n					</view>\r\n				</navigator>\r\n			</view> '),
                vue.createElementVNode("view", { class: "li" }, [
                  vue.createElementVNode("navigator", {
                    url: "/pages/me/editme",
                    "hover-class": "none"
                  }, [
                    vue.createElementVNode("view", { class: "pic" }, [
                      vue.createElementVNode("image", {
                        src: "/static/me/yijian.png",
                        style: { "width": "35rpx" },
                        mode: "widthFix"
                      })
                    ]),
                    vue.createElementVNode("view", { class: "txt" }, [
                      vue.createVNode(_component_tm_text, {
                        "font-size": 32,
                        _class: "font-weight-b",
                        label: "\u4E2A\u4EBA\u4FE1\u606F"
                      })
                    ])
                  ])
                ]),
                vue.createVNode(_component_tm_divider),
                vue.createElementVNode("view", { class: "li" }, [
                  vue.createElementVNode("navigator", {
                    url: "/pages/webview/webview?detailData=https://support.qq.com/embed/phone/408686",
                    "hover-class": "none"
                  }, [
                    vue.createElementVNode("view", { class: "pic" }, [
                      vue.createElementVNode("image", {
                        src: "/static/me/shehzi.png",
                        style: { "width": "35rpx" },
                        mode: "widthFix"
                      })
                    ]),
                    vue.createElementVNode("view", {
                      class: "txt",
                      style: { "border-bottom": "none" }
                    }, [
                      vue.createVNode(_component_tm_text, {
                        "font-size": 32,
                        _class: "font-weight-b",
                        label: "\u610F\u89C1\u53CD\u9988"
                      })
                    ])
                  ], 8, ["url"])
                ]),
                vue.createVNode(_component_tm_divider),
                vue.createElementVNode("view", { class: "li" }, [
                  vue.createElementVNode("navigator", {
                    url: "/pages/me/abme/abme",
                    "hover-class": "none"
                  }, [
                    vue.createElementVNode("view", { class: "pic" }, [
                      vue.createElementVNode("image", {
                        src: "/static/me/guanyhu.png",
                        style: { "width": "35rpx" },
                        mode: "widthFix"
                      })
                    ]),
                    vue.createElementVNode("view", { class: "txt" }, [
                      vue.createVNode(_component_tm_text, {
                        "font-size": 32,
                        _class: "font-weight-b",
                        label: "\u5173\u4E8E\u6211\u4EEC"
                      })
                    ])
                  ])
                ])
              ]),
              vue.createVNode(_component_tm_button, {
                block: "",
                label: "\u9000\u51FA\u767B\u5F55",
                onClick: $options.clearStorage
              }, null, 8, ["onClick"])
            ]),
            _: 1
          })
        ]),
        vue.createElementVNode("view", { class: "py-32 mx-32" }, [
          vue.createCommentVNode(' <tm-divider color="grey-2" label="\u638C\u4E0A\u6210\u5DE5 5.0.0 \u8C22\u8C22\u4F60\u7684\u4F7F\u7528"></tm-divider> '),
          vue.createVNode(_component_tm_divider, {
            color: "grey-2",
            label: "CodeCJ "
          })
        ]),
        vue.createVNode(_component_tab_bar, { active: 4 })
      ]),
      _: 1
    }, 512);
  }
  var PagesMeMe2Me2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$c], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/me/me2/me2.vue"]]);
  const _sfc_main$g = {
    data() {
      return {
        copyrightInfor: `\xA9${new Date().getFullYear()} \u63A8\u5BA2\u6821\u56ED&CDTU\u53E3\u888B\u541B`,
        version: "",
        content: `
						<p style="margin: 11px 0;text-align: justify;font-family: Calibri;font-size: 16px;white-space: normal;text-indent: 28px;line-height: 32px;background: rgb(255, 255, 255)">
						    <span style="color: rgb(51, 51, 51); font-family: \u5B8B\u4F53; letter-spacing: 0px; font-size: 14px;">\u638C\u4E0A\u6210\u5DE5\u662F\u7531\u7F51\u7EDC\u4E0E\u901A\u4FE1\u5DE5\u7A0B\u5B66\u9662\u540C\u5B66\u4ECE\u96F6\u5F00\u53D1\uFF0C\u662F\u4E00\u6B3E\u65B9\u4FBF\u5FEB\u6377\uFF0C\u62E5\u6709\u5B89\u5353\uFF0C\u82F9\u679C\uFF0C\u5C0F\u7A0B\u5E8F\uFF0CH5\u7684\u591A\u5E73\u53F0APP\u3002\u638C\u4E0A\u6210\u5DE5\u5177\u6709\u8BB8\u591A\u65B9\u4FBF\u540C\u5B66\u4EEC\u7684\u529F\u80FD\uFF0C\u670D\u52A1\u4E8E\u5E7F\u5927\u7684\u6210\u90FD\u5DE5\u4E1A\u5B66\u9662\u540C\u5B66\u4EEC\u3002</span><span style="color: rgb(51, 51, 51); font-family: \u5B8B\u4F53; font-size: 12px; letter-spacing: 0px;"><br/></span>
						</p>
						<h4>\u638C\u4E0A\u6210\u5DE5\u5F00\u53D1\u56E2\u961F | \u5174\u8DA3\u9A71\u52A8,\u7528\u7231\u53D1\u7535</h4>
						<p style="margin: 11px 0;text-align: justify;font-family: Calibri;font-size: 16px;white-space: normal;text-indent: 28px;line-height: 32px;background: rgb(255, 255, 255)">
						    <span style="font-family: \u5B8B\u4F53; color: rgb(51, 51, 51); letter-spacing: 0px; font-size: 14px;">\u638C\u4E0A\u6210\u5DE5\u4E8E2022\u5E742\u6708\u5F00\u59CB\u5F00\u53D1\uFF0C\u7531\u63A8\u5BA2\u6821\u56ED\u80E1\u4F1F\u6770\u540C\u5B66\u8D1F\u8D23\u8FD0\u8425,\u7F51\u7EDC\u4E0E\u901A\u4FE1\u5DE5\u7A0B\u5B66\u9662\u66F9\u6770\uFF0C\u5F6D\u826F\u6CE2\u5B8C\u6210\u4E86\u5BF9APP\u524D\u540E\u7AEF\u5F00\u53D1\uFF0C\u66F4\u65B0\u8FED\u4EE3\u3002\u622A\u6B62\u52302022\u5E745\u6708\uFF0C\u201C\u638C\u4E0A\u6210\u5DE5\u201D\u5DF2\u62E5\u6709\u6709\u8D85\u8FC73000+\u540C\u5B66\u4F7F\u7528\u8FC7\u3002\u51FA\u4E8E\u5BF9\u6280\u672F\u7684\u70ED\u7231\u548C\u5BF9\u540C\u5B66\u4EEC\u670D\u52A1\u7684\u70ED\u60C5\uFF0C\u638C\u4E0A\u6210\u5DE5\u5F00\u53D1\u56E2\u961F\u7684\u6210\u5458\u4EEC\u672C\u7740\u4E3A\u6210\u5DE5\u5B66\u5B50\u670D\u52A1\u4E3A\u51FA\u53D1\u70B9\uFF0C\u521B\u9020\u89E3\u51B3\u6821\u56ED\u751F\u6D3B\u3001\u5B66\u4E60\u4E2D\u5B58\u5728\u7684\u75DB\u70B9\u7684\u53EF\u80FD\uFF0C\u5F00\u53D1\u4EA7\u54C1\uFF0C\u670D\u52A1\u540C\u5B66\uFF0C\u63D0\u5347\u6280\u672F\u80FD\u529B\u3002\u611F\u8C22\u4F60\u4F7F\u7528\u638C\u4E0A\u6210\u5DE5~</span>
							
						</p>
							                             
							
						</p>
						<p>
						    <br/>
						</p>
							`
      };
    },
    mounted() {
      plus.runtime.getProperty(plus.runtime.appid, function(wgtInfo) {
        this.version = wgtInfo.version;
      });
    },
    methods: {
      isDeveloper() {
        uni.setStorageSync("isDeveloper", true);
        this.goUpdateLog();
      },
      unDeveloper() {
        uni.clearStorageSync("isDeveloper");
        this.goUpdateLog();
      },
      goUpdateLog() {
        uni.navigateTo({
          url: "../changelog/changelog"
        });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_parse = vue.resolveComponent("u-parse");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "jo-logo-box" }, [
          vue.createElementVNode("image", {
            class: "jo-logo",
            src: "/static/logo.png"
          }),
          vue.createElementVNode("view", { class: "flex flex-column" }, [
            vue.createElementVNode("text", { class: "title" }, "\u638C\u4E0A\u6210\u5DE5"),
            vue.createElementVNode("text", { class: "version" }, "\u5F53\u524D\u7248\u672C\uFF1A" + vue.toDisplayString($data.version || "3.0.7"), 1)
          ])
        ]),
        vue.createCommentVNode(' <view class="jo-list" @click="goUpdateLog" hover-class="contentHover" hover-stay-time="50">\r\n				<view class="list-text">\u66F4\u65B0\u65E5\u5FD7</view>\r\n				<view class="cuIcon-right list-icon"></view>\r\n			</view> '),
        vue.createCommentVNode(" \u53EF\u5220\u53BB  \u5F00\u53D1\u8005\u4E0B\uFF0C\u53EF\u7F16\u8F91\u589E\u5220\u6539\u67E5\u65E5\u5FD7\u5185\u5BB9 "),
        vue.createCommentVNode(' 	<view class="padding flex flex-wrap justify-around align-center bg-white">\r\n				<button class="cu-btn round" @click="isDeveloper">\u5F00\u53D1\u8005:\u589E\u5220\u6539\u67E5\u65E5\u5FD7</button>\r\n				<button class="cu-btn round" @click="unDeveloper">\u6E38\u5BA2:\u4EC5\u9884\u89C8\u65E5\u5FD7</button>\r\n			</view> '),
        vue.createElementVNode("view", {
          class: "u-content",
          style: { "width": "90%", "margin": "auto" }
        }, [
          vue.createVNode(_component_u_parse, { html: $data.content }, null, 8, ["html"])
        ]),
        vue.createElementVNode("view", { class: "footer" }, [
          vue.createElementVNode("view", { class: "footer_pri" }, [
            vue.createCommentVNode(" <navigator url='https://support.qq.com/products/408686/faqs/122141'>\u670D\u52A1\u534F\u8BAE</navigator> "),
            vue.createCommentVNode(' <uni-link href="http://zscg.jaycao.com/fw.html" text="\u670D\u52A1\u534F\u8BAE"></uni-link>\r\n											<view class="linecenter">|</view>\r\n						<uni-link href="http://zscg.jaycao.com/ys.html" text="\u9690\u79C1\u653F\u7B56"></uni-link> ')
          ])
        ]),
        vue.createElementVNode("view", { class: "footer_Copyright" }, vue.toDisplayString($data.copyrightInfor) + "CodeCJ", 1)
      ])
    ]);
  }
  var PagesMeAbmeAbme = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$b], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/me/abme/abme.vue"]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-cell",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      const _computedValue = vue.computed(() => props);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "relative overflow" }, [
          vue.createVNode(tmSheet, {
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
            default: vue.withCtx(() => [
              vue.createElementVNode("view", {
                userInteractionEnabled: true,
                class: vue.normalizeClass(["flex flex-row flex-row-center-center", [vue.unref(_computedValue).url ? "url" : ""]])
              }, [
                vue.unref(_computedValue).showAvatar ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  style: vue.normalizeStyle({
                    width: `${vue.unref(_computedValue).avatarSize}rpx`,
                    height: `${vue.unref(_computedValue).avatarSize}rpx`
                  }),
                  class: "flex flex-row flex-row-center-center"
                }, [
                  vue.renderSlot(_ctx.$slots, "avatar", {}, () => [
                    vue.createVNode(__easycom_2, {
                      round: vue.unref(_computedValue).avatarRound,
                      width: vue.unref(_computedValue).avatarSize,
                      height: vue.unref(_computedValue).avatarSize,
                      src: vue.unref(_computedValue).avatar
                    }, null, 8, ["round", "width", "height", "src"])
                  ], true)
                ], 4)) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("view", {
                  class: "flex-1 flex flex-row flex-row-center-between",
                  style: { "width": "0px" }
                }, [
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode("view", {
                      class: vue.normalizeClass(["flex flex-5 flex-col", [vue.unref(_computedValue).showAvatar ? "pl-24" : ""]])
                    }, [
                      vue.renderSlot(_ctx.$slots, "title", {}, () => [
                        vue.createVNode(tmText, {
                          fontSize: vue.unref(_computedValue).titleFontSize,
                          label: vue.unref(_computedValue).title
                        }, null, 8, ["fontSize", "label"])
                      ], true),
                      vue.renderSlot(_ctx.$slots, "label", {}, () => [
                        vue.unref(_computedValue).label ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "mt-6"
                        }, [
                          vue.createVNode(tmText, {
                            color: vue.unref(_computedValue).labelColor,
                            fontSize: 22,
                            label: vue.unref(_computedValue).label
                          }, null, 8, ["color", "label"])
                        ])) : vue.createCommentVNode("v-if", true)
                      ], true)
                    ], 2)
                  ]),
                  vue.createElementVNode("view", {
                    class: "flex-1 flex-row flex-row-center-end",
                    style: { "width": "0px" }
                  }, [
                    vue.renderSlot(_ctx.$slots, "rightText", {}, () => [
                      vue.unref(_computedValue).rightText ? (vue.openBlock(), vue.createBlock(tmText, {
                        key: 0,
                        _class: "nowrap pr-12",
                        color: vue.unref(_computedValue).rightColor,
                        fontSize: vue.unref(_computedValue).rightTextSize,
                        label: vue.unref(_computedValue).rightText
                      }, null, 8, ["color", "fontSize", "label"])) : vue.createCommentVNode("v-if", true)
                    ], true),
                    vue.renderSlot(_ctx.$slots, "right", {}, () => [
                      vue.unref(_computedValue).rightIcon ? (vue.openBlock(), vue.createBlock(tmIcon, {
                        key: 0,
                        _class: "opacity-3",
                        name: vue.unref(_computedValue).rightIcon,
                        fontSize: 22
                      }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ])
                ])
              ], 2)
            ]),
            _: 3
          }, 8, ["color", "followTheme", "dark", "followDark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding", "_class", "_style"]),
          vue.unref(_computedValue).bottomBorder ? (vue.openBlock(), vue.createBlock(tmDivider, {
            key: 0,
            margin: [0, 0],
            style: vue.normalizeStyle({
              left: `${vue.unref(_computedValue).avatar !== "" ? vue.unref(_computedValue).avatarSize + vue.unref(_computedValue).margin[0] : 0}rpx`
            })
          }, null, 8, ["style"])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  var __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-974db9c6"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-cell/tm-cell.vue"]]);
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-drawer",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2, _d, _e2, _f, _g, _h, _i;
      const props = __props;
      const drawerANI = vue.ref(null);
      const store = useTmpiniaStore();
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => computedTheme(props, isDark.value, tmcfg.value));
      const syswidth = vue.ref(0);
      const sysheight = vue.ref(0);
      const reverse = vue.ref(true);
      const aniEnd = vue.ref(false);
      const flag = vue.ref(false);
      const timeid = vue.ref(0);
      let timerId = NaN;
      vue.ref("close");
      const drawerStauts = vue.ref("close");
      let _show = vue.ref(props.show);
      function debounce2(func, wait = 500, immediate = false) {
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
      for (let i2 = 0; i2 < uni.$tm.pages.length; i2++) {
        if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i2].path && uni.$tm.pages[i2].custom == "custom") {
          isCustomHeader = true;
          break;
        }
      }
      if (!isCustomHeader) {
        sysheight.value = ((_d = (_c2 = sysinfo.safeArea) == null ? void 0 : _c2.height) != null ? _d : sysinfo.windowHeight) - 44;
      } else {
        sysheight.value = ((_f = (_e2 = sysinfo.safeArea) == null ? void 0 : _e2.height) != null ? _f : sysinfo.windowHeight) + ((_g = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _g : 0) + ((_i = (_h = sysinfo.safeAreaInsets) == null ? void 0 : _h.bottom) != null ? _i : 0);
      }
      timeid.value = uni.$tm.u.getUid(4);
      if (_show.value) {
        reverse.value = false;
      }
      vue.watch(() => props.show, (val) => {
        _show.value = props.show;
        if (val) {
          opens();
        } else {
          closeFun();
        }
      });
      vue.onMounted(() => opens());
      const ok_loading = vue.computed(() => props.okLoading);
      const round_rp = vue.computed(() => {
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
      const reverse_rp = vue.computed(() => {
        if (aniname.value != "zoom")
          return reverse.value;
        return !reverse.value;
      });
      const aniname = vue.computed(() => {
        if (props.placement == "center")
          return "zoom";
        if (props.placement == "top")
          return "up";
        if (props.placement == "bottom")
          return "down";
        return props.placement;
      });
      const anwidth = vue.computed(() => {
        if (aniname.value == "zoom") {
          return props.width + props.unit;
        }
        if (props.placement == "left" || props.placement == "right") {
          return props.width + props.unit;
        }
        return syswidth.value + "px";
      });
      const anheight = vue.computed(() => {
        let wucha = 0;
        if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
          return props.height + wucha + props.unit;
        }
        return sysheight.value + "px";
      });
      const contentHeight = vue.computed(() => {
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
      const align_rp = vue.computed(() => {
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
        debounce2(() => {
          drawerStauts.value = "close";
          flag.value = true;
          emits("ok");
          closeFun();
        }, props.duration, true);
      }
      function cancel() {
        if (props.disabled)
          return;
        debounce2(() => {
          drawerStauts.value = "close";
          flag.value = true;
          emits("cancel");
          closeFun();
        }, props.duration, true);
      }
      function OverLayOpen() {
        vue.nextTick(() => {
          var _a3;
          if (!drawerANI.value)
            return;
          (_a3 = drawerANI.value) == null ? void 0 : _a3.play();
          flag.value = false;
        });
      }
      function opens() {
        if (props.disabled)
          return;
        if (flag.value)
          return;
        debounce2(() => {
          flag.value = true;
          aniEnd.value = false;
          reverse.value = true;
          drawerStauts.value = "open";
        }, props.duration, true);
      }
      function open2() {
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
        debounce2(() => {
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
        debounce2(() => {
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
        vue.nextTick(function() {
          var _a3;
          (_a3 = drawerANI.value) == null ? void 0 : _a3.play();
        });
      }
      expose({ close, open: open2 });
      return (_ctx, _cache) => {
        return vue.unref(_show) ? (vue.openBlock(), vue.createBlock(tmOverlay, {
          key: 0,
          duration: 25,
          onOpen: OverLayOpen,
          zIndex: props.zIndex,
          transprent: !props.mask,
          onClick: clickClose,
          align: vue.unref(align_rp),
          overlayClick: false,
          show: vue.unref(_show),
          "onUpdate:show": _cache[1] || (_cache[1] = ($event) => vue.isRef(_show) ? _show.value = $event : _show = $event)
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(tmTranslate, {
              onEnd: animationClose,
              reverse: vue.unref(reverse_rp),
              width: vue.unref(anwidth),
              height: vue.unref(anheight),
              ref_key: "drawerANI",
              ref: drawerANI,
              "auto-play": false,
              name: vue.unref(aniname),
              duration: props.duration
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => $event.stopPropagation(), ["stop"])),
                  style: vue.normalizeStyle([
                    { width: vue.unref(anwidth), height: vue.unref(anheight) },
                    !props.transprent ? vue.unref(tmcomputed).borderCss : "",
                    !props.transprent ? vue.unref(tmcomputed).backgroundColorCss : "",
                    !props.transprent ? vue.unref(tmcomputed).shadowColor : "",
                    vue.unref(customCSSStyle)
                  ]),
                  class: vue.normalizeClass([vue.unref(round_rp), "flex flex-col overflow ", vue.unref(customClass)])
                }, [
                  !props.closeable && !props.hideHeader ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "flex flex-row flex-row-center-center flex-between px-24",
                    style: { "height": "44px" }
                  }, [
                    vue.createElementVNode("view", { class: "flex-4 flex-shrink" }, [
                      !props.hideCancel ? (vue.openBlock(), vue.createBlock(tmText, {
                        key: 0,
                        onClick: cancel,
                        label: props.cancelText
                      }, null, 8, ["label"])) : vue.createCommentVNode("v-if", true)
                    ]),
                    vue.createElementVNode("view", { class: "flex-8 px-32 flex-center" }, [
                      vue.renderSlot(_ctx.$slots, "title", {}, () => [
                        vue.createVNode(tmText, {
                          _class: "text-overflow-1 opacity-7",
                          label: props.title
                        }, null, 8, ["label"])
                      ], true)
                    ]),
                    vue.createElementVNode("view", { class: "flex-4 flex-shrink flex-row flex-row-center-end" }, [
                      !vue.unref(ok_loading) ? (vue.openBlock(), vue.createBlock(tmText, {
                        key: 0,
                        color: __props.okColor,
                        onClick: ok,
                        dark: props.dark,
                        label: props.okText
                      }, null, 8, ["color", "dark", "label"])) : vue.createCommentVNode("v-if", true),
                      vue.unref(ok_loading) ? (vue.openBlock(), vue.createBlock(tmIcon, {
                        key: 1,
                        color: __props.okColor,
                        spin: vue.unref(ok_loading),
                        dark: vue.unref(isDark),
                        _class: vue.unref(isDark) !== true ? "opacity-4" : "",
                        fontSize: 34,
                        name: vue.unref(ok_loading) ? "tmicon-jiazai_dan" : "tmicon-times-circle-fill"
                      }, null, 8, ["color", "spin", "dark", "_class", "name"])) : vue.createCommentVNode("v-if", true)
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  props.closeable && !props.hideHeader ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "flex flex-row flex-row-center-center flex-between px-24",
                    style: { "height": "44px" }
                  }, [
                    vue.createElementVNode("view", { class: "flex-9 pr-32" }, [
                      vue.renderSlot(_ctx.$slots, "title", {}, () => [
                        vue.createVNode(tmText, {
                          _class: "text-overflow-1 opacity-7",
                          dark: props.dark,
                          label: props.title
                        }, null, 8, ["dark", "label"])
                      ], true)
                    ]),
                    vue.createElementVNode("view", { class: "flex-3 flex-shrink flex-row flex-row-center-end" }, [
                      vue.createVNode(tmIcon, {
                        onClick: cancel,
                        dark: props.dark,
                        _class: vue.unref(isDark) !== true ? "opacity-3" : "",
                        fontSize: 36,
                        name: "tmicon-times-circle-fill"
                      }, null, 8, ["dark", "_class"])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("scroll-view", {
                    "scroll-y": "",
                    style: vue.normalizeStyle([{ height: vue.unref(contentHeight) }]),
                    class: "overflow"
                  }, [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ], 4)
                ], 6)
              ]),
              _: 3
            }, 8, ["reverse", "width", "height", "name", "duration"])
          ]),
          _: 3
        }, 8, ["zIndex", "transprent", "align", "show"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-41bc5e8a"], ["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-drawer/tm-drawer.vue"]]);
  const _sfc_main$d = {
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
      this.data = uni.getStorageSync("userinfo");
      formatAppLog("log", "at pages/me/editme.vue:143", this.data);
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
        request$2.httpTokenRequest({
          url: "wx/user/updateXq/?xq=" + id,
          method: "get"
        }).then((res) => {
          this.jz_show = false;
          if (res.data.code == 200) {
            this.data.xq = id;
            uni.setStorageSync("userinfo", this.data);
            this.shuaxin();
          } else {
            uni.showToast({
              title: "\u4FEE\u6539\u5931\u8D25"
            });
          }
        });
      },
      xiugai(index) {
        this.showWin = true;
        this.jz_show = true;
        if (index == 0) {
          request$2.httpTokenRequest({
            url: "wx/user/updateJw/?jwpwd=" + this.jwpwd,
            method: "get"
          }).then((res) => {
            this.jz_show = false;
            if (res.data.code == 200) {
              this.data.jwpwd = this.jwpwd;
              uni.setStorageSync("userinfo", this.data);
              this.shuaxin();
              this.show = false;
            } else {
              uni.showToast({
                title: "\u4FEE\u6539\u5931\u8D25"
              });
            }
          });
        } else if (index == 1) {
          request$2.httpTokenRequest({
            url: "wx/user/updateEmail/?email=" + this.youxiang,
            method: "get"
          }).then((res) => {
            this.jz_show = false;
            if (res.data.code == 200) {
              this.data.email = this.email;
              uni.setStorageSync("userinfo", this.data);
              this.shuaxin();
              this.show1 = false;
            } else {
              uni.showToast({
                title: "\u4FEE\u6539\u5931\u8D25"
              });
            }
          });
        } else if (index == 2) {
          request$2.httpTokenRequest({
            url: "wx/user/updateXq/?xq=" + this.data.xq,
            method: "get"
          }).then((res) => {
            if (res.data.code == 200) {
              this.data.xq = this.data.xq;
              uni.setStorageSync("userinfo", this.data);
              this.shuaxin();
            } else {
              uni.showToast({
                title: "\u4FEE\u6539\u5931\u8D25"
              });
            }
          });
        } else if (index == 3) {
          request$2.httpTokenRequest({
            url: "wx/user/updateQq/?qq=" + this.qq,
            method: "get"
          }).then((res) => {
            this.jz_show = false;
            if (res.data.code == 200) {
              this.data.qq = this.qq;
              uni.setStorageSync("userinfo", this.data);
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
          request$2.httpTokenRequest({
            url: "wx/user/erkePwd/?mm=" + this.erkePwd,
            method: "get"
          }).then((res) => {
            this.jz_show = false;
            if (res.data.code == 200) {
              this.data.erkePwd = this.erkePwd;
              uni.setStorageSync("userinfo", this.data);
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
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tm_navbar = resolveEasycom(vue.resolveDynamicComponent("tm-navbar"), __easycom_0$5);
    const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), tmText);
    const _component_tm_divider = resolveEasycom(vue.resolveDynamicComponent("tm-divider"), tmDivider);
    const _component_tm_sheet = resolveEasycom(vue.resolveDynamicComponent("tm-sheet"), tmSheet);
    const _component_tm_tag = resolveEasycom(vue.resolveDynamicComponent("tm-tag"), __easycom_4);
    const _component_tm_cell = resolveEasycom(vue.resolveDynamicComponent("tm-cell"), __easycom_5);
    const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_0$4);
    const _component_tm_drawer = resolveEasycom(vue.resolveDynamicComponent("tm-drawer"), __easycom_7);
    const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), tmApp);
    return vue.openBlock(), vue.createBlock(_component_tm_app, null, {
      default: vue.withCtx(() => [
        vue.createVNode(_component_tm_navbar, {
          title: "\u4E2A\u4EBA\u4FE1\u606F",
          beforeBack: false,
          hideBack: true,
          hideHome: true
        }, {
          right: vue.withCtx(() => [
            vue.createCommentVNode(' <tm-icon name="tmicon-plus"></tm-icon> ')
          ]),
          _: 1
        }),
        vue.createVNode(_component_tm_sheet, null, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_tm_text, {
              "font-size": 24,
              _class: "font-weight-b",
              color: "grey",
              label: "1.\u4F7F\u7528\u6559\u52A1\u529F\u80FD\u548C\u4E8C\u8BFE\u62A5\u540D\u5FC5\u987B\u5F97\u7ED1\u5B9A\u4E2A\u4EBA\u5BC6\u7801"
            }),
            vue.createVNode(_component_tm_divider),
            vue.createVNode(_component_tm_text, {
              "font-size": 24,
              _class: "font-weight-b ",
              color: "grey",
              label: "3.\u8BA9\u540C\u5B66\u8FDB\u7FA4,\u5E0C\u671B\u80FD\u83B7\u5F97\u5927\u5BB6\u7684\u53CD\u9988,\u624D\u6709\u7EE7\u7EED\u7684\u5FC5\u8981"
            }),
            vue.createVNode(_component_tm_divider),
            vue.createVNode(_component_tm_text, {
              "font-size": 24,
              _class: "font-weight-b ",
              color: "grey",
              label: "1.\u5174\u8DA3\u9A71\u52A8,\u7528\u7231\u53D1\u7535~"
            }),
            vue.createVNode(_component_tm_divider),
            vue.createVNode(_component_tm_text, {
              "font-size": 24,
              _class: "font-weight-b ",
              color: "grey",
              label: "4.\u6211\u6E29\u4F60\u54ED,\u6211\u5728\u7FA4\u91CC\u7B49\u4F60~"
            })
          ]),
          _: 1
        }),
        vue.createElementVNode("view", { class: "mb-32 mx-32 round-3 overflow" }, [
          vue.createVNode(_component_tm_cell, {
            showAvatar: "",
            avatar: "https://picsum.photos/200",
            margin: [0, 0],
            titleFontSize: 30,
            title: ""
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_tag, {
                text: "",
                shadow: 0,
                icon: "tmicon-weixinzhifu",
                color: "orange",
                size: "l",
                label: $data.data.sign == 1 ? "\u5DF2\u52A0\u7FA4" : "\u672A\u52A0\u7FA4"
              }, null, 8, ["label"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_tm_cell, {
            margin: [0, 0],
            titleFontSize: 30,
            title: "\u59D3\u540D"
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, {
                "font-size": 24,
                _class: "font-weight-c",
                color: "grey",
                label: $data.data.userName
              }, null, 8, ["label"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_tm_cell, {
            margin: [0, 0],
            titleFontSize: 30,
            title: "\u8D26\u53F7"
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, {
                "font-size": 24,
                _class: "font-weight-c",
                color: "grey",
                label: $data.data.xh
              }, null, 8, ["label"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_tm_cell, {
            margin: [0, 0],
            titleFontSize: 30,
            title: "\u6027\u522B"
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, {
                "font-size": 24,
                _class: "font-weight-c",
                color: "grey",
                label: $data.data.sex || "\u4FDD\u5BC6"
              }, null, 8, ["label"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_tm_cell, {
            margin: [0, 0],
            titleFontSize: 30,
            title: "\u4E13\u4E1A"
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, {
                "font-size": 24,
                _class: "font-weight-c",
                color: "grey",
                label: $data.data.depName
              }, null, 8, ["label"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_tm_cell, {
            margin: [0, 0],
            titleFontSize: 30,
            title: "\u6821\u533A",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.bangding(2))
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, {
                "font-size": 24,
                _class: "font-weight-c",
                color: "grey",
                label: $data.data.xq == 1 ? "\u90EB\u90FD\u6821\u533A" : "\u5B9C\u5BBE\u6821\u533A"
              }, null, 8, ["label"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_tm_cell, {
            margin: [0, 0],
            titleFontSize: 30,
            title: "\u6559\u52A1\u5BC6\u7801",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.bangding(0))
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, {
                "font-size": 24,
                _class: "font-weight-c",
                color: "grey",
                label: $data.data.jwpwd || "\u70B9\u51FB\u7ED1\u5B9A\u6559\u52A1\u5BC6\u7801"
              }, null, 8, ["label"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_tm_cell, {
            margin: [0, 0],
            titleFontSize: 30,
            title: "\u9752\u6625\u6210\u5DE5\u5BC6\u7801",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.bangding(4))
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, {
                "font-size": 24,
                _class: "font-weight-c",
                color: "grey",
                label: $data.data.erkePwd || "\u70B9\u51FB\u7ED1\u5B9A\u9752\u6625\u6210\u5DE5\u5BC6\u7801"
              }, null, 8, ["label"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_tm_cell, {
            margin: [0, 0],
            titleFontSize: 30,
            title: "\u90AE\u7BB1",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.bangding(1))
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, {
                "font-size": 24,
                _class: "font-weight-c",
                color: "grey",
                label: $data.youxiang || "\u70B9\u51FB\u7ED1\u5B9A\u90AE\u7BB1"
              }, null, 8, ["label"])
            ]),
            _: 1
          }),
          vue.createVNode(_component_tm_cell, {
            margin: [0, 0],
            titleFontSize: 30,
            title: "QQ",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.bangding(3))
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, {
                "font-size": 24,
                _class: "font-weight-c",
                color: "grey",
                label: $data.data.qq || "\u70B9\u51FB\u7ED1\u5B9AQQ"
              }, null, 8, ["label"])
            ]),
            _: 1
          })
        ]),
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_tm_drawer, {
            placement: "center",
            show: $data.show,
            "onUpdate:show": _cache[6] || (_cache[6] = ($event) => $data.show = $event),
            onOk: _cache[7] || (_cache[7] = ($event) => $options.xiugai(0)),
            okText: "\u4FEE\u6539"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_tm_input, {
                modelValue: $data.jwpwd,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.jwpwd = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["show"]),
          vue.createVNode(_component_tm_drawer, {
            placement: "center",
            show: $data.show1,
            "onUpdate:show": _cache[9] || (_cache[9] = ($event) => $data.show1 = $event),
            onOk: _cache[10] || (_cache[10] = ($event) => $options.xiugai(1)),
            okText: "\u4FEE\u6539"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_tm_input, {
                modelValue: $data.youxiang,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.youxiang = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["show"]),
          vue.createVNode(_component_tm_drawer, {
            placement: "center",
            show: $data.show2,
            "onUpdate:show": _cache[12] || (_cache[12] = ($event) => $data.show2 = $event),
            onOk: _cache[13] || (_cache[13] = ($event) => $options.xiugai(2)),
            okText: "\u4FEE\u6539"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_tm_text, { label: "1\u662F\u6210\u90FD2\u662F\u5B9C\u5BBE" }),
              vue.createVNode(_component_tm_input, {
                modelValue: $data.data.xq,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.data.xq = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["show"]),
          vue.createVNode(_component_tm_drawer, {
            placement: "center",
            show: $data.show3,
            "onUpdate:show": _cache[15] || (_cache[15] = ($event) => $data.show3 = $event),
            onOk: _cache[16] || (_cache[16] = ($event) => $options.xiugai(3)),
            okText: "\u4FEE\u6539"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_tm_input, {
                modelValue: _ctx.qq,
                "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => _ctx.qq = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["show"]),
          vue.createVNode(_component_tm_drawer, {
            placement: "center",
            show: $data.show4,
            "onUpdate:show": _cache[18] || (_cache[18] = ($event) => $data.show4 = $event),
            onOk: _cache[19] || (_cache[19] = ($event) => $options.xiugai(4))
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_tm_input, {
                modelValue: $data.data.erkePwd,
                "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $data.data.erkePwd = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["show"])
        ])
      ]),
      _: 1
    });
  }
  var PagesMeEditme = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$a], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/me/editme.vue"]]);
  var _self$2;
  var bgtime;
  var dmtime;
  var time;
  const _sfc_main$c = {
    onShow(option) {
    },
    onLoad(option) {
      _self$2 = this;
      formatAppLog("log", "at pages/tool/barrage/start.vue:33", "\u5F39\u5E55\u53C2\u6570");
      _self$2.data = JSON.parse(option.data);
      formatAppLog("log", "at pages/tool/barrage/start.vue:36", _self$2.data);
      _self$2.data.speed = _self$2.data.speed * 3;
      formatAppLog("log", "at pages/tool/barrage/start.vue:39", _self$2.data.text.length);
      if (_self$2.data.roll) {
        _self$2.data.size = _self$2.data.size * 7 / _self$2.data.text.length;
      } else {
        _self$2.data.size = _self$2.data.size * 7;
      }
      _self$2.data.bgspeed = 2e3 - _self$2.data.bgspeed * 20;
      _self$2.data.dmspeed = 2e3 - _self$2.data.dmspeed * 20;
      if (_self$2.data.bgchecked) {
        bgtime = setInterval(() => {
          _self$2.data.bgcolor = _self$2.colorRound();
        }, _self$2.data.bgspeed);
      }
      if (_self$2.data.dmchecked) {
        dmtime = setInterval(() => {
          _self$2.data.dmcolor = _self$2.colorRound();
        }, _self$2.data.dmspeed);
      }
      plus.navigator.setFullscreen(true);
    },
    onHide() {
      formatAppLog("log", "at pages/tool/barrage/start.vue:64", "\u9875\u9762\u9690\u85CF");
    },
    onUnload() {
      formatAppLog("log", "at pages/tool/barrage/start.vue:69", "\u9875\u9762\u5378\u8F7D");
      clearInterval(bgtime);
      clearInterval(dmtime);
      clearInterval(time);
    },
    data() {
      return {
        data: {
          text: ["\u563F\u563F"],
          bgcolor: "rgb(25,255,255)",
          dmcolor: "rgb(0,0,0)",
          speed: 50,
          bgchecked: false,
          dmchecked: false,
          bgspeed: 50,
          dmspeed: 50,
          size: 500,
          roll: false
        },
        quit: false
      };
    },
    methods: {
      colorRound() {
        var r2 = Math.floor(Math.random() * 255);
        var g2 = Math.floor(Math.random() * 255);
        var b2 = Math.floor(Math.random() * 255);
        var color = "rgba(" + r2 + "," + g2 + "," + b2 + ",1)";
        return color;
      },
      quitF() {
        if (!_self$2.quit) {
          formatAppLog("log", "at pages/tool/barrage/start.vue:102", "\u89E6\u53D1");
          _self$2.quit = true;
          clearInterval(time);
          time = setInterval(function(e) {
            _self$2.quit = false;
            formatAppLog("log", "at pages/tool/barrage/start.vue:107", "\u7ED3\u675F");
          }, 3e3);
        }
      },
      exit() {
        formatAppLog("log", "at pages/tool/barrage/start.vue:112", "\u9000\u51FA");
        plus.navigator.setFullscreen(false);
        uni.navigateBack({
          delta: 1
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_notice_bar = vue.resolveComponent("u-notice-bar");
    return vue.openBlock(), vue.createElementBlock("view", {
      onClick: _cache[1] || (_cache[1] = ($event) => $options.quitF())
    }, [
      $data.quit ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "close",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.exit())
      })) : vue.createCommentVNode("v-if", true),
      !$data.data.roll ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        style: vue.normalizeStyle([{ "height": "100vh", "width": "100vw" }, { "background-color": $data.data.bgcolor }])
      }, [
        vue.createVNode(_component_u_notice_bar, {
          class: "marquee",
          color: $data.data.dmcolor,
          type: "none",
          "font-size": $data.data.size,
          padding: "0px 0px",
          speed: $data.data.speed,
          "volume-icon": false,
          list: $data.data.text
        }, null, 8, ["color", "font-size", "speed", "list"])
      ], 4)) : vue.createCommentVNode("v-if", true),
      $data.data.roll ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        style: vue.normalizeStyle([{ "height": "100vh", "width": "100vw" }, { "background-color": $data.data.bgcolor }])
      }, [
        vue.createElementVNode("view", {
          style: { "text-align": "center" },
          class: "marquee"
        }, [
          vue.createElementVNode("text", {
            class: "text-oneLine",
            style: vue.normalizeStyle({ "font-size": $data.data.size + "rpx", "color": $data.data.dmcolor })
          }, vue.toDisplayString($data.data.text[0]), 5)
        ])
      ], 4)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var PagesToolBarrageStart = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$9], ["__scopeId", "data-v-0da7bac0"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/barrage/start.vue"]]);
  const _sfc_main$b = {
    props: {
      color: {
        type: Object,
        default() {
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 0
          };
        }
      },
      spareColor: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        show: false,
        active: false,
        rgba: {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        },
        hsb: {
          h: 0,
          s: 0,
          b: 0
        },
        site: [{
          top: 0,
          left: 0
        }, {
          left: 0
        }, {
          left: 0
        }],
        index: 0,
        bgcolor: {
          r: 255,
          g: 0,
          b: 0,
          a: 1
        },
        hex: "#000000",
        mode: true,
        colorList: [{
          r: 244,
          g: 67,
          b: 54,
          a: 1
        }, {
          r: 233,
          g: 30,
          b: 99,
          a: 1
        }, {
          r: 156,
          g: 39,
          b: 176,
          a: 1
        }, {
          r: 103,
          g: 58,
          b: 183,
          a: 1
        }, {
          r: 63,
          g: 81,
          b: 181,
          a: 1
        }, {
          r: 33,
          g: 150,
          b: 243,
          a: 1
        }, {
          r: 3,
          g: 169,
          b: 244,
          a: 1
        }, {
          r: 0,
          g: 188,
          b: 212,
          a: 1
        }, {
          r: 0,
          g: 150,
          b: 136,
          a: 1
        }, {
          r: 76,
          g: 175,
          b: 80,
          a: 1
        }, {
          r: 139,
          g: 195,
          b: 74,
          a: 1
        }, {
          r: 205,
          g: 220,
          b: 57,
          a: 1
        }, {
          r: 255,
          g: 235,
          b: 59,
          a: 1
        }, {
          r: 255,
          g: 193,
          b: 7,
          a: 1
        }, {
          r: 255,
          g: 152,
          b: 0,
          a: 1
        }, {
          r: 255,
          g: 87,
          b: 34,
          a: 1
        }, {
          r: 121,
          g: 85,
          b: 72,
          a: 1
        }, {
          r: 158,
          g: 158,
          b: 158,
          a: 1
        }, {
          r: 0,
          g: 0,
          b: 0,
          a: 0.5
        }, {
          r: 0,
          g: 0,
          b: 0,
          a: 0
        }]
      };
    },
    created() {
      this.rgba = this.color;
      if (this.spareColor.length !== 0) {
        this.colorList = this.spareColor;
      }
    },
    methods: {
      init() {
        this.hsb = this.rgbToHex(this.rgba);
        this.setValue(this.rgba);
      },
      moveHandle() {
      },
      open() {
        this.show = true;
        this.$nextTick(() => {
          this.init();
          setTimeout(() => {
            this.active = true;
            setTimeout(() => {
              this.getSelectorQuery();
            }, 350);
          }, 50);
        });
      },
      close() {
        this.active = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.show = false;
          }, 500);
        });
      },
      confirm() {
        this.close();
        this.$emit("confirm", {
          rgba: this.rgba,
          hex: this.hex
        });
      },
      select() {
        this.mode = !this.mode;
      },
      selectColor(item) {
        this.setColorBySelect(item);
      },
      touchstart(e, index) {
        const {
          pageX,
          pageY
        } = e.touches[0];
        this.pageX = pageX;
        this.pageY = pageY;
        this.setPosition(pageX, pageY, index);
      },
      touchmove(e, index) {
        const {
          pageX,
          pageY
        } = e.touches[0];
        this.moveX = pageX;
        this.moveY = pageY;
        this.setPosition(pageX, pageY, index);
      },
      touchend(e, index) {
      },
      setPosition(x2, y, index) {
        this.index = index;
        const {
          top,
          left,
          width,
          height
        } = this.position[index];
        this.site[index].left = Math.max(0, Math.min(parseInt(x2 - left), width));
        if (index === 0) {
          this.site[index].top = Math.max(0, Math.min(parseInt(y - top), height));
          this.hsb.s = parseInt(100 * this.site[index].left / width);
          this.hsb.b = parseInt(100 - 100 * this.site[index].top / height);
          this.setColor();
          this.setValue(this.rgba);
        } else {
          this.setControl(index, this.site[index].left);
        }
      },
      setColor() {
        const rgb = this.HSBToRGB(this.hsb);
        this.rgba.r = rgb.r;
        this.rgba.g = rgb.g;
        this.rgba.b = rgb.b;
      },
      setValue(rgb) {
        this.hex = "#" + this.rgbToHex(rgb);
      },
      setControl(index, x2) {
        const {
          top,
          left,
          width,
          height
        } = this.position[index];
        if (index === 1) {
          this.hsb.h = parseInt(360 * x2 / width);
          this.bgcolor = this.HSBToRGB({
            h: this.hsb.h,
            s: 100,
            b: 100
          });
          this.setColor();
        } else {
          this.rgba.a = (x2 / width).toFixed(1);
        }
        this.setValue(this.rgba);
      },
      rgbToHex(rgb) {
        let hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
        hex.map(function(str, i2) {
          if (str.length == 1) {
            hex[i2] = "0" + str;
          }
        });
        return hex.join("");
      },
      setColorBySelect(getrgb) {
        const {
          r: r2,
          g: g2,
          b: b2,
          a: a2
        } = getrgb;
        let rgb = {};
        rgb = {
          r: r2 ? parseInt(r2) : 0,
          g: g2 ? parseInt(g2) : 0,
          b: b2 ? parseInt(b2) : 0,
          a: a2 ? a2 : 0
        };
        this.rgba = rgb;
        this.hsb = this.rgbToHsb(rgb);
        this.changeViewByHsb();
      },
      changeViewByHsb() {
        const [a2, b2, c2] = this.position;
        this.site[0].left = parseInt(this.hsb.s * a2.width / 100);
        this.site[0].top = parseInt((100 - this.hsb.b) * a2.height / 100);
        this.setColor(this.hsb.h);
        this.setValue(this.rgba);
        this.bgcolor = this.HSBToRGB({
          h: this.hsb.h,
          s: 100,
          b: 100
        });
        this.site[1].left = this.hsb.h / 360 * b2.width;
        this.site[2].left = this.rgba.a * c2.width;
      },
      HSBToRGB(hsb) {
        let rgb = {};
        let h2 = Math.round(hsb.h);
        let s2 = Math.round(hsb.s * 255 / 100);
        let v2 = Math.round(hsb.b * 255 / 100);
        if (s2 == 0) {
          rgb.r = rgb.g = rgb.b = v2;
        } else {
          let t1 = v2;
          let t2 = (255 - s2) * v2 / 255;
          let t3 = (t1 - t2) * (h2 % 60) / 60;
          if (h2 == 360)
            h2 = 0;
          if (h2 < 60) {
            rgb.r = t1;
            rgb.b = t2;
            rgb.g = t2 + t3;
          } else if (h2 < 120) {
            rgb.g = t1;
            rgb.b = t2;
            rgb.r = t1 - t3;
          } else if (h2 < 180) {
            rgb.g = t1;
            rgb.r = t2;
            rgb.b = t2 + t3;
          } else if (h2 < 240) {
            rgb.b = t1;
            rgb.r = t2;
            rgb.g = t1 - t3;
          } else if (h2 < 300) {
            rgb.b = t1;
            rgb.g = t2;
            rgb.r = t2 + t3;
          } else if (h2 < 360) {
            rgb.r = t1;
            rgb.g = t2;
            rgb.b = t1 - t3;
          } else {
            rgb.r = 0;
            rgb.g = 0;
            rgb.b = 0;
          }
        }
        return {
          r: Math.round(rgb.r),
          g: Math.round(rgb.g),
          b: Math.round(rgb.b)
        };
      },
      rgbToHsb(rgb) {
        let hsb = {
          h: 0,
          s: 0,
          b: 0
        };
        let min = Math.min(rgb.r, rgb.g, rgb.b);
        let max = Math.max(rgb.r, rgb.g, rgb.b);
        let delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
          if (rgb.r == max)
            hsb.h = (rgb.g - rgb.b) / delta;
          else if (rgb.g == max)
            hsb.h = 2 + (rgb.b - rgb.r) / delta;
          else
            hsb.h = 4 + (rgb.r - rgb.g) / delta;
        } else
          hsb.h = -1;
        hsb.h *= 60;
        if (hsb.h < 0)
          hsb.h = 0;
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
      },
      getSelectorQuery() {
        const views = uni.createSelectorQuery().in(this);
        views.selectAll(".boxs").boundingClientRect((data) => {
          if (!data || data.length === 0) {
            setTimeout(() => this.getSelectorQuery(), 20);
            return;
          }
          this.position = data;
          this.setColorBySelect(this.rgba);
        }).exec();
      }
    },
    watch: {
      spareColor(newVal) {
        this.colorList = newVal;
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      class: "t-wrapper",
      onTouchmove: _cache[13] || (_cache[13] = vue.withModifiers((...args) => $options.moveHandle && $options.moveHandle(...args), ["stop", "prevent"]))
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["t-mask", { active: $data.active }]),
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"]))
      }, null, 2),
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["t-box", { active: $data.active }])
      }, [
        vue.createElementVNode("view", { class: "t-header" }, [
          vue.createElementVNode("view", {
            class: "t-header-button",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.close && $options.close(...args))
          }, "\u53D6\u6D88"),
          vue.createElementVNode("view", {
            class: "t-header-button",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.confirm && $options.confirm(...args))
          }, "\u786E\u8BA4")
        ]),
        vue.createElementVNode("view", {
          class: "t-color__box",
          style: vue.normalizeStyle({ background: "rgb(" + $data.bgcolor.r + "," + $data.bgcolor.g + "," + $data.bgcolor.b + ")" })
        }, [
          vue.createElementVNode("view", {
            class: "t-background boxs",
            onTouchstart: _cache[3] || (_cache[3] = ($event) => $options.touchstart($event, 0)),
            onTouchmove: _cache[4] || (_cache[4] = ($event) => $options.touchmove($event, 0)),
            onTouchend: _cache[5] || (_cache[5] = ($event) => $options.touchend($event, 0))
          }, [
            vue.createElementVNode("view", { class: "t-color-mask" }),
            vue.createElementVNode("view", {
              class: "t-pointer",
              style: vue.normalizeStyle({ top: $data.site[0].top - 8 + "px", left: $data.site[0].left - 8 + "px" })
            }, null, 4)
          ], 32)
        ], 4),
        vue.createElementVNode("view", { class: "t-control__box" }, [
          vue.createElementVNode("view", { class: "t-control__color" }, [
            vue.createElementVNode("view", {
              class: "t-control__color-content",
              style: vue.normalizeStyle({ background: "rgba(" + $data.rgba.r + "," + $data.rgba.g + "," + $data.rgba.b + "," + $data.rgba.a + ")" })
            }, null, 4)
          ]),
          vue.createElementVNode("view", { class: "t-control-box__item" }, [
            vue.createElementVNode("view", {
              class: "t-controller boxs",
              onTouchstart: _cache[6] || (_cache[6] = ($event) => $options.touchstart($event, 1)),
              onTouchmove: _cache[7] || (_cache[7] = ($event) => $options.touchmove($event, 1)),
              onTouchend: _cache[8] || (_cache[8] = ($event) => $options.touchend($event, 1))
            }, [
              vue.createElementVNode("view", { class: "t-hue" }, [
                vue.createElementVNode("view", {
                  class: "t-circle",
                  style: vue.normalizeStyle({ left: $data.site[1].left - 12 + "px" })
                }, null, 4)
              ])
            ], 32),
            vue.createElementVNode("view", {
              class: "t-controller boxs",
              onTouchstart: _cache[9] || (_cache[9] = ($event) => $options.touchstart($event, 2)),
              onTouchmove: _cache[10] || (_cache[10] = ($event) => $options.touchmove($event, 2)),
              onTouchend: _cache[11] || (_cache[11] = ($event) => $options.touchend($event, 2))
            }, [
              vue.createElementVNode("view", { class: "t-transparency" }, [
                vue.createElementVNode("view", {
                  class: "t-circle",
                  style: vue.normalizeStyle({ left: $data.site[2].left - 12 + "px" })
                }, null, 4)
              ])
            ], 32)
          ])
        ]),
        vue.createElementVNode("view", { class: "t-result__box" }, [
          $data.mode ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "t-result__item"
          }, [
            vue.createElementVNode("view", { class: "t-result__box-input" }, vue.toDisplayString($data.hex), 1),
            vue.createElementVNode("view", { class: "t-result__box-text" }, "HEX")
          ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createElementVNode("view", { class: "t-result__item" }, [
              vue.createElementVNode("view", { class: "t-result__box-input" }, vue.toDisplayString($data.rgba.r), 1),
              vue.createElementVNode("view", { class: "t-result__box-text" }, "R")
            ]),
            vue.createElementVNode("view", { class: "t-result__item" }, [
              vue.createElementVNode("view", { class: "t-result__box-input" }, vue.toDisplayString($data.rgba.g), 1),
              vue.createElementVNode("view", { class: "t-result__box-text" }, "G")
            ]),
            vue.createElementVNode("view", { class: "t-result__item" }, [
              vue.createElementVNode("view", { class: "t-result__box-input" }, vue.toDisplayString($data.rgba.b), 1),
              vue.createElementVNode("view", { class: "t-result__box-text" }, "B")
            ]),
            vue.createElementVNode("view", { class: "t-result__item" }, [
              vue.createElementVNode("view", { class: "t-result__box-input" }, vue.toDisplayString($data.rgba.a), 1),
              vue.createElementVNode("view", { class: "t-result__box-text" }, "A")
            ])
          ], 64)),
          vue.createElementVNode("view", {
            class: "t-result__item t-select",
            onClick: _cache[12] || (_cache[12] = (...args) => $options.select && $options.select(...args))
          }, [
            vue.createElementVNode("view", { class: "t-result__box-input" }, [
              vue.createElementVNode("view", null, "\u5207\u6362"),
              vue.createElementVNode("view", null, "\u6A21\u5F0F")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "t-alternative" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.colorList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "t-alternative__item",
              key: index
            }, [
              vue.createElementVNode("view", {
                class: "t-alternative__item-content",
                style: vue.normalizeStyle({ background: "rgba(" + item.r + "," + item.g + "," + item.b + "," + item.a + ")" }),
                onClick: ($event) => $options.selectColor(item)
              }, null, 12, ["onClick"])
            ]);
          }), 128))
        ])
      ], 2)
    ], 544)), [
      [vue.vShow, $data.show]
    ]);
  }
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$8], ["__scopeId", "data-v-3a4cd66f"], ["__file", "D:/Code/app/tmui-cli-zscg/src/components/t-color-picker/t-color-picker.vue"]]);
  var _self$1;
  const _sfc_main$a = {
    onLoad() {
      _self$1 = this;
    },
    components: {
      tColorPicker: __easycom_0
    },
    data() {
      return {
        index: "",
        color: { r: 255, g: 0, b: 0, a: 1 },
        data: {
          text: ["\u563F\u563F"],
          bgcolor: "rgb(255,255,255)",
          dmcolor: "rgb(0,0,0)",
          speed: 50,
          bgchecked: false,
          dmchecked: false,
          bgspeed: 50,
          dmspeed: 50,
          size: 50,
          roll: false
        }
      };
    },
    methods: {
      open(item) {
        _self$1.index = item;
        _self$1.$refs.colorPicker.open();
      },
      confirm(e) {
        var data = e.rgba;
        formatAppLog("log", "at pages/tool/barrage/barrage.vue:117", "\u9009\u62E9" + _self$1.index);
        _self$1.data[`${_self$1.index}`] = "rgb(" + data.r + "," + data.g + "," + data.b + ")";
      },
      start(e) {
        formatAppLog("log", "at pages/tool/barrage/barrage.vue:123", "pages/tool/barrage/start?data=" + JSON.stringify(_self$1.data));
        uni.navigateTo({
          url: "./start?data=" + JSON.stringify(_self$1.data)
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_checkbox = vue.resolveComponent("u-checkbox");
    const _component_u_slider = vue.resolveComponent("u-slider");
    const _component_u_switch = vue.resolveComponent("u-switch");
    const _component_t_color_picker = resolveEasycom(vue.resolveDynamicComponent("t-color-picker"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "cu-bar bg-white" }, [
        vue.createElementVNode("view", { class: "action" }, [
          vue.createElementVNode("text", { class: "cuIcon-title text-blue" }),
          vue.createTextVNode("\u5F39\u5E55\u6587\u5B57 ")
        ])
      ]),
      vue.createElementVNode("view", { class: "cu-form-group align-start top" }, [
        vue.createElementVNode("view", { class: "title" }),
        vue.withDirectives(vue.createElementVNode("textarea", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.data.text[0] = $event),
          placeholder: "\u8BF7\u8F93\u5165\u5F39\u5E55"
        }, null, 512), [
          [vue.vModelText, $data.data.text[0]]
        ])
      ]),
      vue.createElementVNode("view", { class: "cu-form-group" }, [
        vue.createElementVNode("view", { class: "title" }, "\u80CC\u666F\u989C\u8272"),
        vue.createVNode(_component_u_checkbox, {
          modelValue: $data.data.bgchecked,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.data.bgchecked = $event)
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("\u968F\u673A")
          ]),
          _: 1
        }, 8, ["modelValue"]),
        vue.createElementVNode("button", {
          class: "cu-btn bg-green shadow",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.open("bgcolor")),
          style: vue.normalizeStyle({ backgroundColor: $data.data.bgcolor })
        }, null, 4)
      ]),
      vue.createElementVNode("view", { class: "cu-form-group" }, [
        vue.createElementVNode("view", { class: "title" }, "\u5F39\u5E55\u989C\u8272"),
        vue.createVNode(_component_u_checkbox, {
          modelValue: $data.data.dmchecked,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.data.dmchecked = $event)
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("\u968F\u673A")
          ]),
          _: 1
        }, 8, ["modelValue"]),
        vue.createElementVNode("button", {
          class: "cu-btn bg-green shadow",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.open("dmcolor")),
          style: vue.normalizeStyle({ backgroundColor: $data.data.dmcolor })
        }, null, 4)
      ]),
      vue.createElementVNode("view", { class: "cu-form-group" }, [
        vue.createElementVNode("view", { class: "title" }, "\u5F39\u5E55\u5927\u5C0F: " + vue.toDisplayString($data.data.size), 1),
        vue.createElementVNode("view", {
          class: "wrap",
          style: { "width": "200px" }
        }, [
          vue.createVNode(_component_u_slider, {
            modelValue: $data.data.size,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.data.size = $event)
          }, null, 8, ["modelValue"])
        ])
      ]),
      vue.createElementVNode("view", { class: "cu-form-group" }, [
        vue.createElementVNode("view", { class: "title" }, "\u6EDA\u52A8\u901F\u5EA6: " + vue.toDisplayString($data.data.speed), 1),
        vue.createElementVNode("view", {
          class: "wrap",
          style: { "width": "200px" }
        }, [
          vue.createVNode(_component_u_slider, {
            modelValue: $data.data.speed,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.data.speed = $event)
          }, null, 8, ["modelValue"])
        ])
      ]),
      vue.createElementVNode("view", { class: "cu-form-group" }, [
        vue.createElementVNode("view", { class: "title" }, "\u7981\u6B62\u6EDA\u52A8"),
        vue.createElementVNode("view", { class: "wrap" }, [
          vue.createVNode(_component_u_switch, {
            modelValue: $data.data.roll,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.data.roll = $event),
            "active-color": "#0081ff"
          }, null, 8, ["modelValue"])
        ])
      ]),
      $data.data.bgchecked ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "cu-form-group"
      }, [
        vue.createElementVNode("view", { class: "title" }, "\u80CC\u666F\u53D8\u6362\u901F\u5EA6: " + vue.toDisplayString($data.data.bgspeed), 1),
        vue.createElementVNode("view", {
          class: "wrap",
          style: { "width": "200px" }
        }, [
          vue.createVNode(_component_u_slider, {
            modelValue: $data.data.bgspeed,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.data.bgspeed = $event)
          }, null, 8, ["modelValue"])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $data.data.dmchecked ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "cu-form-group"
      }, [
        vue.createElementVNode("view", { class: "title" }, "\u5F39\u5E55\u53D8\u6362\u901F\u5EA6: " + vue.toDisplayString($data.data.dmspeed), 1),
        vue.createElementVNode("view", {
          class: "wrap",
          style: { "width": "200px" }
        }, [
          vue.createVNode(_component_u_slider, {
            modelValue: $data.data.dmspeed,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.data.dmspeed = $event)
          }, null, 8, ["modelValue"])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "padding flex flex-direction bg-white top" }, [
        vue.createElementVNode("button", {
          class: "cu-btn bg-blue margin-tb-sm lg",
          onClick: _cache[10] || (_cache[10] = (...args) => $options.start && $options.start(...args))
        }, "\u5F00\u542F")
      ]),
      vue.createVNode(_component_t_color_picker, {
        ref: "colorPicker",
        color: $data.color,
        onConfirm: $options.confirm
      }, null, 8, ["color", "onConfirm"])
    ]);
  }
  var PagesToolBarrageBarrage = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$7], ["__scopeId", "data-v-ecab1884"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/barrage/barrage.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-rate",
    props: __spreadProps(__spreadValues({}, custom_props), {
      count: {
        type: Number,
        default: 5
      },
      modelvalue: {
        type: Number,
        default: 0
      },
      defaultValue: {
        type: Number,
        default: 0
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: "tmicon-collection-fill"
      },
      size: {
        type: Number,
        default: 42
      },
      color: {
        type: [Array, String],
        default: "orange"
      },
      gutter: {
        type: Number,
        default: 16
      },
      followTheme: {
        type: [Boolean, String],
        default: true
      },
      dark: {
        type: [Boolean, String],
        default: false
      },
      followDark: {
        type: [Boolean, String],
        default: true
      },
      label: {
        type: String,
        default: ""
      },
      showLabel: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["click", "change", "update:modelValue"],
    setup(__props, { emit: emits }) {
      var _a2, _b2, _c2;
      const props = __props;
      const store = useTmpiniaStore();
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const _count = vue.computed(() => props.count);
      const _start = vue.ref(props.defaultValue);
      const tmcfg = vue.computed(() => store.tmStore);
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const _color = vue.computed(() => {
        if (props.followTheme && tmcfg.value.color)
          return tmcfg.value.color;
        if (typeof props.color == "string")
          return props.color;
        if (Array.isArray(props.color)) {
          if (props.color[_start.value - 1]) {
            return props.color[_start.value - 1];
          }
          return props.color[props.color.length - 1];
        }
        return "grey-2";
      });
      const _label = vue.computed(() => {
        if (props.label != "")
          return props.label;
        return _start.value + ".0";
      });
      vue.watch(() => props.modelvalue, () => {
        let valueStart = props.modelvalue >= _count.value ? _count.value : props.modelvalue;
        _start.value = valueStart <= 0 ? 0 : valueStart;
      });
      function startClick(index) {
        if (props.disabled)
          return;
        if (props.readonly) {
          emits("click", index - 1);
          return;
        }
        _start.value = index;
        emits("change", _start.value);
        emits("update:modelValue", _start.value);
        emits("click", index - 1);
        pushFormItem();
      }
      const rulesObj = vue.inject("tmFormItemRules", vue.computed(() => {
        return [
          {
            message: "\u8BF7\u9009\u62E9",
            required: false,
            validator: false
          }
        ];
      }));
      let parentFormItem = proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c2 = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c2 : void 0;
        }
      }
      const validate = (rules) => {
        rules = rules.map((el) => {
          if (typeof el.validator === "function" && el.required === true) {
            return el;
          } else if (typeof el.validator === "boolean" && el.required === true) {
            return __spreadProps(__spreadValues({}, el), {
              validator: (val) => {
                return val == 0 ? false : true;
              }
            });
          } else {
            return __spreadProps(__spreadValues({}, el), {
              validator: (val) => {
                return true;
              }
            });
          }
        });
        let rules_filter = rules.filter((el) => {
          return typeof el.validator === "function" && el.required === true;
        });
        let rules_fun = rules_filter.map((el) => {
          return new Promise(async (res, rej) => {
            if (typeof el.validator === "function") {
              let vr = await el.validator(_start.value);
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
          });
        });
        return Promise.all(rules_fun);
      };
      async function pushFormItem(isCheckVail = true) {
        if (parentFormItem) {
          if (isCheckVail) {
            validate(vue.toRaw(rulesObj.value)).then((ev) => {
              parentFormItem.pushCom({
                value: _start.value,
                isRequiredError: false,
                componentsName: "tm-rate",
                message: ev.length == 0 ? "" : ev[0].message
              });
            }).catch((er) => {
              parentFormItem.pushCom({
                value: _start.value,
                isRequiredError: true,
                componentsName: "tm-rate",
                message: er.message
              });
            });
          }
        }
      }
      pushFormItem();
      const tmFormFun = vue.inject("tmFormFun", vue.computed(() => ""));
      vue.watch(tmFormFun, () => {
        if (tmFormFun.value == "reset") {
          _start.value = 0;
          emits("update:modelValue", _start.value);
          pushFormItem(false);
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "flex flex-row flex-row-center-start",
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(_count), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: item,
              class: vue.normalizeClass([`pr-${__props.gutter}`, props.disabled ? "opacity-5" : ""])
            }, [
              vue.createVNode(tmIcon, {
                "follow-dark": false,
                color: item <= _start.value ? vue.unref(_color) : "grey-2",
                onClick: ($event) => startClick(item),
                "font-size": props.size,
                name: props.icon
              }, null, 8, ["color", "onClick", "font-size", "name"])
            ], 2);
          }), 128)),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            __props.showLabel ? (vue.openBlock(), vue.createBlock(tmText, {
              key: 0,
              dark: vue.unref(isDark),
              color: vue.unref(_color),
              label: vue.unref(_label)
            }, null, 8, ["dark", "color", "label"])) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  });
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-rate/tm-rate.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "jp",
    setup(__props) {
      const { proxy } = vue.getCurrentInstance();
      const msg = vue.ref(null);
      let xh2 = vue.ref(1);
      let url = vue.ref("");
      let sqm = vue.ref("");
      onLoad(() => {
        getjiaquninfo();
      });
      function getjiaquninfo() {
        request$2.httpRequest({
          url: "notice/noticeBanner/getAppInfo/6"
        }).then((res) => {
          if (res.data.code == 200) {
            url.value = res.data.data.navurl;
          }
        });
      }
      function jiaqun() {
        plus.runtime.openURL("https://qm.qq.com/cgi-bin/qm/qr?k=-58QbU4j1nW2LUNTUM_BNhCknlDHF1lV&jump_from=webapi");
      }
      function jp() {
        proxy.msg.show({ model: "load", mask: true, text: "\u6B63\u5728\u6559\u8BC4\u4E2D,\u8BF7\u7B49\u5F85" });
        xh2.value = uni.getStorageSync("userinfo").xh;
        xh2.value = (xh2.value - 65) * 11;
        let opts = {
          url: url.value + "?xh=" + xh2.value + "&pwd=" + uni.getStorageSync("userinfo").jwpwd + "&sqm=" + sqm.value,
          method: "get"
        };
        formatAppLog("log", "at pages/tool/jp/jp.vue:155", url + "?xh=" + xh2 + "&pwd=" + uni.getStorageSync("userinfo").jwpwd + "&sqm=" + sqm);
        request$2.request(opts).then((res) => {
          if (res.data.msg == 200) {
            formatAppLog("log", "at pages/tool/jp/jp.vue:158", res.data.msg.msg);
            proxy.msg.hide();
            proxy.msg.show({ model: "success", mask: true, text: "\u6559\u8BC4\u5DF2\u7ECF\u5B8C\u6210,\u8BF7\u524D\u5F80\u6559\u52A1\u7CFB\u7EDF\u67E5\u770B" });
          }
          if (res.data.msg == 401) {
            formatAppLog("log", "at pages/tool/jp/jp.vue:163", res.data.msg.msg);
            proxy.msg.hide();
            proxy.msg.show({ model: "error", mask: true, text: "\u6388\u6743\u7801\u9519\u8BEF" });
          }
          if (res.data.msg == 500) {
            formatAppLog("log", "at pages/tool/jp/jp.vue:168", res.data.msg.msg);
            proxy.msg.hide();
            proxy.msg.show({ model: "error", mask: true, text: "\u8BF7\u524D\u5F80\u4E2A\u4EBA\u9875\u7ED1\u5B9A\u6B63\u786E\u7684\u6559\u52A1\u5BC6\u7801" });
          }
        }).catch((response) => {
          proxy.msg.hide();
          proxy.msg.show({ model: "error", mask: true, text: "\u5F53\u670D\u52A1\u672A\u5F00\u542F,\u8BF7\u52A0\u7FA4\u67E5\u770B\u5F00\u653E\u65F6\u95F4" });
        });
      }
      return (_ctx, _cache) => {
        const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_0$4);
        const _component_tm_rate = resolveEasycom(vue.resolveDynamicComponent("tm-rate"), __easycom_1);
        const _component_tm_image = resolveEasycom(vue.resolveDynamicComponent("tm-image"), __easycom_2);
        return vue.openBlock(), vue.createBlock(tmApp, null, {
          default: vue.withCtx(() => [
            vue.createVNode(tmMessage, {
              ref_key: "msg",
              ref: msg
            }, null, 512),
            vue.createVNode(tmSheet, null, {
              default: vue.withCtx(() => [
                vue.createVNode(tmText, {
                  "font-size": 32,
                  _class: "font-weight-b",
                  label: "\u6559\u8BC4\u524D\u5FC5\u770B"
                }),
                vue.createVNode(tmDivider),
                vue.createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b ",
                  margin: [0, 24],
                  label: "\u4E00\u3001\u5F00\u53D1\u4E0D\u6613,\u4F7F\u7528\u6559\u8BC4\u9700\u8981\u5206\u4EAB\u7ED9\u4E09\u4E2A\u597D\u53CB\u6216\u7FA4,\u8C22\u8C22\uFF01",
                  style: { "white-space": "pre-wrap" }
                }),
                vue.createElementVNode("br"),
                vue.createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  margin: [0, 24],
                  label: "\u4E8C\u3001\u8BF7\u5F00\u59CB\u4F60\u7684\u81EA\u5B9A\u4E49\u8BC4\u5206\uFF0C\u4E00\u4E2A\u5C0F\u661F\u661F20\u5206\u3002",
                  style: { "white-space": "pre-wrap" }
                }),
                vue.createElementVNode("br"),
                vue.createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  margin: [0, 24],
                  label: "\u4E09\u3001\u5BC6\u7801\u9519\u8BEF\u8BF7\u5230\u4E2A\u4EBA\u9875\u7ED1\u5B9A\u6B63\u786E\u6559\u52A1\u5BC6\u7801\u3002",
                  style: { "white-space": "pre-wrap" }
                }),
                vue.createElementVNode("br"),
                vue.createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  margin: [0, 24],
                  label: "\u56DB\u3001\u4F7F\u7528\u6559\u8BC4\u529F\u80FD\u65F6,\u4E0D\u53EF\u8FDE\u63A5\u6821\u56ED\u7F51CDTU\u3002",
                  style: { "white-space": "pre-wrap" }
                }),
                vue.createElementVNode("br"),
                vue.createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  color: "red",
                  label: "	\u4E94\u3001\u6388\u6743\u8BF7\u5230\u516C\u4F17\u53F7CDTU\u53E3\u888B\u541B\u56DE\u590D \u6559\u8BC4 \u83B7\u53D6!"
                })
              ]),
              _: 1
            }),
            vue.createVNode(tmSheet, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_tm_input, {
                  prefixLabel: "\u8BC4\u8BED:",
                  placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BED",
                  transprent: true
                }),
                vue.createVNode(_component_tm_input, {
                  modelValue: vue.unref(sqm),
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(sqm) ? sqm.value = $event : sqm = $event),
                  prefixLabel: "\u6388\u6743\u7801:",
                  margin: [0, 24],
                  placeholder: "\u8BF7\u8F93\u5165\u6388\u6743\u7801",
                  transprent: true
                }, null, 8, ["modelValue"]),
                vue.createVNode(tmSheet, { margin: [0, 0] }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(tmText, {
                      "font-size": 24,
                      _class: "font-weight-b",
                      label: "\u8BC4\u5206"
                    }),
                    vue.createVNode(tmDivider),
                    vue.createVNode(_component_tm_rate, { defaultValue: 4 })
                  ]),
                  _: 1
                }),
                vue.createElementVNode("view", { class: "flex flex-row flex-wrap" }, [
                  vue.createVNode(tmButton, {
                    margin: [26, 12],
                    onClick: jp,
                    color: "blue",
                    width: 150,
                    height: 70,
                    fontSize: 26,
                    label: "\u5F00\u59CB\u6559\u8BC4"
                  }),
                  vue.createVNode(tmButton, {
                    margin: [26, 12],
                    onClick: jiaqun,
                    color: "pink",
                    width: 150,
                    height: 70,
                    fontSize: 26,
                    label: "\u52A0\u5165\u7FA4\u804A"
                  }),
                  vue.createVNode(tmButton, {
                    margin: [26, 12],
                    onClick: _cache[1] || (_cache[1] = () => {
                    }),
                    color: "green",
                    width: 150,
                    height: 70,
                    fontSize: 26,
                    label: "\u5206\u4EAB\u7ED9\u597D\u53CB"
                  })
                ])
              ]),
              _: 1
            }),
            vue.createVNode(tmSheet, null, {
              default: vue.withCtx(() => [
                vue.createVNode(tmText, {
                  "font-size": 24,
                  _class: "font-weight-b",
                  label: "APP\u7AEF\uFF0C\u516C\u4F17\u53F7:CDTU\u53E3\u888B\u541B\u56DE\u590D\u2018\u6559\u8BC4\u2019\u53EF\u83B7\u53D6\u6388\u6743\u7801\u2764\uFE0F"
                }),
                vue.createVNode(tmDivider),
                vue.createElementVNode("view", {
                  class: "solid-bottom text-xs padding",
                  style: { "margin-left": "200upx" }
                }, [
                  vue.createVNode(tmText, {
                    "font-size": 24,
                    color: "grey",
                    label: "        \u70B9\u51FB\u9884\u89C8\u5E76\u4FDD\u5B58"
                  })
                ]),
                vue.createElementVNode("view", { style: { "text-align": "center" } }, [
                  vue.createVNode(_component_tm_image, {
                    preview: "",
                    width: 620,
                    height: 500,
                    src: "http://cdn.jaycao.com/wx.jpg"
                  })
                ]),
                vue.createElementVNode("view", {
                  class: "",
                  style: { "margin-left": "420upx" }
                }, [
                  vue.createVNode(tmText, {
                    "font-size": 24,
                    color: "grey",
                    label: ""
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("\u516C\u4F17\u53F7:CDTU\u53E3\u888B\u541B")
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        });
      };
    }
  });
  var PagesToolJpJp = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/jp/jp.vue"]]);
  var _self;
  const _sfc_main$7 = {
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
          formatAppLog("log", "at pages/tool/phoneSign/phoneSign.vue:47", "\u8FD0\u884CAndroid\u4E0A");
          break;
        case "ios":
          Vue.prototype.requestIosPermission("photoLibrary", "\u76F8\u518C");
          formatAppLog("log", "at pages/tool/phoneSign/phoneSign.vue:53", "\u8FD0\u884CiOS\u4E0A");
          break;
        default:
          formatAppLog("log", "at pages/tool/phoneSign/phoneSign.vue:56", "\u8FD0\u884C\u5728\u5F00\u53D1\u8005\u5DE5\u5177\u4E0A");
          break;
      }
    },
    onReady() {
      this.ctx = uni.createCanvasContext("handWriting");
      uni.createSelectorQuery().select(".handCenter").boundingClientRect((rect) => {
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
          uni.canvasToTempFilePath({
            canvasId: "handWriting",
            fileType: "png",
            quality: 1,
            success(res) {
              uni.showToast({
                title: "\u5DF2\u4FDD\u5B58"
              });
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(res2) {
                  uni.showToast({
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
        uni.canvasToTempFilePath({
          canvasId: "handWriting",
          fileType: "png",
          quality: 1,
          success(res) {
            formatAppLog("log", "at pages/tool/phoneSign/phoneSign.vue:150", res.tempFilePath, "canvas\u751F\u6210\u56FE\u7247\u5730\u5740");
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res2) {
                uni.showToast({
                  title: "\u5DF2\u4FDD\u5B58\u5230\u76F8\u518C",
                  duration: 2e3
                });
              }
            });
          }
        });
      },
      previewCanvasImg() {
        uni.canvasToTempFilePath({
          canvasId: "handWriting",
          fileType: "jpg",
          quality: 1,
          success(res) {
            uni.previewImage({
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
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "wrapper" }, [
        vue.createElementVNode("view", { class: "handBtn" }, [
          vue.createElementVNode("image", {
            onClick: _cache[0] || (_cache[0] = ($event) => $options.selectColorEvent("black", "#1A1A1A")),
            src: $data.selectColor === "black" ? "/static/images/phoneSign/color_black_selected.png" : "/static/images/phoneSign/color_black.png",
            class: vue.normalizeClass([$data.selectColor === "black" ? "color_select" : "", "black-select"])
          }, null, 10, ["src"]),
          vue.createElementVNode("image", {
            onClick: _cache[1] || (_cache[1] = ($event) => $options.selectColorEvent("red", "#ca262a")),
            src: $data.selectColor === "red" ? "/static/images/phoneSign/color_red_selected.png" : "/static/images/phoneSign/color_red.png",
            class: vue.normalizeClass([$data.selectColor === "red" ? "color_select" : "", "black-select"])
          }, null, 10, ["src"]),
          vue.createElementVNode("button", {
            onClick: _cache[2] || (_cache[2] = (...args) => $options.retDraw && $options.retDraw(...args)),
            class: "delBtn"
          }, "\u91CD\u5199"),
          vue.createElementVNode("button", {
            onClick: _cache[3] || (_cache[3] = (...args) => $options.saveCanvasAsImg && $options.saveCanvasAsImg(...args)),
            class: "saveBtn"
          }, "\u4FDD\u5B58"),
          vue.createElementVNode("button", {
            onClick: _cache[4] || (_cache[4] = (...args) => $options.previewCanvasImg && $options.previewCanvasImg(...args)),
            class: "previewBtn"
          }, "\u9884\u89C8"),
          vue.createElementVNode("button", {
            onClick: _cache[5] || (_cache[5] = (...args) => $options.subCanvas && $options.subCanvas(...args)),
            class: "subBtn"
          }, "\u5B8C\u6210")
        ]),
        vue.createElementVNode("view", { class: "handCenter" }, [
          vue.createElementVNode("canvas", {
            class: "handWriting",
            "disable-scroll": true,
            onTouchstart: _cache[6] || (_cache[6] = (...args) => $options.uploadScaleStart && $options.uploadScaleStart(...args)),
            onTouchmove: _cache[7] || (_cache[7] = (...args) => $options.uploadScaleMove && $options.uploadScaleMove(...args)),
            "canvas-id": "handWriting"
          }, null, 32)
        ]),
        vue.createElementVNode("view", { class: "handRight" }, [
          vue.createElementVNode("view", { class: "handTitle" }, "\u8BF7\u7B7E\u540D")
        ])
      ])
    ]);
  }
  var PagesToolPhoneSignPhoneSign = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/phoneSign/phoneSign.vue"]]);
  const _sfc_main$6 = {
    components: {},
    data() {
      return {
        name: null,
        number: "",
        dept: "",
        plateNo: "",
        plateShow: false,
        inputDisabled: true,
        PageCur: 1,
        res: [{
          name: "",
          mphone: "",
          depname: ""
        }]
      };
    },
    onLoad() {
    },
    methods: {
      getinfo() {
        let opts = {
          url: `getInfo/teacher/${this.name}`,
          method: "get"
        };
        formatAppLog("log", "at pages/tool/getTeacherNumber.vue:122", this.name);
        request$2.httpTokenRequest(opts).then((res) => {
          if (res.data.data == 500) {
            this.$refs.toast.show({
              model: "info",
              label: res.data.data.msg
            });
          }
          if (res.data.code == 200) {
            this.res = res.data.data;
            this.number = res.data.data.mphone;
            this.dept = res.data.data.depname;
            uni.hideLoading();
          }
          if (res.data.data.length == 0) {
            formatAppLog("log", "at pages/tool/getTeacherNumber.vue:143", "213");
            this.$refs.toast.show({ model: "info", label: "\u67E5\u8BE2\u8001\u5E08\u4E0D\u5B58\u5728", wait: 500 });
          }
          uni.hideLoading();
        });
      },
      setPlate(plate) {
        formatAppLog("log", "at pages/tool/getTeacherNumber.vue:152", plate);
        if (plate.length >= 7)
          this.plateNo = plate;
        this.plateShow = false;
      },
      typeChange(e) {
        formatAppLog("log", "at pages/tool/getTeacherNumber.vue:157", e);
        this.PageCur = e;
        this.plateNo = "";
      },
      close() {
        this.PageCur = 1;
      }
    },
    filters: {
      plateNoF(val) {
        if (val == "") {
          return "\u8BF7\u5148\u586B\u5199\u6559\u5E08\u59D3\u540D";
        } else {
          let arr = val.split("");
          arr.splice(2, 0, " \xB7 ");
          return arr.join("");
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(' <tm-message ref="toast"></tm-message> '),
      vue.createElementVNode("view", {
        class: "bannerBg",
        onClick: _cache[0] || (_cache[0] = ($event) => $data.plateShow = true)
      }, [
        vue.createElementVNode("image", {
          src: "https://zhoukaiwen.com/img/keyboard.jpeg",
          mode: "widthFix"
        })
      ]),
      vue.createElementVNode("view", {
        style: { "margin-top": "110rpx" },
        class: "cu-list menu"
      }, [
        vue.createElementVNode("view", { class: "cu-item" }, [
          vue.createElementVNode("view", { class: "content" }, [
            vue.createCommentVNode(' <image src="https://jaycao-demo01.oss-cn-chengdu.aliyuncs.com/1-210326133036.png" class="png" mode="aspectFit"></image> ')
          ]),
          vue.createElementVNode("view", { class: "action" }, [
            vue.createCommentVNode(' <input v-model="name"></input> '),
            vue.createVNode(_component_tm_input, {
              modelValue: $data.name,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.name = $event),
              prefixLabel: "\u59D3\u540D",
              margin: [0, 24],
              placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D"
            }, null, 8, ["modelValue"]),
            vue.createCommentVNode(` 	<view v-if="PageCur=='1'" class="cu-tag round bg-blue light">{{plateNo | plateNoF}}</view>\r
					<view v-if="PageCur!='1'" class="cu-tag round bg-green light">{{plateNo | plateNoF}}</view> `)
          ])
        ]),
        vue.createElementVNode("view", { class: "" }, [
          vue.createElementVNode("button", {
            type: "default",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.getinfo && $options.getinfo(...args))
          }, "\u67E5\u8BE2"),
          vue.createCommentVNode(' <uni-button class="but"  >\u63D0\u4EA4</uni-button> ')
        ]),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.res, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", { class: "cu-list menu" }, [
            vue.createElementVNode("view", { class: "cu-item" }, [
              vue.createElementVNode("view", { class: "content" }, [
                vue.createElementVNode("text", { class: "text-grey" }, "\u6559\u5E08\u59D3\u540D")
              ]),
              vue.createElementVNode("view", null, vue.toDisplayString(item.name), 1)
            ]),
            vue.createElementVNode("view", { class: "cu-item" }, [
              vue.createElementVNode("view", { class: "content" }, [
                vue.createElementVNode("text", { class: "text-grey" }, "\u9662\u7CFB")
              ]),
              vue.createElementVNode("view", null, vue.toDisplayString(item.depname), 1)
            ]),
            vue.createElementVNode("view", { class: "cu-item" }, [
              vue.createElementVNode("view", { class: "content" }, [
                vue.createElementVNode("text", { class: "text-grey" }, "\u624B\u673A\u53F7")
              ]),
              vue.createElementVNode("view", null, vue.toDisplayString(item.mphone), 1)
            ]),
            $data.res.length >= 2 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              style: { "margin-top": "20upx" }
            })) : vue.createCommentVNode("v-if", true)
          ]);
        }), 256))
      ]),
      vue.createElementVNode("view", { class: "cu-list menu" }, [
        vue.createElementVNode("view", { class: "cu-item" }, [
          vue.createElementVNode("view", { class: "content padding-tb-sm" }, [
            vue.createElementVNode("view", { class: "text-lg" }, [
              vue.createElementVNode("text", { class: "cuIcon-titles text-blue margin-right-xs" }),
              vue.createTextVNode(" \u6559\u5E08\u67E5\u8BE2 ")
            ]),
            vue.createElementVNode("view", { class: "text-gray" }, " \u8BF4\u660E\uFF1A\u53EA\u5305\u542B\u8F85\u5BFC\u5458\u548C\u4EFB\u8BFE\u8001\u5E08 "),
            vue.createElementVNode("view", { class: "text-gray" }, " \u6E29\u99A8\u63D0\u9192\uFF1A\u6570\u636E\u7531\u540C\u5B66\u4EEC\u6536\u96C6\u800C\u6765,\u51C6\u786E\u6027\u65E0\u6CD5\u4FDD\u8BC1;\u66F4\u591A\u4FE1\u606F\u67E5\u8BE2\u8BF7\u52A0\u5165QQ\u7FA4 ")
          ])
        ])
      ])
    ]);
  }
  var PagesToolGetTeacherNumber = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-76b103d8"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/getTeacherNumber.vue"]]);
  const _sfc_main$5 = {
    onLoad(e) {
      this.id = JSON.parse(decodeURIComponent(e.detailData));
      this.getHistory();
    },
    data() {
      return {
        id: 0,
        item: Object,
        style: {
          p: "font-size:32rpx;margin-bottom:30rpx;text-indent: 2em;",
          img: "margin-left:-2em",
          span: "font-size: 30rpx"
        }
      };
    },
    methods: {
      getHistory(id) {
        request$2.request({
          url: "https://v2.alapi.cn/api/eventHistory/get",
          method: "get"
        }, {
          token: "NdbhV0rvD13eDGBI",
          id: this.id
        }).then((res) => {
          formatAppLog("log", "at pages/tool/historyDeatil.vue:41", res);
          this.item = res.data.data;
          uni.setNavigationBarTitle({
            title: this.item.title
          });
        }, {});
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_parse = vue.resolveComponent("u-parse");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "title" }, vue.toDisplayString($data.item.title), 1),
      vue.createElementVNode("view", { class: "u-content" }, [
        vue.createVNode(_component_u_parse, {
          html: $data.item.content,
          "lazy-load": true,
          "show-with-animation": true,
          "tag-style": $data.style
        }, null, 8, ["html", "tag-style"])
      ])
    ]);
  }
  var PagesToolHistoryDeatil = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-334f3598"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/historyDeatil.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        data: []
      };
    },
    onLoad() {
      this.getData();
    },
    methods: {
      gotoDeatil(id) {
        uni.navigateTo({
          url: "./historyDeatil?detailData=" + encodeURIComponent(JSON.stringify(id))
        });
      },
      getData() {
        let opts = {
          url: `https://v2.alapi.cn/api/eventHistory`,
          method: "get"
        };
        request$2.request(opts, {
          token: "NdbhV0rvD13eDGBI"
        }).then((res) => {
          formatAppLog("log", "at pages/tool/eventHistory.vue:42", res);
          this.data = res.data.data;
          formatAppLog("log", "at pages/tool/eventHistory.vue:44", this.data);
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.data, (item, index) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "body",
          key: index
        }, [
          vue.createElementVNode("view", {
            onClick: ($event) => $options.gotoDeatil(item.id)
          }, [
            vue.createElementVNode("view", { style: { "font-weight": "bold", "font-size": "35upx" } }, vue.toDisplayString(item.date), 1),
            vue.createElementVNode("view", { style: { "color": "#a7a7a7" } }, vue.toDisplayString(item.title), 1)
          ], 8, ["onClick"])
        ]);
      }), 128))
    ]);
  }
  var PagesToolEventHistory = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/eventHistory.vue"]]);
  const _sfc_main$3 = {
    name: "search",
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {},
    methods: {},
    watch: {},
    onLoad() {
    },
    onReady() {
    },
    onShow() {
    },
    onHide() {
    },
    onUnload() {
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { class: "search" }, "search");
  }
  var PagesNewsSearchIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/news/search/index.vue"]]);
  const _sfc_main$2 = {
    onLoad(e) {
      formatAppLog("log", "at pages/webview/webwiew_erke/index.vue:17", "1231");
      request$2.httpTokenRequest({
        url: "getInfo/getEkToken",
        method: "post"
      }).then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.msg;
          formatAppLog("log", "at pages/webview/webwiew_erke/index.vue:25", e.detailData + `&token=` + res.data.msg);
          this.url = e.detailData + `?token=` + res.data.msg;
          this.dk = true;
        }
      });
    },
    methods: {
      gettoken() {
      }
    },
    data() {
      return {
        data: "",
        dk: false,
        url: "",
        webviewStyles: {
          progress: {
            color: false
          }
        }
      };
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(' <tm-navbar title="CDTU \u9752\u6625\u6210\u5DE5" :shadow="0">\n		</tm-navbar> '),
      $data.dk ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        vue.createElementVNode("web-view", {
          "webview-styles": $data.webviewStyles,
          src: $data.url
        }, null, 8, ["webview-styles", "src"]),
        vue.createCommentVNode(' <web-view :webview-styles="webviewStyles" src="http://www.baidu.com"></web-view> ')
      ])) : vue.createCommentVNode("v-if", true)
    ], 2112);
  }
  var PagesWebviewWebwiew_erkeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/webview/webwiew_erke/index.vue"]]);
  const _sfc_main$1 = {
    onLoad(e) {
      formatAppLog("log", "at pages/webview/wb_ek1.vue:17", "666");
      request$2.httpTokenRequest({
        url: "getInfo/getEkToken",
        method: "post"
      }).then((res) => {
        formatAppLog("log", "at pages/webview/wb_ek1.vue:22", e.detailData);
        if (res.data.code == 200) {
          formatAppLog("log", "at pages/webview/wb_ek1.vue:24", res.data.msg);
          this.data = res.data.msg;
          this.url = JSON.parse(decodeURIComponent(e.detailData)) + `&token=` + res.data.msg;
          formatAppLog("log", "at pages/webview/wb_ek1.vue:29", this.url);
          this.dk = true;
        }
      });
    },
    methods: {
      gettoken() {
      }
    },
    data() {
      return {
        data: "",
        dk: false,
        url: "",
        webviewStyles: {
          progress: {
            color: false
          }
        }
      };
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(' <tm-navbar title="CDTU \u9752\u6625\u6210\u5DE5" :shadow="0">\n		</tm-navbar> '),
      $data.dk ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        vue.createElementVNode("web-view", {
          "webview-styles": $data.webviewStyles,
          src: $data.url
        }, null, 8, ["webview-styles", "src"]),
        vue.createCommentVNode(' <web-view :webview-styles="webviewStyles" src="http://www.baidu.com"></web-view> ')
      ])) : vue.createCommentVNode("v-if", true)
    ], 2112);
  }
  var PagesWebviewWb_ek1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/webview/wb_ek1.vue"]]);
  __definePage("pages/news/news", PagesNewsNews);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/login/wxLogin", PagesLoginWxLogin);
  __definePage("pages/bizhi/bizhi", PagesBizhiBizhi);
  __definePage("pages/bizhi/infotp", PagesBizhiInfotp);
  __definePage("pages/news/detail/detail", PagesNewsDetailDetail);
  __definePage("pages/luntan/luntan", PagesLuntanLuntan);
  __definePage("pages/webview/webview", PagesWebviewWebview);
  __definePage("pages/webview/webview_f", PagesWebviewWebview_f);
  __definePage("pages/webview/webview_w", PagesWebviewWebview_w);
  __definePage("pages/webview/webview_jw/index", PagesWebviewWebview_jwIndex);
  __definePage("pages/me/me2/me2", PagesMeMe2Me2);
  __definePage("pages/me/abme/abme", PagesMeAbmeAbme);
  __definePage("pages/me/editme", PagesMeEditme);
  __definePage("pages/tool/barrage/start", PagesToolBarrageStart);
  __definePage("pages/tool/barrage/barrage", PagesToolBarrageBarrage);
  __definePage("pages/tool/jp/jp", PagesToolJpJp);
  __definePage("pages/tool/phoneSign/phoneSign", PagesToolPhoneSignPhoneSign);
  __definePage("pages/tool/getTeacherNumber", PagesToolGetTeacherNumber);
  __definePage("pages/tool/historyDeatil", PagesToolHistoryDeatil);
  __definePage("pages/tool/eventHistory", PagesToolEventHistory);
  __definePage("pages/news/search/index", PagesNewsSearchIndex);
  __definePage("pages/webview/webwiew_erke/index", PagesWebviewWebwiew_erkeIndex);
  __definePage("pages/webview/wb_ek1", PagesWebviewWb_ek1);
  uni.invokePushCallback({
    type: "enabled"
  });
  Promise.resolve().then(() => {
    plus.push.setAutoNotification && plus.push.setAutoNotification(false);
    plus.push.getClientInfoAsync((info) => {
      if (info.clientid) {
        uni.invokePushCallback({
          type: "clientId",
          cid: info.clientid
        });
      }
    }, (res) => {
      uni.invokePushCallback({
        type: "clientId",
        cid: "",
        errMsg: res.code + ": " + res.message
      });
    });
    plus.push.addEventListener("click", (result) => {
      uni.invokePushCallback({
        type: "click",
        message: result
      });
    });
    plus.push.addEventListener("receive", (result) => {
      uni.invokePushCallback({
        type: "pushMsg",
        message: result
      });
    });
  });
  let config = {
    url: "",
    data: {},
    header: {
      "content-type": "application/json"
    },
    method: "POST",
    timeout: 6e4,
    dataType: "json",
    responseType: "text",
    sslVerify: true,
    withCredentials: false,
    firstIpv4: false
  };
  function request(cog = config, complete, beforeRequest2, afterRequest2) {
    let newConfig = __spreadValues(__spreadValues({}, config), cog);
    return new Promise(async (resolve, reject) => {
      if (typeof beforeRequest2 === "function") {
        let opts = await beforeRequest2(newConfig);
        if (typeof opts !== "object") {
          opts = {};
        }
        newConfig = __spreadValues(__spreadValues({}, newConfig), opts);
      }
      uni.request({
        url: newConfig.url || "",
        data: newConfig.data,
        header: newConfig.header,
        method: newConfig.method,
        timeout: newConfig.timeout,
        dataType: newConfig.dataType,
        responseType: newConfig.responseType,
        sslVerify: newConfig.sslVerify,
        withCredentials: newConfig.withCredentials,
        firstIpv4: newConfig.firstIpv4,
        async success(result) {
          if (result.statusCode !== 200) {
            reject(result);
            return;
          }
          if (typeof afterRequest2 === "function") {
            let opts = await afterRequest2(result);
            if (typeof opts !== "object") {
              opts = result;
            }
            result = __spreadValues(__spreadValues({}, result), opts);
          }
          resolve(result);
        },
        fail(result) {
          reject(result);
        },
        complete(result) {
          if (typeof complete === "function") {
            complete(result);
          }
        }
      });
    });
  }
  var beforeRequest = (val) => val;
  var afterRequest = (val) => val;
  class fetchNet {
    constructor(cog, beforeRequestFun, afterRequesFunt) {
      config = __spreadValues(__spreadValues({}, config), cog || {});
      if (typeof beforeRequestFun == "function") {
        beforeRequest = beforeRequestFun;
      }
      if (typeof afterRequesFunt == "function") {
        afterRequest = afterRequesFunt;
      }
    }
    static get(url, data = {}, opts = {}) {
      let cfg2 = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "GET", data });
      return request(cfg2);
    }
    static post(url, data = {}, opts = {}) {
      let cfg2 = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "POST", data });
      return request(cfg2);
    }
    static async request(cog = config, beforeFun, afterFun, complete) {
      let newConfig = __spreadValues(__spreadValues({}, config), cog);
      if (typeof beforeFun == "function") {
        let testFun = await beforeFun();
        let cb = { errMsg: "\u4E2D\u6B62\u8BF7\u6C42" };
        if (!testFun)
          return cb;
      }
      return request(newConfig, complete, beforeFun || beforeRequest, afterFun || afterRequest);
    }
  }
  let pages = [];
  PageJsonInit.pages.forEach((el) => {
    var _a2, _b2;
    let customType = (_b2 = (_a2 = el == null ? void 0 : el.style) == null ? void 0 : _a2.navigationStyle) != null ? _b2 : "default";
    pages.push({
      path: el.path,
      custom: customType
    });
  });
  if (Array.isArray(PageJsonInit == null ? void 0 : PageJsonInit.subPackages)) {
    PageJsonInit.subPackages.forEach((el) => {
      let rootPath = el.root;
      el.pages.forEach((el2) => {
        var _a2, _b2;
        let elany = el2;
        pages.push({
          path: rootPath + "/" + elany.path,
          custom: (_b2 = (_a2 = elany == null ? void 0 : elany.style) == null ? void 0 : _a2.navigationStyle) != null ? _b2 : "default"
        });
      });
    });
  }
  let pagers = PageJsonInit;
  let tabBar = (_c = pagers == null ? void 0 : pagers.tabBar) != null ? _c : {
    color: "",
    selectedColor: "",
    borderStyle: "",
    backgroundColor: "",
    list: []
  };
  const $tm = {
    tabBar,
    pages,
    isColor: themeTool.isCssColor,
    u: __spreadProps(__spreadValues({}, util), { preview }),
    language,
    fetch: fetchNet
  };
  uni.$tm = $tm;
  var tmui = {
    install: (app, options) => {
      app.use(languageByGlobal());
      let appconfig = {};
      app.mixin(__spreadValues({}, appconfig));
      app.config.globalProperties.tm = $tm;
    }
  };
  uni.hideTabBar({});
  uni.preloadPage({ url: "/pages/erke/erke" });
  uni.preloadPage({ url: "/pages/news/news" });
  uni.preloadPage({ url: "/pages/me/me2/me2" });
  const _sfc_main = {};
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(createPinia());
    app.use(tmui);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(uni.VueShared, Vue);
