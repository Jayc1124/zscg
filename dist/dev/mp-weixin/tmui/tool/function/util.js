"use strict";
var common_vendor = require("../../../common/vendor.js");
var tmui_tool_function_preview = require("./preview.js");
function splitData(oArr = [], length = 1) {
  let arr = [];
  let minArr = [];
  oArr.forEach((c) => {
    if (minArr.length === length) {
      minArr = [];
    }
    if (minArr.length === 0) {
      arr.push(minArr);
    }
    minArr.push(c);
  });
  return arr;
}
function timeMuch(t) {
  let format = {
    d: "00",
    h: "00",
    m: "00",
    s: "00"
  };
  if (t > 0) {
    let d = Math.floor(t / 86400);
    let h = Math.floor(t / 3600 % 24);
    let m = Math.floor(t / 60 % 60);
    let s = Math.floor(t % 60);
    format.d = d < 10 ? "0" + d : d;
    format.h = h < 10 ? "0" + h : h;
    format.m = m < 10 ? "0" + m : m;
    format.s = s < 10 ? "0" + s : s;
  }
  return format;
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
  var now = new Date().getTime();
  var diffValue = now - timestamp;
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
    common_vendor.index.makePhoneCall({
      phoneNumber: num,
      success: () => rs(true),
      fail: (err) => rj(err)
    });
  });
}
function scanCode(onlyFromCamera = true, scanType = ["barCode", "qrCode", "datamatrix", "datamatrix"]) {
  return new Promise((rs, rj) => {
    common_vendor.index.scanCode({
      onlyFromCamera,
      scanType,
      success: (res) => rs(res),
      fail: (error) => rj(error)
    });
  });
}
function setClipboardData(data) {
  return new Promise((rs, rj) => {
    common_vendor.index.setClipboardData({
      data,
      success: () => rs(true),
      fail: (error) => rj(error)
    });
  });
}
function getClipboardData() {
  return new Promise((rs, rj) => {
    common_vendor.index.getClipboardData({
      success: (res) => rs(res.data),
      fail: (error) => rj(error)
    });
  });
}
function setCookie(key, data) {
  try {
    common_vendor.index.setStorageSync(key, data);
    return true;
  } catch (e) {
    return false;
  }
}
function delCookie(key) {
  try {
    common_vendor.index.removeStorageSync(key);
    return true;
  } catch (e) {
    return false;
  }
}
function getCookie(key) {
  try {
    const value = common_vendor.index.getStorageSync(key);
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
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}
function getQueryString(url, key) {
  var query_string = url.substring(url.indexOf("?"));
  if (!query_string)
    return "";
  var re = /[?&]?([^=]+)=([^&]*)/g;
  var tokens;
  while (tokens = re.exec(query_string)) {
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
  var o = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}
function quereyDom(t, node) {
  return new Promise((res, rej) => {
    const query = common_vendor.index.createSelectorQuery().in(t);
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
function isChina(s) {
  var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  return !!patrn.exec(s);
}
function isEmpty(s) {
  if (typeof s === "string") {
    s = s.trim();
  }
  if (s == "")
    return true;
  if (s == null)
    return true;
  if (typeof s === "undefined")
    return true;
  if (Array.isArray(s)) {
    if (s.length == 0)
      return true;
  }
  if (typeof s === "object") {
    if (Object.keys(s).length == 0)
      return true;
  }
  return false;
}
function isEmail(s) {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return !!s.match(reg);
}
function isIdCard(val) {
  val = String(val);
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
  var code = val.substring(17);
  if (p.test(val)) {
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      let id = val[i];
      sum += id * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}
function isIdCar(s) {
  let reg = /^[京|沪|津|渝|鲁|冀|晋|蒙|辽|吉|黑|苏|浙|皖|闽|赣|豫|湘|鄂|粤|桂|琼|川|贵|云|藏|陕|甘|青|宁|新|港|澳|台|新|使]{1}[A-Z]{1}[A-Z_0-9]{5,6}$/;
  return !!s.match(reg);
}
function isPasswordOfNumber(s, len = 6, maxLen = 20) {
  s = String(s);
  let reg = new RegExp(`^[0-9]{${len},${maxLen}}$`);
  return !!s.match(reg);
}
function isPasswordOfOther(s, len = 6, maxLen = 20, model = 0) {
  s = String(s);
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  if (model === 1) {
    reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
  }
  if (model === 2) {
    reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/;
  }
  return !!s.match(reg);
}
function isDate(s) {
  if (s == null || typeof s === "undefined" || !s)
    return false;
  if (typeof s === "string") {
    s = s.replace("-", "/");
  }
  let d = new Date(s);
  if (d.toString() == "Invalid Date")
    return false;
  return true;
}
function toast(word, mask = true, icon = "none") {
  common_vendor.index.showToast({
    mask,
    title: word,
    icon
  });
}
function getWindow() {
  const sysinfo = common_vendor.index.getSystemInfoSync();
  common_vendor.index.hideKeyboard();
  let top = 0;
  let height = sysinfo.windowHeight;
  let nowPage = getCurrentPages().pop();
  for (let i = 0; i < common_vendor.index.$tm.pages.length; i++) {
    if ((nowPage == null ? void 0 : nowPage.route) == common_vendor.index.$tm.pages[i].path && common_vendor.index.$tm.pages[i].custom == "custom") {
      break;
    }
  }
  return { height, width: sysinfo.windowWidth, top };
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
  common_vendor.index[fun]({
    url,
    fail(result) {
      console.error(result);
    }
  });
}
var util = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": tmui_tool_function_preview.preview,
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
  isDate,
  toast,
  getWindow,
  routerTo
}, Symbol.toStringTag, { value: "Module" }));
exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.util = util;
