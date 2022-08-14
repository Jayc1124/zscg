"use strict";
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
var common_vendor = require("../../../common/vendor.js");
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
    console.log(newConfig);
    common_vendor.index.request({
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
    let cfg = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "GET", data });
    return request(cfg);
  }
  static post(url, data = {}, opts = {}) {
    let cfg = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "POST", data });
    return request(cfg);
  }
  static async request(cog = config, beforeFun, afterFun, complete) {
    let newConfig = __spreadValues(__spreadValues({}, config), cog);
    if (typeof beforeFun == "function") {
      let testFun = await beforeFun();
      if (!testFun)
        return;
    }
    return request(newConfig, complete, beforeFun || beforeRequest, afterFun || afterRequest);
  }
}
exports.fetchNet = fetchNet;
