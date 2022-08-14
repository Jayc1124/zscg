"use strict";
var __defProp = Object.defineProperty;
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
var common_vendor = require("../../../common/vendor.js");
const share = function(args = {}) {
  let defaultWxshareConfig = __spreadValues({}, args);
  const sapp = (args2 = {}) => {
    common_vendor.onShareAppMessage(() => {
      return __spreadValues(__spreadValues({}, defaultWxshareConfig), args2);
    });
  };
  const sTimeline = (args2 = {}) => {
    common_vendor.onShareTimeline((args3 = {}) => {
      return __spreadValues(__spreadValues({}, defaultWxshareConfig), args3);
    });
  };
  return {
    onShareAppMessage: sapp,
    onShareTimeline: sTimeline
  };
};
exports.share = share;
